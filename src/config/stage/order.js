const orderRouter = {
  name: null,
  order: 6,
  title: '订单管理',
  type: 'folder',
  route: null,
  filePath: 'view/order',
  inNav: true,
  icon: 'iconfont icon-tushuguanli',
  children: [
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

export default orderRouter
