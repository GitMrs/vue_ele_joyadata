/**
 * 核心获取表单数据
 */
import request from '@/utils/request';
export const initData = (url, params, method = 'get') => {
  let obj = {};
  method === 'get' ? obj = {
    url,
    method,
    params
  } : obj = {
    url,
    method,
    data: params
  };
  return request(obj);
};
