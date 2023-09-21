import React, { useCallback, useMemo, useRef, useState } from 'react'
import { SelectSingle, SelectItem, SelectSingleRef } from '../src/index'
import classnames from 'classnames'
import './singleDemo1.scss'

const singleDemo1 = () => {
  const classNamePrefix = "single-demo-1"
  const selectRef = useMemo(() => ({}) as SelectSingleRef<string>, [])

  const [state, setState] = useState({
    curSelectValue: undefined as string | undefined,
    repeatTriggerUnselected: true,
  })

  const handleClick = useCallback<React.MouseEventHandler<HTMLDivElement>>((e: any) => {
    const { index } = e.currentTarget.dataset
    if (index) {
      selectRef.trigger(index).then(res => {
        setState(preState => ({ ...preState, curSelectValue: res?.value! }))
      })
    }
  }, [])

  const selectRef2 = useRef<SelectSingleRef<boolean>>(null)

  return (
    <div className={classNamePrefix}>
      <SelectSingle
        ref={selectRef2}
      >
        <div className={`${classNamePrefix}-option`}>

          <SelectItem id={"repeatTriggerUnselected"} value={true}>
            {
              ({ isChecked }) => {
                return <button
                  className={classnames(isChecked && `${classNamePrefix}-option-checked`)}
                  onClick={() => {
                    selectRef2.current?.trigger("repeatTriggerUnselected")?.then(res => {
                      setState(preState => ({ ...preState, repeatTriggerUnselected: res?.value! }))
                    })
                  }}>重复trigger取消选中</button>
              }
            }
          </SelectItem>

          <SelectItem id={"allowRepeatTrigger"} value={false}>
            {
              ({ isChecked }) => {
                return <button
                  className={classnames(isChecked && `${classNamePrefix}-option-checked`)}
                  onClick={() => {
                    selectRef2.current?.trigger("allowRepeatTrigger")?.then(res => {
                      setState(preState => ({ ...preState, repeatTriggerUnselected: res?.value! }))
                    })
                  }}>允许重复trigger
                </button>
              }
            }
          </SelectItem>

          <SelectItem id={"rest"} value={false}>
            {
              ({ isChecked }) => {
                return <button
                  className={classnames(isChecked && `${classNamePrefix}-option-checked`)}
                  onClick={() => {
                    selectRef2.current?.trigger("rest")?.then(res => {
                      selectRef.reset().then(res => {
                        setState(preState => ({ ...preState, curSelectValue: undefined }))
                      })
                    })
                  }}>
                  重置
                </button>
              }
            }
          </SelectItem>

        </div>
      </SelectSingle>
      <hr />
      <div>当前选中值：{state.curSelectValue ?? "暂无"}</div>
      <hr />
      <SelectSingle
        ref={ref => Object.assign(selectRef, { ...ref })}
      >
        {Array.from({ length: 10 }).map((_item, index) => {
          return <SelectItem key={index} id={`${index}`} value={index} repeatTriggerUnselected={state.repeatTriggerUnselected}>
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
      </SelectSingle>
    </div >
  )
}

export default singleDemo1