/* eslint-disable */
import _axios, { get, put, _delete } from '@/lin/plugin/axios'

class Intro {

  /**
   * @url GET intro/list
   * @return 获取被爬取资源简介列表
   */
  static async getList(params) {
   const introList = await _axios({
      method: 'get',
      url: 'intro/list',
      params,
    });
    return introList;
  }

   /**
    * @url POST intro/add
    * 新增一个爬取站点
    */
 static async addOne(data) {
  await _axios({
     method: 'post',
     url: 'intro/add',
     data,
   });
 }

 /**
 * @url PUT intro/edit/:id
 * 修改一个账号信息
 */
static async editOne(id,data) {
  await _axios({
     method: 'put',
     url: `intro/edit/${id}`,
     data,
   });
 }
 /**
 * @url DELETE intro/del/:ids
 * 删除一个站点信息
 * 必备参数: ids 
 * 格式: 1,2,3,5...
 */
static async delMany(ids) {
  await _axios({
     method: 'delete',
     url: `intro/del/${ids}`,
   });
 }
  
  


  

}

export default Intro;
