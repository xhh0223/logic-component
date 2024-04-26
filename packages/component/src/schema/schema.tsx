import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SchemaCollect } from "./schema-collect";
import { type SchemaItemProps, type SchemaProps } from "./typing";
import { defaultFn } from "@/utils";

const SchemaCollectContext = createContext<SchemaCollect<any, any>>(
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  null!
);

export function Schema<Schema = any, Context = any>(
  props: SchemaProps<Schema, Context>
) {
  const { children, instance } = props;
  const { current: collect } = useRef(new SchemaCollect());

  useMemo(() => {
    if (instance) {
      instance.getContext = collect.getContext;
      instance.setContext = collect.setContext;
      instance.getItem = collect.getItem;
      instance.getAllItem = collect.getAllItem;
      instance.updateItemSchema = collect.updateItemSchema;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SchemaCollectContext.Provider value={collect}>
      {children}
    </SchemaCollectContext.Provider>
  );
}

export function SchemaItem<Schema, Context>(
  props: SchemaItemProps<Schema, Context>
) {
  const { id, render, dependency, initSchema } = props;
  const collect = useContext(SchemaCollectContext);

  const [, update] = useState({});

  const memoInfo = useMemo(
    () => ({
      schema: initSchema,
      params: null as any,
      dependency,
      id,
      on(extraInfo) {
        memoInfo.schema = extraInfo.triggerOnField.schema;
        memoInfo.params = extraInfo;
        update({});
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  /** 新增 */
  useMemo(() => {
    collect.addItem({
      id: memoInfo.id,
      dependency: memoInfo.dependency,
      on: memoInfo.on,
      schema: initSchema,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** 修改 */
  useMemo(() => {
    if (id !== memoInfo.id) {
      const beforeItem = collect.getItem(memoInfo.id);
      collect.delItem(memoInfo.id);
      collect.addItem({
        id,
        schema: beforeItem.schema,
        dependency: beforeItem.dependency,
        on: memoInfo.on,
      });
    } else {
      // todo
      // collect.updateItemSchema()
    }
  }, [collect, id, memoInfo.id, memoInfo.on]);

  /** 删除 */
  useEffect(() => {
    return () => {
      collect?.delItem(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return render(memoInfo.schema, memoInfo.params);
}

export function useSchemaInstance<Schema, Context>() {
  return useRef({
    setContext: defaultFn,
    getContext: defaultFn,
    updateItemSchema: defaultFn,
    getItem: defaultFn,
    getAllItem: defaultFn,
  }).current as unknown as SchemaProps<Schema, Context>["instance"];
}
