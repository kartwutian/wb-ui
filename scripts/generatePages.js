/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
(async () => {
  const path = require("path");
  const fs = require("fs");
  const ejs = require("ejs");
  const { generateFile, getStat } = require("./generateFile.js");

  const str = fs.readFileSync(path.resolve(__dirname, "../pages.json"));
  const fakeScript = "return " + str.toString();

  const generatePagesObj = new Function(fakeScript);
  const pages = generatePagesObj().pages;

  const defaultTemplatePage = fs.readFileSync(
    path.resolve(__dirname, "./template/template.page.ejs")
  );
  const defaultTemplateModel = fs.readFileSync(
    path.resolve(__dirname, "./template/template.model.ejs")
  );
  const templateLess = fs.readFileSync(
    path.resolve(__dirname, "./template/template.less.ejs")
  );
  const templateService = fs.readFileSync(
    path.resolve(__dirname, "./template/template.service.ejs")
  );
  const templateStore = fs.readFileSync(
    path.resolve(__dirname, "./template/template.store.index.ejs")
  );
  const templateLessEntry = fs.readFileSync(
    path.resolve(__dirname, "./template/template.less.entry.ejs")
  );

  // 存储所有model信息，用于生产store.js
  const models = [];
  // 存储所有全局样式的路径
  const pageGlobalStyles = [];

  const api = require("./fetch/api.json");

  const pagesPath = path.resolve(__dirname, "../pages");
  const utilsPath = path.resolve(__dirname, "../utils");
  const storePath = path.resolve(__dirname, "../store");
  const globalStylesPath = path.resolve(__dirname, "../styles");
  const sourceCodePath = path.resolve(__dirname, "../");

  const generatePages = async pageConfig => {
    let { path: route } = pageConfig;
    const { template } = pageConfig;
    let templatePage = defaultTemplatePage;
    let templateModel = defaultTemplateModel;

    // 如果存在自定义模板，则选自定义模板为输入
    if (template) {
      const templatePagePath = path.resolve(
        __dirname,
        `./template/${template}/template.page.ejs`
      );
      const templateModelPath = path.resolve(
        __dirname,
        `./template/${template}/template.model.ejs`
      );
      if (await getStat(templatePagePath)) {
        console.log(`使用 ${template} page模板`);
        templatePage = fs.readFileSync(templatePagePath);
      }
      if (await getStat(templateModelPath)) {
        console.log(`使用 ${template} model模板`);
        templateModel = fs.readFileSync(templateModelPath);
      }
    }

    // 做一些初始路由处理
    if (route.startsWith("/")) {
      route = route.slice(1);
    }

    const fullPath = path.resolve(sourceCodePath, route);
    const extname = path.extname(fullPath);
    let basePath = fullPath; // 页面文件去除扩展名之后的绝对路径
    if (extname) {
      basePath = fullPath.replace(extname, "");
    }
    const filename = path.win32.basename(basePath);
    const dirname = path.dirname(basePath);
    // console.log(basePath);
    // 注入page的参数, 过滤掉最后的index
    const modelName = (() => {
      let tempArr = path.relative(pagesPath, basePath).split(path.sep);
      tempArr.pop();
      tempArr = tempArr.map(str => str[0].toUpperCase() + str.substr(1));
      let strName = tempArr.join("");
      return strName[0].toLowerCase() + strName.substr(1);
    })();
    const serviceName = modelName;
    // console.log(modelName);

    const pageStylePrefix = (() => {
      const arr = path
        .relative(pagesPath, basePath)
        .split(path.sep)
        .map(str => str[0].toLowerCase() + str.substr(1));
      const len = arr.length;
      if (arr[len - 2] === arr[len - 1]) {
        arr.pop();
      }
      return `page-${arr.join("-")}`;
    })();

    // path.relative(sourceCodePath, basePath);

    // 生成页面文件
    await generateFile({
      filePath: `${basePath}.vue`,
      template: ejs.render(templatePage.toString(), {
        pageStylePrefix,
        config: pageConfig
      })
    });
    const lessFilePath = `${basePath}.less`;
    // 生成less文件
    await generateFile({
      filePath: lessFilePath,
      template: ejs.render(templateLess.toString(), {
        pageStylePrefix,
        config: pageConfig
      })
    });
    const modelFilePath = path.resolve(dirname, `models/${modelName}.js`);
    // 生成model文件
    await generateFile({
      filePath: modelFilePath,
      template: ejs.render(templateModel.toString(), {
        servicePath: `../services/${serviceName}.js`,
        config: pageConfig,
        list: api[modelName] || [],
        utilsPath: `${path
          .relative(path.dirname(modelFilePath), utilsPath)
          .split(path.sep)
          .join("/")}`
      })
    });
    const servicesFilePath = path.resolve(dirname, `services/${modelName}.js`);
    // 生成service文件
    await generateFile({
      filePath: servicesFilePath,
      template: ejs.render(templateService.toString(), {
        list: api[modelName] || [],
        utilsPath: `${path
          .relative(path.dirname(servicesFilePath), utilsPath)
          .split(path.sep)
          .join("/")}`,
        config: pageConfig
      })
    });

    models.push({
      name: modelName,
      path: `${path
        .relative(storePath, modelFilePath)
        .split(path.sep)
        .join("/")}`
    });

    pageGlobalStyles.push(
      path
        .relative(globalStylesPath, lessFilePath)
        .split(path.sep)
        .join("/")
    );
    // console.log(models);
    // console.log(pageGlobalStyles);
  };

  // 注意forEach不支持async await
  for (let i = 0; i < pages.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    await generatePages(pages[i]);
  }

  const modelsObj = models.reduce((result, next) => {
    result[next.name] = next;
    return result;
  }, {});

  const uniModels = Object.keys(modelsObj).map(prop => modelsObj[prop]); // 去重后的models

  await generateFile(
    {
      filePath: path.resolve(storePath, "index.js"),
      template: ejs.render(templateStore.toString(), {
        models: uniModels
      })
    },
    true
  );
  await generateFile(
    {
      filePath: path.resolve(globalStylesPath, "pages.less"),
      template: ejs.render(templateLessEntry.toString(), {
        pageGlobalStyles
      })
    },
    true
  );

  console.log("ok！");
})();
