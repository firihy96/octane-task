/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo, useRef } from "react";
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
import TableCell from "./table/TableCell";
import TableEditCell from "./table/TableEditCell";

// Define table columns with accessors, headers, and cell renderers

// Main component for displaying orders in a table
const OrderOverview = () => {
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
  let [orders, setOrders] = useState([]);

  let [isLoading, setIsLoading] = useState(true);
  // controlling pagination state
  let [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

  let [rowSelection, setRowSelection] = useState({});

  let [activeEditCells, setActiveEditCells] = useState([]);
  let columnsDef = useMemo(
    () => [
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
          <div>
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
        cell: TableCell,
      },
      {
        accessorKey: "customerName",
        header: "Customer Name",
        cell: TableCell,
      },
      {
        accessorKey: "orderDate",
        header: "Order Date",
        cell: TableCell,
      },
      {
        accessorKey: "status",
        header: "Order Status",
        cell: StatusMenu,
      },
      {
        accessorKey: "totalAmount",
        header: "Total Amount",
        cell: TableCell,
      },
      {
        id: "edit",
        header: "",
        cell: TableEditCell,
      },
    ],
    []
  );

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
      activeEditCells,
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
      activateStatus: (rowIndex) => {
        setActiveEditCells((prev) => {
          let unique = Array.from(new Set(prev));
          if (!unique.includes(rowIndex)) {
            unique.push(rowIndex);
            return unique;
          } else {
            return unique.filter((el) => el !== rowIndex);
          }
        });
      },
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onStateChange: setActiveEditCells,
  });
  // Fetch orders data on component mount
  useEffect(() => {
    retrieveOrders().then((resp) => {
      setOrders(resp);
      setIsLoading(false);
    });
  }, []); // Empty dependency array ensures this runs only once on mount
  return (
    <div className="size-full px-0 overflow-hidden">
      {/* Show loading spinner while data is being fetched */}
      {isLoading && <Loading />}
      {/* Render table once data is loaded */}
      {!isLoading && (
        <div className="flex flex-col size-full ">
          {/* Action Button */}
          <div className="h-fit max-h-16 p-2 w-full self-start">
            <ActionButton
              selectedRows={table.getSelectedRowModel().flatRows}
              {...{ deleteMethod: table.options.meta.deleteRows }}
              className="self-end"
              currentSelectedRowsCount={Object.keys(rowSelection).length}
              totalRowsCount={table.getPreFilteredRowModel().rows.length}
            />
          </div>
          {/* Render table */}
          <table className="w-fit text-left table-auto min-w-max flex-1">
            {/* Render table header */}
            <thead>
              {table.getHeaderGroups().map((headerGroup) => {
                return (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <th
                          key={header.id}
                          className="min-w-24 max-w-32 py-4 px-2 border-y border-[#eceff180]-100 bg-[#eceff180]"
                        >
                          <div className="block font-sans text-sm antialiased font-normal leading-none text-[#eceff180]-900 opacity-70 mx-auto">
                            {flexRender(
                              header.column.columnDef.header, // Render header content
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
                    <td key={cell.id} className="min-w-24 max-w-32  px-2 border-b border-[#eceff180]-50">
                      <div className="block font-sans text-sm antialiased font-bold leading-normal text-[#eceff180]-900">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Adding Pagination */}
          <Pagination table={table} />
        </div>
      )}
    </div>
  );
};
export default OrderOverview;
