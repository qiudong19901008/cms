<template>
    <div class="container">
      <el-table :data="tempIssueList">
          <!-- label定义列头显示的文本，prop定义要渲染data数组中元素的哪个字段，width定义列宽 -->
          <el-table-column label="序号" prop="id" width="160"></el-table-column>
          <el-table-column label="问题" prop="issue" width="200"></el-table-column>
          <el-table-column label="答案" prop="anwser"></el-table-column>
          <el-table-column label="分类" prop="category_name"></el-table-column>
          <el-table-column label="关键词" prop="keyword"></el-table-column>
          <el-table-column label="操作" fixed="right" width="170">
              <template slot-scope="scope"> 
                  <el-button plain size="mini" type="primary" @click="handleShowDialog(scope.row.id)" >查看</el-button>
              </template>
          </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :total="tempCount">
        </el-pagination>
      </div>
    </div>
    
   
    
</template>

<script>
export default {
  name: 'ListTable',
  props:{
    tempIssueList:{
      type:Array,
      default:{}
    },
    tempCount:Number,
  },
  data() {
    return{
      currentPage:1,
    }
  },
  methods:{

    /**显示快递dialog */
    handleShowDialog(id){
    },
    /**分页 */
    handleCurrentChange(currentPage){
      this.$emit('currentChange',currentPage)
    }
  }
   
};
</script>
<style scoped lang="scss">
  .container{
    margin-top: 30px;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 200px;
    .pagination-container{
          display: flex;
          padding:40px 20px 0 0;
          justify-content: flex-end;
        }
  }
</style>