import { ModalProps } from 'antd'

export interface AccountRecord {
  accountsOrder: number,
  loginAccount: string,
  accountPassword: string,
  department: number[],
  accountsStatus: number,
  phoneNumber: number,
  email: string,
  createTime: number,
  updateTime: number,
  description?: string
}

// 账号管理Table
export const titleMap: {[key:string]: string} = {
  1: '创建账号',
  2: '编辑账号',
}

export const departmentMap: {value: string, label: string}[] = [
  {value: '',label: '全部'},
  {value: '1',label: '行政部门'},
  {value: '2',label: '财务部门'},
  {value: '3',label: '研发部门'},
  {value: '4',label: '销售部门'},
  {value: '5',label: '公关部门'}
]

export const accountStatusMap: {value: string, label: string}[] = [
  {value: '',label: '全部'},
  {value: '0',label: '已禁用'},
  {value: '1',label: '已启用'},
]

interface IAccountTable {
  toggleModalVisibleMethod: (visible: boolean, title?: string | undefined, record?: AccountRecord | undefined) => void
  tableList: AccountRecord[] | never[]
  paging: { pageNo: number, pageSize: number },
  pageTotal: number
  changePage:(page: number, pageSize?: number | undefined) => void
}

// 账号管理模态框
export interface IAccountModal extends ModalProps {
  rowList?: AccountRecord
}