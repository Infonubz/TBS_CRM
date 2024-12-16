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
import { Spin } from "antd";

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
  const userType = sessionStorage.getItem("type_name");
  const typeId = sessionStorage.getItem("type_id")
    ? sessionStorage.getItem("type_id")
    : localStorage.getItem("type_id");
  const userID = sessionStorage.getItem("USER_ID");

  const loginMap = {
    PRO101: "product_owner",
    OP101: "all-operators",
    PROEMP101: "pro-emp-personal-details",
    OPEMP101: "emp-personal-details",
    PART101: "partner_details",
  };

  const Login = loginMap[typeId] || "";

  const [otpEnabled, setOtpEnabled] = useState(false);
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const [otpVerification, SetOtpVerification] = useState("");
  const [emailid, setEmailId] = useState({
    email_id: "",
  });
  const [spinning, setSpinning] = useState(false);

  console.log(Login, "login_map_s");
  const handleSendOTP = async (values) => {
    console.log(values, "values emailid");
    try {
      setSpinning(true);
      const otpMail = values.email_id;
      setEmailId({ email_id: otpMail });
      const response = await SendOTP(otpMail, setSpinning);
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

  // operator_data

  console.log(getUserSettingsEdit[0]?.emailid, "hello_moto");

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
    EditUserSettings(id, dispatch, Login);
  }, []);
  // const pass = sessionStorage.getItem("password");
  const pass = sessionStorage.getItem("password");
  console.log(pass, "password");

  const handleSubmit = async (values) => {
    if (otpDigits.join("") == otpVerification.toString()) {
      if (values.newPassword !== pass) {
        try {
          setSpinning(true);
          const response = await ResetPassword(values, setSpinning);
          // setTimeout(() => {
          //   setOtpEnabled(false);
          // }, 2000);
          setOtpEnabled(false);
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
    <div className="  h-full py-[2vw] flex justify-center ">
      <Formik
        initialValues={{
          email_id: getUserSettingsEdit?.email_id
            ? getUserSettingsEdit?.email_id
            : getUserSettingsEdit?.emailid
            ? getUserSettingsEdit?.emailid
            : getUserSettingsEdit[0]?.emailid || "",
          otp: "",
          newPassword: "",
          confirm: "",
        }}
        validationSchema={() => {
          return !otpEnabled ? validationSchema : validationFullSchema;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          if (!otpEnabled) {
            handleSendOTP(values);
          } else {
            values.otp = otpDigits.join("");
            handleSubmit(values);
          }
          resetForm({
            values: {
              ...values,
              newPassword: "", // explicitly reset these fields
              confirm: "", // explicitly reset these fields
            },
          });
        }}
        enableReinitialize
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <div className="gap-y-[1.5vw] flex-col flex pt-[1vw]">
              {spinning ? (
                <div className="h-[10vw]  flex justify-center items-center ">
                  <Spin size="large" />
                </div>
              ) : (
                <>
                  {otpEnabled ? (
                    <>
                      <div className="relative col-span-1">
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
                          className="text-red-500 text-[0.8vw]  absolute bottom-[-1.2vw]"
                        />
                      </div>
                      <button
                        type="submit"
                        onClick={() => handleSendOTP(emailid)}
                        className="w-full flex justify-center py-2 px-2 border border-transparent rounded-md shadow-sm text-[1vw] font-medium text-white bg-[#1F487C]"
                      >
                        Resend OTP
                      </button>
                      <div className="col-span-1 relative">
                        <div className=" flex items-center">
                          <Field
                            type={showPassword ? "text" : "password"}
                            name="newPassword"
                            placeholder="Enter New Password"
                            autoFocus={false}
                            className="placeholder-[#1F487C] border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[.5vw] outline-none px-[1vw]"
                          />
                          <div
                            className="absolute right-[1vw] top-[1.2vw] cursor-pointer"
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
                          className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                        />
                      </div>
                      <div className="col-span-1 relative ">
                        <div className=" flex items-center">
                          <Field
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirm"
                            placeholder="Enter Confirm Password"
                            autoFocus={false}
                            className="placeholder-[#1F487C] border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[.5vw] outline-none px-[1vw]"
                          />
                          <div
                            className="absolute right-[1vw] top-[1.2vw] cursor-pointer"
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
                          className="text-red-500 text-[0.8vw]  absolute bottom-[-1.2vw]"
                        />
                      </div>
                      <div className="flex justify-between items-center ">
                        <div
                        // className=" text-[#1F487C] cursor-pointer "
                        // onClick={() => setOtpEnabled(false)}
                        >
                          <button
                            className=" py-[0.7vw] px-[2vw] rounded-md shadow-sm text-[1.2vw] font-medium text-white bg-[#1F487C]"
                            onClick={() => setOtpEnabled(false)}
                          >
                            Back
                          </button>
                        </div>
                        <div className="">
                          <button
                            type="submit"
                            className=" py-[0.7vw] px-[2vw] rounded-md shadow-sm text-[1.2vw] font-medium text-white bg-[#1F487C]"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="col-span-1 ">
                        <label className="text-[#1F487C] text-[1.1vw] ">
                          Email ID
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                            *
                          </span>
                        </label>
                        <div className="relative">
                          <Field
                            type="text"
                            name="email_id"
                            placeholder="Enter Email Address"
                            value={values?.email_id}
                            readOnly
                            className="placeholder-[#1F487C] border-r-[0.3vw] cursor-not-allowed mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[25vw] rounded-[.5vw] outline-none px-[1vw]"
                          />
                          <ErrorMessage
                            name="email_id"
                            component="div"
                            className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                          />
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <button
                          type="submit"
                          onClick={() => handleSendOTP}
                          className="w-[12.5vw] flex justify-center py-2 px-2 border border-transparent rounded-md shadow-sm text-[1vw] font-medium text-white bg-[#1F487C]"
                        >
                          Send OTP
                        </button>
                      </div>
                    </>
                  )}
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

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Formik, Field, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { ResetPassword } from "../../../Api/ForgotPassword/ForgotPassword";

// const ForgotPassword = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const getUserSettingsEdit = useSelector(
//     (state) => state.crm.user_settings_edit
//   );

//   const validationSchema = Yup.object().shape({
//     currentPassword: Yup.string()
//       .required("Current password is required")
//       .test("match", "Current password is incorrect", (value, context) => {
//         return value === getUserSettingsEdit.password;
//       }),
//     newPassword: Yup.string()
//       .min(8, "New password must be at least 8 characters")
//       .required("New password is required"),
//     confirmNewPassword: Yup.string()
//       .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
//       .required("Please confirm your new password"),
//   });
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const id = sessionStorage.getItem("USER_ID");
//   }, []);

//   const handleSubmit = async (values) => {
//     try {
//       const response = await ResetPassword(values);
//       console.log("Password updated successfully");
//       sessionStorage.setItem("password", values.newPassword);
//     } catch (error) {
//       console.error("Error updating password", error);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleConfirmPassword = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };

//   return (
//     <div className=" py-[2vw] px-[10vw]">
//       <Formik
//         initialValues={{
//           currentPassword: "",
//           newPassword: "",
//           confirmNewPassword: "",
//         }}
//         validationSchema={validationSchema}
//         onSubmit={(values, { setSubmitting }) => {
//           handleSubmit(values);
//         }}
//       >
//         {({ isSubmitting }) => (
//           <Form>
//             <div className="grid grid-cols-2 gap-x-[7.5vw] gap-y-[1vw]">

//               <div className="col-span-1 relative">
//                 <label className="text-[#1F487C] text-[1.1vw]">
//                   Current Password
//                   <span className="text-[1vw] text-red-600 pl-[0.2vw]">*</span>
//                 </label>
//                 <div className="relative">
//                   <Field
//                     type="password"
//                     name="currentPassword"
//                     placeholder="Enter Current Password"
//                     className="placeholder-[#1F487C] border-r-[0.2vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-xl outline-none px-[1vw]"
//                   />
//                   <ErrorMessage
//                     name="currentPassword"
//                     component="div"
//                     className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
//                   />
//                 </div>
//               </div>

//               <div className="col-span-1">
//                 <label className="text-[#1F487C] text-[1.1vw]">
//                   New Password
//                   <span className="text-[1vw] text-red-600 pl-[0.2vw]">*</span>
//                 </label>
//                 <div className="relative">
//                   <Field
//                     type={showPassword ? "text" : "password"}
//                     name="newPassword"
//                     placeholder="Enter New Password"
//                     className="placeholder-[#1F487C] border-r-[0.2vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-xl outline-none px-[1vw]"
//                   />
//                   <div
//                     className="absolute right-[1vw] cursor-pointer top-[1.25vw]"
//                     onClick={togglePasswordVisibility}
//                   >
//                     {showPassword ? (
//                       <FaEye className="text-[1.5vw] text-[#1F487C]" />
//                     ) : (
//                       <FaEyeSlash className="text-[1.5vw] text-[#1F487C]" />
//                     )}
//                   </div>
//                   <ErrorMessage
//                     name="newPassword"
//                     component="div"
//                     className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
//                   />
//                 </div>
//               </div>

//               <div className="col-span-1">
//                 <label className="text-[#1F487C] text-[1.1vw]">
//                   Confirm New Password
//                   <span className="text-[1vw] text-red-600 pl-[0.2vw]">*</span>
//                 </label>
//                 <div className="relative">
//                   <Field
//                     type={showConfirmPassword ? "text" : "password"}
//                     name="confirmNewPassword"
//                     placeholder="Confirm New Password"
//                     className="placeholder-[#1F487C] border-r-[0.2vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-xl outline-none px-[1vw]"
//                   />
//                   <div
//                     className="absolute right-[1vw] top-[1.25vw] cursor-pointer"
//                     onClick={toggleConfirmPassword}
//                   >
//                     {showConfirmPassword ? (
//                       <FaEye className="text-[1.5vw] text-[#1F487C]" />
//                     ) : (
//                       <FaEyeSlash className="text-[1.5vw] text-[#1F487C]" />
//                     )}
//                   </div>
//                   <ErrorMessage
//                     name="confirmNewPassword"
//                     component="div"
//                     className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
//                   />
//                 </div>
//               </div>

//             </div>
//             <div className="flex justify-center pt-[1vw]">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-[12.5vw] flex justify-center py-2 px-2 border border-transparent rounded-xl shadow-sm text-[1vw] font-medium text-white bg-[#1F487C]"
//               >
//                 Update
//               </button>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default ForgotPassword;
