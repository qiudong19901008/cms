
<template>
  <div class="lin-container">
    <div class="lin-title">
      <div>问题答案列表</div>
      <el-button type="primary" @click="handleShowDialog">新增</el-button>
    </div>
    <!-- 表格条件查询 -->
    <ListConditionChoose 
    :tempCategoryList ="categoryList"
    :tempIssue.sync ="issue"
    :tempKeyword.sync ="keyword"
    :tempCategoryId.sync ="categoryId"
    @reset = "handleReset"
    @search = "handleSearch"
    >
    </ListConditionChoose>
    <!-- 表格 -->
    <ListTable
    :tempIssueList= "issueList"
    :tempCount= "count"
    @showDialog= "handleShowDialog"
    @currentChange= "handleCurrentChange"
    >
    </ListTable>
    <!-- 新增,查看,编辑dialog -->
    <ListDialog 
    @beSureExecute= "handleBeSureExecute" 
    @hideDialog= "handleHideDialog"
    :tempIssueAnwser="issueAnwser"
    :tempCategoryList ="categoryList"
    :tempIsCheck="isCheck"
    :tempIsDelete="isDelete"
    >
    </ListDialog>
  </div>
</template>

<script>
/* eslint-disable */
import IssueAnwserM from '@/model/issueAnwser'
import MyCategoryM from '@/model/myCategory'
import ListConditionChoose from './component/ListConditionChoose'
import ListTable from './component/ListTable'
import ListDialog from './component/ListDialog'

export default {
  name: 'List',
  components:{
    ListConditionChoose,
    ListTable,
    ListDialog
  },
  data(){
    return {
      issueList:[],//列表数据
      count:-1,//当前数据总数

      categoryList:[],//问题分类列表
      issue:'',
      keyword:'',
      categoryId:0,

      issueAnwser:null,//一个问题实体
      // issueId:-1,//为删除准备的id
      isCheck:false,//是否是查看
      isDelete:false,//是否是删除
    }
  },
  async created(){
      await this.init();
  },
  methods:{
    /**组件初始化 */
    async init(params ={}){
      const data = await IssueAnwserM.getAll(params);
      const categories = await MyCategoryM.getAll({});
      this.issueList = data.list;
      this.count = data.count;
      this.categoryList = categories.list;
      console.log(this.count)
    },

    /**搜索点击 */
    async handleSearch(){
      const params = this._assembleParams();
      this.init(params);
    },
    /**重置 */
    async handleReset(){
      this.init();
    },

    /**分页查询 */
    async handleCurrentChange(currentPage){
      const page = currentPage-1;
      const params = this._assembleParams();
      params.page=page;
      try{
        this.init(params);
        // this.$message.success('新增成功');
      }catch(e){
        // this.$message.error('新增失败');
      }
    },

    /**弹出新增,编辑,查看dialog */
    async handleShowDialog(row,type){
      if(type == 'edit'){
        this.issueAnwser = row;
      }
      if(type =='check'){
        this.issueAnwser = row;
        this.isCheck=true;
      }
      if(type == 'del'){
        this.issueAnwser = row;
        this.isDelete = true;
      }
      if(!type){
        this.issueAnwser={
          id:-2,
          issue:'',
          anwser:'',
          category:{
            id:3,
          },
          keyword:''
        }
      }
    },
    /**确认新增,修改,删除操作 */
    async handleBeSureExecute(issueAnwser,type){
      const id =issueAnwser.id;
      if(type == 'del'){
        await IssueAnwserM.deleteOne(id);
        this.handleHideDialog();
        this.handleSearch();
        return ;
      }
      
      let params = {
        issue:issueAnwser.issue,
        anwser:issueAnwser.anwser,
        keyword:issueAnwser.keyword,
        categoryId:issueAnwser.category.id,
      }
      try{
        if(id>0){//修改
          await IssueAnwserM.updateOne(id,params);
        }else{//新增
          await IssueAnwserM.createOne(params);
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
      this.issueAnwser={
        id:-1,
        issue:'',
        anwser:'',
        category:{
          id:1
        },
        keyword:''
      }
      setTimeout(()=>{
        this.isDelete=false;
      },500)
      this.isCheck=false;
      
    },

    /**组装发送参数 */
    _assembleParams(){
      const params = {
        issue:this.issue,
        keyword:this.keyword,
      }
      if(this.categoryId!=0){
        params.categoryId =this.categoryId;
      }
      return params;
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
