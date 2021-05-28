import React, { Dispatch, ReactElement } from 'react'

import { Row, Col, Card } from 'antd'
import { connect } from 'react-redux'
import { TConfig } from 'typings/config/config'
import SiderMenuConfig from './components/SiderMenuConfig/SiderMenuConfig'

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
      <Col span={24}>
        <Card title='视觉风格' bordered={false}>

        </Card>
      </Col>
      <Col span={12}>
        <Card title='侧边菜单设置'>
          <SiderMenuConfig
            reduxConfig={reduxConfig}
            reduxSetConfig={reduxSetConfig}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card title='顶部菜单设置'>
          <SiderMenuConfig
            reduxConfig={reduxConfig}
            reduxSetConfig={reduxSetConfig}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card title='Header设置'>

        </Card>
      </Col>
      <Col span={12}>
        <Card title='Config设置'>

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
