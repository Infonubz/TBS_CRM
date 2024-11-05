import axios from "axios";
import { toast } from "react-toastify";
import { TBS_INFO } from "../../../Store/Type";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
const apiUrl = process.env.REACT_APP_API_URL;

export const GetTbsInfo = async (dispatch) => {
  try {
    const response = await api.get(`${apiUrl}/tbsInfo`);
    console.log(response.data, "tbs_info_success");
    dispatch({
      type: TBS_INFO,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const SubmitAboutUs = async (values) => {
  console.log(values, "about_us_file_data");
  const formData = new FormData();
  formData.append("about_us_file", values);

  const url = `${apiUrl}/tbsInfo`;
  const method = "post";

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

export const SubmitPrivacyPolicy = async (values) => {
  console.log(values, "privacy_policy_file");
  const formData = new FormData();
  formData.append("privacy_policy_file", values);

  const url = `${apiUrl}/tbsInfo-Privacy/3`;
  const method = "put";

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

export const SubmitTermsConditions = async (values) => {
  console.log(values, "terms_conditions_file");
  const formData = new FormData();
  formData.append("terms_conditions_file", values);

  const url = `${apiUrl}/tbsInfo-Terms/3`;
  const method = "put";

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

export const SubmitUserAgreement = async (values) => {
  console.log(values, "user_agreement_file");
  const formData = new FormData();
  formData.append("user_agreement_file", values);

  const url = `${apiUrl}/tbsInfo-User/3`;
  const method = "put";

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
