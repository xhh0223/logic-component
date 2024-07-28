<h2 id="api">API</h2>

<h3 id="api-1">类型声明</h3>

```tsx
interface ITreeSelectItem<ValueType=any> {
  id: Id
  isChecked: boolean
  value?: ValueType
  refresh: () => void
  parentId: Id
  childrenIds: Id[]
}

type RequiredITreeSelectItem<ValueType> = Required<
  Pick<ITreeSelectItem<ValueType>, 'id' | 'isChecked' | 'value' | 'childrenIds' | 'parentId'>
>

type MultipleOptions = Array<{
  id: Id
  options?: {
    allowRepeatSelect?: boolean
  }
}>


interface TreeSelectMultipleHandler<ValueType = any> {
  select: (multipleOptions: MultipleOptions) => Array<RequiredITreeSelectItem<ValueType>>
  cancel: (ids: Id[]) => Array<RequiredITreeSelectItem<ValueType>>
  getItems: (ids: Id[]) => Array<RequiredITreeSelectItem<ValueType>>
  getAllItems: () => Array<RequiredITreeSelectItem<ValueType>>
  getDescendantsIds: (id: Id) => Id[]
  getAncestorsIds: (id: Id) => Id[]
}

interface CommonTreeSelectItemProps<ValueType> {
  key: Id
  id: ITreeSelectItem<ValueType>['id']
  parentId: ITreeSelectItem<ValueType>['parentId']
  childrenIds?: ITreeSelectItem<ValueType>['childrenIds']
  value?: ITreeSelectItem<ValueType>['value']
}
```

<h3 id="api-2">TreeSelectMultipleProps</h3>

```tsx
interface TreeSelectMultipleProps<ValueType = any> {
  children: React.ReactNode
  ref: Ref<TreeSelectMultipleHandler<ValueType>>
}
```

<h3 id="api-3">TreeSelectMultipleItemProps</h3>

```tsx
type TreeSelectMultipleItemProps<ValueType> = CommonTreeSelectItemProps<ValueType> & {
  render: (
    params: RequiredITreeSelectItem<ValueType> & {
      handler: TreeSelectMultipleHandler<ValueType>
    },
  ) => React.ReactNode
}
```

<h3 id="api-4">useTreeSelectMultipleHandler</h3>

```tsx
type useTreeSelectMultipleHandler: <ValueType = any>(): TreeSelectMultipleHandler<ValueType>
```