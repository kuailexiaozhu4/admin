import request from '@/request'

// 按条件分页查询预约疫苗数据
export function getPage({current, size}, params) {
    return request({
        url: '/appUserVaccine/' + current + '/' + size,
        method: 'get',
        params
    })
};
