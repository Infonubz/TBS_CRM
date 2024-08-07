import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import { AiOutlineFileExcel } from "react-icons/ai";
import { toast } from "react-toastify";
import { GetImportDataByField } from "../../../Api/Settings/DataSettings/ImportData";
import ExportButton from "../../Common/Download/Excel";
import "./index.css";

export default function Export_Data() {
  const [selectedItem, setSelectedItem] = useState(""); // State to hold selected item
  const [filename, setFilename] = useState(""); // State to hold filename
  const [dataExport, setExportData] = useState(null); // Changed initial state to null

  const handleChange = async (event) => {
    const valueName = event.target.value;
    setSelectedItem(valueName);
    try {
      const response = await GetImportDataByField(valueName);
      console.log(response, "data data data");
      setFilename(response?.data[0]?.upload_files);
      setExportData(response?.data);
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

  return (
    <div>
      <Formik enableReinitialize>
        <Form>
          <div className="grid grid-cols-12 p-[1vw] pb-[2vw]">
            <div className="col-span-7 pt-[1vw]">
              <label className="text-[#1F487C] text-[1.2vw] font-medium">
                Select Module
              </label>
              <Field
                as="select"
                id="select_fields"
                name="select_fields"
                value={selectedItem}
                onChange={handleChange}
                className="border-r-[0.3vw] px-[0.7vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none"
              >
                <option>Select fields</option>
                <option label="User management" value="User management">
                  User Management
                </option>
                <option label="Promotion" value="Promotion">
                  Promotions
                </option>
                <option label="Offers & deals" value="Offers & deals">
                  Offers & Deals
                </option>
                <option label="advertisement" value="advertisement">
                  Advertisement
                </option>
              </Field>
            </div>
            <div className="col-span-5 pl-[4vw]">
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
                  <div className="pt-[0.5vw]">
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
            <ExportButton dataArray={dataExport} />
          </div>
        </Form>
      </Formik>
    </div>
  );
}
