var Mock = require('mockjs')
let List = []
const count = 30
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    'rolesOrder|+1': /\d{5,10}/,
    rolesName: `超级管理员${i}`,
    authCharacter: `admin${i}`,
    'rolesStatus|1': [0, 1],
    createBy: Mock.Random.datetime(),
    description: Mock.mock('@cparagraph(2)')
  }))
}

module.exports = [
  {
    url: '/v1/roles/query',
    type: 'get',
    response: config => {
      const {
        roleName,
        authCharacter,
        roleStatus,
        pageNo = 1,
        pageSize = 10
      } = config.query
      let mockList = List.filter(item => {
        if (roleName === '' || roleName === undefined || roleName === null) {
          return true
        }
        return item.roleName === roleName
      })
      mockList = mockList.filter(item => {
        if (authCharacter === '' || authCharacter === undefined || authCharacter === null) {
          return true
        }
        return item.authCharacter === authCharacter
      })
      mockList = mockList.filter(item => {
        if (roleStatus === '' || roleStatus === undefined || roleStatus === null) {
          return true
        }
        return item.roleStatus === roleStatus
      })

      const pageList = mockList.filter((item, index) => index < pageSize * pageNo && index >= pageSize * (pageNo - 1))

      return {
        code: 200,
        total: mockList.length,
        data: pageList
      }
    }
  },
  {
    url: '/v1/roles/del',
    type: 'delete',
    response: config => {
      const paramsData = config.body
      const mockList = List.filter(item => {
        return !paramsData.includes(item.accountsOrder)
      })
      List = mockList
      return {
        code: 200,
        data: []
      }
    }
  },
  {
    url: '/v1/roles/changerolesstatus',
    type: 'post',
    response: config => {
      const paramsData = config.body
      const mockList = List.filter(item => {
        if (item.accountsOrder === paramsData.accountsOrder) {
          item.accountStatus = paramsData.accountStatus
        }
        return item.accountsOrder === paramsData.accountsOrder
      })
      if (mockList.length === 0) {
        return {
          code: 1001,
          data: []
        }
      } else if (mockList.length === 1) {
        return {
          code: 200,
          data: mockList
        }
      } else {
        return {
          code: 1002,
          data: mockList
        }
      }
    }
  }
]
