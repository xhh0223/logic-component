import {
  TreeSelectMultiple,
  TreeSelectItem,
  useTreeSelectMultipleInstance,
} from "@logic-component/index";
import { genTreeData } from "@src/utils";
import { Checkbox, Flex } from "antd";

const Demo1 = () => {
  const ins = useTreeSelectMultipleInstance();

  const treeList = (() => {
    const treeData = genTreeData([2, 2, 2, 2, 2]);
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
      <TreeSelectMultiple instance={ins}>
        {treeList.map((i) => (
          <TreeSelectItem
            key={i.id}
            id={i.id}
            value={i}
            parentId={i.parentId}
            descendantsIds={i.children?.map((i) => ({
              id: i.id,
              children: i.children,
            }))}
            render={({ id, isChecked, value, parentId }) => {
              return (
                <Flex>
                  <Checkbox
                    onClick={() => {
                      /** select current node */
                      ins.trigger([id]);

                      /** select parent node */
                      (() => {
                        const parentDescendantsIds =
                          ins.getDescendantsIdsList(parentId);
                        const allSelected = ins
                          .getItems(parentDescendantsIds)
                          .filter((i) => i.isChecked);

                        if (!allSelected?.length) {
                          return;
                        }

                        if (
                          allSelected.length === parentDescendantsIds.length
                        ) {
                          ins.select([parentId]);
                        } else {
                          ins.cancelSelected([parentId]);
                        }
                      })();

                      /** select descend node */
                      (() => {
                        const ids = ins.getDescendantsIdsList(id);
                        if (!isChecked) {
                          ins.select(ids);
                        } else {
                          ins.cancelSelected(ids);
                        }
                      })();
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
      </TreeSelectMultiple>
    </div>
  );
};

export default Demo1;
