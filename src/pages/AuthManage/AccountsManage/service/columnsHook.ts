import React from 'react'
import { ColumnsType } from 'antd/lib/table'
import { AccountRecord } from 'typings/AccountsManage'
import { useCommonColumns } from 'publicHooks/tableHooks/tableHooks'
import { departmentMap } from 'pages/AuthManage/AccountsManage/service/constantParams'

interface IOptions {
  accountsStatusRender:(value: number, record: AccountRecord) => React.ReactElement
  operationRender:(value: number, record: AccountRecord) => React.ReactElement
}

export const useAccountColumns = (options: IOptions) : ColumnsType<AccountRecord> => {
  const commonColumns = useCommonColumns<AccountRecord>()
  return [
    { title: '编号', dataIndex: 'accountsOrder', align: 'center', width: 100, fixed: 'left' },
    { title: '姓名', dataIndex: 'name', align: 'center', width: 120 },
    {
      title: '手机号',
      dataIndex: 'phoneNumber',
      align: 'center',
      width: 200,
      render: function renderPhoneNumber(value:string) {
        return value.substring(0, 3) + "****" + value.substr(value.length - 4)
      }
    },
    {
      title: '所属角色',
      dataIndex: 'belongToRoles',
      align: 'center',
      ellipsis: true,
      width: 200,
      render: function (value:string) {
        return departmentMap.find(item => item.value === value)?.label
      }
    },
    {
      title: '所属部门',
      dataIndex: 'department',
      align: 'center',
      width: 200,
      render: function (value:string) {
        return departmentMap.find(item => item.value === value)?.label
      }
    },
    {
      title: '账号状态',
      dataIndex: 'accountsStatus',
      align: 'center',
      width: 200,
      render: options.accountsStatusRender
    },
    { title: '登录账号', dataIndex: 'loginAccount', align: 'center', width: 200 },
    { title: '账号密码', dataIndex: 'accountPassword', align: 'center', width: 200 },
    ...commonColumns,
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
      width: 200,
      fixed: 'right',
      render: options.operationRender
    }
  ]
}
