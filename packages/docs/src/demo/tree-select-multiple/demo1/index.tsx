import { genTreeData } from '@src/utils'
import { Checkbox, Flex } from 'antd'

import { TreeSelectMultiple, TreeSelectMultipleItem } from '~logic-component/index'

const Demo1 = () => {
  const treeList = (() => {
    const treeData = genTreeData([2, 2, 2, 2, 2])
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
      <TreeSelectMultiple>
        {treeList.map((i) => (
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
                      /** select current node */
                      handler.select([id])

                      /** select descend node */
                      ;(() => {
                        const ids = handler.getDescendantsIds(id)
                        if (!isChecked) {
                          handler.select(ids)
                        } else {
                          handler.cancel(ids)
                        }
                      })()

                      /** select parent node */
                      ;(() => {
                        const parentDescendantsIds = handler.getDescendantsIds(parentId)
                        const allSelected = handler.getItems(parentDescendantsIds).filter((i) => i.isChecked)

                        if (!allSelected?.length) {
                          return
                        }

                        if (allSelected.length === parentDescendantsIds.length) {
                          handler.select([parentId])
                        } else {
                          handler.cancelSelected([parentId])
                        }
                      })()
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
    </div>
  )
}

export default Demo1
