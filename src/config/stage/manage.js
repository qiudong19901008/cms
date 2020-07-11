const manageRouter = {
  name: null,
  order: 3,
  title: '知识管理',
  type: 'folder',
  route: null,
  filePath: 'view/manage',
  inNav: true,
  icon: 'iconfont icon-tushuguanli',
  children: [
    {
      title: '问题答案列表',
      type: 'view',
      route: '/issusAnswer/list',
      filePath: 'view/manage/issusAnswer/List.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    
  ]
}

export default manageRouter
