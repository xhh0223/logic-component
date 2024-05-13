import {
  TreeSelectSingle,
  TreeSelectItem,
  useTreeSelectSingleInstance,
} from "@logic-component/index";
import { genTreeData } from "@src/utils";
import { Checkbox, Flex } from "antd";

const Demo1 = () => {
  const ins = useTreeSelectSingleInstance();

  const treeList = (() => {
    const treeData = genTreeData([3, 2, 2]);
    const list = [];
    const transformTreeDataToList = (tree) => {
      tree.forEach((i) => {
        list.push(i);
        if (i?.children?.length) {
          transformTreeDataToList(i.children);
        }
      });
    };
    transformTreeDataToList(treeData);
    return list;
  })();

  return (
    <div>
      <TreeSelectSingle instance={ins}>
        {treeList.map((i) => (
          <TreeSelectItem
            key={i.id}
            id={i.id}
            value={i}
            parentId={i.parentId}
            descendantsIds={i.children}
            render={({ id, isChecked, value }) => {
              return (
                <Flex>
                  <Checkbox
                    onClick={() => {
                      ins.trigger(id);
                    }}
                    checked={isChecked}
                  >
                    {value.value}
                  </Checkbox>
                </Flex>
              );
            }}
          />
        ))}
      </TreeSelectSingle>
    </div>
  );
};

export default Demo1;
