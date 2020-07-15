/* eslint-disable */
import _axios, { get, put, _delete } from '@/lin/plugin/axios'

class MyCategoryM {

  /**
   * 获取所有分类列表
   */
  static async getAll(){
    return await _axios({
      method:'get',
      url:'v1/mc',
    });
  }

  /**
   * 获取分页分类列表
   */
  static async getAllPagination({name}){
    return await _axios({
      method:'get',
      url:'v1/mc/list',
      data:{
        name
      }
    });
  }
 /**
   * 新增一个分类
   */
  static async createOne({name,description}){
    await _axios({
      method:'post',
      url:'v1/mc/one',
      data:{
        name,
        description
      }
    });
  }
  /**
   * 修改一个问题
   */
  static async updateOne(id,{name,description}){
    await _axios({
      method:'put',
      url:`v1/mc/${id}`,
      data:{
        name,
        description
      }
    });
  }

  /**删除一个问题 */
  static async deleteOne(id){
    await _axios({
      method:'delete',
      url:`v1/mc/${id}`,
    });
  }

}

export default MyCategoryM;
