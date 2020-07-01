<template>
    <div class="container">
        <div class="header">
            <span>编辑商品</span>
            <span class="back" @click="handleBack">
                <i class="iconfont icon-fanhui"/> 返回
            </span>
        </div>
        <el-divider/>
        <div class="form-container">
            <el-row>
                <el-col :lg="16" :md="20" :sm="24" :xs="24">
                    <ProductForm @submit="handleSubmit" :data="product"/>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import ProductForm from './component/Form'
import ProductM from '../../model/product'
export default {
  name: 'Edit',
  components:{ProductForm},
   props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      product: null,
    }
  },
  created(){
    this.init();
  },
  methods: {
    init(){
        const data = JSON.parse(JSON.stringify(this.data));
        this.product = data;
    },
    // 返回按钮点击事件
    handleBack() {
      this.$emit('back')
    },
    /**提交form表单 */
    async handleSubmit(formData){
       
    },
  },
  
}
</script>

<style lang="scss" scoped>
    .el-divider--horizontal {
        margin: 0
    }

    .container {

        .header {
            height: 59px;
            line-height: 59px;
            color: $parent-title-color;
            font-size: 16px;
            font-weight: 500;
            text-indent: 40px;

            .back {
                float: right;
                margin-right: 40px;
                cursor: pointer;
            }
        }

        .form-container {
           padding: 20px 20px 100px 20px;
        }
    }

    
</style>