<template>
    <div class="container">
        <!-- 商品基础信息 -->
        <div class="info-container">
            <div class="info-title title-css">商品基础信息</div>
            <el-form :model="product" :rules="rules" status-icon ref="form" label-width="100px" @submit.native.prevent>
                <el-form-item label="商品图片" prop="main_img_url">
                    <upload-imgs ref="uploadMainImg" :max-num="1" :value="mainImgInitDataArr" :remote-fuc="uploadImage"/>
                </el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input size="medium" v-model="product.name" placeholder="商品名称"></el-input>
                </el-form-item>
                <el-form-item label="分类"  >
                  <el-select placeholder="请选择" prop="category" v-model="product.category_id" @change="handleChange">
                    <el-option
                        v-for="item in categories"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="单价" prop="price">
                    <el-input size="medium" v-model="product.price" placeholder="单价"></el-input>
                </el-form-item>
                <el-form-item label="库存" prop="stock">
                    <el-input size="medium" v-model="product.stock" placeholder="库存"></el-input>
                </el-form-item>
                <el-form-item label="概述">
                    <el-input v-model="product.summary" size="medium" type="textarea" :rows="4" placeholder="概述"/>
                </el-form-item>
                <el-form-item label="上架/下架">
                <el-switch v-model="status" active-color="#13ce66" inactive-color="#ff4949" @change="handleStatus"></el-switch>
                </el-form-item>
            </el-form>
        </div>
        <!-- 商品图片 -->
        <div class="images-container">
          <div class="properties-title title-css">商品详情图片</div>
          <upload-imgs ref="uploadImages" :max-num="20" :value="imagesInitDataArr" :remote-fuc="uploadImage"/>
        </div>
        <!-- 商品关联属性 -->
        <div class="properties-container">
            <div class="properties-title title-css">商品属性</div>
            <div class="handle-container">
                <el-button @click="handleAdd">添加</el-button>
                <el-button @click="handleEdit">编辑</el-button>
                <el-button @click="handleDel">删除</el-button>
            </div>
            <div class="properties-table">
                <el-table :data="product.properties" style="width: 100%" @selection-change="handleSelect" ref="multiSelector">
                  <el-table-column  type="selection"  width="55">
                  </el-table-column>
                  <el-table-column label="属性名称">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.name" readonly></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="属性属性">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.detail"  readonly></el-input>
                    </template>
                  </el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog title="添加属性" :visible.sync="dialogVisible">
          <span>添加属性</span>
          <el-form  :inline="true" label-width="100px" @submit.native.prevent>
            <template v-for="(item,key,index) in propertiesArr">
              <el-form-item label="名称" :key="index">
                  <el-input size="medium" v-model="item.name" placeholder="属性名" ></el-input>
              </el-form-item>
              <el-form-item label="属性" :key="index">
                  <el-input size="medium" v-model="item.detail" placeholder="属性值"></el-input>
              </el-form-item>
            </template>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="handlePropertyCancel">取 消</el-button>
            <el-button type="primary" @click="handlePropertyOk">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 页面保存及重置按钮 -->
        <div class="handle-container">
            <el-button @click="resetForm">重 置</el-button>
            <el-button type="primary" @click="handleSubmit">保 存</el-button>
        </div>
    </div>
</template>

<script>
import UploadImgs from '@/component/base/upload-image'
import ProductM from '../../../model/product'
import CategoryM from '../../../model/category'
import { 
  customImageUpload,
  createId,
  initUploadImageArr
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
      product: {
        id: -1,
        main_img_url:'',
        name: '',
        price:0,
        stock:0,
        summary: '',
        status:0,
        category_id:0,
        images:[],
        properties: [],
      },
      status:false,//控制滑块状态
      dialogVisible:false,//控制属性对话框显示
      categories: [],//分类
      mainImgInitDataArr: [],//储存上传的头图
      imagesInitDataArr: [],//储存上传的详情页图
      propertiesArr:[],//临时用来存储对话框中的属性
      selectionArr:[],//临时存储选中的属性
      rules: {
        'main_img_url':[
          {required: true,message: '头图不能为空',trigger: 'blur',}
        ],
        'name': [
           {required: true,message: '名称必填',trigger: 'blur',}
        ],
        'category': [
         {required: true,message: '分类必选',trigger: 'blur',}
        ],
        'price': [
         {required: true,message: '价格必填',trigger: 'blur',}
        ],
        'stock': [
         {required: true,message: '库存必填',trigger: 'blur',}
        ],
      },
    }
  },
  components: {UploadImgs},
  async created() {
    await this.init()
  },
  methods: {

    // 初始化
    async init() {
      this.categories=[]
      this.mainImgInitDataArr=[]
      this.imagesInitDataArr=[]
      this.propertiesArr=[]
      //获取分类
      const categories = (await CategoryM.getAll()).categories;
      categories.map(c=>{
        const data = {
          label:c.name,
          value:c.id
        };
        this.categories.push(data);
      });
      //根据商品赋值
      const data = JSON.parse(JSON.stringify(this.data));
      if(data){
        this.product=data
        //初始化图片
        const imagesInitDataArr = [];
        data.images.map(item=>{
          imagesInitDataArr.push({id:item.img.id,url:item.img.url});
        });
        this.imagesInitDataArr = initUploadImageArr(imagesInitDataArr);
        this.mainImgInitDataArr = initUploadImageArr({url:data.main_img_url,id:data.img_id});
        //初始化属性
        // this.propertiesArr=data.properties;
        //初始化滑块状态
        this.status = data.status==0?false:true;
        console.log(this.product.category.id);
      }
    },
    /**添加属性 */
    handleAdd(){
      this.dialogVisible=true;
      this.propertiesArr=[{name:'',detail:''}]
    },
    /**编辑属性 */
    handleEdit(){
      this.dialogVisible=true;
      this.propertiesArr=JSON.parse(JSON.stringify(this.product.properties));
    },
    /**删除属性 */
    handleDel(){
      if(this.selectionArr.length<1){
        this.$message.error('没有选中任何属性');
        return;
      }
      const realProperties = this.product.properties;
      this.selectionArr.map(property=>{
        for(let index in realProperties){
          if(realProperties[index].name ==property.name){
            realProperties.splice(index,1);
          }
        }
      })
    },
    /**属性对话框关闭事件 */
    handlePropertyCancel(){
      this.dialogVisible=false;
      this.propertiesArr=[];
    },
    /**属性对话框确认事件 */
    handlePropertyOk(){
      this.dialogVisible=false;
      const realProperties = JSON.parse(JSON.stringify(this.product.properties));
      this.propertiesArr.map(property=>{
        for(let index in realProperties){
          if(realProperties[index].name ==property.name){
            realProperties[index]=property
            return 
          }
        }
        realProperties.push(property);
      });
      this.propertiesArr=[];
      this.product.properties=realProperties;
    },
    /**改变滑块状态 */
    handleStatus(){
      this.product.status = this.status==true?1:0;
    },
    /**属性表格选中事件触发*/
    handleSelect(rows){
      this.selectionArr = rows;
    },
    /**分类选择事件 */
    handleChange(val){
      this.category_id = val;
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
      this.init();
    },
    // 提交表单
    async handleSubmit() {
     console.log(this.product)
     console.log()
    },
  },
}
  

</script>

<style lang="scss" scoped>
    .title-css{
       padding-bottom:30px;
        line-height: 59px;
        color: #3963bc;
    }
    .container {
        display: flex;
        flex-direction: column;
        padding-left:30px;
        .info-container{

          .info-title{
            text-indent: 30px;
          } 
        }
        .images-container{
          display: flex;
          flex-direction: column;

        }
        .properties-container{
          display: flex;
          flex-direction: column;
          .handle-container{
            padding-top:0;
            padding-bottom:20px;
          }
        }
        .handle-container{
          padding-top:30px;
        }
      
    }
</style>