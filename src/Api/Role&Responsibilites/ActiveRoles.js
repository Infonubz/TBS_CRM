import axios from "axios";
import {
  GET_ROLES,
  GET_ROLES_COUNT,
  GET_OP_EMP_COUNT,
  GET_PRO_EMP_COUNT,
  GET_ROLES_PERMISSION
} from "../../Store/Type";
import { toast } from "react-toastify";
import { GetEmployeeData } from "../UserManagement/Employee";
import { GetOperatorData } from "../UserManagement/SuperAdmin";
import { GetPartnerData } from "../UserManagement/Partner";
import { GetAdsData } from "../Ads/Ads";
import { GetPromotionData } from "../Promotion/Promotion";
const apiUrl = process.env.REACT_APP_API_URL;
const typeid = sessionStorage.getItem("type_id");
const userId = sessionStorage.getItem("USER_ID");

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export const GetRolesData = async (filter, dispatch) => {
  try {
    let roleId;

    if (typeid === "OP101") {
      roleId = 1; // For OP101, always 1
    } else if (typeid === "PRO101") {
      if (filter === "PO") {
        roleId = 2; // For PRO101 and filter === "PO"
      } else if (filter === "OP") {
        roleId = 1; // For PRO101 and filter === "OP"
      }
    }
    const url = `${apiUrl}/roles/${roleId}`;
    const response = await axios.get(url);
    dispatch({ type: GET_ROLES, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


export const GetPermissions = async (roleId, dispatch) => {
  try {
    const url = `${apiUrl}/crud-permissions/${roleId}`;
    const response = await axios.get(url);
    dispatch({ type: GET_ROLES_PERMISSION, payload: response.data });
    return response.data[0];
  } catch (error) {
    handleError(error);
  }
};

export const GetUserRoles = async (userToFetch) =>{

  const payload = {
    user_id: userToFetch
  }
  const url = `${apiUrl}/permissions/userRoles/${userId}`;
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
    console.log(response, "responseresponse");
    return response.data;
  } catch (error) {
      handleError(error);
    return null;
  }
}


export const SubmitRolesData = async (filter, rolevalues, updatedata, dispatch) => {
  // const permission = rolevalues?.permissions.map((item) => {
  //   return item.value;
  // });
  const payload = {
    user: rolevalues.user,
    role_type: rolevalues.role_type,
    description: rolevalues.description, 
    tbs_user_id: sessionStorage.getItem("USER_ID")
  };
  console.log(rolevalues, "rolevalues");
  const url = updatedata ? `${apiUrl}/role/${updatedata}` : `${apiUrl}/role`;
  const method = updatedata ? "put" : "post";

  try {
    const response = await api({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
    GetRolesData(filter, dispatch);
    GetProEmpCount(filter, dispatch);
    GetOpEmpCount(dispatch);
    console.log(response, "responseresponse");
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      handleError(error);
    }
    return null;
  }
  
};

export const GetRoleById = async (updatedata, SetUpdateData, setRoleData) => {
  console.log(updatedata, "ahsgxdahsjksaxbj");
  try {
    const response = await api.get(`${apiUrl}/role/${updatedata}`);
    console.log(response, "response for Roles");
    setRoleData(response?.data);
    return response?.data[0];
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const handleRolesearch = async (e, dispatch) => {
  try {
    const response = await api.get(`${apiUrl}/role/search/${e.target.value}`);
    dispatch({ type: GET_ROLES, payload: response.data });
    return response.data[0];
  } catch (error) {
    handleError(error);
    return null;
  }
};
export const GetRoleCount = async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/role-member-count`);
    dispatch({ type: GET_ROLES_COUNT, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
 
// export const Deleteall = async (api, dispatch, module, filter) => {
//   try {
//     const response = await axios.delete(api);
//     toast.success(response.data);
//     if (module == "roles") {
//       GetRolesData(filter, dispatch);
//       // GetPermissionData(dispatch);
//     }
//     else {
//       console.log("testt");
//     }
//     return response.data;
//   } catch (error) {
//     handleError(error);
//     return null;
//   }
// };

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

export const GetProEmpCount = async (filter, dispatch) => {
  const payload = { role: filter }; 
  const url = `${apiUrl}/roleMemberCount-proemp`;
  const method = "post";

  try {
    console.log("Sending payload:", payload); 
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: GET_PRO_EMP_COUNT, payload: response.data });
    return response.data;
  } catch (error) {
    console.error("Error in GetProEmpCount:", error);
    handleError(error);
  }
};


export const GetOpEmpCount = async (dispatch) => {

  try {
    const response = await api.get(`${apiUrl}/roleMemberCount-opemp/${userId}`);
    dispatch({ type: GET_OP_EMP_COUNT, payload: response.data });
    return response.data;
  } catch (error) {
    console.error("Error in GetOpEmpCount:", error);
    handleError(error);
  }
};

export const handleOpSearch = async (e, dispatch, setRoleCount) => {
  try {
    const response = await api.get(
      `${apiUrl}/search-op-emp-roles/${userId}/${e.target.value}`
    );
    dispatch({ type: GET_OP_EMP_COUNT, payload: response.data });
    setRoleCount(response.data);
    return response.data[0];
  } catch (error) {
    handleError(error);
  }
};

export const handleProSearch = async (filter, e, dispatch, setRoleCount) => {
  const searchValue = e?.target?.value || ""; // Handle empty search value
  const payload = { role: filter }; 
  const url = `${apiUrl}/search-pro-emp-roles/${searchValue}`;

  try {
    console.log("Sending payload:", payload);
    if (searchValue) {
      const response = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch({ type: GET_PRO_EMP_COUNT, payload: response.data });
      setRoleCount(response.data);
      return response.data[0];
    } else if (filter === "PO") {
      const data = await GetProEmpCount(filter, dispatch);
      setRoleCount(data);
    }
    else if (filter === "OP") {
      const data = await GetOpEmpCount(dispatch);
      setRoleCount(data);
    }
  } catch (error) {
    handleError(error);
  }
};
