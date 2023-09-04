import React, { useRef, useState } from 'react'
import { TreeSelectSingle, TreeSelectSingleRef, TreeSelectItem } from '../src';
import './treeSingleDemo2.scss'

const data = [
  { "id": 1, "name": "用户中心", "orderNum": 1, "pid": 0 },
  { "id": 2, "name": "订单中心", "orderNum": 2, "pid": 0 },
  { "id": 3, "name": "系统管理", "orderNum": 3, "pid": 0 },
  { "id": 12, "name": "所有订单", "orderNum": 1, "pid": 2 },
  { "id": 14, "name": "待发货", "orderNum": 1.2, "pid": 2 },
  { "id": 15, "name": "订单导出", "orderNum": 2, "pid": 2 },
  { "id": 18, "name": "菜单设置", "orderNum": 1, "pid": 3 },
  { "id": 19, "name": "权限管理", "orderNum": 2, "pid": 3 },
  { "id": 21, "name": "系统权限", "orderNum": 1, "pid": 19 },
  { "id": 22, "name": "角色设置", "orderNum": 2, "pid": 19 },
];

type Item<T> = T extends Array<infer P> ? P : never

type TreeNode = Item<typeof data> & { children: TreeNode[] }
const genTreeData = (items: typeof data) => {
  let result = []
  let itemMap = {} as any
  for (let i of items) {
    itemMap[i.id] = {
      ...i,
      children: []
    }
  }
  for (let i of items) {
    if (itemMap[i.pid]) {
      itemMap[i.pid].children.push(itemMap[i.id])
    } else {
      result.push(itemMap[i.id])
    }
  }
  return result as unknown as TreeNode[]
}


const treeSingleDemo2 = () => {
  const classNamePrefix = "tree-single-demo2"
  const treeData = genTreeData(data)
  const [levels, setLevels] = useState<TreeNode[][]>([treeData])
  const ref = useRef<TreeSelectSingleRef<string>>(null)
  return (
    <div className={`${classNamePrefix}`}>
      <TreeSelectSingle ref={ref} >
        {
          levels.map(level => {
            return level?.map((item, index) => {
              return <div key={`${item.id}`} className={`${classNamePrefix}-group`}>
                <TreeSelectItem id={`${item.id}`} parentId={`${item.pid}`} value={item.name}>
                  {
                    (params) => {
                      return <div className={`${classNamePrefix}-group-item`} onClick={() => {
                        ref.current?.trigger(`${item.id}`).then(res => {
                          if(item.name === "订单中心")
                          if (item.children?.length) {
                            let tempLevels = levels.slice(0, index + 2)
                            tempLevels[index + 1] = item.children
                            setLevels(params.isChecked ? tempLevels : tempLevels.slice(0, index + 1))
                          }
                        })
                      }}>
                        {item.name}
                        <input checked={params.isChecked} type='checkbox' readOnly />
                      </div>
                    }
                  }
                </TreeSelectItem>
              </div>
            })
          })
        }
      </TreeSelectSingle>
    </div>
  )
}

export default treeSingleDemo2