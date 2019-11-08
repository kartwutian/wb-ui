module.exports = {
  title: 'wb-ui(uni-app)',
  description: 'wb-ui的使用文档',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'vant', link: '/vant/' },
    ],
    sidebar: {
      '/vant/': [
        {
          title: 'vant组件',
          collapsable: false,
          children: [
            '/vant/',
            '/vant/button'
          ]
        },
      ],
    },
    lastUpdated: '上次更新 ', // string | boolean
    iframeSrc: 'http://localhost:8081/#/pages/vant/', // 自定义内嵌的iframe前缀
  }
};
