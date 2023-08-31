import React, { SyntheticEvent, useCallback, useMemo, useState } from 'react'
import { Select, SelectItem, SelectRef } from '../src'

const singleSelect = () => {
  const selectRef = useMemo(() => ({}) as SelectRef, [])
  const [state, setState] = useState<any>()
  const handleClick = useCallback<React.MouseEventHandler<HTMLDivElement>>((e) => {
    const { index } = e.currentTarget.dataset
    if (index) {
      selectRef.trigger(index)
    }
  }, [])
  return (
    <div>
      <div>当前选中值{state}</div>
      <hr />
      <Select ref={ref => Object.assign(selectRef, { ...ref })} onChange={v => {
        setState(v)
      }}>
        {Array.from({ length: 10 }).map((item, index) => {
          return <SelectItem key={index} id={`${index}`} value={index}>
            {
              ({ isChecked }) =>
                <div
                  data-index={index}
                  onClick={handleClick}
                  style={{ display: 'flex', alignItems: 'center', gap: 4 }}
                >
                  <div>{`checkbox${index}`}</div>
                  <input type="checkbox" value={`checkbox${index}`} checked={isChecked} readOnly />
                </div>
            }
          </SelectItem>
        })}
      </Select>
    </div>
  )
}

export default singleSelect