import './index.scss'

import { Flex } from 'antd'

import { MobileMenu } from '../mobile-menu'
export const Nav = () => {
  return (
    <Flex className="nav" align="center" justify="space-between">
      <Flex component={'h2'} align="center" gap={4}>
        <img style={{ width: 20, height: 20 }} src={'/logic-component/logic.svg'} />
        <div>logic-component</div>
      </Flex>
      <h3 className="nav-github">
        <a target="_blank" href="https://github.com/xhh0223/logic-component" rel="noreferrer">
          Github
        </a>
      </h3>
      <MobileMenu />
    </Flex>
  )
}
