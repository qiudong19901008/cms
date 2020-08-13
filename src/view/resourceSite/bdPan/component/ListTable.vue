<template>
    <div class="container">
      <el-table :data="tempBDPanList" >
          <!-- label定义列头显示的文本，prop定义要渲染data数组中元素的哪个字段，width定义列宽 -->
          <el-table-column label="序号" prop="id"></el-table-column>
          <el-table-column label="用户名" prop="username" ></el-table-column>
          <el-table-column label="账号" prop="account" ></el-table-column>
          <el-table-column label="密码" prop="password" ></el-table-column>
          <el-table-column label="注册邮箱" prop="mailbox" ></el-table-column>
          <el-table-column label="邮箱密码" prop="mailbox_pwd" ></el-table-column>
          <!-- <el-table-column label="已用容量" prop="used_capacity" ></el-table-column> -->
          <el-table-column label="所有容量" prop="total_capacity" >
            <template slot-scope="scope">
              {{scope.row.total_capacity+'G'}}
            </template>
          </el-table-column>
          <el-table-column label="可用容量" >
            <template slot-scope="scope">
              {{scope.row.total_capacity-scope.row.used_capacity+'G'}}
            </template>
          </el-table-column>
          <el-table-column label="BDUSS">
              <template slot-scope="scope">
                {{scope.row.BDUSS | getSummary}}
              </template>
          </el-table-column>
          <el-table-column label="STOKEN">
              <template slot-scope="scope">
                {{scope.row.STOKEN | getSummary}}
              </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="200">
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
          @current-change= "handleCurrentChange"
          :total= "tempCount"
          :page-size= "tempPageSize"
          :current-page= "tempCurrentPage"
          >
        </el-pagination>
      </div>
    </div>
    
   
    
</template>

<script>
import {getSummary,formatDate} from '@/lin/util/myUtil'
export default {
  name: 'ListTable',
  props:{
    tempBDPanList:{
      type:Array,
      default:[]
    },
    tempCount:Number,
    tempPageSize:{
      type:Number,
      default:10
    },
    tempCurrentPage:{
      type:Number,
      default:1
    }
  },
  data() {
    return{
    
    }
  },
  methods:{

    /**分页 */
    handleCurrentChange(currentPage){
      this.$emit('currentChange',currentPage)
    },

    /**显示查看,编辑,删除dialog */
    handleShowDialog(row,type){
      this.$emit('showDialog',row,type);
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