const Table = ({ table, flexRender, className }) => {
  return (
    <table className={`${className} dark:bg-gray-800 dark:text-gray-200` }>
      {/* Render table header */}
      <thead>
        {table.getHeaderGroups().map((headerGroup) => {
          return (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    className="min-w-10 max-w-32 px-1 py-4 min-h-16 max-h-20 border-y border-[#eceff180]-100 bg-[#eceff180] "
                  >
                    <div className="block font-sans text-sm antialiased font-normal leading-none text-[#eceff180]-900 opacity-70 mx-auto dark:border-gray-700 ">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>
      {/* Render table body */}
      <tbody className="dark:divide-gray-700">
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className=" px-1 min-h-16 max-h-20 border-b border-[#eceff180]-50 "
              >
                <div className="block font-sans text-sm antialiased font-bold leading-normal text-[#eceff180]-900 w-full">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
