import {
  TreeSelectMultiple,
  TreeSelectMultipleItem,
} from "@logic-component/index";
import { genTreeData } from "@src/utils";
import { Checkbox, Flex } from "antd";

const Demo1 = () => {
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
      <TreeSelectMultiple>
        {treeList.map((i) => (
          <TreeSelectMultipleItem
            key={i.id}
            id={i.id}
            value={i}
            parentId={i.parentId}
            descendantsIds={i.children?.map((i) => ({
              id: i.id,
              children: i.children,
            }))}
            render={({ handler, id, isChecked, value, parentId }) => {
              return (
                <Flex>
                  <Checkbox
                    onClick={() => {
                      /** select current node */
                      handler.trigger([id]);

                      /** select descend node */
                      (() => {
                        const ids = handler.getDescendantsIdsList(id);
                        if (!isChecked) {
                          handler.select(ids);
                        } else {
                          handler.cancelSelected(ids);
                        }
                      })();

                      /** select parent node */
                      (() => {
                        const parentDescendantsIds =
                          handler.getDescendantsIdsList(parentId);
                        const allSelected = handler
                          .getItems(parentDescendantsIds)
                          .filter((i) => i.isChecked);

                        if (!allSelected?.length) {
                          return;
                        }

                        if (
                          allSelected.length === parentDescendantsIds.length
                        ) {
                          handler.select([parentId]);
                        } else {
                          handler.cancelSelected([parentId]);
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
