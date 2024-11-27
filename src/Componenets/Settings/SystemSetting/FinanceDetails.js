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

const FinanceDetails = ({ companyData, setCompanyData }) => {
  const [companysetting, setCompanysetting] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const getcompanylist = useSelector((state) => state.crm.company_setting);
  const UserId = sessionStorage.getItem("USER_ID");
  const companyId = companysetting?.tbs_company_id;
  const CompanyData = getcompanylist[0];

  console.log(getcompanylist, 'get_companyList')

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
      // setCompanysetting(data)
      fetchCompanyData()
      resetForm();
    } catch (error) {
      console.error("Error uploading data", error);
    }
  };

  useEffect(() => {
    if (UserId) {
      fetchCompanyData();
      GetCompanySetting(dispatch)
    }
  }, [UserId, setCompanyData]);

  const fetchCompanyData = async () => {
    try {
      const data = await GetCompanyDataById(UserId, setCompanyData);
      setCompanysetting(data);
      console.log(data, 'handlesubmitbuttonforFinanceDetails')
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };

  console.log(UserId, companysetting, "getcompanylist getcompanylist");

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
          dirty
        }) => (
          <Form onSubmit={handleSubmit}>
            <div>
            <div className="grid grid-cols-2 gap-x-[20vw] mr-[15vw] gap-y-[3vw] pr-[6vw] px-[6vw] pt-[2vw]">
                <div className="grid grid-cols-2 ">
                  <span className=" flex items-center">
                    <label
                      htmlFor="company_name"
                      className="text-[#1F4B7F] font-medium text-[1.2vw] "
                    >
                      Company Name
                    </label>
                  </span>
                  <span className="">
                    <div className="relative">
                      <Field
                        type="text"
                        name="company_name"
                        placeholder="Enter Company Name"
                        value={values.company_name}
                        className=" customize-placeholder placeholder-[#1F487C] placeholder:text-[1vw] border-r-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] px-[1vw] border-b-[0.2vw] placeholder-blue 
                      border-[#1F487C] text-[#1F487C] text-[1vw] h-[2.8vw] w-[20vw] rounded-xl outline-none"
                      />
                      <ErrorMessage
                        name="company_name"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                      />
                    </div>
                  </span>
                </div>

                <div className="grid grid-cols-2">
                  <span className="flex items-center">
                    <label
                      htmlFor="financial_year_end"
                      className="text-[#1F4B7F] font-medium text-[1.2vw]"
                    >
                      Finance Year
                    </label>
                  </span>
                  <span className="">
                    <div className="relative">
                      <Field
                        type="date"
                        id="financial_year_end"
                        name="financial_year_end"
                        value={values.financial_year_end}
                        className=" customize-placeholder placeholder:text-[1vw] placeholder-blue 
                    border-[#1F487C] text-[#1F487C] text-[1vw] h-[2.8vw] w-[20vw] rounded-xl outline-none border-t-[0.1vw] border-r-[0.2vw] border-l-[0.1vw] px-[1vw] border-b-[0.2vw]"
                      />
                      <ErrorMessage
                        name="financial_year_end"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                      />
                    </div>
                  </span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="flex items-center">
                    <label
                      htmlFor="base_currency"
                      className="text-[#1F4B7F] font-medium text-[1.2vw]"
                    >
                      Base Currency
                    </label>
                  </span>
                  <span className="">
                    <div className="relative">
                      <Field
                        as="select"
                        id="base_currency"
                        name="base_currency"
                        placeholder="Enter Company Name"
                        value={values.base_currency}
                        className=" customize-placeholder placeholder-[#1F487C] placeholder:text-[1vw] placeholder-blue 
                      border-[#1F487C] text-[#1F487C] px-[1vw] text-[1vw] h-[2.8vw] w-[20vw] rounded-xl border-r-[0.2vw] border-t-[0.1vw] border-b-[0.2vw] border-l-[0.1vw] outline-none"
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
                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                      />
                    </div>
                  </span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="flex items-center">
                    <label
                      htmlFor="tax_name"
                      className="text-[#1F4B7F] font-medium text-[1.2vw]"
                    >
                      Tax Name
                    </label>
                  </span>
                  <span className="">
                    <div className="relative">
                      <Field
                        type="text"
                        name="tax_name"
                        placeholder="Enter Tax Name"
                        value={values.tax_name}
                        className=" customize-placeholder placeholder-[#1F487C] placeholder:text-[1vw] border-r-[0.2vw] border-b-[0.2vw] border-t-[0.1vw] border-l-[0.1vw] border-[#1F487C] text-[#1F487C] px-[1vw] text-[1vw] h-[2.8vw] w-[20vw] rounded-xl outline-none"
                      />
                      <ErrorMessage
                        name="tax_name"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                      />
                    </div>
                  </span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="flex items-center">
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
                        className="customize-placeholder placeholder-[#1F487C] placeholder:text-[1vw] border-r-[0.2vw]  border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-blue 
                    border-[#1F487C] text-[#1F487C] px-[1vw] text-[1vw] h-[2.8vw] w-[20vw] rounded-xl outline-none"
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
                      className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                    />
                  </span>
                </div>
              </div>
              <div className="flex justify-center items-center py-[1vw]">
                <button
                  className="w-1/6 h-[2.5vw] text-[1.3vw] bg-[#1F487C] text-white rounded-md"
                  type="submit"
                  disabled={isSubmitting || !dirty || !isValid}
                  style={{
                    backgroundColor: isSubmitting || !dirty || !isValid ? '#d3d3d3' : '#1F487C',
                    color: isSubmitting || !dirty || !isValid ? '#9e9e9e' : '#fff',
                    cursor: isSubmitting || !dirty || !isValid ? 'not-allowed' : 'pointer',
                  }}
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

export default FinanceDetails;
