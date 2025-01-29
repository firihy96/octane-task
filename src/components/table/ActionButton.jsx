import { useEffect, useState, useRef } from "react";

export default function ActionButton({
  deleteMethod,
  selectedRows,
  currentSelectedRowsCount,
  totalRowsCount,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [disableDelete, setDisableDelete] = useState();
  const [disableClear, setDisableClear] = useState();
  const dropdownRef = useRef(null);

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
    <div ref={dropdownRef}>
      <button
        className="rounded-md min-w-24 bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none dark:bg-blue-600 dark:hover:bg-blue-500 "
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Actions
      </button>
      {isOpen && (
        <ul className="absolute mt-1 z-10 min-w-24 overflow-auto rounded-lg border border-slate-200 bg-white p-2 shadow-sm focus:outline-none">
          <li
            className={`cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 ${
              disableDelete ? "pointer-events-none opacity-50 shadow-none" : ""
            }`}
            onClick={onClickHandler}
          >
            Delete
          </li>
          <li
            className={`cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 ${
              disableClear ? "pointer-events-none opacity-50 shadow-none" : ""
            }`}
            onClick={() => onClickHandler("all")}
          >
            Clear All
          </li>
        </ul>
      )}
    </div>
  );
}
