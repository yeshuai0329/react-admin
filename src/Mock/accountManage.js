var Mock = require('mockjs')
let List = []
const count = 666
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    'accountsOrder|+1': /\d{5,10}/,
    name: Mock.mock('@cname'),
    loginAccount: /\d{9,11}@qq\.com/,
    accountPassword: Mock.mock('@word(8, 16)'),
    'department|1': ['1', '2', '3', '4', '5'],
    'accountStatus|1': [0, 1],
    phoneNumber: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
    createTime: Mock.Random.datetime(),
    updateTime: Mock.Random.datetime(),
    description: Mock.mock('@cparagraph(2)')
  }))
}
module.exports = [
  {
    url: `/v1/account/query`,
    type: 'get',
    response: config => {
      const {
        accountsOrder,
        loginAccount,
        department,
        accountStatus,
        name,
        pageNo = 1,
        pageSize = 10
      } = config.query
      let mockList = List.filter(item => {
        if (accountsOrder === '' || accountsOrder === undefined || accountsOrder === null) {
          return true
        }
        return item.accountsOrder === accountsOrder
      })
      mockList = mockList.filter(item => {
        if (loginAccount === '' || loginAccount === undefined || loginAccount === null) {
          return true
        }
        return item.loginAccount === loginAccount
      })
      mockList = mockList.filter(item => {
        if (department === '' || department === undefined || department === null) {
          return true
        }
        return item.department === department
      })
      mockList = mockList.filter(item => {
        if (accountStatus === '' || accountStatus === undefined || accountStatus === null) {
          return true
        }
        return item.accountStatus === Number(accountStatus)
      })
      mockList = mockList.filter(item => {
        if (name === '' || name === undefined || name === null) {
          return true
        }
        return item.name === name
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
    url: `/v1/account/del`,
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
    url: `/v1/account/changeAccountStatus`,
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
