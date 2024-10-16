import { Button, Modal, Progress, Tooltip, Upload } from "antd";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  GetSuperAdminDocumentById,
  SubmitAddressData,
  SubmitCompanyData,
  SubmitDocumentsData,
} from "../../../Api/UserManagement/SuperAdmin";
import { useDispatch } from "react-redux";

const FILE_SIZE = 1024 * 1024 * 5; // 5MB
const SUPPORTED_FORMATS = [
  "application/pdf",
  "image/jpg",
  "image/jpeg",
  "image/png",
];

const validationSchema = Yup.object().shape({
  aadhar_front: Yup.mixed()
    .required("Aadhar Front Page is required")
    .test("fileSize", "File too large", (value) =>
      typeof value === "string" ? true : value && value.size <= FILE_SIZE
    )
    .test("fileFormat", "Unsupported Format", (value) =>
      typeof value === "string"
        ? true
        : value && SUPPORTED_FORMATS.includes(value.type)
    ),
  aadhar_back: Yup.mixed()
    .required("Aadhar Back Page is required")
    .test("fileSize", "File too large", (value) =>
      typeof value === "string" ? true : value && value.size <= FILE_SIZE
    )
    .test("fileFormat", "Unsupported Format", (value) =>
      typeof value === "string"
        ? true
        : value && SUPPORTED_FORMATS.includes(value.type)
    ),
  pan_front: Yup.mixed()
    .required("Pan Front Page is required")
    .test("fileSize", "File too large", (value) =>
      typeof value === "string" ? true : value && value.size <= FILE_SIZE
    )
    .test("fileFormat", "Unsupported Format", (value) =>
      typeof value === "string"
        ? true
        : value && SUPPORTED_FORMATS.includes(value.type)
    ),
  pan_back: Yup.mixed()
    .required("Pan Back Page is required")
    .test("fileSize", "File too large", (value) =>
      typeof value === "string" ? true : value && value.size <= FILE_SIZE
    )
    .test("fileFormat", "Unsupported Format", (value) =>
      typeof value === "string"
        ? true
        : value && SUPPORTED_FORMATS.includes(value.type)
    ),
  msme_doc: Yup.mixed()
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
  operatorID,
  setgstback,
  setGstback,
  gstback,
  setOperatorID,
  setBusinessBack,
  setDocumentBack,
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
  const dispatch = useDispatch();
  const handleSubmit = async (values, actions) => {
    try {
      if (operatorID && enable == false) {
        setCurrentpage(5); // Assuming setCurrentPage is a function in your component
      } else {
        const data = await SubmitDocumentsData(
          values,
          operatorID,
          enable,
          dispatch
        ); // Replace with actual API call function
        toast.success(data?.message);
        setCurrentpage(5); // Assuming setCurrentPage is a function in your component
        console.log('Checking_checking')

      }
    } catch (error) {
      console.error("Error uploading data", error);
      toast.error("Failed to submit document. Please try again."); // Notify user of error
    }
    // finally {
    //   actions.setSubmitting(false);
    // }
  };
  console.log(currentpage, "currentpagecurrentpage");
  const handleCancel = () => setPreviewOpen(false);
  const [superadmindocumentdata, setSuperAdmindocumentData] = useState("");
  const [enable, setEnable] = useState(false);

  const fetchGetUser = async () => {
    try {
      const data = await GetSuperAdminDocumentById(
        operatorID,
        setOperatorID,
        setSuperAdmindocumentData
      );
      setSuperAdmindocumentData(data);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  useEffect(() => {
    if (operatorID != null || enable || gstback) {
      fetchGetUser();
    }
  }, [operatorID, setOperatorID, setSuperAdmindocumentData, enable, gstback]);
  return (
    <div>
      <div className="border-l-[0.1vw] h-[28vw] relative  px-[2vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.1vw] rounded-[1vw] border-[#1f4b7f]">
        <div className="h-[4vw] w-full flex items-center justify-between">
          <label className="text-[1.5vw] font-semibold text-[#1f4b7f]">
            Documents
          </label>
          {operatorID || gstback ? (
            <button
              className={`${enable
                ? "bg-[#1f4b7f] text-white"
                : "text-[#1f4b7f] bg-white border-[#1f4b7f]"
                } rounded-full font-semibold w-[10vw] h-[2vw] flex items-center justify-center border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.1vw] text-[1.1vw] `}
              onClick={() => setEnable(!enable)}
            >
              Enable to Edit
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="pb-[1vw]">
          <div className="border-b-[0.1vw] w-full border-[#1f4b7f]"></div>
        </div>
        <Formik
          initialValues={{
            aadhar_front: superadmindocumentdata.aadar_front_doc || null,
            aadhar_back: superadmindocumentdata.aadar_back_doc || null,
            pan_front: superadmindocumentdata.pancard_front_doc || null,
            pan_back: superadmindocumentdata.pancard_back_doc || null,
            msme_doc: superadmindocumentdata.msme_doc || null,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmit(values)
          }}
          enableReinitialize
        >
          {({ isSubmitting, isValid, setFieldValue, values, handleChange }) => (
            <Form >
              <div className="gap-y-[0.5vw] flex-col flex">
                <div className="grid grid-cols-2 w-full gap-x-[1.5vw]">
                  <div className="col-span-1">
                    <label className="text-[#1F4B7F] text-[1.1vw]">
                      Aadhar Card Front Page
                      <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        id="aadhar_front"
                        name="aadhar_front"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(event) => {
                          const files = Array.from(event.target.files);
                          console.log(files, "filesfiles");
                          // setFieldValue("aadhar_front", files);
                          setFieldValue(
                            "aadhar_front",
                            event.currentTarget.files[0]
                          );
                          handlePreview(files[0]);
                        }}
                        disabled={operatorID || gstback ? (enable ? false : true) : false}

                      />
                      <button
                        type="button"
                        className="border-r-[0.3vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none"
                        onClick={(event) => {
                          event.preventDefault(); 
                          document.getElementById("aadhar_front").click();
                        }}
                      >
                        <span className="opacity-50">Upload Aadhar Front</span>
                        <FaCloudUploadAlt
                          color="#1F487C"
                          size={"2vw"}
                          className="absolute right-[1vw]"
                        />
                      </button>
                      {values.aadhar_front && (
                        <div
                          onClick={() => {
                            setPreviewImage(
                              superadmindocumentdata?.aadar_front_doc
                            );
                            setPreviewOpen(true);
                          }}
                          className="cursor-pointer underline-offset-1 underline text-[#1F4B7F] text-[0.7vw]"
                        >
                          {values.aadhar_front.name
                            ? values.aadhar_front.name
                            : values.aadhar_front}
                          {/* {values?.aadhar_front.name?.length > 15 ? (
                            <Tooltip
                              placement="right"
                              title={values.aadhar_front.name}
                              className="cursor-pointer"
                              color="#1F487C"
                            >
                              <button className="border-dashed text-[1.1vw] bg-[#1F4B7F] border-white border-[0.2vw] rounded-[0.5vw] text-white px-[2vw] py-[0.2vw]">
                                {`${values?.aadhar_front.name?.slice(0, 15)}...`}
                              </button>
                            </Tooltip>
                          ) : (
                            <button className="border-dashed text-[1.1vw] bg-[#1F4B7F] border-white border-[0.2vw] rounded-[0.5vw] text-white px-[2vw] py-[0.2vw]">
                              {`${values?.aadhar_front.name?.slice(0, 15)}`}
                            </button>
                          )} */}
                        </div>
                      )}
                      <ErrorMessage
                        name="aadhar_front"
                        component="div"
                        style={{ color: "red" }}
                        className="text-[0.8vw] absolute bottom-[-1.25vw]"
                      />
                    </div>
                  </div>
                  {/* <div className="col-span-1">
                    <label className="text-[#1F4B7F] text-[1.1vw]">
                      Aadhar Card Back Page
                      <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        id="aadhar_back"
                        name="aadhar_back"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(event) => {
                          const files = Array.from(event.target.files);

                          // setFieldValue("aadhar_back", files);
                          setFieldValue(
                            "aadhar_back",
                            event.currentTarget.files[0]
                          );
                          handlePreview(files[0]);
                        }}
                        disabled={
                          operatorID || gstback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                      />
                      <button
                        className="border-r-[0.3vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none"
                        onClick={() =>

                          document.getElementById("aadhar_back").click()
                        }
                      >
                        <span className="opacity-50">Upload Aadhar Back</span>
                        <FaCloudUploadAlt
                          color="#1F487C"
                          size={"2vw"}
                          className="absolute right-[1vw]"
                        />
                      </button>
                      {values.aadhar_back && (
                        <div
                          onClick={() => {
                            setPreviewImage(
                              superadmindocumentdata?.aadar_back_doc
                            );
                            setPreviewOpen(true);
                          }}
                          className="cursor-pointer underline-offset-1 underline text-[#1F4B7F] text-[0.7vw]"
                        >
                          {values.aadhar_back.name
                            ? values.aadhar_back.name
                            : values.aadhar_back}
                        </div>
                      )}
                      <ErrorMessage
                        name="aadhar_back"
                        component="div"
                        style={{ color: "red" }}
                        className="text-[0.8vw] absolute bottom-[-1.25vw]"
                      />
                    </div>
                  </div> */}
                  <div className="col-span-1">
                    <label className="text-[#1F4B7F] text-[1.1vw]">
                      Aadhar Card Back Page
                      <span className="text-[1vw] text-red-600 pl-[0.2vw]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="aadhar_back"
                        name="aadhar_back"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(event) => {
                          const files = Array.from(event.target.files);
                          setFieldValue("aadhar_back", event.currentTarget.files[0]);
                          handlePreview(files[0]);
                        }}
                        disabled={operatorID || gstback ? (enable ? false : true) : false}
                      />
                      <button
                        type="button"
                        className="border-r-[0.3vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none"
                        onClick={(event) => {
                          event.preventDefault(); 
                          document.getElementById("aadhar_back").click();
                        }}
                      >
                        <span className="opacity-50">Upload Aadhar Back</span>
                        <FaCloudUploadAlt
                          color="#1F487C"
                          size={"2vw"}
                          className="absolute right-[1vw]"
                        />
                      </button>
                      {values.aadhar_back && (
                        <div
                          onClick={() => {
                            setPreviewImage(superadmindocumentdata?.aadar_back_doc);
                            setPreviewOpen(true);
                          }}
                          className="cursor-pointer underline-offset-1 underline text-[#1F4B7F] text-[0.7vw]"
                        >
                          {values.aadhar_back.name ? values.aadhar_back.name : values.aadhar_back}
                        </div>
                      )}
                      <ErrorMessage
                        name="aadhar_back"
                        component="div"
                        style={{ color: "red" }}
                        className="text-[0.8vw] absolute bottom-[-1.25vw]"
                      />
                    </div>
                  </div>

                </div>
                <div className="grid grid-cols-2 gap-x-[1.5vw]">
                  <div className="col-span-1">
                    <label className="text-[#1F4B7F] text-[1.1vw]">
                      Pancard Front Page
                      <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        id="pan_front"
                        name="pan_front"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(event) => {
                          const files = Array.from(event.target.files);
                          console.log(files, "filesfiles");
                          // setFieldValue("pan_front", files);
                          setFieldValue(
                            "pan_front",
                            event.currentTarget.files[0]
                          );
                          handlePreview(files[0]);
                        }}
                        disabled={operatorID || gstback ? (enable ? false : true) : false}

                      />
                      <button
                        type="button"
                        className="border-r-[0.3vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none"
                        onClick={(event) => {
                          event.preventDefault(); 
                          document.getElementById("pan_front").click();
                        }}
                      >
                        <span className="opacity-50">Upload Pancard Front</span>
                        <FaCloudUploadAlt
                          color="#1F487C"
                          size={"2vw"}
                          className="absolute right-[1vw]"
                        />
                      </button>
                      {values.pan_front && (
                        <div
                          onClick={() => {
                            setPreviewImage(
                              superadmindocumentdata?.pancard_front_doc
                            );
                            setPreviewOpen(true);
                          }}
                          className="cursor-pointer underline-offset-1 underline text-[#1F4B7F] text-[0.7vw]"
                        >
                          {values.pan_front.name
                            ? values.pan_front.name
                            : values.pan_front}
                        </div>
                      )}
                      <ErrorMessage
                        name="pan_front"
                        component="div"
                        style={{ color: "red" }}
                        className="text-[0.8vw] absolute bottom-[-1.25vw]"
                      />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label className="text-[#1F4B7F] text-[1.1vw]">
                      Pancard Back Page
                      <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        id="pan_back"
                        name="pan_back"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(event) => {
                          const files = Array.from(event.target.files);
                          console.log(files, "filesfiles");
                          // setFieldValue("pan_back", files);
                          setFieldValue(
                            "pan_back",
                            event.currentTarget.files[0]
                          );
                          handlePreview(files[0]);
                        }}
                        disabled={operatorID || gstback ? (enable ? false : true) : false}
                      />
                      <button
                        type="button"
                        className="border-r-[0.3vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none"
                        onClick={(event) => {
                          event.preventDefault(); 
                          document.getElementById("pan_back").click();
                        }}
                      >
                        <span className="opacity-50">Upload Pancard Back</span>
                        <FaCloudUploadAlt
                          color="#1F487C"
                          size={"2vw"}
                          className="absolute right-[1vw]"
                        />
                      </button>
                      {values.pan_back && (
                        <div
                          onClick={() => {
                            setPreviewImage(
                              superadmindocumentdata?.pancard_back_doc
                            );
                            setPreviewOpen(true);
                          }}
                          className="cursor-pointer underline-offset-1 underline text-[#1F4B7F] text-[0.7vw]"
                        >
                          {values.pan_back.name
                            ? values.pan_back.name
                            : values.pan_back}
                        </div>
                      )}
                      <ErrorMessage
                        name="pan_back"
                        component="div"
                        style={{ color: "red" }}
                        className="text-[0.8vw] absolute bottom-[-1.25vw]"
                      />
                    </div>
                  </div>
                </div>
                <div className="gird grid-cols-2 w-full gap-x-[1.5vw]">
                  <div className="col-span-1">
                    <label className="text-[#1F4B7F] text-[1.1vw]">
                      MSME Image
                      <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        id="msme_doc"
                        name="msme_doc"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(event) => {
                          const files = Array.from(event.target.files);
                          console.log(files, "filesfiles");
                          // setFieldValue("msme_doc", files);
                          setFieldValue(
                            "msme_doc",
                            event.currentTarget.files[0]
                          );
                          handlePreview(files[0]);
                        }}
                        disabled={operatorID || gstback ? (enable ? false : true) : false}

                      />
                      <button
                        type="button"
                        className="border-r-[0.3vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none"
                        onClick={(event) => {
                          event.preventDefault(); 
                          document.getElementById("msme_doc").click();
                        }}
                      >
                        <span className="opacity-50">Upload MSME Image</span>
                        <FaCloudUploadAlt
                          color="#1F487C"
                          size={"2vw"}
                          className="absolute right-[1vw]"
                        />
                      </button>
                      {values.msme_doc && (
                        <div
                          onClick={() => {
                            setPreviewImage(superadmindocumentdata?.msme_doc);
                            setPreviewOpen(true);
                          }}
                          className="cursor-pointer underline-offset-1 underline text-[#1F4B7F] text-[0.7vw]"
                        >
                          {values.msme_doc.name
                            ? values.msme_doc.name
                            : values.msme_doc}
                        </div>
                      )}
                      <ErrorMessage
                        name="msme_doc"
                        component="div"
                        style={{ color: "red" }}
                        className="text-[0.8vw] absolute bottom-[-1vw]"
                      />
                    </div>
                  </div>
                  <div className="col-span-1"></div>
                </div>
              </div>
              <div className="flex items-center left-0 px-[1vw] w-full absolute bottom-0 gap-x-[2vw] justify-between py-[0.5vw]">
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
                      setDocumentBack(true);
                    }}
                  >
                    Back
                  </button>
                  <button
                    className="bg-[#1F487C] font-semibold rounded-full w-[11vw] h-[2vw] text-[1vw] text-white"
                    type="submit"
                  // onClick={() => setCurrentpage(4)}
                  >
                    {operatorID || gstback
                      ? enable
                        ? "Update & Continue"
                        : "Continue"
                      : "Continue"}
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
