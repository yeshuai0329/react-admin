import React, { ReactElement, Fragment, useState, Key, useMemo } from 'react'
import AdvancedTable, { AuthAction } from 'components/AdvancedTable/AdvancedTable'
import Table, { ColumnType } from 'antd/lib/table'
import { Modal, Switch } from 'antd'
import AuthButton from 'components/AuthButton/AuthButton'
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  VerticalAlignBottomOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'
import { ExpandableConfig, TableRowSelection } from 'antd/lib/table/interface'
import { RolesRecord, titleMap, IRolesTable } from 'typings/AuthManage/RolesManage/RolseManage.d'

const RolesTable: React.FC<IRolesTable> = (props): ReactElement => {
  const { toggleModalVisibleMethod } = props
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const [selectedRows, setSelectedRows] = useState<RolesRecord[]>([])

  const editRoleStatus = (val: boolean, record: RolesRecord) => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: <Fragment>{val ? `确定启用 ${record.rolesName} 角色 ?` : `确定禁用 ${record.rolesName} 角色 ?`}</Fragment>,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        console.log(`obj`, 11)
      }
    })
  }

  const authActions: AuthAction[] = useMemo(() => [
    {
      name: '新建',
      auth: 'ROLES_ADD',
      customtype: 'default',
      icon: <PlusOutlined />,
      onClick: () => {
        toggleModalVisibleMethod(true, titleMap[1])
      }
    },
    {
      name: '删除',
      auth: 'ROLES_DEL',
      customtype: 'danger',
      icon: <DeleteOutlined />,
      disabled: selectedRowKeys.length === 0,
      onClick: () => {
        console.log(`obj`, 222222222222222)
      }
    },
    {
      name: '编辑',
      auth: 'ROLES_EDIT',
      customtype: 'warning',
      icon: <EditOutlined />,
      disabled: selectedRowKeys.length !== 1,
      onClick: () => {
        toggleModalVisibleMethod(true, titleMap[2], selectedRows[0])
      }
    },
    {
      name: '导出',
      auth: 'ROLES_EXPORT',
      customtype: 'info',
      icon: <VerticalAlignBottomOutlined />,
      onClick: () => {
        console.log(`obj`, 444444444444444)
      }
    }
  ], [selectedRowKeys])

  const columns: ColumnType<RolesRecord>[] = [
    {
      title: '角色编号',
      dataIndex: 'rolesOrder',
      align: 'center',
      width: 200,
      fixed: 'left'
    },
    {
      title: '角色名称',
      dataIndex: 'rolesName',
      align: 'center',
      width: 200
    },
    {
      title: '权限字符',
      dataIndex: 'authCharacter',
      align: 'center',
      width: 200
    },
    {
      title: '角色状态',
      dataIndex: 'rolesStatus',
      align: 'center',
      render: function rolesStatusRender(text: number, record: RolesRecord) {
        return (
          <Switch
            checked={!!record.rolesStatus}
            checkedChildren="启用"
            unCheckedChildren="禁用"
            onClick={(val) => { editRoleStatus(val, record) }}
          />
        )
      },
      width: 200
    },
    {
      title: '创建时间',
      dataIndex: 'createBy',
      align: 'center',
      width: 200
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
      render: function operationRender(value: any, record: RolesRecord, index: number) {
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
      },
      width: 200,
      fixed: 'right'
    }
  ]

  const tableList: RolesRecord[] = []

  for (var i = 0; i < 1000; i++) {
    tableList.push({
      rolesOrder: i,
      rolesName: `超级管理员${i}`,
      authCharacter: `admin${i}`,
      rolesStatus: 1,
      createBy: 2021,
      description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.'
    })
  }

  const rowSelection: TableRowSelection<RolesRecord> | undefined = {
    selectedRowKeys,
    fixed: true,
    onChange: (selectedRowKeys: React.Key[], selectedRows: RolesRecord[]) => {
      setSelectedRowKeys(selectedRowKeys)
      setSelectedRows(selectedRows)
    },
    columnWidth: 48,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE
    ],
    type: 'checkbox'
  }

  const expandable: ExpandableConfig<RolesRecord> | undefined = {
    fixed: 'left',
    expandedRowRender: function expandedRowRender(record: RolesRecord) {
      return <p style={{ margin: 0 }}>{record.description}</p>
    }
  }
  return (
    <AdvancedTable
      bordered
      title={() => <h2>角色列表</h2>}
      canConfig={true}
      authActions={authActions}
      columns={columns}
      dataSource={tableList}
      rowKey={(record) => {
        return `${record.rolesOrder}`
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

export default RolesTable
