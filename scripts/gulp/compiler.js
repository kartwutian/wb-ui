const {src, dest, series, parallel} = require('gulp');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const header = require('gulp-header');
const footer = require('gulp-footer');
const path = require('path');

/**
 * 过滤出less文件
 * @returns {*}
 */
function filterLess(done) {
  src(['packages/**/*.less',])
    .pipe(dest('widget/'));
  done();
}

function filterWxml(done) {
  src(['packages/**/*.wxml',])
    .pipe(header(`<template>\n`))
    .pipe(footer(`\n</template>\n
<script>

  export default {
    name: '*****',
  }

</script>

<style lang="less">

</style>
      
    `))
    .pipe(replace(/\s(\S+=)\"{{([^{]+)}}\"/g, ' :$1"$2"'))
    .pipe(replace(/:wx:if/g, 'v-if'))
    .pipe(replace(/:wx:for/g, 'v-for'))
    .pipe(replace(/:wx:elif/g, 'v-else-if'))
    .pipe(replace(/:wx:else/g, 'v-else'))
    .pipe(replace(/wx:key/g, ':key'))
    .pipe(replace(/bind:/g, '@'))
    .pipe(rename({
      extname: '.vue',
    }))
    .pipe(dest('vant/'));
  done();
}

exports.default = series(filterWxml);
exports.less = filterLess;
