require! <[fs fs-extra @plotdb/opentype.js yargs path colors progress ttf2woff2 ttf2woff]>

argv = yargs
  .usage "usage: npx xfl font-dir [-o output-dir] [-c major-subset-size] [-s subset-size]"
  .option \output, do
    alias: \o
    description: "output directory. default `./output/`"
    type: \string
  .option \major-subset-size, do
    alias: \c
    description: "major-subset-size, default 1500"
    type: \number
  .option \subset-size, do
    alias: \s
    description: "subset-size, default 100"
    type: \number
  .option \word-frequency, do
    alias: \f
    description: "word frequency csv file path"
    type: \number
  .help \help
  .alias \help, \h
  .check (argv, options) ->
    if !argv._.0 => throw new Error("missing font dir")
    return true
  .argv

libdir = path.dirname fs.realpathSync __filename
common-ranges = [[0,0xff], [0xff00, 0xffef]]
common-size = argv.c or 1500 # size of the predefined common subset of font
set-size = argv.s or 100 # size of subset font
font-dir = argv._.0 or "../fonts"
out-dir = argv.o or "../output"
default-frequency-file = path.join(libdir, '..', 'tool', 'data', 'word-frequency.csv')

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
    else if /\.[ot]tf$/.exec(file) => ret.push file
  return ret

word-frequency = (file) ->
  if !file => file = default-frequency-file
  list = (fs.read-file-sync file .toString!)
    .split(\\n)
    .map -> it.split ','
    .filter -> it and it.length and it.length >=2 and it.0 and !isNaN(+it.1)
    .map -> [it.0.charCodeAt(0), +it.1]
  for range in common-ranges =>
    list = [[i,-1] for i from range.0 to range.1] ++ list
  return list

code-in-font = (font) -> new Promise (res, rej) ->
  if !font or !fs.exists-sync(font) => return rej new Error("font file not found")
  opentype.load font, (e, font) ->
    ret = []
    if e => return rej new Error(e)
    glyphs = font.glyphs.glyphs
    for k,glyph of font.glyphs.glyphs =>
      ret ++= ([glyph.unicode] ++ (glyph.unicodes or []))
    ret = Array.from(new Set(ret.filter(->it)))
    res ret

files = font-file-finder font-dir
files = files.filter -> !/NotoSerifCJKtc-Black|SoukouMincho/.exec(it)

wordlist = word-frequency!
wordfreq = Object.fromEntries wordlist

iterate-codes = (data) -> new Promise (res, rej) ->
  font = data.otfont
  count = 0
  for i from 0 til data.list.length =>
    code = data.list[i]
    if code and !isNaN(code) and data.code-available[code] and !data.code-to-set[code] =>
      delete data.code-available[code]
      data.code-to-set[code] = data.set-idx
      count++
    if (data.set-idx == 1 and count >= common-size)
    or (data.set-idx > 1 and count >= set-size) =>
      count = 0
      data.set-idx++
  console.log "   - total #{Array.from(new Set([v for k,v of data.code-to-set])).length} subsets will be created."
  glyphs = {}
  notdef = font.glyphs.get(0)
  notdef.name = '.notdef'
  for k,glyph of font.glyphs.glyphs =>
    if glyph.name == '.notdef' => continue
    unicodes = Array.from(new Set(([glyph.unicode] ++ (glyph.unicodes or [])).filter(->it)))
    # or 1: all glyphs without unicode go to set 1.
    unicodes.map (uc) ->
      glyphs[][data.code-to-set[uc] or 1].push glyph
  list = [{idx: +k, glyphs: ([notdef] ++ v), codes: v.map(-> it.unicode)} for k,v of glyphs]

  # dedup to prevent `OTS parsing error: cmap: Failed to parse table`
  # described in https://stackoverflow.com/questions/56866897/
  hash = {}
  list.map (item) ->
    item.glyphs = item.glyphs.filter ->
      v = hash[it.unicode] = (hash[it.unicode] or 0) + 1
      return v < 2
    item.codes = item.glyphs.map(-> it.unicode).filter(->it)

  data.bar = bar = progress-bar(list.length + 1, "subsetting")
  bar.tick!
  fs-extra.ensure-dir-sync path.join(out-dir, data.basename)
  _ = (idx = 0) ->
    if !(item = list[idx]) => return res data
    # use opentype - two issues:
    #  - OOM: need `export NODE_OPTIONS=--max_old_space_size=4096` to work around
    #  - toPathData return incorrect result with generated fonts.
    if true and 'use opentype.js' =>
      p = new Promise (res, rej) ->
        nf = new opentype.Font({glyphs: item.glyphs} <<< {
          familyName: font.names.fontFamily.en, styleName: font.names.fontSubfamily.en
        } <<< font{unitsPerEm, ascender, descender})
        fs.write-file path.join(out-dir, data.basename, "#{item.idx}.ttf"), Buffer.from(nf.toArrayBuffer!), (e) ->
          if e => rej e else res!

    # use fontmin - fontmin uses fonteditor-core, which doesn't work for NotoSerif. left here for reference.
    else
      p = new Promise (res, rej) ->
        try
          {filename, basename, codes} = data{filename, basename, codes}
          fm  = new fontmin!src filename
          if /\.otf$/.exec(filename) => fm.use fontmin.otf2ttf!
          fm.dest path.join(out-dir, basename)
            .use gulp-rename("#{item.idx}.ttf")
            .use fontmin.glyph text: item.codes.map(-> String.fromCharCode(it)).join('')
            .run (e, f) ->
              if e => return rej new Error(e)
              return res f
        catch e
          return rej new Error(e)

    p
      .finally -> bar.tick!
      .then -> _ idx + 1
      .catch ->
        console.log "[subset] rejection: ", it
        _ idx + 1
  _!


ttf-to-woff2s = (data) -> new Promise (res, rej) ->
  try
    ttfs = fs.readdir-sync path.join(out-dir, data.basename)
      .filter -> /\.ttf$/.exec(it)
      .filter -> !/all/.exec(it)
      .map -> path.join(out-dir, data.basename, it)
    bar = progress-bar (2 * ttfs.length + 2), "converting"
    bar.tick!
    _ = ->
      if !ttfs or !ttfs.length =>
        bar.tick!
        return res data
      file = ttfs.splice 0, 1 .0
      if !file => return _!
      ttfbuf = fs.read-file-sync file
      <- fs.write-file file.replace(/\.ttf$/, '.woff'), ttf2woff(new Uint8Array(ttfbuf)).buffer, _
      bar.tick!
      <- fs.write-file file.replace(/\.ttf$/, '.woff2'), ttf2woff2(ttfbuf), _
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
      list = Array
        .from(new Set(wordlist.map(-> it.0) ++ font-codes))
        .filter -> code-available[it]
        .sort (b,a) ->
          a = wordfreq[a]
          b = wordfreq[b]
          if !(a? and b?) => return 0
          if !(b?) => return 1
          if !(a?) => return -1
          if (a < 0 and b < 0) => return 0
          if a < 0 => return 1
          if b < 0 => return -1
          return a - b
      console.log "   - #{font-codes.length} code available."

      data = {
        filename, code-available, code-to-set, codes, set-idx,
        list: list, failed: []
        basename: path.basename(filename).replace(/\.[ot]tf$/, '')
      }
      opentype.load data.filename
        .then (font) ->
          data.otfont = font
          iterate-codes data
    .then (data) ->
      console.log "   - subsetted into #{data.set-idx} pieces."
      fs-extra.copy-sync filename, path.join(out-dir, data.basename, "all.ttf")
      if data.bar => data.bar.tick!
      console.log "   - converting to woff/woff2..."
      ttf-to-woff2s data
    .then (data) ->
      if data.failed.length =>
        console.log "   - some subset failed to be created due to following reason: ".yellow
        failed-set = [it.0 for it in data.failed]
        for item in data.failed =>
          console.log "     subset #{item.0}: #{item.1}"
        for k,v of data.code-to-set => if ~failed-set.indexOf(v) => delete data.code-to-set[k]
      idx-map = {}
      for k,v of data.code-to-set => idx-map[][v].push (+k).toString(16)
      charmap = [v for k,v of idx-map].map(->it.join(' ')).join('\n')
      fs.write-file-sync path.join(out-dir, data.basename, "charmap.txt"), charmap
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
