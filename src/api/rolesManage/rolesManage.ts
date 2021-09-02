import request from '../request'

const baseUrl = process.env.REACT_APP_BASEURL

// 角色管理删除接口
export const rolesDeleteApi = (data:any) => {
  return request({
    url: `${baseUrl}/v1/roles/del`,
    method: 'delete',
    data
  })
}

// 角色管理查询接口
export const rolesQueryApi = (params:any) => {
  return request({
    url: `${baseUrl}/v1/roles/query`,
    method: 'get',
    params
  })
}

// 角色管理改变角色状态接口
export const changeRolesStatusApi = (data:any) => {
  return request({
    url: `${baseUrl}/v1/roles/changerolesStatus`,
    method: 'post',
    data
  })
}
