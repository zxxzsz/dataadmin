import axios from "axios";
import {notification} from 'antd';

const codeMessage = {
  "200": "服务器成功返回数据",
  "201": "新建或修改数据成功",
  "400": "发出的请求有误", // token 失效
  "401": "用户没有权限（令牌、用户名或者密码错误）",
  "403": "用户得到授权，但是访问被禁止",
  "404": "发出的请求不存在，服务器没有进行操作",
  "406": "请求的格式不可得",
  "408": "请求超时",
  "500": "服务器端出错",
  "502": "网关错误",
  "503": "服务不可用",
  "504": "网关超时",
};

const errorHandler = (error) => {
  console.log(error);
  const {response} = error
  if (response?.status) {
    const errorText = codeMessage[response?.status] || response.statusText;
    const {status, url} = response;
    notification.error({
      message: `请求错误${status}: ${url}`,
      description: errorText,
    })
  } else if (!response) {
    notification.error({
      message: "网络异常",
      description: "您的网络异常，无法连接服务器"
    })
  }
  return response
};

const instance = axios.create({
  // baseURL: '/dataAdminApi',
});

instance.interceptors.response.use((response) => {
    if (response.status !== 200) return Promise.reject(response.data);
    console.log(response)
    return response;
  },
  (err) => {
    errorHandler(err);
    return Promise.reject(err.response);
  });
export default instance;