import request from '../request'

const baseUrl = process.env.REACT_APP_BASEURL
console.log(`baseUrl`, baseUrl)
// 账号管理查询接口
export const accountQueryApi = (params:any) => {
  return request({
    url: `${baseUrl}/api/v1/account/query`,
    method: 'get',
    params
  })
}
