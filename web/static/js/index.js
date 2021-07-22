var base, editor;
base = 'https://plotdb.github.io/xl-fontset/alpha/';
editor = {
  init: function(){
    var this$ = this;
    this.textarea = document.querySelector('textarea');
    this.textarea.addEventListener('keyup', function(){
      return this$.sync();
    });
    document.querySelector('#chooser').addEventListener('click', function(e){
      var ref$, font, type;
      if (!e || !e.target) {
        return;
      }
      ref$ = [e.target.getAttribute('data-font'), e.target.getAttribute('data-type')], font = ref$[0], type = ref$[1];
      if (!font) {
        return;
      }
      if (type === 'en') {
        return xfl.load("fonts/" + font + ".ttf", function(it){
          this$.font = it;
          return this$.sync();
        });
      } else {
        return this$.load(font);
      }
    });
    return this.load('王漢宗細黑');
  },
  load: function(font){
    var this$ = this;
    return xfl.load(base + "/" + font, function(font){
      this$.font = font;
      this$.font.sync(document.body.innerText);
      return this$.sync();
    });
  },
  sync: function(){
    if (!this.font) {
      return;
    }
    this.font.sync(this.textarea.value);
    this.textarea.setAttribute('class', "form-control " + this.font.className);
    return document.body.setAttribute('class', this.font.className + "");
  }
};
editor.init();
xfl.load(base + "/王漢宗超明", function(font){
  var headlines, texts;
  headlines = Array.from(document.querySelectorAll('h1,h2,h3'));
  texts = headlines.map(function(it){
    return it.innerText;
  }).join('');
  font.sync(texts);
  return headlines.map(function(it){
    return it.classList.add(font.className);
  });
});