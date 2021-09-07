
import React from 'react'
import { ISiderMenuConfig } from "typings/systemConfig"
import {
  SET_SIDER_MENU_IS_HAS,
  SET_SIDER_MENU_THEME,
  SET_SIDER_MENU_IS_HAS_LOGO
} from 'store/actionTypes/configActionType'
import { Row, Col, Switch, Select } from 'antd'
import { TConfig } from 'typings/config'

interface IProps {
  reduxConfig: TConfig,
  reduxSetConfig: (type: string, payload: string | boolean) => void
}
const SiderMenuConfig: React.FC<IProps> = (props) => {
  const { reduxConfig, reduxSetConfig } = props

  const SiderMenuConfigs: ISiderMenuConfig[] = [
    {
      label: '侧边菜单',
      value: 'siderMenuIsHas',
      type: SET_SIDER_MENU_IS_HAS
    },
    {
      label: '侧边菜单Logo',
      value: 'siderMenuIshHasLogo',
      type: SET_SIDER_MENU_IS_HAS_LOGO
    },
    {
      label: '侧边菜单颜色',
      value: 'siderMenuTheme',
      type: SET_SIDER_MENU_THEME,
      render: function siderMenuThemeRender() {
        return (
          <Select
            style={{ width: 120 }}
            value={reduxConfig.siderMenuTheme}
            onChange={(val) => { reduxSetConfig(SET_SIDER_MENU_THEME, val) }}
          >
            <Select.Option value={'dark'}>dark</Select.Option>
            <Select.Option value={'light'}>light</Select.Option>
          </Select>
        )
      }
    }
  ]

  return (
    <Row
      gutter={[16, 16]}
    >
      {
        SiderMenuConfigs && SiderMenuConfigs.map((row: ISiderMenuConfig, index: number) => {
          return (
            <Col
              key={index}
              span={24}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              {row.label}
              {
                row.render
                  ? row.render()
                  : <Switch
                      checked={reduxConfig[row.value]}
                      onChange={() => { reduxSetConfig(row.type, !reduxConfig[row.value]) }}
                    />
              }
            </Col>
          )
        })
      }
    </Row>
  )
}

export default SiderMenuConfig
