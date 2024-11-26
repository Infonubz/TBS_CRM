import axios from "axios";
import { GET_PERMISSION_COUNT, GET_PERMISSIONS, GET_ROLE_NAME } from "../../Store/Type";
import { toast } from "react-toastify";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
const apiUrl = process.env.REACT_APP_API_URL;
const typeid = sessionStorage.getItem("type_id");
const userId = sessionStorage.getItem("USER_ID");

export const GetPermissionData = async (filter, dispatch) => {
  const payload = {
    term : filter 
  };

  const roleId = typeid === "OP101" ? 1 : 3 

  const url = `${apiUrl}/permission/${userId}/${roleId}`;
  const method = "post";

  try {
    console.log("Sending payload:", payload); 
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: GET_PERMISSIONS, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const GetRoleNameData = async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/api/roleName`);
    dispatch({ type: GET_ROLE_NAME, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const SubmitOPPermissionData = async (
  permissions,
  permissionupdate,
  dispatch,
  filter,
  role_type_id, 
  user,
  rolesPermisionData
) => {

  const crud_permission = rolesPermisionData?.crud_permissions?.length > 0 
  ? rolesPermisionData.crud_permissions 
  : permissions?.crud_permissions;

  const typeId = sessionStorage.getItem("type_id") === "PRO101" ? "EMP101" : sessionStorage.getItem("type_id");

  const module_permission = permissions?.module_permissions || [];
  const selectedUser =
  filter === "OP" && typeid === "PRO101"
  ? "Operator"
  : filter === "PO" && typeid === "PRO101"
  ? "Employee"
  : typeid === "OP101"
  ? "Operator"
  : "";


  const payload = {
    role_id : role_type_id,
    user: selectedUser,
    user_id: typeId,
    tbs_user_id: sessionStorage.getItem("USER_ID"),
    role_type: permissions.role_type,
    crud_permissions: crud_permission,
    module_permissions: module_permission,
  };

  console.log(payload,rolesPermisionData, "payload payload")

  const url = permissionupdate
    ? `${apiUrl}/permissions/${permissionupdate}`
    : `${apiUrl}/permissions`;

  const method = permissionupdate ? "put" : "post";
  try {
    const response = await api({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
    GetPermissionData(filter, dispatch);
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
  finally{
    GetPermissionCount(filter, dispatch);
  }
};



export const SubmitPermissionData = async (
  permissions,
  permissionupdate,
  dispatch,
  filter,
  rolesPermisionData
) => {

  const crud_permission = permissions?.crud_permissions;
  const module_permission = permissions?.module_permissions || [];

  const payload = {
    crud_permissions: crud_permission,
    module_permissions:module_permission
  };

  console.log(payload,rolesPermisionData, "payload payload")

  const url = `${apiUrl}/crud-permissions/${permissionupdate}`
  const method = "put";

  try {
    const response = await api({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
    GetPermissionData(filter, dispatch);
    GetPermissionCount(filter, dispatch);
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};


// export const GetPermissionById = async (
//   permissionupdate,
//   SetPermissionUpdate,
//   SetPermissionData,
//   role_type_id // Include role_type_id parameter
// ) => {
//   try {
//     const response = await api.get(
//       `${apiUrl}/permissions/${userId}/${permissionupdate}`
//     );
//     SetPermissionData("");
//     return response?.data[0];
//   } catch (error) {
//     handleError(error);
//     return null;
//   }
// };


export const GetPermissionById = async (
  permissionupdate,
  SetPermissionUpdate,
  SetPermissionData,
  role_type_id 
) => {
  const payload =  typeid === "PRO101"
  ? { 
    crud_permission_id: permissionupdate 
  }: { 
    permission_id: permissionupdate 
  };

  const url = `${apiUrl}/permissions/${userId}`
  const method = "post";

  try {
    const response = await api({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data[0];
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const handlePermissionsearch = async (e, dispatch) => {
  try {
    const response = await api.get(
      `${apiUrl}/permissions/search/${e.target.value}`
    );
    dispatch({ type: GET_PERMISSIONS, payload: response.data });
    return response.data[0];
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const GetPermissionCount = async (filter, dispatch) => {
  const payload = {
    term: filter,
  };

  const url = `${apiUrl}/crud-permission-count/${userId}`;
  const method = "post";

  try {
    const response = await api.request({
      method,
      url,
      data: payload, // Attach payload (non-standard)
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: GET_PERMISSION_COUNT, payload: response.data });
    console.log(response.data, payload, GET_PERMISSION_COUNT, "response role");
    return response.data;
  } catch (error) {
    console.error("Error in GetPermissionCount:", error);
    handleError(error);
  }
};


const handleError = (error) => {
  console.error("Error details:", error);
  let errorMessage = "An error occurred";

  if (error.response) {
    console.error("Error response from server:", error.response);
    errorMessage = `Server responded with status ${error.response.status}`;
  } else if (error.request) {
    console.error("No response received:", error.request);
    errorMessage = "No response received from server";
  } else {
    console.error("Error setting up request:", error.message);
    errorMessage = error.message;
  }

  if (error.code === "ERR_NETWORK") {
    errorMessage =
      "Network Error: Unable to connect to the server. Please check the server status and your network connection.";
  }
  if (error.code === "ERR_CONNECTION_REFUSED") {
    errorMessage =
      "Network Error: Unable to connect to the server. Please check the server status and your network connection.";
  }
  toast.error(errorMessage);
};
