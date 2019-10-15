xfl = do
  fonts: {}
  # TODO lets add a more accurate range
  isCJK: -> ((code >= 0xff00 and code <= 0xffef) or (code >= 0x4e00 and code <= 0x9fff))
  load: (path, options={}, callback) ->
    if !path => return
    [path, cb] = [
      path.replace(/\/$/, ''),
      (if typeof(options) == 'function' => options else callback)
    ]
    if @fonts[path] => return (if cb => cb @fonts[path] else null)
    [ext, name, slug] = [
      ((/\.([a-zA-Z0-9]+)$/.exec(path) or []).1 or '').toLowerCase!,
      options.font-name or (path.replace(/\.[a-zA-Z0-9]+$/,'').split("/").filter(->it)[* - 1]),
      (options.font-name or Math.random!toString(16).substring(2))
    ]
    @fonts[path] = font = do
      name: name
      path: path
      options: options
      className: "xfl-#slug"
      code-to-set: {}  # convert unicode to the set idx that contains this code. load from charmap.txt
      hit: {} # is specific set been hit? hashed by index
      url: {} # blob URL for specific set, hashed by index
      ext: if ext and ~(<[woff2 woff eot ttf otf]>.indexOf(ext)) => ext else null

    # TODO support patterns like https://PATH/TO/FONT/1+2+3.ttf for faster request
    font.ajax = (idxlist, cb) ->
      check = ~> if idxlist.map(~>@url[it]).filter(->it).length == idxlist.length => return cb!
      idxlist.map (d,i) ~>
        if @url[d] => return check!
        xhr = new XMLHttpRequest!
        xhr.addEventListener \readystatechange, ~>
          if xhr.readyState != 4 => return
          @url[d] = URL.createObjectURL(xhr.response)
          return check!
        xhr.open \GET, "#path/#d.ttf"
        xhr.responseType = \blob
        xhr.send!

    font.sync = (txt = "", cb) ->
      # fonts with file extension will be treated as needing directly download
      if @nosync => return (if cb => cb! else '')
      [misschar, missset]= [{}, {}]
      for i from 0 til txt.length =>
        code = txt.charCodeAt(i)
        if options.cjk-only and !xfl.isCJK(code) => continue
        set-idx = @code-to-set[code.toString 16]
        if !set-idx => misschar[txt[i]] = true
        else if !@hit[set-idx] => @hit[set-idx] = missset[set-idx] = true
      misschar = [k for k of misschar].filter(->it.trim!)
      if misschar.length => console.log "not supported chars: #{misschar.join('')}"
      <~ @ajax [k for k of missset], _
      [css, idxlist] = ["", [k for k of @hit]]
      for idx in idxlist =>
        url = @url[idx] or "#path/#idx.woff2"
        css += """
        @font-face {
          font-family: #{name};
          src: url(#{url}) format('woff2');
        }
        """
      names = idxlist.map(-> "#{name}-#it").join(\,)
      css += ".#{@className} { font-family: #name; }"
      @css = css
      xfl.update!
      if cb => cb!

    if font.ext => # load directly if path has extension ...
      font.nosync = true
      format = if font.ext and font.ext != 'ttf' => "format('#{font.ext}')" else ''
      font.css = """
      @font-face {
        font-family: #name;
        src: url(#path) #format;
      }
      .#{font.className} { font-family: "#name"; }"""
      xfl.update!
      if cb => return cb font
    else # ... else treat it as a subsetted font set
      xhr = new XMLHttpRequest!
      xhr.addEventListener \readystatechange, ~>
        if xhr.readyState != 4 => return
        hash = {}
        xhr.responseText.split(\\n).map (d,i) -> d.split(' ').map (e,j) -> hash[e] = (i + 1)
        font.code-to-set = hash
        if cb => return cb font
      xhr.open \GET, "#path/charmap.txt"
      xhr.send!
  update: ->
    css = [(v.css or '') for k,v of xfl.fonts].join('\n')
    node = xfl.node or document.createElement("style")
    node.textContent = css
    if xfl.node => return
    node.setAttribute \type, 'text/css'
    document.body.appendChild node
    xfl.node = node
