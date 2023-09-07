import React, { useRef } from 'react'
import { TreeSelectSingle, TreeSelectSingleRef, TreeSelectItem } from '../src'
import { TreeNode, genTreeData } from './utils'

const renderTree = (tree: TreeNode[], ref: any) => {
  return tree?.map((item) => {
    return <TreeSelectItem key={item.id} id={item.id} value={item.id} parentId={item.parentId}>
      {({ isChecked }) => {
        return <div>
          <div onClick={() => {
            ref.current?.trigger(item.id)
          }}>
            <input type='checkbox' checked={isChecked} readOnly /> {item.id}
          </div>
          <div>
            {renderTree(item?.children ?? [], ref)}
          </div>
        </div>
      }}
    </TreeSelectItem>
  })
}

const treeSingleDemo1 = () => {
  const ref = useRef<TreeSelectSingleRef<string>>(null)
  const treeData = genTreeData(4, 2,2)
  return (
    <TreeSelectSingle ref={ref}>
      {
        renderTree(treeData, ref)
      }
    </TreeSelectSingle >
  )
}
export default treeSingleDemo1