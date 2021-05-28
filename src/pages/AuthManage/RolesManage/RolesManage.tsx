import React, { ReactElement, useMemo } from 'react'
import AdvancedSearch from 'components/AdvancedSearch/AdvancedSearch'
import { Col, Row } from 'antd'
import RolesTable from './components/RolesTable/RolesTable'
const RolesManage: React.FC = (): ReactElement => {
  const formList = useMemo(() => {
    return [
      {
        name: 'roleName',
        label: '角色名称'
      },
      {
        name: 'authCharacter',
        label: '权限字符'
      },
      {
        name: 'roleStatus',
        label: '角色状态'
      },
      {
        name: 'asd',
        label: '角色状态'
      },
      {
        name: 'res',
        label: '角色状态'
      }
    ]
  }, [])

  const onSearch = () => {

  }

  return (
    <Row gutter={[0, 16]}>
      <Col span={24}>
        <AdvancedSearch
          formList={formList}
          onSearch={onSearch}
        />
      </Col>
      <Col span={24}>
        <RolesTable

        />
      </Col>
    </Row>
  )
}

export default RolesManage
