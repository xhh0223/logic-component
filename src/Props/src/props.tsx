import { equals, mergeDeepRight } from 'ramda'
import React, { type Ref, forwardRef, isValidElement, useEffect, useImperativeHandle, useRef, useState } from 'react'

export interface PropsRef<PropsType extends object> {
  getProps: () => PropsType | undefined
  setProps: (props: PropsType) => Promise<void>
  setMergedProps: (props: Partial<PropsType>) => Promise<void>
}

export interface PropsProps {
  children: React.ReactElement
}

const InnerProps = <PropsType extends object,>({ children }: PropsProps, ref: Ref<PropsRef<PropsType>>): React.ReactElement => {
  const cacheRef = useRef({
    isValidChildren: isValidElement(children),
    currentProps: children?.props as PropsType,
    children
  })
  const [, refresh] = useState({})
  useEffect(() => {
    if (isValidElement(children)) {
      cacheRef.current.children = children
      cacheRef.current.currentProps = children?.props as PropsType
    }
  }, [children])

  useImperativeHandle(ref, () => {
    return {
      getProps () {
        if (cacheRef.current.isValidChildren) {
          return cacheRef.current?.currentProps
        }
      },
      async setMergedProps (mergedProps) {
        if (!cacheRef.current?.isValidChildren) {
          return
        }
        const props = mergeDeepRight(children.props, mergedProps)
        const cloneChildren = React.cloneElement(children, props as PropsType)
        cacheRef.current.children = cloneChildren
        cacheRef.current.currentProps = props as PropsType
        refresh({})
      },
      /** 替换子组件props */
      async setProps (props) {
        if (!cacheRef.current?.isValidChildren || equals(cacheRef.current.currentProps, props)) {
          return
        }
        const cloneChildren = React.cloneElement(children, props)
        cacheRef.current.children = cloneChildren
        cacheRef.current.currentProps = cloneChildren.props
        refresh({})
      }
    }
  }, [])

  return cacheRef.current.children
}

type ForwardRefReturnType<PropsType extends object> = ReturnType<typeof forwardRef<PropsRef<PropsType>, PropsProps>>

/** 保留props组件泛型 */
type InnerTreeSelectSingleType = <PropsType extends object,>(
    ...params: Parameters<ForwardRefReturnType<PropsType>>
  ) => ReturnType<ForwardRefReturnType<PropsType>>

export const Props = forwardRef(InnerProps) as InnerTreeSelectSingleType
