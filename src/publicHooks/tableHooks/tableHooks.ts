import { useState, Key } from 'react'
// import { Table } from 'antd'
import { ColumnsType, ExpandableConfig, TableRowSelection } from 'antd/lib/table/interface'
import moment from 'moment'
import { scrollIntoView } from 'utils/public'

/**
 * @description 表格选择行配置项
 */
export const useRowSelection = <T>() => {
  const [checkedRowKeys, setCheckedRowKeys] = useState<Key[]>([])
  const [checkedRows, setCheckedRows] = useState<T[]>([])

  const rowSelection: TableRowSelection<T> | undefined = {
    selectedRowKeys: checkedRowKeys,
    fixed: true,
    onSelect: (record, selected, selectedRow) => {
      if (selected) {
        // 添加
        // @ts-ignore
        setCheckedRowKeys([...checkedRowKeys, record.accountsOrder])
        setCheckedRows([...checkedRows, record])
      } else {
        // @ts-ignore
        const subCheckedKeys = checkedRowKeys.filter((item: Key) => item !== record.accountsOrder)
        // @ts-ignore
        const subCheckedRows = checkedRows.filter((item: T) => item.accountsOrder !== record.accountsOrder)
        setCheckedRowKeys(subCheckedKeys)
        setCheckedRows(subCheckedRows)
      }
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      if (selected) {
        const addCheckedKeys = changeRows.map((item: T) => {
          // @ts-ignore
          return item.accountsOrder
        })
        setCheckedRowKeys([...checkedRowKeys, ...addCheckedKeys])
        setCheckedRows([...checkedRows, ...changeRows])
      } else {
        const subCheckedKeys = checkedRowKeys.filter((ite: Key) => {
          return !changeRows.some((item: T) => {
            // @ts-ignore
            return item.accountsOrder === ite
          })
        })
        const subCheckedRows = checkedRows.filter((ite: any) => {
          return !changeRows.some((item: T) => {
            // @ts-ignore
            return item.accountsOrder === ite.accountsOrder
          })
        })
        setCheckedRowKeys(subCheckedKeys)
        setCheckedRows(subCheckedRows)
      }
    },
    columnWidth: 64,
    // selections: [
    //   Table.SELECTION_ALL,
    //   Table.SELECTION_INVERT,
    //   Table.SELECTION_NONE
    // ],
    type: 'checkbox'
  }

  return {
    checkedRowKeys,
    checkedRows,
    setCheckedRowKeys,
    setCheckedRows,
    rowSelection
  }
}

/**
 * @description 表格展开配置项
 */
export const useExpandable = <T>(expandedRowRender?: any) => {
  const expandable: ExpandableConfig<T> | undefined = {
    fixed: 'left',
    expandedRowRender: expandedRowRender
  }
  return expandable
}

/**
 * 公共表格列
 */
export const useCommonColumns = <T>() => {
  // 时间渲染函数
  const renderTime = (value: number) => {
    return moment(value).format('YYYY-MM-DD HH:mm:ss')
  }

  const commonColumns: ColumnsType<T> = [
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      width: 200,
      render: renderTime
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      align: 'center',
      width: 200,
      render: renderTime
    }
  ]
  return commonColumns
}

/**
 * 分页hooks
 */
export const usePaging = () => {
  const [paging, setPaging] = useState<{ pageNo: number, pageSize: number}>({
    pageNo: 1,
    pageSize: 10
  })
  /**
  * @description: 改变分页的方法
  * */
  const changePage = (page: number, pageSize?: number | undefined) => {
    scrollIntoView('#scrollTop')
    setTimeout(() => {
      setPaging({ ...paging, pageNo: page, pageSize: (pageSize as number) })
    })
  }
  return {
    paging,
    changePage
  }
}
