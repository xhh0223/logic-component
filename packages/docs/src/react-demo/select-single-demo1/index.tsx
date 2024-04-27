import { useState } from "react";
import { Schema, useSchemaInstance, SchemaItem } from "@component/index";

const SelectSingleDemo1 = () => {
  const ins = useSchemaInstance();
  const [, update] = useState({});

  return (
    <div>
      <Schema instance={ins}>
        {Array.from({ length: 10 }).map((i, index) => (
          <SchemaItem
            key={index}
            id={Math.random()}
            initSchema={{
              value: Math.random(),
            }}
            initDependency={[1, 2, 3]}
            render={(t, extra) => {
              return (
                <div
                  onClick={() => {
                    ins.updateItemPartialColumn(t.id, {
                      schema: {
                        value: Math.random(),
                      },
                      dependency: [1, 2,3,5],
                    });
                    // update({});
                  }}
                >
                  {JSON.stringify(t)}
                </div>
              );
            }}
          />
        ))}
      </Schema>
    </div>
  );
};

export default SelectSingleDemo1;
