import ActionButton from "./table/ActionButton";

const OrderOverviewHear = ({ table, rowSelection, children, className }) => {
  return (
    <div className={className}>
      <div className="flex justify-between items-center size-full">
        <p
          className="font-bold  tracking-tight bg-gradient-to-tr from-slate-800 to-slate-500 bg-clip-text text-transparent mx-auto w-full text-2xl lg:max-w-3xl lg:text-5xl mb-2
				"
        >
          {children}
        </p>
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

export default OrderOverviewHear;
