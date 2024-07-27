import { useScreen0_480 } from '@src/hooks/media'
import { Base, RouterPath } from '@src/router'
import { Dropdown, MenuProps } from 'antd'
import classNames from 'classnames'
import { useEffect, useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
export const MobileMenu = () => {
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

  const menuData: MenuProps['items'] = [
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
  const isMobile = useScreen0_480()
  return (
    <Dropdown className={classNames(!isMobile && 'is-hidden')} menu={{ items: menuData }}>
      <img width={14} height={14} src={`${Base}menu.svg`} />
    </Dropdown>
  )
}
