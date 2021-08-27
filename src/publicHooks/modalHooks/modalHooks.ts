import React from 'react'

interface IDialogProps {
  closed: (data: any) => void // 模态框关闭按钮点击模态框关闭以后的回调函数
  confirmed: (data: any) => void // 模态框确定按钮点击模态框关闭以后的回调函数
}
/**
 *
 * @param props
 */
export const useDialog = (props?: IDialogProps) => {
  const closed = props?.closed
  const confirmed = props?.confirmed

  const [visible, setVisible] = React.useState<boolean>(false)
  // 打开弹窗
  const openModal = () => {
    setVisible(true)
  }

  // 关闭弹窗
  const closeModal = () => {
    setVisible(false)
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
    visible,
    openModal,
    closeModal,
    onClosed,
    onConfirmed
  }
}
