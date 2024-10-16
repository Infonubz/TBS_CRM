import React from "react";
import { LiaSave } from "react-icons/lia";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { message } from "antd";
import { PiPhonePlusBold } from "react-icons/pi";
import { TbMailShare } from "react-icons/tb";

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
        <div className="overflow-auto  max-h-[36vw] ">
          <Form>
            <div className="flex justify-center text-[#1f487c] text-[1.9vw] font-bold mb-[1.3vw]">
              <h1>Get In Touch</h1>
            </div>

            <div className="mt-[1vw] mb-[.8vw] flex flex-col gap-y-[1vw] text-[#1f487c] text-base">
              {/* <div className="mb-2">
              <strong>Phone:</strong> <span>1234567890</span>
            </div>
            <div>
              <strong>Mail:</strong> <span>nubiznez@nubiznez.com</span>
            </div> */}
              <div className="flex justify-start font-semibold gap-x-[1.5vw]">
                <div className="text-[2vw]">
                  <PiPhonePlusBold />
                </div>
                <div className="text-[1.2vw]">1234567890</div>
              </div>
              <div className="flex justify-start font-semibold gap-x-[1.5vw]">
                <div className="text-[2vw]">
                  <TbMailShare />
                </div>
                <div className="text-[1.2vw]">tbscustomerquery@tbs.com</div>
              </div>
            </div>

            <div className="overflow-auto  max-h-[21vw] ">
              <div>
                {/* <label
                htmlFor="name"
                className="block mb-1 font-bold text-[#1f487c] text-base"
              >
                Name
              </label> */}
                <Field
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="input-field mt-[1.5vw] w-[97%] h-[3vw] placeholder-[#444b62] text-top border border-b-2 border-r-2 border-b-[#1f487c] border-r-[#1f487c] 
            focus:outline-none focus:border-2 border-gray-300  px-[.5vw] py-[.5vw] rounded-md"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-[1vw]"
                />

                {/* <label
                htmlFor="phone"
                className="block mb-1 font-bold text-[#1f487c] text-base"
              >
                Phone
              </label> */}
                <Field
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="Phone"
                  className="input-field mt-[1.5vw] w-[97%] h-[3vw] placeholder-[#444b62] text-top border border-b-2 border-r-2 border-b-[#1f487c] border-r-[#1f487c] 
            focus:outline-none focus:border-2 border-gray-300  px-[.5vw] py-[.5vw] rounded-md"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-[1vw] "
                />

                {/* <label
                htmlFor="mail"
                className="block mb-1 font-bold text-[#1f487c] text-base"
              >
                E-Mail
              </label> */}
                <Field
                  id="mail"
                  name="mail"
                  type="email"
                  placeholder="Email"
                  className="input-field mt-[1.5vw] w-[97%] h-[3vw] placeholder-[#444b62] text-top border border-b-2 border-r-2 border-b-[#1f487c] border-r-[#1f487c] 
            focus:outline-none focus:border-2 border-gray-300  px-[.5vw] py-[.5vw] rounded-md"
                />
                <ErrorMessage
                  name="mail"
                  component="div"
                  className="text-red-500 text-[1vw] "
                />

                {/* <label
                htmlFor="message"
                className="block mb-1 font-bold text-[#1f487c] text-base"
              >
                Message
              </label> */}
                <Field
                  id="message"
                  name="message"
                  as="textarea"
                  placeholder="Enter your message here..."
                  className="input-field mt-[1.5vw] w-[97%] h-[6vw] placeholder-[#444b62] text-top border border-b-2 border-r-2 border-b-[#1f487c] border-r-[#1f487c] 
            focus:outline-none focus:border-2 border-gray-300 px-[.5vw] py-[.5vw] rounded-md"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-red-500 text-[1vw] "
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="flex h-[2.5vw] me-2 bg-[#1F4B7F] mt-[0.3vw] px-[0.8vw] gap-[0.5vw] py-[0.3vw] rounded-[0.6vw] items-center justify-center"
                type="submit"
                //disabled={isSubmitting} // Disable button while submitting
              >
                <span>
                  <LiaSave color="white" size={"1.5vw"} />
                </span>
                <span className="text-white text-[1vw]">Submit</span>
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}
