import React, { useEffect, useState } from "react";
import {
  SelectSingle,
  useSelectSingleInstance,
  SelectItem,
} from "@component/index";

const SelectSingleDemo1 = () => {
  const ins = useSelectSingleInstance();
  const [, update] = useState({});

  return (
    <div>
      <SelectSingle instance={ins}>
        {Array.from({ length: 10 }).map((i, index) => (
          <SelectItem
            key={index}
            id={Math.random()}
            render={function ({ id, isChecked }): React.ReactNode {
              return (
                <div>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {
                      ins.trigger(id);
                      update({});
                    }}
                  />
                </div>
              );
            }}
            isChecked={false}
            value={undefined}
          />
        ))}
      </SelectSingle>
    </div>
  );
};

export default SelectSingleDemo1;
