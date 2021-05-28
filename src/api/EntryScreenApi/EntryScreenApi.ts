import request from '../request'

// 登录接口
export const loginApi = (params:{username: string, password: string}) => {
  return request({
    url: 'http://localhost:8000/users',
    method: 'get',
    params
  })
}
