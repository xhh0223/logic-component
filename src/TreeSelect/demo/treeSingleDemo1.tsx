import React, { useRef } from 'react'
import { TreeSelectSingle, TreeSelectSingleRef } from '../src'
import TreeSelectItem from '../src/tree-select-item'

const treeSingleDemo1 = () => {
  const ref = useRef<TreeSelectSingleRef<string>>(null)
  return (
    <TreeSelectSingle ref={ref}>
      {
        Array.from({ length: 3 }).map((item, i) => {
          return <TreeSelectItem key={`${i}`} id={`${i}`} value={`${i}`} parentId={'root'}>
            {({ isChecked }) => {
              return <div>
                <div onClick={() => {
                  ref.current?.trigger(`${i}`).then(res => {
                    console.log(res)
                  })
                }}>
                  <input type='checkbox' checked={isChecked} readOnly /> {`${i}`}
                </div>
                <ul>
                  {Array.from({ length: 3 }).map((item, j) => {
                    return <TreeSelectItem key={`${i}-${j}`} id={`${i}-${j}`} value={`${i}-${j}`} parentId={`${i}`}>
                      {({ isChecked }) => {
                        return <li onClick={() => {
                          ref.current?.trigger(`${i}-${j}`).then(res => {
                            console.log(res)
                          })
                        }}>
                          <input type='checkbox' checked={isChecked} readOnly /> {`${i}-${j}`}
                        </li>
                      }}
                    </TreeSelectItem>
                  })}
                </ul>
              </div>
            }}
          </TreeSelectItem>
        })
      }
    </TreeSelectSingle >
  )
}

export default treeSingleDemo1