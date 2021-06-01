import React, { ReactElement, useEffect, useState } from 'react'
import { Avatar, Dropdown, Space, Menu } from 'antd'
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons'
import style from 'layouts/LayoutHeader/LayoutHeader.module.less'
import classNames from 'classnames/bind'
import { LangMessage } from 'components/LangMessage/LangMessage'
import { useLogout } from 'service/EntryScreen/EntryScreenHoooks'

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
        <Avatar size={24} src={avatar}/>
          {userName}
      </Space>
    </Dropdown>
  )
}

export default Personal
