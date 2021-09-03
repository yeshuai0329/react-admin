import React, { ReactElement } from 'react'
import style from './AuthButton.module.less'
import classNames from 'classnames/bind'
import { Button, ButtonProps } from 'antd'

const cx = classNames.bind(style)

export type AuthButtonType = 'HOME_ADD'
 | 'HOME_EDIT'
 | 'HOME_DEL'
 | 'ROLES_ADD'
 | 'ROLES_EDIT'
 | 'ROLES_DEL'
 | 'ROLES_EXPORT'
 | 'ACCOUNT_ADD'
 | 'ACCOUNT_EDIT'
 | 'ACCOUNT_DEL'
 | 'ACCOUNT_EXPORT'

export type CustomType = 'default' | 'success' | 'danger' | 'warning' | 'info'

export interface IButtonProps extends ButtonProps {
  auth: AuthButtonType,
  customtype?: CustomType
}

const AuthButton = (props: IButtonProps): ReactElement | null => {
  const { auth, customtype, ...remainProps } = props
  const userAuthButtonType: {id:string, authName: string}[] = JSON.parse(localStorage.getItem('authButton') || '[]')

  const bool = userAuthButtonType.filter(item => item.authName === auth)
  return (
    bool.length > 0
      ? <Button className={cx(`custom-${customtype}`)} {...remainProps}>{props.children}</Button>
      : null
  )
}

export default AuthButton
