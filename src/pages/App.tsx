import React, { ReactElement, useEffect, Fragment } from 'react'
import { Grid, Layout } from 'antd'
import LayoutHeader from 'layouts/LayoutHeader/LayoutHeader'
import LayoutContent from 'layouts/LayoutContent/LayoutContent'
import LayoutSiderMenu from 'layouts/LayoutSider/LayoutSiderMenu'
import { useDispatch, useSelector } from 'react-redux'
import style from './App.module.less'
import classNames from 'classnames/bind'
import { RootState } from 'typings/store'
import { SET_COLLAPSED, SET_AUTO_SHOW_SIDER } from 'store/actionTypes/configActionType'

const cx = classNames.bind(style)
const { useBreakpoint } = Grid
const { Header, Sider, Content } = Layout

const App = (): ReactElement => {
  // 避免页面闪烁
  const reduxConfig = useSelector((state: RootState) => state.config)
  const dispatch = useDispatch()
  const screens = useBreakpoint()

  const reduxSetSiderMenuIsCollapsed = (type: string, payload: string | boolean) => {
    dispatch({ type, payload })
  }

  const reduxSetAutoShowSider = (type: string, payload: string | boolean) => {
    dispatch({ type, payload })
  }

  useEffect(() => {
    reduxSetAutoShowSider(SET_AUTO_SHOW_SIDER, screens.sm as boolean)
  }, [screens])

  return (
    <Layout className={cx('layout')} >
      {/* Sider */}
      {
        reduxConfig.siderMenuIsHas
          ? <Fragment>
              {
                reduxConfig.autoHoldSiderIsShow
                  ? <Sider
                      trigger={null}
                      breakpoint='xl'
                      collapsible
                      collapsedWidth={60}
                      collapsed={reduxConfig.siderMenuIsCollapsed}
                      onCollapse={() => {
                        reduxSetSiderMenuIsCollapsed(SET_COLLAPSED, !reduxConfig.siderMenuIsCollapsed)
                      }}
                    >
                      <LayoutSiderMenu/>
                    </Sider>
                  : null
              }
            </Fragment>
          : null
      }
      {/* 右侧 */}
      <Layout className={cx('layout-right')}>

        <Header className={cx('layout-right__header')}>
          <LayoutHeader/>
        </Header>

        <Content className={cx('layout-right__content')} id='scrollTop'>
          <LayoutContent />
        </Content>

      </Layout>
    </Layout>
  )
}

export default App
