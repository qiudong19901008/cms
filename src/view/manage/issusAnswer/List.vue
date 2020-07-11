
<template>
  <div class="lin-container">
    <div class="lin-title">问题答案列表</div>
    <!-- 表格条件查询 -->
    <!-- <ListConditionChoose 
    :tempInputContent.sync="inputContent"
    :tempSelectedTime.sync ="selectedTime"
    @reset = "handleReset"
    @search = "handleSearch"
    >
    </ListConditionChoose> -->
    <!-- 订单表格 -->
    <ListTable
    :tempIssueList= "issueList"
    :tempCount= "count"
    @showDialog= "handleShowDialog"
    @currentChange= "handleCurrentChange"
    >
    </ListTable>
    <!-- 快递dialog -->
    <!-- <ListDialog 
    @beSureDeliver= "handleBeSureDeliver" 
    @hideDialog= "handleHideDialog"
    :orderId="orderId"
    >
    </ListDialog> -->
  </div>
</template>

<script>
/* eslint-disable */
import IssueAnwserM from '../../../model/issueAnwser'
// import ListConditionChoose from './component/ListConditionChoose'
import ListTable from './component/ListTable'
// import ListDialog from './component/ListDialog'

export default {
  name: 'List',
  components:{
    // ListConditionChoose,
    ListTable,
    // ListDialog
  },
  data(){
    return {
      // inputContent:'',//存储当前输入的内容
      // selectedTime:[],//存储当前选中的时间
      issueList:[],//列表数据
      count:-1,//当前数据总数
      // orderId:-1,//为发货准备的id
      // loading:false,//加载数据控制动画
    }
  },
  async created(){
      await this.init();
  },
  methods:{
    /**组件初始化 */
    async init(params ={}){
      const data = await IssueAnwserM.getAll(params);
      this.issueList = data.list;
      this.count = data.count;
    },

    // /**搜索点击 */
    // async handleSearch(){
    //   const params = this._assembleParams();
    //   try{
    //     this.loading=true;
    //     this.init(params);
    //     this.loading=false;
    //     // this.$message.success('发货成功');

    //   }catch(e){
    //     console.log(e);
    //     this.loading=false;
    //     // this.$message.error('发货失败')
    //   }
    // },
    // /**重置 */
    // async handleReset(){
    //   this.init();
    // },

    /**分页查询 */
    async handleCurrentChange(currentPage){
      const page = currentPage-1;
      const params = this._assembleParams();
      params.page=page;
      try{
        this.loading=true;
        this.init(params);
        this.loading=false;
      }catch(e){
        this.loading=false;
      }
    },

    // /**弹出快递dialog */
    // async handleShowDialog(id){
    //   this.orderId = id;
    // },
    // /**确认发货 */
    // async handleBeSureDeliver(data){
    //   data.orderId =this.orderId;
    //   this.orderId=-1;
    //   try{
    //     this.loading=true;
    //     await orderM.deliverGoods(data);
    //     await this.init();
    //     this.loading=false;
    //     this.$message.success('发货成功');
    //   }catch(e){
    //     console.log(e);
    //     this.loading=false;
    //     this.$message.error('发货失败')
    //   }
    // },
    // /**关闭快递dialog */
    // handleHideDialog(){
    //   this.orderId=-1;
    // },

    // /**组装发送参数 */
    // _assembleParams(){
    //   const params = {}
    //   const input = this.inputContent;
    //   const time = this.selectedTime;
    //   if(time && time.length>1){
    //     params.start=time[0];
    //     params.end=time[1];
    //   }
    //   const orderNoRe = /^[A-Z]\d+$/;
    //   const isOrderNo = orderNoRe.test(input);
    //   if(isOrderNo){
    //     params.orderNo = input;
    //     params.name='';
    //   }else{
    //     params.orderNo = '';
    //     params.name = input;
    //   }   
    //   return params;
    // }
  
    
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
