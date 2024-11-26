import { Checkbox } from "antd";
import { ErrorMessage, Field, Formik, Form } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { ProductOwnerLogin } from "../../Api/Login/AllLogin";
import { useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const emailOrPhoneValidation = Yup.string().test(
  "emailOrPhone",
  "Invalid email or phone number format",
  (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    return emailRegex.test(value) || phoneRegex.test(value);
  }
);

const validationSchema = Yup.object().shape({
  emailid_phone: emailOrPhoneValidation.required("Email or Phone is required"),
  password: Yup.string().required("Password is required"),
});

export default function ProductOwner({ setAuthtoken, setForgotPassword }) {


  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // const phoneRegex = /^\d{10}$/;

  const validateInput = (input) => {
    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^\d{10}$/;
    if (emailRegex.test(input)) {
      return 1; // Email
    } else if (phoneRegex.test(input)) {
      return 2; // Phone
    }
    return 0; // Invalid
  };

  // const handleSubmit = async (values, { setSubmitting, setAuthtoken }) => {
  //   const validationResult = validateInput(values.emailid_phone);

  //   try {
  //     const data = await ProductOwnerLogin(
  //       values,
  //       validationResult,
  //       setAuthtoken
  //     );
  //     toast.success(data?.message);
  //     console.log(data, "datadatadatadatadata");
  //     if (data?.token) {
  //       navigate("/dashboard");
  //       window.location.reload();
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const handleSubmit = async (values, { setSubmitting, setFieldError, setAuthtoken }) => {
    const validationResult = validateInput(values.emailid_phone);

    try {
      const data = await ProductOwnerLogin(
        values,
        validationResult,
        setAuthtoken
      );

      toast.success(data?.message);
      console.log(data, "datadatadatadatadata");

      if (data?.token) {
        navigate("/dashboard");
        window.location.reload();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setFieldError("password", "Invalid Password / Username");
        // toast.error("Invalid Password / Username"); 
      } else {
        toast.error(error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="absolute right-0 top-0 bg-[#E5FFF1] h-full w-[38vw] rounded-tr-[2vw] rounded-br-[2vw] bg-opacity-80 flex flex-col items-center justify-center">
      <label className="text-[#1F487C] font-bold text-[2vw] ">PRODUCT OWNER</label>
      <p className="text-[#1F487C] text-[1vw] py-[2vw]">
        Welcome Back, Please sign in to your account
      </p>
      <Formik
        initialValues={{
          emailid_phone: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, setFieldError, setAuthtoken }) => {
          handleSubmit(values, { setSubmitting, setFieldError, setAuthtoken });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="gap-y-[1.5vw] flex-col flex">
              <div className="col-span-1 relative">
                <label className="text-[#1F487C] text-[1.1vw] ">
                  Email / Phone
                  <span className="text-[1vw] text-red-600 pl-[0.2vw]">*</span>
                </label>
                <Field
                  type="text"
                  name="emailid_phone"
                  placeholder="Enter Email ID / Phone number"
                  className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                />
                <ErrorMessage
                    name="emailid_phone"
                    component="div"
                    className="text-red-500 text-[0.8vw] absolute bottom-[-1.5vw]"
                  />
              </div>
              <div className="col-span-1 ">
                <label className="text-[#1F487C] text-[1.1vw] ">
                  Password
                  <span className="text-[1vw] text-red-600 pl-[0.2vw]">*</span>
                </label>
                <div className="relative flex items-center">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter Password"
                    className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                  />
                  <div
                    className="absolute right-[1vw] cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <FaEye className="text-[1.5vw] text-[#1F487C]" />
                    ) : (
                      <FaEyeSlash className="text-[1.5vw] text-[#1F487C]" />
                    )}
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-[0.8vw] absolute bottom-[-1.5vw]"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <Checkbox
                    onChange={(e) => { }}
                    className="text-[#1F4B7F] text-[1vw] "
                  >
                    Remember me
                  </Checkbox>
                </div>
                <div>
                  <p
                    className="text-[#1F487C] text-[1vw] cursor-pointer"
                    onClick={() => setForgotPassword(true)}
                  >
                    Forgot Password
                  </p>
                </div>
              </div>
              <div className="">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-[1.2vw] font-medium text-white bg-[#1F487C]"
                >
                  Sign In
                </button>
              </div>
              <p className="text-center text-[0.8vw] text-[#1F487C]">
                CRM Version V-1.02
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
