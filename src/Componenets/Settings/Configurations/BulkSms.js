import React, { useState } from "react"
import { FaUsers } from "react-icons/fa";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { IoMdSend } from "react-icons/io";


const validationSchema = Yup.object({
    from: Yup.string()
        .required('From number is required'),
    to: Yup.string()
        .required('To number is required'),
    message: Yup.string()
        .required('Message is required')
        .min(10, 'Message must be at least 10 characters'), // Minimum length validation for the message
});


const BulkSms = () => {

    const [view, setView] = useState('operator')

    return (
        <>
            <div className="flex justify-end mx-[1.5vw] mt-[1vw]" >
                <div className="flex border-[#1F4B7F] h-[5vh] border-l-[0.1vw] border-t-[0.1vw] rounded-l-[0.5vw] rounded-r-[0.5vw] border-r-[0.2vw] border-b-[0.2vw]">
                    <button
                        className={`${view === "operator" ? "bg-[#1F4B7F]" : "bg-white"
                            } flex px-[1vw] justify-center gap-[0.5vw] items-center rounded-tl-[0.4vw] rounded-bl-[0.3vw]`}
                        style={{
                            transition: "all 1s",
                        }}
                        onClick={() => setView("operator")}
                    >
                        <span>
                            {/* Replace IoMdMenu with an appropriate icon if needed */}
                            {/* <IoMdMenu
                size={"1.2vw"}
                color={`${view === "operator" ? "white" : "#1F4B7F"}`}
              /> */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.2vw" height="1.2vw" viewBox="0 0 24 24"><path fill={`${view === 'operator' ? '#FFF' : '#1F487C'}`} fill-rule="evenodd" d="M12 2C8.229 2 6.343 2 5.172 3.172C4.108 4.235 4.01 5.886 4 9H3a1 1 0 0 0-1 1v1a1 1 0 0 0 .4.8L4 13c.01 3.114.108 4.765 1.172 5.828c.242.243.514.435.828.587V21a1 1 0 0 0 1 1h1.5a1 1 0 0 0 1-1v-1.018C10.227 20 11.054 20 12 20s1.773 0 2.5-.018V21a1 1 0 0 0 1 1H17a1 1 0 0 0 1-1v-1.585a3 3 0 0 0 .828-.587C19.892 17.765 19.991 16.114 20 13l1.6-1.2a1 1 0 0 0 .4-.8v-1a1 1 0 0 0-1-1h-1c-.01-3.114-.108-4.765-1.172-5.828C17.657 2 15.771 2 12 2M5.5 9.5c0 1.414 0 2.121.44 2.56c.439.44 1.146.44 2.56.44h7c1.414 0 2.121 0 2.56-.44c.44-.439.44-1.146.44-2.56V7c0-1.414 0-2.121-.44-2.56C17.622 4 16.915 4 15.5 4h-7c-1.414 0-2.121 0-2.56.44C5.5 4.878 5.5 5.585 5.5 7zm.75 6.5a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75m11.5 0a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0 0 1.5H17a.75.75 0 0 0 .75-.75" clip-rule="evenodd" /></svg>
                        </span>
                        <span
                            className={`${view === "operator" ? "text-white" : "text-[#1F4B7F]"
                                } text-[1.1vw]`}
                        >
                            Operator
                        </span>
                    </button>
                    <button
                        className={`${view === "passenger" ? "bg-[#1F4B7F]" : "bg-white"
                            } flex px-[1vw] justify-center gap-[0.5vw] items-center rounded-r-[0.3vw]`}
                        style={{
                            transition: "all 1s",
                        }}
                        onClick={() => setView("passenger")}
                    >
                        <span>
                            {/* Replace IoGrid with an appropriate icon if needed */}
                            {/* <IoGrid
                size={"1.2vw"}
                color={`${view === "passenger" ? "white" : "#1F4B7F"}`}
              /> */}
                            <FaUsers
                                size={"1.2vw"}
                                color={`${view === "passenger" ? "white" : "#1F4B7F"}`} />
                        </span>
                        <span
                            className={`${view === "passenger" ? "text-white" : "text-[#1F4B7F]"
                                } text-[1.1vw]`}
                        >
                            passenger
                        </span>
                    </button>
                </div>
            </div>
            <Formik
                initialValues={{
                    from: '',
                    to: '',
                    message: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log('Form data:', values);
                }}
            >
                {({ handleSubmit, setFieldValue, resetForm }) => (
                    <Form onSubmit={handleSubmit}>

                        <div className="px-[2vw] flex flex-col gap-y-[1.5vw] py-[1.5vw]">
                            <div className="relative">
                                <div className="flex border-b-[0.1vw] border-b-[#1F487C]">
                                    <label htmlFor="from" className="text-[#1F487C] text-[1.1vw]">From</label>
                                    <Field type="text"
                                        id="from"
                                        name="from"
                                        placeholder=" "
                                        className="w-full px-[1vw] outline-none" />
                                </div>
                                <ErrorMessage
                                    name="from"
                                    component="div"
                                    className="absolute bottom-[-1.2vw] text-[0.8vw] "
                                    style={{ color: 'red' }} />
                            </div>
                            <div className="relative">
                                <div className="flex border-b-[0.1vw] border-b-[#1F487C]">
                                    <label htmlFor="to"  className="text-[#1F487C] text-[1.1vw]">To</label>
                                    <Field
                                        type="text"
                                        id="to"
                                        name="to"
                                        placeholder=""
                                        className='w-full px-[1vw] outline-none' />
                                </div>
                                <ErrorMessage
                                    name="to"
                                    component="div"
                                    className="absolute bottom-[-1.2vw] text-[0.8vw] "
                                    style={{ color: 'red' }} />
                            </div>

                            <div>
                                {/* <label htmlFor="message">Compose Message</label> */}
                                <div className="relative">
                                    <Field
                                        as="textarea"
                                        id="message"
                                        name="message"
                                        className='outline-none w-full h-[30vh] border-[0.1vw] border-[#1F487C] rounded-lg pl-[1.5vw] pt-[1vw] text-[1vw] placeholder-[#1F487C] placeholder:opacity-50 text-[#1F487C]'
                                        placeholder="Componse Message" />
                                    <ErrorMessage
                                        name="message"
                                        component="div"
                                        className="absolute text-[0.8vw] bottom-[-1.2vw]"
                                        style={{ color: 'red' }} />

                                    <button
                                        type="submit"
                                        className="absolute bottom-[1vw] right-[1.5vw] bg-[#1F487C] px-[0.5vw] rounded-full w-[7.5vw] h-[2.25vw]">
                                        <div className="flex items-center justify-center gap-[0.75vw]">
                                            <span className="text-[1vw] text-white font-semibold">Send </span> <span><IoMdSend size='1vw' color="white"/></span>
                                        </div>
                                    </button>

                                </div>
                            </div>
                        </div>

                    </Form>
                )}
            </Formik>
        </>
    )
}

export default BulkSms