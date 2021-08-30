import request from '../request'

const baseUrl = process.env.REACT_APP_BASEURL

// 账号管理查询接口
export const accountQueryApi = (params:any) => {
  return request({
    url: `${baseUrl}/v1/account/query`,
    method: 'get',
    params
  })
}

// 账号管理查询接口
export const accountDeleteApi = (data:any) => {
  return request({
    url: `${baseUrl}/v1/account/del`,
    method: 'delete',
    data
  })
}
