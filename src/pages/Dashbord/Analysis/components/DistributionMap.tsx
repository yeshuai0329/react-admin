import React, { useEffect } from 'react'
import { Card, Space } from 'antd'
import { PieChartOutlined } from '@ant-design/icons'
import * as echarts from 'echarts'

const DistributionMap = () => {
  const distributionMapRef = React.useRef<any>()
  let myChart: any

  const addEventResize = () => {
    myChart.resize()
  }

  useEffect(() => {
    setTimeout(() => {
      initEchart()
    }, 300)
    return () => {
      window.removeEventListener('resize', addEventResize)
    }
  }, [])

  const initEchart = () => {
    myChart = echarts.init(distributionMapRef.current as HTMLElement)
    const option = {
      tooltip: {
        // 触发方式
        trigger: 'item'
      },
      series: [
        {
          type: 'pie',
          data: [
            {
              value: 1410,
              name: '直接访问'
            },
            {
              value: 1234,
              name: '搜索引擎'
            },
            {
              value: 1548,
              name: '联盟广告'
            },
            {
              value: 334,
              name: '邮件营销'
            },
            {
              value: 234,
              name: '视频广告'
            }
          ]
        }
      ]
    }
    // 绘制图表
    myChart.setOption(option)

    window.addEventListener('resize', addEventResize)
  }
  return (
    <Card
      title={
        <Space>
          <PieChartOutlined />分布
        </Space>
      }
      hoverable
    >
      <div ref={distributionMapRef} style={{ width: '100%', height: '300px' }} />
    </Card>
  )
}

export default DistributionMap
