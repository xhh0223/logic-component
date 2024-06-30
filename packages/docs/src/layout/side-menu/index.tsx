import { RouterPath } from '@src/router'
import { Menu, MenuProps } from 'antd'
import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'

export const SideMenu = () => {
  const { pathname } = useLocation()

  const MenuKey = {
    select: 'select',
    treeSelect: 'tree-select',
    event: 'event-demo',
  }

  const defaultActiveMenuKey = useMemo(() => {
    switch (pathname) {
      case RouterPath.selectSingle:
      case RouterPath.selectMultiple:
        return [MenuKey.select, pathname]
      case RouterPath.treeSelectSingle:
      case RouterPath.treeSelectMultiple:
        return [MenuKey.treeSelect, pathname]
      case RouterPath.event:
        return [MenuKey.event, pathname]
      default:
        return [MenuKey.select, pathname]
    }
  }, [])

  const sideMenuData: MenuProps['items'] = [
    {
      key: MenuKey.select,
      label: MenuKey.select,
      children: [
        {
          key: RouterPath.selectSingle,
          label: <Link to={RouterPath.selectSingle}>select-single</Link>,
        },
        {
          key: RouterPath.selectMultiple,
          label: <Link to={RouterPath.selectMultiple}>select-multiple</Link>,
        },
      ],
    },
    {
      key: MenuKey.treeSelect,
      label: MenuKey.treeSelect,
      children: [
        {
          key: RouterPath.treeSelectSingle,
          label: <Link to={RouterPath.treeSelectSingle}>tree-select-single</Link>,
        },
        {
          key: RouterPath.treeSelectMultiple,
          label: <Link to={RouterPath.treeSelectMultiple}>tree-select-multiple</Link>,
        },
      ],
    },
    {
      key: MenuKey.event,
      label: MenuKey.event,
      children: [
        {
          key: RouterPath.event,
          label: <Link to={RouterPath.event}>event</Link>,
        },
      ],
    },
  ]

  return (
    <Menu
      style={{ maxWidth: 200 }}
      defaultSelectedKeys={defaultActiveMenuKey}
      defaultOpenKeys={[MenuKey.select, MenuKey.treeSelect, MenuKey.event]}
      mode="inline"
      items={sideMenuData}
    />
  )
}
