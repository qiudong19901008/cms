/* eslint-disable */
import _axios, { get, put, _delete } from '@/lin/plugin/axios'

class ordinary {

  /**
   * @url GET /AM/list
   * @return 获取账户列表
   */
  static async getAccountList(params) {
   const {pageSize,pageNum} = params
   const accountList = await _axios({
      method: 'get',
      url: 'AM/list',
      params:{
        pageSize,
        pageNum
      }
    });
    return accountList;
  }

  
  


  

}

export default ordinary;
