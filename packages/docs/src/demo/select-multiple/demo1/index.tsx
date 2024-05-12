import {
  SelectItem,
  SelectMultiple,
  useSelectMultipleInstance,
} from "@logic-component/select";
import { Card, Checkbox, Avatar, Flex } from "antd";
import { useCallback, useMemo } from "react";

const Demo1 = () => {
  const ins = useSelectMultipleInstance();

  const CardWithCheck = useCallback(
    (props: { isChecked: boolean; onClick: () => void }) => {
      const { isChecked, onClick } = props;
      const suffix = useMemo(() => {
        return Math.random().toFixed(4);
      }, []);

      return (
        <Card
          onClick={onClick}
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
          extra={<Checkbox checked={isChecked} />}
        >
          <Card.Meta
            avatar={
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
            }
            title={`Card title${suffix}`}
            description={`This is the description ${suffix}`}
          />
        </Card>
      );
    },
    []
  );

  return (
    <div>
      <SelectMultiple instance={ins}>
        <Flex wrap gap={16}>
          {Array.from({ length: 10 }).map((_, index) => (
            <SelectItem
              key={index}
              id={Math.random()}
              render={({ isChecked, id }) => {
                return (
                  <CardWithCheck
                    isChecked={isChecked}
                    onClick={() => {
                      ins.trigger([id]);
                    }}
                  />
                );
              }}
            ></SelectItem>
          ))}
        </Flex>
      </SelectMultiple>
    </div>
  );
};

export default Demo1;
