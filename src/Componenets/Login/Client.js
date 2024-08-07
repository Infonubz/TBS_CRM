import { Form } from "antd";
import { ErrorMessage, Field, Formik } from "formik";
import React from "react";
import Backdrop from "../../asserts/bus.jpg";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { ProductOwnerLogin } from "../../Api/Login/AllLogin";

const validationSchema = Yup.object().shape({
  //   phone: Yup.string()
  //     .matches(/^[0-9]+$/, "Phone number must be a number")
  //     .min(10, "Phone number must be at least 10 digits")
  //     .max(10, "Phone number maximum 10 digits only")
  //     .required("Phone Number is required"),
  emailid: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address format"
    )
    .required("Email is required"),
  password: Yup.string()
    // .matches(/^[0-9]+$/, "Phone number must be a number")
    // .min(10, "Phone number must be at least 10 digits")
    // .max(10, "Phone number maximum 10 digits only")
    .required("Password is required"),
});
export default function Client() {
  const handleSubmit = async (values) => {
    try {
      const data = await ProductOwnerLogin(values);
      // setModalIsOpen(false);
      toast.success(data?.message);

      console.log(data);
    } catch (error) {
      console.error("Error uploading data", error);
    }
  };
  return (
    <div className="flex h-screen">
      {/* Left Side Image */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url(${Backdrop})`,
        }}
      ></div>

      {/* Right Side Form */}
      <div className="w-1/2 flex flex-col justify-center items-center">
        <div className="w-full max-w-md p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center text-[#886400]">
            TBS Client
          </h2>
          <Formik
            initialValues={{
              //   companyname: "",
              //   phone: "",
              emailid: "",
              password: "",
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
              setFieldError,
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className="gap-y-[1.5vw] flex-col flex">
                  <div className="grid grid-cols-2 w-full gap-x-[2vw]"></div>
                  {/* <div className="col-span-1 ">
                    <label className="text-[#886400] text-[1.1vw] ">
                      Phone
                      <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <div className="relative flex items-center">
                      <Field
                        type="text"
                        name="phone"
                        placeholder="Enter Number"
                        // value={values.firstname}
                        // onBlur={(e) => handleBlur(e, setFieldError)} // Custom onBlur handler
                        className="border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#886400] text-[#886400] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                      />
                
                    </div>
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </div> */}
                  <div className="col-span-1">
                    <label className="text-[#886400] text-[1.1vw] ">
                      Email ID
                      <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <Field
                      type="text"
                      name="emailid"
                      placeholder="Enter Email Address"
                      // value={values.firstname}
                      className="border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#886400] text-[#886400] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                    />
                    <ErrorMessage
                      name="emailid"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </div>
                  <div className="col-span-1 ">
                    <label className="text-[#886400] text-[1.1vw] ">
                      Password
                      <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <div className="relative flex items-center">
                      <Field
                        type="text"
                        name="password"
                        placeholder="Enter Password"
                        // value={values.firstname}
                        // onBlur={(e) => handleBlur(e, setFieldError)} // Custom onBlur handler
                        className="border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#886400] text-[#886400] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                      />
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </div>

                  <div className="mt-[1vw]">
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#886400] "
                      //   onClick={() =>
                      //     sessionStorage.setItem("token", "TBS10001")
                      //   }
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <div className="flex items-center justify-center">
            <h1 className="border-b-[0.1vw] border-[#886400] text-[1vw] text-[#886400] font-semibold cursor-pointer">
              Forgot Password
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
