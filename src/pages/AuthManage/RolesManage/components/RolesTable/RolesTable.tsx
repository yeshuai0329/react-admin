import React, { ReactElement, Fragment, useState } from 'react'
import AdvancedTable, { AuthAction } from 'components/AdvancedTable/AdvancedTable'
import { ColumnType } from 'antd/lib/table'
import { Modal, Switch } from 'antd'
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  VerticalAlignBottomOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'

interface RolesRecord {
  rolesOrder: number,
  rolesName: string,
  authCharacter: string,
  rolesStatus: number,
  createBy: number,
}

const RolesTable: React.FC = (): ReactElement => {
  const [canConfig] = useState(true)

  const editRoleStatus = (val: boolean, record: RolesRecord) => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: <Fragment>{val ? `确定启用 ${record.rolesName} 角色 ?` : `确定禁用 ${record.rolesName} 角色 ?`}</Fragment>,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        console.log(`obj`, record)
      }
    })
  }

  const authActions: AuthAction[] = [
    {
      name: '新建',
      auth: 'ROLES_ADD',
      customtype: 'default',
      icon: <PlusOutlined />,
      onClick: () => {
        console.log(`obj`, 11111111111111)
      }
    },
    {
      name: '删除',
      auth: 'ROLES_DEL',
      customtype: 'danger',
      icon: <DeleteOutlined />,
      onClick: () => {
        console.log(`obj`, 222222222222222)
      }
    },
    {
      name: '修改',
      auth: 'ROLES_EDIT',
      customtype: 'warning',
      icon: <EditOutlined />,
      onClick: () => {
        console.log(`obj`, 333333333333333)
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
  ]

  const columns: ColumnType<RolesRecord>[] = [
    {
      title: '角色编号',
      dataIndex: 'rolesOrder',
      align: 'center'
    },
    {
      title: '角色名称',
      dataIndex: 'rolesName',
      align: 'center'
    },
    {
      title: '权限字符',
      dataIndex: 'authCharacter',
      align: 'center'
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
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createBy',
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center'

    }
  ]

  const tableList: RolesRecord[] = []

  for (var i = 0; i < 1000; i++) {
    tableList.push({
      rolesOrder: i,
      rolesName: `超级管理员${i}`,
      authCharacter: `admin${i}`,
      rolesStatus: 1,
      createBy: 2021
    })
  }

  const title = () => {
    return (
      <h2>角色列表</h2>
    )
  }

  return (
    <AdvancedTable
      title={title}
      canConfig={canConfig}
      authActions={authActions}
      columns={columns}
      dataSource={tableList}
      rowKey={(record) => {
        return `${record.rolesOrder}`
      }}
    />
  )
}

export default RolesTable
