#!/usr/bin/env node
(function(){
  var fs, fsExtra, opentype, yargs, path, colors, progress, ttf2woff2, ttf2woff, argv, libdir, commonRanges, commonSize, setSize, fontDir, outDir, defaultFrequencyFile, progressBar, fontFileFinder, wordFrequency, codeInFont, files, wordlist, wordfreq, iterateCodes, ttfToWoff2s, processFont, processFonts;
  fs = require('fs');
  fsExtra = require('fs-extra');
  opentype = require('@plotdb/opentype.js');
  yargs = require('yargs');
  path = require('path');
  colors = require('colors');
  progress = require('progress');
  ttf2woff2 = require('ttf2woff2');
  ttf2woff = require('ttf2woff');
  argv = yargs.usage("usage: npx xfl font-dir [-o output-dir] [-c major-subset-size] [-s subset-size]").option('output', {
    alias: 'o',
    description: "output directory. default `./output/`",
    type: 'string'
  }).option('major-subset-size', {
    alias: 'c',
    description: "major-subset-size, default 1500",
    type: 'number'
  }).option('subset-size', {
    alias: 's',
    description: "subset-size, default 100",
    type: 'number'
  }).option('word-frequency', {
    alias: 'f',
    description: "word frequency csv file path",
    type: 'number'
  }).help('help').alias('help', 'h').check(function(argv, options){
    if (!argv._[0]) {
      throw new Error("missing font dir");
    }
    return true;
  }).argv;
  libdir = path.dirname(fs.realpathSync(__filename));
  commonRanges = [[0, 0xff], [0xff00, 0xffef]];
  commonSize = argv.c || 1500;
  setSize = argv.s || 100;
  fontDir = argv._[0] || "../fonts";
  outDir = argv.o || "../output";
  defaultFrequencyFile = path.join(libdir, '..', 'tool', 'data', 'word-frequency.csv');
  if (!fs.existsSync(fontDir)) {
    console.log(fontDir + " directory not found.");
    process.exit(-1);
  }
  progressBar = function(total, text){
    var bar;
    total == null && (total = 10);
    text == null && (text = "converting");
    bar = new progress("   " + text + " [" + ':bar'.yellow + "] " + ':percent'.cyan + " :etas", {
      total: total,
      width: 60,
      complete: '#'
    });
    return bar;
  };
  fontFileFinder = function(parent){
    var files, ret, i$, len$, file;
    files = fs.readdirSync(parent).map(function(it){
      return parent + "/" + it;
    });
    ret = [];
    for (i$ = 0, len$ = files.length; i$ < len$; ++i$) {
      file = files[i$];
      if (fs.statSync(file).isDirectory()) {
        ret = ret.concat(fontFileFinder(file));
      } else if (/\.[ot]tf$/.exec(file)) {
        ret.push(file);
      }
    }
    return ret;
  };
  wordFrequency = function(file){
    var list, i$, ref$, len$, range, i;
    if (!file) {
      file = defaultFrequencyFile;
    }
    list = fs.readFileSync(file).toString().split('\n').map(function(it){
      return it.split(',');
    }).filter(function(it){
      return it && it.length && it.length >= 2 && it[0] && !isNaN(+it[1]);
    }).map(function(it){
      return [it[0].charCodeAt(0), +it[1]];
    });
    for (i$ = 0, len$ = (ref$ = commonRanges).length; i$ < len$; ++i$) {
      range = ref$[i$];
      list = (fn$()).concat(list);
    }
    return list;
    function fn$(){
      var i$, to$, results$ = [];
      for (i$ = range[0], to$ = range[1]; i$ <= to$; ++i$) {
        i = i$;
        results$.push([i, -1]);
      }
      return results$;
    }
  };
  codeInFont = function(font){
    return new Promise(function(res, rej){
      if (!font || !fs.existsSync(font)) {
        return rej(new Error("font file not found"));
      }
      return opentype.load(font, function(e, font){
        var ret, glyphs, k, ref$, glyph;
        ret = [];
        if (e) {
          return rej(new Error(e));
        }
        glyphs = font.glyphs.glyphs;
        for (k in ref$ = font.glyphs.glyphs) {
          glyph = ref$[k];
          ret = ret.concat([glyph.unicode].concat(glyph.unicodes || []));
        }
        ret = Array.from(new Set(ret.filter(function(it){
          return it;
        })));
        return res(ret);
      });
    });
  };
  files = fontFileFinder(fontDir);
  files = files.filter(function(it){
    return !/NotoSerifCJKtc-Black|SoukouMincho/.exec(it);
  });
  wordlist = wordFrequency();
  wordfreq = Object.fromEntries(wordlist);
  iterateCodes = function(data){
    return new Promise(function(res, rej){
      var font, count, i$, to$, i, code, k, v, glyphs, notdef, ref$, glyph, unicodes, list, res$, hash, bar, _;
      font = data.otfont;
      count = 0;
      for (i$ = 0, to$ = data.list.length; i$ < to$; ++i$) {
        i = i$;
        code = data.list[i];
        if (code && !isNaN(code) && data.codeAvailable[code] && !data.codeToSet[code]) {
          delete data.codeAvailable[code];
          data.codeToSet[code] = data.setIdx;
          count++;
        }
        if ((data.setIdx === 1 && count >= commonSize) || (data.setIdx > 1 && count >= setSize)) {
          count = 0;
          data.setIdx++;
        }
      }
      console.log("   - total " + Array.from(new Set((function(){
        var ref$, results$ = [];
        for (k in ref$ = data.codeToSet) {
          v = ref$[k];
          results$.push(v);
        }
        return results$;
      }()))).length + " subsets will be created.");
      glyphs = {};
      notdef = font.glyphs.get(0);
      notdef.name = '.notdef';
      for (k in ref$ = font.glyphs.glyphs) {
        glyph = ref$[k];
        if (glyph.name === '.notdef') {
          continue;
        }
        unicodes = Array.from(new Set(([glyph.unicode].concat(glyph.unicodes || [])).filter(fn$)));
        unicodes.map(fn1$);
      }
      res$ = [];
      for (k in glyphs) {
        v = glyphs[k];
        res$.push({
          idx: +k,
          glyphs: [notdef].concat(v),
          codes: v.map(fn2$)
        });
      }
      list = res$;
      hash = {};
      list.map(function(item){
        item.glyphs = item.glyphs.filter(function(it){
          var v;
          v = hash[it.unicode] = (hash[it.unicode] || 0) + 1;
          return v < 2;
        });
        return item.codes = item.glyphs.map(function(it){
          return it.unicode;
        }).filter(function(it){
          return it;
        });
      });
      data.bar = bar = progressBar(list.length + 1, "subsetting");
      bar.tick();
      fsExtra.ensureDirSync(path.join(outDir, data.basename));
      _ = function(idx){
        var item, p;
        idx == null && (idx = 0);
        if (!(item = list[idx])) {
          return res(data);
        }
        if (true && 'use opentype.js') {
          p = new Promise(function(res, rej){
            var nf, ref$;
            nf = new opentype.Font((ref$ = {
              glyphs: item.glyphs,
              familyName: font.names.fontFamily.en,
              styleName: font.names.fontSubfamily.en
            }, ref$.unitsPerEm = font.unitsPerEm, ref$.ascender = font.ascender, ref$.descender = font.descender, ref$));
            return fs.writeFile(path.join(outDir, data.basename, item.idx + ".ttf"), Buffer.from(nf.toArrayBuffer()), function(e){
              if (e) {
                return rej(e);
              } else {
                return res();
              }
            });
          });
        } else {
          p = new Promise(function(res, rej){
            var ref$, filename, basename, codes, fm, e;
            try {
              ref$ = {
                filename: data.filename,
                basename: data.basename,
                codes: data.codes
              }, filename = ref$.filename, basename = ref$.basename, codes = ref$.codes;
              fm = new fontmin().src(filename);
              if (/\.otf$/.exec(filename)) {
                fm.use(fontmin.otf2ttf());
              }
              return fm.dest(path.join(outDir, basename)).use(gulpRename(item.idx + ".ttf")).use(fontmin.glyph({
                text: item.codes.map(function(it){
                  return String.fromCharCode(it);
                }).join('')
              })).run(function(e, f){
                if (e) {
                  return rej(new Error(e));
                }
                return res(f);
              });
            } catch (e$) {
              e = e$;
              return rej(new Error(e));
            }
          });
        }
        return p['finally'](function(){
          return bar.tick();
        }).then(function(){
          return _(idx + 1);
        })['catch'](function(it){
          console.log("[subset] rejection: ", it);
          return _(idx + 1);
        });
      };
      return _();
      function fn$(it){
        return it;
      }
      function fn1$(uc){
        var key$;
        return (glyphs[key$ = data.codeToSet[uc] || 1] || (glyphs[key$] = [])).push(glyph);
      }
      function fn2$(it){
        return it.unicode;
      }
    });
  };
  ttfToWoff2s = function(data){
    return new Promise(function(res, rej){
      var ttfs, bar, _, e;
      try {
        ttfs = fs.readdirSync(path.join(outDir, data.basename)).filter(function(it){
          return /\.ttf$/.exec(it);
        }).filter(function(it){
          return !/all/.exec(it);
        }).map(function(it){
          return path.join(outDir, data.basename, it);
        });
        bar = progressBar(2 * ttfs.length + 2, "converting");
        bar.tick();
        _ = function(){
          var file, ttfbuf;
          if (!ttfs || !ttfs.length) {
            bar.tick();
            return res(data);
          }
          file = ttfs.splice(0, 1)[0];
          if (!file) {
            return _();
          }
          ttfbuf = fs.readFileSync(file);
          return fs.writeFile(file.replace(/\.ttf$/, '.woff'), ttf2woff(new Uint8Array(ttfbuf)).buffer, function(){
            bar.tick();
            return fs.writeFile(file.replace(/\.ttf$/, '.woff2'), ttf2woff2(ttfbuf), function(){
              bar.tick();
              return _();
            });
          });
        };
        return _();
      } catch (e$) {
        e = e$;
        console.log(e);
        return rej(new Error(e));
      }
    });
  };
  processFont = function(filename){
    return new Promise(function(res, rej){
      return codeInFont(filename).then(function(fontCodes){
        var ref$, codeAvailable, codeToSet, codes, idx, setIdx, count, i$, len$, code, list, data;
        ref$ = [{}, {}], codeAvailable = ref$[0], codeToSet = ref$[1];
        ref$ = [[], 0, 1, 0], codes = ref$[0], idx = ref$[1], setIdx = ref$[2], count = ref$[3];
        for (i$ = 0, len$ = fontCodes.length; i$ < len$; ++i$) {
          code = fontCodes[i$];
          codeAvailable[code] = true;
        }
        list = Array.from(new Set(wordlist.map(function(it){
          return it[0];
        }).concat(fontCodes))).filter(function(it){
          return codeAvailable[it];
        }).sort(function(b, a){
          a = wordfreq[a];
          b = wordfreq[b];
          if (!(a != null && b != null)) {
            return 0;
          }
          if (!(b != null)) {
            return 1;
          }
          if (!(a != null)) {
            return -1;
          }
          if (a < 0 && b < 0) {
            return 0;
          }
          if (a < 0) {
            return 1;
          }
          if (b < 0) {
            return -1;
          }
          return a - b;
        });
        console.log("   - " + fontCodes.length + " code available.");
        data = {
          filename: filename,
          codeAvailable: codeAvailable,
          codeToSet: codeToSet,
          codes: codes,
          setIdx: setIdx,
          list: list,
          failed: [],
          basename: path.basename(filename).replace(/\.[ot]tf$/, '')
        };
        return opentype.load(data.filename).then(function(font){
          data.otfont = font;
          return iterateCodes(data);
        });
      }).then(function(data){
        console.log("   - subsetted into " + data.setIdx + " pieces.");
        fsExtra.copySync(filename, path.join(outDir, data.basename, "all.ttf"));
        if (data.bar) {
          data.bar.tick();
        }
        console.log("   - converting to woff/woff2...");
        return ttfToWoff2s(data);
      }).then(function(data){
        var failedSet, res$, i$, ref$, len$, it, item, k, v, idxMap, charmap;
        if (data.failed.length) {
          console.log("   - some subset failed to be created due to following reason: ".yellow);
          res$ = [];
          for (i$ = 0, len$ = (ref$ = data.failed).length; i$ < len$; ++i$) {
            it = ref$[i$];
            res$.push(it[0]);
          }
          failedSet = res$;
          for (i$ = 0, len$ = (ref$ = data.failed).length; i$ < len$; ++i$) {
            item = ref$[i$];
            console.log("     subset " + item[0] + ": " + item[1]);
          }
          for (k in ref$ = data.codeToSet) {
            v = ref$[k];
            if (~failedSet.indexOf(v)) {
              delete data.codeToSet[k];
            }
          }
        }
        idxMap = {};
        for (k in ref$ = data.codeToSet) {
          v = ref$[k];
          (idxMap[v] || (idxMap[v] = [])).push((+k).toString(16));
        }
        charmap = (function(){
          var ref$, results$ = [];
          for (k in ref$ = idxMap) {
            v = ref$[k];
            results$.push(v);
          }
          return results$;
        }()).map(function(it){
          return it.join(' ');
        }).join('\n');
        fs.writeFileSync(path.join(outDir, data.basename, "charmap.txt"), charmap);
        console.log("   - process done. ".green);
        console.log(" ");
        return res();
      })['catch'](function(it){
        console.log("   - process failed due to following reason: ".red);
        console.log(it);
        console.log("");
        return rej();
      });
    });
  };
  processFonts = function(files){
    return new Promise(function(res, rej){
      var data, ref$, total, count, _, e;
      try {
        data = {
          passed: [],
          failed: []
        };
        ref$ = [files.length, 0], total = ref$[0], count = ref$[1];
        console.log((" * total " + total + " files to process...").cyan);
        _ = function(){
          var file;
          if (!files || !files.length) {
            return res(data);
          }
          file = files.splice(0, 1)[0];
          if (!file) {
            return _();
          }
          count = count + 1;
          console.log((" * Process " + file + " ( " + count + "/" + total + " ) ").cyan);
          return processFont(file).then(function(){
            data.passed.push(fil);
            return _();
          })['catch'](function(){
            data.failed.push(file);
            return _();
          });
        };
        return _();
      } catch (e$) {
        e = e$;
        return rej(new Error(e));
      }
    });
  };
  processFonts(files).then(function(data){
    console.log(" * all fonts processed. ");
    console.log(" * statistics: ");
    console.log(("   - passed:  [ " + data.passed.length + " ]").green);
    console.log(("   - partial passed: [ " + data.failed.length + " ]").yellow);
    console.log(" * finished.");
    return console.log("");
  })['catch'](function(it){
    console.log("failed due to following reason: ".red);
    return console.log(it);
  });
}).call(this);
