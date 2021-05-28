import React, { ReactElement } from 'react'
import { Avatar, Dropdown, Space, Menu } from 'antd'
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons'
import style from 'layouts/LayoutHeader/LayoutHeader.module.less'
import classNames from 'classnames/bind'
import { LangMessage } from 'components/LangMessage/LangMessage'
import { useLogout } from 'service/EntryScreen/EntryScreenHoooks'

const cx = classNames.bind(style)

const Personal: React.FC = (): ReactElement => {
  const { logout } = useLogout()
  const menu = (
    <Menu>
      <Menu.Item icon={<UserOutlined />} ><LangMessage id='' defaultText={'个人中心'}/></Menu.Item>
      <Menu.Item icon={<SettingOutlined />} ><LangMessage id='' defaultText={'个人设置'}/></Menu.Item>
      <Menu.Divider/>
      <Menu.Item icon={<LogoutOutlined />} onClick={logout}>
        <LangMessage id='' defaultText={'退出登录'}/>
      </Menu.Item>
    </Menu>
  )
  return (
    <Dropdown className={cx('layoutHeader-headerRight__personal')} overlay={menu} placement="bottomLeft">
      <Space>
        <Avatar size={24} icon={<UserOutlined />} />
          adminadmin
      </Space>
    </Dropdown>
  )
}

export default Personal
