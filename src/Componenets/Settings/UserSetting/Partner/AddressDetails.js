import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { Checkbox, Progress } from "antd";
import {
  GetPartnerAddressData,
  GetPartnerPersonalData,
  submitPartnerAddressData,
} from "../../../../Api/Settings/UserSettings/Partner";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { ConfigProvider, Select } from "antd";

const validationSchema = Yup.object().shape({
  temp_address: Yup.string().required("Temporary Address is required"),
  per_address: Yup.string().required("Permanent Address is required"),
  temp_country: Yup.string().required("Please select an Country"), // Validation schema for select field
  per_country: Yup.string().required("Please select an Country"), // Validation schema for select field
  temp_state: Yup.string().required("Please select an State"), // Validation schema for select field
  per_state: Yup.string().required("Please select an State"), // Validation schema for select field
  temp_city: Yup.string().required("Please select an City"), // Validation schema for select field
  per_city: Yup.string().required("Please select an City"), // Validation schema for select field
});

const AddressDetails = ({ addressType }) => {
  const [partnerAddress, setPartnerAddress] = useState();

  const [isEdit, setIsEdit] = useState(false);

  console.log(partnerAddress, "partner_address");

  const fetchPartnerAddress = async () => {
    try {
      const data = await GetPartnerAddressData();
      setPartnerAddress(data);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  useEffect(() => {
    fetchPartnerAddress();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const data = await submitPartnerAddressData(values);
      toast.success(data?.message);
      console.log(data);
      setIsEdit(false);
    } catch (error) {
      console.error("Error uploading data", error);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          temp_address: partnerAddress ? partnerAddress.temp_add : "",
          temp_country: partnerAddress ? partnerAddress.temp_country : "",
          temp_state: partnerAddress ? partnerAddress.temp_state : "",
          temp_city: partnerAddress ? partnerAddress.temp_city : "",
          per_address: partnerAddress ? partnerAddress.perm_add : "",
          per_country: partnerAddress ? partnerAddress.perm_country : "",
          per_state: partnerAddress ? partnerAddress.perm_state : "",
          per_city: partnerAddress ? partnerAddress.perm_city : "",
          per_postal: partnerAddress ? partnerAddress.perm_zip_code : "",
          temp_postal: partnerAddress ? partnerAddress.temp_zip_code : "",
          temp_region: partnerAddress ? partnerAddress.temp_region : "",
          per_region: partnerAddress ? partnerAddress.perm_region : "",
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
            {addressType === "temporary" ? (
              <div className="relative">
                <div className="grid grid-cols-2 gap-[1vw]">
                  <div className="col-span-1">
                    <label className="text-[#1F4B7F]  text-[1vw] font-bold ">
                      Address
                      <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                        {" "}
                        *
                      </span>
                    </label>
                    <div className="relative">
                      <Field
                        type="text"
                        name="temp_address"
                        placeholder="Enter Temporary Address"
                        value={values.temp_address}
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
                        name="temp_address"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label className="text-[#1F4B7F]  text-[1vw] font-bold ">
                      State
                      <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                        {" "}
                        *
                      </span>
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
                          value={values.temp_state}
                          onChange={(value) => {
                            handleChange({
                              target: { name: "temp_state", value },
                            });
                            sessionStorage.setItem("status", value);
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
                            { value: "Kerala", label: "Kerala" },
                            { value: "Andhra", label: "Andhra" },
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
                        name="temp_state"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label className="text-[#1F4B7F]  text-[1vw] font-bold ">
                      Region
                      <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                        {" "}
                        *
                      </span>
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
                          placeholder="Select Region"
                          value={values.temp_region}
                          onChange={(value) => {
                            handleChange({
                              target: { name: "temp_region", value },
                            });
                            sessionStorage.setItem("status", value);
                          }}
                          disabled={isEdit === false}
                          suffixIcon={
                            <span style={{ fontSize: "1vw", color: "#1f487c" }}>
                              <IoMdArrowDropdown size="2vw" />
                            </span>
                          }
                          options={[
                            { value: "", label: "Select Region" },
                            {
                              value: "southernregion",
                              label: "Southern Region",
                            },
                            {
                              value: "northernregion",
                              label: "Northern Region",
                            },
                            { value: "easternregion", label: "Eastern Region" },
                            { value: "westernregion", label: "Western Region" },
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
                        name="temp_state"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label className="text-[#1F4B7F]  text-[1vw] font-bold ">
                      City
                      <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                        {" "}
                        *
                      </span>
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
                          className={` custom-select border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${
                            isEdit === false ? "cursor-not-allowed" : ""
                          }`}
                          placeholder="Select City"
                          value={values.temp_city}
                          onChange={(value) => {
                            handleChange({
                              target: { name: "temp_city", value },
                            });
                            sessionStorage.setItem("status", value);
                          }}
                          disabled={isEdit === false}
                          suffixIcon={
                            <span style={{ fontSize: "1vw", color: "#1f487c" }}>
                              <IoMdArrowDropdown size="2vw" />
                            </span>
                          }
                          options={[
                            { value: "", label: "Select City" },
                            { value: "Tiruppur", label: "Tiruppur" },
                            { value: "Coimbatore", label: "Coimbatore" },
                            { value: "Chennai", label: "Chennai" },
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
                        name="temp_city"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label className="text-[#1F4B7F]  text-[1vw] font-bold ">
                      Country
                      <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                        {" "}
                        *
                      </span>
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
                          placeholder="Select Country"
                          value={values.temp_country}
                          onChange={(value) => {
                            handleChange({
                              target: { name: "temp_country", value },
                            });
                            sessionStorage.setItem("status", value);
                          }}
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
                        name="temp_country"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label className="text-[#1F4B7F]  text-[1vw] font-bold ">
                      Postal/Zip Code
                      <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                        {" "}
                        *
                      </span>
                    </label>
                    <div className="relative">
                      <Field
                        type="text"
                        name="temp_postal"
                        placeholder="Enter Postal Code"
                        value={values.temp_postal}
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
                        name="temp_postal"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-[-2.5vw]">
                  <Checkbox
                    disabled={isEdit === false}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFieldValue("per_address", values.temp_address);
                        setFieldValue("per_country", values.temp_country);
                        setFieldValue("per_state", values.temp_state);
                        setFieldValue("per_city", values.temp_city);
                        setFieldValue("per_postal", values.temp_postal);
                      } else {
                        setFieldValue("per_address", "");
                        setFieldValue("per_country", "");
                        setFieldValue("per_state", "");
                        setFieldValue("per_city", "");
                        setFieldValue("per_postal", "");
                      }
                    }}
                    className="text-[#1F4B7F] font-semibold text-[1vw] mt-[1vw]"
                  >
                    Temporary Address same as Permanent Address
                  </Checkbox>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-[1vw]">
                <div className="col-span-1">
                  <label className="text-[#1F4B7F]  text-[1vw] font-bold ">
                    Address
                    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                      {" "}
                      *
                    </span>
                  </label>
                  <div className="relative">
                    <Field
                      type="text"
                      name="per_address"
                      placeholder="Enter Permanent Address"
                      value={values.per_address}
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
                      name="per_address"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </div>
                </div>
                <div className="col-span-1">
                  <label className="text-[#1F4B7F]  text-[1vw] font-bold ">
                    State
                    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                      {" "}
                      *
                    </span>
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
                        value={values.per_state}
                        onChange={(value) => {
                          setFieldValue("per_state", value);
                          sessionStorage.setItem("status", value);
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
                          { value: "Kerala", label: "Kerala" },
                          { value: "Andhra", label: "Andhra" },
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
                      name="per_state"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </div>
                </div>
                <div className="col-span-1">
                  <label className="text-[#1F4B7F]  text-[1vw] font-bold ">
                    Region
                    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                      {" "}
                      *
                    </span>
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
                        placeholder="Select Region"
                        value={values.per_region}
                        onChange={(value) => {
                          setFieldValue("per_region", value);
                          sessionStorage.setItem("status", value);
                        }}
                        disabled={isEdit === false}
                        suffixIcon={
                          <span style={{ fontSize: "1vw", color: "#1f487c" }}>
                            <IoMdArrowDropdown size="2vw" />
                          </span>
                        }
                        options={[
                          { value: "", label: "Select Region" },
                          { value: "southernregion", label: "Southern Region" },
                          { value: "northerregion", label: "Northern Region" },
                          { value: "easternregion", label: "Eastern Region" },
                          { value: "westerregion", label: "Western Region" },
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
                      name="per_region"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </div>
                </div>
                <div className="col-span-1">
                  <label className="text-[#1F4B7F]  text-[1vw] font-bold ">
                    City
                    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                      {" "}
                      *
                    </span>
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
                        value={values.per_city}
                        onChange={(value) => {
                          setFieldValue("per_city", value);
                          sessionStorage.setItem("status", value);
                        }}
                        disabled={isEdit === false}
                        suffixIcon={
                          <span style={{ fontSize: "1vw", color: "#1f487c" }}>
                            <IoMdArrowDropdown size="2vw" />
                          </span>
                        }
                        options={[
                          { value: "", label: "Select City" },
                          { value: "Tiruppur", label: "Tiruppur" },
                          { value: "Coimbatore", label: "Coimbatore" },
                          { value: "Chennai", label: "Chennai" },
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
                      name="per_city"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </div>
                </div>
                <div className="col-span-1">
                  <label className="text-[#1F4B7F]  text-[1vw] font-bold ">
                    Country
                    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                      {" "}
                      *
                    </span>
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
                        placeholder="Select Country"
                        value={values.per_country}
                        onChange={(value) => {
                          setFieldValue("per_country", value);
                          sessionStorage.setItem("status", value);
                        }}
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
                      name="per_country"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </div>
                </div>
                <div className="col-span-1">
                  <label className="text-[#1F4B7F]  text-[1vw] font-bold ">
                    Postal/Zip Code
                    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                      {" "}
                      *
                    </span>
                  </label>
                  <div className="relative">
                    <Field
                      type="text"
                      name="per_postal"
                      placeholder="Enter Postal Code"
                      value={values.per_postal}
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
                      name="per_postal"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </div>
                </div>
              </div>
            )}
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
