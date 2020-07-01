/* eslint-disable */
import _axios, { get, put, _delete } from '@/lin/plugin/axios'
import config from '../config/config'

class ProductM {

  /**
   * @url GET /v1/product
   * 查询所有上架的商品
   */
  static async getUsable(){
    return await _axios({
      method:'get',
      url:'v1/product'
    });
  }
  /**
   * @url GET /v1/product/pagenation?page=1&size=10&q=水果
   * 分页或名称模糊查询
   */
  static async getByKeyword({page,size,q}){
    page = page?page:config.defaultPage;
    size = size?size:config.defaultsize;
    q=q?q:'';
    return await _axios({
      method:'get',
      url:`v1/product/pagenation?page=${page}&size=${size}&q=${q}`
    });
  }
  /**
   * @url PATCH /v1/product/:id
   * @return 对某商品上下架
   */
  static async changeProductStatus(id){
    return await _axios({
      method:'patch',
      url:`/v1/product/${id}`
    });
  }

  

}

export default ProductM;
