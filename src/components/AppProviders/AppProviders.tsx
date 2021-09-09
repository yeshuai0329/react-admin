import React, { ReactElement } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from 'store/store'
import { useSetDocumentTitle } from 'publicHooks'
import { init } from 'locales'

// 数据mock
if (process.env.REACT_APP_ENV === 'mock') {
  const { mockXHR } = require('../../../Mock')
  mockXHR()
}

const AppProviders: React.FC = (props): ReactElement => {
  useSetDocumentTitle(init('page.common.docTitle'))
  return (
    <Provider store={store}>
      <BrowserRouter>
        {props.children}
      </BrowserRouter>
    </Provider>

  )
}

export default AppProviders
