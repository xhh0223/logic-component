import { Schema, SchemaItem } from "@logic-component/index";
import { Flex } from "antd";

const Demo1 = () => {
  return (
    <div>
      <Schema>
        <Flex wrap gap={16} vertical={true}>
          <SchemaItem
            id={Math.random()}
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
