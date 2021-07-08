import React, { useState, Key } from 'react'
import { Table } from 'antd'
import { ColumnsType, ExpandableConfig, TableRowSelection } from 'antd/lib/table/interface'
import moment from 'moment'

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
  // 创建时间渲染函数
  const renderCreateTime = (value: number) => {
    return moment(value).format('YYYY-MM-DD HH:mm:ss')
  }

  // 更新时间渲染函数
  const renderUpdateTime = (value: number) => {
    return moment(value).format('YYYY-MM-DD HH:mm:ss')
  }
  const commonColumns: ColumnsType<T> = [
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      width: 200,
      render: renderCreateTime
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      align: 'center',
      width: 200,
      render: renderUpdateTime
    }
  ]
  return commonColumns
}
