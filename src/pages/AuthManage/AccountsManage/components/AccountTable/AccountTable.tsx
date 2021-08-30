import React, { ReactElement, Fragment, useMemo } from 'react'
import AdvancedTable, { AuthAction } from 'components/AdvancedTable/AdvancedTable'
import { Modal, Switch } from 'antd'
import AuthButton from 'components/AuthButton/AuthButton'
import { useAccountColumns } from 'pages/AuthManage/AccountsManage/service/columnsHook'
import { AccountRecord, IAccountTable } from 'typings/AuthManage/AccountsManage/AccountsManage.d'
import { useRowSelection, useExpandable } from 'publicHooks/tableHooks/tableHooks'
import { ColumnsType } from 'antd/lib/table/interface'
import { titleMap, accountStatusMap } from 'pages/AuthManage/AccountsManage/service/constantParams'
import { FIRST_TYPE, SECOND_TYPE } from 'utils/globalConstantParams'
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  VerticalAlignBottomOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'

const AccountTable: React.FC<IAccountTable> = (props): ReactElement => {
  const {
    tableList, // 账号表格数据
    toggleModalVisibleMethod, // 新建和编辑控制模态框关闭打开的方法
    pageTotal, // 总条数
    changePage, // 改变分页的方法
    tableLoading
  } = props

  // 表格选择配置选项
  const { selectedRowKeys, rowSelection, selectedRows } = useRowSelection<AccountRecord>()

  // 表格展开配置选项
  const expandable = useExpandable<AccountRecord>(
    (record: AccountRecord) => {
      return <p style={{ margin: 0 }}>{record.description}</p>
    }
  )

  // 表格操作按钮配置项
  const authActions: AuthAction[] = useMemo(() => [
    {
      name: '新建',
      auth: 'ACCOUNT_ADD',
      customtype: 'default',
      icon: <PlusOutlined />,
      onClick: () => {
        toggleModalVisibleMethod(true, titleMap[FIRST_TYPE])
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
        toggleModalVisibleMethod(true, titleMap[SECOND_TYPE], selectedRows[0])
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
        checked={!!record.accountStatus}
        checkedChildren={accountStatusMap.find(item => item.value === 1)?.label}
        unCheckedChildren={accountStatusMap.find(item => item.value === 0)?.label}
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
  const columns :ColumnsType<AccountRecord> = useAccountColumns({
    accountsStatusRender,
    operationRender
  })

  const editAccountStatus = (val: boolean, record: AccountRecord) => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: <Fragment>{val ? `确定启用 ${record.loginAccount} 账号 ?` : `确定禁用 ${record.loginAccount} 账号 ?`}</Fragment>,
      onOk: () => {
        console.log(`obj`, 11)
      }
    })
  }

  return (
    <AdvancedTable
      loading={tableLoading}
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
      pageTotal={pageTotal}
      changePage={changePage}
    />
  )
}

export default AccountTable
