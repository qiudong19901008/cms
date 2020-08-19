<template>
    <div class = "container">
        <!-- 新增,编辑,查看dialog -->
        <el-dialog
            title="爬取资源信息"
            width="60%"
            :showClose="false"
            :visible.sync= "isShowDialog"
             :close-on-click-modal="false"
            v-if="!tempIsDelete"
            center>
            <el-form @submit.native.prevent  :rules="rules" ref='form' status-icon :model="siteRow" label-width="100px">
              <el-form-item label="基础URL" prop="baseUrl">
                <el-input size="medium" v-model="siteRow.baseUrl" placeholder="输入基础URL" :disabled="tempIsCheck" />
              </el-form-item>
              <el-form-item label="页码">
                <el-input size="medium" v-model="siteRow.pageNum" placeholder="输入页码" :disabled="tempIsCheck"/>
              </el-form-item>
              <el-form-item label="域名" prop="domain">
                <el-input size="medium" v-model="siteRow.domain" placeholder="输入域名" :disabled="tempIsCheck" />
              </el-form-item>
              <el-form-item label="网站类型" prop="type">
                <el-input size="medium" v-model="siteRow.type" placeholder="输入类型" :disabled="tempIsCheck" />
              </el-form-item>
              <el-form-item label="网站名称" prop="name">
                <el-input size="medium" v-model="siteRow.name" placeholder="输入名称" :disabled="tempIsCheck" />
              </el-form-item>
              <el-form-item label="登陆账号" prop="account">
                <el-input size="medium" v-model="siteRow.account" placeholder="输入账号" :disabled="tempIsCheck" />
              </el-form-item>
              <el-form-item label="登陆密码" prop="secret">
                <el-input size="medium" v-model="siteRow.secret" placeholder="输入密码" :disabled="tempIsCheck" />
              </el-form-item>
              <el-form-item label="登陆URL" prop="loginUrl">
                <el-input size="medium" v-model="siteRow.loginUrl" placeholder="输入登陆URL" :disabled="tempIsCheck" />
              </el-form-item>
              <el-form-item label="首页URL" prop="mainUrl">
                <el-input size="medium" v-model="siteRow.mainUrl" placeholder="输入首页URL" :disabled="tempIsCheck" />
              </el-form-item>   
              <el-form-item label="备注">
                <el-input size="medium" v-model="siteRow.remark" :rows="8" type="textarea"  placeholder="输入备注" :disabled="tempIsCheck" />
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
    tempSiteRow:Object,
    tempIsCheck:Boolean,
    tempIsDelete:Boolean,
  },
  data() {
    return{
      isShowDialog:propertyInitEnum.BOOLEAN,
      siteRow:{
        'id':showDialogEnum.HIDE,
        'baseUrl':propertyInitEnum.STRING,
        'pageNum':propertyInitEnum.STRING,
        'domain':propertyInitEnum.STRING,
        'type':propertyInitEnum.STRING,
        'name':propertyInitEnum.STRING,
        'account':propertyInitEnum.STRING,
        'secret':propertyInitEnum.STRING,
        'mainUrl':propertyInitEnum.STRING,
        'loginUrl':propertyInitEnum.STRING,
        'remark':propertyInitEnum.STRING,
      },
      //验证表单的规则
      rules: {
        domain: [
          { required: true,message: '域名不能为空',trigger: 'blur',},
        ],
        'mainUrl': [
          { required: true,message: '首页地址不能为空',trigger: 'blur',},
        ],
        'baseUrl': [
          { required: true,message: '基础分页URL不能为空',trigger: 'blur',},
        ],
      },
    }
  },
  methods:{
    //执行操作
    handleBeSureExecute(type){
      if(type == 'del'){
        this.$emit('beSureExecute',this.siteRow,type);
        return;
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('beSureExecute',this.siteRow,type);
        }
      }) 
    },
    //关闭dialog
    handleHideDialog(){
      this.$emit('hideDialog');
    }
  },
  watch:{
    tempSiteRow(){
      this.siteRow = this.tempSiteRow;
      this.isShowDialog = this.siteRow.id==showDialogEnum.HIDE?false:true;
    }
  },
  
};
</script>