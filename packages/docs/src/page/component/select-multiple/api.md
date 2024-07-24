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

interface SelectMultipleHandler<ValueType = any> {
  select(multipleParams: MultipleOptions): Array<RequiredISelectItem<ValueType>>
  cancel(id: Id[]): Array<RequiredISelectItem<ValueType>>
  getItems(id: Id[]): Array<RequiredISelectItem<ValueType>>
  getAllItems(): Array<RequiredISelectItem<ValueType>>
}
```

<h3 id="api-2">SelectMultipleProps</h3>

```tsx
interface SelectMultipleProps<ValueType = any> {
  children: React.ReactNode
  ref?: Ref<SelectMultipleHandler<ValueType>>
}
```

<h3 id="api-3">SelectMultipleItemProps</h3>

```tsx
type SelectMultipleItemProps<ValueType> = {
  id: Id
  key: Id
  value?: ValueType
  render: (
    params: RequiredISelectItem<ValueType> & {
      handler: SelectMultipleHandler<ValueType>
    },
  ) => React.ReactNode
}
```

<h3 id="api-4">useSelectMultipleHandler</h3>

```tsx
const useSelectMultipleHandler = <ValueType = any>(): SelectMultipleHandler<ValueType>
```