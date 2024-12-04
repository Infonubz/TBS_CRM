import React, { useEffect, useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { toast } from 'react-toastify';
import { Checkbox, Progress } from "antd";
import { GetEmployeeProfessionalData, submitEmployeeProffesionalData } from '../../../../Api/Settings/UserSettings/Employee';
import dayjs from "dayjs";



const validationSchema = Yup.object().shape({
  designation: Yup.string().required("Designation is required").matches(/^[A-Za-z\s]+$/, "contains only letters and spaces"),
  department: Yup.string().required("Department is required").matches(/^[A-Za-z\s]+$/, "contains only letters and spaces"),
  role: Yup.string().required("role is required"),
  report_manager: Yup.string().required("Manager Name is required").matches(/^[A-Za-z\s]+$/, "contains only letters and spaces"),
  branch: Yup.string().required("Please select an Branch"),
  join_date: Yup.date().required("Joining Date Required"),
  language: Yup.string().required("Language is required").matches(/^[A-Za-z\s]+$/, "contains only letters and spaces"),
  qualification: Yup.string().required("Qualification is required").matches(/^[A-Za-z\s]+$/, "contains only letters and spaces")
});



const ProfessionalDetails = () => {

  const [empProfessional, setEmpProfessional] = useState()

  console.log(empProfessional, 'emp_Professional')

  const fetchEmpProfessionalData = async () => {
    try {
      const data = await GetEmployeeProfessionalData();
      setEmpProfessional(data);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  useEffect(() => {
    fetchEmpProfessionalData();
  }, []);

  const [isEdit, setIsEdit] = useState(false)


  const handleSubmit = async (values) => {
    try {
      const data = await submitEmployeeProffesionalData(values);
      GetEmployeeProfessionalData()
      toast.success(data);
      setIsEdit(false)
      console.log("Data submitted successfully:", data);
    } catch (error) {
      console.error("Error uploading data", error);
      toast.error("Error uploading data");
    }
  };

  return (
    <div>
      <div>
        <Formik
          initialValues={{
            branch: empProfessional ? empProfessional.branch : "",
            join_date: empProfessional
              ? dayjs(empProfessional.date_of_birth).format("YYYY-MM-DD")
              : "",
            role: empProfessional ? empProfessional.role : "",
            designation: empProfessional ? empProfessional.designation : "",
            department: empProfessional ? empProfessional.department : "",
            report_manager: empProfessional ? empProfessional.reporting_manager : "",
            language: empProfessional ? empProfessional.language : "",
            qualification: empProfessional ? empProfessional.qualification : "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmit(values)
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
            dirty
          }) => (
            <Form onSubmit={handleSubmit}>
              <div>
                <div className="gap-[1vw] grid grid-cols-2">
                  <div className="col-span-1">
                    <label className="text-[#1F4B7F] text-[1vw] font-bold ">
                      Joining Date
                      <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <div className='relative'>
                      <Field
                        type="date"
                        name="join_date"
                        placeholder="Select Joining Date"
                        value={values.join_date}
                        onChange={(e) => {
                          handleChange(e);
                          sessionStorage.setItem("dob", e.target.value);
                        }}
                        className={`border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                        disabled={isEdit === false}
                      />
                      {/* <MdOutlineModeEditOutline
                        color='#1F487C'
                        className='absolute top-[0.75vw] right-[1vw]'
                        size='1.5vw' /> */}
                      <ErrorMessage
                        name="join_date"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.5vw] left-[.2vw]"
                      />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label className="text-[#1F4B7F] text-[1vw] font-bold ">
                      Role Type
                      <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <div className='relative'>
                      <Field
                        as="select"
                        name="role"
                        value={values.role}
                        className={`border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                        disabled={isEdit === false}
                      >
                        <option label="Select Role" value="" className="" />
                        <option label="Manager" value="Manager" className="" />
                      </Field>
                      {/* <MdOutlineModeEditOutline
                        color='#1F487C'
                        className='absolute top-[0.75vw] right-[2vw]'
                        size='1.5vw' /> */}
                      <ErrorMessage
                        name="role"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.5vw] left-[.2vw]"
                      />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label className="text-[#1F4B7F] text-[1vw] font-bold ">
                      Designation
                      <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <div className='relative'>
                      <Field
                        type="text"
                        name="designation"
                        placeholder="Enter Last Name"
                        // value={values.firstname}
                        className={`border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                        disabled={isEdit === false}
                      />
                      {/* <MdOutlineModeEditOutline
                        color='#1F487C'
                        className='absolute top-[0.75vw] right-[1vw]'
                        size='1.5vw' /> */}
                      <ErrorMessage
                        name="designation"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.5vw] left-[.2vw]"
                      />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label className="text-[#1F4B7F] text-[1vw] font-bold ">
                      Department
                      <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <div className='relative'>
                      <Field
                        type="text"
                        name="department"
                        placeholder="Enter Department"
                        value={values.department}
                        className={`border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                        disabled={isEdit === false}
                      />
                      {/* <MdOutlineModeEditOutline
                        color='#1F487C'
                        className='absolute top-[0.75vw] right-[1vw]'
                        size='1.5vw' /> */}
                      <ErrorMessage
                        name="department"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.5vw] left-[.2vw]"
                      />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label className="text-[#1F4B7F] text-[1vw] font-bold ">
                      Reporting Manager
                      <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <div className='relative'>
                      <Field
                        type="text"
                        name="report_manager"
                        placeholder="Enter Name"
                        value={values.report_manager}
                        className={`border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                        disabled={isEdit === false}
                      />
                      {/* <MdOutlineModeEditOutline
                        color='#1F487C'
                        className='absolute top-[0.75vw] right-[1vw]'
                        size='1.5vw' /> */}
                      <ErrorMessage
                        name="report_manager"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.5vw] left-[.2vw]"
                      />
                    </div>
                  </div>
                  <div className="col-span-1 relative ">
                    <label className="text-[#1F4B7F] text-[1vw] font-bold ">
                      Branch
                      <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <div className='relative'>
                      <Field
                        as="select"
                        name="branch"
                        value={values.branch}
                        onChange={(e) => {
                          handleChange(e);
                          sessionStorage.setItem("branch", e.target.value);
                        }}
                        className={`border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                        disabled={isEdit === false}
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
                      {/* <MdOutlineModeEditOutline
                        color='#1F487C'
                        className='absolute top-[0.75vw] right-[2vw]'
                        size='1.5vw' /> */}
                      <ErrorMessage
                        name="branch"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.5vw] left-[.2vw]"
                      />
                    </div>
                  </div>
                  <div className="col-span-1 relative">
                    <label className="text-[#1F4B7F] text-[1vw] font-bold ">
                      Qualification
                      <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <div className='relative'>
                      <Field
                        type="text"
                        name="qualification"
                        placeholder="Qualification"
                        value={values.qualification}
                        className={`border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                        disabled={isEdit === false}
                      />
                      {/* <MdOutlineModeEditOutline
                        color='#1F487C'
                        className='absolute top-[0.75vw] right-[1vw]'
                        size='1.5vw' /> */}
                      <ErrorMessage
                        name="qualification"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.5vw] left-[.2vw]"
                      />
                    </div>
                  </div>
                  <div className="col-span-1 relative">
                    <label className="text-[#1F4B7F] text-[1vw] font-bold ">
                      Language
                      <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <div className='relative'>
                      <Field
                        type="text"
                        name="language"
                        placeholder="Language"
                        value={values.language}
                        className={`border-r-[0.2vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-[#1F487C] border-[#1F487C] text-[#1F487C] text-[0.9vw] h-[3vw] w-[100%] rounded-xl outline-none ${isEdit === false ? 'cursor-not-allowed' : ''}`}
                        disabled={isEdit === false}
                      />
                      {/* <MdOutlineModeEditOutline
                        color='#1F487C'
                        className='absolute top-[0.75vw] right-[1vw]'
                        size='1.5vw' /> */}
                      <ErrorMessage
                        name="language"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.5vw] left-[.2vw]"
                      />
                    </div>
                  </div>
                </div>
                <div className='flex items-center justify-center pt-[2vw] pb-[0.5vw]'>
                  {isEdit === false ?
                    <div
                      onClick={() => setIsEdit(true)}
                      className="cursor-pointer text-white bg-[#1F4B7F] px-[2vw] gap-[0.5vw] py-[0.5vw] rounded-[0.7vw] w-[12vw] text-center"
                    >
                      Edit
                    </div>
                    :
                    <button
                      type="submit"
                      className="text-white bg-[#1F4B7F] px-[2vw] gap-[0.5vw] py-[0.5vw] rounded-[0.7vw] w-[12vw]"
                    >
                      Submit
                    </button>
                  }
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default ProfessionalDetails