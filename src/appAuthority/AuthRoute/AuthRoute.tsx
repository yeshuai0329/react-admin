import React, { Fragment, ReactElement } from 'react'
import { Route } from 'react-router-dom'
import EntryScreen from 'pages/EntryScreen/EntryScreen'
import cookie from 'js-cookie'

type RouteProos = React.ComponentProps<typeof Route>

const AuthRoute: React.FC<RouteProos> = (props): ReactElement => {
  return (
    <Fragment>
      {
        cookie.get('R-Boot-token')
          ? <Route {...props} />
          : <EntryScreen/>
      }
    </Fragment>
  )
}

export default AuthRoute
