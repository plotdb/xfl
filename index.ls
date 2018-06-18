<- $ document .ready

editor = do
  init: ->
    @textarea = document.querySelector \textarea
    @textarea.addEventListener \keyup, ~> @sync!
    document.querySelector \#chooser .addEventListener \click, (e) ~>
      if !e or !e.target => return
      font = e.target.getAttribute \data-font 
      if !font => return
      @load font
    @load \王漢宗中楷注音體
  load: (font) ->
    xfl.load "https://plotdb.github.io/xl-fontset/alpha/#font", (font) ~>
      @font = font
      @font.sync document.body.innerText
      @sync!
  sync: ->
    if !@font => return
    @font.sync @textarea.value
    @textarea.setAttribute \class, "form-control #{@font.className}"
    document.body.setAttribute \class, "#{@font.className}"

editor.init!

xfl.load \https://plotdb.github.io/xl-fontset/alpha/王漢宗仿宋體, (font) ->
  headlines = Array.from(document.querySelectorAll 'h1,h2,h3')
  texts = headlines.map(-> it.innerText).join('')
  font.sync texts
  headlines.map -> it.classList.add font.className
