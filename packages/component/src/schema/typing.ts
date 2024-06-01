import { type ReactNode, Ref } from 'react'

import { type Id } from '@/typing'

export type RequiredIScheItem<Schema> = Pick<ISchemaItem<Schema>, 'dependency' | 'id' | 'schema'>

export interface ISchemaItem<Schema> {
  id: Id
  schema: Schema
  dependency: Id[]
  on: <Schema = any>(params: {
    currentTrigger: RequiredIScheItem<Schema>
    dependencySchema?: Array<RequiredIScheItem<Schema>>
  }) => void
}

export type CanUpdateColumn<Schema> = Partial<Pick<ISchemaItem<Schema>, 'dependency' | 'schema'>>

export interface ISchemaCollect<Schema, Context = any> {
  getContext: () => Context
  setContext: (context: Context) => void
  addItem: (params: ISchemaItem<Schema>) => void
  delItem: (id: Id) => void
  updateItemPartialColumn: (id: Id, params: CanUpdateColumn<Schema>) => void
  getItem: (id: Id) => ISchemaItem<Schema> | undefined
  getItemDependencyInfo(id: Id): Array<ISchemaItem<Schema>>
  getAllItem: () => Array<ISchemaItem<Schema>>
}

export type DependencyInfo<Schema> = Parameters<ISchemaItem<Schema>['on']>

export type SchemaRef<Schema = any, Context = any> = Pick<
  ISchemaCollect<Schema, Context>,
  'setContext' | 'getContext'
> & {
  getItem: (id: Id) => RequiredIScheItem<Schema>
  getItemDependencyInfo: (id: Id) => Array<RequiredIScheItem<Schema>>
  getAllItem: () => Array<RequiredIScheItem<Schema>>
  updateItem: (id: Id, params: CanUpdateColumn<Schema>) => RequiredIScheItem<Schema>
}
export interface SchemaProps<Schema, Context> {
  ref?: Ref<SchemaRef<Schema, Context>>
  children: ReactNode
}
export interface SchemaItemProps<Schema, Context> {
  id: Id
  render: (
    params: RequiredIScheItem<Schema> & {
      handler: SchemaRef<Schema, Context>
      context: Context
    },
    dependencyInfo: DependencyInfo<Schema>,
  ) => ReactNode
  initDependency?: Id[]
  initSchema: Schema
}
