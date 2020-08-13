
<template>
  <div class="lin-container">
    <div class="lin-title">
      <div>账户列表</div>
      <el-button type="primary" @click="handleShowDialog">新增</el-button>
    </div>
    <!-- 表格条件查询 -->
    <ListConditionChoose 
    :tempQueryCondition.sync = "queryCondition"
    @reset = "handleReset"
    @search = "handleSearch"
    >
    </ListConditionChoose>
    <!-- 表格 -->
    <ListTable
    :tempAccountList= "accountList"
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
    :tempAccount= "account"
    :tempIsCheck="isCheck"
    :tempIsDelete="isDelete"
    >
    </ListDialog>
  </div>
</template>

<script>
/* eslint-disable */
import ordinary from '@/model/account/ordinary'
// import MyCategoryM from '@/model/myCategory'
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
      accountList:propertyInitEnum.ARRAY,//列表数据
      count:propertyInitEnum.NUMBER,//当前数据总数
      pageSize:propertyInitEnum.NUMBER,//每页现实数据个数

      account:propertyInitEnum.OBJECT,//一个账号实体
  
      isCheck:propertyInitEnum.BOOLEAN,//是否是查看
      isDelete:propertyInitEnum.BOOLEAN,//是否是删除

      //查询条件
      queryCondition:propertyInitEnum.STRING
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
      const data = await ordinary.getAccountList(params)
      this.accountList = data['list']
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
      await ordinary.editOneAccount(id,{is_important});
      this.handleSearch();
    },

    /**弹出新增,编辑,查看dialog */
    async handleShowDialog(row,type){
      if(type == 'edit'){
        this.account = row;
      }
      if(type =='check'){//查看
        this.account = row;
        this.isCheck=true;
      }
      if(type == 'del'){
        this.account = row;
        this.isDelete = true;
      }
      if(!type){
        this.account={
          'id':showDialogEnum.SHOW_ADD,
          'platform_name':propertyInitEnum.STRING,
          'account':propertyInitEnum.STRING,
          'password':propertyInitEnum.STRING,
          'website':propertyInitEnum.STRING,
          'phone':propertyInitEnum.STRING,
          'mailbox':propertyInitEnum.STRING,
          'mailbox_pwd':propertyInitEnum.STRING,
          'remark':propertyInitEnum.STRING,
        }
      }
    },
    /**确认新增,修改,删除操作 */
    async handleBeSureExecute(account,type){
      const id =account.id;
      if(type == 'del'){
        await ordinary.delOneAccount(id);
        this.handleHideDialog();
        this.handleSearch();
        return ;
      }
      
      let params = {
        'platform_name':account['platform_name'],
        'account':account['account'],
        'password':account['password'],
        'website':account['website'],
        'phone':account['phone'],
        'mailbox':account['mailbox'],
        'mailbox_pwd':account['mailbox_pwd'],
        'remark':account['remark'],
      }
      try{
        if(id>0){//修改
          await ordinary.editOneAccount(id,params);
        }else{//新增
          await ordinary.addOneAccount(params);
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
      this.account={
        'id':showDialogEnum.HIDE,
        'platform_name':propertyInitEnum.STRING,
        'account':propertyInitEnum.STRING,
        'password':propertyInitEnum.STRING,
        'website':propertyInitEnum.STRING,
        'phone':propertyInitEnum.STRING,
        'mailbox':propertyInitEnum.STRING,
        'mailbox_pwd':propertyInitEnum.STRING,
        'remark':propertyInitEnum.STRING,
      }
      //在设置showDialogEnum.HIDE还没完成的时候,就初始化isDelete,isCheck 会导致界面跳动. 给500ms延时就能避免
      setTimeout(()=>{
        this.isDelete=propertyInitEnum.BOOLEAN;
        this.isCheck=propertyInitEnum.BOOLEAN;
      },500)
      
      
    },

    /**组装发送参数 */
    _assembleParams(){
      const params = {
        queryCondition:this.queryCondition,
      }
      return params;
    },

    _makeSurePagination(params){
      params = params?params:{}
      if(!params['pageSize']){
        params['pageSize'] = 3
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
