import React, { useState } from 'react'
import { Select } from 'antd'
import { AdvancedSearchProps } from 'components/AdvancedSearch/AdvancedSearch'
import { rolesStatusMap } from './constantParams'

interface IOptions {
  changePage: (page: number, pageSize?: number | undefined) => void
}
export const useSearchFormOptions = ({ changePage }: IOptions) => {
  const [searchData, setSearchData] = useState({
    roleName: '',
    authCharacter: '',
    roleStatus: ''
  }) // 高级搜索查询参数
  const serchFormOptions: AdvancedSearchProps = {
    formList: [
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
        label: '角色状态',
        shouldUpdate: true,
        render: <Select options={rolesStatusMap} />
      }
    ],
    onSearch: res => {
      setSearchData(res)
      changePage(1)
    }
  }

  return {
    serchFormOptions,
    searchData
  }
}
