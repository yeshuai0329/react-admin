import React, { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import style from 'layouts/LayoutHeader/LayoutHeader.module.less'
import classNames from 'classnames/bind'
import HeaderRight from './HeaderRight/HeaderRight'
import BreadCrumbPro from 'components/BreadCrumbPro/BreadCrumbPro'
import { SET_COLLAPSED } from 'store/actionTypes/configActionType'
import { RootState } from 'typings/store'
import { Space } from 'antd'

const cx = classNames.bind(style)

const LayoutHeader = (): ReactElement => {
  const reduxConfig = useSelector((state: RootState) => state.config)
  const dispatch = useDispatch()

  const reduxSetConfig = (type: string, payload: string | boolean) => {
    dispatch({ type, payload })
  }

  return (
    <div className={cx('layoutHeader')}>
      <Space className={cx('layoutHeader-left')} size='middle'>
        {/* 展开收缩侧边栏菜单按钮 */}
        {
          reduxConfig.siderMenuIsHas && reduxConfig.autoHoldSiderIsShow
            ? <div onClick={() => { reduxSetConfig(SET_COLLAPSED, !reduxConfig.siderMenuIsCollapsed) }}>
              {
                reduxConfig.siderMenuIsCollapsed
                  ? <MenuUnfoldOutlined className={cx('layoutHeader-left__trigger')}/>
                  : <MenuFoldOutlined className={cx('layoutHeader-left__trigger')}/>
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
      </Space>
      <HeaderRight />
    </div>
  )
}

export default LayoutHeader
