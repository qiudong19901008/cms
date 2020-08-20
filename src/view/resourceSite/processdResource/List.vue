
<template>
  <div class="lin-container">
    <div class="lin-title">
      <div>资源列表</div>
      <!-- <el-button type="primary" @click="handleShowDialog">新增</el-button> -->
    </div>
    <!-- 表格条件查询 -->
    <ListConditionChoose 
    :tempRemarkType.sync = "remarkType"
    :tempResourcelist.sync = "resourceList"
    :tempSiteId.sync = "siteId"
    :tempBegin.sync = "begin"
    :tempEnd.sync = "end"
    @reset = "handleReset"
    @search = "handleSearch"
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

      resourceRow:propertyInitEnum.OBJECT,//一个实体

      isCheck:propertyInitEnum.BOOLEAN,//是否是查看
      isDelete:propertyInitEnum.BOOLEAN,//是否是删除

      //查询条件
      remarkType:propertyInitEnum.STRING,//网站类型/备注
      //爬虫专用
      siteId:propertyInitEnum.NUMBER,//当前站点id
      begin:propertyInitEnum.STRING,//开始页码
      end:propertyInitEnum.STRING,//结束页码
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
    /**爬取简介 */
    // async handleCrawl(){
    //   await Resource.crawlIntro({
    //     id:this.siteId,
    //     begin:this.begin,
    //     end:this.end,
    //   })
    //   this.$message.success(`正在爬取id为${this.siteId}网站简介信息...`)
    // },

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
          'pan_id':propertyInitEnum.STRING,
          'site_id':propertyInitEnum.STRING,
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
        'pan_id':propertyInitEnum.STRING,
        'site_id':propertyInitEnum.STRING,
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
      const params = {
      //  remarkType:this.remarkType
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
