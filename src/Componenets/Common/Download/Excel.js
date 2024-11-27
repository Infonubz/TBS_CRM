// ExportButton.js

import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { MdOutlineFileDownload } from "react-icons/md";
import { CiExport } from "react-icons/ci";
import { RiDownload2Fill } from "react-icons/ri";

const ExportButton = ({ dataArray }) => {
  const exportToExcel = () => {
    if (dataArray.length === 0) {
      alert("No data to export!");
      return;
    }

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(dataArray);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const excelBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(excelBlob, "exported_data.xlsx");
  };

  return (
    <button
      className="bg-[#1F4B7F] flex px-[0.75vw] text-white justify-center h-[2.5vw] gap-[0.5vw] items-center rounded-[0.5vw]"
      // bg-[#1F4B7F] flex px-[1vw]  justify-center h-[5vh] gap-[0.5vw] items-center rounded-[0.5vw]
      onClick={exportToExcel}
    >
      <span>
        <RiDownload2Fill size={"1.2vw"} color="white" />
      </span>
      <span className="text-white  text-[1.1vw]">Export</span>
    </button>
  );
};

export default ExportButton;
