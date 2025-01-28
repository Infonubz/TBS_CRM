import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  GetCompanySetting,
  GetCompanyDataById,
  SubmitCompanySetting,
} from "../../../Api/Settings/SystemSettings/CompanySettings";
import dayjs from "dayjs";
import { IoMdArrowDropdown } from "react-icons/io";
import { ConfigProvider, Select } from "antd";
import { GetCurrencyList } from "../../../Api/UserManagement/SuperAdmin";

const FinanceDetails = ({ companyData, setCompanyData }) => {
  const [companysetting, setCompanysetting] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const getcompanylist = useSelector((state) => state.crm.company_setting);
  const UserId = sessionStorage.getItem("USER_ID");
  const companyId = companysetting?.tbs_company_id;
  const CompanyData = getcompanylist[0];

  console.log(getcompanylist, "get_companyList");

  const validationSchema = Yup.object().shape({
    company_name: Yup.string()
      .required("Company name doesn't Exist")
      .matches(/^[a-zA-Z0-9\s]*$/, "Special characters are not allowed"),
    financial_year_end: Yup.string().required("Select Your Finance Year"),
    base_currency: Yup.string().required("Select Your Base Currency"),
    tax_name: Yup.string()
      .required("Enter Your Tax Name")
      .matches(/^[a-zA-Z\s]*$/, "Special characters are not allowed"),
    tax_rate: Yup.number()
      .required("Enter Your Tax Rate")
      .min(1, "Tax rate must be at least 1%")
      .max(99, "Tax rate must be at most 99%")
      .typeError("Tax rate must be a number"),
  });
  const [isEdit, setIsEdit] = useState(false);
  const [CurrencyData, setCurrencyData] = useState([]);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const data = await SubmitCompanySetting(values, companyId, dispatch);
      toast.success(data);
      GetCompanySetting(dispatch);
      // setCompanysetting(data)
      fetchCompanyData();
      resetForm();
      setIsEdit(false);
    } catch (error) {
      console.error("Error uploading data", error);
    }
  };

  useEffect(() => {
    if (UserId) {
      fetchCompanyData();
      GetCompanySetting(dispatch);
    }
  }, [UserId, setCompanyData]);

  const fetchCompanyData = async () => {
    try {
      const data = await GetCompanyDataById(UserId, setCompanyData);
      setCompanysetting(data);
      console.log(data, "handlesubmitbuttonforFinanceDetails");
    } catch (error) {
      console.error("Error fetching company data:", error);
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
    fetchCurrency();
  }, []);

  console.log(UserId, companysetting, "getcompanylist getcompanylist");
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

  const curOption = [defaultCurrency, ...getCurrencyOptions];

  return (
    <div>
      <Formik
        initialValues={{
          company_name: companysetting?.company_name || "",
          financial_year_end: companysetting
            ? dayjs(companysetting?.financial_year_end).format("YYYY-MM-DD")
            : "",
          base_currency: companysetting?.base_currency || "",
          tax_name: companysetting?.tax_name || "",
          tax_rate: companysetting?.tax_rate || "",
          //user_id: UserId
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
            <div>
              <div className="grid grid-cols-2 gap-x-[6vw] gap-y-[3vw] px-[10vw] pt-[2vw] w-full">
                <div className="flex gap-[3.5vw] justify-between">
                  <span className="flex items-center order-first">
                    <label
                      htmlFor="company_name"
                      className="text-[#1F4B7F] font-medium text-[1.2vw] "
                    >
                      Company Name
                    </label>
                    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                      *
                    </span>
                  </span>
                  <span className="order-last">
                    <div className="relative">
                      <Field
                        type="text"
                        name="company_name"
                        placeholder="Enter Company Name"
                        value={values.company_name}
                        className={` ${
                          isEdit === false ? "cursor-not-allowed" : ""
                        } customize-placeholder placeholder-[#1F487C] placeholder:text-[1vw] rounded-[.5vw] border-r-[0.2vw] border-b-[0.2vw] border-t-[0.1vw] border-l-[0.1vw] border-[#1F487C] text-[#1F487C] px-[1vw] text-[1vw] h-[2.8vw] w-[20vw]  outline-none`}
                        disabled={isEdit === false}
                      />
                      <ErrorMessage
                        name="company_name"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                      />
                    </div>
                  </span>
                </div>

                <div className="flex gap-[3.5vw] justify-between">
                  <span className="flex items-center order-first">
                    <label
                      htmlFor="financial_year_end"
                      className="text-[#1F4B7F] font-medium text-[1.2vw]"
                    >
                      Finance Year
                    </label>
                    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                      *
                    </span>
                  </span>
                  <span className="order-last">
                    <div className="relative">
                      <Field
                        type="date"
                        id="financial_year_end"
                        name="financial_year_end"
                        value={values.financial_year_end}
                        className={` ${
                          isEdit === false ? "cursor-not-allowed" : ""
                        } customize-placeholder placeholder-[#1F487C] placeholder:text-[1vw] border-r-[0.2vw] border-b-[0.2vw] border-t-[0.1vw] border-l-[0.1vw] border-[#1F487C] text-[#1F487C] px-[1vw] text-[1vw] h-[2.8vw] w-[20vw] rounded-[0.5vw] outline-none`}
                        disabled={isEdit === false}
                      />
                      <ErrorMessage
                        name="financial_year_end"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                      />
                    </div>
                  </span>
                </div>
                <div className="flex gap-[3.5vw] justify-between">
                  <span className="flex items-center order-first">
                    <label
                      htmlFor="base_currency"
                      className="text-[#1F4B7F] font-medium text-[1.2vw]"
                    >
                      Base Currency
                    </label>
                    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                      *
                    </span>
                  </span>
                  <span className="umselect order-last">
                    <div className=" relative ">
                      {/* <Field
                        as="select"
                        id="base_currency"
                        name="base_currency"
                        placeholder="Enter Company Name"
                        value={values.base_currency}
                        className={` ${
                          isEdit === false ? "cursor-not-allowed" : ""
                        } customize-placeholder placeholder-[#1F487C] placeholder:text-[1vw] border-r-[0.2vw] border-b-[0.2vw] border-t-[0.1vw] border-l-[0.1vw] border-[#1F487C] text-[#1F487C] px-[1vw] text-[1vw] h-[2.8vw] w-[20vw] rounded-[0.5vw] outline-none`}
                        disabled={isEdit === false}
                      >
                        <option label="Base Currency" value="" className="" />
                        <option label="USD" value="USD" className="" />
                        <option label="INR" value="INR" className="" />
                        <option label="EUR" value="EUR" className="" />
                        <option label="RUB" value="RUB" className="" />
                      </Field> */}
                      <ConfigProvider
                        theme={{
                          components: {
                            Select: {
                              optionActiveBg: "#aebed1",
                              optionSelectedColor: "#FFF",
                              optionSelectedBg: '#e5e5e5',
                              optionHeight: "2",
                            },
                            searchInput: {
                              color: "#1f487c", // Set the search text color here
                            },
                          },
                        }}
                      >
                        <Select
                          showSearch
                          value={values.base_currency}
                          onChange={(value) => {
                            handleChange({
                              target: { name: "base_currency", value },
                            });
                          }}
                          // disabled={
                          //   updatedata || documentback
                          //     ? enable
                          //       ? false
                          //       : true
                          //     : false
                          // }
                          name="base_currency"
                          // className={` ${
                          //   isEdit === false ? "cursor-not-allowed" : ""
                          // } customize-placeholder placeholder-[#1F487C] placeholder:text-[1vw] border-r-[0.2vw] border-b-[0.2vw] border-t-[0.1vw] border-l-[0.1vw] border-[#1F487C] text-[#1F487C] px-[1vw] text-[1vw] h-[2.8vw] w-[20vw] rounded-[0.5vw] outline-none`}
                          disabled={isEdit === false}
                          className={`${
                            isEdit === false ? "cursor-not-allowed" : ""
                          } custom-select  border-r-[0.2vw]  border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[2.8vw] w-[20vw] rounded-[0.5vw] outline-none`}
                          placeholder="Select currency code"
                          optionFilterProp="search"
                          filterOption={
                            (input, option) =>
                              option?.search
                                ?.toLowerCase()
                                ?.includes(input.toLowerCase()) // Make it case-insensitive
                          }
                          suffixIcon={
                            <span style={{ fontSize: "1vw", color: "#1f487c" }}>
                              <IoMdArrowDropdown size="2vw" />
                            </span>
                          }
                          style={{ padding: 4, color: "#1f487c" }}
                          options={curOption}
                        />
                      </ConfigProvider>
                      <ErrorMessage
                        name="base_currency"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                      />
                    </div>
                  </span>
                </div>
                <div className="flex gap-[3.5vw] justify-between">
                  <span className="flex items-center order-first">
                    <label
                      htmlFor="tax_name"
                      className="text-[#1F4B7F] font-medium text-[1.2vw]"
                    >
                      Tax Name
                    </label>
                    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                      *
                    </span>
                  </span>
                  <span className="order-last">
                    <div className="relative">
                      <Field
                        type="text"
                        name="tax_name"
                        placeholder="Enter Tax Name"
                        value={values.tax_name}
                        className={` ${
                          isEdit === false ? "cursor-not-allowed" : ""
                        } customize-placeholder placeholder-[#1F487C] placeholder:text-[1vw] border-r-[0.2vw] border-b-[0.2vw] border-t-[0.1vw] border-l-[0.1vw] border-[#1F487C] text-[#1F487C] px-[1vw] text-[1vw] h-[2.8vw] w-[20vw] rounded-[0.5vw] outline-none`}
                        disabled={isEdit === false}
                      />
                      <ErrorMessage
                        name="tax_name"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]  w-full"
                      />
                    </div>
                  </span>
                </div>
                <div className="flex gap-[3.5vw] justify-between">
                  <span className="flex items-center order-first ">
                    <label
                      htmlFor="tax_rate"
                      className="text-[#1F4B7F] font-medium text-[1.2vw]"
                    >
                      Tax Rate
                    </label>
                    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                      *
                    </span>
                  </span>
                  <span className="order-last">
                    <div className="relative items-relative">
                      <Field
                        type="text"
                        name="tax_rate"
                        placeholder="Enter Tax Rate"
                        value={values.tax_rate}
                        className={` ${
                          isEdit === false ? "cursor-not-allowed" : ""
                        } customize-placeholder placeholder-[#1F487C] placeholder:text-[1vw] border-r-[0.2vw] border-b-[0.2vw] border-t-[0.1vw] border-l-[0.1vw] border-[#1F487C] text-[#1F487C] px-[1vw] text-[1vw] h-[2.8vw] w-[20vw] rounded-[0.5vw] outline-none`}
                        disabled={isEdit === false}
                      ></Field>
                      <div className="absolute left-[17vw] right-[0] bottom-[0.4vw]  flex justify-items-center">
                        <div className=" bg-[#1F4B7F] w-[2vw] h-[2vw] rounded-md text-white px-[0.5vw] text-[1.3vw]">
                          %
                        </div>
                      </div>
                      <ErrorMessage
                        name="tax_rate"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                      />
                    </div>
                  </span>
                </div>
              </div>
              <div className="flex text-[1.2vw] items-center justify-center pt-[2vw] pb-[0.5vw]">
                {isEdit === false ? (
                  <div
                    onClick={() => setIsEdit(true)}
                    className="cursor-pointer text-white bg-[#1F4B7F] px-[2vw] gap-[0.5vw] py-[0.5vw] rounded-[0.7vw] w-[9vw] text-center"
                  >
                    Edit
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="text-white bg-[#1F4B7F] px-[2vw] gap-[0.5vw] py-[0.5vw] rounded-[0.7vw] w-[9vw]"
                  >
                    Update
                  </button>
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FinanceDetails;
