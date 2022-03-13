// 注意: base的值为github仓库的名称(/不能少)
module.exports = {
  base: '/gshop-client_docs/', /* 基础虚拟路径 */
  dest: 'docs/dist', /* 打包文件基础路径, 在命令所在目录下 */
  title: '尚品汇商城-前台PC', // 标题
  description: '尚硅谷前端研究院', // 标题下的描述
  
  themeConfig: { // 主题配置
    logo: '/logo.png',
    nav: [ // 头部导航
      { text: '官网', link: 'http://www.atguigu.com' },
      { text: '谷粒学院', link: 'http://www.gulixueyuan.com/' },
      { 
        text: '学习路线', 
        items: [
          { text: '前端', link: 'http://www.atguigu.com/web/' },
          { text: 'Java', link: 'http://www.atguigu.com/kecheng.shtml' },
          { text: '大数据', link: 'http://www.atguigu.com/bigdata/' }
        ] 
      },
    ],
    sidebar: [ // 左侧导航
      'chapter1/01_准备',
      {
        title: '应用开发详解',
        collapsable: true,
        children: [
          'chapter2/01_开启项目开发',
          'chapter2/02_项目源码目录设计',
          'chapter2/03_ESLint',
          'chapter2/04_使用git管理项目',
          'chapter2/05_Vue组件化',
          'chapter2/06_引入vue-router',
          'chapter2/07_引入less预编译器',
          'chapter2/08_Header组件',
          'chapter2/09_Footer组件',
          'chapter2/10_Home路由组件',
          'chapter2/11_后台应用',
          'chapter2/12_前后台交互ajax',
          'chapter2/13_使用vuex管理状态',
          'chapter2/14_异步显示分类列表 TypeNav',
          'chapter2/15_动态显示广告轮播',
          'chapter2/16_Mock数据接口',
          'chapter2/17_利用Mock接口实现动态的Home',
          'chapter2/18_Search路由',
          'chapter2/19_Detail路由',
          'chapter2/20_AddCartSuccess路由',
          'chapter2/21_ShopCart路由',
          'chapter2/22_注册与登陆路由',
          'chapter2/23_导航守卫',
          'chapter2/24_订单与支付',
          'chapter2/25_其它'
        ]
      },
      {
        title: '相关文档',
        collapsable: true,
        children: [
          'chapter3/01_API',
          'chapter3/02_Swagger接口列表',
          'chapter3/03_VuePress',
          'chapter3/04_vee-validate 2.x',
          'chapter3/05_vue组件间通信_详版',
          'chapter3/05_vue组件间通信_简版',
        ]
      },
      {
        title: '笔记列表',
        collapsable: true,
        children: [
          'chapter4/每日编码任务与面试题',
          'chapter4/day01',
          'chapter4/day02',
          'chapter4/day03',
          'chapter4/day04',
          'chapter4/day05',
          'chapter4/day06',
          'chapter4/day07',
          'chapter4/day08',
          'chapter4/day09',
          'chapter4/项目总结',
        ]
      },
    ],
    // sidebarDepth: 3 // 左侧导航的深度默认是2级
  },

  head: [ // 指定网页head图标
    ['link', { rel: 'shortcut icon', type: "image/x-icon", href: `/favicon.ico` }]
  ]
}