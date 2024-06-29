import { genTreeData } from '@src/utils'
import { Checkbox, Flex } from 'antd'

import { TreeSelectSingle, TreeSelectSingleItem } from '~logic-component/index'

const Demo1 = () => {
  const treeList = (() => {
    const treeData = genTreeData([3, 2, 2])
    const list = []
    const transformTreeDataToList = (tree) => {
      tree.forEach((i) => {
        list.push(i)
        if (i?.children?.length) {
          transformTreeDataToList(i.children)
        }
      })
    }
    transformTreeDataToList(treeData)
    return list
  })()

  return (
    <div>
      <TreeSelectSingle>
        {treeList.map((i) => (
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
                      handler.select(id)
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
    </div>
  )
}

export default Demo1
