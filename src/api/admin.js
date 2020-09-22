import request from '@/utils/request'
// 返回部门列表
export function departmentList(data) {
  return request({
    url: '/user/deplist',
    method: 'get'
  })
}

export function userPage(data) {
  return request({
    url: '/user/userpage',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/user/updateonedetail',
    method: 'post',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: '/user/deluser',
    method: 'post',
    data
  })
}
export function addUser(data) {
  return request({
    url: '/user/adduser',
    method: 'post',
    data
  })
}

export function queryColumn(data) {
  return request({
    url: '/examine/columnshow',
    method: 'post',
    data
  })
}

export function updateColumn(data) {
  return request({
    url: '/examine/updatecolumn',
    method: 'post',
    data
  })
}
