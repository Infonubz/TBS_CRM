import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { SubmitAddressData } from "../../../../Api/Settings/SystemSettings/CompanyDetails";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Select, ConfigProvider } from "antd";

const validationSchema = Yup.object().shape({
  country: Yup.string().required("Status required"),
  state: Yup.string().required("Status required"),
  city: Yup.string().required("Status required"),
  region: Yup.string().required("Status required"),

  address: Yup.string().required("Company Name is required"),
  postal: Yup.string()
    // .matches(/^[0-9]+$/, "Postal Code must be a number")
    .matches(/^\d{6}$/, "Postal code must be a valid 6-digit code")
    .required("Postal Code is required"),
});
const AddressDetails = ({ operatorData }) => {
  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    console.log("hiihih");
    try {
      const data = await SubmitAddressData(values, dispatch);
      toast.success(data?.message);
      setIsEdit(false);
    } catch (error) {
      console.error("Error uploading data", error);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          country: operatorData ? operatorData?.country : "",
          city: operatorData ? operatorData?.city : "",
          state: operatorData ? operatorData?.state : "",
          postal: operatorData ? operatorData?.zip_code : "",
          address: operatorData ? operatorData?.address : "",
          region: operatorData ? operatorData?.region : "",
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
              <div className="col-span-1">
                <label className="text-[#1F4B7F] text-[1vw] font-bold ">
                  Address
                  <span className="text-[1vw] text-red-600 pl-[0.2vw]">*</span>
                </label>
                <div className="relative">
                  <Field
                    type="text"
                    name="address"
                    placeholder="Enter Address"
                    // value={values.firstname}
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
                    name="address"
                    component="div"
                    className="text-red-500 text-[0.8vw]"
                  />
                </div>
              </div>
              <div className="col-span-1">
                <label className="text-[#1F4B7F] text-[1vw] font-bold ">
                  State
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
                      placeholder="Select State"
                      value={values.state}
                      onChange={(value) => {
                        setFieldValue(value);
                      }}
                      disabled={isEdit === false}
                      suffixIcon={
                        <span style={{ fontSize: "1vw", color: "#1f487c" }}>
                          <IoMdArrowDropdown size="2vw" />
                        </span>
                      }
                      options={[
                        { value: "", label: "Select State" },
                        { value: "Tamilnadu", label: "Tamilnadu" },
                        { value: "Karnataka", label: "Karnataka" },
                        { value: "Andhra", label: "Andhra" },
                        { value: "Kerla", label: "Kerla" },
                        { value: "Telangana", label: "Telangana" },
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
                    name="state"
                    component="div"
                    className="text-red-500 text-[0.8vw]"
                  />
                </div>
              </div>
              <div className="col-span-1 ">
                <label className="text-[#1F4B7F] text-[1vw] font-bold ">
                  Region
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
                      placeholder="Select State"
                      value={values.region}
                      onChange={(value) => {
                        setFieldValue(value);
                      }}
                      disabled={isEdit === false}
                      suffixIcon={
                        <span style={{ fontSize: "1vw", color: "#1f487c" }}>
                          <IoMdArrowDropdown size="2vw" />
                        </span>
                      }
                      options={[
                        { value: "", label: "Select State" },
                        { value: "Souther Region", label: "Souther Region" },
                        { value: "Northern Region", label: "Northern Region" },
                        { value: "Western Region", label: "Western Region" },
                        { value: "Eastern Region", label: "Eastern Region" },
                        {
                          value: "North-Eastern Region",
                          label: "North-Eastern Region",
                        },
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
                    name="region"
                    component="div"
                    className="text-red-500 text-[0.8vw]"
                  />
                </div>
              </div>
              <div className="col-span-1">
                <label className="text-[#1F4B7F] text-[1vw] font-bold ">
                  City
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
                      placeholder="Select City"
                      value={values.city}
                      onChange={(value) => {
                        setFieldValue(value);
                      }}
                      disabled={isEdit === false}
                      suffixIcon={
                        <span style={{ fontSize: "1vw", color: "#1f487c" }}>
                          <IoMdArrowDropdown size="2vw" />
                        </span>
                      }
                      options={[
                        { value: "", label: "Select City" },
                        { value: "Tirupur", label: "Tirupur" },
                        { value: "Coimbatore", label: "Coimbatore" },
                        { value: "Chennai", label: "Chennai" },
                        { value: "Pondicherry", label: "Pondicherry" },
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
                    name="city"
                    component="div"
                    className="text-red-500 text-[0.8vw]"
                  />
                </div>
              </div>
              <div className="col-span-1">
                <label className="text-[#1F4B7F] text-[1vw] font-bold ">
                  Country
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
                      className={`custom-select border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C]  text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${
                        isEdit === false ? "cursor-not-allowed" : ""
                      }`}
                      placeholder="Select Country"
                      value={values.country}
                      onChange={(value) => {
                        setFieldValue(value);
                      }} // You can define the handler for change if needed
                      disabled={isEdit === false}
                      suffixIcon={
                        <span style={{ fontSize: "1vw", color: "#1f487c" }}>
                          <IoMdArrowDropdown size="2vw" />
                        </span>
                      }
                      options={[
                        { value: "", label: "Select Country" },
                        { value: "India", label: "India" },
                        { value: "America", label: "America" },
                        { value: "Australia", label: "Australia" },
                        { value: "Malasiya", label: "Malasiya" },
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
                    name="city"
                    component="div"
                    className="text-red-500 text-[0.8vw]"
                  />
                </div>
              </div>
              <div className="col-span-1">
                <label className="text-[#1F4B7F] text-[1vw] font-bold ">
                  Postal / Zip Code
                  <span className="text-[1vw] text-red-600 pl-[0.2vw]">*</span>
                </label>
                <div className="relative">
                  <Field
                    type="text"
                    name="postal"
                    placeholder="Enter Postal Code"
                    // value={values.firstname}
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
                    name="postal"
                    component="div"
                    className="text-red-500 text-[0.7vw]"
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

export default AddressDetails;
