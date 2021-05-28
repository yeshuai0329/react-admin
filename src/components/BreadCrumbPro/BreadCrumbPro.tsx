import React, { ReactElement } from 'react'
import { Breadcrumb, Space } from 'antd'
import * as Icon from '@ant-design/icons'
import { BreadcrumbItem } from 'typings/breadcrumbItem/breadcrumbItem'
import { LangMessage } from 'components/LangMessage/LangMessage'
import { NavLink } from 'react-router-dom'

type BreadcrumbProps = React.ComponentProps<typeof Breadcrumb>

interface IProps extends BreadcrumbProps{
  BreadcrumbList: BreadcrumbItem[]
}

const BreadCrumbPro: React.FC<IProps> = (props): ReactElement => {
  const { BreadcrumbList, ...remainProps } = props
  const [menusList, setMenusList] = React.useState([])
  React.useEffect(() => {
    console.log(`obj1`, familyTree(JSON.parse(localStorage.getItem('authMenu') || '[]'), '/system/systemconfig')
    )
    setMenusList(JSON.parse(localStorage.getItem('authMenu') || '[]'))
  }, [])
  /**
   * @description: 根据传入的路由 过滤面包屑路径
   * @param {any} menuList
   * @param {string} path
   * @return {*}
   */
  const familyTree = (arr1:any, path: string) => {
    const temp: any = []
    var forFn = function (arr: any, path: string) {
      for (var i = 0; i < arr.length; i++) {
        var item = arr[i]
        if (item.path === path) {
          temp.push(item)
          forFn(arr1, item.parentId)
          break
        } else {
          if (item.children) {
            forFn(item.children, path)
          }
        }
      }
    }
    forFn(arr1, path)
    return temp
  }

  return (
    <Breadcrumb {...remainProps}>
      {
        menusList && menusList.map((item: any, index: number) => {
          // @ts-ignore
          const iconfont = item.icon ? React.createElement(Icon[item.icon]) : ''
          return (
            <Breadcrumb.Item key={index}>
              {
                item.path
                  ? (
                      <NavLink to={item.path}>
                        <Space>
                          {iconfont}
                          <LangMessage id={item.menuNameId} defaultText={item.menuDefaultName}/>
                        </Space>
                      </NavLink>
                    )
                  : (
                      <Space>
                        {iconfont}
                        <LangMessage id={item.menuNameId} defaultText={item.menuDefaultName}/>
                      </Space>
                    )
              }
            </Breadcrumb.Item>
          )
        })
      }
    </Breadcrumb>
  )
}

export default BreadCrumbPro
