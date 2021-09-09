import React, { useEffect, useState } from 'react'
import { GlobalOutlined } from '@ant-design/icons'
import { Dropdown, Menu, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { LangMap, ILangMap } from './params'
import { SET_LANG } from 'store/actionTypes/configActionType'
import { RootState } from 'typings/store'
import { init } from 'locales'

/**
 * @description: ToggleLang 组件
 * @description: redux 语言国际化中使用ToggleLang组件,切换语言
 */
export const ToggleLang = (props: any) => {
  const reduxConfig = useSelector((state: RootState) => state.config)
  // 语言切换组件选中的key
  const [selectedKeysArray, setSelectedKeysArray] = useState([reduxConfig.locale])
  const dispatch = useDispatch()

  const reduxToggleLangMethod = (type: string) => {
    const currentLocale = localStorage.getItem('currentLocale')
    if (currentLocale === type) {
      return
    }
    dispatch({
      type: SET_LANG,
      payload: type
    })
    window.location.reload()
  }

  useEffect(() => {
    setSelectedKeysArray([reduxConfig.locale])
  }, [reduxConfig])

  const menu = (
    <Menu
      selectedKeys={selectedKeysArray}
    >
      {
        LangMap && LangMap.map((item:ILangMap) => {
          return (
            <Menu.Item
              key={item.value}
              onClick={() => { reduxToggleLangMethod(item.value) }}
              style={{
                minWidth: 140
              }}
            >
              <Space>
                {`${item.icon}`}
                {init(item.nameId)}
              </Space>
            </Menu.Item>
          )
        })
      }
    </Menu>
  )

  return (
    <Dropdown
      overlay={menu}
      placement="bottomRight"
    >
      <GlobalOutlined
        style={{
          color: '#000'
        }}
        className='ToggleLang'
      />
    </Dropdown>
  )
}
