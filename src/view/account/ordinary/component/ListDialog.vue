<template>
    <div class = "container">
        <!-- 新增,编辑,查看dialog -->
        <el-dialog
            title="账号信息"
            width="60%"
            :showClose="false"
            :visible.sync="isShowDialog"
            :close-on-click-modal="false"
            v-if="!tempIsDelete"
            center>
            <!-- id 平台名称 账号 密码 平台网址 手机号 邮箱 邮箱密码 备注 -->
            <el-form @submit.native.prevent  :rules="rules" ref='form' status-icon :model="issueAnwser" label-width="100px">
              <el-form-item label="平台名称" prop="platform_name">
                <el-input size="medium" v-model="account.platform_name" placeholder="输入平台名称" :disabled="tempIsCheck" />
              </el-form-item>
              <el-form-item label="账号" prop="account">
                <el-input size="medium" v-model="account.account" placeholder="输入账号" :disabled="tempIsCheck" />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input size="medium" v-model="account.password" placeholder="输入密码" :disabled="tempIsCheck" />
              </el-form-item>
              <el-form-item label="平台网址" prop="website">
                <el-input size="medium" v-model="account.website" placeholder="输入平台网址" :disabled="tempIsCheck" />
              </el-form-item>
              <el-form-item label="手机号" prop="phone">
                <el-input size="medium" v-model="account.phone" placeholder="输入手机号" :disabled="tempIsCheck" />
              </el-form-item>
              <el-form-item label="邮箱" prop="mailbox">
                <el-input size="medium" v-model="account.mailbox" placeholder="输入邮箱" :disabled="tempIsCheck" />
              </el-form-item>
              <el-form-item label="邮箱密码" prop="mailbox_pwd">
                <el-input size="medium" v-model="account.mailbox_pwd" placeholder="输入邮箱密码" :disabled="tempIsCheck" />
              </el-form-item>
              <!-- prop="tracingNoChecker" -->
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
    tempAccount:Object,
    tempIsCheck:Boolean,
    tempIsDelete:Boolean,
  },
  data() {
    return{
      isShowDialog:propertyInitEnum.BOOLEAN,
      // id 平台名称 账号 密码 平台网址 手机号 邮箱 邮箱密码 备注
      account:{
          'id':showDialogEnum.HIDE,
          'platform_name':propertyInitEnum.STRING,
          'account':propertyInitEnum.STRING,
          'password':propertyInitEnum.STRING,
          'website':propertyInitEnum.STRING,
          'phone':propertyInitEnum.STRING,
          'mailbox':propertyInitEnum.STRING,
          'mailbox_pwd':propertyInitEnum.STRING,
          'remark':propertyInitEnum.STRING,
      },
      //验证表单的规则
      rules: {
        'issue': [
          { required: true,message: '问题不能为空',trigger: 'blur',},
        ],
        'category.id': [
          { required: true,message: '分类不能为空',trigger: 'blur',},
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
    tempAccount(){
      this.account = this.tempAccount;
      this.isShowDialog = this.issueAnwser.id==showDialogEnum.HIDE?false:true;
    }
  },
  
};
</script>