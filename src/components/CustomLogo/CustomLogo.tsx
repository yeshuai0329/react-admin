import React, { ReactElement } from 'react'
import { Logo } from 'assets/images'
import { useSelector } from 'react-redux'
import Texty from 'rc-texty'
import style from './CustomLogo.module.less'
import classNames from 'classnames/bind'
import { RootState } from 'typings/store'

const cx = classNames.bind(style)

const CustomLogo: React.FC = (): ReactElement => {
  const reduxConfig = useSelector((state: RootState) => state.config)

  return (
    <div className={cx('menus-logo')}>
        <img
          src={Logo}
          className={cx({
            'menus-logo__imgtrue': reduxConfig.siderMenuIsCollapsed,
            'menus-logo__imgfalse': !reduxConfig.siderMenuIsCollapsed
          })}
        />
        <span className={cx('menus-logo__spandark', { 'menus-logo__spanlight': reduxConfig.siderMenuTheme === 'light' })}>
          {
            reduxConfig.siderMenuIsCollapsed
              ? null
              : <Texty
                  type='left'
                  mode='smooth'
                >
                  R-Boot
                </Texty>
          }
        </span>
    </div>
  )
}

export default CustomLogo
