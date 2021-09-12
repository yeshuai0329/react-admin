import React, { forwardRef, memo, useImperativeHandle, useState } from 'react'
import { Button, Col, Form, Input, Row, Space } from 'antd'
import { SearchOutlined, ReloadOutlined, UpOutlined } from '@ant-design/icons'
import { init } from 'locales'

export interface SearchFormItem {
  name: string,
  label: string,
  placeholder?: string,
  rules?: object[],
  render?: any,
  initialValue?: any,
  shouldUpdate?: boolean
}

export interface AdvancedSearchProps {
  formList: SearchFormItem[],
  onSearch: (values: any) => void,
}

const AdvancedSearch = forwardRef(function fnRef(props: AdvancedSearchProps, ref) {
  const { formList, onSearch } = props

  const [isOpen, setIsOpen] = useState(false)
  const [count, setCount] = useState(3)
  const [form] = Form.useForm()

  const reset = () => {
    form.resetFields()
    onSearch({})
  }

  const onFinish = () => {
    form.validateFields().then(res => {
      onSearch(res)
    })
  }

  useImperativeHandle(ref, () => {
    return {
      reset
    }
  })

  const toggle = () => {
    if (!isOpen) {
      setCount(formList.length)
    } else {
      setCount(3)
    }
    setIsOpen(!isOpen)
  }

  return (
    <Form
      form={form}
      onFinish={onFinish}
    >
      <Row gutter={[16, 0]} style={{ position: 'relative' }}>
        {
          formList && formList.map((item: any, index:number) => {
            if (index < count) {
              return (
                <Col key={index} xs={24} sm={12} lg={6} xl={6} >
                  <Form.Item
                    initialValue={item.initialValue}
                    label={item.label}
                    key={item.name}
                    name={item.name}
                    rules={item.rules}
                    shouldUpdate={item.shouldUpdate}
                  >
                    {
                      item.render
                        ? item.render
                        : <Input
                            allowClear
                            type="text"
                            placeholder={item.placeholder}
                          />
                    }
                  </Form.Item>
                </Col>
              )
            }
            return null
          })
        }
        {
          count % 2 === 0
            ? <Col xs={24} sm={12} lg={6} xl={6} style={{ height: '56px' }}></Col>
            : null
        }
        <Col
          xs={24} sm={12} lg={6} xl={6}
          // style={{ textAlign: 'right', height: '56px', position: 'absolute', bottom: 0, right: 0 }}
        >
          <Space >
              <Button type="primary" htmlType="submit">
                <SearchOutlined />{init('page.common.query')}
              </Button>
              <Button htmlType="reset" onClick={reset}>
                <ReloadOutlined />{init('page.common.reset')}
              </Button>
              {
                formList && formList.length > 4
                  ? <Button type='link' onClick={toggle}>
                      {
                        isOpen
                          ? init('page.common.putaway')
                          : init('page.common.open')
                      }
                      <UpOutlined rotate={isOpen ? 180 : 0} />
                    </Button>
                  : null
              }
          </Space>
        </Col>
      </Row>
    </Form>
  )
}
)

export default memo(AdvancedSearch)
