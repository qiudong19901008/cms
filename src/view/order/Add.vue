<!-- src/views/banner/add.vue -->
<template>
    <div class="container">
        <div class="header">
            <span>新增分类</span>
            <span class="back" @click="handleBack">
                <i class="iconfont icon-fanhui"/> 返回
            </span>
        </div>
        <el-divider/>
        <div class="form-container">
            <el-row>
                <el-col :lg="16" :md="20" :sm="24" :xs="24">
                    <CategoryForm @submit="handleSubmit"/>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import CategoryForm from './component/Form'
import CategoryM from '../../model/category'
export default {
  name: 'Add',
  components:{CategoryForm},
  methods: {
    // 返回按钮点击事件
    handleBack() {
      this.$emit('back')
    },
    /**提交form表单 */
    async handleSubmit(formData){
        console.log(formData)
       const submitInfo={
           name:formData.name,
           description:formData.description,
           topic_img_id:formData.topic_img.id,
           from:1
       }
       try{
           await CategoryM.addOne(submitInfo);
           this.$message.success('新增成功');
           this.handleBack();
       }catch(e){
           this.$message.error('新增失败');
       }
       
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
            margin-top: 40px;
        }
    }
</style>