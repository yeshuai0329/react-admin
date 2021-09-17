import React, { ReactElement } from "react"
import { Row, Col, Card } from "antd"
import { useDispatch, useSelector } from "react-redux"
import SiderMenuConfig from "./components/SiderMenuConfig/SiderMenuConfig"
import TopMenuConfig from "./components/TopMenuConfig/TopMenuConfig"
import { RootState } from "typings/store"

const SystemConfig: React.FC = (): ReactElement => {
  const reduxConfig = useSelector((state: RootState) => state.config)
  const dispatch = useDispatch()

  const reduxSetConfig = (type: string, payload: string | boolean) => {
    dispatch({
      type,
      payload
    })
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Card title='侧边菜单设置' style={{ minHeight: 400 }}>
          <SiderMenuConfig reduxConfig={reduxConfig} reduxSetConfig={reduxSetConfig} />
        </Card>
      </Col>
      <Col span={12}>
        <Card title='Config设置' style={{ minHeight: 400 }}>
          <TopMenuConfig reduxConfig={reduxConfig} reduxSetConfig={reduxSetConfig} />
        </Card>
      </Col>
    </Row>
  )
}

export default SystemConfig
