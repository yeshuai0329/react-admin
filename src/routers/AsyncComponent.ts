import React from 'react'

// 首页
export const Home = React.lazy(() => import(/* webpackChunkName: "Home" */'pages/Home/Home'))

/**
 * Dashborad
 */
// 分析页
export const Analysis = React.lazy(() => import(/* webpackChunkName: "Analysis" */'pages/Dashbord/Analysis/Analysis'))
// 监控页面
export const Monitor = React.lazy(() => import(/* webpackChunkName: "Monitor" */'pages/Dashbord/Monitor/Monitor'))

/**
 * 权限管理
 */
// 角色管理
export const Rolesmanage = React.lazy(
  () => import(/* webpackChunkName: "RolesManage" */'pages/AuthManage/RolesManage/RolesManage')
)
// 账户管理
export const Accountsmanage = React.lazy(
  () => import(/* webpackChunkName: "AccountsManage" */'pages/AuthManage/AccountsManage/AccountsManage')
)
// 菜单管理
export const Menusmanage = React.lazy(
  () => import(/* webpackChunkName: "MenusManage" */'pages/AuthManage/MenusManage/MenusManage')
)

/**
 * 系统管理
 */
// 系统配置
export const Systemconfig = React.lazy(
  () => import(/* webpackChunkName: "MenusManage" */'pages/System/SystemConfig/SystemConfig')
)
