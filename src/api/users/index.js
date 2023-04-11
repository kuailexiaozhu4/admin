import request from '@/request'

// 按条件分页查询所有用户数据
export function getPage({current, size}, params) {
    return request({
        url: '/user/' + current + '/' + size,
        method: 'get',
        params
    })
};

// 按用户id删除用户
export function removeById(row) {
    return request({
        url: '/user',
        method: 'delete',
        params: {id: row.id}
    })
};

// 修改用户
export function updateUser(user) {
    return request({
        url: '/user',
        method: 'put',
        data:user
    })
}