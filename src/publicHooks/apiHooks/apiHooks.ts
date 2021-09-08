import { useState, useEffect } from 'react'
import { AxiosPromise } from 'axios'

/**
 *
 * @param params 查询参数和分页
 * @param action 查询方法
 * @returns
 */
export const useQueryDataList = (params: any, paging: any, action: (params: any) => AxiosPromise<any>) => {
  const [queryLoading, setQueryLoading] = useState(false)
  const [tableList, setTableList] = useState()
  const [pageTotal, setPageTotal] = useState()

  useEffect(() => {
    setQueryLoading(true)
    action({ ...params, ...paging })
      .then(res => {
        setTableList(res.data.data)
        setPageTotal(res.data.total)
        setQueryLoading(false)
      })
  }, [paging])

  return {
    queryLoading,
    tableList,
    pageTotal
  }
}
