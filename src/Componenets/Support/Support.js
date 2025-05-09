import React from "react";
import { LiaSave } from "react-icons/lia";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { message } from "antd";
import { PiPhonePlusBold } from "react-icons/pi";
import { TbMailShare } from "react-icons/tb";
import { BsTelephoneForwardFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { PostSupportData } from "../../Api/Support/Support";
import { toast } from "react-toastify";

export default function Support() {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    phone: Yup.string()
      .trim()
      .matches(/^\d+$/, "Phone number must contain only digits")
      .length(10, "Phone number must be 10 digits")
      .required("Phone number is required"),
    mail: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const handleSubmit = (values) => {
    console.log(values);
    const responce = PostSupportData(values)
    toast.success(responce)
    message.success("Form submitted successfully!");
  };

  return (
    <Formik
      initialValues={{
        name: "",
        phone: "",
        mail: "",
        message: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        handleSubmit(values);
        resetForm();
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <div className=" ">
          <Form>
            <div className="bg-gray-200 p-[1vw] rounded-[0.8vw]" >
            <div className="flex justify-center text-[#1f487c] text-[1.7vw] font-bold mb-[1.3vw]">
              <h1>Get In Touch</h1>
            </div>

            <div className="mt-[1vw] mb-[vw] justify-center flex flex-col gap-y-[1vw] text-[#1f487c] text-base">
              {/* <div className="mb-2">
              <strong>Phone:</strong> <span>1234567890</span>
            </div>
            <div>
              <strong>Mail:</strong> <span>nubiznez@nubiznez.com</span>
            </div> */}
              <div className="flex justify-start items-center font-semibold gap-x-[1.3vw]">
                <div className="text-[1.3vw]">
                  {/* <PiPhonePlusBold /> */}
                  <BsTelephoneForwardFill />
                </div>
                <div className="text-[1vw]">+91 95666 77702</div>
              </div>
              <div className="flex justify-start items-center font-semibold gap-x-[1.3vw]">
                <div className="text-[1.3vw]">
                  {/* <TbMailShare /> */}
                  <IoMdMail />
                </div>
                <div className="text-[1vw]">info@thebusstand.com</div>
              </div>
            </div>

            <div className=" ">
              <div>
                {/* <label
                htmlFor="name"
                className="block mb-1 font-bold text-[#1f487c] text-base"
              >
                Name
              </label> */}
              <div className="relative">
                <Field
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="input-field mt-[1.5vw] text-[1vw] w-[97%] h-[2.5vw] pl-[1vw] text-[#1f487c] placeholder-gray-400 text-top 
            focus:outline-none focus:border-2 border-gray-300  px-[.5vw] py-[.5vw] rounded-md"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 absolute bottom-[-1.2vw] left-[.3vw] text-[.8vw]"
                />
                </div>

                {/* <label
                htmlFor="phone"
                className="block mb-1 font-bold text-[#1f487c] text-base"
              >
                Phone
              </label> */}
              <div className="relative">
                <Field
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="Phone"
                  className="input-field mt-[1.5vw] w-[97%] text-[1vw] h-[2.5vw] text-[#1f487c] pl-[1vw] placeholder-gray-400 text-top  
            focus:outline-none focus:border-2 border-gray-300  px-[.5vw] py-[.5vw] rounded-md"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 absolute bottom-[-1.2vw] left-[.3vw] text-[.8vw] "
                />
                </div>

                {/* <label
                htmlFor="mail"
                className="block mb-1 font-bold text-[#1f487c] text-base"
              >
                E-Mail
              </label> */}
              <div className="relative">
                <Field
                  id="mail"
                  name="mail"
                  type="email"
                  placeholder="Email"
                  className="input-field mt-[1.5vw] w-[97%] text-[1vw] h-[2.5vw] text-[#1f487c] pl-[1vw] placeholder-gray-400 text-top  
            focus:outline-none focus:border-2 border-gray-300  px-[.5vw] py-[.5vw] rounded-md"
                />
                <ErrorMessage
                  name="mail"
                  component="div"
                  className="text-red-500 absolute bottom-[-1.2vw] left-[.3vw] text-[.8vw] "
                />
                </div>

                {/* <label
                htmlFor="message"
                className="block mb-1 font-bold text-[#1f487c] text-base"
              >
                Message
              </label> */}
              <div className="relative">
                <Field
                style={{resize:"none"}}
                  id="message"
                  name="message"
                  as="textarea"
                  placeholder="Enter your message here..."
                  className="input-field mt-[1.5vw] w-[97%] h-[5vw] text-[1vw] text-[#1f487c] pl-[1vw] placeholder-gray-400 text-top  
            focus:outline-none focus:border-2 border-gray-300 px-[.5vw] py-[.5vw] rounded-md"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-red-500 absolute bottom-[-.8vw] left-[.3vw] text-[.8vw] "
                />
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="flex h-[3vw] w-full me-2 bg-[#1F4B7F] mt-[1vw] px-[0.8vw] gap-[0.5vw] py-[0.3vw] rounded-[0.6vw] items-center justify-center"
                type="submit"
                //disabled={isSubmitting} // Disable button while submitting
              >
                <span>
                  <LiaSave color="white" size={"1.5vw"} />
                </span>
                <span className="text-white text-[1vw]">Submit</span>
              </button>
            </div>
         </div> </Form>
        </div>
      )}
    </Formik>
  );
}
