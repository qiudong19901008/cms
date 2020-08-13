const account = {
  name: null,
  order: 5,
  title: '账号管理',
  type: 'folder',
  route: null,
  filePath: 'view/account',
  inNav: true,
  icon: 'iconfont icon-tushuguanli',
  children: [
    {
      title: '账号列表',
      type: 'view',
      route: '/account/ordinary/list',
      filePath: 'view/account/ordinary/List.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    // {
    //   title: '已处理资源列表',
    //   type: 'view',
    //   route: '/account/processdResource/list',
    //   filePath: 'view/resourceSite/processdResource/List.vue',
    //   inNav: true,
    //   icon: 'iconfont icon-tushuguanli',
    // },
    
  ]
}

export default account
