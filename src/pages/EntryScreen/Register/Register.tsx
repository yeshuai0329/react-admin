import React from 'react'
import { Form, Input, Button, Space, Statistic } from 'antd'
import { TabletOutlined, MailOutlined } from '@ant-design/icons'
import QueueAnim from 'rc-queue-anim'
import { init } from 'locales'

const { Countdown } = Statistic

const Register: React.FC = () => {
  const deadline = Date.now() + 1000 * 60
  // 获取验证码按钮点击以后置灰/显示倒计时状态
  const [pCodeButtonDisabled, setPCodeButtonDisabled] = React.useState(false)
  const onFinish = (values: any) => {
    console.log('values: ', values)
  }

  const getPCodeButton = (): void => {
    setPCodeButtonDisabled(true)
  }
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <QueueAnim type="left">
        <div key="a">
          <Form.Item
            name="phoneNumber"
            rules={[{ required: true, message: '手机号必填!' }]}
          >
            <Input
              prefix={<TabletOutlined style={{ color: '#1890ff' }} />}
              placeholder={init('page.login.phonenumplaceholder')}
              size="large"
            />
          </Form.Item>
        </div>
        <div key="b">
          <Form.Item
            name="pCode"
            rules={[{ required: true, message: '验证码必填!' }]}
          >
            <Space>
              <Input
                prefix={<MailOutlined style={{ color: '#1890ff' }} />}
                placeholder={init('page.login.vcodeplaceholder')}
                size="large"
              />
              <Button
                htmlType="button"
                size="large"
                style={{ width: 120 }}
                disabled={pCodeButtonDisabled}
                onClick={getPCodeButton}
              >
                {pCodeButtonDisabled
                  ? (
                  <Countdown
                    value={deadline}
                    format="ss"
                    suffix="秒"
                    valueStyle={{
                      color: '#ccc',
                      fontSize: '16px'
                    }}
                  />
                    )
                  : (
                      init('page.login.getvcode')
                    )}
              </Button>
            </Space>
          </Form.Item>
        </div>
        <div key="c">
          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              {init('page.login.register')}
            </Button>
          </Form.Item>
        </div>
      </QueueAnim>
    </Form>
  )
}

export default Register
