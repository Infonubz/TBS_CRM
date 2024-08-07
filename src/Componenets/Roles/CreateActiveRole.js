import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { LiaSaveSolid } from "react-icons/lia";
import axios from "axios";
import { toast } from "react-toastify";
import { MultiSelect } from "react-multi-select-component";
import { useDispatch, useSelector } from "react-redux";
import "../../App.css";
import { GET_ROLES } from "../../Store/Type";
import {
  GetRoleById,
  GetRolesData,
  SubmitRolesData,
} from "../../Api/Role&Responsibilites/ActiveRoles";
import { capitalizeFirstLetter } from "../Common/Captilization";

export default function CreateActiveRole({
  setIsModalOpen,
  updatedata,
  roledata,
  setRoleData,
  SetUpdateData,
}) {
  const validationSchema = Yup.object().shape({
    user: Yup.string().required("User is required"),
    role_type: Yup.string().required("Role type is required"),
    description: Yup.string().required("Description is required"),
  });

  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    console.log(values, "valuesvalues");
    try {
      const data = await SubmitRolesData(values, updatedata, dispatch);
      setIsModalOpen(false);
      toast.success(data?.message);
      GetRolesData(dispatch);
      console.log(data);
    } catch (error) {
      console.error("Error uploading data", error);
    }
  };

  const fetchGetRoles = async () => {
    try {
      const data = await GetRoleById(updatedata, SetUpdateData, setRoleData);
      console.log(updatedata,"data data data")
      setRoleData(data);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  useEffect(() => {
    if (updatedata != null) {
      fetchGetRoles();
    }
  }, [updatedata, SetUpdateData, setRoleData]);

  const options = [
    { label: "View", value: "view" },
    { label: "Create", value: "create" },
    { label: "Update", value: "update" },
    { label: "Delete", value: "delete" },
  ];

  return (
    <Formik
      initialValues={{
        user: roledata?.user || "",
        role_type: roledata?.role_type || "",
        description: roledata?.description || "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        dispatch({
          type: GET_ROLES,
          payload: values,
        });
        handleSubmit(values);
        setSubmitting(false);
        resetForm();
      }}
      enableReinitialize
    >
      {({ setFieldValue, values, handleChange }) => (
        <Form>
          <div className="Add-Section text-[#1f487c]">
            <div className="tline flex justify-between mb-8 mt-[0.1vw]">
              <div className="text-[1.4vw] text-[#1F4B7F] font-semibold">
                ACTIVE ROLES
              </div>
              <div className="w-1/2 pl-4 flex items-end mr-[0.2vw] justify-around">
                <button
                  type="submit"
                  className="bg-[#1f487c] h-[2.2vw] w-[6vw] text-white rounded-lg focus:border-[#78ccfc] focus:outline-none focus:border-2"
                >
                  <div className="flex justify-center">
                    <LiaSaveSolid size={"1.4vw"} />
                    <div className="pl-[0.5vw] text-[1vw]">Save</div>
                  </div>
                </button>
              </div>
            </div>
            <div className="fline grid grid-cols-2 gap-x-[2vw] gap-y-[1vw] justify-between mb-4">
              <div>
                <label
                  htmlFor="role"
                  className="text-[#1F4B7F] text-[1.1vw] font-semibold"
                >
                  User
                </label>
                <Field
                  as="select"
                  id="user"
                  name="user"
                  value={capitalizeFirstLetter(values.user)}
                  onChange={(e) => {
                    handleChange(e);
                    localStorage.setItem("user", e.target.value);
                  }}
                  className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C]
                  text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                >
                  <option label="Select User" value="" className="" />
                  <option label="Operator" value="Operator">
                    Operator
                  </option>
                  <option label="Employee" value="Employee">
                    Employee
                  </option>
                </Field>
                <ErrorMessage
                  name="user"
                  component="div"
                  className="text-red-500 text-[0.8vw]"
                />
              </div>
              <div>
                <label
                  htmlFor="role_type"
                  className="text-[#1F4B7F] text-[1.1vw] font-semibold"
                >
                  Role Type
                </label>
                <Field
                  id="role_type"
                  name="role_type"
                  type="text"
                  className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C]
                   text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                />
                <ErrorMessage
                  name="role_type"
                  component="div"
                  className="text-red-500 text-[0.8vw]"
                />
              </div>
            </div>
            <div>
              <label
                name="description"
                className="text-[#1F4B7F] text-[1.1vw] font-semibold"
              >
                Description
              </label>
              <Field
                as="textarea"
                name="description"
                placeholder="Description"
                rows="3"
                cols="50"
                className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C]
                   text-[#1F487C] text-[1.2vw] h-[4vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-[0.8vw]"
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
