import React from 'react'
import { FIRST_TYPE } from 'utils/globalConstantParams'
interface IDialogProps {
  closed: (data: any) => void // 模态框关闭按钮点击模态框关闭以后的回调函数
  confirmed: (data: any) => void // 模态框确定按钮点击模态框关闭以后的回调函数
}
/**
 *
 * @param props
 */
export const useDialog = <T>(props?: IDialogProps) => {
  const closed = props?.closed
  const confirmed = props?.confirmed

  const [modalVisible, setModalVisible] = React.useState<boolean>(false) // 模态框是否显示
  const [modalType, setModalType] = React.useState(FIRST_TYPE) // '1' 新建; '2' 编辑;
  const [modalDetail, setModalDetail] = React.useState<T>()

  // 打开弹窗
  const openModal = (title?: string, record?: T) => {
    setModalVisible(true)
    if (title) {
      setModalType(title)
    }
    if (record) {
      setModalDetail(record)
    }
  }

  // 关闭弹窗
  const closeModal = () => {
    setModalVisible(false)
  }

  // 模态框关闭按钮点击模态框关闭以后的回调函数
  const onClosed = (data?: any) => {
    closeModal()
    closed && closed(data)
  }

  // 模态框确定按钮点击模态框关闭以后的回调函数
  const onConfirmed = (data?: any) => {
    closeModal()
    confirmed && confirmed(data)
  }

  return {
    modalVisible,
    modalType,
    modalDetail,
    setModalDetail,
    openModal,
    closeModal,
    onClosed,
    onConfirmed
  }
}
