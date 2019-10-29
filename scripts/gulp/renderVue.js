const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const vueData = require('./vueData');

const template = fs.readFileSync(path.resolve(__dirname, './template/vue.ejs')).toString();

for(let key in vueData) {
  console.log(vueData[key])
  const str = ejs.render(template, vueData[key]);
  fs.writeFileSync(path.resolve(__dirname, 'vant', key, 'index.vue'),str)
}


