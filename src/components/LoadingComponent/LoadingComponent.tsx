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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      tip={'Loading...'}
    />
  )
}

export default LoadingComponent
