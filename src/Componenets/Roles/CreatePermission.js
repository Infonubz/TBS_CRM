import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { ConfigProvider, Select } from "antd";
import { IoMdArrowDropdown } from "react-icons/io";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { LiaSave } from "react-icons/lia";
import "../../App.css";
import { capitalizeFirstLetter } from "../Common/Captilization"
import { GET_PERMISSIONS } from "../../Store/Type";
import {
  GetPermissionById,
  //GetPermissionData,
  SubmitPermissionData,
  SubmitOPPermissionData,
} from "../../Api/Role&Responsibilites/ActivePermission";
import {
  GetUserRoles,
  GetPermissions,
} from "../../Api/Role&Responsibilites/ActiveRoles";
import { useDispatch } from "react-redux";

export default function CreatePermission({
  setIsPermissionModalOpen,
  permissionupdate,
  SetPermissionUpdate,
  SetPermissionData,
  permissionData,
  filter,
  setPermission,
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
  console.log(roleNames, "roles_names_");
  const [role_type_id, setRoleId] = useState("");
  const [viewMode, setViewMode] = useState("Product Owner");
  //const [viewMode, setViewMode] = useState("Operator");
  const [user, setUser] = useState("");
  // const [rolesData, setRoleData] = useState();
  const [showModulePermissions, setShowModulePermissions] = useState(true);
  // const [userlist, setUserlist] = useState({
  //   user: "",
  // });
  const [rolesPermisionData, setRolesPermissionData] = useState();
  //const getroleName = useSelector((state) => state.crm.role_name_list);
  const dispatch = useDispatch();
  const type_id = sessionStorage.getItem("type_id");

  let modulePermissionsData = [
    { module_id: 1, module_name: "Partner - (UM)" },
    { module_id: 2, module_name: "Client - (UM)" },
    { module_id: 3, module_name: "Employee - (UM)" },
    { module_id: 4, module_name: "Offers & Deals" },
    { module_id: 5, module_name: "Advertisement" },
    { module_id: 6, module_name: "Promotions" },
    { module_id: 7, module_name: "Roles" }
  ];
  
  // Apply the condition based on the type_id
  if (type_id === "OP101") {
    modulePermissionsData = modulePermissionsData.filter((module) =>
      ["Employee - (UM)", "Promotions"].includes(module.module_name)
    );
  } else if (type_id === "OPEMP101") {
    modulePermissionsData = modulePermissionsData.filter((module) =>
      ["Employee - (UM)", "Promotions"].includes(module.module_name)
    );
  } else if (type_id === "PROEMP101") {
    modulePermissionsData = modulePermissionsData.filter((module) =>
      [
        "Partner - (UM)",
        "Client - (UM)",
        "Employee - (UM)",
        "Offers & Deals",
        "Advertisement",
        "Promotions",
      ].includes(module.module_name)
    );
  } else if (type_id !== "PRO101") {
    modulePermissionsData = []; 
  }

  
  const modulePermissionOptions = modulePermissionsData.map((module) => ({
    label: module.module_name,
    value: module.module_name,
  }));

  const crudPermissionOptions = [
    { label: "View", value: "view" },
    { label: "Create", value: "create" },
    { label: "Update", value: "update" },
    { label: "Delete", value: "delete" },
  ];

  const permissionIdMap = {
    "Partner - (UM)": 1,
    "Client - (UM)": 2,
    "Employee - (UM)": 3,
    "Offers & Deals": 4,
    Advertisement: 5,
    Promotions: 6,
    Roles: 7
  };

  const fetchRolesPermission = async (roleId) => {
    try {
      const data = await GetPermissions(roleId, dispatch);
      setRolesPermissionData(data);
      setRoleId(roleId);
      console.log(data, "rolesPermission");
    } catch (error) {
      console.log(error, "Error fetching Roles permission data.");
    }
  };

  const handleSubmit = async (values) => {
    console.log(permissionupdate, "permissionupdate");
    try {
      const modulePermissions = values.module_permissions.map((permission) => ({
        module_id: permissionIdMap[permission.module_name],
        module_name: permission.module_name,
      }));
      if (type_id === "PRO101" || type_id === "PROEMP101") {
        const data = await SubmitPermissionData(
          { ...values, module_permissions: modulePermissions },
          permissionupdate,
          dispatch,
          filter,
          rolesPermisionData
        );
        toast.success(data?.message);
      } else {
        const data = await SubmitOPPermissionData(
          { ...values, module_permissions: modulePermissions },
          permissionupdate,
          dispatch,
          filter,
          role_type_id,
          user,
          rolesPermisionData
        );
        toast.success(data?.message);
      }
      setPermission(true);
      setIsPermissionModalOpen(false);
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
      console.log(data, "role data");
      setUser(data?.user);
      fetchRolesPermission(data?.role_id);
      SetPermissionData(data);
      if (data && data.crud_permissions && data.module_permissions) {
        SetPermissionData(data);
        setSelectedCrudPermissions(
          data.crud_permissions.map((permission) => ({
            label: permission,
            value: permission,
          }))
        );
        // setUserlist((prevState) => ({
        //   ...prevState,
        //   user: data.user,
        // }));
        const mappedModulePermissions = data.module_permissions.map(
          (permission) => ({
            module_id: permissionIdMap[permission.module_name],
            module_name: permission.module_name,
          })
        );

        setSelectedModulePermissions(mappedModulePermissions);
        setRoleId(data?.role_id);
        if (data.user !== "employee") {
          setShowModulePermissions(true);
        } else {
          setShowModulePermissions(true);
        }
      } else {
        console.error(
          "Error: Data returned from GetPermissionById is invalid or missing properties"
        );
      }
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  const fetchRoleTypes = async (selectedUser) => {
    console.log(selectedUser, "selectedUser");
    try {
      const userToFetch =
        selectedUser === "Employee" ? "EMP101" : "OP101" || selectedUser;

      const response = await GetUserRoles(userToFetch, dispatch);
      setRoleNames(response);

      console.log(response, "response role");

      if (type_id === "PRO101" && selectedUser === "Operator") {
        setShowModulePermissions(false);
      } else {
        setShowModulePermissions(true);
      }

      if (type_id === "OP101") {
        setShowModulePermissions(true);
      }
    } catch (error) {
      console.error("Error fetching role names based on user", error);
    }
  };

  useEffect(() => {
    if (
      type_id === "PRO101" &&
      rolesPermisionData?.crud_permission_id != null
    ) {
      SetPermissionUpdate(rolesPermisionData?.crud_permission_id);
    }
  }, [rolesPermisionData, SetPermissionUpdate, type_id]);

  useEffect(() => {
    const selectedUser =
      filter === "OP" && type_id === "PRO101"
        ? "Operator"
        : filter === "PO" && type_id === "PRO101"
        ? "Employee"
        : type_id === "OP101"
        ? "Operator"
        : "";
    fetchRoleTypes(selectedUser);
    setUser(selectedUser);

    sessionStorage.setItem("user", selectedUser);
  }, [filter, type_id]);

  useEffect(() => {
    if (permissionupdate != null) {
      fetchGetPermission();
    }
  }, [permissionupdate, SetPermissionUpdate, SetPermissionData]);

  return (
    <Formik
      initialValues={{
        //user: permissionData?.user || user,
        role_type: permissionData?.role_type || "",
        crud_permissions:
          permissionData?.crud_permissions || selectedCrudPermissions,
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
          {/* <div className="flex justify-between mr-[3vw]">
            <div className="text-[1.35vw] text-[#1F4B7F] mt-[0.3vw] mb-[1vw] font-bold">
            { (type_id === "PRO101" && permissionData?.crud_permissions) || (type_id === "OP101" && permissionupdate) ? "UPDATE PERMISSION" : "CREATE NEW PERMISSION"}  
            </div>
            <button
              className="flex bg-[#1F4B7F] mt-[0.3vw] px-[0.6vw] gap-[0.5vw] rounded-[0.75vw] items-center justify-center"
              type="submit"
            >
              <span>
                <LiaSave color="white" size={"1.5vw"} />
              </span>
              <span className="text-white text-[1vw]">Save</span>
            </button>
          </div> */}

          <div className="tline flex justify-between mb-[1vw]">
            <div className="text-[1.35vw] text-[#1F4B7F] font-bold mt-[0.25vw]">
              {(type_id === "PRO101" && permissionData?.crud_permissions) ||
              (type_id === "OP101" && permissionupdate)
                ? "UPDATE PERMISSION"
                : "CREATE NEW PERMISSION"}
            </div>
            <div className="w-1/2 pl-[6vw] flex items-end justify-around mt-[0.16vw]">
              <button
                type="submit"
                className="bg-[#1f487c] h-[2.2vw] w-[6vw] ml-[4.5vw] text-white rounded-[0.75vw] focus:border-[#78ccfc] focus:outline-none focus:border-2"
              >
                <div className="flex justify-center">
                  <LiaSave size={"1.4vw"} />
                  <div className="pl-[0.5vw] text-[1vw]">Save</div>
                </div>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[1vw] pt-[2vw]">
            {/* {viewMode !== "Operator" && (
              <div>
                <label
                  htmlFor="user"
                  className="text-[#1F4B7F] text-[1.1vw] font-semibold"
                >
                  User
                </label>

                {permissionupdate != null ? (
                  // <Field
                  //   as="select"
                  //   id="user"
                  //   name="user"
                  //   value={capitalizeFirstLetter(values.user)}
                  //   disabled={permissionupdate ? true : false}
                  //   onChange={(e) => {
                  //     handleChange(e);
                  //     const selectedUser = e.target.value;
                  //     setUser(e.target.value);
                  //     sessionStorage.setItem("user", selectedUser);
                  //     fetchRoleTypes(selectedUser); // Pass selectedUser to fetchRoleTypes
                  //   }}
                  //   className="cursor-not-allowed border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C]
                  //        text-[#1F487C] text-[1.2vw] h-[2.75vw] w-[100%] rounded-[0.9vw] outline-none px-[1vw]"
                  // >
                  //   
                  //   <option label=" Operator Employee" value="Operator">
                  //     Operator Employee
                  //   </option>
                  //   <option label="Product Owner Employee" value="Employee">
                  //     Product Owner Employee
                  //   </option>
                  // </Field>

                  <ConfigProvider
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
                      placeholder="Select User"
                      value={capitalizeFirstLetter(values.user) || ""}
                      disabled={permissionupdate ? true : false}
                      className="custom-select bg-white outline-none w-full mt-[0.5vw] h-[3vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-xl 
                  border-r-[0.2vw] border-b-[0.2vw] placeholder-[#1F487C]"
                      onChange={(value) => {
                        setFieldValue("user", value);
                        setFieldValue("role_type", "");
                        setUser(value);
                        sessionStorage.setItem("user", value);
                        fetchRoleTypes(value);
                      }}
                      suffixIcon={
                        <span style={{ fontSize: "1vw", color: "#1f487c" }}>
                          <IoMdArrowDropdown size="2vw" />
                        </span>
                      }
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
                          value: "Operator",
                          label: (
                            <div className="text-[1vw] font-semibold px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                              Operator Employee
                            </div>
                          ),
                        },
                        {
                          value: "Employee",
                          label: (
                            <div className="text-[1vw] font-semibold px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                              Product Owner Employee
                            </div>
                          ),
                        },
                      ]}
                    />
                  </ConfigProvider>
                ) : (
                  <ConfigProvider
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
                      placeholder="Select User"
                      value={
                        filter === "OP" && type_id === "PRO101"
                          ? "Operator"
                          : filter === "PO" && type_id === "PRO101"
                          ? "Employee"
                          : type_id === "OP101"
                          ? "Operator"
                          : values.user 
                      }
                      disabled={type_id} 
                      className="custom-select bg-white outline-none w-full mt-[0.5vw] h-[3vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-xl 
             border-r-[0.2vw] border-b-[0.2vw] placeholder-[#1F487C]"
                      // onChange={(value) => {
                      //   setFieldValue("user", value); 
                      //   setFieldValue("role_type", ""); 
                      //   setUser(value); 
                      //   sessionStorage.setItem("user", value); 
                      //   fetchRoleTypes(value); 
                      // }}
                      suffixIcon={
                        <span style={{ fontSize: "1vw", color: "#1f487c" }}>
                          <IoMdArrowDropdown size="2vw" />
                        </span>
                      }
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
                          value: "Operator",
                          label: (
                            <div className="text-[1vw] font-semibold px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                              Operator Employee
                            </div>
                          ),
                        },
                        {
                          value: "Employee",
                          label: (
                            <div className="text-[1vw] font-semibold px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                              Product Owner Employee
                            </div>
                          ),
                        },
                      ]}
                    />
                  </ConfigProvider>
                )}

                <ErrorMessage
                  name="user"
                  component="div"
                  className="text-red-500 text-[0.8vw]"
                />
              </div>
            )} */}
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
                    sessionStorage.setItem("role_type", e.target.value);
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

              {((type_id === "OP101" || type_id === "OPEMP101") &&
                permissionupdate != null) ||
              ((type_id === "PRO101" || type_id === "PROEMP101") &&
                permissionData?.crud_permissions) ? (
                <Field
                  as="input"
                  id="role_type"
                  name="role_type"
                  type="text"
                  disabled={!!permissionupdate} // Explicitly convert to boolean
                  className="cursor-not-allowed border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C]
    text-[#1F487C] text-[1vw] h-[2.90vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                />
              ) : (
                <ConfigProvider
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
                    placeholder="Select Role"
                    className="custom-select bg-white outline-none w-full mt-[0.5vw] h-[3vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-[0.5vw]
      border-r-[0.2vw] border-b-[0.2vw] placeholder-[#1F487C]"
                    value={values.role_type}
                    onChange={(value) => {
                      setFieldValue("role_type", value);
                      const selectedRole = roleNames?.find(
                        (role) => role.role_type === value
                      );
                      fetchRolesPermission(selectedRole?.role_id);
                      sessionStorage.setItem("role_type", value);
                      console.log(selectedRole?.role_id, "Role Type");
                    }}
                    suffixIcon={
                      <span style={{ fontSize: "1vw", color: "#1f487c" }}>
                        <IoMdArrowDropdown size="2vw" />
                      </span>
                    }
                    options={[
                      {
                        value: "",
                        label: (
                          <div className="text-[1vw] font-semibold px-[0.2vw] pb-[0.1vw]  text-[#9ba6bbe3]">
                            Select Role
                          </div>
                        ),
                        disabled: true,
                      },
                      ...(Array.isArray(roleNames) ? roleNames : []).map(
                        (roleName) => ({
                          value: roleName.role_type,
                          label: (
                            <div className="text-[1vw] font-semibold px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                              {capitalizeFirstLetter(roleName.role_type)}
                            </div>
                          ),
                        })
                      ),
                    ]}
                  />
                </ConfigProvider>
              )}

              <ErrorMessage
                name="role_type"
                component="div"
                className="text-red-500 text-[0.8vw]"
              />
            </div>
            <div>
                <label className="text-[#1F4B7F] text-[1.1vw] font-semibold">
                  Description
                </label>
              <Field
                as="textarea"
                placeholder="Enter Description"
                style={{ resize: "none", lineHeight: "2.2vw" }}
                disabled
                value={rolesPermisionData?.description}
                rows="3"
                cols="50"
                className="cursor-not-allowed border-r-[0.2vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw] placeholder-blue border-[#1F487C]
                   text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw] py-[0.3vw]"
              />
            </div>
          </div>
          {viewMode !== "Operator" && (
            <div className=" pt-[1vw]">
              <label
                htmlFor="crud_permission"
                className="text-[#1F4B7F] text-[1.1vw] font-semibold"
              >
                Permission
              </label>
              {type_id === "PRO101" ? (
                <Field name="crud_permissions">
                  {({ field, form }) => (
                    <div className="rmsc mt-[0.5vw] ml-[0.5vw]">
                      <div className="grid grid-cols-4 gap-[0.5vw]">
                        {crudPermissionOptions.map((option) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              type="checkbox"
                              id={option.value}
                              name="crud_permissions"
                              value={option.value}
                              disabled={type_id === "OP101"}
                              className="checkbox-custom mr-[0.5vw] cursor-pointer"
                              checked={field.value?.includes(option.value)}
                              onChange={(e) => {
                                const selectedValues = field.value
                                  ? [...field.value]
                                  : [];
                                if (e.target.checked) {
                                  selectedValues.push(option.value);
                                } else {
                                  const index = selectedValues.indexOf(
                                    option.value
                                  );
                                  if (index > -1) {
                                    selectedValues.splice(index, 1);
                                  }
                                }
                                form.setFieldValue(
                                  "crud_permissions",
                                  selectedValues
                                );
                              }}
                            />
                            <label
                              htmlFor={option.value}
                              className="text-[1vw] text-[#1F4B7F]"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Field>
              ) : (
                <>
                  <div className="text-[1.1vw] font-medium px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                    {Array.isArray(rolesPermisionData?.crud_permissions) &&
                    rolesPermisionData.crud_permissions.length > 0 ? (
                      <div className="flex flex-wrap gap-[1vw]">
                        {rolesPermisionData.crud_permissions.map(
                          (permission, index) => (
                            <span key={index}>
                              {index + 1}. {permission}
                              {index <
                                rolesPermisionData.crud_permissions.length - 1}
                            </span>
                          )
                        )}
                      </div>
                    ) : (
                      //   <div className="text-[1vw] font-semibold px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                      //   {Array.isArray(rolesPermisionData?.crud_permissions) &&
                      //     rolesPermisionData.crud_permissions.map((permission, index) => (
                      //      <div className="grid grid-cols-4" key={index}>
                      //         {index + 1}. {permission}
                      //       </div>
                      //     ))}
                      // </div>

                      <div className="text-[1vw] text-[#FF0000] flex text-center justify-center font-medium">
                        No permissions.
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* <Field name="crud_permissions">
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
                </Field> */}
              <ErrorMessage
                name="crud_permissions"
                component="div"
                className="text-red-500 text-[0.8vw]"
              />
            </div>
          )}
          {showModulePermissions !== false && filter !== "OP" && (
            <div className="mt-[1.75vw]">
              <label
                htmlFor="module_permissions"
                className="text-[#1F4B7F] text-[1.1vw] font-semibold"
              >
                Module Permission
              </label>
              <Field name="module_permissions">
  {({ field, form }) => (
    <div className="grid grid-cols-4 ml-[0.5vw] pt-[0.5vw] gap-3">
      {modulePermissionOptions.map((option) => (
        <div key={option.value} className="flex items-center">
          <input
            type="checkbox"
            id={option.value}
            name="module_permissions"
            value={option.value}
            checked={field.value.some(
              (item) => item.module_name === option.value
            )}
            onChange={(e) => {
              const selectedValues = [...field.value];
              if (e.target.checked) {
                selectedValues.push({
                  module_id: permissionIdMap[option.value],
                  module_name: option.value,
                });
              } else {
                const index = selectedValues.findIndex(
                  (item) => item.module_name === option.value
                );
                if (index > -1) selectedValues.splice(index, 1);
              }
              setFieldValue("module_permissions", selectedValues);
            }}
            className="checkbox-custom cursor-pointer"
          />
          <label
            htmlFor={option.value}
            className="text-[1vw] text-[#1F4B7F] pl-[0.5vw]"
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
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
