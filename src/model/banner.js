/* eslint-disable */
import _axios, { get, put, _delete } from '@/lin/plugin/axios'

class BannerM {

  /**
   * @url GET /v1/banner?ids=1,2,3...
   * @return 获取所有轮播图
   */
  static async getBanners() {
   const bannerList = await _axios({
      method: 'get',
      url: 'v1/banner',
      handleError: true,
    });
    console.log(bannerList);
    return bannerList;
  }
  /**
   * @url DELETE /v1/banner?ids=1,2,3...
   * @return 删除轮播图
   */
  static async deleteBanners(ids){
    await _axios({
      method:'delete',
      url:'v1/banner?ids='+ids,
    });
  }
  /**
   * @url POST /v1/banner
   * @return 新增一个轮播图
   */
  static async createBanner(banner){
    await _axios({
      method:'post',
      url:'v1/banner',
      data:banner
    });
  }
  /**
 * @url PATCH /v1/banner/:id
 * @return 编辑轮播图信息(不包含子元素)
 */
  static async editBannerInfo(id,info){
    await _axios({
      method:'patch',
      url:'v1/banner/'+id,
      data:info
    });
  }
  /**
   * @url DELETE /v1/banner/item?ids=1,2,3...
   * @return 删除轮播图的子元素
   */
  static async delBannerItems(idArr){
    const ids = idArr.join(',');
    await _axios({
      method:'delete',
      url:'v1/banner/item?ids='+ids,
    });
  }
  /**
   * @url POST /v1/banner/item/:id
   * @return 新增轮播图子元素(一个或多个)
   */
  static async addBannerItems(id,items){
    await _axios({
      method:'post',
      url:'v1/banner/item/'+id,
      data:{
        items
      }
    });
  }
  /**
   * @url PUT /v1/banner/item/:id
   * @return 修改轮播图某个子元素
   */
  static async editBannerItems(id,items){
    await _axios({
      method:'put',
      url:'v1/banner/item/'+id,
      data:{
        items
      }
    });
  }


  

}

export default BannerM;
