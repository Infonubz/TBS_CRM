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

const CompanySettings = ({ companyData, setCompanyData }) => {
  const [companysetting, setCompanysetting] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const getcompanylist = useSelector((state) => state.crm.company_setting);
  const UserId = sessionStorage.getItem("USER_ID");
  const companyId = companyData?.tbs_company_id;
  const CompanyData = getcompanylist[0];

  const validationSchema = Yup.object().shape({
    company_name: Yup.string().required("Company name doesn't Exist "),
    financial_year_end: Yup.string().required("Select Your Finance Year"),
    base_currency: Yup.string().required("Select Your Base Currency"),
    tax_name: Yup.string().required("Enter Your Tax Name"),
    tax_rate: Yup.string().required("Enter Your Tax Rate"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const data = await SubmitCompanySetting(values, companyId, dispatch);
      toast.success(data);
      GetCompanySetting(dispatch);
      resetForm();
    } catch (error) {
      console.error("Error uploading data", error);
    }
  };

  useEffect(() => {
    if (UserId) {
      fetchCompanyData();
    }
  }, [UserId, setCompanyData]);

  const fetchCompanyData = async () => {
    try {
      const data = await GetCompanyDataById(UserId, setCompanyData);
      setCompanyData(data);
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };

  console.log(UserId, companysetting, "getcompanylist getcompanylist");

  return (
    <div>
      <Formik
        initialValues={{
          company_name: companyData?.company_name || "",
          financial_year_end: companyData
            ? dayjs(companyData?.financial_year_end).format("YYYY-MM-DD")
            : "",
          base_currency: companyData?.base_currency || "",
          tax_name: companyData?.tax_name || "",
          tax_rate: companyData?.tax_rate || "",
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
        }) => (
          <Form onSubmit={handleSubmit}>
            <div>
              <div className="grid grid-cols-2 gap-x-[20vw] mr-[15vw] gap-y-[3vw] pr-[6vw] px-[6vw] pt-[2vw]">
                <div className="grid grid-cols-2">
                  <span className="">
                    <label
                      htmlFor="company_name"
                      className="text-[#1F4B7F] font-medium text-[1.2vw]"
                    >
                      Company Name
                    </label>
                  </span>
                  <span className="">
                    <Field
                      type="text"
                      name="company_name"
                      placeholder="Enter Company Name"
                      value={values.company_name}
                      className=" customize-placeholder border-r-[0.25vw] border-l-[0.03vw] border-t-[0.03vw] px-[0.2vw] border-b-[0.25vw] placeholder-blue 
                      border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[20vw] rounded-md outline-none"
                    />
                    <ErrorMessage
                      name="company_name"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </span>
                </div>

                <div className="grid grid-cols-2">
                  <span className="">
                    <label
                      htmlFor="financial_year_end"
                      className="text-[#1F4B7F] font-medium text-[1.2vw]"
                    >
                      Finance Year
                    </label>
                  </span>
                  <span className="">
                    <Field
                      type="date"
                      id="financial_year_end"
                      name="financial_year_end"
                      value={values.financial_year_end}
                      className=" customize-placeholder border-r-[0.25vw] px-[0.2vw] border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue 
                    border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[20vw] rounded-md outline-none"
                    />
                    <ErrorMessage
                      name="financial_year_end"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="">
                    <label
                      htmlFor="base_currency"
                      className="text-[#1F4B7F] font-medium text-[1.2vw]"
                    >
                      Base Currency
                    </label>
                  </span>
                  <span className="">
                    <Field
                      as="select"
                      id="base_currency"
                      name="base_currency"
                      placeholder="Enter Company Name"
                      value={values.base_currency}
                      className=" customize-placeholder border-r-[0.25vw]  border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue 
                      border-[#1F487C] text-[#1F487C] px-[0.2vw] text-[1.2vw] h-[2.8vw] w-[20vw] rounded-md outline-none"
                    >
                      <option label="Base Currency" value="" className="" />
                      <option label="USD" value="USD" className="" />
                      <option label="INR" value="INR" className="" />
                      <option label="EUR" value="EUR" className="" />
                      <option label="RUB" value="RUB" className="" />
                    </Field>
                    <ErrorMessage
                      name="base_currency"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="">
                    <label
                      htmlFor="tax_name"
                      className="text-[#1F4B7F] font-medium text-[1.2vw]"
                    >
                      Tax Name
                    </label>
                  </span>
                  <span className="">
                    <Field
                      type="text"
                      name="tax_name"
                      placeholder="Enter Tax Name"
                      value={values.tax_name}
                      className=" customize-placeholder border-r-[0.25vw]  border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue 
                    border-[#1F487C] text-[#1F487C] px-[0.3vw] text-[1.2vw] h-[2.8vw] w-[20vw] rounded-md outline-none"
                    />
                    <ErrorMessage
                      name="tax_name"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="">
                    <label
                      htmlFor="tax_rate"
                      className="text-[#1F4B7F] font-medium text-[1.2vw]"
                    >
                      Tax Rate
                    </label>
                  </span>
                  <span className="">
                    <div className="relative items-relative">
                      <Field
                        type="text"
                        name="tax_rate"
                        placeholder="Enter Tax Rate"
                        value={values.tax_rate}
                        className="customize-placeholder border-r-[0.25vw]  border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue 
                    border-[#1F487C] text-[#1F487C] px-[0.3vw] text-[1.2vw] h-[2.8vw] w-[20vw] rounded-md outline-none"
                      ></Field>
                      <div className="absolute left-[17vw] right-[0] bottom-[0.5vw]  flex justify-items-center">
                        <div className=" bg-[#1F4B7F] w-[2vw] h-[2vw] rounded-md text-white px-[0.5vw] text-[1.3vw]">
                          %
                        </div>
                      </div>
                    </div>
                    <ErrorMessage
                      name="tax_rate"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </span>
                </div>
              </div>
              <div className="flex justify-end pr-[1vw] pt-[2vw] pb-[2vw]">
                <button
                  className="w-[10vw] h-[2.5vw] text-[1.3vw] bg-[#1F487C] text-white rounded-md"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CompanySettings;
