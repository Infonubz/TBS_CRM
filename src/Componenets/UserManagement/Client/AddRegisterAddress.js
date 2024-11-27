import { ConfigProvider, Progress, Select } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  GetClientAddressById,
  SubmitAddressData,
} from "../../../Api/UserManagement/Client";
import { useDispatch } from "react-redux";
import { SubmitClientAddressData } from "../../../Api/UserManagement/Client";
import { IoMdArrowDropdown } from "react-icons/io";

const validationSchema = Yup.object().shape({
  country: Yup.string().required("Country required"),
  state: Yup.string().required("State required"),
  city: Yup.string().required("City required"),
  region: Yup.string().required("Region required"),

  address: Yup.string().required("Address is required")
  .max(100,"Maximum 100 characters only"),
  postal: Yup.string()
    // .matches(/^[0-9]+$/, "Postal Code must be a number")
    .matches(/^\d{6}$/, "Postal code must be a valid 6-digit code")
    .required("Postal Code is required"),
});
export default function AddRegisterAddress({
  setCurrentpage,
  SPA_ID,
  clientID,
  superadmindata,
  setClientID,
  setbusinessback,
  setBusinessBack,
  businessback,
  setAddressBack,
  updatedata,gstback
}) {
  
  const [enable, setEnable] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    console.log(gstback,"hiihih");
    if (clientID && enable == false && gstback == true || updatedata && enable == false) {
      setCurrentpage(3);
    } else {
      try {
        const data = await SubmitClientAddressData(
          values,
          clientID,
          enable,
          dispatch
        );
        // setModalIsOpen(false);
        toast.success(data?.message);
        setCurrentpage(3);
        // GetOffersData(dispatch);
        console.log(data);
      } catch (error) {
        console.error("Error uploading data", error);
      }
    }
  };

  const [clientAddress, setClientAddress] = useState("");

  const fetchGetUser = async () => {
    try {
      const data = await GetClientAddressById(
        clientID,
        setClientID,
        setClientAddress
      );
      setClientAddress(data);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  useEffect(() => {
    if (clientID != null || enable || gstback) {
      fetchGetUser();
    }
  }, [clientID, setClientID, setClientAddress, enable, gstback]);

  console.log(clientID, "setClientID");
  console.log(clientAddress, "superadminaddressdata");

  return (
    <div>
      <div className="border-l-[0.1vw] px-[2vw] umselect border-t-[0.1vw] border-b-[0.3vw] border-r-[0.1vw] relative rounded-[1vw] mt-[1.5vw] border-[#1f4b7f]">
        <div className="h-[4vw] w-full flex items-center justify-between ">
          <label className="text-[1.5vw] font-semibold text-[#1f4b7f] ">
            Registered Address
          </label>
          {updatedata || gstback ? (
            <button
              className={`${
                enable
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
              country: clientAddress?.country || "",
              city: clientAddress?.city || "",
              state: clientAddress?.state || "",
              postal: clientAddress?.zip_code || "",
              address: clientAddress?.address || "",
              region: clientAddress?.region || "",
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
                <div className="gap-y-[1.5vw] flex-col flex">
                  <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                    <div className="col-span-1 relative">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Address
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        type="text"
                        name="address"
                        placeholder="Enter Address"
                        // value={values.firstname}
                        disabled={
                          updatedata || gstback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          updatedata || gstback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      />
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw] left-[.2vw]"
                      />
                    </div>
                    <div className="col-span-1 relative">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        State
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      {/* <Field
                        as="select"
                        name="state"
                        id="state"
                        value={values.state}
                        disabled={
                          updatedata || gstback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          updatedata || gstback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      >
                        <option label="Select State" value="" className="" />
                        <option
                          label="Tamilnadu"
                          value="Tamilnadu"
                          className=""
                        />
                        <option
                          label="Karnataka"
                          value="Karnataka"
                          className=""
                        />
                        <option label="Andhra" value="Andhra" className="" />
                        <option label="Kerla" value="Kerla" className="" />
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
                        <Select
                          showSearch
                          value={values.state}
                          onChange={(value) => {
                            handleChange({ target: { name: 'state', value } })
                          }}
                          disabled={
                            updatedata || gstback
                              ? enable
                                ? false
                                : true
                              : false
                          }
                          name="temp_state"
                          className={`${updatedata || gstback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                            } custom-select bg-white border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                          // className="custom-select bg-white outline-none w-full mt-[0.5vw] h-[3vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-xl border-r-[0.2vw] border-b-[0.2vw] placeholder-[#1F487C]"
                          placeholder="Select state"
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
                                  Select State
                                </div>
                              ),
                              disabled: true,
                            },
                            {
                              value: 'Tamilnadu',
                              label: (
                                <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                  Tamilnadu
                                </div>
                              ),
                            },
                            {
                              value: 'Karnataka',
                              label: (
                                <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                  Karnataka
                                </div>
                              ),
                            },
                            {
                              value: 'Andhra',
                              label: (
                                <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                  Andhra
                                </div>
                              ),
                            },
                            {
                              value: 'Kerla',
                              label: (
                                <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                  Kerla
                                </div>
                              ),
                            },
                          ]}

                        />
                      </ConfigProvider>
                      <ErrorMessage
                        name="state"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw] left-[.2vw]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                    <div className="col-span-1 relative ">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Region
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      {/* <Field
                        as="select"
                        name="region"
                        id="region"
                        value={values.region}
                        disabled={
                          updatedata || gstback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          updatedata || gstback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      >
                        <option label="Select State" value="" className="" />
                        <option
                          label="Souther Region"
                          value="Souther Region"
                          className=""
                        />
                        <option
                          label="Northern Region"
                          value="Northern Region"
                          className=""
                        />
                        <option
                          label="Western Region"
                          value="Western Region"
                          className=""
                        />
                        <option
                          label="Eastern Region"
                          value="Eastern Region"
                          className=""
                        />
                        <option
                          label="North-Eastern Region"
                          value="North-Eastern Region"
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
                        <Select
                          showSearch
                          value={values.region}
                          onChange={(value) => {
                            handleChange({ target: { name: 'region', value } })
                          }}
                          disabled={
                            updatedata || gstback
                              ? enable
                                ? false
                                : true
                              : false
                          }
                          name="region"
                          className={`${updatedata || gstback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                            } custom-select bg-white border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                          // className="custom-select bg-white outline-none w-full mt-[0.5vw] h-[3vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-xl border-r-[0.2vw] border-b-[0.2vw] placeholder-[#1F487C]"
                          placeholder="Select region"
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
                                  Select Region
                                </div>
                              ),
                              disabled: true,
                            },
                            {
                              value: 'Souther Region',
                              label: (
                                <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                  Souther Region
                                </div>
                              ),
                            },
                            {
                              value: 'Northern Region',
                              label: (
                                <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                  Northern Region
                                </div>
                              ),
                            },
                            {
                              value: 'Western Region',
                              label: (
                                <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                  Western Region
                                </div>
                              ),
                            },
                            {
                              value: 'Eastern Region',
                              label: (
                                <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                  Eastern Region
                                </div>
                              ),
                            },
                            {
                              value: 'North-Eastern Region',
                              label: (
                                <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                  North-Eastern Region
                                </div>
                              ),
                            },
                          ]}                          
                          
                        />
                      </ConfigProvider>
                      <ErrorMessage
                        name="region"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw] left-[.2vw]"
                      />
                    </div>
                    <div className="col-span-1 relative">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        City
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      {/* <Field
                        as="select"
                        name="city"
                        id="city"
                        value={values.city}
                        disabled={
                          updatedata || gstback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          updatedata || gstback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      >
                        <option label="Select City" value="" className="" />
                        <option label="Tirupur" value="Tirupur" className="" />
                        <option
                          label="Coimbatore"
                          value="Coimbatore"
                          className=""
                        />
                        <option label="Chennai" value="Chennai" className="" />
                        <option
                          label="Pondicherry"
                          value="Pondicherry"
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
                        <Select
                          showSearch
                          value={values.city}
                          onChange={(value) => {
                            handleChange({ target: { name: 'city', value } })
                          }}
                          disabled={
                            updatedata || gstback
                              ? enable
                                ? false
                                : true
                              : false
                          }
                          name="city"
                          className={`${updatedata || gstback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                            } custom-select bg-white border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                          // className="custom-select bg-white outline-none w-full mt-[0.5vw] h-[3vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-xl border-r-[0.2vw] border-b-[0.2vw] placeholder-[#1F487C]"
                          placeholder="Select city"
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
                                  Select City
                                </div>
                              ),
                              disabled: true,
                            },
                            {
                              value: 'Tirupur',
                              label: (
                                <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                  Tirupur
                                </div>
                              ),
                            },
                            {
                              value: 'Coimbatore',
                              label: (
                                <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                  Coimbatore
                                </div>
                              ),
                            },
                            {
                              value: 'Chennai',
                              label: (
                                <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                  Chennai
                                </div>
                              ),
                            },
                            {
                              value: 'Pondicherry',
                              label: (
                                <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                  Pondicherry
                                </div>
                              ),
                            },
                          ]}
                              
                        />
                      </ConfigProvider>
                      <ErrorMessage
                        name="city"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw] left-[.2vw]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                    <div className="col-span-1 relative">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Country
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      {/* <Field
                        as="select"
                        name="country"
                        id="country"
                        value={values.country}
                        disabled={
                          updatedata || gstback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          updatedata || gstback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      >
                        <option label="Select Country" value="" className="" />
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
                          },
                        }}
                      >
                        <Select
                          showSearch
                          value={values.country}
                          onChange={(value) => {
                            handleChange({ target: { name: 'country', value } })
                          }}
                          disabled={
                            updatedata || gstback
                              ? enable
                                ? false
                                : true
                              : false
                          }
                          name="country"
                          className={`${updatedata || gstback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                            } custom-select bg-white border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                          // className="custom-select bg-white outline-none w-full mt-[0.5vw] h-[3vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-xl border-r-[0.2vw] border-b-[0.2vw] placeholder-[#1F487C]"
                          placeholder="Select Country"
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
                                  Select Country
                                </div>
                              ),
                              disabled: true,
                            },
                            {
                              value: 'India',
                              label: (
                                <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                  India
                                </div>
                              ),
                            },
                            {
                              value: 'America',
                              label: (
                                <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                  America
                                </div>
                              ),
                            },
                            {
                              value: 'Australia',
                              label: (
                                <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                  Australia
                                </div>
                              ),
                            },
                            {
                              value: 'Malasiya',
                              label: (
                                <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                  Malasiya
                                </div>
                              ),
                            },
                          ]}
                             
                        />
                      </ConfigProvider>
                      <ErrorMessage
                        name="country"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw] left-[.2vw]"
                      />
                    </div>
                    <div className="col-span-1 relative">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Postal / Zip Code
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        type="text"
                        name="postal"
                        placeholder="Enter Postal Code"
                        // value={values.firstname}
                        disabled={
                          updatedata || gstback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          updatedata || gstback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      />
                      <ErrorMessage
                        name="postal"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw] left-[.2vw]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-[1vw]">
                    <div>
                      <h1 className="text-[#1F4B7F] text-[0.8vw] font-semibold">
                        *You must fill in all fields to be able to continue
                      </h1>
                    </div>
                    <div className="flex items-center gap-x-[1vw]">
                      <button
                        className="border-[#1F487C] w-[5vw] font-semibold text-[1vw] h-[2vw] rounded-full border-r-[0.2vw]  border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw]"
                        onClick={() => {
                          setCurrentpage(1);
                          setAddressBack(true);
                        }}
                      >
                        Back
                      </button>
                      <button
                        className="bg-[#1F487C] font-semibold rounded-full w-[10vw] h-[2vw] text-[1vw] text-white"
                        type="submit"
                        // onClick={() => setCurrentpage(3)}
                      >
                        {updatedata || gstback
                          ? enable
                            ? "Update & Continue"
                            : "Continue"
                          : "Continue"}
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
