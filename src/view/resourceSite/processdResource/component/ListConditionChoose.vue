<template>
    <!-- @keyup.enter.native="search" -->
   

    <div class = "container">
        <!-- 插入WP -->
        <el-row :gutter="20" style="padding-bottom:10px; border-bottom: 1px solid #dae1ed;">
          <el-col :span="3">
            <el-select v-model="insertSiteId" placeholder="请选择网站">
              <el-option
                v-for="item in siteList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-input placeholder="插入数量" v-model="handleCount">
            </el-input>
          </el-col>

          <el-col :span="2" >
            <el-button type="warning" @click="handleInsertWP" >插入WP</el-button>
          </el-col>
          <el-col :span="2" >
            <el-button type="warning" @click="handleUpdateThumbnail" >更新封面图</el-button>
          </el-col>
        </el-row>

        <!-- 重新分享 -->
        <el-row :gutter="20" style="padding:10px 0 10px 0; border-bottom: 1px solid #dae1ed;">
          <el-col :span="2" >
            <el-button type="warning" @click="handleReShare" >重新分享</el-button>
          </el-col>
        </el-row>

        <!-- 更新标签和分类,检查不存在则重新插入WP -->
        <el-row :gutter="20" style="padding:10px 0 10px 0; border-bottom: 1px solid #dae1ed;">
          <el-col :span="4" >
            <el-button type="warning" @click="handleCheckReInsert" >检查不存在则重新插入WP</el-button>
          </el-col>
          <el-col :span="4" >
            <el-button type="warning" @click="handleUpdateTerm" >更新标签,分类,内容,标题</el-button>
          </el-col>
          <el-col :span="4" >
            <el-button type="warning" @click="handleDelSelected" >删除选中资源</el-button>
          </el-col>

          <!-- updatePic -->
        </el-row>

        <!-- 搜索 -->
        <el-row :gutter="24" style="padding:10px 0 10px 0; ">
          <el-col :span="3">
            <el-select v-model="siteId" placeholder="请选择网站">
              <el-option
                v-for="item in siteList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-select v-model="panId" placeholder="请选择网盘">
              <el-option
                v-for="item in panList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-select v-model="isHandle"  placeholder="处理状态" style="width:100px">
                <el-option label="已插入" value="1"></el-option>
                <el-option label="未插入" value="0"></el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-select v-model="isShare" placeholder="分享状态" style="width:100px">
                <el-option label="已分享" value="1"></el-option>
                <el-option label="未分享" value="0"></el-option>
            </el-select>
          </el-col>
          <el-col :span="5">
            <el-input  placeholder="网盘地址/文章标题" type="text" 
              v-model="downloadUrl" @keyup.enter.native="handleSearch">
            </el-input>
          </el-col>
          <el-col :span="2">
            <el-input  placeholder="分类" type="text" 
              v-model="category" @keyup.enter.native="handleSearch">
            </el-input>
          </el-col>
          <el-col :span="2">
            <el-input  placeholder="标签" type="text" 
              v-model="tags" @keyup.enter.native="handleSearch">
            </el-input>
          </el-col>
          <el-col :span="2">
            <el-input placeholder="WP文章id" type="text" 
              v-model="articleId" @keyup.enter.native="handleSearch">
            </el-input>
          </el-col>
          <el-col :span="3">
            <!-- 搜索按钮 | 重置按钮 -->
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button type="primary" @click="handleResert">重置</el-button>
          </el-col>
        </el-row>
          


        
        
        
    </div>
</template>

<script>
export default {
  name: 'ListConditionChoose',
  props:{
    //站点选取
    tempSiteId:Number,
    tempSiteList:Array,
    //网盘选取
    tempPanId:Number,
    tempPanList:Array,
    //插入状态选取
    tempIsHandle:String,
    //网盘地址
    tempDownloadUrl:String,
    //WP文章id
    tempArticleId:String,
    //插入wp数量
    tempHandleCount:String,
    //插入wp的网站id
    tempInsertSiteId:Number,
    //分享状态
    tempIsShare:String,
    //分类
    tempCategory:String,
    //标签
    tempTags:String,
  },
  data() {
    return { 
      //站点选取
      siteList:[],
      siteId:undefined,  
      //网盘选取
      panList:[],
      panId:undefined, 
      //插入状态选取
      isHandle:'',
      //网盘地址
      downloadUrl:'',
      //wp文章id
      articleId:'',
      //插入数量
      handleCount:'',
      //插入wp的网站id
      insertSiteId:undefined,
      //分享状态
      isShare:'',
      //分类
      category:'',
      //标签
      tags:'',
    };
  },
  methods:{
    /**搜索逻辑 */
    handleSearch(){
      this.$emit('search');
    },
    /**重置逻辑 */
    handleResert(){
      this.siteList = []
      this.siteId = undefined
      this.panList = []
      this.panId = undefined
      this.isHandle = ''
      this.downloadUrl = ''
      this.articleId = ''
      this.handleCount = ''
      this.insertSiteId=undefined
      this.isShare =''
      this.category = ''
      this.tags = ''
      this.$emit('reset')
    },
    /**插入wp */
    handleInsertWP(){
      this.$emit('insertWP');
    },
    /**重新分享 */
    handleReShare(){
      this.$emit('reShare')
    },
    /**更新标签和分类 */
    handleUpdateTerm(){
      this.$emit('updateTerm')
    },
    /**检查不存在则重新插入WP */
    handleCheckReInsert(){
      this.$emit('checkReInsert')
    },
    /**删除选中资源 */
    handleDelSelected(){
      this.$emit('delSelected')
    },
    /**更新封面图 */
    handleUpdateThumbnail(){
      this.$emit('updateThumbnail')
    }
  },
  watch:{
    //分类
    category(){
      this.$emit('update:tempCategory',this.category)
    },
    //标签
    tags(){
      this.$emit('update:tempTags',this.tags)
    },
    //插入wp数量
    handleCount(){
      this.$emit('update:tempHandleCount',this.handleCount)
    },
    //插入wp网站资源
    insertSiteId(){
      this.$emit('update:tempInsertSiteId',this.insertSiteId)
    },
    //下载地址
    downloadUrl(){
      this.$emit('update:tempDownloadUrl',this.downloadUrl)
    },
    //WP文章id
    articleId(){
      this.$emit('update:tempArticleId',this.articleId)
    },
    //站点
    siteId(){
      this.$emit('update:tempSiteId',this.siteId)
    },
    tempSiteList(){
      const temp = []
      this.tempSiteList.forEach(c=>{
        temp.push({value:c.id,label:c.domain})
      })
      this.siteList=temp;
    },
    //网盘
    panId(){
      this.$emit('update:tempPanId',this.panId)
    },
    tempPanList(){
      const temp = []
      this.tempPanList.forEach(c=>{
        temp.push({value:c.id,label:c.account})
      })
      this.panList=temp;
    },
    isHandle(){
      this.$emit('update:tempIsHandle',this.isHandle)
    },
    isShare(){
      this.$emit('update:tempIsShare',this.isShare)
    },
    
  }
  
};

//功能按钮备注
console.log(
`功能按钮介绍:

  插入WP: 
    功能介绍: 把处理后的资源插入到wp(按未被插入的资源['publicTime','ASC']插入)
    必选参数: 请选择网站
    可选参数: 插入数量(默认插入选中网站的100个)
  
  更新封面图: 
    功能介绍: 把已经插入到wp中的封面图进行更新(按已经插入的资源['articleId','asc']更新)
    必选参数: 请选择网站
    可选参数: 插入数量(默认更新选中网站的全部)
  
  重新分享: 
    功能介绍: 把已经保存到百度网盘的资源重新分享, 并把分享后的信息更新到crawl_handle_resource中
    必选参数: 列表勾选框idList
    可选参数: 

  检查不存在则重新插入WP: 
    功能介绍: 先根据资源表的articleId检查wp中是否有该文章, 如果没有则重新把该条资源插入wp中
    必选参数: 列表勾选框idList(选中的资源必须是同一个siteId)
    可选参数:

  更新标签,分类,内容,标题: 
    功能介绍: 把已经插入到wp的数据反向更新到crawl_handle_resource表中(按已经插入的资源['update_time','DESC']更新)
    必选参数: 
    可选参数: 列表勾选框idList(默认更新到选中网站的全部,选中的资源必须是同一个siteId)

  
  删除选中资源: 
    功能介绍: 删除crawl_handle_resource表中的某条资源
    必选参数: 列表勾选框idList
    可选参数: 
`)
</script>
<style lang="scss" scoped>
  .container{
    // display: flex;
    // justify-content: flex-end;
    // align-items: center;
    padding:30px 30px 0 30px;

    // .btn-container{
    //   padding-left:30px;
    // }
  }

</style>