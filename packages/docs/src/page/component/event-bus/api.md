<h2 id="api">API</h2>

<h3 id="api-1">类型声明</h3>

```tsx
type MultipleParams<Param> = Array<{
  id: Id
  params: Param
}>

interface IEventBusItem {
  id: Id
  onIds: Id[]
  on(onIdsParams: MultipleParams<any>): void
}

interface IEventBusCollect<Context = any> {
  getContext: () => Context
  setContext: (context: Context) => void
  getItem: (id) => IEventBusItem | undefined
  setItem: (id, params: IEventBusItem) => void
  delItem: (id: Id) => void
  emit: <Params = any>(multipleParams: MultipleParams<Params>) => void
}

type EventBusHandler<Context = any> = {
  emit: IEventBusCollect<Context>['emit']
  on: <Params>(params: { id: Id; onIds: Id[]; callback: (multipleParams: MultipleParams<Params>) => void }) => void
  off: (id: Id) => void
  getContext: IEventBusCollect<Context>['getContext']
  setContext: IEventBusCollect<Context>['setContext']
}

```

<h3 id="api-2">EventBusProps</h3>

```tsx
interface EventBusProps<Context> {
  initCallback?: (params: { handler: EventBusHandler<Context> }) => void
  children: React.ReactNode
  ref?: Ref<EventBusHandler<Context>>
}
```

<h3 id="api-3">EventBusItemProps</h3>

```tsx
interface EventBusItemProps<Params = any, Context = any> {
  key: Id
  id: Id
  onIds?: Id[]
  initCallback?: (params: { handler: EventBusHandler<Context> }) => void
  render: (params: {
    id: Id
    onIdsParams: MultipleParams<Params>
    handler: EventBusHandler<Context>
    context: Context
  }) => React.ReactNode
}
```

<h3 id="api-4">useEventBusHandler</h3>

```tsx
type useEventBusHandler: <Context = any>(): EventBusHandler<Context>
```