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
        return pick(collect.getItem(id), ["dependency", "id", "schema"]);
      },
      getAllItem: () => {
        return collect
          .getAllItem()
          .map((value) => pick(value, ["dependency", "id", "schema"]));
      },
      updateItem: collect.updateItemPartialColumn,
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
      /** 新增 */
      collect.addItem({
        id,
        dependency: initDependency,
        on(extraInfo) {
          memoInfo.dependency = extraInfo.triggerOnField.dependency;
          memoInfo.schema = extraInfo.triggerOnField.schema;
          memoInfo.params = extraInfo;
          update({});
        },
        schema: initSchema,
      });
      return {
        dependency: initDependency,
        schema: initSchema,
        params: null as any,
        currentId: id,
      };
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
      id: memoInfo.currentId,
      schema: memoInfo.schema,
      dependency: memoInfo.dependency,
    },
    memoInfo.params
  );
}

export function useSchemaHandler<Schema, Context>() {
  return useRef({}).current as unknown as SchemaProps<
    Schema,
    Context
  >["handler"];
}
