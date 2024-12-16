import { ConfigProvider, Popover, Progress, Select, Spin, Tooltip } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import * as Yup from "yup";
import {
  GetBusinessList,
  GetCurrencyList,
  GetSuperAdminBusinessById,
  SubmitBusinessData,
} from "../../../Api/UserManagement/SuperAdmin";
import { toast } from "react-toastify";
import umbuslogo from "../../../asserts/umbuslogo.png"
import { useDispatch } from "react-redux";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { BsExclamationCircle } from "react-icons/bs";

const validationSchema = Yup.object().shape({
  constitution: Yup.string().required("Constitution required"),
  business: Yup.string().required("Business required"),
  msme: Yup.string().required("MSME required"),
  service: Yup.string().required("Service required"),
  currency_code: Yup.string().required("Currency Code required"),
  msme_number: Yup.string()
    // .matches(
    //   /^([A-Za-z]{2}[0-9]{2}[A-Za-z0-9]{11})?$/,
    //   "MSME number must be in a valid format (e.g., AA1234ABCDE123)"
    // )
    .matches(
      /^[a-zA-Z0-9]{15}$/,
      "Format should be (e.g : ABC123456789012)"
    )
    .required("MSME Number is required"),
});
export default function AddBusinessDetails({
  setCurrentpage,
  SPA_ID,
  operatorID,
  superadmindata,
  setOperatorID,
  setBusinessBack,
  businessback,
  documentback,
  setDocumentBack,
  updatedata
}) {
  const dispatch = useDispatch();
  const [spinning, setSpinning] = useState(false);
  const handleSubmit = async (values) => {
    if (operatorID && enable == false && documentback == true || updatedata && superadminbusinessdata.msme_number !=null && enable == false) {
      setCurrentpage(4);
    } else {
      try {
        const data = await SubmitBusinessData(
          values,
          operatorID,
          enable,
          dispatch
        );
        // setModalIsOpen(false);
        toast.success(data?.message);
        setCurrentpage(4);
        // GetOffersData(dispatch);
        console.log(data);
      } catch (error) {
        console.error("Error uploading data", error);
      }
    }
  };
  const [superadminbusinessdata, setSuperAdminBusinessData] = useState("");
  const [CurrencyData, setCurrencyData] = useState([])
  const [businessData, setBusinessData] = useState([])
  const [enable, setEnable] = useState(false);

  const fetchGetUser = async () => {
    try {
      const data = await GetSuperAdminBusinessById(
        operatorID,
        setOperatorID,
        setSuperAdminBusinessData,
        setSpinning
      );
      setSuperAdminBusinessData(data);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };
  const fetchCurrency = async () => {
    try {
      const curdata = await GetCurrencyList()
      setCurrencyData(curdata)
      console.log(curdata, "currresponse");
    }
    catch (err) {
      console.log(err);

    }
  }

  const fetchBusiness = async () => {
    try {
      const curdata = await GetBusinessList()
      setBusinessData(curdata)
    }
    catch (err) {
      console.log(err);

    }
  }

  useEffect(() => {
    if (operatorID != null || enable || documentback) {
      fetchGetUser();
      setSpinning(true)
    }
    fetchCurrency()
    fetchBusiness()
  }, [
    operatorID,
    setOperatorID,
    setSuperAdminBusinessData,
    // enable,
    documentback,
  ]);

  // const tooltipContent = (

  // );
  const defaultBusinessData = {
    value: '',
    label: (
      <div className="text-[1vw] px-[0.2vw] pb-[0.1vw] text-gray-400">
        Select Business
      </div>
    ),
    disabled: true,
  };
  const getBusinessData = businessData.map((value) => ({
    value: value.value,
    label: (
      <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C] text-wrap">
       {/* {value?.label?.length > 50 ?
       <Popover title={value.lebel}>{value.label.slice(0,50)+"..."}</Popover>:<span>{value.label}</span>}  */}
       {value.label}
      </div>
    ),
    search: value.label 

  }))

  const businessOptions = [defaultBusinessData, ...getBusinessData]


  const getCurrencyOptions = CurrencyData.map(currency => ({
    value: currency.code,
    label: (
      <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
        {currency.value}
      </div>
    ),
    search: currency.value
  }));

  const defaultCurrency = {
    value: '',
    label: (
      <div className="text-[1vw] px-[0.2vw] pb-[0.1vw] text-gray-400">
        Select Currency
      </div>
    ),
    disabled: true,
  };
  

  const curOption = [defaultCurrency, ...getCurrencyOptions]
  const services = [
    { title: "Transportation Services", description: "Providing safe and reliable bus travel for local, intercity, and interstate routes." },
    { title: "Travel and Tourism", description: "Offering scenic and guided bus tours for leisure travelers and tourists." },
    { title: "Logistics and Mobility", description: "Managing the transport of goods and parcels through dedicated bus cargo services." },
    { title: "Technology and Aggregation Platforms", description: "Providing online platforms and apps for bus ticket booking, route tracking, and seat selection." },
    { title: "Corporate and Employee Transportation", description: "Offering dedicated bus services for corporate employees and business events." },
    { title: "Luxury and Charter Services", description: "Providing premium charter buses for weddings, tours, and private group travel." },
    { title: "Urban and Public Transit", description: "Operating public buses to serve daily commuters in urban and suburban areas." },
    { title: "Educational and Institutional Transport", description: "Offering school and college bus services for safe student transportation." },
    { title: "Sustainability and Green Mobility", description: "Implementing electric or hybrid buses to promote eco-friendly travel." },
  ];

  const typeofservice =[
    { title: "Interstate Bus Travel", description: "Buses travel between different states, focusing on long-distance routes." },
    { title: "Intrastate Bus Travel", description: "Buses operate within a single state, focusing on shorter routes." },
  ]

  return (
    <div>
      <div className="umselect border-l-[0.1vw] px-[2vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.1vw] rounded-[1vw] border-[#1f4b7f] mt-[1vw] relative">
        <div className="w-[5vw] h-[5vw] bg-white shadow-lg rounded-full absolute left-[16.6vw] top-[-2.5vw] flex justify-center items-center"><img className="" src={umbuslogo} alt="buslogo" /></div>
        <div className="h-[4vw] w-full flex items-center justify-between ">
          <label className="text-[1.5vw] font-semibold text-[#1f4b7f] ">
            Business Details
          </label>
          {updatedata && superadminbusinessdata.msme_number !=null || documentback ? (
            <button
              className={`${enable
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
              constitution: superadminbusinessdata.type_of_constitution || "",
              business: superadminbusinessdata.business_background || "",
              msme: superadminbusinessdata.msme_type || "",
              msme_number: superadminbusinessdata.msme_number || "",
              service: superadminbusinessdata.type_of_service || "",
              currency_code: superadminbusinessdata.currency_code || "",
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
                {spinning ? (
                  <div className=" flex justify-center h-[23vw] items-center">
                    <Spin size="large" />
                  </div>
                ) : (
                  <div className="gap-y-[1.5vw] flex-col flex">
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
                        id="constitution"
                        value={values.constitution}
                        disabled={
                          updatedata || documentback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          updatedata || documentback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      >
                        <option label="Select State" value="" className="" />
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
                          <input
                            type="text"
                            name="constitution"
                            style={{ display: "none" }}
                          />
                          <Select
                            showSearch
                            value={values.constitution}
                            autoComplete="constitution-field"
                            onChange={(value) => {
                              handleChange({ target: { name: 'constitution', value } })
                            }}
                            disabled={
                              updatedata && superadminbusinessdata.msme_number !=null || documentback
                                ? enable
                                  ? false
                                  : true
                                : false
                            }
                            name="constitution"
                            listHeight={190}
                            className={`${updatedata && superadminbusinessdata.msme_number !=null || documentback
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
                          className="text-red-500 text-[0.8vw] absolute left-[.2vw] bottom-[-1.2vw]"
                        />
                      </div>
                      <div className="col-span-1 relative business-inp">
                        <label className="text-[#1F4B7F] text-[1.1vw] ">
                          Business Background
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                            *
                          </span>
                          <span className="ml-[.5vw] inline-block cursor-pointer text-[#1F4B7F] text-[1vw] align-text-bottom"><Popover color="white" title={<div className="w-[28vw] text-[#1F4B7F] p-[1vw] max-h-[20vw] overflow-auto ">
                            {services.map((service, index) => (
                              <div key={index} className="flex flex-col mb-[1vw]">
                                <ul className="pl-[1vw]" style={{ listStyleType: 'disc' }}>
                                <li className="font-bold text-[.8vw]">{service.title}</li></ul>
                                <span className="text-[.7vw] pl-[1vw] ">{service.description}</span>
                              </div>
                            ))}
                          </div>} placement="left"><BsExclamationCircle /></Popover></span>
                        </label>
                        {/* <Field
                        as="select"
                        name="business"
                        id="business"
                        value={values.business}
                        disabled={
                          updatedata || documentback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          updatedata || documentback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      >
                        <option label="Select Business" value="" className="" />
                        <option
                          label="Tours & Travels"
                          value="Tours & Travels"
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
                               <input
                          type="text"
                          name="business"
                          style={{ display: "none" }}
                        />
                          <Select
                            showSearch
                            value={values?.business?.length > 23 ? values?.business?.slice(0,23)+"...": values?.business}
                              autoComplete="business-field"
                            onChange={(value) => {
                              handleChange({ target: { name: 'business', value } })
                            }}
                            disabled={
                              updatedata && superadminbusinessdata.msme_number !=null || documentback
                                ? enable
                                  ? false
                                  : true
                                : false
                            }
                            name="business"
                            id="business"
                            listHeight={190}
                            filterOption={(input, option) =>
                              option?.value?.toLowerCase()?.includes(input.toLowerCase()) // Make it case-insensitive
                            }
                            className={`${updatedata  && superadminbusinessdata.msme_number !=null || documentback
                              ? enable == false
                                ? " cursor-not-allowed"
                                : ""
                              : ""
                              } custom-select bg-white border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                            // className="custom-select bg-white outline-none w-full mt-[0.5vw] h-[3vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-xl border-r-[0.2vw] border-b-[0.2vw] placeholder-[#1F487C]"
                            placeholder="Select business"
                            optionFilterProp="value"
                            suffixIcon={<span style={{ fontSize: '1vw', color: '#1f487c' }}>
                              <IoMdArrowDropdown size="2vw" />
                            </span>}
                            style={{ padding: 4,color:"#1F487C" }}
                            options={businessOptions}

                          />
                        </ConfigProvider>
                        <ErrorMessage
                          name="business"
                          component="div"
                          className="text-red-500 text-[0.8vw] absolute left-[.2vw] bottom-[-1.2vw]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                      <div className="col-span-1 relative ">
                        <label className="text-[#1F4B7F] text-[1.1vw] ">
                          MSME Type{" "}
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                            *
                          </span>
                        </label>
                        {/* <Field
                        as="select"
                        name="msme"
                        id="business"
                        value={values.msme}
                        disabled={
                          updatedata || documentback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          updatedata || documentback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      >
                        <option label="Select MSME" value="" className="" />
                        <option label="Micro" value="Micro" className="" />
                        <option label="Small" value="Small" className="" />
                        <option label="Medium" value="Medium" className="" />
                        <option
                          label="Enterprises"
                          value="Enterprises"
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
                               <input
                          type="text"
                          name="msme"
                          style={{ display: "none" }}
                        />
                          <Select
                            showSearch
                            value={values.msme}
                            autoComplete="msme-field"
                            onChange={(value) => {
                              handleChange({ target: { name: 'msme', value } })
                            }}
                            disabled={
                              updatedata && superadminbusinessdata.msme_number !=null || documentback
                                ? enable
                                  ? false
                                  : true
                                : false
                            }
                            name="msme"
                            listHeight={190}
                            className={`${updatedata && superadminbusinessdata.msme_number !=null || documentback
                              ? enable == false
                                ? " cursor-not-allowed"
                                : ""
                              : ""
                              } custom-select bg-white border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                            // className="custom-select bg-white outline-none w-full mt-[0.5vw] h-[3vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-xl border-r-[0.2vw] border-b-[0.2vw] placeholder-[#1F487C]"
                            placeholder="Select msme"
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
                                    Select MSME
                                  </div>
                                ),
                                disabled: true,
                              },
                              {
                                value: 'Micro',
                                label: (
                                  <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                    Micro
                                  </div>
                                ),
                              },
                              {
                                value: 'Small',
                                label: (
                                  <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                    Small
                                  </div>
                                ),
                              },
                              {
                                value: 'Medium',
                                label: (
                                  <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                    Medium
                                  </div>
                                ),
                              },
                              {
                                value: 'Enterprises',
                                label: (
                                  <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                    Enterprises
                                  </div>
                                ),
                              },
                            ]}


                          />
                        </ConfigProvider>
                        <ErrorMessage
                          name="msme"
                          component="div"
                          className="text-red-500 text-[0.8vw] absolute left-[.2vw] bottom-[-1.2vw]"
                        />
                      </div>
                      <div className="col-span-1 relative">
                        <label className="text-[#1F4B7F] text-[1.1vw] ">
                          MSME Number
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="msme_number"
                          style={{ display: "none" }}
                        />
                        <Field
                          type="text"
                          name="msme_number"
                          autoComplete="off"
                          // autoComplete="msme_number-field"
                          onChange={(e) => setFieldValue("msme_number", e.target.value?.toUpperCase())}
                          placeholder="Enter MSME Number"

                          // value={values.firstname}
                          disabled={
                            updatedata && superadminbusinessdata.msme_number !=null || documentback
                              ? enable
                                ? false
                                : true
                              : false
                          }
                          className={`${updatedata && superadminbusinessdata.msme_number !=null || documentback
                              ? enable == false
                                ? " cursor-not-allowed"
                                : ""
                              : ""
                            } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                        />
                        <ErrorMessage
                          name="msme_number"
                          component="div"
                          className="text-red-500 text-[0.8vw] absolute left-[.2vw] bottom-[-1.2vw]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                      <div className="col-span-1 relative">
                        <label className="text-[#1F4B7F] text-[1.1vw] ">
                          Type Of Service
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                            *
                          </span>
                          <span className="ml-[.5vw] inline-block  cursor-pointer text-[#1F4B7F] text-[1vw] align-text-bottom"><Popover title={<div className="text-[#1F4B7F] w-[25vw] p-[1vw]">
                            {typeofservice.map((service, index) => (
                             <div key={index} className="flex flex-col my-[.5vw]">
                             <ul className="pl-[1vw]" style={{ listStyleType: 'disc' }}>
                             <li className="font-bold text-[.8vw]">{service.title}</li></ul>
                             <span className="text-[.7vw] pl-[1vw] ">{service.description}</span>
                           </div>
                            ))}
                          </div>} placement="left"><BsExclamationCircle className="" /></Popover></span>
                        </label>
                        {/* <Field
                        as="select"
                        name="service"
                        id="service"
                        value={values.service}
                        disabled={
                          updatedata || documentback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          updatedata || documentback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      >
                        <option label="Select Service" value="" className="" />
                        <option label="Tirupur" value="Tirupur" className="" />
                        <option
                          label="Inter State"
                          value="Inter State"
                          className=""
                        />
                        <option
                          label="Intra State"
                          value="Intra State"
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
                          <input
                          type="text"
                          name="service"
                          style={{ display: "none" }}
                        />
                          <Select
                            showSearch
                            autoComplete="service-field"
                            value={values.service}
                            onChange={(value) => {
                              handleChange({ target: { name: 'service', value } })
                            }}
                            disabled={
                              updatedata && superadminbusinessdata.msme_number !=null || documentback
                                ? enable
                                  ? false
                                  : true
                                : false
                            }
                            name="service"
                            listHeight={120}
                            placement="topRight"
                            className={`${updatedata && superadminbusinessdata.msme_number !=null || documentback
                              ? enable == false
                                ? " cursor-not-allowed"
                                : ""
                              : ""
                              } custom-select bg-white border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                            // className="custom-select bg-white outline-none w-full mt-[0.5vw] h-[3vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-xl border-r-[0.2vw] border-b-[0.2vw] placeholder-[#1F487C]"
                            placeholder="Select service"
                            filterOption={(input, option) =>
                              option?.value?.toLowerCase()?.includes(input.toLowerCase()) // Make it case-insensitive
                            }
                            optionFilterProp="value"
                            suffixIcon={<span style={{ fontSize: '1vw', color: '#1f487c' }}>
                              <IoMdArrowDropup size="2vw" />
                            </span>}
                            style={{ padding: 4 }}
                            // options={[
                            //   {
                            //     value: '',
                            //     label: (
                            //       <div className="text-[1vw] px-[0.2vw] pb-[0.1vw] text-gray-400">
                            //         Select MSME
                            //       </div>
                            //     ),
                            //     disabled: true,
                            //   },
                            //   {
                            //     value: 'Micro',
                            //     label: (
                            //       <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                            //         Micro
                            //       </div>
                            //     ),
                            //   },
                            //   {
                            //     value: 'Small',
                            //     label: (
                            //       <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                            //         Small
                            //       </div>
                            //     ),
                            //   },
                            //   {
                            //     value: 'Medium',
                            //     label: (
                            //       <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                            //         Medium
                            //       </div>
                            //     ),
                            //   },
                            //   {
                            //     value: 'Enterprises',
                            //     label: (
                            //       <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                            //         Enterprises
                            //       </div>
                            //     ),
                            //   },
                            // ]}
                            options={[
                              {
                                value: '',
                                label: (
                                  <div className="text-[1vw] px-[0.2vw] pb-[0.1vw] text-gray-400">
                                    Select Service
                                  </div>
                                ),
                                disabled: true,
                              },
                              {
                                value: 'Inter State',
                                label: (
                                  <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                    Inter State
                                  </div>
                                ),
                              },
                              {
                                value: 'Intra State',
                                label: (
                                  <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                    Intra State
                                  </div>
                                ),
                              },
                            ]}
                          />
                        </ConfigProvider>
                        <ErrorMessage
                          name="service"
                          component="div"
                          className="text-red-500 text-[0.8vw] absolute left-[.2vw] bottom-[-1.2vw]"
                        />
                      </div>
                      <div className="col-span-1 relative ">
                        <label className="text-[#1F4B7F] text-[1.1vw] ">
                          Currency Code
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                            *
                          </span>
                        </label>
                        {/* <Field
                        as="select"
                        name="country_code"
                        id="country_code"
                        value={values.country_code}
                        disabled={
                          updatedata || documentback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          updatedata || documentback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      >
                        <option
                          label="Select Country Code"
                          value=""
                          className=""
                        />
                        <option label="India" value="India" className="" />
                        <option label="America" value="America" className="" />
                        <option
                          label="Australia"
                          value="Australia"
                          className=""
                        />
                        <option
                          label="Malasiya"
                          value="Malasiya"
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
                              searchInput: {
                                color: '#1f487c',  // Set the search text color here
                              },
                            },
                          }}
                        >
                             <input
                          type="text"
                          name="currency_code"
                          style={{ display: "none" }}
                        />
                          <Select
                            showSearch
                            value={values.currency_code}
                            autoComplete="currency_code-field"
                            onChange={(value) => {
                              handleChange({ target: { name: 'currency_code', value } })
                            }}
                            disabled={
                              updatedata && superadminbusinessdata.msme_number !=null || documentback
                                ? enable
                                  ? false
                                  : true
                                : false
                            }
                            name="currency_code"
                            listHeight={190}
                             placement="topRight"
                            className={`${updatedata && superadminbusinessdata.msme_number !=null || documentback
                              ? enable == false
                                ? " cursor-not-allowed"
                                : ""
                              : ""
                              } custom-select bg-white border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                            // className="custom-select bg-white outline-none w-full mt-[0.5vw] h-[3vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-xl border-r-[0.2vw] border-b-[0.2vw] placeholder-[#1F487C]"
                            placeholder="Select country code"
                            optionFilterProp="search"
                            filterOption={(input, option) =>
                              option?.search?.toLowerCase()?.includes(input.toLowerCase()) // Make it case-insensitive
                            }
                            suffixIcon={<span style={{ fontSize: '1vw', color: '#1f487c' }}>
                              <IoMdArrowDropup size="2vw" />
                            </span>}
                            style={{ padding: 4, color: "#1f487c" }}
                            options={curOption}

                          />
                        </ConfigProvider>
                        <ErrorMessage
                          name="currency_code"
                          component="div"
                          className="text-red-500 text-[0.8vw] absolute left-[.2vw] bottom-[-1.2vw]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between py-[1vw]">
                      <div>
                        <h1 className="text-[#1F4B7F] text-[0.7vw] font-semibold">
                          *You must fill in all fields to be able to continue
                        </h1>
                      </div>
                      <div className="flex items-center gap-x-[1vw]">
                        <button
                          className="border-[#1F487C] w-[5vw] font-semibold text-[1vw] h-[2vw] rounded-full border-r-[0.2vw]  border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw]"
                          onClick={() => {
                            setCurrentpage(2);
                            setBusinessBack(true);
                          }}
                        >
                          Back
                        </button>
                        <button
                          className="bg-[#1F487C] font-semibold rounded-full w-[11vw] h-[2vw] text-[1vw] text-white"
                          type="submit"
                        // onClick={() => setCurrentpage(4)}
                        >
                          {updatedata && superadminbusinessdata.msme_number !=null || documentback
                            ? enable
                              ? "Update & Continue"
                              : "Continue"
                            : "Continue"}{" "}
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
