import React, { forwardRef, memo, useImperativeHandle, useState } from 'react'
import { Button, Col, Form, Input, Row, Space } from 'antd'
import { SearchOutlined, ReloadOutlined, UpOutlined } from '@ant-design/icons'

export interface SearchFormItem {
  name: string,
  label: string,
  placeholder?: string,
  rules?: object[],
  render?: React.ReactElement,
  initialValue?: any,
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
                <Col key={index} span={6}>
                  <Form.Item
                    initialValue={item.initialValue}
                    label={item.label}
                    key={item.name}
                    name={item.name}
                    rules={item.rules}
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
          count % 4 === 0
            ? <Col span={6} style={{ height: '56px' }}></Col>
            : null
        }
        <Col span={6} style={{ textAlign: 'right', height: '56px', position: 'absolute', bottom: 0, right: 0 }}>
          <Space >
              <Button type="primary" htmlType="submit">
                <SearchOutlined />查询
              </Button>
              <Button htmlType="reset" onClick={reset}>
                <ReloadOutlined />重置
              </Button>
              {
                formList && formList.length > 4
                  ? <Button type='link' onClick={toggle}>
                      {
                        isOpen
                          ? '收起'
                          : '展开'
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
