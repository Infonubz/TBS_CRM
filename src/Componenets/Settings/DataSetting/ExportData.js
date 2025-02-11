import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import { AiOutlineFileExcel } from "react-icons/ai";
import { toast } from "react-toastify";
import { GetImportDataByField } from "../../../Api/Settings/DataSettings/ImportData";
import ExportButton from "../../Common/Download/Excel";
import { ConfigProvider, Select, Space } from 'antd';
import "./index.css";
import { IoMdArrowDropdown } from "react-icons/io";
import { useTable } from "react-table";

export default function Export_Data() {
  const [selectedItem, setSelectedItem] = useState("");
  const [filename, setFilename] = useState("");
  const [dataExport, setExportData] = useState(null);
  const [errors, setErrors] = useState()

  console.log(dataExport, 'data_export')


  const handleChange = async (value) => {
    setSelectedItem(value); // value is the selected option's value
    try {
      const response = await GetImportDataByField(value);
      console.log(response, "data data data");
      setFilename(response?.data[0]?.upload_files);
      setExportData(response?.data[0]?.upload_files);
      setErrors("")
      toast.success("File details fetched successfully");
    } catch (error) {
      console.error("Error fetching file details", error);
      setFilename("");
      toast.error("Error fetching file details");
    }
  };

  const handleExport = () => {
    setSelectedItem("");
    setFilename("");
    setExportData("");
  };


  const data_export = `http://192.168.90.47:4000/imp_files/${dataExport}`


  const handleDownload = () => {
    if (!selectedItem) {
      setErrors("Please select a Module.");
    } else {
      const fileUrl = `http://192.168.90.47:4000${dataExport}`;
      const a = document.createElement('a');
      a.href = fileUrl;
      a.download = '';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };


  console.log(dataExport, 'checkingLink')

  const options = [
    {
      value: '',
      label: 'Select Field',
      disabled: true
    },
    {
      value: 'User Management - Operator',
      label: 'User Management - Operator',
    },
    {
      value: 'User Management - Partner',
      label: 'User Management - Partner',
    },
    {
      value: 'User Management - Employee',
      label: 'User Management - Employee',
    },
    {
      value: 'User Management - Client',
      label: 'User Management - Client',
    },
    {
      value: 'Promotion',
      label: 'Promotions',
    },
    {
      value: 'Offers & deals',
      label: 'Offers & Deals',
    },
    {
      value: 'advertisement',
      label: 'Advertisement',
    },
  ];



  return (
    <div>

      <div className="grid grid-cols-12 p-[1vw] pb-[2vw]">
        <div className="col-span-7 pt-[1vw] ">
          <label className="text-[#1F487C] text-[1.2vw] font-medium">
            Select Module
          </label>
          <div className="relative">
            <ConfigProvider
              theme={{
                components: {
                  Select: {
                    padding: '1vw',
                    fontSize: '1vw',
                    colorText: '#1F487C'
                  },
                },
              }}
            >
              <Select
                id="select_fields"
                value={selectedItem}
                onChange={handleChange}
                suffixIcon={<span style={{ fontSize: '1vw', color: '#1f487c' }}><IoMdArrowDropdown size="2vw" /></span>}
                // className=" border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none"
                className="data-select  mt-[0.5vw]  placeholder-blue border-[#1F487C] text-[#1F487C] border-b-[0.2vw] rounded-b-[0.7vw] text-[1.2vw] h-[2.7vw] w-[100%] outline-none"
                options={options}
                dropdownStyle={{
                  paddingTop: '1wv',
                  height: '12.5vw',
                  overflow: "auto",
                  fontSize: '1vw'
                }}
              />

            </ConfigProvider>
            {errors && (
              <div className="text-red-500 text-[1vw] absolute bottom-[-1.75vw]">
                <p>{errors}</p>
              </div>
            )}
          </div>

        </div>
        <div className="col-span-5 pl-[4vw] relative">
          <div className="Flex pt-[2vw] drag">
            <div
              className="w-[98vw] preview"
              style={{ width: "28vw", height: "15vw" }}
            >
              <div className="flex items-center justify-center pt-[3vw]">
                <AiOutlineFileExcel
                  color="#1F487C"
                  style={{ height: "6vw", width: "5.5vw" }}
                />
              </div>
              <label className="flex items-center justify-center">
                <div>
                  <p className="text-[#1F487C] text-[1.6vw] font-medium">
                    Preview your files here
                  </p>
                </div>
              </label>
            </div>
            {filename && (
              <div className="pt-[0.5vw] absolute bottom-[-1.8vw]">
                <p className="text-[#1F487C] text-[1.2vw] font-medium">
                  {filename}
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
      <div className="flex justify-start pl-[1vw] pb-[1vw]">
        {/* Assuming ExportButton is properly handling dataArray and onExport */}
        {/* <ExportButton dataArray={dataExport} /> */}

        <button className="bg-[#1F4B7F] flex px-[1vw] text-white justify-center h-[5vh] gap-[0.5vw] items-center rounded-[0.5vw]"
          onClick={handleDownload}>
          Export
        </button>
      </div>

    </div>
  );
}
