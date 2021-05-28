import { loginApi } from 'api/EntryScreenApi/EntryScreenApi'
import Cookies from 'js-cookie'
import { useHistory } from 'react-router'
import { authRouter } from 'routers/userDynamicRouters'
export interface ILogin {
  username: string,
  password: string
}

/**
 * @description:  中后台登录服务
 * @param {*}
 * @return {*}
 */
export const useLogin = () => {
  const history = useHistory()
  const onFinish = (values: any) => {
    loginFetch(values)
  }

  /**
   * @description: 调用登录的接口
   * @param {*}
   * @return {*}
   */
  const loginFetch = async (values: ILogin) => {
    const { data } = await loginApi(values)
    // 存储过滤好的权限路由信息
    if (data[0]) {
      localStorage.setItem('authMenu', JSON.stringify(authRouter(data[0].authMenu)))
      localStorage.setItem('authButton', JSON.stringify(data[0].authButton))
    }
    Cookies.set('R-Boot-token', 'a')
    history.push('/home')
  }

  return {
    onFinish
  }
}

/**
 * @description: 退出中后台系统配置
 * @param {*}
 * @return {*}
 */
export const useLogout = () => {
  const logout = () => {
    localStorage.clear()
    Cookies.remove('R-Boot-token')
    window.location.reload()
  }
  return {
    logout
  }
}
