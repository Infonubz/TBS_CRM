import { Button, Modal, Progress, Spin, Tooltip, Upload } from "antd";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import * as Yup from "yup";
import umbuslogo from "../../../asserts/umbuslogo.png";
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
    .test("fileSize", "File too large max 5mb", (value) =>
      typeof value === "string" ? true : value && value.size <= FILE_SIZE
    )
    .test("fileFormat", "Unsupported Format", (value) =>
      typeof value === "string"
        ? true
        : value && SUPPORTED_FORMATS.includes(value.type)
    ),
  aadhar_back: Yup.mixed()
    .required("Aadhar Back Page is required")
    .test("fileSize", "File too large max 5mb", (value) =>
      typeof value === "string" ? true : value && value.size <= FILE_SIZE
    )
    .test("fileFormat", "Unsupported Format", (value) =>
      typeof value === "string"
        ? true
        : value && SUPPORTED_FORMATS.includes(value.type)
    ),
  pan_front: Yup.mixed()
    .required("Pan Front Page is required")
    .test("fileSize", "File too large max 5mb", (value) =>
      typeof value === "string" ? true : value && value.size <= FILE_SIZE
    )
    .test("fileFormat", "Unsupported Format", (value) =>
      typeof value === "string"
        ? true
        : value && SUPPORTED_FORMATS.includes(value.type)
    ),
  pan_back: Yup.mixed()
    .required("Pan Back Page is required")
    .test("fileSize", "File too large max 5mb", (value) =>
      typeof value === "string" ? true : value && value.size <= FILE_SIZE
    )
    .test("fileFormat", "Unsupported Format", (value) =>
      typeof value === "string"
        ? true
        : value && SUPPORTED_FORMATS.includes(value.type)
    ),
  msme_docs: Yup.mixed()
    .required("MSME Image is required")
    .test("fileSize", "File too large max 5mb", (value) =>
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
  updatedata,
}) {
  const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [spinning, setSpinning] = useState(false);

  const [inputPreview, setInputPreview] = useState({
    aadharfr: null,
    aadharbk: null,
    panfr: null,
    panbk: null,
    msme: null,
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const openModal = (event) => {
    // Get the image source (src) using `getElementById`
    const imageSrc = event.target.getAttribute("src");

    // Set the modal image source
    setModalImage(imageSrc);

    // Open the modal
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
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
  const dispatch = useDispatch();
  const handleSubmit = async (values, actions) => {
    try {
      if (
        (operatorID && enable == false && gstback == true) ||
        (updatedata && superadmindocumentdata.aadar_front_doc != null && enable == false)
      ) {
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
        console.log("Checking_checking");
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
        setSuperAdmindocumentData,
        setSpinning
      );
      setSuperAdmindocumentData(data);
      // setInputPreview({
      //   aadharfr:data.aadar_front_doc,
      //   aadharbk:data.aadar_back_doc,
      //   panfr:data.pancard_front_doc,
      //   panbk:data.pancard_back_doc,
      //   msme:data.msme_docs
      // })
      console.log(data, "docdata");
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };
  useEffect(() => {
    setInputPreview({
      aadharfr: superadmindocumentdata.aadar_front_doc,
      aadharbk: superadmindocumentdata.aadar_back_doc,
      panfr: superadmindocumentdata.pancard_front_doc,
      panbk: superadmindocumentdata.pancard_back_doc,
      msme: superadmindocumentdata.msme_docs,
    });
  }, [superadmindocumentdata]);

  console.log(inputPreview, "aadhafjfjfsdjfiosdjfiodjf");

  useEffect(() => {
    if (operatorID != null || enable || gstback) {
      fetchGetUser();
      setSpinning(true)
    }
  }, [operatorID,
     setOperatorID, 
     setSuperAdmindocumentData,
      // enable,
       gstback]);
  return (
    <div>
      <div className="border-l-[0.1vw]  relative  px-[2vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.1vw] rounded-[1vw] border-[#1f4b7f] mt-[1vw] ">
        <div className="w-[5vw] h-[5vw] bg-white shadow-lg rounded-full absolute left-[16.6vw] top-[-2.5vw] flex justify-center items-center">
          <img className="" src={umbuslogo} alt="buslogo" />
        </div>
        <div className="h-[4vw] w-full flex items-center justify-between">
          <label className="text-[1.5vw] font-semibold text-[#1f4b7f]">
            Documents
          </label>
          {updatedata && superadmindocumentdata.aadar_front_doc != null || gstback ? (
            <button
              className={`${
                enable
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
          {/* <img src={`http://192.168.90.47:4000${inputPreview.aadharfr}`}/> */}
          <div className="border-b-[0.1vw] w-full border-[#1f4b7f]"></div>
        </div>
        <Formik
          initialValues={{
            aadhar_front: superadmindocumentdata.aadar_front_doc || null,
            aadhar_back: superadmindocumentdata.aadar_back_doc || null,
            pan_front: superadmindocumentdata.pancard_front_doc || null,
            pan_back: superadmindocumentdata.pancard_back_doc || null,
            msme_docs: superadmindocumentdata.msme_docs || null,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          enableReinitialize
        >
          {({ isSubmitting, isValid, setFieldValue, values, handleChange }) => (
            <Form>
              {spinning ? (
                <div className=" flex justify-center h-[22.5vw] items-center">
                  <Spin size="large" />
                </div>
              ) : (
                <div>
                  <div className="gap-y-[1.2vw] flex-col flex">
                    <div className="grid grid-cols-2 w-full  gap-x-[1.5vw]">
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
                            accept=".jpg, .jpeg, .png" 
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
                              // handlePreview(files[0]);
                              handleFileChange(event, "aadharfr");
                              // setInputPreview(
                              //   URL.createObjectURL(event.currentTarget.files[0])
                              // );
                              // setInputPreview(state => ({
                              //   ...state,
                              //   aadharfr: URL?.createObjectURL(event?.currentTarget?.files[0])
                              // }))
                            }}
                            disabled={
                              updatedata && superadmindocumentdata.aadar_front_doc != null || gstback
                                ? enable
                                  ? false
                                  : true
                                : false
                            }
                          />
                          <button
                            type="button"
                            className={`${
                              updatedata && superadmindocumentdata.aadar_front_doc != null || gstback
                                ? enable == false
                                  ? " cursor-not-allowed"
                                  : ""
                                : ""
                            } border-r-[0.3vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none`}
                            onClick={(event) => {
                              event.preventDefault();
                              document.getElementById("aadhar_front").click();
                            }}
                          >
                            <span className="opacity-50">
                              Upload Aadhar Front
                            </span>
                            {/* {inputPreview?.aadharfr  ? (
                          inputPreview?.aadharfr?.startsWith("blob") ? (
                            <img
                            src={inputPreview.aadharfr}
                            className="h-[2.5vw] w-[2.5vw] absolute right-[1vw]"
                            alt="Aadhar Front"
                          />
                          ) : (
                            <img
                            src={`http://192.168.90.47:4000${inputPreview.aadharfr}`}
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

                            {/* {inputPreview.aadharfr != null ? (
                          <img
                            // src={`http://192.168.90.47:4000${inputPreview.aadharfr}` || inputPreview.aadharfr}
                            src={inputPreview.aadharfr}
                            className=" h-[2.5vw] w-[2.5vw] absolute right-[1vw]"
                          />
                        ) : (
                          <FaCloudUploadAlt
                            color="#1F487C"
                            size={"2vw"}
                            className="absolute right-[1vw]"
                          />
                        )} */}
                          </button>
                          {inputPreview?.aadharfr ? (
                            inputPreview?.aadharfr?.startsWith("blob") ? (
                              <img
                                src={inputPreview.aadharfr}
                                className="h-[2.5vw] w-[2.5vw] absolute cursor-zoom-in top-[.2vw]  right-[.3vw]"
                                alt="Aadhar Front"
                                onClick={openModal}
                              />
                            ) : (
                              <img
                                src={`${apiImgUrl}${inputPreview.aadharfr}`}
                                className="h-[2.5vw] w-[2.5vw] absolute  top-[.2vw] cursor-zoom-in right-[.3vw]"
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

                          {/* {values.aadhar_front && (
                        <div
                          onClick={() => {
                            setPreviewImage(
                              superadmindocumentdata?.aadar_front_doc
                            );
                            setPreviewOpen(true);
                          }}
                          className="cursor-pointer underline-offset-1 underline text-[#1F4B7F] text-[0.7vw]"
                        >   </div>
                      )} */}
                          {/* {values.aadhar_front.name
                            ? values.aadhar_front.name
                            : values.aadhar_front} */}
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

                          <ErrorMessage
                            name="aadhar_front"
                            component="div"
                            // style={{ color: "red" }}
                            className="text-[0.8vw] text-red-500 absolute bottom-[-1.25vw]"
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
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                            *
                          </span>
                        </label>
                        <div className="relative">
                          <input
                            id="aadhar_back"
                            name="aadhar_back"
                            accept=".jpg, .jpeg, .png" 
                            type="file"
                            style={{ display: "none" }}
                            onChange={(event) => {
                              const files = Array.from(event.target.files);
                              setFieldValue(
                                "aadhar_back",
                                event.currentTarget.files[0]
                              );
                              // handlePreview(files[0]);
                              handleFileChange(event, "aadharbk");
                            }}
                            disabled={
                              updatedata && superadmindocumentdata.aadar_front_doc != null || gstback
                                ? enable
                                  ? false
                                  : true
                                : false
                            }
                          />
                          <button
                            type="button"
                            className={`${
                              updatedata && superadmindocumentdata.aadar_front_doc != null || gstback
                                ? enable == false
                                  ? "cursor-not-allowed"
                                  : ""
                                : ""
                            }  border-r-[0.3vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none`}
                            onClick={(event) => {
                              event.preventDefault();
                              document.getElementById("aadhar_back").click();
                            }}
                          >
                            <span className="opacity-50">
                              Upload Aadhar Back
                            </span>
                            {/* {inputPreview.aadharbk ? (
                          <img
                            src={inputPreview.aadharbk}
                            className=" h-[2.5vw] w-[2.5vw] absolute right-[1vw]"
                          />
                        ) : (
                          <FaCloudUploadAlt
                            color="#1F487C"
                            size={"2vw"}
                            className="absolute right-[1vw]"
                          />
                        )} */}
                            {/* {inputPreview?.aadharbk  ? (
                          inputPreview?.aadharbk?.startsWith("blob") ? (
                            <img
                            src={inputPreview.aadharbk}
                            className="h-[2.5vw] w-[2.5vw] absolute right-[1vw]"
                            alt="Aadhar Front"
                          />
                          ) : (
                            <img
                            src={`http://192.168.90.47:4000${inputPreview.aadharbk}`}
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
                          {inputPreview?.aadharbk ? (
                            inputPreview?.aadharbk?.startsWith("blob") ? (
                              <img
                                src={inputPreview.aadharbk}
                                className="h-[2.5vw] w-[2.5vw] absolute cursor-zoom-in top-[.2vw]  right-[.3vw]"
                                alt="Aadhar Back"
                                onClick={openModal}
                              />
                            ) : (
                              <img
                                src={`${apiImgUrl}${inputPreview.aadharbk}`}
                                className="h-[2.5vw] w-[2.5vw] absolute  top-[.2vw] cursor-zoom-in right-[.3vw]"
                                alt="Aadhar Back"
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
                          {/* {values.aadhar_back && (
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
                      )} */}
                          <ErrorMessage
                            name="aadhar_back"
                            component="div"
                            // style={{ color: "red" }}
                            className="text-[0.8vw] text-red-500 absolute bottom-[-1.25vw]"
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
                            accept=".jpg, .jpeg, .png" 
                            style={{ display: "none" }}
                            onChange={(event) => {
                              const files = Array.from(event.target.files);
                              console.log(files, "filesfiles");
                              // setFieldValue("pan_front", files);
                              setFieldValue(
                                "pan_front",
                                event.currentTarget.files[0]
                              );
                              // handlePreview(files[0]);
                              handleFileChange(event, "panfr");
                            }}
                            disabled={
                              updatedata && superadmindocumentdata.aadar_front_doc != null || gstback
                                ? enable
                                  ? false
                                  : true
                                : false
                            }
                          />
                          <button
                            type="button"
                            className={`${
                              updatedata && superadmindocumentdata.aadar_front_doc != null || gstback
                                ? enable == false
                                  ? " cursor-not-allowed"
                                  : ""
                                : ""
                            }  border-r-[0.3vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none`}
                            onClick={(event) => {
                              event.preventDefault();
                              document.getElementById("pan_front").click();
                            }}
                          >
                            <span className="opacity-50">
                              Upload Pancard Front
                            </span>
                            {/* {inputPreview.panfr ? (
                          <img
                            src={inputPreview.panfr}
                            className=" h-[2.5vw] w-[2.5vw] absolute right-[1vw]"
                          />
                        ) : (
                          <FaCloudUploadAlt
                            color="#1F487C"
                            size={"2vw"}
                            className="absolute right-[1vw]"
                          />
                        )} */}
                            {/* {inputPreview?.panfr  ? (
                          inputPreview?.panfr?.startsWith("blob") ? (
                            <img
                            src={inputPreview.panfr}
                            className="h-[2.5vw] w-[2.5vw] absolute right-[1vw]"
                            alt="Aadhar Front"
                          />
                          ) : (
                            <img
                            src={`http://192.168.90.47:4000${inputPreview.panfr}`}
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
                          {inputPreview?.panfr ? (
                            inputPreview?.panfr?.startsWith("blob") ? (
                              <img
                                src={inputPreview.panfr}
                                className="h-[2.5vw] w-[2.5vw] absolute cursor-zoom-in top-[.2vw]  right-[.3vw]"
                                alt="Pan Front"
                                onClick={openModal}
                              />
                            ) : (
                              <img
                                src={`${apiImgUrl}${inputPreview.panfr}`}
                                className="h-[2.5vw] w-[2.5vw] absolute  top-[.2vw] cursor-zoom-in right-[.3vw]"
                                alt="Pan Front"
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
                          {/* {values.pan_front && (
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
                      )} */}
                          <ErrorMessage
                            name="pan_front"
                            component="div"
                            // style={{ color: "red" }}
                            className="text-[0.8vw] text-red-500 absolute bottom-[-1.25vw]"
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
                            accept=".jpg, .jpeg, .png" 
                            style={{ display: "none" }}
                            onChange={(event) => {
                              const files = Array.from(event.target.files);
                              console.log(files, "filesfiles");
                              // setFieldValue("pan_back", files);
                              setFieldValue(
                                "pan_back",
                                event.currentTarget.files[0]
                              );
                              // handlePreview(files[0]);
                              handleFileChange(event, "panbk");
                            }}
                            disabled={
                              updatedata && superadmindocumentdata.aadar_front_doc != null || gstback
                                ? enable
                                  ? false
                                  : true
                                : false
                            }
                          />
                          <button
                            type="button"
                            className={`${
                              updatedata && superadmindocumentdata.aadar_front_doc != null || gstback
                                ? enable == false
                                  ? " cursor-not-allowed"
                                  : ""
                                : ""
                            }  border-r-[0.3vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none`}
                            onClick={(event) => {
                              event.preventDefault();
                              document.getElementById("pan_back").click();
                            }}
                          >
                            <span className="opacity-50">
                              Upload Pancard Back
                            </span>
                            {/* {inputPreview.panbk ? (
                          <img
                            src={inputPreview.panbk}
                            className=" h-[2.5vw] w-[2.5vw] absolute right-[1vw]"
                          />
                        ) : (
                          <FaCloudUploadAlt
                            color="#1F487C"
                            size={"2vw"}
                            className="absolute right-[1vw]"
                          />
                        )} */}
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
                          {inputPreview?.panbk ? (
                            inputPreview?.panbk?.startsWith("blob") ? (
                              <img
                                src={inputPreview.panbk}
                                className="h-[2.5vw] w-[2.5vw] absolute cursor-zoom-in top-[.2vw]  right-[.3vw]"
                                alt="Pan Back"
                                onClick={openModal}
                              />
                            ) : (
                              <img
                                src={`${apiImgUrl}${inputPreview.panbk}`}
                                className="h-[2.5vw] w-[2.5vw] absolute  top-[.2vw] cursor-zoom-in right-[.3vw]"
                                alt="Pan Back"
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
                          {/* {values.pan_back && (
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
                      )} */}
                          <ErrorMessage
                            name="pan_back"
                            component="div"
                            // style={{ color: "red" }}
                            className="text-[0.8vw] text-red-500 absolute bottom-[-1.25vw]"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="gird grid-cols-2 w-full gap-x-[1.5vw]">
                      <div className="col-span-2">
                        <label className="text-[#1F4B7F] text-[1.1vw]">
                          MSME Image
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                            *
                          </span>
                        </label>
                        <div className="relative">
                          <input
                            id="msme_docs"
                            name="msme_docs"
                            type="file"
                            accept=".jpg, .jpeg, .png" 
                            style={{ display: "none" }}
                            onChange={(event) => {
                              const files = Array.from(event.target.files);
                              console.log(files, "filesfiles");
                              // setFieldValue("msme_docs", files);
                              setFieldValue(
                                "msme_docs",
                                event.currentTarget.files[0]
                              );
                              // handlePreview(files[0]);
                              handleFileChange(event, "msme");
                            }}
                            disabled={
                              updatedata && superadmindocumentdata.aadar_front_doc != null || gstback
                                ? enable
                                  ? false
                                  : true
                                : false
                            }
                          />
                          <button
                            type="button"
                            className={`${
                              updatedata && superadmindocumentdata.aadar_front_doc != null || gstback
                                ? enable == false
                                  ? " cursor-not-allowed"
                                  : ""
                                : ""
                            }  border-r-[0.3vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none`}
                            onClick={(event) => {
                              event.preventDefault();
                              document.getElementById("msme_docs").click();
                            }}
                          >
                            <span className="opacity-50">
                              Upload MSME Image
                            </span>
                            {/* {inputPreview.msme ? (
                          <img
                            src={inputPreview.msme}
                            className=" h-[2.5vw] w-[2.5vw] absolute right-[1vw]"
                          />
                        ) : (
                          <FaCloudUploadAlt
                            color="#1F487C"
                            size={"2vw"}
                            className="absolute right-[1vw]"
                          />
                        )} */}
                            {/* {inputPreview?.msme  ? (
                          inputPreview?.msme?.startsWith("blob") ? (
                            <img
                            src={inputPreview.msme}
                            className="h-[2.5vw] w-[2.5vw] absolute right-[1vw]"
                            alt="Aadhar Front"
                          />
                          ) : (
                            <img
                            src={`http://192.168.90.47:4000${inputPreview.msme}`}
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
                          {inputPreview?.msme ? (
                            inputPreview?.msme?.startsWith("blob") ? (
                              <img
                                src={inputPreview.msme}
                                className="h-[2.5vw] w-[2.5vw] absolute cursor-zoom-in top-[.2vw]  right-[.3vw]"
                                alt="msme"
                                onClick={openModal}
                              />
                            ) : (
                              <img
                                src={`${apiImgUrl}${inputPreview.msme}`}
                                className="h-[2.5vw] w-[2.5vw] absolute  top-[.2vw] cursor-zoom-in right-[.3vw]"
                                alt="msme"
                                onClick={openModal}
                              />
                            )
                          ) : (
                            <FaCloudUploadAlt
                              color="#1F487C"
                              size="2vw"
                              className="absolute  right-[1vw] top-[.4vw] pointer-events-none"
                            />
                          )}
                          {/* {values.msme_docs && (
                        <div
                          onClick={() => {
                            setPreviewImage(superadmindocumentdata?.msme_docs);
                            setPreviewOpen(true);
                          }}
                          className="cursor-pointer underline-offset-1 underline text-[#1F4B7F] text-[0.7vw]"
                        >
                          {values.msme_docs.name
                            ? values.msme_docs.name
                            : values.msme_docs}
                        </div>
                      )} */}
                          <ErrorMessage
                            name="msme_docs"
                            component="div"
                            // style={{ color: "red" }}
                            className="text-[0.8vw]  text-red-500 absolute bottom-[-1.2vw]"
                          />
                        </div>
                      </div>
                      {/* <div className="col-span-1"></div> */}
                    </div>
                  </div>
                  <div className="flex items-center left-0 px-[vw] w-full  bottom-0 gap-x-[1vw] justify-between mt-[3vw] pt-[0vw] py-[1vw]">
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
                        {updatedata && superadmindocumentdata.aadar_front_doc != null || gstback
                          ? enable
                            ? "Update & Continue"
                            : "Continue"
                          : "Continue"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>

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
    </div>
  );
}
