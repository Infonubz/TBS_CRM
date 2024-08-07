import axios from "axios";
import { GET_PERMISSION_COUNT, GET_PERMISSIONS, GET_ROLE_NAME } from "../../Store/Type";
import { toast } from "react-toastify";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
const apiUrl = process.env.REACT_APP_API_URL;

export const GetPermissionData = async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/permissions`);
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

export const SubmitPermissionData = async (
  permissions,
  permissionupdate,
  dispatch,
  role_type_id // Include role_type_id parameter
) => {
  // Ensure permissions are defined and have valid values
  const crud_permission =
    permissions?.crud_permissions?.map((item) => {
      return item.value;
    }) || [];

  const module_permission = permissions?.module_permissions || [];

  const payload = {
    role_type: permissions.role_type,
    crud_permissions: crud_permission,
    module_permissions: module_permission,
  };

  const url = permissionupdate
    ? `${apiUrl}/permissions/${permissionupdate}`
    : `${apiUrl}/permissions/${role_type_id}`;

  const method = permissionupdate ? "put" : "put";

  try {
    const response = await api({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
    GetPermissionData(dispatch);
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const GetPermissionById = async (
  permissionupdate,
  SetPermissionUpdate,
  SetPermissionData,
  role_type_id // Include role_type_id parameter
) => {
  try {
    const response = await api.get(
      `${apiUrl}/permissions/${permissionupdate}`
    );
    SetPermissionData("");
    return response?.data[0];
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
export const GetPermissionCount = async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/crud-permission-count`);
    dispatch({ type: GET_PERMISSION_COUNT, payload: response.data });
    return response.data;
  } catch (error) {
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
