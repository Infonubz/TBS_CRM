import { Progress } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  GetOperatorById,
  SubmitAddressData,
  SubmitCompanyData,
} from "../../../Api/UserManagement/SuperAdmin";
import axios from "axios";
import { useDispatch } from "react-redux";

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
    .min(3, "Company name must be at least 3 characters long")
    .max(30, "Company name must be at most 30 characters long")
    .required("Company Name is required"),
  ownername: Yup.string().required("Owner Name is required"),
  aadhar: Yup.string()
    .matches(/^[0-9]{12}$/, "Aadhar number must be exactly 12 digits")
    .required("Aadhar Number is required"),
  pan: Yup.string()
    .matches(
      /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      "PAN number must be in the format: ABCDE1234F"
    )
    .required("Pan Number is required"),
});
export default function AddSuperAdmin({
  setCurrentpage,
  SetSPA_ID,
  SPA_ID,
  superadmindata,
  operatorID,
  setOperatorID,
  addressback,
}) {
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    console.log(enable,"hiiiiiiiiii");
    if (operatorID && enable == false) {
      setCurrentpage(2);
    } else {
      try {
        const data = await SubmitCompanyData(
          values,
          operatorID,
          enable,
          dispatch
        );
        toast.success(data?.message);
        setCurrentpage(2);
        console.log("Current page set to 2");
      } catch (error) {
        console.error("Error uploading data", error);
      }
    }
  };
  const handleBlur = async (e, setFieldError) => {
    const { value } = e.target;

    try {
      const response = await axios.post(
        "http://192.168.90.47:4000/operator_validation",
        { phone: value }
      );
      console.log(response.data.Phone, "ggggg");
      if (response.data.Phone) {
        console.log("heloo");
        setFieldError("phone", "Mobile number already exists");
      }
    } catch (error) {
      console.error("Error checking mobile number", error);
      setFieldError("phone", "Error checking mobile number");
    }
  };
  const [superadmincompanydata, setsuperadmincompanydata] = useState("");
  const [enable, setEnable] = useState(false);
  const fetchGetUser = async () => {
    try {
      const data = await GetOperatorById(
        operatorID,
        setOperatorID,
        setsuperadmincompanydata
      );
      setsuperadmincompanydata(data[0]);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  useEffect(() => {
    if (operatorID != null || enable || addressback) {
      fetchGetUser();
    }
  }, [
    operatorID,
    setOperatorID,
    setsuperadmincompanydata,
    enable,
    addressback,
  ]);
  return (
    <div>
      <div className="border-l-[0.1vw] px-[2vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.1vw] rounded-[1vw] border-[#1f4b7f]">
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
              onClick={() => setEnable(!enable)}
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
              companyname: superadmincompanydata.company_name || "",
              ownername: superadmincompanydata.owner_name || "",
              phone: superadmincompanydata.phone || "",
              emailid: superadmincompanydata.emailid || "",
              // alt_phone: "",
              // alt_emailid: "",
              aadhar: superadmincompanydata.aadharcard_number || "",
              pan: superadmincompanydata.pancard_number || "",
              // pancarddoc: "",
              // aadardoc: "",
              user_status: superadmincompanydata.user_status || "",
              req_status: superadmincompanydata.req_status || "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleSubmit(values);
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
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className="gap-y-[1.5vw] flex-col flex">
                  <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Company Name
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        type="text"
                        name="companyname"
                        placeholder="Enter Company Name"
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
                      <ErrorMessage
                        name="companyname"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Owner Name
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        type="text"
                        name="ownername"
                        placeholder="Enter Owner Name"
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
                      <ErrorMessage
                        name="ownername"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                    <div className="col-span-1 ">
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
                          // value={values.firstname}
                          onBlur={(e) => handleBlur(e, setFieldError)} // Custom onBlur handler
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
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                    <div className="col-span-1">
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
                      <ErrorMessage
                        name="emailid"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
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
                  <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Aadhar Card Number
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <div className="flex items-center relative">
                        <Field
                          type="text"
                          name="aadhar"
                          placeholder="Enter Aadhar Number"
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
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Pan Card Number
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <div className="flex items-center relative">
                        <Field
                          type="text"
                          name="pan"
                          placeholder="Enter Pan Number"
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
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-[1vw]">
                    <div>
                      <h1 className="text-[#1F4B7F] text-[0.8vw] font-semibold">
                        *You must fill in all fields to be able to continue
                      </h1>
                    </div>
                    <div className="flex items-center gap-x-[1vw]">
                      {/* <button className="border-[#1F487C] w-[5vw] font-semibold text-[1vw] h-[2vw] rounded-full border-r-[0.2vw]  border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw]">
                        Reset
                      </button> */}
                      <button
                        className="bg-[#1F487C] font-semibold rounded-full w-[10vw] h-[2vw] text-[1vw] text-white"
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
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
