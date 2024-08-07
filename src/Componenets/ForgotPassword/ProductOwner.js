import React, { useState } from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { InputOTP } from "antd-input-otp";
import { useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../../App.css";
import {
  SendOTP,
  ResetPassword,
} from "../../Api/ForgotPassword/ForgotPassword";
import { toast } from "react-toastify";
import "../../App.css";
const validationSchema = Yup.object().shape({
  email_id: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address format"
    )
    .required("Email is required"),
});

const validationFullSchema = Yup.object().shape({
  email_id: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address format"
    )
    .required("Email is required"),
  //otp: Yup.string().required("OTP is required"),
  newPassword: Yup.string().required("New password is required"),
  confirm: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Please confirm your password"),
});

const ProductOwnerForgotPassword = ({
  setLoginHide,
  setShowComponent,
  setForgotPassword,
}) => {
  const [otpEnabled, setOtpEnabled] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigation = useNavigate();
  const [value, setValue] = useState([]);
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);

  const handleSendOTP = async (values) => {
    console.log(values, "values emailid");
    try {
      const otpMail = values;
      const response = await SendOTP(otpMail);
      console.log(response, "-----response emailid");
      toast.success(response?.data?.message);
      setOtpEnabled(true);
    } catch (error) {
      console.error("Error sending OTP", error);
    }
  };

  const handleResendOTP = () => {
    console.log("Resending OTP...");
  };

  const handleSubmit = async (values) => {
    try {
      const response = await ResetPassword(values);
      toast.success(response?.data?.message);
      setLoginHide(true);
      setShowComponent(false);
      navigation("/");
    } catch (error) {
      console.error("Error resetting password", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setshowConfirmPassword(!showConfirmPassword);
  };
  console.log(otpEnabled, "otpEnabled");
  return (
    <div className="absolute right-0 top-0 bg-[#E5FFF1] h-full w-[38vw] rounded-tr-[2vw] rounded-br-[2vw] bg-opacity-80 flex flex-col items-center justify-center">
      <label className="text-[#1F487C] font-bold text-[2vw] ">
        {otpEnabled ? "Create New Password" : "Forgot Password"}
      </label>
      <Formik
        initialValues={{
          email_id: "",
          otp: "",
          newPassword: "",
          confirm: "",
        }}
        validationSchema={() => {
          return !otpEnabled ? validationSchema : validationFullSchema;
        }}
        onSubmit={(values, { setSubmitting }) => {
          if (!otpEnabled) {
            handleSendOTP(values);
          } else {
            values.otp = otpDigits.join("");
            handleSubmit(values);
          }
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div className="gap-y-[1.5vw] flex-col flex pt-[1vw]">
              {otpEnabled ? (
                <>
                  <div className="col-span-1">
                    <InputOTP
                      name="otp"
                      style={{
                        borderColor: "#1f4b7f",
                        // width: "10vw",
                        // height: "2vw !important",
                      }}
                      inputClassName="w-full input-otp__field"
                      numInputs={6}
                      onChange={(otpValue) => {
                        const updatedDigits = [...otpDigits];
                        for (let i = 0; i < otpValue.length; i++) {
                          if (otpValue[i]) {
                            updatedDigits[i] = otpValue[i];
                          }
                        }
                        setOtpDigits(updatedDigits);
                      }}
                      // wrapperStyle={{
                      //   height: "0.5vw",
                      // }}
                      classNames="input-otp__field"
                      inputType="numeric"
                    />
                    <ErrorMessage
                      name="otp"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    className="w-full flex justify-center py-2 px-2 border border-transparent rounded-md shadow-sm text-[1vw] font-medium text-white bg-[#1F487C]"
                  >
                    Resend OTP
                  </button>
                  <div className="col-span-1">
                    <div className="relative flex items-center">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="newPassword"
                        placeholder="Enter New Password"
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
                      name="newPassword"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </div>
                  <div className="col-span-1">
                    <div className="relative flex items-center">
                      <Field
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirm"
                        placeholder="Enter Confirm Password"
                        className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                      />
                      <div
                        className="absolute right-[1vw] cursor-pointer"
                        onClick={toggleConfirmPassword}
                      >
                        {showConfirmPassword ? (
                          <FaEye className="text-[1.5vw] text-[#1F487C]" />
                        ) : (
                          <FaEyeSlash className="text-[1.5vw] text-[#1F487C]" />
                        )}
                      </div>
                    </div>

                    <ErrorMessage
                      name="confirm"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </div>
                  <div className="pt-[1vw]">
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      //disabled={isSubmitting}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-[1.2vw] font-medium text-white bg-[#1F487C]"
                    >
                      Submit
                    </button>
                  </div>
                  <p
                    className="text-[1vw] text-center font-semibold text-[#1F487C] cursor-pointer"
                    onClick={() => setOtpEnabled(false)}
                  >
                    Back
                  </p>
                </>
              ) : (
                <>
                  <div className="col-span-1">
                    <label className="text-[#1F487C] text-[1.1vw] ">
                      Email ID
                      <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <Field
                      type="text"
                      name="email_id"
                      placeholder="Enter Email Address"
                      className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                    />
                    <ErrorMessage
                      name="email_id"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </div>
                  <div className="flex justify-center">
                    {!otpEnabled ? (
                      <button
                        type="submit"
                        onClick={handleSendOTP}
                        className="w-full flex justify-center py-2 px-2 border border-transparent rounded-md shadow-sm text-[1vw] font-medium text-white bg-[#1F487C]"
                      >
                        Send OTP
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendOTP}
                        className="w-full flex justify-center py-2 px-2 border border-transparent rounded-md shadow-sm text-[1vw] font-medium text-white bg-[#1F487C]"
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>
                  <p
                    className="text-[1vw] text-center font-semibold text-[#1F487C] cursor-pointer"
                    onClick={() => setForgotPassword(false)}
                  >
                    Back
                  </p>
                </>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProductOwnerForgotPassword;
