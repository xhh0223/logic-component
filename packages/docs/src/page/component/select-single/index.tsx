import { Code } from '@src/component'
import { Flex } from 'antd'

// @ts-ignore
const Components = import.meta.glob('./demo*/index.tsx', { eager: true })

const ComponentsRawMap = new Map<string, string>(
  // @ts-ignore
  Object.entries(import.meta.glob('./demo*/index.tsx', { eager: true, query: '?raw' })),
)

const index = () => {
  return (
    <Flex gap={16} wrap>
      {Object.entries(Components).map(([path, module]) => {
        // @ts-ignore
        const Component = module.default
        return (
          <Code
            key={path}
            demo={<Component />}
            code={
              // @ts-ignore
              ComponentsRawMap.get(path).default
            }
          />
        )
      })}
    </Flex>
  )
}

export default index
