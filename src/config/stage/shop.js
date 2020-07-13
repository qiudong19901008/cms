const shopRouter = {
  name: null,
  order: 2,
  title: '卖货管理',
  type: 'folder',
  route: null,
  filePath: 'view/shop',
  inNav: true,
  icon: 'iconfont icon-tushuguanli',
  children: [
    {
      title: '轮播图列表',
      type: 'view',
      route: '/shop/banner/list',
      filePath: 'view/shop/banner/banner.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '主题列表',
      type: 'view',
      route: '/shop/theme/list',
      filePath: 'view/shop/theme/List.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '分类列表',
      type: 'view',
      route: '/shop/category/list',
      filePath: 'view/shop/category/List.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '商品列表',
      type: 'view',
      route: '/shop/product/list',
      filePath: 'view/shop/product/List.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '订单列表',
      type: 'view',
      route: '/shop/order/list',
      filePath: 'view/shop/order/List.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    }
  ]
}

export default shopRouter
