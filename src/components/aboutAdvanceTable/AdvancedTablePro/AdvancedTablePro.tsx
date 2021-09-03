import React, { Fragment } from 'react'
import AdvancedSearch, { AdvancedSearchProps } from 'components/AdvancedSearch/AdvancedSearch'
import AdvancedTable, { IAdvancedTableProps } from 'components/aboutAdvanceTable/AdvancedTable/AdvancedTable'
import AdvancedModal, { IAdvancedModalProps } from 'components/AdvancedModal/AdvancedModal'

interface IAdvancedTableProProps<RecordType> {
  serchFormOptions: AdvancedSearchProps,
  advancedTableOptions: IAdvancedTableProps<RecordType>
  advancedModalOptions: IAdvancedModalProps
}

const AdvancedTablePro = <RecordType extends object = any>(props: IAdvancedTableProProps<RecordType>) => {
  const { serchFormOptions, advancedTableOptions, advancedModalOptions } = props
  return (
    <Fragment>
      <AdvancedSearch {...serchFormOptions} />
      <AdvancedTable {...advancedTableOptions} />
      <AdvancedModal {...advancedModalOptions}/>
    </Fragment>
  )
}

export default AdvancedTablePro
