# @plotdb/xfl

`X`L-`F`ont `L`oader - Subset font loader / generator, mainly for supporting fonts with big file sizes, such as CJK fonts. Features:

 - word frequency based font subsetting
 - partial / lazy loading of subsetted fonts based on glyphs used
 - no backend dependency ( static font subsetting )
   - still possible to be extended to support dynamic font subsetting.


## Installation

This is a javascript project based on nodeJS / npm. After installing node / npm, install with following:

    npm install --save @plotdb/xfl


## xl-font subsetting generator

use `npx xfl` to subset fonts with `xfl`:

    npx xfl <font-dir> -f <word-frequency-csv> -o <output-dir> -c <major-subset-size> -s <subset-size>


where:

 - `font-dir`: root dir containing your font files.
   - `xfl` lists all font files under `font-dir`, and subset them into `output-dir`.
   - support font format:
     - ttf ( truetype )
     - otf ( opentype )
 - `output-dir`: dir to put subsetted fonts, in subfolders named after the corresponding font files.
 - `word-frequency-csv`: desired word frequency information, in `csv` format.
   - use sample csv ( `tool/data/word-frequency.csv` ) if omitted.
   - sample csv is for tranditional Chinese, derived from [moe.gov.tw](http://language.moe.gov.tw/001/Upload/files/SITE_CONTENT/M0001/86NEWS/download/86rest17.TXT)
 - `major-subset-size`: how many glyphs to put in the major subset. default 1500 if omitted.
 - `subset-size`: how many glyphs to put in other subsets. default 100 if omitted.

Generally speaking, the steps of font subsetting by `xfl` are as following:

 - join all unicodes from glyphs available in fonts and the codes listed in word frequency files
 - sort above unicode list based on word frequency information.
 - create the major subset ( 1.ttf ), containing <major-subset-size> glyphs.
   - punctuation ( 0xff00 ~ 0xffef )
   - ascii characters ( 0x00 ~ 0xff )
   - the most commonly used codes, by word frequency information.
 - create subsets based on the remaining codes, each contains <subset-size> glyphs.
 - font subsets are named after set index, start from 1. Includes ttf, woff and woff2 format.
 - dump unicode / subset mapping to `charmap.txt`. also keep the original font as `all.ttf`.


## xl-font subset loader

include the locally installed dist files or from cdn:

    <script src="path-to/xfl.js"></script>


Then, load desired font:

    xfl.load("path-to-subset-font-folder").then(function(font) {
        ...
    });

Sync font based on given text:

    xfl.load("path-to-subset-font-folder").then(function(font) {
        font.sync("含有這些字的字型子集會被載入。Subset containgin glyphs from these chars will be loaded.");
    });



Font object API:

 - `init()`: init this font object. `xfl.load` will do this job for you.
 - `sync(text)`: load fonts based on given text.
 - `getotf()`: return `opentype.Font` from `opentype.js`.
   - `opentype.js` is required for this method
   - `fetchAll()` will be called by this method.
 - `fetchAll()`: by default `xfl` use CSS to load fonts. `fecthAll()` fetch all subset fonts with JS again.
 - `name`: font name which can be used in CSS `font-family` property.
 - `className`: a CSS class name which its `font-family` is assigned to this font.


## availabel xl-fonts

While this is a tool for composing and using xl-font, we also prepare a set of xl-fonts so you can use them directly with `xfl.js`. All fonts are released under `SIL-Open Font License 1.1` or similar open licenses.

    https://plotdb.com/xl-fonts



## Todo

 - optimization
   - consider glyphs relationship by moedict + clustering to reduce cache miss rate.
   - font minification in advance, if possible
   - support single request for multiple subset
   - dynamic font subsettings
 - quality
   - fill missing glyphs by GAN.
   - make more SIL-Open licensed fonts?

## Resources

 - Google Font also use similar technologies to load chinese font. see:
   - https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization
   - sample CSS: https://fonts.googleapis.com/css?family=Zhi-Mang-Xing&display=swap


## LICENSE

MIT License.
