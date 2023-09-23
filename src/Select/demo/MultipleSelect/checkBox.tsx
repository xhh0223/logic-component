import {
  SelectItem,
  SelectMultiple,
  type SelectMultipleRef
} from '@/Select/src'
import React, { useRef, useState } from 'react'
import './checkBox.scss'

const index = () => {
  const classNamePrefix = 'multiple-select-check-box'
  const [value, setValue] = useState<string>('')
  const [repeatTriggerUnselected, setRepeatTriggerUnselected] = useState(true)
  const [firstRepeatTriggerUnselected, setFirstRepeatTriggerUnselected] =
    useState(true)

  const ref = useRef<SelectMultipleRef<{ id: number, value: string }>>(null)
  return (
    <article className={classNamePrefix}>
      <section className={`${classNamePrefix}-value`}>当前值：{value}</section>
      <section className={`${classNamePrefix}-operator`}>
        <button
          onClick={() => {
            setRepeatTriggerUnselected(false)
          }}
        >
          允许重复点击
        </button>
        <button
          onClick={() => {
            setRepeatTriggerUnselected(true)
          }}
        >
          重复点击，取消选中
        </button>
        <button
          onClick={() => {
            setFirstRepeatTriggerUnselected(false)
          }}
        >
          允许第一项重复点击
        </button>
        <button
          onClick={() => {
            setFirstRepeatTriggerUnselected(true)
          }}
        >
          第一项重复点击，取消选中
        </button>
      </section>
      <section className={`${classNamePrefix}-select`}>
        <SelectMultiple ref={ref}>
          {Array.from({ length: 4 }).map((_, index) => (
            <SelectItem
              repeatTriggerUnselected={
                index === 0
                  ? firstRepeatTriggerUnselected
                  : repeatTriggerUnselected
              }
              key={index}
              id={index}
              value={{ id: index, value: index }}
            >
              {({ isChecked }) => (
                <div>
                  <label htmlFor={`multiple-${index}`}>{`选项${
                    index + 1
                  }`}</label>
                  <input
                    id={`multiple-${index}`}
                    checked={isChecked}
                    type="checkbox"
                    readOnly
                    onClick={() => {
                      ref.current?.trigger([index]).then(() => {
                        setValue(
                          JSON.stringify(
                            ref.current
                              ?.getAllValue()
                              ?.filter((item) => item.isChecked)
                              .map((item) => item.value)
                          )
                        )
                      })
                    }}
                  />
                </div>
              )}
            </SelectItem>
          ))}
        </SelectMultiple>
      </section>
    </article>
  )
}

export default index
