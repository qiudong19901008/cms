
<template>
  <div class="lin-container" v-if="!switchComponent">
    <div class="lin-title">商品库</div>
    <div class="button-container">
        <!-- 指定button类型 -->
        <el-button class="add" type="primary" @click="handleAdd">新增</el-button>
        <div>
          <el-input size="medium" v-model="q" placeholder="搜索名称" style="width:200px" @keyup.enter.native="handleSearch"></el-input>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </div>
    </div>
    <div class="table-container">
        <el-table :data="productList" v-loading="loading">
            <!-- label定义列头显示的文本，prop定义要渲染data数组中元素的哪个字段，width定义列宽 -->
            <el-table-column label="序号" prop="id" width="100"></el-table-column>
            <el-table-column label="商品图片" prop="main_img_url" width="100">
              <template slot-scope="scope">            
                  <img :src="scope.row.main_img_url" />
              </template> 
            </el-table-column>
            <el-table-column label="商品名称" prop="name"></el-table-column>
            <el-table-column label="所属分类" prop="category.name"></el-table-column>
            <el-table-column label="商品单价" prop="price"></el-table-column>
            <el-table-column label="商品库存" prop="stock"></el-table-column>
            <el-table-column label="商品概要" prop="summary"></el-table-column>
            <el-table-column label="商品状态" prop="status">
              <template slot-scope="scope">
                <el-tag type="success" v-if="scope.row.status==1">上架中</el-tag>
                <el-tag type="info" v-else>已下架</el-tag>
              </template>v-if=
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="250">
                <template slot-scope="scope">
                    <el-button plain size="mini" type="warn" @click="handleChangStatus(scope.row.id)" v-if="scope.row.status==1">下架</el-button>
                    <el-button plain size="mini" type="success" @click="handleChangStatus(scope.row.id)" v-else>上架</el-button>
                    <el-button plain size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button plain size="mini" type="danger" @click="handleDel(scope.row.id)" >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 @current-change当前页改变事件 :current-page当前页数-->
        <div class="pagination-container">
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :total="count">
          </el-pagination>
        </div>
        
    </div>
    <el-dialog
        title="提示"
        :visible.sync="showDialog"
        width="30%"
        center>
        <span>确定删除id为{{id}}的商品？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showDialog = false">取 消</el-button>
          <el-button type="primary" @click="deleteProduct">确 定</el-button>
        </span>
     </el-dialog>
  </div>
  <component v-else :is="targetComponent" :data="product"  @back="handleBack"/>
</template>

<script>
/* eslint-disable */
import ProductM from '../../model/product'
import Add from './Add'
import Edit from './Edit'
export default {
  name: 'List',
  components:{Add,Edit},
  data(){
    return {
      productList:[],
      count:-1,//数据总数,用于分页
      currentPage:1,//当前页数
      showDialog:false,//控制显示删除询问
      id:null,//为删除准备的id
      loading:false,//加载数据时的动画
      switchComponent:false,//是否切换到Add或Edit组件
      targetComponent:'',//目标主键名称
      product:null,//Edit时的当前数据
      q:'',//搜索关键词
    }
  },
  async created(){
      await this.getProducts();
  },
  methods:{
    /**加载商品列表 */
    async getProducts(){
      const data = await ProductM.getByKeyword({});
      this.productList=data.products;
      this.count=data.count;
      console.log(this.productList)
    },
    /**弹出删除对话框 */
    handleDel(id){
      this.id = id;
      this.showDialog=true;
    },
    /**确认删除 */
    async deleteProduct(){
      this.showDialog=false;
      this.loading=true;
      try {
        const res= await ProductM.delOne(this.id);
        this.getProducts();
        this.loading=false;
        this.$message.success('删除成功');
      } catch (e) {
        console.log(e)
        this.loading=false;
        this.$message.error('删除失败');
      }
    },
    /**新增按钮点击 */
    handleAdd() {
      this.switchComponent = true
      this.targetComponent = 'Add'
    },
    /**编辑按钮点击 */
    handleEdit(product){
      this.product = product
      this.switchComponent = true
      this.targetComponent = 'Edit'
    },
    /**搜索 */
    async handleSearch(){
      const q=this.q;
      const data = await ProductM.getByKeyword({q});
      this.productList=data.products;
      this.count=data.count;
    },
    /**分页点击 */
    async handleCurrentChange(currentPage){
      const page = currentPage-1;
      const data = await ProductM.getByKeyword({page});
      this.productList=data.products;
      this.count=data.count;
    },
    /**商品上下架 */
    async handleChangStatus(id){
      const data = JSON.parse(JSON.stringify(this.productList));
      try{
        await ProductM.changeProductStatus(id);
        await this.getProducts();
        this.$message.success('修改状态成功');
      }catch(e){
        console.log(e)
        this.$message.error('修改状态失败');
      }
     
      
    },
    /**返回列表页 */
    handleBack(){
      this.switchComponent = false
      this.targetComponent = ''
      this.getProducts()
    }
  },
  
}
</script>

<style lang="scss" scoped>
    .button-container{
          margin-top: 30px;
          padding-right: 30px;
          padding-left: 30px;
          display: flex;
          justify-content: space-between;
    }

    .table-container{
        margin-top: 30px;
        padding-left: 30px;
        padding-right: 30px;
        padding-bottom: 200px;

        .pagination-container{
          display: flex;
          padding:40px 20px 0 0;
          justify-content: flex-end;
        }
        .expand-container {
            display: flex;
            justify-content: flex-start;
            align-items: center;

            .img {
                margin: 10px;
                width: 200px;
            }
        }
    }
    
</style>
