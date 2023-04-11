import request from '@/request'

// 登录
export function login(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
};

// 注册
export function register(data) {
    return request({
        url: '/user/register',
        method: 'post',
        data
    })
};

//校验token
export function check(data) {
    return request({
        url: '/check',
        method: 'post',
        data
    })
};