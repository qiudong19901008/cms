<template>
    <!-- @keyup.enter.native="search" -->
    <div class = "container">
        <!-- 爬取详情  处理资源 -->
        <el-row :gutter="20" style="padding-bottom:10px">
          <el-col :span="3">
            <el-select size="medium" filterable placeholder="网站域名" v-model="siteId" >
              <el-option
                v-for="item in siteList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-input placeholder="数量" v-model="handleCount"></el-input>
          </el-col>
          <el-col :span="4" >
            <el-button type="warning" @click="handleCrawlContent" size="medium">爬取详情</el-button>
            <el-button type="warning" @click="handleProcessResource" size="medium">处理资源</el-button>
          </el-col>
        </el-row>
        <!-- 搜索 -->
        <el-row :gutter="20">
          <el-col :span="2" :offset="8">
            <el-select v-model="isDeal" size="small" placeholder="详情状态" style="width:100px">
              <el-option label="已抓取" value="1"></el-option>
              <el-option label="未抓取" value="0"></el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-select v-model="isHandle" size="small" placeholder="处理状态" style="width:100px">
                <el-option label="已处理" value="1"></el-option>
                <el-option label="未处理" value="0"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-input size="small" placeholder="分类/标签" type="text" style="width:200px" 
              v-model="categoryOrTags" @keyup.enter.native="handleSearch">
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-input size="small" placeholder="网站域名/网站名称" type="text" style="width:200px" 
              v-model="siteDomainOrName" @keyup.enter.native="handleSearch">
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
    tempIsDeal:String,
    tempIsHandle:String,
    tempCategoryOrTags:String,
    tempSiteDomainOrName:String,
    tempSiteList:Array,
    tempSiteId:Number,
    tempHandleCount:String,
  },
  data() {
    return { 
      isDeal:'',
      isHandle:'', 
      categoryOrTags:'',
      siteDomainOrName:'',
      siteList:[],
      siteId:undefined,
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
      this.isDeal = '' 
      this.isHandle = ''
      this.categoryOrTags=''
      this.siteDomainOrName=''
      this.siteId=undefined
      this.handleCount = '',
      this.$emit('reset')
    },
    /**爬取详情 */
    handleCrawlContent(){
      this.$emit('crawlContent')
    },
    /**处理资源 */
    handleProcessResource(){
      this.$emit('processResource')
    }
  },
  watch:{
    isDeal(){
      this.$emit('update:tempIsDeal',this.isDeal)
    },
    isHandle(){
      this.$emit('update:tempIsHandle',this.isHandle)
    },
    categoryOrTags(){
      this.$emit('update:tempCategoryOrTags',this.categoryOrTags)
    },
    siteDomainOrName(){
      this.$emit('update:tempSiteDomainOrName',this.siteDomainOrName)
    },
    siteId(){
      this.$emit('update:tempSiteId',this.siteId)
    },
    handleCount(){
      this.$emit('update:tempHandleCount',this.handleCount)
    },
    tempSiteList(){
      const temp = []
      this.tempSiteList.forEach(c=>{
        temp.push({value:c.id,label:c.domain})
      })
      this.siteList=temp;
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
    // .form-container{
    //   .condition{
    //     margin-right:30px;
    //   }
    // }
    // .btn-container{
    //   padding-left:30px;
    // }
  }

</style>