import { Nav } from '@src/layout'
import { RouterPath } from '@src/router'
import { Flex } from 'antd'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { MobileMenu } from './mobile-menu'
import { SideMenu } from './side-menu'

const index = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if ([RouterPath.component, RouterPath.root, RouterPath.document].includes(pathname as RouterPath)) {
      return navigate(RouterPath.introduce)
    } else if (!Object.values(RouterPath).includes(pathname as RouterPath)) {
      return navigate(RouterPath.introduce)
    }
  }, [pathname])
  return (
    <div className="container">
      <Nav mobileMenu={<MobileMenu />} />
      <Flex className="container-content">
        <SideMenu />
        <div
          style={{
            height: '100%',
            overflow: 'auto',
            padding: ' 0px 16px 100px',
            boxSizing: 'border-box',
            paddingBottom: 100,
            width: '80%',
          }}
        >
          <Outlet />
        </div>
      </Flex>
    </div>
  )
}

export default index
