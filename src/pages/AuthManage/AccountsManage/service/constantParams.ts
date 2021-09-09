import { init } from "locales"

// 账号管理Table
export const titleMap: {[key:string]: string} = {
  1: init('page.table.columns.newCreateAccount'),
  2: init('page.table.columns.editAccount')
}

export const departmentMap: {value: string, label: string}[] = [
  { value: '', label: init('page.common.all') },
  { value: '1', label: init('page.searchForm.adminDepartment') },
  { value: '2', label: init('page.searchForm.financeDepartment') },
  { value: '3', label: init('page.searchForm.R&Ddepartment') },
  { value: '4', label: init('page.searchForm.salesDepartment') },
  { value: '5', label: init('page.searchForm.publicDepartment') }
]

export const accountStatusMap: {value: string | number, label: string}[] = [
  { value: '', label: init('page.common.all') },
  { value: 0, label: init('page.common.disable') },
  { value: 1, label: init('page.common.enable') }
]
