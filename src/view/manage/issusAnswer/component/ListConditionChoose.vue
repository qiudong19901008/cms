<template>
    <!-- @keyup.enter.native="search" -->
    <div class = "container">
        <div class="form-container">
          <!-- 分类选择 -->
          <el-select class="condition"  size="medium" filterable placeholder="分类" v-model="categoryId" >
            <el-option
              v-for="item in categoryList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <!-- 关键字选择 -->
          <el-input class="condition" size="medium" placeholder="关键字" type="text" style="width:200px" 
            v-model="keyword" @keyup.enter.native="handleSearch">
          </el-input>
          <!-- 问题选择 -->
          <el-input class="condition" size="medium" placeholder="问题" type="text" style="width:400px" 
            v-model="issue" @keyup.enter.native="handleSearch">
          </el-input>
        </div>
        <!-- 搜索按钮 | 重置按钮 -->
        <div class = "btn-container">
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button type="primary" @click="handleResert">重置</el-button>
        </div>
        
    </div>
</template>

<script>
export default {
  name: 'ListConditionChoose',
  props:{
    tempCategoryList:Array,
    tempKeyword:String,
    tempIssue:String,
    tempCategoryId:Number,
  },
  data() {
    return { 
        categoryId:undefined,
        keyword:'',
        issue:'',
        categoryList:[]      
    };
  },
  methods:{
    /**搜索逻辑 */
    handleSearch(){
      this.$emit('search');
    },
    /**重置逻辑 */
    handleResert(){
      this.keyword = '';
      this.issue ='';
      this.categoryId=undefined;
      this.$emit('reset')
    },
  },
  watch:{
    keyword(){
      this.$emit('update:tempKeyword',this.keyword)
    },
    issue(){
      this.$emit('update:tempIssue',this.issue)
    },
    categoryId(){
      this.$emit('update:tempCategoryId',this.categoryId)
    },
    tempCategoryList(){
      const temp = []
      this.tempCategoryList.forEach(c=>{
        temp.push({value:c.id,label:c.name})
      })
      this.categoryList=temp;
    }
  }
};
</script>
<style lang="scss" scoped>
  .container{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding:30px 30px 0 30px;
    .form-container{
      .condition{
        margin-right:30px;
      }
    }
    .btn-container{
      padding-left:30px;
    }
  }

</style>