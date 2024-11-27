import { ConfigProvider, DatePicker, Select, Upload } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { LiaSave } from "react-icons/lia";
import * as Yup from "yup";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { PROMOTION_DATA, GET_OPERATOR_NAME } from "../../Store/Type";
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
import { FaBus, FaUpload } from "react-icons/fa";
import Background_View from "./Background_View";
import { IoMdArrowDropdown } from "react-icons/io";

const validationSchema = Yup.object().shape({
  promotion_name: Yup.string()
    .required("Promotion Title is required")
    .max(17, "Max 17 characters only"),
  promotion_description: Yup.string()
    .required("Promotion Description is required")
    .max(43, "Max 57 characters only"),
  usage: Yup.string()
    .required("Enter Usage Value")
    .min(1, "usage must be at least 1")
    .max(100, "usage cannot exceed 100")
    .matches(/^[0-9]+$/, "Only numbers are allowed"),
  promo_code: Yup.string()
    .required("Enter Promo Code")
    .min(5, "Promo Code must be at least 5 digit")
    .max(100, "Promo code cannot exceed 20")
    .matches(/^[a-zA-Z0-9]+$/, "Only alphabets and numbers are allowed"),
  status: Yup.string().required("This field is required"),
  file: Yup.mixed()
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
  start_date: Yup.date().required("Start Date is required"),
  // .min(new Date(), 'Start Date cannot be in the past'),
  expiry_date: Yup.date()
    .required("Expiry Date is required")
    .min(Yup.ref("start_date"), "Expiry Date must be after Start Date"),
});

export default function AddPromotion({
  setModalIsOpen,
  updatedata,
  SetUpdateData,
  setPromoData,
  promodata,
  promotionId,
  setPromotionId,
  values,
  handleChange,
  setFieldValue,
}) {
  const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;
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
  const [draggerImage, setDraggerImage] = useState(false);

  console.log(promodata, "binaryDatabinaryData");

  const [promolist, setPromolist] = useState({
    background_image: "",
  });

  const [currentPromodata, setCurrentPromodata] = useState("");
  console.log(currentPromo, "current_promo");
  const openImageModal = () => {
    isImageModalOpen(true);
  };

  const closemodal = () => {
    setBgImage(false);
    setCurrentPromo("");
    setPromotionId(null);
    // sessionStorage.removeItem("promotion_logo")
  };

  useEffect(() => {
    GetPromotionData(dispatch);
    GetOperatorName(dispatch);
    console.log(getOperatorName, "getOperatorName");
  }, []);
  const [error, setError] = useState("");

  useEffect(() => {
    // const userNameFromSessionStorage = sessionStorage.getItem("user_name");
    const userNameFromSessionStorage = sessionStorage.getItem("user_name");
    // const UserType = sessionStorage.getItem("type_id");
    const UserType = sessionStorage.getItem("type_id");
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
    if (updatedata) {
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

  // const type_Id = sessionStorage.getItem("type_id");
  const type_Id = sessionStorage.getItem("type_id");

  const GetStatusOpt = () => {
    if (type_Id == "PRO101") {
      return [
        { label: "Draft", value: "Draft" },
        { label: "Active", value: "Active" },
      ];
    } else if (type_Id == "EMP101") {
      return [
        { label: "Draft", value: "Draft" },
        { label: "Posted", value: "Posted" },
      ];
    } else {
      return [{ label: "Select Status", value: "" }];
    }
  };

  const options = GetStatusOpt();

  const [minExpiryDate, setMinExpiryDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const { RangePicker } = DatePicker;
  console.log(currentPromodata, "currentPromodata");
  console.log(draggerImage, "draggerImagedraggerImage");

  return (
    <>
      {/* <Formik
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
          promo_value: promodata ? promodata.promo_value : "",
          promo_code: promodata ? promodata.promo_code : "",
        }}
        // validationSchema={validationSchema}
        context={{ isEdit: true }}
        onSubmit={(values) => {
          // dispatch({
          //   type: PROMOTION_DATA,
          //   payload: values,
          // });
          console.log(values, "isValidisValidisValid");

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
            <Form onSubmit={handleSubmit}> */}
      {/* <div className="flex justify-between mr-[3vw]">
                <div className="text-[1.4vw] text-[#1F4B7F] font-semibold">
                  {promotionId ? "UPDATE PROMOTION" : "CREATE NEW PROMOTION"}
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
                    className="flex text-white text-[1vw] bg-[#1F4B7F] px-[2vw] gap-[0.5vw] py-[0.5vw] rounded-[0.7vw] items-center justify-center"
                    onClick={() => setBgImage(true)}
                  >
                    Next
                  </button>
                </div>
              </div> */}
      <div className="grid grid-cols-2 gap-[1.5vw] pt-[1.2vw]">
        <div className="col-span-1 flex-col flex relative">
          <label className="text-[#1F4B7F] text-[1.1vw] font-semibold ">
            Operator Detail
            <span className="text-[1vw] text-red-600 pl-[0.25vw]">*</span>
          </label>
          {userType.startsWith("PRO") ? (
            // <Field
            //   as="select"
            //   id="operator_details"
            //   name="operator_details"
            //   value={values.operator_details}
            //   onChange={(e) => {
            //     handleChange(e);
            //     const selectedOperator = getOperatorName?.find(
            //       (operatorName) =>
            //         operatorName?.company_name === e.target.value
            //     );
            //     sessionStorage.setItem(
            //       "operator_details",
            //       e.target.value
            //     );
            //   }}
            //   className="border-r-[0.25vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.05vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
            // >
            //   <option value="">Select Role</option>
            //   {getOperatorName?.map((operatorName) => (
            //     <option
            //       key={operatorName?.tbs_operator_id}
            //       // value={operatorName?.owner_name}
            //       value={operatorName?.company_name}
            //       className="flex"
            //     >
            //       <span>{operatorName?.company_name}</span>
            //       <span>
            //         <FaBus color="#1F487C" size={"1vw"}/>
            //       </span>
            //     </option>
            //   ))}
            // </Field>

            <ConfigProvider
              theme={{
                components: {
                  Select: {
                    optionActiveBg: "#aebed1",
                    optionSelectedColor: "#FFF",
                    optionSelectedBg: "#aebed1",
                    optionHeight: "2",
                  },
                },
              }}
            >
              <Select
                showSearch
                className="custom-select bg-white outline-none w-full mt-[0.2vw] h-[3vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-[0.5vw] border-r-[0.2vw] border-b-[0.2vw] placeholder-[#1F487C]"
                placeholder="Select Role"
                optionFilterProp="label"
                value={values.operator_details} // Update this line to reflect the current selection
                onChange={(value, option) => {
                  const selectedOperator = getOperatorName?.find(
                    (operator) => operator.company_name === value
                  );
                  // setOfferlist({
                  //   ...offerlist,
                  //   occupation: value,
                  //   occupation_name: option.label,
                  // });
                  setError("");
                  setFieldValue("operator_details", value);
                }}
                suffixIcon={
                  <span style={{ fontSize: "1vw", color: "#1f487c" }}>
                    <IoMdArrowDropdown size="2vw" />
                  </span>
                }
                style={{
                  padding: 4,
                }}
                options={[
                  {
                    value: "",
                    label: (
                      <div className="text-[1vw] font-semibold px-[0.2vw] pb-[0.1vw] text-[#a9a9a9]">
                        Select Role
                      </div>
                    ),
                    disabled: true,
                  },
                  ...getOperatorName?.map((operatorName) => ({
                    value: operatorName.company_name,
                    label: (
                      <div className="flex items-center text-[1vw] gap-x-[0.5vw] font-semibold px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                        {/* <span className="">
                                  <FaBus color="#1F487C" size="1vw" />
                                </span> */}
                        <span className="text-[1vw]">
                          {operatorName.company_name}
                        </span>
                      </div>
                    ),
                  })),
                ]}
              />
            </ConfigProvider>
          ) : (
            <Field
              type="text"
              name="operator_details"
              placeholder="Operator Name"
              value={userName}
              className=" cursor-not-allowed border-r-[0.25vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] 
             text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw] "
            />
          )}
          <ErrorMessage
            name="operator_details"
            component="div"
            className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
          />
        </div>
        <div className="col-span-1 flex-col flex relative">
          <label className="text-[#1F4B7F] text-[1.1vw] font-bold relative ">
            Promo Title
            <span className="text-[1vw] text-red-600 pl-[0.25vw]">*</span>
          </label>
          <Field
            type="text"
            name="promotion_name"
            id="promo_name"
            placeholder="Promotion Title"
            value={values.promotion_name}
            onChange={(e) => {
              handleChange(e);
              // setCurrentPromodata({
              //   ...currentPromodata,
              //   promo_name: e.target.value,
              // });
            }}
            className="border-r-[0.25vw] mt-[0.2vw] border-l-[0.05vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
          />
          <ErrorMessage
            name="promotion_name"
            component="div"
            className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-[1.5vw] pt-[1.2vw]">
        {/* <div className="col-span-1 flex-col flex">
                  <label className="text-[#1F4B7F] text-[1.1vw] ">
                    Start Date
                    <span className="text-[1vw] text-red-600 pl-[0.25vw]">
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
                      setCurrentPromodata({
                        ...currentPromodata,
                        start_date: selectedStartDate,
                      });

                      // Update the minimum expiry date
                      setMinExpiryDate(selectedStartDate);
                    }}
                    className="border-r-[0.25vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                  />
                  <ErrorMessage
                    name="start_date"
                    component="div"
                    className="text-red-500 text-[0.8vw]"
                  />
                </div> */}
        <div className="col-span-1 flex-col flex relative">
          <label className="text-[#1F4B7F] text-[1.1vw] font-semibold">
            Duration
            <span className="text-[1vw] text-red-600 pl-[0.2vw]">*</span>
          </label>
          <Field name="date_range">
            {({ field }) => (
              <ConfigProvider
                theme={{
                  token: {
                    fontSize: 13,
                    lineHeight: 0,
                  },
                  components: {
                    DatePicker: {
                      cellWidth: 25,
                      cellHeight: "1.2vw",
                    },
                  },
                }}
              >
                <RangePicker
                  allowClear={true}
                  autoFocus={false}
                  format={"DD MMM, YYYY"}
                  onChange={(dates) => {
                    const [startDate, endDate] = dates || [null, null];
                    // setFieldValue(
                    //   "start_date",
                    //   startDate ? startDate.format("YYYY-MM-DD") : ""
                    // );
                    // setCurrentPromodata({
                    //   ...currentPromodata,
                    //   start_date: startDate,

                    // });
                    setFieldValue(
                      "start_date",
                      startDate ? startDate.format("YYYY-MM-DD") : ""
                    );
                    setFieldValue(
                      "expiry_date",
                      endDate ? endDate.format("YYYY-MM-DD") : ""
                    );
                  }}
                  value={[
                    values.start_date ? dayjs(values.start_date) : null,
                    values.expiry_date ? dayjs(values.expiry_date) : null,
                  ]}
                  className="ads-date border-r-[0.25vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-blue border-[#1F487C]
text-[#1F487C] text-[0.8vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw] placeholder-[#1F487C]"
                  disabledDate={(current) => current < dayjs().startOf("day")}
                />
              </ConfigProvider>
            )}
          </Field>
          <ErrorMessage
            name="start_date"
            component="div"
            className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
          />
          <ErrorMessage
            name="expiry_date"
            component="div"
            className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw] left-[7vw]"
          />
        </div>
        {/* <div className="col-span-1 flex flex-col">
                  <label className="text-[#1F4B7F] text-[1.1vw] ">
                    Expiry Date
                    <span className="text-[1vw] text-red-600 pl-[0.25vw]">
                      *
                    </span>
                  </label>
                  <Field
                    type="date"
                    name="expiry_date"
                    placeholder="Expiry Date"
                    value={values.expiry_date}
                    min={minExpiryDate} // Set the minimum date here
                    // min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => {
                      handleChange(e);
                      sessionStorage.setItem("expiry_date", e.target.value);
                      // setCurrentPromodata({
                      //   ...currentPromodata,
                      //   expiry_date: e.target.value,
                      // });
                    }}
                    className="border-r-[0.25vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                  />
                  <ErrorMessage
                    name="expiry_date"
                    component="div"
                    className="text-red-500 text-[0.8vw]"
                  />
                </div> */}
        <div className="col-span-1 flex-col flex">
          <label className="text-[#1F4B7F] text-[1.1vw] font-bold ">
            Promo Value
            <span className="text-[1vw] text-red-600 pl-[0.25vw]">*</span>
            <span className="text-[#909193] text-[0.8vw] pl-[0.25vw]">
              {`(Discount price from ticket)`}
            </span>
          </label>
          <Field
            type="text"
            name="promo_value"
            id="promo_value"
            placeholder="Enter Promo Value"
            value={values.promo_value}
            onChange={(e) => {
              handleChange(e);
              // sessionStorage.setItem("promo_value", e.target.value);
              // setCurrentPromodata({
              //   ...currentPromodata,
              //   promo_name: e.target.value,
              // });
            }}
            className="border-r-[0.25vw] mt-[0.2vw] border-l-[0.05vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
          />
          <ErrorMessage
            name="promo_value"
            component="div"
            className="text-red-500 text-[0.8vw]"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-[1.5vw] pt-[1.2vw]">
        <div className="col-span-1 flex-col flex relative">
          <label className="text-[#1F4B7F] text-[1.1vw] font-semibold ">
            Promo Code
            <span className="text-[1vw] text-red-600 pl-[0.25vw]">*</span>
          </label>
          <Field
            type="text"
            name="promo_code"
            placeholder="Enter Promo Code"
            value={values.promo_code}
            onChange={(e) => {
              handleChange(e);
              // sessionStorage.setItem("promo_code", e.target.value);
              // setCurrentPromodata({
              //   ...currentPromodata,
              //   usage: e.target.value,
              // });
            }}
            className="border-r-[0.25vw] mt-[0.2vw]  border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
          />
          <ErrorMessage
            name="promo_code"
            component="div"
            className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
          />
        </div>
        <div className="col-span-1 flex flex-col relative">
          <label className="text-[#1F4B7F] text-[1.1vw] font-semibold">
            Status
            <span className="text-[1vw] text-red-600 pl-[0.25vw]">*</span>
          </label>
          {/* <Field
                    as="select"
                    name="status"
                    value={values.status}
                    onChange={(e) => {
                      handleChange(e);
                      sessionStorage.setItem("status", e.target.value);
                    }}
                    className="border-r-[0.25vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                  >
                   
                    {options.map((option) => (
                      <option
                        key={option.value}
                        label={option.label}
                        value={option.value}
                      />
                    ))}
                  </Field> */}
          <ConfigProvider
            theme={{
              components: {
                Select: {
                  optionActiveBg: "#aebed1",
                  optionSelectedColor: "#FFF",
                  optionSelectedBg: "#aebed1",
                  optionHeight: "2",
                },
              },
            }}
          >
            <Select
              showSearch
              className="custom-select bg-white outline-none w-full mt-[0.2vw] h-[3vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-[0.5vw] border-r-[0.2vw] border-b-[0.2vw] placeholder-[#1F487C]"
              placeholder="Select Status"
              optionFilterProp="label"
              value={values.status} // Update this line to reflect the current selection
              onChange={(value, option) => {
                // const selectedOperator = getOperatorName?.find(
                //   (operator) => operator.company_name === value
                // );
                // // setOfferlist({
                // //   ...offerlist,
                // //   occupation: value,
                // //   occupation_name: option.label,
                // // });
                setError("");
                setFieldValue("status", value);
              }}
              suffixIcon={
                <span style={{ fontSize: "1vw", color: "#1f487c" }}>
                  <IoMdArrowDropdown size="2vw" />
                </span>
              }
              style={{
                padding: 4,
              }}
              options={[
                {
                  value: "",
                  label: (
                    <div className="text-[1vw] font-semibold px-[0.2vw] pb-[0.1vw] text-[#a9a9a9]">
                      Select Status
                    </div>
                  ),
                  disabled: true,
                },
                ...options?.map((item) => ({
                  value: item.value,
                  label: (
                    <div className="flex items-center text-[1vw] gap-x-[0.5vw] font-semibold px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                      {/* <span className="">
                                  <FaBus color="#1F487C" size="1vw" />
                                </span> */}
                      <span className="text-[1vw]">{item.label}</span>
                    </div>
                  ),
                })),
              ]}
            />
          </ConfigProvider>
          <ErrorMessage
            name="status"
            component="div"
            className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-[1.5vw] pt-[1.2vw]">
        <div className="col-span-1 flex-col flex relative">
          <label className="text-[#1F4B7F] text-[1.1vw] font-semibold">
            Promo Description
            <span className="text-red-500 text-[1vw] pl-[0.25vw]">*</span>
          </label>
          <Field
            as="textarea"
            name="promotion_description"
            placeholder="Enter Description"
            value={values.promotion_description}
            onChange={(e) => {
              handleChange(e);
              // sessionStorage.setItem("promotion_description", e.target.value);
            }}
            rows="5"
            cols="50"
            style={{ resize: "none" }}
            className="border-r-[0.25vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] w-[100%] h-[7.5vw] rounded-[0.5vw] outline-none px-[1vw]"
          />

          <ErrorMessage
            name="promotion_description"
            component="div"
            className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
          />
        </div>
        <div className="col-span-1 flex flex-col relative">
          <label className="text-[#1F4B7F] text-[1.1vw] font-semibold ">
            Promo Image
            <span className="text-red-500 text-[1vw] pl-[0.25vw]">*</span>
          </label>
          <Field name="file">
            {() => (
              <>
                <Dragger
                  height={"7.2vw"}
                  onChange={() => {
                    setDraggerImage(true);
                    sessionStorage.setItem("upload", true);
                  }}
                  beforeUpload={(file) => {
                    const tempUrl = URL.createObjectURL(file); // Create temporary URL for the image
                    setPreviewUrl(tempUrl); // Set the preview URL for the background image
                    console.log("File URL:", tempUrl);
                    sessionStorage.setItem("promotion_logo", tempUrl);
                    console.log(file,"currectimagefile");
                    
                    setFieldValue("file", file);
                    setFileName(file.name);
                    setFieldValue("file_type", file.type);
                    setFieldValue("file_size", file.size);

                    // const reader = new FileReader();
                    // reader.onloadend = () => {
                    //   setPreviewUrl(reader.result); // Set the preview URL as a DataURL (base64)
                    // };
                    // reader.readAsDataURL(file);

                    return false; // Prevent automatic upload
                  }}
                  showUploadList={false}
                  className="custom-dragger mt-[0.2vw] relative"
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
                        sessionStorage.getItem("upload")
                          ? sessionStorage.getItem("promotion_logo")
                          : `${apiImgUrl}${promodata.promo_image}`
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      opacity: "30%",
                      zIndex: 0,
                    }}
                  ></div>
                </Dragger>
              </>
            )}
          </Field>
          {fileName ? (
            <p className="text-[#1F4B7F] text-[0.8vw] mt-2">{fileName}</p>
          ) : (
            <ErrorMessage
              name="file"
              component="div"
              className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
            />
          )}
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
      {/* </Form>
          </>
        )}
      </Formik> */}
      <ModalPopup
        show={bgimage}
        onClose={closemodal}
        height="25vw"
        width="45vw"
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
          promodata={promodata}
          draggerImage={draggerImage}
        />
      </ModalPopup>
    </>
  );
}


