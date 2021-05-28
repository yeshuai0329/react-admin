import React, { FC, useState } from 'react'
import Login from 'pages/EntryScreen/Login/Login'
import Register from 'pages/EntryScreen/Register/Register'
import { AlipayOutlined, GithubOutlined, WechatOutlined, QqOutlined } from '@ant-design/icons'
import style from './EntryScreen.module.less'
import classNames from 'classnames/bind'
import { ITab } from './type'
import { Card, Space } from 'antd'
import { ToggleLang, LangMessage } from 'components/LangMessage/LangMessage'
import { connect } from 'react-redux'

const cx = classNames.bind(style)

interface IProps {
  reduxLang?: any
}
const EntryScreen: FC<IProps> = (props) => {
  const { reduxLang } = props
  // Card 组件 当前选中的tab的key
  const [currentKey, setCurrentKey] = useState('login')

  // Card 组件 tabList - tab标题
  const tabList: ITab[] = [
    {
      key: 'login',
      tab: <span className={cx('EntryScreen-card__loginTitle')}>
             <LangMessage id='pages.entryscreen.login' defaultText='登录'/>
           </span>
    },
    {
      key: 'register',
      tab: <span className={cx('EntryScreen-card__registerTitle')}>
             <LangMessage id='pages.entryscreen.register' defaultText='注册'/>
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
          <p><LangMessage id='pages.entryscreen.h2' defaultText='React中后台解决方案脚手架'/></p>
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
              ? <Login reduxLang={reduxLang}/>
              : <Register reduxLang={reduxLang}/>
          }
        </Card>
        <div className={cx('EntryScreen-content__otherLogin')}>
          <Space size={'middle'}>
            <i style={{ fontSize: '16px' }}>
              <LangMessage id='pages.entryscreen.otherloginmethods' defaultText='其他登录方式 :' />
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

const mapStateToProps = ({ lang }: {lang: any}) => {
  return {
    reduxLang: lang
  }
}

export default connect(mapStateToProps, null)(EntryScreen)
