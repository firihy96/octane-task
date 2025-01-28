const Table = ({ table, flexRender, className }) => {
  return (
    <table className={className}>
      {/* Render table header */}
      <thead>
        {table.getHeaderGroups().map((headerGroup) => {
          return (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    className="min-w-10 max-w-32 px-1 py-4 min-h-16 max-h-20 border-y border-[#eceff180]-100 bg-[#eceff180]"
                  >
                    <div className="block font-sans text-sm antialiased font-normal leading-none text-[#eceff180]-900 opacity-70 mx-auto ">
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
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className="min-w-10 max-w-32 px-1 min-h-16 max-h-20 border-b border-[#eceff180]-50"
              >
                <div className="block font-sans text-sm antialiased font-bold leading-normal text-[#eceff180]-900">
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
