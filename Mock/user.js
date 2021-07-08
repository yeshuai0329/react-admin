var Mock = require('mockjs')
const List = []
const count = 888
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    key: '@increment()'

  }))
}

module.exports = [
  {
    url: `/api/v1/user/login`,
    type: 'post',
    response: config => {
      if (config.body?.username === 'admin' && config.body?.password === 'admin') {
        return {
          code: 200,
          data: {
            id: '1',
            username: 'admin',
            password: 'admin',
            Avatar: "https://avatars.githubusercontent.com/u/67174937?s=400&u=40aca279b633a3bdcff7dc99be16357128c9974f&v=4",
            token: "ABCDEFG"
          }
        }
      } else {
        return {
          code: 100,
          message: '账号或者密码错误',
          data: {

          }
        }
      }
    }
  },
  {
    url: `/api/v1/user/authinfo`,
    type: 'post',
    response: config => {
      if (config.body?.token === 'ABCDEFG') {
        return {
          code: 200,
          data: {
            authMenu: [
              {
                menuDefaultName: "首页",
                menuNameId: "pages.menu.home",
                menuId: 1,
                menuPId: "",
                menuType: 2,
                path: "/home",
                Ppath: "",
                icon: "HomeOutlined",
                auth: true,
                component: "home"
              },
              {
                menuDefaultName: "DashBoard",
                menuNameId: "pages.menu.dashboard",
                menuId: 2,
                menuPId: "",
                menuType: 1,
                path: "/dashboard",
                Ppath: "",
                icon: "DashboardOutlined",
                auth: true,
                component: "",
                children: [
                  {
                    menuDefaultName: "分析页",
                    menuNameId: "pages.menu.dashboard.analysis",
                    menuId: 3,
                    menuPId: 2,
                    menuType: 2,
                    path: "/dashboard/analysis",
                    Ppath: "/dashboard",
                    icon: "PieChartOutlined",
                    auth: true,
                    component: "analysis"
                  },
                  {
                    menuDefaultName: "监控页",
                    menuNameId: "pages.menu.dashboard.monitor",
                    menuId: 4,
                    menuPId: 2,
                    menuType: 2,
                    path: "/dashboard/monitor",
                    Ppath: "/dashboard",
                    icon: "DesktopOutlined",
                    auth: true,
                    component: "monitor"
                  }
                ]
              },
              {
                menuDefaultName: "权限管理",
                menuNameId: "pages.menu.auth",
                menuId: 5,
                menuPId: "",
                menuType: 1,
                path: "/auth",
                Ppath: "",
                icon: "FolderOpenFilled",
                auth: true,
                component: "",
                children: [
                  {
                    menuDefaultName: "角色管理",
                    menuNameId: "pages.menu.auth.rolesmanage",
                    menuId: 6,
                    menuPId: 5,
                    menuType: 2,
                    path: "/auth/rolesmanage",
                    Ppath: "/auth",
                    icon: "UsergroupAddOutlined",
                    auth: true,
                    component: "rolesmanage"
                  },
                  {
                    menuDefaultName: "账号管理",
                    menuNameId: "pages.menu.auth.accountsmanage",
                    menuId: 7,
                    menuPId: 5,
                    menuType: 2,
                    path: "/auth/accountsmanage",
                    Ppath: "/auth",
                    icon: "AccountBookOutlined",
                    auth: true,
                    component: "accountsmanage"
                  },
                  {
                    menuDefaultName: "菜单管理",
                    menuNameId: "pages.menu.auth.menusmanage",
                    menuId: 8,
                    menuPId: 5,
                    menuType: 2,
                    path: "/auth/menusmanage",
                    Ppath: "/auth",
                    icon: "MenuOutlined",
                    auth: true,
                    component: "menusmanage"
                  }
                ]
              },
              {
                menuDefaultName: "系统管理",
                menuNameId: "pages.menu.system",
                menuId: 9,
                menuPId: "",
                menuType: 1,
                path: "/system",
                Ppath: "",
                icon: "SettingFilled",
                auth: true,
                component: "",
                children: [
                  {
                    menuDefaultName: "系统配置",
                    menuNameId: "pages.menu.system.systemconfig",
                    menuId: 10,
                    menuPId: 9,
                    menuType: 2,
                    path: "/system/systemconfig",
                    Ppath: "/system",
                    icon: "LayoutFilled",
                    auth: true,
                    component: "systemconfig"
                  }
                ]
              }
            ],
            authButton: [
              { id: '11', authName: "HOME_ADD" },
              { id: '12', authName: "HOME_EDIT" },
              { id: '13', authName: "HOME_DEL" },
              { id: '21', authName: "ROLES_ADD" },
              { id: '22', authName: "ROLES_EDIT" },
              { id: '23', authName: "ROLES_DEL" },
              { id: '24', authName: "ROLES_EXPORT" },
              { id: '31', authName: "ACCOUNT_ADD" },
              { id: '32', authName: "ACCOUNT_EDIT" },
              { id: '33', authName: "ACCOUNT_DEL" },
              { id: '34', authName: "ACCOUNT_EXPORT" }
            ]
          }
        }
      } else {
        return {
          code: 101,
          data: {}
        }
      }
    }
  }
]
