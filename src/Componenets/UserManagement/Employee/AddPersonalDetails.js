import { ConfigProvider, Progress, Select, Spin, Upload, DatePicker } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState, useRef } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  GetEmpPersonalById,
  GetProductOwnerEmployee,
  submitPersonalData,
  ValidateEmployeeEmail,
  ValidateEmployeeMobile,
} from "../../../Api/UserManagement/Employee";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import umbuslogo from "../../../asserts/umbuslogo.png";
import { GetRolesData } from "../../../Api/Role&Responsibilites/ActiveRoles";
import { capitalizeFirstLetter } from "../../Common/Captilization";
import { FaUpload } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import "../../../App.css";
import usePreventDragAndDrop from "../../Hooks/usePreventDragAndDrop";

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be a number")
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number maximum 10 digits only")
    .required("Phone number is required"),
  emailid: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address format"
    )
    .required("Email is required"),
  alt_phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be a number")
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number maximum 10 digits only")
    .required("Alternate phone number is required")
    .notOneOf([Yup.ref("phone")], "Alternate phone cannot be same as phone"),
  firstname: Yup.string()
    .required("First name is required")
    .min(3, "Minimum 3 characters long")
    .max(30, "Maximum 30 characters only")
    .matches(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed"),
  lastname: Yup.string()
    .required("Last name is required")
    .min(1, "Minimum 1 characters long")
    .max(30, "Maximum 30 characters only")
    .matches(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed"),
  blood: Yup.string()
    .required("Blood group is required")
    .matches(/^(A|B|AB|O)[+-]$/, "Valid blood type (e.g., A+, B-, AB+, O-)"),
  gender: Yup.string().required("Gender is required"), // Validation schema for select field
  // dob: Yup.date().required("Date of Birth is required").nullable(),
  dob: Yup.date()
    .required("Date of birth is required")
    .nullable()
    .max(new Date(), "Date of birth cannot be in the future") // Dob cannot be in the future
    .test("age", "You must be at least 18 years old", (value) => {
      if (!value) return true; // Skip validation if the value is empty (handled by required)
      const today = new Date();
      const age = today.getFullYear() - value.getFullYear();
      const monthDiff = today.getMonth() - value.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < value.getDate())
      ) {
        return age > 18; // Ensure the person is at least 15 years old
      }
      return age >= 18; // Check age
    }),
  // profile_img: Yup.mixed()
  //   .test('fileSize', 'File size is too large', value => {
  //     // return value && value.size <= 2000000;
  //     return value && value.size <= 15728640; // 15 MB in bytes

  //   })
  //   .test('fileType', 'Unsupported file format', value => {
  //     return value && ['image/jpeg', 'image/png'].includes(value.type);
  //   }),
});
const AddPersonalDetails = ({
  setCurrentpage,
  EmployeeID,
  setEmployeeID,
  addressback,
  fileList,
  profileImage,
  setProfileImage,
  updatedata,
  setEnableUpload,
  selectedFile,
  enableUpload,
  setSelectedFile,
}) => {

  const changeDatePickerPlaceholder = () => {
    const inputDiv = document.querySelector(".ant-picker-input");
    if (inputDiv) {
      const inputElement = inputDiv.querySelector("input");
      if (inputElement) {
        inputElement.classList.add("custom-a-placeholder");
        // inputElement.className = "font-sans placeholder:font-sans"
      }
    }
    
  };
  changeDatePickerPlaceholder();

  const [enable, setEnable] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [reset, setReset] = useState(false);
  const dispatch = useDispatch();
  console.log(EmployeeID, enable, "idididi");

  const handleSubmit = async (values, setFieldError) => {
    console.log(EmployeeID, "idididi");

    if (
      emppersonaldata.phone === values.phone &&
      emppersonaldata.email_id === values.emailid
    ) {
      if (EmployeeID && enable == false) {
        setCurrentpage(2);
      } else {
        console.log("hell hwohdifghdkjfj");

        try {
          const data = await submitPersonalData(
            values,
            enable,
            EmployeeID,
            dispatch,
            fileList,
            setEmployeeID
          );
          // setModalIsOpen(false);
          toast.success(data?.message || "employee updated successfully");
          setCurrentpage(2);
          // GetOffersData(dispatch);
          console.log(data);
        } catch (error) {
          console.error("Error uploading data", error);
        }
      }
      setEnableUpload(true);
    } else if (emppersonaldata.email_id === values.emailid) {
      const mobileResponce = await ValidateEmployeeEmail(
        values.phone,
        "employee"
      );
      if (mobileResponce) {
        setFieldError("phone", "Phone no is already exist");
      } else {
        if (EmployeeID && enable == false) {
          setCurrentpage(2);
        } else {
          console.log("hell hwohdifghdkjfj");

          try {
            const data = await submitPersonalData(
              values,
              enable,
              EmployeeID,
              dispatch,
              fileList,
              setEmployeeID
            );
            // setModalIsOpen(false);
            toast.success(data?.message || "employee updated successfully");
            setCurrentpage(2);
            // GetOffersData(dispatch);
            console.log(data);
          } catch (error) {
            console.error("Error uploading data", error);
          }
        }
        setEnableUpload(true);
      }
    } else if (emppersonaldata.phone === values.phone) {
      const emailResponce = await ValidateEmployeeEmail(values.emailid);
      if (emailResponce) {
        setFieldError("emailid", "Email id is already exist");
      } else {
        if (EmployeeID && enable == false) {
          setCurrentpage(2);
        } else {
          console.log("hell hwohdifghdkjfj");

          try {
            const data = await submitPersonalData(
              values,
              enable,
              EmployeeID,
              dispatch,
              fileList,
              setEmployeeID
            );
            // setModalIsOpen(false);
            toast.success(data?.message || "employee updated successfully");
            setCurrentpage(2);
            // GetOffersData(dispatch);
            console.log(data);
          } catch (error) {
            console.error("Error uploading data", error);
          }
        }
        setEnableUpload(true);
      }
    } else {
      const mobileResponce = await ValidateEmployeeMobile(values.phone);
      const emailResponce = await ValidateEmployeeEmail(values.emailid);
      if (mobileResponce == true || emailResponce == true) {
        if (mobileResponce) {
          setFieldError("phone", "Phone no is already exist");
        } else if (emailResponce) {
          setFieldError("emailid", "Email id is already exist");
        }
      } else {
        if (EmployeeID && enable == false) {
          setCurrentpage(2);
        } else {
          console.log("hell hwohdifghdkjfj");

          try {
            const data = await submitPersonalData(
              values,
              enable,
              EmployeeID,
              dispatch,
              fileList,
              setEmployeeID
            );
            // setModalIsOpen(false);
            toast.success(data?.message || "employee updated successfully");
            setCurrentpage(2);
            // GetOffersData(dispatch);
            console.log(data);
          } catch (error) {
            console.error("Error uploading data", error);
          }
        }
        setEnableUpload(true);
      }
    }
  };

  const [emppersonaldata, setEmpPersonalData] = useState("");
  console.log(emppersonaldata, "datadata");

  const fetchGetUser = async () => {
    try {
      const data = await GetEmpPersonalById(
        EmployeeID,
        setEmployeeID,
        setEmpPersonalData,
        setSpinning
      );
      setEmpPersonalData(data);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  useEffect(() => {
    if (EmployeeID != null || enable || addressback) {
      fetchGetUser();
      setSpinning(true);
    }
  }, [EmployeeID, setEmployeeID, setEmpPersonalData, enable, addressback]);

  const [roledata, setRoleData] = useState("");

  // const GetRoles = async () => {
  //   try {
  //     const data = await GetProductOwnerEmployee(EmployeeID);
  //     setRoleData(data);
  //   } catch (error) {
  //     console.error("Error fetching additional user data", error);
  //   }
  // };

  // useEffect(() => {
  //   GetRolesData(dispatch);
  //   GetRoles();
  // }, []);

  const getrolelist = useSelector((state) => state.crm.role_list);

  console.log(roledata, "roledata");

  const { Dragger } = Upload;
  // const [profileImage, setProfileImage] = useState("");
  const [draggerImage, setDraggerImage] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  console.log(profileImage, updatedata, "hellofkjjfkfkf");

  // to avoid image drag in input field
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const inputRef5 = useRef(null);
  const inputRef6 = useRef(null);

  usePreventDragAndDrop(inputRef1);
  usePreventDragAndDrop(inputRef2);
  usePreventDragAndDrop(inputRef3);
  usePreventDragAndDrop(inputRef4);
  usePreventDragAndDrop(inputRef5);
  usePreventDragAndDrop(inputRef6);

const handleInput = (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, ''); // Remove special characters and numbers
  };

  return (
    <div className="relative mt-[1.5vw]">
      <div className="w-[5vw] h-[5vw] bg-white shadow-lg rounded-full absolute left-[16.6vw] top-[-2.5vw] flex justify-center items-center z-[1]">
        <img className="" src={umbuslogo} alt="buslogo" />
      </div>
      <div className="border-l-[0.1vw] h-[28vw]  pl-[2vw] pr-[1.5vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.1vw] rounded-[1vw] border-[#1f4b7f] ">
        <div className="h-[4vw] w-full flex items-center justify-between ">
          <label className="text-[1.5vw] font-semibold text-[#1f4b7f] ">
            Personal Details
          </label>
          {EmployeeID || addressback ? (
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
              firstname: reset ? "" : emppersonaldata.emp_first_name || "",
              lastname: reset ? "" : emppersonaldata.emp_last_name || "",
              phone: reset ? "" : emppersonaldata.phone || "",
              emailid: reset ? "" : emppersonaldata.email_id || "",
              alt_phone: reset ? "" : emppersonaldata.alternate_phone || "",
              dob: reset
                ? ""
                : emppersonaldata.date_of_birth
                ? dayjs(emppersonaldata.date_of_birth).format("YYYY-MM-DD")
                : "",
              gender: reset ? "" : emppersonaldata.gender || "",
              blood: reset ? "" : emppersonaldata.blood_group || "",
              role: reset ? "" : emppersonaldata.role_type || "",
              role_id: reset ? "" : emppersonaldata.role_type_id || "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setFieldError }) => {
              if (
                (profileImage == true && selectedFile != null) ||
                (updatedata && selectedFile?.length > 0)
              ) {
                console.log("ihere");
                handleSubmit(values, setFieldError);
              } else if (selectedFile?.length <= 0) {
                setProfileImage(false);
                setSelectedFile(null);
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
              resetForm,
              errors,
              touched,
            }) => (
              <Form onSubmit={handleSubmit}>
                {spinning ? (
                  <div className=" flex justify-center h-[22.8vw] items-center">
                    <Spin size="large" />
                  </div>
                ) : (
                  <div className="gap-y-[1.5vw] flex-col flex">
                    <div className="overflow-y-auto gap-y-[1.5vw] flex-col flex h-[18.5vw] pb-[1vw]">
                      <div className="grid grid-cols-2 w-full gap-x-[2vw] pr-[.5vw]">
                        <div className="col-span-1 relative">
                          <label className="text-[#1F4B7F] text-[1.1vw] ">
                            First Name
                            <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                              *
                            </span>
                          </label>
                          <input
                            type="text"
                            name="firstname"
                            style={{ display: "none" }}
                          />
                          <Field
                            type="text"
                            name="firstname"
                            autoComplete="firstname-field"
                            placeholder="Enter First Name"
                            innerRef={inputRef1}
                            // value={values.firstname}
                            disabled={
                              EmployeeID || addressback
                                ? enable
                                  ? false
                                  : true
                                : false
                            }
                            className={`${
                              EmployeeID || addressback
                                ? enable == false
                                  ? " cursor-not-allowed"
                                  : ""
                                : ""
                            } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw] placeholder:font-sans`}
                          />
                          <ErrorMessage
                            name="firstname"
                            component="div"
                            className="text-red-500 text-[0.8vw] absolute left-[.2vw] bottom-[-1.2vw]"
                          />
                        </div>
                        <div className="col-span-1 relative">
                          <label className="text-[#1F4B7F] text-[1.1vw] ">
                            Last Name
                            <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                              *
                            </span>
                          </label>
                          <input
                            type="text"
                            name="lastname"
                            style={{ display: "none" }}
                          />
                          <Field
                            type="text"
                            name="lastname"
                            autoComplete="lastname-field"
                            placeholder="Enter Last Name"
                            innerRef={inputRef2}
                            // value={values.firstname}
                            disabled={
                              EmployeeID || addressback
                                ? enable
                                  ? false
                                  : true
                                : false
                            }
                            className={`${
                              EmployeeID || addressback
                                ? enable == false
                                  ? " cursor-not-allowed"
                                  : ""
                                : ""
                            } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw] placeholder:font-sans`}
                          />
                          <ErrorMessage
                            name="lastname"
                            component="div"
                            className="text-red-500 text-[0.8vw] absolute left-[.2vw] bottom-[-1.2vw]"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 w-full gap-x-[2vw] pr-[.5vw]">
                        <div className="col-span-1 relative ">
                          <label className="text-[#1F4B7F] text-[1.1vw] ">
                            Phone
                            <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                              *
                            </span>
                          </label>
                          <div className="relative flex items-center">
                            <input
                              type="text"
                              name="phone"
                              style={{ display: "none" }}
                            />
                            <Field
                              type="text"
                              name="phone"
                              autoComplete="phone-field"
                              placeholder="Enter Number"
                              innerRef={inputRef3}
                              // value={values.firstname}
                              disabled={
                                EmployeeID || addressback
                                  ? enable
                                    ? false
                                    : true
                                  : false
                              }
                              className={`${
                                EmployeeID || addressback
                                  ? enable == false
                                    ? " cursor-not-allowed"
                                    : ""
                                  : ""
                              } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw] placeholder:font-sans`}
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
                            Alternate Phone
                            <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                              *
                            </span>
                          </label>
                          <input
                            type="text"
                            name="alt_phone"
                            style={{ display: "none" }}
                          />
                          <Field
                            type="text"
                            name="alt_phone"
                            autoComplete="alt_phone-field"
                            placeholder="Enter Alternate Number"
                            innerRef={inputRef4}
                            // value={values.firstname}
                            disabled={
                              EmployeeID || addressback
                                ? enable
                                  ? false
                                  : true
                                : false
                            }
                            className={`${
                              EmployeeID || addressback
                                ? enable == false
                                  ? " cursor-not-allowed"
                                  : ""
                                : ""
                            } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw] placeholder:font-sans`}
                          />
                          <ErrorMessage
                            name="alt_phone"
                            component="div"
                            className="text-red-500 text-[0.8vw] absolute left-[.2vw] bottom-[-1.2vw]"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 w-full gap-x-[2vw] pr-[.5vw]">
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
                            innerRef={inputRef5}
                            onChange={(e) =>
                              setFieldValue(
                                "emailid",
                                e.target.value.toLowerCase()
                              )
                            }
                            // value={values.firstname}
                            disabled={
                              EmployeeID || addressback
                                ? enable
                                  ? false
                                  : true
                                : false
                            }
                            className={`${
                              EmployeeID || addressback
                                ? enable == false
                                  ? " cursor-not-allowed"
                                  : ""
                                : ""
                            } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw] placeholder:font-sans`}
                          />
                          <ErrorMessage
                            name="emailid"
                            component="div"
                            className="text-red-500 text-[0.8vw] absolute left-[.2vw] bottom-[-1.2vw]"
                          />
                        </div>

                        <div className="col-span-1 relative">
                          <label className="text-[#1F4B7F] text-[1.1vw] ">
                            Date of Birth
                            <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                              *
                            </span>
                          </label>
                          <input
                            type="text"
                            name="dob"
                            style={{ display: "none" }}
                          />
                          {/* <Field
                            type="date"
                            name="dob"
                            autoComplete="dob-field"
                            placeholder="Select Date of Birth"
                            value={values.dob}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            disabled={
                              EmployeeID || addressback
                                ? enable
                                  ? false
                                  : true
                                : false
                            }
                            className={`${
                              EmployeeID || addressback
                                ? enable == false
                                  ? " cursor-not-allowed"
                                  : ""
                                : ""
                            } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                          /> */}
                          <Field
                            type="date"
                            name="dob"
                            value={values.dob}
                            onChange={(e) => {
                              handleChange(e);
                              sessionStorage.setItem("dob", e.target.value);
                            }}
                            disabled={
                              updatedata || addressback
                                ? enable
                                  ? false
                                  : true
                                : false
                            }
                            
                          >
                            {({ field }) => (
                              <DatePicker
                                
                                {...field}
                                // selected={field.value ? new Date(field.value) : null}
                                value={field.value ? dayjs(field.value, 'YYYY-MM-DD') : null}
                                onChange={(val) => {
                                  setFieldValue("dob", val);
                                  sessionStorage.setItem("dob", val);
                                }}
                                // name="date"
                                // placeholderText="Select Date of Birth"
                                // dateFormat="DD-MM-yyyy"

                                // value={field.value ? moment(field.value, 'DD-MM-YYYY') : null}
          // onChange={(date, dateString) => {
          //   setFieldValue('dob', dateString);
          //   sessionStorage.setItem("dob", dateString);
          // }}
          placeholder="Select Date of Birth"
          format="YYYY-MM-DD"
          className={`${
            updatedata || addressback
              ? enable == false
                ? " cursor-not-allowed"
                : ""
              : ""
          } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue date-input border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
        
                                
                                
                              />
                            )}
                          </Field>
                          <ErrorMessage
                            name="dob"
                            component="div"
                            className="text-red-500 text-[0.8vw] absolute left-[.2vw] bottom-[-1.2vw]"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 w-full gap-x-[2vw] pr-[.5vw] relative">
                        <div className="col-span-1 relative">
                          <label className="text-[#1F4B7F] text-[1.1vw] ">
                            Gender
                            <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                              *
                            </span>
                          </label>
                          {/* <Field
                      as="select"
                      name="gender"
                      value={values.gender}
                      onChange={(e) => {
                        handleChange(e);
                        sessionStorage.setItem("status", e.target.value);
                      }}
                      disabled={
                        EmployeeID || addressback
                          ? enable
                            ? false
                            : true
                          : false
                      }
                      className={`${EmployeeID || addressback
                        ? enable == false
                          ? " cursor-not-allowed"
                          : ""
                        : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                    >
                      <option label="Select Gender" value="" className="" />
                      <option label="Male" value="Male" className="" />
                      <option label="Female" value="Female" className="" />
                      <option label="Other" value="Other" className="" />
                    </Field> */}
                          <ConfigProvider
                            theme={{
                              components: {
                                Select: {
                                  optionActiveBg: "#aebed1",
                                  optionSelectedColor: "#FFF",
                                  optionSelectedBg: "#e5e5e5",
                                  optionHeight: "2",
                                },
                              },
                            }}
                          >
                            <Select
                              showSearch
                              value={values.gender}
                              onChange={(value) => {
                                handleChange({
                                  target: { name: "gender", value },
                                });
                                sessionStorage.setItem("status", value);
                              }}
                              onInput={handleInput}
                              placement="topRight"
                              listHeight={190}
                              disabled={
                                EmployeeID || addressback
                                  ? enable
                                    ? false
                                    : true
                                  : false
                              }
                              name="gender"
                              className={`${
                                EmployeeID || addressback
                                  ? enable == false
                                    ? " cursor-not-allowed bg-[#FAFAFA]"
                                    : ""
                                  : ""
                              } custom-select bg-white border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                              // className="custom-select bg-white outline-none w-full mt-[0.5vw] h-[3vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-xl border-r-[0.2vw] border-b-[0.2vw] placeholder-[#1F487C]"
                              placeholder="Select Gender"
                              optionFilterProp="value"
                              suffixIcon={
                                <span
                                  style={{ fontSize: "1vw", color: "#1f487c" }}
                                >
                                  <IoMdArrowDropup size="2vw" />
                                </span>
                              }
                              style={{ padding: 4 }}
                              options={[
                                {
                                  value: "",
                                  label: (
                                    <div className="text-[1vw]  px-[0.2vw] pb-[0.1vw] text-gray-400">
                                      Select Gender
                                    </div>
                                  ),
                                  disabled: true,
                                },
                                {
                                  value: "Male",
                                  label: (
                                    <div className="text-[1vw] font-normal  px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                      Male
                                    </div>
                                  ),
                                },
                                {
                                  value: "Female",
                                  label: (
                                    <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                      Female
                                    </div>
                                  ),
                                },
                                {
                                  value: "Other",
                                  label: (
                                    <div className="text-[1vw]  px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                      Other
                                    </div>
                                  ),
                                },
                              ]}
                            />
                          </ConfigProvider>
                          <ErrorMessage
                            name="gender"
                            component="div"
                            className="text-red-500 text-[0.8vw] absolute left-[.2vw] bottom-[-1.2vw]"
                          />
                        </div>
                        <div className="col-span-1 relative">
                          <label className="text-[#1F4B7F] text-[1.1vw] ">
                            Blood Group
                            <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                              *
                            </span>
                          </label>
                          <Field
                            type="text"
                            name="blood"
                            placeholder="Enter Blood Group"
                            innerRef={inputRef6}
                            autoComplete="off"
                            onChange={(e) =>
                              setFieldValue(
                                "blood",
                                e.target.value.toUpperCase()
                              )
                            }
                            // value={values.firstname}
                            disabled={
                              EmployeeID || addressback
                                ? enable
                                  ? false
                                  : true
                                : false
                            }
                            className={`${
                              EmployeeID || addressback
                                ? enable == false
                                  ? " cursor-not-allowed"
                                  : ""
                                : ""
                            } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw] placeholder:font-sans`}
                          />
                          <ErrorMessage
                            name="blood"
                            component="div"
                            className="text-red-500 text-[0.8vw] absolute left-[.2vw] bottom-[-1.2vw]"
                          />
                        </div>
                      </div>
                    </div>
                    {updatedata && selectedFile != null
                      ? " "
                      : profileImage === false && (
                          <div className="text-red-500 text-[.7vw] absolute  bottom-[2.8vw]">
                            * Profile Image is required
                          </div>
                        )}
                    <div className="flex items-center justify-between ">
                      <div>
                        <h1 className="text-[#1F4B7F] text-[0.7vw] font-semibold">
                          * You must fill in all fields to be able to continue
                        </h1>
                      </div>
                      <div className="flex items-center gap-x-[1vw]">
                        <button
                          type="button"
                          onClick={() => {
                            resetForm();
                            setReset(true);
                            console.log("rr");
                          }}
                          className="border-[#1F487C] w-[5vw] font-semibold text-[1vw] h-[2vw] rounded-full border-r-[0.2vw]  border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw]"
                        >
                          Reset
                        </button>
                        <button
                          className="bg-[#1F487C] font-semibold rounded-full w-[11vw] h-[2vw] text-[1vw] text-white"
                          type="submit"
                          // onClick={() => setCurrentpage(2)}
                        >
                          {EmployeeID || addressback
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

export default AddPersonalDetails

// FUTURE REFERENCE = changed the normal function to arrow function and written export seperately at end since ref was not working for image drag