import { genTreeData, transformTreeDataToList } from '@src/utils'
import { Checkbox, Flex } from 'antd'
import { useRef, useState } from 'react'

import { TreeSelectSingle, TreeSelectSingleHandler, TreeSelectSingleItem } from '~react-logic-component'

const treeData = genTreeData([2, 3, 2])
const list = transformTreeDataToList(treeData, [])

const App = () => {
  const [state, setState] = useState({
    currentValue: undefined,
  })

  const ref = useRef<TreeSelectSingleHandler>()

  return (
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
                <Checkbox
                  onClick={() => {
                    const value = handler.select(id)

                    setState({ currentValue: value })
                  }}
                  checked={isChecked}
                >
                  {id}
                </Checkbox>
              )
            }}
          />
        ))}
      </TreeSelectSingle>
      <Flex vertical gap={8} style={{ position: 'sticky', bottom: 0, background: 'white' }}>
        <div>选项状态：</div>
        <div>{JSON.stringify(state.currentValue)}</div>
      </Flex>
    </Flex>
  )
}

export default App
