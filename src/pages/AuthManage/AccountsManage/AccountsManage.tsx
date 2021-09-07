import React, { ReactElement, useMemo, useState, Fragment, useEffect } from 'react'
import AdvancedSearch, { SearchFormItem } from 'components/AdvancedSearch/AdvancedSearch'
import AccountTable from './components/AccountTable/AccountTable'
import AccountModal from './components/AccountModal/AccountModal'
import { AccountRecord } from 'typings/accountsManage'
import { accountQueryApi } from 'api/AccountsManage/AccountsManage'
import { InputNumber, Select } from 'antd'
import { usePaging } from '../../../publicHooks/tableHooks/tableHooks'
import { FIRST_TYPE } from 'utils/globalConstantParams'
import {
  titleMap,
  departmentMap,
  accountStatusMap
} from 'pages/AuthManage/AccountsManage/service/constantParams'

const AccountsManage: React.FC = (): ReactElement => {
  const [modalTitle, setModalTitle] = useState<string>(titleMap[FIRST_TYPE]) // 新建或者编辑的模态框的标题
  const [modalVisible, setModalVisible] = useState<boolean>(false) // 模态框的显示隐藏
  const [rowList, setRowList] = useState<AccountRecord>() // 表格编辑按钮被点击获取到的行数据
  const [tableLoading, setTableLoading] = useState<boolean>(false) // 表格loading
  const { paging, changePage } = usePaging() // 分页的自定义hook
  const [pageTotal, setPageTotal] = useState<number>(0) // 表格页数
  const [tableList, setTableList] = useState<AccountRecord[] | never[]>([]) // 表格数据
  const [searchData, setSearchData] = useState({
    accountsOrder: '',
    loginAccount: '',
    department: '',
    accountStatus: '',
    email: ''
  }) // 高级搜索查询参数

  /**
   * 查询表格数据的接口
   */
  const accountQueryMethod = async () => {
    setTableLoading(true)
    const params = { ...searchData, ...paging }
    console.log(`params`, params)
    const { data } = await accountQueryApi(params)
    console.log(`data`, data)
    if (data.code === 200) {
      setTableList(data.data)
      setPageTotal(data.total)
    }
    setTableLoading(false)
  }

  // 刷新页面查询表格数据,分页改变的时候,查询表格数据
  useEffect(() => {
    accountQueryMethod()
  }, [paging])

  /**
   * 新建和编辑打开模态框方法
   * @param {boolean} visible 控制模态框显示隐藏
   * @param title 模态框新建还是编辑
   * @param record 点击新建和编辑的时候可能需要传递的表格行数据
   */
  const toggleModalVisibleMethod = (visible: boolean, title?: string, record?: AccountRecord) => {
    setModalVisible(visible)
    setModalTitle((title as string))
    setRowList(record)
  }

  // 高级搜索 - 搜索条件
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
      }
    ]
  }, [])

  /**
   * 高级搜索栏 - 搜索按钮事件
   * @param params 搜索查询参数
   */
  const onSearch = (params: any) => {
    setSearchData(params)
    changePage(1)
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
        pageTotal={pageTotal}
        paging={paging}
        changePage={changePage}
        accountQueryMethod={accountQueryMethod}
      />

      <AccountModal
        title={modalTitle}
        visible={modalVisible}
        detail={rowList}
        onCancel={() => { toggleModalVisibleMethod(false) }}
      />
    </Fragment>
  )
}

export default AccountsManage
