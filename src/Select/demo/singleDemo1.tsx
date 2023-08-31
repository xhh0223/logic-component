import React, { SyntheticEvent, useCallback, useMemo, useRef, useState } from 'react'
import { Select, SelectItem, SelectRef } from '../src'

const singleSelect = () => {
  const selectRef = useMemo(() => ({}) as SelectRef, [])
  const [state, setState] = useState({
    curSelectValue: "",
    repeatTriggerUnselected: true,
  })
  const handleClick = useCallback<React.MouseEventHandler<HTMLDivElement>>((e) => {
    const { index } = e.currentTarget.dataset
    if (index) {
      selectRef.trigger(index)
    }
  }, [])

  const selectRef2 = useRef<SelectRef>(null)
  return (
    <div>
      <Select
        ref={selectRef2}
        onChange={(v) => {
          setState(preState => ({ ...preState, repeatTriggerUnselected: !!v }))
        }}>
        <div style={{ display: 'flex', gap: 20 }}>
          <SelectItem id={"repeatTriggerUnselected"} value={true}>
            <button onClick={() => {
              selectRef2.current?.trigger("repeatTriggerUnselected")
            }}>重复trigger取消选中</button>
          </SelectItem>
          <SelectItem id={"allowRepeatTrigger"} value={false}>
            <button onClick={() => {
              selectRef2.current?.trigger("allowRepeatTrigger")
            }}>允许重复trigger</button>
          </SelectItem>
        </div>
      </Select>
      <hr />
      <div>当前选中值{state.curSelectValue}</div>
      <hr />
      <Select repeatTriggerUnselected={state.repeatTriggerUnselected} ref={ref => Object.assign(selectRef, { ...ref })} onChange={v => {
        setState(preState => ({ ...preState, curSelectValue: v as any }))
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