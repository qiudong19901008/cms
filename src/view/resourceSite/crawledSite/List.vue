
<template>
  <div class="lin-container">
    <div class="lin-title">
      <div>站点列表</div>
      <el-button type="primary" @click="handleShowDialog">新增</el-button>
    </div>
    :tempRemarkPhoneUsername.sync = "remarkPhoneUsername"
    <!-- 表格条件查询 -->
    <ListConditionChoose 
    @reset = "handleReset"
    @search = "handleSearch"
    >
    </ListConditionChoose>
    <!-- 表格 -->
    <ListTable
    :tempBDPanList= "bdPanList"
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
    :tempBdPanRow = "bdPanRow"
    :tempIsCheck= "isCheck"
    :tempIsDelete= "isDelete"
    >
    </ListDialog>
  </div>
</template>

<script>
/* eslint-disable */
import Site from '@/model/resourceSite/site'
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
      siteList:propertyInitEnum.ARRAY,//列表数据
      count:propertyInitEnum.NUMBER,//当前数据总数
      pageSize:propertyInitEnum.NUMBER,//每页现实数据个数

      siteRow:propertyInitEnum.OBJECT,//一个实体
      // reset:propertyInitEnum.BOOLEAN,//是否从百度网盘重新抓取数据

      isCheck:propertyInitEnum.BOOLEAN,//是否是查看
      isDelete:propertyInitEnum.BOOLEAN,//是否是删除

      //查询条件
      // remarkPhoneUsername:propertyInitEnum.STRING//备注||电话号码||用户名
    }
  },
  async created(){
      await this.init();
  },
  methods:{
    /**组件初始化 */
    async init(params){
      params = this._makeSurePagination(params)
      const data = await Site.getList(params)
      this.siteList = data['list']
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

    /**分页条件查询查询 */
    async handleCurrentChange(currentPage){
      const pageNum = currentPage-1;
      const params = {}
      // const params = this._assembleParams();//组装查询条件
      params['pageNum']=pageNum;
      params['pageSize'] = this.pageSize
      this.init(params);
    },
    /**改变is_important状态 */
    async handleChangeImportant(id,is_important){
      await siteList.editOne(id,{is_important});
      this.handleSearch();
    },

    /**弹出新增,编辑,查看dialog */
    async handleShowDialog(row,type){
      if(type == 'edit'){
        this.bdPanRow = row;
      }
      if(type =='check'){
        this.bdPanRow = row;
        this.isCheck=true;
      }
      if(type == 'del'){
        this.bdPanRow = row;
        this.isDelete = true;
      }
      if(!type){
        this.bdPanRow={
          'id':showDialogEnum.SHOW_ADD,
          'baseUrl':propertyInitEnum.STRING,
          'pageNum':propertyInitEnum.NUMBER,
          'domain':propertyInitEnum.STRING,
          'type':propertyInitEnum.STRING,
          'name':propertyInitEnum.STRING,
          'account':propertyInitEnum.STRING,
          'secret':propertyInitEnum.STRING,
          'mainUrl':propertyInitEnum.STRING,
          'loginUrl':propertyInitEnum.STRING,
          'remark':propertyInitEnum.STRING,
        }
      }
    },
    /**确认新增,修改,删除操作 */
    async handleBeSureExecute(row,type){
      const id =row.id;
      if(type == 'del'){
        await Site.delMany(id);
        this.handleHideDialog();
        this.handleSearch();
        return ;
      }
      
      let params = {
        'baseUrl':row['baseUrl'],
        'pageNum':row['pageNum'],
        'domain':row['domain'],
        'type':row['type'],
        'name':row['name'],
        'account':row['account'],
        'secret':row['secret'],
        'mainUrl':row['mainUrl'],
        'loginUrl':row['loginUrl'],
        'remark':row['remark'],
      }
      try{
        if(id>0){//修改
          await BDPan.editOneAccount(id,params);
        }else{//新增
          await BDPan.addOneAccount(params);
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
      this.bdPanRow={
       
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