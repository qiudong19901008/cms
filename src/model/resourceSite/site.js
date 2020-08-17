/* eslint-disable */
import _axios, { get, put, _delete } from '@/lin/plugin/axios'

class Site {

  /**
   * @url GET site/list
   * @return 获取被爬取站点列表
   */
  static async getList(params) {
   const siteList = await _axios({
      method: 'get',
      url: 'site/list',
      params,
    });
    return siteList;
  }

   /**
    * @url POST site/add
    * 新增一个爬取站点
    * 
    * 
  */
 static async addOne(data) {
  await _axios({
     method: 'post',
     url: 'site/add/add',
     data,
   });
 }

 /**
 * @url PUT site/edit/:id
 * 修改一个账号信息
 */
static async editOne(id,data) {
  await _axios({
     method: 'put',
     url: `site/edit/${id}`,
     data,
   });
 }
 /**
 * @url DELETE site/del/:ids
 * 删除一个站点信息
 * 必备参数: ids 
 * 格式: 1,2,3,5...
 */
static async delMany(ids) {
  await _axios({
     method: 'delete',
     url: `site/del/${ids}`,
   });
 }
  
  


  

}

export default BDPan;
