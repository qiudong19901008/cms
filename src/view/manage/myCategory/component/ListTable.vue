<template>
    <div class="container">
      <el-table :data="tempCategoryList" >
          <!-- label定义列头显示的文本，prop定义要渲染data数组中元素的哪个字段，width定义列宽 -->
          <el-table-column label="序号" prop="id" width="160"></el-table-column>
          <el-table-column label="名称" prop="name" width="200"></el-table-column>
          <el-table-column label="描述" prop="description" ></el-table-column>
          <el-table-column label="操作" fixed="right" >
              <template slot-scope="scope"> 
                  <el-button plain size="mini" type="warn" @click="handleShowDialog(scope.row,'edit')" >编辑</el-button>
                  <el-button plain size="mini" type="danger" @click="handleShowDialog(scope.row,'del')" >删除</el-button>
              </template>
          </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :page-size="8"
          :current-page="tempCurrentPage"
          :total="tempCount">
        </el-pagination>
      </div>
    </div>
    
   
    
</template>

<script>
export default {
  name: 'ListTable',
  props:{
    tempCategoryList:{
      type:Array,
      default:[],
    },
    tempCount:Number,
    tempCurrentPage:{
      type:Number,
      default:1
    }
  },
  data() {
    return{
      currentPage:1,
    }
  },
  methods:{

    /**显示编辑删除dialog */
    handleShowDialog(row,type){
      this.$emit('showDialog',row,type);
    },
    /**分页 */
    handleCurrentChange(currentPage){
      this.$emit('currentChange',currentPage)
    },
  },

};
</script>
<style>
  /* .el-table th, .el-table td{
    text-align:center !important;
  } */
</style>
<style scoped lang="scss">
  .container{
    margin-top: 30px;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 200px;
          el-table .anwser-summary{
              white-space:nowrap; 
              overflow:hidden; 
              text-overflow:ellipsis;
          }
    .pagination-container{
          display: flex;
          padding:40px 20px 0 0;
          justify-content: flex-end;
        }
  }
</style>