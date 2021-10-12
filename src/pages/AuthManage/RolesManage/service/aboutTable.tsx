import React, { useMemo } from 'react'
import { Modal, Switch, Space } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { RolesRecord } from 'typings/rolesManage'
import AuthButton from 'components/aboutAuthButton/AuthButton/AuthButton'
import { FIRST_TYPE, SECOND_TYPE } from 'utils/globalConstantParams'
import { AuthAction } from 'components/aboutAuthButton/AuthButtonGroup'
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  VerticalAlignBottomOutlined
} from '@ant-design/icons'

interface IOptions {
  openModal: (
    title?: string | undefined,
    record?: RolesRecord | undefined
  ) => void // 新建编辑模态框
  checkedRowKeys: React.Key[] // 选中的key
  checkedRows: RolesRecord[] // 选中的行
}

export const useAboutRolesTable = ({
  openModal,
  checkedRowKeys,
  checkedRows
}: IOptions) => {
  const editRoleStatus = (val: boolean, record: RolesRecord) => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: val
        ? `确定启用 ${record.rolesName} 角色 ?`
        : `确定禁用 ${record.rolesName} 角色 ?`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        console.log('obj', 11)
      }
    })
  }

  const rolesColumns: ColumnsType<RolesRecord> = [
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
      width: 200,
      render: function rolesStatusRender(
        text: number,
        record: RolesRecord,
        index: number
      ) {
        return (
          <Switch
            checked={!!record.rolesStatus}
            checkedChildren="启用"
            unCheckedChildren="禁用"
            onClick={val => {
              editRoleStatus(val, record)
            }}
          />
        )
      }
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
      width: 200,
      fixed: 'right',
      render: function operationRender(
        value: any,
        record: RolesRecord,
        index: number
      ) {
        return (
          <Space>
            <AuthButton
              type="link"
              auth="ROLES_EDIT"
              onClick={() => {
                openModal(SECOND_TYPE, record)
              }}
            >
              <EditOutlined />编辑
            </AuthButton>
            <AuthButton danger type="link" auth="ROLES_DEL">
              <DeleteOutlined />删除
            </AuthButton>
          </Space>
        )
      }
    }
  ]

  const authActions: AuthAction[] = useMemo(
    () => [
      {
        name: '新建',
        auth: 'ROLES_ADD',
        customtype: 'default',
        icon: <PlusOutlined />,
        onClick: () => {
          openModal(FIRST_TYPE)
        }
      },
      {
        name: '删除',
        auth: 'ROLES_DEL',
        customtype: 'danger',
        icon: <DeleteOutlined />,
        disabled: checkedRowKeys.length === 0 && checkedRows.length === 0,
        onClick: () => {
          console.log('obj', 222222222222222)
        }
      },
      {
        name: '编辑',
        auth: 'ROLES_EDIT',
        customtype: 'warning',
        icon: <EditOutlined />,
        disabled: checkedRowKeys.length !== 1 && checkedRows.length !== 1,
        onClick: () => {
          openModal(SECOND_TYPE, checkedRows[0])
        }
      },
      {
        name: '导出',
        auth: 'ROLES_EXPORT',
        customtype: 'info',
        icon: <VerticalAlignBottomOutlined />,
        disabled: checkedRowKeys.length === 0 && checkedRows.length === 0,
        onClick: () => {
          console.log('obj', 444444444444444)
        }
      }
    ],
    [checkedRowKeys, checkedRows]
  )

  return {
    rolesColumns,
    authActions
  }
}
