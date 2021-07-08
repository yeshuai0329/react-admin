import React from 'react'
import { Modal } from 'antd'
import { IAccountModal } from 'typings/AuthManage/AccountsManage/AccountsManage.d'

const AccountModal = (props: IAccountModal) => {
  return (
    <Modal
      {...props}
    >

    </Modal>
  )
}

export default AccountModal
