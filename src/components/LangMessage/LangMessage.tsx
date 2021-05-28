import React, { Fragment, useEffect, useState } from 'react'
import { GlobalOutlined } from '@ant-design/icons'
import { Dropdown, Menu, Space } from 'antd'
import { connect } from 'react-redux'
import { IProps, LangMap, ILangMap } from './params'
import { TConfig } from 'typings/config/config'
import { Dispatch } from 'redux'
import { SET_LANG } from 'store/actionTypes/configActionType'

const mapStateToProps = ({ lang, config }: {lang:any, config: TConfig}) => {
  return {
    reduxConfig: config,
    reduxLang: lang
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    reduxToggleLangMethod: async (type: string) => {
      if (type === 'zh_CN') {
        const lang = (await import('locales/zh_CN')).default
        dispatch({
          type: type,
          payload: lang
        })
      }
      if (type === 'en_US') {
        const lang = (await import('locales/en_US')).default
        dispatch({
          type: type,
          payload: lang
        })
      }
      dispatch({
        type: SET_LANG,
        payload: type
      })
    }
  }
}

/**
 * @description: LangMessage 组件
 * @description: redux 语言国际化中使用redux的变量的组件,达到全局语言响应式切换
 */
export const LangMessage = connect(mapStateToProps, null)((props: IProps) => {
  const { id, defaultText, reduxLang } = props
  const [message, setMessage] = useState(defaultText)

  useEffect(() => {
    if (reduxLang) {
      if (reduxLang[id]) {
        setMessage(reduxLang[id])
      }
    }
  }, [props])

  return (
    <Fragment>
      {
        props.children
          ? props.children
          : message
      }
    </Fragment>
  )
})

/**
 * @description: ToggleLang 组件
 * @description: redux 语言国际化中使用ToggleLang组件,切换语言
 */
export const ToggleLang = connect(mapStateToProps, mapDispatchToProps)((props: any) => {
  const { reduxToggleLangMethod, reduxConfig } = props
  // 语言切换组件选中的key
  const [selectedKeysArray, setSelectedKeysArray] = useState(reduxConfig.locale)

  useEffect(() => {
    setSelectedKeysArray(reduxConfig.locale)
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
                {`${item.defaultName}`}
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
})
