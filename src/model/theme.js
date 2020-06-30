/* eslint-disable */
import _axios, { get, put, _delete } from '@/lin/plugin/axios'

class ThemeM {

  /**
   * @url GET /v1/theme?ids=1,2,3...
   * @return 返回简单主题列表(不包含产品项)
   */
  static async getSimpleList(ids){
    let url = 'v1/theme'
    if(ids){
      url = 'v1/theme?ids='+ids;
    }
    return await _axios({
      method: 'get',
      url
    });
  }
  /**
   * @url POST /v1/theme
   * @return 添加一个主题
   */
  static async createOne(data){
    const theme = await _axios({
      method: 'post',
      url:'v1/theme',
      data,
    });
    console.log(theme);
    return theme;
  }
  /**
   * @url POST /v1/theme/product/:id
   * @return 新增主题关联商品
   */
  static async addProducts(id,products){
    return await _axios({
      method: 'post',
      url:'v1/theme/product/'+id,
      data:{
        products
      }
    });
  }
  /**
   * @url GET /v1/theme/:id
   * @return 根据id返回主题详情
   */
  static async getDetail(id){
    return await _axios({
      method: 'get',
      url:'v1/theme/'+id,
    });
  }



  

}

export default ThemeM;
