const bannerRouter = {
  name: null,
  order: 2,
  title: '卖货管理',
  type: 'folder',
  route: null,
  filePath: 'view/banner',
  inNav: true,
  icon: 'iconfont icon-tushuguanli',
  children: [
    {
      title: '轮播图列表',
      type: 'view',
      route: '/banner/list',
      filePath: 'view/banner/banner.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '主题列表',
      type: 'view',
      route: '/theme/list',
      filePath: 'view/theme/List.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '分类列表',
      type: 'view',
      route: '/category/list',
      filePath: 'view/category/List.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '商品列表',
      type: 'view',
      route: '/product/list',
      filePath: 'view/product/List.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '订单列表',
      type: 'view',
      route: '/order/list',
      filePath: 'view/order/List.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    }
  ]
}

export default bannerRouter
