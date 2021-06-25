import React, { ReactElement, useMemo, useState, Fragment } from 'react'
import AdvancedSearch, { SearchFormItem } from 'components/AdvancedSearch/AdvancedSearch'
import RolesTable from './components/RolesTable/RolesTable'
import RolesModal from './components/RolesModal/RolesModal'
import { RolesRecord } from 'typings/AuthManage/RolesManage/RolseManage.d'

const RolesManage: React.FC = (): ReactElement => {
  // 模态框的标题
  const [modalTitle, setModalTitle] = useState<string>('创建角色配置')
  // 模态框的显示隐藏
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  // 表格编辑按钮被点击获取到的行数据
  const [rowList, setRowList] = useState<RolesRecord>()

  // 打开模态框方法
  const toggleModalVisibleMethod = (visible: boolean, title?: string, record?: RolesRecord) => {
    setModalTitle((title as string))
    setModalVisible(visible)
    setRowList((record))
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

  const onSearch = () => {

  }

  return (
    <Fragment>
      <AdvancedSearch
        formList={formList}
        onSearch={onSearch}
      />

      <RolesTable
        toggleModalVisibleMethod={toggleModalVisibleMethod}
      />

      <RolesModal
        title={modalTitle}
        visible={modalVisible}
        rowList={rowList}
        onCancel={() => { toggleModalVisibleMethod(false) }}
      />
    </Fragment>
  )
}

export default RolesManage
