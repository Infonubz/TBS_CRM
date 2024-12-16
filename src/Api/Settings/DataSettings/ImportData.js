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

// --------------------------------------------------------------------------------------------------------------

// export const SubmitImportData = async (values, dispatch) => {
//   const formData = new FormData();
//   formData.append("select_fields", values.select_fields);
//   formData.append("upload_files", values.upload_files);
//   // Determine field_id based on select_fields value
//   let field_id;
//   switch (values.select_fields) {
//     case "User management":
//       field_id = 1;
//       break;
//     case "Offers & deals":
//       field_id = 2;
//       break;
//     case "advertisement":
//       field_id = 3;
//       break;
//     default:
//       field_id = 4;
//   }

//   formData.append("field_id", field_id);
//   try {
//     let response;
//     const existingData = await axios.get(
//       `${apiUrl}/impdata/${field_id}`
//     );
//     console.log(existingData, "existingData existingData");

//     if (existingData.status === 200 && existingData.data.length > 0) {
//       const impId = existingData.data[0].imp_id;
//       response = await axios.put(
//         `${apiUrl}/impdata/${impId}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//     } else {
//       response = await axios.post(
//         `${apiUrl}/impdata`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//     }

//     await GetImportData(dispatch);
//     toast.success(response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error submitting import data:", error);
//     handleError(error);
//     return null;
//   }
// };

export const SubmitImportData = async (values, field_name, dispatch) => {
  console.log("Values received:", values);
  console.log("Field Name:", field_name);

  let field_id;

  switch (field_name) {
    case "operator":
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
    default:
      field_id = 7;
  }

  console.log("Field ID set:", field_id);

  const formData = new FormData();
  formData.append("select_fields", field_name);
  formData.append("upload_files", values);
  formData.append("field_id", field_id);

  try {
    let response;
    const existingData = await axios.get(`${apiUrl}/impdata/${field_id}`);
    console.log(existingData, "existingData");

    if (existingData.status === 200 && existingData.data.length > 0) {
      const impId = existingData.data[0].imp_id;
      response = await axios.put(`${apiUrl}/impdata/${impId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response, "importdata_fieldId");
    } else {
      response = await axios.post(`${apiUrl}/impdata`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
// export const GetImportDataByField = async (value) => {
//   console.log(value, "ahsgxdahsjksaxbj");
//   let field_id;
//   switch (value) {
//     case "User management":
//       field_id = 1;
//       break;
//     case "Offers & deals":
//       field_id = 2;
//       break;
//     case "advertisement":
//       field_id = 3;
//       break;
//     case "Promotion":
//       field_id = 4;
//       break;
//     default:
//       field_id = "";
//   }
//   const response = await api.get(`${apiUrl}/impdata/${field_id}`);
//   try {
//     console.log(response?.data, "responseresponse");
//     return response;
//   } catch (error) {
//     handleError(error);
//     return null;
//   }
// };

export const GetImportDataByField = async (value, dispatch, setSpinning) => {
  console.log(value, "get_value_by_id");
  let field_id;
  console.log(field_id, "check_field_id_export");

  switch (value) {
    case "operator":
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
    default:
      field_id = 7;
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
