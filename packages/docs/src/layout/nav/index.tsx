import './index.scss'

import { useScreen0_480 } from '@src/hooks/media'
import { Base, RouterPath } from '@src/router'
import { Flex } from 'antd'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'

export const Nav = (props: { mobileMenu: React.ReactNode }) => {
  const { mobileMenu } = props
  const isMobile = useScreen0_480()

  return (
    <Flex className="nav" align="center" justify="space-between">
      <Flex component={'h2'} align="center" gap={4}>
        <img style={{ width: 20, height: 20 }} src={`${Base}logic.svg`} />
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
        <h3 className="nav-github">
          <a
            style={{ display: 'flex', alignItems: 'center', gap: 4 }}
            target="_blank"
            href="https://github.com/xhh0223/logic-component"
            rel="noreferrer"
          >
            <img style={{ width: 20, height: 20 }} src={`${Base}github.svg`} />
            Github
          </a>
        </h3>
      </Flex>
      {mobileMenu}
    </Flex>
  )
}
