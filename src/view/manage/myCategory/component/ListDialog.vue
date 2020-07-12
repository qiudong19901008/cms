<template>
    <div class = "container">
        <!-- 新增,编辑,查看dialog -->
        <el-dialog
            title="分类"
            width="60%"
            :showClose="false"
            :visible.sync= "isShowDialog"
            v-if="!tempIsDelete"
            center>
            <el-form @submit.native.prevent  :rules="rules" ref='form' status-icon :model="category" label-width="100px">
              <el-form-item label="名称" prop="name">
                <el-input size="medium" v-model="category.name" placeholder="输入名称" />
              </el-form-item>
              <el-form-item label="描述" >
                <el-input size="medium" v-model="category.description" :rows="4" type="textarea"  placeholder="输入描述"/>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button  @click="handleHideDialog">取 消</el-button>
              <el-button type="primary" @click="handleBeSureExecute">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 删除dialog -->
        <el-dialog
        title="提示"
        width="30%"
        :showClose="false"
        :visible.sync="isShowDialog"
        v-if="tempIsDelete"
        center>
          <span>确定删除该条数据？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="handleHideDialog">取 消</el-button>
            <el-button type="primary" @click="handleBeSureExecute('del')">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'ListDialog',
  props:{
    tempCategory:Object,
    tempIsDelete:Boolean,
  },
  data() {
    return{
      isShowDialog:false,
      category:{
         id:-1,
         name:'',
         description:'',
      },
      //验证表单的规则
      rules: {
        name: [
          { required: true,message: '名称不能为空',trigger: 'blur',},
        ],
      },
    }
  },
  methods:{
    //执行操作
    handleBeSureExecute(type){
      if(type == 'del'){
        this.$emit('beSureExecute',this.category,type);
        return;
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('beSureExecute',this.category,type);
        }
      }) 
    },
    //关闭dialog
    handleHideDialog(){
      this.$emit('hideDialog');
    }
  },
  watch:{
    tempCategory(){
      this.category = this.tempCategory;
      this.isShowDialog = this.category.id==-1?false:true;
    }
  },
  
};
</script>