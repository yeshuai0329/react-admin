import React, { ReactElement } from 'react'
import style from './Copyright.module.less'
import classNames from 'classnames/bind'
import { GithubOutlined } from '@ant-design/icons'
import { Space } from 'antd'

const cx = classNames.bind(style)

const Copyright: React.FC = (): ReactElement => {
  return (
    <div className={cx('Copyright')}>
      <div className={cx('Copyright-one', 'footer')}>
        <Space size='large'>
          <span className={cx('footer')}>开发文档</span>
          <GithubOutlined />
          <span className={cx('footer')}>R-Boot</span>
        </Space>
      </div>
      <div className={cx('Copyright-two', 'footer')}>
        Copyright © 2021 - R-Boot 版权所有
      </div>
    </div>
  )
}

export default Copyright
