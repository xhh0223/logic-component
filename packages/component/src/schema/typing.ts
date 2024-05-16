import { type Id } from "@/typing";
import { type ReactNode } from "react";

export interface ISchemaItem<Schema, Context> {
  id: Id;
  schema: Schema;
  dependency: Id[];
  on: (params: {
    triggerOnField: RequiredIScheItem<Schema, Context>;
    /** 获取依赖的schema */
    dependencySchema: Array<[Id, Schema]>;
    /** 字段外上下文 */
    context: Context;
  }) => void;
}

export type CanUpdateColumn<Schema, Context> = Partial<
  Pick<ISchemaItem<Schema, Context>, "dependency" | "schema">
>;

export interface ISchemaCollect<Schema, Context = any> {
  getContext: () => Context;
  setContext: (context: Context) => void;
  addItem: (params: ISchemaItem<Schema, Context>) => void;
  delItem: (id: Id) => void;
  updateItemPartialColumn: (
    id: Id,
    params: CanUpdateColumn<Schema, Context>
  ) => void;
  getItem: (id: Id) => ISchemaItem<Schema, Context> | undefined;

  getAllItem: () => Array<ISchemaItem<Schema, Context>>;
}

export type RequiredIScheItem<Schema, Context> = Pick<
  ISchemaItem<Schema, Context>,
  "dependency" | "id" | "schema"
>;

export type OnParams<Schema, Context> = Parameters<
  ISchemaItem<Schema, Context>["on"]
>;

export interface SchemaProps<Schema, Context> {
  children: ReactNode;
  handler?: Pick<
    ISchemaCollect<Schema, Context>,
    "setContext" | "getContext"
  > & {
    getItem: (id: Id) => RequiredIScheItem<Schema, Context>;
    getAllItem: () => Array<RequiredIScheItem<Schema, Context>>;
    updateItem: (
      id: Id,
      params: CanUpdateColumn<Schema, Context>
    ) => RequiredIScheItem<Schema, Context>;
  };
}

export interface SchemaItemProps<Schema, Context> {
  id: Id;
  render: (
    currentItemInfo: RequiredIScheItem<Schema, Context> & {
      handler: SchemaProps<Schema, Context>["handler"];
    },
    params: OnParams<Schema, Context>
  ) => ReactNode;
  initDependency?: Id[];
  initSchema: Schema;
}
