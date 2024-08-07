import { Progress } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  GetEmpPersonalById,
  submitPersonalData,
} from "../../../Api/UserManagement/Employee";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import {
  GetCompanyDetailsById,
  submitClientComapanyData,
} from "../../../Api/UserManagement/Client";
import "../../../App.css"
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
  owner_name: Yup.string().required("Owner Name is required"),
  company_name: Yup.string().required("Company Name is required"),
  web_url: Yup.string().required("Web URL is required"),
  business: Yup.string().required("Please select an Business"),
  constitution: Yup.string().required("Please select an Constitution"),
});
export default function AddCompanyDetails({
  setCurrentpage,
  clientID,
  setClientID,
  addressback,
}) {
  const [enable, setEnable] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    if (clientID && enable == false) {
      setCurrentpage(2);
    } else {
      try {
        const data = await submitClientComapanyData(
          values,
          enable,
          clientID,
          dispatch
        );
        // setModalIsOpen(false);
        toast.success(data?.message);
        setCurrentpage(2);
        // GetOffersData(dispatch);
        console.log(data);
      } catch (error) {
        console.error("Error uploading data", error);
      }
    }
  };
  const [clicompanydata, setCliComapanyData] = useState("");
  const fetchGetUser = async () => {
    try {
      const data = await GetCompanyDetailsById(
        clientID,
        setClientID,
        setCliComapanyData
      );
      setCliComapanyData(data);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  useEffect(() => {
    if (clientID != null || enable || addressback) {
      fetchGetUser();
    }
  }, [clientID, setClientID, setCliComapanyData, enable, addressback]);
  console.log(clicompanydata, "clicompanydata555");
  return (
    <div>
      <div className="border-l-[0.1vw] h-[28vw] overflow-y-scroll px-[2vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.1vw] rounded-[1vw] border-[#1f4b7f]">
        <div className="h-[4vw] w-full flex items-center justify-between ">
          <label className="text-[1.5vw] font-semibold text-[#1f4b7f] ">
            Company Details
          </label>
          {clientID || addressback ? (
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
              company_name: clicompanydata ? clicompanydata?.company_name : "",
              owner_name: clicompanydata ? clicompanydata?.owner_name : "",
              phone: clicompanydata ? clicompanydata?.phone : "",
              emailid: clicompanydata ? clicompanydata?.emailid : "",
              constitution: clicompanydata
                ? clicompanydata?.type_of_constitution
                : "",
              business: clicompanydata
                ? clicompanydata?.business_background
                : "",
              web_url: clicompanydata ? clicompanydata?.web_url : "",
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
                        name="company_name"
                        placeholder="Enter Company Name"
                        value={values.company_name}
                        disabled={
                          clientID || addressback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          clientID || addressback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      />
                      <ErrorMessage
                        name="company_name"
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
                        name="owner_name"
                        placeholder="Enter Owner Name"
                        value={values.owner_name}
                        disabled={
                          clientID || addressback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          clientID || addressback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      />
                      <ErrorMessage
                        name="owner_name"
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
                          value={values.phone}
                          disabled={
                            clientID || addressback
                              ? enable
                                ? false
                                : true
                              : false
                          }
                          className={`${
                            clientID || addressback
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
                        value={values.emailid}
                        disabled={
                          clientID || addressback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          clientID || addressback
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
                  <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Type of Constitution
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        as="select"
                        name="constitution"
                        value={values.constitution}
                        onChange={(e) => {
                          handleChange(e);
                          localStorage.setItem("constitution", e.target.value);
                        }}
                        disabled={
                          clientID || addressback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          clientID || addressback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      >
                        <option
                          label="Select Constitution"
                          value=""
                          className=""
                        />
                        <option
                          label="Proprietorship"
                          value="Proprietorship"
                          className=""
                        />
                        <option
                          label="Partnership"
                          value="Partnership"
                          className=""
                        />
                        <option
                          label="Private Limited"
                          value="Private Limited"
                          className=""
                        />
                        <option
                          label="Public Sector"
                          value="Public Sector"
                          className=""
                        />
                      </Field>
                      <ErrorMessage
                        name="constitution"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Type of Business
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        as="select"
                        name="business"
                        value={values.business}
                        onChange={(e) => {
                          handleChange(e);
                          localStorage.setItem("business", e.target.value);
                        }}
                        disabled={
                          clientID || addressback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          clientID || addressback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } custom-dropdown border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      >
                        <option
                          label="Select Constitution"
                          value=""
                          className=""
                        />
                        <option
                          label="Automotive"
                          value="Automotive"
                          className=""
                        />
                        <option
                          label="Beauty and Personal Care"
                          value="Beauty and Personal Care"
                          className=""
                        />
                        <option
                          label="Business Services"
                          value="Business Services"
                          className=""
                        />
                        <option
                          label="Education"
                          value="Education"
                          className=""
                        />
                        <option
                          label="Entertainment and Leisure"
                          value="Entertainment and Leisure"
                          className=""
                        />
                        <option
                          label="Fashion and Apparel"
                          value="Fashion and Apparel"
                          className=""
                        />
                        <option
                          label="Finance and Insurance"
                          value="Finance and Insurance"
                          className=""
                        />
                        <option
                          label="Food and Beverage"
                          value="Food and Beverage"
                          className=""
                        />
                        <option
                          label="Health and Wellness"
                          value="Health and Wellness"
                          className=""
                        />
                        <option
                          label="Home and Garden"
                          value="Home and Garden"
                          className=""
                        />
                        <option
                          label="Real Estate"
                          value="Real Estate"
                          className=""
                        />
                        <option label="Retail" value="Retail" className="" />
                        <option
                          label="Technology"
                          value="Technology"
                          className=""
                        />
                        <option
                          label="Travel and Tourism"
                          value="Travel and Tourism"
                          className=""
                        />
                        <option
                          label="Non-Profit and Community"
                          value="Non-Profit and Community"
                          className=""
                        />
                        <option
                          label="Telecommunications"
                          value="Telecommunications"
                          className=""
                        />
                        <option
                          label="Media and Publishing"
                          value="Media and Publishing"
                          className=""
                        />
                        <option
                          label="Sports and Fitness"
                          value="Sports and Fitness"
                          className=""
                        />
                        <option
                          label="Legal Services"
                          value="Legal Services"
                          className=""
                        />
                        <option
                          label="Consumer Goods"
                          value="Consumer Goods"
                          className=""
                        />
                      </Field>
                      <ErrorMessage
                        name="business"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Web URL
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        type="text"
                        name="web_url"
                        placeholder="Enter Web URL"
                        value={values.web_url}
                        disabled={
                          clientID || addressback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          clientID || addressback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      />
                      <ErrorMessage
                        name="web_url"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                    <div className="col-span-1"></div>
                  </div>

                  <div className="flex items-center justify-between py-[1vw]">
                    <div>
                      <h1 className="text-[#1F4B7F] text-[0.7vw] font-semibold">
                        *You must fill in all fields to be able to continue
                      </h1>
                    </div>
                    <div className="flex items-center gap-x-[1vw]">
                      <button className="border-[#1F487C] w-[5vw] font-semibold text-[1vw] h-[2vw] rounded-full border-r-[0.2vw]  border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw]">
                        Reset
                      </button>
                      <button
                        className="bg-[#1F487C] font-semibold rounded-full w-[10vw] h-[2vw] text-[1vw] text-white"
                        type="submit"
                        // onClick={() => setCurrentpage(2)}
                      >
                        {clientID || addressback
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
