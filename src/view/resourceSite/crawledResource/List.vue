
<template>
  <div class="lin-container">
    <div class="lin-title">
      <div>已爬取资源列表</div>
      <!-- <el-button type="primary" @click="handleShowDialog">新增</el-button> -->
    </div>
    
    <!-- 表格条件查询 -->
    <ListConditionChoose 
    :tempIsDeal.sync = "isDeal"
    :tempIsHandle.sync = "isHandle"
    :tempCategoryOrTags.sync = "categoryOrTags"
    :tempSiteDomainOrName.sync= "siteDomainOrName"
    :tempSiteList.sync = "siteList"
    :tempSiteId.sync = "siteId"
    :tempHandleCount.sync = "handleCount"
    :tempPanList.sync = "panList"
    :tempPanId.sync = "panId"
    @reset = "handleReset"
    @search = "handleSearch"
    @crawlContent= "handleCrawlContent"
    @processResource = "handleProcessResource"
    >
    </ListConditionChoose>
    <!-- 表格 -->
    <ListTable
    :tempIntroList= "introList"
    :tempCount= "count"
    :tempPageSize= "pageSize"
    @currentChange= "handleCurrentChange"
    @showDialog= "handleShowDialog"
    @changeImportant= "handleChangeImportant"
    >
    </ListTable>
    <!-- 新增,查看,编辑dialog -->
    <ListDialog 
    @beSureExecute= "handleBeSureExecute" 
    @hideDialog= "handleHideDialog"
    :tempIntroRow = "introRow"
    :tempIsCheck= "isCheck"
    :tempIsDelete= "isDelete"
    >
    </ListDialog>
  </div>
</template>

<script>
/* eslint-disable */
import Intro from '@/model/resourceSite/intro'
import Site from '@/model/resourceSite/site'
import BDPan from '@/model/resourceSite/bdPan'
import ListConditionChoose from './component/ListConditionChoose'
import ListTable from './component/ListTable'
import ListDialog from './component/ListDialog'
import {showDialogEnum,selectEnum,propertyInitEnum} from '@/config/enum'

export default {
  name: 'List',
  components:{
    ListConditionChoose,
    ListTable,
    ListDialog
  },
  data(){
    return {
      introList:propertyInitEnum.ARRAY,//列表数据
      count:propertyInitEnum.NUMBER,//当前数据总数
      pageSize:propertyInitEnum.NUMBER,//每页现实数据个数

      introRow:propertyInitEnum.OBJECT,//一个实体
      // reset:propertyInitEnum.BOOLEAN,//是否从百度网盘重新抓取数据

      isCheck:propertyInitEnum.BOOLEAN,//是否是查看
      isDelete:propertyInitEnum.BOOLEAN,//是否是删除

      //查询条件
      isDeal:propertyInitEnum.STRING,
      isHandle:propertyInitEnum.STRING,
      categoryOrTags:propertyInitEnum.STRING,
      siteDomainOrName:propertyInitEnum.STRING,


      //网站信息列表
      siteList:propertyInitEnum.ARRAY,
      siteId:propertyInitEnum.NUMBER,
      handleCount:propertyInitEnum.STRING,
      panList:propertyInitEnum.ARRAY,
      panId:propertyInitEnum.NUMBER,
    }
  },
  async created(){
      await this.init();
  },
  methods:{
    /**组件初始化 */
    async init(params){
      params = this._makeSurePagination(params)
      let data = await Intro.getList(params)
      this.introList = data['list']
      this.count = data['count']
      this.pageSize = params['pageSize']
      await this._getOtherData()
    },

    /**获取其他需要的信息 */
    async _getOtherData(){
      let data = await Site.getList({pageSize:100})
      this.siteList = data['list']
      data =await BDPan.getBDPanList({pageSize:100})
      this.panList = data['list']
    },

    /**搜索点击 */
    async handleSearch(){
      const params = this._assembleParams();//组装查询条件
      this.init(params);
    },
    /**重置 */
    async handleReset(){
      this.init();
    },
    /**爬取详情 */
    async handleCrawlContent(){
      this.$message.success(`正在爬取id为${this.siteId}的网站内容详情...`)
      const params = {}
      params['siteId'] = this.siteId!=propertyInitEnum.NUMBER?this.siteId:''
      params['count'] = this.count!=propertyInitEnum.STRING?this.handleCount:''
      await Intro.crawlContent(params)
    },
    /**处理资源 */
    async handleProcessResource(){
      this.$message.success(`正在处理id为${this.siteId}的网站资源...`)
      const params = {}
      params['siteId'] = this.siteId!=propertyInitEnum.NUMBER?this.siteId:''
      params['count'] = this.count!=propertyInitEnum.STRING?this.handleCount:''
      params['panId'] = this.panId!=propertyInitEnum.NUMBER?this.panId:''
      await Intro.processResource(params)
       
    },
    /**分页条件查询查询 */
    async handleCurrentChange(currentPage){
      const pageNum = currentPage-1;
      const params = this._assembleParams();//组装查询条件
      params['pageNum']=pageNum;
      params['pageSize'] = this.pageSize
      this.init(params);
    },
    /**改变is_important状态 */
    async handleChangeImportant(id,is_important){
      await Intro.editOne(id,{is_important});
      this.handleSearch();
    },

    /**弹出新增,编辑,查看dialog */
    async handleShowDialog(row,type){
      if(type == 'edit'){
        this.introRow = row;
      }
      if(type =='check'){
        this.introRow = row;
        this.isCheck=true;
      }
      if(type == 'del'){
        this.introRow = row;
        this.isDelete = true;
      }
      if(!type){
        this.introRow={
          // 'id':showDialogEnum.SHOW_ADD,
          // 'articleId':propertyInitEnum.STRING,
          // 'pageNum':propertyInitEnum.STRING,
          // 'domain':propertyInitEnum.STRING,
          // 'type':propertyInitEnum.STRING,
          // 'name':propertyInitEnum.STRING,
          // 'account':propertyInitEnum.STRING,
          // 'secret':propertyInitEnum.STRING,
          // 'mainUrl':propertyInitEnum.STRING,
          // 'loginUrl':propertyInitEnum.STRING,
          // 'remark':propertyInitEnum.STRING,
        }
      }
    },
    /**确认新增,修改,删除操作 */
    async handleBeSureExecute(row,type){
      const id =row.id;
      if(type == 'del'){
        await Intro.delMany(id);
        this.handleHideDialog();
        this.handleSearch();
        return ;
      }
      
      let params = {
        // 'baseUrl':row['baseUrl'],
        // 'pageNum':row['pageNum'],
        // 'domain':row['domain'],
        // 'type':row['type'],
        // 'name':row['name'],
        // 'account':row['account'],
        // 'secret':row['secret'],
        // 'mainUrl':row['mainUrl'],
        // 'loginUrl':row['loginUrl'],
        // 'remark':row['remark'],
      }
      try{
        if(id>0){//修改
          await Intro.editOne(id,params);
        }else{//新增
          await Intro.addOne(params);
        }
        this.handleHideDialog();
        this.handleSearch();
      }catch(e){
        this.handleHideDialog();
        this.handleSearch();
      }
      
      
    },
    /**关闭dialog */
    handleHideDialog(){
      this.introRow={
        'id':showDialogEnum.HIDE,
        'articleId':propertyInitEnum.STRING,
        'articleTitle':propertyInitEnum.STRING,
        'categories':propertyInitEnum.STRING,
        'content':{},
        'contentUrl':propertyInitEnum.STRING,
        'imgSrc':propertyInitEnum.STRING,
        'isDeal':propertyInitEnum.STRING,
        'isHandle':propertyInitEnum.STRING,
        'publicTime':propertyInitEnum.STRING,
        'site':{},
        'siteId':propertyInitEnum.NUMBER,
      }
      setTimeout(()=>{
        this.isDelete=propertyInitEnum.BOOLEAN;
        this.isCheck=propertyInitEnum.BOOLEAN;
      },500)     
    },

    /**组装发送参数 */
    _assembleParams(){
      const params = {
      }
      if(this.isDeal!=propertyInitEnum.STRING){
        params['isDeal'] = this.isDeal
      }
      if(this.isHandle!=propertyInitEnum.STRING){
        params['isHandle'] = this.isHandle
      }
      if(this.categoryOrTags!=propertyInitEnum.STRING){
        params['categoryOrTags'] = this.categoryOrTags
      }
      if(this.siteDomainOrName!=propertyInitEnum.STRING){
        params['siteDomainOrName'] = this.siteDomainOrName
      }
      return params;
    },

    _makeSurePagination(params){
      params = params?params:{}
      if(!params['pageSize']){
        params['pageSize'] = 8
      }
      if(!params['pageNum']){
        params['pageNum'] = 0
      }
      return params
    } 
  
    
  },
  
}
</script>

<style lang="scss" scoped>
    .lin-title{
      display:flex;
      align-items: center;
      justify-content: space-between;
      padding:0 100px 0 0;
    }

    .button-container{
          margin-top: 30px;
          padding-right: 30px;
          display: flex;
          justify-content: flex-end;
      }

    .table-container{
        margin-top: 30px;
        padding-left: 30px;
        padding-right: 30px;
        padding-bottom: 200px;

        .expand-container {
            display: flex;
            justify-content: flex-start;
            align-items: center;

            .img {
                margin: 10px;
                width: 200px;
            }
        }
    }
    
</style>
