import { Button, Modal, Progress, Upload } from "antd";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  SubmitAddressData,
  SubmitCompanyData,
  SubmitDocumentsData,
} from "../../../Api/UserManagement/SuperAdmin";
import {
  GetEmpDocumentById,
  SubmitEmpDocumentsData,
} from "../../../Api/UserManagement/Employee";
import { useDispatch } from "react-redux";

const FILE_SIZE = 1024 * 1024 * 5; // 5MB
const SUPPORTED_FORMATS = [
  "application/pdf",
  "image/jpg",
  "image/jpeg",
  "image/png",
];

const validationSchema = Yup.object().shape({
  aadhar_doc: Yup.mixed()
    .required("Aadhar Front Page is required")
    .test("fileSize", "File too large", (value) =>
      typeof value === "string" ? true : value && value.size <= FILE_SIZE
    )
    .test("fileFormat", "Unsupported Format", (value) =>
      typeof value === "string"
        ? true
        : value && SUPPORTED_FORMATS.includes(value.type)
    ),
  pan_doc: Yup.mixed()
    .required("Aadhar Back Page is required")
    .test("fileSize", "File too large", (value) =>
      typeof value === "string" ? true : value && value.size <= FILE_SIZE
    )
    .test("fileFormat", "Unsupported Format", (value) =>
      typeof value === "string"
        ? true
        : value && SUPPORTED_FORMATS.includes(value.type)
    ),
  work_exp_doc: Yup.mixed()
    .required("Work Expirence Front Page is required")
    .test("fileSize", "File too large", (value) =>
      typeof value === "string" ? true : value && value.size <= FILE_SIZE
    )
    .test("fileFormat", "Unsupported Format", (value) =>
      typeof value === "string"
        ? true
        : value && SUPPORTED_FORMATS.includes(value.type)
    ),
  other_doc: Yup.mixed()
    .required("Pan Back Page is required")
    .test("fileSize", "File too large", (value) =>
      typeof value === "string" ? true : value && value.size <= FILE_SIZE
    )
    .test("fileFormat", "Unsupported Format", (value) =>
      typeof value === "string"
        ? true
        : value && SUPPORTED_FORMATS.includes(value.type)
    ),
  edu_cer_doc: Yup.mixed()
    .required("MSME Image is required")
    .test("fileSize", "File too large", (value) =>
      typeof value === "string" ? true : value && value.size <= FILE_SIZE
    )
    .test("fileFormat", "Unsupported Format", (value) =>
      typeof value === "string"
        ? true
        : value && SUPPORTED_FORMATS.includes(value.type)
    ),
});

export default function AddDocuments({
  setCurrentpage,
  currentpage,
  SPA_ID,
  superadmindata,
  EmployeeID,
  setEmployeeID,
  operatorID,
  setDocumentBack,
  setModalIsOpen,
}) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const handlePreview = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
      setPreviewTitle(file.name);
    };
    reader?.readAsDataURL(file);
  };

  // const handleSubmit = async (values) => {
  //   if (operatorID) {
  //     setCurrentpage(5);
  //   } else {
  //     try {
  //       const data = await SubmitDocumentsData(values);
  //       toast.success(data?.message);
  //       setCurrentpage(5);
  //     } catch (error) {
  //       console.error("Error uploading data", error);
  //     }
  //   }
  // };
  const [enable, setEnable] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    try {
      if (operatorID) {
        setCurrentpage(5); // Assuming setCurrentPage is a function in your component
      } else {
        const data = await SubmitEmpDocumentsData(values, EmployeeID, dispatch);
        console.log(data, "dataascbkjasbckja"); // Replace with actual API call function
        toast.success(data);
        setCurrentpage(5); // Assuming setCurrentPage is a function in your component
        setModalIsOpen(false);
      }
    } catch (error) {
      console.error("Error uploading data", error);
      toast.error("Failed to submit document. Please try again."); // Notify user of error
    } finally {
      actions.setSubmitting(false);
    }
  };

  console.log(currentpage, "currentpagecurrentpage");

  const handleCancel = () => setPreviewOpen(false);

  const [empDocumentdata, setEmpDocumentData] = useState("");

  const fetchGetUser = async () => {
    try {
      const data = await GetEmpDocumentById(
        EmployeeID,
        setEmployeeID,
        setEmpDocumentData
      );
      setEmpDocumentData(data);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  useEffect(() => {
    if (EmployeeID != null) {
      fetchGetUser();
    }
  }, [EmployeeID, setEmployeeID, setEmpDocumentData]);

  console.log(empDocumentdata, "empDocumentdataempDocumentdata");

  return (
    <div>
      <div className="border-l-[0.1vw] h-[28vw] overflow-y-scroll relative  px-[2vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.1vw] rounded-[1vw] border-[#1f4b7f]">
        <div className="h-[4vw] w-full flex items-center justify-between">
          <label className="text-[1.5vw] font-semibold text-[#1f4b7f]">
            Documents
          </label>
          <button className="rounded-full font-semibold w-[6vw] h-[2vw] flex items-center justify-center border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.1vw] border-[#34AE2A] text-[1.1vw] text-[#34AE2A]">
            Save
          </button>
        </div>
        <div className="pb-[1vw]">
          <div className="border-b-[0.1vw] w-full border-[#1f4b7f]"></div>
        </div>
        <Formik
          initialValues={{
            aadhar_doc: empDocumentdata?.aadhar_card_doc || null,
            aadhar_number: empDocumentdata?.aadhar_card_number || "",
            pan_doc: empDocumentdata?.pan_card_doc || null,
            pan_number: empDocumentdata?.pan_card_number || "",
            work_exp_doc: empDocumentdata?.work_experience_certificate || null,
            other_doc: empDocumentdata?.other_documents || null,
            edu_cer_doc: empDocumentdata?.educational_certificate || null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, isValid, setFieldValue, values, handleChange, errors, touched }) => (
            <Form>
              <div className="gap-y-[1.5vw] flex-col flex">
                <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                  <div className="col-span-1">
                    <label className="text-[#1F4B7F] text-[1.1vw] ">
                      Aadhar Card Number
                      <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <Field
                      type="text"
                      name="aadhar_number"
                      placeholder="Enter Aadhar Number"
                      // value={values.firstname}
                      className="border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                    />
                    <ErrorMessage
                      name="aadhar_number"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="text-[#1F4B7F] text-[1.1vw] ">
                      Pan Card Number
                      <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <Field
                      type="text"
                      name="pan_number"
                      placeholder="Enter Pan Number"
                      // value={values.firstname}
                      className="border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                    />
                    <ErrorMessage
                      name="pan_number"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-y-[1.5vw] w-full gap-x-[1.5vw]">
                  <div className="col-span-1">
                    <label className="text-[#1F4B7F] text-[1.1vw]">
                      Aadhar Document
                      <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <div>
                      <input
                        id="aadhar_doc"
                        name="aadhar_doc"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(event) => {
                          const files = Array.from(event.target.files);
                          console.log(files, "filesfiles");
                          setFieldValue(
                            "aadhar_doc",
                            event.currentTarget.files[0]
                          );
                          handlePreview(files[0]);
                        }}
                      />
                      <button
                        type="button"
                        className="border-r-[0.3vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none"
                        onClick={(event) => {
                          event.preventDefault();
                          document.getElementById("aadhar_doc").click();
                        }}
                      >
                        <span className="opacity-50">
                          Upload Aadhar Document
                        </span>
                        <FaCloudUploadAlt
                          color="#1F487C"
                          size={"2vw"}
                          className="absolute right-[1vw]"
                        />
                      </button>
                      {values.aadhar_doc && (
                        <div
                          onClick={() => {
                            setPreviewImage(empDocumentdata?.aadhar_card_doc);
                            setPreviewOpen(true);
                          }}
                          className="cursor-pointer underline-offset-1 underline text-[#1F4B7F] text-[0.8vw]"
                        >
                          {values.aadhar_doc.name
                            ? values.aadhar_doc.name
                            : values.aadhar_doc}
                        </div>
                      )}
                      <ErrorMessage
                        name="aadhar_doc"
                        component="div"
                        style={{ color: "red" }}
                        className="text-[0.8vw]"
                      />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label className="text-[#1F4B7F] text-[1.1vw]">
                      Pan Document
                      <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <div>
                      <input
                        id="pan_doc"
                        name="pan_doc"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(event) => {
                          const files = Array.from(event.target.files);
                          // setFieldValue("aadhar_back", files);
                          setFieldValue(
                            "pan_doc",
                            event.currentTarget.files[0]
                          );
                          handlePreview(files[0]);
                        }}
                      />
                      <button
                        type="button"
                        className="border-r-[0.3vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none"
                        onClick={(event) => {
                          event.preventDefault();
                          document.getElementById("pan_doc").click();
                        }}
                      >
                        <span className="opacity-50">Upload Pan Document</span>
                        <FaCloudUploadAlt
                          color="#1F487C"
                          size={"2vw"}
                          className="absolute right-[1vw]"
                        />
                      </button>
                      {values.pan_doc && (
                        <div
                          onClick={() => {
                            setPreviewImage(empDocumentdata?.pan_card_doc);
                            setPreviewOpen(true);
                          }}
                          className="cursor-pointer underline-offset-1 underline text-[#1F4B7F] text-[0.8vw]"
                        >
                          {values.pan_doc.name
                            ? values.pan_doc.name
                            : values.pan_doc}
                        </div>
                      )}
                      <ErrorMessage
                        name="pan_doc"
                        component="div"
                        style={{ color: "red" }}
                        className="text-[0.8vw]"
                      />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label className="text-[#1F4B7F] text-[1.1vw]">
                      Work Experiance Certificate
                      <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <div>
                      <input
                        id="work_exp_doc"
                        name="work_exp_doc"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(event) => {
                          const files = Array.from(event.target.files);
                          console.log(files, "filesfiles");
                          // setFieldValue("pan_front", files);
                          setFieldValue(
                            "work_exp_doc",
                            event.currentTarget.files[0]
                          );
                          handlePreview(files[0]);
                        }}
                      />
                      <button
                        type="button"
                        className="border-r-[0.3vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none"
                        onClick={(event) => {
                          event.preventDefault();
                          document.getElementById("work_exp_doc").click();
                        }}
                      >
                        <span className="opacity-50">
                          Upload Work Experience
                        </span>
                        <FaCloudUploadAlt
                          color="#1F487C"
                          size={"2vw"}
                          className="absolute right-[1vw]"
                        />
                      </button>
                      {values.work_exp_doc && (
                        <div
                          onClick={() => {
                            setPreviewImage(
                              empDocumentdata?.work_experience_certificate
                            );
                            setPreviewOpen(true);
                          }}
                          className="cursor-pointer underline-offset-1 underline text-[#1F4B7F] text-[0.8vw]"
                        >
                          {values.work_exp_doc.name
                            ? values.work_exp_doc.name
                            : values.work_exp_doc}
                        </div>
                      )}
                      <ErrorMessage
                        name="work_exp_doc"
                        component="div"
                        style={{ color: "red" }}
                        className="text-[0.8vw]"
                      />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label className="text-[#1F4B7F] text-[1.1vw]">
                      Other Document
                      <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <div>
                      <input
                        id="other_doc"
                        name="other_doc"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(event) => {
                          const files = Array.from(event.target.files);
                          console.log(files, "filesfiles");
                          // setFieldValue("pan_back", files);
                          setFieldValue(
                            "other_doc",
                            event.currentTarget.files[0]
                          );
                          handlePreview(files[0]);
                        }}
                      />
                      <button
                        type="button"
                        className="border-r-[0.3vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none"
                        onClick={(event) => {
                          event.preventDefault();
                          document.getElementById("other_doc").click();
                        }}
                      >
                        <span className="opacity-50">
                          Upload Other Document
                        </span>
                        <FaCloudUploadAlt
                          color="#1F487C"
                          size={"2vw"}
                          className="absolute right-[1vw]"
                        />
                      </button>
                      {values.other_doc && (
                        <div
                          onClick={() => {
                            setPreviewImage(empDocumentdata?.other_documents);
                            setPreviewOpen(true);
                          }}
                          className="cursor-pointer underline-offset-1 underline text-[#1F4B7F] text-[0.8vw]"
                        >
                          {values.other_doc.name
                            ? values.other_doc.name
                            : values.other_doc}
                        </div>
                      )}
                      <ErrorMessage
                        name="other_doc"
                        component="div"
                        style={{ color: "red" }}
                        className="text-[0.8vw]"
                      />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label className="text-[#1F4B7F] text-[1.1vw]">
                      Educational Certificate
                      <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <div>
                      <input
                        id="edu_cer_doc"
                        name="edu_cer_doc"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(event) => {
                          const files = Array.from(event.target.files);
                          console.log(files, "filesfiles");
                          // setFieldValue("msme_doc", files);
                          setFieldValue(
                            "edu_cer_doc",
                            event.currentTarget.files[0]
                          );
                          handlePreview(files[0]);
                        }}
                      />
                      <button
                        type="button"
                        className="border-r-[0.3vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none"
                        onClick={(event) => {
                          event.preventDefault();
                          document.getElementById("edu_cer_doc").click();
                        }}
                      >
                        <span className="opacity-50">
                          Upload Education Certificate
                        </span>
                        <FaCloudUploadAlt
                          color="#1F487C"
                          size={"2vw"}
                          className="absolute right-[1vw]"
                        />
                      </button>
                      {values.edu_cer_doc && (
                        <div
                          onClick={() => {
                            setPreviewImage(
                              empDocumentdata?.educational_certificate
                            );
                            setPreviewOpen(true);
                          }}
                          className="cursor-pointer underline-offset-1 underline text-[#1F4B7F] text-[0.8vw]"
                        >
                          {values.edu_cer_doc.name
                            ? values.edu_cer_doc.name
                            : values.edu_cer_doc}
                        </div>
                      )}
                      <ErrorMessage
                        name="edu_cer_doc"
                        component="div"
                        style={{ color: "red" }}
                        className="text-[0.8vw]"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center  w-full justify-between py-[1vw]">
                <div>
                  <h1 className="text-[#1F4B7F] text-[0.7vw] font-semibold">
                    *You must fill in all fields to be able to continue
                  </h1>
                </div>
                <div className="flex items-center gap-x-[1vw]">
                  <button
                    className="border-[#1F487C] w-[5vw] font-semibold text-[1vw] h-[2vw] rounded-full border-r-[0.2vw]  border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw]"
                    onClick={() => {
                      setCurrentpage(3);
                      setDocumentBack(false);
                    }}
                  >
                    Back
                  </button>
                  <button
                    className="bg-[#1F487C] font-semibold rounded-full w-[7vw] h-[2vw] text-[1vw] text-white"
                    type="submit"
                  // onClick={() => setCurrentpage(4)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{ width: "100%" }}
          src={`http://192.168.90.47:4000${previewImage}`}
        />
      </Modal>
    </div>
  );
}
