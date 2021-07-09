import React, { ReactElement, useMemo, useState, Fragment, useEffect } from 'react'
import AdvancedSearch, { SearchFormItem } from 'components/AdvancedSearch/AdvancedSearch'
import AccountTable from './components/AccountTable/AccountTable'
import AccountModal from './components/AccountModal/AccountModal'
import { AccountRecord, accountStatusMap, departmentMap, titleMap } from 'typings/AuthManage/AccountsManage/AccountsManage.d'
import { accountQueryApi } from 'api/AccountsManage/AccountsManage'
import { InputNumber, Select } from 'antd'

const AccountsManage: React.FC = (): ReactElement => {
  // 模态框的标题
  const [modalTitle, setModalTitle] = useState<string>(titleMap[1])
  // 模态框的显示隐藏
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  // 表格编辑按钮被点击获取到的行数据
  const [rowList, setRowList] = useState<AccountRecord>()
  const [tableLoading, setTableLoading] = useState<boolean>(false)
  // 高级搜索查询参数
  const [searchData, setSearchData] = useState({
    accountsOrder: '',
    loginAccount: '',
    department: '',
    accountStatus: '',
    email: ''
  })
  // 高级搜索查询参数
  const [tableList, setTableList] = useState<AccountRecord[] | never[]>([])
  // 表格分页参数
  const [paging, setPaging] = useState<{ pageNo: number, pageSize: number}>({
    pageNo: 1,
    pageSize: 10
  })
  const [pageTotal, setPageTotal] = useState<number>(0)
  const changePage = (page: number, pageSize?: number | undefined) => {
    setPaging({ ...paging, pageNo: page, pageSize: (pageSize as number) })
  }
  // 打开模态框方法
  const toggleModalVisibleMethod = (visible: boolean, title?: string, record?: AccountRecord) => {
    setModalTitle((title as string))
    setModalVisible(visible)
    setRowList(record)
  }

  const formList: SearchFormItem[] = useMemo(() => {
    return [
      {
        name: 'accountsOrder',
        label: '编号',
        initialValue: '',
        render: (
          <InputNumber style={{ width: '100%' }} min={0} placeholder="请输入账号编号" precision={0}/>
        )
      },
      {
        name: 'loginAccount',
        label: '登录账号',
        initialValue: '',
        placeholder: "请输入登录账号"
      },
      {
        name: 'name',
        label: '姓名',
        initialValue: '',
        placeholder: "请输入姓名"
      },
      {
        name: 'department',
        label: '所属部门',
        initialValue: '',
        render: (
          <Select options={departmentMap}></Select>
        )

      },
      {
        name: 'accountStatus',
        label: '账号状态',
        initialValue: '',
        render: (
          <Select options={accountStatusMap}></Select>
        )
      },
      {
        name: 'email',
        label: '邮箱',
        initialValue: '',
        placeholder: "请输入邮箱"
      }
    ]
  }, [])

  const onSearch = (params: any) => {
    console.log(`params`, params)
    setSearchData(params)
    setPaging({ ...paging, pageNo: 1 })
  }

  useEffect(() => {
    accountQueryMethod()
  }, [paging])

  // 查询接口
  const accountQueryMethod = async () => {
    setTableLoading(true)
    const params = { ...searchData, ...paging }
    const { data } = await accountQueryApi(params)
    console.log(`data`, data)
    if (data.code === 200) {
      setTableList(data.data)
      setPageTotal(data.total)
    }
    setTableLoading(false)
  }

  return (
    <Fragment>
      <AdvancedSearch
        formList={formList}
        onSearch={onSearch}
      />

      <AccountTable
        tableLoading={tableLoading}
        toggleModalVisibleMethod={toggleModalVisibleMethod}
        tableList={tableList}
        paging={paging}
        pageTotal={pageTotal}
        changePage={changePage}
      />

      <AccountModal
        title={modalTitle}
        visible={modalVisible}
        rowList={rowList}
        onCancel={() => { toggleModalVisibleMethod(false) }}
      />
    </Fragment>
  )
}

export default AccountsManage
