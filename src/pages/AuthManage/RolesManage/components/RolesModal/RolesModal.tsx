import React, { ReactElement } from 'react'
import { Modal, ModalProps } from 'antd'
import { RolesRecord } from 'typings/AuthManage/RolesManage/RolseManage'

interface IRolesModal extends ModalProps {
  rowList?: RolesRecord
}
const RolesModal: React.FC<IRolesModal> = (props): ReactElement => {
  const { ...remainProps } = props
  return (
    <Modal
      {...remainProps}
    >

    </Modal>
  )
}

export default RolesModal
