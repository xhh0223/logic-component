import './index.scss'

import { Nav, SideMenu } from '@src/layout'
import { Flex } from 'antd'
import { Outlet } from 'react-router-dom'

const Index = () => {
  return (
    <div className="container">
      <Nav />
      <Flex className="container-content">
        <SideMenu />
        <div style={{ height: '100%', overflow: 'auto', boxSizing: 'border-box', paddingBottom: 100, width: '100%' }}>
          <Outlet />
        </div>
      </Flex>
    </div>
  )
}

export default Index
