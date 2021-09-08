import { TConfig } from 'typings/config'
import config from 'config/config'
import {
  SET_LANG,
  SET_SIDER_MENU_IS_HAS,
  SET_COLLAPSED,
  SET_SIDER_MENU_THEME,
  SET_SIDER_MENU_IS_HAS_LOGO,
  SET_TOP_MENU_IS_HAS,
  SET_TOP_MENU_IS_HAS_LOGO,
  SET_TOP_MENU_THEME,
  SET_BREADCRUMB_IS_HAS
} from 'store/actionTypes/configActionType'

// redux默认的配置
const defaultConfig = {
  // 默认国际化语言配置
  locale: 'zh_CN',
  // 是否有侧边菜单
  siderMenuIsHas: true,
  // 侧边菜单的颜色
  siderMenuTheme: 'dark',
  // 侧边菜单的是否收起
  siderMenuIsCollapsed: false,
  // 侧边菜单是否有LOGO
  siderMenuIshHasLogo: true,
  // 是否有顶部菜单
  topMenuIsHas: false,
  // 顶部菜单颜色
  topMenuTheme: 'light',
  // 顶部菜单是否有logo
  topMenuIsHasLogo: false,
  // 是否有顶部面包屑
  breadCrumbIsHas: true
}

const userCurrentConfig = JSON.parse(localStorage.getItem('userCurrentConfig') || '{}')

const defaultState: TConfig = Object.assign(defaultConfig, config, userCurrentConfig)

interface IAction {
  type: string;
  payload?: string | boolean;
}

export default (state = defaultState, { type, payload }: IAction) => {
  const newState = JSON.parse(JSON.stringify(state))
  // 全局config配置 - 当前语言
  if (type === SET_LANG) {
    newState.locale = payload
    localStorage.setItem('currentLocale', payload as string)
    localStorage.setItem('userCurrentConfig', JSON.stringify(newState))
    return newState
  }
  // 是否有侧边菜单
  if (type === SET_SIDER_MENU_IS_HAS) {
    newState.siderMenuIsHas = payload
    localStorage.setItem('userCurrentConfig', JSON.stringify(newState))
    return newState
  }
  // 侧边菜单的颜色
  if (type === SET_SIDER_MENU_THEME) {
    newState.siderMenuTheme = payload
    localStorage.setItem('userCurrentConfig', JSON.stringify(newState))
    return newState
  }
  // 侧边菜单展开还是收缩
  if (type === SET_COLLAPSED) {
    newState.siderMenuIsCollapsed = payload
    localStorage.setItem('userCurrentConfig', JSON.stringify(newState))
    return newState
  }
  // 侧边菜单是否有LOGO
  if (type === SET_SIDER_MENU_IS_HAS_LOGO) {
    newState.siderMenuIshHasLogo = payload
    localStorage.setItem('userCurrentConfig', JSON.stringify(newState))
    return newState
  }

  // 是否有顶部菜单
  if (type === SET_TOP_MENU_IS_HAS) {
    newState.topMenuIsHas = payload
    localStorage.setItem('userCurrentConfig', JSON.stringify(newState))
    return newState
  }
  // 顶部菜单是否有logo
  if (type === SET_TOP_MENU_IS_HAS_LOGO) {
    newState.topMenuIsHasLogo = payload
    localStorage.setItem('userCurrentConfig', JSON.stringify(newState))
    return newState
  }
  // 顶部菜单颜色
  if (type === SET_TOP_MENU_THEME) {
    newState.topMenuTheme = payload
    localStorage.setItem('userCurrentConfig', JSON.stringify(newState))
    return newState
  }

  // 是否有顶部面包屑
  if (type === SET_BREADCRUMB_IS_HAS) {
    newState.breadCrumbIsHas = payload
    localStorage.setItem('userCurrentConfig', JSON.stringify(newState))
    return newState
  }
  return state
}
