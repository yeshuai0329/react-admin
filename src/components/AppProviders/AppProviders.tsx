import React, { ReactElement } from 'react'
import { ConfigProvider } from 'antd'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from 'store/store'
import { useAntdLocale, useSetDocumentTitle } from 'publicHooks'
import { init } from 'locales'
import config from "config/config"
import InitProviders from './InitProviders'

// 数据mock
if (process.env.REACT_APP_ENV === 'mock') {
  const { mockXHR } = require('../../../Mock')
  mockXHR()
}

const AppProviders: React.FC = (props): ReactElement => {
  // 设置title
  useSetDocumentTitle(init('page.common.docTitle'))
  // 设置antd 语言
  const antdLocale = useAntdLocale(config.locale)

  return (
    <Provider store={store}>
      <ConfigProvider locale={antdLocale}>
        <BrowserRouter>
          <InitProviders>
            {props.children}
          </InitProviders>
        </BrowserRouter>
      </ConfigProvider>
    </Provider>

  )
}

export default AppProviders
