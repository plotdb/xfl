err = (e = {}) -> new Error! <<< ({name: \lderror} <<< e)

xfont = (opt = {}) ->
  @opt = opt
  @sub = {set: {}, font: {}}
  @cjk-only = opt.cjk-only or false
  @codemap = {}
  @otf =
    font: null   # opentype.js font object
    dirty: true  # true if we need to re-generate
  @path = opt.path
  @name = opt.name or (@path.replace(/\.[a-zA-Z0-9]+$/,'').split("/").filter(->it)[* - 1])
  @style = 'normal'
  @ext = (opt.ext or (/\.(ttf|otf|woff2|woff)$/.exec(@path) or []).1 or '')
  @format = if @ext.toLowerCase! =>
    if that == 'ttf' => 'truetype'
    else if that == 'otf' => 'truetype'
    else that
  else ''
  if @format => @format = "format('#{@format}')"
  @className = "xfl-#{@name}-#{Math.random!toString(36)substring(2)}"
  @is-xl = !@ext
  @css = []
  @init = proxise.once ~> @_init!
  @init!
  @

xfont.prototype = Object.create(Object.prototype) <<< do
  _init: ->
    Promise.resolve!then ~>
      # not xlfont but regular font. load directly.
      if !@is-xl =>
        @css = [{content: """
        @font-face {
          font-family: #{@name};
          src: url(#{@path}) #{@format};
        }
        .#{@className} { font-family: "#{@name}"; }"""}]
      else return new Promise (res, rej) ~>
        xhr = new XMLHttpRequest!
        xhr.addEventListener \readystatechange, ~>
          if xhr.readyState != XMLHttpRequest.DONE => return
          if xhr.status != 200 => return rej err {code: xhr.status, message: xhr.responseText}
          (xhr.responseText or '')
            .split(\\n)
            .map (d,i) ~> d.split(' ').map (e,j) ~> @codemap[e] = (i + 1)
          res!
        xhr.open \GET, "#{@path}/charmap.txt"
        xhr.send!

  _fetch: (f = {}, dofetch = false) ->
    if !dofetch =>
      if !f.url =>
        if @is-xl => f <<< url: "#{@path}/#{f.key}.woff2", type: 'woff2'
        else f <<< url: @path, type: @ext.toLowerCase!
      return Promise.resolve f
    if f.blob => return Promise.resolve f
    if !f.proxy => f.proxy = proxise (f) ~>
      if f.running => return
      f.running = true
      p = new Promise (res, rej) ~>
        if f.blob => return res f
        xhr = new XMLHttpRequest!
        xhr.addEventListener \readystatechange, ~>
          if xhr.readyState != XMLHttpRequest.DONE => return
          if xhr.status != 200 => return rej err {code: xhr.status, message: xhr.responseText}
          @otf.dirty = true
          f <<< url: URL.createObjectURL(xhr.response), blob: xhr.response, type: (@ext.toLowerCase! or 'ttf')
          return res f
        if @is-xl => xhr.open \GET, "#{@path}/#{f.key}.ttf"
        else xhr.open \GET, @path
        xhr.responseType = \blob
        xhr.send!
      p.finally -> f.running = false
    f.proxy f

  fetch-all: ->
    if @is-xl => Promise.all([f for k,f of @sub.font].map ~> @_fetch it, true)
    else @_fetch @sub.font[0], true
  fetch: (list = [], dofetch = false) ->
    if !@is-xl =>
      if @sub.font[0].blob => return Promise.resolve!
      list = [0]
    # to support dynamic font aggregation, patch this following line
    ps = Array.from new Set(list.map -> it)
      .filter ~> !@sub.font[it]
      .map ~>
        @sub.font[it] = f = {key: it}
        @_fetch f, dofetch
    Promise.all ps
      .then (subfonts) ~>
        if !subfonts.length => return
        css = ".#{@className} { font-family: #{@name}; }"
        for k,f of @sub.font =>
        for f in subfonts =>
          css += """@font-face {
            font-family: #{@name};
            src: url(#{f.url}) format('#{f.type}');
          }"""
        @css.push {content: css}

  getotf: ->
    if !(opentype?) =>
      return Promise.reject err({id: 1022, message: "[@plotdb/xfl] need opentype.js to merge subfonts"})
    if !@otf.dirty => return Promise.resolve(@otf.font)
    Promise.resolve!
      .then ~> if !@is-xl => return @fetch! else @fetch-all!
      .then ~>
        ps = [f for k,f of @sub.font] .map (f) ->
          if f.otf => Promise.resolve(f)
          else opentype.load f.url .then -> f.otf = it; f
        Promise.all ps
      .then (list = []) ~>
        if list.length == 1 => return list.0.otf
        glyphs = list
          .map (f) ->
            glyphs = f.otf.glyphs
            [glyphs.glyphs[i] for i from 1 to glyphs.length]
          .reduce(((a,b) -> a ++ b), [])
          .filter -> it
        @otf.font = new opentype.Font({
          familyName: @name
          styleName: @style or 'normal'
          glyphs: glyphs
        } <<< list.0.otf{unitsPerEm, ascender, descender})
        # workaround: opentype.js seems to not init kerningPairs well for manually constructed font.
        # but we can still do it ourselves.
        @otf.font.kerningPairs = {}
        return @otf.font

  sync: (txt = "") ->
    if !@is-xl => return Promise.resolve!
    [misschar, missset]= [{}, {}]
    Promise.resolve!
      .then ~>
        for i from 0 til txt.length =>
          code = txt.charCodeAt(i)
          if @cjk-only and !xfl.isCJK(code) => continue
          set-idx = @codemap[code.toString 16]
          if !set-idx => misschar[txt[i]] = true
          # TODO we should set @sub.set[set-idx] to true only if it's successfully fetched.
          else if !@sub.set[set-idx] => @sub.set[set-idx] = missset[set-idx] = true
        misschar := [k for k of misschar].filter(->it.trim!)
        if misschar.length =>
          console.log "[@plotdb/xfl] sync xl-font with following chars unsupported: #{misschar.join('')}"
        list = [k for k of missset]
        if list.length => @fetch list
      .then -> xfl.update!

xfl = do
  range:
    CJK: [
      [0x3040 0x30ff], [0x3400 0x4dbf], [0x4e00 0x9fff],
      [0xf900 0xfaff], [0xff66 0xff9f], [0x3131 0xD79D]
    ]
  fonts: {}
  running: {}
  isCJK: (code) -> @range.CJK.filter(-> code >= it.0 and code <= it.1).length
  proxy: {}

  update: ->
    css = ""
    for k,v of @fonts =>
      (v.css or [])
        .filter -> !it.rendered
        .map ->
          it.rendered = true
          css += it.content
    if css =>
      node = document.createElement("style")
      node.textContent = css
      node.setAttribute \type, 'text/css'
      document.body.appendChild node

  # load font from path. will resolve information from path,
  # if failed to resolve, user can still supply options for alternative information.
  _load: (opt = {}) ->
    {path} = opt
    if @running[path] => return
    @running[path] = true
    Promise.resolve!
      .then ~>
        @fonts[path] = fobj = new xfont opt
        fobj.init!
      .finally ~> @running[path] = false
      .then ~>
        @proxy[path].resolve @fonts[path]
        @fonts[path]
      .catch ~>
        @proxy[path].reject it
        Promise.reject it

  load: (opt = {}) -> new Promise (res, rej) ~>
    if !(path = opt.path) => return rej err({id: 400})
    path = path.replace(/\/$/,'')
    if @fonts[path] => return res(that)
    if !@proxy[path] => @proxy[path] = proxise ~> @_load it
    @proxy[path]({} <<< opt <<< {path})
      .then -> res it
      .catch -> rej it

if module? => module.exports = xfl
else if window? => window.xfl = xfl
