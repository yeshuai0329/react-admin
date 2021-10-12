import { obj } from "typings/typings"

type TLocale = 'zh_CN' | 'en_US'
type TTheme = 'dark' | 'light' | undefined

export interface TConfig extends obj{
  // 默认国际化语言配置
  locale: TLocale,
  // 是否有侧边菜单
  siderMenuIsHas?: boolean,
  // 改变宽度的时候,是否自动显示/隐藏侧边菜单
  autoHoldSiderIsShow?: boolean,
  // 侧边菜单的颜色
  siderMenuTheme?: TTheme,
  // 侧边菜单的是否收起
  siderMenuIsCollapsed?: boolean,
  // 侧边菜单是否有LOGO
  siderMenuIshHasLogo: boolean,
  // 是否有顶部菜单
  topMenuIsHas?: boolean,
  // 顶部菜单颜色
  topMenuTheme: TTheme,
  // 顶部菜单是否有logo
  topMenuIsHasLogo: boolean,
  // 是否有顶部面包屑
  breadCrumbIsHas?: boolean,
  // 是否有备案号
  isHasCopyright: boolean
}