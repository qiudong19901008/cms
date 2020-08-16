<template>
    <!-- @keyup.enter.native="search" -->
    <div class = "container">
        <div class="form-container">
          <!-- 平台名称|网址|备注 -->
          <el-input class="condition" size="medium" placeholder="平台名称/网址/备注" type="text" style="width:400px" 
            v-model="remarkWebsitePlatform" @keyup.enter.native="handleSearch">
          </el-input>
          <!-- 账号名称 -->
          <el-input class="condition" size="medium" placeholder="账号名称" type="text" style="width:200px" 
            v-model="accountName" @keyup.enter.native="handleSearch">
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
    tempRemarkWebsitePlatform:String,
    tempAccountName:String
  },
  data() {
    return { 
      remarkWebsitePlatform:'',   
      accountName:''
    };
  },
  methods:{
    /**搜索逻辑 */
    handleSearch(){
      this.$emit('search');
    },
    /**重置逻辑 */
    handleResert(){
      this.remarkWebsitePlatform = '',  
      this.accountName = '',
      this.$emit('reset')
    },
  },
  watch:{
    remarkWebsitePlatform(){
      this.$emit('update:tempRemarkWebsitePlatform',this.remarkWebsitePlatform)
    },
    accountName(){
      this.$emit('update:tempAccountName',this.accountName)
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