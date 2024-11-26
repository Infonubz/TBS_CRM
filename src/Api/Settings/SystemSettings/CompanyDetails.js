import axios from "axios";
import { toast } from "react-toastify";
import { OPERATOR_DATA } from "../../../Store/Type";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

const apiUrl = process.env.REACT_APP_API_URL;
const userType = sessionStorage.getItem('type_name');
const typeId = sessionStorage.getItem("type_id");
const userID = sessionStorage.getItem("USER_ID")

export const GetOperatorData = async (dispatch) => {
  try {
    const response = await api.get(`${apiUrl}/all-operators${typeId === "OP101" ? `/${userID}` : ""}`);
    dispatch({ type: OPERATOR_DATA, payload: response.data })
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};


export const SubmitCompanyData = async (
  values,
  dispatch,
  fileList
) => {

  const formData = new FormData();
  formData.append('company_name', values.companyname);
  formData.append('owner_name', values.ownername);
  formData.append('phone', values.phone);
  formData.append('alternate_phone', values.phone);
  formData.append('emailid', values.emailid);
  formData.append('alternate_emailid', values.emailid);
  formData.append('aadharcard_number', values.aadhar);
  formData.append('pancard_number', values.pan);
  formData.append('user_status', 'draft');
  formData.append('req_status', 'pending');
  formData.append('user_status_id', 0);
  formData.append('req_status_id', 0);
  formData.append('profileimg', fileList[0]?.originFileObj)

  const method = "put"
  const url = `${apiUrl}/operator${typeId === "OP101" ? `/${userID}` : ""}`;
  try {
    const response = await api({
      method,
      url,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    GetOperatorData(dispatch)
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};


export const SubmitBusinessData = async (
  values, dispatch
) => {
  const payload = {
    type_of_constitution: values.constitution,
    business_background: values.business,
    msme_type: values.msme,
    msme_number: values.msme_number,
    type_of_service: values.service,
    currency_code: values.country_code,
  };

  const url = `${apiUrl}/operator_details${typeId === "OP101" ? `/${userID}` : ""}`;
  const method = "put"

  try {
    const response = await api({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    GetOperatorData(dispatch);
    console.log(response, "responseresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};



export const SubmitAddressData = async (
  values, dispatch
) => {
  const payload = {
    address: values.address,
    state: values.state,
    region: values.region,
    city: values.city,
    country: values.country,
    zip_code: values.postal,
  };

  const method = "put"
  const url = `${apiUrl}/operator_details${typeId === "OP101" ? `/${userID}` : ""}`;

  try {
    const response = await api({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
    GetOperatorData(dispatch);
    console.log(response, "responseresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const SubmitDocumentsData = async (
  values,
  dispatch
) => {
  const formData = new FormData();
  formData.append("aadar_front_doc", values.aadhar_front);
  formData.append("aadar_back_doc", values.aadhar_back);
  formData.append("pancard_front_doc", values.pan_front);
  formData.append("pancard_back_doc", values.pan_back);
  formData.append("msme_doc", values.msme_doc);
  formData.append("upload_gst", values.gst_file);

  const url = `${apiUrl}/operator_details${typeId === "OP101" ? `/${userID}` : ""}`
  const method = "put"

  try {
    const response = await api({
      method,
      url,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response, "responseresponse");
    GetOperatorData(dispatch);
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
