const productRouter = {
  name: null,
  order: 5,
  title: '商品管理',
  type: 'folder',
  route: null,
  filePath: 'view/product',
  inNav: true,
  icon: 'iconfont icon-tushuguanli',
  children: [
    {
      title: '商品列表',
      type: 'view',
      route: '/product/list',
      filePath: 'view/product/List.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    }
  ]
}

export default productRouter
