
<template>
  <div class="lin-container">
    <div class="lin-title">
      <div>分类列表</div>
      <el-button type="primary" @click="handleShowDialog">新增</el-button>
    </div>
    <!-- 表格条件查询 -->
    <ListConditionChoose 
    :tempCategoryList ="categoryList"
    :tempName.sync ="name"
    @reset = "handleReset"
    @search = "handleSearch"
    >
    </ListConditionChoose>
    <!-- 表格 -->
    <ListTable
    :tempCategoryList= "categoryList"
    :tempCount= "count"
    @showDialog= "handleShowDialog"
    @currentChange= "handleCurrentChange"
    >
    </ListTable>
    <!-- 新增,查看,编辑dialog -->
    <ListDialog 
    @beSureExecute= "handleBeSureExecute" 
    @hideDialog= "handleHideDialog"
    :tempCategory="category"
    :tempIsDelete="isDelete"
    >
    </ListDialog>
  </div>
</template>

<script>
/* eslint-disable */
import MyCategoryM from '../../../model/myCategory'
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
      categoryList:[],//列表数据
      count:-1,//当前数据总数

      name:'',

      category:null,//一个分类实体
      isDelete:false,//是否是删除
    }
  },
  async created(){
      await this.init();
  },
  methods:{
    /**组件初始化 */
    async init(params ={}){
      const categories = await MyCategoryM.getAll(params);
      this.count = categories.count;
      this.categoryList = categories.list;
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
      console.log(params)
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
      console.log(row)
      if(type == 'edit'){
        this.category = row;
      }
      if(type == 'del'){
        this.category = row;
        this.isDelete = true;
      }
      if(!type){
        this.category={
          id:-2,
          name:'',
          description:'',
        }
      }
    },
    /**确认新增,修改,删除操作 */
    async handleBeSureExecute(category,type){
      const id =category.id;
      if(type == 'del'){
        await MyCategoryM.deleteOne(id);
        this.handleHideDialog();
        this.handleSearch();
        return ;
      }
      
      let params = {
        name:category.name,
        description:category.description,
      }
      try{
        if(id>0){//修改
          await MyCategoryM.updateOne(id,params);
        }else{//新增
          await MyCategoryM.createOne(params);
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
      this.category={
        id:-1,
        name:'',
        description:'',
      }
      setTimeout(()=>{
        this.isDelete=false;
      },500)
    },

    /**组装发送参数 */
    _assembleParams(){
      const params = {
        name:this.name,
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
