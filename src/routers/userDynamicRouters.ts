import asyncComponent from './AsyncComponent'
const Home = asyncComponent(() => import(/* webpackChunkName: "Home" */'pages/Home/Home'))
const Analysis = asyncComponent(() => import(/* webpackChunkName: "Analysis" */'pages/Dashbord/Analysis/Analysis'))
const Monitor = asyncComponent(() => import(/* webpackChunkName: "Monitor" */'pages/Dashbord/Monitor/Monitor'))
const RolesManage = asyncComponent(() => import(/* webpackChunkName: "RolesManage" */'pages/AuthManage/RolesManage/RolesManage'))
const AccountsManage = asyncComponent(() => import(/* webpackChunkName: "AccountsManage" */'pages/AuthManage/AccountsManage/AccountsManage'))
const MenusManage = asyncComponent(() => import(/* webpackChunkName: "MenusManage" */'pages/AuthManage/MenusManage/MenusManage'))
const SystemConfig = asyncComponent(() => import(/* webpackChunkName: "MenusManage" */'pages/System/SystemConfig/SystemConfig'))

const allAuthRouter:{[key:string]: any} = {
  home: Home,
  analysis: Analysis,
  monitor: Monitor,
  rolesmanage: RolesManage,
  accountsmanage: AccountsManage,
  menusmanage: MenusManage,
  systemconfig: SystemConfig
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
 * @param {*}
 * @return {*}
 */
export const authRouter = (authMenu: any[]): any => {
  const newArr = authMenu.filter((menu: any) => menu.auth)
  return newArr.map((item: any) => {
    if (item.children && item.children.length) {
      item.children = authRouter(item.children)
    }
    return item
  })
}
