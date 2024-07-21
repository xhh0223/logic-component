import { useScreen0_480 } from '@src/hooks/media'
import { RouterPath } from '@src/router'
import { Menu, MenuProps } from 'antd'
import classNames from 'classnames'
import { useEffect, useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
export const SideMenu = () => {
  const { pathname, hash } = useLocation()
  const navigate = useNavigate()

  const MenuKey = {
    select: 'select',
    treeSelect: 'tree-select',
    eventBus: 'event-bus',
    propsProxy: 'props-proxy',
  }

  const defaultActiveMenuKey = useMemo(() => {
    let res = []
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
    }
    return res
  }, [])

  useEffect(() => {
    navigate(`${defaultActiveMenuKey[1]}${hash}`)
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
      key: MenuKey.eventBus,
      label: <Link to={RouterPath.eventBus}>event-bus</Link>,
    },
    {
      key: MenuKey.propsProxy,
      label: <Link to={RouterPath.propsProxy}>props-proxy</Link>,
    },
  ]

  const isMobile = useScreen0_480()
  return (
    <Menu
      className={classNames(isMobile && 'is-hidden', !isMobile && 'side-menu')}
      defaultSelectedKeys={defaultActiveMenuKey}
      defaultOpenKeys={[MenuKey.select, MenuKey.treeSelect]}
      mode="inline"
      items={sideMenuData}
    />
  )
}
