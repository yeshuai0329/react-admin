import React, { ReactElement } from 'react'
import { Col, Row } from 'antd'
import ConsumptionRanking from './components/ConsumptionRanking'
import DistributionMap from './components/DistributionMap'
import TrendChart from './components/TrendChart'

const Analysis: React.FC = (): ReactElement => {
  return (
    <Row gutter={[24, 24]} style={{ marginBottom: 16 }}>
      {/* 趋势图 */}
      <Col xs={24} sm={24} lg={24} xl={10}>
        <TrendChart />
      </Col>

      {/* 分布图 */}
      <Col xs={24} sm={12} lg={12} xl={8}>
        <DistributionMap />
      </Col>

      {/* 消费排行 */}
      <Col xs={24} sm={12} lg={12} xl={6}>
        <ConsumptionRanking />
      </Col>

      {/* 地区 */}
      <Col span={24}>
        <ConsumptionRanking />
      </Col>
    </Row>
  )
}

export default Analysis
