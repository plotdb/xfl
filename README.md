cjk-font-load ( tentative )
=======

中文字型網路化. 依詞頻切割字型，並透過前端實作 lazy loading.

 * 字頻檔 ( word-frequency.csv )
   示範檔來源: [教育部](http://language.moe.gov.tw/001/Upload/files/SITE_CONTENT/M0001/86NEWS/download/86rest17.TXT)
 * 列舉轉換字型. 放置在 fonts/ 目錄, 結構不拘. 自動搜尋所有 .otf / .ttf 結尾檔案.
 * 針對每一字型:
   * 列舉所有支援字符
   * 其中常用五百字、標點符號、英文字母、數字等，做為第一字型檔
   * 接下來，剩餘字符有出現在詞頻表中者，依字頻每一百字組成一字型檔.
   * 剩餘未對應字，每一百字組成一字型檔.
   * 所有字型檔置於同一目錄中，檔名以數字區隔.
   * 輸出字碼 / 字型檔編號對應表, 供前端快查.



Usage / Compiler
----------------

 * 將欲轉換的字型整理至 fonts/ 目錄
 * 準備字型檔 word-frequency.csv
 * 執行轉換程式 compile.sh 
 * 字型檔輸出於 assets/ 目錄.



Usage / Frontend
----------------

Basic Usage:

    cfl.load("http://path/to/scattered/font/folder/", options)
      .then(function(font) {
         font.load(stringToDisplay);
      })


Loading based on dynamic content:

    /* assume we have "textarea" variable to be an input box accepting user input */
    cfl.load("http://path/to/scattered/font/folder/", options)
      .then(function(font) {
         textarea.addEventListener("keyup", function() {
           font.load(textarea.value);
         });
      })
   

Options:

  * fontName - name used in font-family. default to be the basename of URL.
  * text - preload files that contains text in this option.



未來方向
--------

考慮到字符相關性，可透過萌典、特定語料庫建立字符空間，透過 clustering algorithm ( 如 K-means clustering ) 將相關字符分組做為字型切割依據，進而減少需要載入的檔案數量.
 


LICENSE
--------

 * Font Files: All font files curated in this repository are either GPL or SIL-OFL Licensed. (OK for Commercial Use)
 * Source codes are released under MIT License.

