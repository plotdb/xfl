xl-fontload
=======

中文字型網路化。 依詞頻切割字型，並透過前端實作 lazy loading。 無需後端程式支援。

 * 字頻檔 ( word-frequency.csv )
   示範檔來源: [教育部](http://language.moe.gov.tw/001/Upload/files/SITE_CONTENT/M0001/86NEWS/download/86rest17.TXT)
 * 列舉轉換字型. 放置在 fonts/ 目錄, 結構不拘. 自動搜尋所有 .ttf 結尾檔案.
 * 針對每一字型:
   * 列舉所有支援字符
   * 其中常用五百字、標點符號、英文字母、數字等，做為第一字型檔
   * 接下來，剩餘字符有出現在詞頻表中者，依字頻每一百字組成一字型檔.
   * 剩餘未對應字，每一百字組成一字型檔.
   * 所有字型檔置於同一目錄中，檔名以數字區隔.
   * 輸出字碼 / 字型檔編號對應表, 供前端快查.



Usage / Compiler
----------------

 * 此專案使用 nodejs, 請先安裝 nodejs 與 npm ，並利用 npm install 建利 node_modules 目錄。
   參考指令: 

       curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -
       npm install

 * 將欲轉換的字型整理至 fonts/ 目錄，目錄結構不拘。程式會自動掃出所有字型檔。
   - 目前只吃 ttf 檔唷～啾咪。
 * 準備字型檔 word-frequency.csv
 * 執行轉換程式 compile.sh 
 * 字型檔輸出於 assets/ 目錄.



Usage / Frontend
----------------

基本使用方式：

    xfl.load("http://path/to/scattered/font/folder/", options, function(font) {
        font.sync(stringToDisplay);
    })


根據即時內容動態載入字型的範例：

    /* assume we have "textarea" variable to be an input box accepting user input */
    xfl.load("http://path/to/scattered/font/folder/", options, function(font) {
       textarea.addEventListener("keyup", function() {
         font.sync(textarea.value);
       });
    })


若你沒有打算自幹字型檔，可以使用我們透過 Github Pages 準備的一組字型檔，專案庫的位置在[這裡](https://github.com/plotdb/xl-fontset/)，欲使用則可以透過這個網址：[http://plotdb.github.io/xl-fontset/alpha/<字型名稱>](http://plotdb.github.io/xl-fontset/alpha/<字型名稱>)，例如：

    xfl.load("http://plotdb.github.io/xl-fontset/alpha/瀨戶字体", function(font) { ...

請自行將「<字型名稱>」換成欲使用的字型即可。目前支援的字型一覽可在[這裡](https://github.com/plotdb/xl-fontset/tree/gh-pages/alpha)找到，包括王漢宗 42 字型、刻石錄、站酷、cwText-Q、瀨戶字体等共 57 種字型。

要注意的是目前字型檔轉換時仍有些問題，可能因此導致部份字型有缺字狀況。此外並非所有字型都包含了完整的中文字，請自行斟酌使用。


Options:

  * fontName - name used in font-family. default to be the basename of URL.
  * (TBD) text - preload files that contains text in this option.



未來方向
--------

 * 傳輸最佳化 ( Optimization )
   * 考慮到字符相關性，可透過萌典、特定語料庫建立字符空間，透過 clustering algorithm ( 如 K-means clustering ) 將相關字符分組做為字型切割依據，進而減少需要載入的檔案數量.
   * 進一步做檔案尺寸最佳化。
   * 提供 nginx 與 apache 組檔模組，讓瀏覽器可以透過單一 HTTP Request 取得必要檔案 ( 例如, GET https://path/to/font/1+2+3+4 ) 
 * 品質問題 ( Quality )
   * 缺字部份，可使用對抗式生成網路學習並自動補齊。
   * 上述的對抗式生成網路亦可用於協助新字型生成。
 * 其它
   * 設定參數化，在建立字型檔時可透過設定依自己的需求客製化字型集。
 * Google Font 已實作類似的技術用以載入中文字型. 請參見:
   - https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization
   - 範例 CSS:
     - https://fonts.googleapis.com/css?family=Zhi-Mang-Xing&display=swap


LICENSE
--------

 * Font Files: All curated font files are separatedly placed in [another repo (xl-fontset)](https://github.com/plotdb/xl-fontset/) and are either GPL or SIL-OFL Licensed. (OK for Commercial Use)
 * Source codes are released under MIT License.

