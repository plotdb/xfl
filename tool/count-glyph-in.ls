require! <[yargs @plotdb/opentype.js]>

argv = yargs
  .usage "usage: count-glyph-in filename"
  .help \help
  .alias \help, \h
  .check (argv, options) ->
    if !argv._.0 => throw new Error("missing file")
    return true
  .argv

file = argv._.0
opentype.load file .then (f) ->
  console.log "#{f.glyphs.length} glyphs in #file"
  len = [f for f of f.glyphs.glyphs].length
  console.log "#{len} glyphs in #file"
