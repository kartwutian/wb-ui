var fs = require('fs');
var path = require('path');
const ejs = require('ejs');

//解析需要遍历的文件夹
var filePath = path.resolve(__dirname, 'widget');
let paths = [];


//调用文件遍历方法
fileDisplay(filePath);

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath){
  //根据文件路径读取文件，返回文件列表
  fs.readdir(filePath,function(err,files){
    if(err){
      console.warn(err)
    }else{
      //遍历读取到的文件列表
      files.forEach(function(filename){
        //获取当前文件的绝对路径
        var filedir = path.join(filePath,filename);
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(filedir,function(eror,stats){
          if(eror){
            console.warn('获取文件stats失败');
          }else{
            var isFile = stats.isFile();//是文件
            var isDir = stats.isDirectory();//是文件夹
            if(isFile){
              console.log(filedir);
              paths.push('./' + path.relative(__dirname, filedir).replace(/\\/g, '/'));
              const template = fs.readFileSync(path.resolve(__dirname, './template/less.ejs')).toString();
              const str = ejs.render(template, {
                list: paths,
              });
              fs.writeFileSync(path.resolve(__dirname, 'index.less'), str);
              console.log('生成index.js ok')
            }
            if(isDir){
              fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
          }
        })
      });
    }
  });
}
