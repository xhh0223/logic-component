import { omit, pick } from 'lodash-es'
import { createContext, forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'

import { SchemaCollect } from './schema-collect'
import { DependencyInfo, type ISchemaCollect, type SchemaItemProps, type SchemaProps, SchemaRef } from './typing'

const SchemaCollectContext = createContext<{
  collect: ISchemaCollect<any, any>
  handler: SchemaRef<any, any>
}>(null)

const PickColumns = ['dependency', 'id', 'schema']

const InnerSchema = <Schema, Context>(
  props: SchemaProps<Schema, Context>,
  ref: SchemaProps<Schema, Context>['ref'],
) => {
  const { children } = props
  const { current: collect } = useRef(new SchemaCollect<Schema, Context>())

  const innerHandler = useMemo(() => {
    const handler: SchemaRef<Schema, Context> = {
      getContext: collect.getContext,
      setContext: collect.setContext,
      getItem: (id) => {
        return pick(collect.getItem(id), PickColumns)
      },
      getItemDependencyInfo: (id) => {
        return collect.getItemDependencyInfo(id)?.map((i) => pick(i, PickColumns))
      },
      getAllItem: () => {
        return collect.getAllItem().map((value) => pick(value, PickColumns))
      },
      updateItem: (id, params) => {
        collect.updateItemPartialColumn(id, params)
        return handler.getItem(id)
      },
    }

    return handler
  }, [])

  useImperativeHandle(ref, () => innerHandler, [ref])

  return (
    <SchemaCollectContext.Provider value={{ collect, handler: innerHandler }}>{children}</SchemaCollectContext.Provider>
  )
}

export const Schema = forwardRef(InnerSchema) as typeof InnerSchema

export const SchemaItem = <Schema, Context>(props: SchemaItemProps<Schema, Context>) => {
  const { id, render, initDependency, initSchema } = props
  const { collect, handler } = useContext(SchemaCollectContext)

  const [, update] = useState({})

  const memoInfo = useMemo(() => {
    let cacheInfo = {} as any
    /** 新增 */
    collect.addItem({
      id,
      dependency: initDependency,
      on(dependencyInfo) {
        cacheInfo.dependency = dependencyInfo.currentTrigger?.dependency
        cacheInfo.schema = dependencyInfo.currentTrigger?.schema
        cacheInfo.dependencyInfo = dependencyInfo
        update({})
      },
      schema: initSchema,
    })
    cacheInfo = {
      dependency: initDependency,
      schema: initSchema,
      currentId: id,
      dependencyInfo: {
        currentTrigger: handler.getItem(id),
        dependencySchema: handler.getItemDependencyInfo(id),
      } as unknown as DependencyInfo<Schema>,
    }
    return cacheInfo
  }, [])

  /** 修改 */
  useMemo(() => {
    if (id !== memoInfo.currentId) {
      const beforeItem = collect.getItem(memoInfo.currentId)
      collect.delItem(memoInfo.currentId)
      memoInfo.currentId = id
      collect.addItem({
        id: memoInfo.currentId,
        ...omit(beforeItem, ['id']),
      })
    }
  }, [collect, id, memoInfo])

  /** 删除 */
  useEffect(() => {
    return () => {
      collect?.delItem(id)
    }
  }, [])

  return render(
    {
      handler,
      context: handler.getContext(),
      id: memoInfo.currentId,
      schema: memoInfo.schema,
      dependency: memoInfo.dependency,
    },
    memoInfo.dependencyInfo,
  )
}
