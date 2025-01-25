/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { retrieveOrders } from "../calls";
import Loading from "./Loading";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

// Define table columns with accessors, headers, and cell renderers
let columnsDef = [
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
    accessorKey: "orderStatus",
    header: "Order Status",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: (props) => <p>{props.getValue()}</p>,
  },
];

// Main component for displaying orders in a table
const OrderOverview = () => {
  let [orders, setOrders] = useState([]);

  let [isLoading, setIsLoading] = useState(true);

  // Initialize React Table with data, columns, and core row model
  let table = useReactTable({
    data: orders, // Data for the table
    columns: columnsDef, // Column definitions
    getCoreRowModel: getCoreRowModel(), // Core row model for table functionality
    getRowId: (originalRow) => originalRow.orderId, // Use `orderId` as the unique row ID
  });

  // Fetch orders data on component mount
  useEffect(() => {
    retrieveOrders().then((resp) => {
      setOrders(resp);
      setIsLoading(false);
    });
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="">
      {/* Show loading spinner while data is being fetched */}
      {isLoading && <Loading />}

      {/* Render table once data is loaded */}
      {!isLoading && (
        <>
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
        </>
      )}
    </div>
  );
};

export default OrderOverview;
