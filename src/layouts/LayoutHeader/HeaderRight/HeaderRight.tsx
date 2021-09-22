import React, { ReactElement } from 'react'
import Personal from '../components/Personal/Personal'
import style from 'layouts/LayoutHeader/HeaderRight/HeaderRight.module.less'
import classNames from 'classnames/bind'
import { ToggleLang } from 'components/ToggleLang/ToggleLang'
import { Space } from 'antd'

const cx = classNames.bind(style)

const HeaderRight: React.FC = (): ReactElement => {
  return (
    <Space className={cx('headerRight')} size='middle'>
      <Personal />
      <ToggleLang />
    </Space>
  )
}

export default HeaderRight
