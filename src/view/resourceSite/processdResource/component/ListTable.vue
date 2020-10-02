<template>
    <div class="container">
      <el-table :data="tempResourceList"  @selection-change="handleSelectionChange">
          <!-- label定义列头显示的文本，prop定义要渲染data数组中元素的哪个字段，width定义列宽 -->
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="序号" prop="id"></el-table-column>
          <el-table-column label="标题" prop="title" >
            <template slot-scope="scope"> 
              {{scope.row.title | getSummary}}
            </template>
          </el-table-column>
          <el-table-column label="封面图" prop="intro_img" >
            <template slot-scope="scope"> 
              <img :src="scope.row.intro_img"  min-width="70" height="70" />
            </template>
          </el-table-column>
          <el-table-column label="分类" prop="category" >
            <template slot-scope="scope"> 
              {{scope.row.category | getSummary}}
            </template>
          </el-table-column>
          <el-table-column label="标签" prop="tags" ></el-table-column>
          <el-table-column label="下载地址" prop="downloadUrl" >
            <template slot-scope="scope"> 
              {{scope.row.downloadUrl | getSummary}}
            </template>
          </el-table-column>
          <el-table-column label="密码" prop="pwd" ></el-table-column>
          <el-table-column label="解压码" prop="compressCode" ></el-table-column>
          <el-table-column label="文件保存目录" prop="file_dir" >
            <template slot-scope="scope"> 
              {{scope.row.file_dir | getSummary}}
            </template>
          </el-table-column>
          <el-table-column label="是否已插入WP" prop="is_handle" >
            <template slot-scope="scope">
              <el-tag type="danger" v-if="scope.row.is_handle==0">未插入</el-tag>
              <el-tag type="info" v-else >已插入</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="分享id" prop="shareid" ></el-table-column>
          <el-table-column label="网盘" prop="pan.account" ></el-table-column>
          <el-table-column label="被爬取网站" prop="site.domain" ></el-table-column>
          <el-table-column label="WP文章id" prop="articleId" ></el-table-column>
          <el-table-column label="操作" fixed="right" min-width="200">
              <template slot-scope="scope"> 
                  <el-button plain size="mini" type="primary" @click="handleShowDialog(scope.row,'check')" >查看</el-button>
                  <!-- <el-button plain size="mini" type="warning" @click="handleShowDialog(scope.row,'edit')" >编辑</el-button>
                  <el-button plain size="mini" type="danger" @click="handleShowDialog(scope.row,'del')" >删除</el-button> -->
              </template>
          </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          background
          layout="total,prev, pager, next,jumper"
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
    tempResourceList:{
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
    },

    /**表格选择状态改变触发 */
    handleSelectionChange(rows){
      const idList=[]
      rows.forEach((row)=>{
        idList.push(row['id'])
      })
      // console.log(idList)
      this.$emit('changeSelection',idList,rows);
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