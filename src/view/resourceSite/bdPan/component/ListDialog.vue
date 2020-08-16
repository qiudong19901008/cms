<template>
    <div class = "container">
        <!-- 新增,编辑,查看dialog -->
        <el-dialog
            title="百度网盘"
            width="60%"
            :showClose="false"
            :visible.sync= "isShowDialog"
             :close-on-click-modal="false"
            v-if="!tempIsDelete"
            center>
            <el-form @submit.native.prevent  :rules="rules" ref='form' status-icon :model="bdPanRow" label-width="100px">
              <el-form-item label="用户名">
                <el-input size="medium" v-model="bdPanRow.username" placeholder="自动补全" :disabled="true" />
              </el-form-item>
              <!-- 编辑的时候不能修改账号 -->
              <el-form-item label="账号" prop="account">
                <el-input size="medium" v-model="bdPanRow.account" placeholder="输入账号" :disabled="tempIsCheck" />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input size="medium" v-model="bdPanRow.password" placeholder="输入密码" :disabled="tempIsCheck" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input size="medium" v-model="bdPanRow.mailbox" placeholder="输入邮箱" :disabled="tempIsCheck" />
              </el-form-item>
              <el-form-item label="邮箱密码">
                <el-input size="medium" v-model="bdPanRow.mailbox_pwd" placeholder="输入邮箱密码" :disabled="tempIsCheck" />
              </el-form-item>
              <el-form-item label="电话">
                <el-input size="medium" v-model="bdPanRow.phone" placeholder="输入电话" :disabled="tempIsCheck" />
              </el-form-item>
              <el-form-item label="总容量">
                <el-input size="medium" v-model="bdPanRow.total_capacity" placeholder="自动补全" :disabled="true"  />
              </el-form-item>
              <el-form-item label="可用容量">
                <el-input size="medium" v-model="bdPanRow.free_capacity" placeholder="自动补全" :disabled="true"  />
              </el-form-item>
              <el-form-item label="BDUSS">
                <el-input size="medium" v-model="bdPanRow.BDUSS" placeholder="自动补全" :disabled="true"  />
              </el-form-item>
              <el-form-item label="STOKEN">
                <el-input size="medium" v-model="bdPanRow.STOKEN" placeholder="自动补全" :disabled="true"  />
              </el-form-item>
              <el-form-item label="备注">
                <el-input size="medium" v-model="bdPanRow.remark" :rows="8" type="textarea"  placeholder="输入备注" :disabled="tempIsCheck" />
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
         :close-on-click-modal="false"
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
import {selectEnum,showDialogEnum,propertyInitEnum} from '@/config/enum'
export default {
  name: 'ListDialog',
  props:{
    tempBdPanRow:Object,
    tempIsCheck:Boolean,
    tempIsDelete:Boolean,
  },
  data() {
    return{
      isShowDialog:propertyInitEnum.BOOLEAN,
      bdPanRow:{
          'id':showDialogEnum.HIDE,
          'username':propertyInitEnum.STRING,
          'account':propertyInitEnum.STRING,
          'password':propertyInitEnum.STRING,
          'mailbox':propertyInitEnum.STRING,
          'mailbox_pwd':propertyInitEnum.STRING,
          'phone':propertyInitEnum.STRING,
          'total_capacity':propertyInitEnum.STRING,
          'free_capacity':propertyInitEnum.STRING,
          'BDUSS':propertyInitEnum.STRING,
          'STOKEN':propertyInitEnum.STRING,
          'remark':propertyInitEnum.STRING,
      },
      //验证表单的规则
      rules: {
        account: [
          { required: true,message: '账号不能为空',trigger: 'blur',},
        ],
        'password': [
          { required: true,message: '密码不能为空',trigger: 'blur',},
        ],
      },
    }
  },
  methods:{
    //执行操作
    handleBeSureExecute(type){
      if(type == 'del'){
        this.$emit('beSureExecute',this.bdPanRow,type);
        return;
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('beSureExecute',this.bdPanRow,type);
        }
      }) 
    },
    //关闭dialog
    handleHideDialog(){
      this.$emit('hideDialog');
    }
  },
  watch:{
    tempBdPanRow(){
      this.bdPanRow = this.tempBdPanRow;
      this.isShowDialog = this.bdPanRow.id==showDialogEnum.HIDE?false:true;
    }
  },
  
};
</script>