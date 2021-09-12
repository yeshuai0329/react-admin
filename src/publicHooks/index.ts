import React from "react"

/**
 * 设置网页标题
 * @param title 网页标题
 */
export const useSetDocumentTitle = (title: string) => {
  React.useEffect(() => {
    document.title = title
  }, [])
}

/**
 * 设置 Antd 国际化方案切换的方法
 */

export const useAntdLocale = (locale: string) => {
  const [antdLocale, setAntdLocale] = React.useState<any>()
  // 查找本地语言配置
  const currentLocale = localStorage.getItem('currentLocale') || locale

  React.useEffect(() => {
    currentAntdLocale(currentLocale).then((res) => {
      setAntdLocale(res)
    })
  }, [])

  const currentAntdLocale = async (currentLocale: string) => {
    switch (currentLocale) {
      case 'zh_CN':
        return (await import('antd/lib/locale/zh_CN')).default
      case 'en_US':
        return (await import('antd/lib/locale/en_US')).default
      default:
        return (await import('antd/lib/locale/zh_CN')).default
    }
  }

  return antdLocale
}
