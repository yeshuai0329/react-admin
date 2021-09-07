import React, { ReactElement } from 'react'
import { Logo } from 'assets/images'
import { connect, DispatchProp } from 'react-redux'
import Texty from 'rc-texty'
import style from './CustomLogo.module.less'
import classNames from 'classnames/bind'
import { TConfig } from 'typings/config'

const cx = classNames.bind(style)

interface IProps {
  reduxConfig: TConfig
}

const CustomLogo: React.FC<IProps> = (props): ReactElement => {
  const { reduxConfig } = props

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

const mapStateToProps = ({ config }: {config: TConfig}) => {
  return {
    reduxConfig: config
  }
}

const mapDispatchToProps = (dispatch: DispatchProp) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomLogo)
