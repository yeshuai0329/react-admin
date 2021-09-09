import { init } from "locales"

// 账号管理Table
export const titleMap: {[key:string]: string} = {
  1: '创建账号',
  2: '编辑账号'
}

export const departmentMap: {value: string, label: string}[] = [
  { value: '', label: init('page.common.all') },
  { value: '1', label: init('page.common.adminDepartment') },
  { value: '2', label: init('page.common.financeDepartment') },
  { value: '3', label: init('page.common.R&Ddepartment') },
  { value: '4', label: init('page.common.salesDepartment') },
  { value: '5', label: init('page.common.publicDepartment') }
]

export const accountStatusMap: {value: string | number, label: string}[] = [
  { value: '', label: init('page.common.all') },
  { value: 0, label: init('page.common.disable') },
  { value: 1, label: init('page.common.enable') }
]
