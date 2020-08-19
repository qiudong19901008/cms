<template>
    <!-- @keyup.enter.native="search" -->
    <div class = "container">
        <div class="form-container">
          <!-- 网站类型/备注 -->
          <el-input class="condition" size="medium" placeholder="网站类型/备注 " type="text" style="width:400px" 
            v-model="remarkType" @keyup.enter.native="handleSearch">
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
    tempRemarkType:String
  },
  data() {
    return { 
      remarkType:''    
    };
  },
  methods:{
    /**搜索逻辑 */
    handleSearch(){
      this.$emit('search');
    },
    /**重置逻辑 */
    handleResert(){
      this.remarkType = '' 
      this.$emit('reset')
    },
  },
  watch:{
    remarkType(){
      this.$emit('update:tempRemarkType',this.remarkType)
    },
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