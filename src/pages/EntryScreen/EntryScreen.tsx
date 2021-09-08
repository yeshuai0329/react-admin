import React, { FC, useState } from 'react'
import Login from 'pages/EntryScreen/Login/Login'
import Register from 'pages/EntryScreen/Register/Register'
import { AlipayOutlined, GithubOutlined, WechatOutlined, QqOutlined } from '@ant-design/icons'
import style from './EntryScreen.module.less'
import classNames from 'classnames/bind'
import { ITab } from './type'
import { Card, Space } from 'antd'
import { ToggleLang } from 'components/LangMessage/LangMessage'
import { init } from 'locales'

const cx = classNames.bind(style)

const EntryScreen: FC = () => {
  // Card 组件 当前选中的tab的key
  const [currentKey, setCurrentKey] = useState('login')

  // Card 组件 tabList - tab标题
  const tabList: ITab[] = [
    {
      key: 'login',
      tab: <span className={cx('EntryScreen-card__loginTitle')}>
             {init('pages.entryscreen.login')}
           </span>
    },
    {
      key: 'register',
      tab: <span className={cx('EntryScreen-card__registerTitle')}>
             {init('pages.entryscreen.register')}
           </span>
    }
  ]

  //
  const onTabChange = (key: string) => {
    setCurrentKey(key)
  }

  return (
    <div className={cx('EntryScreen')}>
      <div className={cx('EntryScreen-content')}>
        <div className={cx('EntryScreen-content__header')}>
          <h1>R-Boot</h1>
          <p>{init('pages.entryscreen.h2')}</p>
        </div>
        <Card
          tabList={tabList}
          bordered={false}
          className={cx('EntryScreen-content__card')}
          headStyle={{
            display: 'flex',
            justifyContent: 'center'
          }}
          bodyStyle={{
            padding: '24px 0px 0px'
          }}
          activeTabKey={currentKey}
          onTabChange={onTabChange}
        >
          {
            currentKey === 'login'
              ? <Login/>
              : <Register/>
          }
        </Card>
        <div className={cx('EntryScreen-content__otherLogin')}>
          <Space size={'middle'}>
            <i style={{ fontSize: '16px' }}>
             {init('pages.entryscreen.otherloginmethods')}
            </i>
            <span><AlipayOutlined /></span>
            <span><GithubOutlined /></span>
            <span><WechatOutlined /></span>
            <span><QqOutlined /></span>
          </Space>
        </div>
      </div>
      <div className={cx('EntryScreen-toggleLang')}>
        <ToggleLang />
      </div>
    </div>
  )
}

export default EntryScreen
