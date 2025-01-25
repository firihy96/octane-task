import { useState } from "react";

/* eslint-disable react/prop-types */
const StatusMenu = ({ getValue }) => {
  let [value, setValue] = useState(getValue());
  return (
    <div >
      <select className="cursor-pointer"
        name="status"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
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
