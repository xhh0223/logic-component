import './index.scss'

import { Nav } from '@src/layout'
import { Flex } from 'antd'

const Index = () => {
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
