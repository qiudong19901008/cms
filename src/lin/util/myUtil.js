import _axios, { get, put, _delete } from '@/lin/plugin/axios'
import {merge} from 'lodash'

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

/**
 * 删除一个数组中某属性
 * @arr Array
 * @delP String | Array
 */
const delArrPropeties = (arr,delP)=>{
  if(!(delP instanceof Array)){
    delP=[delP]
  }
  arr.map(obj=>{
    for(let dp of delP){
      delete obj[dp]
    }
  });
}

/**
 * 给数组添加属性 后者会覆盖前者相同属性
 * @arr Array
 * @addP Object | Array
 * @return Array 合并后的数组
 */
const addArrPropeties = (arr,addP)=>{
  if(!(addP instanceof Array)){
      addP =[addP];
  }
  if(arr.length!=addP.length){
    throw new Exception('两个数组长度必须一致');
  }
  const resArr=[];
  for(let i=0,size = arr.length;i<size;i++){
    resArr.push(merge(arr[i],addP[i]));
  }
  return resArr;
}

/**
 * 截取字符串前n位,并添加...
 */
const getSummary = (val,number=10)=>{
  let Datas = val;
  //所返回数据length为7是添加"..."
  if(!Datas){
    return ''
  }
  let Datas_msg = Datas.substr(0, number) + "...";
  if (Datas.length <= 8) {
    return Datas;
  } else {
    return Datas_msg;
  }
}
/**
 * 时间格式化
 */
const formatDate = (val)=>{
  const t=new Date(val);
  return t.getFullYear()+"-"+fillZero((t.getMonth()+1))+"-"+fillZero(t.getDate())+" "+fillZero(t.getHours())+":"+fillZero(t.getMinutes())+":"+fillZero(t.getSeconds());
}
/**
 * 小于10补0
 */
const  fillZero = (val) =>{
  return val<10?'0'+val:val;
}

export {
  customImageUpload,
  createId,
  initUploadImageArr,
  delArrPropeties,
  addArrPropeties,
  getSummary,
  formatDate,
}