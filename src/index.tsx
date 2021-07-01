import AppProviders from 'components/AppProviders/AppProviders'
import React from 'react'
import ReactDOM from 'react-dom'
import 'utils/styles/reset.less'
import 'utils/styles/globalAntd.module.less'
import App from './pages/App'
import EntryScreen from 'pages/EntryScreen/EntryScreen'
import { Redirect, Route, Switch } from 'react-router-dom'
import Cookies from 'js-cookie'

ReactDOM.render(
  <AppProviders>
    <Switch>
      <Route path='/login' component={EntryScreen}/>
      <Route path='/' render={() => Cookies.get('R-Boot-token') ? <App /> : <Redirect to='/login'/>}/>
    </Switch>
  </AppProviders>,
  document.getElementById('root')
)
