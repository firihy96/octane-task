/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo, useRef, act } from "react";
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
import OrderOverviewHeader from "./OrderOverviewHeader";
import Table from "./table/Table";

// Define table columns with accessors, headers, and cell renderers

// Main component for displaying orders in a table
const OrderOverview = () => {
  let [orders, setOrders] = useState([]);

  let [isLoading, setIsLoading] = useState(true);
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
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
      activateStatus: (rowStatus) => {
        if (rowStatus[1]) {
          setActiveEditCells([...activeEditCells, rowStatus[0]]);
        } else {
          setActiveEditCells((prev) => {
            return prev.filter((el) => el !== rowStatus[0]);
          });
        }
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
  }, []);
  return (
    <div className="size-full px-6 flex justify-center items-center dark:bg-gray-900">
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="flex flex-col h-full w-full items-center justify-center ">
          {/* Screen 1 Header Part */}
          <OrderOverviewHeader
            table={table}
            rowSelection={rowSelection}
            className={"h-14 p-2 size-full flex-shrink-0 "}>
            Orders Overview
          </OrderOverviewHeader>
          {/* table */}
          <Table
            table={table}
            flexRender={flexRender}
            className={" text-left flex-1 w-full"}
          />
          {/* Footer Part */}
          <Pagination table={table} />
        </div>
      )}
    </div>
  );
};
export default OrderOverview;
