<template>
    <!-- @keyup.enter.native="search" -->
   

    <div class = "container">
        <!-- 插入WP -->
        <el-row :gutter="20" style="padding-bottom:10px">
          <el-col :span="2">
            <el-input placeholder="插入数量" v-model="handleCount">
            </el-input>
          </el-col>
          <el-col :span="2" >
            <el-button type="warning" @click="handleInsertWP" size="medium">插入WP</el-button>
          </el-col>
        </el-row>

        <!-- 搜索 -->
        <el-row :gutter="20">
          <el-col :span="3" :offset="3">
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
          <el-col :span="6">
            <el-input  placeholder="网盘地址" type="text" 
              v-model="downloadUrl" @keyup.enter.native="handleSearch">
            </el-input>
          </el-col>
          <el-col :span="3">
            <el-input placeholder="WP文章id" type="text" 
              v-model="articleId" @keyup.enter.native="handleSearch">
            </el-input>
          </el-col>
          <el-col :span="4">
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
      this.$emit('reset')
    },
    /**爬取简介 */
    handleInsertWP(){
      this.$emit('insertWP');
    }
  },
  watch:{
    //
    handleCount(){
      this.$emit('update:tempHandleCount',this.handleCount)
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
    }
  }
};
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