import axios from "axios"

const instance = axios.create({
    baseURL: 'http://localhost:9999',
});
// 请求拦截器
instance.interceptors.request.use(function (config) {
    // 判断用户登录状态
    return config;
}, function (error) {
    return Promise.reject(error);
});
// 响应拦截器
instance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});
export default instance