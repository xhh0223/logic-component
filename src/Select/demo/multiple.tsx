import React, { useMemo } from 'react'
import { Select, SelectItem, SelectRef } from '../src'

const multiple = () => {
  const selectRef = useMemo(() => ({}) as SelectRef, [])
  return (
    <div>
      <Select ref={ref => Object.assign(selectRef, { ...ref })} onChange={v => {
        console.log(v)
      }}>
        {Array.from({ length: 10 }).map((item, index) => {
          return <SelectItem key={index} id={index} value={index}>
            <div onClick={() => selectRef.trigger([index])}>{index}</div>
          </SelectItem>
        })}
      </Select>
    </div>
  )
}

export default multiple