<template>
    <div class="container">
      <el-table :data="orders">
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
              <el-tag type="success" v-else-if="scope.row.status == 2">已付款</el-tag>
              <el-tag type="info" v-else-if="scope.row.status == 3">已发货</el-tag>
              <el-tag type="info" v-else >已付款,但库存不足</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="订单创建时间" prop="create_time"></el-table-column>
          <el-table-column label="操作" fixed="right" width="170">
              <template slot-scope="scope"> 
                  <el-button plain size="mini" type="primary" @click="handleShowDialog(scope.row.id)" v-if="scope.row.status ==2">发货</el-button>
                  <el-button plain size="mini" type="primary" disabled v-else>发货</el-button>
              </template>
          </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :total="count">
        </el-pagination>
      </div>
    </div>
    
   
    
</template>

<script>
export default {
  name: 'ListTable',
  props:{
    orderListAndCount:Object,
  },
  data() {
    return{
      currentPage:1,
      orders:orderListAndCount.orders,
      count:orderListAndCount.count
    }
  },
  methods:{

    /**显示快递dialog */
    handleShowDialog(id){
      this.$emit('showDialog',id);
    },
    /**分页 */
    handleCurrentChange(currentPage){
      this.$emit('currentChange',currentPage)
    }
  }
   
};
</script>
<style scoped lang="scss">
  .container{
    margin-top: 30px;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 200px;
    .pagination-container{
          display: flex;
          padding:40px 20px 0 0;
          justify-content: flex-end;
        }
  }
</style>