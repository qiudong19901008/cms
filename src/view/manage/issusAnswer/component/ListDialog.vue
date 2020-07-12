<template>
    <div class = "container">
        <!-- 新增,编辑,查看dialog -->
        <el-dialog
            title="问题和答案"
            width="60%"
            :showClose="false"
            :visible.sync= "isShowDialog"
            v-if="!tempIsDelete"
            center>
            <el-form @submit.native.prevent  :rules="rules" ref='form' status-icon :model="issueAnwser" label-width="100px">
              <el-form-item label="问题" prop="issue">
                <el-input size="medium" v-model="issueAnwser.issue" placeholder="输入问题" :disabled="tempIsCheck" />
              </el-form-item>
              <el-form-item label="分类" v-if="!tempIsCheck">
                <el-select  size="medium" filterable placeholder="分类" v-model="issueAnwser.category.id" >
                  <el-option
                    v-for="item in categoryList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- prop="tracingNoChecker" -->
              <el-form-item label="关键词" v-if="!tempIsCheck" >
                <el-input size="medium" v-model="issueAnwser.keyword" placeholder="输入关键词"/>
              </el-form-item>
              <el-form-item label="答案" >
                <el-input size="medium" v-model="issueAnwser.anwser" :rows="12" type="textarea"  placeholder="输入答案"/>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button  @click="handleHideDialog">取 消</el-button>
              <el-button type="primary" @click="handleBeSureExecute" v-if="!tempIsCheck">确 定</el-button>
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
    tempIssueAnwser:Object,
    tempCategoryList:Array,
    tempIsCheck:Boolean,
    tempIsDelete:Boolean,
  },
  data() {
    return{
      isShowDialog:false,
      categoryList: [],
      issueAnwser:{
         id:-1,
          issue:'',
          anwser:'',
          category:{
            id:1,
          },
          keyword:''
      },
      //验证表单的规则
      rules: {
        issue: [
          { required: true,message: '问题不能为空',trigger: 'blur',},
        ],
      },
    }
  },
  methods:{
    //执行操作
    handleBeSureExecute(type){
      if(type == 'del'){
        this.$emit('beSureExecute',this.issueAnwser,type);
        return;
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('beSureExecute',this.issueAnwser,type);
        }
      }) 
    },
    //关闭dialog
    handleHideDialog(){
      this.$emit('hideDialog');
    }
  },
  watch:{
    tempCategoryList(){
      const temp = []
      this.tempCategoryList.forEach(c=>{
        temp.push({value:c.id,label:c.name})
      })
      this.categoryList=temp;
    },
    tempIssueAnwser(){
      this.issueAnwser = this.tempIssueAnwser;
      this.isShowDialog = this.issueAnwser.id==-1?false:true;
    }
  },
  
};
</script>