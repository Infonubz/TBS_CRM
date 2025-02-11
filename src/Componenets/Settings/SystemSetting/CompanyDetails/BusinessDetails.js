import React from 'react'
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { SubmitBusinessData } from '../../../../Api/Settings/SystemSettings/CompanyDetails';


const validationSchema = Yup.object().shape({
    constitution: Yup.string().required("Constitution required"),
    business: Yup.string().required("Business required"),
    msme: Yup.string().required("MSME required"),
    service: Yup.string().required("Service required"),
    currency_code: Yup.string().required("Country Code required"),
    msme_number: Yup.string()
        // .matches(
        //   /^([A-Za-z]{2}[0-9]{2}[A-Za-z0-9]{11})?$/,
        //   "MSME number must be in a valid format (e.g., AA1234ABCDE123)"
        // )
        .matches(
            /^[a-zA-Z0-9]{15}$/,
            "MSME number must be 15 characters long and alphanumeric (e.g., ABC123456789012)"
        )
        .required("MSME Number is required"),
});

const BusinessDetails = ({ operatorData }) => {

    const dispatch = useDispatch()
    const handleSubmit = async (values) => {
        try {
            const data = await SubmitBusinessData(
                values,
                dispatch
            );
            // setModalIsOpen(false);
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
                    constitution: operatorData ? operatorData?.type_of_constitution : "",
                    business: operatorData ? operatorData?.business_background : "",
                    msme: operatorData ? operatorData?.msme_type : "",
                    msme_number: operatorData ? operatorData?.msme_number : "",
                    service: operatorData ? operatorData?.type_of_service : "",
                    currency_code: operatorData ? operatorData?.currency_code : "",
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
                    dirty
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <div className='grid grid-cols-2 gap-[1vw]'>
                            <div className="  col-span-1">
                                <label className="text-[#1F4B7F] text-[1vw] font-bold ">
                                    Type of Constitution
                                    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                                        *
                                    </span>
                                </label>
                                <div className='relative'>
                                    <Field
                                        as="select"
                                        name="constitution"
                                        id="constitution"
                                        value={values.constitution}
                                        className="border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none"
                                    >
                                        <option label="Select State" value="" className="" />
                                        <option
                                            label="Proprietorship"
                                            value="Proprietorship"
                                            className=""
                                        />
                                        <option
                                            label="Partnership"
                                            value="Partnership"
                                            className=""
                                        />
                                        <option
                                            label="Private Limited"
                                            value="Private Limited"
                                            className=""
                                        />
                                        <option
                                            label="Public Sector"
                                            value="Public Sector"
                                            className=""
                                        />
                                    </Field>
                                    {/* <MdOutlineModeEditOutline
                                        color='#1F487C'
                                        className='absolute top-[0.75vw] right-[2vw]'
                                        size='1.5vw' /> */}
                                    <ErrorMessage
                                        name="constitution"
                                        component="div"
                                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                                    />
                                </div>
                            </div>
                            <div className=" col-span-1">
                                <label className="text-[#1F4B7F] text-[1vw] font-bold ">
                                    Business Background
                                    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                                        *
                                    </span>
                                </label>
                                <div className='relative'>
                                    <Field
                                        as="select"
                                        name="business"
                                        id="business"
                                        value={values.business}
                                        className="border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none"

                                    >
                                        <option label="Select Business" value="" className="" />
                                        <option
                                            label="Tours & Travels"
                                            value="Tours & Travels"
                                            className=""
                                        />
                                    </Field>
                                    {/* <MdOutlineModeEditOutline
                                        color='#1F487C'
                                        className='absolute top-[0.75vw] right-[2vw]'
                                        size='1.5vw' /> */}
                                    <ErrorMessage
                                        name="business"
                                        component="div"
                                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                                    />
                                </div>
                            </div>
                            <div className="relative col-span-1 ">
                                <label className="text-[#1F4B7F] text-[1vw] font-bold ">
                                    MSME Type{" "}
                                    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                                        *
                                    </span>
                                </label>
                                <div className='relative'>
                                    <Field
                                        as="select"
                                        name="msme"
                                        id="business"
                                        value={values.msme}
                                        className="border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none"
                                    >
                                        <option label="Select MSME" value="" className="" />
                                        <option label="Micro" value="Micro" className="" />
                                        <option label="Small" value="Small" className="" />
                                        <option label="Medium" value="Medium" className="" />
                                        <option
                                            label="Enterprises"
                                            value="Enterprises"
                                            className=""
                                        />
                                    </Field>
                                    {/* <MdOutlineModeEditOutline
                                        color='#1F487C'
                                        className='absolute top-[0.75vw] right-[2vw]'
                                        size='1.5vw' /> */}
                                    <ErrorMessage
                                        name="msme"
                                        component="div"
                                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                                    />
                                </div>
                            </div>
                            <div className="relative col-span-1">
                                <label className="text-[#1F4B7F] text-[1vw] font-bold ">
                                    MSME Number
                                    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                                        *
                                    </span>
                                </label>
                                <div className='relative'>
                                    <Field
                                        type="text"
                                        name="msme_number"
                                        placeholder="Enter MSME Number"
                                        className="border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none"

                                    // value={values.firstname}
                                    />
                                    {/* <MdOutlineModeEditOutline
                                        color='#1F487C'
                                        className='absolute top-[0.75vw] right-[1vw]'
                                        size='1.5vw' /> */}
                                    <ErrorMessage
                                        name="msme_number"
                                        component="div"
                                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                                    />
                                </div>
                            </div>
                            <div className="relative col-span-1">
                                <label className="text-[#1F4B7F] text-[1vw] font-bold ">
                                    Type Of Service
                                    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                                        *
                                    </span>
                                </label>
                                <div className='relative'>
                                    <Field
                                        as="select"
                                        name="service"
                                        id="service"
                                        value={values.service}
                                        className="border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none"

                                    >
                                        <option label="Select Service" value="" className="" />
                                        <option label="Tirupur" value="Tirupur" className="" />
                                        <option
                                            label="Inter State"
                                            value="Inter State"
                                            className=""
                                        />
                                        <option
                                            label="Intra State"
                                            value="Intra State"
                                            className=""
                                        />
                                    </Field>
                                    {/* <MdOutlineModeEditOutline
                                        color='#1F487C'
                                        className='absolute top-[0.75vw] right-[2vw]'
                                        size='1.5vw' /> */}
                                    <ErrorMessage
                                        name="service"
                                        component="div"
                                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                                    />
                                </div>
                            </div>
                            <div className="relative col-span-1">
                                <label className="text-[#1F4B7F] text-[1vw] font-bold ">
                                    Currency Code
                                    <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                                        *
                                    </span>
                                </label>
                                <div className='relative'>
                                    <Field
                                        as="select"
                                        name="currency_code"
                                        id="currency_code"
                                        value={values.currency_code}
                                        className="border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none"
                                    >
                                        <option label='Select Currency code' value='' />
                                        <option label="India" value="India" className="" />
                                        <option label="America" value="America" className="" />
                                        <option label="Australia" value="Australia" className="" />
                                        <option label="Malasiya" value="Malasiya" className="" />
                                    </Field>
                                    {/* <MdOutlineModeEditOutline
                                        color='#1F487C'
                                        className='absolute top-[0.75vw] right-[2vw]'
                                        size='1.5vw' /> */}
                                    <ErrorMessage
                                        name="currency_code"
                                        component="div"
                                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center justify-center pt-[2vw] pb-[0.5vw]'>
                            <button
                                type="submit"
                                className=" text-white bg-[#1F4B7F] px-[2vw] gap-[0.5vw] py-[0.5vw] rounded-[0.7vw] w-[12vw]"
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
        </div >
    )
}

export default BusinessDetails