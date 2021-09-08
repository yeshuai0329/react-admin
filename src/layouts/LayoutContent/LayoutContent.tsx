import React, { ReactElement, useEffect, useState } from 'react'
import style from './LayoutContent.module.less'
import classNames from 'classnames/bind'
import { Switch, Redirect } from 'react-router-dom'
import AuthRoute from 'components/AuthRoute/AuthRoute'
import { userDynamicRouters } from 'routers/userDynamicRouters'
import Copyright from 'components/Copyright/Copyright'
import NotFind from 'pages/NotFind/NotFind'
import LoadingComponent from 'components/LoadingComponent/LoadingComponent'

const cx = classNames.bind(style)

const LayoutContent: React.FC = (): ReactElement => {
  const [routerList, setRouterList] = useState([])

  useEffect(() => {
    const routers = JSON.parse(localStorage.getItem('authMenu') || '[]')
    setRouterList(userDynamicRouters(routers))
  }, [])

  return (
    <div className={cx('LayoutContent')}>
      <div className={cx('LayoutContent-route')}>
        <React.Suspense fallback={<LoadingComponent/>}>
          <Switch>
            {
              routerList && routerList.map((router: any) => {
                return (
                  <AuthRoute key={router.path} {...router} exact/>
                )
              })
            }
            <Redirect from={'/'} to={'/home'} exact/>
            <AuthRoute path={'*'} component={NotFind} />
          </Switch>
        </React.Suspense>
      </div>
      <div className={cx('LayoutContent-Copyright')}>
        <Copyright />
      </div>
    </div>
  )
}

export default LayoutContent
