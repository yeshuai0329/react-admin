import React, { ReactElement } from 'react'
import { Space, Table, TableProps as AntdTableProps } from 'antd'
import ColumnsConfig from './components/ColumnsConfig/ColumnsConfig'
import AuthButtonGroup, { AuthAction } from 'components/aboutAuthButton/AuthButtonGroup'
import { init } from 'locales'

export interface IPickColumn {
  label: string
  value: string
}

export interface IAdvancedTableProps<RecordType> extends AntdTableProps<RecordType> {
  alert?: React.ReactElement
  paging: { pageNo: number; pageSize: number | undefined }
  pageTotal?: number
  authActions?: AuthAction[] // 权限按钮
  canConfig?: boolean // 改变列选项的配置icon是否显示
  changePage?: (page: number, pageSize?: number | undefined) => void
}

const AdvancedTable = <RecordType extends object = any>(props: IAdvancedTableProps<RecordType>): ReactElement => {
  const { paging, authActions, canConfig, columns, pageTotal, changePage, ...mainProps } = props

  const [pickColumns, setPickColumns] = React.useState(columns)

  const changePickColumns = (pickList: string[]) => {
    const result =
      columns &&
      columns.filter(item => {
        return pickList.includes(item.title as string)
      })
    setPickColumns(result)
  }

  return (
    <Space direction="vertical" style={{ width: '100%', marginTop: '16px' }}>
      <Space>
        <AuthButtonGroup authActions={authActions} />
        {canConfig ? <ColumnsConfig columns={columns} changePickColumns={changePickColumns} /> : null}
      </Space>
      {}
      <Table
        size="middle"
        columns={pickColumns}
        scroll={{ x: 'max-content' }}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          current: paging.pageNo,
          total: pageTotal,
          showTotal: total => `${init('page.common.total')} ${total} ${init('page.common.items')}`,
          position: ['bottomCenter'],
          onChange: changePage
        }}
        {...mainProps}
      />
    </Space>
  )
}

export default AdvancedTable
