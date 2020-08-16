/* eslint-disable */
import _axios, { get, put, _delete } from '@/lin/plugin/axios'

class BDPan {

  /**
   * @url GET /v1/bdpan/list
   * @return 获取所有百度网盘账户
   */
  static async getBDPanList(params) {
   const bdPanList = await _axios({
      method: 'get',
      url: 'v1/bdpan/list',
      params,
    });
    return bdPanList;
  }

   /**
    * @url POST /v1/bdpan/add
    * 新增一个账号信息
    * 必备参数: 账户, 密码
    * 可选参数: 邮箱账户, 邮箱密码, 电话号码
    * 自动补全参数: username, BDUSS, STOKEN, total_capacity, free_capacity
    * 
  */
 static async addOneAccount(data) {
  await _axios({
     method: 'post',
     url: 'v1/bdpan/add',
     data,
   });
 }

 /**
 * @url PUT /v1/bdpan/edit/:id
 * 修改一个账号信息
 * 必备参数: id
 * 可选参数: password, mailbox, mailbox_pwd, phone
 */
static async editOneAccount(id,data) {
  await _axios({
     method: 'put',
     url: `v1/bdpan/edit/${id}`,
     data,
   });
 }
 /**
 * @url DELETE /AM/del/:id
 * 删除一个账号信息
 * 必备参数: ids 
 * 格式: 1,2,3,5...
 */
static async delAccounts(ids) {
  await _axios({
     method: 'delete',
     url: `v1/bdpan/del/${ids}`,
   });
 }
  
  


  

}

export default BDPan;
