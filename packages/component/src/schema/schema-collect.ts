import { type ISchemaItem, type ISchemaCollect } from "./typing";
import { type Id } from "@/typing";

type DependencySchema<Schema, Context> = Parameters<
  ISchemaItem<Schema, Context>["on"]
>["0"]["dependencySchema"];

export class SchemaCollect<Schema, Context = any>
  implements ISchemaCollect<Schema, Context>
{
  private readonly schemaHashMap = new Map<
    Id,
    { item: ISchemaItem<any, any>; listenerSet: Set<Id> }
  >();

  private context!: Context;
  getContext = () => {
    return this.context;
  };

  setContext = (context: Context) => {
    this.context = context;
  };

  addItem = (schemaItem: ISchemaItem<Schema, Context>) => {
    this.schemaHashMap.set(schemaItem.id, {
      item: schemaItem,
      listenerSet: new Set(),
    });

    schemaItem?.dependency?.forEach((i) => {
      const item = this.schemaHashMap.get(i);
      if (item) {
        item.listenerSet.add(schemaItem.id);
      }
    });
    this.schemaHashMap.forEach((i) => {
      const { id, dependency } = i.item;
      const listenerSet = this.schemaHashMap.get(schemaItem.id)?.listenerSet;
      if (listenerSet && dependency?.includes(schemaItem.id)) {
        listenerSet.add(id);
      }
    });
  };

  delItem = (id: Id) => {
    const deletedItem = this.schemaHashMap.get(id);
    this.schemaHashMap.delete(id);
    if (deletedItem?.item?.dependency) {
      deletedItem.item.dependency.forEach((i) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const { listenerSet } = this.schemaHashMap.get(i)!;
        listenerSet.delete(id);
      });
    }
  };

  getItem = (id: Id) => {
    const item = this.schemaHashMap.get(id)?.item;
    if (item) {
      return {
        id: item.id,
        dependency: item.dependency,
        schema: item.schema,
      };
    }
  };

  getAllItem = () => {
    const result = [...this.schemaHashMap.entries()].map(([id, { item }]) => [
      id,
      {
        id: item.id,
        dependency: item.dependency,
        schema: item.schema as Schema,
      },
    ]);
    return result as any;
  };

  updateItemSchema = (
    id: Id,
    schema: Pick<ISchemaItem<Schema, Context>, "schema">
  ): void => {
    const record = this.schemaHashMap.get(id);
    if (!record) {
      return;
    }
    const { item, listenerSet } = record;
    item.schema = schema;

    /** 触发和听众的on方法 */
    [id, ...listenerSet.values()].forEach((i) => {
      /** 听众field */
      const { item: schemaItem } = this.schemaHashMap.get(i) ?? {};
      console.log(
        schemaItem?.dependency?.map((i) => [i, this.getItem(i)?.schema])
      );
      schemaItem?.on({
        triggerOnField: {
          id,
          schema: item.schema,
        },
        /** 获取听众监听依赖的schema */
        dependencySchema: schemaItem?.dependency?.map((i) => [
          i,
          this.getItem(i)?.schema,
        ]) as DependencySchema<Schema, Context>,
        context: this.getContext(),
      });
    });
  };
}
