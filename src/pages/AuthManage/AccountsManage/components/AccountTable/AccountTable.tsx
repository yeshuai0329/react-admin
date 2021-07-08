import React, { ReactElement, Fragment, useMemo } from 'react'
import AdvancedTable, { AuthAction } from 'components/AdvancedTable/AdvancedTable'
import { Modal, Switch } from 'antd'
import AuthButton from 'components/AuthButton/AuthButton'
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  VerticalAlignBottomOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'
import { tableColumsFn } from 'service/AuthManage/AccountsManage/columnsHook'
import { ColumnsType } from 'antd/lib/table/interface'
import { AccountRecord, titleMap, IAccountTable } from 'typings/AuthManage/AccountsManage/AccountsManage.d'
import { useRowSelection, useExpandable } from 'hooks/publicTableHooks/publicTableHooks'

const AccountTable: React.FC<IAccountTable> = (props): ReactElement => {
  const { toggleModalVisibleMethod } = props
  // 表格选择配置选项
  const { selectedRowKeys, rowSelection, selectedRows } = useRowSelection<AccountRecord>()

  // 表格展开配置选项
  const expandedRowRender = (record: AccountRecord) => {
    return <p style={{ margin: 0 }}>{record.description}</p>
  }
  const expandable = useExpandable<AccountRecord>(expandedRowRender)

  // 表格操作按钮配置项
  const authActions: AuthAction[] = useMemo(() => [
    {
      name: '新建',
      auth: 'ACCOUNT_ADD',
      customtype: 'default',
      icon: <PlusOutlined />,
      onClick: () => {
        toggleModalVisibleMethod(true, titleMap[1])
      }
    },
    {
      name: '删除',
      auth: 'ACCOUNT_DEL',
      customtype: 'danger',
      icon: <DeleteOutlined />,
      disabled: selectedRowKeys.length === 0,
      onClick: () => {
        console.log(`obj`, 222222222222222)
      }
    },
    {
      name: '编辑',
      auth: 'ACCOUNT_EDIT',
      customtype: 'warning',
      icon: <EditOutlined />,
      disabled: selectedRowKeys.length !== 1,
      onClick: () => {
        toggleModalVisibleMethod(true, titleMap[2], selectedRows[0])
      }
    },
    {
      name: '导出',
      auth: 'ACCOUNT_EXPORT',
      customtype: 'info',
      icon: <VerticalAlignBottomOutlined />,
      onClick: () => {
        console.log(`obj`, 444444444444444)
      }
    }
  ], [selectedRowKeys])

  // 账号状态渲染函数
  const accountsStatusRender = (value: number, record: AccountRecord) => {
    return (
      <Switch
        checked={!!record.accountsStatus}
        checkedChildren="启用"
        unCheckedChildren="禁用"
        onClick={(val) => { editAccountStatus(val, record) }}
      />
    )
  }
  // 操作渲染函数
  const operationRender = (value: number, record: AccountRecord) => {
    return (
      <Fragment>
        <AuthButton
          type='link'
          auth='ROLES_EDIT'
          onClick={() => { toggleModalVisibleMethod(true, titleMap[2], record) }}
        >
          <EditOutlined />编辑
        </AuthButton>
        <AuthButton
          danger
          type='link'
          auth='ROLES_DEL'
        >
          <DeleteOutlined />删除
        </AuthButton>
      </Fragment>
    )
  }
  // 可展示列
  const columns :ColumnsType<AccountRecord> = tableColumsFn({
    accountsStatusRender,
    operationRender
  })

  const tableList: AccountRecord[] = []

  for (var i = 0; i < 1000; i++) {
    tableList.push({
      accountsOrder: i,
      loginAccount: `850360998@qq.com${i}`,
      accountPassword: `123456`,
      department: [1, 2, 3],
      accountsStatus: 1,
      phoneNumber: 15526190000,
      email: '850360998@qq.com',
      createTime: new Date().getTime(),
      updateTime: new Date().getTime(),
      description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.'
    })
  }

  const editAccountStatus = (val: boolean, record: AccountRecord) => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: <Fragment>{val ? `确定启用 ${record.loginAccount} 账号 ?` : `确定禁用 ${record.loginAccount} 账号 ?`}</Fragment>,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        console.log(`obj`, 11)
      }
    })
  }
  return (
    <AdvancedTable
      bordered
      title={() => <h2>账号列表</h2>}
      canConfig={true}
      authActions={authActions}
      columns={columns}
      dataSource={tableList}
      rowKey={(record) => {
        return `${record.accountsOrder}`
      }}
      rowSelection={rowSelection}
      expandable={expandable}
      scroll={{ x: 'max-content' }}
      pagination={{
        position: ['bottomCenter']
      }}
    />
  )
}

export default AccountTable
