import React, { ReactElement } from 'react'
import style from './Monitor.module.less'
import classNames from 'classnames/bind'

const cx = classNames.bind(style)

const Monitor: React.FC = (): ReactElement => {
  return <div className={cx('Monitor')}>1000</div>
}

export default Monitor
