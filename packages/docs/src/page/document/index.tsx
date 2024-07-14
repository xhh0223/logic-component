import { Nav } from '@src/layout'
import { Flex } from 'antd'
import { Outlet } from 'react-router-dom'

import { SideMenu } from './side-menu'

const index = () => {
  return (
    <div className="container">
      <Nav />
      <Flex className="container-content">
        <SideMenu />
        <div
          style={{
            height: '100%',
            overflow: 'auto',
            marginLeft: 16,
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
