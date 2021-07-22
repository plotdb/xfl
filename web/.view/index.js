 (function() { function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(e,n,r,t){if(!(e instanceof Error))throw e;if(!("undefined"==typeof window&&n||t))throw e.message+=" on line "+r,e;var o,a,i,s;try{t=t||require("fs").readFileSync(n,{encoding:"utf8"}),o=3,a=t.split("\n"),i=Math.max(r-o,0),s=Math.min(a.length,r+o)}catch(t){return e.message+=" - could not read from "+n+" ("+t.message+")",void pug_rethrow(e,null,r)}o=a.slice(i,s).map(function(e,n){var t=n+i+1;return(t==r?"  > ":"    ")+t+"| "+e}).join("\n"),e.path=n;try{e.message=(n||"Pug")+":"+r+"\n"+o+"\n\n"+e.message}catch(e){}throw e}function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;
    var locals_for_with = (locals || {});
    
    (function (JSON, b64img, blockLoader, cssLoader, decache, escape, featurefonts, fontlist, scriptLoader, version) {
      ;pug_debug_line = 1;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003C!DOCTYPE html\u003E";
;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fxfl\u002Fnode_modules\u002Fbootstrap.ldui\u002Fdist\u002Findex.pug";
if(!scriptLoader) { scriptLoader = {url: {}, config: {}}; }
;pug_debug_line = 3;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fxfl\u002Fnode_modules\u002Fbootstrap.ldui\u002Fdist\u002Findex.pug";
if(!decache) { decache = (version? "?v=" + version : ""); }
;pug_debug_line = 4;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fxfl\u002Fnode_modules\u002Fbootstrap.ldui\u002Fdist\u002Findex.pug";
pug_mixins["script"] = pug_interp = function(url,config){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 5;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fxfl\u002Fnode_modules\u002Fbootstrap.ldui\u002Fdist\u002Findex.pug";
scriptLoader.config = (config ? config : {});
;pug_debug_line = 6;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fxfl\u002Fnode_modules\u002Fbootstrap.ldui\u002Fdist\u002Findex.pug";
if (!scriptLoader.url[url]) {
;pug_debug_line = 7;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fxfl\u002Fnode_modules\u002Fbootstrap.ldui\u002Fdist\u002Findex.pug";
scriptLoader.url[url] = true;
;pug_debug_line = 8;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fxfl\u002Fnode_modules\u002Fbootstrap.ldui\u002Fdist\u002Findex.pug";
if (/^https?:\/\/./.exec(url)) {
;pug_debug_line = 9;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fxfl\u002Fnode_modules\u002Fbootstrap.ldui\u002Fdist\u002Findex.pug";
pug_html = pug_html + "\u003Cscript" + (" type=\"text\u002Fjavascript\""+pug_attr("src", url, true, true)+pug_attr("defer", !!scriptLoader.config.defer, true, true)+pug_attr("async", !!scriptLoader.config.async, true, true)) + "\u003E\u003C\u002Fscript\u003E";
}
else {
;pug_debug_line = 12;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fxfl\u002Fnode_modules\u002Fbootstrap.ldui\u002Fdist\u002Findex.pug";
pug_html = pug_html + "\u003Cscript" + (" type=\"text\u002Fjavascript\""+pug_attr("src", url + decache, true, true)+pug_attr("defer", !!scriptLoader.config.defer, true, true)+pug_attr("async", !!scriptLoader.config.async, true, true)) + "\u003E\u003C\u002Fscript\u003E";
}
}
};
;pug_debug_line = 15;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fxfl\u002Fnode_modules\u002Fbootstrap.ldui\u002Fdist\u002Findex.pug";
if(!cssLoader) { cssLoader = {url: {}}; }
;pug_debug_line = 16;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fxfl\u002Fnode_modules\u002Fbootstrap.ldui\u002Fdist\u002Findex.pug";
pug_mixins["css"] = pug_interp = function(url,config){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 17;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fxfl\u002Fnode_modules\u002Fbootstrap.ldui\u002Fdist\u002Findex.pug";
cssLoader.config = (config ? config : {});
;pug_debug_line = 18;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fxfl\u002Fnode_modules\u002Fbootstrap.ldui\u002Fdist\u002Findex.pug";
if (!cssLoader.url[url]) {
;pug_debug_line = 19;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fxfl\u002Fnode_modules\u002Fbootstrap.ldui\u002Fdist\u002Findex.pug";
cssLoader.url[url] = true;
;pug_debug_line = 20;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fxfl\u002Fnode_modules\u002Fbootstrap.ldui\u002Fdist\u002Findex.pug";
pug_html = pug_html + "\u003Clink" + (" rel=\"stylesheet\" type=\"text\u002Fcss\""+pug_attr("href", url + decache, true, true)) + "\u003E";
}
};
;pug_debug_line = 22;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fxfl\u002Fnode_modules\u002Fbootstrap.ldui\u002Fdist\u002Findex.pug";
if(!blockLoader) { blockLoader = {name: {}, config: {}}; }
;pug_debug_line = 23;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fxfl\u002Fnode_modules\u002Fbootstrap.ldui\u002Fdist\u002Findex.pug";










;pug_debug_line = 28;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fxfl\u002Fnode_modules\u002Fbootstrap.ldui\u002Fdist\u002Findex.pug";
var escjson = function(obj) { return 'JSON.parse(unescape("' + escape(JSON.stringify(obj)) + '"))'; };
;pug_debug_line = 30;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fxfl\u002Fnode_modules\u002Fbootstrap.ldui\u002Fdist\u002Findex.pug";
var eschtml = (function() { var MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&#34;', "'": '&#39;' }; var repl = function(c) { return MAP[c]; }; return function(s) { return s.replace(/[&<>'"]/g, repl); }; })();
;pug_debug_line = 33;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fxfl\u002Fnode_modules\u002Fbootstrap.ldui\u002Fdist\u002Findex.pug";
pug_mixins["nbr"] = pug_interp = function(count){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 34;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fxfl\u002Fnode_modules\u002Fbootstrap.ldui\u002Fdist\u002Findex.pug";
for (var i = 0; i < count; i++)
{
;pug_debug_line = 35;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fxfl\u002Fnode_modules\u002Fbootstrap.ldui\u002Fdist\u002Findex.pug";
pug_html = pug_html + "\u003Cbr\u003E";
}
};
;pug_debug_line = 36;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fxfl\u002Fnode_modules\u002Fbootstrap.ldui\u002Fdist\u002Findex.pug";
var b64img = {};
;pug_debug_line = 37;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fxfl\u002Fnode_modules\u002Fbootstrap.ldui\u002Fdist\u002Findex.pug";
b64img.px1 = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAAAAAAALAAAAAABAAEAQAICRAEAOw=="
;pug_debug_line = 39;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fxfl\u002Fnode_modules\u002Fbootstrap.ldui\u002Fdist\u002Findex.pug";
var loremtext = {
  zh: "料何緊許團人受間口語日是藝一選去，得系目、再驗現表爸示片球法中轉國想我樹我，色生早都沒方上情精一廣發！能生運想毒一生人一身德接地，說張在未安人、否臺重壓車亞是我！終力邊技的大因全見起？切問去火極性現中府會行多他千時，來管表前理不開走於展長因，現多上我，工行他眼。總務離子方區面人話同下，這國當非視後得父能民觀基作影輕印度民雖主他是一，星月死較以太就而開後現：國這作有，他你地象的則，引管戰照十都是與行求證來亞電上地言裡先保。大去形上樹。計太風何不先歡的送但假河線己綠？計像因在……初人快政爭連合多考超的得麼此是間不跟代光離制不主政重造的想高據的意臺月飛可成可有時情乎為灣臺我養家小，叫轉於可！錢因其他節，物如盡男府我西上事是似個過孩而過要海？更神施一關王野久沒玩動一趣庭顧倒足要集我民雲能信爸合以物頭容戰度系士我多學一、區作一，過業手：大不結獨星科表小黨上千法值之兒聲價女去大著把己。",
  en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
};

;pug_debug_line = 45;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fxfl\u002Fnode_modules\u002Fbootstrap.ldui\u002Fdist\u002Findex.pug";







;pug_debug_line = 47;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fplotdb\u002Fprojects\u002Fxfl\u002Fnode_modules\u002Fbootstrap.ldui\u002Fdist\u002Findex.pug";













;pug_debug_line = 5;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
var fontlist = [
  ["DotGothic16", "DotGothic16-Regular", "8231"],
  ["KleeOne / SemiBold", "KleeOne-SemiBold", "10178"],
  ["KleeOne", "KleeOne-Regular", "10178"],
  ["Stick", "Stick-Regular", "8231"],
  ["ReggaeOne", "ReggaeOne-Regular", "8231"],
  ["RampartOne", "RampartOne-Regular", "8231"],
  ["RocknRollOne", "RocknRollOne-Regular", "8230"],
  ["TrainOne", "TrainOne-Regular", "4356"],

  ["思源宋體 / 極細", "NotoSerifCJKtc-ExtraLight"],
  ["思源宋體 / 細", "NotoSerifCJKtc-Light"],
  ["思源宋體", "NotoSerifCJKtc-Regular"],
  ["思源宋體 / 適中", "NotoSerifCJKtc-Medium"],
  ["思源宋體 / 次粗", "NotoSerifCJKtc-SemiBold"],
  ["思源宋體 / 粗", "NotoSerifCJKtc-Bold"],
  ["思源宋體 / 濃", "NotoSerifCJKtc-Black"],

  ["cjk手寫4", "cjk手寫4", "12201"],
  ["粉圓體", "openhuninn-1.1", "9676"],
  ["台北黑體 / 粗", "TaipeiSansTCBeta-Bold", "32732"],
  ["台北黑體", "TaipeiSansTCBeta-Regular", "32731"],
  ["台北黑體 / 細", "TaipeiSansTCBeta-Bold", "32762"],
  ["花圓明朝A", "HanaminA", "41494"],
  ["花圓明朝B", "HanaminB", "60418"],
  ["內海字體 / Bold", "NaikaiFont-Bold", 46817],
  ["內海字體 / SemiBold", "NaikaiFont-SemiBold", 46817],
  ["內海字體", "NaikaiFont-Regular", 46817],
  ["內海字體 / Light", "NaikaiFont-Light", 46817],
  ["內海字體 / ExtraLight", "NaikaiFont-ExtraLight", 46817],
]
;pug_debug_line = 37;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
var featurefonts = [
  ["內海字體", "NaikaiFont-Regular"],
  ["思源宋體", "NotoSerifCJKtc-Regular"],
  ["台北黑體", "TaipeiSansTCBeta-Regular"],
  ["cjk手寫4", "cjk手寫4"],
  ["粉圓體", "openhuninn-1.1"],
  ["Rampart", "RampartOne-Regular"]
]
;pug_debug_line = 46;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Chtml\u003E";
;pug_debug_line = 47;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Chead\u003E";
;pug_debug_line = 48;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cmeta charset=\"utf-8\"\u003E";
;pug_debug_line = 49;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cmeta property=\"og:locale\" content=\"zh_TW\"\u003E";
;pug_debug_line = 50;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cmeta property=\"og:image\" content=\"http:\u002F\u002Fplotdb.github.io\u002Fxfl\u002Fassets\u002Fimg\u002Fthumbnail.png\"\u003E";
;pug_debug_line = 51;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cmeta property=\"og:image:type\" content=\"image\u002Fpng\"\u003E";
;pug_debug_line = 52;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cmeta property=\"og:image:width\" content=\"1200\"\u003E";
;pug_debug_line = 53;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cmeta property=\"og:image:height\" content=\"630\"\u003E";
;pug_debug_line = 54;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cmeta property=\"og:title\" content=\"XL Font Load \u002F 大尺寸字型載入器\"\u003E";
;pug_debug_line = 55;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cmeta property=\"og:type\" content=\"article\"\u003E";
;pug_debug_line = 56;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cmeta property=\"og:url\" content=\"http:\u002F\u002Fplotdb.github.io\u002Fxfl\u002F\"\u003E";
;pug_debug_line = 57;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cmeta property=\"og:description\" content=\"這個專案實作了一個快速中文字型載入模組，將字型檔依字頻切成小塊，再根據網頁內容選擇需要載入的字型子集\"\u003E";
;pug_debug_line = 58;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cmeta property=\"article:author\" content=\"zbryikt\"\u003E";
;pug_debug_line = 59;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cmeta property=\"article:section\" content=\"Taiwan\"\u003E";
;pug_debug_line = 60;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cmeta name=\"keywords\" content=\"webfont,font loader,cjk\"\u003E";
;pug_debug_line = 61;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_mixins["css"]("assets/lib/bootstrap/main/css/bootstrap.min.css");
;pug_debug_line = 62;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_mixins["css"]("assets/lib/bootstrap.ldui/main/bootstrap.ldui.min.css");
;pug_debug_line = 63;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_mixins["css"]("assets/lib/ldloader/main/ldld.min.css");
;pug_debug_line = 64;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_mixins["css"]("assets/lib/ldbutton/main/ldbtn.min.css");
;pug_debug_line = 65;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_mixins["css"]("assets/lib/@loadingio/loading.css/main/loading.min.css");
;pug_debug_line = 66;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_mixins["css"]("assets/lib/ldcover/main/ldcv.min.css");
;pug_debug_line = 67;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_mixins["css"]("css/index.css");
pug_html = pug_html + "\u003C\u002Fhead\u003E";
;pug_debug_line = 68;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cbody\u003E";
;pug_debug_line = 68;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv id=\"root\"\u003E";
;pug_debug_line = 69;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"ldcv\"\u003E";
;pug_debug_line = 69;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"base\" style=\"max-width:90%;width:640px;height:480px;max-height:90%\"\u003E";
;pug_debug_line = 69;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"inner\"\u003E";
;pug_debug_line = 70;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100 h-100 d-flex flex-column\"\u003E";
;pug_debug_line = 71;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1 position-relative p-4\"\u003E";
;pug_debug_line = 72;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100 h-100 ld ld-over-inverse\"\u003E";
;pug_debug_line = 73;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"ld ld-ring ld-cycle\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 74;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Csvg class=\"w-100 h-100 border rounded shadow-sm\"\u003E";
;pug_debug_line = 75;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cdefs\u003E";
;pug_debug_line = 76;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003ClinearGradient id=\"lg\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"\u003E";
;pug_debug_line = 77;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cstop offset=\"0%\" stop-color=\"#f00\"\u003E\u003C\u002Fstop\u003E";
;pug_debug_line = 78;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cstop offset=\"25%\" stop-color=\"#f90\"\u003E\u003C\u002Fstop\u003E";
;pug_debug_line = 79;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cstop offset=\"50%\" stop-color=\"#9f0\"\u003E\u003C\u002Fstop\u003E";
;pug_debug_line = 80;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cstop offset=\"75%\" stop-color=\"#0f9\"\u003E\u003C\u002Fstop\u003E";
;pug_debug_line = 81;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cstop offset=\"100%\" stop-color=\"#09f\"\u003E\u003C\u002Fstop\u003E\u003C\u002FlinearGradient\u003E\u003C\u002Fdefs\u003E";
;pug_debug_line = 82;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cpath fill=\"url(#lg)\"\u003E\u003C\u002Fpath\u003E\u003C\u002Fsvg\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 83;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex justify-content-end px-4 pb-4\"\u003E";
;pug_debug_line = 83;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-dark\" data-ldcv-set=\"\"\u003E";
;pug_debug_line = 83;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "Close\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 85;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 86;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 86;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "XL Font Load \u002F \u003C\u002Fspan\u003E";
;pug_debug_line = 87;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cruby\u003E";
;pug_debug_line = 88;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Crb\u003E";
;pug_debug_line = 88;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "大尺寸\u003C\u002Frb\u003E";
;pug_debug_line = 89;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Crt\u003E";
;pug_debug_line = 89;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "中日韓\u003C\u002Frt\u003E\u003C\u002Fruby\u003E";
;pug_debug_line = 90;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 90;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "字型載入器\u003C\u002Fspan\u003E\u003C\u002Fh1\u003E";
;pug_debug_line = 91;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Chr\u003E";
;pug_debug_line = 92;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex\" id=\"chooser\"\u003E";
;pug_debug_line = 93;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn-group mb-2 mr-2\"\u003E";
;pug_debug_line = 94;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
// iterate featurefonts
;(function(){
  var $$obj = featurefonts;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var font = $$obj[pug_index0];
;pug_debug_line = 95;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"btn btn-outline-dark\""+pug_attr("data-font", font[1], true, true)) + "\u003E";
;pug_debug_line = 95;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = font[0]) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var font = $$obj[pug_index0];
;pug_debug_line = 95;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"btn btn-outline-dark\""+pug_attr("data-font", font[1], true, true)) + "\u003E";
;pug_debug_line = 95;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = font[0]) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 96;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"dropdown\" style=\"display:inline-block;vertical-align:top\"\u003E";
;pug_debug_line = 97;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-dark dropdown-toggle\" data-toggle=\"dropdown\"\u003E";
;pug_debug_line = 97;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "More\u003C\u002Fdiv\u003E";
;pug_debug_line = 98;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"dropdown-menu shadow-sm\" style=\"max-height:400px;overflow:scroll\"\u003E";
;pug_debug_line = 99;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
// iterate fontlist
;(function(){
  var $$obj = fontlist;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var font = $$obj[pug_index1];
;pug_debug_line = 100;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Ca" + (" class=\"dropdown-item d-flex align-items-center\""+" href=\"#\""+pug_attr("data-font", font[1], true, true)) + "\u003E";
;pug_debug_line = 101;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\"\u003E";
;pug_debug_line = 101;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = font[0]) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 102;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
if (font[2]) {
;pug_debug_line = 103;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Csmall class=\"text-muted ml-2\"\u003E";
;pug_debug_line = 103;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = font[2]) ? "" : pug_interp));
;pug_debug_line = 103;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "字\u003C\u002Fsmall\u003E";
}
pug_html = pug_html + "\u003C\u002Fa\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var font = $$obj[pug_index1];
;pug_debug_line = 100;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Ca" + (" class=\"dropdown-item d-flex align-items-center\""+" href=\"#\""+pug_attr("data-font", font[1], true, true)) + "\u003E";
;pug_debug_line = 101;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\"\u003E";
;pug_debug_line = 101;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = font[0]) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 102;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
if (font[2]) {
;pug_debug_line = 103;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Csmall class=\"text-muted ml-2\"\u003E";
;pug_debug_line = 103;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = font[2]) ? "" : pug_interp));
;pug_debug_line = 103;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "字\u003C\u002Fsmall\u003E";
}
pug_html = pug_html + "\u003C\u002Fa\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 106;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1 text-right\"\u003E";
;pug_debug_line = 107;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-dark\" data-target=\"svg\"\u003E";
;pug_debug_line = 107;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "輸出 SVG\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 109;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Ctextarea class=\"form-control\" rows=\"7\" placeholder=\"在這邊隨便輸入一些中文字看看吧...\"\u003E\u003C\u002Ftextarea\u003E";
;pug_debug_line = 110;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_mixins["nbr"](2);
;pug_debug_line = 111;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Ch2\u003E";
;pug_debug_line = 111;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "這是什麼？\u003C\u002Fh2\u003E";
;pug_debug_line = 112;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 112;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "中文字型檔向來動輒數MB，若要做為網路字型使用往往很卡。其它解決方案大多是商業付費服務，而且針對動態內容，要嘛做不好，亦或成本很高。\u003C\u002Fp\u003E";
;pug_debug_line = 113;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 113;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "針對這個問題，";
;pug_debug_line = 113;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Ccode\u003E";
;pug_debug_line = 113;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "@plotdb\u002Fxfl\u003C\u002Fcode\u003E";
;pug_debug_line = 113;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + " 實作了：\u003C\u002Fp\u003E";
;pug_debug_line = 114;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 115;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 115;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "中文字型切割工具\u003C\u002Fli\u003E";
;pug_debug_line = 116;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 116;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "中文字型載入模組\u003C\u002Fli\u003E\u003C\u002Ful\u003E";
;pug_debug_line = 117;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 117;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "先使用切割工具將字型檔依字頻切成小塊後，再使用載入器根據網頁內容選擇需要載入的字型子集，因此我們可以快速的選取想要的字型，套用在網站上。切割過後的字型亦可搭配 ";
;pug_debug_line = 117;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Ccode\u003E";
;pug_debug_line = 117;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "opentype.js\u003C\u002Fcode\u003E";
;pug_debug_line = 117;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + " 於前、後端進行字型組合。\u003C\u002Fp\u003E";
;pug_debug_line = 118;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 118;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "另一方面，此專案亦收集了十來以 ";
;pug_debug_line = 118;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Ccode\u003E";
;pug_debug_line = 118;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "SIL Open Font License 1.1\u003C\u002Fcode\u003E";
;pug_debug_line = 118;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + " 釋出的免費、可商用開放中文字型，亦提供預先切割好的字型模組，可直接分支使用，不需再花時間自行搜集處理。\u003C\u002Fp\u003E";
;pug_debug_line = 119;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cbr\u003E";
;pug_debug_line = 120;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Ch2\u003E";
;pug_debug_line = 120;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "我要怎麼取得？\u003C\u002Fh2\u003E";
;pug_debug_line = 121;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 121;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "此專案託管於 ";
;pug_debug_line = 121;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Ca href=\"https:\u002F\u002Fgithub.com\u002Fplotdb\u002Fxfl\"\u003E";
;pug_debug_line = 121;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "Github 專案庫\u003C\u002Fa\u003E";
;pug_debug_line = 121;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + " ，您可以造訪該網址並利用 Git 分支，或者直接下載整包模組。\u003C\u002Fp\u003E";
;pug_debug_line = 122;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cbr\u003E";
;pug_debug_line = 123;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Ch3\u003E";
;pug_debug_line = 123;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "我可以整理自己的中文字型集嗎？\u003C\u002Fh3\u003E";
;pug_debug_line = 124;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 124;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "可以！此專案連同編譯程式碼一同釋出，可自動編譯切割指定之字型檔。\u003C\u002Fp\u003E";
;pug_debug_line = 125;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cbr\u003E";
;pug_debug_line = 126;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Ch3\u003E";
;pug_debug_line = 126;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "換字型會閃 \u002F 打字會閃 \u002F 載入還是很久 \u002F 字型有缺字\u003C\u002Fh3\u003E";
;pug_debug_line = 127;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 127;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "這些都是未來改進方向，科科。\u003C\u002Fp\u003E";
;pug_debug_line = 128;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cbr\u003E";
;pug_debug_line = 129;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Chr\u003E";
;pug_debug_line = 130;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv id=\"footer\"\u003E";
;pug_debug_line = 131;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 131;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "source code copyrighted ";
;pug_debug_line = 131;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Ca href=\"https:\u002F\u002Ftwitter.com\u002Fzbryikt\"\u003E";
;pug_debug_line = 131;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "@zbryikt\u003C\u002Fa\u003E";
;pug_debug_line = 131;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + " released under MIT License\u003C\u002Fdiv\u003E";
;pug_debug_line = 132;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 132;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "source in ";
;pug_debug_line = 132;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Ca href=\"https:\u002F\u002Fgithub.com\u002Fplotdb\u002Fxfl\"\u003E";
;pug_debug_line = 132;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "Github Repo\u003C\u002Fa\u003E";
;pug_debug_line = 132;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + " \u002F font files in ";
;pug_debug_line = 132;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003Ca href=\"https:\u002F\u002Fgithub.com\u002Fplotdb\u002Fxl-fontset\"\u003E";
;pug_debug_line = 132;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "Another Github Repo\u003C\u002Fa\u003E";
;pug_debug_line = 132;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 134;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_mixins["script"]("assets/lib/bootstrap.native/main/bootstrap-native-v4.min.js");
;pug_debug_line = 135;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_mixins["script"]("assets/lib/@loadingio/ldquery/main/ldq.min.js");
;pug_debug_line = 136;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_mixins["script"]("assets/lib/ldcover/main/ldcv.min.js");
;pug_debug_line = 137;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_mixins["script"]("assets/lib/ldloader/main/ldld.min.js");
;pug_debug_line = 138;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_mixins["script"]("assets/lib/proxise/main/proxise.min.js");
;pug_debug_line = 139;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_mixins["script"]("assets/lib/opentype.js/main/opentype.min.js");
;pug_debug_line = 140;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_mixins["script"]("assets/lib/@plotdb/xfl/dev/xfl.js");
;pug_debug_line = 141;pug_debug_filename = "src\u002Fpug\u002Findex.pug";
pug_mixins["script"]("js/index.js");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";
    }.call(this, "JSON" in locals_for_with ?
        locals_for_with.JSON :
        typeof JSON !== 'undefined' ? JSON : undefined, "b64img" in locals_for_with ?
        locals_for_with.b64img :
        typeof b64img !== 'undefined' ? b64img : undefined, "blockLoader" in locals_for_with ?
        locals_for_with.blockLoader :
        typeof blockLoader !== 'undefined' ? blockLoader : undefined, "cssLoader" in locals_for_with ?
        locals_for_with.cssLoader :
        typeof cssLoader !== 'undefined' ? cssLoader : undefined, "decache" in locals_for_with ?
        locals_for_with.decache :
        typeof decache !== 'undefined' ? decache : undefined, "escape" in locals_for_with ?
        locals_for_with.escape :
        typeof escape !== 'undefined' ? escape : undefined, "featurefonts" in locals_for_with ?
        locals_for_with.featurefonts :
        typeof featurefonts !== 'undefined' ? featurefonts : undefined, "fontlist" in locals_for_with ?
        locals_for_with.fontlist :
        typeof fontlist !== 'undefined' ? fontlist : undefined, "scriptLoader" in locals_for_with ?
        locals_for_with.scriptLoader :
        typeof scriptLoader !== 'undefined' ? scriptLoader : undefined, "version" in locals_for_with ?
        locals_for_with.version :
        typeof version !== 'undefined' ? version : undefined));
    ;} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;}; module.exports = template; })() 