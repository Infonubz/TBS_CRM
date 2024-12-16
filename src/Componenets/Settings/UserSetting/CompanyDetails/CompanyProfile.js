import React, { useEffect } from 'react'
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { GetOperatorData, SubmitCompanyData } from '../../../../Api/Settings/SystemSettings/CompanyDetails';
import { toast } from 'react-toastify';
import { useState } from 'react';

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
    companyname: Yup.string()
        .min(3, "Company name must be at least 3 characters long")
        .max(30, "Company name must be at most 30 characters long")
        .matches(/^[^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/, 'Special characters are not allowed')
        .required("Company Name is required"),
    ownername: Yup.string()
        .required("Owner Name is required")
        .matches(/^[^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/, 'Special characters are not allowed'),
    password: Yup.string(),
    aadhar: Yup.string()
        .matches(/^[0-9]{12}$/, "Aadhar number must be exactly 12 digits")
        .required("Aadhar Number is required")
        .max(12, "Aadhar number must be exactly 12 digits"),
    pan: Yup.string()
        .matches(
            /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
            "PAN number must be in the format: ABCDE1234F"
        )
        .required("Pan Number is required"),
});


const CompanyProfile = ({ fileList, isEdit, setIsEdit }) => {



    console.log(fileList, 'image_fileList')
    const operatorData = useSelector((state) => state?.crm?.operator_data[0])
    console.log(operatorData, 'operator_data')

    const dispatch = useDispatch()

    useEffect(() => {
        GetOperatorData(dispatch)
    }, [dispatch]);

    const handleSubmit = async (values) => {

        try {
            const data = await SubmitCompanyData(values, dispatch, fileList);
            GetOperatorData(dispatch)
            toast.success(data?.message);
            setIsEdit(false)
            console.log("Current page set to 2");
        } catch (error) {
            console.error("Error uploading data", error);
        }
    };

    return (
        <div>
            <Formik
                initialValues={{
                    companyname: operatorData ? operatorData?.company_name : "",
                    ownername: operatorData ? operatorData?.owner_name : "",
                    phone: operatorData ? operatorData?.phone : "",
                    emailid: operatorData ? operatorData?.emailid : "",
                    aadhar: operatorData ? operatorData?.aadharcard_number : "",
                    pan: operatorData ? operatorData?.pancard_number : "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    handleSubmit(values)
                    console.log('handlesubmit works')
                }}
            >
                {({
                    isSubmitting,
                    isValid,
                    setFieldValue,
                    handleSubmit,
                    values,
                    handleChange,
                    setFieldError,
                    errors,
                    touched,
                    resetForm,
                    dirty
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <div className='grid grid-cols-2 gap-[1vw]'>
                            <div className=''>
                                <label className="text-[#1F4B7F] text-[1vw] font-bold">
                                    Comapany Name
                                </label>
                                <span className="text-red-500 text-[1vw] pl-[0.2vw]">
                                    *
                                </span>
                                <div className='relative'>
                                    <Field
                                        type="text"
                                        id="companyname"
                                        name="companyname"
                                        value={values.companyname}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        placeholder='Enter Company Name'
                                        className={`border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                                        disabled={isEdit === false}
                                    />
                                    {/* <MdOutlineModeEditOutline
                                        color='#1F487C'
                                        className='absolute top-[0.75vw] right-[1vw]'
                                        size='1.5vw' /> */}
                                    <ErrorMessage
                                        name="companyname"
                                        component="div"
                                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw] " />
                                </div>
                            </div>
                            <div className=''>
                                <label className="text-[#1F4B7F] text-[1vw] font-bold">
                                    Owner Name
                                </label>
                                <span className="text-red-500 text-[1vw] pl-[0.2vw]">
                                    *
                                </span>
                                <div className='relative'>
                                    <Field
                                        type="text"
                                        id="ownername"
                                        name="ownername"
                                        placeholder='Enter Owner Name'
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        className={`border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                                        disabled={isEdit === false}
                                    />
                                    {/* <MdOutlineModeEditOutline
                                        color='#1F487C'
                                        className='absolute top-[0.75vw] right-[1vw]'
                                        size='1.5vw' /> */}
                                    <ErrorMessage
                                        name="ownername"
                                        component="div"
                                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw] " />
                                </div>
                            </div>
                            <div className='relative'>
                                <label className="text-[#1F4B7F] text-[1vw] font-bold">
                                    Phone
                                </label>
                                <span className="text-red-500 text-[1vw] pl-[0.2vw]">
                                    *
                                </span>
                                <div className='relative'>
                                    <Field
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        placeholder='Enter your Phone Number'
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        className={`border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                                        disabled={isEdit === false}
                                    />
                                    {/* <MdOutlineModeEditOutline
                                        color='#1F487C'
                                        className='absolute top-[0.75vw] right-[1vw]'
                                        size='1.5vw' /> */}
                                    <ErrorMessage
                                        name="phone"
                                        component="div"
                                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]" />
                                </div>
                            </div>
                            <div className=''>
                                <label className="text-[#1F4B7F] text-[1vw] font-bold">
                                    Email Id
                                </label>
                                <span className="text-red-500 text-[1vw] pl-[0.2vw]">
                                    *
                                </span>
                                <div className='relative'>
                                    <Field
                                        type="email"
                                        id="emailid"
                                        name="emailid"
                                        placeholder='Enter your Mail Id'
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        className={`border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                                        disabled={isEdit === false}
                                    />
                                    {/* <MdOutlineModeEditOutline
                                        color='#1F487C'
                                        className='absolute top-[0.75vw] right-[1vw]'
                                        size='1.5vw' /> */}
                                    <ErrorMessage
                                        name="emailid"
                                        component="div"
                                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]" />
                                </div>
                            </div>
                            <div className=''>
                                <label className="text-[#1F4B7F] text-[1vw] font-bold">
                                    Aadhar Card Number
                                </label>
                                <span className="text-red-500 text-[1vw] pl-[0.2vw]">
                                    *
                                </span>
                                <div className='relative'>
                                    <Field
                                        type="text"
                                        id="aadhar"
                                        name="aadhar"
                                        placeholder='Enter your Aadhar Number'
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        className={`border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                                        disabled={isEdit === false}
                                    />
                                    {/* <MdOutlineModeEditOutline
                                        color='#1F487C'
                                        className='absolute top-[0.75vw] right-[1vw]'
                                        size='1.5vw' /> */}
                                    <ErrorMessage
                                        name="aadhar"
                                        component="div"
                                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]" />
                                </div>
                            </div>
                            <div className=''>
                                <label className="text-[#1F4B7F] text-[1vw] font-bold">
                                    Pan Card Number
                                </label>
                                <span className="text-red-500 text-[1vw] pl-[0.2vw]">
                                    *
                                </span>
                                <div className='relative'>
                                    <Field
                                        type="text"
                                        id="pan"
                                        name="pan"
                                        placeholder='Enter Your Pan Card Number'
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        className={`border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                                        disabled={isEdit === false}
                                    />
                                    {/* <MdOutlineModeEditOutline
                                        color='#1F487C'
                                        className='absolute top-[0.75vw] right-[1vw]'
                                        size='1.5vw' /> */}
                                    <ErrorMessage
                                        name="pan"
                                        component="div"
                                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]" />
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
                                    Update
                                </button>
                            }
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CompanyProfile