import React, { Component } from 'react'

/**
 * @description: 封装react 页面级组件按需异步加载函数
 * @param {any} importComponent
 * @return {*}
 */
function asyncComponent(importComponent: any) {
  class AsyncComponent extends Component<any, any> {
    constructor(props: any) {
      super(props)

      this.state = {
        component: null
      }
    }

    async componentDidMount() {
      const { default: component } = await importComponent()
      this.setState({
        component: component
      })
    }

    render() {
      const C = this.state.component
      return C ? <C {...this.props}/> : null
    }
  }

  return AsyncComponent
}

export default asyncComponent
