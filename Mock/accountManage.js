var Mock = require('mockjs')
const List = []
const count = 666
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    'accountsOrder|+1': /\d{5,10}/,
    loginAccount: Mock.mock('@email'),
    accountPassword: Mock.mock('@word(8, 16)'),
    'department|1': ['1', '2', '3', '4', '5'],
    'accountStatus|1': [0, 1],
    phoneNumber: 15526190820,
    email: Mock.mock('@email'),
    createTime: Mock.Random.datetime(),
    updateTime: Mock.Random.datetime(),
    description: Mock.mock('@cparagraph(2)')
  }))
}

module.exports = [
  {
    url: `/api/v1/account/query`,
    type: 'get',
    response: config => {
      const {
        accountsOrder,
        loginAccount,
        department,
        accountStatus,
        email,
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
        console.log(`accountStatus`, accountStatus)
        return item.accountStatus === Number(accountStatus)
      })
      mockList = mockList.filter(item => {
        if (email === '' || email === undefined || email === null) {
          return true
        }
        return item.email === email
      })
      const pageList = mockList.filter((item, index) => index < pageSize * pageNo && index >= pageSize * (pageNo - 1))
      return {
        code: 200,
        total: mockList.length,
        data: pageList
      }
    }
  }
]
