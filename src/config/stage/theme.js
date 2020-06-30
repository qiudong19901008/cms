const themeRouter = {
  name: null,
  order: 3,
  title: '主题管理',
  type: 'folder',
  route: null,
  filePath: 'view/theme',
  inNav: true,
  icon: 'iconfont icon-tushuguanli',
  children: [
    {
      title: '主题列表',
      type: 'view',
      route: '/theme/list',
      filePath: 'view/theme/List.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    }
  ]
}

export default themeRouter
