import React, { ReactElement } from 'react'
import CustomMenu from 'components/CustomMenu/CustomMenu'

const LayoutTopMenu: React.FC = (): ReactElement => {
  const list = JSON.parse(localStorage.getItem('CustomMenu') || '[]')
  return (
    <CustomMenu
      mode='horizontal'
      theme='light'
      menuList={list}
      style={{
        float: 'left'
      }}
    />
  )
}

export default LayoutTopMenu
