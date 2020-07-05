/* eslint-disable */
import _axios, { get, put, _delete } from '@/lin/plugin/axios'
import config from '../config/config'

class OrderM {

  /**
   * @description 条件和分页查询订单
   * @url GET /v1/order/pagenation?page=1&size=10&start=开始时间&end=结束时间&orderNo=订单号&name=收货人姓名
   * @return 查询后的结果
   */
  async getByPageCondition({page,size,start,end,orderNo,name}){
    page = page?page:config.defaultPage;
    size = size?size:config.defaultsize;
    start = start?start:'';
    end = end?end:'';
    orderNo = orderNo?orderNo:'';
    name = name?name:'';
    return await _axios({
      method:'get',
      url:`v1/order/pagenation?page=${page}&size=${size}&start=${start}&end=${end}&orderNo=${orderNo}&name=${name}`
    });
  }
  /**
   * @description 发货
   * @url POST /v1/order/deliverGoods
   */
  async deliverGoods(data){
    return await _axios({
      method:'post',
      url:`v1/order/deliverGoods`,
      data:data
    });
  }

  

}

export default OrderM;
