
<template>
  <div class="lin-container" v-if="!switchComponent">
    <div class="lin-title">主题列表</div>
    <div class="button-container">
        <!-- 指定button类型 -->
        <el-button type="primary" @click="handleAdd">新增</el-button>
    </div>
    <div class="table-container">
        <el-table :data="themeList" v-loading="loading">
            <!-- label定义列头显示的文本，prop定义要渲染data数组中元素的哪个字段，width定义列宽 -->
            <el-table-column label="序号" prop="id" width="160"></el-table-column>
            <el-table-column label="主题名称" prop="name"></el-table-column>
            <el-table-column label="主题简介" prop="description"></el-table-column>
            <el-table-column label="主题头图" prop="topic_img.url" width="200">
              <template slot-scope="scope">            
                  <img :src="scope.row.topic_img.url" />
              </template>  
            </el-table-column>
            <el-table-column label="详情页头图" prop="head_img.url" width="200">
              <template slot-scope="scope">            
                  <img :src="scope.row.head_img.url"  />
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="170">
                <template slot-scope="scope">
                    <el-button plain size="mini" type="primary" @click="handleEdit(scope.row.id)">编辑</el-button>
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
        <span>确定删除id为{{id}}的主题？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showDialog = false">取 消</el-button>
          <el-button type="primary" @click="deleteTheme">确 定</el-button>
        </span>
     </el-dialog>
  </div>
  <component v-else :is="targetComponent" :data="theme"  @back="handleBack"/>
</template>

<script>
/* eslint-disable */
import ThemeM from '../../model/theme'
import Add from './Add'
import Edit from './Edit'
export default {
  name: 'List',
  components:{Add,Edit},
  data(){
    return {
      themeList:[],
      showDialog:false,//控制显示删除询问
      id:null,//为删除准备的id
      loading:false,//加载数据时的动画
      switchComponent:false,//是否切换到Add或Edit组件
      targetComponent:'',//目标主键名称
      theme:null//Edit时的当前数据
    }
  },
  created(){
      this.getThemes();
  },
  methods:{
    /**加载主题列表 */
    async getThemes(){
      this.themeList = await ThemeM.getSimpleList();
    },
    /**弹出删除对话框 */
    handleDel(id){
      this.id = id;
      this.showDialog=true;
    },
    /**确认删除 */
    async deleteTheme(){
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
    async handleEdit(themeId){
      this.theme = await ThemeM.getDetail(themeId);
      this.switchComponent = true
      this.targetComponent = 'Edit'
    },
    /**返回列表页 */
    handleBack(){
      this.switchComponent = false
      this.targetComponent = ''
      this.getThemes()
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
