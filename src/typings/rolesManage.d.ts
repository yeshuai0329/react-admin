import { ModalProps } from 'antd'

export interface RolesRecord {
  rolesOrder: number,
  rolesName: string,
  authCharacter: string,
  rolesStatus: number,
  createBy: number,
  description?: string
}

// 角色管理Table
export const titleMap: {[key:string]: string} = {
  1: '创建角色',
  2: '编辑角色',
}

interface IRolesTable {
  toggleModalVisibleMethod: (visible: boolean, title?: string | undefined, record?: RolesRecord | undefined) => void
}

// 角色管理模态框
export interface IRolesModal extends ModalProps {
  rowList?: RolesRecord
}