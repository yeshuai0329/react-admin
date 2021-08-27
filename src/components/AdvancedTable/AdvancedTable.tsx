import React, { ReactElement } from 'react'
import { Space, Table, TableProps as AntdTableProps } from 'antd'
import AuthButton, { IButtonProps } from 'components/AuthButton/AuthButton'
import ColumnsConfig from './components/ColumnsConfig/ColumnsConfig'

export interface AuthAction extends IButtonProps {
  name: string,
  onClick: () => void
}

export interface IPickColumn {
  label: string,
  value: string
}
export interface IAdvancedTableProps<RecordType> extends AntdTableProps<RecordType>{
  authActions: AuthAction[]
  canConfig: boolean,
  alert?: React.ReactElement
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
    <Space direction='vertical' style={{ width: '100%', marginTop: '16px' }}>
      <Space>
        {
          authActions && authActions.map((item: any, index: number) => {
            return (
              <AuthButton
                key={index}
                {...item}
              >
                {item.name}
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
      {}
      <Table
        size='small'
        columns={pickColumns}
        {...mainProps}
      />
    </Space>
  )
}

export default AdvancedTable
