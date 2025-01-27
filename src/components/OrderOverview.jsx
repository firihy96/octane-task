/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback, useRef } from "react";
import useSkipper from "../customHooks";
import { retrieveOrders } from "../calls";
import Loading from "./Loading";
import StatusMenu from "./table/StatusMenu";
import IndeterminateCheckbox from "./table/IndeterminateCheckbox";
import {
  getPaginationRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Pagination from "./Pagination";
import ActionButton from "./table/ActionButton";

// Define table columns with accessors, headers, and cell renderers
let columnsDef = [
  {
    id: "select",
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "orderId",
    header: "Order ID",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "orderDate",
    header: "Order Date",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "status",
    header: "Order Status",
    cell: StatusMenu,
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: (props) => <p>{props.getValue()}</p>,
  },
];

// Main component for displaying orders in a table
const OrderOverview = () => {
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
  let [orders, setOrders] = useState([]);

  let [isLoading, setIsLoading] = useState(true);
  // controlling pagination state
  let [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  let [rowSelection, setRowSelection] = useState({});

  // Initialize React Table with data, columns, and core row model
  let table = useReactTable({
    data: orders, // Data for the table
    columns: columnsDef, // Column definitions
    getCoreRowModel: getCoreRowModel(), // Core row model for table functionality
    getRowId: (originalRow) => originalRow.orderId, // Use `orderId` as the unique row ID
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex,
    state: {
      pagination,
      rowSelection,
    },
    meta: {
      // update table state whenever cell value changed
      updateData: (rowIndex, columnId, value) => {
        setOrders((prev) => {
          return prev.map((row, index) => {
            return index === rowIndex
              ? {
                  ...prev[rowIndex],
                  [columnId]: value,
                }
              : row;
          });
        });
      },
      deleteRows: (rowsArrIndex, all = undefined) => {
        if (all == undefined) {
          let updatedOrders = orders.filter((_, index) => {
            return !rowsArrIndex.includes(index);
          });
          // Skip page index reset until after next rerender
          setOrders(updatedOrders);
        } else {
          setOrders([]);
        }
        skipAutoResetPageIndex();
        table.resetRowSelection();
      },
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
  });
  // Fetch orders data on component mount
  useEffect(() => {
    retrieveOrders().then((resp) => {
      setOrders(resp);
      setIsLoading(false);
    });
  }, []); // Empty dependency array ensures this runs only once on mount
  return (
    <div className="flex flex-col">
      {/* Show loading spinner while data is being fetched */}
      {isLoading && <Loading />}
      {/* Render table once data is loaded */}
      {!isLoading && (
        <>
          {/* Action Button */}
          <ActionButton
            selectedRows={table.getSelectedRowModel().flatRows}
            {...{ deleteMethod: table.options.meta.deleteRows }}
            className="self-end"
            currentSelectedRowsCount={Object.keys(rowSelection).length}
            totalRowsCount={table.getPreFilteredRowModel().rows.length}
          />
          {/* Render table */}
          <table>
            {/* Render table header */}
            <thead>
              {table.getHeaderGroups().map((headerGroup) => {
                return (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <th key={header.id}>
                          {flexRender(
                            header.column.columnDef.header, // Render header content
                            header.getContext()
                          )}
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
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell, // Render cell content
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {/* Adding Pagination */}
          <Pagination table={table}/>
        </>
      )}
    </div>
  );
};

export default OrderOverview;
