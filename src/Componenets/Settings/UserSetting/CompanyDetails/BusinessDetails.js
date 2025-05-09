import React, { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { SubmitBusinessData } from "../../../../Api/Settings/SystemSettings/CompanyDetails";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Select, ConfigProvider } from "antd";
import {
  GetBusinessList,
  GetCurrencyList,
} from "../../../../Api/UserManagement/SuperAdmin";

const validationSchema = Yup.object().shape({
  constitution: Yup.string().required("Constitution required"),
  business: Yup.string().required("Business required"),
  msme: Yup.string().required("MSME required"),
  service: Yup.string().required("Service required"),
  currency_code: Yup.string().required("Country Code required"),
  msme_number: Yup.string()
    // .matches(
    //   /^([A-Za-z]{2}[0-9]{2}[A-Za-z0-9]{11})?$/,
    //   "MSME number must be in a valid format (e.g., AA1234ABCDE123)"
    // )
    .matches(
      /^[a-zA-Z0-9]{15}$/,
      "MSME number must be 15 characters long and alphanumeric (e.g., ABC123456789012)"
    )
    .required("MSME Number is required"),
});

const BusinessDetails = ({ operatorData }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [CurrencyData, setCurrencyData] = useState([]);
  const [businessData, setBusinessData] = useState([]);

  console.log(operatorData, "operator_data_businessDetails");
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    try {
      const data = await SubmitBusinessData(values, dispatch);
      // setModalIsOpen(false);
      toast.success(data?.message);
      setIsEdit(false);
      console.log(data);
    } catch (error) {
      console.error("Error uploading data", error);
    }
  };

  const defaultBusinessData = {
    value: "",
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
    search: value.label,
  }));
  const getCurrencyOptions = CurrencyData.map((currency) => ({
    value: currency.code,
    label: (
      <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
        {currency.value}
      </div>
    ),
    search: currency.value,
  }));

  const defaultCurrency = {
    value: "",
    label: (
      <div className="text-[1vw] px-[0.2vw] pb-[0.1vw] text-gray-400">
        Select Currency
      </div>
    ),
    disabled: true,
  };

  const businessOptions = [defaultBusinessData, ...getBusinessData];
  const curOption = [defaultCurrency, ...getCurrencyOptions];


  const fetchBusiness = async () => {
    try {
      const curdata = await GetBusinessList();
      setBusinessData(curdata);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCurrency = async () => {
    try {
      const curdata = await GetCurrencyList();
      setCurrencyData(curdata);
      console.log(curdata, "currresponse");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBusiness();
    fetchCurrency();
  }, []);

  return (
    <div>
      <Formik
        initialValues={{
          constitution: operatorData ? operatorData?.type_of_constitution : "",
          business: operatorData ? operatorData?.business_background : "",
          msme: operatorData ? operatorData?.msme_type : "",
          msme_number: operatorData ? operatorData?.msme_number : "",
          service: operatorData ? operatorData?.type_of_service : "",
          currency_code: operatorData ? operatorData?.currency_code : "",
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
          dirty,
        }) => (
          <Form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-[1vw]">
              <div className="  col-span-1">
                <label className="text-[#1F4B7F] text-[1vw] font-bold ">
                  Type of Constitution
                  <span className="text-[1vw] text-red-600 pl-[0.2vw]">*</span>
                </label>
                <div className="relative">
                  <ConfigProvider
                    theme={{
                      components: {
                        Select: {
                          optionActiveBg: "#aebed1",
                          optionSelectedColor: "#FFF",
                          optionSelectedBg: "#aebed1",
                        },
                      },
                    }}
                  >
                    <Select
                      showSearch
                      className={`custom-select border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${
                        isEdit === false ? "cursor-not-allowed" : ""
                      }`}
                      placeholder="Select Constitution"
                      value={values.constitution}
                      onChange={(value) => {
                        setFieldValue("constitution", value);
                      }}
                      disabled={isEdit === false}
                      suffixIcon={
                        <span style={{ fontSize: "1vw", color: "#1f487c" }}>
                          <IoMdArrowDropdown size="2vw" />
                        </span>
                      }
                      options={[
                        { value: "", label: "Select Constitution" },
                        { value: "Proprietorship", label: "Proprietorship" },
                        { value: "Partnership", label: "Partnership" },
                        { value: "Private Limited", label: "Private Limited" },
                        { value: "Public Sector", label: "Public Sector" },
                      ]}
                      optionRender={(item) => (
                        <div>
                          <p
                            style={{
                              color: "#1F487C",
                              fontWeight: 600,
                              margin: 0,
                            }}
                          >
                            {item.label}
                          </p>
                        </div>
                      )}
                    />
                  </ConfigProvider>
                  {/* <MdOutlineModeEditOutline
                                        color='#1F487C'
                                        className='absolute top-[0.75vw] right-[2vw]'
                                        size='1.5vw' /> */}
                  <ErrorMessage
                    name="constitution"
                    component="div"
                    className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                  />
                </div>
              </div>
              <div className=" col-span-1">
                <label className="text-[#1F4B7F] text-[1vw] font-bold ">
                  Business Background
                  <span className="text-[1vw] text-red-600 pl-[0.2vw]">*</span>
                </label>
                <div className="relative">
                  <ConfigProvider
                    theme={{
                      components: {
                        Select: {
                          optionActiveBg: "#aebed1",
                          optionSelectedColor: "#FFF",
                          optionSelectedBg: "#aebed1",
                        },
                      },
                    }}
                  >
                    <Select
                      showSearch
                      className={`custom-select border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${
                        isEdit === false ? "cursor-not-allowed" : ""
                      }`}
                      value={values.business}
                      disabled={isEdit === false}
                      onChange={(value) => {
                        setFieldValue("business", value);
                      }}
                      placeholder="Select Business"
                      suffixIcon={
                        <span style={{ fontSize: "1vw", color: "#1f487c" }}>
                          <IoMdArrowDropdown size="2vw" />
                        </span>
                      }
                      style={{
                        padding: 4,
                      }}
                      options={businessOptions}
                      optionRender={(item) => (
                        <div>
                          <p
                            style={{
                              color: "#1F487C",
                              fontWeight: 600,
                              margin: 0,
                            }}
                          >
                            {item.label}
                          </p>
                        </div>
                      )}
                    />
                  </ConfigProvider>

                  {/* <MdOutlineModeEditOutline
                                        color='#1F487C'
                                        className='absolute top-[0.75vw] right-[2vw]'
                                        size='1.5vw' /> */}
                  <ErrorMessage
                    name="business"
                    component="div"
                    className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                  />
                </div>
              </div>
              <div className="relative col-span-1 ">
                <label className="text-[#1F4B7F] text-[1vw] font-bold ">
                  MSME Type{" "}
                  <span className="text-[1vw] text-red-600 pl-[0.2vw]">*</span>
                </label>
                <div className="relative">
                  <ConfigProvider
                    theme={{
                      components: {
                        Select: {
                          optionActiveBg: "#aebed1",
                          optionSelectedColor: "#FFF",
                          optionSelectedBg: "#aebed1",
                        },
                      },
                    }}
                  >
                    <Select
                      showSearch
                      className={`custom-select border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${
                        isEdit === false ? "cursor-not-allowed" : ""
                      }`}
                      placeholder="Select MSME"
                      value={values.msme}
                      onChange={(value) => {
                        setFieldValue("msme", value);
                      }}
                      disabled={isEdit === false}
                      suffixIcon={
                        <span style={{ fontSize: "1vw", color: "#1f487c" }}>
                          <IoMdArrowDropdown size="2vw" />
                        </span>
                      }
                      options={[
                        { value: "", label: "Select MSME" },
                        { value: "Micro", label: "Micro" },
                        { value: "Small", label: "Small" },
                        { value: "Medium", label: "Medium" },
                        { value: "Enterprises", label: "Enterprises" },
                      ]}
                      optionRender={(item) => (
                        <div>
                          <p
                            style={{
                              color: "#1F487C",
                              fontWeight: 600,
                              margin: 0,
                            }}
                          >
                            {item.label}
                          </p>
                        </div>
                      )}
                    />
                  </ConfigProvider>

                  {/* <MdOutlineModeEditOutline
                                        color='#1F487C'
                                        className='absolute top-[0.75vw] right-[2vw]'
                                        size='1.5vw' /> */}
                  <ErrorMessage
                    name="msme"
                    component="div"
                    className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                  />
                </div>
              </div>
              <div className="relative col-span-1">
                <label className="text-[#1F4B7F] text-[1vw] font-bold ">
                  MSME Number
                  <span className="text-[1vw] text-red-600 pl-[0.2vw]">*</span>
                </label>
                <div className="relative">
                  <Field
                    type="text"
                    name="msme_number"
                    placeholder="Enter MSME Number"
                    className={`border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${
                      isEdit === false ? "cursor-not-allowed" : ""
                    }`}
                    disabled={isEdit === false}
                    // value={values.firstname}
                  />
                  {/* <MdOutlineModeEditOutline
                                        color='#1F487C'
                                        className='absolute top-[0.75vw] right-[1vw]'
                                        size='1.5vw' /> */}
                  <ErrorMessage
                    name="msme_number"
                    component="div"
                    className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                  />
                </div>
              </div>
              <div className="relative col-span-1">
                <label className="text-[#1F4B7F] text-[1vw] font-bold ">
                  Type Of Service
                  <span className="text-[1vw] text-red-600 pl-[0.2vw]">*</span>
                </label>
                <div className="relative">
                  <ConfigProvider
                    theme={{
                      components: {
                        Select: {
                          optionActiveBg: "#aebed1",
                          optionSelectedColor: "#FFF",
                          optionSelectedBg: "#aebed1",
                        },
                      },
                    }}
                  >
                    <Select
                      showSearch
                      className={`custom-select border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${
                        isEdit === false ? "cursor-not-allowed" : ""
                      }`}
                      placeholder="Select Service"
                      value={values.service}
                      onChange={(value) => {
                        setFieldValue("service", value);
                      }}
                      disabled={isEdit === false}
                      suffixIcon={
                        <span style={{ fontSize: "1vw", color: "#1f487c" }}>
                          <IoMdArrowDropdown size="2vw" />
                        </span>
                      }
                      options={[
                        { value: "", label: "Select Service" },
                        { value: "Inter State", label: "Inter State" },
                        { value: "Intra State", label: "Intra State" },
                      ]}
                      optionRender={(item) => (
                        <div>
                          <p
                            style={{
                              color: "#1F487C",
                              fontWeight: 600,
                              margin: 0,
                            }}
                          >
                            {item.label}
                          </p>
                        </div>
                      )}
                    />
                  </ConfigProvider>

                  {/* <MdOutlineModeEditOutline
                                        color='#1F487C'
                                        className='absolute top-[0.75vw] right-[2vw]'
                                        size='1.5vw' /> */}
                  <ErrorMessage
                    name="service"
                    component="div"
                    className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                  />
                </div>
              </div>
              <div className="relative col-span-1">
                <label className="text-[#1F4B7F] text-[1vw] font-bold ">
                  Currency Code
                  <span className="text-[1vw] text-red-600 pl-[0.2vw]">*</span>
                </label>
                <div className="relative">
                  <ConfigProvider
                    theme={{
                      components: {
                        Select: {
                          optionActiveBg: "#aebed1",
                          optionSelectedColor: "#FFF",
                          optionSelectedBg: "#aebed1",
                        },
                      },
                    }}
                  >
                    <Select
                      showSearch
                      className={`custom-select border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${
                        isEdit === false ? "cursor-not-allowed" : ""
                      }`}
                      placeholder="Select Currency Code"
                      value={values.currency_code}
                      onChange={(value) => {
                        setFieldValue("currency_code", value);
                      }}
                      disabled={isEdit === false}
                      suffixIcon={
                        <span style={{ fontSize: "1vw", color: "#1f487c" }}>
                          <IoMdArrowDropdown size="2vw" />
                        </span>
                      }
                      options={curOption}
                      optionRender={(item) => (
                        <div>
                          <p
                            style={{
                              color: "#1F487C",
                              fontWeight: 600,
                              margin: 0,
                            }}
                          >
                            {item.label}
                          </p>
                        </div>
                      )}
                    />
                  </ConfigProvider>

                  {/* <MdOutlineModeEditOutline
                                        color='#1F487C'
                                        className='absolute top-[0.75vw] right-[2vw]'
                                        size='1.5vw' /> */}
                  <ErrorMessage
                    name="currency_code"
                    component="div"
                    className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center pt-[2vw] pb-[0.5vw]">
              {isEdit === false ? (
                <div
                  onClick={() => setIsEdit(true)}
                  className="cursor-pointer text-white bg-[#1F4B7F] px-[2vw] gap-[0.5vw] py-[0.5vw] rounded-[0.7vw] w-[12vw] text-center"
                >
                  Edit
                </div>
              ) : (
                <button
                  type="submit"
                  className="text-white bg-[#1F4B7F] px-[2vw] gap-[0.5vw] py-[0.5vw] rounded-[0.7vw] w-[12vw]"
                >
                  Update
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BusinessDetails;
