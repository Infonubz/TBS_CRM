import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import {
  GetPartnerPersonalData,
  submitPartnerPersonalData,
} from "../../../../Api/Settings/UserSettings/Partner";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { IoMdArrowDropdown } from "react-icons/io";
import { ConfigProvider, Select } from "antd";

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
    .matches(/^[0-9]+$/, "Phone number must be a number")
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number maximum 10 digits only")
    .required("Alternative Phone Number is required"),
  firstname: Yup.string().required("Company Name is required"),
  lastname: Yup.string().required("Owner Name is required"),
  gender: Yup.string().required("Please select an Gender"),
  dob: Yup.date()
    .required("Date of Birth is required")
    .nullable()
    .max(new Date(), "Date of Birth cannot be in the future")
    .test("age", "You must be at least 15 years old", (value) => {
      if (!value) return true;
      const today = new Date();
      const age = today.getFullYear() - value.getFullYear();
      const monthDiff = today.getMonth() - value.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < value.getDate())
      ) {
        return age > 15;
      }
      return age >= 15;
    }),
  occupation: Yup.string().required("please select the occupation"),
});

const PersonalDetails = ({ setSelectedFile, fileList, isEdit, setIsEdit }) => {
  const [partnerData, setPartnereData] = useState();

  console.log(partnerData, "partner_data");

  const fetchPartnerData = async () => {
    try {
      const data = await GetPartnerPersonalData();
      setPartnereData(data);
      setSelectedFile(data?.profile_img);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  useEffect(() => {
    fetchPartnerData();
  }, []);

  const handleSubmit = async (values) => {
    console.log(values, "values_values");
    try {
      const data = await submitPartnerPersonalData(values, fileList);
      GetPartnerPersonalData();
      toast.success(data);
      console.log(data, "data_data");
      setIsEdit(false);
    } catch (error) {
      console.error("Error uploading data", error);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          firstname: partnerData ? partnerData.partner_first_name : "",
          lastname: partnerData ? partnerData.partner_last_name : "",
          phone: partnerData ? partnerData.phone : "",
          emailid: partnerData ? partnerData.emailid : "",
          alt_phone: partnerData ? partnerData.alternate_phone : "",
          dob: partnerData
            ? dayjs(partnerData.date_of_birth).format("YYYY-MM-DD")
            : "",
          gender: partnerData ? partnerData.gender : "",
          occupation: partnerData ? partnerData.occupation : "",
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
          resetForm,
          errors,
          touched,
          dirty,
        }) => (
          <Form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-[1vw]">
              <div className="col-span-1 relative">
                <label className="text-[#1F4B7F]  text-[1vw] font-bold ">
                  Partner First Name
                  <span className="text-[1vw] text-red-600 pl-[0.2vw]">*</span>
                </label>
                <div className="relative">
                  <Field
                    type="text"
                    name="firstname"
                    placeholder="Enter First Name"
                    value={values.firstname}
                    className={`border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${
                      isEdit === false ? "cursor-not-allowed" : ""
                    }`}
                    disabled={isEdit === false}
                  />
                  {/* <MdOutlineModeEditOutline
                                        color='#1F487C'
                                        className='absolute top-[0.75vw] right-[1vw]'
                                        size='1.5vw' /> */}
                  <ErrorMessage
                    name="firstname"
                    component="div"
                    className="text-red-500 text-[0.8vw] absolute bottom-[-1.3vw] left-[.3vw]"
                  />
                </div>
              </div>
              <div className="col-span-1 relative">
                <label className="text-[#1F4B7F]  text-[1vw] font-bold ">
                  Partner Last Name
                  <span className="text-[1vw] text-red-600 pl-[0.2vw]">*</span>
                </label>
                <div className="relative">
                  <Field
                    type="text"
                    name="lastname"
                    placeholder="Enter Last Name"
                    value={values.lastname}
                    className={`border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${
                      isEdit === false ? "cursor-not-allowed" : ""
                    }`}
                    disabled={isEdit === false}
                  />
                  {/* <MdOutlineModeEditOutline
                                        color='#1F487C'
                                        className='absolute top-[0.75vw] right-[1vw]'
                                        size='1.5vw' /> */}
                  <ErrorMessage
                    name="lastname"
                    component="div"
                    className="text-red-500 text-[0.8vw]  absolute bottom-[-1.3vw] left-[.3vw]"
                  />
                </div>
              </div>
              <div className="col-span-1 relative">
                <label className="text-[#1F4B7F]  text-[1vw] font-bold ">
                  Phone
                  <span className="text-[1vw] text-red-600 pl-[0.2vw]">*</span>
                </label>

                <div className="relative">
                  <Field
                    type="text"
                    name="phone"
                    placeholder="Enter Number"
                    value={values.phone}
                    className={`border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${
                      isEdit === false ? "cursor-not-allowed" : ""
                    }`}
                    disabled={isEdit === false}
                  />
                  {/* <button className="absolute right-[0.5vw] text-[1vw] text-white w-[5vw] bg-[#1F4B7F] rounded-full h-[1.7vw]">
                          Verify
                        </button> */}

                  {/* <MdOutlineModeEditOutline
                                        color='#1F487C'
                                        className='absolute top-[0.75vw] right-[1vw]'
                                        size='1.5vw' /> */}
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-[0.8vw] absolute bottom-[-1.3vw] left-[.3vw]"
                  />
                </div>
              </div>
              <div className="col-span-1 relative">
                <label className="text-[#1F4B7F]  text-[1vw] font-bold ">
                  Email ID
                  <span className="text-[1vw] text-red-600 pl-[0.2vw]">*</span>
                </label>
                <div className="relative">
                  <Field
                    type="text"
                    name="emailid"
                    placeholder="Enter Email Address"
                    value={values.emailid}
                    className={`border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${
                      isEdit === false ? "cursor-not-allowed" : ""
                    }`}
                    disabled={isEdit === false}
                  />
                  {/* <MdOutlineModeEditOutline
                                        color='#1F487C'
                                        className='absolute top-[0.75vw] right-[1vw]'
                                        size='1.5vw' /> */}
                  <ErrorMessage
                    name="emailid"
                    component="div"
                    className="text-red-500 text-[0.8vw] absolute bottom-[-1.3vw] left-[.3vw]"
                  />
                </div>
              </div>
              <div className="col-span-1 relative">
                <label className="text-[#1F4B7F]  text-[1vw] font-bold ">
                  Alternate Phone
                  <span className="text-[1vw] text-red-600 pl-[0.2vw]">*</span>
                </label>
                <div className="relative">
                  <Field
                    type="text"
                    name="alt_phone"
                    placeholder="Enter Alternate Number"
                    value={values.alt_phone}
                    className={`border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${
                      isEdit === false ? "cursor-not-allowed" : ""
                    }`}
                    disabled={isEdit === false}
                  />
                  {/* <MdOutlineModeEditOutline
                                        color='#1F487C'
                                        className='absolute top-[0.75vw] right-[1vw]'
                                        size='1.5vw' /> */}
                  <ErrorMessage
                    name="alt_phone"
                    component="div"
                    className="text-red-500 text-[0.8vw] absolute bottom-[-1.3vw] left-[.3vw]"
                  />
                </div>
              </div>
              <div className="col-span-1 relative">
                <label className="text-[#1F4B7F]  text-[1vw] font-bold ">
                  Gender
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
                      placeholder="Select Gender"
                      value={values.gender}
                      onChange={(value) => {
                        handleChange({ target: { name: "gender", value } });
                        sessionStorage.setItem("status", value);
                      }}
                      disabled={isEdit === false}
                      suffixIcon={
                        <span style={{ fontSize: "1vw", color: "#1f487c" }}>
                          <IoMdArrowDropdown size="2vw" />
                        </span>
                      }
                      options={[
                        { value: "", label: "Select Gender" },
                        { value: "Male", label: "Male" },
                        { value: "Female", label: "Female" },
                        { value: "Other", label: "Other" },
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
                    name="gender"
                    component="div"
                    className="text-red-500 text-[0.8vw] absolute bottom-[-1.3vw] left-[.3vw]"
                  />
                </div>
              </div>
              <div className="col-span-1 relative">
                <label className="text-[#1F4B7F]  text-[1vw] font-bold ">
                  Date of Birth
                  <span className="text-[1vw] text-red-600 pl-[0.2vw]">*</span>
                </label>
                <div className="relative">
                  <Field
                    type="date"
                    name="dob"
                    placeholder="Select Date of Birth"
                    value={values.dob}
                    onChange={(e) => {
                      handleChange(e);
                      sessionStorage.setItem("dob", e.target.value);
                    }}
                    className={`border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${
                      isEdit === false ? "cursor-not-allowed" : ""
                    }`}
                    disabled={isEdit === false}
                  />
                  {/* <MdOutlineModeEditOutline
                                        color='#1F487C'
                                        className='absolute top-[0.75vw] right-[1vw]'
                                        size='1.5vw' /> */}
                  <ErrorMessage
                    name="dob"
                    component="div"
                    className="text-red-500 text-[0.8vw] absolute bottom-[-1.3vw] left-[.3vw]"
                  />
                </div>
              </div>
              <div className="col-span-1 relative">
                <label className="text-[#1F4B7F]  text-[1vw] font-bold ">
                  Occupation
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
                      placeholder="Select Occupation"
                      value={values.occupation}
                      onChange={(value) => {
                        handleChange({ target: { name: "occupation", value } });
                      }}
                      disabled={isEdit === false}
                      suffixIcon={
                        <span style={{ fontSize: "1vw", color: "#1f487c" }}>
                          <IoMdArrowDropdown size="2vw" />
                        </span>
                      }
                      options={[
                        { value: "", label: "Select Occupation" },
                        { value: "student", label: "Student" },
                        { value: "entrepreneur", label: "Entrepreneur" },
                        { value: "labourer", label: "Labourer" },
                        { value: "retired", label: "Retired" },
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
                    name="occupation"
                    component="div"
                    className="text-red-500 text-[0.8vw] absolute bottom-[-1.3vw] left-[.3vw]"
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

export default PersonalDetails;
