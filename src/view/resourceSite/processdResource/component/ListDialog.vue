<template>
    <div class = "container">
        <!-- 新增,编辑,查看dialog -->
        <el-dialog
            title="资源信息"
            width="70%"
            :showClose="false"
            :visible.sync= "isShowDialog"
            :close-on-click-modal="false"
            v-if="!tempIsDelete"
            center>
            <el-form @submit.native.prevent  :rules="rules" ref='form' status-icon :model="resourceRow" label-width="100px">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="文章标题" prop="title">
                    <el-input size="medium" v-model="resourceRow.title" placeholder="" :disabled="tempIsCheck" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="封面图">
                    <el-input size="medium" v-model="resourceRow.intro_img" placeholder="" :disabled="tempIsCheck"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="分类" prop="category">
                    <el-input size="medium" v-model="resourceRow.category" placeholder="" :disabled="tempIsCheck" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="标签" prop="tags">
                    <el-input size="medium" v-model="resourceRow.tags" placeholder="" :disabled="tempIsCheck" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="发布时间" prop="name">
                    <el-input size="medium" v-model="resourceRow.publicTime" placeholder="" :disabled="tempIsCheck" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="简介id" >
                    <el-input size="medium" v-model="resourceRow.introId" placeholder="" :disabled="tempIsCheck" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="下载地址" >
                    <el-input size="medium" v-model="resourceRow.downloadUrl" placeholder="" :disabled="tempIsCheck" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="提取密码" >
                    <el-input size="medium" v-model="resourceRow.pwd" placeholder="" :disabled="tempIsCheck" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="解压密码" >
                    <el-input size="medium" v-model="resourceRow.compressCode" placeholder="" :disabled="tempIsCheck" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="文件保存路径" >
                    <el-input size="medium" v-model="resourceRow.file_dir" placeholder="" :disabled="tempIsCheck" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="是否已插入WP" >
                    <el-input size="medium" v-model="resourceRow.is_handle" placeholder="" :disabled="tempIsCheck" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="分享文件id列表" >
                    <el-input size="medium" v-model="resourceRow.fsidlist" placeholder="" :disabled="tempIsCheck" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="分享文件名列表" >
                    <el-input size="medium" v-model="resourceRow.fnlist" placeholder="" :disabled="tempIsCheck" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="分享id" >
                    <el-input size="medium" v-model="resourceRow.shareid" placeholder="" :disabled="tempIsCheck" />
                  </el-form-item>
                </el-col>
              </el-row>
               <el-row>
                <el-col :span="12">
                  <el-form-item label="文件名" >
                    <el-input size="medium" v-model="resourceRow.filename" placeholder="" :disabled="tempIsCheck" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="网盘id" >
                    <el-input size="medium" v-model="resourceRow.pan_id" placeholder="" :disabled="tempIsCheck" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="被爬站点id" >
                    <el-input size="medium" v-model="resourceRow.site_id" placeholder="" :disabled="tempIsCheck" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="WP文章id" >
                    <el-input size="medium" v-model="resourceRow.articleId" placeholder="" :disabled="tempIsCheck" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="内容">
                <el-input size="medium" v-model="resourceRow.content" :rows="8" type="textarea"  placeholder="" :disabled="tempIsCheck" />
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
    tempResourceRow:Object,
    tempIsCheck:Boolean,
    tempIsDelete:Boolean,
  },
  data() {
    return{
      isShowDialog:propertyInitEnum.BOOLEAN,
      resourceRow:{
        'id':showDialogEnum.HIDE,
        'title':propertyInitEnum.STRING,
        'content':propertyInitEnum.STRING,
        'intro_img':propertyInitEnum.STRING,
        'category':propertyInitEnum.STRING,
        'tags':propertyInitEnum.STRING,
        'publicTime':propertyInitEnum.STRING,
        'introId':propertyInitEnum.STRING,
        'downloadUrl':propertyInitEnum.STRING,
        'pwd':propertyInitEnum.STRING,
        'file_dir':propertyInitEnum.STRING,
        'is_handle':propertyInitEnum.STRING,
        'fsidlist':propertyInitEnum.STRING,
        'fnlist':propertyInitEnum.STRING,
        'shareid':propertyInitEnum.STRING,
        'from':propertyInitEnum.STRING,
        'filename':propertyInitEnum.STRING,
        'pan_id':propertyInitEnum.STRING,
        'site_id':propertyInitEnum.STRING,
        'articleId':propertyInitEnum.STRING,
        'pan':{},
        'site':{},
      },
      //验证表单的规则
      rules: {
        // domain: [
        //   { required: true,message: '域名不能为空',trigger: 'blur',},
        // ],
        // 'mainUrl': [
        //   { required: true,message: '首页地址不能为空',trigger: 'blur',},
        // ],
        // 'baseUrl': [
        //   { required: true,message: '基础分页URL不能为空',trigger: 'blur',},
        // ],
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
    tempResourceRow(){
      this.resourceRow = this.tempResourceRow;
      this.isShowDialog = this.resourceRow.id==showDialogEnum.HIDE?false:true;
    }
  },
  
};
</script>