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
/**
 * 初始化图片数组 
 * data格式:[{id,url},{id,url},...] 或者{id,url}
 */
const initUploadImageArr =(data)=>{
  console.log(data)
  const uploadImageArr = [];
  if(!(data instanceof Array)){
    data = [data];
  }
  for (let i=0,size= data.length; i<size; i++) {
    const img = {
      id: createId(),
      imgId: data[i].id,
      display: data[i].url,
    };
    uploadImageArr.push(img)
  }
  return uploadImageArr;
}

export {
  customImageUpload,
  createId,
  initUploadImageArr
}