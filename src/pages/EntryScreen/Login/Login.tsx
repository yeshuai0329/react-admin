import React from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import QueueAnim from 'rc-queue-anim'
import { useLogin } from 'pages/EntryScreen/service/EntryScreenHoooks'
import { init } from 'locales'

const Login: React.FC = () => {
  /**
   * @description: 中后台登录服务
   * @param {*}
   * @return {*}
   */
  const { onFinish } = useLogin()

  return (
     <Form
      name="normal_login"
      className={"login-form"}
      initialValues={{ username: 'admin', password: 'admin' }}
      onFinish={onFinish}
    >
      <QueueAnim type="left">
        <div key='a'>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined style={{ color: '#1890ff' }}/>}
              placeholder={init('page.inputstyle.usernameplaceholder')}
              size='large'
            />
          </Form.Item>
        </div>
        <div key='b'>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#1890ff' }}/>}
              type="password"
              placeholder={init('page.inputstyle.usernameplaceholder')}
              size='large'
            />
          </Form.Item>
        </div>
        <div key='c'>
          <Form.Item>
            <Button type="primary" htmlType="submit" block size='large'>
              {init('page.login.login')}
            </Button>
          </Form.Item>
        </div>
      </QueueAnim>
    </Form>
  )
}

export default Login
