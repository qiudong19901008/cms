
<template>
  <div class="lin-container">
    <div class="lin-title">
      <div>百度网盘列表</div>
      <el-button type="primary" @click="handleShowDialog">新增</el-button>
    </div>
    <!-- :tempCategoryList ="categoryList"
    :tempIssue.sync ="issue"
    :tempKeyword.sync ="keyword"
    :tempCategoryId.sync ="categoryId" -->
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
      bdPanList:propertyInitEnum.ARRAY,//列表数据
      count:propertyInitEnum.NUMBER,//当前数据总数
      pageSize:propertyInitEnum.NUMBER,//每页现实数据个数

      bdPanRow:propertyInitEnum.OBJECT,//一个网盘实体

      isCheck:propertyInitEnum.BOOLEAN,//是否是查看
      isDelete:propertyInitEnum.BOOLEAN,//是否是删除

      //查询条件

    }
  },
  async created(){
      const params={
        pageSize:3,
        pageNum:0
      }
      await this.init(params);
  },
  methods:{
    /**组件初始化 */
    async init(params){
      params = this._makeSurePagination(params)
      const data = await BDPan.getBDPanList(params)
      this.bdPanList = data['list']
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
      await BDPan.editOneAccount(id,{is_important});
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
          'username':propertyInitEnum.STRING,
          'account':propertyInitEnum.STRING,
          'password':propertyInitEnum.STRING,
          'mailbox':propertyInitEnum.STRING,
          'mailbox_pwd':propertyInitEnum.STRING,
          'phone':propertyInitEnum.STRING,
          'total_capacity':propertyInitEnum.STRING,
          'free_capacity':propertyInitEnum.STRING,
          'BDUSS':propertyInitEnum.STRING,
          'STOKEN':propertyInitEnum.STRING,
          'remark':propertyInitEnum.STRING,
        }
      }
    },
    /**确认新增,修改,删除操作 */
    async handleBeSureExecute(row,type){
      const id =row.id;
      if(type == 'del'){
        await BDPan.delAccounts(id);
        this.handleHideDialog();
        this.handleSearch();
        return ;
      }
      
      let params = {
        'account':row['account'],
        'password':row['password'],
        'phone':row['phone'],
        'mailbox':row['mailbox'],
        'mailbox_pwd':row['mailbox_pwd'],
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
        'id':showDialogEnum.HIDE,
        'account':propertyInitEnum.STRING,
        'password':propertyInitEnum.STRING,
        'mailbox':propertyInitEnum.STRING,
        'mailbox_pwd':propertyInitEnum.STRING,
        'phone':propertyInitEnum.STRING,
        'BDUSS':propertyInitEnum.STRING,
        'STOKEN':propertyInitEnum.STRING,
        'total_capacity':propertyInitEnum.NUMBER,
        'free_capacity':propertyInitEnum.NUMBER,
        'remark':propertyInitEnum.STRING,
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
