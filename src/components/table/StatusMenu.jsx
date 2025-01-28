import { useState, useCallback, useLayoutEffect } from "react";

const StatusMenu = ({ row, column, table }) => {
  const [value, setValue] = useState(row.original.status);
  const [disable, setDisable] = useState(false);

  // Styles for each status
  const statusStyles = {
    shipped: "bg-blue-200 text-blue-800",
    pending: "bg-yellow-200 text-yellow-800",
    cancelled: "bg-red-200 text-red-800",
    delivered: "bg-green-200 text-green-800",
  };

  // Handle change in the select element
  const handleChange = useCallback(
    (e) => {
      const newValue = e.target.value;
      setValue(newValue);
      table.options.meta.updateData(row.index, column.id, newValue);
    },
    [table, row.index, column.id]
  );

  // Determine the current style based on the selected value
  const currentStyle = statusStyles[value.toLowerCase()] || "";

  // Update disable state based on activeEditCells
  useLayoutEffect(() => {
    const isActive = table.options.state.activeEditCells.includes(row.index);
    setDisable(!isActive);
  }, [table.options.state.activeEditCells, row.index]);

  return (
    <div
      className={`cursor-pointer relative min-w-28 grid justify-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap ${currentStyle} ${
        disable ? "pointer-events-none opacity-90" : ""
      }`}
    >
      <select
        className={`w-full text-sm border border-transparent px-1 transition duration-300 ease outline-none ${currentStyle} ${
          disable ? "appearance-none" : ""
        }`}
        name="status"
        value={value}
        onChange={handleChange}
        disabled={disable}
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
          Canceled
        </option>
      </select>
    </div>
  );
};

export default StatusMenu;