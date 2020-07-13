
<template>
  <div class="lin-container" v-if="!switchComponent">
    <div class="lin-title">轮播图列表</div>
    <div class="button-container">
        <!-- 指定button类型 -->
        <el-button type="primary" @click="handleAdd">新增</el-button>
    </div>
    <div class="table-container">
        <el-table :data="bannerList" v-loading="loading">
            <!-- 扩展行 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                  <div class="expand-container" width="100">
                      <div v-for="(img,index) in scope.row.items" :key="index">
                          <img class="img" :src="img.img.url">
                      </div>
                  </div>
              </template>
            </el-table-column>
            <!-- label定义列头显示的文本，prop定义要渲染data数组中元素的哪个字段，width定义列宽 -->
            <el-table-column label="序号" prop="id" width="160"></el-table-column>
            <el-table-column label="轮播图名称" prop="name"></el-table-column>
            <el-table-column label="轮播图简介" prop="description"></el-table-column>
            <el-table-column label="操作" fixed="right" width="170">
                <!-- <el-table-column>标签支持在标签内嵌套一个<template>标签实现复杂的页面元素 -->
                <template slot-scope="scope">
                    <el-button plain size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button plain size="mini" type="danger" @click="handleDel(scope.row.id)" >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog
        title="提示"
        :visible.sync="showDialog"
        width="30%"
        center>
        <span>确定删除id为{{id}}的轮播图？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showDialog = false">取 消</el-button>
          <el-button type="primary" @click="deleteBanner">确 定</el-button>
        </span>
     </el-dialog>
  </div>
  <component v-else :is="targetComponent" :banner="row"  @back="handleBack"/>
</template>

<script>
/* eslint-disable */
import BannerM from '@/model/banner'
import Add from './add'
import Edit from './edit'
export default {
  name: 'List',
  components:{Add,Edit},
  data(){
    return {
      bannerList:[],
      showDialog:false,
      id:null,
      loading:false,
      switchComponent:false,
      targetComponent:'',
      row:null
    }
  },
  created(){
      this.getBanners();
  },
  methods:{
    /**加载banner列表 */
    async getBanners(){
      this.bannerList = await BannerM.getBanners();
    },
    /**弹出删除对话框 */
    handleDel(id){
      this.id = id;
      this.showDialog=true;
    },
    /**确认删除 */
    async deleteBanner(){
      this.showDialog=false;
      this.loading=true;
      try {
        const res= await BannerM.deleteBanners(this.id);
        this.getBanners();
        this.loading=false;
        this.$message.success('删除成功');
      } catch (e) {
        this.loading=false;
        this.$message.error(e);
      }
    },
    /**新增按钮点击 */
    handleAdd() {
      this.switchComponent = true
      this.targetComponent = 'Add'
    },
    /**编辑按钮点击 */
    handleEdit(banner){
      this.switchComponent = true
      this.targetComponent = 'Edit'
      this.row = banner
    },
    /**返回列表页 */
    handleBack(){
      this.switchComponent = false
      this.targetComponent = ''
      this.getBanners()
    }
  },
  
}
</script>

<style lang="scss" scoped>
    .button-container{
          margin-top: 30px;
          padding-left: 30px;
      }

    .table-container{
        margin-top: 30px;
        padding-left: 30px;
        padding-right: 30px;

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
