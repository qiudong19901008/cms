/* eslint-disable */
import _axios, { get, put, _delete } from '@/lin/plugin/axios'

class IssueAnwserM {
  /**
   * 获取问题答案列表
   */
  static async getAll(){
    return await _axios({
      method:'get',
      url:'v1/ia/list',
    });
  }
}

export default IssueAnwserM;
