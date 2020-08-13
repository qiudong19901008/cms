/* eslint-disable */
import _axios, { get, put, _delete } from '@/lin/plugin/axios'

class BDPan {

  /**
   * @url GET /v1/bdpan/list
   * @return 获取所有百度网盘账户
   */
  static async getBDPanList(params) {
   const {pageSize,pageNum} = BDPan._makeSurePagination(params)
   const bdPanList = await _axios({
      method: 'get',
      url: 'v1/bdpan/list',
      params:{
        pageSize,
        pageNum
      }
    });
    return bdPanList;
  }

  static _makeSurePagination(params){
    const pageSize = params['pageSize']?params['pageSize']:10
    const pageNum = params['pageNum']?params['pageNum']:0
    return {
      pageSize,
      pageNum
    }
  } 
  


  

}

export default BDPan;
