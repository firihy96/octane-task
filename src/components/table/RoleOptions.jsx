import { useLayoutEffect, useState, useCallback } from "react";

const RoleOptions = ({ row, column, table }) => {
  
  const [value, setValue] = useState(row.original.role); 
  const [disable, setDisable] = useState(false);

  const roleStyles = {
    admin: "bg-purple-200 text-purple-800", 
    guest: "bg-gray-200 text-gray-800",    
    user: "bg-blue-200 text-blue-800",     
  };

  // Handle change in the select element
  const handleChange = useCallback(
    (e) => {
      const newValue = e.target.value;
      setValue(newValue);
      table.options.meta.updateData(row.index, column.id, newValue);
    },
    [ table, row.index, column.id]
  );

  
  const currentStyle = roleStyles[value.toLowerCase()];

  // Update disable state based on activeEditCells
  useLayoutEffect(() => {
    const isActive = table.options.state.activeEditCells.includes(row.index);
    setDisable(!isActive);
  }, [table.options.state.activeEditCells, row.index]);

  return (
    <div
      className={`cursor-pointer relative w-20 grid justify-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap ${currentStyle} ${
        disable ? "pointer-events-none opacity-90" : ""
      }`}
    >
      <select
        className={`min-w-12 text-sm border border-transparent py-1 transition duration-300 ease outline-none ${currentStyle} ${
          disable ? "appearance-none" : ""
        }`}
        name="role"
        value={value}
        onChange={handleChange}
        disabled={disable}
      >
        <option
          className={`${roleStyles.admin} `} 
          value="Admin"
        >
          Admin
        </option>
        <option
          className={`${roleStyles.guest}`} 
          value="Guest"
        >
          Guest
        </option>
        <option
          className={`${roleStyles.user}`} 
          value="User"
        >
          User
        </option>
      </select>
    </div>
  );
};

export default RoleOptions;