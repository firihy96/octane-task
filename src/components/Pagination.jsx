import { useState } from "react";

const Pagination = ({ table }) => {
  const [pageInput, setPageInput] = useState(
    table.getState().pagination.pageIndex + 1
  );

  const buttonClass =
    "border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none";

  const generatePagination = (currentPage, totalPages, siblingCount = 1) => {
    const firstPage = 0; 
    const lastPage = totalPages - 1; 

    const range = (start, end) =>
      Array.from({ length: end - start + 1 }, (_, i) => start + i);

    const pagination = [];

    pagination.push(firstPage);

    if (currentPage > firstPage + siblingCount + 1) {
      pagination.push("...");
    }

    const start = Math.max(firstPage + 1, currentPage - siblingCount);
    const end = Math.min(lastPage - 1, currentPage + siblingCount);
    pagination.push(...range(start, end));

    if (currentPage < lastPage - siblingCount - 1) {
      pagination.push("...");
    }

    pagination.push(lastPage);

    return pagination;
  };

  const currentPage = table.getState().pagination.pageIndex;
  const totalPages = table.getPageCount();
  const pagination = generatePagination(currentPage, totalPages);

  const handlePageInputChange = (e) => {
    let value = e.target.value;
    if (value === "") {
      setPageInput("");
      return;
    }

    let pageNumber = Math.max(1, Math.min(totalPages, Number(value)));
    setPageInput(pageNumber);
  };

  const handlePageSubmit = () => {
    if (pageInput >= 1 && pageInput <= totalPages) {
      table.setPageIndex(pageInput - 1);
    }
  };

  return (
    <div className="w-full h-12 p-2 flex-shrink-0 flex items-center justify-between">
      <div>
        <p className="text-slate-600">
          Go to Page{" "}
          <input
            type="number"
            className="w-fit bg-transparent placeholder:text-slate-400 placeholder:italic text-slate-700 text-sm border border-slate-200 rounded-md p-2 py-1 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            value={pageInput}
            min="1"
            max={totalPages}
            placeholder="Enter page number"
            onChange={handlePageInputChange}
            onBlur={handlePageSubmit}
            onKeyDown={(e) => e.key === "Enter" && handlePageSubmit()}
          />
        </p>
      </div >
      <div className="min-w-1/2">
        <button
          className={"rounded-md rounded-r-none rounded-l border " + buttonClass}
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        {pagination.map((page, index) => {
          if (page === "...") {
            return (
              <span key={`ellipsis-${index}`} className={"py-2 px-3 text-slate-600"}>
                ...
              </span>
            );
          }
          return (
            <button
              className={buttonClass + (currentPage === page ? " bg-slate-800 text-white" : "")}
              key={page}
              onClick={() => table.setPageIndex(page)}
            >
              {page + 1}
            </button>
          );
        })}
        <button
          className={"rounded-md rounded-l-none border " + buttonClass}
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
