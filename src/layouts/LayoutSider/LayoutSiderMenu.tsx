import React, { ReactElement } from 'react'
import CustomMenu from 'components/CustomMenu/CustomMenu'
import { connect, DispatchProp } from 'react-redux'
import { TConfig } from 'typings/config/config'

interface IProps {
  reduxConfig: TConfig
}

const LayoutSiderMenu: React.FC<IProps> = (props): ReactElement => {
  const { reduxConfig } = props
  const list = JSON.parse(localStorage.getItem('authMenu') || '[]')

  return (
    <CustomMenu
      MenuIshHasLogo={reduxConfig.siderMenuIshHasLogo}
      menuList={list}
      mode='inline'
      theme={reduxConfig.siderMenuTheme}
      style={{
        height: '100%'
      }}
    />
  )
}
const mapStateToProps = ({ config }: {config: TConfig}) => {
  return {
    reduxConfig: config
  }
}

const mapDispatchToProps = (dispatch: DispatchProp) => {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LayoutSiderMenu)
