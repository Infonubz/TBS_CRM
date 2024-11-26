import React, { useEffect, useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { toast } from 'react-toastify';
import { Checkbox, Progress } from "antd";
import { GetPartnerAddressData, GetPartnerPersonalData, submitPartnerAddressData } from '../../../../Api/Settings/UserSettings/Partner';
import { MdOutlineModeEditOutline } from "react-icons/md";

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


    const [partnerAddress, setPartnerAddress] = useState()

    console.log(partnerAddress, 'partner_address')

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
            const data = await submitPartnerAddressData(values)
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
                    dirty
                }) => (
                    <Form onSubmit={handleSubmit}>

                        {addressType === 'temporary' ?
                            <div className='relative'>
                                <div className='grid grid-cols-2 gap-[1vw]'>
                                    <div className="col-span-1">
                                        <label className="text-[#1F4B7F]  text-[1vw] font-bold ">
                                            Address
                                            <span className="text-[1vw] text-red-600 pl-[0.2vw]"> *</span>
                                        </label>
                                        <div className='relative'>
                                            <Field
                                                type="text"
                                                name="temp_address"
                                                placeholder="Enter Temporary Address"
                                                value={values.temp_address}
                                                className="border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none"
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
                                            <span className="text-[1vw] text-red-600 pl-[0.2vw]"> *</span>
                                        </label>
                                        <div className='relative'>
                                            <Field
                                                as="select"
                                                name="temp_state"
                                                value={values.temp_state}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    sessionStorage.setItem("status", e.target.value);
                                                }}
                                                className="border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none"
                                            >
                                                <option label="Select State" value="" className="" />
                                                <option label="Tamilnadu" value="Tamilnadu" className="" />
                                                <option label="Kerala" value="Kerala" className="" />
                                                <option label="Andhra" value="Andhra" className="" />
                                            </Field>
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
                                            <span className="text-[1vw] text-red-600 pl-[0.2vw]"> *</span>
                                        </label>
                                        <div className='relative'>
                                            <Field
                                                as="select"
                                                name="temp_region"
                                                value={values.temp_region}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    sessionStorage.setItem("status", e.target.value);
                                                }}
                                                className="border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none"
                                            >
                                                <option label="Select Region" value="" className="" />
                                                <option label="Southern Region" value="southerregion" className="" />
                                                <option label="Northern Region" value="northerregion" className="" />
                                                <option label="Eastern Region" value="easterregion" className="" />
                                                <option label="Western Region" value="westerregion" className="" />
                                            </Field>
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
                                            <span className="text-[1vw] text-red-600 pl-[0.2vw]"> *</span>
                                        </label>
                                        <div className='relative'>
                                            <Field
                                                as="select"
                                                name="temp_city"
                                                value={values.temp_city}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    sessionStorage.setItem("status", e.target.value);
                                                }}
                                                className="border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none"
                                            >
                                                <option label="Select City" value="" className="" />
                                                <option label="Tiruppur" value="Tiruppur" className="" />
                                                <option label="Coimbatore" value="Coimbatore" className="" />
                                                <option label="Chennai" value="Chennai" className="" />
                                            </Field>
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
                                            <span className="text-[1vw] text-red-600 pl-[0.2vw]"> *</span>
                                        </label>
                                        <div className='relative'>
                                            <Field
                                                as="select"
                                                name="temp_country"
                                                value={values.temp_country}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    sessionStorage.setItem("status", e.target.value);
                                                }}
                                                className="border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none"
                                            >
                                                <option label="Select Country" value="" className="" />
                                                <option label="India" value="India" className="" />
                                                <option label="America" value="America" className="" />
                                                <option label="Australia" value="Australia" className="" />
                                            </Field>
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
                                            <span className="text-[1vw] text-red-600 pl-[0.2vw]"> *</span>
                                        </label>
                                        <div className='relative'>
                                            <Field
                                                type="text"
                                                name="temp_postal"
                                                placeholder="Enter Postal Code"
                                                value={values.temp_postal}
                                                className="border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none"
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
                                <div className='absolute bottom-[-2.5vw]'>
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
                            </div>
                            :
                            <div className='grid grid-cols-2 gap-[1vw]'>
                                <div className="col-span-1">
                                    <label className="text-[#1F4B7F]  text-[1vw] font-bold ">
                                        Address
                                        <span className="text-[1vw] text-red-600 pl-[0.2vw]"> *</span>
                                    </label>
                                    <div className='relative'>
                                        <Field
                                            type="text"
                                            name="per_address"
                                            placeholder="Enter Permanent Address"
                                            value={values.per_address}
                                            className="border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none"
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
                                        <span className="text-[1vw] text-red-600 pl-[0.2vw]"> *</span>
                                    </label>
                                    <div className='relative'>
                                        <Field
                                            as="select"
                                            name="per_state"
                                            value={values.per_state}
                                            onChange={(e) => {
                                                handleChange(e);
                                                sessionStorage.setItem("status", e.target.value);
                                            }}
                                            className="border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none"
                                        >
                                            <option label="Select State" value="" className="" />
                                            <option label="Tamilnadu" value="Tamilnadu" className="" />
                                            <option label="Kerala" value="Kerala" className="" />
                                            <option label="Andhra" value="Andhra" className="" />
                                        </Field>
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
                                        <span className="text-[1vw] text-red-600 pl-[0.2vw]"> *</span>
                                    </label>
                                    <div className='relative'>
                                        <Field
                                            as="select"
                                            name="per_state"
                                            value={values.per_region}
                                            onChange={(e) => {
                                                handleChange(e);
                                                sessionStorage.setItem("status", e.target.value);
                                            }}
                                            className="border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none"
                                        >
                                            <option label="Select Region" value="" className="" />
                                            <option label="Southern Region" value="southerregion" className="" />
                                            <option label="Northern Region" value="northerregion" className="" />
                                            <option label="Eastern Region" value="easterregion" className="" />
                                            <option label="Western Region" value="westerregion" className="" />
                                        </Field>
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
                                        <span className="text-[1vw] text-red-600 pl-[0.2vw]"> *</span>
                                    </label>
                                    <div className='relative'>
                                        <Field
                                            as="select"
                                            name="per_city"
                                            value={values.per_city}
                                            onChange={(e) => {
                                                handleChange(e);
                                                sessionStorage.setItem("status", e.target.value);
                                            }}
                                            className="border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none"
                                        >
                                            <option label="Select City" value="" className="" />
                                            <option label="Tiruppur" value="Tiruppur" className="" />
                                            <option label="Coimbatore" value="Coimbatore" className="" />
                                            <option label="Chennai" value="Chennai" className="" />
                                        </Field>
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
                                        <span className="text-[1vw] text-red-600 pl-[0.2vw]"> *</span>
                                    </label>
                                    <div className='relative'>
                                        <Field
                                            as="select"
                                            name="per_country"
                                            value={values.per_country}
                                            onChange={(e) => {
                                                handleChange(e);
                                                sessionStorage.setItem("status", e.target.value);
                                            }}
                                            className="border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none"
                                        >
                                            <option label="Select Country" value="" className="" />
                                            <option label="India" value="India" className="" />
                                            <option label="America" value="America" className="" />
                                            <option label="Australia" value="Australia" className="" />
                                        </Field>
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
                                        <span className="text-[1vw] text-red-600 pl-[0.2vw]"> *</span>
                                    </label>
                                    <div className='relative'>
                                        <Field
                                            type="text"
                                            name="per_postal"
                                            placeholder="Enter Postal Code"
                                            value={values.per_postal}
                                            className="border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none"
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
                        }
                        <div className='flex items-center justify-center pt-[2vw] pb-[0.5vw]'>
                            <button
                                type="submit"
                                className=" text-white bg-[#1F4B7F] px-[2vw] gap-[0.5vw] py-[0.5vw] rounded-[0.7vw] w-[12vw] "
                                disabled={isSubmitting || !dirty || !isValid}
                                style={{
                                    backgroundColor: isSubmitting || !dirty || !isValid ? '#d3d3d3' : '#1F487C',
                                    color: isSubmitting || !dirty || !isValid ? '#9e9e9e' : '#fff',
                                    cursor: isSubmitting || !dirty || !isValid ? 'not-allowed' : 'pointer',
                                }}
                            >
                                Save
                            </button>
                        </div>
                    </Form>

                )}
            </Formik>
        </div>
    )
}

export default AddressDetails