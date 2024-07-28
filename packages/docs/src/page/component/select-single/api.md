<h2 id="api">API</h2>

<h3 id="api-1">类型声明</h3>

```tsx
interface ISelectItem<ValueType = any> {
  id: Id
  isChecked: boolean
  value: ValueType
  refresh: () => void
}

type RequiredISelectItem<ValueType> = Required<Pick<ISelectItem<ValueType>, 'id' | 'isChecked' | 'value'>>

interface SelectSingleHandler<ValueType = any> {
  select: (id: Id, options?: { allowRepeatSelect?: boolean }) => RequiredISelectItem<ValueType> | undefined
  getItems: (id: Id[]) => Array<RequiredISelectItem<ValueType>>
  getAllItems: () => Array<RequiredISelectItem<ValueType>>
}
```

<h3 id="api-2">SelectSingleProps</h3>

```tsx
interface SelectSingleProps<ValueType = any> {
  children: React.ReactNode
  ref?: Ref<SelectSingleHandler<ValueType>>
}
```

<h3 id="api-3">SelectSingleItemProps</h3>

```tsx
type SelectSingleItemProps<ValueType> = {
  key: Id
  id: Id
  value?: ValueType
  render: (
    params: RequiredISelectItem<ValueType> & {
      handler: SelectSingleHandler<ValueType>
    },
  ) => React.ReactNode
}
```

<h3 id="api-4">useSelectSingleHandler</h3>

```tsx
type useSelectSingleHandler: <ValueType = any>(): SelectSingleHandler<ValueType>
```