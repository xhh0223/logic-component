import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'

export interface PropProxyRef<Props = any> {
  getProps: () => Props
  setProps: (params: Props) => void
  setMergedProps: (params: Partial<Props>) => void
}

export interface PropsProxyProps<Props> {
  initProps: Props
  render: (params: Props, handler: PropProxyRef<Props>) => React.ReactNode
  onMounted?: () => void
}

// eslint-disable-next-line react/display-name
export const PropsProxy = forwardRef((props: PropsProxyProps<any>, ref) => {
  const { initProps, render, onMounted } = props
  const [, update] = useState({})
  const cacheProps = useRef(initProps)

  const handler: PropProxyRef<any> = useMemo(
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
    if (onMounted && typeof onMounted === 'function') {
      onMounted()
    }
  }, [])

  useImperativeHandle(ref, () => handler, [handler])

  return render(cacheProps.current, handler)
}) as <Props>(props: PropsProxyProps<Props>, ref: PropProxyRef<Props>) => React.ReactNode
