import React from 'react'
import { ColumnsType } from 'antd/lib/table'
import { AccountRecord } from 'typings/AuthManage/AccountsManage/AccountsManage.d'
import { useCommonColumns } from 'hooks/publicTableHooks/publicTableHooks'

interface Params {
  accountsStatusRender:(value: number, record: AccountRecord) => React.ReactElement
  operationRender:(value: number, record: AccountRecord) => React.ReactElement
}

export const tableColumsFn = ({ accountsStatusRender, operationRender }: Params) : ColumnsType<AccountRecord> => {
  const commonColumns = useCommonColumns<AccountRecord>()
  return [
    { title: '编号', dataIndex: 'accountsOrder', align: 'center', width: 100, fixed: 'left' },
    { title: '登录账号', dataIndex: 'loginAccount', align: 'center', width: 200 },
    { title: '账号密码', dataIndex: 'accountPassword', align: 'center', width: 200 },
    { title: '所属部门', dataIndex: 'department', align: 'center', width: 200 },
    { title: '账号状态', dataIndex: 'accountsStatus', align: 'center', render: accountsStatusRender, width: 200 },
    { title: '手机号', dataIndex: 'phoneNumber', align: 'center', width: 200 },
    { title: '邮箱', dataIndex: 'email', align: 'center', width: 200 },
    ...commonColumns,
    { title: '操作', dataIndex: 'operation', align: 'center', render: operationRender, width: 200, fixed: 'right' }
  ]
}
