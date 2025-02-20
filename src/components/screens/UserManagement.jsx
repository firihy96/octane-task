import { useState, useEffect, useMemo } from "react";
import useSkipper from "../../customHooks"; // Custom hook to skip auto-reset of page index
import { retrieveUsers } from "../../calls"; // API call to fetch users
import Loading from "../Loading"; // Loading spinner component
import IndeterminateCheckbox from "../table/IndeterminateCheckbox"; // Checkbox for row selection
import {
  getPaginationRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"; // React Table utilities
import Pagination from "../Pagination"; // Pagination component
import TableCell from "../table/TableCell"; // Default table cell renderer
import TableEditCell from "../table/TableEditCell"; // Editable table cell renderer
import ScreenHeader from "../ScreenHeader"; // Header component for the screen
import Table from "../table/Table"; // Main table component
import RoleOptions from "../table/RoleOptions"; // Dropdown menu for user roles
import ActiveOption from "../table/ActiveOption"; // Dropdown menu for active status

/**
 * Main component for displaying users in a table.
 * @param {string} className - CSS class name for styling the component.
 */
const UserManagement = ({ className }) => {
  // State to store the list of users
  let [orders, setOrders] = useState([]);

  // State to manage loading state while fetching data
  let [isLoading, setIsLoading] = useState(true);
  // state to indicate is data changes or not
  let [isChanged, setIsChanged] = useState(false);

  // state to store edited values

  let [edits, setEdits] = useState({
    deletedRows: [],
    editedStatus: [],
  });

  // Custom hook to skip auto-reset of page index during state updates
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  // State to manage pagination (current page and page size)
  let [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

  // State to manage row selection in the table
  let [rowSelection, setRowSelection] = useState({});

  // State to track which cells are in edit mode
  let [activeEditCells, setActiveEditCells] = useState([]);

  // Define table columns with accessors, headers, and cell renderers
  let columnsDef = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          // Checkbox for selecting/deselecting all rows
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          // Checkbox for selecting/deselecting individual rows
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
        accessorKey: "userId", // Unique identifier for each user
        header: "User ID",
        cell: TableCell, // Default cell renderer
      },
      {
        accessorKey: "username", // Username of the user
        header: "Username",
        cell: TableCell,
      },
      {
        accessorKey: "email", // Email of the user
        header: "User Email",
        cell: TableCell,
      },
      {
        accessorKey: "role", // Role of the user
        header: "Role",
        cell: RoleOptions, // Custom dropdown menu for roles
      },
      {
        accessorKey: "activeStatus", // Active status of the user
        header: "Active Status",
        cell: ActiveOption, // Custom dropdown menu for active status
      },
      {
        id: "edit", // Column for edit actions
        header: "",
        cell: TableEditCell, // Custom cell renderer for editing
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
    onPaginationChange: setPagination, // Handle pagination changes
    getPaginationRowModel: getPaginationRowModel(), // Enable pagination
    autoResetPageIndex, // Control auto-reset of page index
    state: {
      pagination, // Current pagination state
      rowSelection, // Current row selection state
      activeEditCells, // Current edit mode state
      isChanged,
      edits,
    },
    meta: {
      // Update table state whenever a cell value changes
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
        setIsChanged(true);
        setEdits((prev) => ({ ...prev, editedStatus: +prev.editedStatus + 1 }));
      },
      // Delete selected rows or all rows
      deleteRows: (rowsArrIndex, all = undefined) => {
        if (all == undefined) {
          let updatedOrders = orders.filter((_, index) => {
            return !rowsArrIndex.includes(index);
          });
          setOrders(updatedOrders); // Update orders state
          // store the deletes rows
          setEdits((prev) => ({
            ...prev,
            deletedRows: orders.length - updatedOrders.length,
          }));
        } else {
          setOrders([]); // Clear all orders
          setEdits((prev) => ({ ...prev, deletedRows: orders.length }));
        }
        skipAutoResetPageIndex(); // Skip auto-reset of page index
        table.resetRowSelection(); // Reset row selection
        setIsChanged(true);
      },
      // Activate or deactivate edit mode for a cell
      activateStatus: (rowStatus) => {
        if (rowStatus[1]) {
          setActiveEditCells([...activeEditCells, rowStatus[0]]); // Add cell to edit mode
        } else {
          setActiveEditCells((prev) => {
            return prev.filter((el) => el !== rowStatus[0]); // Remove cell from edit mode
          });
        }
      },
    },
    enableRowSelection: true, // Enable row selection
    onRowSelectionChange: setRowSelection, // Handle row selection changes
    onStateChange: setActiveEditCells, // Handle state changes
  });

  // Fetch users data on component mount
  useEffect(() => {
    retrieveUsers().then((resp) => {
      setOrders(resp); // Set users data
      setIsLoading(false); // Set loading state to false
    });
  }, []);

  return (
    <div className={className}>
      <div className="size-full px-6 flex justify-center items-center dark:bg-gray-900">
        {isLoading && <Loading />}{" "}
        {/* Show loading spinner while data is being fetched */}
        {!isLoading && (
          <div className="flex flex-col h-full w-full items-center justify-center ">
            {/* Screen Header */}
            <ScreenHeader
              table={table}
              edits={edits}
              rowSelection={rowSelection}
              className={"p-2 w-full flex-shrink-0 "}
            >
              User Management
            </ScreenHeader>
            {/* Table */}
            <Table
              table={table}
              flexRender={flexRender}
              className={"text-left flex-1 w-full"}
            />
            {/* Pagination */}
            <Pagination table={table} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
