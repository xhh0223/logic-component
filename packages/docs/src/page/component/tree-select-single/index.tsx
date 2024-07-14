import { Flex } from 'antd'

// @ts-ignore
const Components = import.meta.glob('./demo*/index.tsx', { eager: true })

const index = () => {
  return (
    <Flex style={{ margin: '0 0 0 16px' }} gap={30} wrap>
      {Object.entries(Components).map(([path, module]) => {
        // @ts-ignore
        const Component = module.default
        return (
          <div key={path} style={{ minWidth: 350 }}>
            <Component />
          </div>
        )
      })}
    </Flex>
  )
}

export default index
