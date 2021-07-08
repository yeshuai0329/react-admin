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

interface IAccountTable {
  toggleModalVisibleMethod: (visible: boolean, title?: string | undefined, record?: AccountRecord | undefined) => void
}

// 账号管理模态框
export interface IAccountModal extends ModalProps {
  rowList?: AccountRecord
}