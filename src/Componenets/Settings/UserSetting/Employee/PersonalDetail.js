import React, { useEffect, useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { toast } from 'react-toastify';
import { GetEmployeePersonalData, submitEmpPersonalData } from '../../../../Api/Settings/UserSettings/Employee';
import dayjs from "dayjs";



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
    blood: Yup.string()
        .required("Blood group is required")
        .matches(
            /^(A|B|AB|O)(\+|\-)$/,
            "valid blood type (e.g., A+, B-, AB+, O-)"
        ),
    gender: Yup.string().required("Please select an Gender"),
    dob: Yup.date()
        .required("Date of Birth is required")
        .nullable()
        .max(new Date(), "Date of Birth cannot be in the future")
        .test(
            "age",
            "You must be at least 15 years old",
            (value) => {
                if (!value) return true;
                const today = new Date();
                const age = today.getFullYear() - value.getFullYear();
                const monthDiff = today.getMonth() - value.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < value.getDate())) {
                    return age > 15;
                }
                return age >= 15;
            }
        ),
});


const PersonalDetail = ({ setSelectedFile, fileList, isEdit, setIsEdit }) => {

    const [personalData, setPersonalData] = useState()
    console.log(personalData, 'personal_data')

    const fetchEmpData = async () => {
        try {
            const data = await GetEmployeePersonalData();
            setPersonalData(data);
            setSelectedFile(data.profile_img)
        } catch (error) {
            console.error("Error fetching additional user data", error);
        }
    };

    useEffect(() => {
        fetchEmpData();
    }, []);


    const handleSubmit = async (values) => {
        try {
            const data = await submitEmpPersonalData(
                values,
                fileList,
            );
            console.log(data, 'data_data')
            GetEmployeePersonalData()
            toast.success(data);
            setIsEdit(false)
            console.log(data);
        } catch (error) {
            console.error("Error uploading data", error);
        }
    };

    return (
        <div>
            <Formik
                initialValues={{
                    firstname: personalData ? personalData.emp_first_name : "",
                    lastname: personalData ? personalData.emp_last_name : "",
                    phone: personalData ? personalData.phone : "",
                    emailid: personalData ? personalData.email_id : "",
                    alt_phone: personalData ? personalData.alternate_phone : "",
                    dob: personalData
                        ? dayjs(personalData?.date_of_birth).format("YYYY-MM-DD")
                        : "",
                    gender: personalData ? personalData.gender : "",
                    blood: personalData ? personalData.blood_group : "",

                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    handleSubmit(values)
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
                    errors,
                    touched,
                    dirty
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <div className='grid grid-cols-2 gap-[1vw]'>
                            <div className="col-span-1">
                                <label className="text-[#1F4B7F] font-bold text-[1vw] ">
                                    Employee First Name
                                    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                                        *
                                    </span>
                                </label>
                                <div className='relative'>
                                    <Field
                                        type="text"
                                        name="firstname"
                                        placeholder="Enter First Name"
                                        className={`border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                                        disabled={isEdit === false}
                                    />
                                    {/* <MdOutlineModeEditOutline
                                        color='#1F487C'
                                        className='absolute top-[0.75vw] right-[1vw]'
                                        size='1.5vw' /> */}
                                    <ErrorMessage
                                        name="firstname"
                                        component="div"
                                        className="text-red-500 text-[0.8vw] absolute left-[.2vw] bottom-[-1.2vw]"
                                    />
                                </div>
                            </div>
                            <div className="col-span-1">
                                <label className="text-[#1F4B7F] font-bold text-[1vw] ">
                                    Employee Last Name
                                    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                                        *
                                    </span>
                                </label>
                                <div className='relative'>
                                    <Field
                                        type="text"
                                        name="lastname"
                                        placeholder="Enter Last Name"
                                        value={values.lastname}
                                        className={`border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                                        disabled={isEdit === false}
                                    />
                                    {/* <MdOutlineModeEditOutline
                                        color='#1F487C'
                                        className='absolute top-[0.75vw] right-[1vw]'
                                        size='1.5vw' /> */}
                                    <ErrorMessage
                                        name="lastname"
                                        component="div"
                                        className="text-red-500 text-[0.8vw] absolute left-[.2vw] bottom-[-1.2vw]"
                                    />
                                </div>
                            </div>
                            <div className="col-span-1">
                                <label className="text-[#1F4B7F] font-bold text-[1vw] ">
                                    Phone
                                    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                                        *
                                    </span>
                                </label>
                                <div className="relative">
                                    <Field
                                        type="text"
                                        name="phone"
                                        placeholder="Enter Number"
                                        className={`border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                                        disabled={isEdit === false}
                                        value={values.phone}
                                    />
                                    {/* 
                                    <MdOutlineModeEditOutline
                                        color='#1F487C'
                                        className='absolute top-[0.75vw] right-[1vw]'
                                        size='1.5vw' /> */}
                                    <ErrorMessage
                                        name="phone"
                                        component="div"
                                        className="text-red-500 text-[0.8vw] absolute left-[.2vw] bottom-[-1.2vw]"
                                    />
                                </div>
                            </div>
                            <div className="col-span-1">
                                <label className="text-[#1F4B7F] font-bold text-[1vw] ">
                                    Alternate Phone
                                    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                                        *
                                    </span>
                                </label>
                                <div className='relative'>
                                    <Field
                                        type="text"
                                        name="alt_phone"
                                        placeholder="Enter Alternate Number"
                                        value={values.alt_phone}
                                        className={`border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                                        disabled={isEdit === false}
                                    />
                                    {/* <MdOutlineModeEditOutline
                                        color='#1F487C'
                                        className='absolute top-[0.75vw] right-[1vw]'
                                        size='1.5vw' /> */}
                                    <ErrorMessage
                                        name="alt_phone"
                                        component="div"
                                        className="text-red-500 text-[0.8vw] absolute left-[.2vw] bottom-[-1.2vw]"
                                    />
                                </div>
                            </div>
                            <div className="col-span-1">
                                <label className="text-[#1F4B7F] font-bold text-[1vw] ">
                                    Email ID
                                    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                                        *
                                    </span>
                                </label>
                                <div className='relative'>
                                    <Field
                                        type="text"
                                        name="emailid"
                                        placeholder="Enter Email Address"
                                        value={values.emailid}
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
                                        className="text-red-500 text-[0.8vw] absolute left-[.2vw] bottom-[-1.2vw]"
                                    />
                                </div>
                            </div>
                            <div className="col-span-1">
                                <label className="text-[#1F4B7F] font-bold text-[1vw] ">
                                    Date of Birth
                                    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                                        *
                                    </span>
                                </label>
                                <div className='relative'>
                                    <Field
                                        type="date"
                                        name="dob"
                                        placeholder="Select Date of Birth"
                                        value={values.dob}
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
                                        name="dob"
                                        component="div"
                                        className="text-red-500 text-[0.8vw] absolute left-[.2vw] bottom-[-1.2vw]"
                                    />
                                </div>
                            </div>
                            <div className="col-span-1">
                                <label className="text-[#1F4B7F] font-bold text-[1vw] ">
                                    Gender
                                    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                                        *
                                    </span>
                                </label>
                                <div className='relative'>
                                    <Field
                                        as="select"
                                        name="gender"
                                        value={values.gender}
                                        className={`border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                                        disabled={isEdit === false}
                                        onChange={(e) => {
                                            handleChange(e);
                                            sessionStorage.setItem("status", e.target.value);
                                        }}
                                    >
                                        <option label="Select Gender" value="" className="" />
                                        <option label="Male" value="Male" className="" />
                                        <option label="Female" value="Female" className="" />
                                        <option label="Other" value="Other" className="" />
                                    </Field>
                                    {/* <MdOutlineModeEditOutline
                                        color='#1F487C'
                                        className='absolute top-[0.75vw] right-[2vw]'
                                        size='1.5vw' /> */}
                                    <ErrorMessage
                                        name="gender"
                                        component="div"
                                        className="text-red-500 text-[0.8vw] absolute left-[.2vw] bottom-[-1.2vw]"
                                    />
                                </div>
                            </div>
                            <div className="col-span-1">
                                <label className="text-[#1F4B7F] font-bold text-[1vw] ">
                                    Blood Group
                                    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                                        *
                                    </span>
                                </label>
                                <div className='relative'>
                                    <Field
                                        type="text"
                                        name="blood"
                                        placeholder="Enter Blood Group"
                                        value={values.blood}
                                        className={`border-r-[0.25vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                                        disabled={isEdit === false}
                                    />
                                    {/* <MdOutlineModeEditOutline
                                        color='#1F487C'
                                        className='absolute top-[0.75vw] right-[1vw]'
                                        size='1.5vw' /> */}
                                    <ErrorMessage
                                        name="blood"
                                        component="div"
                                        className="text-red-500 text-[0.8vw] absolute left-[.2vw] bottom-[-1.2vw]"
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

export default PersonalDetail