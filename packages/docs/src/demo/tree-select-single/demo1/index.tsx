import { TreeSelectSingle, TreeSelectSingleItem } from "@logic-component/index";
import { genTreeData } from "@src/utils";
import { Checkbox, Flex } from "antd";

const Demo1 = () => {
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
      <TreeSelectSingle>
        {treeList.map((i) => (
          <TreeSelectSingleItem
            key={i.id}
            id={i.id}
            parentId={i.parentId}
            childrenIds={i.children?.map((i) => i.id)}
            render={({ handler, id, isChecked }) => {
              return (
                <Flex>
                  <Checkbox
                    onClick={() => {
                      handler.trigger(id);
                    }}
                    checked={isChecked}
                  >
                    {id}
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
