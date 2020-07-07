<template>
    <!-- @keyup.enter.native="search" -->
    <div class = "container">
        <div class="form-container">
          <!-- 名称选择 -->
          <el-input class="input" size="medium" placeholder="订单号/收货人" type="text" style="width:200px" 
            v-model="inputContent" @keyup.enter.native="handleSearch">
          </el-input>
          <!-- 时间段选择  @change = "handlePick" -->
          <el-date-picker
              v-model="selectedTime"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
          >
          </el-date-picker>
        </div>
        <!-- 搜索按钮 | 重置按钮 -->
        <div class = "btn-container">
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button type="primary" @click="handleResert">重置</el-button>
        </div>
        
    </div>
</template>

<script>
export default {
  name: 'ListConditionChoose',
  props:{
    tempInputContent:String,
    tempSelectedTime:Array,
  },
  data() {
    return { 
      inputContent:'',//存储当前输入的内容
      selectedTime: [],//存储当前选择的时间
       //input插槽下拉框数据
      // selectList:[
      //   { value: 'orderNo',label: '订单号',},
      //   { value: 'name',label: '收货人',},
      // ],
      // selectListValue:'name',//当前input插槽选中的数据
  
      //时间选择的快捷方式
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, 
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, 
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      },
    };
  },
  methods:{
    /**搜索逻辑 */
    handleSearch(){
      this.$emit('search');
    },
    /**重置逻辑 */
    handleResert(){
      this.selectedContent = '';
      this.selectedTime =[];
      this.$emit('reset')
    },
  },
  watch:{
    inputContent(){
      this.$emit('update:tempInputContent',this.inputContent)
      console.log(this.tempInputContent);
    },
    selectedTime(){
      this.$emit('update:tempSelectedTime',this.selectedTime)
      console.log(this.selectedTime);
    }

  }
};
</script>
<style lang="scss" scoped>
  .container{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding:30px 30px 0 30px;
    .form-container{
      .input{
        margin-right:30px;
      }
    }
    .btn-container{
      padding-left:30px;
    }
  }

</style>