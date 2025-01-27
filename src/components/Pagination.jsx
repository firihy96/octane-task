/* eslint-disable react/prop-types */
const Pagination = ({ table }) => {
  let buttonClass =
    "border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none";
  return (
    <div className="flex items-center justify-between gap-2">
      <div>
        <div>
          <p className="text-slate-600">
            Page{" "}
            <strong className="text-slate-800">
              {Object.keys(table.getState().rowSelection).length}{" "}
            </strong>{" "}
            of&nbsp;
            <strong className="text-slate-800">
              {table.getPreFilteredRowModel().rows.length}
            </strong>
          </p>
        </div>
      </div>
      <div className="row flex">
        <button
          className={
            " rounded-md rounded-r-none rounded-l border " + buttonClass
          }
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className={" rounded-r-none border border-r-0 " + buttonClass}
          type="button"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        {table.getPageOptions().map((pageNumber) => {
          return (
            <button
              className={" rounded-r-none border border-r-0 " + buttonClass}
              key={pageNumber}
              onClick={() => {
                table.setPageIndex(pageNumber);
              }}
            >
              {pageNumber + 1}
            </button>
          );
        })}
        <button
          className={" rounded-r-none border border-r-0 " + buttonClass}
          type="button"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
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
