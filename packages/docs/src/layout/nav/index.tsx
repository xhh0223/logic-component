import './index.scss'

import { useScreen0_480 } from '@src/hooks/media'
import { RouterPath } from '@src/router'
import { Flex } from 'antd'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'

import { MobileMenu } from '../mobile-menu'
export const Nav = () => {
  const isMobile = useScreen0_480()

  return (
    <Flex className="nav" align="center" justify="space-between">
      <Flex component={'h2'} align="center" gap={4}>
        <img style={{ width: 20, height: 20 }} src={'/logic-component/logic.svg'} />
        <div className={classNames(isMobile && 'screen-480')}>logic-component</div>
      </Flex>
      <Flex
        className={classNames(isMobile && 'screen-480', 'nav-content')}
        align="center"
        justify="space-between"
        gap={20}
      >
        <h3>
          <NavLink to={RouterPath.introduce}>文档</NavLink>
        </h3>
        <h3>
          <NavLink to={RouterPath.selectSingle}>组件</NavLink>
        </h3>
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
