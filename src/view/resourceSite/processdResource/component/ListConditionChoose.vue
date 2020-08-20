<template>
    <!-- @keyup.enter.native="search" -->
   

    <div class = "container">
        <!-- 爬取简介 -->
        <el-row :gutter="20" style="padding-bottom:10px">
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
          <el-col :span="2">
            <el-input placeholder="开始页码" v-model="begin">
            </el-input>
          </el-col>
          <!-- <el-col :span="1" style="text-align:center;line-height:40px">至</el-col> -->
          <el-col :span="2">
            <el-input placeholder="结束页码" v-model="end">
            </el-input>
          </el-col>
          <el-col :span="2" >
            <el-button type="warning" @click="handleCrawlIntro" size="medium">爬取简介</el-button>
          </el-col>
        </el-row>

        <!-- 搜索 -->
        <el-row :gutter="20">
            <el-col :span="8" :offset="12" style="padding-bottom:10px">
              <!-- 网站类型/备注 -->
              <el-input class="condition" size="medium" placeholder="网站类型/备注 " type="text" style="width:400px" 
                v-model="remarkType" @keyup.enter.native="handleSearch">
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
    //搜索专用
    tempRemarkType:String,
    //爬取简介专用
    tempBegin:String,
    tempEnd:String,
    tempSiteId:Number,
    tempSiteList:Array,
  },
  data() {
    return { 
      //搜索专用
      remarkType:'',
      //爬取简介专用
      siteList:[],
      siteId:undefined,
      begin:'',
      end:'',  
    };
  },
  methods:{
    /**搜索逻辑 */
    handleSearch(){
      this.$emit('search');
    },
    /**重置逻辑 */
    handleResert(){
      this.remarkType = '',
      this.siteId = undefined
      this.begin = '',
      this.end = '',
      this.$emit('reset')
    },
    /**爬取简介 */
    handleCrawlIntro(){
      this.$emit('crawl');
    }
  },
  watch:{
    remarkType(){
      this.$emit('update:tempRemarkType',this.remarkType)
    },
    //爬取简介专用
    siteId(){
      this.$emit('update:tempSiteId',this.siteId)
    },
    begin(){
      this.$emit('update:tempBegin',this.begin)
    },
    end(){
      this.$emit('update:tempEnd',this.end)
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

    // .btn-container{
    //   padding-left:30px;
    // }
  }

</style>