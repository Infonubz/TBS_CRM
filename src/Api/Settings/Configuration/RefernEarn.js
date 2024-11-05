import axios from "axios";
import { toast } from "react-toastify";
import { REFER_EARN } from "../../../Store/Type";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
const apiUrl = process.env.REACT_APP_API_URL;

export const GetReferEarn = async (dispatch) => {
  try {
    const response = await api.get(`${apiUrl}/referEarnContent`);
    console.log(response.data, "tbs_info_success");
    dispatch({
      type: REFER_EARN,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const submitReferEarn = async (values, updateId) => {
  console.log(values, "refer_and_earn");
  const formData = new FormData();
  formData.append("procedureFile", values.refer_and_earn);
  formData.append("refererntcFile", values.refer_and_earn_terms);
  formData.append("referral_amount", values.referal_amount);

  const url = updateId
    ? `${apiUrl}/referEarnContent/${updateId}`
    : `${apiUrl}/referEarnContent`;
  const method = updateId ? "put" : "post";

  try {
    const response = await api({
      method,
      url,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success(response?.data.message);
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
