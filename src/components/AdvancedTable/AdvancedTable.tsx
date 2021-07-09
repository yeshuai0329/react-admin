import React, { ReactElement } from 'react'
import { Space, Table, TableProps as AntdTableProps, Alert } from 'antd'
import AuthButton, { IButtonProps } from 'components/AuthButton/AuthButton'
import ColumnsConfig from './_components/ColumnsConfig/ColumnsConfig'
export interface AuthAction extends IButtonProps {
  name: string,
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
      <Alert message="Informational Notes" type="info" showIcon closable/>
      <Table
        size='small'
        columns={pickColumns}
        {...mainProps}
      />
    </Space>
  )
}

export default AdvancedTable
