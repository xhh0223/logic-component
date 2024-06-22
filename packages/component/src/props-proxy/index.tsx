import { forwardRef, Ref, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'

export interface PropProxyRef<Props = any> {
  getProps: () => Props
  setProps: (params: Props) => void
  setMergedProps: (params: Partial<Props>) => void
}

export interface PropsProxyProps<Props> {
  ref?: Ref<PropProxyRef<Props>>
  initProps: Props
  render: (params: Props, options: { handler: PropProxyRef<Props>; renderJsxRef: Ref<any> }) => React.ReactNode
  onMounted?: (params: { renderNodeRef: Ref<any>; handler: PropProxyRef<Props> }) => (() => void) | void
}

const InnerPropsProxy = <Props,>(props: PropsProxyProps<Props>, ref: PropsProxyProps<Props>['ref']) => {
  const { initProps, render, onMounted } = props
  const [, update] = useState({})
  const cacheProps = useRef(initProps)

  const renderNodeRef = useRef<any>()

  const handler: PropProxyRef<Props> = useMemo(
    () => ({
      getProps: () => {
        return cacheProps.current
      },
      setProps: (params) => {
        cacheProps.current = params
        update({})
      },
      setMergedProps: (params) => {
        cacheProps.current = {
          ...cacheProps.current,
          ...params,
        }
        update({})
      },
    }),
    [],
  )

  useEffect(() => {
    let result
    if (onMounted && typeof onMounted === 'function') {
      result = onMounted({ handler, renderNodeRef })
    }
    return () => {
      if (typeof result === 'function') {
        result()
      }
    }
  }, [])

  useImperativeHandle(ref, () => handler, [ref])

  return render(cacheProps.current, { handler, renderNodeRef })
}

export const PropsProxy = forwardRef(InnerPropsProxy) as typeof InnerPropsProxy
