var base, editor;
base = 'https://plotdb.github.io/xl-fontset/alpha';
base = '/assets/fonts';
editor = {
  init: function(){
    var this$ = this;
    this.ldcv = new ldcover({
      root: document.querySelector('.ldcv')
    });
    this.ldld = new ldLoader({
      root: document.querySelector('.ldcv .inner .ld')
    });
    this.svg = document.querySelector('svg');
    this.path = document.querySelector('path');
    this.textarea = document.querySelector('textarea');
    this.textarea.addEventListener('keyup', function(){
      return this$.sync();
    });
    document.querySelector('#chooser').addEventListener('click', function(e){
      var target, p, ref$, font, type;
      if (!e || !e.target) {
        return;
      }
      target = e.target.getAttribute('data-target');
      if (target === 'svg') {
        return this$.toSvg();
      }
      p = ld$.parent(e.target, '[data-font]', document.querySelector('#chooser'));
      if (!p) {
        return;
      }
      ref$ = [p.getAttribute('data-font'), p.getAttribute('data-type')], font = ref$[0], type = ref$[1];
      if (!font) {
        return;
      }
      if (type === 'en') {
        return xfl.load({
          path: "fonts/" + font + ".ttf"
        }).then(function(it){
          this$.font = it;
          return this$.sync();
        });
      } else {
        return this$.load(font);
      }
    });
    return this.load('KleeOne-Regular');
  },
  toSvg: function(){
    var this$ = this;
    return this.ldld.on().then(function(){
      return this$.ldcv.toggle();
    }).then(function(){
      return this$.font.getotf();
    }).then(function(otf){
      var path, box, d, rbox, x, y;
      path = otf.getPath(this$.textarea.value.replace(/\s/g, ' '), 0, 0, 48);
      box = path.getBoundingBox();
      d = path.toPathData();
      rbox = this$.svg.getBoundingClientRect();
      x = rbox.width / 2 - (box.x2 - box.x1) / 2 - box.x1;
      y = rbox.height / 2 - (box.y2 - box.y1) / 2 - box.y1;
      this$.path.setAttribute('d', d);
      return this$.path.setAttribute('transform', "translate(" + x + ", " + y + ")");
    }).then(function(){
      return this$.ldld.off();
    });
  },
  load: function(font){
    var this$ = this;
    return xfl.load({
      path: base + "/" + font
    }).then(function(font){
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
xfl.load({
  path: base + "/SoukouMincho"
}).then(function(font){
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