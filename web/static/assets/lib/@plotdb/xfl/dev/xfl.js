(function(){
  var err, xfont, xfl;
  err = function(e){
    e == null && (e = {});
    return import$(new Error(), import$({
      name: 'lderror'
    }, e));
  };
  xfont = function(opt){
    var ref$, that, this$ = this;
    opt == null && (opt = {});
    this.opt = opt;
    this.sub = {
      set: {},
      font: {}
    };
    this.cjkOnly = opt.cjkOnly || false;
    this.otf = {
      font: null,
      dirty: true
    };
    this.path = opt.path;
    this.name = opt.name || (ref$ = this.path.replace(/\.[a-zA-Z0-9]+$/, '').split("/").filter(function(it){
      return it;
    }))[ref$.length - 1];
    this.style = 'normal';
    this.ext = opt.ext || (/\.([a-zA-Z0-9]+)$/.exec(this.path) || [])[1] || '';
    this.format = (that = this.ext.toLowerCase()) ? that === 'ttf'
      ? 'truetype'
      : that === 'otf' ? 'truetype' : that : '';
    if (this.format) {
      this.format = "format('" + this.format + "')";
    }
    this.className = "xfl-" + this.name + "-" + Math.random().toString(36).substring(2);
    this.isXl = !this.ext;
    this.css = '';
    this.init = proxise.once(function(){
      return this$._init();
    });
    return this;
  };
  xfont.prototype = import$(Object.create(Object.prototype), {
    _init: function(){
      return Promise.resolve().then(function(){
        var this$ = this;
        if (!this.isXl) {
          return this.css = "@font-face {\n  font-family: " + this.name + ";\n  src: url(" + this.path + ") " + this.format + ";\n}\n." + this.className + " { font-family: \"" + this.name + "\"; }";
        } else {
          return new Promise(function(res, rej){
            var xhr;
            xhr = new XMLHttpRequest();
            xhr.addEventListener('readystatechange', function(){
              if (xhr.readyState !== XMLHttpRequest.DONE) {
                return;
              }
              if (xhr.status !== 200) {
                return rej(err({
                  code: xhr.status,
                  message: xhr.responseText
                }));
              }
              this$.codemap = {};
              (xhr.responseText || '').split('\n').map(function(d, i){
                return d.split(' ').map(function(e, j){
                  return this$.codemap[e] = i + 1;
                });
              });
              return res();
            });
            xhr.open('GET', this$.path + "/charmap.txt");
            return xhr.send();
          });
        }
      });
    },
    _fetch: function(f, dofetch){
      var this$ = this;
      f == null && (f = {});
      dofetch == null && (dofetch = false);
      if (!dofetch) {
        if (!f.url) {
          if (this.isXl) {
            f.url = this.path + "/" + f.key + ".woff2";
            f.type = 'woff2';
          } else {
            f.url = this.path;
            f.type = this.ext.toLowerCase();
          }
        }
        return Promise.resolve(f);
      }
      if (f.blob) {
        return Promise.resolve(f);
      }
      if (!f.proxy) {
        f.proxy = proxise(function(f){
          var p;
          if (f.running) {
            return;
          }
          f.running = true;
          p = new Promise(function(res, rej){
            var xhr;
            if (f.blob) {
              return res(f);
            }
            xhr = new XMLHttpRequest();
            xhr.addEventListener('readystatechange', function(){
              if (xhr.readyState !== XMLHttpRequest.DONE) {
                return;
              }
              if (xhr.status !== 200) {
                return rej(err({
                  code: xhr.status,
                  message: xhr.responseText
                }));
              }
              this$.otf.dirty = true;
              f.url = URL.createObjectURL(xhr.response);
              f.blob = xhr.response;
              f.type = this$.ext.toLowerCase() || 'ttf';
              return res(f);
            });
            if (this$.isXl) {
              xhr.open('GET', this$.path + "/" + f.key + ".ttf");
            } else {
              xhr.open('GET', this$.path);
            }
            xhr.responseType = 'blob';
            return xhr.send();
          });
          return p['finally'](function(){
            return f.running = false;
          });
        });
      }
      return f.proxy(f);
    },
    fetch: function(list, dofetch){
      var ps, this$ = this;
      list == null && (list = []);
      dofetch == null && (dofetch = false);
      if (!this.isXl) {
        if (this.sub.font[0].blob) {
          return Promise.resolve();
        }
        list = [0];
      }
      ps = Array.from(new Set(list.map(function(it){
        return it;
      }))).filter(function(it){
        return !this$.sub.font[it];
      }).map(function(it){
        var f;
        this$.sub.font[it.key] = f = {
          key: it.key
        };
        return this$._fetch(f, dofetch);
      });
      return Promise.all(ps).then(function(){
        var css, k, ref$, f;
        css = "." + this$.className + " { font-family: " + this$.name + "; }";
        for (k in ref$ = this$.sub.font) {
          f = ref$[k];
          css += "@font-face {\n  font-family: " + this$.name + ";\n  src: url(" + f.url + ") format('" + f.type + "');\n}";
        }
        return this$.css = css;
      });
    },
    getotf: function(){
      var this$ = this;
      if (!(typeof opentype != 'undefined' && opentype !== null)) {
        return Promise.reject(err({
          id: 1022,
          message: "[@plotdb/xfl] need opentype.js to merge subfonts"
        }));
      }
      if (!this.otf.dirty) {
        return Promise.resolve(this.otf.font);
      }
      return Promise.resolve().then(function(){
        if (!this$.isXl) {
          return this$.fetch();
        }
      }).then(function(){
        var ps, k, f;
        ps = (function(){
          var ref$, results$ = [];
          for (k in ref$ = this.sub.font) {
            f = ref$[k];
            results$.push(f);
          }
          return results$;
        }.call(this$)).map(function(f){
          if (f.otf) {
            return Promise.resolve(f);
          } else {
            return opentype.load(f.url).then(function(it){
              f.otf = it;
              return f;
            });
          }
        });
        return Promise.all(ps);
      }).then(function(list){
        var glyphs, ref$, ref1$;
        list == null && (list = []);
        if (list.length === 1) {
          return list[0].otf;
        }
        glyphs = list.map(function(f){
          var glyphs, i$, to$, i, results$ = [];
          glyphs = f.otf.glyphs;
          for (i$ = 1, to$ = glyphs.length; i$ <= to$; ++i$) {
            i = i$;
            results$.push(glyphs.glyphs[i]);
          }
          return results$;
        }).reduce(function(a, b){
          return a.concat(b);
        }, []).filter(function(it){
          return it;
        });
        return this$.otf.font = new opentype.Font((ref1$ = {
          familyName: this$.name,
          styleName: this$.style || 'normal',
          glyphs: glyphs
        }, ref1$.unitsPerEm = (ref$ = list[0].otf).unitsPerEm, ref1$.ascender = ref$.ascender, ref1$.descender = ref$.descender, ref1$));
      });
    },
    sync: function(txt){
      var ref$, misschar, missset, this$ = this;
      txt == null && (txt = "");
      if (!this.isXl) {
        return Promise.resolve();
      }
      ref$ = [{}, {}], misschar = ref$[0], missset = ref$[1];
      return Promise.resolve().then(function(){
        var i$, to$, i, code, setIdx, k;
        for (i$ = 0, to$ = txt.length; i$ < to$; ++i$) {
          i = i$;
          code = txt.charCodeAt(i);
          if (this$.cjkOnly && !xfl.isCJK(code)) {
            continue;
          }
          setIdx = this$.codemap[code.toString(16)];
          if (!setIdx) {
            misschar[txt[i]] = true;
          } else if (!this$.hit[setIdx]) {
            this$.hit[setIdx] = missset[setIdx] = true;
          }
        }
        misschar = (function(){
          var results$ = [];
          for (k in misschar) {
            results$.push(k);
          }
          return results$;
        }()).filter(function(it){
          return it.trim();
        });
        if (misschar.length) {
          console.log("[@plotdb/xfl] sync xl-font with following chars unsupported: " + misschar.join(''));
        }
        return this$.fetch((function(){
          var results$ = [];
          for (k in missset) {
            results$.push(k);
          }
          return results$;
        }()));
      });
    }
  });
  xfl = {
    range: {
      CJK: [[0x3040, 0x30ff], [0x3400, 0x4dbf], [0x4e00, 0x9fff], [0xf900, 0xfaff], [0xff66, 0xff9f], [0x3131, 0xD79D]]
    },
    fonts: {},
    running: {},
    isCJK: function(code){
      return this.range.CJK.filter(function(it){
        return code >= it[0] && code <= it[1];
      }).length;
    },
    update: function(){
      var css, k, v, node;
      css = (function(){
        var ref$, results$ = [];
        for (k in ref$ = this.fonts) {
          v = ref$[k];
          results$.push(v.css || '');
        }
        return results$;
      }.call(this)).join('\n');
      node = this.node || document.createElement("style");
      node.textContent = css;
      if (this.node) {
        return;
      }
      node.setAttribute('type', 'text/css');
      document.body.appendChild(node);
      return this.node = node;
    },
    _load: function(opt){
      var path, this$ = this;
      opt == null && (opt = {});
      path = opt.path;
      if (this.running[path]) {
        return;
      }
      this.running[path] = true;
      return Promise.resolve().then(function(){
        var fobj;
        return this$.fonts[path] = fobj = new xfont(opt);
      })['finally'](function(){
        return this$.running[path] = false;
      }).then(function(it){
        return this$.proxy[path].resolve(it);
      })['catch'](function(it){
        return this$.proxy[path].reject(it);
      });
    },
    load: function(opt){
      var this$ = this;
      opt == null && (opt = {});
      return new Promise(function(res, rej){
        var path, that, ref$;
        if (!(path = opt.path)) {
          return rej(err({
            id: 400
          }));
        }
        path = path.replace(/\/$/, '');
        if (that = this$.fonts[path]) {
          return res(that);
        }
        if (this$.proxy[path]) {
          this$.proxy[path].push(proxise(function(it){
            return this$._load(it);
          }));
        }
        return this$.proxy[path]((ref$ = import$({}, opt), ref$.path = path, ref$)).then(function(it){
          return res(it);
        })['catch'](function(it){
          return resj(it);
        });
      });
    }
  };
  if (typeof module != 'undefined' && module !== null) {
    module.exports = xfl;
  } else if (typeof window != 'undefined' && window !== null) {
    window.xfl = xfl;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);