import { ConfigProvider, Progress, Select, Spin, Upload } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  GetEmpPersonalById,
  GetPartnerData,
  GetPartnerProfile,
  GetPatPersonalById,
  submitPartnerPersonalData,
  submitPersonalData,
} from "../../../Api/UserManagement/Partner";
import { FaUpload } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import {
  validateEmail,
  validateMobile,
} from "../../../Api/UserManagement/SuperAdmin";
// import { color } from "html2canvas/dist/types/css/types/color";

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
    .required("Alternative phone Number is required")
    .notOneOf([Yup.ref("phone")], "Alternate phone cannot be same as phone"),
  firstname: Yup.string()
    .required("First name is required")
    .min(3, "At least 3 characters long")
    .max(20, "Maximum 20 characters only"),
  lastname: Yup.string()
    .required("Last name is required")
    .min(1, "At least 1 characters long")
    .max(20, "Maximum 20 characters only"),
  // blood: Yup.string().required("Company Name is required"),
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
  occupation: Yup.string().required("Occupation is required"),
  // profile_img: Yup.mixed()
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

export default function AddPersonalDetails({
  setCurrentpage,
  PartnerID,
  setPartnerID,
  addressback,
  fileList,
  profileImage,
  setProfileImage,
  updatedata,
  setEnableUpload,
  selectedFile,
  enableUpload,
}) {
  const dispatch = useDispatch();
  const [spinning, setSpinning] = useState(false);
    const [reset,setReset] = useState(false)

  const handleSubmit = async (values, setFieldError) => {
    console.log(values, "values_values");

    if (
      patpersonalData.phone === values.phone &&
      patpersonalData.emailid === values.emailid
    ) {
      if (PartnerID && enable == false) {
        setCurrentpage(2);
      } else {
        console.log("vadhfkjdfhkjdfhkjf", values);

        try {
          const data = await submitPartnerPersonalData(
            values,
            PartnerID,
            enable,
            dispatch,
            fileList,
            setPartnerID
          );
          // setModalIsOpen(false);
          console.log(data, "111111");
          toast.success(
            data?.message || "partner details updated successfully"
          );
          setCurrentpage(2);
          GetPartnerProfile(PartnerID, dispatch);
          GetPartnerData(dispatch);
          console.log(data);
        } catch (error) {
          console.error("Error uploading data", error);
        }
      }
      setPatPersonalData({
        partner_first_name: values.firstname,
        partner_last_name: values.lastname,
        phone: values.phone,
        alternate_phone: values.alt_phone,
        emailid: values.emailid,
        gender: values.gender,
        date_of_birth: values.dob,
        profile_img: values.profile_img,
        occupation: values.occupation,
      });
      setEnableUpload(true);
    } else if (patpersonalData.emailid === values.emailid) {
      const mobileResponce = await validateMobile(values.phone, "partner");
      if (mobileResponce) {
        setFieldError("phone", "Phone no is already exist");
      } else {
        if (PartnerID && enable == false) {
          setCurrentpage(2);
        } else {
          console.log("vadhfkjdfhkjdfhkjf", values);

          try {
            const data = await submitPartnerPersonalData(
              values,
              PartnerID,
              enable,
              dispatch,
              fileList,
              setPartnerID
            );
            // setModalIsOpen(false);
            console.log(data, "111111");
            toast.success(
              data?.message || "partner details updated successfully"
            );
            setCurrentpage(2);
            GetPartnerProfile(PartnerID, dispatch);
            GetPartnerData(dispatch);
            console.log(data);
          } catch (error) {
            console.error("Error uploading data", error);
          }
        }
        setEnableUpload(true);
      }
    } else if (patpersonalData.phone === values.phone) {
      const emailResponce = await validateEmail(values.emailid, "partner");
      if (emailResponce) {
        setFieldError("emailid", "Email id is already exist");
      } else {
        if (PartnerID && enable == false) {
          setCurrentpage(2);
        } else {
          console.log("vadhfkjdfhkjdfhkjf", values);

          try {
            const data = await submitPartnerPersonalData(
              values,
              PartnerID,
              enable,
              dispatch,
              fileList,
              setPartnerID
            );
            // setModalIsOpen(false);
            console.log(data, "111111");
            toast.success(
              data?.message || "partner details updated successfully"
            );
            setCurrentpage(2);
            GetPartnerProfile(PartnerID, dispatch);
            GetPartnerData(dispatch);
            console.log(data);
          } catch (error) {
            console.error("Error uploading data", error);
          }
        }
        setEnableUpload(true);
      }
    } else {
      const mobileResponce = await validateMobile(values.phone, "partner");
      const emailResponce = await validateEmail(values.emailid, "partner");
      if (mobileResponce == true || emailResponce == true) {
        if (mobileResponce) {
          setFieldError("phone", "Phone no is already exist");
        } else if (emailResponce) {
          setFieldError("emailid", "Email id is already exist");
        }
      } else {
        if (PartnerID && enable == false) {
          setCurrentpage(2);
        } else {
          console.log("vadhfkjdfhkjdfhkjf", values);

          try {
            const data = await submitPartnerPersonalData(
              values,
              PartnerID,
              enable,
              dispatch,
              fileList,
              setPartnerID
            );
            // setModalIsOpen(false);
            console.log(data, "111111");
            toast.success(
              data?.message || "partner details updated successfully"
            );
            setCurrentpage(2);
            GetPartnerProfile(PartnerID, dispatch);
            GetPartnerData(dispatch);
            console.log(data);
          } catch (error) {
            console.error("Error uploading data", error);
          }
        }
        setPatPersonalData({
          partner_first_name: values.firstname,
          partner_last_name: values.lastname,
          phone: values.phone,
          alternate_phone: values.alt_phone,
          emailid: values.emailid,
          gender: values.gender,
          date_of_birth: values.dob,
          profile_img: values.profile_img,
          occupation: values.occupation,
        });
        setEnableUpload(true);
      }
    }

    // if (PartnerID && enable == false) {
    //   setCurrentpage(2);
    // } else {
    //   console.log("vadhfkjdfhkjdfhkjf", values);

    //   try {
    //     const data = await submitPartnerPersonalData(
    //       values,
    //       PartnerID,
    //       enable,
    //       dispatch,
    //       fileList,
    //       setPartnerID
    //     );
    //     // setModalIsOpen(false);
    //     console.log(data, "111111");
    //     toast.success(data?.message || "partner details updated successfully");
    //     setCurrentpage(2);
    //     GetPartnerProfile(PartnerID, dispatch)
    //     GetPartnerData(dispatch);
    //     console.log(data);
    //   } catch (error) {
    //     console.error("Error uploading data", error);
    //   }
    // }
    // setPatPersonalData({
    //   partner_first_name: values.firstname,
    //   partner_last_name: values.lastname,
    //   phone: values.phone,
    //   alternate_phone: values.alt_phone,
    //   emailid: values.emailid,
    //   gender: values.gender,
    //   date_of_birth: values.dob,
    //   profile_img: values.profile_img,
    //   occupation: values.occupation
    // })
    // setEnableUpload(true);
  };

  const [patpersonalData, setPatPersonalData] = useState({
    partner_first_name: "",
    partner_last_name: "",
    phone: "",
    alternate_phone: "",
    emailid: "",
    gender: "",
    date_of_birth: "",
    profile_img: "",
  });
  const [enable, setEnable] = useState(false);

  console.log(patpersonalData, "emp_proffesional_data");
  const fetchGetUser = async () => {
    try {
      const data = await GetPatPersonalById(
        PartnerID,
        setPartnerID,
        setPatPersonalData,
        dispatch,
        setSpinning
      );
      setPatPersonalData(data);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  useEffect(() => {
    if (PartnerID != null || enable || addressback) {
      fetchGetUser();
      setSpinning(true);
    }
  }, [PartnerID, setPartnerID, setPatPersonalData, enable, addressback]);

  const { Dragger } = Upload;
  // const [profileImage, setProfileImage] = useState("");
  const [draggerImage, setDraggerImage] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  return (
    <div>
      <div className="border-l-[0.1vw] h-[28vw]  px-[2vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.1vw] rounded-[1vw] border-[#1f4b7f] mt-[1.5vw]">
        <div className="h-[4vw] w-full flex items-center justify-between ">
          <label className="text-[1.5vw] font-semibold text-[#1f4b7f] ">
            Personal Details
          </label>
          {updatedata || addressback ? (
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
              firstname: reset ? "" : patpersonalData?.partner_first_name || "",
              lastname: reset ? "" : patpersonalData?.partner_last_name || "",
              phone: reset ? "" : patpersonalData?.phone || "",
              emailid: reset ? "" : patpersonalData?.emailid || "",
              alt_phone: reset ? "" : patpersonalData?.alternate_phone || "",
              dob: reset ? "" : patpersonalData?.date_of_birth
                ? dayjs(patpersonalData.date_of_birth).format("YYYY-MM-DD")
                : "",
              gender: reset ? "" : patpersonalData?.gender || "",
              occupation: reset ? "" : patpersonalData?.occupation || "",
              // blood: patpersonalData || "",
              // profile_img: patpersonalData?.profile_img || "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setFieldError }) => {
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
              resetForm,
              errors,
              touched,
            }) => (
              <Form onSubmit={handleSubmit}>
                {spinning ? (
                  <div className=" flex justify-center h-[23.4vw] items-center">
                    <Spin size="large" />
                  </div>
                ) : (
                  <div className="gap-y-[1.5vw] flex-col  flex">
                    <div className="overflow-y-scroll gap-y-[1.5vw] flex-col  flex h-[18vw] pb-[1vw]">
                      <div className="grid grid-cols-2 w-full gap-x-[2vw]">
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
                            value={values.firstname}
                            disabled={
                              updatedata || addressback
                                ? enable
                                  ? false
                                  : true
                                : false
                            }
                            className={`${
                              updatedata || addressback
                                ? enable == false
                                  ? " cursor-not-allowed"
                                  : ""
                                : ""
                            } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                          />
                          <ErrorMessage
                            name="firstname"
                            component="div"
                            className="text-red-500 text-[0.8vw] absolute bottom-[-1.3vw] left-[.3vw]"
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
                            value={values.lastname}
                            disabled={
                              updatedata || addressback
                                ? enable
                                  ? false
                                  : true
                                : false
                            }
                            className={`${
                              updatedata || addressback
                                ? enable == false
                                  ? " cursor-not-allowed"
                                  : ""
                                : ""
                            } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                          />
                          <ErrorMessage
                            name="lastname"
                            component="div"
                            className="text-red-500 text-[0.8vw]  absolute bottom-[-1.3vw] left-[.3vw]"
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
                          {/* <div className="relative flex items-center"> */}
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
                            value={values.phone}
                            disabled={
                              updatedata || addressback
                                ? enable
                                  ? false
                                  : true
                                : false
                            }
                            className={`${
                              updatedata || addressback
                                ? enable == false
                                  ? " cursor-not-allowed"
                                  : ""
                                : ""
                            } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                          />
                          {/* <button className="absolute right-[0.5vw] text-[1vw] text-white w-[5vw] bg-[#1F4B7F] rounded-full h-[1.7vw]">
                          Verify
                        </button> */}
                          {/* </div> */}
                          <ErrorMessage
                            name="phone"
                            component="div"
                            className="text-red-500 text-[0.8vw] absolute bottom-[-1.3vw] left-[.3vw]"
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
                            value={values.emailid}
                            onChange={(e) => setFieldValue("emailid", e.target.value.toLowerCase())}
                            disabled={
                              updatedata || addressback
                                ? enable
                                  ? false
                                  : true
                                : false
                            }
                            className={`${
                              updatedata || addressback
                                ? enable == false
                                  ? " cursor-not-allowed"
                                  : ""
                                : ""
                            } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                          />
                          <ErrorMessage
                            name="emailid"
                            component="div"
                            className="text-red-500 text-[0.8vw] absolute bottom-[-1.3vw] left-[.3vw]"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 w-full gap-x-[2vw]">
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
                            value={values.alt_phone}
                            disabled={
                              updatedata || addressback
                                ? enable
                                  ? false
                                  : true
                                : false
                            }
                            className={`${
                              updatedata || addressback
                                ? enable == false
                                  ? " cursor-not-allowed"
                                  : ""
                                : ""
                            } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                          />
                          <ErrorMessage
                            name="alt_phone"
                            component="div"
                            className="text-red-500 text-[0.8vw] absolute bottom-[-1.3vw] left-[.3vw]"
                          />
                        </div>

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
                          updatedata || addressback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${updatedata || addressback
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
                                  optionSelectedBg: "#aebed1",
                                  optionHeight: "2",
                                },
                              },
                            }}
                          >
                            <Select
                              // showSearch
                              value={values.gender}
                              onChange={(value) => {
                                handleChange({
                                  target: { name: "gender", value },
                                });
                                sessionStorage.setItem("status", value);
                              }}
                              placement="topRight"
                              disabled={
                                updatedata || addressback
                                  ? enable
                                    ? false
                                    : true
                                  : false
                              }
                              name="gender"
                              className={`${
                                updatedata || addressback
                                  ? enable == false
                                    ? " cursor-not-allowed"
                                    : ""
                                  : ""
                              } custom-select bg-white border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                              // className="custom-select bg-white outline-none w-full mt-[0.5vw] h-[3vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-xl border-r-[0.2vw] border-b-[0.2vw] placeholder-[#1F487C]"
                              placeholder="Select Gender"
                              optionFilterProp="label"
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
                            className="text-red-500 text-[0.8vw] absolute bottom-[-1.3vw] left-[.3vw]"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                        <div className="col-span-1 relative">
                          <label className="text-[#1F4B7F] text-[1.1vw] ">
                            Date of Birth
                            <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                              *
                            </span>
                          </label>
                          <Field
                            type="date"
                            name="dob"
                            placeholder="Select Date of Birth"
                            value={values.dob}
                            // style={{color:"red"}}
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
                            className={`${
                              updatedata || addressback
                                ? enable == false
                                  ? " cursor-not-allowed"
                                  : ""
                                : ""
                            } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                          />
                          <ErrorMessage
                            name="dob"
                            component="div"
                            className="text-red-500 text-[0.8vw] absolute bottom-[-1.3vw] left-[.3vw]"
                          />
                        </div>
                        <div className="col-span-1 relative umselect">
                          <label className="text-[#1F4B7F] text-[1.1vw] ">
                            Occupation
                            <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                              *
                            </span>
                          </label>
                          {/* <Field
                        as="select"
                        name="occupation"
                        value={values.occupation}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        disabled={
                          updatedata || addressback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${updatedata || addressback
                          ? enable == false
                            ? " cursor-not-allowed"
                            : ""
                          : ""
                          } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      >
                        <option label="Select Occupation" value="" className="" />
                        <option label="Student" value="student" className="" />
                        <option label="Entrepreneur" value="entrepreneur" className="" />
                        <option label="Labourer" value="labourer" className="" />
                        <option label="Retired" value="retired" className="" />
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
                              value={values.occupation}
                              placement="topRight"
                              listHeight={190}
                              onChange={(value) => {
                                handleChange({
                                  target: { name: "occupation", value },
                                });
                              }}
                              disabled={
                                updatedata || addressback
                                  ? enable
                                    ? false
                                    : true
                                  : false
                              }
                              name="occupation"
                              className={`${
                                updatedata || addressback
                                  ? enable == false
                                    ? " cursor-not-allowed"
                                    : ""
                                  : ""
                              } custom-select bg-white border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                              // className="custom-select bg-white outline-none w-full mt-[0.5vw] h-[3vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-xl border-r-[0.2vw] border-b-[0.2vw] placeholder-[#1F487C]"
                              placeholder="Select Gender"
                              filterOption={
                                (input, option) =>
                                  option?.value
                                    ?.toLowerCase()
                                    ?.includes(input.toLowerCase()) // Make it case-insensitive
                              }
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
                                      Select Occupation
                                    </div>
                                  ),
                                  disabled: true,
                                },
                                {
                                  value: "student",
                                  label: (
                                    <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                      Student
                                    </div>
                                  ),
                                },
                                {
                                  value: "entrepreneur",
                                  label: (
                                    <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                      Entrepreneur
                                    </div>
                                  ),
                                },
                                {
                                  value: "labourer",
                                  label: (
                                    <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                      Labourer
                                    </div>
                                  ),
                                },
                                {
                                  value: "retired",
                                  label: (
                                    <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                      Retired
                                    </div>
                                  ),
                                },
                              ]}
                            />
                          </ConfigProvider>
                          <ErrorMessage
                            name="occupation"
                            component="div"
                            className="text-red-500 text-[0.8vw] absolute bottom-[-1.3vw] left-[.3vw]"
                          />
                        </div>
                        {/* <div className="col-span-1">
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
                        // value={values.firstname}
                        className="border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                      />
                      <ErrorMessage
                        name="blood"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div> */}
                      </div>
                    </div>

                    <div className="flex items-center justify-between  relative">
                      <div>
                        {updatedata && selectedFile != null
                          ? " "
                          : profileImage === false && (
                              <div className="text-red-500 text-[.7vw] top-[-.3vw] absolute">
                                * Profile Image is required
                              </div>
                            )}
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
                          {updatedata || addressback
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
