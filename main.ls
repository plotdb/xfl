require! <[fs fs-extra fontmin opentype.js path colors progress gulp-rename bluebird ttf2woff2]>

font-dir = if !process.argv.2 => \fonts else process.argv.2
Promise = bluebird

common-ranges = [[0,0xff], [0xff00, 0xffef]]
common-size = 1000
set-size = 50

if !fs.exists-sync font-dir =>
  console.log "#font-dir directory not found."
  process.exit -1

progress-bar = (total = 10, text = "converting") ->
  bar = new progress(
    "   #text [#{':bar'.yellow}] #{':percent'.cyan} :etas",
    { total: total, width: 60, complete: '#' }
  )
  return bar

font-file-finder = (parent) ->
  files = fs.readdir-sync parent .map -> "#parent/#it"
  ret = []
  for file in files =>
    if fs.stat-sync file .is-directory! => ret = ret ++ font-file-finder(file)
    else if /\.[t]tf$/.exec(file) => ret.push file
  return ret

word-frequency = (file = "word-frequency.csv") ->
  list = (fs.read-file-sync file .toString!)
    .split(\\n)
    .map -> it.split ','
    .filter -> it and it.length and it.length >=2 and it.0 and !isNaN(+it.1)
    .map -> [it.0.charCodeAt(0), +it.1]
  for range in common-ranges =>
    list = [[i,0] for i from range.0 to range.1] ++ list
  return list

code-in-font = (font) -> new Promise (res, rej) ->
  if !font or !fs.exists-sync(font) => return rej new Error("font file not found")
  opentype.load font, (e, font) ->
    ret = []
    if e => return rej new Error(e)
    glyphs = font.glyphs.glyphs
    for i from 0 til font.glyphs.length
      glyph = glyphs[i]
      if !glyph or !glyph.unicode => continue
      ret = ret ++ glyph.unicodes
    res ret

files = font-file-finder font-dir
wordlist = word-frequency!

subset-font = (data) -> new Promise (res, rej) ->
  try
    {filename, basename, set-idx, codes} = data{filename, basename, set-idx, codes}
    fm  = new fontmin!src filename
    if /\.otf$/.exec(filename) => fm.use fontmin.otf2ttf!
    fm.dest "assets/#basename"
      .use gulp-rename("#set-idx.ttf")
      .use fontmin.glyph text: codes.map(-> String.fromCharCode(it)).join('')
      .run (e, f) ->
        data.bar.tick codes.length
        if e => return rej new Error(e)
        return res f
  catch e
    return rej new Error(e)

iterate-code = (code, data, force-set = false) ->
  Promise.resolve!
    .then ->
      if code and !isNaN(code) and data.code-available[code] and !data.code-to-set[code.toString 16] =>
        delete data.code-available[code]
        data.codes.push code
        data.code-to-set[code.toString 16] = data.set-idx
      promise = if force-set or (data.set-idx == 1 and data.codes.length >= common-size)
      or (data.set-idx > 1 and data.codes.length >= set-size) =>
        subset-font data .finally ->
          data.codes = []
          data.set-idx++
      else Promise.resolve!
      return promise

iterate-codes = (data) -> new Promise (res, rej) ->
  _ = ->
    if !data or !data.list or !data.list.length =>
      return iterate-code null, data, true
        .then -> return res data
        .catch ->
          data.failed.push [data.set-idx - 1, it]
          return res data
    code = data.list.splice(0, 1).0
    if !code => return _!
    iterate-code code, data
      .then -> _!
      .catch ->
        data.failed.push [data.set-idx - 1, it]
        _!
  _!

ttf-to-woff2s = (data) -> new Promise (res, rej) ->
  try
    ttfs = fs.readdir-sync "assets/#{data.basename}"
      .filter -> /\.ttf$/.exec(it)
      .filter -> !/all/.exec(it)
      .map -> "assets/#{data.basename}/#it"
    bar = progress-bar ttfs.length, "converting"
    _ = ->
      if !ttfs or !ttfs.length =>
        bar.tick!
        return res data
      file = ttfs.splice 0, 1 .0
      if !file => return _!
      <- fs.write-file file.replace(/\.ttf$/, '.woff2'), ttf2woff2(fs.read-file-sync file), _
      bar.tick!
      _!
    _!
  catch e
    console.log e
    return rej new Error(e)

process-font = (filename) -> new Promise (res, rej) ->
  code-in-font filename
    .then (font-codes) ->
      [code-available, code-to-set] = [{}, {}]
      [codes, idx, set-idx, count] = [[], 0, 1, 0]
      for code in font-codes => code-available[code] = true
      console.log "   - #{font-codes.length} code available."
      data = {
        filename, code-available, code-to-set, codes, set-idx,
        list: wordlist.map(-> it.0) ++ font-codes,
        bar: progress-bar(font-codes.length, "subsetting"), failed: []
        basename: path.basename(filename).replace(/\.[t]tf$/, '')
      }
      iterate-codes data
    .then (data) ->
      console.log "   - subsetted into #{data.set-idx} pieces."
      fs-extra.copy-sync filename, "assets/#{data.basename}/all.ttf"
      data.bar.tick data.list.length
      console.log "   - converting to woff2..."
      ttf-to-woff2s data
    .then (data) ->
      if data.failed.length =>
        console.log "   - some subset failed to be created due to following reason: ".yellow
        failed-set = [it.0 for it in data.failed]
        for item in data.failed =>
          console.log "     subset #{item.0}: #{item.1}"
        for k,v of data.code-to-set => if ~failed-set.indexOf(v) => delete data.code-to-set[k]
      idx-map = {}
      for k,v of data.code-to-set => idx-map[][v].push k.toString(16)
      charmap = [v for k,v of idx-map].map(->it.join(' ')).join('\n')
      fs.write-file-sync "assets/#{data.basename}/charmap.txt", charmap
      console.log "   - process done. ".green
      console.log " "
      return res!
    .catch ->
      console.log "   - process failed due to following reason: ".red
      console.log it
      console.log ""
      return rej!
 
process-fonts = (files) -> new Promise (res, rej) ->
  try
    data = {passed: [], failed: []}
    [total, count] = [files.length, 0]
    console.log " * total #{total} files to process...".cyan
    _ = ->
      if !files or !files.length => return res data
      file = files.splice(0,1).0
      if !file => return _!
      count := count + 1
      console.log " * Process #file ( #count/#total ) ".cyan
      process-font file
        .then ->
          data.passed.push fil
          _!
        .catch ->
          data.failed.push file
          _!
    _!
  catch e
    return rej new Error(e)

process-fonts files
  .then (data) ->
    console.log " * all fonts processed. "
    console.log " * statistics: "
    console.log "   - passed:  [ #{data.passed.length} ]".green
    console.log "   - partial passed: [ #{data.failed.length} ]".yellow
    console.log " * finished."
    console.log ""
  .catch ->
    console.log "failed due to following reason: ".red
    console.log it
