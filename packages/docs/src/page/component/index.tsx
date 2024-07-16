import { Nav } from '@src/layout'
import { Flex } from 'antd'
import { Outlet } from 'react-router-dom'

import { SideMenu } from './side-menu'
const Index = () => {
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
