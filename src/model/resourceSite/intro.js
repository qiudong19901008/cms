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
* 爬取网站详情
* @param {*} data 
*/
static async crawlContent(data){
  await _axios({
    method:'post',
    url:`crawl/content`,
    data
  })
}

/**
* 处理资源
* @param {*} data 
*/
static async processResource(data){
  await _axios({
    method:'post',
    url:`crawl/processResource`,
    data
  })
}

/**
 * @url POST /crawl/transfer
 * 转存资源
 */
static async transferResource(data){
  await _axios({
    method:'post',
    url:`crawl/transfer`,
    data
  })
}

/**
 * 删除资源
 */
static async delMany(ids) {
  await _axios({
     method: 'delete',
     url: `intro/del/${ids}`,
   });
 }

/**
 * 手动添加一个资源
 */
static async addOne(data){
  // console.log(data)
  await _axios({
    method:'post',
    url:`intro/addOne`,
    data
  })
}
  
  


  

}

export default Intro;
