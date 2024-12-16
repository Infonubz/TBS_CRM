import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { ConfigProvider, Select } from "antd";
import { IoMdArrowDropdown } from "react-icons/io";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { LiaSave } from "react-icons/lia";
import "../../App.css";
import { capitalizeFirstLetter } from "../Common/Captilization";
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
    role_type: Yup.string().required("Role Type is required"),
    crud_permissions: Yup.array().min(1, "CRUD permission is required"),
    module_permissions: Yup.array()
      .of(
        Yup.object({
          module_id: Yup.string().required("Module ID is required"),
          module_name: Yup.string().required("Module name is required"),
        })
      )
      .min(1, "Module permissions are required"),
  });

  const [selectedCrudPermissions, setSelectedCrudPermissions] = useState([]);
  const [selectedModulePermissions, setSelectedModulePermissions] = useState(
    []
  );
  const [selectedActivePermissions, setSelectedActivePermissions] = useState(
    []
  );
  const [roleNames, setRoleNames] = useState([]);
  const [moduleError, setModuleError] = useState();
  const [crudError, setCrudError] = useState();
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
    console.log(values, "permissionupdate");
    try {
      const modulePermissions = values.module_permissions.map((permission) => ({
        module_id: permissionIdMap[permission.module_name],
        module_name: permission.module_name,
      }));
      const activePermissions = values.active_module_permissions.map(
        (permission) => ({
          module_id: permissionIdMap[permission.module_name],
          module_name: permission.module_name,
        })
      );
      if (type_id === "PRO101" || type_id === "PROEMP101") {
        const data = await SubmitPermissionData(
          {
            ...values,
            module_permissions: modulePermissions,
            active_module_permissions: activePermissions,
          },
          permissionupdate,
          dispatch,
          filter,
          showModulePermissions,
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
        const mappedModulePermissions = (data.module_permissions || []).map(
          (permission) => ({
            module_id: permissionIdMap[permission.module_name] || null,
            module_name: permission.module_name || "Unknown",
          })
        );

        const mappedActivePermissions = (
          data.active_module_permissions || []
        ).map((permission) => ({
          module_id: permissionIdMap[permission.module_name] || null,
          module_name: permission.module_name || "Unknown",
        }));

        console.log(mappedModulePermissions, "mappedModulePermissions");

        setSelectedModulePermissions(mappedModulePermissions);
        setSelectedActivePermissions(mappedActivePermissions);
        setRoleId(data?.role_id);
        if (filter !== "PO" && type_id === "PRO101") {
          setShowModulePermissions(false);
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

  const processedPermissions =
    rolesPermisionData?.crud_permissions?.map((item) => {
      try {
        const parsedItem = JSON.parse(item);
        return { label: parsedItem.label, value: parsedItem.value };
      } catch (error) {
        return {
          label: item.charAt(0).toUpperCase() + item.slice(1),
          value: item.toLowerCase(),
        };
      }
    }) || []; // Fallback to an empty array if crud_permissions is undefined

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
  console.log(permissionupdate, "showModulePermissions");

  return (
    <Formik
      initialValues={{
        role_type: permissionData?.role_type || "",
        crud_permissions:
          showModulePermissions && type_id === "PRO101"
            ? permissionData?.crud_permissions || selectedCrudPermissions
            : showModulePermissions === false
            ? permissionData?.crud_permissions || selectedCrudPermissions
            : crudPermissionOptions,
        module_permissions: showModulePermissions
          ? selectedModulePermissions
          : showModulePermissions === "false"
          ? modulePermissionsData
          : modulePermissionsData,
        active_permissions: permissionData?.active_permissions || false,
        active_module_permissions: showModulePermissions
          ? selectedActivePermissions || []
          : modulePermissionsData,
      }}
      onSubmit={(values, { setSubmitting }) => {
        dispatch({
          type: GET_PERMISSIONS,
          payload: values,
        });
        handleSubmit(values);
        // setSubmitting(false);
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
          <div className="grid grid-cols-2 gap-[1vw] pt-[1vw]">
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
                <span className="text-[1vw] text-red-600 pl-[0.25vw]">*</span>
              </label>
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
                <span className="text-[1vw] text-red-600 pl-[0.25vw]">*</span>
              </label>
              {type_id === "PRO101" ? (
                <Field name="crud_permissions">
                  {({ field, form }) => {
                    console.log("Field value:", field.value); // Debug to ensure field value is populated
                    console.log(
                      "Permission data:",
                      permissionData?.crud_permissions
                    ); // Debug to confirm data
                    return (
                      <div className="rmsc mt-[0.5vw] ml-[0.5vw]">
                        <div className="grid grid-cols-4 gap-[0.5vw]">
                          {crudPermissionOptions.map((option) => (
                            <div
                              key={option.value}
                              className="flex items-center"
                            >
                              <input
                                type="checkbox"
                                id={option.value}
                                name="crud_permissions"
                                value={option.value}
                                disabled={type_id === "OP101"}
                                className="checkbox-custom mr-[0.5vw] cursor-pointer"
                                checked={field.value?.includes(option.value)} // Check if field.value contains the option
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
                    );
                  }}
                </Field>
              ) : (
                <>
                  <div className="text-[1.1vw] font-medium px-[0.2vw] pb-[0.1vw] text-[#1F487C] relative">
                    {rolesPermisionData?.crud_permissions?.length > 0 ? (
                      <div className="flex flex-wrap gap-[1vw]">
                        {processedPermissions.map((permission, index) => (
                          <span key={index}>
                            {index + 1}. {permission.label}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div className="text-[1vw] text-[#FF0000] flex text-center justify-center font-medium">
                        No permissions.
                      </div>
                    )}
                  </div>
                </>
              )}
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
                <span className="text-[1vw] text-red-600 pl-[0.25vw]">*</span>
              </label>
              <Field name="module_permissions">
                {({ field, form }) => {
                  // Ensure field.value is always an array
                  const selectedValues = Array.isArray(field.value)
                    ? field.value
                    : [];

                  return (
                    <div className="grid grid-cols-4 ml-[0.5vw] pt-[0.5vw] gap-3">
                      {modulePermissionOptions?.map((option) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            type="checkbox"
                            id={option.value}
                            name="module_permissions"
                            value={option?.value}
                            checked={selectedValues.some(
                              (item) => item.module_name === option.value
                            )}
                            onChange={(e) => {
                              // Make sure selectedValues is treated as an array
                              const updatedValues = [...selectedValues];
                              if (e.target.checked) {
                                updatedValues.push({
                                  module_id: permissionIdMap[option.value],
                                  module_name: option.value,
                                });
                              } else {
                                const index = updatedValues.findIndex(
                                  (item) => item.module_name === option.value
                                );
                                if (index > -1) updatedValues.splice(index, 1);
                              }

                              form.setFieldValue(
                                "module_permissions",
                                updatedValues
                              );
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
                  );
                }}
              </Field>
              <ErrorMessage
                name="module_permissions"
                component="div"
                className="text-red-500 text-[0.8vw]"
              />
            </div>
          )}
          {/* Render Active Permission */}
          {showModulePermissions !== false &&
            filter !== "OP" &&
            type_id === "PRO101" && (
              <div className="flex flex-row mt-[2vw]">
                <label className="text-[#1F4B7F] text-[1.1vw] font-semibold">
                  Active Permission :
                </label>
                <div className="pl-[2vw]">
                  <label>
                    <Field
                      type="radio"
                      name="active_permissions"
                      value="true"
                      checked={values.active_permissions === true} // Check Boolean value
                      onChange={(e) =>
                        setFieldValue(
                          "active_permissions",
                          e.target.value === "true"
                        )
                      }
                      className="w-[1vw] h-[1vw] accent-[#1F4B7F]"
                    />
                    <span className="text-[#1F4B7F] text-[1.1vw] font-medium pl-[0.5vw]">
                      Yes
                    </span>
                  </label>
                  <label className="pl-[2vw]">
                    <Field
                      type="radio"
                      name="active_permissions"
                      value="false"
                      checked={values.active_permissions === false} // Check Boolean value
                      onChange={(e) =>
                        setFieldValue(
                          "active_permissions",
                          e.target.value === "true"
                        )
                      }
                      className="w-[1vw] h-[1vw] accent-[#1F4B7F]"
                    />
                    <span className="text-[#1F4B7F] text-[1.1vw] font-medium pl-[0.5vw]">
                      No
                    </span>
                  </label>
                </div>
              </div>
            )}

          <Field name="active_permissions">
            {({ field }) =>
              field.value === true &&
              showModulePermissions !== false &&
              filter !== "OP" && (
                <div className="mt-[1.75vw]">
                  <label
                    htmlFor="active_module_permissions"
                    className="text-[#1F4B7F] text-[1.1vw] font-semibold"
                  >
                    Active Module Permissions
                  </label>
                  <Field name="active_module_permissions">
                    {({ field: activeField, form }) => (
                      <div className="grid grid-cols-4 ml-[0.5vw] pt-[0.5vw] gap-3">
                        {form.values.module_permissions.map((permission) => (
                          <div
                            key={permission.module_name}
                            className="flex items-center"
                          >
                            <input
                              type="checkbox"
                              id={`active_${permission.module_name}`}
                              name="active_module_permissions"
                              value={permission.module_name}
                              checked={activeField.value.some(
                                (item) =>
                                  item.module_name === permission.module_name
                              )}
                              onChange={(e) => {
                                const selectedValues = [...activeField.value];
                                if (e.target.checked) {
                                  selectedValues.push({
                                    module_id: permission.module_id,
                                    module_name: permission.module_name,
                                  });
                                } else {
                                  const index = selectedValues.findIndex(
                                    (item) =>
                                      item.module_name ===
                                      permission.module_name
                                  );
                                  if (index > -1)
                                    selectedValues.splice(index, 1);
                                }
                                form.setFieldValue(
                                  "active_module_permissions",
                                  selectedValues
                                );
                              }}
                              className="checkbox-custom cursor-pointer"
                            />
                            <label
                              htmlFor={`active_${permission.module_name}`}
                              className="text-[1vw] text-[#1F4B7F] pl-[0.5vw]"
                            >
                              {permission.module_name}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </Field>
                  <ErrorMessage
                    name="active_module_permissions"
                    component="div"
                    className="text-red-500 text-[0.8vw]"
                  />
                </div>
              )
            }
          </Field>
        </Form>
      )}
    </Formik>
  );
}
