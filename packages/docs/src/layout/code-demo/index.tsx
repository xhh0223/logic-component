import { Code } from '@src/component'
import { useScreen_max1600, useScreen0_480, useScreen992_1600 } from '@src/hooks/media'
import { groupByNum } from '@src/utils'
import Flex from 'antd/es/flex'

export const CodeMemo = (props: { components: any[]; componentsRawMap: any }) => {
  const { components, componentsRawMap } = props
  const small = useScreen0_480()
  const medium = useScreen992_1600()
  const large = useScreen_max1600()
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
    return (
      Number(
        Object.entries(map).filter((_, value) => {
          return value
        })[0][0],
      ) + 1
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
              return <Code key={path} demo={<Component />} code={componentsRawMap.get(path).default} />
            })}
          </Flex>
        )
      })}
    </Flex>
  )
}
