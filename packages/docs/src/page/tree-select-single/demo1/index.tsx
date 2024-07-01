import { genTreeData, transformTreeDataToList } from '@src/utils'
import { Checkbox, Flex } from 'antd'
import { useRef, useState } from 'react'

import { TreeSelectSingle, TreeSelectSingleItem, TreeSelectSingleRef } from '~logic-component/index'

const treeData = genTreeData([2, 3, 3])
const list = transformTreeDataToList(treeData, [])

const Demo1 = () => {
  const [state, setState] = useState({
    currentValue: undefined,
  })

  const ref = useRef<TreeSelectSingleRef>()

  return (
    <Flex component={'article'} vertical>
      <h2>tree</h2>
      <Flex component={'section'} vertical gap={12}>
        <TreeSelectSingle ref={ref}>
          {list.map((i) => (
            <TreeSelectSingleItem
              key={i.id}
              id={i.id}
              parentId={i.parentId}
              childrenIds={i.children?.map((i) => i.id)}
              render={({ handler, id, isChecked }) => {
                return (
                  <Flex>
                    <Checkbox
                      onClick={() => {
                        const value = handler.select(id)

                        setState({ currentValue: value })
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
        </TreeSelectSingle>
        <Flex vertical gap={8}>
          <div>选项状态：</div>
          <div>{JSON.stringify(state.currentValue)}</div>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Demo1
