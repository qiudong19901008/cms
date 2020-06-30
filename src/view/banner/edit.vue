<!-- src/views/banner/add.vue -->
<template>
    <div class="container">
        <div class="header">
            <span>编辑轮播图</span>
            <span class="back" @click="handleBack">
                <i class="iconfont icon-fanhui"/> 返回
            </span>
        </div>
        <el-divider/>
        <div class="form-container">
            <el-row>
                <el-col :lg="16" :md="20" :sm="24" :xs="24">
                    <BannerForm :data="formData" @submit="handleSubmit"/>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import BannerForm from './compenent/form'
import BannerM from '../../model/banner'
export default {
  name: 'Edit',
  props:{
      banner:Object,
  },
  data(){
      return{
          formData:null
      }
  },
  components:{BannerForm},
  created(){
      this.formData = JSON.parse(JSON.stringify(this.banner))
  },
  methods: {
    //提交事件
    async handleSubmit(formData){
        try{
            await this.updateBannerInfo(formData);
            await this.updateBannerItem(formData.id,formData.items);
            this.$message.success('编辑成功')
            this.handleBack()
        } catch (e) {
            this.$message.error(e)
        }
    },
    // 轮播图信息部分逻辑逻辑
    async updateBannerInfo(formData) {
      if (formData.name !== this.banner.name || formData.description !== this.banner.description) {
        const { id, name, description } = formData
        try {
          // 调用模型的编辑轮播图信息方法
          await BannerM.editBannerInfo(id, {name, description})
        } catch (e) {
          throw Object.values(e.data.message).join('；')
        }
      }
    },
    // 轮播图元素部分逻辑处理
    async updateBannerItem(id,bannerItems) {
      let addBannerItems = []
      let editBannerItems = []
      let delBannerItems = []
      if (JSON.stringify(this.banner.items) !== JSON.stringify(bannerItems)) {
        addBannerItems = this._processAddBannerItemsArray(bannerItems)
        editBannerItems = this._processEditBannerItemsArray(bannerItems)
        delBannerItems = this._processDelBannerItemsArray(bannerItems)
      }
      try {
        if (delBannerItems.length > 0) {
          const ids = delBannerItems.map(item => item.id)
          await BannerM.delBannerItems(ids)
        }
        if (addBannerItems.length > 0) {
          await BannerM.addBannerItems(id,addBannerItems)
        }
        if (editBannerItems.length > 0) {
          await BannerM.editBannerItems(id,editBannerItems)
        }
      } catch (e) {
        throw Object.values(e.data.message).join('；')
      }
    },
    // 待新增的bannerItems信息的私有加工函数
    _processAddBannerItemsArray(bannerItems) {
        // 如果轮播图元素的id是空的，代表是一个新增的轮播图元素，因为没有写入过数据库不会有id
        return bannerItems.filter(item => item.id === '')
    },
    // 待编辑的bannerItems信息的私有加工函数
    _processEditBannerItemsArray(bannerItems) {
        const oriBannerItems = this.banner.items
        return bannerItems.filter(item => {
          // 找到相同id的轮播图元素
          const oriItem = oriBannerItems.find(i => i.id === item.id)
          // 这里要考虑如果原bannerItem被删除了，那么在表单数据里面肯定是找不到的
          // find()函数在找不到条件的结果时会返回一个undefined
          if (typeof (oriItem) !== 'undefined') {
            // 比对两个元素的各项值是否存在差异，只要其中一个有变化，就是属于待修改的
            return item.key_word !== oriItem.key_word || item.type !== oriItem.type || item.img_id !== oriItem.img_id
          }
        })
    },
    // 待删除的bannerItems信息的私有加工函数
    _processDelBannerItemsArray(bannerItems) {
        const oriBannerItems = this.banner.items
        // 如果原bannerItem被删除了，那么在表单数据里面肯定是找不到的
        // find()函数在找不到条件的结果时会返回一个undefined
        return oriBannerItems.filter(oriItem => {
          const res = bannerItems.find(item => item.id === oriItem.id)
          return typeof (res) === 'undefined'
        })
    },
    // 返回按钮点击事件
    handleBack() {
      this.$emit('back')
    },
  },
  
}
</script>

<style lang="scss" scoped>
    .el-divider--horizontal {
        margin: 0
    }

    .container {

        .header {
            height: 59px;
            line-height: 59px;
            color: $parent-title-color;
            font-size: 16px;
            font-weight: 500;
            text-indent: 40px;

            .back {
                float: right;
                margin-right: 40px;
                cursor: pointer;
            }
        }

        .form-container {
            margin-top: 40px;
        }
    }
</style>