const categoryRouter = {
  name: null,
  order: 4,
  title: '分类管理',
  type: 'folder',
  route: null,
  filePath: 'view/category',
  inNav: true,
  icon: 'iconfont icon-tushuguanli',
  children: [
    {
      title: '分类列表',
      type: 'view',
      route: '/category/list',
      filePath: 'view/category/List.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    }
  ]
}

export default categoryRouter
