const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

const str = fs.readFileSync(path.resolve(__dirname, '../pages.json'));
const fakeScript = 'return ' + str.toString();

const generatePagesObj = new Function(fakeScript);
const pages = generatePagesObj().pages;

const paths = pages.map(item => item.path);

const templatePage = fs.readFileSync(path.resolve(__dirname, './template/template.page.vue'));
const templateModels = fs.readFileSync(path.resolve(__dirname, './template/template.models.js'));
const templateServices = fs.readFileSync(path.resolve(__dirname, './template/template.services.js'));
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
  const last = arr.pop();
  const realLastFile = path.resolve(__dirname, '../', route + '.vue');
  models.push({
    name: last,
    path: path.relative(path.resolve(process.cwd(), './store'), path.resolve(__dirname, '../', [...arr, 'models', last].join('/'))).split('\\').join('/')
  });

  console.log(realLastFile)
  arr.forEach(async(item, index) => {
    const realPath = path.resolve(__dirname, '../', arr.slice(0, index+1).join('/'));
    console.log(realPath)
    await dirExists(realPath);
    if(index === arr.length - 1){
      const realLastFileStat = await getStat(realLastFile);
      console.log(!!realLastFileStat)
      if(!realLastFileStat){
        fs.writeFileSync(realLastFile, templatePage)
        const modelsDir = [...arr, 'models'];
        const modelsFile = [...arr, 'models', last + '.js'];
        const servicesDir = [...arr, 'services'];
        const servicesFile = [...arr, 'services', last + '.js'];
        await dirExists(path.resolve(__dirname, '../', modelsDir.join('/')));
        await dirExists(path.resolve(__dirname, '../', servicesDir.join('/')));
        fs.writeFileSync(path.resolve(__dirname, '../', modelsFile.join('/')), templateModels)
        fs.writeFileSync(path.resolve(__dirname, '../', servicesFile.join('/')), templateServices)
      }
    }
  });
};

paths.forEach( async currentPath =>{
  await generatePages(currentPath)
});

console.log(models)
console.log(path.resolve(__dirname, '../store/index.js'))

fs.writeFileSync(path.resolve(__dirname, '../store/index.js'), ejs.render(templateStore.toString(), {
  models,
}));

