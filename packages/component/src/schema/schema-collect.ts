import { type ISchemaItem, type ISchemaCollect } from "./typing";
import { type Id } from "@/typing";

export class SchemaCollect<Schema, Context = any>
  implements ISchemaCollect<Schema, Context>
{
  private readonly schemaHashMap = new Map<
    Id,
    {
      item: ISchemaItem<Schema, Context>;
      listenerSet: Set<Id>;
      /** 方便快速查找依赖 */
      dependencySet: Set<Id>;
    }
  >();

  private context!: Context;
  getContext = () => {
    return this.context;
  };

  setContext = (context: Context) => {
    this.context = context;
  };

  addDependency(id) {
    const {
      dependencySet: targetDependencySet,
      listenerSet: targetListenerSet,
    } = this.schemaHashMap.get(id);

    this.schemaHashMap.forEach((i) => {
      const { listenerSet, dependencySet } = i;
      /** 我的依赖集有你，你的监听集添加我 */
      if (targetDependencySet.has(i.item.id)) {
        listenerSet.add(id);
      }
      /** 你的依赖集有我，但是我的监听集合没有你 */
      if (dependencySet.has(id) && !targetListenerSet.has(i.item.id)) {
        targetListenerSet.add(i.item.id);
      }
    });
  }

  deleteDependency(id) {
    const {
      listenerSet: targetListenerSet,
      dependencySet: targetDependencySet,
    } = this.schemaHashMap.get(id);
    targetListenerSet.clear();
    targetDependencySet.clear();

    this.schemaHashMap.forEach((i) => {
      const { listenerSet } = i;
      if (listenerSet.has(id)) {
        listenerSet.delete(id);
      }
    });
  }

  addItem = (schemaItem: ISchemaItem<Schema, Context>) => {
    this.schemaHashMap.set(schemaItem.id, {
      item: schemaItem,
      listenerSet: new Set(),
      dependencySet: new Set(schemaItem.dependency),
    });
    this.addDependency(schemaItem.id);
  };

  delItem = (id: Id) => {
    const deletedItem = this.schemaHashMap.get(id);
    if (deletedItem) {
      this.deleteDependency(id);
      this.schemaHashMap.delete(id);
    }
  };

  updateItemPartialColumn = (id, params): void => {
    const record = this.schemaHashMap.get(id);
    if (!record) {
      return;
    }
    const { listenerSet, dependencySet } = record;

    if (params.dependency) {
      /** 删除旧依赖 */
      this.deleteDependency(id);
      /** 重置依赖 */
      dependencySet.clear();
      params.dependency.forEach((i) => {
        dependencySet.add(i);
      });
      /** 重新绑定依赖 */
      this.addDependency(id);
    }

    /** 赋值 */
    record.item = {
      ...record.item,
      ...params,
    };

    /** 触发和听众的on方法 */
    [id, ...listenerSet.values()].forEach((i) => {
      /** 听众field */
      const schemaItem = this.getItem(id);

      schemaItem?.on({
        triggerOnField: {
          id,
          schema: record.item.schema,
          dependency: record.item.dependency,
        },
        /** 获取听众监听依赖的schema */
        dependencySchema: schemaItem?.dependency?.map((i) => [
          i,
          this.getItem(i)?.schema,
        ]),
        context: this.getContext(),
      });
    });
  };

  getItem = (id) => {
    return this.schemaHashMap.get(id)?.item;
  };

  getAllItem = () => {
    const result = [...this.schemaHashMap.entries()].map(
      ([id, { item }]) => [id, item] as any
    );
    return result;
  };
}
