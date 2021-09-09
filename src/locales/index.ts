import config from "config/config"

// @ts-ignore
const ctx = require.context('./', false, /(?<!index)\.[tj]s/)
// 查找本地语言配置
const currentLocale = localStorage.getItem('currentLocale') || config.locale
// 匹配语言
const filterKey = ctx.keys().find((item: string) => item.indexOf(currentLocale) !== -1)

const lang = ctx(filterKey).default

export const init = (id: string) => {
  return lang[id] || id
}
