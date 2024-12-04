import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { GetProductOwnerData } from "../../../Api/Login/AllLogin";
import {
  EditUserSettings,
  UpdateEditUserSettings,
} from "../../../Api/Settings/UserSettings/EditProfile";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import IndexEmployee from "./Employee/IndexEmployee";
import IndexPartner from "./Partner/IndexPartner";
import CompanDetails from "./CompanyDetails/CompanDetails";
import { GetOperatorData } from "../../../Api/Settings/SystemSettings/CompanyDetails";

const EditProfile = () => {
  // const getownerdata = useSelector((state) => state.crm.product_owner_data);
  // useEffect(() => {
  //   if (companysetting) {
  //     handleSubmit(companysetting);
  //   }
  // }, [companysetting]);

  const validationSchema = Yup.object().shape({
    owner_name: Yup.string().required("Company name is required"),
    phone: Yup.string().required("Phone number is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    // password: Yup.string().required("Password is required")
  });

  // const getUserSettingsEdit = useSelector(
  //   (state) => state.crm.user_settings_edit
  // );

  const [isEdit, setIsEdit] = useState(false);



  const userType = sessionStorage.getItem("type_name");
  const typeId = sessionStorage.getItem("type_id")
    ? sessionStorage.getItem("type_id")
    : localStorage.getItem("type_id");
  const userID = sessionStorage.getItem("USER_ID");

  const getUserSettingsEdit = useSelector(
    (state) => state.crm.user_settings_edit
  );
  console.log(getUserSettingsEdit, "hello data");

  const dispatch = useDispatch();
  const loginMap = {
    'PRO101': 'product_owner',
    'OP101': 'operators',
    'PROEMP101': 'pro-emp-personal-details',
    'OPEMP101': 'emp-personal-details',
    'PART101': 'partner_details'
  };
  
  const Login = loginMap[typeId] || '';

  useEffect(() => {
    const id = sessionStorage.getItem("USER_ID");
    console.log(id, "session id");
    EditUserSettings(id, dispatch,Login);
  }, []);

  // const owname = companysetting.owner_name;
  // console.log(companysetting,"total data");
  // console.log(owname,"name owner");
  const handleSubmit = async (values) => {
    console.log(values, "function values");
    const id = sessionStorage.getItem("USER_ID");
    await UpdateEditUserSettings(id, values.owner_name, dispatch);
    setIsEdit(false);
    // const payload = {
    //   company_name: values.companynames,
    //   financial_year_end: values.finance_year,
    //   base_currency: values.base_currency,
    //   tax_name: values.tax_name,
    //   tax_rate: values.tax_rate,
    // };
    // try {
    //   const url = "http://192.168.90.47:4000/company-settings";
    //   const response = await axios({
    //     method: "post",
    //     url: url,
    //     data: payload,
    //   });

    //   setIsModalOpen(false);
    //   toast.success(response?.data?.message);
    //   console.log(response.data);
    //   console.log(response, "response");
    // } catch (error) {
    //   console.error("Error Uploading data", error);
    // }
  };

  // useEffect(() => {
  //   GetProductOwnerData(dispatch);
  // }, []);

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [companyData, setCompanyData] = useState();
  const [userid, setUserid] = useState();
  const [selectedFile, setSelectedFile] = useState(null);

  const operatorData = useSelector((state) => state?.crm?.operator_data[0]);
  console.log(operatorData, "operator_data");

  const fetchData = async () => {
    if (typeId === "OP101") {
      try {
        const data = await GetOperatorData(dispatch);
        const profile = data[0].profileimg;
        setSelectedFile(profile);
        console.log(profile, "op_profile");
      } catch (error) {}
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  return (
    <>
      {typeId === "PROEMP101" ? (
        <IndexEmployee />
      ) : typeId === "EMP101" ? (
        <IndexEmployee />
      ) : typeId === "PART101" ? (
        <IndexPartner />
      ) : typeId === "OP101" ? (
        <CompanDetails
          operatorData={operatorData}
          selectedFile={selectedFile}
        />
      ) : (
        <div>
          <Formik
            initialValues={{
              owner_name: getUserSettingsEdit.owner_name,
              email: getUserSettingsEdit.email_id,
              phone: getUserSettingsEdit.phone,
              password: getUserSettingsEdit.password,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values, "valuesssssssssssss");
              // setCompanysetting(values);
              handleSubmit(values);
              //   console.log(values, "well worked stateee");
              //   console.log(values, "company_settings");
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
                <div>
                  <div className="grid grid-cols-4 px-[5vw]  gap-y-[1.5vw]  pt-[1.5vw]">
                    <div className="flex items-center justify-center">
                      {" "}
                      <label className="text-[#1F4B7F] font-bold text-[1.1vw]">
                        Name
                      </label>
                    </div>

                    <div className="">
                      <Field
                        type="text"
                        name="owner_name"
                        placeholder="Enter your Name"
                        // value={getUserSettingsEdit.owner_name}
                        className={`border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${
                          isEdit === false ? "cursor-not-allowed" : ""
                        }`}
                        disabled={isEdit === false}
                      />
                      <ErrorMessage
                        name="companynames"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                    <div className="flex items-center justify-center">
                      <label
                        htmlFor="createdDate"
                        className="text-[#1F4B7F] font-bold text-[1.1vw] flex justify-center items-center"
                      >
                        Email
                      </label>
                    </div>
                    <div className="">
                      <Field
                        type="text"
                        name="email"
                        placeholder="Enter your Email"
                        // value={getUserSettingsEdit.email_id}
                        readOnly
                        className={`border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${
                          isEdit === false ? "cursor-not-allowed" : ""
                        }`}
                        disabled={isEdit === false}
                      />
                      <ErrorMessage
                        name="companynames"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                    {/* <div className="">
                <Field
                  type="date"
                  id="finance_year"
                  name="finance_year"
                  className=" customize-placeholder border-r-[0.25vw]  border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none"
                />
                <ErrorMessage
                  name="finance_year"
                  component="div"
                  className="text-red-500 text-[0.8vw]"
                />
              </div> */}
                    {/* <div className="">
                <label className="text-[#1F4B7F] text-[1.1vw]">
                  Base Currency
                </label>
                <Field
                  as="select"
                  id="base_currency"
                  name="base_currency"
                  placeholder="Enter Company Name"
                  value={values.base_currency}
                  className=" customize-placeholder border-r-[0.25vw]  border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none"
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
              </div> */}
                    {/* <div className="">
                <label className="text-[#1F4B7F] text-[1.1vw]">
                  Tax Name
                </label>
                <Field
                  type="text"
                  name="tax_name"
                  placeholder="Enter Tax Name"
                  value={values.tax_name}
                  className=" customize-placeholder border-r-[0.25vw]  border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none"
                />
                <ErrorMessage
                  name="tax_name"
                  component="div"
                  className="text-red-500 text-[0.8vw]"
                />
              </div> */}
                    {/* <div className="">
                <label className="text-[#1F4B7F] text-[1.1vw]">
                  Tax Rate
                </label>

                <div className="relative flex items-relative">
                  <Field
                    type="text"
                    name="tax_rate"
                    placeholder="Enter Tax Rate"
                    value={values.tax_rate}
                    className=" customize-placeholder border-r-[0.25vw]  border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none"
                  ></Field>
                  <div className="absolute right-[1.5vw] bottom-[0.5vw]  flex justify-items-center">
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
              </div> */}
                  </div>
                  <div className="grid grid-cols-4 px-[5vw]  gap-y-[1.5vw]  pt-[1.5vw]">
                    <div className="flex items-center justify-center">
                      {" "}
                      <label className="text-[#1F4B7F] font-bold text-[1.1vw]">
                        Phone
                      </label>
                    </div>

                    <div className="">
                      <Field
                        type="text"
                        name="phone"
                        placeholder="Enter Phone Number"
                        // value={getUserSettingsEdit.phone}
                        readOnly
                        className={`border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${
                          isEdit === false ? "cursor-not-allowed" : ""
                        }`}
                        disabled={isEdit === false}
                      />
                      <ErrorMessage
                        name="companynames"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                    <div className="flex items-center justify-center">
                      <label
                        htmlFor="createdDate"
                        className="text-[#1F4B7F] font-bold text-[1.1vw]"
                      >
                        Password
                      </label>
                    </div>
                    {/* <div className="">
                <Field
                  type="text"
                  name="password"
                  placeholder="Enter your password"
                  // value={getUserSettingsEdit.password}
                  readOnly
                  className="cursor-not-allowed customize-placeholder border-r-[0.25vw] pl-[1vw] border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none"
                />
                <ErrorMessage
                  name="companynames"
                  component="div"
                  className="text-red-500 text-[0.8vw]"
                />
              </div> */}

                    <div className="relative">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        readOnly
                        className={`border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${
                          isEdit === false ? "cursor-not-allowed" : ""
                        }`}
                        disabled={isEdit === false}
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                      <button
                        type="button"
                        onClick={handleTogglePassword}
                        className="absolute right-2 text-[#1F487C] top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </button>
                    </div>

                    {/* <div className="">
                <Field
                  type="date"
                  id="finance_year"
                  name="finance_year"
                  className=" customize-placeholder border-r-[0.25vw]  border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none"
                />
                <ErrorMessage
                  name="finance_year"
                  component="div"
                  className="text-red-500 text-[0.8vw]"
                />
              </div> */}
                    {/* <div className="">
                <label className="text-[#1F4B7F] text-[1.1vw]">
                  Base Currency
                </label>
                <Field
                  as="select"
                  id="base_currency"
                  name="base_currency"
                  placeholder="Enter Company Name"
                  value={values.base_currency}
                  className=" customize-placeholder border-r-[0.25vw]  border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none"
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
              </div> */}
                    {/* <div className="">
                <label className="text-[#1F4B7F] text-[1.1vw]">
                  Tax Name
                </label>
                <Field
                  type="text"
                  name="tax_name"
                  placeholder="Enter Tax Name"
                  value={values.tax_name}
                  className=" customize-placeholder border-r-[0.25vw]  border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none"
                />
                <ErrorMessage
                  name="tax_name"
                  component="div"
                  className="text-red-500 text-[0.8vw]"
                />
              </div> */}
                    {/* <div className="">
                <label className="text-[#1F4B7F] text-[1.1vw]">
                  Tax Rate
                </label>

                <div className="relative flex items-relative">
                  <Field
                    type="text"
                    name="tax_rate"
                    placeholder="Enter Tax Rate"
                    value={values.tax_rate}
                    className=" customize-placeholder border-r-[0.25vw]  border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none"
                  ></Field>
                  <div className="absolute right-[1.5vw] bottom-[0.5vw]  flex justify-items-center">
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
              </div> */}
                  </div>
                  <div className="flex items-center justify-center pt-[2vw] pb-[0.5vw]">
                    {isEdit === false ? (
                      <div
                        onClick={() => setIsEdit(true)}
                        className="cursor-pointer text-white bg-[#1F4B7F] px-[2vw] gap-[0.5vw] py-[0.5vw] rounded-[0.7vw] w-[10vw] text-center"
                      >
                        Edit
                      </div>
                    ) : (
                      <button
                        type="submit"
                        className="text-white bg-[#1F4B7F] px-[2vw] gap-[0.5vw] py-[0.5vw] rounded-[0.7vw] w-[10vw]"
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
      )}
    </>
  );
};

export default EditProfile;
