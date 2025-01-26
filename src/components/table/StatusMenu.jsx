/* eslint-disable react/prop-types */
import { useState } from "react";

const StatusMenu = ({ getValue, row, column, table }) => {
  let [value, setValue] = useState(getValue());
  return (
    <div>
      <select
        className="cursor-pointer"
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
