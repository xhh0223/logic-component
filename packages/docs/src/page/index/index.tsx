import { Nav, SideMenu } from '@src/layout'
import { Flex } from 'antd'
import { Outlet } from 'react-router-dom'

const Index = () => {
  return (
    <div style={{ height: '100%' }}>
      <Nav />
      <div style={{ height: 'calc(100% - 40px)' }}>
        <Flex style={{ height: '100%' }}>
          <SideMenu />
          <div style={{ height: '100%', overflow: 'auto', boxSizing: 'border-box', paddingBottom: 100, width: '100%' }}>
            <Outlet />
          </div>
        </Flex>
      </div>
    </div>
  )
}

export default Index
