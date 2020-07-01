/* eslint-disable */
import _axios, { get, put, _delete } from '@/lin/plugin/axios'

class CategoryM {
  /**
   * @url GET /v1/category
   * @return 查询所有分类
   */
  static async getAll(){
    return await _axios({
      method:'get',
      url:'v1/category',
    });
  }
  /**
   * @url POST /v1/category
   * @return 新增一个分类
   */
  static async addOne(data){
    return await _axios({
      method:'post',
      url:'v1/category',
      data
    });
  }
  /**
   * @url PUT /v1/category/:id
   * @return 更新一个分类
   */
  static async editOne(id,data){
    return await _axios({
      method:'put',
      url:'v1/category/'+id,
      data
    });
  }
  /**
   * @url Delete /v1/category?ids=1,2,3...
   * @return 删除分类
   */
  static async delCategories(ids){
    return await _axios({
      method:'delete',
      url:'v1/category?ids='+ids,
    });
  }
}

export default CategoryM;
