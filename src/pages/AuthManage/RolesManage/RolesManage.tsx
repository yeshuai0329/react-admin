import React, { ReactElement } from 'react'
import { Input } from 'antd'
import { RolesRecord, titleMap } from 'typings/rolesManage.d'
import AdvancedTablePro from 'components/aboutAdvanceTable/AdvancedTablePro/AdvancedTablePro'
import { IAdvancedTableProps } from 'components/aboutAdvanceTable/AdvancedTable/AdvancedTable'
import { usePaging, useRowSelection } from 'publicHooks/tableHooks/tableHooks'
import { rolesQueryApi } from 'api/rolesManage/rolesManage'
import { IAdvancedModalProps } from 'components/AdvancedModal/AdvancedModal'
import { useAboutRolesTable } from './service/aboutTable'
import { useSearchFormOptions } from './service/aboutSearchForm'
import { useDialog } from 'publicHooks/modalHooks/modalHooks'
import { useQueryDataList } from 'publicHooks/apiHooks/apiHooks'

const RolesManage: React.FC = (): ReactElement => {
  const {
    paging, // 分页数据
    changePage // 改变分页的方法
  } = usePaging() // 分页的自定义hook
  const { modalVisible, modalType, modalDetail, openModal, closeModal } = useDialog<RolesRecord>()
  const { checkedRowKeys, checkedRows, rowSelection } = useRowSelection<RolesRecord>('rolesOrder')

  // ----------- 高级搜索相关
  const { serchFormOptions, searchData } = useSearchFormOptions({ changePage })

  // ----------- 查询数据Api
  const { queryLoading, tableList, pageTotal } = useQueryDataList(searchData, paging, rolesQueryApi)

  // ----------- 高级表格相关
  const { rolesColumns, authActions } = useAboutRolesTable({
    openModal,
    checkedRowKeys,
    checkedRows
  })

  const advanceTableOptions: IAdvancedTableProps<RolesRecord> = {
    authActions: authActions,
    dataSource: tableList,
    columns: rolesColumns,
    rowSelection: rowSelection,
    loading: queryLoading,
    paging: paging,
    changePage,
    pageTotal,
    canConfig: true,
    rowKey: record => {
      return record.rolesOrder
    }
  }

  // ----------- 高级模态框相关
  const advancedModalOptions: IAdvancedModalProps = {
    modalOptions: {
      visible: modalVisible,
      title: titleMap[modalType],
      modalDetail: modalDetail,
      onCancel: () => {
        closeModal()
      },
      confirmed: () => {
        closeModal()
      }
    },
    formOptions: {
      modalFormList: [
        {
          name: 'userName',
          label: '用户名',
          render: <Input />
        }
      ]
    }
  }

  return (
    <div style={{ background: '#fff', padding: 16 }}>
      <AdvancedTablePro
        serchFormOptions={serchFormOptions}
        advancedTableOptions={advanceTableOptions}
        advancedModalOptions={advancedModalOptions}
      />
    </div>
  )
}

export default RolesManage
