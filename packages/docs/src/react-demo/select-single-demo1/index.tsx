import {
  TreeSelectMultiple,
  TreeSelectItem,
  useTreeSelectMultipleInstance,
} from "@logic-component/index";

const SelectSingleDemo1 = () => {
  const ins = useTreeSelectMultipleInstance();
  return (
    <div>
      <TreeSelectMultiple instance={ins}>
        {Array.from({ length: 10 }).map((i, index) => (
          <TreeSelectItem
            key={index}
            id={Math.random()}
            parentId={1}
            children={[12]}
            allowRepeatChecked={true}
            render={({ id, isChecked, ...rest }) => {
              return (
                <div
                  onClick={() => {
                    ins.trigger([id]);
                  }}
                >
                  {JSON.stringify(isChecked)}
                </div>
              );
            }}
            value={undefined}
          />
        ))}
      </TreeSelectMultiple>
    </div>
  );
};

export default SelectSingleDemo1;
