<template>
    <div class = "container">
        <!-- 选择快递视图 -->
        <el-dialog
            title="选择快递"
            width="40%"
            :showClose="false"
            :visible.sync= "showDeliverDialog"
            center>
            <el-form @submit.native.prevent :inline='true' :rules="rules" ref='form'>
              <el-form-item label="快递公司" prop="companyCode">
                <el-select  size="medium" filterable v-model="companyCode" placeholder="请选择快递公司">
                  <el-option
                    v-for="express in expressList"
                    :key="express.value"
                    :label="express.label"
                    :value="express.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- prop="tracingNoChecker" -->
              <el-form-item label="快递单号" >
                <el-input size="medium" v-model="tracingNo" placeholder="请输入快递单号"/>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button  @click="handleHideDialog">取 消</el-button>
              <el-button type="primary" @click="handleBeSureDeliver">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'ListDialog',
  props:{
    orderId:Number,
  },
  data() {
    return{
      expressList: [
        { value: 'sf',label: '顺丰',},
        { value: 'yt',label: '圆通',},
        { value: 'zto',label: '中通',},
        { value: 'yd',label: '韵达',},
        { value: 'sto',label: '申通',},
      ],
      companyCode:'sf',//默认显示的快递
      tracingNo:'',//快递单号
      //验证表单的规则
      rules: {
        tracingNoChecker: [
          { required: true,message: '请输入快递单号',trigger: 'blur',},
        ],
      },
    }
  },
  methods:{
    //真实发货
    handleBeSureDeliver(){
      this.$emit(
        'beSureDeliver',
        {
          companyCode:this.companyCode,
          tracingNo:this.tracingNo,
        }
      );
    },
    //关闭dialog
    handleHideDialog(){
      this.$emit('hideDialog');
    }
  },
  computed:{
    showDeliverDialog(){
     return this.orderId==-1?false:true;
    }
  }
};
</script>