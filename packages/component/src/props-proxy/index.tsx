import { forwardRef, Ref, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'

export interface PropProxyRef<Props = any> {
  getProps: () => Props
  setProps: (params: Props) => void
  setMergedProps: (params: Partial<Props>) => void
}

export interface PropsProxyProps<Props> {
  ref?: Ref<PropProxyRef<Props>>
  initProps: Props
  render: (params: Props, handler: PropProxyRef<Props>) => React.ReactNode
  onMounted?: () => (() => void) | void
}

const InnerPropsProxy = <Props,>(props: PropsProxyProps<Props>, ref: PropsProxyProps<Props>['ref']) => {
  const { initProps, render, onMounted } = props
  const [, update] = useState({})
  const cacheProps = useRef(initProps)

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
      result = onMounted()
    }
    return () => {
      if (typeof result === 'function') {
        result()
      }
    }
  }, [])

  useImperativeHandle(ref, () => handler, [ref])

  return render(cacheProps.current, handler)
}

export const PropsProxy = forwardRef(InnerPropsProxy) as typeof InnerPropsProxy
