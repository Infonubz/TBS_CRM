import { Progress, Spin, Upload } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  GetOperatorById,
  GetOperatorProfile,
  SubmitAddressData,
  SubmitCompanyData,
  validateEmail,
  validateMobile,
} from "../../../Api/UserManagement/SuperAdmin";
import axios from "axios";
import { useDispatch } from "react-redux";
import umbuslogo from "../../../asserts/umbuslogo.png";
import { FaUpload } from "react-icons/fa";
import ImageCropper from "./ImageCropper";

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be a number")
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number maximum 10 digits only")
    .required("Phone Number is required"),
  emailid: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address format"
    )
    .required("Email is required"),
  // alt_phone: Yup.string()
  //   .matches(/^[0-9]+$/, "Alternative Phone number must be a number")
  //   .min(10, "Alternative Phone number must be at least 10 digits")
  //   .max(10, "Alternative Phone number maximum 10 digits only")
  //   .required("Alternative Phone Number is required"),
  // alt_emailid: Yup.string()
  //   .matches(
  //     /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  //     "Invalid email address format"
  //   )
  //   .required("Alternative Email is required"),
  companyname: Yup.string()
    // .matches(
    //   /^[a-zA-Z]+[0-9]+$/,
    //   "Company name must contain letters and numbers only"
    // )
    .min(3, "At least 3 characters long")
    .max(30, "Maximum 30 characters only")
    .required("Company Name is required")
    .matches(
      /^[A-Za-z\s]+$/,
      "Only letters and spaces are allowed"),
   
  ownername: Yup.string()
    .required("Owner Name is required")
    .min(3, "At least 3 characters long")
    .max(30, "Maximum 30 characters only")
    .matches(
      /^[A-Za-z\s]+$/,
      "Only letters and spaces are allowed"),
  password: Yup.string(),
  aadhar: Yup.string()
    .matches(/^[0-9]{12}$/, "Aadhar number must be exactly 12 digits")
    .required("Aadhar Number is required")
    .max(12, "Aadhar number must be exactly 12 digits"),
  pan: Yup.string()
    .matches(
      /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      "PAN number format must be: ABCDE1234F"
    )
    .required("Pan Number is required"),
  // profileimg: Yup.mixed()
  //   .required("File is empty")
  //   .test("required", "A file is required", function (value) {
  //     const { isEdit } = this.options.context;
  //     if (!isEdit && !value) {
  //       return false;
  //     }
  //     return true;
  //   })
  //   .test("file_size", "File size is too large", function (value) {
  //     if (value && value.size > 2000000) {
  //       // 2MB
  //       return false;
  //     }
  //     return true;
  //   })
  //   .test("file_type", "Unsupported File Format", function (value) {
  //     if (typeof value === "string") {
  //       // If value is a string (file path), skip file type validation
  //       return true;
  //     }
  //     if (
  //       value &&
  //       ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
  //     ) {
  //       return true;
  //     }
  //     return false;
  //   }),
});
export default function AddSuperAdmin({
  setCurrentpage,
  SetSPA_ID,
  SPA_ID,
  superadmindata,
  operatorID,
  setOperatorID,
  addressback,
  operator_id,
  setOperator_Id,
  fileList,
  profileImage,
  setProfileImage,
  updatedata,
  setEnableUpload,
  selectedFile,
  enableUpload,
}) {
  const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;
  const dispatch = useDispatch();
  const [spinning, setSpinning] = useState(false);
  const [reset,setReset] = useState(false)
  const [superadmincompanydata, setsuperadmincompanydata] = useState({
    company_name: "",
    owner_name: "",
    phone: "",
    alternate_phone: "",
    emailid: "",
    alternate_emailid: "",
    aadharcard_number: "",
    pancard_number: "",
    profileimg: "",
  });

  const handleSubmit = async (values, setFieldError) => {
    console.log(
      superadmincompanydata.phone === values.phone ||
        superadmincompanydata.emailid === values.emailid,
      "phonevalidation"
    );

    if (
      superadmincompanydata.phone === values.phone &&
      superadmincompanydata.emailid === values.emailid
    ) {
      if (
        (operatorID && enable == false && addressback == true) ||
        (updatedata && enable == false)
      ) {
        setCurrentpage(2);
      } else {
        try {
          const data = await SubmitCompanyData(
            values,
            operatorID,
            enable,
            dispatch,
            fileList,
            setOperatorID
          );
          toast.success(data?.message);
          setCurrentpage(2);
          setOperator_Id(data?.id);
          GetOperatorProfile(operatorID, dispatch);
          console.log("Current page set to 2");
        } catch (error) {
          console.error("Error uploading data", error);
        }
      }
      // setsuperadmincompanydata({
      //   company_name: values.companyname,
      //   owner_name: values.ownername,
      //   phone: values.phone,
      //   alternate_phone: values.phone,
      //   emailid: values.emailid,
      //   alternate_emailid: values.emailid,
      //   aadharcard_number: values.aadhar,
      //   pancard_number: values.pan,
      //   profileimg: values.profileimg,
      // });
      setEnableUpload(true);
    } 
    else if (superadmincompanydata.emailid === values.emailid) {
      const mobileResponce = await validateMobile(values.phone, "operator");
      if (mobileResponce) {
        setFieldError("phone", "Phone no is already exist");
      } else {
        if (
          (operatorID && enable == false && addressback == true) ||
          (updatedata && enable == false)
        ) {
          setCurrentpage(2);
        } else {
          try {
            const data = await SubmitCompanyData(
              values,
              operatorID,
              enable,
              dispatch,
              fileList,
              setOperatorID
            );
            toast.success(data?.message);
            setCurrentpage(2);
            setOperator_Id(data?.id);
            GetOperatorProfile(operatorID, dispatch);
            console.log("Current page set to 2");
          } catch (error) {
            console.error("Error uploading data", error);
          }
        }
        setEnableUpload(true);
      }
    } else if (superadmincompanydata.phone === values.phone) {
      const emailResponce = await validateEmail(values.emailid, "operator");
      if (emailResponce) {
        setFieldError("emailid", "Email id is already exist");
      } else {
        if (
          (operatorID && enable == false && addressback == true) ||
          (updatedata && enable == false)
        ) {
          setCurrentpage(2);
        } else {
          try {
            const data = await SubmitCompanyData(
              values,
              operatorID,
              enable,
              dispatch,
              fileList,
              setOperatorID
            );
            toast.success(data?.message);
            setCurrentpage(2);
            setOperator_Id(data?.id);
            GetOperatorProfile(operatorID, dispatch);
            console.log("Current page set to 2");
          } catch (error) {
            console.error("Error uploading data", error);
          }
        }
        setEnableUpload(true);
      }
    } else {
      const mobileResponce = await validateMobile(values.phone, "operator");
      const emailResponce = await validateEmail(values.emailid, "operator");
      if (mobileResponce == true || emailResponce == true) {
        if (mobileResponce) {
          setFieldError("phone", "Phone no is already exist");
        } else if (emailResponce) {
          setFieldError("emailid", "Email id is already exist");
        }
      } else {
        console.log(values, "hiiiiiiiiii");
        if (
          (operatorID && enable == false && addressback == true) ||
          (updatedata && enable == false)
        ) {
          setCurrentpage(2);
        } else {
          try {
            const data = await SubmitCompanyData(
              values,
              operatorID,
              enable,
              dispatch,
              fileList,
              setOperatorID
            );
            toast.success(data?.message);
            setCurrentpage(2);
            setOperator_Id(data?.id);
            GetOperatorProfile(operatorID, dispatch);
            console.log("Current page set to 2");
          } catch (error) {
            console.error("Error uploading data", error);
          }
        }
        setEnableUpload(true);
      }
    }
  };

  // const handleEmailBlur = async (e, setFieldError, setFieldValue, validateField, setFieldTouched) => {
  //   const { value,name } = e.target;
  //   await setFieldTouched(name, true);
  //   await validateField(name);
  //   console.log("i am here",value);
  //   try{
  //     const response = await validateEmail(value)
  //     console.log(response.exists,"llllllllaaaaaaaaaalalala");
  //     if (response.exists) {
  //           console.log("heloo");
  //           setFieldError("emailid", "Email Id already exists");
  //         }
  //         else {
  //           // You can set the error to null if the phone number is valid
  //           // setFieldError("phone", "");
  //         }
  //   }
  //   catch(err){
  //     setFieldError("emailid", "Error checking mobile number");
  //   }

  // }

  // const handleBlur = async (e, setFieldError, setFieldValue, validateField, setFieldTouched) => {

  //   const { value,name } = e.target;
  //   await setFieldTouched(name, true);
  //   await validateField(name);
  //   console.log("i am here",value);
  //   try{
  //     const response = await validateMobile(value)
  //     // console.log(response.exists,"llllllllaaaaaaaaaalalala");
  //     if (response.exists) {
  //           console.log("heloo");
  //           setFieldError("phone", "Mobile number already exists");
  //         }
  //         else {
  //           // You can set the error to null if the phone number is valid
  //           // setFieldError("phone", "");
  //         }
  //   }
  //   catch(err){
  //     setFieldError("phone", "Error checking mobile number");
  //   }

  //   // try {
  //   //   const response = await axios.post(
  //   //     `${apiImgUrl}/operator_validation`,
  //   //     { phone: value }
  //   //   );
  //   //   console.log(response.data.Phone, "ggggg");
  //   //   if (response.data.Phone) {
  //   //     console.log("heloo");
  //   //     setFieldError("phone", "Mobile number already exists");
  //   //   }
  //   // } catch (error) {
  //   //   console.error("Error checking mobile number", error);
  //   //   setFieldError("phone", "Errorchecking  mobile number");
  //   // }
  // };

  const { Dragger } = Upload;
  // const [profileImage, setProfileImage] = useState("");
  console.log(profileImage, "super_admin_company_data");

  const [previewUrl, setPreviewUrl] = useState("");
  const [draggerImage, setDraggerImage] = useState(false);

  const [enable, setEnable] = useState(false);
  const fetchGetUser = async () => {
    try {
      const data = await GetOperatorById(
        operatorID,
        setOperatorID,
        setsuperadmincompanydata,
        dispatch,
        setSpinning
      );
      setsuperadmincompanydata(data[0]);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  useEffect(() => {
    if (operatorID != null || enable || addressback) {
      setSpinning(true);
      fetchGetUser();
    }
  }, [
    operatorID,
    setOperatorID,
    setsuperadmincompanydata,
    // enable,
    addressback,
  ]);

  const handleImageCrop = (croppedImage) => {
    setsuperadmincompanydata((prevState) => ({
      ...prevState,
      profileimg: croppedImage,
    }));
  };

  return (
    <div>
      <div className="border-l-[0.1vw] px-[2vw] border-t-[0.1vw] mt-[1vw] border-b-[0.3vw] border-r-[0.1vw] rounded-[1vw] border-[#1f4b7f] relative">
        <div className="w-[5vw] h-[5vw] bg-white shadow-lg rounded-full absolute left-[16.6vw] top-[-2.5vw] flex justify-center items-center">
          <img className="" src={umbuslogo} alt="buslogo" />
        </div>
        <div className="h-[4vw] w-full flex items-center justify-between ">
          <label className="text-[1.5vw] font-semibold text-[#1f4b7f] ">
            Company Profile
          </label>
          {/* <button className="rounded-full font-semibold w-[6vw] h-[2vw] flex items-center justify-center border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.1vw] border-[#34AE2A] text-[1.1vw] text-[#34AE2A] ">
            Save
          </button> */}
          {operatorID || addressback ? (
            <button
              className={`${
                enable
                  ? "bg-[#1f4b7f] text-white"
                  : "text-[#1f4b7f] bg-white border-[#1f4b7f]"
              } rounded-full font-semibold w-[10vw] h-[2vw] flex items-center justify-center border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.1vw] text-[1.1vw] `}
              onClick={() => {
                setEnable(!enable);
                setEnableUpload(!enableUpload);
              }}
            >
              Enable to Edit
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="pb-[1vw] ">
          <div className="border-b-[0.1vw] w-full border-[#1f4b7f] "></div>
        </div>
        <div>
          <Formik
            initialValues={{
              companyname:reset ? "" : superadmincompanydata?.company_name || "",
              ownername: reset ? "" : superadmincompanydata?.owner_name || "",
              phone: reset ? "" : superadmincompanydata?.phone || "",
              emailid: reset ? "" : superadmincompanydata?.emailid || "",
              // alt_phone: "",
              // alt_emailid: "",
              aadhar: reset ? "" : superadmincompanydata?.aadharcard_number || "",
              pan: reset ? "" : superadmincompanydata?.pancard_number || "",
              // pancarddoc: "",
              // aadardoc: "",
              user_status: reset ? "" : superadmincompanydata?.user_status || "",
              req_status: reset ? "" : superadmincompanydata?.req_status || "",
              // profileimg: superadmincompanydata?.profileimg || "",
            }}
            validationSchema={validationSchema}
            validateOnBlur={true}
            validateOnChange={true}
            onSubmit={async (values, { setFieldError }) => {
              console.log([superadmincompanydata]?.length, "lelelelelel");
              // const mobileResponce = await validateMobile(values.phone)
              // const emailResponce = await validateEmail(values.emailid)
              // if(mobileResponce == true || emailResponce == true)
              // {
              //   if(mobileResponce){
              //     setFieldError('phone',"Phone no is already exist")
              //   }
              //   else if(emailResponce){
              //     setFieldError("emailid","Email id is alreadu exist")
              //   }
              // }
              // else{}

              if (
                (profileImage === true && selectedFile != null) ||
                (updatedata && selectedFile != null)
              ) {
                handleSubmit(values, setFieldError);
              }
            }}
            enableReinitialize
          >
            {({
              isSubmitting,
              isValid,
              setFieldValue,
              handleSubmit,
              values,
              handleChange,
              setFieldError,
              errors,
              touched,
              resetForm,
              validateField,
              setFieldTouched,
            }) => (
              <Form onSubmit={handleSubmit}>
                {spinning ? (
                  <div className=" flex justify-center h-[22.8vw] items-center">
                    <Spin size="large" />
                  </div>
                ) : (
                  <div className="gap-y-[1.5vw] flex-col flex">
                    <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                      <div className="col-span-1 relative">
                        <label className="text-[#1F4B7F] text-[1.1vw] ">
                          Company Name
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="companyname"
                          style={{ display: "none" }}
                        />
                        <Field
                          type="text"
                          name="companyname"
                          placeholder="Enter Company Name"
                          // value={values.firstname}
                          autoComplete="companyname-field"
                          // autoComplete="off"
                          disabled={
                            operatorID || addressback
                              ? enable
                                ? false
                                : true
                              : false
                          }
                          className={`${
                            operatorID || addressback
                              ? enable == false
                                ? " cursor-not-allowed"
                                : ""
                              : ""
                          } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                        />
                        <ErrorMessage
                          name="companyname"
                          component="div"
                          className="text-red-500 text-[0.8vw] absolute left-[.2vw] bottom-[-1.2vw]"
                        />
                      </div>
                      <div className="col-span-1 relative">
                        <label className="text-[#1F4B7F] text-[1.1vw] ">
                          Owner Name
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                            *
                          </span>
                          <span className="text-[.7vw] ml-[.5vw]">
                            (As Per Aadhar)
                          </span>
                        </label>
                        {/* <input
                          type="text"
                          name="ownername"
                          style={{ display: "none" }}
                        /> */}
                        <Field
                          type="text"
                          name="ownername"
                          placeholder="Enter Owner Name"
                          // value={values.firstname}
                          // autoComplete="ownername-field"
                          autoComplete="off"
                          disabled={
                            operatorID || addressback
                              ? enable
                                ? false
                                : true
                              : false
                          }
                          className={`${
                            operatorID || addressback
                              ? enable == false
                                ? " cursor-not-allowed"
                                : ""
                              : ""
                          } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                        />
                        <ErrorMessage
                          name="ownername"
                          component="div"
                          className="text-red-500 text-[0.8vw] absolute left-[.2vw] bottom-[-1.2vw]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                      <div className="col-span-1 relative">
                        <label className="text-[#1F4B7F] text-[1.1vw] ">
                          Phone
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                            *
                          </span>
                        </label>
                        <div className="">
                          <input
                            type="text"
                            name="phone"
                            style={{ display: "none" }}
                          />
                          <Field
                            type="text"
                            name="phone"
                            id="phone"
                            autoComplete="phone-field"
                            placeholder="Enter Number"
                            // onChange={(e) => {
                            //   handleChange(e);
                            //   // handleBlur(e, setFieldError,setFieldValue)

                            // }}
                            // onChange={(e) => {
                            //   handleChange(e);
                            //   validateField('phone');  // Trigger validation on change
                            // }}
                            // onFocus={() => {
                            //   // If the phone field has an error, set the error message again on focus
                            //   if (errors.phone) {
                            //     setFieldError("phone", errors.phone);
                            //   }
                            // }}
                            // value={values.firstname}
                            // onBlur={(e) => handleBlur(e, setFieldError, setFieldValue, validateField, setFieldTouched)} // Custom onBlur handler
                            // onBlur={(e) => handleBlur(e, setFieldError)} // Custom onBlur handler
                            disabled={
                              operatorID || addressback
                                ? enable
                                  ? false
                                  : true
                                : false
                            }
                            className={`${
                              operatorID || addressback
                                ? enable == false
                                  ? " cursor-not-allowed"
                                  : ""
                                : ""
                            } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                          />
                          {/* <button className="absolute right-[0.5vw] text-[1vw] text-white w-[5vw] bg-[#1F4B7F] rounded-full h-[1.7vw]">
                          Verify
                        </button> */}
                        </div>
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="text-red-500 text-[0.8vw] absolute left-[.2vw] bottom-[-1.2vw]"
                        />
                      </div>
                      <div className="col-span-1 relative">
                        <label className="text-[#1F4B7F] text-[1.1vw] ">
                          Email ID
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="emailid"
                          style={{ display: "none" }}
                        />
                        <Field
                          type="text"
                          name="emailid"
                          autoComplete="emailid-field"
                          placeholder="Enter Email Address"
                          onChange={(e) => setFieldValue("emailid", e.target.value.toLowerCase())}
                          // value={values.firstname}
                          // onBlur={(e) => handleEmailBlur(e, setFieldError, setFieldValue, validateField, setFieldTouched)}
                          disabled={
                            operatorID || addressback
                              ? enable
                                ? false
                                : true
                              : false
                          }
                          className={`${
                            operatorID || addressback
                              ? enable == false
                                ? " cursor-not-allowed"
                                : ""
                              : ""
                          } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                        />
                        <ErrorMessage
                          name="emailid"
                          component="div"
                          className="text-red-500 text-[0.8vw] absolute left-[.2vw] bottom-[-1.2vw]"
                        />
                      </div>
                    </div>
                    {/* <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Alternate Phone
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        type="text"
                        name="alt_phone"
                        placeholder="Enter Alternate Number"
                        // value={values.firstname}
                        className="border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                      />
                      <ErrorMessage
                        name="alt_phone"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Alternate Email ID
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        type="text"
                        name="alt_emailid"
                        placeholder="Enter Alternate Email Address"
                        // value={values.firstname}
                        className="border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                      />
                      <ErrorMessage
                        name="alt_emailid"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                  </div> */}
                    <div className="grid grid-cols-2 w-full gap-x-[2vw] relative mb-[.7vw]">
                      <div className="col-span-1 relative">
                        <label className="text-[#1F4B7F] text-[1.1vw] ">
                          Aadhar Card Number
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                            *
                          </span>
                        </label>
                        <div className="flex items-center relative">
                          <input
                            type="text"
                            name="aadhar"
                            style={{ display: "none" }}
                          />
                          <Field
                            type="text"
                            name="aadhar"
                            placeholder="Enter Aadhar Number"
                            autoComplete="aadhar-field"
                            // value={values.firstname}
                            disabled={
                              operatorID || addressback
                                ? enable
                                  ? false
                                  : true
                                : false
                            }
                            className={`${
                              operatorID || addressback
                                ? enable == false
                                  ? " cursor-not-allowed"
                                  : ""
                                : ""
                            } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                          />

                          {/* <div className=" absolute right-[1vw]">
                          <FaCloudUploadAlt color="#1F487C" size={"2vw"} />
                        </div> */}
                        </div>
                        <ErrorMessage
                          name="aadhar"
                          component="div"
                          className="text-red-500 text-[0.8vw] absolute left-[.2vw] bottom-[-1.2vw]"
                        />
                      </div>
                      <div className="col-span-1 relative">
                        <label className="text-[#1F4B7F] text-[1.1vw] ">
                          Pan Card Number
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                            *
                          </span>
                        </label>
                        <div className="flex items-center relative">
                          <input
                            type="text"
                            name="pan"
                            style={{ display: "none" }}
                          />
                          <Field
                            type="text"
                            name="pan"
                            placeholder="Enter Pan Number"
                            autoComplete="pan-field"
                            onChange={(e) => setFieldValue("pan", e.target.value?.toUpperCase())}
                            // value={values.firstname}
                            disabled={
                              operatorID || addressback
                                ? enable
                                  ? false
                                  : true
                                : false
                            }
                            className={`${
                              operatorID || addressback
                                ? enable == false
                                  ? " cursor-not-allowed"
                                  : ""
                                : ""
                            } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                          />

                          {/* <div className=" absolute right-[1vw]">
                          <FaCloudUploadAlt color="#1F487C" size={"2vw"} />
                        </div> */}
                        </div>

                        <ErrorMessage
                          name="pan"
                          component="div"
                          className="text-red-500 text-[0.8vw] absolute left-[.2vw] bottom-[-1.2vw]"
                        />
                      </div>

                      {updatedata && selectedFile != null
                        ? " "
                        : profileImage === false && (
                            <div className="text-red-500 text-[.7vw] absolute  bottom-[-2.5vw]">
                              * Company Logo is required
                            </div>
                          )}
                    </div>

                    <div className="flex items-center justify-between pb-[1vw]">
                      <div>
                        <h1 className="text-[#1F4B7F] text-[0.7vw] font-semibold">
                          *You must fill in all fields to be able to continue
                        </h1>
                      </div>
                      <div className="flex items-center gap-x-[1vw]">
                      <button
                          type="button"
                          className="border-[#1F487C] w-[5vw] font-semibold text-[1vw] h-[2vw] rounded-full border-r-[0.2vw]  border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw]"
                          onClick={()=>{
                            resetForm()
                            setReset(true)
                          }}
                        >
                          Reset
                        </button>
                        <button
                          className="bg-[#1F487C] font-semibold rounded-full w-[11vw] h-[2vw] text-[1vw] text-white"
                          type="submit"
                          // onClick={() => setCurrentpage(2)}
                        >
                          {operatorID || addressback
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
      </div>
    </div>
  );
}
