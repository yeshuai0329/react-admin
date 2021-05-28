import React, { ReactElement } from 'react'
import { Layout } from 'antd'
import LayoutHeader from 'layouts/LayoutHeader/LayoutHeader'
import LayoutContent from 'layouts/LayoutContent/LayoutContent'
import LayoutSiderMenu from 'layouts/LayoutSider/LayoutSiderMenu'
import { connect, DispatchProp } from 'react-redux'
import style from './App.module.less'
import classNames from 'classnames/bind'
import { TConfig } from 'typings/config/config'

const cx = classNames.bind(style)
const { Header, Sider, Content } = Layout

interface IAppProps {
  reduxConfig: TConfig
}

const App = (props: IAppProps): ReactElement => {
  const { reduxConfig } = props
  return (
    <Layout className={cx('layout')}>
      {/* Sider */}
      {
        reduxConfig.siderMenuIsHas
          ? <Sider
              trigger={null}
              breakpoint='lg'
              collapsible
              collapsedWidth={80}
              collapsed={reduxConfig.siderMenuIsCollapsed}
              style={{
                background: '#f0f2f5'
              }}
            >
              <LayoutSiderMenu/>
            </Sider>
          : null
      }
      {/* 右侧 */}
      <Layout className={cx('layout-right')}>

        <Header className={cx('layout-right__header')}>
          <LayoutHeader/>
        </Header>

        <Content className={cx('layout-right__content')} >
          <LayoutContent />
        </Content>

      </Layout>
    </Layout>
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

export default connect(mapStateToProps, mapDispatchToProps)(App)
