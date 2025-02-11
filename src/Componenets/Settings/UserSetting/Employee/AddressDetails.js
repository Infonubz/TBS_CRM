import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { Checkbox, ConfigProvider, Progress, Select } from "antd";
import {
  GetEmployeeAddressData,
  submitEmployeeAddressData,
} from "../../../../Api/Settings/UserSettings/Employee";
import { IoMdArrowDropdown } from "react-icons/io";

const validationSchema = Yup.object().shape({
  temp_address: Yup.string().required("Temporary Address is required"),
  per_address: Yup.string().required("Permanent Address is required"),
  temp_country: Yup.string().required("Please select an Country"),
  per_country: Yup.string().required("Please select an Country"),
  temp_state: Yup.string().required("Please select an State"),
  per_state: Yup.string().required("Please select an State"),
  temp_city: Yup.string().required("Please select an City"),
  per_city: Yup.string().required("Please select an City"),
  temp_region: Yup.string().required("Please select a Region"),
  per_region: Yup.string().required("Please select a Region"),
});

const AddressDetails = ({ addressType }) => {
  const [empAddress, setEmpAddress] = useState();

  const [tempAddress, setTempAddress] = useState({
    address: "",
    state: "",
    region: "",
    phone: "",
    city: "",
    country: "",
    postalcode: "",
  });

  const [isEdit, setIsEdit] = useState(false);

  console.log(empAddress, "emp_address");
  const fetchEmpAddress = async () => {
    try {
      const data = await GetEmployeeAddressData();
      setEmpAddress(data);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  useEffect(() => {
    fetchEmpAddress();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const data = await submitEmployeeAddressData(values);
      GetEmployeeAddressData();
      toast.success(data?.message);
      console.log(data);
    } catch (error) {
      console.error("Error uploading data", error);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          temp_address: empAddress ? empAddress.temp_add : "",
          temp_country: empAddress ? empAddress.temp_country : "",
          temp_state: empAddress ? empAddress.temp_state : "",
          temp_city: empAddress ? empAddress.temp_city : "",
          temp_region: empAddress ? empAddress.temp_region : "",
          per_region: empAddress ? empAddress.perm_region : "",
          per_address: empAddress ? empAddress.perm_add : "",
          per_country: empAddress ? empAddress.perm_country : "",
          per_state: empAddress ? empAddress.perm_state : "",
          per_city: empAddress ? empAddress.perm_city : "",
          per_postal: empAddress ? empAddress.perm_zip_code : "",
          temp_postal: empAddress ? empAddress.temp_zip_code : "",
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
            <div className="gap-y-[1.5vw] flex-col flex">
              <div className=" ">
                {addressType === "temporary" ? (
                  <div className="relative">
                    <div className="grid grid-cols-2 gap-[1vw]">
                      <div className="col-span-1">
                        <label className="text-[#1F4B7F] text-[1vw]  font-bold ">
                          Address
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                            *
                          </span>
                        </label>
                        <div className="relative">
                          <Field
                            type="text"
                            name="temp_address"
                            placeholder="Enter Address"
                            value={values.temp_address}
                            // onChange={() => {
                            //   setTempAddress({ address: values.temp_address })
                            // }}
                            className={`border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${
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
                            className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                          />
                        </div>
                      </div>
                      <div className="col-span-1">
                        <label className="text-[#1F4B7F] text-[1vw] font-bold  ">
                          State
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
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
                              className={` custom-select border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${
                                isEdit === false ? "cursor-not-allowed" : ""
                              }`}
                              placeholder="Select State"
                              value={values.temp_state}
                              onChange={(value) => {
                                setFieldValue("temp_state", value);
                              }}
                              disabled={isEdit === false}
                              suffixIcon={
                                <span
                                  style={{ fontSize: "1vw", color: "#1f487c" }}
                                >
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
                            className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                          />
                        </div>
                      </div>
                      <div className="col-span-1">
                        <label className="text-[#1F4B7F] text-[1vw] font-bold font-bold ">
                          Region
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
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
                              className={`custom-select border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${
                                isEdit === false ? "cursor-not-allowed" : ""
                              }`}
                              placeholder="Select Region"
                              value={values.temp_region}
                              onChange={(value) => {
                                setFieldValue("temp_region", value);
                              }}
                              disabled={isEdit === false}
                              suffixIcon={
                                <span
                                  style={{ fontSize: "1vw", color: "#1f487c" }}
                                >
                                  <IoMdArrowDropdown size="2vw" />
                                </span>
                              }
                              options={[
                                { value: "", label: "Select Region" },
                                {
                                  value: "southerregion",
                                  label: "Southern Region",
                                },
                                {
                                  value: "northerregion",
                                  label: "Northern Region",
                                },
                                {
                                  value: "easterregion",
                                  label: "Eastern Region",
                                },
                                {
                                  value: "westerregion",
                                  label: "Western Region",
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
                            name="temp_postal"
                            component="div"
                            className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                          />
                        </div>
                      </div>
                      <div className="col-span-1">
                        <label className="text-[#1F4B7F] text-[1vw] font-bold font-bold ">
                          City
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
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
                              className={`custom-select border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${
                                isEdit === false ? "cursor-not-allowed" : ""
                              }`}
                              placeholder="Select City"
                              value={values.temp_city}
                              onChange={(value) => {
                                setFieldValue("temp_city", value);
                              }}
                              disabled={isEdit === false}
                              suffixIcon={
                                <span
                                  style={{ fontSize: "1vw", color: "#1f487c" }}
                                >
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
                            className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                          />
                        </div>
                      </div>
                      <div className="col-span-1">
                        <label className="text-[#1F4B7F] text-[1vw] font-bold font-bold ">
                          Country
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
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
                              className={`custom-select border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${
                                isEdit === false ? "cursor-not-allowed" : ""
                              }`}
                              placeholder="Select Country"
                              value={values.temp_country}
                              onChange={(value) => {
                                setFieldValue("temp_country", value);
                              }}
                              disabled={isEdit === false}
                              suffixIcon={
                                <span
                                  style={{ fontSize: "1vw", color: "#1f487c" }}
                                >
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
                            className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                          />
                        </div>
                      </div>
                      <div className="col-span-1">
                        <label className="text-[#1F4B7F] text-[1vw] font-bold font-bold ">
                          Postal/Zip Code
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                            *
                          </span>
                        </label>
                        <div className="relative">
                          <Field
                            type="text"
                            name="temp_postal"
                            placeholder="Enter Postal Code"
                            value={values.temp_postal}
                            // onChange={() => {
                            //   setTempAddress({ postalcode: values.temp_postal })
                            // }}
                            className={`border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${
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
                            className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
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
                      <label className="text-[#1F4B7F] text-[1vw] font-bold font-bold ">
                        Address
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <div className="relative">
                        <Field
                          type="text"
                          name="per_address"
                          placeholder="Enter Address"
                          value={values.per_address}
                          className={`border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${
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
                          className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                        />
                      </div>
                    </div>
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1vw] font-bold font-bold ">
                        State
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
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
                            className={` custom-select border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${
                              isEdit === false ? "cursor-not-allowed" : ""
                            }`}
                            placeholder="Select State"
                            value={values.per_state}
                            onChange={(value) => {
                              setFieldValue("per_state", value);
                            }}
                            disabled={isEdit === false}
                            suffixIcon={
                              <span
                                style={{ fontSize: "1vw", color: "#1f487c" }}
                              >
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
                          className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                        />
                      </div>
                    </div>
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1vw] font-bold font-bold ">
                        Region
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
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
                            className={`custom-select border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${
                              isEdit === false ? "cursor-not-allowed" : ""
                            }`}
                            placeholder="Select Region"
                            value={values.per_region}
                            onChange={(value) => {
                              setFieldValue("per_region", value);
                            }}
                            disabled={isEdit === false}
                            suffixIcon={
                              <span
                                style={{ fontSize: "1vw", color: "#1f487c" }}
                              >
                                <IoMdArrowDropdown size="2vw" />
                              </span>
                            }
                            options={[
                              { value: "", label: "Select Region" },
                              {
                                value: "southerregion",
                                label: "Southern Region",
                              },
                              {
                                value: "northerregion",
                                label: "Northern Region",
                              },
                              {
                                value: "easterregion",
                                label: "Eastern Region",
                              },
                              {
                                value: "westerregion",
                                label: "Western Region",
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
                          name="per_region"
                          component="div"
                          className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                        />
                      </div>
                    </div>
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1vw] font-bold font-bold ">
                        City
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
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
                            className={`custom-select border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${
                              isEdit === false ? "cursor-not-allowed" : ""
                            }`}
                            placeholder="Select City"
                            value={values.per_city}
                            onChange={(value) => {
                              setFieldValue("per_city", value);
                            }}
                            disabled={isEdit === false}
                            suffixIcon={
                              <span
                                style={{ fontSize: "1vw", color: "#1f487c" }}
                              >
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
                          className="text-red-500 text-[0.8vw] absolute bottom-[1.2vw]"
                        />
                      </div>
                    </div>
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1vw] font-bold font-bold ">
                        Country
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
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
                            className={` custom-select border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${
                              isEdit === false ? "cursor-not-allowed" : ""
                            }`}
                            placeholder="Select Country"
                            value={values.per_country}
                            onChange={(value) => {
                              setFieldValue("per_country", value);
                            }}
                            disabled={isEdit === false}
                            suffixIcon={
                              <span
                                style={{ fontSize: "1vw", color: "#1f487c" }}
                              >
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
                          className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                        />
                      </div>
                    </div>
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1vw] font-bold font-bold ">
                        Postal/Zip Code
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <div className="relative">
                        <Field
                          type="text"
                          name="per_postal"
                          placeholder="Enter Postal Code"
                          value={values.per_postal}
                          className={`border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${
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
                          className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                        />
                      </div>
                    </div>
                  </div>
                )}
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
                    Submit
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

export default AddressDetails;
