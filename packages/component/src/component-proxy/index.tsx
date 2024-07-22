import { forwardRef, Ref, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'

export interface ComponentProxyHandler<Props = any> {
  getProps: () => Props
  setProps: (params: Props) => void
  setMergedProps: (params: Partial<Props>) => void
}

export interface ComponentProxyProps<Props, RefObj = any> {
  ref?: Ref<ComponentProxyHandler<Props>>
  initProps: Props
  render: (
    params: Props,
    options: { handler: ComponentProxyHandler<Props>; renderNodeRef: Ref<RefObj> },
  ) => React.ReactNode
  onMounted?: (params: { renderNodeRef: Ref<RefObj>; handler: ComponentProxyHandler<Props> }) => (() => void) | void
}

const InnerComponentProxy = <Props, RefObj = any>(
  props: ComponentProxyProps<Props>,
  ref: ComponentProxyProps<Props>['ref'],
) => {
  const { initProps, render, onMounted } = props
  const [, update] = useState({})
  const cacheProps = useRef(initProps)

  const renderNodeRef = useRef<RefObj>()

  const handler: ComponentProxyHandler<Props> = useMemo(
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

export const ComponentProxy = forwardRef(InnerComponentProxy) as typeof InnerComponentProxy

export const useComponentProxy = <Props, RefObj = any>(
  params: Omit<ComponentProxyProps<Props, RefObj>, 'ref'>,
): {
  renderNodeRef: Ref<RefObj>
  renderNode: React.ReactNode
  handler: ComponentProxyHandler<Props>
} => {
  const { initProps, render, onMounted } = params
  const result = useMemo(() => {
    const renderNode = (
      <ComponentProxy
        onMounted={onMounted}
        initProps={initProps}
        render={(props, { handler, renderNodeRef }) => {
          Object.assign(result, {
            handler,
            renderNodeRef,
          })
          return render(props, { handler, renderNodeRef })
        }}
      />
    )
    return {
      renderNode,
      handler: null,
      renderNodeRef: null,
    } as any
  }, [])

  return result
}
