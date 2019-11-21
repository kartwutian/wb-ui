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
  title: 'wb-uni-pro(uni-app)',
  description: 'wb-uni-pro的使用文档',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Pro', link: '/pro/' },
      { text: 'Vant', link: '/vant/' },
    ],
    sidebar: {
      '/vant/': [
        {
          title: '起步',
          collapsable: true,
          children: [
            "/vant/common",
          ]
        },
        {
          title: '基础组件',
          collapsable: true,
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
          collapsable: true,
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
          collapsable: true,
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
          collapsable: true,
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
          collapsable: true,
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
          collapsable: true,
          children: [
            // '/vant/',
            // "/vant/area",
            "/vant/card",
            "/vant/submit-bar",
            "/vant/goods-action",
            ]
        },
      ],
      '/pro/': [
        {
          title: 'uni-app pro',
          collapsable: true,
          children: [
            '/pro/'
          ]
        }
      ]

    },
    lastUpdated: '上次更新 ', // string | boolean
    iframeSrc: config[NODE_ENV].iframeSrc , // 自定义内嵌的iframe前缀
  }
};
