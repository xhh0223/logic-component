import React from "react";
import {
  SelectItem,
  SelectMultiple,
  useSelectMultipleInstance,
} from "@logic-component/index";
import { ISelectItem } from "@logic-component/select/typing";
const SelectMultipleDemo1 = () => {
  const selectMultipleInstance = useSelectMultipleInstance();

  return (
    <div>
      <SelectMultiple instance={selectMultipleInstance}>
        <div
          style={{
            width: 50,
            display: "flex",
            justifyContent: "space-between",
          }}
          onClick={() => {
            const triggerIds = [];
            selectMultipleInstance.getAllItem().forEach(([id, item]) => {
              if (item.id !== "reverse") {
                triggerIds.push(item.id);
              }
            });
            selectMultipleInstance.trigger([...triggerIds, "reverse"]);
          }}
        >
          <SelectItem
            id={"reverse"}
            render={function (
              params: Required<
                Pick<ISelectItem<unknown>, "id" | "isChecked" | "value">
              >
            ): React.ReactNode {
              return (
                <>
                  {params.isChecked ? "取消反选" : "反选"}
                  <input
                    type="checkbox"
                    checked={params.isChecked}
                    onChange={() => {}}
                  />
                </>
              );
            }}
          />
        </div>
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 50,
              display: "flex",
              justifyContent: "space-between",
            }}
            onClick={() => {
              selectMultipleInstance.trigger([i]);
            }}
          >
            <span>{i}</span>
            <SelectItem
              id={i}
              render={function (
                params: Required<
                  Pick<ISelectItem<unknown>, "id" | "isChecked" | "value">
                >
              ): React.ReactNode {
                return (
                  <input
                    type="checkbox"
                    checked={params.isChecked}
                    onChange={() => {}}
                  />
                );
              }}
            />
          </div>
        ))}
      </SelectMultiple>
    </div>
  );
};

export default SelectMultipleDemo1;
