import { Progress, Upload } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  GetEmpPersonalById,
  GetProductOwnerEmployee,
  submitPersonalData,
} from "../../../Api/UserManagement/Employee";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { GetRolesData } from "../../../Api/Role&Responsibilites/ActiveRoles";
import { capitalizeFirstLetter } from "../../Common/Captilization";
import { FaUpload } from "react-icons/fa";

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be a number")
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number maximum 10 digits only")
    .required("Phone Number is required"),
  emailid: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address format"
    )
    .required("Email is required"),
  alt_phone: Yup.string()
    .matches(/^[0-9]+$/, "Alternative Phone number must be a number")
    .min(10, "Alternative Phone number must be at least 10 digits")
    .max(10, "Alternative Phone number maximum 10 digits only")
    .required("Alternative Phone Number is required"),
  firstname: Yup.string().required("Company Name is required"),
  lastname: Yup.string().required("Owner Name is required"),
  blood: Yup.string().required("Company Name is required"),
  gender: Yup.string().required("Please select an Gender"), // Validation schema for select field
  dob: Yup.date().required("Date of Birth is required").nullable(),
  profile_img: Yup.mixed()
    .test('fileSize', 'File size is too large', value => {
      // return value && value.size <= 2000000;
      return value && value.size <= 15728640; // 15 MB in bytes

    })
    .test('fileType', 'Unsupported file format', value => {
      return value && ['image/jpeg', 'image/png'].includes(value.type);
    }),
});
export default function AddPersonalDetails({
  setCurrentpage,
  EmployeeID,
  setEmployeeID,
  addressback,
}) {
  const [enable, setEnable] = useState(false);
  const dispatch = useDispatch();
console.log(EmployeeID,"idididi");

  const handleSubmit = async (values) => {
    console.log(EmployeeID,"idididi");
    if (EmployeeID && enable == false) {
      setCurrentpage(2);
    } else {
      console.log("hell hwohdifghdkjfj");
      
      try {
        const data = await submitPersonalData(
          values,
          enable,
          EmployeeID,
          dispatch
        );
        // setModalIsOpen(false);
        toast.success(data?.message);
        setCurrentpage(2);
        // GetOffersData(dispatch);
        console.log(data);
      } catch (error) {
        console.error("Error uploading data", error);
      }
    }
  };

  const [emppersonaldata, setEmpPersonalData] = useState("");
  console.log(emppersonaldata,"datadata");
  

  const fetchGetUser = async () => {
    try {
      const data = await GetEmpPersonalById(
        EmployeeID,
        setEmployeeID,
        setEmpPersonalData
      );
      setEmpPersonalData(data);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  useEffect(() => {
    if (EmployeeID != null || enable || addressback) {
      fetchGetUser();
    }
  }, [EmployeeID, setEmployeeID, setEmpPersonalData, enable, addressback]);

  const [roledata, setRoleData] = useState("");

  const GetRoles = async () => {
    try {
      const data = await GetProductOwnerEmployee(EmployeeID);
      setRoleData(data);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  useEffect(() => {
    GetRolesData(dispatch);
    GetRoles();
  }, []);

  const getrolelist = useSelector((state) => state.crm.role_list);

  console.log(roledata, "roledata");

  const { Dragger } = Upload;
  const [profileImage, setProfileImage] = useState("");
  const [draggerImage, setDraggerImage] = useState(false)
  const [previewUrl, setPreviewUrl] = useState("");

  return (
    <div>
      <div className="border-l-[0.1vw] h-[28vw] overflow-y-scroll px-[2vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.1vw] rounded-[1vw] border-[#1f4b7f]">
        <div className="h-[4vw] w-full flex items-center justify-between ">
          <label className="text-[1.5vw] font-semibold text-[#1f4b7f] ">
            Personal Details
          </label>
          {EmployeeID || addressback ? (
            <button
              className={`${enable
                ? "bg-[#1f4b7f] text-white"
                : "text-[#1f4b7f] bg-white border-[#1f4b7f]"
                } rounded-full font-semibold w-[10vw] h-[2vw] flex items-center justify-center border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.1vw] text-[1.1vw] `}
              onClick={() => setEnable(!enable)}
            >
              Enable to Edit
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="pb-[1vw] ">
          <div className="border-b-[0.1vw] w-full border-[#1f4b7f] "></div>
        </div>
        <div>
          <Formik
            initialValues={{
              firstname: emppersonaldata?.emp_first_name || "",
              lastname: emppersonaldata?.emp_last_name || "",
              phone: emppersonaldata?.phone || "",
              emailid: emppersonaldata?.email_id || "",
              alt_phone: emppersonaldata?.alternate_phone || "",
              dob: emppersonaldata?.date_of_birth
                ? dayjs(emppersonaldata?.date_of_birth).format("YYYY-MM-DD")
                : "",
              gender: emppersonaldata?.gender || "",
              blood: emppersonaldata?.blood_group || "",
              role: emppersonaldata?.role_type || "",
              role_id: emppersonaldata?.role_type_id || "",
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
              errors,
              touched
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className="gap-y-[1.5vw] flex-col flex">
                  <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Employee First Name
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        type="text"
                        name="firstname"
                        placeholder="Enter First Name"
                        // value={values.firstname}
                        disabled={
                          EmployeeID || addressback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${EmployeeID || addressback
                          ? enable == false
                            ? " cursor-not-allowed"
                            : ""
                          : ""
                          } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      />
                      <ErrorMessage
                        name="firstname"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                    <div className="col-span-1 ">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
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
                          disabled={
                            EmployeeID || addressback
                              ? enable
                                ? false
                                : true
                              : false
                          }
                          className={`${EmployeeID || addressback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                            } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                        />
                        {/* <button className="absolute right-[0.5vw] text-[1vw] text-white w-[5vw] bg-[#1F4B7F] rounded-full h-[1.7vw]">
                          Verify
                        </button> */}
                      </div>
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                  <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Alternate Phone
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        type="text"
                        name="alt_phone"
                        placeholder="Enter Alternate Number"
                        // value={values.firstname}
                        disabled={
                          EmployeeID || addressback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${EmployeeID || addressback
                          ? enable == false
                            ? " cursor-not-allowed"
                            : ""
                          : ""
                          } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      />
                      <ErrorMessage
                        name="alt_phone"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
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
                        disabled={
                          EmployeeID || addressback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${EmployeeID || addressback
                          ? enable == false
                            ? " cursor-not-allowed"
                            : ""
                          : ""
                          } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      />
                      <ErrorMessage
                        name="emailid"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                  
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Date of Birth
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        type="date"
                        name="dob"
                        placeholder="Select Date of Birth"
                        value={values.dob}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        disabled={
                          EmployeeID || addressback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${EmployeeID || addressback
                          ? enable == false
                            ? " cursor-not-allowed"
                            : ""
                          : ""
                          } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      />
                      <ErrorMessage
                        name="dob"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Gender
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        as="select"
                        name="gender"
                        value={values.gender}
                        onChange={(e) => {
                          handleChange(e);
                          localStorage.setItem("status", e.target.value);
                        }}
                        disabled={
                          EmployeeID || addressback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${EmployeeID || addressback
                          ? enable == false
                            ? " cursor-not-allowed"
                            : ""
                          : ""
                          } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      >
                        <option label="Select Gender" value="" className="" />
                        <option label="Male" value="Male" className="" />
                        <option label="Female" value="Female" className="" />
                        <option label="Other" value="Other" className="" />
                      </Field>
                      <ErrorMessage
                        name="gender"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                 
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Blood Group
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        type="text"
                        name="blood"
                        placeholder="Enter Blood Group"
                        // value={values.firstname}
                        disabled={
                          EmployeeID || addressback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${EmployeeID || addressback
                          ? enable == false
                            ? " cursor-not-allowed"
                            : ""
                          : ""
                          } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      />
                      <ErrorMessage
                        name="blood"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Role Type
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        as="select"
                        name="role"
                        value={values.role}
                        onChange={(e) => {
                          handleChange(e);
                          const selectedOption =
                            e.target.options[e.target.selectedIndex];
                          const value = selectedOption.value;
                          const label = selectedOption.label;
                          setFieldValue("role_id", value);
                          // setFieldValue("role", label);
                          console.log(label, "eeeeeeeeeeeeeeee");
                        }}
                        disabled={
                          EmployeeID || addressback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${EmployeeID || addressback
                          ? enable == false
                            ? " cursor-not-allowed"
                            : ""
                          : ""
                          } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      >
                        <option label="Select Role" value="" className="" />
                        {/* <option label="Male" value="Male" className="" />
                        <option label="Female" value="Female" className="" />
                        <option label="Other" value="Other" className="" /> */}
                        {roledata?.length > 0 &&
                          roledata?.map((item) => {
                            {
                              console.log(item, "itemitemitemitemitem");
                            }
                            return (
                              <option
                                label={capitalizeFirstLetter(item.role_type)}
                                value={item.role_id}
                                className=""
                              />
                            );
                          })}
                      </Field>
                      <ErrorMessage
                        name="role"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                  </div>
                  {/* <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                 
                    <div className="col-span-1 relative">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Profile Image
                      </label>
                      <Field name="profile_img">
                        {({ field, form }) => (
                          <Dragger
                            height={"7.2vw"}
                            onChange={() => setDraggerImage(true)}
                            beforeUpload={(file) => {
                              console.log(file, "filefilefilefile");
                              setProfileImage(file.name);
                              setFieldValue("profile_img", file);
                              setFieldValue("fileType", file.type);
                              setFieldValue("fileSize", file.size);
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setPreviewUrl(reader.result); // Set the preview URL
                              };

                              reader.readAsDataURL(file);
                              return false; // Prevent automatic upload
                            }}
                            showUploadList={false} // Disable the default upload list
                            className="mt-[0.5vw] relative"
                            style={{
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              position: "relative",
                            }}
                          >
                            <label className="flex items-center justify-center relative z-10">
                              <p className="text-[#1F4B7F] font-bold text-[1.1vw] pr-[1vw]">
                                Drag and Drop
                              </p>
                              <FaUpload color="#1F4B7F" size={"1.2vw"} />
                            </label>
                          </Dragger>
                        )}
                      </Field>
                      {profileImage && (
                        <p className="text-[#1F4B7F] text-[0.8vw] mt-2">
                          {profileImage}
                        </p>
                      )}
                      {errors.file && touched.file && (
                        <div className="text-red-500 text-[0.8vw]">
                          {errors.file}
                        </div>
                      )}
                    </div>
                  </div> */}
                  <div className="flex items-center justify-between py-[1vw]">
                    <div>
                      <h1 className="text-[#1F4B7F] text-[0.7vw] font-semibold">
                        *You must fill in all fields to be able to continue
                      </h1>
                    </div>
                    <div className="flex items-center gap-x-[1vw]">
                      <button className="border-[#1F487C] w-[5vw] font-semibold text-[1vw] h-[2vw] rounded-full border-r-[0.2vw]  border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw]">
                        Reset
                      </button>
                      <button
                        className="bg-[#1F487C] font-semibold rounded-full w-[11vw] h-[2vw] text-[1vw] text-white"
                        type="submit"
                      // onClick={() => setCurrentpage(2)}
                      >
                        {EmployeeID || addressback
                          ? enable
                            ? "Update & Continue"
                            : "Continue"
                          : "Continue"}
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
  );
}
