<template>
    <div class="container">
      <el-table :data="tempAccountList" >
          <!-- label定义列头显示的文本，prop定义要渲染data数组中元素的哪个字段，width定义列宽 -->
          <!-- id 平台名称 账号 密码 平台网址 手机号 邮箱 邮箱密码 备注 -->
          <el-table-column label="序号" prop="id"></el-table-column>
          <el-table-column label="平台名称" prop="platform_name" ></el-table-column>
          <el-table-column label="账号" prop="account" ></el-table-column>
          <el-table-column label="密码" prop="password" ></el-table-column>
          <el-table-column label="平台网址" prop="website" ></el-table-column>
          <el-table-column label="手机号" prop="phone" ></el-table-column>
          <el-table-column label="邮箱" prop="mailbox" ></el-table-column>
          <el-table-column label="邮箱密码" prop="mailbox_pwd" ></el-table-column>
          <el-table-column label="备注" prop="mailbox_pwd" ></el-table-column>
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
    tempAccountList:{
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