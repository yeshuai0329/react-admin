import { TConfig } from 'typings/config/config'
import config from 'config/config'
import {
  SET_LANG,
  SET_SIDER_MENU_IS_HAS,
  SET_COLLAPSED,
  SET_SIDER_MENU_THEME,
  SET_SIDER_MENU_IS_HAS_LOGO,
  SET_TOP_MENU_IS_HAS,
  SET_BREADCRUMB_IS_HAS
} from 'store/actionTypes/configActionType'
// 默认的配置
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
  // 是否有顶部面包屑
  breadCrumbIsHas: true
}

const userLocalStorageConfig = JSON.parse(localStorage.getItem('userLocalStorageConfig') || '{}')

const defaultState: TConfig = Object.assign(defaultConfig, config, userLocalStorageConfig)

interface IAction {
  type: string;
  payload?: string | boolean;
}

export default (state = defaultState, { type, payload }: IAction) => {
  const newState = JSON.parse(JSON.stringify(state))
  // 全局config配置 - 当前语言
  if (type === SET_LANG) {
    newState.locale = payload
    localStorage.setItem('userLocalStorageConfig', JSON.stringify(newState))
    return newState
  }
  // 是否有侧边菜单
  if (type === SET_SIDER_MENU_IS_HAS) {
    newState.siderMenuIsHas = payload
    localStorage.setItem('userLocalStorageConfig', JSON.stringify(newState))
    return newState
  }
  // 侧边菜单的颜色
  if (type === SET_SIDER_MENU_THEME) {
    newState.siderMenuTheme = payload
    localStorage.setItem('userLocalStorageConfig', JSON.stringify(newState))
    return newState
  }
  // 侧边菜单展开还是收缩
  if (type === SET_COLLAPSED) {
    newState.siderMenuIsCollapsed = payload
    localStorage.setItem('userLocalStorageConfig', JSON.stringify(newState))
    return newState
  }
  // 侧边菜单是否有LOGO
  if (type === SET_SIDER_MENU_IS_HAS_LOGO) {
    newState.siderMenuIshHasLogo = payload
    localStorage.setItem('userLocalStorageConfig', JSON.stringify(newState))
    return newState
  }

  // 是否有顶部菜单
  if (type === SET_TOP_MENU_IS_HAS) {
    newState.topMenuIsHas = payload
    localStorage.setItem('userLocalStorageConfig', JSON.stringify(newState))
    return newState
  }

  // 是否有顶部面包屑
  if (type === SET_BREADCRUMB_IS_HAS) {
    newState.breadCrumbIsHas = payload
    localStorage.setItem('userLocalStorageConfig', JSON.stringify(newState))
    return newState
  }
  return state
}
