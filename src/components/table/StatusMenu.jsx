/* eslint-disable no-unused-vars */
import { useEffect, useState, useCallback } from "react";

const StatusMenu = ({ row, column, table }) => {
  let [value, setValue] = useState(row.original.status);
  let [disable, setDisable] = useState(false);
  let statusStyles = {
    shipped: "bg-blue-200 text-blue-800",
    pending: "bg-yellow-200 text-yellow-800",
    cancelled: "bg-red-200 text-red-800",
    delivered: "bg-green-200 text-green-800",
  };
  let activeEditCells = table.options.state.activeEditCells;
  const handleChange = useCallback(
    (e) => {
      const newValue = e.target.value;
      setValue(newValue);
      table.options.meta.updateData(row.index, column.id, newValue);
    },
    [setValue, table, row.index, column.id]
  );
  const currentStyle = statusStyles[value.toLowerCase()] || "";
  useEffect(() => {
    table.options.state.activeEditCells.includes(row.index)
      ? setDisable(false)
      : setDisable(true);
    console.log(
      "from status menu",
      table.options.state.activeEditCells.includes(row.index),
      row.index
    );
  }, [activeEditCells, disable]);

  return (
    <div
      className={`cursor-pointer relative min-w-28 l grid justify-center  px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap  ${currentStyle} 
      ${disable ? " pointer-events-none opacity-90 " : "  "}`}
    >
      <select
        className={`w-full text-sm border border-transparent px-1 transition duration-300 ease outline-none ${currentStyle}  ${
          disable ? "  appearance-none " : "  "
        } `}
        name="status"
        value={value}
        onChange={(e) => handleChange(e)}
      >
        <option className={`${statusStyles.shipped}`} value="Shipped">
          Shipped
        </option>
        <option className={`${statusStyles.pending}`} value="Pending">
          Pending
        </option>
        <option className={`${statusStyles.delivered}`} value="Delivered">
          Delivered
        </option>
        <option className={`${statusStyles.cancelled}`} value="Cancelled">
          Cancelled
        </option>
      </select>
    </div>
  );
};

export default StatusMenu;
