const NODE_ENV = process.env.NODE_ENV;
// 根据不同环境取不同配置
const config = {
  // 开发环境配置
  development: {
    iframeSrc: 'http://localhost:8080/static-resource/vant-uni/#/pages/vant/'
  },
  // 生产环境配置
  production: {
    iframeSrc: '/static-resource/vant-uni/#/pages/vant/'
  }
};

module.exports = {
  base: '/static-resource/wb-uni-pro/',
  title: 'wb-pro',
  description: '万博内部项目开发脚手架',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'mobx-admin', link: '/mobx-admin/' },
      { text: 'next-portail', link: '/next-portail/' },
      { text: 'uni-pro', link: '/uni-pro/' },
      { text: 'uni-Vant', link: '/vant/' },
    ],
    sidebar: {
      '/mobx-admin/': [
        {
          title: 'admin-template',
          collapsable: false,
          children: [
            '/mobx-admin/'
          ]
        }
      ],
      '/next-portail/': [
        {
          title: 'portail-template',
          collapsable: false,
          children: [
            '/next-portail/'
          ]
        }
      ],
      '/uni-pro/': [
        {
          title: 'uni-app pro',
          collapsable: false,
          children: [
            '/uni-pro/'
          ]
        }
      ],
      '/vant/': [
        {
          title: '起步',
          collapsable: false,
          children: [
            "/vant/",
            "/vant/common",
          ]
        },
        {
          title: '基础组件',
          collapsable: false,
          children: [
            "/vant/button",
            "/vant/cell",
            "/vant/icon",
            "/vant/image",
            "/vant/col",
            "/vant/popup",
            "/vant/transition",
          ]
        },
        {
          title: '表单组件',
          collapsable: false,
          children: [
            "/vant/checkbox",
            "/vant/datetime-picker",
            "/vant/field",
            "/vant/picker",
            "/vant/radio",
            "/vant/rate",
            "/vant/search",
            "/vant/slider",
            "/vant/stepper",
            "/vant/switch",
            "/vant/uploader",
          ]
        },
        {
          title: '反馈组件',
          collapsable: false,
          children: [
            "/vant/action-sheet",
            "/vant/dialog",
            "/vant/dropdown-menu",
            "/vant/loading",
            "/vant/notify",
            "/vant/overlay",
            "/vant/swipe-cell",
            "/vant/toast",
          ]
        },
        {
          title: '展示组件',
          collapsable: false,
          children: [
            "/vant/circle",
            "/vant/collapse",
            "/vant/count-down",
            "/vant/notice-bar",
            "/vant/panel",
            "/vant/progress",
            "/vant/steps",
            "/vant/sticky",
            "/vant/tag",
            "/vant/tree-select",
            "/vant/divider",
          ]
        },
        {
          title: '导航组件',
          collapsable: false,
          children: [
            "/vant/grid",
            "/vant/sidebar",
            "/vant/nav-bar",
            "/vant/tab",
            "/vant/tabbar",
          ]
        },
        {
          title: '业务组件',
          collapsable: false,
          children: [
            // '/vant/',
            // "/vant/area",
            "/vant/card",
            "/vant/submit-bar",
            "/vant/goods-action",
            ]
        },
      ],
      

    },
    lastUpdated: '上次更新 ', // string | boolean
    iframeSrc: config[NODE_ENV].iframeSrc , // 自定义内嵌的iframe前缀
  }
};
