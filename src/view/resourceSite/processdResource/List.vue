
<template>
  <div class="lin-container">
    <div class="lin-title">
      <div>资源列表</div>
      <!-- <el-button type="primary" @click="handleShowDialog">新增</el-button> -->
    </div>
    <!-- 表格条件查询 -->
    <ListConditionChoose 
    :tempResourcelist.sync = "resourceList"
    :tempSiteId.sync = "siteId"
    :tempSiteList.sync = "siteList"
    :tempPanId.sync = "panId"
    :tempPanList.sync = "panList"
    :tempIsHandle.sync = "isHandle"
    :tempDownloadUrl.sync = 'downloadUrl'
    :tempArticleId.sync = "articleId"
    :tempHandleCount.sync = "handleCount"
    :tempInsertSiteId.sync = "insertSiteId"
    :tempIsShare.sync = "isShare"
    @reset = "handleReset"
    @search = "handleSearch"
    @insertWP = "handleInsertWP"
    @reShare = "handlReShare"
    @updateTerm = "handleUpdateTerm"
    @checkReInsert = "handleCheckReInsert"
    @delSelected = "handleDelSelected"
    @updateThumbnail = "handleUpdateThumbnail"
    >
    </ListConditionChoose>
    <!-- 表格 -->
    <ListTable
    :tempResourceList= "resourceList"
    :tempCount= "count"
    :tempPageSize= "pageSize"
    @currentChange= "handleCurrentChange"
    @showDialog= "handleShowDialog"
    @changeImportant= "handleChangeImportant"
    @changeSelection= "handleChangeSelection"
    >
    </ListTable>
    <!-- 新增,查看,编辑dialog -->
    <ListDialog 
    @beSureExecute= "handleBeSureExecute" 
    @hideDialog= "handleHideDialog"
    :tempResourceRow = "resourceRow"
    :tempIsCheck= "isCheck"
    :tempIsDelete= "isDelete"
    >
    </ListDialog>
  </div>
</template>

<script>
/* eslint-disable */
import Resource from '@/model/resourceSite/resource'
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
      resourceList:propertyInitEnum.ARRAY,//列表数据
      count:propertyInitEnum.NUMBER,//当前数据总数
      pageSize:propertyInitEnum.NUMBER,//每页现实数据个数
      idList:propertyInitEnum.ARRAY,//表格被选中数据的id列表
      rows:propertyInitEnum.ARRAY,//表格被选中数据列表

      resourceRow:propertyInitEnum.OBJECT,//一个实体

      isCheck:propertyInitEnum.BOOLEAN,//是否是查看
      isDelete:propertyInitEnum.BOOLEAN,//是否是删除

      /**查询条件 */
      //站点选取
      siteId:propertyInitEnum.NUMBER,//站点id
      siteList:propertyInitEnum.ARRAY,//网站列表
      //网盘选取
      panId:propertyInitEnum.NUMBER,//网盘id
      panList:propertyInitEnum.ARRAY,//网盘列表
      //插入状态选取
      isHandle:propertyInitEnum.STRING,
      //下载地址
      downloadUrl:propertyInitEnum.STRING,
      //WP文章id
      articleId:propertyInitEnum.STRING,
      //插入wp数量
      handleCount:propertyInitEnum.STRING,
      //插入wp网站
      insertSiteId:propertyInitEnum.NUMBER,
      //分享状态
      isShare:propertyInitEnum.STRING,
    }
  },
  async created(){
      await this.init();
  },
  methods:{
    /**组件初始化 */
    async init(params){
      params = this._makeSurePagination(params)
      const data = await Resource.getList(params)
      this.resourceList = data['list']
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

    /**改变选中数据 */
    async handleChangeSelection(idList,rows){
      this.idList = idList
      this.rows = rows
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
    /**插入wp */
    async handleInsertWP(){
      if(!this.insertSiteId || this.insertSiteId == -1){
        this.$message.error(`请选择需要插入的网站`)
        return
      }
      this.$message.success(`正在插入WP...`)
      await Resource.insertWP({
        count:this.handleCount,
        siteId:this.insertSiteId,
      })
    },
    /**重新分享 */
    async handlReShare(){
      if(!this.idList || this.idList.length == 0){
        this.$message.error(`请选择需要重新分享的文章`)
        return
      }
      this.$message.success(`正在重新分享已选中数据...`)
      await Resource.reShare({
        idList:this.idList
      })
    },
    /**更新标签和分类 */
    async handleUpdateTerm(){
      // if(!this.insertSiteId || this.insertSiteId == -1){
      //   this.$message.error(`请选择需要更新内容的网站`)
      //   return
      // }
      // 如果选中的数据中,siteId有不相同的,那么就不执行
      const siteId = this.rows[0]['site_id']
      for(let row of this.rows){
        if(siteId != row['site_id']){
          this.$message.error(`选中数据的siteId不同,请选择相同siteId的数据`)
          return
        }
      }
      if(!this.idList || this.idList.length == 0){
        this.$message.success(`正在全部更新...`)
      }else{
        this.$message.success(`正在更新已选择...`)
      }
      await Resource.updateTerm({
        ids:this.idList,
        siteId,
      })
    },
     /**检查不存在则重新插入WP */
    async handleCheckReInsert(){
      if(!this.idList || this.idList.length == 0){
        this.$message.error(`请选择需要检测并重新插入的文章`)
        return
      }
      // 如果选中的数据中,siteId有不相同的,那么就不执行
      const siteId = this.rows[0]['site_id']
      for(let row of this.rows){
        if(siteId != row['site_id']){
          this.$message.error(`选中数据的siteId不同,请选择相同siteId的数据`)
          return
        }
      }
      this.$message.success(`正在检测并重新插入已选中数据...`)
      await Resource.checkReInsert({
        ids:this.idList
      })
    },
    /**删除选中资源 */
    async handleDelSelected(){
      if(!this.idList || this.idList.length == 0){
        this.$message.error(`请选择需要删除的资源`)
        return
      }
      // this.$message.success(`正在删除的资源...`)
      let ids = ''
      for(let id of this.idList){
        ids+=id+','
      }
      ids = ids.slice(0,-1)
      // console.log(ids)
      await Resource.delSelected(ids)
      this.handleSearch()
      this.$message.success(`删除成功...`)
    },
    /**更新封面图片 */
    async handleUpdateThumbnail(){
      if(!this.insertSiteId || this.insertSiteId == -1){
        this.$message.error(`请选择需要更新封面图的网站`)
        return
      }
      this.$message.success(`正在更新封面图...`)
      await Resource.updatePic(this.insertSiteId,this.handleCount)
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
      await Resource.editOne(id,{is_important});
      this.handleSearch();
    },

    /**弹出新增,编辑,查看dialog */
    async handleShowDialog(row,type){
      if(type == 'edit'){
        this.resourceRow = row;
      }
      if(type =='check'){
        this.resourceRow = row;
        this.isCheck=true;
      }
      if(type == 'del'){
        this.resourceRow = row;
        this.isDelete = true;
      }
      if(!type){
        this.resourceRow={
          'id':showDialogEnum.SHOW_ADD,
          'title':propertyInitEnum.STRING,
          'content':propertyInitEnum.STRING,
          'intro_img':propertyInitEnum.STRING,
          'category':propertyInitEnum.STRING,
          'tags':propertyInitEnum.STRING,
          'publicTime':propertyInitEnum.STRING,
          'introId':propertyInitEnum.STRING,
          'downloadUrl':propertyInitEnum.STRING,
          'pwd':propertyInitEnum.STRING,
          'file_dir':propertyInitEnum.STRING,
          'is_handle':propertyInitEnum.STRING,
          'fsidlist':propertyInitEnum.STRING,
          'fnlist':propertyInitEnum.STRING,
          'shareid':propertyInitEnum.STRING,
          'from':propertyInitEnum.STRING,
          'filename':propertyInitEnum.STRING,
          'pan_id':propertyInitEnum.NUMBER,
          'site_id':propertyInitEnum.NUMBER,
          'articleId':propertyInitEnum.STRING,
          'pan':{},
          'site':{},
        }
      }
    },
    /**确认新增,修改,删除操作 */
    async handleBeSureExecute(row,type){
      const id =row.id;
      if(type == 'del'){
        await Resource.delMany(id);
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
          await Resource.editOne(id,params);
        }else{//新增
          await Resource.addOne(params);
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
      this.resourceRow={
        'id':showDialogEnum.HIDE,
        'title':propertyInitEnum.STRING,
        'content':propertyInitEnum.STRING,
        'intro_img':propertyInitEnum.STRING,
        'category':propertyInitEnum.STRING,
        'tags':propertyInitEnum.STRING,
        'publicTime':propertyInitEnum.STRING,
        'introId':propertyInitEnum.STRING,
        'downloadUrl':propertyInitEnum.STRING,
        'pwd':propertyInitEnum.STRING,
        'file_dir':propertyInitEnum.STRING,
        'is_handle':propertyInitEnum.STRING,
        'fsidlist':propertyInitEnum.STRING,
        'fnlist':propertyInitEnum.STRING,
        'shareid':propertyInitEnum.STRING,
        'from':propertyInitEnum.STRING,
        'filename':propertyInitEnum.STRING,
        'pan_id':propertyInitEnum.NUMBER,
        'site_id':propertyInitEnum.NUMBER,
        'articleId':propertyInitEnum.STRING,
        'pan':{},
        'site':{},
      }
      setTimeout(()=>{
        this.isDelete=propertyInitEnum.BOOLEAN;
        this.isCheck=propertyInitEnum.BOOLEAN;
      },500)     
    },

    /**组装发送参数 */
    _assembleParams(){
      const params = {}
       if(this.siteId!=propertyInitEnum.NUMBER){
        params['siteId'] = this.siteId
      }
      if(this.panId!=propertyInitEnum.NUMBER){
        params['panId'] = this.panId
      }
      if(this.isHandle!=propertyInitEnum.STRING){
        params['isHandle'] = this.isHandle
      }
      if(this.downloadUrl!=propertyInitEnum.STRING){
        params['downloadUrl'] = this.downloadUrl
      }
      if(this.articleId!=propertyInitEnum.STRING){
        params['articleId'] = this.articleId
      }
       if(this.isShare!=propertyInitEnum.STRING){
        params['isShare'] = this.isShare
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
    },

    
  
    
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
