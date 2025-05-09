import { ConfigProvider, Progress, Select, Spin } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState, useRef } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import umbuslogo from "../../../asserts/umbuslogo.png";
import * as Yup from "yup";
import {
  GetSuperAdminAddressById,
  SubmitAddressData,
} from "../../../Api/UserManagement/SuperAdmin";
import { useDispatch } from "react-redux";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import usePreventDragAndDrop from "../../Hooks/usePreventDragAndDrop";
import axios from "axios";

const validationSchema = Yup.object().shape({
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string()
  .required("City is required"),
  region: Yup.string().required("Region is required"),

  address: Yup.string()
    .required("Address is required")
    .max(100, "Maximum 100 characters only"),
  postal: Yup.string()
    // .matches(/^[0-9]+$/, "Postal Code must be a number")
    .matches(/^\d{6}$/, "Postal code must be a valid 6-digit code")
    .required("Postal Code is required"),
});
export default function AddRegisterAddress({
  setCurrentpage,
  SPA_ID,
  operatorID,
  superadmindata,
  setOperatorID,
  setbusinessback,
  setBusinessBack,
  businessback,
  setAddressBack,
  updatedata,
}) {
     
  const [enable, setEnable] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    console.log("hiihih");
    if (
      (operatorID && enable == false && businessback == true) ||
      (updatedata && superadminaddressdata?.address != null && enable == false)
    ) {
      setCurrentpage(3);
    } else {
      try {
        const data = await SubmitAddressData(
          values,
          operatorID,
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
  const [superadminaddressdata, setSuperAdminAddressData] = useState("");
  const fetchGetUser = async () => {
    try {
      const data = await GetSuperAdminAddressById(
        operatorID,
        setOperatorID,
        setSuperAdminAddressData,
        setSpinning
      );
      setSuperAdminAddressData(data);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  useEffect(() => {
    if (operatorID != null || enable || businessback) {
      fetchGetUser();
      setSpinning(true);
    }
  }, [
    operatorID,
    setOperatorID,
    setSuperAdminAddressData,
    // enable,
    businessback,
  ]);
  console.log(operatorID, "operatorID55555");
  console.log(superadminaddressdata, "superadminaddressdata");

  const handleInput = (e) => {
    // e.target.value = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '');
    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, ''); // Remove special characters and numbers
  };

  const stationUrl = process.env.REACT_APP_API_WEB_URL
  const[cities,setCities] = useState([])
  const[states,setStates] = useState([])
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${stationUrl}/getStation/$`);
        const cityOptions = response.data.map(city => ({
          value: city.station_name,
          label: (
            <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
              {city.station_name}
            </div>
          ),
          state: city.state_name
        }));
        setCities(cityOptions);
        console.log(cityOptions,"cities api")
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, []);

  const fetchAllCities = async (searchText) => {
    try {
      const response = await axios.get(searchText?`${stationUrl}/getStation/${searchText}`:`${stationUrl}/getStation/$`);
      const cityOptions = response.data.map(city => ({
        value: city.station_name,
        label: (
          <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
            {city.station_name}
          </div>
        ),
        state: city.state_name
      }));
      setCities(cityOptions);
      console.log(response, "all cities")
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleCityChange = (value, setFieldValue) => {
    setSelectedCity(value);
    const selectedCityData = cities.find(city => city.value === value);
    if (selectedCityData) {
      // setStates(selectedCityData.state);
      setFieldValue('state', selectedCityData.state);
    }
  };

  // useEffect(() => {
  //   const fetchStates = async () => {
  //     try {
  //       const response = await axios.get(`${stationUrl}/getStation/$`);
  //       const stateOptions = response.data.map(state => ({
  //         value: state.state_name,
  //         label: (
  //           <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
  //             {state.state_name}
  //           </div>
  //         ),
  //       }));
  //       // setStates(stateOptions);
  //       console.log(stateOptions,"states api")
  //     } catch (error) {
  //       console.error('Error fetching cities:', error);
  //     }
  //   };

  //   fetchStates();
  // }, []);

  // const fetchAllStates = async (searchText) => {
  //   try {
  //     const response = await axios.get(searchText?`${stationUrl}/getStation/${searchText}`:`${stationUrl}/getStation/$`);
  //     const stateOptions = response.data.map(state => ({
  //       value: state.state_name,
  //       label: (
  //         <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
  //           {state.state_name}
  //         </div>
  //       ),
  //     }));
  //     setCities(stateOptions);
  //     console.log(response, "all cities")
  //   } catch (error) {
  //     console.error('Error fetching cities:', error);
  //   }
  // };


  return (

    <div>
      <div className="border-l-[0.1vw] umselect px-[2vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.1vw] rounded-[1vw] border-[#1f4b7f] mt-[1vw] relative">
        <div className="w-[5vw] h-[5vw] bg-white shadow-lg rounded-full absolute left-[16.6vw] top-[-2.5vw] flex justify-center items-center">
          <img className="" src={umbuslogo} alt="buslogo" />
        </div>
        <div className="h-[4vw] w-full flex items-center justify-between ">
          <label className="text-[1.5vw] font-semibold text-[#1f4b7f] ">
            Address Details
          </label>
          {(updatedata && superadminaddressdata?.address != null) ||
          businessback ? (
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
              country: superadminaddressdata?.country || "",
              city: superadminaddressdata?.city || "",
              state: superadminaddressdata?.state || "",
              postal: superadminaddressdata?.zip_code || "",
              address: superadminaddressdata?.address || "",
              region: superadminaddressdata?.region || "",
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
              inputRef7, 
              inputRef8,
            }) => (
              <Form onSubmit={handleSubmit}>
                {spinning ? (
                  <div className=" flex justify-center h-[23vw] items-center">
                    <Spin size="large" />
                  </div>
                ) : (
                  <div className="gap-y-[1.5vw] flex-col flex">
                    <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                      <div className="col-span-1 relative">
                        <label className="text-[#1F4B7F] text-[1.1vw] ">
                          Address
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="address"
                          style={{ display: "none" }}
                        />
                        <Field
                          type="text"
                          name="address"
                          // autoComplete="address-field"
                          autoComplete="off"
                          placeholder="Enter Address"
                          innerRef={inputRef7}
                          // value={values.firstname}
                          disabled={
                            (updatedata &&
                              superadminaddressdata?.address != null) ||
                            businessback
                              ? enable
                                ? false
                                : true
                              : false
                          }
                          className={`${
                            (updatedata &&
                              superadminaddressdata?.address != null) ||
                            businessback
                              ? enable == false
                                ? " cursor-not-allowed"
                                : ""
                              : ""
                          } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw] placeholder:font-sans`}
                        />
                        <ErrorMessage
                          name="address"
                          component="div"
                          className="text-red-500 text-[0.8vw] absolute left-[.2vw] bottom-[-1.2vw]"
                        />
                      </div>
                      <div className="col-span-1 relative">
                        <label className="text-[#1F4B7F] text-[1.1vw] ">
                          Postal / Zip Code
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="postal"
                          style={{ display: "none" }}
                        />
                        <Field
                          type="text"
                          name="postal"
                          autoComplete="postal-field"
                          placeholder="Enter Postal Code"
                          innerRef={inputRef8}
                          // value={values.firstname}
                          disabled={
                            (updatedata &&
                              superadminaddressdata?.address != null) ||
                            businessback
                              ? enable
                                ? false
                                : true
                              : false
                          }
                          className={`${
                            (updatedata &&
                              superadminaddressdata?.address != null) ||
                            businessback
                              ? enable == false
                                ? " cursor-not-allowed"
                                : ""
                              : ""
                          } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw] placeholder:font-sans`}
                        />
                        <ErrorMessage
                          name="postal"
                          component="div"
                          className="text-red-500 text-[0.8vw] absolute left-[.2vw] bottom-[-1.2vw]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 w-full gap-x-[2vw]">
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
                          updatedata || businessback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          updatedata || businessback
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
                                optionActiveBg: "#aebed1",
                                optionSelectedColor: "#FFF",
                                optionSelectedBg: "#e5e5e5",
                                optionHeight: "2",
                              },
                            },
                          }}
                        >
                          <input
                            type="text"
                            name="city"
                            style={{ display: "none" }}
                          />
                          <Select
                            showSearch
                            // value={values.city}
                            value={values.city || undefined}
                            autoComplete="city-field"
                            placeholder="Select city"
                            onChange={(value) => {
                              handleChange({ target: { name: "city", value } });
                              handleCityChange(value, setFieldValue)
                              // fetchAllCities(value);
                              console.log(value, 'city value')
                            }}
                            onSearch={fetchAllCities}
                            onInput={handleInput}
                            disabled={
                              (updatedata &&
                                superadminaddressdata?.address != null) ||
                              businessback
                                ? enable
                                  ? false
                                  : true
                                : false
                            }
                            name="city"
                            listHeight={190}
                            // dropdownStyle={{
                            //   maxHeight: "150px", // Adjust the maximum height here
                            //   overflowY: "auto !important ",  // Make the dropdown scrollable if content exceeds maxHeight
                            // }}

                            className={`${
                              (updatedata &&
                                superadminaddressdata?.address != null) ||
                              businessback
                                ? enable == false
                                  ? " cursor-not-allowed bg-[#FAFAFA]"
                                  : ""
                                : ""
                            } custom-select bg-white border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                            // className="custom-select bg-white outline-none w-full mt-[0.5vw] h-[3vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-xl border-r-[0.2vw] border-b-[0.2vw] placeholder-[#1F487C]"
                            
                            filterOption={
                              (input, option) =>
                                option?.value
                                  ?.toLowerCase()
                                  ?.includes(input.toLowerCase()) 
                            }
                            optionFilterProp="value"
                            suffixIcon={
                              <span
                                style={{ fontSize: "1vw", color: "#1f487c" }}
                              >
                                <IoMdArrowDropdown size="2vw" />
                              </span>
                            }
                            style={{ padding: 4 }}
                            options={cities}
                            // options={[
                            //   {
                            //     value: "",
                            //     label: (
                            //       <div className="text-[1vw] px-[0.2vw] pb-[0.1vw] text-gray-400">
                            //         Select City
                            //       </div>
                            //     ),
                            //     disabled: true,
                            //   },
                            //   {
                            //     value: "Tirupur",
                            //     label: (
                            //       <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                            //         Tirupur
                            //       </div>
                            //     ),
                            //   },
                            //   {
                            //     value: "Coimbatore",
                            //     label: (
                            //       <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                            //         Coimbatore
                            //       </div>
                            //     ),
                            //   },
                            //   {
                            //     value: "Chennai",
                            //     label: (
                            //       <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                            //         Chennai
                            //       </div>
                            //     ),
                            //   },
                            //   {
                            //     value: "Pondicherry",
                            //     label: (
                            //       <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                            //         Pondicherry
                            //       </div>
                            //     ),
                            //   },
                            // ]}
                          />
                        </ConfigProvider>
                        <ErrorMessage
                          name="city"
                          component="div"
                          className="text-red-500 text-[0.8vw] absolute left-[.2vw] bottom-[-1.2vw]"
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
                          updatedata || businessback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          updatedata || businessback
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
                                optionActiveBg: "#aebed1",
                                optionSelectedColor: "#FFF",
                                optionSelectedBg: "#e5e5e5",
                                optionHeight: "2",
                              },
                            },
                          }}
                        >
                          <input
                            type="text"
                            name="state"
                            style={{ display: "none" }}
                          />
                          <Field
                          type="text"
                          name="state"
                          // autoComplete="address-field"
                          autoComplete="off"
                          placeholder="Select State"
                          // innerRef={inputRef7}
                          value={values.state}
                          disabled={
                            (updatedata &&
                              superadminaddressdata?.address != null) ||
                            businessback
                              ? enable
                                ? false
                                : true
                              : false
                          }
                          className={`${
                            (updatedata &&
                              superadminaddressdata?.address != null) ||
                            businessback
                              ? enable == false
                                ? " cursor-not-allowed"
                                : ""
                              : ""
                          } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw] placeholder:font-sans`}
                        />
                          {/* <Select
                            showSearch
                            value={values.state}
                            autoComplete="state-field"
                            onChange={(value) => {
                              handleChange({
                                target: { name: "state", value },
                              });
                            }}
                            // onSearch={fetchAllStates}
                            onInput={handleInput}
                            disabled={
                              (updatedata &&
                                superadminaddressdata?.address != null) ||
                              businessback
                                ? enable
                                  ? false
                                  : true
                                : false
                            }
                            name="state"
                            listHeight={190}
                            className={`${
                              (updatedata &&
                                superadminaddressdata?.address != null) ||
                              businessback
                                ? enable == false
                                  ? " cursor-not-allowed bg-[#FAFAFA]"
                                  : ""
                                : ""
                            } custom-select bg-white border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                            // className="custom-select bg-white outline-none w-full mt-[0.5vw] h-[3vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-xl border-r-[0.2vw] border-b-[0.2vw] placeholder-[#1F487C]"
                            placeholder="Select state"
                            filterOption={
                              (input, option) =>
                                option?.value
                                  ?.toLowerCase()
                                  ?.includes(input.toLowerCase()) // Make it case-insensitive
                            }
                            optionFilterProp="value"
                            suffixIcon={
                              <span
                                style={{ fontSize: "1vw", color: "#1f487c" }}
                              >
                                <IoMdArrowDropdown size="2vw" />
                              </span>
                            }
                            style={{ padding: 4 }}
                            // options={states}
                            // options={[
                            //   {
                            //     value: "",
                            //     label: (
                            //       <div className="text-[1vw] px-[0.2vw] pb-[0.1vw] text-gray-400">
                            //         Select State
                            //       </div>
                            //     ),
                            //     disabled: true,
                            //   },
                            //   {
                            //     value: "Tamilnadu",
                            //     label: (
                            //       <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                            //         Tamilnadu
                            //       </div>
                            //     ),
                            //   },
                            //   {
                            //     value: "Karnataka",
                            //     label: (
                            //       <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                            //         Karnataka
                            //       </div>
                            //     ),
                            //   },
                            //   {
                            //     value: "Andhra",
                            //     label: (
                            //       <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                            //         Andhra
                            //       </div>
                            //     ),
                            //   },
                            //   {
                            //     value: "Kerla",
                            //     label: (
                            //       <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                            //         Kerla
                            //       </div>
                            //     ),
                            //   },
                            //   {
                            //     value: "Telangana",
                            //     label: (
                            //       <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                            //         Telangana
                            //       </div>
                            //     ),
                            //   },
                            // ]}
                          /> */}
                        </ConfigProvider>
                        <ErrorMessage
                          name="state"
                          component="div"
                          className="text-red-500 text-[0.8vw] absolute left-[.2vw] bottom-[-1.2vw]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                      <div className="col-span-1 relative">
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
                          updatedata || businessback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          updatedata || businessback
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
                                optionActiveBg: "#aebed1",
                                optionSelectedColor: "#FFF",
                                optionSelectedBg: "#e5e5e5",
                                optionHeight: "2",
                              },
                            },
                          }}
                        >
                          <input
                            type="text"
                            name="region"
                            style={{ display: "none" }}
                          />
                          <Select
                            showSearch
                            value={values.region}
                            autoComplete="region-field"
                            onChange={(value) => {
                              handleChange({
                                target: { name: "region", value },
                              });
                            }}
                            onInput={handleInput}
                            disabled={
                              (updatedata &&
                                superadminaddressdata?.address != null) ||
                              businessback
                                ? enable
                                  ? false
                                  : true
                                : false
                            }
                            name="region"
                            listHeight={190}
                            placement="topRight"
                            className={`${
                              (updatedata &&
                                superadminaddressdata?.address != null) ||
                              businessback
                                ? enable == false
                                  ? " cursor-not-allowed bg-[#FAFAFA]"
                                  : ""
                                : ""
                            } custom-select bg-white border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                            // className="custom-select bg-white outline-none w-full mt-[0.5vw] h-[3vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-xl border-r-[0.2vw] border-b-[0.2vw] placeholder-[#1F487C]"
                            placeholder="Select region"
                            filterOption={
                              (input, option) =>
                                option?.value
                                  ?.toLowerCase()
                                  ?.includes(input.toLowerCase()) // Make it case-insensitive
                            }
                            optionFilterProp="value"
                            suffixIcon={
                              <span
                                style={{ fontSize: "1vw", color: "#1f487c" }}
                              >
                                <IoMdArrowDropup size="2vw" />
                              </span>
                            }
                            style={{ padding: 4 }}
                            options={[
                              {
                                value: "",
                                label: (
                                  <div className="text-[1vw] px-[0.2vw] pb-[0.1vw] text-gray-400">
                                    Select Region
                                  </div>
                                ),
                                disabled: true,
                              },
                              {
                                value: "Southernregion",
                                label: (
                                  <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                    Southern Region
                                  </div>
                                ),
                              },
                              {
                                value: "Northernregion",
                                label: (
                                  <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                    Northern Region
                                  </div>
                                ),
                              },
                              {
                                value: "Westernregion",
                                label: (
                                  <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                    Western Region
                                  </div>
                                ),
                              },
                              {
                                value: "Easternregion",
                                label: (
                                  <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                    Eastern Region
                                  </div>
                                ),
                              },
                              {
                                value: "northeasternregion",
                                label: (
                                  <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                    North Eastern Region
                                  </div>
                                ),
                              },
                            ]}
                          />
                        </ConfigProvider>
                        <ErrorMessage
                          name="region"
                          component="div"
                          className="text-red-500 text-[0.8vw] absolute left-[.2vw] bottom-[-1.2vw]"
                        />
                      </div>
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
                          updatedata || businessback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          updatedata || businessback
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
                                optionActiveBg: "#aebed1",
                                optionSelectedColor: "#FFF",
                                optionSelectedBg: "#e5e5e5",
                                optionHeight: "2",
                              },
                            },
                          }}
                        >
                          <input
                            type="text"
                            name="country"
                            style={{ display: "none" }}
                          />
                          <Select
                            showSearch
                            value={values.country}
                            utoComplete="country-field"
                            onChange={(value) => {
                              handleChange({
                                target: { name: "country", value },
                              });
                            }}
                            onInput={handleInput}
                            disabled={
                              (updatedata &&
                                superadminaddressdata?.address != null) ||
                              businessback
                                ? enable
                                  ? false
                                  : true
                                : false
                            }
                            name="country"
                            listHeight={190}
                            placement="topRight"
                            className={`${
                              (updatedata &&
                                superadminaddressdata?.address != null) ||
                              businessback
                                ? enable == false
                                  ? " cursor-not-allowed bg-[#FAFAFA]"
                                  : ""
                                : ""
                            } custom-select bg-white border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                            // className="custom-select bg-white outline-none w-full mt-[0.5vw] h-[3vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-xl border-r-[0.2vw] border-b-[0.2vw] placeholder-[#1F487C]"
                            placeholder="Select Country"
                            filterOption={
                              (input, option) =>
                                option?.value
                                  ?.toLowerCase()
                                  ?.includes(input.toLowerCase()) // Make it case-insensitive
                            }
                            optionFilterProp="value"
                            suffixIcon={
                              <span
                                style={{ fontSize: "1vw", color: "#1f487c" }}
                              >
                                <IoMdArrowDropup size="2vw" />
                              </span>
                            }
                            style={{ padding: 4 }}
                            options={[
                              {
                                value: "",
                                label: (
                                  <div className="text-[1vw] px-[0.2vw] pb-[0.1vw] text-gray-400">
                                    Select Country
                                  </div>
                                ),
                                disabled: true,
                              },
                              {
                                value: "India",
                                label: (
                                  <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                    India
                                  </div>
                                ),
                              },
                              {
                                value: "America",
                                label: (
                                  <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                    America
                                  </div>
                                ),
                              },
                              {
                                value: "Australia",
                                label: (
                                  <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                    Australia
                                  </div>
                                ),
                              },
                              {
                                value: "Malasiya",
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
                          className="text-red-500 text-[0.8vw] absolute left-[.2vw] bottom-[-1.2vw]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between py-[1vw]">
                      <div>
                        <h1 className="text-[#1F4B7F] text-[0.7vw] font-semibold">
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
                          className="bg-[#1F487C] font-semibold rounded-full w-[11vw] h-[2vw] text-[1vw] text-white"
                          type="submit"
                          // onClick={() => setCurrentpage(3)}
                        >
                          {(updatedata &&
                            superadminaddressdata?.address != null) ||
                          businessback
                            ? enable
                              ? "Update & Continue"
                              : "Continue"
                            : "Continue"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
