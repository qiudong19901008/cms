/* eslint-disable */
import _axios, { get, put, _delete } from '@/lin/plugin/axios'

class IssueAnwserM {
  /**
   * 获取问题答案列表
   */
  static async getAll({page,size,issue,anwser,categoryId,keyword}){
    size=8
    return await _axios({
      method:'get',
      url:'v1/ia/list',
      data:{
        page,
        size,
        issue,
        anwser,
        categoryId,
        keyword,
      }
    });
  }
  /**
   * 新增一个问题
   */
  static async createOne({issue,anwser,categoryId,keyword}){
    await _axios({
      method:'post',
      url:'v1/ia/one',
      data:{
        issue,
        anwser,
        categoryId,
        keyword,
      }
    });
  }
  /**
   * 修改一个问题
   */
  static async updateOne(id,{issue,anwser,categoryId,keyword}){
    console.log({issue,anwser,categoryId,keyword,id})
    await _axios({
      method:'put',
      url:`v1/ia/${id}`,
      data:{
        issue,
        anwser,
        categoryId,
        keyword,
      }
    });
  }

  /**删除一个问题 */
  static async deleteOne(id){
    await _axios({
      method:'delete',
      url:`v1/ia/${id}`,
    });
  }
}

export default IssueAnwserM;
