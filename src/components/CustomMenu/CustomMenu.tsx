import React from 'react'
import { Menu } from 'antd'
import * as Icon from '@ant-design/icons'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router'
import { LangMessage } from 'components/LangMessage/LangMessage'
import CustomLogo from 'components/CustomLogo/CustomLogo'

const { SubMenu } = Menu
type PropsMenu = React.ComponentProps<typeof Menu>
interface IProps extends PropsMenu {
  menuList: any[],
  siderMenuIshHasLogo?: boolean,
  MenuIshHasLogo: boolean
}

/**
 * @description: 基于antd封装递归菜单
 * @param {*} props
 * @return {*}
 */
const CustomMenu: React.FC<IProps> = (props) => {
  const { menuList, siderMenuIshHasLogo, MenuIshHasLogo, mode, ...remainProps } = props

  const localtion = useLocation()
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([])
  const [openKeys, setOpenKeys] = React.useState<string[]>([])

  React.useEffect(() => {
    setSelectedKeys([localtion.pathname])
    setOpenKeys(findAllParent(menuList, localtion.pathname))
  }, [localtion])

  /**
 * @description: 查找localtion.pathname的所有父级
 * @param {*}
 * @return {*}
 */
  const findAllParent = (menuList: any, path: string) => {
    // 返回数据集合
    let temp: string[] = []
    const recursion = (menuList: any, path: string) => {
      if (menuList.length === 0) {
        return temp
      }
      for (var i = 0, length = menuList.length; i < length; i++) {
        var node = menuList[i]
        if (node.path === path) {
          if (node.Ppath) {
            temp.unshift(node.Ppath)
            recursion(menuList, node.Ppath)
          }
          break
        } else {
          if (node.children && node.children.length) {
            recursion(node.children, path)
          }
        }
      }
      return temp
    }
    temp = recursion(menuList, path)
    return temp
  }

  /**
   * 菜单栏递归函数
   */
  const createMenu = (menuList: any[]) => {
    return menuList.map((menu: any) => {
      // @ts-ignorets
      const iconfont = menu.icon ? React.createElement(Icon[menu.icon]) : ''
      if (menu.children && menu.children.length) {
        return (
          <SubMenu
            key={menu.path}
            title={<LangMessage id={menu.menuNameId} defaultText={menu.menuDefaultName}/>}
            icon={iconfont}
          >
            {
              createMenu(menu.children)
            }
          </SubMenu>
        )
      } else {
        return (
            <Menu.Item
              key={menu.path}
              icon={iconfont}
            >
              <NavLink to={menu.path} >{<LangMessage id={menu.menuNameId} defaultText={menu.menuDefaultName}/>}</NavLink>
            </Menu.Item>
        )
      }
    })
  }
  /**
   * @description: 设置选中高亮的key
   */
  const onSelect = ({ selectedKeys }:any) => {
    setSelectedKeys(selectedKeys)
  }

  /**
   * @description: 设置展开的key
   */
  const onOpenChange = (openKeys: any) => {
    setOpenKeys(openKeys)
  }
  return (
      <Menu
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onSelect={onSelect}
        onOpenChange={onOpenChange}
        mode={mode}
        {...remainProps}
      >
        {
          MenuIshHasLogo
            ? <CustomLogo />
            : null
        }
        {
          createMenu(menuList)
        }
      </Menu>
  )
}

export default CustomMenu
