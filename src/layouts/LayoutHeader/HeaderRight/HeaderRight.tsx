import React, { ReactElement } from 'react'
import Personal from '../components/Personal/Personal'
import style from 'layouts/LayoutHeader/LayoutHeader.module.less'
import classNames from 'classnames/bind'
import { ToggleLang } from 'components/LangMessage/LangMessage'

const cx = classNames.bind(style)

const HeaderRight: React.FC = (): ReactElement => {
  return (
    <div className={cx('layoutHeader-headerRight')}>
      <Personal />
      <ToggleLang />
    </div>
  )
}

export default HeaderRight
