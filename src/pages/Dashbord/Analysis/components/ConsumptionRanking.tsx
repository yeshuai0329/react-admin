import React from 'react'
import { Card, Space } from 'antd'
import { OrderedListOutlined } from '@ant-design/icons'

const ConsumptionRanking = () => {
  return (
    <Card
      title={<Space><OrderedListOutlined />消费排行</Space>}
      hoverable
    >

    </Card>
  )
}

export default ConsumptionRanking
