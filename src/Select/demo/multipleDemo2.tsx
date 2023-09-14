import React, { useRef, useState } from 'react'
import { SelectItem, SelectMultiple, SelectMultipleRef } from '../src/index'

const multipleDemo2 = () => {
  const classNamePrefix = "multiple-demo-2"
  interface ValueType {
    type: 'leftTop' | 'rightTop' | 'leftBottom' | 'rightBottom',
    value: number
  }
  const ref = useRef<SelectMultipleRef<ValueType>>(null)
  const [state, setState] = useState({
    currentValue: "" as string
  })
  return (
    <div className={`${classNamePrefix}-wrapper`}>
      当前选中值：{state.currentValue ?? "暂无"}
      <hr />
      <div className={classNamePrefix}>
        <SelectMultiple ref={ref}>
          <SelectItem<ValueType> id='1' value={{
            type: "leftTop",
            value: 1,
          }}>
            <div className={`${classNamePrefix}-left-top`} onClick={() => {
              ref.current?.trigger(["1"]).then(res => {
                setState({ currentValue: res.map(item => item.value.type).join("-") })
              })
            }}>leftTop</div>
          </SelectItem>
          <SelectItem<ValueType> id='2' value={{
            type: 'rightTop',
            value: 2
          }}>
            <div className={`${classNamePrefix}-right-top`} onClick={() => {
              ref.current?.trigger(["2"]).then(res => {
                setState({ currentValue: res.map(item => item.value.type).join("-") })
              })
            }}>rightTop</div>
          </SelectItem>
          <SelectItem<ValueType> id='3' value={{
            type: 'leftBottom',
            value: 3
          }}>
            <div className={`${classNamePrefix}-left-bottom`} onClick={() => {
              ref.current?.trigger(["3"]).then(res => {
                setState({ currentValue: res.map(item => item.value.type).join("-") })
              })
            }}>leftBottom</div>
          </SelectItem>
          <SelectItem<ValueType> id='4' value={{
            type: 'rightBottom',
            value: 4
          }}>
            <div className={`${classNamePrefix}-right-bottom`} onClick={() => {
              ref.current?.trigger(["4"]).then(res => {
                setState({ currentValue: res.map(item => item.value.type).join("-") })
              })
            }}>rightBottom</div>
          </SelectItem>
        </SelectMultiple>
      </div>
    </div>

  )
}

export default multipleDemo2