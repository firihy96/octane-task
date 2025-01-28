/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo } from "react";
import useSkipper from "../../customHooks";
import { retrieveUsers } from "../../calls";
import Loading from "../Loading";
import StatusMenu from "../table/StatusMenu";
import IndeterminateCheckbox from "../table/IndeterminateCheckbox";
import {
  getPaginationRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Pagination from "../Pagination";
import TableCell from "../table/TableCell";
import TableEditCell from "../table/TableEditCell";
import ScreenHeader from "../ScreenHeader";
import Table from "../table/Table";

const UserManagement = ({ className }) => {
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
        accessorKey: "userId",
        header: "User ID",
        cell: TableCell,
      },
      {
        accessorKey: "username",
        header: "Username",
        cell: TableCell,
      },
      {
        accessorKey: "email",
        header: "User Email",
        cell: TableCell,
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: TableCell,
      },
      {
        accessorKey: "activeStatus",
        header: "Active Status",
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
    retrieveUsers().then((resp) => {
      setOrders(resp);
      setIsLoading(false);
    });
  }, []);
  return (
    <div className={className}>
      <div className="size-full px-6 flex justify-center items-center ">
        {isLoading && <Loading />}
        {!isLoading && (
          <div className="flex flex-col h-full w-full items-center justify-center ">
            {/* Screen 1 Header Part */}
            <ScreenHeader
              table={table}
              rowSelection={rowSelection}
              className={"h-14 p-2 size-full flex-shrink-0 "}
            >
              User Management
            </ScreenHeader>
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
    </div>
  );
};
export default UserManagement;
