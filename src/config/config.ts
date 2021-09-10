import { TConfig } from 'typings/config'

const config: TConfig = {
  // 默认国际化语言配置
  locale: 'en_US',
  // |||||||||||||||||||||||||||
  // |||||| 侧边栏菜单相关||||||||
  // |||||||||||||||||||||||||||
  // 是否有侧边菜单
  siderMenuIsHas: true,
  // 改变宽度的时候,是否自动显示/隐藏侧边菜单
  autoHoldSiderIsShow: true,
  // 侧边菜单的颜色
  siderMenuTheme: 'dark',
  // 侧边菜单的是否收起
  siderMenuIsCollapsed: false,
  // 侧边菜单是否有LOGO
  siderMenuIshHasLogo: true,
  // |||||||||||||||||||||||||||
  // ||||||| 顶部菜单相关 ||||||||
  // |||||||||||||||||||||||||||
  // 是否有顶部菜单
  topMenuIsHas: false,
  // 顶部菜单颜色
  topMenuTheme: 'light',
  // 顶部菜单是否有logo
  topMenuIsHasLogo: false,
  // |||||||||||||||||||||||||||
  // ||||||| 顶部面包屑相关 ||||||
  // |||||||||||||||||||||||||||
  // 是否有顶部面包屑
  breadCrumbIsHas: true
}

export default config
