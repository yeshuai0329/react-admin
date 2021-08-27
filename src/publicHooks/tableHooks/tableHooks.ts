import React, { useState, Key } from 'react'
import { Table } from 'antd'
import { ColumnsType, ExpandableConfig, TableRowSelection } from 'antd/lib/table/interface'
import moment from 'moment'
import { scrollIntoView } from 'utils/public'

/**
 * @description 表格选择行配置项
 */
export const useRowSelection = <T>() => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const [selectedRows, setSelectedRows] = useState<T[]>([])

  const rowSelection: TableRowSelection<T> | undefined = {
    selectedRowKeys,
    fixed: true,
    onChange: (selectedRowKeys: React.Key[], selectedRows: T[]) => {
      setSelectedRowKeys(selectedRowKeys)
      setSelectedRows(selectedRows)
    },
    columnWidth: 64,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE
    ],
    type: 'checkbox'
  }

  return {
    selectedRowKeys,
    selectedRows,
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
