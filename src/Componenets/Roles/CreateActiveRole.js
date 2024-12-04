import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
//import { ConfigProvider, Select } from "antd";
import * as Yup from "yup";
import { LiaSaveSolid } from "react-icons/lia";
//import axios from "axios";
import { toast } from "react-toastify";
//import { MultiSelect } from "react-multi-select-component";
import {
  useDispatch,
  // useSelector
} from "react-redux";
import "../../App.css";
//import { GET_ROLES } from "../../Store/Type";
//import { BiSolidDownArrow } from "react-icons/bi";
//import { IoMdArrowDropdown } from "react-icons/io";
import {
  GetRoleById,
  GetRolesData,
  SubmitRolesData,
} from "../../Api/Role&Responsibilites/ActiveRoles";
//import { capitalizeFirstLetter } from "../Common/Captilization";

export default function CreateActiveRole({
  setIsModalOpen,
  updatedata,
  roledata,
  setRoleData,
  SetUpdateData,
  filter,
}) {
  const validationSchema = Yup.object().shape({
    //user: Yup.string().required("User is required"),
    role_type: Yup.string().required("Role type is required"),
    description: Yup.string().required("Description is required"),
  });
  //const [selectedPermissions, setSelectedPermissions] = useState([]);
  const dispatch = useDispatch();
  const [userlist, setUserlist] = useState({
    user: "",
  });
  const type_id = sessionStorage.getItem("type_id");
  // const options = [
  //   { label: "View", value: "view" },
  //   { label: "Create", value: "create" },
  //   { label: "Update", value: "update" },
  //   { label: "Delete", value: "delete" },
  // ];

  const handleSubmit = async (values, { setFieldError }) => {
    try {
      const data = await SubmitRolesData(filter, values, updatedata, dispatch);
      setIsModalOpen(false);
      toast.success(data?.message);
      GetRolesData(filter, dispatch);
    } catch (error) {
      if (error.message.includes("Role already exists")) {
        setFieldError("role_type", "This role already exists.");
      } else {
        setFieldError("role_type", "");
      }
    }
  };

  const fetchGetRoles = async () => {
    try {
      const data = await GetRoleById(updatedata, SetUpdateData, setRoleData);
      console.log(updatedata, "data data data");
      setRoleData(data);
      setUserlist((prevState) => ({
        ...prevState,
        user: data.user,
      }));
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  useEffect(() => {
    const selectedUser =
      filter === "OP" && type_id === "PRO101"
        ? "Operator"
        : filter === "PO" && type_id === "PRO101"
        ? "Employee"
        : type_id === "OP101"
        ? "Operator"
        : "";
    setUserlist((prevState) => ({
      ...prevState,
      user: selectedUser,
    }));
    //fetchRoleTypes(selectedUser);
  }, [
    filter,
    type_id,
    //fetchRoleTypes
  ]);

  useEffect(() => {
    if (updatedata != null) {
      fetchGetRoles();
    }
  }, [updatedata, SetUpdateData, setRoleData]);

  return (
    <Formik
      initialValues={{
        user: roledata?.user || userlist?.user,
        role_type: roledata?.role_type || "",
        description: roledata?.description || "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, setFieldError }) => {
        handleSubmit(values, { setFieldError }); // Pass setFieldError here
        setSubmitting(false);
      }}
      enableReinitialize
    >
      {({ setFieldValue, errors, touched, values, handleChange }) => (
        <Form>
          <div className="Add-Section text-[#1f487c]">
            <div className="tline flex justify-between mb-[2vw]">
              <div className="text-[1.35vw] text-[#1F4B7F] font-bold mt-[0.25vw]">
                {updatedata ? "UPDATE ROLES" : " CREATE NEW ROLES"}
              </div>
              <div className="w-1/2 pl-[4vw] flex items-end justify-around mt-[0.16vw]">
                <button
                  type="submit"
                  className="bg-[#1f487c] h-[2.2vw] w-[6vw] ml-[4.5vw] text-white rounded-[0.75vw] focus:border-[#78ccfc] focus:outline-none focus:border-2"
                >
                  <div className="flex justify-center">
                    <LiaSaveSolid size={"1.4vw"} />
                    <div className="pl-[0.5vw] text-[1vw]">Save</div>
                  </div>
                </button>
              </div>
            </div>
            <div className="fline grid grid-cols-2 gap-x-[2vw] gap-y-[1vw] justify-between mb-4">
              {/* <div> */}
              {/* <div className="flex gap-x-[0.2vw] items-center">
                  <label
                    htmlFor="role"
                    className="text-[#1F4B7F] text-[1.1vw] font-semibold"
                  >
                    User
                  </label>
                  <label className="text-[1vw] text-red-500">*</label>
                </div> */}
              {/* <div className="relative">
                  <Field
                    as="select"
                    id="user"
                    name="user"
                    onChange={(e) => handleChange(e)}
                    className="appearance-none border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw]
               border-t-[0.1vw] border-b-[0.3vw] placeholder-blue
               border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[2.90vw] w-[100%]
               rounded-[0.9vw] outline-none px-[1vw]"
                  >
                    <option label="Select User" value="" />
                    <option label="Operator Employee" value="Operator Employee">
                      Operator Employee
                    </option>
                    <option
                      label="Product Owner Employee"
                      value="Product Owner Employee"
                    >
                      Product Owner Employee
                    </option>
                  </Field>
                  <span className="pointer-events-none absolute inset-y-1 right-[1vw] flex items-center pr-[0.4vw] pt-[0.3vw]">
                    <BiSolidDownArrow color="#1F487C" />
                  </span>
                </div> */}
              {/* <ConfigProvider
                  theme={{
                    components: {
                      Select: {
                        optionActiveBg: "#aebed1",
                        optionSelectedColor: "#FFF",
                        optionSelectedBg: "#aebed1",
                        optionHeight: "2",
                      },
                    },
                  }}
                >
                  <Select
                    showSearch
                    className="custom-select bg-white outline-none w-full mt-[0.5vw] h-[3vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-xl 
                    border-r-[0.2vw] border-b-[0.2vw] placeholder-[#1F487C]"
                    placeholder="Select User"
                    optionFilterProp="label"
                    value={
                      filter === "OP" && type_id === "PRO101"
                        ? "operator"
                        : filter === "PO" && type_id === "PRO101"
                        ? "employee"
                        : userlist.user
                    }
                    disabled={type_id}
                    onChange={(value, option) => {
                      setUserlist({
                        ...userlist,
                        user: value,
                      });
                      setFieldValue("user", value);
                    }}
                    suffixIcon={
                      <span style={{ fontSize: "1vw", color: "#1f487c" }}>
                        <IoMdArrowDropdown size="2vw" />
                      </span>
                    }
                    style={{
                      padding: 4,
                    }}
                    options={[
                      {
                        value: "",
                        label: (
                          <div className="text-[1vw] font-semibold px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                            Select User
                          </div>
                        ),
                        disabled: true,
                      },
                      {
                        value: "operator",
                        label: (
                          <div className="text-[1vw] font-semibold px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                            Operator Employee
                          </div>
                        ),
                      },
                      {
                        value: "employee",
                        label: (
                          <div className="text-[1vw] font-semibold px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                            Product Owner Employee
                          </div>
                        ),
                      },
                    ]}
                  />
                </ConfigProvider>

                <ErrorMessage
                  name="user"
                  component="div"
                  className="text-red-500 text-[0.8vw]"
                />
              </div> */}
              <div>
                <div className="flex gap-x-[0.2vw] items-center">
                  <label
                    htmlFor="role"
                    className="text-[#1F4B7F] text-[1.2vw] font-semibold"
                  >
                    Role Type
                  </label>
                  <label className="text-[1vw] text-red-500">*</label>
                </div>
                <Field
                  placeholder="Enter Role type"
                  id="role_type"
                  name="role_type"
                  type="text"
                  className="border-r-[0.2vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                />
                <ErrorMessage
                  name="role_type"
                  component="div"
                  className="text-red-500 text-[0.8vw]"
                />
              </div>
              <div>
                <div className="flex items-center gap-x-[0.2vw]">
                  <label
                    name="description"
                    className="text-[#1F4B7F] text-[1.2vw] font-semibold"
                  >
                    Description
                  </label>
                  <label className="text-[1vw] text-red-500">*</label>
                </div>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Enter Description"
                  rows="3"
                  cols="50"
                  style={{ resize: "none", lineHeight: "2.6vw" }} 
                  className="border-r-[0.2vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                />

                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-[0.8vw]"
                />
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
