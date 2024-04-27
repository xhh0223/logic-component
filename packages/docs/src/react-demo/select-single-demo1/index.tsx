import {
  TreeSelectMultiple,
  TreeSelectItem,
  useTreeSelectMultipleInstance,
} from "@logic-component/index";
import { genTreeData } from "@src/utils/index";

const renderTree = (treeListData = [], data) => {
  data.forEach((i) => {
    treeListData.push({
      id: i.id,
      parentId: i.parentId,
      children: i.children,
      value: i.value,
    });
    if (i.children) {
      renderTree(treeListData, i.children);
    }
  });
  return treeListData;
};

const SelectSingleDemo1 = () => {
  const ins = useTreeSelectMultipleInstance();
  const data = renderTree([], genTreeData([3, 2, 4]));
  return (
    <div>
      <TreeSelectMultiple instance={ins}>
        {data.map((i) => (
          <TreeSelectItem
            key={i.id}
            id={i.id}
            parentId={i.parentId}
            children={i.children}
            value={i.value}
            render={({ id, isChecked, value }) => {
              return (
                <div
                  onClick={() => {
                    ins.trigger([id]);
                  }}
                >
                  {value}
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                  />
                </div>
              );
            }}
          />
        ))}
      </TreeSelectMultiple>
    </div>
  );
};

export default SelectSingleDemo1;
