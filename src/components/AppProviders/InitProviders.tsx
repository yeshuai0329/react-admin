import React, { useState, useEffect, Fragment } from 'react'
import LoadingComponent from 'components/LoadingComponent/LoadingComponent'

const InitProviders = (props: any) => {
  const [loading, setLoading] = useState<any>(true)
  // 避免页面闪烁
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 300)
    return () => {
      clearTimeout(timer)
    }
  }, [])
  return (
    <Fragment>
      {loading
        ? (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <LoadingComponent />
        </div>
          )
        : null}
      <div
        style={{
          width: '100%',
          height: '100%',
          display: loading && 'none'
        }}
      >
        {props.children}
      </div>
    </Fragment>
  )
}

export default InitProviders
