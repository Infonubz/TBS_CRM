import axios from "axios";
import { IMPORT_DATA_LIST } from "../../../Store/Type";
import { toast } from "react-toastify";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
const apiUrl = process.env.REACT_APP_API_URL;

export const GetImportData = async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/impdata`);
    dispatch({ type: IMPORT_DATA_LIST, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};
// export const Deleteall = async (api, dispatch, module) => {
//   try {
//     const response = await axios.delete(api);
//     toast.success(response.data);
//     if (module == "operator") {
//       GetOperatorDat(dispatch);
//     } else if (module == "employee") {
//       GetEmployeeData(dispatch);
//     } else if (module == "partner") {
//       GetPartnerData(dispatch);
//     } else if (module == "offer") {
//       GetOffersData(dispatch);
//     } else if (module == "ads") {
//       GetAdsData(dispatch);
//     } else if (module == "promotion") {
//       GetPromotionData(dispatch);
//     } else {
//       console.log("testt");
//     }
//     return response.data;
//   } catch (error) {
//     handleError(error);
//     return null;
//   }
// };

export const SubmitImportData = async (values, dispatch) => {
  const formData = new FormData();
  formData.append("select_fields", values.select_fields);
  formData.append("upload_files", values.upload_files);
  // Determine field_id based on select_fields value
  let field_id;
  switch (values.select_fields) {
    case "User management":
      field_id = 1;
      break;
    case "Offers & deals":
      field_id = 2;
      break;
    case "advertisement":
      field_id = 3;
      break;
    default:
      field_id = 4;
  }

  formData.append("field_id", field_id);
  try {
    let response;
    const existingData = await axios.get(
      `${apiUrl}/impdata/${field_id}`
    );
    console.log(existingData, "existingData existingData");

    if (existingData.status === 200 && existingData.data.length > 0) {
      const impId = existingData.data[0].imp_id;
      response = await axios.put(
        `${apiUrl}/impdata/${impId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } else {
      response = await axios.post(
        `${apiUrl}/impdata`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    }

    await GetImportData(dispatch);
    toast.success(response.data);
    return response.data;
  } catch (error) {
    console.error("Error submitting import data:", error);
    handleError(error);
    return null;
  }
};

export const GetImportDataByField = async (value) => {
  console.log(value, "ahsgxdahsjksaxbj");
  let field_id;
  switch (value) {
    case "User management":
      field_id = 1;
      break;
    case "Offers & deals":
      field_id = 2;
      break;
    case "advertisement":
      field_id = 3;
      break;
    case "Promotion":
      field_id = 4;
      break;
    default:
      field_id = "";
  }
  const response = await api.get(`${apiUrl}/impdata/${field_id}`);
  try {
    console.log(response?.data, "responseresponse");
    return response;
  } catch (error) {
    handleError(error);
    return null;
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
