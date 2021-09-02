import React, { ReactElement, useMemo, useState, Fragment, Key, useEffect } from 'react'
import { Table, Switch, Modal, Input } from 'antd'
import { RolesRecord, titleMap } from 'typings/AuthManage/RolesManage/RolseManage.d'
import AdvancedTablePro from 'components/AdvancedTablePro/AdvancedTablePro'
import { IAdvancedTableProps } from 'components/AdvancedTable/AdvancedTable'
import { AdvancedSearchProps } from 'components/AdvancedSearch/AdvancedSearch'
import AuthButton from 'components/AuthButton/AuthButton'
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  VerticalAlignBottomOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'
import { usePaging } from 'publicHooks/tableHooks/tableHooks'
import { rolesQueryApi } from 'api/rolesManage/rolesManage'
import { IAdvancedModalProps } from 'components/AdvancedModal/AdvancedModal'

const RolesManage: React.FC = (): ReactElement => {
  // 模态框的标题
  const [modalTitle, setModalTitle] = useState<string>(titleMap[1])
  // 模态框的显示隐藏
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  // 表格编辑按钮被点击获取到的行数据
  // const [rowList, setRowList] = useState<RolesRecord>()
  // console.log(`rowList`, rowList)
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const [selectedRows, setSelectedRows] = useState<RolesRecord[]>([])
  const [tableLoading, setTableLoading] = useState<boolean>(false) // 表格loading
  const { paging, changePage } = usePaging() // 分页的自定义hook
  const [pageTotal, setPageTotal] = useState<number>(0) // 表格页数
  const [tableList, setTableList] = useState<RolesRecord[] | never[]>([]) // 表格数据
  const [searchData, setSearchData] = useState({
    roleName: '',
    authCharacter: '',
    roleStatus: ''
  }) // 高级搜索查询参数
  // 打开模态框方法
  const toggleModalVisibleMethod = (visible: boolean, title?: string, record?: RolesRecord) => {
    console.log(`visible`, visible)
    setModalTitle((title as string))
    setModalVisible(visible)
    // setRowList(record)
  }
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
  useEffect(() => {
    queryRolesListMethod()
    console.log(`object`, 1)
  }, [paging])

  const queryRolesListMethod = async () => {
    setTableLoading(true)
    const params = { ...searchData, ...paging }
    const { data } = await rolesQueryApi(params)
    if (data.code === 200) {
      console.log(`setTableList`, setTableList)
      console.log(`setPageTotal`, setPageTotal)
      // setTableList(data.data)
      setPageTotal(data.total)
    }
    setTableLoading(false)
  }

  const serchFormOptions: AdvancedSearchProps = useMemo(() => {
    return {
      formList: [
        { name: 'roleName', label: '角色名称' },
        { name: 'authCharacter', label: '权限字符' },
        { name: 'roleStatus', label: '角色状态' }
      ],
      onSearch(res) {
        setSearchData(res)
        changePage(1)
      }
    }
  }, [changePage])

  const advanceTableOptions: IAdvancedTableProps<RolesRecord> = {
    authActions: [
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
    ],
    dataSource: tableList,
    columns: [
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
    ],
    rowSelection: {
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
    },
    loading: tableLoading,
    changePage,
    pageTotal,
    canConfig: true,
    rowKey: (record) => {
      return record.rolesOrder
    }
  }

  const advancedModalOptions: IAdvancedModalProps = {
    modalOptions: {
      visible: modalVisible,
      title: modalTitle,
      onCancel: () => {
        toggleModalVisibleMethod(false)
      },
      confirmed: () => {
        toggleModalVisibleMethod(false)
      }
    },
    formOptions: {
      modalFormList: [
        {
          name: 'userName',
          label: '用户名',
          render: (
            <Input/>
          )
        }
      ]
    }
  }
  return (
    <AdvancedTablePro
      serchFormOptions={serchFormOptions}
      advancedTableOptions={advanceTableOptions}
      advancedModalOptions={advancedModalOptions}
    />
  )
}

export default RolesManage
