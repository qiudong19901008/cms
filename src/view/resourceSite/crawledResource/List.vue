
<template>
  <div class="lin-container">
    <div class="lin-title">
      <div>已爬取资源列表</div>
      <el-button type="primary" @click="handleShowDialog">新增</el-button>
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
    :tempOperateType.sync = "operateType"
    :tempExcuteType.sync = "excuteType"
    :tempCategory.sync = "category"
    :tempTags.sync = "tags"
    :tempIdList = "idList"
    @reset = "handleReset"
    @search = "handleSearch"
    @crawlContent= "handleCrawlContent"
    @processResource = "handleProcessResource"
    @transferResource = "handleTransferResource" 
    @getSelectOption = "handleGetSelectOption"
    @excute = "handleExcute"
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
    @changeSelection = "handleChangeSelection"
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

      operateType:propertyInitEnum.STRING,
      excuteType:propertyInitEnum.STRING,
      category:propertyInitEnum.STRING,
      tags:propertyInitEnum.STRING,
      idList:propertyInitEnum.ARRAY,

    }
  },
  async created(){
      await this.init();
  },
  methods:{

    async handleExcute(){
      switch(this.operateType){
        case 'crawlContent':
          await this.handleCrawlContent()
          break;
        case 'proccessResource':
          break;
        case 'transfer':
          break;
        default:
          this.$message.error(`请选择要执行的操作`)
          return;
      }
    },


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
      const params = {}
      if(!this.siteId || this.siteId == -1){
        this.$message.error(`请选择需要爬取详情的网站`)
        return
      }
      params['siteId'] = this.siteId
      switch(this.excuteType){
        case 'count':
          if(!this.handleCount || this.handleCount == ''){
            this.$message.error(`请填入需要爬取的数量`)
            return;
          }
          params['proccessParam'] = this.handleCount
          console.log(this.handleCount)
          params['type'] = 'count'
          break;
        case 'category':
          if(!this.category || this.category == ''){
            this.$message.error(`请选择需要爬取的种类`)
            return;
          }
          params['proccessParam'] = this.category
          params['type'] = 'category'
          break;
        case 'tags':
          if(!this.tags || this.tags == ''){
            this.$message.error(`请选择需要爬取的标签`)
            return;
          }
          params['proccessParam'] = this.tags
          params['type'] = 'tags'
          break;
        case 'ids':
          if(!this.idList || this.idList.length == 0){
            this.$message.error(`请选择需要爬取的id列表`)
            return;
          }
          params['proccessParam'] = this.idList
          params['type'] = 'ids'
          break;
        default:
          this.$message.error(`请选择要执行的类型`)
          return;
      }
      await Intro.crawlContent(params)
    },
    /**处理资源 */
    async handleProcessResource(){
      this.$message.success(`正在处理id为${this.siteId}的网站资源...`)
      const params = {}
      if(!this.siteId || this.siteId == -1){
        this.$message.error(`请选择需要处理资源的网站`)
        return
      }
      if(!this.panId || this.panId == -1){
        this.$message.error(`请选择需要存储的网盘`)
        return
      }
      params['siteId'] = this.siteId
      params['panId'] = this.panId
      params['count'] = this.count!=propertyInitEnum.STRING?this.handleCount:100
      // console.log(params)
      await Intro.processResource(params)
    },

    /**改变选中数据 */
    async handleChangeSelection(idList,rows){
      this.idList = idList
      this.rows = rows
    },


    /**转存资源 20200923 */
    async handleTransferResource(){
      this.$message.success(`正在转存id为${this.siteId}的网站资源...`)
      const params = {}
      if(!this.siteId || this.siteId == -1){
        this.$message.error(`请选择需要转存资源的网站`)
        return
      }
      if(!this.panId || this.panId == -1){
        this.$message.error(`请选择需要存储的网盘`)
        return
      }
      params['siteId'] = this.siteId
      params['panId'] = this.panId
      params['count'] = this.count!=propertyInitEnum.STRING?this.handleCount:100
      // console.log(params)
      await Intro.transferResource(params)
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
      // console.log(row)
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
          'id':showDialogEnum.SHOW_ADD,
          'articleId':propertyInitEnum.STRING,
          'articleTitle':propertyInitEnum.STRING,
          'categories':propertyInitEnum.STRING,
          'content':{
            'downloadUrl': propertyInitEnum.STRING,
            'pwd': propertyInitEnum.STRING,
            'compressCode': propertyInitEnum.STRING,
            'tags': propertyInitEnum.STRING,
            'content':propertyInitEnum.STRING,
          },
          'contentUrl':propertyInitEnum.STRING,
          'imgSrc':propertyInitEnum.STRING,
          'isDeal':propertyInitEnum.STRING,
          'isHandle':propertyInitEnum.STRING,
          'publicTime':propertyInitEnum.STRING,
          'site':{
            'domain':propertyInitEnum.STRING,
          },
          'siteId':propertyInitEnum.STRING,
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
      // console.log(row['content']['downloadUrl'])
      let params = {
        content:{},
        site:{},
      }
      //简介表
      if(row['articleId']!=propertyInitEnum.STRING){
        params['articleId'] = row['articleId']
      }
      if(row['articleTitle']!=propertyInitEnum.STRING){
        params['articleTitle'] = row['articleTitle']
      }
      if(row['categories']!=propertyInitEnum.STRING){
        params['categories'] = row['categories']
      }
      if(row['contentUrl']!=propertyInitEnum.STRING){
        params['contentUrl'] = row['contentUrl']
      }
      if(row['imgSrc']!=propertyInitEnum.STRING){
        params['imgSrc'] = row['imgSrc']
      }
      if(row['publicTime']!=propertyInitEnum.STRING){
        params['publicTime'] = row['publicTime']
      }
      //网站表
      if( row['site']['domain']!=propertyInitEnum.STRING){
        params['site']['domain'] = row['site']['domain']
      }
      //内容表
      if(row['content']['downloadUrl']!=propertyInitEnum.STRING){
        params['content']['downloadUrl'] = row['content']['downloadUrl']
      }
      if(row['content']['pwd']!=propertyInitEnum.STRING){
        params['content']['pwd'] = row['content']['pwd']
      }
      if(row['content']['compressCode']!=propertyInitEnum.STRING){
        params['content']['compressCode'] = row['content']['compressCode']
      }
      if(row['content']['tags']!=propertyInitEnum.STRING){
        params['content']['tags'] = row['content']['tags']
      }
      if(row['content']['content']!=propertyInitEnum.STRING){
        params['content']['content'] = row['content']['content']
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
          'content':{
            'downloadUrl': propertyInitEnum.STRING,
            'pwd': propertyInitEnum.STRING,
            'compressCode': propertyInitEnum.STRING,
            'tags': propertyInitEnum.STRING,
            'content':propertyInitEnum.STRING,
          },
          'contentUrl':propertyInitEnum.STRING,
          'imgSrc':propertyInitEnum.STRING,
          'isDeal':propertyInitEnum.STRING,
          'isHandle':propertyInitEnum.STRING,
          'publicTime':propertyInitEnum.STRING,
          'site':{
            'domain':propertyInitEnum.STRING,
          },
          'siteId':propertyInitEnum.STRING,
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
