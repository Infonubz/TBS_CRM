import React from 'react'
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { toast } from 'react-toastify';
import { SubmitAddressData } from '../../../../Api/Settings/SystemSettings/CompanyDetails';
import { useDispatch } from 'react-redux';
import { useState } from 'react';


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

  const [isEdit, setIsEdit] = useState(false)

  const dispatch = useDispatch()
  const handleSubmit = async (values) => {
    console.log("hiihih");
    try {
      const data = await SubmitAddressData(
        values,
        dispatch
      );
      toast.success(data?.message);
      setIsEdit(false)
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
          handleSubmit(values);;
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
          dirty
        }) => (
          <Form onSubmit={handleSubmit}>

            <div className='grid grid-cols-2 gap-[1vw]'>
              <div className="col-span-1">
                <label className="text-[#1F4B7F] text-[1vw] font-bold ">
                  Address
                  <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                    *
                  </span>
                </label>
                <div className='relative'>
                  <Field
                    type="text"
                    name="address"
                    placeholder="Enter Address"
                    // value={values.firstname}
                    className={`border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
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
                  <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                    *
                  </span>
                </label>
                <div className='relative'>
                  <Field
                    as="select"
                    name="state"
                    id="state"
                    value={values.state}
                    className={`border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                    disabled={isEdit === false}
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
                  </Field>
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
                  <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                    *
                  </span>
                </label>
                <div className='relative'>
                  <Field
                    as="select"
                    name="region"
                    id="region"
                    value={values.region}
                    className={`border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                    disabled={isEdit === false}
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
                  </Field>
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
                  <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                    *
                  </span>
                </label>
                <div className='relative'>
                  <Field
                    as="select"
                    name="city"
                    id="city"
                    value={values.city}
                    className={`border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                    disabled={isEdit === false}
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
                  </Field>
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
                  <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                    *
                  </span>
                </label>
                <div className='relative'>
                  <Field
                    as="select"
                    name="country"
                    id="country"
                    value={values.country}
                    className={`border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                    disabled={isEdit === false}
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
                  </Field>
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
                  <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                    *
                  </span>
                </label>
                <div className='relative'>
                  <Field
                    type="text"
                    name="postal"
                    placeholder="Enter Postal Code"
                    // value={values.firstname}
                    className={`border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
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
            <div className='flex items-center justify-center pt-[2vw] pb-[0.5vw]'>
              {isEdit === false ?
                <div
                  onClick={() => setIsEdit(true)}
                  className="cursor-pointer text-white bg-[#1F4B7F] px-[2vw] gap-[0.5vw] py-[0.5vw] rounded-[0.7vw] w-[12vw] text-center"
                >
                  Edit
                </div>
                :
                <button
                  type="submit"
                  className="text-white bg-[#1F4B7F] px-[2vw] gap-[0.5vw] py-[0.5vw] rounded-[0.7vw] w-[12vw]"
                >
                  Submit
                </button>
              }
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default AddressDetails