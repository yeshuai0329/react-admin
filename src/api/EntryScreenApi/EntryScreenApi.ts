import request from '../request'

const baseUrl = process.env.REACT_APP_BASEURL

// 登录接口
export const loginApi = (data:{username: string, password: string}) => {
  return request({
    url: `${baseUrl}/v1/user/login`,
    method: 'post',
    data
  })
}

// 获取用户权限信息
export const getAuthInfoApi = (data:{token: string}) => {
  return request({
    url: `${baseUrl}/v1/user/authinfo`,
    method: 'post',
    data
  })
}
