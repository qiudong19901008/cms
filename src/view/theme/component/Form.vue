<template>
    <div class="container">
        <!-- 主题基础信息 -->
        <div class="theme-fox">
            <el-form :model="temp" :rules="rules" status-icon ref="form" label-width="100px" @submit.native.prevent>
                <el-form-item label="名称" prop="name">
                    <el-input size="medium" v-model="temp.name" placeholder="精选主题名称"></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="description">
                    <el-input v-model="temp.description" size="medium" type="textarea" :rows="4" placeholder="精选主题简介"/>
                </el-form-item>
                <el-form-item label="主题图" prop="topic_img.id">
                    <upload-imgs ref="uploadTopic" :max-num="1" :value="topicImgInitDataArr" :remote-fuc="uploadImage"/>
                </el-form-item>
                <el-form-item label="详情页头图" prop="head_img.id">
                    <upload-imgs ref="uploadHead" :max-num="1" :value="headImgInitDataArr" :remote-fuc="uploadImage"/>
                </el-form-item>
            </el-form>
        </div>
        <!-- 主题关联商品列表 -->
        <div class="product-fox">
            <div class="product-fox-title">关联商品</div>
            <div class="theme-product-options">
                <el-button @click="handleChange">更改</el-button>
                <!--                <el-button @click="handleDelProduct">删除</el-button>-->
            </div>
            <div class="theme-product-table">
                <el-table :data="temp.products" style="width: 100%">
                    <el-table-column type="index" width="55"/>
                    <el-table-column label="商品名称" prop="name"/>
                    <el-table-column label="单价" prop="price"/>
                    <el-table-column label="剩余库存" prop="stock"/>
                    <el-table-column label="商品摘要" prop="summary"/>
                </el-table>
            </div>
        </div>
        <!-- 页面保存及重置按钮 -->
        <div class="submit-box">
            <el-button @click="resetForm">重 置</el-button>
            <el-button type="primary" @click="handleSubmit">保 存</el-button>
        </div>
        <!-- 更改主题关联商品对话框 -->
        <el-dialog title="更改主题关联商品" :visible.sync="changeDialogVisible">
            <el-transfer v-loading="loading" v-model="selectedTransfer" :data="transferList"></el-transfer>
            <span slot="footer" class="dialog-footer">
                <el-button @click="changeDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleConfirmChange">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import UploadImgs from '@/component/base/upload-image'
import ProductM from '../../../model/product'
import { 
  customImageUpload,
  createId
 } from '@/lin/util/myUtil'

export default {
  name: 'Form',
  props: {
   data: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      transferList: [],//所有待选框商品
      selectedTransfer: [],//已经选择的商品
      temp: {
        id: undefined,
        name: '',
        description: '',
        topic_img: {
          id: '',
          url: '',
        },
        head_img: {
          id: '',
          url: '',
        },
        products: [],
      },
      loading: false,//加载动画
      changeDialogVisible: false,//穿梭框显示控制
      productList: [],//储存穿梭框商品数据
      topicImgInitDataArr: [],//储存上传的头图
      headImgInitDataArr: [],//储存上传的详情页图
      rules: {
        name: [
          {
            required: true,
            message: '请输入主题名称',
            trigger: 'blur',
          },
        ],
        'topic_img.id': [
          {
            required: true,
            message: '主题图片不能为空',
            trigger: 'blur',
          },
        ],
        'head_img.id': [
          {
            required: true,
            message: '主题详情页头图不能为空',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  components: {UploadImgs},
  created() {
    this.init()
  },
  methods: {
    // 初始化
    init() {
      const data = JSON.parse(JSON.stringify(this.data))
      this.temp = this.data  ?  data: this.temp
      const topicImgInitData = {
        id: createId(),
        imgId: this.temp.topic_img.id?this.temp.topic_img.id:'',
        display: this.temp.topic_img.url?this.temp.topic_img.url:'',
      }
      const headImgInitData = {
        id: createId(),
        imgId: this.temp.head_img.id?this.temp.head_img.id:'',
        display: this.temp.head_img.url?this.temp.head_img.url:'',
      }
      this.topicImgInitDataArr.push(topicImgInitData)
      this.headImgInitDataArr.push(headImgInitData)
    },
    //打开穿梭框
    handleChange() {
      this._generateData()
      this.changeDialogVisible = true
    },
    /**生成穿梭框内的数据 */
    async _generateData() {
      const data = []
      try {
        this.loading = true
        this.productList = await ProductM.getUsable();
        this.loading = false
      } catch (e) {
        this.productList = []
        this.loading = false
      }
      // 生成所有商品的列表
      for (let i = 0; i < this.productList.length; i++) {
        data.push({
          key: this.productList[i].id,
          label: this.productList[i].name,
        })
      }
      this.transferList = data
      // 初始化已选择的商品选项
      this.selectedTransfer = []
      this.temp.products.map(product => this.selectedTransfer.push(product.id))
    },
    // 提交表单
    async handleSubmit() {
      if (this.temp.products.length < 1) {
        this.$message.error('主题关联商品不能为空')
        return;
      }

      const topicImg = await this.$refs.uploadTopic.getValue()
      const headImg = await this.$refs.uploadHead.getValue()
      if (topicImg[0].imgId) {
        this.temp.topic_img.id = topicImg[0].imgId
      }

      if (headImg[0].imgId) {
        this.temp.head_img.id = headImg[0].imgId
      }

      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.$emit('submit', this.temp)
        }
      })
    },
    
    // 确认更改
    handleConfirmChange() {
      const newProductList = []
      this.selectedTransfer.forEach((id) => {
        const item = this.productList.find(product => product.id === id)
        newProductList.push(item)
      })
      this.temp.products = newProductList
      this.changeDialogVisible = false
    },
    // 自定义图片上传组件上传
    async uploadImage(file) {
      const res = await customImageUpload(file)
      return Promise.resolve({
        id: res[0].id,
        url: res[0].url,
      })
    },
    // 表单重置
    resetForm() {
       this.topicImgInitDataArr=[];
       this.headImgInitDataArr=[];
       this.init();
    },
    
  },
  
}
</script>

<style lang="scss" scoped>
    .container {
        .product-fox {
            .product-fox-title {
                height: 59px;
                line-height: 59px;
                color: $parent-title-color;
                font-size: 16px;
                font-weight: 500;
            }

            .theme-product-options {
                margin-bottom: 20px;
            }
        }

        .submit-box {
            margin-top: 20px;
            text-align: center;
        }
    }
</style>