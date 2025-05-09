import React, { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { Button, Dropdown, Grid, Space, Table, Modal, Spin } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import JSZip, { file } from "jszip";
import { saveAs } from "file-saver";
import { MdDownloadForOffline } from "react-icons/md";
import { capitalizeFirstLetter } from "../../../Common/Captilization";
import Image_Video from "../../../Common/Download/Image_Video";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import Import_Data from "../ImportData";
import ImportData from "./ImportData";
import ModalPopup from "../../../Common/Modal/Modal";
import { toast } from "react-toastify";
import { FaDownload } from "react-icons/fa6";
import { ExcelRenderer } from "react-excel-renderer";
import { MdCloudDownload } from "react-icons/md";
import { AiOutlineFileExcel } from "react-icons/ai";
import { message } from "antd";
import Dragger from "antd/es/upload/Dragger";
import {
  GetImportData,
  GetImportDataByField,
  SubmitImportData,
} from "../../../../Api/Settings/DataSettings/ImportData";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

const validationSchema = Yup.object({
  file: Yup.mixed()
    .required("File is required")
    .test("fileType", "Unsupported file format", (value) => {
      return (
        value && (value.name.endsWith(".xlsx") || value.name.endsWith(".xls"))
      );
    }),
});

const CustomTemplate = () => {
  const dispatch = useDispatch();

  const [spinning, setSpinning] = useState(false);

  const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;
  const apiurl = process.env.REACT_APP_API_URL;

  const custom_template = useSelector((state) => state.crm.import_data);
  console.log(custom_template, "custom_template");

  const fieldNames = custom_template.map((item) => item?.select_fields);
  console.log(fieldNames, "fieldNames");

  const [error, setError] = useState(null);
  const [dropDown, setDropDown] = useState("operator");
  const apiUrl = process.env.REACT_APP_API_URL;
  const [errors, setErrors] = useState();
  const [selectItems, setSelectItems] = useState();
  const [impData, setImpData] = useState();
  console.log(impData, "set_imp_data");

  console.log(dropDown, "drop_Down");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [deletemodalIsOpen, setDeleteModalIsOpen] = useState(false);
  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  console.log(selectItems, "select_Items");

  const handleDownload = () => {
    if (impData?.length === 0) {
      setErrors("No File was found");
    } else {
      const fileUrl = `${apiImgUrl}${impData?.upload_files}`;
      const a = document.createElement("a");
      a.href = fileUrl;
      a.download = "";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const user = sessionStorage.getItem("USER_ID");

  const DeleteTemplate = async () => {
    console.log("blallasasdfasd");

    try {
      const URL = `${apiUrl}/impdata/${selectItems?.imp_id}`;
      const response = await axios.delete(URL);
      toast.success(response.data);
      setDeleteModalIsOpen(false);
      console.log(response, "delete_response");
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleDropDown = (id) => {
    setDropDown(dropDown === id ? "" : id);
  };

  const columns = [
    {
      title: (
        <span className="text-[1.1vw]  text-[#1F487C] flex items-center justify-center  font-bold">
          File Size
        </span>
      ),

      render: (row) => (
        <div className="flex items-center justify-center font-normal text-[1vw] text-[#1F487C]">
          {row?.file_details?.size
            ? (row.file_details.size / 1024).toFixed(2)
            : "0.00"}{" "}
          KB
        </div>
      ),
      width: "10vw",
    },
    {
      title: (
        <span className="text-[1.1vw]  text-[#1F487C] flex items-center justify-center  font-bold">
          Created Date
        </span>
      ),

      render: (row) => (
        <div className="flex items-center justify-center font-normal text-[1vw] text-[#1F487C]">
          {dayjs(row?.created_date).format("DD MMM, YY")}
        </div>
      ),
      width: "10vw",
    },
    {
      title: (
        <span className="text-[1.1vw]  text-[#1F487C] flex items-center justify-center  font-bold">
          Update Date
        </span>
      ),
      render: (row) => (
        <div className="flex items-center font-normal justify-center text-[1vw] text-[#1F487C]">
          {row?.updated_date
            ? dayjs(row?.updated_date).format("DD MMM, YY")
            : ""}
        </div>
      ),
      width: "10vw",
    },
  ];

  const sections = [
    { id: "operator", name: "Operator", files: "1 File" },
    { id: "employee", name: "Employee", files: "1 File" },
    { id: "client", name: "Client", files: "1 File" },
    { id: "partner", name: "Partner", files: "1 File" },
    { id: "promotion", name: "Promotion", files: "1 File" },
    { id: "discount", name: "Discount Offer", files: "1 File" },
    { id: "redeem", name: "Redeem Offer", files: "1 File" },
  ];

  const updatedSections = sections.map((section) => {
    if (fieldNames.includes(section.id)) {
      return { ...section, files: "1 File" };
    } else {
      return { ...section, files: "0 File" };
    }
  });

  console.log(updatedSections, "updated_sections");

  const [rows, setRows] = useState([]);
  const [cols, setCols] = useState([]);

  const handleFileUpload = (file) => {
    ExcelRenderer(file, (err, resp) => {
      if (err) {
        console.error(err);
      } else {
        const [headers, ...data] = resp.rows;
        setCols(headers);
        setRows(data);
      }
    });
  };

  const renderRows = rows.map((row) => {
    const filledRow = [...row];
    while (filledRow.length < cols.length) {
      filledRow.push(" ");
    }
    return filledRow;
  });

  // Handle the case when there are no rows (render an empty table with headers)
  const renderEmptyRows = Array(5).fill(Array(cols.length).fill("No data"));

  const fetchExcelFile = async (sectionId) => {
    console.log(`Fetching data for sectionId: ${sectionId}`);

    try {
      console.log("Starting API call...");
      setSpinning(true);
      // Step 1: Fetch data from backend
      const response = await GetImportDataByField(
        sectionId,
        dispatch,
        setSpinning
      );
      console.log("API response received:", response); // Log the full response object
      setImpData(response.data);
      // Step 2: Check if the response is valid (status 200)
      if (response.status !== 200) {
        console.error(
          "Failed to fetch data: Non-OK response status",
          response.status
        );
        return;
      }

      // Step 3: Log the entire response to verify its structure
      console.log("Response details:", response);

      // Check if response is a valid Response object
      if (!response) {
        console.error(
          "The response object does not have a json method. It may not be a valid Response object."
        );
        return;
      }

      // Step 4: Ensure the response has the correct Content-Type (application/json)
      const contentType = response.headers.get("Content-Type");
      console.log("Response Content-Type:", contentType);

      if (!contentType || !contentType.includes("application/json")) {
        console.error("Expected JSON, but got:", contentType);
        const textResponse = await response.text(); // Log the raw response if not JSON
        console.error("Raw response body:", textResponse);
        return;
      }

      // Step 5: Parse the JSON response
      const data = await response.data;
      console.log("Parsed data from response:", data); // Log the parsed data

      // Step 6: Ensure the data contains the expected file path
      const filePath = data[0]?.upload_files;
      if (!filePath) {
        console.error("No file path found in response.");
        setCols([]); // Clear the columns state
        setRows([]); // Clear the rows state
        return; // No file to display
      }

      // Step 7: Construct the full file URL
      const baseUrl = "http://192.168.90.47:4000"; // Replace with the actual base URL
      const fullFileUrl = `${baseUrl}${filePath}`;

      console.log("Full File URL:", fullFileUrl);

      // Step 8: Fetch the file (Excel) from the constructed URL
      const fileResponse = await fetch(fullFileUrl);
      console.log("File fetch status:", fileResponse.status);

      // Step 9: Check if the file fetch was successful
      if (!fileResponse.ok) {
        console.error("Failed to fetch the file:", fileResponse.statusText);
        return;
      }

      // Step 10: Convert the file to a Blob
      const fileBlob = await fileResponse.blob();
      console.log("Fetched file as Blob:", fileBlob);

      // Step 11: Parse the Excel file using ExcelRenderer
      ExcelRenderer(fileBlob, (err, resp) => {
        if (err) {
          console.error("Error reading Excel file:", err);
          return;
        }

        console.log("ExcelRenderer response:", resp); // Log parsed Excel data

        // Step 12: Extract headers and rows
        const [headers, ...dataRows] = resp.rows;

        // Assuming you have set functions to handle the columns and rows
        setCols(headers); // Set headers in state
        setRows(dataRows); // Set rows in state
      });
    } catch (error) {
      console.error("Error fetching Excel file:", error); // Catch and log any errors
    }
  };

  useEffect(() => {
    GetImportData(dispatch);
    if (dropDown) {
      fetchExcelFile(dropDown);
    }
  }, [dropDown]);

  const handleSubmit = async (values) => {
    console.log(values, "file_uploading");
    try {
      const data = await SubmitImportData(values, dropDown, dispatch);
      toast.success(data?.message);
      console.log(data);
      closeModal();
      fetchExcelFile(dropDown);
      GetImportData(dispatch);
    } catch (error) {
      console.error("Error uploading data", error);
    }
  };

  const scrollContainerRef = useRef(null);

  const handleDropDownChange = (id) => {
    toggleDropDown(id);
  };

  useEffect(() => {
    if (scrollContainerRef.current && dropDown !== null) {
      // Find the selected section element
      const selectedSection = document.getElementById(dropDown);
      if (selectedSection) {
        // Scroll to the selected section
        const container = scrollContainerRef.current;
        const sectionPosition = selectedSection.offsetLeft;
        const sectionWidth = selectedSection.offsetWidth;
        const containerWidth = container.offsetWidth;

        // Scroll the same amount to left or right
        if (sectionPosition < container.scrollLeft) {
          // Scroll left (by sectionWidth)
          container.scrollTo({
            left: container.scrollLeft - sectionWidth,
            behavior: "smooth",
          });
        } else if (
          sectionPosition + sectionWidth >
          container.scrollLeft + containerWidth
        ) {
          // Scroll right (by sectionWidth)
          container.scrollTo({
            left: container.scrollLeft + sectionWidth,
            behavior: "smooth",
          });
        }
      }
    }
  }, [dropDown]);

  return (
    <>
      <div className="px-[1vw] py-[0.5vw]">
        {/* <div className="flex justify-end pb-[1vw]">
          <button
            onClick={() => {
              setModalIsOpen(true);
              setSelectItems("");
            }}
            className="order-last w-[7.5vw]   bg-[#1F487C] mr-[1vw] text-white rounded-md text-[1.2vw] h-[2.5vw] font-semibold flex items-center justify-center gap-[0.5vw]"
          >
            <span>
              <FaDownload />
            </span>
            <span>Add</span>
          </button>
        </div> */}
        {/* <div className="rounded-xl border-[#1F487C] border-[0.1vw] border-b-[0.1vw]"> */}
        {/* -------------------------------------------SearchTab------------------------------------- */}

        {/* <div className="flex bg-[#1F487C] rounded-t-xl py-[0.5vw] items-center gap-[1vw] justify-between">
            <div className="flex gap-[1vw]">
              <div className="relative pl-[1vw]">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-[16vw] h-[2.25vw] text-[1vw] text-[#1F487C] rounded-[0.5vw] pl-[3vw] placeholder-[#1F487C] placeholder:text-[1vw] outline-none"
                />
                <div className="absolute top-[0.75vw] left-[1.5vw]">
                  <IoIosSearch color="#1F487C" />
                </div>
              </div>
              <div className="flex items-center gap-[1.5vw]">
                <span className="text-white text-[1vw]">Sort : </span>
                <span className="text-white text-[1vw]">Module Name</span>
                <span className="text-white text-[1vw]">File Size </span>
                <span className="text-white text-[1vw]">Date Added</span>
              </div>
            </div>
            <button
              onClick={() => {
                setModalIsOpen(true);
                setSelectItems("");
              }}
              className="order-last w-[7.5vw] px-[1.5vw] bg-white mr-[2vw] text-[#1F487C] rounded-md text-[1.2vw] h-[2.5vw] font-semibold flex items-center justify-center gap-[0.5vw]"
            >
              <span>
                <FaDownload />
              </span>
              <span>Import</span>
            </button>
          </div> */}

        {/* ------------------------------------Folders----------------------------------------------- */}
        <div className="px-[1vw] mb-[1vw]">
          <div
            ref={scrollContainerRef}
            className="scrollbar-custom  pb-[0.5vw] flex overflow-x-scroll gap-x-[1vw] w-[100%]"
          >
            {updatedSections.map((section) => (
              <div
                key={section.id}
                className={`${dropDown === section.id ? "" : "py-[0.5vw]"}`}
              >
                <div
                  onClick={() => handleDropDownChange(section.id)}
                  className={`${
                    dropDown === section.id
                      ? "w-[14vw] h-[9.5vw] bg-[#1F487C]"
                      : "w-[13.5vw] h-[9vw] bg-white"
                  } border-[0.2vw] border-[#1F487C] rounded-xl border-t-[0.5vw] cursor-pointer`}
                >
                  <div className="pl-[1vw] pt-[0.5vw] grid grid-rows-3 gap-y-[1vw]">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-[1.5vw] h-[1.5vw]"
                      >
                        <path
                          d="M448 480H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H192c20.1 0 39.1 9.5 51.2 25.6l19.2 25.6c6 8.1 15.5 12.8 25.6 12.8H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64zM184 272c-13.3 0-24 10.7-24 24s10.7 24 24 24H328c13.3 0 24-10.7 24-24s-10.7-24-24-24H184z"
                          fill={`${
                            dropDown === section.id ? "#FFF" : "#1F487C"
                          }`}
                        />
                      </svg>
                    </div>
                    <div
                      className={`${
                        dropDown === section.id
                          ? "text-white"
                          : "text-[#1F487C]"
                      } text-[1.1vw] font-bold`}
                    >
                      {section.name}
                    </div>
                    <div
                      className={`${
                        dropDown === section.id
                          ? "text-white"
                          : "text-[#1F487C]"
                      } text-[0.9vw] font-semibold`}
                    >
                      {section.files}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* ------------------------------------------PreviewSections--------------------------------- */}
        <div>
          <div className="px-[1vw]">
            <div className="">
              <div>
                <div className="flex ">
                  <div className="col-span-1 w-4/6">
                    {spinning ? (
                      <div className="absolute inset-0 flex justify-center items-center  z-10">
                        <Spin size="large" />
                      </div>
                    ) : (
                      <Table
                        columns={columns}
                        dataSource={impData}
                        // onChange={handleChange}
                        pagination={false}
                        className="customize-table"
                        // scroll={{ y: "20vw" }}
                        // onRow={(record) => ({
                        //   onClick: () => handleOnClick(record),
                        // })}
                      />
                    )}
                  </div>

                  <div className="col-span-1 p-[0.5vw] w-2/6 justify-self-end">
                    <Formik
                      initialValues={{
                        file: null,
                      }}
                      validationSchema={validationSchema}
                      onSubmit={(values) => {
                        const excel_file = values.file;
                        handleSubmit(excel_file);
                        console.log("Form submitted with values", excel_file);
                        message.success("File uploaded successfully");
                      }}
                    >
                      {({ setFieldValue, errors, touched, handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                          <Dragger
                            name="file"
                            multiple={false}
                            accept=".xlsx,.xls"
                            showUploadList={false}
                            customRequest={({ file, onSuccess, onError }) => {
                              handleFileUpload(file);
                              setFieldValue("file", file);
                              onSuccess("ok");
                            }}
                            onDrop={(e) => {
                              console.log(
                                "Dropped files",
                                e.dataTransfer.files
                              );
                            }}
                            onChange={(e) => {
                              setFieldValue(e.file);
                              console.log(e.file, "check_file_onchange");
                            }}
                            className="excel-dragger"
                          >
                            <div
                              className={` ${
                                cols.length > 0 && rows.length > 0
                                  ? " w-[28.5vw]"
                                  : " flex flex-col justify-center items-center"
                              } scrollbar-custom overflow-auto  h-[11vw]`}
                            >
                              {cols.length > 0 && rows.length > 0 ? (
                                <table className="table-auto border-separate border-spacing-0 w-1/2">
                                  <thead className="bg-gray-200">
                                    <tr>
                                      {cols.map((header, index) => (
                                        <th
                                          key={index}
                                          className="border border-gray-300 px-[0.5vw] py-[0.2vw] text-center font-semibold text-[0.7vw]"
                                        >
                                          {header}
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {Array.from({ length: 50 }).map(
                                      (_, rowIndex) => {
                                        const row =
                                          renderRows[rowIndex] ||
                                          new Array(cols.length).fill("");

                                        return (
                                          <tr
                                            key={rowIndex}
                                            className="hover:bg-gray-100"
                                          >
                                            {row.map((cell, colIndex) => (
                                              <td
                                                key={colIndex}
                                                className="border border-gray-300 px-[0.5vw] py-[0.3vw] text-[0.6vw] text-left"
                                              >
                                                {cell !== "" &&
                                                cell !== null &&
                                                cell !== undefined
                                                  ? cell
                                                  : ""}
                                              </td>
                                            ))}
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </table>
                              ) : (
                                <tr>
                                  <td
                                    // colSpan={cols.length}
                                    className="w-full"
                                  >
                                    <div
                                      style={{
                                        height: "",
                                        width: "",
                                      }}
                                      className=""
                                    >
                                      <div className="flex justify-center">
                                        <MdCloudDownload
                                          color="#1F487C"
                                          style={{
                                            height: "6vw",
                                            width: "5.5vw",
                                          }}
                                        />
                                      </div>
                                      <label className="flex justify-center">
                                        <div>
                                          <p className="text-[#1F487C] text-[1.6vw] font-medium">
                                            Drag and drop your files here
                                          </p>
                                        </div>
                                      </label>
                                      <div className="flex justify-center gap-6 pt-[0.2vw] pb-[1vw]">
                                        <AiOutlineFileExcel
                                          color="#1F487C"
                                          style={{
                                            height: "2.7vw",
                                            width: "2.7vw",
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </div>
                          </Dragger>

                          {touched.file && errors.file && (
                            <div className="text-red-500 text-[0.9vw] mt-2">
                              {errors.file}
                            </div>
                          )}

                          <div className="grid grid-cols-2 justify-items-center h-[2.25vw] border-t-0 border-[0.1vw] rounded-b-[0.6vw] border-[#1F487C]">
                            <div
                              onClick={handleDownload}
                              className={` ${
                                impData?.length === 0
                                  ? "bg-slate-400 cursor-not-allowed"
                                  : "bg-[#1F487C] cursor-pointer hover:font-bold"
                              } flex  items-center justify-center text-[1.1vw] text-white w-full rounded-bl-[0.5vw] `}
                            >
                              Download
                            </div>
                            <button
                              type="submit"
                              className="flex items-center justify-center text-[1.1vw] w-full rounded-br-[0.5vw] text-[#1F487C] hover:font-bold"
                            >
                              {impData?.length === 0 ? "Save" : "Update"}
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                    <div className="flex items-center">
                      <span className="text-red-500 text-[0.9vw]">*</span>
                      <span className="text-[#1F487C] text-[0.9vw]">
                        Note : Template with two sample data.{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
      <ModalPopup
        show={modalIsOpen}
        onClose={closeModal}
        height="auto"
        width="auto"
        className=""
      >
        <ImportData
          // fetchDocuments={fetchDocuments}
          closeModal={closeModal}
          selectFields={selectItems?.select_fields}
          selectname={selectItems?.upload_files}
        />
      </ModalPopup>

      <ModalPopup
        show={deletemodalIsOpen}
        onClose={closeDeleteModal}
        height="auto"
        width="30vw"
        closeicon={false}
      >
        <p className="text-[#1F487C] text-[1.2vw] text-center">
          Are You Sure want to delete this {selectItems?.select_fields} ?
        </p>
        <div className="flex items-center mt-[2vw] gap-[2vw] justify-center">
          <button
            className="border-[#1f4b7f] border-[0.1vw] rounded-[0.5vw] text-[1.1vw] font-semibold text-[#1f4b7f] w-[10vw]  h-[3vw]"
            onClick={() => setDeleteModalIsOpen(false)}
          >
            No
          </button>
          <button
            className="bg-[#1f4b7f] text-white font-semibold text-[1.1vw] w-[10vw] h-[3vw] rounded-[0.5vw]"
            // onClick={() => DeletePromoData()}
            onClick={() => DeleteTemplate()}
          >
            Yes
          </button>
        </div>
      </ModalPopup>
    </>
  );
};

export default CustomTemplate;
