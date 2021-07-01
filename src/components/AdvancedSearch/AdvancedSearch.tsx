import React, { forwardRef, memo, useImperativeHandle, useState } from 'react'
import style from './AdvancedSearch.module.less'
import classNames from 'classnames/bind'
import { Button, Card, Col, Form, Input, Row, Space } from 'antd'
import { SearchOutlined, ReloadOutlined, UpOutlined } from '@ant-design/icons'
const cx = classNames.bind(style)

export interface SearchFormItem {
  name: string,
  label: string,
  placeholder?: string,
  rules?: object[],
  render?: React.ReactElement,
  initialValue?: any,
}

interface AdvancedSearchProps {
  formList: SearchFormItem[],
  onSearch: (values: any) => void,
}

const AdvancedSearch = forwardRef(function fnRef(props: AdvancedSearchProps, ref) {
  const { formList, onSearch } = props

  const [isOpen, setIsOpen] = useState(false)
  const [count, setCount] = useState(4)
  const [form] = Form.useForm()

  const reset = () => {
    form.resetFields()
    onSearch({})
  }

  const onFinish = () => {
    form.validateFields().then(res => {
      console.log(`res`, res)
      onSearch(res)
    })
  }

  useImperativeHandle(ref, () => {
    return {
      reset
    }
  })

  const toggle = () => {
    console.log(`isOpen`, isOpen)
    if (!isOpen) {
      setCount(formList.length)
    } else {
      setCount(4)
    }
    setIsOpen(!isOpen)
  }

  return (
    <Card
      bodyStyle={{
        padding: 10
      }}
    >
      <Form
        className={cx('AdvancedSearch')}
        form={form}
        onFinish={onFinish}
      >
        <Row gutter={[16, 0]}>
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
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Space>
                <Button type="primary" htmlType="submit">
                  <SearchOutlined />查询
                </Button>
                <Button htmlType="reset" onClick={reset}>
                  <ReloadOutlined />重置
                </Button>
                {
                  formList && formList.length > 4
                    ? <Button type='link' onClick={toggle}>
                        <UpOutlined rotate={isOpen ? 180 : 0} />
                        {
                          isOpen
                            ? '收起'
                            : '展开'
                        }
                      </Button>
                    : null
                }
            </Space>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}
)

export default memo(AdvancedSearch)
