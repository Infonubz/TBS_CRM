import { DatePicker, Upload } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { LiaSave } from "react-icons/lia";
import * as Yup from "yup";
import { InboxOutlined } from "@ant-design/icons";
import { message } from "antd";
import { PiUpload } from "react-icons/pi";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { OFFERS_LIST, PROMOTION_DATA } from "../../Store/Type";
import axios from "axios";
import { toast } from "react-toastify";
import {
  GetOffersById,
  GetOffersData,
  SubmitOffersData,
} from "../../Api/Offers/Offers";
import { submitUserData } from "../../Api/UserManagement/UserManagement";
import dayjs from "dayjs";
import { FaUpload } from "react-icons/fa";
import ModalPopup from "../Common/Modal/Modal";
import BackgroundView from "./BackgroundImage";
// const validationSchema = Yup.object().shape({
//   promotion_name: Yup.string().required("Promotion Name is required"),
//   promotion_description: Yup.string().required(
//     "Promotion Description is required"
//   ),
//   file: Yup.mixed()
//     .required("A file is required")
//     .test("fileSize", "File size is too large", function (value) {
//       const { offerdata } = this.parent;
//       console.log(offerdata, "offerdataofferdata");
//       if (offerdata && offerdata.image_size && !value) {
//         return true;
//       }
//       return value && value.size <= 2000000; // 2MB
//     })
//     .test("fileType", "Unsupported File Format", function (value) {
//       const { offerdata } = this.parent;
//       if (offerdata && offerdata.image_type && !value) {
//         return true;
//       }
//       return (
//         value &&
//         ["image/jpeg", "image/png", "application/pdf"].includes(value.type)
//       );
//     }),
// });
const validationSchema = Yup.object().shape({
  usage: Yup.string()
    .required("usage is required")
    .min(1, "usage must be at least 1")
    .max(100, "usage cannot exceed 100")
    .matches(/^[0-9]+$/, 'Only numbers are allowed'),
  promotion_name: Yup.string()
    .required("Offer Name is required")
    // .min(1, "usage must be at least 1")
    .max(17, "Max 17 characters only"),
  promotion_description: Yup.string()
    .required("Offer Description Name is required")
    .max(57, "Max 57 characters only"),
  status: Yup.string()
    .required('This field is required'),
  code: Yup.string()
    .required("Code is required")
    .max(18, "Max 18 characters only"),
  start_date: Yup.date()
    .required('Start Date is required'),
    // .min(new Date(), 'Start Date cannot be in the past'),
  expiry_date: Yup.date()
    .required('Expiry Date is required')
    .min(Yup.ref('start_date'), 'Expiry Date must be after Start Date'),
  file: Yup.mixed()
    .required("File is empty")
    .test("required", "A file is required", function (value) {
      const { isEdit } = this.options.context;
      if (!isEdit && !value) {
        return false;
      }
      return true;
    })
    .test("file_size", "File size is too large", function (value) {
      if (value && value.size > 2000000) {
        // 2MB
        return false;
      }
      return true;
    })
    .test("file_type", "Unsupported File Format", function (value) {
      if (typeof value === "string") {
        // If value is a string (file path), skip file type validation
        return true;
      }
      if (
        value &&
        ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
      ) {
        return true;
      }
      return false;
    }),
});
export default function AddOffer({
  setModalIsOpen,
  updatedata,
  SetUpdateData,
  setOfferData,
  offerdata,
}) {
  const { Dragger } = Upload;
  const [fileName, setFileName] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    console.log(values, "vvvvvvvvaaaaaaaaaaalllllllllla");

    setCurrentOfferdata({
      offer_name: values.promotion_name,
      offer_code: values.code,
      start_date: values.start_date,
      expiry_date: values.expiry_date,
      offer_desc: values.promotion_description,
      offer_image: values.file,
    });


    // if (offerlist.offer_bgImgae) {
    //   try {
    //     const data = await SubmitOffersData(values, updatedata, dispatch);
    //     setModalIsOpen(false);
    //     toast.success(data?.message);
    //     GetOffersData(dispatch);
    //     console.log(data);
    //   } catch (error) {
    //     console.error("Error uploading data", error);
    //   }
    // } else {
    //   setBgImage(true);
    // }
    setBgImage(true);
  };

  const fetchGetOffers = async () => {
    try {
      const data = await GetOffersById(updatedata, SetUpdateData, setOfferData);
      console.log(data.offer_name, "datadata");
      setOfferData(data);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  useEffect(() => {
    if (updatedata != null) {
      fetchGetOffers();
    }
  }, [updatedata, SetUpdateData, setOfferData]);

  console.log(fileName, "offerdataofferdata");
  // const [fileData, setFileData] = useState(null);

  // const handleFileChange = (event) => {
  //   const file = offerdata.image_file;
  //   const reader = new FileReader();

  //   reader.onload = (e) => {
  //     const binaryData = e.target.result;
  //     setFileData(binaryData);
  //   };

  //   // reader.readAsBinaryString(file);
  // };
  // useEffect(()=>{
  //   handleFileChange()
  // },[offerdata])
  // console.log(fileData,"fileDatafileData");
  const [binaryData, setBinaryData] = useState(null);

  useEffect(() => {
    const fileData = {
      uid: "rc-upload-1719855563269-9",
      lastModified: 1719824063011,
      lastModifiedDate:
        "Mon Jul 01 2024 14:24:23 GMT+0530 (India Standard Time)",
      name: "Full.png",
      size: 578980,
      type: "image/png",
      webkitRelativePath: "",
    };

    const blob = new Blob([fileData], { type: fileData.type });
    convertToBinary(blob);
  }, []);

  const convertToBinary = (file) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      const arrayBuffer = reader.result;
      const binaryString = new Uint8Array(arrayBuffer).reduce((data, byte) => {
        return data + String.fromCharCode(byte);
      }, "");
      setBinaryData(binaryString);
    };
  };
  const [bgimage, setBgImage] = useState(false);
  const [currentoffers, setCurrentOffer] = useState([]);
  console.log(currentoffers, 'current_offer_data')

  const closemodal = () => {
    setBgImage(false);
    setCurrentOffer("");
  };
  const [draggerImage, setDraggerImage] = useState(false)
  const [occupationvalue, setOccupationValue] = useState("");
  const [currentofferdata, setCurrentOfferdata] = useState({
    offer_name: "",
    offer_code: "",
    start_date: "",
    expiry_date: "",
    offer_desc: "",
    offer_image: [],
  });
  // const [fileName, setFileName] = useState('');
  const [previewUrl, setPreviewUrl] = useState("");

  console.log(previewUrl, "binaryDatabinaryData");
  const [offerlist, setOfferlist] = useState({
    occupation: "",
    offer_bgImgae: "",
  });
  const [allvalues, setAllValues] = useState("");
  // const typeid = sessionStorage.getItem("type_id");
  const typeid = localStorage.getItem("type_id");

  const getStatusOptions = () => {
    if (typeid == "PRO101") {
      return [
        { label: "Select Status", value: "" },
        { label: "Draft", value: "Draft" },
        { label: "Active", value: "Active" },
      ];
    } else if (typeid == "EMP101") {
      return [
        { label: "Select Status", value: "" },
        { label: "Draft", value: "Draft" },
        { label: "Requested", value: "Requested" },
      ];
    } else {
      return [{ label: "Select Status", value: "" }];
    }
  };

  const options = getStatusOptions();


  const [minExpiryDate, setMinExpiryDate] = useState(new Date().toISOString().split("T")[0]);

  return (
    <>
      <Formik
        initialValues={{
          promotion_name: offerdata ? offerdata.offer_name : "",
          code: offerdata ? offerdata.code : "",
          start_date: offerdata
            ? dayjs(offerdata.start_date).format("YYYY-MM-DD")
            : "",
          expiry_date: offerdata
            ? dayjs(offerdata.expiry_date).format("YYYY-MM-DD")
            : "",
          usage: offerdata ? offerdata.usage : "",
          status: offerdata ? offerdata.status : "",
          promotion_description: offerdata ? offerdata.offer_desc : "",
          file: offerdata ? offerdata.offer_img : "",
          file_type: offerdata?.image_size || "",
          file_size: offerdata?.image_type || "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch({
            type: PROMOTION_DATA,
            payload: values,
          });
          handleSubmit(values);
          setAllValues(values);
        }}
        enableReinitialize
      >
        {({
          isSubmitting,
          isValid,
          handleSubmit,
          values,
          handleChange,
          setFieldValue,
          errors,
          touched,
        }) => (
          <>
            <Form onSubmit={handleSubmit}>
              <div className="flex justify-between mr-[3vw]">
                <div className="text-[1.4vw] text-[#1F4B7F] font-semibold">
                  {updatedata
                    ? "UPDATE OFFERS & DEALS"
                    : "CREATE NEW OFFERS & DEALS"}
                </div>
                <div className="flex gap-x-[1vw]">
                  {/* {offerlist?.offer_bgImgae && (
                    <button
                      className="flex bg-[#1F4B7F] px-[1vw] gap-[0.5vw] py-[0.5vw] rounded-[0.7vw] items-center justify-center"
                      type="submit"
                    >
                      <span>
                        <LiaSave color="white" size={"1.5vw"} />
                      </span>
                      <span className="text-white text-[1.1vw]">
                        {updatedata ? "Update Offer" : "Save Offer"}
                      </span>
                    </button>
                  )} */}
                  <button
                    type="submit"
                    className="flex text-white bg-[#1F4B7F] px-[2vw] gap-[0.5vw] py-[0.5vw] rounded-[0.7vw] items-center justify-center"
                  // onClick={() => setBgImage(true)}
                  >
                    Next
                  </button>
                </div>
              </div>
              <div className=" ">
                <div className="grid grid-cols-2 gap-[1vw] pt-[1vw]">
                  <div className="col-span-1">
                    <label className="text-[#1F4B7F] text-[1.1vw] font-semibold">
                      Offer Name
                      <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <Field
                      type="text"
                      name="promotion_name"
                      id="promotion_name"
                      placeholder="Offer Name"
                      value={values.promotion_name}
                      onChange={(e) => {
                        handleChange(e);
                        localStorage.setItem("promotion_name", e.target.value);
                        setCurrentOfferdata({
                          ...currentofferdata,
                          offer_name: e.target.value,
                        });
                      }}
                      className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                    />
                    <ErrorMessage
                      name="promotion_name"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="text-[#1F4B7F] text-[1.1vw] font-semibold">
                      Offer Code
                    </label>
                    <span className="text-red-500 text-[1vw] pl-[0.2vw]">
                      *
                    </span>
                    <Field
                      type="text"
                      name="code"
                      placeholder="Code"
                      value={values.code}
                      onChange={(e) => {
                        handleChange(e);
                        setCurrentOfferdata({
                          ...currentofferdata,
                          offer_code: e.target.value,
                        });
                      }}
                      className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                    />
                    <ErrorMessage
                      name="code"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-[1vw] pt-[1vw]">
                  <div className="col-span-1 flex-col flex">
                    <label className="text-[#1F4B7F] text-[1.1vw] font-semibold">
                      Start Date
                      <span className="text-red-500 text-[1vw] pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <Field
                      type="date"
                      name="start_date"
                      placeholder="Start Date"
                      value={values.start_date}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => {
                        const selectedStartDate = e.target.value;
                        handleChange(e);
                        setCurrentOfferdata({
                          ...currentofferdata,
                          start_date: selectedStartDate,
                        });

                        // Update the minimum expiry date
                        setMinExpiryDate(selectedStartDate);
                      }}
                      // onChange={(e) => {
                      //   handleChange(e);
                      //   setCurrentOfferdata({
                      //     ...currentofferdata,
                      //     start_date: e.target.value,
                      //   });
                      // }}
                      className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                    />
                    <ErrorMessage
                      name="start_date"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </div>
                  <div className="col-span-1 flex flex-col">
                    <label className="text-[#1F4B7F] text-[1.1vw] font-semibold">
                      Expiry Date
                      <span className="text-red-500 text-[1vw] pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <Field
                      type="date"
                      name="expiry_date"
                      placeholder="Expiry Date"
                      value={values.expiry_date}
                      // min={new Date().toISOString().split("T")[0]}
                      min={minExpiryDate} // Set the minimum date here
                      onChange={(e) => {
                        handleChange(e);
                        setCurrentOfferdata({
                          ...currentofferdata,
                          expiry_date: e.target.value,
                        });
                      }}
                      className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                    />
                    <ErrorMessage
                      name="expiry_date"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-[1vw] pt-[1vw]">
                  <div className="col-span-1 flex-col flex">
                    <label className="text-[#1F4B7F] text-[1.1vw] font-semibold">
                      Offer Usage Persons Count
                      <span className="text-red-500 text-[1vw] pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <Field
                      type="text"
                      name="usage"
                      placeholder="Usage Count"
                      value={values.usage}
                      onChange={(e) => {
                        handleChange(e);
                        localStorage.setItem("usage", e.target.value);
                      }}
                      className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                    />
                    <ErrorMessage
                      name="usage"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </div>
                  <div className="col-span-1 flex flex-col">
                    <label className="text-[#1F4B7F] text-[1.1vw] font-semibold">
                      Status
                      <span className="text-red-500 text-[1vw] pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <Field
                      as="select"
                      name="status"
                      value={values.status}
                      onChange={(e) => {
                        handleChange(e);
                        localStorage.setItem("status", e.target.value);
                      }}
                      className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                    >
                      {/* <option label="Select Status" value="" className="" />
                      <option label="Draft" value="Draft" className="" />
                      <option label="Paused" value="Paused" className="" />
                      <option label="Active" value="Active" className="" /> */}
                      {options.map((option) => (
                        <option
                          key={option.value}
                          label={option.label}
                          value={option.value}
                        />
                      ))}
                    </Field>
                    <ErrorMessage
                      name="status"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-[1vw] pt-[1vw]">
                  <div className="col-span-1 flex-col flex">
                    <label className="text-[#1F4B7F] text-[1.1vw] font-semibold">
                      Offer Description
                      <span className="text-red-500 text-[1vw] pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <Field
                      as="textarea"
                      name="promotion_description"
                      placeholder="Enter Description"
                      value={values.promotion_description}
                      onChange={(e) => {
                        handleChange(e);
                        localStorage.setItem(
                          "promotion_description",
                          e.target.value
                        );
                        setCurrentOfferdata({
                          ...currentofferdata,
                          offer_desc: e.target.value,
                        });
                      }}
                      rows="4"
                      cols="50"
                      className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.1vw] w-[100%] h-full rounded-[0.5vw] outline-none px-[1vw]"
                    />
                    <ErrorMessage
                      name="promotion_description"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </div>
                  <div className=" relative col-span-1 flex flex-col">
                    <label className="text-[#1F4B7F] text-[1.1vw] font-semibold">
                      Image
                      <span className="text-red-500 text-[1vw] pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <Field name="file">
                      {() => (
                        <>
                          <Dragger
                            onChange={() => setDraggerImage(true)}
                            height={"7.2vw"}
                            beforeUpload={(file) => {
                              console.log(file, "filefilefilefile");
                              setFieldValue("file", file);
                              setFileName(file.name); // Set the file name
                              setCurrentOfferdata({
                                ...currentofferdata,
                                offer_name: file,
                              });
                              setFieldValue("file_type", file.type);
                              setFieldValue("file_size", file.size);
                              const reader = new FileReader();

                              reader.onloadend = () => {
                                setPreviewUrl(reader.result); // Set the preview URL
                              };

                              reader.readAsDataURL(file);
                              return false; // Prevent automatic upload
                            }}
                            showUploadList={false} // Disable the default upload list
                            className="custom-dragger mt-[0.5vw] relative"
                            style={{
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              position: "relative",
                            }} // Apply custom CSS class
                          // onChange={(e) => {
                          //   console.log(e.file, "checking");
                          //   setFieldValue("file", e.file);
                          //   setFieldValue("file_type", e.file.type);
                          //   setFieldValue("file_size", e.file.size);
                          //   handleChange({
                          //     target: { name: "file", value: e.file },
                          //   });
                          // }}
                          >
                            <label className="flex items-center justify-center relative z-10">
                              <p className="text-[#1F4B7F] font-bold text-[1.1vw] pr-[1vw]">
                                Drag and Drop
                              </p>
                              <FaUpload color="#1F4B7F" size={"1.2vw"} />
                            </label>
                            <div
                              className="absolute top-0 left-0 w-full h-full"
                              style={{
                                backgroundImage: `url(${(offerdata.offer_img
                                  && draggerImage == false
                                )
                                  ? `http://192.168.90.47:4000${offerdata.offer_img}`
                                  : `http://192.168.90.47:4000${offerdata.offer_img}`
                                  })`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                opacity: "30%",
                                zIndex: 0,
                              }}
                            ></div>
                          </Dragger>
                          {/* {fileName && (
                            <p className="text-[#1F4B7F] text-[0.8vw] mt-2 absolute bottom-[0.3vw]">
                              {fileName}
                            </p>
                          )} */}
                        </>
                      )}
                    </Field>
                    {/* <Field name="file">
                      {() => (
                        <>
                          <Dragger
                            height={"7.2vw"}
                            beforeUpload={() =>
                              handleBeforeUpload(setFieldValue)
                            }
                            showUploadList={false}
                            className="custom-dragger mt-[0.5vw] relative"
                            style={{
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              position: "relative",
                            }}
                          >
                            <label className="flex items-center justify-center relative z-10">
                              <p className="text-[#1F4B7F] font-bold text-[1.1vw] pr-[1vw]">
                                Drag and Drop
                              </p>
                              <FaUpload color="#1F4B7F" size={"1.2vw"} />
                            </label>
                            <div
                              className="absolute top-0 left-0 w-full h-full"
                              style={{
                                backgroundImage: `url(${
                                  previewUrl || offerdata.offer_img
                                    ? `http://192.168.90.47:4000${offerdata.offer_img}`
                                    : ""
                                })`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                opacity: "30%",
                                zIndex: 0,
                              }}
                            ></div>
                          </Dragger>
                          {fileName && (
                            <p className="text-[#1F4B7F] text-[0.8vw] mt-2">
                              {fileName}
                            </p>
                          )}
                        </>
                      )}
                    </Field> */}
                    {fileName ? (
                      <p className="text-[#1F4B7F] text-[0.8vw] mt-2 absolute bottom-[-1.3vw]">
                        {fileName}
                      </p>
                    ) : <ErrorMessage
                      name="file"
                      component="div"
                      className="text-red-500 text-[0.8vw] absolute bottom-[-1.3vw]"
                    />}
                  </div>
                </div>
                {/* <div className="grid grid-cols-2 gap-[1vw] pt-[1vw]">
                  <div className="col-span-1 flex flex-col">
                    <label className="text-[#1F4B7F] text-[1.1vw] font-semibold">
                      Occupation
                    </label>
                    <Field
                      as="select"
                      name="status"
                      value={values.status}
                      onChange={(e) => {
                        handleChange(e);
                        localStorage.setItem("status", e.target.value);
                      }}
                      className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                    >
                      <option label="Select Occupation" value="" className="" />
                      <option label="Draft" value="Draft" className="" />
                      <option label="Paused" value="Paused" className="" />
                      <option label="Active" value="Active" className="" />
                    </Field>
                    <ErrorMessage
                      name="status"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </div>
                  <div className="col-span-1 flex-col flex">
                    <label className="text-[#1F4B7F] text-[1.1vw] font-semibold">
                      Offer Description
                      <span className="text-red-500 text-[1vw] pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <Field
                      as="textarea"
                      name="promotion_description"
                      placeholder="Enter Description"
                      value={values.promotion_description}
                      onChange={(e) => {
                        handleChange(e);
                        localStorage.setItem(
                          "promotion_description",
                          e.target.value
                        );
                        setCurrentOfferdata({
                          ...currentofferdata,
                          offer_desc: e.target.value,
                        });
                      }}
                      rows="4"
                      cols="50"
                      className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                    />
                    <ErrorMessage
                      name="promotion_description"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </div>
                </div> */}
              </div>
            </Form>
          </>
        )}
      </Formik>
      <ModalPopup
        show={bgimage}
        onClose={closemodal}
        height="30vw"
        width="40vw"
        closeicon={false}
      >
        <BackgroundView
          setOccupationValue={setOccupationValue}
          occupationvalue={occupationvalue}
          setCurrentOffer={setCurrentOffer}
          currentoffers={currentoffers}
          currentofferdata={currentofferdata}
          previewUrl={previewUrl}
          setOfferlist={setOfferlist}
          offerlist={offerlist}
          setModalIsOpen={setModalIsOpen}
          allvalues={allvalues}
          setBgImage={setBgImage}
          updatedata={updatedata}
          offerdata={offerdata}
          draggerImage={draggerImage}
        />
      </ModalPopup>
    </>
  );
}
