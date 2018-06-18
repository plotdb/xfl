cfl = do
  fonts: {}
  load: (path, options={}, callback) ->
    if !path => return
    xhr = new XMLHttpRequest!
    path = path.replace /\/$/, ''
    name = options.font-name or (path.split("/").filter(->it)[* - 1])
    if @fonts[path] => return
    slug = (options.font-name or Math.random!toString(16).substring(2))
    @fonts[path] = {name, path, className: "font-#slug", hit: {}}
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
      idxlist = [k for k of @hit]
      css = ""
      for idx in idxlist =>
        css += """
        @font-face {
          font-family: #{name}-#{idx};
          src: url(#path/#idx.woff2) format('woff2');
        }
        """
      idxlist = idxlist.map(-> "#{name}-#it").join(\,)
      css += ".#{@className} { font-family: #idxlist; }"
      node = cfl.node or document.createElement("style")
      node.textContent = css
      if cfl.node => return
      node.setAttribute \type, 'text/css'
      document.body.appendChild node
      cfl.node = node

    xhr.addEventListener \readystatechange, ~>
      if xhr.readyState != 4 => return
      hash = {}
      xhr.responseText.split(\\n).map (d,i) -> d.split(' ').map (e,j) -> hash[e] = (i + 1)
      @fonts[path].code-to-set = hash
      cb = (if typeof(options) == 'function' => options else callback)
      if cb => cb @fonts[path]
    xhr.open \GET, "#path/charmap.txt"
    xhr.send!


# sample usage
/*
<- $ document .ready
cfl.load "/fonts/hensan/", {font-name: 'hensan'}, (font) ->
  textarea = document.querySelector \textarea
  textarea.addEventListener \keyup, -> font.sync textarea.value
  textarea.classList.add font.className
  console.log document.body.textContent
  font.sync document.body.textContent
*/
