const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

const str = fs.readFileSync(path.resolve(__dirname, '../pages.json'));
const fakeScript = 'return ' + str.toString();

const generatePagesObj = new Function(fakeScript);
const pages = generatePagesObj().pages;

const paths = pages.map(item => item.path);

const templatePage = fs.readFileSync(path.resolve(__dirname, './template/template.page.ejs'));
const templateModels = fs.readFileSync(path.resolve(__dirname, './template/template.models.ejs'));
const templateServices = fs.readFileSync(path.resolve(__dirname, './template/template.services.ejs'));
const templateStore = fs.readFileSync(path.resolve(__dirname, './template/template.store.index.ejs'));
const models = [];

/**
 * 读取路径信息
 * @param {string} path 路径
 */
function getStat(path){
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if(err){
        resolve(false);
      }else{
        resolve(stats);
      }
    })
  })
}

/**
 * 创建路径
 * @param {string} dir 路径
 */
function mkdir(dir){
  return new Promise((resolve, reject) => {
    fs.mkdir(dir, err => {
      if(err){
        resolve(false);
      }else{
        resolve(true);
      }
    })
  })
}

/**
 * 路径是否存在，不存在则创建
 * @param {string} dir 路径
 */
async function dirExists(dir) {
  let isExists = await getStat(dir);
  //如果该路径且不是文件，返回true
  if (isExists && isExists.isDirectory()) {
    return true;
  } else if (isExists) {     //如果该路径存在但是文件，返回false
    return false;
  }
  //如果该路径不存在
  let tempDir = path.parse(dir).dir;      //拿到上级路径
  //递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
  let status = await dirExists(tempDir);
  let mkdirStatus;
  if (status) {
    mkdirStatus = await mkdir(dir);
  }
  return mkdirStatus;
}

const generatePages = async (route) => {
  console.log(route)
  if(route.startsWith('/')){
    route = route.slice(1);
  }
  if(route.endsWith('.vue')){
    route = route.slice(0, -4);
  }
  const arr = route.split('/');
  const last = arr.pop(); // 最后一个要生成的文件
  const modelsName = arr[1]; // 模块的名称，从pages下面的一级文件取名字
  const realLastFilePath = path.resolve(__dirname, '../', route + '.vue');
  const isCommonModels = models.map(item => item.path).some(relativePath => {
    return relativePath.indexOf(path.relative(path.resolve(process.cwd(), './store'), path.resolve(__dirname, '../', [...arr.slice(0,2), 'models'].join('/'))).split('\\').join('/')) >= 0
  });
  console.log('isCommonModels:' + isCommonModels);
  if(!isCommonModels){
    models.push({
      name: modelsName,
      path: path.relative(path.resolve(process.cwd(), './store'), path.resolve(__dirname, '../', [...arr.slice(0,2), 'models', modelsName].join('/'))).split('\\').join('/')
    });
  }
  // console.log(realLastFilePath)
  arr.forEach(async(item, index) => {
    const realPath = path.resolve(__dirname, '../', arr.slice(0, index+1).join('/'));
    // console.log(realPath)
    await dirExists(realPath);
    if(index === arr.length - 1){
      const realLastFileStat = await getStat(realLastFilePath);
      console.log(!!realLastFileStat)
      if(!realLastFileStat){
        fs.writeFileSync(realLastFilePath, ejs.render(templatePage.toString(), {
          name: last,
        }));

        // 判断有没有对应的models及services目录，没有则创建并写入文件
        const modelsDir = [...arr.slice(0,2), 'models'];
        const modelsFile = [...arr.slice(0,2), 'models', modelsName + '.js'];
        const servicesDir = [...arr.slice(0,2), 'services'];
        const servicesFile = [...arr.slice(0,2), 'services', modelsName + '.js'];

        const isExistModels = await dirExists(path.resolve(__dirname, '../', modelsDir.join('/')));
        const isExistServices = await dirExists(path.resolve(__dirname, '../', servicesDir.join('/')));
        if(!isExistModels){
          fs.writeFileSync(path.resolve(__dirname, '../', modelsFile.join('/')), ejs.render(templateModels.toString(), {
            name: last,
          }))
        }
        if(!isExistServices){
          fs.writeFileSync(path.resolve(__dirname, '../', servicesFile.join('/')),  ejs.render(templateServices.toString(), {
            name: last,
          }))
        }
      }
    }
  });
};

paths.forEach( async currentPath =>{
  await generatePages(currentPath)
});

// console.log(models)
// console.log(path.resolve(__dirname, '../store/index.js'))

fs.writeFileSync(path.resolve(__dirname, '../store/index.js'), ejs.render(templateStore.toString(), {
  models,
}));

console.log('ok！')
