<template>
    <div class="container">
      <el-table :data="tempIssueList" >
          <!-- label定义列头显示的文本，prop定义要渲染data数组中元素的哪个字段，width定义列宽 -->
          <el-table-column label="序号" prop="id" width="160"></el-table-column>
          <el-table-column label="问题" prop="issue" width="200"></el-table-column>
          <el-table-column label="答案"  class="anwser-summary">
              <template slot-scope="scope">
                {{scope.row.anwser | getSummary}}
              </template>
          </el-table-column>
          <el-table-column label="分类" prop="category.name" ></el-table-column>
          <el-table-column label="关键词" prop="keyword" ></el-table-column>
          <el-table-column label="重要">
              <template slot-scope="scope" >
                   <el-switch
                   v-model="scope.row.is_important"
                   :inactive-value="0" 
                   :active-value="1" 
                   active-color="#3963bc" 
                   @change="handleChangeImportant(scope.row)">
                   </el-switch>
              </template>
          </el-table-column>
          <el-table-column 
          label="更新时间" 
          prop="update_time"
          sortable
          >
            <template slot-scope="scope">
              {{ scope.row.update_time | formatDate}}
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" >
              <template slot-scope="scope"> 
                  <el-button plain size="mini" type="primary" @click="handleShowDialog(scope.row,'check')" >查看</el-button>
                  <el-button plain size="mini" type="warning" @click="handleShowDialog(scope.row,'edit')" >编辑</el-button>
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
          :page-size="10"
          :current-page="tempCurrentPage"
          :total="tempCount">
        </el-pagination>
      </div>
    </div>
    
   
    
</template>

<script>
import {getSummary,formatDate} from '@/lin/util/myUtil'
export default {
  name: 'ListTable',
  props:{
    tempIssueList:{
      type:Array,
      default:[]
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

    /**显示查看,编辑dialog */
    handleShowDialog(row,type){
      this.$emit('showDialog',row,type);
    },
    /**分页 */
    handleCurrentChange(currentPage){
      this.$emit('currentChange',currentPage)
    },
    /**改变is_important属性 */
    handleChangeImportant(row){
      const id = row.id;
      const is_important =row.is_important;//el-switch的v-model已经改变了状态,所以不需要取反
      this.$emit('changeImportant',id,is_important);
    }
  },
  filters:{
    getSummary,
    formatDate
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