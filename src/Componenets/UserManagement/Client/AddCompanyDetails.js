import { ConfigProvider, Progress, Select, Upload } from "antd";
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
  GetClientProfile,
  GetCompanyDetailsById,
  submitClientComapanyData,
} from "../../../Api/UserManagement/Client";
import "../../../App.css";
import { FaUpload } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { GetBusinessList } from "../../../Api/UserManagement/SuperAdmin";

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
  // company_logo: Yup.mixed()
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
export default function AddCompanyDetails({
  setCurrentpage,
  clientID,
  setClientID,
  addressback,
  client_id,
  setClient_Id,
  fileList,
  profileImage,
  setProfileImage,
  updatedata,
  setEnableUpload,
}) {
  const [enable, setEnable] = useState(false);
  // const [profileImage, setProfileImage] = useState("");
  const [draggerImage, setDraggerImage] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [currentId,setCurrentId] = useState("")
  const [businessData,setBusinessData] = useState([])
  const [clicompanydata, setCliComapanyData] = useState({
    company_name: "",
    owner_name: "",
    phone: "",
    emailid: "",
    type_of_constitution: "",
    business_background: "",
    web_url: "",
    company_logo: "",
  });

  const dispatch = useDispatch();

console.log(addressback,clientID,enable,"backbafdkfsdkf");


  const handleSubmit = async (values) => {
    console.log(values,"clientvalues");
    
    if (clientID && enable == false) {
      setCurrentpage(2);
    } else {
      try {
        const data = await submitClientComapanyData(
          values,
          enable,
          clientID,
          dispatch,
          fileList,
          setCurrentId,
          currentId,
          setClientID
        );
        // setModalIsOpen(false);
        toast.success(data?.message);
        setCurrentpage(2);
        setClient_Id(data?.id);
        GetClientProfile(clientID, dispatch);
        // GetOffersData(dispatch);
        console.log(data, "Comapny data");
        setEnable(!enable);
      } catch (error) {
        console.error("Error uploading data", error);
      }
    }
    setCliComapanyData({
      company_name: values.company_name,
      owner_name: values.owner_name,
      phone: values.phone,
      emailid: values.emailid,
      type_of_constitution: values.constitution,
      business_background: values.business,
      web_url: values.web_url,
      company_logo: values.company_logo,
    });
    setEnableUpload(true);
  };

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
  const fetchBusiness = async () =>{
    try{
      const curdata = await GetBusinessList()
      setBusinessData(curdata)
    }
    catch(err){
      console.log(err);
      
    }
  }


  const defaultBusinessData = {
    value: '',
    label: (
      <div className="text-[1vw] px-[0.2vw] pb-[0.1vw] text-gray-400">
        Select Business
      </div>
    ),
    disabled: true,
  };
  const getBusinessData = businessData.map((value) =>({
    value: value.value,
    label: (
      <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
        {value.label}
      </div>
    ),
    search:value.label

  }))

  const businessOptions = [defaultBusinessData,...getBusinessData]

  useEffect(() => {
    if (clientID != null || enable || addressback) {
      fetchGetUser();
    }
    fetchBusiness()
  }, [clientID, setClientID, setCliComapanyData, enable, addressback]);

  console.log(clicompanydata, "clicompanydata555");

  const { Dragger } = Upload;

  return (
    <div>
      <div className="border-l-[0.1vw] h-[28vw] umselect  px-[2vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.1vw] rounded-[1vw] border-[#1f4b7f] mt-[1.5vw]">
        <div className="h-[4vw] w-full flex items-center justify-between ">
          <label className="text-[1.5vw] font-semibold text-[#1f4b7f] ">
            Company Details
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
                setEnableUpload(false);
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
              company_logo: clicompanydata ? clicompanydata?.company_logo : "",
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
              touched,
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className="gap-y-[1.5vw] flex-col flex">
                  <div className="overflow-y-auto h-[18.3vw] gap-y-[1.5vw] flex-col flex pb-[1vw]">
                  <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                    <div className="col-span-1 relative">
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
                        name="company_name"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw] left-[.2vw]"
                      />
                    </div>
                    <div className="col-span-1 relative">
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
                        name="owner_name"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw] left-[.2vw]"
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
                      </div>
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw] left-[.2vw]"
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
                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw] left-[.2vw]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                    <div className="col-span-1 relative">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Type of Constitution
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      {/* <Field
                        as="select"
                        name="constitution"
                        value={values.constitution}
                        onChange={(e) => {
                          handleChange(e);
                          sessionStorage.setItem("constitution", e.target.value);
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
                      </Field> */}
                          <ConfigProvider
                        theme={{
                          components: {
                            Select: {
                              optionActiveBg: '#aebed1',
                              optionSelectedColor: '#FFF',
                              optionSelectedBg: '#aebed1',
                              optionHeight: '2',
                            },
                          },
                        }}
                      >
                        <Select
                          showSearch
                          value={values.constitution}
                          onChange={(value) => {
                            handleChange({ target: { name: 'constitution', value } })
                          }}
                          disabled={
                            updatedata || addressback
                              ? enable
                                ? false
                                : true
                              : false
                          }
                          name="constitution"
                          className={`${updatedata || addressback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                            } custom-select bg-white border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                          // className="custom-select bg-white outline-none w-full mt-[0.5vw] h-[3vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-xl border-r-[0.2vw] border-b-[0.2vw] placeholder-[#1F487C]"
                          placeholder="Select constitution"
                          filterOption={(input, option) => 
                            option?.value?.toLowerCase()?.includes(input.toLowerCase()) // Make it case-insensitive
                          }
                          optionFilterProp="value"
                          suffixIcon={<span style={{ fontSize: '1vw', color: '#1f487c' }}>
                            <IoMdArrowDropdown size="2vw" />
                          </span>}
                          style={{ padding: 4 }}
                          options={[
                            {
                              value: '',
                              label: (
                                <div className="text-[1vw] px-[0.2vw] pb-[0.1vw] text-gray-400">
                                  Select Constitution
                                </div>
                              ),
                              disabled: true,
                            },
                            {
                              value: 'Proprietorship',
                              label: (
                                <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                  Proprietorship
                                </div>
                              ),
                            },
                            {
                              value: 'Partnership',
                              label: (
                                <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                  Partnership
                                </div>
                              ),
                            },
                            {
                              value: 'Private Limited',
                              label: (
                                <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                  Private Limited
                                </div>
                              ),
                            },
                            {
                              value: 'Public Sector',
                              label: (
                                <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                  Public Sector
                                </div>
                              ),
                            },
                          ]}
                              
                        />
                      </ConfigProvider>
                      <ErrorMessage
                        name="constitution"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw] left-[.2vw]"
                      />
                    </div>
                    <div className="col-span-1 relative">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Type of Business
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      {/* <Field
                        as="select"
                        name="business"
                        value={values.business}
                        onChange={(e) => {
                          handleChange(e);
                          sessionStorage.setItem("business", e.target.value);
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
                      </Field> */}
                         <ConfigProvider
                        theme={{
                          components: {
                            Select: {
                              optionActiveBg: '#aebed1',
                              optionSelectedColor: '#FFF',
                              optionSelectedBg: '#aebed1',
                              optionHeight: '2',
                            },
                          },
                        }}
                      >
                        <Select
                          showSearch
                          value={values.business}
                          onChange={(value) => {
                            handleChange({ target: { name: 'business', value } })
                          }}
                          disabled={
                            updatedata || addressback
                              ? enable
                                ? false
                                : true
                              : false
                          }
                          name="business"
                          className={`${updatedata || addressback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                            } custom-select bg-white border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                          // className="custom-select bg-white outline-none w-full mt-[0.5vw] h-[3vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-xl border-r-[0.2vw] border-b-[0.2vw] placeholder-[#1F487C]"
                          placeholder="Select business"
                          filterOption={(input, option) => 
                            option?.value?.toLowerCase()?.includes(input.toLowerCase()) // Make it case-insensitive
                          }
                          optionFilterProp="value"
                          suffixIcon={<span style={{ fontSize: '1vw', color: '#1f487c' }}>
                            <IoMdArrowDropdown size="2vw" />
                          </span>}
                          style={{ padding: 4 }}
                          options={businessOptions}                  
                              
                        />
                      </ConfigProvider>
                      <ErrorMessage
                        name="business"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw] left-[.2vw]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                    <div className="col-span-2 relative">
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
                        name="web_url"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw] left-[.2vw]"
                      />
                    </div>
                  </div>
                  </div>

                  <div className="flex items-center justify-between  relative">
                    {updatedata
                      ? " "
                      : profileImage === false && (
                          <div className="text-red-700 text-[.7vw] top-[-.3vw] absolute">
                            * Profile Image is required
                          </div>
                        )}

                    <div>
                      <h1 className="text-[#1F4B7F] text-[0.7vw] font-semibold">
                        *You must fill in all fields to be able to continue
                      </h1>
                    </div>
                    <div className="flex items-center gap-x-[1vw]">
                      <button type="button" onClick={resetForm} className="border-[#1F487C] w-[5vw] font-semibold text-[1vw] h-[2vw] rounded-full border-r-[0.2vw]  border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw]">
                        Reset
                      </button>
                      <button
                        className="bg-[#1F487C] font-semibold rounded-full w-[10vw] h-[2vw] text-[1vw] text-white"
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
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
