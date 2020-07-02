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
  /**
   * @url POST /v1/product
   * @return 新增商品
   */
  static async addOne(data){
    return await _axios({
      method:'post',
      url:`/v1/product`,
      data,
    });
  }
  /**
   * @url PUT /v1/product/edit
   * @return 修改商品信息
   */ 
  static async editOne(data){
    return await _axios({
      method:'put',
      url:`/v1/product/edit`,
      data,
    });
  }
  /**
   * @url DELETE /v1/product/:id
   * @return 删除商品信息
   */
  static async delOne(id){
    return await _axios({
      method:'delete',
      url:`/v1/product/${id}`,
    });
  }
  
  

}

export default ProductM;
