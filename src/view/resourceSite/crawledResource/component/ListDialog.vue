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
            <el-form @submit.native.prevent  :rules="rules" ref='form' status-icon :model="introRow" label-width="100px">
              <!-- 简介信息 -->
              <el-row>
                <el-col :span="24" style="height:50px; text-align:center; font-size:20px">
                <label >简介信息</label>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="文章id" prop="articleId">
                    <el-input size="medium" v-model="introRow.articleId" placeholder="" :disabled="tempIsCheck" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="文章标题">
                    <el-input size="medium" v-model="introRow.articleTitle" placeholder="" :disabled="tempIsCheck"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="分类">
                    <el-input size="medium" v-model="introRow.categories" placeholder="" :disabled="tempIsCheck" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="内容页链接">
                    <el-input size="medium" v-model="introRow.contentUrl" placeholder="" :disabled="tempIsCheck"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="封面图地址">
                    <el-input size="medium" v-model="introRow.imgSrc" placeholder="" :disabled="tempIsCheck" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="发布时间">
                    <el-input size="medium" v-model="introRow.publicTime" placeholder="" :disabled="tempIsCheck"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="所属网站">
                    <el-input size="medium" v-model="introRow.site.domain" placeholder="" :disabled="tempIsCheck" />
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 详细信息 -->
              <el-row>
                <el-col :span="24" style="height:50px; text-align:center; font-size:20px">
                <label >内容信息</label>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="百度盘地址">
                    <el-input size="medium" v-model="introRow.content.downloadUrl" placeholder="" :disabled="tempIsCheck" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="百度盘密码">
                    <el-input size="medium" v-model="introRow.content.pwd" placeholder="" :disabled="tempIsCheck"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="解压密码">
                    <el-input size="medium" v-model="introRow.content.compressCode" placeholder="" :disabled="tempIsCheck"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="标签">
                    <el-input size="medium" v-model="introRow.content.tags" placeholder="" :disabled="tempIsCheck" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="内容">
                    <el-input size="medium" :rows="8" type="textarea" v-model="introRow.content.content" placeholder="" :disabled="tempIsCheck" />
                  </el-form-item>
                </el-col>
              </el-row>
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
import {getSummary,formatDate} from '@/lin/util/myUtil'
export default {
  name: 'ListDialog',
  props:{
    tempIntroRow:Object,
    tempIsCheck:Boolean,
    tempIsDelete:Boolean,
  },
  data() {
    return{
      isShowDialog:propertyInitEnum.BOOLEAN,
      introRow:{
        'id':showDialogEnum.HIDE,
        'articleId':propertyInitEnum.STRING,
        'articleTitle':propertyInitEnum.STRING,
        'categories':propertyInitEnum.STRING,
        'content':{},
        'contentUrl':propertyInitEnum.STRING,
        'imgSrc':propertyInitEnum.STRING,
        'isDeal':propertyInitEnum.STRING,
        'isHandle':propertyInitEnum.STRING,
        'publicTime':propertyInitEnum.STRING,
        'site':{},
        'siteId':propertyInitEnum.STRING,
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
        this.$emit('beSureExecute',this.introRow,type);
        return;
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('beSureExecute',this.introRow,type);
        }
      }) 
    },
    //关闭dialog
    handleHideDialog(){
      this.$emit('hideDialog');
    }
  },
  watch:{
    tempIntroRow(){
      this.introRow = this.tempIntroRow;
      this.isShowDialog = this.introRow.id==showDialogEnum.HIDE?false:true;
    }
  },
  
};
</script>