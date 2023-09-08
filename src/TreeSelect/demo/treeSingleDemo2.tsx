import React, { useCallback, useMemo, useRef, useState } from 'react'
import { TreeSelectSingle, TreeSelectSingleRef, TreeSelectItem } from '../src';
import { TreeNode, genTreeData } from './utils';
import './treeSingleDemo2.scss'


const treeSingleDemo2 = () => {
  const classNamePrefix = "tree-single-demo2"
  const treeData = useMemo(() => genTreeData(5, 4, 4), [])
  const [levels, setLevels] = useState<TreeNode[][]>([treeData])
  const ref = useRef<TreeSelectSingleRef<string>>(null)

  return (
    <div className={`${classNamePrefix}`}>
      <TreeSelectSingle ref={ref} >
        {
          levels.map(level =>
            <div className={`${classNamePrefix}-group`}>
              {
                level?.map((item) =>
                  <TreeSelectItem key={item.id} id={`${item.id}`} parentId={item.parentId} value={item.value}>
                    {
                      ({ isChecked }) => {
                        return <div className={`${classNamePrefix}-group-item`} onClick={() => {
                          ref.current?.trigger(`${item.id}`).then((res) => {
                            const curItemLevel = res?.level
                            if (item.children?.length && curItemLevel) {
                              levels[curItemLevel] = item.children
                              setLevels(res?.isChecked ? levels.slice(0, curItemLevel + 1) : levels.slice(0, curItemLevel))
                            }
                          })
                        }}>
                          <input checked={isChecked} type='checkbox' readOnly />
                          {item.value}
                        </div>
                      }
                    }
                  </TreeSelectItem>)

              }
            </div>
          )}
      </TreeSelectSingle>
    </div>
  )
}

export default treeSingleDemo2