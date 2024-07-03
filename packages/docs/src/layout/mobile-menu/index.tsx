import './index.scss'

import { RouterPath } from '@src/router'
import { Dropdown, MenuProps } from 'antd'
import { useEffect, useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export const MobileMenu = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const MenuKey = {
    select: 'select',
    treeSelect: 'tree-select',
    eventBus: 'event-bus',
    propsProxy: 'props-proxy',
  }

  const defaultActiveMenuKey = useMemo(() => {
    let res
    switch (pathname) {
      case RouterPath.selectSingle:
      case RouterPath.selectMultiple:
        res = [MenuKey.select, pathname]
        break
      case RouterPath.treeSelectSingle:
      case RouterPath.treeSelectMultiple:
        res = [MenuKey.treeSelect, pathname]
        break
      case RouterPath.eventBus:
        res = [MenuKey.eventBus, pathname]
        break
      case RouterPath.propsProxy:
        res = [MenuKey.propsProxy, pathname]
        break
      default:
        res = [MenuKey.select, RouterPath.selectSingle]
    }
    return res
  }, [])

  useEffect(() => {
    navigate(defaultActiveMenuKey[1])
  }, [])

  const menuData: MenuProps['items'] = [
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
      key: MenuKey.eventBus,
      label: <Link to={RouterPath.eventBus}>event-bus</Link>,
    },
    {
      key: MenuKey.propsProxy,
      label: <Link to={RouterPath.propsProxy}>props-proxy</Link>,
    },
  ]

  return (
    <Dropdown className="mobile-menu" menu={{ items: menuData }}>
      <img width={14} height={14} src="/logic-component/menu.svg" />
    </Dropdown>
  )
}
