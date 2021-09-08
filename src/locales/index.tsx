import config from "config/config"

const localesMap: {[key: string]: string} = {
  zh_CN: './zh_CN',
  en_US: './en_US'
}

const currentLocale = localStorage.getItem('currentLocale') || config.locale

const lang = require(`${localesMap[currentLocale]}`).default
export const init = (id: string) => {
  console.log(`lang`, lang)
  return lang[id] || id
}
