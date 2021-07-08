var Mock = require('mockjs')
const List = []
const count = 888
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    'accountsOrder|+1': /\d{5,10}/,
    loginAccount: Mock.mock('@email'),
    accountPassword: Mock.mock('@word(8, 16)'),
    'department|1': [1, 2, 3, 4],
    'accountsStatus|1': [0, 1],
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
      console.log(`config`, config)
      if (config) {
        return {
          code: 200,
          data: List
        }
      } else {
        return {
          code: 100,
          message: '账号或者密码错误',
          data: []
        }
      }
    }
  }
]
