import { Checkbox, Form } from "antd";
import { ErrorMessage, Field, Formik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import partner from "../../asserts/partner.png";
import partner_bg from "../../asserts/partner_bg.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../../asserts/crmlogo.png";

const validationSchema = Yup.object().shape({
  emailid: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Partner() {
  const navigation = useNavigate();

  const handleSubmit = async () => {
    sessionStorage.setItem("token", "TBS1001");
    window.location.reload();
  };
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div
      className="h-screen w-screen relative bg-[#E5FFF1] flex  justify-center"
      style={{
        backgroundImage: `url(${partner_bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <div className=" absolute right-[1.5vw] top-0">
        <img src={logo} className="h-[6vw] w-[16vw]" />
      </div>
      <div className="w-[90%] h-[81%] relative mt-[6%]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url(${partner})`,
            backgroundSize: "fill",
            backgroundPosition: "center",
            boxShadow:
              "0 -10px 6px rgba(0, 0, 0, 0.1), 0 10px 6px rgba(0, 0, 0, 0.1)",
          }}
          // style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)' }}
          // style={{ boxShadow: '0 -3px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.1)' }}
        >
          <div className="absolute left-0 top-0 bg-[#ffffff] h-full w-[35vw] bg-opacity-90 flex flex-col items-center justify-center">
            <label className="text-[#1F487C] font-bold text-[2vw] ">
              Login
            </label>
            <p className="text-[#1F487C]  text-[1vw] py-[2vw]">
              Welcome Back, Please login to your account
            </p>

            <Formik
              initialValues={{
                emailid: "",
                password: "",
              }}
              // validationSchema={validationSchema}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
              // validateOnChange={true}
              // validateOnBlur={true}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="gap-y-[1.5vw] flex-col flex">
                    <div className="col-span-1">
                      <label className="text-[#1F487C] text-[1.1vw] ">
                        Email ID
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        type="text"
                        name="emailid"
                        placeholder="Enter Email Address"
                        className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
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
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <div className="relative flex items-center">
                        <Field
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Enter Password"
                          className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
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
                        <p className="text-[#1F487C]  text-[1vw]">
                          Forgot Password
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center pt-[3vw]">
                      <div>
                        <button
                          // type="submit"
                          // disabled={isSubmitting}
                          onClick={handleSubmit}
                          className="w-full flex justify-center py-2 px-12 border border-transparent rounded-md shadow-sm text-[1.2vw] font-medium text-white bg-[#1F487C]"
                        >
                          Login
                        </button>
                      </div>
                      <div className="pl-[1vw]">
                        <button
                          // type="submit"
                          // disabled={isSubmitting}
                          className="w-full flex justify-center py-2 px-11 border border-[#1F487C] rounded-md shadow-sm text-[1.2vw] font-medium text-[#1F487C] bg-[#ffffff]"
                        >
                          Sign Up
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
