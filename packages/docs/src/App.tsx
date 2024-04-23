import { Schema, SchemaItem, useSchemaInstance } from "@component/index";
import React from "react";
import { useEffect } from "react";
function App() {
  const ins = useSchemaInstance();
  return (
    <>
      <div
        onClick={() => {
          ins.updateItemSchema(1, { a: Math.random() });
        }}
      >
        a
      </div>
      <Schema instance={ins}>
        <SchemaItem
          id={1}
          initSchema={{ a: 1 }}
          render={(schema) => {
            return <div>{JSON.stringify(schema)}</div>;
          }}
          dependency={[]}
        />
        <SchemaItem
          id={2}
          initSchema={{ b: 1 }}
          dependency={[1, 3, 0]}
          render={(schema, extraInfo) => {
            return <div>{JSON.stringify(extraInfo)}</div>;
          }}
        />
        <SchemaItem
          id={3}
          dependency={[2, 1]}
          initSchema={{ c: 1 }}
          render={(a,extra) => {
            return <div>{JSON.stringify(extra)}</div>;
          }}
        />
      </Schema>
    </>
  );
}

export default App;
