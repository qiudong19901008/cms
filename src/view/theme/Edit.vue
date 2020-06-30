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
import ThemeM from '../../model/theme'
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
            padding: 20px 20px 40px 20px;
        }
    }
</style>