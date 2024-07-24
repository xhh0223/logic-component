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

interface TreeSelectSingleHandler<ValueType = any> {
  select: (id: Id, options?: { allowRepeatSelect?: boolean }) => RequiredITreeSelectItem<ValueType> | undefined
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

<h3 id="api-2">TreeSelectSingleProps</h3>

```tsx
interface TreeSelectSingleProps<ValueType = any> {
  children: React.ReactNode
  ref?: Ref<TreeSelectSingleHandler<ValueType>>
}
```

<h3 id="api-3">TreeSelectSingleItemProps</h3>

```tsx
type TreeSelectSingleItemProps<ValueType> = CommonTreeSelectItemProps<ValueType> & {
  render: (
    params: RequiredITreeSelectItem<ValueType> & {
      handler: TreeSelectSingleHandler<ValueType>
    },
  ) => React.ReactNode
}
```

<h3 id="api-4">useTreeSelectSingleHandler</h3>

```tsx
const useTreeSelectSingleHandler = <ValueType = any>(): TreeSelectSingleHandler<ValueType>
```