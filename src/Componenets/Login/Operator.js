import { Checkbox, Form } from "antd";
import { ErrorMessage, Field, Formik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
//import logo from "../../asserts/crmlogo.png";
import { OperatorLogin } from "../../Api/Login/AllLogin";

const validationSchema = Yup.object().shape({
  emailid: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Operator({ setForgotPassword, setAuthtoken }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values) => {
    const data = await OperatorLogin(values);
    try {
      toast.success(data);
      if (data?.token !== undefined) {
        console.log(data, "data2");
        navigate("/dashboard");
        window.location.reload();
      }
  } catch (error) {
    toast.error(error.message);
  }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="absolute right-0 top-0 bg-[#E5FFF1] h-full w-[38vw] rounded-tr-[2vw] rounded-br-[2vw] bg-opacity-90 flex flex-col items-center justify-center">
      <label className="text-[#1F487C] font-bold text-[2vw] ">OPERATOR</label>
      <p className="text-[#1F487C]  text-[1vw] py-[2vw]">
        Welcome Back, Please sign in to your account
      </p>

      <Formik
        initialValues={{
          emailid: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        // validateOnChange={true}
        // validateOnBlur={true}
        enableReinitialize
      >
        {({ isSubmitting, handleSubmit, handleChange }) => (
          <Form>
            <div className="gap-y-[1.5vw] flex-col flex">
              <div className="col-span-1">
                <label className="text-[#1F487C] text-[1.1vw] ">
                  Email / Phone
                  <span className="text-[1vw] text-red-600 pl-[0.2vw]">*</span>
                </label>
                <Field
                  type="text"
                  name="emailid"
                  placeholder="Enter Email Address / Phone "
                  onChange={(e) => {
                    handleChange(e);
                    sessionStorage.setItem("emailid", e.target.value);
                  }}
                  className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                />
                <ErrorMessage
                  name="emailid"
                  component="div"
                  className="text-red-500 text-[0.8vw]"
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
                    onChange={(e) => {
                      handleChange(e);
                      sessionStorage.setItem("password", e.target.value);
                    }}
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
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-[0.8vw]"
                />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <Checkbox
                    onChange={(e) => {}}
                    className="text-[#1F4B7F]  text-[1vw] "
                  >
                    Remember me
                  </Checkbox>
                </div>
                <div>
                  <p
                    className="text-[#1F487C]  text-[1vw] cursor-pointer"
                    onClick={() => setForgotPassword(true)}
                  >
                    Forgot Password
                  </p>
                </div>
              </div>
              <div className="">
                <div>
                  <button
                    type="submit"
                    // disabled={isSubmitting}
                    onClick={handleSubmit}
                    className="w-full flex justify-center py-2 px-30 border border-transparent rounded-md shadow-sm text-[1.2vw] font-medium text-white bg-[#1F487C]"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
