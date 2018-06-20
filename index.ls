<- $ document .ready

base = \https://plotdb.github.io/xl-fontset/alpha/
#base = \alpha/ # for local testing

editor = do
  init: ->
    @textarea = document.querySelector \textarea
    @textarea.addEventListener \keyup, ~> @sync!
    document.querySelector \#chooser .addEventListener \click, (e) ~>
      if !e or !e.target => return
      [font,type] = [e.target.getAttribute(\data-font), e.target.getAttribute(\data-type)]
      if !font => return
      if type == \en =>
        xfl.load "fonts/#font.ttf", ~>
          @font = it
          @sync!
      else @load font
    @load \王漢宗細圓
  load: (font) ->
    xfl.load "#base/#font", (font) ~>
      @font = font
      @font.sync document.body.innerText
      @sync!
  sync: ->
    if !@font => return
    @font.sync @textarea.value
    @textarea.setAttribute \class, "form-control #{@font.className}"
    document.body.setAttribute \class, "#{@font.className}"

editor.init!

xfl.load "#base/王漢宗超明", (font) ->
  headlines = Array.from(document.querySelectorAll 'h1,h2,h3')
  texts = headlines.map(-> it.innerText).join('')
  font.sync texts
  headlines.map -> it.classList.add font.className
