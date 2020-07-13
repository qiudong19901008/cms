<template>
    <el-form ref="form" :rules="rules" :model="category" status-icon label-width="100px" @submit.native.prevent>
        <!-- 名称 -->
        <el-form-item label="名称" prop="name">
            <el-input size="medium" v-model="category.name" placeholder="分类名称"/>
        </el-form-item>
        <!-- 描述 -->
        <el-form-item label="简介">
            <el-input size="medium" type="textarea" :rows="4" placeholder="可选，分类简介" v-model="category.description"/>
        </el-form-item>
        <!-- 头图-->
        <el-form-item label="头图" prop="topic_img.id">
          <upload-imgs ref="topicImg" :max-num="1" :value="topicImgArr" :remote-fuc="uploadImage"/>
        </el-form-item>
        <!--按钮-->
        <el-form-item>
            <el-button @click="resetForm">重 置</el-button>
            <el-button type="primary" @click="handleSubmit">保 存</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import UploadImgs from '@/component/base/upload-image'//lin-cms-vue自带的上传组件
import { 
  customImageUpload,
  createId
 } from '@/lin/util/myUtil'

export default {
  name: 'Form',
  components: { UploadImgs },
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      category: {
        id: -1,
        name: '',
        description: '',
        topic_img:{
          id:-1,
          url:''
        }
      },
      rules: {
        'name': [
          {required: true,message: '请输入分类名称',trigger: 'blur',},
        ],
        'topic_img.id': [
          { required: true,message: '分类头图不能为空',trigger: 'blur',},
        ],
      },
      topicImgArr:[]//用来传递上传组件数据的数组
     
    }
  },
  created() {
    this.init();
  },
  methods: {
    /**
     * 初始化
     */
    init(){
      this.topicImgArr=[];
      const data = JSON.parse(JSON.stringify(this.data));//传入的数据
      console.log(data)
      if(data){
        this.category=data//如果是编辑就会被赋值
        const topicImg = {
          id: createId(),
          imgId: this.category.topic_img.id,
          display: this.category.topic_img.url,
        };
        this.topicImgArr.push(topicImg);
      }
    },
    /**
     * 提交表单
     * 
     */
    async handleSubmit() {
        const topicImgArr = await this.$refs.topicImg.getValue();
        this.category.topic_img.id=topicImgArr[0].imgId;
        this.$refs.form.validate(async (valid)=>{
          if(valid){
            this.$emit('submit',this.category);
          }
        })
    },
    /**
     * 重置表单
     */
    resetForm() {
      this.init();
    },
    /**
     * 自定义上传图片方法
     */
    async uploadImage(file) {
      const res = await customImageUpload(file)
      const topicImg = {
          id: createId(),
          imgId: res[0].id,
          display: res[0].url,
      };
      this.topicImgArr[0]=topicImg;
      return Promise.resolve({
        id: res[0].id,
        url: res[0].url,
      })
    },
    
  },
}
</script>

<style lang="scss" scoped>
    .banner-item-title {
        display: flex;
        align-items: center;

        .banner-item-title-text {
            margin-right: 10px;
        }
    }
</style>