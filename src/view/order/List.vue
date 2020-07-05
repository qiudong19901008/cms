
<template>
  <div class="lin-container">
    <div class="lin-title">订单列表</div>
    <div class="table-container">
        <el-table :data="orderList" v-loading="loading">
            <!-- label定义列头显示的文本，prop定义要渲染data数组中元素的哪个字段，width定义列宽 -->
            <el-table-column label="序号" prop="id" width="160"></el-table-column>
            <el-table-column label="订单号" prop="order_no" width="200"></el-table-column>
            <el-table-column label="商品概要" prop="snap_name"></el-table-column>
            <el-table-column label="商品数量" prop="total_count"></el-table-column>
            <el-table-column label="订单金额" prop="total_price"></el-table-column>
            <el-table-column label="收货人" prop="snap_address.name"></el-table-column>
            <el-table-column label="联系方式" prop="snap_address.mobile"></el-table-column>
            <el-table-column label="订单状态" prop="status">
              <template slot-scope="scope">
                <el-tag type="danger" v-if="scope.row.status==1">未付款</el-tag>
                <el-tag type="info" v-else-if="scope.row.status == 2">已付款</el-tag>
                <el-tag type="info" v-else-if="scope.row.status == 3">已发货</el-tag>
                <el-tag type="info" v-else >已付款,但库存不足</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="订单创建时间" prop="create_time"></el-table-column>
            <el-table-column label="操作" fixed="right" width="170">
                <template slot-scope="scope"> 
                    <el-button plain size="mini" type="primary" @click="handleDeliverGoods(scope.row.id)" v-if="scope.row.status ==2">发货</el-button>
                    <el-button plain size="mini" type="primary" disabled v-else>发货</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <!-- 选择快递视图 -->
    <el-dialog
        title="选择快递"
        :visible.sync="showDeliverDialog"
        width="40%"
        center>
        <el-form @submit.native.prevent :inline="isInline" :rules="rules" ref='form'>
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
          <el-button  @click="showDeliverDialog = false">取 消</el-button>
          <el-button type="primary" @click="handleBeSureDeliver">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import OrderM from '../../model/order'
import Add from './Add'
import Edit from './Edit'
const orderM = new OrderM();
export default {
  name: 'List',
  components:{Add,Edit},
  data(){
    return {
      orderList:[],
      expressList: [
        { value: 'sf',label: '顺丰',},
        { value: 'yt',label: '圆通',},
        { value: 'zto',label: '中通',},
        { value: 'yd',label: '韵达',},
        { value: 'sto',label: '申通',},
      ],
      isInline:true,
      companyCode:'sf',//默认显示的快递
      tracingNo:'',//快递单号
      showDialog:false,//控制显示删除询问
      showDeliverDialog:false,//
      id:null,//为删除准备的id
      loading:false,//加载数据时的动画
      switchComponent:false,//是否切换到Add或Edit组件
      targetComponent:'',//目标主键名称
      order:null,//Edit时的当前数据
      rules: {
        tracingNoChecker: [
          { required: true,message: '请输入快递单号',trigger: 'blur',},
        ],
      },
    }
  },
  async created(){
      await this.getOrders();
  },
  methods:{
    /**加载订单列表 */
    async getOrders(){
      const data = await orderM.getByPageCondition({});
      this.orderList = data;
    },
    /**弹出快递选择框 */
    async handleDeliverGoods(id){
      this.id = id;
      this.showDeliverDialog = true;
    },
    /**确认发货 */
    async handleBeSureDeliver(){
      // const valid = await this.$refs.form.validate();
      // console.log(valid)
      // if(!valid){
      //   this.$message.error('验证不通过');
      //   this.showDeliverDialog = false
      //   return;
      // }
      
      const data = {
      "companyCode":this.companyCode,
      "tracingNo":this.tracingNo,
      "orderId":this.id
      }
      try{
        await orderM.deliverGoods(data);
        await this.getOrders();
        this.showDeliverDialog = false
        this.$message.success('发货成功');
      }catch(e){
        console.log(e);
        this.showDeliverDialog = false
        this.$message.error('发货失败')
      }
      
    },

  },
  
}
</script>

<style lang="scss" scoped>
    .button-container{
          margin-top: 30px;
          padding-right: 30px;
          display: flex;
          justify-content: flex-end;
      }

    .table-container{
        margin-top: 30px;
        padding-left: 30px;
        padding-right: 30px;
        padding-bottom: 200px;

        .expand-container {
            display: flex;
            justify-content: flex-start;
            align-items: center;

            .img {
                margin: 10px;
                width: 200px;
            }
        }
    }
    
</style>
