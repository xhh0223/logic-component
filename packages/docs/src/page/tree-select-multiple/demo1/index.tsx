import { genTreeData, transformTreeDataToList } from '@src/utils'
import { Checkbox, Flex } from 'antd'
import { useEffect, useRef, useState } from 'react'

import { TreeSelectMultiple, TreeSelectMultipleItem, TreeSelectMultipleRef } from '~logic-component/index'

const treeData = genTreeData([2, 3, 3])
const list = transformTreeDataToList(treeData, [])

const Demo1 = () => {
  const [state, setState] = useState({
    currentValue: [],
  })

  const ref = useRef<TreeSelectMultipleRef>()

  useEffect(() => {
    setState({ currentValue: ref.current.getAllItems() })
  }, [])

  return (
    <Flex component={'article'} vertical>
      <h2>tree</h2>
      <Flex component={'section'} vertical gap={12}>
        <TreeSelectMultiple ref={ref}>
          {list.map((i) => (
            <TreeSelectMultipleItem
              key={i.id}
              id={i.id}
              parentId={i.parentId}
              childrenIds={i.children?.map((i) => i.id)}
              render={({ handler, id, isChecked, parentId }) => {
                return (
                  <Flex>
                    <Checkbox
                      onClick={() => {
                        /** 1、选择当前节点 */
                        handler.select([[id]])

                        /** 2、选择后代节点 */
                        ;(() => {
                          const ids = handler.getDescendantsIds(id)
                          if (!isChecked) {
                            // eslint-disable-next-line no-unsafe-optional-chaining
                            handler.select([...ids?.map((id) => [id, { allowRepeatSelect: true }])])
                          } else {
                            handler.cancel(ids)
                          }
                        })()

                        /**
                         * 3、如果当前父节点下后代节点未被选中，取消所有祖先节点的选中
                         *    每个祖先节点的后代节点全被选中，更新所有祖先节点的状态
                         */
                        ;(() => {
                          if (parentId !== 'root') {
                            const ancestorsIds = handler.getAncestorsIds(id)
                            for (const id of ancestorsIds) {
                              const descendantsIds = handler.getDescendantsIds(id)
                              const selectedDescendantsIds = handler.getItems(descendantsIds).filter((i) => i.isChecked)

                              if (descendantsIds?.length === selectedDescendantsIds.length) {
                                handler.select([[id, { allowRepeatSelect: true }]])
                              } else {
                                handler.cancel([id])
                              }
                            }
                          }
                        })()
                        setState({ currentValue: handler.getAllItems() })
                      }}
                      checked={isChecked}
                    >
                      {id}
                    </Checkbox>
                  </Flex>
                )
              }}
            />
          ))}
        </TreeSelectMultiple>
        <Flex vertical gap={8}>
          <div>选项状态：</div>
          <div>
            {state.currentValue
              ?.filter((i) => i.isChecked)
              .map((i, index) => <div key={index}>{JSON.stringify(i)}</div>)}
          </div>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Demo1
