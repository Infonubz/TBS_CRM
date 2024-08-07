import React, { useState, useEffect } from "react";
import { Upload, Select, message } from "antd";
import { MdCloudDownload } from "react-icons/md";
import { BsFilePdf } from "react-icons/bs";
import { MdOutlineImage } from "react-icons/md";
import { AiOutlineFileExcel } from "react-icons/ai";
import { VscPlayCircle } from "react-icons/vsc";
import image from "../../../asserts/Image.png";
import "./index.css";
import * as Yup from "yup";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { IMPORT_DATA_LIST } from "../../../Store/Type";
import {
  GetImportDataByField,
  GetImportData,
  SubmitImportData,
} from "../../../Api/Settings/DataSettings/ImportData";

const validationSchema = Yup.object().shape({
  upload_files: Yup.mixed()
    .test("fileType", "Unsupported file format", (value) => {
      if (!value) {
        return true;
      }
      const supportedFormats = [
        "application/vnd.ms-excel", // for .xls
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // for .xlsx
        "application/vnd.ms-excel.sheet.macroenabled.12",
      ];
      return supportedFormats.includes(value?.type);
    })
    .required("File is required"),
  select_fields: Yup.string().required("Field selection is required"),
});

const Import_Data = () => {
  const { Dragger } = Upload;
  const [fileName, setFileName] = useState("");
  const [fileList, setFileList] = useState([]);
  const [formValues, setFormValues] = useState({
    select_fields: "",
    upload_files: null,
    field_id: "",
  });
  const dispatch = useDispatch();
  const [updatedata, setupdatedata] = useState();

  const props = {
    name: "file",
    multiple: false,
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    fileList: fileList,
    onChange(info) {
      const { status, name } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${name} file uploaded successfully.`);
        setFileList([info.file]);
      } else if (status === "error") {
        message.error(`${name} file upload failed.`);
      }
    },
    beforeUpload(file) {
      setFileList([file]);
      return false;
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleSubmit = async (values) => {
    console.log(values, "valuesvalues");
    try {
      const data = await SubmitImportData(values, dispatch);
      toast.success(data?.message);
      console.log(data);
      setFileName("");
      setFormValues("");
      setFormValues({ field_id: "", select_fields: "", upload_files: null });
      GetImportData(dispatch);
    } catch (error) {
      console.error("Error uploading data", error);
    }
  };

  return (
    <div>
      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        enableReinitialize
      >
        {({
          handleSubmit,
          handleChange,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <Form onSubmit={handleSubmit}>
            <div className="grid grid-cols-12 pt-[1vw] pl-[4vw] pr-[4vw] pb-[2vw]">
              <div className="col-span-5 pt-[1.5vw]">
                {/* <div className="flex">
                  <p className="text-[1vw] text-[#1F487C] font-medium pl-[2.5vw]">
                    UPLOAD
                  </p>
                  <p className="text-[1vw] text-[#1F487C] font-medium pl-[2vw]">
                    FILES
                  </p>
                </div> */}
                <div className="Flex pt-[0.9vw] drag">
                  <Field name="upload_files">
                    {({ field }) => (
                      <>
                        <Dragger
                          {...props}
                          className="w-[95vw]"
                          style={{ width: "28vw" }}
                          beforeUpload={(file) => {
                            setFieldValue("upload_files", file);
                            setFileName(file.name);
                            return false;
                          }}
                          showUploadList={false}
                          onChange={(e) => {
                            setFieldValue("upload_files", e.file);
                          }}
                        >
                          <div
                            style={{
                              // backgroundImage: `url(${image})`,
                              // backgroundSize: "contain",
                              // backgroundPosition: "center",
                              // backgroundRepeat: "no-repeat",
                              height: "14vw",
                              width: "26vw",
                            }}
                          >
                            <div className="flex items-center justify-center">
                              <MdCloudDownload
                                color="#1F487C"
                                style={{ height: "6vw", width: "5.5vw" }}
                              />
                            </div>
                            <label className="flex items-center justify-center">
                              <div>
                                <p className="text-[#1F487C] text-[1.6vw] font-medium">
                                  Drag and drop your files here
                                </p>
                              </div>
                            </label>
                            <div className="flex items-center justify-center gap-6 pt-[0.2vw] pb-[1vw]">
                              <BsFilePdf
                                color="#1F487C"
                                style={{ height: "2.5vw", width: "2.5vw" }}
                              />
                              <MdOutlineImage
                                color="#1F487C"
                                style={{ height: "3.5vw", width: "3.2vw" }}
                              />
                              <AiOutlineFileExcel
                                color="#1F487C"
                                style={{ height: "2.7vw", width: "2.7vw" }}
                              />
                              <VscPlayCircle
                                color="#1F487C"
                                style={{ height: "2.9vw", width: "2.9vw" }}
                              />
                            </div>
                          </div>
                        </Dragger>
                        {fileName && (
                          <p className="text-[#1F4B7F] text-[0.8vw] mt-2">
                            {fileName}
                          </p>
                        )}
                      </>
                    )}
                  </Field>
                  {errors.upload_files && touched.upload_files && (
                    <div className="text-red-500 text-[0.8vw]">
                      {errors.upload_files}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-span-7 pt-[2vw]">
                <label className="text-[#1F487C] text-[1.2vw] font-medium">
                  Select Module
                </label>
                <Field
                  as="select"
                  id="select_fields"
                  name="select_fields"
                  value={values.select_fields}
                  onChange={(e) => {
                    handleChange(e);
                    //setupdatedata(e.target.value);
                    localStorage.setItem("select_fields", e.target.value);
                  }}
                  className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C]
                  text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none"
                >
                  <option label="Select fields" value="" className="" />
                  <option label="User Management" value="User management">
                    User Management
                  </option>
                  <option label="Promotions" value="Promotion">
                    Promotions
                  </option>
                  <option label="Offers & Deals" value="Offers & deals">
                    Offers & Deals
                  </option>
                  <option label="Advertisement" value="advertisement">
                    Advertisement
                  </option>
                </Field>
                {errors.select_fields && touched.select_fields && (
                  <div className="text-red-500 text-[0.8vw]">
                    {errors.select_fields}
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end pr-[2vw]">
              <button
                type="submit"
                className="bg-[#1F4B7F] flex px-[1vw] mb-[1vw] text-white text-[1.1vw] justify-center h-[2.5vw] gap-[0.5vw] items-center rounded-[0.5vw]"
              >
                Import
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Import_Data;
