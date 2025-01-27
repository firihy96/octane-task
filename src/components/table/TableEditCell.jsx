import { useState } from "react";

const TableEditCell = () => {
  let [isClicked, setIsClicked] = useState(false);

  return (
    <div className="p-4 border-blue-gray-50">
      <button
        className={`relative h-10 max-h-[40px] w-10 max-w-[40px]  text-center select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/50 ${
          isClicked ? " bg-gray-900/20 " : ""
        } `}
        type="button"
        onClick={() => {
          setIsClicked((prev) => !prev);
        }}
      >
        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="w-4 h-4"
          >
            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
          </svg>
        </span>
      </button>
    </div>
  );
};

export default TableEditCell;
