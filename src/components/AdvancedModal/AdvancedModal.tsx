import React from 'react'
import { Modal, Form, ModalProps, FormProps, FormItemProps } from 'antd'

interface IFormItemProps extends FormItemProps {
  render?: React.ReactElement,
}

export interface IFormProps extends FormProps {
  modalFormList?: IFormItemProps[]
}

export interface IModalProps extends ModalProps {
  modalDetail?: {[key: string] : any},
  confirmed?: (value: any) => void
}

export interface IAdvancedModalProps {
  modalOptions: IModalProps,
  formOptions: IFormProps
}

const AdvancedModal = (props: IAdvancedModalProps) => {
  const { modalOptions, formOptions } = props
  const { confirmed, ...surplusModalOptions } = modalOptions
  const { modalFormList, ...surplusFormOptions } = formOptions

  const [form] = Form.useForm()

  const onOk = () => {
    form.validateFields()
      .then(values => {
        confirmed && confirmed(values)
      })
      .catch(info => {
        console.log(`info`, info)
      })
  }

  return (
    <Modal
      onOk={onOk}
      {...surplusModalOptions}
    >
      <Form
        form={form}
        {...surplusFormOptions}
      >
        {
          modalFormList && modalFormList.map((item: any, index:number) => {
            return (
                  <Form.Item
                    key={item.name}
                    {...item}
                  >
                    {
                      item.render
                    }
                  </Form.Item>
            )
          })
        }
      </Form>
    </Modal>
  )
}

export default AdvancedModal
