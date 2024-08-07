import { Checkbox, Progress } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  GetEmpAddressById,
  submitEmployeeAddressData,
} from "../../../Api/UserManagement/Employee";
import { GetPatAddressById, submitPartnerAddressData } from "../../../Api/UserManagement/Partner";

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
export default function AddRegisterAddress({
  setCurrentpage,
  EmployeeID,
  setEmployeeID,
}) {
  const handleSubmit = async (values) => {
    // setCurrentpage(3);

    console.log("hihii54455");
    if (EmployeeID) {
      setCurrentpage(3);
    } else {
      try {
        const data = await submitPartnerAddressData(values);
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
  const [empaddressdata, setEmpAddressData] = useState("");
  const fetchGetUser = async () => {
    try {
      const data = await GetPatAddressById(
        EmployeeID,
        setEmployeeID,
        setEmpAddressData
      );
      setEmpAddressData(data);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  useEffect(() => {
    if (EmployeeID != null) {
      fetchGetUser();
    }
  }, [EmployeeID, setEmployeeID, setEmpAddressData]);
  return (
    <div>
      <div className="border-l-[0.1vw] h-[28vw] overflow-y-scroll px-[2vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.1vw] rounded-[1vw] border-[#1f4b7f]">
        <div className="h-[4vw] w-full flex items-center justify-between ">
          <label className="text-[1.5vw] font-semibold text-[#1f4b7f] ">
            Registered Address
          </label>
          <button className="rounded-full font-semibold w-[6vw] h-[2vw] flex items-center justify-center border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.1vw] border-[#34AE2A] text-[1.1vw] text-[#34AE2A] ">
            Save
          </button>
        </div>
        <div className="pb-[1vw] ">
          <div className="border-b-[0.1vw] w-full border-[#1f4b7f] "></div>
        </div>
        <div>
          <Formik
            initialValues={{
              temp_address: empaddressdata || "",
              temp_country: empaddressdata || "",
              temp_state: empaddressdata || "",
              temp_city: empaddressdata || "",
              per_address: empaddressdata || "",
              per_country: empaddressdata || "",
              per_state: empaddressdata || "",
              per_city: empaddressdata || "",
              per_postal: empaddressdata || "",
              temp_postal: empaddressdata || "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log("hellooocsxpspxspxps");
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
                  <div className=" ">
                    <div className="grid grid-cols-2 w-full gap-x-[2vw] ">
                      <div className="col-span-1">
                        <button className="text-white font-semibold text-[1.1vw] bg-[#1F4B7F] w-full h-[3vw] rounded-[0.5vw]">
                          Temporary Address
                        </button>
                      </div>
                      <div className="col-span-1">
                        <button className="text-white font-semibold text-[1.1vw] bg-[#1F4B7F] w-full h-[3vw] rounded-[0.5vw]">
                          Permanent Address
                        </button>
                      </div>
                    </div>
                    <div>
                      <Checkbox
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
                    <div className="grid grid-cols-2 w-full gap-x-[2vw] pt-[1vw]">
                      <div className="col-span-1">
                        <label className="text-[#1F4B7F] text-[1.1vw] ">
                          Address
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                            *
                          </span>
                        </label>
                        <Field
                          type="text"
                          name="temp_address"
                          placeholder="Enter First Name"
                          // value={values.firstname}
                          className="border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                        />
                        <ErrorMessage
                          name="temp_address"
                          component="div"
                          className="text-red-500 text-[0.8vw]"
                        />
                      </div>
                      <div className="col-span-1">
                        <label className="text-[#1F4B7F] text-[1.1vw] ">
                          Address
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                            *
                          </span>
                        </label>
                        <Field
                          type="text"
                          name="per_address"
                          placeholder="Enter Last Name"
                          // value={values.firstname}
                          className="border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                        />
                        <ErrorMessage
                          name="per_address"
                          component="div"
                          className="text-red-500 text-[0.8vw]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 w-full gap-x-[2vw] pt-[1vw]">
                      <div className="col-span-1 ">
                        <label className="text-[#1F4B7F] text-[1.1vw] ">
                          Country
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                            *
                          </span>
                        </label>
                        <Field
                          as="select"
                          name="temp_country"
                          value={values.temp_country}
                          onChange={(e) => {
                            handleChange(e);
                            localStorage.setItem("status", e.target.value);
                          }}
                          className="border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                        >
                          <option
                            label="Select Country"
                            value=""
                            className=""
                          />
                          <option label="India" value="India" className="" />
                          <option
                            label="America"
                            value="America"
                            className=""
                          />
                          <option
                            label="Australia"
                            value="Australia"
                            className=""
                          />
                        </Field>
                        <ErrorMessage
                          name="temp_country"
                          component="div"
                          className="text-red-500 text-[0.8vw]"
                        />
                      </div>
                      <div className="col-span-1">
                        <label className="text-[#1F4B7F] text-[1.1vw] ">
                          Country
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                            *
                          </span>
                        </label>
                        <Field
                          as="select"
                          name="per_country"
                          value={values.per_country}
                          onChange={(e) => {
                            handleChange(e);
                            localStorage.setItem("status", e.target.value);
                          }}
                          className="border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                        >
                          <option
                            label="Select Country"
                            value=""
                            className=""
                          />
                          <option label="India" value="India" className="" />
                          <option
                            label="America"
                            value="America"
                            className=""
                          />
                          <option
                            label="Australia"
                            value="Australia"
                            className=""
                          />
                        </Field>
                        <ErrorMessage
                          name="per_country"
                          component="div"
                          className="text-red-500 text-[0.8vw]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 w-full gap-x-[2vw] pt-[1vw]">
                      <div className="col-span-1">
                        <label className="text-[#1F4B7F] text-[1.1vw] ">
                          State
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                            *
                          </span>
                        </label>
                        <Field
                          as="select"
                          name="temp_state"
                          value={values.temp_state}
                          onChange={(e) => {
                            handleChange(e);
                            localStorage.setItem("status", e.target.value);
                          }}
                          className="border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                        >
                          <option label="Select State" value="" className="" />
                          <option
                            label="Tamilnadu"
                            value="Tamilnadu"
                            className=""
                          />
                          <option label="Kerala" value="Kerala" className="" />
                          <option label="Andhra" value="Andhra" className="" />
                        </Field>
                        <ErrorMessage
                          name="temp_state"
                          component="div"
                          className="text-red-500 text-[0.8vw]"
                        />
                      </div>
                      <div className="col-span-1">
                        <label className="text-[#1F4B7F] text-[1.1vw] ">
                          State
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                            *
                          </span>
                        </label>
                        <Field
                          as="select"
                          name="per_state"
                          value={values.per_state}
                          onChange={(e) => {
                            handleChange(e);
                            localStorage.setItem("status", e.target.value);
                          }}
                          className="border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                        >
                          <option label="Select State" value="" className="" />
                          <option
                            label="Tamilnadu"
                            value="Tamilnadu"
                            className=""
                          />
                          <option label="Kerala" value="Kerala" className="" />
                          <option label="Andhra" value="Andhra" className="" />
                        </Field>
                        <ErrorMessage
                          name="per_state"
                          component="div"
                          className="text-red-500 text-[0.8vw]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 w-full gap-x-[2vw] pt-[1vw]">
                      <div className="col-span-1">
                        <label className="text-[#1F4B7F] text-[1.1vw] ">
                          City
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                            *
                          </span>
                        </label>
                        <Field
                          as="select"
                          name="temp_city"
                          value={values.temp_city}
                          onChange={(e) => {
                            handleChange(e);
                            localStorage.setItem("status", e.target.value);
                          }}
                          className="border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                        >
                          <option label="Select City" value="" className="" />
                          <option
                            label="Tiruppur"
                            value="Tiruppur"
                            className=""
                          />
                          <option
                            label="Coimbatore"
                            value="Coimbatore"
                            className=""
                          />
                          <option
                            label="Chennai"
                            value="Chennai"
                            className=""
                          />
                        </Field>
                        <ErrorMessage
                          name="temp_city"
                          component="div"
                          className="text-red-500 text-[0.8vw]"
                        />
                      </div>
                      <div className="col-span-1">
                        <label className="text-[#1F4B7F] text-[1.1vw] ">
                          City
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                            *
                          </span>
                        </label>
                        <Field
                          as="select"
                          name="per_city"
                          value={values.per_city}
                          onChange={(e) => {
                            handleChange(e);
                            localStorage.setItem("status", e.target.value);
                          }}
                          className="border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                        >
                          <option label="Select City" value="" className="" />
                          <option
                            label="Tiruppur"
                            value="Tiruppur"
                            className=""
                          />
                          <option
                            label="Coimbatore"
                            value="Coimbatore"
                            className=""
                          />
                          <option
                            label="Chennai"
                            value="Chennai"
                            className=""
                          />
                        </Field>
                        <ErrorMessage
                          name="per_city"
                          component="div"
                          className="text-red-500 text-[0.8vw]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 w-full gap-x-[2vw] pt-[1vw]">
                      <div className="col-span-1">
                        <label className="text-[#1F4B7F] text-[1.1vw] ">
                          Postal Code
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                            *
                          </span>
                        </label>
                        <Field
                          type="text"
                          name="temp_postal"
                          placeholder="Enter Postal Code"
                          // value={values.firstname}
                          className="border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                        />
                        <ErrorMessage
                          name="temp_postal"
                          component="div"
                          className="text-red-500 text-[0.8vw]"
                        />
                      </div>
                      <div className="col-span-1">
                        <label className="text-[#1F4B7F] text-[1.1vw] ">
                          Postal Code
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                            *
                          </span>
                        </label>
                        <Field
                          type="text"
                          name="per_postal"
                          placeholder="Enter Postal Code"
                          value={values.per_postal}
                          className="border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                        />
                        <ErrorMessage
                          name="per_postal"
                          component="div"
                          className="text-red-500 text-[0.8vw]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between  py-[1vw]">
                    <div>
                      <h1 className="text-[#1F4B7F] text-[0.8vw] font-semibold">
                        *You must fill in all fields to be able to continue
                      </h1>
                    </div>
                    <div className="flex items-center gap-x-[1vw]">
                      <button
                        className="border-[#1F487C] w-[5vw] font-semibold text-[1vw] h-[2vw] rounded-full border-r-[0.2vw]  border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw]"
                        onClick={() => setCurrentpage(1)}
                      >
                        Back
                      </button>
                      <button
                        className="bg-[#1F487C] font-semibold rounded-full w-[7vw] h-[2vw] text-[1vw] text-white"
                        type="submit"
                        // onClick={() => setCurrentpage(3)}
                      >
                        Continue
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
