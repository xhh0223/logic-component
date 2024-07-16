import { Nav } from '@src/layout'
import { RouterPath } from '@src/router'
import { Flex } from 'antd'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { SideMenu } from './side-menu'
const Index = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if ([RouterPath.component, RouterPath.root, RouterPath.document].includes(pathname as RouterPath)) {
      return navigate(RouterPath.selectSingle)
    } else if (!Object.values(RouterPath).includes(pathname as RouterPath)) {
      return navigate(RouterPath.selectSingle)
    }
  }, [pathname])
  return (
    <div className="container">
      <Nav />
      <Flex className="container-content">
        <SideMenu />
        <div
          style={{
            height: '100%',
            width: '100%',
            overflow: 'auto',
            boxSizing: 'border-box',
            padding: '0 16px 100px 16px',
          }}
        >
          <Outlet />
        </div>
      </Flex>
    </div>
  )
}

export default Index
