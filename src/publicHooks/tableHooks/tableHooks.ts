import { useState, Key } from 'react'
import { ColumnsType, ExpandableConfig, TableRowSelection } from 'antd/lib/table/interface'
import moment from 'moment'
import { scrollIntoView } from 'utils/public'

/**
 * @description 表格选择行配置项
 */
export const useRowSelection = <T>(keyID: string) => {
  const [checkedRowKeys, setCheckedRowKeys] = useState<Key[]>([])
  const [checkedRows, setCheckedRows] = useState<T[]>([])

  const rowSelection: TableRowSelection<T> | undefined = {
    selectedRowKeys: checkedRowKeys,
    fixed: true,
    onSelect: (record, selected, selectedRow) => {
      if (selected) {
        // 添加
        // @ts-ignore
        setCheckedRowKeys([...checkedRowKeys, record[keyID]])
        setCheckedRows([...checkedRows, record])
      } else {
        // @ts-ignore
        const subCheckedKeys = checkedRowKeys.filter((item: Key) => item !== record[keyID])
        // @ts-ignore
        const subCheckedRows = checkedRows.filter((item: T) => item[keyID] !== record[keyID])
        setCheckedRowKeys(subCheckedKeys)
        setCheckedRows(subCheckedRows)
      }
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      if (selected) {
        const addCheckedKeys = changeRows.map((item: T) => {
          // @ts-ignore
          return item[keyID]
        })
        setCheckedRowKeys([...checkedRowKeys, ...addCheckedKeys])
        setCheckedRows([...checkedRows, ...changeRows])
      } else {
        const subCheckedKeys = checkedRowKeys.filter((ite: Key) => {
          return !changeRows.some((item: T) => {
            // @ts-ignore
            return item[keyID] === ite
          })
        })
        const subCheckedRows = checkedRows.filter((ite: any) => {
          return !changeRows.some((item: T) => {
            // @ts-ignore
            return item[keyID] === ite[keyID]
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
      if (pageSize) {
        setPaging({ ...paging, pageNo: page, pageSize: (pageSize as number) })
      } else {
        setPaging({ ...paging, pageNo: page })
      }
    })
  }

  /**
   *  刷新页面请求的方法
   */

  const resetPage = () => {
    setPaging({ ...paging })
  }
  return {
    paging,
    changePage,
    resetPage
  }
}
