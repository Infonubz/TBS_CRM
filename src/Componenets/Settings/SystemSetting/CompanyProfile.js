// import React, { useEffect, useState } from "react";
// import * as Yup from "yup";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { MdCancel } from "react-icons/md";
// import { Upload } from "antd";
// import ImgCrop from "antd-img-crop";
// // import {
// //   GetCompanyProfile,
// //   SubmitCompanyProfile,
// //   GetCompanyProfileById,
// // } from "../../../Api/Settings/CompanyProfile";
// import { useSelector, useDispatch } from "react-redux";
// import { message } from "antd";
// import { PiUpload } from "react-icons/pi";
// import {
//   GetCompanyProfile,
//   SubmitCompanyProfile,
// } from "../../../Api/Settings/SystemSettings/CompanyProfile";
// import { COMPANY_PROFILE } from "../../../Store/Type";

// const CompanyProfile = () => {
//   const validationSchema = Yup.object().shape({
//     companyname: Yup.string()
//       .max(20, "Company name must be at most 20 characters")
//       .required("Company name is required"),
//     phone: Yup.string()
//       .matches(/^[0-9]+$/, "Phone number must be only digits")
//       .min(10, "Phone number must be exactly 10 digits")
//       .max(10, "Phone number must be exactly 10 digits")
//       .required("Phone number is required"),
//     alternate_phone: Yup.string()
//       .matches(/^[0-9]+$/, "Alternate phone number must be only digits")
//       .min(10, "Alternate phone number must be exactly 10 digits")
//       .max(10, "Alternate phone number must be exactly 10 digits"),
//     aadhar_card: Yup.string()
//       .matches(/^[0-9]+$/, "Aadhar number must be only digits")
//       .min(12, "Aadhar number must be exactly 12 digits")
//       .max(12, "Aadhar number must be exactly 12 digits")
//       .required("Aadhar number is required"),
//     ownername: Yup.string()
//       .max(20, "Owner name must be at most 20 characters")
//       .required("Owner name is required"),
//     emailid: Yup.string()
//       .email("Email must be a valid email address")
//       .required("Email is required"),
//     alternate_emailid: Yup.string().email(
//       "Alternate email must be a valid email address"
//     ),
//     pan_card: Yup.string()
//       .matches(
//         /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
//         "PAN card must be in the format ABCDE1234F"
//       )
//       .required("PAN card is required"),
//     constitution: Yup.string().required("Constitution is required"),
//     msme_number: Yup.string().required("MSME number is required"),
//     msme_type: Yup.string().required("MSME type is required"),
//     service: Yup.string().required("Service is required"),
//     currency_code: Yup.string().required("Currency code is required"),
//     country: Yup.string().required("Country is required"),
//     region: Yup.string().required("Region is required"),
//     state: Yup.string().required("State is required"),
//     city: Yup.string().required("City is required"),
//     zip_code: Yup.string().required("Zip code is required"),
//     address: Yup.string().required("Address is required"),
//     gstn_number: Yup.string().required("GSTN number is required"),
//     created_date: Yup.date().required("Created Date is required"),
//     user_status: Yup.string().required("User Status is required"),
//     business_id: Yup.string().required("Business ID is required"),
//     business_background: Yup.string().required(
//       "Business Background is required"
//     ),
//     has_gstin: Yup.boolean().required("GSTIN information is required"),
//     aggregate_turnover_exceeded: Yup.string().required(
//       "Aggregate Turnover Exceeded information is required"
//     ),
//     state_code_number: Yup.string().required("State Code Number is required"),
//     head_office: Yup.string().required("Head Office information is required"),
//     upload_gst: Yup.mixed()
//       .required("A file is required")
//       .test("fileSize", "File size is too large", (value) => {
//         return value && value.size <= 2000000; // 2MB
//       })
//       .test("fileType", "Unsupported File Format", (value) => {
//         return (
//           value &&
//           ["image/jpeg", "image/png", "application/pdf"].includes(value.type)
//         );
//       }),
//     aadar_front_doc: Yup.mixed()
//       .required("A file is required")
//       .test("fileSize", "File size is too large", (value) => {
//         return value && value.size <= 2000000; // 2MB
//       })
//       .test("fileType", "Unsupported File Format", (value) => {
//         return (
//           value &&
//           ["image/jpeg", "image/png", "application/pdf"].includes(value.type)
//         );
//       }),
//     aadar_back_doc: Yup.mixed()
//       .required("A file is required")
//       .test("fileSize", "File size is too large", (value) => {
//         return value && value.size <= 2000000; // 2MB
//       })
//       .test("fileType", "Unsupported File Format", (value) => {
//         return (
//           value &&
//           ["image/jpeg", "image/png", "application/pdf"].includes(value.type)
//         );
//       }),
//     pancard_front_doc: Yup.mixed()
//       .required("A file is required")
//       .test("fileSize", "File size is too large", (value) => {
//         return value && value.size <= 2000000; // 2MB
//       })
//       .test("fileType", "Unsupported File Format", (value) => {
//         return (
//           value &&
//           ["image/jpeg", "image/png", "application/pdf"].includes(value.type)
//         );
//       }),
//     pancard_back_doc: Yup.mixed().required("File is required"),
//   });
//   const [fileList, setFileList] = useState([
//     // {
//     //     uid: '-1',
//     //     name: 'image.png',
//     //     status: 'done',
//     //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     // },
//   ]);
//   const onChange = ({ fileList: newFileList }) => {
//     setFileList(newFileList);
//   };
//   const onPreview = async (file) => {
//     let src = file.url;
//     if (!src) {
//       src = await new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file.originFileObj);
//         reader.onload = () => resolve(reader.result);
//       });
//     }
//     const image = new Image();
//     image.src = src;
//     const imgWindow = window.open(src);
//     imgWindow?.document.write(image.outerHTML);
//   };

//   const [companysProfile, setCompanysProfile] = useState([]);

//   const { Dragger } = Upload;

//   // -----------------------------------------------------------------------
//   const [uploadFileList, setUploadFileList] = useState([]);
//   const [fileName, setFileName] = useState("");

//   // const uploadProps = {
//   //     name: "file",
//   //     multiple: false,
//   //     action: "https://api.example.com/upload",
//   //     fileList: uploadFileList,
//   //     onChange(info) {
//   //         const { status, name } = info.file;
//   //         if (status !== "uploading") {
//   //             console.log(info.file, info.fileList);
//   //             console.log(info.file, "filetesting");
//   //         }
//   //         if (status === "done") {
//   //             message.success(`${name} file uploaded successfully.`);
//   //             setUploadFileList([info.file]);
//   //         } else if (status === "error") {
//   //             message.error(`${name} file upload failed.`);
//   //         }
//   //     },
//   //     beforeUpload(file) {
//   //         setUploadFileList([file]);
//   //         return false;
//   //     },
//   // };

//   // -------------------------------------------------------------------------------------------------

//   const getcompanyprofile = useSelector((state) => state.company_profile);
//   console.log(getcompanyprofile, "workingproperly");

//   const handleSubmit = async (values) => {
//     try {
//       const data = await SubmitCompanyProfile(values);
//       toast.success(data?.message);
//       GetCompanyProfile(dispatch);
//       console.log(data);
//     } catch (error) {
//       console.error("Error uploading data", error);
//     }
//   };

//   const dispatch = useDispatch();
//   useEffect(() => {
//     GetCompanyProfile(dispatch);
//   }, []);

//   const gettingdata = getcompanyprofile?.[0];
//   console.log(gettingdata, "getcompanyprofile");

//   const fetchCompanyProfile = async () => {
//     try {
//       //   const data = await GetCompanyProfileById(values);
//       //   console.log("Updated data of company profile:", data);
//     } catch (error) {
//       console.error("Error fetching company profile data", error);
//     }
//   };

//   useEffect(() => {
//     fetchCompanyProfile();
//   }, []);

//   return (
//     <div className="">
//       <Formik
//         initialValues={{
//           companyname: gettingdata?.company_name || "",
//           ownername: gettingdata?.owner_name || "",
//           phone: gettingdata?.phone || "",
//           emailid: gettingdata?.emailid || "",
//           alternate_phone: gettingdata?.alternate_phone || "",
//           alternate_emailid: gettingdata?.alternate_emailid || "",
//           aadhar_card: gettingdata?.aadharcard_number || "",
//           pan_card: gettingdata?.pancard_number || "",
//           constitution: gettingdata?.type_of_constitution || "",
//           msme_number: gettingdata?.msme_number || "",
//           msme_type: gettingdata?.msme_type || "",
//           service: gettingdata?.type_of_service || "",
//           currency_code: gettingdata?.currency_code || "",
//           country: gettingdata?.country || "",
//           region: gettingdata?.region || "",
//           state: gettingdata?.state_name || "",
//           city: gettingdata?.city || "",
//           zip_code: gettingdata?.zip_code || "",
//           address: gettingdata?.address || "",
//           gstn_number: gettingdata?.gstin || "",
//           created_date: gettingdata?.created_date || "",
//           user_status: gettingdata?.user_status || "",
//           business_id: gettingdata?.business_id || "",
//           business_background: gettingdata?.business_background || "",
//           has_gstin: false,
//           aggregate_turnover_exceeded:
//             gettingdata?.aggregate_turnover_exceeded || "",
//           state_code_number: gettingdata?.state_code_number || "",
//           head_office: gettingdata?.head_office || "",
//           upload_gst: gettingdata?.upload_gst || "",
//           aadar_front_doc: gettingdata?.aadar_front_doc || "",
//           aadar_back_doc: gettingdata?.aadar_back_doc || "",
//           pancard_front_doc: gettingdata?.pancard_front_doc || "",
//           pancard_back_doc: gettingdata?.pancard_back_doc || "",
//         }}
//         validationSchema={validationSchema}
//         onSubmit={(values) => {
//           console.log(values, "valuesvalues");
//           dispatch({
//             type: COMPANY_PROFILE,
//             payload: values,
//           });
//           handleSubmit(values);
//         }}
//         enableReinitialize
//       >
//         {({
//           isSubmitting,
//           isValid,
//           setFieldValue,
//           handleSubmit,
//           values,
//           handleChange,
//         }) => (
//           <Form onSubmit={handleSubmit}>
//             <div>
//               <div className="grid grid-cols-3 gap-x-[5vw] gap-y-[1vw] px-[5vw] py-[1vw]">
//                 {/* <div className=' relative flex justify-center'>
//                                     <img src={CHESS} alt="CHESS" className=' w-[10vw] h-[10vw] rounded-full border-[0.4vw] border-slate-300' />
//                                     <MdCancel size='1.7vw' color='black' className='absolute left-[13.8vw] top-[0.7vw]' />
//                                 </div> */}
//                 <div className=" relative flex justify-center">
//                   <ImgCrop rotationSlider>
//                     <Upload
//                       action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
//                       listType="picture-circle"
//                       fileList={fileList}
//                       onChange={onChange}
//                       onPreview={onPreview}
//                     >
//                       {fileList.length < 1 && "+ Upload"}
//                     </Upload>
//                   </ImgCrop>
//                 </div>
//                 <div className="grid grid-cols-2 gap-x-[5vw] gap-y-[1vw] col-span-2 ">
//                   <div className="">
//                     <label className="text-[#1F4B7F] text-[1.1vw]">
//                       Company Name
//                     </label>
//                     <Field
//                       type="text"
//                       name="companyname"
//                       placeholder="Enter Company Name"
//                       value={values.companyname}
//                       className=" customize-placeholder border-r-[0.25vw]  border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none"
//                     />
//                     <ErrorMessage
//                       name="companyname"
//                       component="div"
//                       className="text-red-500 text-[0.8vw]"
//                     />
//                   </div>
//                   <div>
//                     <label className="text-[#1F4B7F] text-[1.1vw]">
//                       Owner Name
//                     </label>
//                     <Field
//                       type="text"
//                       name="ownername"
//                       placeholder="Enter Owner Name"
//                       value={values.ownername}
//                       className="customize-placeholder border-r-[0.25vw]  border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none"
//                     />
//                     <ErrorMessage
//                       name="ownername"
//                       component="div"
//                       className="text-red-500 text-[0.8vw]"
//                     />
//                   </div>
//                   <div>
//                     <label className="text-[#1F4B7F] text-[1.1vw]">Phone</label>
//                     <Field
//                       type="text"
//                       name="phone"
//                       placeholder="Enter Phone Number"
//                       values={values.phone}
//                       className="customize-placeholder border-r-[0.25vw]  border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none"
//                     />
//                     <ErrorMessage
//                       name="phone"
//                       component="div"
//                       className="text-red-500 text-[0.8vw]"
//                     />
//                   </div>
//                   <div>
//                     <label className="text-[#1F4B7F] text-[1.1vw]">Email</label>
//                     <Field
//                       type="text"
//                       name="emailid"
//                       placeholder="Enter Email Id"
//                       values={values.emailid}
//                       className="customize-placeholder border-r-[0.25vw]  border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none"
//                     />
//                     <ErrorMessage
//                       name="emailid"
//                       component="div"
//                       className="text-red-500 text-[0.8vw]"
//                     />
//                   </div>
//                 </div>
//                 <div className="">
//                   <label className="text-[#1F4B7F] text-[1.1vw]">
//                     Alternate Phone
//                   </label>
//                   <Field
//                     type="text"
//                     name="alternate_phone"
//                     placeholder="Enter Company Name"
//                     value={values.alternate_phone}
//                     className=" customize-placeholder border-r-[0.25vw]  border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none"
//                   />
//                   <ErrorMessage
//                     name="alternate_phone"
//                     component="div"
//                     className="text-red-500 text-[0.8vw]"
//                   />
//                 </div>
//                 <div className="">
//                   <label className="text-[#1F4B7F] text-[1.1vw]">
//                     Alternate Email Id
//                   </label>
//                   <Field
//                     type="text"
//                     name="alternate_emailid"
//                     placeholder="Enter Company Name"
//                     value={values.alternate_emailid}
//                     className=" customize-placeholder border-r-[0.25vw]  border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none"
//                   />
//                   <ErrorMessage
//                     name="alternate_emailid"
//                     component="div"
//                     className="text-red-500 text-[0.8vw]"
//                   />
//                 </div>
//                 <div className="">
//                   <label className="text-[#1F4B7F] text-[1.1vw]">
//                     Aadhar Card Number
//                   </label>
//                   <Field
//                     type="text"
//                     name="aadhar_card"
//                     placeholder="Enter aadhar_card Number"
//                     value={values.aadhar_card}
//                     className=" customize-placeholder border-r-[0.25vw]  border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none"
//                   />
//                   <ErrorMessage
//                     name="aadhar_card"
//                     component="div"
//                     className="text-red-500 text-[0.8vw]"
//                   />
//                 </div>
//                 <div className="">
//                   <label className="text-[#1F4B7F] text-[1.1vw]">
//                     Pan Card Number
//                   </label>
//                   <Field
//                     type="text"
//                     name="pan_card"
//                     placeholder="Enter Pan Card Number"
//                     value={values.pan_card}
//                     className=" customize-placeholder border-r-[0.25vw]  border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none"
//                   />
//                   <ErrorMessage
//                     name="pan_card"
//                     component="div"
//                     className="text-red-500 text-[0.8vw]"
//                   />
//                 </div>
//                 <div className="">
//                   <label className="text-[#1F4B7F] text-[1.1vw]">
//                     Types of Constitution
//                   </label>
//                   <Field
//                     as="select"
//                     name="constitution"
//                     id="constitution"
//                     // disabled
//                     value={values.constitution}
//                     className="customize-placeholder border-r-[0.25vw]  border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none"
//                   >
//                     <option
//                       label="Select Your Constitution"
//                       value=""
//                       className=""
//                     />
//                     <option
//                       label="Private Limited"
//                       value="Private Limited"
//                       className=""
//                     />
//                   </Field>
//                   <ErrorMessage
//                     name="constitution"
//                     component="div"
//                     className="text-red-500 text-[0.8vw]"
//                   />
//                 </div>
//                 <div className="">
//                   <label className="text-[#1F4B7F] text-[1.1vw]">
//                     MSME Number
//                   </label>
//                   <Field
//                     type="text"
//                     name="msme_number"
//                     placeholder="Enter MSME Number"
//                     value={values.msme_number}
//                     className=" customize-placeholder border-r-[0.25vw]  border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none"
//                   />
//                   <ErrorMessage
//                     name="msme_number"
//                     component="div"
//                     className="text-red-500 text-[0.8vw]"
//                   />
//                 </div>
//                 <div className="">
//                   <label className="text-[#1F4B7F] text-[1.1vw]">
//                     MSME Type
//                   </label>
//                   <Field
//                     as="select"
//                     name="msme_type"
//                     id="msme_type"
//                     // disabled
//                     value={values.msme_type}
//                     className="customize-placeholder border-r-[0.25vw]  border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none"
//                   >
//                     <option label="Select MSME Types" value="" className="" />
//                     <option label="MICRO" value="MICRO" className="" />
//                     <option label="SMALL" value="SMALL" className="" />
//                     <option label="MEDIUM" value="Medium" className="" />
//                     <option label="LARGE" value="LARGE" className="" />
//                   </Field>
//                   <ErrorMessage
//                     name="msme_type"
//                     component="div"
//                     className="text-red-500 text-[0.8vw]"
//                   />
//                 </div>
//                 <div className="">
//                   <label className="text-[#1F4B7F] text-[1.1vw]">
//                     Types of Service
//                   </label>
//                   <Field
//                     as="select"
//                     name="service"
//                     id="service"
//                     // disabled
//                     value={values.service}
//                     className="customize-placeholder border-r-[0.25vw]  border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none"
//                   >
//                     <option
//                       label="Select Types of Service"
//                       value=""
//                       className=""
//                     />
//                     <option label="TRAVEL" value="TRAVEL" className="" />
//                     <option label="TOURIST" value="TOURIST" className="" />
//                     <option
//                       label="TOURIST @ TRAVEL"
//                       value="Software Development"
//                       className=""
//                     />
//                   </Field>
//                   <ErrorMessage
//                     name="service"
//                     component="div"
//                     className="text-red-500 text-[0.8vw]"
//                   />
//                 </div>
//                 <div className="">
//                   <label className="text-[#1F4B7F] text-[1.1vw]">
//                     Currency Code
//                   </label>
//                   <Field
//                     type="text"
//                     name="currency_code"
//                     placeholder="Enter Currency Code"
//                     value={values.currency_code}
//                     className=" customize-placeholder border-r-[0.25vw]  border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none"
//                   />
//                   <ErrorMessage
//                     name="currency_code"
//                     component="div"
//                     className="text-red-500 text-[0.8vw]"
//                   />
//                 </div>
//                 <div className="">
//                   <label className="text-[#1F4B7F] text-[1.1vw]">Country</label>
//                   <Field
//                     as="select"
//                     name="country"
//                     id="country"
//                     // disabled
//                     value={values.country}
//                     className="customize-placeholder border-r-[0.25vw]  border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none"
//                   >
//                     <option label="Select Country" value="" className="" />
//                     <option label="India" value="India" className="" />
//                   </Field>
//                   <ErrorMessage
//                     name="country"
//                     component="div"
//                     className="text-red-500 text-[0.8vw]"
//                   />
//                 </div>
//                 <div className="">
//                   <label className="text-[#1F4B7F] text-[1.1vw]">Region</label>
//                   <Field
//                     as="select"
//                     name="region"
//                     id="region"
//                     // disabled
//                     value={values.region}
//                     className="customize-placeholder border-r-[0.25vw]  border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none"
//                   >
//                     <option label="Select Your Region" value="" className="" />
//                     <option label="REGION 1" value="REGION 1" className="" />
//                   </Field>
//                   <ErrorMessage
//                     name="region"
//                     component="div"
//                     className="text-red-500 text-[0.8vw]"
//                   />
//                 </div>
//                 <div className="">
//                   <label className="text-[#1F4B7F] text-[1.1vw]">State</label>
//                   <Field
//                     as="select"
//                     name="state"
//                     id="state"
//                     // disabled
//                     value={values.state}
//                     className="customize-placeholder border-r-[0.25vw]  border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none"
//                   >
//                     <option label="Select STATE" value="" className="" />
//                     <option label="kerala" value="kerala" className="" />
//                   </Field>
//                   <ErrorMessage
//                     name="state"
//                     component="div"
//                     className="text-red-500 text-[0.8vw]"
//                   />
//                 </div>
//                 <div className="">
//                   <label className="text-[#1F4B7F] text-[1.1vw]">City</label>
//                   <Field
//                     as="select"
//                     name="city"
//                     id="city"
//                     // disabled
//                     value={values.city}
//                     className="customize-placeholder border-r-[0.25vw]  border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none"
//                   >
//                     <option label="Select CITY" value="" className="" />
//                     <option label="Thrissur" value="Thrissur" className="" />
//                   </Field>
//                   <ErrorMessage
//                     name="city"
//                     component="div"
//                     className="text-red-500 text-[0.8vw]"
//                   />
//                 </div>
//                 <div className="">
//                   <label className="text-[#1F4B7F] text-[1.1vw]">
//                     Postal/Zip Code
//                   </label>
//                   <Field
//                     as="select"
//                     name="zip_code"
//                     id="zip_code"
//                     // disabled
//                     value={values.zip_code}
//                     className="customize-placeholder border-r-[0.25vw]  border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none"
//                   >
//                     <option label="Select ZIP CODE" value="" className="" />
//                     <option label="680310" value="680310" className="" />
//                   </Field>
//                   <ErrorMessage
//                     name="zip_code"
//                     component="div"
//                     className="text-red-500 text-[0.8vw]"
//                   />
//                 </div>
//                 <div className="">
//                   <label className="text-[#1F4B7F] text-[1.1vw]">Address</label>
//                   <Field
//                     type="text"
//                     name="address"
//                     placeholder="Enter Company Name"
//                     value={values.address}
//                     className=" customize-placeholder border-r-[0.25vw]  border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none"
//                   />
//                   <ErrorMessage
//                     name="address"
//                     component="div"
//                     className="text-red-500 text-[0.8vw]"
//                   />
//                 </div>
//                 <div className="">
//                   <label className="text-[#1F4B7F] text-[1.1vw]">
//                     GSTN Number
//                   </label>
//                   <Field
//                     type="text"
//                     name="gstn_number"
//                     placeholder="Enter GSTN Number"
//                     value={values.gstn_number}
//                     className=" customize-placeholder border-r-[0.25vw]  border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none"
//                   />
//                   <ErrorMessage
//                     name="gstn_number"
//                     component="div"
//                     className="text-red-500 text-[0.8vw]"
//                   />
//                 </div>
//                 <div className="">
//                   <label className="text-[#1F4B7F] text-[1.1vw]">
//                     Created Date
//                   </label>
//                   <Field
//                     type="text"
//                     name="created_date"
//                     id="created_date"
//                     // disabled
//                     value={values.created_date}
//                     className="customize-placeholder border-r-[0.25vw]  border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none"
//                   />
//                   <ErrorMessage
//                     name="created_date"
//                     component="div"
//                     className="text-red-500 text-[0.8vw]"
//                   />
//                 </div>

//                 <div className="">
//                   <label
//                     htmlFor="user_status"
//                     className="text-[#1F4B7F] text-[1.1vw] "
//                   >
//                     User Status
//                   </label>
//                   <Field
//                     type="text"
//                     id="user_status"
//                     name="user_status"
//                     value={values.user_status}
//                     className="customize-placeholder border-r-[0.25vw]  border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none"
//                   />
//                   <ErrorMessage
//                     name="user_status"
//                     component="div"
//                     className="text-red-500 text-[0.8vw]"
//                   />
//                 </div>
//                 <div className="">
//                   <label
//                     htmlFor="business_id"
//                     className="text-[#1F4B7F] text-[1.1vw] "
//                   >
//                     Business ID
//                   </label>
//                   <Field
//                     type="text"
//                     id="business_id"
//                     name="business_id"
//                     value={values.business_id}
//                     className="customize-placeholder border-r-[0.25vw]  border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none"
//                   />
//                   <ErrorMessage
//                     name="business_id"
//                     component="div"
//                     className="text-red-500 text-[0.8vw]"
//                   />
//                 </div>
//                 <div className="">
//                   <label
//                     htmlFor="business_background"
//                     className="text-[#1F4B7F] text-[1.1vw] "
//                   >
//                     Business Background
//                   </label>
//                   <Field
//                     type="text"
//                     id="business_background"
//                     name="business_background"
//                     value={values.business_background}
//                     className="customize-placeholder border-r-[0.25vw]  border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none"
//                   />
//                   <ErrorMessage
//                     name="business_background"
//                     component="div"
//                     className="text-red-500 text-[0.8vw]"
//                   />
//                 </div>
//                 <div className="">
//                   <label
//                     htmlFor="has_gstin"
//                     className="text-[#1F4B7F] text-[1.1vw] "
//                   >
//                     Has GSTIN
//                   </label>
//                   <Field
//                     type="radio"
//                     id="has_gstin"
//                     name="has_gstin"
//                     checked={values.has_gstin}
//                     className="mr-96"
//                     disabled
//                   />
//                   <label className="text-[#1F4B7F] text-[1.1vw]">Yes</label>
//                   <ErrorMessage
//                     name="has_gstin"
//                     component="div"
//                     className="text-red-500 text-[0.8vw]"
//                   />
//                 </div>
//                 <div className="">
//                   <label className="text-[#1F4B7F] text-[1.1vw] ">
//                     Aggregate Turnover Exceeded
//                   </label>
//                   <Field
//                     type="text"
//                     id="aggregate_turnover_exceeded"
//                     name="aggregate_turnover_exceeded"
//                     value={values.aggregate_turnover_exceeded}
//                     className="customize-placeholder border-r-[0.25vw]  border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none"
//                   />
//                   <ErrorMessage
//                     name="aggregate_turnover_exceeded"
//                     component="div"
//                     className="text-red-500 text-[0.8vw]"
//                   />
//                 </div>
//                 <div className="">
//                   <label
//                     htmlFor="state_code_number"
//                     className="text-[#1F4B7F] text-[1.1vw] "
//                   >
//                     State Code Number
//                   </label>
//                   <Field
//                     type="text"
//                     id="state_code_number"
//                     name="state_code_number"
//                     value={values.state_code_number}
//                     className="customize-placeholder border-r-[0.25vw]  border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none"
//                   />
//                   <ErrorMessage
//                     name="state_code_number"
//                     component="div"
//                     className="text-red-500 text-[0.8vw]"
//                   />
//                 </div>
//                 <div className="">
//                   <label className="text-[#1F4B7F] text-[1.1vw] ">
//                     Head Office
//                   </label>
//                   <Field
//                     type="text"
//                     id="head_office"
//                     name="head_office"
//                     value={values.head_office}
//                     className="customize-placeholder border-r-[0.25vw]  border-l-[0.03vw] border-t-[0.03vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none"
//                   />
//                   <ErrorMessage
//                     name="head_office"
//                     component="div"
//                     className="text-red-500 text-[0.8vw]"
//                   />
//                 </div>
//                 <div className="">
//                   <label className="text-[#1F4B7F] text-[1.1vw] ">
//                     Upload GST
//                   </label>
//                   <Field name="upload_gst">
//                     {() => (
//                       <>
//                         <Dragger
//                           height={"2.8vw"}
//                           beforeUpload={(upload_gst) => {
//                             setFieldValue("upload_gst", upload_gst);
//                             setFileName(upload_gst.name); // Set the file name
//                             return false; // Prevent automatic upload
//                           }}
//                           showUploadList={false} // Disable the default upload list
//                           className="customize-placeholder placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none" // Apply custom CSS class
//                         >
//                           <label className="flex items-center justify-center">
//                             <p className="text-[#1F4B7F] text-[1.1vw] pr-[1vw]">
//                               Drag and Drop
//                             </p>
//                             <PiUpload color="#1F4B7F" size={"1.2vw"} />
//                           </label>
//                         </Dragger>
//                         {fileName && (
//                           <p className="text-[#1F4B7F] text-[0.8vw] mt-2">
//                             {fileName}
//                           </p>
//                         )}
//                       </>
//                     )}
//                   </Field>
//                   <ErrorMessage
//                     name="upload_gst"
//                     component="div"
//                     className="text-red-500 text-[0.8vw]"
//                   />
//                 </div>
//                 <div className="">
//                   <label
//                     htmlFor="aadar_front_doc"
//                     className="text-[#1F4B7F] text-[1.1vw] "
//                   >
//                     aadar_front_doc
//                   </label>
//                   <Field name="aadar_front_doc">
//                     {() => (
//                       <>
//                         <Dragger
//                           height={"2.8vw"}
//                           beforeUpload={(aadar_front_doc) => {
//                             setFieldValue("aadar_front_doc", aadar_front_doc);
//                             setFileName(aadar_front_doc.name); // Set the file name
//                             return false; // Prevent automatic upload
//                           }}
//                           showUploadList={false} // Disable the default upload list
//                           className="customize-placeholder placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none" // Apply custom CSS class
//                         >
//                           <label className="flex items-center justify-center">
//                             <p className="text-[#1F4B7F] text-[1.1vw] pr-[1vw]">
//                               Drag and Drop
//                             </p>
//                             <PiUpload color="#1F4B7F" size={"1.2vw"} />
//                           </label>
//                         </Dragger>
//                         {fileName && (
//                           <p className="text-[#1F4B7F] text-[0.8vw] mt-2">
//                             {fileName}
//                           </p>
//                         )}
//                       </>
//                     )}
//                   </Field>
//                   <ErrorMessage
//                     name="aadar_front_doc"
//                     component="div"
//                     className="text-red-500 text-[0.8vw]"
//                   />
//                 </div>
//                 <div className="">
//                   <label
//                     htmlFor="aadar_back_doc"
//                     className="text-[#1F4B7F] text-[1.1vw] "
//                   >
//                     aadar_back_doc
//                   </label>
//                   <Field name="aadar_back_doc">
//                     {() => (
//                       <>
//                         <Dragger
//                           height={"2.8vw"}
//                           beforeUpload={(aadar_back_doc) => {
//                             setFieldValue("aadar_back_doc", aadar_back_doc);
//                             setFileName(aadar_back_doc.name); // Set the file name
//                             return false; // Prevent automatic upload
//                           }}
//                           showUploadList={false} // Disable the default upload list
//                           className="customize-placeholder placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none" // Apply custom CSS class
//                         >
//                           <label className="flex items-center justify-center">
//                             <p className="text-[#1F4B7F] text-[1.1vw] pr-[1vw]">
//                               Drag and Drop
//                             </p>
//                             <PiUpload color="#1F4B7F" size={"1.2vw"} />
//                           </label>
//                         </Dragger>
//                         {fileName && (
//                           <p className="text-[#1F4B7F] text-[0.8vw] mt-2">
//                             {fileName}
//                           </p>
//                         )}
//                       </>
//                     )}
//                   </Field>
//                   <ErrorMessage
//                     name="aadar_back_doc"
//                     component="div"
//                     className="text-red-500 text-[0.8vw]"
//                   />
//                 </div>
//                 <div className="">
//                   <label className="text-[#1F4B7F] text-[1.1vw] ">
//                     pancard_front_doc
//                   </label>
//                   <Field name="pancard_front_doc">
//                     {() => (
//                       <>
//                         <Dragger
//                           height={"2.8vw"}
//                           beforeUpload={(pancard_front_doc) => {
//                             setFieldValue(
//                               "pancard_front_doc",
//                               pancard_front_doc
//                             );
//                             setFileName(pancard_front_doc.name); // Set the file name
//                             return false; // Prevent automatic upload
//                           }}
//                           showUploadList={false} // Disable the default upload list
//                           className="customize-placeholder placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none" // Apply custom CSS class
//                         >
//                           <label className="flex items-center justify-center">
//                             <p className="text-[#1F4B7F] text-[1.1vw] pr-[1vw]">
//                               Drag and Drop
//                             </p>
//                             <PiUpload color="#1F4B7F" size={"1.2vw"} />
//                           </label>
//                         </Dragger>
//                         {fileName && (
//                           <p className="text-[#1F4B7F] text-[0.8vw] mt-2">
//                             {fileName}
//                           </p>
//                         )}
//                       </>
//                     )}
//                   </Field>
//                   <ErrorMessage
//                     name="pancard_front_doc"
//                     component="div"
//                     className="text-red-500 text-[0.8vw]"
//                   />
//                 </div>
//                 <div className="">
//                   <label className="text-[#1F4B7F] text-[1.1vw] ">
//                     pancard_back_doc
//                   </label>
//                   <Field name="pancard_back_doc">
//                     {() => (
//                       <>
//                         <Dragger
//                           height={"2.8vw"}
//                           beforeUpload={(pancard_back_doc) => {
//                             setFieldValue("pancard_back_doc", pancard_back_doc);
//                             setFileName(pancard_back_doc.name); // Set the file name
//                             return false; // Prevent automatic upload
//                           }}
//                           showUploadList={false} // Disable the default upload list
//                           className="customize-placeholder placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.8vw] w-[100%] rounded-md outline-none" // Apply custom CSS class
//                         >
//                           <label className="flex items-center justify-center">
//                             <p className="text-[#1F4B7F] text-[1.1vw] pr-[1vw]">
//                               Drag and Drop
//                             </p>
//                             <PiUpload color="#1F4B7F" size={"1.2vw"} />
//                           </label>
//                         </Dragger>
//                         {fileName && (
//                           <p className="text-[#1F4B7F] text-[0.8vw] mt-2">
//                             {fileName}
//                           </p>
//                         )}
//                       </>
//                     )}
//                   </Field>
//                   <ErrorMessage
//                     name="pancard_back_doc"
//                     component="div"
//                     className="text-red-500 text-[0.8vw]"
//                   />
//                 </div>
//               </div>
//               <div className="flex justify-center pt-[2vw] pb-[2vw]">
//                 <button
//                   className="w-[10vw] h-[2.5vw] text-[1.2vw] bg-[#1F487C] text-white rounded-md"
//                   type="submit"
//                 >
//                   UPDATE
//                 </button>
//               </div>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default CompanyProfile;

import React from "react";
import SuperAdminIndex from "../../UserManagement/SuperAdmin/IndexSuperAdmin";

export default function CompanyProfile() {
  return (
    <div>
      <SuperAdminIndex />
    </div>
  );
}
