import { useScreen0_480 } from '@src/hooks/media'
import { Nav } from '@src/layout'
import { RouterPath } from '@src/router'
import { Anchor, Flex } from 'antd'
import classNames from 'classnames'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { MobileMenu } from './mobile-menu'
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

  const small = useScreen0_480()

  return (
    <div className="container">
      <Nav mobileMenu={<MobileMenu />} />
      <Flex className="container-content">
        <SideMenu />
        <Flex
          flex={1}
          style={{
            overflow: 'auto',
            position: 'relative',
            boxSizing: 'border-box',
            padding: '0 16px 100px 16px',
          }}
        >
          <div style={{ height: 'fit-content' }}>
            <Outlet />
          </div>
          <div className={classNames(small && 'is-hidden', 'anchor-container')}>
            <Anchor
              items={[
                {
                  key: '1',
                  href: '#components-anchor-demo-basic',
                  title: 'Basic demo',
                },
                {
                  key: '2',
                  href: '#components-anchor-demo-static',
                  title: 'Static demo',
                },
              ]}
            />
          </div>
        </Flex>
      </Flex>
    </div>
  )
}

export default Index
