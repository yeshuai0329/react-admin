import React, { Dispatch, ReactElement } from 'react'

import { Row, Col, Card } from 'antd'
import { connect } from 'react-redux'
import { TConfig } from 'typings/config'
import SiderMenuConfig from './components/SiderMenuConfig/SiderMenuConfig'
import TopMenuConfig from './components/TopMenuConfig/TopMenuConfig'

interface IProps {
  reduxConfig: TConfig,
  reduxSetConfig: (type: string, payload: string | boolean) => void
}

const SystemConfig: React.FC<IProps> = (props): ReactElement => {
  const { reduxConfig, reduxSetConfig } = props
  return (
    <Row
      gutter={[16, 16]}
    >
      <Col span={12}>
        <Card title='侧边菜单设置' style={{ minHeight: 400 }}>
          <SiderMenuConfig
            reduxConfig={reduxConfig}
            reduxSetConfig={reduxSetConfig}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card title='Config设置'style={{ minHeight: 400 }}>
          <TopMenuConfig
            reduxConfig={reduxConfig}
            reduxSetConfig={reduxSetConfig}
          />
        </Card>
      </Col>
    </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(SystemConfig)
