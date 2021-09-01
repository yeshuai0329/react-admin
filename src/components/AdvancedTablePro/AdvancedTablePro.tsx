import React, { Fragment } from 'react'
import AdvancedSearch, { AdvancedSearchProps } from 'components/AdvancedSearch/AdvancedSearch'
import AdvancedTable, { IAdvancedTableProps } from 'components/AdvancedTable/AdvancedTable'

interface IAdvancedTableProProps<RecordType> {
  serchFormOptions: AdvancedSearchProps,
  advanceTableOptions: IAdvancedTableProps<RecordType>
}

const AdvancedTablePro = <RecordType extends object = any>(props: IAdvancedTableProProps<RecordType>) => {
  const { serchFormOptions, advanceTableOptions } = props
  return (
    <Fragment>
      {/* 高级搜索 */}
      <AdvancedSearch
        {...serchFormOptions}
      />
      {/* 高级表格 */}
      <AdvancedTable
        {...advanceTableOptions}
      />
      {/* Modal */}
    </Fragment>
  )
}

export default AdvancedTablePro
