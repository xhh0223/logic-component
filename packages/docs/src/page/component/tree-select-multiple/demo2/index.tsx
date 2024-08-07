import { genTreeData } from '@src/utils'
import { Checkbox, Flex, Tag } from 'antd'
import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { TreeSelectMultiple, TreeSelectMultipleHandler, TreeSelectMultipleItem } from 'react-logic-component'

const App = () => {
  const [isUpdate, update] = useState({})
  const map = useMemo(() => new Map(), [])

  const [everyLevelData, setEveryLevelData] = useState([genTreeData([5, 3, 3])])

  const ref = useRef<TreeSelectMultipleHandler>()

  useLayoutEffect(() => {
    const ids = [...map.values()]?.filter((i) => i.isChecked)?.map((i) => i.id)

    ref.current.select(ids.map((i) => ({ id: i, options: { allowRepeatSelect: true } })))
  }, [isUpdate])

  return (
    <Flex component={'section'} vertical gap={12} style={{ maxHeight: 500, overflow: 'auto' }}>
      <TreeSelectMultiple ref={ref}>
        <Flex>
          {everyLevelData.map((levelData, level) => {
            return (
              <div key={level}>
                {levelData?.map((i) => (
                  <TreeSelectMultipleItem
                    key={i.id}
                    id={i.id}
                    render={({ handler, isChecked, childrenIds, id }) => {
                      return (
                        <Flex gap={16}>
                          {childrenIds ? (
                            <Tag
                              onClick={() => {
                                everyLevelData.splice(level + 1, everyLevelData.length - (level + 1))
                                everyLevelData[level + 1] = i.children
                                setEveryLevelData([...everyLevelData])
                                update({})
                              }}
                            >
                              {id}
                            </Tag>
                          ) : (
                            <Checkbox
                              onClick={() => {
                                const values = handler.select([{ id }])[0]
                                map.set(values.id, values)
                                update({})
                              }}
                              checked={isChecked}
                            >
                              {id}
                            </Checkbox>
                          )}
                        </Flex>
                      )
                    }}
                    parentId={i.parentId}
                    childrenIds={i.children?.map((i) => i.id)}
                  />
                ))}
              </div>
            )
          })}
        </Flex>
      </TreeSelectMultiple>
      <Flex vertical gap={8}>
        <div>选项状态：</div>
        <Flex vertical gap={12}>
          {[...map.values()]?.map((i, index) => <div key={index}>{JSON.stringify(i)}</div>)}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default App
