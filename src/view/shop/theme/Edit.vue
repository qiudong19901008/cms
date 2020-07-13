<!-- src/views/operation/theme/Edit.vue -->
<template>
    <div class="container">
        <div class="header">
            <span>编辑精选主题</span>
            <span class="back" @click="handleBack">
        <i class="iconfont icon-fanhui"></i> 返回
      </span>
        </div>
        <el-divider></el-divider>
        <div class="form-container">
            <el-row>
                <el-col :lg="16" :md="20" :sm="24" :xs="24">
                    <ThemeForm @submit="handleSubmit" :data="theme"/>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import ThemeM from '@/model/theme'
import ThemeForm from './component/Form'
export default {
  name: 'Edit',
  components:{ThemeForm},
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      loading: false,
      theme: null,
    }
  },
  created() {
    this.theme = this.data;
  },

  methods: {
    async handleSubmit(formData) {
      const themeId= formData.id;
      const newProducts = JSON.parse(JSON.stringify(formData.products));
      const newProductIdArr = newProducts.map(p=>p.id);
      const oldProducts = this.theme.products;
      const oldProductIdArr = oldProducts.map(p=>p.id);
      const mainInfo = {
        name:formData.name,
        description:formData.description,
        head_img_id:formData.head_img.id,
        topic_img_id:formData.topic_img.id,
      };
       try {
            await ThemeM.editOne(themeId,mainInfo);
            await ThemeM.delProducts(themeId,oldProductIdArr);
            await ThemeM.addProducts(themeId,newProductIdArr);
            this.$message.success('修改成功')
            this.handleBack()
        } catch (e) {
            this.$message.error('修改失败');
        }

    },

    handleBack() {
      this.$emit('back')
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