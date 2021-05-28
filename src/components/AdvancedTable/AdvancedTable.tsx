import React, { ReactElement } from 'react'
import { Col, Row, Space, Table, TableProps as AntdTableProps, Alert } from 'antd'
import AuthButton, { AuthButtonType, CustomType } from 'appAuthority/AuthButton/AuthButton'
import ColumnsConfig from './_components/ColumnsConfig/ColumnsConfig'
export interface AuthAction {
  name: string,
  icon?: React.ReactElement,
  auth?: AuthButtonType,
  customtype?: CustomType
  onClick: () => void
}

export interface IPickColumn {
  label: string,
  value: string
}
interface IAdvancedTableProps<RecordType> extends AntdTableProps<RecordType>{
  authActions: AuthAction[]
  canConfig: boolean,
}

const AdvancedTable = <RecordType extends object = any>(props: IAdvancedTableProps<RecordType>): ReactElement => {
  const { authActions, canConfig, columns, ...mainProps } = props

  const [pickColumns, setPickColumns] = React.useState(columns)

  const changePickColumns = (pickList: string[]) => {
    const result = columns && columns.filter((item) => {
      return pickList.includes((item.title as string))
    })
    setPickColumns(result)
  }
  return (
    <Row gutter={[0, 8]}>
      <Col span={24} style={{ textAlign: 'end' }}>
        <Space>
          {
            authActions && authActions.map((item: any, index: number) => {
              return (
                <AuthButton
                  key={index}
                  auth={item.auth}
                  customtype={item.customtype}
                  onClick={item.onClick}
                >
                  {item.icon}{item.name}
                </AuthButton>
              )
            })
          }
          {
            canConfig
              ? <ColumnsConfig
                  columns={columns}
                  changePickColumns={changePickColumns}
                />
              : null
          }
        </Space>
      </Col>
      <Col span={24}>
        <Alert message="Informational Notes" type="info" showIcon closable/>
      </Col>
      <Col span={24}>
        <Table<RecordType>
          columns={pickColumns}
          {...mainProps}
        />
      </Col>
    </Row>
  )
}

export default AdvancedTable
