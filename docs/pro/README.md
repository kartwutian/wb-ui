---
title: 简介
lang: zh
---
## 写在前面
wb-uni-pro是一套通用的uni-app项目开发模板,抽象了一些通用的项目工具方法，
约定了通用的页面结构，提供了项目开发中常用的工具方法及一些目前场景下的
解决方案，我们希望这套模板，可以尽量减少开发者在框架层面的时间损耗，关注
项目的业务代码，提高项目的开发效率.

## 目录结构
```
.
├── components/                    // 组件目录
    ├──app/                        // 当前app相关组件
        ├── styles/                // 所有组件样式目录，全局使用，在App.vue里引入
    ├──wanbo/                      // 万博通用组件沉淀
        ├── styles/                // 所有组件样式目录，全局使用，在App.vue里引入
    ├──vant/                      // 组件库：基于vant weapp的组件在uni-app里的实现
        ├── index.less/           // vant组件样式目录，全局使用，在App.vue里引入
        ├── index.js/             // vant插件，全局使用，Vue.use(plugin),在App.vue里引入
    ├──[others]/                   // 其他组件
├── config/                        // 配置文件目录
    ├──config.js                   // 配置文件主入口
    ├──config.base.js              // 通用配置
    ├──config.dev.js               // 开发配置
    ├──config.prod.js              // 线上配置
├── locales/                       // 国际化
└── pages/                         // 路由目录
    ├── index/                     // 页面目录
        ├── services/              // 子模块 接口目录
        ├── models/                // vuex 子modules
        ├── page1.vue              // 页面 1，任意命名
        ├── page2.vue              // 页面 2，任意命名
        └── page3.vue              // 页面 3，任意命名
├── services/                      // 全局 接口目录
├── static                         // 本地静态文件目录，小程序大小有限制，不推荐使用，浪费容量
├── store                          // vuex store 目录
        ├── modules/                // 子modules
        ├── plugins/               // vuex插件
        ├── index.js               // store 入口，引入各个子module
├── utils                          // 工具方法目录
        ├── helper.js              // 项目中用到的工具方法
        ├── request.js             // ajax请求封装
├── styles                         // 全局样式目录
        ├── app.less               // 入口样式目录
        ├── iconfont.less          // 自己项目需要的字体图标（阿里的iconfont class）
        ├── pages.less             // 每个路由页面的样式引入
└── package.json

```
## vuex plugin

### reload
> 场景举例：有两个页面，pageA展示用户信息，pageB可以编辑修改用户信息，从pageA能够跳到pageB，
此时，当我们在pageB修改了用户信息之后，返回到pageA页面，需要重新请求接口，重新获取用户的最新
信息，更新视图，基于这种类似使用场景，基于vuex封装了reload插件，简化逻辑

#### 依赖引入

store/index.js
```js
import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import * as getters from './getters';
import state from './state';
import mutations from './mutations';
import loadingPlugin from "./plugins/loading/loadingPlugin";
import reloadPlugin from "./plugins/reload/reloadPlugin"; // reload插件

import home from '../pages/home/models/home';
import tabbar from '../pages/tabbar/models/tabbar';
import login from '../pages/login/models/login';

Vue.use(Vuex);

export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    plugins: [loadingPlugin, reloadPlugin],
    modules: {
        home,
        tabbar,
        login,
    
    },
});

```
#### 使用举例

从/pages/home/home跳转到/pages/vant/button/button后，点击按钮，store记录需要刷新的routes，
回到home时，在onShow生命周期里面执行this.$$isNeedReload()获取当前页面是否需要刷新的状态，
从而控制业务逻辑，在dispatch之后，当前页面的route从store里面清除

/pages/vant/button/button
```vue
    <template>
      <view class="pages-button">
        <demo-block title="页面reload例子" padding>
          <van-button block color="linear-gradient(to right, #4bb0ff, #6149f6)" @tap="refreshHome">刷新首页</van-button>
        </demo-block>
      </view>
    </template>
    
    <script>
      import DemoBlock from "../../../components/app/demo-block";
      import VanButton from "@/components/vant/button/index";
      export default {
        name: 'pages-button',
        components: {VanButton, DemoBlock},
        onLoad(){
    
        },
        onUnload(){
    
        },
        methods: {
          refreshHome(){
            // 告诉系统哪个页面需要刷新, 相应的在那个页面的onShow里面执行判断及刷新逻辑（必须有执行dispatch方法，才会销毁需要刷新的路由），
            this.$store.commit('createIsShouldReloadRoutes',{
              routes: ['/pages/home/home']
            })
          }
        }
      }
    </script>
    
    <style lang="less">
      .row {
        margin-bottom: 15px;
      }
    </style>

```
/pages/home/home
```js
export default {
    onShow(){
      // 使用this.$$isNeedReload()获取是否需要刷新的状态
        if(this.$$isNeedReload()){
            this.$store.dispatch('home/delayChange',{
                currentTabIndex: 1
            });
            console.log('i had refreshed')
        }
    },

}
```

### loading
每次dispatch,会记录dispatch的type作为key，存储dispatch是否结束的状态

## scripts
我们推荐，所有需要在`pages`目录下新建页面的情况，统一先在`pages.json`文件中建好相应路由，再使用`node ./scripts/generatePages.js`或者`npm run generatePages`的
命令来生成页面,该命令会根据`page.json`的页面路由配置，在`pages/`目录下生成相应的页面文件及`service`和`models`文件以及less文件，
`less`文件，默认被全局引入，当我们在`pages/`下的页面需要更改`vant`组件内部样式的时候，请
把样式写在抽离的`less`文件中，不要直接写在`vue`文件下，避免样式作用域问题引起展示bug
