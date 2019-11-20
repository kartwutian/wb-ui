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
          title: 'vant组件',
          collapsable: false,
          children: [
            '/vant/',
            "/vant/action-sheet",
            "/vant/area",
            "/vant/button",
            "/vant/cell",
            "/vant/card",
            "/vant/checkbox",
            "/vant/circle",
            "/vant/col",
            "/vant/collapse",
            "/vant/count-down",
            "/vant/common",
            "/vant/datetime-picker",
            "/vant/dialog",
            "/vant/divider",
            "/vant/dropdown-menu",
            "/vant/field",
            "/vant/goods-action",
            "/vant/grid",
            "/vant/icon",
            "/vant/image",
            "/vant/loading",
            "/vant/nav-bar",
            "/vant/notice-bar",
            "/vant/notify",
            "/vant/overlay",
            "/vant/panel",
            "/vant/picker",
            "/vant/popup",
            "/vant/radio",
            "/vant/progress",
            "/vant/rate",
            "/vant/search",
            "/vant/sidebar",
            "/vant/slider",
            "/vant/steps",
            "/vant/stepper",
            "/vant/submit-bar",
            "/vant/sticky",
            "/vant/switch",
            "/vant/swipe-cell",
            "/vant/tab",
            "/vant/tabbar",
            "/vant/tag",
            "/vant/toast",
            "/vant/transition",
            "/vant/tree-select",
            "/vant/uploader"
            ]
        },
      ],
      '/pro/': [
        {
          title: 'uni-app pro',
          collapsable: false,
          children: [
            '/vant/'
          ]
        }
      ]

    },
    lastUpdated: '上次更新 ', // string | boolean
    iframeSrc: config[NODE_ENV].iframeSrc , // 自定义内嵌的iframe前缀
  }
};
