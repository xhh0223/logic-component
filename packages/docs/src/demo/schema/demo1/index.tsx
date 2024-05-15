import { Schema, SchemaItem, useSchemaInstance } from "@logic-component/index";
import { Flex } from "antd";

const Demo1 = () => {
  const ins = useSchemaInstance();

  return (
    <div>
      <Schema handler={ins}>
        <Flex wrap gap={16} vertical={true}>
          <SchemaItem
            id={Math.random()}
            initSchema={{ show: true, content: Math.random() }}
            render={({ id, schema }) => (
              <>
                <div
                  onClick={() => {
                    ins.updateItem(id, {
                      schema: { show: !schema.show, content: Math.random() },
                    });
                  }}
                >
                  test
                </div>
                {schema.show && <div>{schema.content}</div>}
              </>
            )}
          />
        </Flex>
      </Schema>
    </div>
  );
};

export default Demo1;
