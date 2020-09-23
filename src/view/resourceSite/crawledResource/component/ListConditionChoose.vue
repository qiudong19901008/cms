<template>
    <!-- @keyup.enter.native="search" -->
    <div class = "container">
        <!-- 爬取详情  处理资源 -->
        <el-row :gutter="20" style="padding:10px 0 30px 0; border-bottom: 1px solid #dae1ed;" >
          <el-col :span="3">
            <el-select  filterable placeholder="网站域名" v-model="siteId" >
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
          <el-col :span="3">
            <el-select filterable placeholder="网盘账号" v-model="panId" >
              <el-option
                v-for="item in panList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6" >
            <el-button type="warning" @click="handleCrawlContent" size="medium">爬取详情</el-button>
            <el-button type="warning" @click="handleProcessResource" size="medium">处理资源</el-button>
             <el-button type="warning" @click="handleTransferResource" size="medium">转存资源</el-button>
          </el-col>
        </el-row>

        <!-- 搜索 -->
        <el-row :gutter="20" style="padding:30px 0 10px 0;">
          <el-col :span="3" >
            <el-select v-model="isDeal" placeholder="详情状态" >
              <el-option label="已抓取" value="1"></el-option>
              <el-option label="未抓取" value="0"></el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-select v-model="isHandle" placeholder="处理状态" >
                <el-option label="已处理" value="1"></el-option>
                <el-option label="未处理" value="0"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-input placeholder="分类/标签" type="text" 
              v-model="categoryOrTags" @keyup.enter.native="handleSearch">
            </el-input>
          </el-col>
          <!-- <el-col :span="4">
            <el-input  placeholder="网站域名/网站名称" type="text" 
              v-model="siteDomainOrName" @keyup.enter.native="handleSearch">
            </el-input>
          </el-col> -->
          <el-col :span="4">
            <el-select  filterable placeholder="网站域名" v-model="siteDomainOrName" >
              <el-option
                v-for="item in siteList"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4" :offset="6">
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
    tempPanList:Array,
    tempPanId:Number,
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
      panList:[],
      panId:undefined,
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
      this.panId=undefined
      this.$emit('reset')
    },
    /**爬取详情 */
    handleCrawlContent(){
      this.$emit('crawlContent')
    },
    /**处理资源 */
    handleProcessResource(){
      this.$emit('processResource')
    },
    /**转存资源 */
    handleTransferResource(){
      this.$emit('transferResource')
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
    handleCount(){
      this.$emit('update:tempHandleCount',this.handleCount)
    },
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
    panId(){
      this.$emit('update:tempPanId',this.panId)
    },
    tempPanList(){
      const temp = []
      this.tempPanList.forEach(c=>{
        temp.push({value:c.id,label:c.account})
      })
      this.panList=temp;
    }


  }
};

//功能按钮介绍
console.log(
`功能按钮介绍:

  爬取详情: 
    功能介绍:根据简介信息中的contentUrl字段, 爬取详细信息(按未被爬取的详情['publicTime','DESC']爬取)
    必选参数:网站域名
    可选参数:数量(如果未输入,默认爬取100个)
  
  处理资源:
    功能介绍:根据爬取到的简介信息和详细信息组合成一条数据, 进行适当的处理,并把资源保存到百度网盘中,并且生成分享链接(按已完全爬取未被处理的资源['publicTime','DESC']处理)
    必选参数:网站域名,网盘账号
    可选参数:数量(如果未输入,默认处理100个)

  转存资源:
    功能介绍:根据爬取到的简介信息和详细信息组合成一条数据, 进行适当的处理,并把资源保存到百度网盘中(按已完全爬取未被处理的资源['publicTime','DESC']处理)
    必选参数:网站域名,网盘账号
    可选参数:数量(如果未输入,默认处理100个)
`)
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