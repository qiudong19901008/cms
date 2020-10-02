<template>
    <div class="container">
      <el-table :data="tempIntroList" @selection-change="handleSelectionChange">

          <!-- label定义列头显示的文本，prop定义要渲染data数组中元素的哪个字段，width定义列宽 -->
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="序号" prop="id"></el-table-column>
          <el-table-column label="文章id" prop="articleId" ></el-table-column>
          <el-table-column label="内容页url" prop="contentUrl" >
            <template slot-scope="scope"> 
              {{scope.row.contentUrl | getSummary}}
            </template>
          </el-table-column>
          <el-table-column label="封面图片" >
            <template slot-scope="scope"> 
              <img :src="scope.row.imgSrc"  min-width="70" height="70" />
            </template>
          </el-table-column>
          <el-table-column label="分类" prop="categories" ></el-table-column>
          <el-table-column label="文章标题" prop="articleTitle" >
            <template slot-scope="scope"> 
              {{scope.row.articleTitle | getSummary}}
            </template>
          </el-table-column>
          <el-table-column label="所属网站" prop="site.domain" ></el-table-column>
          <el-table-column label="已爬取详情" prop="isDeal">
            <template slot-scope="scope">
              <el-tag type="danger" v-if="scope.row.isDeal==0">未抓取</el-tag>
              <el-tag type="info" v-else >已抓取</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="已处理过" prop="isHandle" >
            <template slot-scope="scope">
              <el-tag type="danger" v-if="scope.row.isHandle==0">未处理</el-tag>
              <el-tag type="info" v-else >已处理</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="200">
              <template slot-scope="scope"> 
                  <el-button plain size="mini" type="primary" @click="handleShowDialog(scope.row,'check')" >查看</el-button>
                  <!-- <el-button plain size="mini" type="warning" @click="handleShowDialog(scope.row,'edit')" >编辑</el-button> -->
                  <el-button plain size="mini" type="danger" @click="handleShowDialog(scope.row,'del')" >删除</el-button>
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
    tempIntroList:{
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