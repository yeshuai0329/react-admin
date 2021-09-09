import React from 'react'
import { ColumnsType } from 'antd/lib/table'
import { AccountRecord } from 'typings/accountsManage'
import { useCommonColumns } from 'publicHooks/tableHooks/tableHooks'
import { departmentMap } from 'pages/AuthManage/AccountsManage/service/constantParams'
import { init } from 'locales'

interface IOptions {
  accountsStatusRender:(value: number, record: AccountRecord) => React.ReactElement
  operationRender:(value: number, record: AccountRecord) => React.ReactElement
}

export const useAccountColumns = (options: IOptions) : ColumnsType<AccountRecord> => {
  const commonColumns = useCommonColumns<AccountRecord>()
  return [
    {
      title: init('page.table.columns.orderId'),
      dataIndex: 'accountsOrder',
      align: 'center',
      width: 100,
      fixed: 'left'
    },
    {
      title: init('page.table.columns.name'),
      dataIndex: 'name',
      align: 'center',
      width: 120
    },
    {
      title: init('page.table.columns.phoneNum'),
      dataIndex: 'phoneNumber',
      align: 'center',
      width: 200,
      render: function renderPhoneNumber(value:string) {
        return value.substring(0, 3) + "****" + value.substr(value.length - 4)
      }
    },
    {
      title: init('page.table.columns.belongToRoles'),
      dataIndex: 'belongToRoles',
      align: 'center',
      ellipsis: true,
      width: 200,
      render: function (value:string) {
        return departmentMap.find(item => item.value === value)?.label
      }
    },
    {
      title: init('page.table.columns.department'),
      dataIndex: 'department',
      align: 'center',
      width: 200,
      render: function (value:string) {
        return departmentMap.find(item => item.value === value)?.label
      }
    },
    {
      title: init('page.table.columns.accountStatus'),
      dataIndex: 'accountsStatus',
      align: 'center',
      width: 200,
      render: options.accountsStatusRender
    },
    {
      title: init('page.table.columns.loginAccount'),
      dataIndex: 'loginAccount',
      align: 'center',
      width: 200
    },
    {
      title: init('page.table.columns.password'),
      dataIndex: 'accountPassword',
      align: 'center',
      width: 200
    },
    ...commonColumns,
    {
      title: init('page.table.columns.operation'),
      dataIndex: 'operation',
      align: 'center',
      width: 200,
      fixed: 'right',
      render: options.operationRender
    }
  ]
}
