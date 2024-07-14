import './index.scss'

import { RouterPath } from '@src/router'
import { Menu, MenuProps } from 'antd'
import { useEffect, useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
export const SideMenu = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const MenuKey = {
    introduce: 'introduce',
  }

  const defaultActiveMenuKey = useMemo(() => {
    let res
    switch (pathname) {
      case RouterPath.introduce:
        res = [MenuKey.introduce, pathname]
        break
      default:
        res = []
    }
    return res
  }, [])

  useEffect(() => {
    navigate(defaultActiveMenuKey[1])
  }, [])

  const sideMenuData: MenuProps['items'] = [
    {
      key: MenuKey.introduce,
      label: '介绍',
      children: [
        {
          key: RouterPath.introduce,
          label: <Link to={RouterPath.introduce}>logic-component</Link>,
        },
      ],
    },
    /*  {
      key: MenuKey.propsProxy,
      label: <Link to={RouterPath.propsProxy}>props-proxy</Link>,
    }, */
  ]

  return (
    <Menu
      className="side-menu"
      defaultSelectedKeys={defaultActiveMenuKey}
      defaultOpenKeys={[MenuKey.introduce]}
      mode="inline"
      items={sideMenuData}
    />
  )
}
