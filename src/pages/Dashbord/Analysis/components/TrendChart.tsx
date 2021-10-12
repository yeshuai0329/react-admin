import React, { useEffect } from 'react'
import { Card, Space } from 'antd'
import { LineChartOutlined } from '@ant-design/icons'
import * as echarts from 'echarts'
type EChartsOption = echarts.EChartsOption

const TrendChart = () => {
  const trendChartRef = React.useRef<any>()
  let myChart: any

  const addEventResize = () => {
    myChart.resize()
  }

  useEffect(() => {
    setTimeout(() => {
      initEchart()
    }, 1000)
    return () => {
      window.removeEventListener('resize', addEventResize)
    }
  }, [])

  const initEchart = () => {
    myChart = echarts.init(trendChartRef.current as HTMLElement)
    const option: EChartsOption = {
      title: {
        text: 'R-Boot 中后台访问量'
      },
      tooltip: {
        // 触发方式
        trigger: 'axis'
      },
      legend: {
        data: ['访问量']
      },
      xAxis: {
        name: '月份',
        type: 'category',
        data: [
          '一月',
          '二月',
          '三月',
          '四月',
          '五月',
          '六月',
          '七月',
          '八月',
          '九月',
          '十月',
          '十一月',
          '十二月'
        ]
      },
      yAxis: {
        name: '次',
        type: 'value'
      },
      series: [
        {
          name: '访问量',
          data: [305, 230, 402, 789, 512, 777, 988, 578, 898, 1290, 1510, 1792],
          type: 'line'
        }
      ]
    }
    // 绘制图表
    option && myChart.setOption(option)
    window.addEventListener('resize', addEventResize)
  }

  return (
    <Card
      title={
        <Space>
          <LineChartOutlined />
          趋势
        </Space>
      }
      hoverable
    >
      <div ref={trendChartRef} style={{ width: '100%', height: '300px' }} />
    </Card>
  )
}

export default TrendChart
