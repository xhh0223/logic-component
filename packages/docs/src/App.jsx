import {
  SelectSingle,
  useSelectMultipleInstance,
  SelectItem,
  SelectMultiple,
} from "logic-component";
import { useEffect } from "react";
function App() {
  const ins = useSelectMultipleInstance();
  useEffect(() => {
    ins.selectAll();
  }, []);
  return (
    <>
      <div
        onClick={() => {
          ins.trigger([1]);
        }}
      >
        a
      </div>
      <div
        onClick={() => {
          console.log(ins.trigger([2]));
        }}
      >
        b
      </div>
      <div
        onClick={() => {
          ins.trigger([3]);
        }}
      >
        c
      </div>
      <SelectMultiple instance={ins}>
        <SelectItem
          id={1}
          value={{ a: 1 }}
          render={({ id, isChecked, value }) => {
            return (
              <div>
                {id} -{JSON.stringify(value)}-{JSON.stringify(isChecked)}
              </div>
            );
          }}
        />
        <SelectItem
          id={2}
          value={{ b: 2 }}
          render={({ id, isChecked, value }) => {
            return (
              <div>
                {id} -{JSON.stringify(value)}-{JSON.stringify(isChecked)}
              </div>
            );
          }}
        />
        <SelectItem
          id={3}
          value={{ c: 3 }}
          render={({ id, isChecked, value }) => {
            return (
              <div>
                {id} -{JSON.stringify(value)}-{JSON.stringify(isChecked)}
              </div>
            );
          }}
        />
      </SelectMultiple>
    </>
  );
}

export default App;
