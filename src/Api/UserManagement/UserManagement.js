import axios from "axios";
import {
  OPERATOR_LIST,
  USER_MANAGEMENT_ADMIN_LIST,
  USER_MANAGEMENT_USER_LIST,
} from "../../Store/Type";
import { toast } from "react-toastify";
const apiUrl = process.env.REACT_APP_API_URL;

const BASE_URL_USER = `${apiUrl}/search`;
const BASE_URL_ADMIN = `${apiUrl}/api/search`;
const BASE_URL_USERS = `${apiUrl}/users`;

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export const UserManagementSearch = async (value, adminUser, dispatch) => {
  const url = adminUser ? BASE_URL_ADMIN : BASE_URL_USER;
  const payload = { search: value };

  try {
    const response = await api.post(url, payload);
    const actionType = adminUser
      ? USER_MANAGEMENT_ADMIN_LIST
      : USER_MANAGEMENT_USER_LIST;
    dispatch({ type: actionType, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const Getuserdata = async (dispatch) => {
  try {
    const response = await api.get(BASE_URL_USERS);
    dispatch({ type: USER_MANAGEMENT_USER_LIST, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const submitUserData = async (values, updatedata) => {
  const formData = new FormData();
  formData.append("firstname", values.firstname);
  formData.append("lastname", values.lastname);
  formData.append("roletype", values.roletype);
  formData.append("mobilenumber", values.mobilenumber);
  formData.append("emailid", values.emailid);
  formData.append("status", values.status);
  formData.append("status_id", values.status === "Active" ? 1 : 2);
  formData.append("password", values.password);
  formData.append("confirmpassword", values.confirmpassword);
  formData.append("profile_img", values.profile_img);

  const url = updatedata ? `${BASE_URL_USERS}/${updatedata}` : BASE_URL_USERS;
  const method = updatedata ? "put" : "post";

  try {
    const response = await api({
      method,
      url,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};
export const GetAdd_Users = async (updatedata) => {
  try {
    const response = await api.get(`${BASE_URL_USERS}/${updatedata}`);
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

// export const GetOperatorData = async (dispatch) => {
//   try {
//     const response = await axios.get("http://192.168.90.47:4001/api/Operators-withAll-data");
//     dispatch({ type: OPERATOR_LIST, payload: response.data });
//     return response.data;
//   } catch (error) {
//     handleError(error);
//     // return null;
//   }
// };
export const GetOperatorDataById = async (
  updatedata,
  SetUpdateData,
  setOperatorData
) => {
  console.log(updatedata, "ahsgxdahsjksaxbj");
  try {
    const response = await api.get(`${apiUrl}/operators/${updatedata}`);
    console.log(response, "responseresponse");
    return response?.data[0];
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const GetExcelTemplateById = async (value, setSpinning) => {
  console.log(value, "get_value_by_id");
  let field_id;
  console.log(field_id, "check_field_id_export");

  switch (value) {
    case "super_admin":
      field_id = 1;
      break;
    case "partner":
      field_id = 2;
      break;
    case "employee":
      field_id = 3;
      break;
    case "client":
      field_id = 4;
      break;
    case "discount":
      field_id = 5;
      break;
    case "redeem":
      field_id = 6;
      break;
    case "promotion":
      field_id = 7;
      break;
    default:
      field_id = 0;
  }
  try {
    const response = await api.get(`${apiUrl}/impdata/${field_id}`);
    console.log(response?.data, "responseresponse");
    // dispatch({ type: IMPORT_DATA_LIST, payload: response.data });
    return response;
  } catch (error) {
    handleError(error);
    return null;
  } finally {
    setSpinning && setSpinning(false);
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
