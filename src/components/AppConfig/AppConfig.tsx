import React, { ReactElement, useState } from 'react'
import { Button, Drawer } from 'antd'
import style from './AppConfig.module.less'
import classNames from 'classnames/bind'

const cx = classNames.bind(style)

const AppConfig: React.FC = (): ReactElement => {
  const [isShow, setIsShow] = useState(false)
  return (
    <Drawer
      title="Basic Drawer"
      className={cx('config')}
      placement="right"
      closable={true}
      visible={isShow}
      // onClose={onClose}
      width={300}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <Button className={cx('config-configButton')} onClick={() => setIsShow(!isShow)}>设置</Button>
    </Drawer>
  )
}

export default AppConfig
