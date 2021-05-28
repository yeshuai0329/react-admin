import React, { ReactElement, useEffect, useState } from 'react'
import style from './AuthButton.module.less'
import classNames from 'classnames/bind'
import { Button } from 'antd'

const cx = classNames.bind(style)

export type AuthButtonType = 'HOME_ADD'
 | 'HOME_EDIT'
 | 'HOME_DEL'
 | 'ROLES_ADD'
 | 'ROLES_EDIT'
 | 'ROLES_DEL'
 | 'ROLES_EXPORT'

export type CustomType = 'default' | 'success' | 'danger' | 'warning' | 'info'
type ButtonProps = React.ComponentProps<typeof Button>

interface IButtonProps extends ButtonProps {
  auth?: AuthButtonType,
  customtype?: CustomType
}

const ButtonAuth = (props: IButtonProps): ReactElement | null => {
  const { auth, customtype, ...remainProps } = props
  const [isShow, setIsShow] = useState(false)
  useEffect(() => {
    const userAuthButtonType: string[] = JSON.parse(localStorage.getItem('authButton') || '[]')
    if (auth) {
      const bool = userAuthButtonType.includes(auth)
      setIsShow(bool)
    } else {
      setIsShow(true)
    }
  }, [])
  return (
    isShow
      ? <Button className={cx(`custom-${customtype}`)} {...remainProps}>{props.children}</Button>
      : null
  )
}

export default ButtonAuth
