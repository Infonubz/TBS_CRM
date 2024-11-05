import { Progress, Upload } from "antd";
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
  alt_phone: Yup.string()
    .matches(/^[0-9]+$/, "Alternative Phone number must be a number")
    .min(10, "Alternative Phone number must be at least 10 digits")
    .max(10, "Alternative Phone number maximum 10 digits only")
    .required("Alternative Phone Number is required"),
  firstname: Yup.string().required("Company Name is required"),
  lastname: Yup.string().required("Owner Name is required"),
  // blood: Yup.string().required("Company Name is required"),
  gender: Yup.string().required("Please select an Gender"), // Validation schema for select field
  dob: Yup.date().required("Date of Birth is required").nullable(),
  occupation: Yup.string().required("please select the occupation")
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
  setEnableUpload
}) {

  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    console.log(values, 'values_values');

    if (PartnerID && enable == false) {
      setCurrentpage(2);
    } else {
      console.log("vadhfkjdfhkjdfhkjf",values);
      
      try {
        const data = await submitPartnerPersonalData(
          values,
          PartnerID,
          enable,
          dispatch,
          fileList
        );
        // setModalIsOpen(false);
        console.log(data, "111111");
        toast.success(data?.message);
        setCurrentpage(2);
        GetPartnerProfile(PartnerID, dispatch)
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
      occupation : values.occupation
    })
    setEnableUpload(true);
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

  console.log(patpersonalData, 'emp_proffesional_data')
  const fetchGetUser = async () => {
    try {
      const data = await GetPatPersonalById(
        PartnerID,
        setPartnerID,
        setPatPersonalData,
        dispatch
      );
      setPatPersonalData(data);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  useEffect(() => {
    if (PartnerID != null || enable || addressback) {
      fetchGetUser();
    }
  }, [PartnerID, setPartnerID, setPatPersonalData, enable, addressback]);


  const { Dragger } = Upload;
  // const [profileImage, setProfileImage] = useState("");
  const [draggerImage, setDraggerImage] = useState(false)
  const [previewUrl, setPreviewUrl] = useState("");

  return (

    <div>
      <div className="border-l-[0.1vw] h-[28vw] overflow-y-scroll px-[2vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.1vw] rounded-[1vw] border-[#1f4b7f]">
        <div className="h-[4vw] w-full flex items-center justify-between ">
          <label className="text-[1.5vw] font-semibold text-[#1f4b7f] ">
            Personal Details
          </label>
          {PartnerID || addressback ? (
            <button
              className={`${enable
                ? "bg-[#1f4b7f] text-white"
                : "text-[#1f4b7f] bg-white border-[#1f4b7f]"
                } rounded-full font-semibold w-[10vw] h-[2vw] flex items-center justify-center border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.1vw] text-[1.1vw] `}
              onClick={() =>{
               setEnable(!enable)
                setEnableUpload(false)}
              }
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
              firstname: patpersonalData?.partner_first_name || "",
              lastname: patpersonalData?.partner_last_name || "",
              phone: patpersonalData?.phone || "",
              emailid: patpersonalData?.emailid || "",
              alt_phone: patpersonalData?.alternate_phone || "",
              dob: patpersonalData?.date_of_birth ? dayjs(patpersonalData.date_of_birth).format("YYYY-MM-DD")
                : "",
              gender: patpersonalData?.gender || "",
              occupation:patpersonalData?.occupation || ""
              // blood: patpersonalData || "",
              // profile_img: patpersonalData?.profile_img || "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              if (profileImage === true || updatedata) {
                handleSubmit(values);
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
              touched
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className="gap-y-[1.5vw] flex-col flex">
                  <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                    <div className="col-span-1 relative">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Partner First Name
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        type="text"
                        name="firstname"
                        placeholder="Enter First Name"
                        value={values.firstname}
                        disabled={
                          PartnerID || addressback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${PartnerID || addressback
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
                        Partner Last Name
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        type="text"
                        name="lastname"
                        placeholder="Enter Last Name"
                        value={values.lastname}
                        disabled={
                          PartnerID || addressback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${PartnerID || addressback
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
                      <div className="relative flex items-center">
                        <Field
                          type="text"
                          name="phone"
                          placeholder="Enter Number"
                          value={values.phone}
                          disabled={
                            PartnerID || addressback
                              ? enable
                                ? false
                                : true
                              : false
                          }
                          className={`${PartnerID || addressback
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
                      <Field
                        type="text"
                        name="emailid"
                        placeholder="Enter Email Address"
                        value={values.emailid}
                        disabled={
                          PartnerID || addressback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${PartnerID || addressback
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
                      <Field
                        type="text"
                        name="alt_phone"
                        placeholder="Enter Alternate Number"
                        value={values.alt_phone}
                        disabled={
                          PartnerID || addressback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${PartnerID || addressback
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
                      <Field
                        as="select"
                        name="gender"
                        value={values.gender}
                        onChange={(e) => {
                          handleChange(e);
                          localStorage.setItem("status", e.target.value);
                        }}
                        disabled={
                          PartnerID || addressback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${PartnerID || addressback
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
                      </Field>
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
                        onChange={(e) => {
                          handleChange(e);
                          localStorage.setItem("dob", e.target.value);
                        }}
                        disabled={
                          PartnerID || addressback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${PartnerID || addressback
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
                    <div className="col-span-1 relative">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Occupation
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        as="select"
                        name="occupation"
                        value={values.occupation}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        disabled={
                          PartnerID || addressback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${PartnerID || addressback
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
                      </Field>
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

                  <div className="flex items-center justify-between py-[1vw] relative">
               
                    <div>
                    {updatedata
                      ? " "
                      : profileImage === false && (
                          <div className="text-red-700 text-[.7vw] top-[-.3vw] absolute">
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
                        onClick={resetForm}>
                        Reset
                      </button>
                      <button
                        className="bg-[#1F487C] font-semibold rounded-full w-[11vw] h-[2vw] text-[1vw] text-white"
                        type="submit"
                      // onClick={() => setCurrentpage(2)}
                      >
                        {PartnerID || addressback ? enable
                          ? "Update & Continue"
                          : "Continue"
                          : "Continue"}
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div >
  );
}
