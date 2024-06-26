import { Flex } from 'antd'

export const Nav = () => {
  return (
    <Flex align="center" style={{ height: 40 }}>
      <Flex component={'h2'} align="center" gap={4}>
        <img style={{ width: 20, height: 20 }} src={'/logic-component/logic.svg'} />
        <div>logic-component</div>
      </Flex>
      <h3 style={{ marginLeft: 'auto' }}>
        <a target="_blank" href="https://github.com/xhh0223/logic-component" rel="noreferrer">
          Github
        </a>
      </h3>
    </Flex>
  )
}
