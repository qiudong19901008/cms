<!-- src/views/banner/add.vue -->
<template>
    <div class="container">
        <div class="header">
            <span>新增轮播图</span>
            <span class="back" @click="handleBack">
                <i class="iconfont icon-fanhui"/> 返回
            </span>
        </div>
        <el-divider/>
        <div class="form-container">
            <el-row>
                <el-col :lg="16" :md="20" :sm="24" :xs="24">
                    <BannerForm @submit="handleSubmit"/>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import BannerForm from './compenent/form'
import BannerM from '../../model/banner'
export default {
  name: 'Add',
  methods: {
    // 返回按钮点击事件
    handleBack() {
      this.$emit('back')
    },
    /**提交form表单 */
    async handleSubmit(formData){
        //提取三个有用的字段img_id、key_word、type
        formData.items = formData.items.map(item => ({
            img_id: item.img_id,
            key_word: item.key_word,
            type: item.type,
        }))
        try {
            const res = await BannerM.createBanner(formData)
            this.$message.success('新增成功')
            this.handleBack()
        } catch (e) {
            this.$message.error(e)
        }
    },
  },
  components:{BannerForm},
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