import { DatePicker, Upload } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { LiaSave } from "react-icons/lia";
import * as Yup from "yup";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { PROMOTION_DATA, GET_OPERATOR_NAME } from "../../Store/Type";
import axios from "axios";
import { toast } from "react-toastify";
import ModalPopup from "../Common/Modal/Modal";
import {
  GetPromotionById,
  GetPromotionData,
  SubmitPromotionData,
  GetOperatorName,
} from "../../Api/Promotion/Promotion";
import { submitUserData } from "../../Api/UserManagement/UserManagement";
import dayjs from "dayjs";
import { FaUpload } from "react-icons/fa";
import Background_View from "./Background_View";

const validationSchema = Yup.object().shape({
  promotion_name: Yup.string().required("Promotion Name is required"),
  promotion_description: Yup.string().required(
    "Promotion Description Name is required"
  ),
  file: Yup.mixed()
    .required("A file is required")
    .test("fileSize", "File size is too large", (value) => {
      return value && value.size <= 2000000; // 2MB
    })
    .test("fileType", "Unsupported File Format", (value) => {
      return value && ["image/jpeg", "image/png"].includes(value.type);
    }),
});
export default function AddPromotion({
  setModalIsOpen,
  updatedata,
  SetUpdateData,
  setPromoData,
  promodata,
  promotionId,
  setPromotionId,
}) {
  const { Dragger } = Upload;
  const [fileName, setFileName] = useState("");
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("");
  const [selectedOperator, setSelectedOperator] = useState("");
  const getOperatorName = useSelector((state) => state.crm.operator_name);
  const [imageModalOpen, isImageModalOpen] = useState(false);
  const [bgimage, setBgImage] = useState(false);
  const [currentPromo, setCurrentPromo] = useState([]);
  const [previewUrl, setPreviewUrl] = useState("");

  console.log(previewUrl, "binaryDatabinaryData");

  const [promolist, setPromolist] = useState({
    background_image: "",
  });

  const [currentPromodata, setCurrentPromodata] = useState("");

  const openImageModal = () => {
    isImageModalOpen(true);
  };

  const closemodal = () => {
    setBgImage(false);
    setCurrentPromo("");
  };

  useEffect(() => {
    GetPromotionData(dispatch);
    GetOperatorName(dispatch);
    console.log(getOperatorName, "getOperatorName");
  }, []);

  useEffect(() => {
    const userNameFromSessionStorage = sessionStorage.getItem("user_name");
    const UserType = sessionStorage.getItem("type_name");
    if (UserType) {
      setUserType(UserType);
    }
    if (userNameFromSessionStorage) {
      setUserName(userNameFromSessionStorage);
    }
    console.log(UserType, "UserType");
  }, []);

  const handleSubmit = async (values) => {
    setBgImage(true);
  };

  const fetchGetPromo = async () => {
    try {
      const data = await GetPromotionById(
        promotionId,
        setPromotionId,
        setPromoData
      );
      console.log(data.promo_name, "datadata");
      setPromoData(data);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  useEffect(() => {
    if (promotionId) {
      fetchGetPromo();
    }
  }, [promotionId, setPromotionId, setPromoData]);

  console.log(fileName, "promodatapromodata");
  // const [fileData, setFileData] = useState(null);

  // const handleFileChange = (event) => {
  //   const file = promodata.image_file;
  //   const reader = new FileReader();

  //   reader.onload = (e) => {
  //     const binaryData = e.target.result;
  //     setFileData(binaryData);
  //   };

  //   // reader.readAsBinaryString(file);
  // };
  // useEffect(()=>{
  //   handleFileChange()
  // },[promodata])
  // console.log(fileData,"fileDatafileData");

  const [binaryData, setBinaryData] = useState(null);
  console.log(promotionId, "occupationvalue");
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

  console.log(binaryData, "binaryDatabinaryData");
  return (
    <>
      <Formik
        initialValues={{
          promotion_name: promodata ? promodata.promo_name : "",
          operator_details: promodata ? promodata.operator_details : "",
          start_date: promodata
            ? dayjs(promodata.start_date).format("YYYY-MM-DD")
            : "",
          expiry_date: promodata
            ? dayjs(promodata.expiry_date).format("YYYY-MM-DD")
            : "",
          usage: promodata ? promodata.usage : "",
          status: promodata ? promodata.promo_status : "",
          promotion_description: promodata ? promodata.promo_description : "",
          file: promodata ? promodata.promo_image : "",
          background_image: promodata
            ? promodata.background_image
            : promolist?.name,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch({
            type: PROMOTION_DATA,
            payload: values,
          });
          handleSubmit(values);
          setCurrentPromodata(values);
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
                  {updatedata ? "UPDATE PROMOTION" : "CREATE NEW PROMOTION"}
                </div>
                <div className="flex gap-x-[1vw]">
                  {promolist?.background_image && (
                    <button
                      className="flex bg-[#1F4B7F] px-[1vw] gap-[0.5vw] py-[0.5vw] rounded-[0.7vw] items-center justify-center"
                      type="submit"
                    >
                      <span>
                        <LiaSave color="white" size={"1.5vw"} />
                      </span>
                      <span className="text-white text-[1.1vw]">
                        {updatedata ? "Update Promo" : "Save Promo"}
                      </span>
                    </button>
                  )}
                  <button
                    type="submit"
                    className="flex text-white bg-[#1F4B7F] px-[2vw] gap-[0.5vw] py-[0.5vw] rounded-[0.7vw] items-center justify-center"
                    // onClick={() => setBgImage(true)}
                  >
                    Next
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-[1vw] pt-[1vw]">
                <div className="col-span-1">
                  <label className="text-[#1F4B7F] text-[1.1vw] font-semibold">
                    Operator Detail
                  </label>

                  {userType !== "PRODUCTOWNER" ? (
                    <Field
                      type="text"
                      name="operator_details"
                      placeholder="Operator Name"
                      value={userName}
                      className=" cursor-not-allowed border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] 
               text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                    />
                  ) : (
                    <Field
                      as="select"
                      id="operator_details"
                      name="operator_details"
                      value={values.operator_details}
                      onChange={(e) => {
                        handleChange(e);
                        const selectedOperator = getOperatorName?.find(
                          (operatorName) =>
                            operatorName?.owner_name === e.target.value
                        );
                        localStorage.setItem(
                          "operator_details",
                          e.target.value
                        );
                      }}
                      className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                    >
                      <option value="">Select Role</option>
                      {getOperatorName?.map((operatorName) => (
                        <option
                          key={operatorName?.tbs_operator_id}
                          value={operatorName?.owner_name}
                        >
                          {operatorName?.owner_name}
                        </option>
                      ))}
                    </Field>
                  )}
                  <ErrorMessage
                    name="operator_details"
                    component="div"
                    className="text-red-500 text-[0.8vw]"
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-[#1F4B7F] text-[1.1vw] font-semibold">
                    Promo Name
                    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                      *
                    </span>
                  </label>
                  <Field
                    type="text"
                    name="promotion_name"
                    id="promo_name"
                    placeholder="Promotion Name"
                    value={values.promotion_name}
                    onChange={(e) => {
                      handleChange(e);
                      localStorage.setItem("promotion_name", e.target.value);
                      // setCurrentPromodata({
                      //   ...currentPromodata,
                      //   promo_name: e.target.value,
                      // });
                    }}
                    className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                  />
                  <ErrorMessage
                    name="promotion_name"
                    component="div"
                    className="text-red-500 text-[0.8vw]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-[1vw] pt-[1vw]">
                <div className="col-span-1 flex-col flex">
                  <label className="text-[#1F4B7F] text-[1.1vw] font-semibold">
                    Start Date
                  </label>
                  <Field
                    type="date"
                    name="start_date"
                    placeholder="Start Date"
                    value={values.start_date}
                    onChange={(e) => {
                      handleChange(e);
                      localStorage.setItem("start_date", e.target.value);
                      // setCurrentPromodata({
                      //   ...currentPromodata,
                      //   start_date: e.target.value,
                      // });
                    }}
                    className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
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
                  </label>
                  <Field
                    type="date"
                    name="expiry_date"
                    placeholder="Expiry Date"
                    value={values.expiry_date}
                    onChange={(e) => {
                      handleChange(e);
                      localStorage.setItem("expiry_date", e.target.value);
                      // setCurrentPromodata({
                      //   ...currentPromodata,
                      //   expiry_date: e.target.value,
                      // });
                    }}
                    className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
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
                    Usage
                  </label>
                  <Field
                    type="text"
                    name="usage"
                    placeholder="Select Usage Count"
                    value={values.usage}
                    onChange={(e) => {
                      handleChange(e);
                      localStorage.setItem("usage", e.target.value);
                      // setCurrentPromodata({
                      //   ...currentPromodata,
                      //   usage: e.target.value,
                      // });
                    }}
                    className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
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
                    <option label="Select Status" value="" className="" />
                    <option label="Draft" value="Draft" className="" />
                    <option label="Requested" value="Requested" className="" />
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
                    Promo Description
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
                      // setCurrentPromodata({
                      //   ...currentPromodata,
                      //   promo_description: e.target.value,
                      // });
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
                <div className="col-span-1 flex flex-col">
                  <label className="text-[#1F4B7F] text-[1.1vw] font-semibold">
                    Promo Image
                    <span className="text-red-500 text-[1vw] pl-[0.2vw]">
                      *
                    </span>
                  </label>
                  <Field name="file">
                    {() => (
                      <>
                        <Dragger
                          height={"7.2vw"}
                          beforeUpload={(file) => {
                            console.log(file, "filefilefilefile");
                            setFieldValue("file", file);
                            setFileName(file.name); // Set the file name
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
                              backgroundImage: `url(${
                                promodata.promo_image
                                  ? `http://192.168.90.47:4000${promodata.promo_image}`
                                  : `http://192.168.90.47:4000${fileName.promo_image}`
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
                  </Field>
                  <ErrorMessage
                    name="file"
                    component="div"
                    className="text-red-500 text-[0.8vw]"
                  />
                </div>
                {/* <div className="col-span-1 flex flex-col">
                <button
                  className="flex bg-[#1F4B7F] px-[1vw] gap-[0.5vw] py-[0.5vw] rounded-[0.7vw] text-white items-center justify-center"
                  type="button"
                  onClick={openImageModal}
                >
                  Backgorund Image
                </button>
              </div> */}
              </div>
            </Form>
          </>
        )}
      </Formik>
      <ModalPopup
        show={bgimage}
        onClose={closemodal}
        height="25vw"
        width="40vw"
        closeicon={false}
      >
        <Background_View
          setCurrentPromo={setCurrentPromo}
          currentPromo={currentPromo}
          currentPromodata={currentPromodata}
          previewUrl={previewUrl}
          setPromolist={setPromolist}
          promolist={promolist}
          setBgImage={setBgImage}
          setModalIsOpen={setModalIsOpen}
          updatedata={updatedata}
          promotionId={promotionId}
        />
      </ModalPopup>
    </>
  );
}
