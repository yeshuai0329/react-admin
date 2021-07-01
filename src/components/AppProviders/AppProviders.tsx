import React, { ReactElement } from 'react'
import zhCN from 'antd/lib/locale/zh_CN'
import { ConfigProvider } from 'antd'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import InitialProvider from 'components/AppProviders/InitialProvider'
import store from 'store/store'

const AppProviders: React.FC = (props): ReactElement => {
  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <InitialProvider>
          <BrowserRouter>
            {props.children}
          </BrowserRouter>
        </InitialProvider>
      </ConfigProvider>
    </Provider>

  )
}

export default AppProviders
