import React, { ReactElement, useEffect, useState } from 'react'
import { Avatar, Dropdown, Space, Menu } from 'antd'
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons'
import style from 'layouts/LayoutHeader/LayoutHeader.module.less'
import classNames from 'classnames/bind'
import { useLogout } from 'pages/EntryScreen/service/EntryScreenHoooks'
import { init } from 'locales'

const cx = classNames.bind(style)

const Personal: React.FC = (): ReactElement => {
  const [userName, setUserName] = useState('R-Boot')
  const [avatar, setAvatar] = useState('')

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
    setUserName(userInfo.username || 'R-Boot')
    setAvatar(userInfo.Avatar)
  }, [])

  const { logout } = useLogout()

  const menu = (
    <Menu>
      <Menu.Item key='1' icon={<UserOutlined />} >{init('个人中心')}</Menu.Item>
      <Menu.Item key='2'icon={<SettingOutlined />} >{init('个人设置')}</Menu.Item>
      <Menu.Divider/>
      <Menu.Item key='3' icon={<LogoutOutlined />} onClick={logout}>
        {init('退出登录')}
      </Menu.Item>
    </Menu>
  )
  return (
    <Dropdown className={cx('layoutHeader-headerRight__personal')} overlay={menu} placement="bottomLeft">
      <Space>
        <Avatar size={24} src={avatar}/>
          {userName}
      </Space>
    </Dropdown>
  )
}

export default Personal
