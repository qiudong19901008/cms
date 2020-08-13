/* eslint-disable */
import _axios, { get, put, _delete } from '@/lin/plugin/axios'

class ordinary {

  /**
   * @url GET /AM/list
   * @return 获取账户列表
   */
  static async getAccountList(params) {
    console.log(params)
   const accountList = await _axios({
      method: 'get',
      url: 'AM/list',
      params,
    });
    return accountList;
  }

  /**
    * @url POST /AM/add
    * 新增一个账号信息
    * 必备参数:平台名称 账号 密码
    * 可选参数:平台网址 手机号 邮箱 邮箱密码 备注
  */
  static async addOneAccount(data) {
    await _axios({
       method: 'post',
       url: 'AM/add',
       data,
     });
   }

   /**
   * @url PUT /AM/edit/:id
   * 修改一个账号信息
   * 必备参数: id
   * 可选参数:平台名称 账号 密码 平台网址 手机号 邮箱 邮箱密码 备注
   */
  static async editOneAccount(id,data) {
    await _axios({
       method: 'put',
       url: `AM/edit/${id}`,
       data,
     });
   }
   /**
   * @url DELETE /AM/del/:id
   * 删除一个账号信息
   * 必备参数: id
   */
  static async delOneAccount(id) {
    await _axios({
       method: 'delete',
       url: `AM/del/${id}`,
     });
   }

  
  


  

}

export default ordinary;
