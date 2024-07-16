import { Nav } from '@src/layout'
import { RouterPath } from '@src/router'
import { Flex } from 'antd'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Index = () => {
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
      <Nav />
      <Flex className="container-content">
        <div
          style={{ height: '100%', overflow: 'auto', boxSizing: 'border-box', paddingBottom: 100, width: '100%' }}
        ></div>
      </Flex>
    </div>
  )
}

export default Index
