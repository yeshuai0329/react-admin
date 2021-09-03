import React, { useMemo } from 'react'
import { Popover, Checkbox, Divider, Row, Col, Tooltip } from 'antd'
import { SettingFilled } from '@ant-design/icons'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'

const CheckboxGroup = Checkbox.Group

interface IProps{
  columns?: any
  changePickColumns: (pickList: string[]) => void
}

const ColumnsConfig = (props: IProps) => {
  const { columns, changePickColumns } = props

  const [indeterminate, setIndeterminate] = React.useState(false)
  const [checkAll, setCheckAll] = React.useState(true)

  const options: string[] = useMemo(() => {
    return columns && columns.map((item: any) => {
      return item.title
    })
  }, [columns])

  const [checkedList, setCheckedList] = React.useState<CheckboxValueType[]>(options)

  React.useEffect(() => {
    changePickColumns((checkedList as string[]))
  }, [checkedList])

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list)
    setIndeterminate(!!list.length && list.length < options.length)
    setCheckAll(list.length === options.length)
  }

  const onCheckAllChange = (e: any) => {
    setCheckedList(e.target.checked ? options : [])
    setIndeterminate(false)
    setCheckAll(e.target.checked)
  }

  const content = () => {
    return (
      <div style={{ width: 320 }}>
        <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
          全选
        </Checkbox>
        <Divider />
        <CheckboxGroup value={checkedList} onChange={onChange} >
          <Row gutter={[8, 8]}>
            {
              options && options.map((item:string) => {
                return (
                  <Col key={item} span={12}>
                    <Checkbox value={item}>{item}</Checkbox>
                  </Col>
                )
              })
            }
          </Row>
        </CheckboxGroup>
      </div>
    )
  }

  return (
    <Popover
      placement="bottomRight"
      title={'展示列'}
      content={content}
      trigger="click"
    >
      <Tooltip placement="topLeft" title={'展示列'}>
        <SettingFilled
          style={{
            width: 32,
            fontSize: 20
          }}
        />
      </Tooltip>
    </Popover>
  )
}

export default ColumnsConfig
