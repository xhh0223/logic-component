<h2 id="api">API</h2>

<h3 id="api-1">类型声明</h3>

```tsx
interface ComponentProxyHandler<Props = any> {
  getProps: () => Props
  setProps: (params: Props) => Props
  setMergedProps: (params: Partial<Props>) => Props
}
```

<h3 id="api-2">ComponentProxyProps</h3>

```tsx
interface ComponentProxyProps<Props, RefObj = any> {
  ref?: Ref<ComponentProxyHandler<Props>>
  initProps: Props
  render: (
    params: Props,
    options: { handler: ComponentProxyHandler<Props>; renderNodeRef: Ref<RefObj> },
  ) => React.ReactNode
  onMounted?: (params: { renderNodeRef: Ref<RefObj>; handler: ComponentProxyHandler<Props> }) => (() => void) | void
}
```

<h3 id="api-3">useComponentProxyRef</h3>

```tsx
const useComponentProxyRef = <Props, RefObj = any>(params: Omit<ComponentProxyProps<Props, RefObj>, 'ref'>) : Ref<{
    renderNode: React.ReactNode
    handler: ComponentProxyHandler<Props>
    renderNodeRef: Ref<RefObj>
}>
```
