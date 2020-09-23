/* eslint-disable */
import _axios, { get, put, _delete } from '@/lin/plugin/axios'

class Resource {

  /**
   * @url GET resource/list
   * @return 获取已处理资源列表
   */
  static async getList(params) {
   const resourceList = await _axios({
      method: 'get',
      url: 'resource/list',
      params,
    });
    return resourceList;
  }

  

  /**
  * 插入wp
  * @param {*} data 
  */
static async insertWP(data){
  await _axios({
    method:'post',
    url:`crawl/insertWP`,
    data
  })
}

/**
 * @url POST crawl/reShare
 * 重新对资源进行分享
 */
static async reShare(data){
  await _axios({
    method:'post',
    url:`crawl/reShare`,
    data
  })
}

/**
 * @url POST crawl/updateTerm
 * 重新对资源进行分享
 */
static async updateTerm(data){
  await _axios({
    method:'post',
    url:`crawl/updateTerm`,
    data
  })
}

/**
 * @url POST crawl/checkReInsert
 * 重新对资源进行分享
 */
static async checkReInsert(data){
  await _axios({
    method:'post',
    url:`crawl/checkReInsert`,
    data
  })
}

 /**
 * @url DELETE resource/del/:ids
 * 删除资源信息
 * 必备参数: ids 
 * 格式: 1,2,3,5...
 */
static async delSelected(ids) {
  // console.log(ids)
  await _axios({
     method: 'delete',
     url: `resource/del/${ids}`,
   });
 }

 /**
 * @url POST crawl/updatePic/siteId
 * 更新封面图
 */
 static async updatePic(siteId,count){
   await _axios({
    method: 'post',
    url: `crawl/updatePic/${siteId}`,
    data:{
      count
    }
  });
 }

//    /**
//     * @url POST site/add
//     * 新增一个爬取站点
//     * 
//     * 
//   */
//  static async addOne(data) {
//   await _axios({
//      method: 'post',
//      url: 'site/add',
//      data,
//    });
//  }

//  /**
//  * @url PUT site/edit/:id
//  * 修改一个账号信息
//  */
// static async editOne(id,data) {
//   await _axios({
//      method: 'put',
//      url: `site/edit/${id}`,
//      data,
//    });
//  }
//  /**
//  * @url DELETE site/del/:ids
//  * 删除一个站点信息
//  * 必备参数: ids 
//  * 格式: 1,2,3,5...
//  */
// static async delMany(ids) {
//   await _axios({
//      method: 'delete',
//      url: `site/del/${ids}`,
//    });
//  }
  
//  /**
//   * 爬取网站简介
//   * @param {*} data 
//   */
// static async crawlIntro(data){
//   await _axios({
//     method:'post',
//     url:`crawl/intro`,
//     data
//   })
// }


  

}

export default Resource;
