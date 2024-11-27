import { Button, Modal, Progress, Upload } from "antd";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import * as Yup from "yup";
import umbuslogo from "../../../asserts/umbuslogo.png"
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
import { actions } from "react-table";

const FILE_SIZE = 1024 * 1024 * 5; // 5MB
const SUPPORTED_FORMATS = [
  "application/pdf",
  "image/jpg",
  "image/jpeg",
  "image/png",
];

const validationSchema = Yup.object().shape({
  aadhar_number: Yup.string().required("Aadhar number is required"),
  pan_number: Yup.string().required("Pan Number is required"),
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
  aadhar_bk_doc: Yup.mixed()
    .required("Aadhar Back Page is required")
    .test("fileSize", "File too large", (value) =>
      typeof value === "string" ? true : value && value.size <= FILE_SIZE
    )
    .test("fileFormat", "Unsupported Format", (value) =>
      typeof value === "string"
        ? true
        : value && SUPPORTED_FORMATS.includes(value.type)
    ),
  pan_doc: Yup.mixed()
    .required("Pan Front Page is required")
    .test("fileSize", "File too large", (value) =>
      typeof value === "string" ? true : value && value.size <= FILE_SIZE
    )
    .test("fileFormat", "Unsupported Format", (value) =>
      typeof value === "string"
        ? true
        : value && SUPPORTED_FORMATS.includes(value.type)
    ),
  pan_bk_doc: Yup.mixed()
    .required("Pan Back Page is required")
    .test("fileSize", "File too large", (value) =>
      typeof value === "string" ? true : value && value.size <= FILE_SIZE
    )
    .test("fileFormat", "Unsupported Format", (value) =>
      typeof value === "string"
        ? true
        : value && SUPPORTED_FORMATS.includes(value.type)
    ),
  qualification: Yup.mixed()
    .required("Qualification is required")
    .test("fileSize", "File too large", (value) =>
      typeof value === "string" ? true : value && value.size <= FILE_SIZE
    )
    .test("fileFormat", "Unsupported Format", (value) =>
      typeof value === "string"
        ? true
        : value && SUPPORTED_FORMATS.includes(value.type)
    ),
  offerletter: Yup.mixed()
    .required("Offer Letter Doc is required")
    .test("fileSize", "File too large", (value) =>
      typeof value === "string" ? true : value && value.size <= FILE_SIZE
    )
    .test("fileFormat", "Unsupported Format", (value) =>
      typeof value === "string"
        ? true
        : value && SUPPORTED_FORMATS.includes(value.type)
    ),
  // edu_cer_doc: Yup.mixed()
  //   .required("MSME Image is required")
  //   .test("fileSize", "File too large", (value) =>
  //     typeof value === "string" ? true : value && value.size <= FILE_SIZE
  //   )
  //   .test("fileFormat", "Unsupported Format", (value) =>
  //     typeof value === "string"
  //       ? true
  //       : value && SUPPORTED_FORMATS.includes(value.type)
  //   ),
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
  updatedata
}) {
  const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [inputPreview, setInputPreview] = useState({
    aadharfr: null,
    aadharbk: null,
    panfr: null,
    panbk: null,
    qualification: null,
    offerletter: null
  });

  const handleFileChange = (event, key) => {
    const file = event?.currentTarget?.files[0];

    // Check if the file is selected and it's a valid file
    if (file) {
      // Validate if the selected file is an actual file object
      if (file instanceof File) {
        setInputPreview((prevState) => ({
          ...prevState,
          [key]: URL.createObjectURL(file), // Create object URL for valid file
        }));
      } else {
        console.error("Selected item is not a valid file.");
      }
    } else {
      console.error("No file selected.");
    }
  };

  // const handlePreview = (file) => {
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     setPreviewImage(reader.result);
  //     setPreviewTitle(file.name);
  //   };
  //   reader?.readAsDataURL(file);
  // };

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

  // const handleSubmit = async (values, actions) => {

  //   console.log(values,"docvalues");

  //   try {
  //     if (operatorID) {

  //       setCurrentpage(5); // Assuming setCurrentPage is a function in your component
  //     } else {
  //       const data = await SubmitEmpDocumentsData(values, EmployeeID, dispatch);
  //       console.log(data, "dataascbkjasbckja"); // Replace with actual API call function
  //       toast.success(data);
  //       setCurrentpage(5); // Assuming setCurrentPage is a function in your component
  //       setModalIsOpen(false);
  //     }
  //   } catch (error) {
  //     console.error("Error uploading data", error);
  //     toast.error("Failed to submit document. Please try again."); // Notify user of error
  //   } finally {
  //     actions.setSubmitting(false);
  //   }
  // };

  const handleSubmit = async (values, actions) => {
    if (updatedata && enable == false) {
      setCurrentpage(5);
      setModalIsOpen(false)
    }
    else {
      try {
        const data = await SubmitEmpDocumentsData(values, EmployeeID, dispatch);
        console.log(data, "dataascbkjasbckja"); // Replace with actual API call function
        toast.success(data);
        setCurrentpage(5); // Assuming setCurrentPage is a function in your component
        setModalIsOpen(false);
      }
      catch (error) {
        console.error("Error uploading data", error);
        toast.error("Failed to submit document. Please try again.");
      }
      finally {
        actions.setSubmitting(false);
      }
    }
    console.log(values,"valuesvalues");
    sessionStorage.removeItem('Employee_Id')
    
  }

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const openModal = (event) => {
    // Get the image source (src) using `getElementById`
    const imageSrc = event.target.getAttribute('src');
    
    // Set the modal image source
    setModalImage(imageSrc);
    
    // Open the modal
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (EmployeeID != null) {
      fetchGetUser();
    }
  }, [EmployeeID, setEmployeeID, setEmpDocumentData]);

  console.log(empDocumentdata, "empDocumentdataempDocumentdata");

  useEffect(()=>{
    setInputPreview({
      aadharfr:empDocumentdata?.aadhar_card_front_doc,
      aadharbk:empDocumentdata?.aadhar_card_back_doc,
      panfr:empDocumentdata?.pan_card_front_doc,
      panbk:empDocumentdata?.pan_card_back_doc,
      qualification:empDocumentdata?.qualification_doc,
      offerletter:empDocumentdata?.offer_letter_doc

    })
  },[empDocumentdata])

  return (
    <div className="relative mt-[1.5vw]">
        <div className="w-[5vw] h-[5vw] bg-white shadow-lg rounded-full absolute left-[16.6vw] top-[-2.5vw] flex justify-center items-center z-[1]"><img className="" src={umbuslogo} alt="buslogo"/></div>
      <div className="border-l-[0.1vw] relative  px-[2vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.1vw] rounded-[1vw] border-[#1f4b7f]">
        <div className="h-[4vw] w-full flex items-center justify-between">
          <label className="text-[1.5vw] font-semibold text-[#1f4b7f]">
            Documents
          </label>
          {/* <button className="rounded-full font-semibold w-[6vw] h-[2vw] flex items-center justify-center border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.1vw] border-[#34AE2A] text-[1.1vw] text-[#34AE2A]">
            Save
          </button> */}
                  {updatedata  ? (
          <button
            className={`${enable
              ? "bg-[#1f4b7f] text-white"
              : "text-[#1f4b7f] bg-white border-[#1f4b7f]"
              } rounded-full font-semibold w-[10vw] h-[2vw] flex items-center justify-center border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.1vw] text-[1.1vw] `}
            onClick={() => {
              setEnable(!enable)
            }}
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
            aadhar_number: empDocumentdata?.aadhar_card_number || "",
            pan_number: empDocumentdata?.pan_card_number || "",
            aadhar_doc: empDocumentdata?.aadhar_card_front_doc || null,
            aadhar_bk_doc: empDocumentdata?.aadhar_card_back_doc || null,
            pan_doc: empDocumentdata?.pan_card_front_doc || null,
            pan_bk_doc: empDocumentdata?.pan_card_back_doc || null,
            qualification: empDocumentdata?.qualification_doc || null,
            offerletter: empDocumentdata?.offer_letter_doc || null,
            // work_exp_doc: empDocumentdata?.work_experience_certificate || null,
            // other_doc: empDocumentdata?.other_documents || null,
            // edu_cer_doc: empDocumentdata?.educational_certificate || null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, isValid, setFieldValue, values, handleChange, errors, touched }) => (
            <Form>
              <div className="gap-y-[1.5vw] flex-col flex">
                <div className="overflow-y-scroll gap-y-[1.5vw] flex-col flex h-[18vw] pb-[1vw]">
                <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                  <div className="col-span-1 relative">
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
                      value={values.aadhar_number}
                      disabled={
                        updatedata
                          ? enable
                            ? false
                            : true
                          : false
                      }
                      className={` ${updatedata
                        ? enable == false
                          ? " cursor-not-allowed"
                          : ""
                        : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                    />
                    <ErrorMessage
                      name="aadhar_number"
                      component="div"
                      style={{ color: "red" }}
                      className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw] left-[.2vw]"
                    />
                  </div>
                  <div className="col-span-1 relative">
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
                      value={values.pan_number}
                      disabled={
                        updatedata
                          ? enable
                            ? false
                            : true
                          : false
                      }
                      className={` ${updatedata
                        ? enable == false
                          ? " cursor-not-allowed"
                          : ""
                        : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                    />
                    <ErrorMessage
                      name="pan_number"
                      component="div"
                      style={{ color: "red" }}
                      className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw] left-[.2vw]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-y-[1.5vw] w-full gap-x-[1.5vw]">
                  <div className="col-span-1 relative">
                    <label className="text-[#1F4B7F] text-[1.1vw]">
                      Aadhar Card Front Doc
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
                          // handlePreview(files[0]);
                          handleFileChange(event, "aadharfr")
                        }}
                        disabled={
                          updatedata
                            ? enable
                              ? false
                              : true
                            : false
                        }
                      />
                      <div className="relative">
                      <button
                        type="button"
                        className={` ${updatedata
                          ? enable == false
                            ? " cursor-not-allowed"
                            : ""
                          : ""
                          } border-r-[0.3vw]  flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none`}
                        onClick={(event) => {
                          event.preventDefault();
                          document.getElementById("aadhar_doc").click();
                        }}
                      >
                        <span className="opacity-50">
                          Upload Aadhar Front Doc
                        </span>
                        {/* <FaCloudUploadAlt
                          color="#1F487C"
                          size={"2vw"}
                          className="absolute right-[1vw]"
                        /> */}
                     
                      </button>
                      {inputPreview?.aadharfr  ? (
                          inputPreview?.aadharfr?.startsWith("blob") ? (
                            <img
                            src={inputPreview.aadharfr}
                            className="h-[2.5vw] w-[2.5vw] absolute cursor-zoom-in top-[.1vw] right-[.3vw]"
                            alt="Aadhar Front"
                            onClick={openModal} 
                          />
                          ) : (
                            <img
                            src={`${apiImgUrl}${inputPreview.aadharfr}`}
                            className="h-[2.5vw] w-[2.5vw] absolute  top-[.1vw] cursor-zoom-in right-[.3vw]"
                            alt="Aadhar Front"
                            onClick={openModal} 
                          />
                          )
                        ) : (
                          <FaCloudUploadAlt
                            color="#1F487C"
                            size="2vw"
                            className="absolute right-[1vw] top-[.4vw] pointer-events-none"
                          />
                        )}
                        </div>
                      {/* {values.aadhar_doc && (
                        <div
                          onClick={() => {
                            setPreviewImage(empDocumentdata?.aadhar_card_front_doc);
                            setPreviewOpen(true);
                          }}
                          className="cursor-pointer underline-offset-1 underline text-[#1F4B7F] text-[0.8vw]"
                        >
                          {values.aadhar_doc.name
                            ? values.aadhar_doc.name
                            : values.aadhar_doc}
                        </div>
                      )} */}
                      <ErrorMessage
                        name="aadhar_doc"
                        component="div"
                        style={{ color: "red" }}
                        className="text-[0.8vw] absolute bottom-[-1.2vw] left-[.2vw]"
                      />
                    </div>
                  </div>
                  <div className="col-span-1 relative">
                    <label className="text-[#1F4B7F] text-[1.1vw]">
                      Aadhar Card Back Doc
                      <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <div>
                      <input
                        id="aadhar_bk_doc"
                        name="aadhar_bk_doc"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(event) => {
                          const files = Array.from(event.target.files);
                          console.log(files, "filesfiles");
                          setFieldValue(
                            "aadhar_bk_doc",
                            event.currentTarget.files[0]
                          );
                          // handlePreview(files[0]);
                          handleFileChange(event, "aadharbk");
                        }}
                        disabled={
                          updatedata
                            ? enable
                              ? false
                              : true
                            : false
                        }
                      />
                      <div className="relative">
                      <button
                        type="button"
                        className={` ${updatedata
                          ? enable == false
                            ? " cursor-not-allowed"
                            : ""
                          : ""
                          } border-r-[0.3vw]  flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none`}
                        onClick={(event) => {
                          event.preventDefault();
                          document.getElementById("aadhar_bk_doc").click();
                        }}
                      >
                        <span className="opacity-50">
                          Upload Aadhar Back Doc
                        </span>
                      </button>
                      {inputPreview?.aadharbk  ? (
                          inputPreview?.aadharbk?.startsWith("blob") ? (
                            <img
                            src={inputPreview.aadharbk}
                            className="h-[2.5vw] w-[2.5vw] absolute cursor-zoom-in top-[.1vw] right-[.3vw]"
                            alt="Aadhar Front"
                            onClick={openModal} 
                          />
                          ) : (
                            <img
                            src={`${apiImgUrl}${inputPreview.aadharbk}`}
                            className="h-[2.5vw] w-[2.5vw] absolute cursor-zoom-in top-[.1vw] right-[.3vw]"
                            alt="Aadhar Front"
                            onClick={openModal} 
                          />
                          )
                        ) : (
                          <FaCloudUploadAlt
                            color="#1F487C"
                            size="2vw"
                            className="absolute right-[1vw] top-[.4vw] pointer-events-none"
                          />
                        )}
                        </div>
                      {/* {values.aadhar_bk_doc && (
                        <div
                          onClick={() => {
                            setPreviewImage(empDocumentdata?.aadhar_card_back_doc);
                            setPreviewOpen(true);
                          }}
                          className="cursor-pointer underline-offset-1 underline text-[#1F4B7F] text-[0.8vw]"
                        >
                          {values.aadhar_bk_doc.name
                            ? values.aadhar_bk_doc.name
                            : values.aadhar_bk_doc}
                        </div>
                      )} */}
                      <ErrorMessage
                        name="aadhar_bk_doc"
                        component="div"
                        style={{ color: "red" }}
                        className="text-[0.8vw] absolute bottom-[-1.2vw] left-[.2vw]"
                      />
                    </div>
                  </div>
                  <div className="col-span-1 relative">
                    <label className="text-[#1F4B7F] text-[1.1vw]">
                      Pan Front Document
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
                          // handlePreview(files[0]);
                          handleFileChange(event, "panfr");
                        }}
                        disabled={
                          updatedata
                            ? enable
                              ? false
                              : true
                            : false
                        }
                      />
                      <div className="relative">
                      <button
                        type="button"
                        className={` ${updatedata
                          ? enable == false
                            ? " cursor-not-allowed"
                            : ""
                          : ""
                          } border-r-[0.3vw] flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none`}
                        onClick={(event) => {
                          event.preventDefault();
                          document.getElementById("pan_doc").click();
                        }}
                      >
                        <span className="opacity-50">Upload Pan Front Doc</span>
                        {/* <FaCloudUploadAlt
                          color="#1F487C"
                          size={"2vw"}
                          className="absolute right-[1vw]"
                        /> */}
                                
                      </button>
                      {inputPreview?.panfr? (
                          inputPreview?.panfr?.startsWith("blob") ? (
                            <img
                            src={inputPreview.panfr}
                            className="h-[2.5vw] w-[2.5vw] absolute cursor-zoom-in top-[.1vw] right-[.3vw]"
                            alt="pan doc"
                            onClick={openModal} 
                          />
                          ) : (
                            <img
                            src={`${apiImgUrl}${inputPreview.panfr}`}
                            className="h-[2.5vw] w-[2.5vw] absolute cursor-zoom-in top-[.1vw] right-[.3vw]"
                            alt="pan doc"
                            onClick={openModal} 
                          />
                          )
                        ) : (
                          <FaCloudUploadAlt
                            color="#1F487C"
                            size="2vw"
                            className="absolute right-[1vw] top-[.4vw] pointer-events-none"
                          />
                        )}
                        </div>
                      {/* {values.pan_doc && (
                        <div
                          onClick={() => {
                            setPreviewImage(empDocumentdata?.pan_card_front_doc);
                            setPreviewOpen(true);
                          }}
                          className="cursor-pointer underline-offset-1 underline text-[#1F4B7F] text-[0.8vw]"
                        >
                          {values.pan_doc.name
                            ? values.pan_doc.name
                            : values.pan_doc}
                        </div>
                      )} */}
                      <ErrorMessage
                        name="pan_doc"
                        component="div"
                        style={{ color: "red" }}
                        className="text-[0.8vw] absolute bottom-[-1.2vw] left-[.2vw]"
                      />
                    </div>
                  </div>
                  <div className="col-span-1 relative">
                    <label className="text-[#1F4B7F] text-[1.1vw]">
                      Pan Back Document
                      <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <div>
                      <input
                        id="pan_bk_doc"
                        name="pan_doc"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(event) => {
                          const files = Array.from(event.target.files);
                          // setFieldValue("aadhar_back", files);
                          setFieldValue(
                            "pan_bk_doc",
                            event.currentTarget.files[0]
                          );
                          // handlePreview(files[0]);
                          handleFileChange(event, "panbk");
                        }}
                        disabled={
                          updatedata
                            ? enable
                              ? false
                              : true
                            : false
                        }
                      />
                      <div className="relative">
                      <button
                        type="button"
                        className={` ${updatedata
                          ? enable == false
                            ? " cursor-not-allowed"
                            : ""
                          : ""
                          } border-r-[0.3vw]  flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none`}
                        onClick={(event) => {
                          event.preventDefault();
                          document.getElementById("pan_bk_doc").click();
                        }}
                      >
                        <span className="opacity-50">Upload Pan Back Doc</span>
                        {/* <FaCloudUploadAlt
                          color="#1F487C"
                          size={"2vw"}
                          className="absolute right-[1vw]"
                        /> */}
                         {/* {inputPreview?.panbk  ? (
                          inputPreview?.panbk?.startsWith("blob") ? (
                            <img
                            src={inputPreview.panbk}
                            className="h-[2.5vw] w-[2.5vw] absolute right-[1vw]"
                            alt="Aadhar Front"
                          />
                          ) : (
                            <img
                            src={`http://192.168.90.47:4000${inputPreview.panbk}`}
                            className="h-[2.5vw] w-[2.5vw] absolute right-[1vw]"
                            alt="Aadhar Front"
                          />
                          )
                        ) : (
                          <FaCloudUploadAlt
                            color="#1F487C"
                            size="2vw"
                            className="absolute right-[1vw]"
                          />
                        )} */}
                      </button>
                      {inputPreview?.panbk? (
                          inputPreview?.panbk?.startsWith("blob") ? (
                            <img
                            src={inputPreview.panbk}
                            className="h-[2.5vw] w-[2.5vw] absolute cursor-zoom-in top-[.1vw] right-[.3vw]"
                            alt="pan doc"
                            onClick={openModal} 
                          />
                          ) : (
                            <img
                            src={`${apiImgUrl}${inputPreview.panbk}`}
                            className="h-[2.5vw] w-[2.5vw] absolute cursor-zoom-in top-[.1vw] right-[.3vw]"
                            alt="pan doc"
                            onClick={openModal} 
                          />
                          )
                        ) : (
                          <FaCloudUploadAlt
                            color="#1F487C"
                            size="2vw"
                            className="absolute right-[1vw] top-[.4vw] pointer-events-none"
                          />
                        )}
                        </div>
                      {/* {values.pan_bk_doc && (
                        <div
                          onClick={() => {
                            setPreviewImage(empDocumentdata?.pan_card_back_doc);
                            setPreviewOpen(true);
                          }}
                          className="cursor-pointer underline-offset-1 underline text-[#1F4B7F] text-[0.8vw]"
                        >
                          {values.pan_bk_doc.name
                            ? values.pan_bk_doc.name
                            : values.pan_bk_doc}
                        </div>
                      )} */}
                      <ErrorMessage
                        name="pan_bk_doc"
                        component="div"
                        style={{ color: "red" }}
                        className="text-[0.8vw] absolute bottom-[-1.2vw] left-[.2vw]"
                      />
                    </div>
                  </div>
                  <div className="col-span-1 relative">
                    <label className="text-[#1F4B7F] text-[1.1vw]">
                      Qualification Doc
                      <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <div>
                      <input
                        id="qualification"
                        name="qualification"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(event) => {
                          const files = Array.from(event.target.files);
                          console.log(files, "filesfiles");
                          // setFieldValue("pan_front", files);
                          setFieldValue(
                            "qualification",
                            event.currentTarget.files[0]
                          );
                          // handlePreview(files[0]);
                          handleFileChange(event, "qualification")
                        }}
                        disabled={
                          updatedata
                            ? enable
                              ? false
                              : true
                            : false
                        }
                      />
                      <div className="relative">
                      <button
                        type="button"
                        className={` ${updatedata
                          ? enable == false
                            ? " cursor-not-allowed"
                            : ""
                          : ""
                          } border-r-[0.3vw]  flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none`}
                        onClick={(event) => {
                          event.preventDefault();
                          document.getElementById("qualification").click();
                        }}
                      >
                        <span className="opacity-50">
                          Upload Qualification Doc
                        </span>
                        {/* <FaCloudUploadAlt
                          color="#1F487C"
                          size={"2vw"}
                          className="absolute right-[1vw]"
                        /> */}
                      </button>
                      {inputPreview?.qualification? (
                          inputPreview?.qualification?.startsWith("blob") ? (
                            <img
                            src={inputPreview.qualification}
                            className="h-[2.5vw] w-[2.5vw] absolute cursor-zoom-in top-[.1vw] right-[.3vw]"
                            alt="Aadhar Front"
                            onClick={openModal} 
                          />
                          ) : (
                            <img
                            src={`${apiImgUrl}${inputPreview.qualification}`}
                            className="h-[2.5vw] w-[2.5vw] absolute cursor-zoom-in top-[.1vw] right-[.3vw]"
                            alt="Aadhar Front"
                            onClick={openModal} 
                          />
                          )
                        ) : (
                          <FaCloudUploadAlt
                            color="#1F487C"
                            size="2vw"
                            className="absolute right-[1vw] top-[.4vw] pointer-events-none"
                          />
                        )}
                        </div>
                      {/* {values.qualification && (
                        <div
                          onClick={() => {
                            setPreviewImage(
                              empDocumentdata?.qualification_doc
                            );
                            setPreviewOpen(true);
                          }}
                          className="cursor-pointer underline-offset-1 underline text-[#1F4B7F] text-[0.8vw]"
                        >
                          {values.qualification.name
                            ? values.qualification.name
                            : values.qualification}
                        </div>
                      )} */}
                      <ErrorMessage
                        name="qualification"
                        component="div"
                        style={{ color: "red" }}
                        className="text-[0.8vw] absolute bottom-[-1.2vw] left-[.2vw]"
                      />
                    </div>
                  </div>
                  <div className="col-span-1 relative">
                    <label className="text-[#1F4B7F] text-[1.1vw]">
                      Offer Letter Doc
                      <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <div>
                      <input
                        id="offerletter"
                        name="offerletter"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(event) => {
                          const files = Array.from(event.target.files);
                          console.log(files, "filesfiles");
                          // setFieldValue("pan_back", files);
                          setFieldValue(
                            "offerletter",
                            event.currentTarget.files[0]
                          );
                          // handlePreview(files[0]);
                          handleFileChange(event, "offerletter")
                        }}
                        disabled={
                          updatedata
                            ? enable
                              ? false
                              : true
                            : false
                        }
                      />
                      <div className="relative">
                      <button
                        type="button"
                        className={` ${updatedata
                          ? enable == false
                            ? " cursor-not-allowed"
                            : ""
                          : ""
                          } border-r-[0.3vw]  flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none`}
                        onClick={(event) => {
                          event.preventDefault();
                          document.getElementById("offerletter").click();
                        }}
                      >
                        <span className="opacity-50">
                          Upload Offer Letter Doc
                        </span>
                        {/* <FaCloudUploadAlt
                          color="#1F487C"
                          size={"2vw"}
                          className="absolute right-[1vw]"
                        /> */}
                      </button>
                      {inputPreview?.offerletter? (
                          inputPreview?.offerletter?.startsWith("blob") ? (
                            <img
                            src={inputPreview.offerletter}
                            className="h-[2.5vw] w-[2.5vw] absolute cursor-zoom-in top-[.1vw] right-[.3vw]"
                            alt="Aadhar Front"
                            onClick={openModal} 
                          />
                          ) : (
                            <img
                            src={`${apiImgUrl}${inputPreview.offerletter}`}
                            className="h-[2.5vw] w-[2.5vw] absolute cursor-zoom-in top-[.1vw] right-[.3vw]"
                            alt="Aadhar Front"
                            onClick={openModal} 
                          />
                          )
                        ) : (
                          <FaCloudUploadAlt
                            color="#1F487C"
                            size="2vw"
                            className="absolute right-[1vw] top-[.4vw] pointer-events-none"
                          />
                        )}
                        </div>
                      {/* {values.offerletter && (
                        <div
                          onClick={() => {
                            setPreviewImage(empDocumentdata?.offer_letter_doc);
                            setPreviewOpen(true);
                          }}
                          className="cursor-pointer underline-offset-1 underline text-[#1F4B7F] text-[0.8vw]"
                        >
                          {values.offerletter.name
                            ? values.offerletter.name
                            : values.offerletter}
                        </div>
                      )} */}
                      <ErrorMessage
                        name="offerletter"
                        component="div"
                        style={{ color: "red" }}
                        className="text-[0.8vw] absolute bottom-[-1.2vw] left-[.2vw]"
                      />
                    </div>
                  </div>
                </div>
              </div>
              </div>
              <div className="flex items-center  w-full justify-between pt-[1.5vw] pb-[1vw]">
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

      {/* <Modal
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
      </Modal> */}
      <Modal
        visible={isModalOpen}
        onCancel={closeModal}
        footer={null}
        centered
        // width="35vw"
        bodyStyle={{ padding: 0 }}
        destroyOnClose={true} // Ensures modal is destroyed on close
      >
        {/* Display the image in the modal */}
        {modalImage && (
          <img
            src={modalImage}
            alt="Documents Preview"
            style={{ width: "100%" }}
            className=""
          />
        )}
      </Modal>
    </div>
  );
}
