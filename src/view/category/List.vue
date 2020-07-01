
<template>
  <div class="lin-container" v-if="!switchComponent">
    <div class="lin-title">分类列表</div>
    <div class="button-container">
        <!-- 指定button类型 -->
        <el-button type="primary" @click="handleAdd">新增</el-button>
    </div>
    <div class="table-container">
        <el-table :data="categoryList" v-loading="loading">
            <!-- label定义列头显示的文本，prop定义要渲染data数组中元素的哪个字段，width定义列宽 -->
            <el-table-column label="序号" prop="id" width="160"></el-table-column>
            <el-table-column label="分类名称" prop="name" width="200"></el-table-column>
            <el-table-column label="分类描述" prop="description"></el-table-column>
            <el-table-column label="分类头图" prop="topic_img.id" width="200">
              <template slot-scope="scope">            
                  <img :src="scope.row.topic_img.url" />
              </template>  
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="170">
                <template slot-scope="scope">
                    <el-button plain size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button plain size="mini" type="danger" @click="handleDel(scope.row.id)" >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <!-- 删除提醒视图 -->
    <el-dialog
        title="提示"
        :visible.sync="showDialog"
        width="30%"
        center>
        <span>确定删除id为{{id}}的分类？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showDialog = false">取 消</el-button>
          <el-button type="primary" @click="deleteCategory">确 定</el-button>
        </span>
     </el-dialog>
  </div>
  <component v-else :is="targetComponent" :data="category" @back="handleBack"/>
</template>

<script>
/* eslint-disable */
import CategoryM from '../../model/category'
import Add from './Add'
import Edit from './Edit'
export default {
  name: 'List',
  components:{Add,Edit},
  data(){
    return {
      categoryList:[],
      showDialog:false,//控制显示删除询问
      id:null,//为删除准备的id
      loading:false,//加载数据时的动画
      switchComponent:false,//是否切换到Add或Edit组件
      targetComponent:'',//目标主键名称
      category:null//Edit时的当前数据
    }
  },
  async created(){
      await this.getCategories();
  },
  methods:{
    /**加载主题列表 */
    async getCategories(){
      const data = await CategoryM.getAll();
      this.categoryList= data.categories;
    },
    /**弹出删除对话框 */
    handleDel(id){
      this.id = id;
      this.showDialog=true;
    },
    /**确认删除 */
    async deleteCategory(){
      this.showDialog=false;
      this.loading=true;
      try {
        const res= await CategoryM.delCategories(this.id);
        this.getCategories();
        this.loading=false;
        this.$message.success('删除成功');
      } catch (e) {
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
    async handleEdit(row){
      this.category = row;
      this.switchComponent = true
      this.targetComponent = 'Edit'
    },
    /**返回列表页 */
    handleBack(){
      this.switchComponent = false
      this.targetComponent = ''
      this.getCategories()
    }
  },
  
}
</script>

<style lang="scss" scoped>
    .button-container{
          margin-top: 30px;
          padding-right: 30px;
          display: flex;
          justify-content: flex-end;
      }

    .table-container{
        margin-top: 30px;
        padding-left: 30px;
        padding-right: 30px;
        padding-bottom: 200px;

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
