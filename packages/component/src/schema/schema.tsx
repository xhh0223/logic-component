import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { pick, omit } from "lodash-es";
import { SchemaCollect } from "./schema-collect";
import {
  type ISchemaCollect,
  type SchemaItemProps,
  type SchemaProps,
} from "./typing";

const SchemaCollectContext = createContext<{
  collect: ISchemaCollect<any, any>;
  handler: SchemaProps<any, any>["handler"];
}>(
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  null!
);

const PickColumns = ["dependency", "id", "schema"];

export function Schema<Schema = any, Context = any>(
  props: SchemaProps<Schema, Context>
) {
  const { children, handler: outerHandler } = props;
  const { current: collect } = useRef(new SchemaCollect());

  const innerHandler = useMemo(() => {
    const handler: SchemaProps<Schema, Context>["handler"] = {
      getContext: collect.getContext,
      setContext: collect.setContext,
      getItem: (id) => {
        return pick(collect.getItem(id), PickColumns);
      },
      getAllItem: () => {
        return collect.getAllItem().map((value) => pick(value, PickColumns));
      },
      updateItem: (id, params) => {
        collect.updateItemPartialColumn(id, params);
        return handler.getItem(id);
      },
    };

    return handler;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (outerHandler) {
    Object.assign(outerHandler, innerHandler);
  }

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <SchemaCollectContext.Provider value={{ collect, handler: innerHandler }}>
      {children}
    </SchemaCollectContext.Provider>
  );
}

export function SchemaItem<Schema, Context>(
  props: SchemaItemProps<Schema, Context>
) {
  const { id, render, initDependency, initSchema } = props;
  const { collect, handler } = useContext(SchemaCollectContext);

  const [, update] = useState({});

  const memoInfo = useMemo(
    () => {
      const cacheInfo = {
        dependency: initDependency,
        schema: initSchema,
        dependencyInfo: null as any,
        currentId: id,
      };
      /** 新增 */
      collect.addItem({
        id,
        dependency: initDependency,
        on(dependencyInfo) {
          cacheInfo.dependency = dependencyInfo.triggerOnField.dependency;
          cacheInfo.schema = dependencyInfo.triggerOnField.schema;
          cacheInfo.dependencyInfo = dependencyInfo;
          update({});
        },
        schema: initSchema,
      });
      return cacheInfo;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  /** 修改 */
  useMemo(() => {
    if (id !== memoInfo.currentId) {
      const beforeItem = collect.getItem(memoInfo.currentId);
      collect.delItem(memoInfo.currentId);
      memoInfo.currentId = id;
      collect.addItem({
        id: memoInfo.currentId,
        ...omit(beforeItem, ["id"]),
      });
    }
  }, [collect, id, memoInfo]);

  /** 删除 */
  useEffect(() => {
    return () => {
      collect?.delItem(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return render(
    {
      handler,
      context: handler.getContext(),
      id: memoInfo.currentId,
      schema: memoInfo.schema,
      dependency: memoInfo.dependency,
    },
    memoInfo.dependencyInfo
  );
}

export function useSchemaHandler<Schema, Context>(): SchemaProps<
  Schema,
  Context
>["handler"] {
  return useRef({}).current as SchemaProps<Schema, Context>["handler"];
}
