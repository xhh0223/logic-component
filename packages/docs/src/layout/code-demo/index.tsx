import { Code } from '@src/component'
import { useScreen_max1680, useScreen0_480, useScreen480_1680 } from '@src/hooks/media'
import { groupByNum } from '@src/utils'
import Flex from 'antd/es/flex'

export const CodeMemo = (props: { metasMap?: any; components: any[]; componentsRawMap: any }) => {
  const { components, componentsRawMap, metasMap } = props
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
    2: 'calc(100% - 16px) / 2',
    3: 'calc(100% - 32px) / 3',
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
    <Flex gap={16} wrap>
      {groupComponents.map((group, index) => {
        return (
          <Flex flex={'1'} style={{ width: mapWidth[splitNumber], minWidth: 328 }} key={index} vertical gap={16}>
            {group.map((item) => {
              const [path, module] = item
              // @ts-ignore
              const Component = module.default
              return (
                <div key={path} id={metasMap.get(path).Anchor.key}>
                  <Code demo={<Component />} code={componentsRawMap.get(path).default} />
                </div>
              )
            })}
          </Flex>
        )
      })}
    </Flex>
  )
}
