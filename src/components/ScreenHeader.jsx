import ActionButton from "./table/ActionButton";
const ScreenHeader = ({ table, rowSelection, children, className }) => {
  return (
    <div className={className}>
      <div className="flex justify-between items-center ">
        <p className="text-5xl font-extrabold text-blue-700 mb-4">{children}</p>

        <ActionButton
          selectedRows={table.getSelectedRowModel().flatRows}
          {...{ deleteMethod: table.options.meta.deleteRows }}
          currentSelectedRowsCount={Object.keys(rowSelection).length}
          totalRowsCount={table.getPreFilteredRowModel().rows.length}
        />
      </div>
    </div>
  );
};

export default ScreenHeader;
