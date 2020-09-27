<template>
    <div class="container">
      <el-table :data="tempSiteList" >
          <!-- label定义列头显示的文本，prop定义要渲染data数组中元素的哪个字段，width定义列宽 -->
          <el-table-column label="序号" prop="id"></el-table-column>
          <el-table-column label="基础URL" prop="baseUrl" >
             <template slot-scope="scope"> 
              {{scope.row.baseUrl | getSummary}}
             </template>
          </el-table-column>
          <el-table-column label="总页数" prop="pageNum" ></el-table-column>
          <el-table-column label="域名" prop="domain" ></el-table-column>
          <el-table-column label="网站类型" prop="type" ></el-table-column>
          <el-table-column label="登陆账号" prop="account" ></el-table-column>
          <el-table-column label="登陆密码" prop="secret" ></el-table-column>
          <el-table-column label="登陆URL" prop="loginUrl" >
             <template slot-scope="scope"> 
              {{scope.row.loginUrl | getSummary}}
             </template>
          </el-table-column>
          <el-table-column label="主页URL" prop="mainUrl" >
             <template slot-scope="scope"> 
              {{scope.row.mainUrl | getSummary}}
             </template>
          </el-table-column>
          <el-table-column label="备注" prop="remark" >
            <template slot-scope="scope"> 
              {{scope.row.remark | getSummary}}
             </template>
          </el-table-column>
          <el-table-column label="登陆cookies" prop="loginCookies" >
             <template slot-scope="scope"> 
              {{scope.row.loginCookies | getSummary}}
             </template>
          </el-table-column>
          <el-table-column label="是否需要token" prop="needToken" >
             <template slot-scope="scope"> 
              <el-tag type="info" v-if="scope.row.needToken==0">不需要</el-tag>
              <el-tag type="primary" v-else >需要</el-tag>
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
    tempSiteList:{
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