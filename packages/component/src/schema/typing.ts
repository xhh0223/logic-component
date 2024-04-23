import { type Id } from "@/typing";
import { type ReactNode } from "react";

export interface ISchemaItem<Schema, Context> {
  id: Id;
  schema?: Schema;
  dependency: Id[];
  on: (params: {
    triggerOnField: {
      id: Id;
      schema: Schema;
    };
    /** 获取依赖的schema */
    dependencySchema: Array<[Id, Schema]>;
    /** 字段外上下文 */
    context: Context;
  }) => void;
}

export interface ISchemaCollect<Schema, Context = any> {
  getContext: () => Context;
  setContext: (context: Context) => void;
  addItem: (params: ISchemaItem<Schema, Context>) => void;
  delItem: (id: Id) => void;
  updateItemSchema: (
    id: Id,
    params: Pick<ISchemaItem<Schema, Context>, "schema">
  ) => void;
  getItem: (
    id: Id
  ) =>
    | Pick<ISchemaItem<Schema, Context>, "schema" | "dependency" | "id">
    | undefined;

  getAllItem: () => Array<
    [Id, Pick<ISchemaItem<Schema, Context>, "schema" | "dependency" | "id">]
  >;
}

export interface SchemaProps<Schema, Context> {
  children: ReactNode;
  instance: Pick<
    ISchemaCollect<Schema, Context>,
    "setContext" | "getContext" | "updateItemSchema" | "getItem" | "getAllItem"
  >;
}

export interface SchemaItemProps<Schema, Context> {
  id: Id;
  render: (
    schema: Schema | undefined,
    params: Parameters<ISchemaItem<Schema, Context>["on"]>["0"]
  ) => ReactNode;
  dependency?: Id[];
  initSchema?: Schema;
}
