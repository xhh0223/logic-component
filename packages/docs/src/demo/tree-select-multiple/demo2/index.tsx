import {
  TreeSelectMultiple,
  TreeSelectMultipleItem,
} from "@logic-component/index";
import { genTreeData } from "@src/utils";
import { Checkbox, Flex, Tag } from "antd";
import { useState } from "react";

const Demo2 = () => {
  const [everyLevelData, setEveryLevelData] = useState([
    genTreeData([3, 2, 2]),
  ]);

  return (
    <div>
      <TreeSelectMultiple>
        <Flex>
          {everyLevelData.map((levelData, level) => {
            return (
              <div key={level}>
                {levelData?.map((i) => (
                  <TreeSelectMultipleItem
                    key={i.id}
                    id={i.id}
                    render={({ handler, isChecked, descendantsIds, id }) => {
                      return (
                        <Flex gap={16}>
                          {descendantsIds ? (
                            <Tag
                              onClick={() => {
                                everyLevelData.splice(
                                  level + 1,
                                  everyLevelData.length - (level + 1)
                                );
                                everyLevelData[level + 1] = i.children;
                                setEveryLevelData([...everyLevelData]);
                              }}
                            >
                              {id}
                            </Tag>
                          ) : (
                            <Checkbox
                              onClick={() => {
                                handler.trigger([id]);
                              }}
                              checked={isChecked}
                            >
                              {id}
                            </Checkbox>
                          )}
                        </Flex>
                      );
                    }}
                    parentId={i.parentId}
                    descendantsIds={i.children as any}
                  />
                ))}
              </div>
            );
          })}
        </Flex>
      </TreeSelectMultiple>
    </div>
  );
};

export default Demo2;
