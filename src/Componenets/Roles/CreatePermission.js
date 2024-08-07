import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Checkbox } from "antd";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { MultiSelect } from "react-multi-select-component";
import { LiaSave } from "react-icons/lia";
import "../../App.css";
import { GET_PERMISSIONS } from "../../Store/Type";
import {
  GetPermissionById,
  GetPermissionData,
  SubmitPermissionData,
} from "../../Api/Role&Responsibilites/ActivePermission";
import { useDispatch, useSelector } from "react-redux";
import { capitalizeFirstLetter } from "../Common/Captilization";

export default function CreatePermission({
  setIsPermissionModalOpen,
  permissionupdate,
  SetPermissionUpdate,
  SetPermissionData,
  permissionData,
}) {
  const validationSchema = Yup.object().shape({
    role_type: Yup.string()
      .min(1, "Role Type must be greater than 1 character")
      .max(50, "Role Type should not be greater than 50 characters")
      .required("Role Type is required"),
  });

  const [selectedCrudPermissions, setSelectedCrudPermissions] = useState([]);
  const [selectedModulePermissions, setSelectedModulePermissions] = useState(
    []
  );
  const [roleNames, setRoleNames] = useState([]);
  const [role_type_id, setRoleId] = useState("");
  const [viewMode, setViewMode] = useState("Product Owner");
  //const [viewMode, setViewMode] = useState("Operator");
  const [user, setUser] = useState("");
  const [showModulePermissions, setShowModulePermissions] = useState(true); // State to control visibility

  const getroleName = useSelector((state) => state.crm.role_name_list);
  const dispatch = useDispatch();

  const modulePermissionsData = [
    { module_id: 1, module_name: "User Management" },
    { module_id: 2, module_name: "Request Management" },
    { module_id: 3, module_name: "Offers & Deals" },
    { module_id: 4, module_name: "Advertisement" },
    { module_id: 5, module_name: "Promotions" },
    { module_id: 6, module_name: "Roles" },
    { module_id: 7, module_name: "Report" },
    { module_id: 8, module_name: "Subscription" },
  ];

  const permissionIdMap = {
    "User Management": 1,
    "Request Management": 2,
    "Offers & Deals": 3,
    Advertisement: 4,
    Promotions: 5,
    Roles: 6,
    Report: 7,
    Subscription: 8,
  };

  const handleSubmit = async (values) => {
    try {
      const modulePermissions = values.module_permissions.map((permission) => ({
        module_id: permissionIdMap[permission.module_name],
        module_name: permission.module_name,
      }));

      const data = await SubmitPermissionData(
        { ...values, module_permissions: modulePermissions },
        permissionupdate,
        dispatch,
        role_type_id
      );
      setIsPermissionModalOpen(false);
      toast.success(data?.message);
      GetPermissionData(dispatch);
    } catch (error) {
      console.error("Error uploading data", error);
    }
  };

  const fetchGetPermission = async () => {
    try {
      const data = await GetPermissionById(
        permissionupdate,
        SetPermissionUpdate,
        SetPermissionData,
        role_type_id
      );

      if (data && data.crud_permissions && data.module_permissions) {
        SetPermissionData(data);
        setSelectedCrudPermissions(
          data.crud_permissions.map((permission) => ({
            label: permission,
            value: permission,
          }))
        );

        const mappedModulePermissions = data.module_permissions.map(
          (permission) => ({
            module_id: permissionIdMap[permission.module_name],
            module_name: permission.module_name,
          })
        );

        setSelectedModulePermissions(mappedModulePermissions);

        // Check if user is Operator and hide module permissions
        if (data.user !== "employee") {
          setShowModulePermissions(true);
        } else {
          setShowModulePermissions(true);
        }

        setShowModulePermissions(true); // Show module permissions by default
      } else {
        console.error(
          "Error: Data returned from GetPermissionById is invalid or missing properties"
        );
      }
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  useEffect(() => {
    if (permissionupdate != null) {
      fetchGetPermission();
    }
  }, [permissionupdate, SetPermissionUpdate, SetPermissionData]);

  const crudPermissionOptions = [
    { label: "View", value: "view" },
    { label: "Create", value: "create" },
    { label: "Update", value: "update" },
    { label: "Delete", value: "delete" },
  ];

  const modulePermissionOptions = modulePermissionsData.map((module) => ({
    label: module.module_name,
    value: module.module_name,
  }));
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchRoleTypes = async (selectedUser) => {
    console.log(selectedUser, "selectedUser");
    try {
      const userToFetch =
        selectedUser == "Employee" ? "EMP101" : "OP101" || selectedUser;
      const response = await axios.post(`${apiUrl}/permissions/userRoles`, {
        user_id: userToFetch,
      });
      setRoleNames(response.data);

      if (viewMode === "Product Owner" && selectedUser === "Operator") {
        setShowModulePermissions(false);
      } else {
        setShowModulePermissions(true);
      }

      if (viewMode === "Operator") {
        setShowModulePermissions(true);
      }
    } catch (error) {
      console.error("Error fetching role names based on user", error);
    }
  };

  useEffect(() => {
    fetchRoleTypes();
  }, []);

  return (
    <Formik
      initialValues={{
        user: permissionData?.user || "",
        role_type: permissionData?.role_type || "",
        crud_permissions: selectedCrudPermissions || [],
        module_permissions: selectedModulePermissions || [],
      }}
      onSubmit={(values, { setSubmitting }) => {
        dispatch({
          type: GET_PERMISSIONS,
          payload: values,
        });
        handleSubmit(values);
        setSubmitting(false);
        fetchRoleTypes(values?.user);
      }}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {({ handleSubmit, values, setFieldValue, handleChange }) => (
        <Form onSubmit={handleSubmit}>
          <div className="flex justify-between mr-[3vw]">
            <div className="text-[1.2vw] text-[#1F4B7F] pt-[0.4vw] font-semibold">
              CREATE NEW PERMISSION
            </div>
            <button
              className="flex bg-[#1F4B7F] mt-[0.3vw] px-[0.6vw] gap-[0.5vw] py-[0.3vw] rounded-[0.6vw] items-center justify-center"
              type="submit"
            >
              <span>
                <LiaSave color="white" size={"1.5vw"} />
              </span>
              <span className="text-white text-[1vw]">Save</span>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-[1vw] pt-[2vw]">
            {viewMode !== "Operator" && (
              <div>
                <label
                  htmlFor="user"
                  className="text-[#1F4B7F] text-[1.1vw] font-semibold"
                >
                  User
                </label>

                {permissionupdate != null ? (
                  <Field
                    as="select"
                    id="user"
                    name="user"
                    value={capitalizeFirstLetter(values.user)}
                    disabled={permissionupdate ? true : false}
                    onChange={(e) => {
                      handleChange(e);
                      const selectedUser = e.target.value;
                      setUser(e.target.value);
                      localStorage.setItem("user", selectedUser);
                      fetchRoleTypes(selectedUser); // Pass selectedUser to fetchRoleTypes
                    }}
                    className="cursor-not-allowed border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C]
                         text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                  >
                    <option label="Select User" value="" />
                    <option label="Operator" value="Operator">
                      Operator
                    </option>
                    <option label="Employee" value="Employee">
                      Employee
                    </option>
                  </Field>
                ) : (
                  <Field
                    as="select"
                    id="user"
                    name="user"
                    value={capitalizeFirstLetter(values.user)}
                    onChange={(e) => {
                      handleChange(e);
                      const selectedUser = e.target.value;
                      setUser(e.target.value);
                      localStorage.setItem("user", selectedUser);
                      fetchRoleTypes(e.target.value); // Pass selectedUser to fetchRoleTypes
                    }}
                    className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C]
                   text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                  >
                    <option label="Select User" value="" />
                    <option label="Operator" value="Operator">
                      Operator
                    </option>
                    <option label="Employee" value="Employee">
                      Employee
                    </option>
                  </Field>
                )}

                <ErrorMessage
                  name="user"
                  component="div"
                  className="text-red-500 text-[0.8vw]"
                />
              </div>
            )}
            <div>
              <label
                htmlFor="role_type"
                className="text-[#1F4B7F] text-[1.1vw] font-semibold"
              >
                Role Type
              </label>
              {/* <Field
                  as="select"
                  id="role_type"
                  name="role_type"
                  value={values.role_type}
                  onChange={(e) => {
                    handleChange(e);
                    const selectedRole = roleNames.find(
                      (role) => role.role_type === e.target.value
                    );
                    setRoleId(selectedRole?.role_id || "");
                    localStorage.setItem("role_type", e.target.value);
                  }}
                  className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                >
                  <option value="">Select Role</option>
                  {roleNames.map((roleName) => (
                    <option key={roleName.role_id} value={roleName.role_type}>
                      {roleName.role_type}
                    </option>
                  ))}
                </Field> */}

              {permissionupdate != null ? (
                <Field
                  as="input"
                  id="role_type"
                  name="role_type"
                  type="text"
                  disabled={permissionupdate ? true : false}
                  className="cursor-not-allowed border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C]
                   text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                />
              ) : (
                <Field
                  as="select"
                  id="role_type"
                  name="role_type"
                  value={values.role_type}
                  onChange={(e) => {
                    handleChange(e);
                    const selectedRole = roleNames.find(
                      (role) => role.role_type === e.target.value
                    );
                    setRoleId(selectedRole?.role_id || "");
                    localStorage.setItem("role_type", e.target.value);
                  }}
                  className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                >
                  <option value="">Select Role</option>
                  {roleNames.map((roleName) => (
                    <option key={roleName.role_id} value={roleName.role_type}>
                      {roleName.role_type}
                    </option>
                  ))}
                </Field>
              )}

              <ErrorMessage
                name="role_type"
                component="div"
                className="text-red-500 text-[0.8vw]"
              />
            </div>
            {viewMode !== "Operator" && (
              <div>
                <label
                  htmlFor="crud_permission"
                  className="text-[#1F4B7F] text-[1.1vw] font-semibold"
                >
                  Permission
                </label>
                <Field name="crud_permissions">
                  {({ field, form }) => (
                    <MultiSelect
                      options={crudPermissionOptions}
                      value={values.crud_permissions}
                      className="rmsc mt-[0.5vw]"
                      onChange={(value) => {
                        setFieldValue("crud_permissions", value);
                      }}
                      placeholder={
                        <span style={{ fontSize: "14px", color: "#999" }}>
                          Select Permissions
                        </span>
                      }
                      labelledBy="Select"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="crud_permissions"
                  component="div"
                  className="text-red-500 text-[0.8vw]"
                />
              </div>
            )}
          </div>

          {showModulePermissions !== false && (
            <div className="mt-[1vw]">
              <label
                htmlFor="module_permissions"
                className="text-[#1F4B7F] text-[1.1vw] font-semibold"
              >
                Module Permission
              </label>
              <Field name="module_permissions">
                {({ field, form }) => (
                  <Checkbox.Group
                    options={modulePermissionOptions}
                    value={values.module_permissions.map(
                      (item) => item.module_name
                    )}
                    className="grid grid-cols-2 pt-[1vw] gap-3 custom-checkbox"
                    onChange={(checkedValues) => {
                      const updatedPermissions = checkedValues.map(
                        (moduleName) => ({
                          module_id: permissionIdMap[moduleName],
                          module_name: moduleName,
                        })
                      );
                      setFieldValue("module_permissions", updatedPermissions);
                    }}
                  />
                )}
              </Field>
              <ErrorMessage
                name="module_permissions"
                component="div"
                className="text-red-500 text-[0.8vw]"
              />
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
}
