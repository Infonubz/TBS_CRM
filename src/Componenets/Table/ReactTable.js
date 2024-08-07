// src/components/ReactTable.js
import React from "react";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from "react-icons/ti";
import { useTable, useSortBy } from "react-table";

const ReactTable = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  return (
    <table
      {...getTableProps()}
      className="w-full rounded-lg overflow-hidden"
      style={{ borderRadius: "1vw" }}
    >
      <thead className="bg-[#1F4B7F] text-white text-[1vw] h-[2.5vw]">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                style={{
                  width: column.width,
                  textAlign: column.textAlign || "left", // Default to left alignment if not specified
                }}
              >
                <div
                  className="flex items-cente justify-center"
                  style={{
                    width: column.width,
                    textAlign: column.textAlign || "left", // Default to left alignment if not specified
                  }}
                >
                  <span>{column.render("Header")}</span>
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TiArrowSortedDown size={"1.5vw"} color="white" />
                      ) : (
                        <TiArrowSortedUp size={"1.5vw"} color="white" />
                      )
                    ) : (
                      <TiArrowUnsorted size={"1.5vw"} color="white" />
                    )}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, rowIndex) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              className={rowIndex % 2 === 0 ? "bg-white" : "bg-[#E9EDF2]"}
              style={{
                height: "3vw",
              }}
            >
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ReactTable;
