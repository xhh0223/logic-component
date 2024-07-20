import { AnchorID } from '@src/constant'
import { useScreen0_480 } from '@src/hooks/media'
import { Nav } from '@src/layout'
import { RouterPath } from '@src/router'
import { Anchor, Flex } from 'antd'
import classNames from 'classnames'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { EventBusItem } from '~react-logic-component'

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
            <EventBusItem
              id={AnchorID.component}
              key={AnchorID.component}
              onIds={[AnchorID.component]}
              render={({ onIdsParams }) => {
                return onIdsParams?.length ? <Anchor items={onIdsParams[0].params as any} /> : null
              }}
            />
          </div>
        </Flex>
      </Flex>
    </div>
  )
}

export default Index
