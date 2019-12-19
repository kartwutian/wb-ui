const fs = require('fs');
const path = require('path');
const woff2base64 = require('woff2base64');

const fonts = {
  'vant-icon-0bc654.woff2': fs.readFileSync(path.resolve(__dirname, './vant-icon-0bc654.woff2')),
  // ...
};
const options = {
  fontFamily: 'vant-icon'
};
const css = woff2base64(fonts, options);
// css.woff2 = '@font-face{font-family:"Roboto";src:url(data:application/font-woff2;charset=utf-8;base64,...'
console.log(css)
fs.writeFileSync(path.resolve(__dirname, './vant-icon.css'), css.woff2);
