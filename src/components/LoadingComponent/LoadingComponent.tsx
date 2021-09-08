import React from 'react'
import { Spin } from 'antd'

const LoadingComponent = () => {
  return (
    <Spin
      size='large'
      style={{
        width: '100%',
        height: '600px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    />
  )
}

export default LoadingComponent
