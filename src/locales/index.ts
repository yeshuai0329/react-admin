import config from 'config/config'

// 查找本地语言配置
const currentLocale = localStorage.getItem('currentLocale') || config.locale

// @ts-ignore
const ctx = require.context('./', true, /(?<!index)\.[tj]s/)
// 过滤文件
const ctxFilterKeys = ctx.keys().filter((item: string) => item.indexOf(currentLocale || 'zh_CN') !== -1)
// 语言
const lang = ctxFilterKeys.reduce((total: any, path: string) => {
  const requireContext = ctx(path).default
  return { ...total, ...requireContext }
}, {})
// 调用语言的方法
export const init = (id: string) => {
  return lang[id] || id
}
