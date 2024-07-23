import { Nav } from '@src/layout'
import { RouterPath } from '@src/router'
import { Flex } from 'antd'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { MobileMenu } from './mobile-menu'
import { SideMenu } from './side-menu'

const Index = () => {
  const { pathname, hash } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if ([RouterPath.component, RouterPath.root, RouterPath.document].includes(pathname as RouterPath)) {
      return navigate(`${RouterPath.selectSingle}${hash}`)
    } else if (!Object.values(RouterPath).includes(pathname as RouterPath)) {
      return navigate(`${RouterPath.selectSingle}${hash}`)
    }
  }, [pathname])

  return (
    <div className="container">
      <Nav mobileMenu={<MobileMenu />} />
      <Flex className="container-content">
        <SideMenu />
        <Outlet />
      </Flex>
    </div>
  )
}

export default Index
