/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

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
  useEffect(() => {
    table.options.state.activeEditCells.includes(row.index) ? setDisable(false) : null;
    console.log(activeEditCells);

  }, [activeEditCells, disable]);

  return (
    <div
      className={`cursor-pointer relative min-full grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap  ${ statusStyles[value.toLowerCase()] 
      } ${ disable ? "  " : ""}` }
    >
      <select
        
        className={`w-full text-sm border border-transparent px-1 transition duration-300 ease outline-none appearance-none cursor-pointer ${
          statusStyles[value.toLowerCase()]
        } `}
        name="status"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          table.options.meta.updateData(row.index, column.id, e.target.value);
        }}
      >
        <option value="Shipped">Shipped</option>
        <option value="Pending">Pending</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
      </select>
    </div>
  );
};

export default StatusMenu;
