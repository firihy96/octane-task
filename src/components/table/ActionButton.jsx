/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

export default function ActionButton({
  deleteMethod,
  selectedRows,
  currentSelectedRowsCount,
  totalRowsCount,
  className,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [disableDelete, setDisableDelete] = useState();
  const [disableClear, setDisableClear] = useState();

  let onClickHandler = () => {
    deleteMethod(selectedRows.map((row) => row.index));
  };

  useEffect(() => {
    currentSelectedRowsCount === 0
      ? setDisableDelete(true)
      : setDisableDelete(false);
    if (currentSelectedRowsCount === totalRowsCount) {
      setDisableClear(false);
      setDisableDelete(true);
    } else {
      setDisableClear(true);
    }
  }, [currentSelectedRowsCount, totalRowsCount]);
  return (
    <div className={`relative inline-block text-left ${className}`}>
      <button
        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Actions
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <div className="p-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                disabled={disableDelete}
                onClick={onClickHandler}
                type="checkbox"
                className="form-checkbox text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-sm text-gray-700">Delete</span>
            </label>
            {/* Clear option */}
            <label className="flex items-center space-x-2 mt-3 cursor-pointer">
              <input
                type="checkbox"
                onClick={() => onClickHandler("all")}
                className="form-checkbox text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                disabled={disableClear}
              />
              <span className="text-sm text-gray-700">Clear All</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
