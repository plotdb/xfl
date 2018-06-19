xfl = do
  fonts: {}

  load: (path, options={}, callback) ->
    if !path => return
    xhr = new XMLHttpRequest!
    path = path.replace /\/$/, ''
    name = options.font-name or (path.split("/").filter(->it)[* - 1])
    cb = (if typeof(options) == 'function' => options else callback)
    if @fonts[path] => return cb that
    slug = (options.font-name or Math.random!toString(16).substring(2))
    @fonts[path] = {name, path, className: "font-#slug", hit: {}, url: {}}
    @fonts[path].ajax = (idxlist, cb) ->
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

    @fonts[path].sync = (txt) ->
      hash = {}
      for i from 0 til txt.length =>
        code = txt.charCodeAt(i)
        # turn on this if CJK-only 
        # if !((code >= 0xff00 and code <= 0xffef) or (code >= 0x4e00 and code <= 0x9fff)) => continue
        set-idx = @code-to-set[code.toString 16]
        if !set-idx => console.log "missing char: ", txt[i]
        else if !@hit[set-idx] =>
          @hit[set-idx] = true
          hash[set-idx] = true
      <~ @ajax [k for k of @hit], _
      css = ""
      idxlist = [k for k of @hit]
      for idx in idxlist =>
        url = @url[idx] or "#path/#idx.woff2"
        css += """
        @font-face {
          font-family: #{name}-#{idx};
          src: url(#{url}) format('woff2');
        }
        """
      idxlist := idxlist.map(-> "#{name}-#it").join(\,)
      css += ".#{@className} { font-family: #idxlist; }"
      @css = css
      css = [(v.css or '') for k,v of xfl.fonts].join('\n')
      node = xfl.node or document.createElement("style")
      node.textContent = css
      if xfl.node => return
      node.setAttribute \type, 'text/css'
      document.body.appendChild node
      xfl.node = node

    xhr.addEventListener \readystatechange, ~>
      if xhr.readyState != 4 => return
      hash = {}
      xhr.responseText.split(\\n).map (d,i) -> d.split(' ').map (e,j) -> hash[e] = (i + 1)
      @fonts[path].code-to-set = hash
      if cb => cb @fonts[path]
    xhr.open \GET, "#path/charmap.txt"
    xhr.send!
