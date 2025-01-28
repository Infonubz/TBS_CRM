import { Button, Modal, Progress, Spin, Upload } from "antd";
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
import { GetEmpDocumentById } from "../../../Api/UserManagement/Employee";
import {
  GetPatDocumentById,
  SubmitPatDocumentsData,
} from "../../../Api/UserManagement/Partner";
import umbuslogo from "../../../asserts/umbuslogo.png"
import { useDispatch } from "react-redux";

const FILE_SIZE = 1024 * 1024 * 5; // 5MB
const SUPPORTED_FORMATS = [
  "application/pdf",
  "image/jpg",
  "image/jpeg",
  "image/png",
];

const validationSchema = Yup.object().shape({
  aadhar_number: Yup.string()
    .required("Aadhar number is required")
    .length(12, "Aadhar number must be exactly 12 digits")
    .matches(/^\d{12}$/, "Aadhar must be a valid 12-digit number"),
  pan_number: Yup.string()
    .required("Pan number is required")
    .length(10, "PAN number must be exactly 10 characters")
    .matches(
      /[A-Z]{5}[0-9]{4}[A-Z]{1}/,
      "PAN must be in the format ABCDE1234F"
    ),

  aadhar_fr_doc: Yup.mixed()
    .required("Aadhar front page is required")
    .test("fileSize", "File too large max 5mb", (value) =>
      typeof value === "string" ? true : value && value.size <= FILE_SIZE
    )
    .test("fileFormat", "Unsupported Format", (value) =>
      typeof value === "string"
        ? true
        : value && SUPPORTED_FORMATS.includes(value.type)
    ),
  aadhar_bk_doc: Yup.mixed()
    .required("Aadhar back page is required")
    .test("fileSize", "File too large max 5mb", (value) =>
      typeof value === "string" ? true : value && value.size <= FILE_SIZE
    )
    .test("fileFormat", "Unsupported Format", (value) =>
      typeof value === "string"
        ? true
        : value && SUPPORTED_FORMATS.includes(value.type)
    ),

  pan_fr_doc: Yup.mixed()
    .required("Pan front page is required")
    .test("fileSize", "File too large max 5mb", (value) =>
      typeof value === "string" ? true : value && value.size <= FILE_SIZE
    )
    .test("fileFormat", "Unsupported Format", (value) =>
      typeof value === "string"
        ? true
        : value && SUPPORTED_FORMATS.includes(value.type)
    ),
  pan_bk_doc: Yup.mixed()
    .required("Pan back page is required")
    .test("fileSize", "File too large max 5mb", (value) =>
      typeof value === "string" ? true : value && value.size <= FILE_SIZE
    )
    .test("fileFormat", "Unsupported Format", (value) =>
      typeof value === "string"
        ? true
        : value && SUPPORTED_FORMATS.includes(value.type)
    ),

  // pan_fr_doc: Yup.mixed()
  // .required("Aadhar Back Page is required")
  // .test("fileSize", "File too large", (value) =>
  //   typeof value === "string" ? true : value && value.size <= FILE_SIZE
  // )
  // .test("fileFormat", "Unsupported Format", (value) =>
  //   typeof value === "string"
  //     ? true
  //     : value && SUPPORTED_FORMATS.includes(value.type)
  // ),
  // pan_bk_doc: Yup.mixed()
  // .required("Aadhar Back Page is required")
  // .test("fileSize", "File too large", (value) =>
  //   typeof value === "string" ? true : value && value.size <= FILE_SIZE
  // )
  // .test("fileFormat", "Unsupported Format", (value) =>
  //   typeof value === "string"
  //     ? true
  //     : value && SUPPORTED_FORMATS.includes(value.type)
  // ),

  // other_doc: Yup.mixed()
  //   .required("Pan Back Page is required")
  //   .test("fileSize", "File too large", (value) =>
  //     typeof value === "string" ? true : value && value.size <= FILE_SIZE
  //   )
  //   .test("fileFormat", "Unsupported Format", (value) =>
  //     typeof value === "string"
  //       ? true
  //       : value && SUPPORTED_FORMATS.includes(value.type)
  //   ),
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
  updatedata,
  addressback,
  PartnerID,
  setModalIsOpen
}) {
  const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [enable, setEnable] = useState(false);
  const [viewImg, setViewImg] = useState("")
  const [spinning, setSpinning] = useState(false);
  const [inputPreview, setInputPreview] = useState({
    aadharfr: null,
    aadharbk: null,
    panfr: null,
    panbk: null,
  });


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
  //   console.log(file,"imageview");

  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     // setPreviewImage(reader.result?reader.result:tempImg);
  //     setPreviewImage(reader.result);
  //     setPreviewTitle(file.name);
  //   };
  //   reader?.readAsDataURL(file);
  // };
  //   const handlePreview = (file) => {
  //     if (!file) {
  //         console.error('No file selected');
  //         return;
  //     }

  //     console.log(file, "imageview");
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //         setPreviewImage(reader.result);
  //         setPreviewTitle(file.name);
  //     };
  //     reader.readAsDataURL(file);
  // };
  console.log(updatedata, "asdidididid");

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
  const dispatch = useDispatch()
  const handleSubmit = async (values) => {
    console.log(values, "docvalues");
    if (updatedata) {
      toast.success("Partner Updated Successfully")
    }


    try {
      if (enable === false && updatedata && empproffesionaldata?.aadhar_card_number != null) {
        setModalIsOpen(false); // Assuming setCurrentPage is a function in your component
      } else {
        const data = await SubmitPatDocumentsData(values, updatedata, dispatch); // Replace with actual API call function
        toast.success(data)
        setModalIsOpen(false);
        // Assuming setCurrentPage is a function in your component
        // console.log(values,actions,"docvalues");
      }
    } catch (error) {
      console.error("Error uploading data", error);
      toast.error("Failed to submit document. Please try again."); // Notify user of error
    } finally {
      // actions.setSubmitting(false);
    }
  };
  console.log(currentpage, "currentpagecurrentpage");
  const handleCancel = () => {
    setPreviewOpen(false)
    if (updatedata)
      setViewImg("")
    setPreviewImage("")
  };
  const [empproffesionaldata, setEmpProffesionalData] = useState("");
  const fetchGetUser = async () => {
    try {
      const data = await GetPatDocumentById(
        EmployeeID,
        setEmployeeID,
        setEmpProffesionalData,
        updatedata,
        setSpinning
      );
      setEmpProffesionalData(data);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  console.log(empproffesionaldata.aadhar_card_front, "getdata");
  useEffect(() => {
    if (updatedata != null) {
      fetchGetUser();
      setSpinning(true)
    }
  }, [EmployeeID, setEmployeeID, setEmpProffesionalData, updatedata]);

  useEffect(() => {
    setInputPreview({
      aadharfr: empproffesionaldata?.aadhar_card_front,
      aadharbk: empproffesionaldata.aadhar_card_back,
      panfr: empproffesionaldata.pan_card_front,
      panbk: empproffesionaldata.pan_card_back,
    })
  }, [empproffesionaldata])
  return (
    <div>
      <div className="border-l-[0.1vw] relative  px-[2vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.1vw] rounded-[1vw] border-[#1f4b7f] mt-[1.5vw]">
        <div className="h-[4vw] w-full flex items-center justify-between">
          <label className="text-[1.5vw] font-semibold text-[#1f4b7f]">
            Documents
          </label>
          {updatedata && empproffesionaldata?.aadhar_card_number != null ? (
            <button
              className={`${enable
                ? "bg-[#1f4b7f] text-white"
                : "text-[#1f4b7f] bg-white border-[#1f4b7f]"
                } rounded-full font-semibold w-[10vw] h-[2vw] flex items-center justify-center border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.1vw] text-[1.1vw] `}
              onClick={() => {
                setEnable(!enable);
              }}
            >
              Enable to Edit
            </button>
          ) : (
            ""
          )}
          {/* <button className="rounded-full font-semibold w-[6vw] h-[2vw] flex items-center justify-center border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.1vw] border-[#34AE2A] text-[1.1vw] text-[#34AE2A]">
            Save
          </button> */}
        </div>
        <div className="pb-[1vw]">
          <div className="border-b-[0.1vw] w-full border-[#1f4b7f]"></div>
        </div>
        <Formik
          initialValues={{
            aadhar_number: empproffesionaldata?.aadhar_card_number || "",
            pan_number: empproffesionaldata?.pan_card_number || "",
            aadhar_fr_doc: empproffesionaldata?.aadhar_card_front || null,
            aadhar_bk_doc: empproffesionaldata?.aadhar_card_back || null,
            pan_fr_doc: empproffesionaldata?.pan_card_front || null,
            pan_bk_doc: empproffesionaldata?.pan_card_back || null,
            // other_doc: empproffesionaldata?.msme_doc || null,
            // edu_cer_doc: empproffesionaldata?.msme_doc || null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          // onSubmit={(values)=>{
          //   handleSubmit(values)
          //   console.log(values,);

          // }}
          enableReinitialize
        >
          {({ isSubmitting, isValid, setFieldValue, values, handleChange }) => (
            <Form>
              {spinning ? (
                <div className=" flex justify-center h-[23.2vw] items-center">
                  <Spin size="large" />
                </div>
              ) : (
                <>
                  <div className="gap-y-[1.5vw] flex-col flex">
                    <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                      <div className="col-span-1 relative">
                        <label className="text-[#1F4B7F] text-[1.1vw] ">
                          Aadhaar Card Number
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                            *
                          </span>
                        </label>
                        <Field
                          type="text"
                          name="aadhar_number"
                          autocomplete="off"
                          placeholder="Enter Aadhaar Number"
                          value={values.aadhar_number}
                          className={` ${updatedata && empproffesionaldata?.aadhar_card_number != null
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                            } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                          disabled={
                            updatedata && empproffesionaldata?.aadhar_card_number != null
                              ? enable
                                ? false
                                : true
                              : false
                          }
                        />
                        <ErrorMessage
                          name="aadhar_number"
                          component="div"
                          className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw] left-[.3vw]"
                        />
                      </div>
                      <div className="col-span-1 relative">
                        <label className="text-[#1F4B7F] text-[1.1vw] ">
                          PAN Card Number
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                            *
                          </span>
                        </label>
                        <Field
                          type="text"
                          name="pan_number"
                          autocomplete="off"
                          placeholder="Enter Pan Number"
                          onChange={(e) => setFieldValue("pan_number", e.target.value?.toUpperCase())}
                          value={values.pan_number}
                          className={` ${updatedata && empproffesionaldata?.aadhar_card_number != null
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                            } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                          disabled={
                            updatedata && empproffesionaldata?.aadhar_card_number != null
                              ? enable
                                ? false
                                : true
                              : false
                          }
                        />
                        <ErrorMessage
                          name="pan_number"
                          component="div"
                          className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw] left-[.3vw]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-y-[1.5vw] w-full gap-x-[1.5vw]">
                      <div className="col-span-1 relative">
                        <label className="text-[#1F4B7F] text-[1.1vw]">
                          Aadhaar Card Front Doc
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                            *
                          </span>
                        </label>
                        <div>
                          <input
                            id="aadhar_fr_doc"
                            name="aadhar_fr_doc"
                            accept=".jpg, .jpeg, .png"
                            type="file"
                            style={{ display: "none" }}
                            onChange={(event) => {
                              const files = Array.from(event.target.files);
                              console.log(files, event, "filesfiles");
                              setFieldValue(
                                "aadhar_fr_doc",
                                event.currentTarget.files[0]
                              );
                              // handlePreview(files[0]);
                              handleFileChange(event, "aadharfr");
                            }}
                            disabled={
                              updatedata && empproffesionaldata?.aadhar_card_number != null
                                ? enable
                                  ? false
                                  : true
                                : false
                            }

                          />
                          <div className="relative">
                            <button
                              type="button"
                              className={` ${updatedata && empproffesionaldata?.aadhar_card_number != null
                                ? enable == false
                                  ? " cursor-not-allowed"
                                  : ""
                                : ""
                                } border-r-[0.3vw] flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none`}
                              onClick={(event) => {
                                event.preventDefault();
                                document.getElementById("aadhar_fr_doc").click();
                                // handlePreview(document.getElementById("aadhar_fr_doc").value[0])
                              }}
                            >
                              <span className="opacity-50 text-[1vw]">
                                Upload Aadhar Front Doc
                              </span>
                              {/* <FaCloudUploadAlt
                          color="#1F487C"
                          size={"2vw"}
                          className="absolute right-[1vw]"
                        /> */}

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

                            </button>
                            {inputPreview?.aadharfr ? (
                              inputPreview?.aadharfr?.startsWith("blob") ? (
                                <img
                                  src={inputPreview.aadharfr}
                                  className="h-[2.5vw] w-[2.5vw] absolute cursor-zoom-in top-[.15vw] right-[.3vw]"
                                  alt="Aadhar Front"
                                  onClick={openModal}
                                />
                              ) : (
                                <img
                                  src={`${apiImgUrl}${inputPreview.aadharfr}`}
                                  className="h-[2.5vw] w-[2.5vw] absolute  top-[.15vw] cursor-zoom-in right-[.3vw]"
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
                          {/* {values.aadhar_fr_doc && (
                        <div
                          onClick={() => {setPreviewOpen(true)
                            setViewImg(empproffesionaldata?.aadhar_card_front)
                          }}
                          className="cursor-pointer underline-offset-1 underline text-[#1F4B7F] text-[0.8vw]"
                        >
                          {values.aadhar_fr_doc.name
                            ? values.aadhar_fr_doc.name
                            : values.aadhar_fr_doc}
                        </div>
                      )} */}
                          <ErrorMessage
                            name="aadhar_fr_doc"
                            component="div"
                            // style={{ color: "red" }}
                            className="text-[0.8vw] text-red-500 absolute bottom-[-1.2vw] left-[.3vw]"
                          />
                        </div>
                      </div>

                      <div className="col-span-1 relative">
                        <label className="text-[#1F4B7F] text-[1.1vw]">
                          Aadhaar Card Back Doc
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                            *
                          </span>
                        </label>
                        <div>
                          <input
                            id="aadhar_bk_doc"
                            name="aadhar_bk_doc"
                            accept=".jpg, .jpeg, .png"
                            type="file"
                            style={{ display: "none" }}
                            onChange={(event) => {
                              const files = Array.from(event.target.files);
                              console.log(files, "filesfiles");
                              // setFieldValue("pan_front", files);
                              setFieldValue(
                                "aadhar_bk_doc",
                                event.currentTarget.files[0]
                              );
                              // handlePreview(files[0]);
                              handleFileChange(event, "aadharbk");
                            }}
                            disabled={
                              updatedata && empproffesionaldata?.aadhar_card_number != null
                                ? enable
                                  ? false
                                  : true
                                : false
                            }
                          />
                          <div className="relative">
                            <button
                              type="button"
                              className={` ${updatedata && empproffesionaldata?.aadhar_card_number != null
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
                                Upload Aadar Back Doc
                              </span>

                              {/* <FaCloudUploadAlt
                          color="#1F487C"
                          size={"2vw"}
                          className="absolute right-[1vw]"
                        /> */}
                            </button>
                            {inputPreview?.aadharbk ? (
                              inputPreview?.aadharbk?.startsWith("blob") ? (
                                <img
                                  src={inputPreview.aadharbk}
                                  className="h-[2.5vw] w-[2.5vw] absolute top-[.15vw] cursor-zoom-in right-[.3vw]"
                                  alt="Aadhar Front"
                                  onClick={openModal}
                                />
                              ) : (
                                <img
                                  src={`${apiImgUrl}${inputPreview.aadharbk}`}
                                  className="h-[2.5vw] w-[2.5vw] absolute  top-[.15vw] cursor-zoom-in right-[.3vw]"
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
                          onClick={() => {setPreviewOpen(true)
                            setViewImg(empproffesionaldata?.aadhar_card_back)
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
                            // style={{ color: "red" }}
                            className="text-[0.8vw] text-red-500 absolute bottom-[-1.2vw] left-[.3vw]"
                          />
                        </div>
                      </div>
                      <div className="col-span-1 relative">
                        <label className="text-[#1F4B7F] text-[1.1vw]">
                          PAN Card Front Document
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                            *
                          </span>
                        </label>
                        <div className="relative">
                          <div>
                            <input
                              id="pan_fr_doc"
                              name="pan_fr_doc"
                              type="file"
                              accept=".jpg, .jpeg, .png"
                              style={{ display: "none" }}
                              onChange={(event) => {
                                const files = Array.from(event.target.files);
                                // setFieldValue("aadhar_back", files);
                                setFieldValue(
                                  "pan_fr_doc",
                                  event.currentTarget.files[0]
                                );
                                // handlePreview(files[0]);
                                handleFileChange(event, "panfr");
                              }}
                              disabled={
                                updatedata && empproffesionaldata?.aadhar_card_number != null
                                  ? enable
                                    ? false
                                    : true
                                  : false
                              }
                            />
                            <button
                              type="button"
                              className={` ${updatedata && empproffesionaldata?.aadhar_card_number != null
                                ? enable == false
                                  ? " cursor-not-allowed"
                                  : ""
                                : ""
                                } border-r-[0.3vw]  flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none`}
                              onClick={(event) => {
                                event.preventDefault();
                                document.getElementById("pan_fr_doc").click();
                              }}
                            >
                              <span className="opacity-50">Upload PAN Front Doc</span>
                              {/* <FaCloudUploadAlt
                          color="#1F487C"
                          size={"2vw"}
                          className="absolute right-[1vw]"
                        /> */}

                            </button>
                            {inputPreview?.panfr ? (
                              inputPreview?.panfr?.startsWith("blob") ? (
                                <img
                                  src={inputPreview.panfr}
                                  className="h-[2.5vw] w-[2.5vw] absolute  top-[.15vw] cursor-zoom-in right-[.3vw]"
                                  alt="pan doc"
                                  onClick={openModal}
                                />
                              ) : (
                                <img
                                  src={`${apiImgUrl}${inputPreview.panfr}`}
                                  className="h-[2.5vw] w-[2.5vw] absolute  top-[.15vw] cursor-zoom-in right-[.3vw]"
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
                          {/* {values.pan_fr_doc && (
                        <div
                          onClick={() => {setPreviewOpen(true)
                            setViewImg(empproffesionaldata?.pan_card_front)
                          }}
                          className="cursor-pointer underline-offset-1 underline text-[#1F4B7F] text-[0.8vw]"
                        >
                          {values.pan_fr_doc.name
                            ? values.pan_fr_doc.name
                            : values.pan_fr_doc}
                        </div>
                      )} */}
                          <ErrorMessage
                            name="pan_fr_doc"
                            component="div"
                            // style={{ color: "red" }}
                            className="text-[0.8vw] absolute text-red-500 bottom-[-1.2vw] left-[.3vw]"
                          />
                        </div>
                      </div>
                      <div className="col-span-1 relative">
                        <label className="text-[#1F4B7F] text-[1.1vw]">
                          PAN Card Back Doc
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                            *
                          </span>
                        </label>
                        <div>
                          <input
                            id="pan_bk_doc"
                            name="pan_bk_doc"
                            accept=".jpg, .jpeg, .png"
                            type="file"
                            style={{ display: "none" }}
                            onChange={(event) => {
                              const files = Array.from(event.target.files);
                              console.log(files, "filesfiles");
                              // setFieldValue("pan_back", files);
                              setFieldValue(
                                "pan_bk_doc",
                                event.currentTarget.files[0]
                              );
                              // handlePreview(files[0]);
                              handleFileChange(event, "panbk");
                            }}
                            disabled={
                              updatedata && empproffesionaldata?.aadhar_card_number != null
                                ? enable
                                  ? false
                                  : true
                                : false
                            }
                          />
                          <div className="relative">
                            <button
                              type="button"
                              className={` ${updatedata && empproffesionaldata?.aadhar_card_number != null
                                ? enable == false
                                  ? " cursor-not-allowed"
                                  : ""
                                : ""
                                } border-r-[0.3vw] flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none`}
                              onClick={(event) => {
                                event.preventDefault();
                                document.getElementById("pan_bk_doc").click();
                              }}
                            >
                              <span className="opacity-50">Upload PAN Back Doc</span>
                              {/* <FaCloudUploadAlt
                          color="#1F487C"
                          size={"2vw"}
                          className="absolute right-[1vw]"
                        /> */}
                            </button>
                            {inputPreview?.panbk ? (
                              inputPreview?.panbk?.startsWith("blob") ? (
                                <img
                                  src={inputPreview.panbk}
                                  className="h-[2.5vw] w-[2.5vw] absolute  top-[.15vw] cursor-zoom-in right-[.3vw]"
                                  alt="pan doc"
                                  onClick={openModal}
                                />
                              ) : (
                                <img
                                  src={`${apiImgUrl}${inputPreview.panbk}`}
                                  className="h-[2.5vw] w-[2.5vw] absolute  top-[.15vw] cursor-zoom-in right-[.3vw]"
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
                          onClick={() => {setPreviewOpen(true)
                            setViewImg(empproffesionaldata?.pan_card_back)
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
                            // style={{ color: "red" }}
                            className="text-[0.8vw] absolute text-red-500 bottom-[-1.2vw] left-[.3vw]"
                          />
                        </div>
                      </div>
                      {/* <div className="col-span-1">
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
                          onClick={() => setPreviewOpen(true)}
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
                  </div> */}
                    </div>
                  </div>
                  <div className="flex items-center  w-full justify-between pb-[1vw] pt-[2vw]">
                    <div>
                      <h1 className="text-[#1F4B7F] text-[0.7vw] font-semibold">
                        *You must fill in all fields to be able to continue
                      </h1>
                    </div>
                    <div className="flex items-center gap-x-[1vw]">
                      <button
                        className="border-[#1F487C] w-[5vw] font-semibold text-[1vw] h-[2vw] rounded-full border-r-[0.2vw]  border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw]"
                        onClick={() => {
                          setCurrentpage(2);
                          setDocumentBack(true);
                        }}
                      >
                        Back
                      </button>
                      <button
                        className="bg-[#1F487C] font-semibold rounded-full w-[10vw] h-[2vw] text-[1vw] text-white"
                        type="submit"
                      // onClick={() => setCurrentpage(4)}
                      // onClick={()=>{
                      //   if(updatedata){
                      //     toast.success("Partner Updated Successfully")
                      //   }
                      //   else{
                      //     toast.success("Partner Submitted Successfully")
                      //   }
                      // }}
                      >
                        {updatedata && empproffesionaldata?.aadhar_card_number != null ? enable
                          ? "Update & Submit"
                          : "Submit"
                          : "Submit"}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </Form>
          )}
        </Formik>
      </div>
      {/* <Modal
        open={previewOpen}
        open={true}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" ,height:"15vw" }} src={ `${previewImage}`|| `http://192.168.90.47:4000${viewImg}`} />
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
            alt="Document Preview"
            style={{ width: "100%" }}
            className=""
          />
        )}
      </Modal>
    </div>
  );
}
