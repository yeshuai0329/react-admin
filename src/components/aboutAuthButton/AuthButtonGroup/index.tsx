import React from 'react'
import { Space } from 'antd'
import AuthButton, { IButtonProps } from 'components/aboutAuthButton/AuthButton/AuthButton'

export interface AuthAction extends IButtonProps {
  name: string,
  onClick: () => void
}

export interface IAuthButtonGroupProps {
  authActions?: AuthAction[]
}
const AuthButtonGroup = (props: IAuthButtonGroupProps) => {
  return (
    <Space>
      {
        props.authActions && props.authActions.map((item: any, index: number) => {
          return (
            <AuthButton
              key={index}
              {...item}
            >
              {item.name}
            </AuthButton>
          )
        })
      }
    </Space>
  )
}

export default AuthButtonGroup
