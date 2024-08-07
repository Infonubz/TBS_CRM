import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { InputOTP } from "antd-input-otp";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  ResetPassword,
  SendOTP,
} from "../../../Api/ForgotPassword/ForgotPassword";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  EditUserSettings,
  UpdateEditUserSettings,
} from "../../../Api/Settings/UserSettings/EditProfile";

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
const ForgotPassword = () => {
  const [otpEnabled, setOtpEnabled] = useState(false);
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const [otpVerification, SetOtpVerification] = useState("");
  const [emailid, setEmailId] = useState({
    email_id: "",
  });
  const handleSendOTP = async (values) => {
    console.log(values, "values emailid");
    try {
      const otpMail = values.email_id;
      setEmailId({ email_id: otpMail });
      const response = await SendOTP(otpMail);
      console.log(response, "-----response emailid");
      // toast.success(response?.data?.message);
      console.log(response.data.otp, "this is otp my");
      SetOtpVerification(response?.data?.otp);
      setOtpEnabled(true);
    } catch (error) {
      console.error("Error sending OTP", error);
    }
  };
  const getUserSettingsEdit = useSelector(
    (state) => state.crm.user_settings_edit
  );
  console.log(getUserSettingsEdit, "hello data");

  // const handleResendOTP = async () => {
  //   try {
  //     const response = await SendOTP();
  //     console.log(response.data.otp, "this is otp my222");
  //     setOtpEnabled(true);
  //     console.log("Resending OTP...");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const dispatch = useDispatch();

  useEffect(() => {
    const id = sessionStorage.getItem("USER_ID");
    console.log(id, "session id");
    EditUserSettings(id, dispatch);
  }, []);
  const pass = sessionStorage.getItem("password");
  console.log(pass, "password");

  const handleSubmit = async (values) => {
    if (otpDigits.join("") == otpVerification.toString()) {
      if (values.newPassword !== pass) {
        try {
          const response = await ResetPassword(values);
          setTimeout(() => {
            setOtpEnabled(false);
          }, 2000);
          sessionStorage.setItem("password", values.newPassword);

          // console.log("i am true");
          // toast.success(response?.data?.message);
        } catch (error) {
          console.error("Error resetting password", error);
        }
      } else {
        toast.error("password should not be matched with existing password");
      }
    } else {
      console.log("error");
      toast.error("OTP Invalid or Expired");
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
    <div className="  h-full w-[38vw]  py-[2vw] flex flex-col mx-auto items-center justify-center">
      <Formik
        initialValues={{
          email_id: getUserSettingsEdit.email_id,
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
        enableReinitialize
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
                    type="submit"
                    onClick={() => handleSendOTP(emailid)}
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
                        autoFocus={false}
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
                        autoFocus={false}
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
                  <div className="flex justify-between ">
                    <div
                      className=" text-[#1F487C] cursor-pointer mt-[.8vw]"
                      onClick={() => setOtpEnabled(false)}
                    >
                      <span className="border-[.3vw] border-[#1F487C] rounded-md text-[#1F487C]   py-[.7vw] px-[2vw]">
                        Back
                      </span>
                    </div>
                    <div className="">
                      <button
                        // onClick={() => {
                        //   handleSubmit();
                        // }}
                        type="submit"
                        //disabled={isSubmitting}
                        className="   py-[.8vw] px-[2vw] border border-transparent rounded-md shadow-sm text-[1.2vw] font-medium text-white bg-[#1F487C]"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
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
                      // value={getUserSettingsEdit.email_id}
                      readOnly
                      className="border-r-[0.3vw] cursor-not-allowed mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                    />
                    <ErrorMessage
                      name="email_id"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      onClick={() => handleSendOTP}
                      className="w-full flex justify-center py-2 px-2 border border-transparent rounded-md shadow-sm text-[1vw] font-medium text-white bg-[#1F487C]"
                    >
                      Send OTP
                    </button>
                  </div>
                </>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default ForgotPassword;
