import request from '@/request'

// 按条件分页查询登陆人员医院的疫苗数据
export function getPage({current, size}, params) {
    return request({
        url: '/vaccine/' + current + '/' + size,
        method: 'get',
        params
    })
};

// 查找制药厂
export function getFactory() {
    return request({
        url: '/factory',
        method: 'get'
    })
};

// 查找疫苗类型
export function getVaccineType() {
    return request({
        url: '/vaccineType',
        method: 'get'
    })
};

//添加疫苗信息
export function saveVaccine(data) {
    data.hospitalId = localStorage.getItem("hospitalId");
    return request({
        url: '/vaccine',
        method: 'post',
        data
    })
};

//修改疫苗信息
export function updateVaccine(data) {
    return request({
        url: '/vaccine',
        method: 'put',
        data
    })
};

//批量删除疫苗
export function removeByIds(data) {
    return request({
        url: '/vaccine',
        method: 'delete',
        data
    })
};