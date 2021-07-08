import React, { ReactElement } from 'react'
import { Modal } from 'antd'
import { IRolesModal } from 'typings/AuthManage/RolesManage/RolseManage.d'

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
