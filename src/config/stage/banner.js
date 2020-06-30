const bannerRouter = {
  name: null,
  order: 2,
  title: '轮播图管理',
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
    }
  ]
}

export default bannerRouter
