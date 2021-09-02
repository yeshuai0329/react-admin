import { ModalProps } from 'antd'

export interface AccountRecord {
  accountsOrder: string,
  name: string,
  loginAccount: string,
  accountPassword: string,
  department: string[],
  accountStatus: number,
  phoneNumber: string,
  belongToRoles: string[],
  createTime: number,
  updateTime: number,
  description?: string
}

interface IAccountTable{
  toggleModalVisibleMethod: (visible: boolean, title?: string | undefined, record?: AccountRecord | undefined) => void
  tableList: AccountRecord[] | never[],
  pageTotal: number,
  changePage:(page: number, pageSize?: number | undefined) => void,
  tableLoading: boolean,
  accountQueryMethod: () => Promise<void>
}

// 账号管理模态框
export interface IAccountModal extends ModalProps {
  detail?: AccountRecord
}