import React, { ReactElement, useMemo, useState, Fragment, useEffect } from 'react'
import AdvancedSearch, { SearchFormItem } from 'components/AdvancedSearch/AdvancedSearch'
import AccountTable from './components/AccountTable/AccountTable'
import AccountModal from './components/AccountModal/AccountModal'
import { AccountRecord, titleMap } from 'typings/AuthManage/AccountsManage/AccountsManage.d'
import { accountQueryApi } from 'api/AccountsManage/AccountsManage'

const RolesManage: React.FC = (): ReactElement => {
  // 模态框的标题
  const [modalTitle, setModalTitle] = useState<string>(titleMap[1])
  // 模态框的显示隐藏
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  // 表格编辑按钮被点击获取到的行数据
  const [rowList, setRowList] = useState<AccountRecord>()
  // 高级搜索查询参数
  const [searchData, setSearchData] = useState({ account: 850360 })
  // 高级搜索查询参数
  const [tableList, setTableList] = useState<AccountRecord[] | never[]>([])

  // 打开模态框方法
  const toggleModalVisibleMethod = (visible: boolean, title?: string, record?: AccountRecord) => {
    setModalTitle((title as string))
    setModalVisible(visible)
    setRowList(record)
  }

  const formList: SearchFormItem[] = useMemo(() => {
    return [
      {
        name: 'roleName',
        label: '角色名称'
      },
      {
        name: 'authCharacter',
        label: '权限字符'
      },
      {
        name: 'roleStatus',
        label: '角色状态'
      }
    ]
  }, [])

  const onSearch = (params: any) => {
    setSearchData(params)
  }

  useEffect(() => {
    accountQueryMethod()
  }, [])
  // 查询接口
  const accountQueryMethod = async () => {
    const { data } = await accountQueryApi(searchData)
    console.log(`data`, data)
    if (data.code === 200) {
      setTableList(data.data)
    }
  }

  return (
    <Fragment>
      <AdvancedSearch
        formList={formList}
        onSearch={onSearch}
      />

      <AccountTable
        toggleModalVisibleMethod={toggleModalVisibleMethod}
        tableList={tableList}
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

export default RolesManage
