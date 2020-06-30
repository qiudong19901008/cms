import _axios, { get, put, _delete } from '@/lin/plugin/axios'

/**上传图片 */
const customImageUpload= async (file)=>{
  const res = await _axios({
    method:'post',
    url:'cms/file/image',
    data:{
      file
    },
  })
  return res
}


/** 生成随机字符串 */
const createId = ()=>{
  return Math.random()
  .toString(36)
  .substring(2)
}
/** */

export {
  customImageUpload,
  createId
}