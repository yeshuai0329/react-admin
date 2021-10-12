import React from 'react'
import { ISiderMenuConfig } from 'typings/systemConfig'
import {
  SET_TOP_MENU_IS_HAS,
  SET_TOP_MENU_IS_HAS_LOGO,
  SET_BREADCRUMB_IS_HAS
} from 'store/actionTypes/configActionType'
import { Row, Col, Switch } from 'antd'
import { TConfig } from 'typings/config'

interface IProps {
  reduxConfig: TConfig
  reduxSetConfig: (type: string, payload: string | boolean) => void
}
const TopMenuConfig: React.FC<IProps> = props => {
  const { reduxConfig, reduxSetConfig } = props

  const SiderMenuConfigs: ISiderMenuConfig[] = [
    {
      label: '顶部菜单',
      value: 'topMenuIsHas',
      type: SET_TOP_MENU_IS_HAS
    },
    {
      label: '顶部菜单Logo',
      value: 'topMenuIsHasLogo',
      type: SET_TOP_MENU_IS_HAS_LOGO
    },
    {
      label: '顶部面包屑',
      value: 'breadCrumbIsHas',
      type: SET_BREADCRUMB_IS_HAS
    }
    // {
    //   label: '顶部菜单颜色',
    //   value: 'topMenuTheme',
    //   type: SET_TOP_MENU_THEME,
    //   render: function siderMenuThemeRender() {
    //     return (
    //       <Select
    //         style={{ width: 120 }}
    //         value={reduxConfig.topMenuTheme}
    //         onChange={(val) => { reduxSetConfig(SET_TOP_MENU_THEME, val) }}
    //       >
    //         <Select.Option value={'dark'}>dark</Select.Option>
    //         <Select.Option value={'light'}>light</Select.Option>
    //       </Select>
    //     )
    //   }
    // }
  ]

  return (
    <Row gutter={[16, 16]}>
      {SiderMenuConfigs &&
        SiderMenuConfigs.map((row: ISiderMenuConfig, index: number) => {
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
              {row.render
                ? (
                    row.render()
                  )
                : (
                <Switch
                  checked={reduxConfig[row.value]}
                  onChange={() => {
                    reduxSetConfig(row.type, !reduxConfig[row.value])
                  }}
                />
                  )}
            </Col>
          )
        })}
    </Row>
  )
}

export default TopMenuConfig
