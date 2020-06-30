/* eslint-disable */
import _axios, { get, put, _delete } from '@/lin/plugin/axios'

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


  

}

export default ProductM;
