(async () => {
  const path = require("path");
  const fs = require("fs");
  const ejs = require("ejs");

  const str = fs.readFileSync(path.resolve(__dirname, "../pages.json"));
  const fakeScript = "return " + str.toString();

  const generatePagesObj = new Function(fakeScript);
  const pages = generatePagesObj().pages;

  const paths = pages.map(item => item.path);

  const templatePage = fs.readFileSync(
    path.resolve(__dirname, "./template/template.page.ejs")
  );
  const templateLess = fs.readFileSync(
    path.resolve(__dirname, "./template/template.less.ejs")
  );
  const templateModels = fs.readFileSync(
    path.resolve(__dirname, "./template/template.models.ejs")
  );
  const templateServices = fs.readFileSync(
    path.resolve(__dirname, "./template/template.services.ejs")
  );
  const templateStore = fs.readFileSync(
    path.resolve(__dirname, "./template/template.store.index.ejs")
  );
  const templateLessEntry = fs.readFileSync(
    path.resolve(__dirname, "./template/template.less.entry.ejs")
  );
  const models = [];
  const pageGlobalStyles = [];

  const api = require("./fetch/api.json");

  const taskQueue = []; // 存放promise

  /**
   * 读取路径信息
   * @param {string} path 路径
   */
  function getStat(path) {
    return new Promise((resolve, reject) => {
      fs.stat(path, (err, stats) => {
        if (err) {
          resolve(false);
        } else {
          resolve(stats);
        }
      });
    });
  }

  /**
   * 创建路径
   * @param {string} dir 路径
   */
  function mkdir(dir) {
    return new Promise((resolve, reject) => {
      fs.mkdir(dir, err => {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  /**
   * 路径是否存在，不存在则创建
   * @param {string} dir 路径
   */
  async function dirExists(dir) {
    let isExists = await getStat(dir);
    // console.log(isExists)
    //如果该路径且不是文件，返回true
    if (isExists && isExists.isDirectory()) {
      return true;
    } else if (isExists) {
      //如果该路径存在但是文件，返回false
      return false;
    }
    //如果该路径不存在
    let tempDir = path.parse(dir).dir; //拿到上级路径
    //递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
    let status = await dirExists(tempDir);
    let mkdirStatus;
    if (status) {
      mkdirStatus = await mkdir(dir);
    }
    // console.log('do -----------------')
    return mkdirStatus;
  }

  const generatePages = async route => {
    console.log(route);
    // 做一些初始路由处理
    if (route.startsWith("/")) {
      route = route.slice(1);
    }
    if (route.endsWith(".vue")) {
      route = route.slice(0, -4);
    }

    const arr = route.split("/");
    const last = arr.pop(); // 最后一个要生成的文件
    const pageClassName = (() => {
      let p = [];
      arr.forEach((item, i) => {
        if (i === arr.length - 1 && item === last) {
          return;
        }
        p.push(item);
      });
      p.push(last);
      return p.join("-");
    })();
    // 此时arr为目录数组
    let len = arr.length;
    const modelsName = arr[len - 1]; // 模块的名称，以.vue文件所在目录的目录名作为model的名字
    const realLastFilePath = path.resolve(__dirname, "../", route + ".vue");
    const realLastFileStat = await getStat(realLastFilePath);
    const realLastStyleFilePath = path.resolve(
      __dirname,
      "../",
      route + ".less"
    );
    const realLastStyleFileStat = await getStat(realLastStyleFilePath);
    pageGlobalStyles.push(
      path
        .relative(path.resolve(__dirname, "../"), realLastStyleFilePath)
        .split("\\")
        .join("/")
    );
    const realDirPath = path.resolve(__dirname, "../", arr.join("/")); // 最后一个文件所在目录的绝对路径
    const storePath = path.resolve(__dirname, "../store"); // store目录的绝对路径
    const utilsPath = path.resolve(__dirname, "../utils"); // store目录的绝对路径
    const modelFilePath = path.resolve(
      __dirname,
      "../",
      [...arr, "models", modelsName].join("/")
    ); // 模块文件的绝对路径
    const modelFilePathFullName = modelFilePath + ".js"; // 模块文件的绝对路径全名
    const modelFilePathStat = await getStat(modelFilePathFullName);
    const modelDirPath = path.resolve(
      __dirname,
      "../",
      [...arr, "models"].join("/")
    ); // 模块目录文件的绝对路径
    const servicesFilePath = path.resolve(
      __dirname,
      "../",
      [...arr, "services", modelsName].join("/")
    ); // services文件的绝对路径
    const servicesFilePathFullName = servicesFilePath + ".js"; // services文件的绝对路径全名
    const servicesFilePathStat = await getStat(servicesFilePathFullName);
    const serviceDirPath = path.resolve(
      __dirname,
      "../",
      [...arr, "services"].join("/")
    ); // services目录的绝对路径
    const modelFileRelativePathInStore = path
      .relative(storePath, modelFilePath)
      .split("\\")
      .join("/"); // 模块文件相对于在store目录中的相对路径
    const modelFileRelativePathInUtils = path
      .relative(modelDirPath, utilsPath)
      .split("\\")
      .join("/"); // 模块文件相对于在store目录中的相对路径
    const isCommonModels = models
      .map(item => item.path)
      .some(relativePath => {
        return relativePath.indexOf(modelFileRelativePathInStore) >= 0; // 判断是否是同一个文件夹下的文件，是则共用一个模块
      });
    // console.log('isCommonModels:' + isCommonModels);
    if (!isCommonModels) {
      models.push({
        name: modelsName.replace(/-(\w)/g, function(match, p) {
          return p.toUpperCase();
        }),
        path: modelFileRelativePathInStore
      });
    }

    await dirExists(realDirPath); // 没有目录则递归创建,有则什么都不干

    if (!realLastStyleFileStat) {
      fs.writeFileSync(
        realLastStyleFilePath,
        ejs.render(templateLess.toString(), {
          name: pageClassName
        })
      );
    }

    if (!realLastFileStat) {
      fs.writeFileSync(
        realLastFilePath,
        ejs.render(templatePage.toString(), {
          name: pageClassName
        })
      );

      await dirExists(modelDirPath); // 创建model目录
      await dirExists(serviceDirPath); // 创建service目录
      if (!modelFilePathStat) {
        fs.writeFileSync(
          modelFilePathFullName,
          ejs.render(templateModels.toString(), {
            name: modelsName,
            list: api[modelsName] || [],
            utilsPath: modelFileRelativePathInUtils
          })
        );
      }
      if (!servicesFilePathStat) {
        fs.writeFileSync(
          servicesFilePathFullName,
          ejs.render(templateServices.toString(), {
            name: modelsName,
            list: api[modelsName] || [],
            utilsPath: modelFileRelativePathInUtils
          })
        );
      }
    }
  };

  // 注意forEach不支持async await
  for (let i = 0; i < paths.length; i++) {
    await generatePages(paths[i]);
  }

  // console.log(models);
  // console.log(pageGlobalStyles);
  // 生成store下的index文件
  fs.writeFileSync(
    path.resolve(__dirname, "../store/index.js"),
    ejs.render(templateStore.toString(), {
      models
    })
  );

  // 自动引入pages的样式
  fs.writeFileSync(
    path.resolve(__dirname, "../styles/pages.less"),
    ejs.render(templateLessEntry.toString(), {
      pageGlobalStyles
    })
  );

  console.log("ok！");
})();
