import React, { ReactElement } from 'react'
import { Result, Button } from 'antd'
import { NavLink } from 'react-router-dom'
const NotFind: React.FC = (): ReactElement => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary">
          <NavLink to='/home'>Back Home</NavLink>
        </Button>
      }
    />
  )
}

export default NotFind
