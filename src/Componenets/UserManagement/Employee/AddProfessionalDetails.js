import { ConfigProvider, Progress, Select, Spin } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import * as Yup from "yup";
import dayjs from "dayjs";
import {
  GetEmployeeRoles,
  GetEmpProffesionalById,
  GetProductOwnerEmployee,
  submitEmployeeProffesionalData,
} from "../../../Api/UserManagement/Employee";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import umbuslogo from "../../../asserts/umbuslogo.png"
import { GetRolesData } from "../../../Api/Role&Responsibilites/ActiveRoles";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const validationSchema = Yup.object().shape({
  // emailid: Yup.string()
  //   .matches(
  //     /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  //     "Invalid email address format"
  //   )
  //   .required("Email is required"),
  designation: Yup.string()
    .required("Designation is required")
    .matches(/^[A-Za-z\s]+$/, "contains only letters and spaces")
    .min(2,"Minimum 2 characters long")
    .max(50,"Maximum 50 characters only"),
  department: Yup.string()
    .required("Department is required")
    .matches(/^[A-Za-z\s]+$/, "contains only letters and spaces")
    .min(2,"Minimum 2 characters long")
    .max(50,"Maximum 50 characters only"),
  role: Yup.string().required("Role is required"),
  report_manager: Yup.string()
    .required("Manager Name is required")
    .matches(/^[A-Za-z\s]+$/, "contains only letters and spaces")
    .min(3,"Minimum 3 characters long")
    .max(50,"Maximum 50 characters only"),
  // experiance: Yup.string()
  //   .matches(/^[0-9]+$/, "Experiance must be a number")
  //   // .min(5, "Experiance must be at least 10 digits")
  //   // .max(10, "Experiance maximum 10 digits only")
  //   .required("Experiance is required"),
  branch: Yup.string().required("Branch is required")
  .min(3,"Minimum 3 characters long")
  .max(50,"Maximum 50 characters only"),
  join_date: Yup.date().required("Joining Date Required")
  .min(new Date().toISOString().split('T')[0], "Joining date cannot be in the past")
  .max(
    new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
    "Joining date must be within 3 months"
  ),
  language: Yup.string()
    .required("Language is required")
    .min(3,"Minimum 3 characters long")
    .matches(/^[A-Za-z\s]+$/, "contains only letters and spaces").max(50,"Maximum 50 characters only"),
  qualification: Yup.string()
    .required("Qualification is required")
    // .matches(/^[A-Za-z\s]+$/, "contains only letters and spaces")
    // .min(3,"Minimum 3 characters long")
    // .max(50,"Maximum 50 characters only"),
});

export default function AddProfessionalDetails({
  setCurrentpage,
  EmployeeID,
  setEmployeeID,
  setProffesionalBack,
  proffesionaback,
  documentback,
  updatedata
}) {
  const [enable, setEnable] = useState(false);
    const [spinning, setSpinning] = useState(false);
  const [currentRoleId,setCurrentRoleId] = useState("")
  const dispatch = useDispatch();

  console.log(EmployeeID, enable, documentback ,"checkvaluesvaluessodif");
  
  const handleSubmit = async (values) => {
    console.log("Form values on submit:", values); // Log form values
    if (EmployeeID && enable == false && documentback == true || updatedata && empproffesionaldata.designation !=null && enable == false) {
      console.log("Existing EmployeeID, setting current page to 3");
      setCurrentpage(4);
    }
    //  else if (EmployeeID) {
    //   try {
    //     console.log("No EmployeeID, submitting data");
    //     const data = await submitEmployeeProffesionalData(
    //       values,
    //       EmployeeID,
    //       dispatch
    //     );
    //     toast.success(data);
    //     setCurrentpage(4);

    //     console.log("Data submitted successfully:", data);
    //   } catch (error) {
    //     console.error("Error uploading data", error);
    //     toast.error("Error uploading data");
    //   }
    // }
     else {
      try {
        console.log("No EmployeeID, submitting data");
        const data = await submitEmployeeProffesionalData(
          values,
          EmployeeID,
          currentRoleId,
          setCurrentRoleId,
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
        setEmpProffesionalData,
        setSpinning
      );
      setEmpProffesionalData(data);
      setCurrentRoleId(data.role_type_id)
      console.log("Fetched user data:", data);
    } catch (error) {
      console.error("Error fetching additional user data", error);
      toast.error("Error fetching user data");
    }
  };

  useEffect(() => {
    if (EmployeeID != null || documentback) {
      fetchGetUser();
      setSpinning(true)
    }
  }, [EmployeeID, documentback]);

  console.log(empproffesionaldata, "empproffesionaldata");

  const [roledata, setRoleData] = useState([]);

  const GetRoles = async () => {
    try {
      const data = await GetEmployeeRoles();
      setRoleData(data);
      console.log(data,"emproles");
      
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };
  const defaultRolesData = {
    value: '',
    label: (
      <div className="text-[1vw] px-[0.2vw] pb-[0.1vw] text-gray-400">
        Select Role
      </div>
    ),
    disabled: true,
  };
  const getEmpRoles = roledata?.map((value) =>({
    value: value.role_type,
    label: (
      <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
        {value.role_type}
      </div>
    ),
    id:value.role_id

  }))

  const RolesOptions = [defaultRolesData,...getEmpRoles]

  const Qualificationval = [
    { value: "Primary School Certificate", label: "Primary School Certificate" },
    { value: "Secondary School Certificate (SSC)", label: "Secondary School Certificate (SSC)" },
    { value: "High School Certificate (HSC)", label: "High School Certificate (HSC)" },
    { value: "Bachelor of Arts (BA)", label: "Bachelor of Arts (BA)" },
    { value: "Bachelor of Science (BSc)", label: "Bachelor of Science (BSc)" },
    { value: "Bachelor of Commerce (BCom)", label: "Bachelor of Commerce (BCom)" },
    { value: "Bachelor of Engineering (BE)", label: "Bachelor of Engineering (BE)" },
    { value: "Bachelor of Technology (BTech)", label: "Bachelor of Technology (BTech)" },
    { value: "Bachelor of Business Administration (BBA)", label: "Bachelor of Business Administration (BBA)" },
    { value: "Bachelor of Computer Applications (BCA)", label: "Bachelor of Computer Applications (BCA)" },
    { value: "Bachelor of Fine Arts (BFA)", label: "Bachelor of Fine Arts (BFA)" },
    { value: "Bachelor of Architecture (BArch)", label: "Bachelor of Architecture (BArch)" },
    { value: "Bachelor of Education (BEd)", label: "Bachelor of Education (BEd)" },
    { value: "Bachelor of Law (LLB)", label: "Bachelor of Law (LLB)" },
    { value: "Master of Arts (MA)", label: "Master of Arts (MA)" },
    { value: "Master of Science (MSc)", label: "Master of Science (MSc)" },
    { value: "Master of Commerce (MCom)", label: "Master of Commerce (MCom)" },
    { value: "Master of Business Administration (MBA)", label: "Master of Business Administration (MBA)" },
    { value: "Master of Technology (MTech)", label: "Master of Technology (MTech)" },
    { value: "Master of Computer Applications (MCA)", label: "Master of Computer Applications (MCA)" },
    { value: "Master of Fine Arts (MFA)", label: "Master of Fine Arts (MFA)" },
    { value: "Master of Architecture (MArch)", label: "Master of Architecture (MArch)" },
    { value: "Master of Education (MEd)", label: "Master of Education (MEd)" },
    { value: "Master of Law (LLM)", label: "Master of Law (LLM)" },
    { value: "Doctor of Philosophy (PhD)", label: "Doctor of Philosophy (PhD)" },
    { value: "Doctor of Medicine (MD)", label: "Doctor of Medicine (MD)" },
    { value: "Doctor of Education (EdD)", label: "Doctor of Education (EdD)" },
    { value: "Chartered Accountant (CA)", label: "Chartered Accountant (CA)" },
    { value: "Company Secretary (CS)", label: "Company Secretary (CS)" },
    { value: "Cost and Management Accountant (CMA)", label: "Cost and Management Accountant (CMA)" },
    { value: "Bachelor of Medicine, Bachelor of Surgery (MBBS)", label: "Bachelor of Medicine, Bachelor of Surgery (MBBS)" },
    { value: "Bachelor of Dental Surgery (BDS)", label: "Bachelor of Dental Surgery (BDS)" },
    { value: "Bachelor of Pharmacy (BPharm)", label: "Bachelor of Pharmacy (BPharm)" },
    { value: "Master of Pharmacy (MPharm)", label: "Master of Pharmacy (MPharm)" },
    { value: "Diplomate of National Board (DNB)", label: "Diplomate of National Board (DNB)" },
    { value: "Diploma in Engineering", label: "Diploma in Engineering" },
    { value: "Postgraduate Diploma in Management (PGDM)", label: "Postgraduate Diploma in Management (PGDM)" },
    { value: "Certificate in Computer Applications", label: "Certificate in Computer Applications" },
    { value: "Advanced Diploma in Software Engineering", label: "Advanced Diploma in Software Engineering" },
    { value: "Diploma in Nursing", label: "Diploma in Nursing" },
    { value: "Diploma in Education (DEd)", label: "Diploma in Education (DEd)" }
]
// const getQualification = Qualificationval?.map((value,ind) =>({
//   value: value.value,
//   label: (
//     <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
//       {value.label}
//     </div>
//   ),
//   id:ind

// }))

const getQualification = Qualificationval?.map((value, ind) => ({
  value: value.value,
  label: (
    <div
      className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]"
      title={value.label} // This will show full text on hover
      style={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '28ch', // Ensure truncation if text is too long
      }}
    >
      {value.label?.length > 28 ? `${value.label.substring(0, 28)}...` : value.label}
    </div>
  ),
  id: ind,
}));

 const defaultQualification = {
    value: '',
    label: (
      <div className="text-[1vw] px-[0.2vw] pb-[0.1vw] text-gray-400">
        Select Qualification
      </div>
    ),
    disabled: true,
  };

  const qualOption = [defaultQualification,...getQualification]
  


  useEffect(() => {
    GetRoles();
  }, []);

  return (
    <div className="mt-[1.5vw] relative">
        <div className="w-[5vw]  h-[5vw] bg-white shadow-lg rounded-full absolute left-[16.6vw] top-[-2.5vw] flex justify-center items-center z-[1]"><img className="" src={umbuslogo} alt="buslogo"/></div>
      <div className="border-l-[0.1vw] pl-[2vw] pr-[1.5vw]  h-[28vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.1vw] rounded-[1vw] border-[#1f4b7f]">
        <div className="h-[4vw] w-full flex items-center justify-between ">
          <label className="text-[1.5vw] font-semibold text-[#1f4b7f] ">
            Professional Details
          </label> 
          {updatedata && empproffesionaldata.designation !=null ||
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
              role: empproffesionaldata ? empproffesionaldata.role_type : "",
              designation: empproffesionaldata
                ? empproffesionaldata.designation
                : "",
              // emailid: empproffesionaldata
              //   ? empproffesionaldata.official_email_id
              //   : "",
              // experiance: empproffesionaldata
              //   ? empproffesionaldata.years_of_experience
              //   : "",
              department: empproffesionaldata
                ? empproffesionaldata.department
                : "",
              report_manager: empproffesionaldata
                ? empproffesionaldata.reporting_manager
                : "",
              language: empproffesionaldata ? empproffesionaldata.language : "",
              qualification: empproffesionaldata
                ? empproffesionaldata.qualification
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
                 {spinning ? (
                  <div className=" flex justify-center h-[22.8vw] items-center">
                    <Spin size="large" />
                  </div>
                ) : (
                <div className="gap-y-[1.5vw] flex-col flex">
                  <div className="overflow-y-scroll gap-y-[1.5vw] flex-col flex h-[18vw] pb-[1vw] ">
                  <div className="grid grid-cols-2 w-full gap-x-[2vw] pr-[.5vw]">
              
                    <div className="col-span-1 relative">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Designation
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        type="text"
                        name="designation"
                        autoComplete="off"
                        placeholder="Enter Designation"
                        // value={values.firstname}
                        disabled={
                          updatedata && empproffesionaldata.designation !=null || documentback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          updatedata && empproffesionaldata.designation !=null || documentback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      />
                      <ErrorMessage
                        name="designation"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.5vw] left-[.2vw]"
                      />
                    </div>
                    <div className="col-span-1 relative">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Role
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      {/* <Field
                        as="select"
                        name="role"
                        value={values.role}
                        // onChange={(e) => {
                        //   handleChange(e);
                        //   const selectedOption =
                        //     e.target.options[e.target.selectedIndex];
                        //   const value = selectedOption.value;
                        //   const label = selectedOption.label;
                        //   setFieldValue("role_id", value);
                        //   // setFieldValue("role", label);
                        //   console.log(label, "eeeeeeeeeeeeeeee");
                        // }}
                        disabled={
                          updatedata || documentback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          updatedata || documentback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      >
                        <option label="Select Role" value="" className="" />
                        <option label="Manager" value="Manager" className="" />
                        <option label="Female" value="Female" className="" />
                        <option label="Other" value="Other" className="" />
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
                      </Field> */}
                             <ConfigProvider
                        theme={{
                          components: {
                            Select: {
                              optionActiveBg: '#aebed1',
                              optionSelectedColor: '#FFF',
                              optionSelectedBg: '#e5e5e5',
                              optionHeight: '2',
                            },
                          },
                        }}
                      >
                        <Select
                          showSearch
                          value={values.role || ""}
                          placement="topRight"
                          listHeight={190}
                          onChange={(value,id) => {
                            handleChange({ target: { name: 'role', value } })
                            console.log(id.id,"idididisdfsdf");
                            setCurrentRoleId(id.id)
                            
                          }}
                          disabled={
                            updatedata && empproffesionaldata.designation !=null || documentback
                              ? enable
                                ? false
                                : true
                              : false
                          }
                          name="role"
                          className={`${updatedata && empproffesionaldata.designation !=null || documentback
                            ? enable == false
                              ? " cursor-not-allowed bg-[#FAFAFA]"
                              : ""
                            : ""
                            } custom-select bg-white border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                          // className="custom-select bg-white outline-none w-full mt-[0.5vw] h-[3vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-xl border-r-[0.2vw] border-b-[0.2vw] placeholder-[#1F487C]"
                          placeholder="Select role"
                          filterOption={(input, option) => 
                            option?.value?.toLowerCase()?.includes(input.toLowerCase()) // Make it case-insensitive
                          }
                          optionFilterProp="value"
                          suffixIcon={<span style={{ fontSize: '1vw', color: '#1f487c' }}>
                            <IoMdArrowDropup size="2vw" />
                          </span>}
                          style={{ padding: 4 }}
                          options={RolesOptions}
                             
                        />
                      </ConfigProvider>
                      <ErrorMessage
                        name="role"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.5vw] left-[.2vw]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full umselect gap-x-[2vw] pr-[.5vw]">
                  <div className="col-span-1 relative">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Department
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        type="text"
                        name="department"
                        autoComplete="off"
                        placeholder="Enter Department"
                        value={values.department}
                        disabled={
                          updatedata && empproffesionaldata.designation !=null || documentback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          updatedata && empproffesionaldata.designation !=null || documentback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      />
                      <ErrorMessage
                        name="department"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.5vw] left-[.2vw]"
                      />
                    </div>
                    <div className="col-span-1 relative ">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Branch
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      {/* <Field
                        as="select"
                        name="branch"
                        value={values.branch}
                        onChange={(e) => {
                          handleChange(e);
                          sessionStorage.setItem("branch", e.target.value);
                        }}
                        disabled={
                          updatedata || documentback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          updatedata || documentback
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
                      </Field> */}
                      <Field
                        type="text"
                        name="branch"
                        autoComplete="off"
                        placeholder="Enter Branch"
                        value={values.branch}
                        disabled={
                          updatedata && empproffesionaldata.designation !=null || documentback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          updatedata && empproffesionaldata.designation !=null || documentback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      />
                      <ErrorMessage
                        name="branch"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.5vw] left-[.2vw]"
                      />
                    </div>
                    {/* <div className="col-span-1">
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
                    </div> */}
                  </div>
                  <div className="grid grid-cols-2 w-full gap-x-[2vw] pr-[.5vw]">
                    {/* <div className="col-span-1">
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
                    </div> */}
                       <div className="col-span-1 relative">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Joining Date
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        type="date"
                        name="join_date"
                        autoComplete="off"
                        placeholder="Select Joining Date"
                        value={values.join_date}
                        onChange={(e) => {
                          handleChange(e);
                          sessionStorage.setItem("dob", e.target.value);
                        }}
                        disabled={
                          updatedata && empproffesionaldata.designation !=null || documentback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          updatedata && empproffesionaldata.designation !=null || documentback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      />
                      <ErrorMessage
                        name="join_date"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.5vw] left-[.2vw]"
                      />
                    </div>
                    <div className="col-span-1 relative">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Reporting Manager
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        type="text"
                        name="report_manager"
                        autoComplete="off"
                        placeholder="Enter Manager Name"
                        value={values.report_manager}
                        disabled={
                          updatedata && empproffesionaldata.designation !=null || documentback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          updatedata && empproffesionaldata.designation !=null || documentback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      />
                      <ErrorMessage
                        name="report_manager"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.5vw] left-[.2vw]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full gap-x-[2vw] pr-[.5vw]">
                    <div className="col-span-1 relative">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Qualification
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      {/* <Field
                        type="text"
                        name="qualification"
                        autoComplete="off"
                        placeholder="Qualification"
                        value={values.qualification}
                        disabled={
                          updatedata && empproffesionaldata.designation !=null || documentback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          updatedata && empproffesionaldata.designation !=null || documentback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      /> */}
                              <ConfigProvider
                        theme={{
                          components: {
                            Select: {
                              optionActiveBg: '#aebed1',
                              optionSelectedColor: '#FFF',
                              optionSelectedBg: '#e5e5e5',
                              optionHeight: '2',
                            },
                          },
                        }}
                      >
                        <Select
                          showSearch
                          value={values.qualification || ""}
                          placement="topRight"
                          listHeight={190}
                          onChange={(value,id) => {
                            handleChange({ target: { name: 'qualification', value } })
                            console.log(id.id,"idididisdfsdf");
                            setCurrentRoleId(id.id)
                            
                          }}
                          disabled={
                            updatedata && empproffesionaldata.designation !=null || documentback
                              ? enable
                                ? false
                                : true
                              : false
                          }
                          name="role"
                          className={`${updatedata && empproffesionaldata.designation !=null || documentback
                            ? enable == false
                              ? " cursor-not-allowed bg-[#FAFAFA]"
                              : ""
                            : ""
                            } custom-select bg-white border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                          // className="custom-select bg-white outline-none w-full mt-[0.5vw] h-[3vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-xl border-r-[0.2vw] border-b-[0.2vw] placeholder-[#1F487C]"
                          placeholder="Select role"
                          filterOption={(input, option) => 
                            option?.value?.toLowerCase()?.includes(input.toLowerCase()) // Make it case-insensitive
                          }
                          optionFilterProp="value"
                          suffixIcon={<span style={{ fontSize: '1vw', color: '#1f487c' }}>
                            <IoMdArrowDropup size="2vw" />
                          </span>}
                          style={{ padding: 4 }}
                          options={qualOption}
                             
                        />
                      </ConfigProvider>
                      <ErrorMessage
                        name="qualification"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.5vw] left-[.2vw]"
                      />
                    </div>
                    <div className="col-span-1 relative">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Language
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        type="text"
                        name="language"
                        autoComplete="off"
                        placeholder="Language"
                        value={values.language}
                        disabled={
                          updatedata && empproffesionaldata.designation !=null || documentback
                            ? enable
                              ? false
                              : true
                            : false
                        }
                        className={`${
                          updatedata && empproffesionaldata.designation !=null || documentback
                            ? enable == false
                              ? " cursor-not-allowed"
                              : ""
                            : ""
                        } border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                      />
                      <ErrorMessage
                        name="language"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute bottom-[-1.5vw] left-[.2vw]"
                      />
                    </div>
                  </div>
                  </div>
                  <div className="flex items-center justify-between ">
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
                        {updatedata && empproffesionaldata.designation !=null || documentback
                          ? enable
                            ? "Update & Continue"
                            : "Continue"
                          : "Continue"}
                      </button>
                    </div>
                  </div>
                </div>)}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
