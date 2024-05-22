import { Schema, SchemaItem } from "@logic-component/index";
import { Flex } from "antd";

const Demo1 = () => {
  return (
    <div>
      <Schema>
        <Flex wrap gap={16} vertical={true}>
          <SchemaItem
            id={1}
            initDependency={[2]}
            initSchema={{ show: true, content: Math.random() }}
            render={({ id, schema, handler }) => {
              return (
                <>
                  <div
                    onClick={() => {
                      handler.updateItem(id, {
                        schema: { show: !schema.show, content: Math.random() },
                      });
                    }}
                  >
                    test
                  </div>
                  {schema.show && <div>{schema.content}</div>}
                </>
              );
            }}
          />
          <SchemaItem
            id={2}
            initSchema={{ show: true, content: Math.random() }}
            render={({ id, schema, handler }) => (
              <>
                <div
                  onClick={() => {
                    handler.updateItem(id, {
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
