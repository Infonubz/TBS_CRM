import axios from "axios";
import {
  GET_ROLES,
  GET_ROLES_COUNT,
  GET_OP_EMP_COUNT,
  GET_PRO_EMP_COUNT,
} from "../../Store/Type";
import { toast } from "react-toastify";
import { GetEmployeeData } from "../UserManagement/Employee";
import { GetOperatorData } from "../UserManagement/SuperAdmin";
import { GetPartnerData } from "../UserManagement/Partner";
import { GetAdsData } from "../Ads/Ads";
import { GetPromotionData } from "../Promotion/Promotion";
const apiUrl = process.env.REACT_APP_API_URL;

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
export const GetRolesData = async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/role`);
    dispatch({ type: GET_ROLES, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};

export const SubmitRolesData = async (rolevalues, updatedata, dispatch) => {
  // const permission = rolevalues?.permissions.map((item) => {
  //   return item.value;
  // });
  const payload = {
    user: rolevalues.user,
    role_type: rolevalues.role_type,
    description: rolevalues.description,
  };
  console.log(
    rolevalues,
    "updatedataupdatedataupdatedataupdatedataupdatedataupdatedataupdatedata"
  );
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
    GetRolesData(dispatch);
    console.log(response, "responseresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const GetRoleById = async (updatedata, SetUpdateData, setRoleData) => {
  console.log(updatedata, "ahsgxdahsjksaxbj");
  try {
    const response = await api.get(`${apiUrl}/role/${updatedata}`);
    console.log(response, "responseresponse");
    setRoleData("");
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

export const GetOpEmpCount = async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/roleMemberCount-opemp`);
    dispatch({ type: GET_OP_EMP_COUNT, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const GetProEmpCount = async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/roleMemberCount-proemp`);
    dispatch({ type: GET_PRO_EMP_COUNT, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const handleOpSearch = async (e, dispatch) => {
  try {
    const response = await api.get(
      `${apiUrl}/roleMemberCount-opemp/${e.target.value}`
    );
    dispatch({ type: GET_OP_EMP_COUNT, payload: response.data });
    return response.data[0];
  } catch (error) {
    handleError(error);
  }
};

export const handleProSearch = async (e, dispatch) => {
  try {
    const response = await api.get(
      `${apiUrl}/roleMemberCount-proemp/${e.target.value}`
    );
    dispatch({ type: GET_PRO_EMP_COUNT, payload: response.data });
    return response.data[0];
  } catch (error) {
    handleError(error);
  }
};
