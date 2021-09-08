
import {
  Home,
  Analysis,
  Monitor,
  Rolesmanage,
  Accountsmanage,
  Menusmanage,
  Systemconfig
} from './AsyncComponent'
/**
 * @description: 本地所有路由信息映射
 */
const allAuthRouter:{[key:string]: any} = {
  // 首页
  home: Home,
  // 分析页
  analysis: Analysis,
  // 监控页面
  monitor: Monitor,
  // 角色管理
  rolesmanage: Rolesmanage,
  // 账户管理
  accountsmanage: Accountsmanage,
  // 菜单管理
  menusmanage: Menusmanage,
  // 系统配置
  systemconfig: Systemconfig
}

/**
 * 动态路由映射函数
 */
export const userDynamicRouters = (rightRouters: any) => {
  const userRouters: any = []
  const recursionMap = (arr: any) => {
    arr.forEach((item: any) => {
      if (item.children && item.children.length) {
        recursionMap(item.children)
      } else {
        const component = item.component?.toLowerCase()
        if (allAuthRouter[component]) {
          userRouters.push({ ...item, component: allAuthRouter[component] })
        }
      }
    })
  }
  recursionMap(rightRouters)
  return userRouters
}

/**
 * @description: 权限路由,根据请求回来的路由,过滤有权限的路由
 * @return {*}
 */
export const filterAuthRoutes = (authMenu: any[]): any => {
  const newArr = authMenu.filter((menu: any) => menu.auth)
  newArr.forEach((item: any) => {
    if (item.children && item.children.length) {
      item.children = filterAuthRoutes(item.children)
    }
  })
  return newArr
}
