// 配置路径！
let url = '';
switch (process.env.NODE_ENV) {
  case 'development':
    // url = 'http://192.168.80.102:2022';
    url = '/dev-api'; // 核心数据请求url
    break;
  case 'production':
    url = window._baseData.url || '/dsp_ht'; // 打包后的数据请求，一般走nginx
    break;
  default:
    url = '/';
    break;
}
export default {
  url
};
