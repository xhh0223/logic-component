import { RouterPath } from '@src/router'
import { Menu, MenuProps } from 'antd'
import { useEffect, useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
export const SideMenu = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const MenuKey = {
    introduce: 'introduce',
    setup: 'setup',
    installation: 'installation',
  }

  const defaultActiveMenuKey = useMemo(() => {
    let res = []
    switch (pathname) {
      case RouterPath.introduce:
        res = [MenuKey.introduce, RouterPath.introduce]
        break
      case RouterPath.installation:
        res = [MenuKey.installation, RouterPath.installation]
        break
    }
    return res
  }, [])

  useEffect(() => {
    navigate(defaultActiveMenuKey[1])
  }, [])

  const sideMenuData: MenuProps['items'] = [
    {
      key: MenuKey.introduce,
      label: <Link to={RouterPath.introduce}>介绍</Link>,
    },
    {
      key: MenuKey.setup,
      label: '起步',
      children: [
        {
          key: MenuKey.installation,
          label: <Link to={RouterPath.installation}>安装</Link>,
        },
      ],
    },
  ]

  return (
    <Menu
      className="side-menu"
      defaultSelectedKeys={defaultActiveMenuKey}
      defaultOpenKeys={[MenuKey.introduce, MenuKey.setup, MenuKey.installation]}
      mode="inline"
      items={sideMenuData}
    />
  )
}
