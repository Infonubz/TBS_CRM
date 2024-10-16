import { Progress } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import * as Yup from "yup";
import dayjs from "dayjs";
import {
  GetEmpProffesionalById,
  submitEmployeeProffesionalData,
} from "../../../Api/UserManagement/Employee";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const validationSchema = Yup.object().shape({
  emailid: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address format"
    )
    .required("Email is required"),
  designation: Yup.string().required("Designation is required"),
  department: Yup.string().required("Department is required"),
  report_manager: Yup.string().required("Owner Name is required"),
  experiance: Yup.string()
    .matches(/^[0-9]+$/, "Experiance must be a number")
    // .min(5, "Experiance must be at least 10 digits")
    // .max(10, "Experiance maximum 10 digits only")
    .required("Experiance is required"),
  branch: Yup.string().required("Please select an Branch"),
  join_date: Yup.date().required("Joining Date Required"), // Validation schema for select field
});

export default function AddProfessionalDetails({
  setCurrentpage,
  EmployeeID,
  setEmployeeID,
  setProffesionalBack,
  proffesionaback,
  documentback,
}) {
  const [enable, setEnable] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    console.log("Form values on submit:", values); // Log form values
    if (EmployeeID && enable == false) {
      console.log("Existing EmployeeID, setting current page to 3");
      setCurrentpage(4);
    } else if (EmployeeID) {
      try {
        console.log("No EmployeeID, submitting data");
        const data = await submitEmployeeProffesionalData(
          values,
          EmployeeID,
          dispatch
        );
        toast.success(data);
        setCurrentpage(4);

        console.log("Data submitted successfully:", data);
      } catch (error) {
        console.error("Error uploading data", error);
        toast.error("Error uploading data");
      }
    } else {
      try {
        console.log("No EmployeeID, submitting data");
        const data = await submitEmployeeProffesionalData(
          values,
          EmployeeID,
          dispatch
        );
        toast.success(data);
        setCurrentpage(4);
        console.log("Data submitted successfully:", data);
      } catch (error) {
        console.error("Error uploading data", error);
        toast.error("Error uploading data");
      }
    }
  };

  console.log(EmployeeID, "EmployeeIDEmployeeID");
  const [empproffesionaldata, setEmpProffesionalData] = useState("");

  const fetchGetUser = async () => {
    try {
      const data = await GetEmpProffesionalById(
        EmployeeID,
        setEmployeeID,
        setEmpProffesionalData
      );
      setEmpProffesionalData(data);
      console.log("Fetched user data:", data);
    } catch (error) {
      console.error("Error fetching additional user data", error);
      toast.error("Error fetching user data");
    }
  };

  useEffect(() => {
    if (EmployeeID != null || documentback) {
      fetchGetUser();
    }
  }, [EmployeeID, documentback]);

  console.log(empproffesionaldata, "empproffesionaldata");

  return (
    <div>
      <div className="border-l-[0.1vw] px-[2vw] overflow-y-scroll h-[28vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.1vw] rounded-[1vw] border-[#1f4b7f]">
        <div className="h-[4vw] w-full flex items-center justify-between ">
          <label className="text-[1.5vw] font-semibold text-[#1f4b7f] ">
            Professional Details
          </label>
          {EmployeeID ||
          (documentback && empproffesionaldata != null) ||
          empproffesionaldata != "null" ? (
            <button
              className={`${
                enable
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
              branch: empproffesionaldata ? empproffesionaldata.branch : "",
              join_date: empproffesionaldata
                ? dayjs(empproffesionaldata?.join_date).format("YYYY-MM-DD")
                : "",
              designation: empproffesionaldata
                ? empproffesionaldata.designation
                : "",
              emailid: empproffesionaldata
                ? empproffesionaldata.official_email_id
                : "",
              experiance: empproffesionaldata
                ? empproffesionaldata.years_of_experience
                : "",
              department: empproffesionaldata
                ? empproffesionaldata.department
                : "",
              report_manager: empproffesionaldata
                ? empproffesionaldata.reporting_manager
                : "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({
              isSubmitting,
              isValid,
              setFieldValue,
              handleSubmit,
              values,
              handleChange,
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className="gap-y-[1.5vw] flex-col flex">
                  <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Joining Date
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        type="date"
                        name="join_date"
                        placeholder="Select Joining Date"
                        value={values.join_date}
                        onChange={(e) => {
                          handleChange(e);
                          localStorage.setItem("dob", e.target.value);
                        }}
                        disabled={
                          EmployeeID || documentback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          EmployeeID || documentback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      />
                      <ErrorMessage
                        name="join_date"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Designation
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        type="text"
                        name="designation"
                        placeholder="Enter Last Name"
                        // value={values.firstname}
                        disabled={
                          EmployeeID || documentback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          EmployeeID || documentback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      />
                      <ErrorMessage
                        name="designation"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                    <div className="col-span-1 ">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Branch
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        as="select"
                        name="branch"
                        value={values.branch}
                        onChange={(e) => {
                          handleChange(e);
                          localStorage.setItem("branch", e.target.value);
                        }}
                        disabled={
                          EmployeeID || documentback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          EmployeeID || documentback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      >
                        <option label="Select Branch" value="" className="" />
                        <option
                          label="Tiruppur"
                          value="Tiruppur"
                          className=""
                        />
                        <option
                          label="Coimbatore"
                          value="Coimbatore"
                          className=""
                        />
                        <option label="Chennai" value="Chennai" className="" />
                      </Field>
                      <ErrorMessage
                        name="branch"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Official Email ID
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        type="text"
                        name="emailid"
                        placeholder="Enter Email Address"
                        value={values.emailid}
                        disabled={
                          EmployeeID || documentback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          EmployeeID || documentback
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
                        Year of Experiance
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        type="text"
                        name="experiance"
                        placeholder="Year of Experiance"
                        value={values.experiance}
                        disabled={
                          EmployeeID || documentback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          EmployeeID || documentback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      />
                      <ErrorMessage
                        name="experiance"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Department
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        type="text"
                        name="department"
                        placeholder="Enter Department"
                        value={values.department}
                        disabled={
                          EmployeeID || documentback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          EmployeeID || documentback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      />
                      <ErrorMessage
                        name="department"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Reporting Manager
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        type="text"
                        name="report_manager"
                        placeholder="Enter Name"
                        value={values.report_manager}
                        disabled={
                          EmployeeID || documentback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          EmployeeID || documentback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      />
                      <ErrorMessage
                        name="report_manager"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-[1vw]">
                    <div>
                      <h1 className="text-[#1F4B7F] text-[0.7vw] font-semibold">
                        *You must fill in all fields to be able to continue
                      </h1>
                    </div>
                    <div className="flex items-center gap-x-[1vw]">
                      <button
                        className="border-[#1F487C] w-[5vw] font-semibold text-[1vw] h-[2vw] rounded-full border-r-[0.2vw]  border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw]"
                        onClick={() => {
                          setCurrentpage(2);
                          setProffesionalBack(true);
                        }}
                      >
                        Back
                      </button>
                      <button
                        className="bg-[#1F487C] font-semibold rounded-full w-[11vw] h-[2vw] text-[1vw] text-white"
                        type="submit"
                        // onClick={() => setCurrentpage(4)}
                      >
                        {EmployeeID || documentback
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
