import Intro from '@/model/resourceSite/intro'
// -- NAME --

const name = 'ListConditionChoose';

// -- PROP --

const props = {
  tempIsDeal:String,
  tempIsHandle:String,
  tempCategoryOrTags:String,
  tempSiteDomainOrName:String,
  tempSiteList:Array,
  tempSiteId:Number,
  tempHandleCount:String,
  tempPanList:Array,
  tempPanId:Number,
  tempOperateType:String,
  tempExcuteType:String,
  tempCategory:String,
  tempTags:String,
  tempIdList:Array,
}

// -- DATA --

const data = function () {
  return {
    isDeal:'',
      isHandle:'', 
      categoryOrTags:'',
      siteDomainOrName:'',
      siteList:[],
      siteId:undefined,
      handleCount:'',
      panList:[],
      panId:undefined,
      operateTypeArr:[
        {value:'crawlContent',label:'爬取详情'},
        {value:'proccessResource',label:'处理资源'},
        {value:'transfer',label:'转存资源'},
      ],
      operateType:'',
      excuteTypeArr:[
        {value:'count',label:'数量'},
        {value:'category',label:'分类'},
        {value:'tags',label:'标签'},
        {value:'ids',label:'ids'},
      ],
      excuteType:'',
      categoryArr:[],
      category:'',
      tagsArr:[],
      tags:'',
      idList:[],
  };
};

// -- COMPUTED --

const computed = {
 
};

// -- COMPONENTS -- 

const components = {
}

// -- WATCH --

const watch = {
  isDeal(){
    this.$emit('update:tempIsDeal',this.isDeal)
  },
  isHandle(){
    this.$emit('update:tempIsHandle',this.isHandle)
  },
  categoryOrTags(){
    this.$emit('update:tempCategoryOrTags',this.categoryOrTags)
  },
  siteDomainOrName(){
    this.$emit('update:tempSiteDomainOrName',this.siteDomainOrName)
  },
  handleCount(){
    this.$emit('update:tempHandleCount',this.handleCount)
  },
  siteId(){
    this.$emit('update:tempSiteId',this.siteId)
  },
  tempSiteList(){
    const temp = []
    this.tempSiteList.forEach(c=>{
      temp.push({value:c.id,label:c.domain})
    })
    this.siteList=temp;
  },
  tempPanList(){
    const temp = []
    this.tempPanList.forEach(c=>{
      temp.push({value:c.id,label:c.account})
    })
    this.panList=temp;
  },
  panId(){
    this.$emit('update:tempPanId',this.panId)
  },
  operateType(){
    this.$emit('update:tempOperateType',this.operateType)
  },
  excuteType(){
    if(!this.excuteType){
      const tagsEle = document.getElementById('tagsEle');
      const countEle = document.getElementById('countEle');
      const categoryEle = document.getElementById('categoryEle');
      //重置
      tagsEle.hidden = true
      countEle.hidden = true
      categoryEle.hidden = true
      this.tags = '';
      this.category = '';
      this.handleCount = '';
    }
    this.$emit('update:tempExcuteType',this.excuteType)
  },
  category(){
    this.$emit('update:tempCategory',this.category)
  },
  tags(){
    this.$emit('update:tempTags',this.tags)
  }
};

// -- METHODS --

const methods = { 
  /**搜索逻辑 */
  handleSearch(){
    this.$emit('search');
  },
  /**重置逻辑 */
  handleResert(){
    this.isDeal = '' 
    this.isHandle = ''
    this.categoryOrTags=''
    this.siteDomainOrName=''
    this.siteId=undefined
    this.handleCount = '',
    this.panId=undefined,
    this.operateType = '',
    this.excuteType = '',
    this.tags = '',
    this.category = '',
    (document.getElementById('siteIdEle'))['hidden'] = true,
    (document.getElementById('excuteEle'))['hidden'] = true,
    (document.getElementById('panIdEle'))['hidden'] = true,
    (document.getElementById('countEle'))['hidden'] = true,
    (document.getElementById('categoryEle'))['hidden'] = true,
    (document.getElementById('tagsEle'))['hidden'] = true,
    this.$emit('reset')
  },
  /**爬取详情 */
  handleCrawlContent(){
    this.$emit('crawlContent')
  },
  /**处理资源 */
  handleProcessResource(){
    this.$emit('processResource')
  },
  /**转存资源 */
  handleTransferResource(){
    this.$emit('transferResource')
  },

  /**获取等下要选择的数据 */
  handleGetSelectOption(){
    this.$emit('getSelectOption')
  },

  /**
   * @Date: 2020-10-02 15:02:29
   * @author: qiud
   * @description: 
   * 1. 爬取详情: 只显示爬取数量和
   * 2. 转存并分享
   * 3. 转存
   * @param {type} 
   * @return {type} 
   */
  handleControllExcuteEle(){
    const excuteEle = document.getElementById('excuteEle');
    const siteIdEle = document.getElementById('siteIdEle');
    const panIdEle = document.getElementById('panIdEle');
    //重置
    excuteEle.hidden = true
    siteIdEle.hidden = true
    panIdEle.hidden = true
    this.excuteType = '';
    this.siteIdType = '';
    this.panIdType = '';
    switch(this.operateType){
      case 'crawlContent':
        this.excuteTypeArr = [
          {value:'count',label:'数量'},
          {value:'category',label:'分类'},
          // {value:'tags',label:'标签'},
          {value:'ids',label:'ids'},
        ];
        this.siteList = [
          {value:'1',label:'52fun.com'},
          {value:'5',label:'otakv.co'},
          {value:'6',label:'gteman.com'},
        ];
        excuteEle.hidden = false
        siteIdEle.hidden = false
        break;
      case 'proccessResource':
        this.excuteTypeArr = [
          {value:'count',label:'数量'},
          {value:'ids',label:'ids'},
        ];
        this.siteList = [
          {value:'1',label:'52fun.com'},
          {value:'5',label:'otakv.co'},
          {value:'6',label:'gteman.com'},
        ]
        excuteEle.hidden = false
        siteIdEle.hidden = false
        panIdEle.hidden = false
        break;
      case 'transfer':
        this.excuteTypeArr = [
          {value:'count',label:'数量'},
          {value:'ids',label:'ids'},
        ];
        this.siteList = [
          {value:'1',label:'52fun.com'},
          {value:'5',label:'otakv.co'},
          {value:'6',label:'gteman.com'},
        ]
        excuteEle.hidden = false
        siteIdEle.hidden = false
        panIdEle.hidden = false
        break;
    }
    this.tiggerExcuteBtnDisplay();
  },

  /**
   * @Date: 2020-10-02 15:25:47
   * @author: qiud
   * @description: 
   * @param {type} 
   * @return {type} 
   */  
 async handleControllParamEle(){
    const tagsEle = document.getElementById('tagsEle');
    const countEle = document.getElementById('countEle');
    const categoryEle = document.getElementById('categoryEle');
    //重置
    tagsEle.hidden = true
    countEle.hidden = true
    categoryEle.hidden = true
    this.tags = '';
    this.category = '';
    this.handleCount = '';
    //选择性显示
    switch(this.excuteType){
      case 'count':
        countEle.hidden = false
        break;
      case 'category':
        const categoryList = await Intro.getCategoryList({
          siteId:this.siteId
        });
        categoryList.forEach((v)=>{
          this.categoryArr.push({value:v,label:v})
        })
        categoryEle.hidden = false
        break;
      case 'tags':
        const tagsList = await Intro.getTagsList({
          siteId:this.siteId
        });
        tagsList.forEach((v)=>{
          this.tagsArr.push({value:v,label:v})
        })
        tagsEle.hidden = false
        break;
      case 'ids':
        break;
      case '':
        tagsEle.hidden = true
        countEle.hidden = true
        categoryEle.hidden = true
        break;
    }
  },


  handleExcute(){
      this.$emit('excute')
  }



};

// -- HOOKS --

function mounted() {
}

// == EXPORT ==

export default {
  name: name,

  props:props,

  data: data,

  components: components,

  computed: computed,

  watch: watch,

  methods: methods,

  mounted: mounted
};