import React, { useCallback, useMemo, useState } from 'react'
import { SelectItem, SelectMultiple, SelectMultipleRef } from '../src'
import './singleDemo1.scss'

const multipleDemo1 = () => {
  const classNamePrefix = "multiple-demo-1"
  const selectRef = useMemo(() => ({}) as SelectMultipleRef<string>, [])
  const [state, setState] = useState({
    curSelectValue: undefined as unknown as string[],
  })

  const handleClick = useCallback<React.MouseEventHandler<HTMLDivElement>>((e) => {
    const { index } = e.currentTarget.dataset
    if (index) {
      selectRef.trigger([index]).then(res => {
        const values = res.map(item => item.value)
        setState(preState => ({ ...preState, curSelectValue: values }))
      })
    }
  }, [])

  return (
    <div className={`${classNamePrefix}`}>
      <div>当前选中值：{state.curSelectValue?.join("--") ?? "暂无"}</div>
      <hr />
      <div onClick={() => {
        selectRef.reset().then(() => {
          setState({ curSelectValue: [] })
        })
      }}>重置</div>
      <hr />
      <SelectMultiple ref={ref => Object.assign(selectRef, { ...ref })}>
        {Array.from({ length: 10 }).map((_item, index) => {
          return <SelectItem key={index} id={`${index}`} value={index}>
            {({ isChecked }) => <div
              data-index={index}
              onClick={handleClick}
              style={{ display: 'flex', alignItems: 'center', gap: 4 }}
            >
              <div>{`checkbox${index}`}</div>
              <input type="checkbox" value={`checkbox${index}`} checked={isChecked} readOnly />
            </div>}
          </SelectItem>
        })}
      </SelectMultiple>
    </div>
  )
}

export default multipleDemo1