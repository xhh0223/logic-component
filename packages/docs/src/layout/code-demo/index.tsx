import { Markdown } from '@src/component'
import { useScreen_max1680, useScreen0_480, useScreen480_1680 } from '@src/hooks/media'
import { groupByNum } from '@src/utils'
import Flex from 'antd/es/flex'
import { EventBusItem } from 'react-logic-component'

import { CodeDemoCard } from './code-demo-card'
export const CodeMemo = (props: { demoMetaMap?: any; components: any[]; componentsRawCodeMap: any }) => {
  const { components, componentsRawCodeMap, demoMetaMap } = props
  const small = useScreen0_480()
  const medium = useScreen480_1680()
  const large = useScreen_max1680()
  const map = {
    1: small,
    2: medium,
    3: large,
  }

  const mapWidth = {
    1: '100%',
    2: 'calc( (100% - 16px) / 2 )',
    3: 'calc( (100% - 32px) / 3 )',
  }

  const splitNumber = (() => {
    return Number(
      Object.entries(map).filter(([, value]) => {
        return value
      })[0]?.[0] ?? 1,
    )
  })()

  const groupComponents = groupByNum(Object.entries(components), splitNumber)

  return (
    <Flex vertical gap={16}>
      <Markdown>{'## 演示'}</Markdown>
      <Flex gap={16} wrap>
        {groupComponents.map((group, index) => {
          return (
            <Flex
              flex={'1'}
              style={{
                boxSizing: 'border-box',
                minWidth: 328,
                width: mapWidth[splitNumber],
              }}
              key={index}
              vertical
              gap={16}
            >
              {group.map((item) => {
                const [path, module] = item
                // @ts-ignore
                const Component = module.default
                const Anchor = demoMetaMap.get(path).Anchor

                return (
                  <EventBusItem
                    key={Anchor.key}
                    onIds={[Anchor.key]}
                    id={Anchor.key}
                    render={({ id, onIdsParams }) => {
                      // @ts-ignore
                      const isActive = onIdsParams?.[0]?.params?.isActive
                      return (
                        <div id={id}>
                          <CodeDemoCard
                            isActive={isActive}
                            title={Anchor.title}
                            demo={<Component />}
                            code={componentsRawCodeMap.get(path).default}
                          />
                        </div>
                      )
                    }}
                  />
                )
              })}
            </Flex>
          )
        })}
      </Flex>
    </Flex>
  )
}
