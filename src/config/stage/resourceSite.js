const resourceSiteRouter = {
  name: null,
  order: 4,
  title: '资源网站管理',
  type: 'folder',
  route: null,
  filePath: 'view/resourceSite',
  inNav: true,
  icon: 'iconfont icon-tushuguanli',
  children: [
    {
      title: '已爬取资源列表',
      type: 'view',
      route: '/resourceSite/crawledResource/list',
      filePath: 'view/resourceSite/crawledResource/List.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '已处理资源列表',
      type: 'view',
      route: '/resourceSite/processdResource/list',
      filePath: 'view/resourceSite/processdResource/List.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '百度网盘列表',
      type: 'view',
      route: '/resourceSite/bdPan/list',
      filePath: 'view/resourceSite/bdPan/List.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    
    
  ]
}

export default resourceSiteRouter
