import { useLayoutEffect, useState, useCallback } from "react";

const ActiveOption = ({ row, column, table, getValue }) => {
  const [value, setValue] = useState(getValue());
  const [disable, setDisable] = useState(false);

  const activeStyles = {
    Yes: "bg-green-100 text-green-800", 
    No: "bg-red-100 text-red-800 ",        
  };

  const handleChange = useCallback(
    (e) => {
      const newValue = e.target.value;
      setValue(newValue);
      table.options.meta.updateData(row.index, column.id, newValue); 
    },
    [table, row.index, column.id]
  );

  useLayoutEffect(() => {
    const isActive = table.options.state.activeEditCells.includes(row.index);
    setDisable(!isActive);
  }, [table.options.state.activeEditCells, row.index]);

  return (
    <div
      className={`cursor-pointer relative w-full
         grid justify-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap ${
        activeStyles[value]
      } ${disable ? "pointer-events-none opacity-90" : ""}`}
    >
      <select
        className={`w-full
           text-sm border border-transparent py-1 transition duration-300 ease outline-none ${
          activeStyles[value]
        } ${disable ? "appearance-none" : ""}`}
        name="active"
        value={value}
        onChange={handleChange}
        disabled={disable}
      >
        <option className={`${activeStyles.Yes}`} value="Yes">
          Yes
        </option>
        <option className={`${activeStyles.No}`} value="No">
          No
        </option>
      </select>
    </div>
  );
};

export default ActiveOption;