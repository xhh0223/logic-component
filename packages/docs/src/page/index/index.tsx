import { Flex } from 'antd'
import { Outlet } from 'react-router-dom'

import SideMenu from './side-menu'

const Index = () => {
  return (
    <>
      <Flex align="center">
        <h1>logic-component</h1>
        <a
          target="_blank"
          href="https://github.com/xhh0223/logic-component"
          style={{ marginLeft: 'auto' }}
          rel="noreferrer"
        >
          github
        </a>
      </Flex>
      <Flex>
        <SideMenu />
        <div>
          <Outlet />
        </div>
      </Flex>
    </>
  )
}

export default Index
