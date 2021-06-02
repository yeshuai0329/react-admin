import React, { Dispatch, ReactElement } from 'react'
import { connect } from 'react-redux'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import style from 'layouts/LayoutHeader/LayoutHeader.module.less'
import classNames from 'classnames/bind'
import { TConfig } from 'typings/config/config'
import HeaderRight from './HeaderRight/HeaderRight'
import BreadCrumbPro from 'components/BreadCrumbPro/BreadCrumbPro'
import { SET_COLLAPSED } from 'store/actionTypes/configActionType'

const cx = classNames.bind(style)

interface ILayoutHeaderProps {
  reduxConfig: TConfig,
  reduxSetConfig: (type: string, payload: string | boolean) => void
}

const LayoutHeader = (props: ILayoutHeaderProps): ReactElement => {
  const { reduxConfig, reduxSetConfig } = props

  return (
    <div className={cx('layoutHeader')}>
      {/* 展开收缩侧边栏菜单按钮 */}
      {
        reduxConfig.siderMenuIsHas
          ? <div onClick={() => { reduxSetConfig(SET_COLLAPSED, !reduxConfig.siderMenuIsCollapsed) }}>
            {
              reduxConfig.siderMenuIsCollapsed
                ? <MenuUnfoldOutlined className={cx('layoutHeader-trigger')}/>
                : <MenuFoldOutlined className={cx('layoutHeader-trigger')}/>
            }
            </div>
          : null
      }

      {/* 控制面包屑是否存在 */}
      {
        reduxConfig.breadCrumbIsHas
          ? <BreadCrumbPro
              className={cx('layoutHeader-breadcrumbPro')}
            />
          : null
      }
      <HeaderRight />
    </div>
  )
}

const mapStateToProps = ({ config }: {config: TConfig}) => {
  return {
    reduxConfig: config
  }
}

const mapDispatchToProps = (dispatch: Dispatch<{type: string, payload: string | boolean}>) => {
  return {
    reduxSetConfig: (type: string, payload: string | boolean) => {
      dispatch({
        type,
        payload
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutHeader)
