import { Nav, SideMenu } from '@src/layout'
import { Flex } from 'antd'
import { Outlet } from 'react-router-dom'

const Index = () => {
  return (
    <>
      <Nav />
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
