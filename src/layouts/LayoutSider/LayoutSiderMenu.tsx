import React, { ReactElement } from 'react'
import CustomMenu from 'components/CustomMenu/CustomMenu'
import { useSelector } from 'react-redux'
import { RootState } from 'typings/store'

const LayoutSiderMenu: React.FC = (): ReactElement => {
  const reduxConfig = useSelector((state: RootState) => state.config)
  const authMenu = JSON.parse(localStorage.getItem('authMenu') || '[]')

  return (
    <CustomMenu
      MenuIshHasLogo={reduxConfig.siderMenuIshHasLogo}
      menuList={authMenu}
      mode='inline'
      theme={reduxConfig.siderMenuTheme}
      style={{
        height: '100%'
      }}
    />
  )
}

export default LayoutSiderMenu
