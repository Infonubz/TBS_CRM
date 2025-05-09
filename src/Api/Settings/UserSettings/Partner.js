import axios from "axios";
import { toast } from "react-toastify";
import { OPERATOR_DATA } from "../../../Store/Type";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

const apiUrl = process.env.REACT_APP_API_URL;
const userType = sessionStorage.getItem("type_name");
const typeId = sessionStorage.getItem("type_id")
  ? sessionStorage.getItem("type_id")
  : localStorage.getItem("type_id");
const userID = sessionStorage.getItem("USER_ID")
  ? sessionStorage.getItem("USER_ID")
  : localStorage.getItem("USER_ID");

export const GetPartnerPersonalData = async () => {
  try {
    const response = await api.get(
      `${apiUrl}/partner_details${typeId === "PART101" ? `/${userID}` : ""}`
    );
    // const response = await api.get(`${apiUrl}/partner_details${typeId === "PRO101" ? `/tbs-pat1113` : ""}`);
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const GetPartnerAddressData = async () => {
  try {
    const response = await api.get(
      `${apiUrl}/partner_address_details${
        typeId === "PART101" ? `/${userID}` : ""
      }`
    );
    // const response = await api.get(`${apiUrl}/partner_address_details${typeId === "PRO101" ? `/tbs-pat1113` : ""}`);
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const GetPartnerDocuments = async () => {
  try {
    const response = await api.get(
      `${apiUrl}/partner-documents${typeId === "PART101" ? `/${userID}` : ""}`
    );
    // const response = await api.get(`${apiUrl}/partner-documents${typeId === "PRO101" ? `/tbs-pat1113` : ""}`);
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const StatusUpdatePartner = async () => {
  const payload = {
    req_status: "Posted",
    req_status_id: 1,
    partner_status: "Pending",
    partner_status_id: 1,
    // comments: valueid === 5 ? "" : inputValue ? inputValue : "",
  };
  const url = `${apiUrl}/request-management-partner/${userID}`;
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
    console.log(response, "responseresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const submitPartnerPersonalData = async (values, fileList) => {
  const formData = new FormData();
  formData.append("partner_first_name", values.firstname);
  formData.append("partner_last_name", values.lastname);
  formData.append("phone", values.phone);
  formData.append("emailid", values.emailid);
  formData.append("alternate_phone", values.alt_phone);
  formData.append("date_of_birth", values.dob);
  formData.append("gender", values.gender);
  if (fileList[0]?.originFileObj) {
    formData.append("profile_img", fileList[0].originFileObj);
  }
  formData.append("occupation", values.occupation);
  const url = `${apiUrl}/partner_details_update${
    typeId === "PART101" ? `/${userID}` : ""
  }`;
  // const url = `${apiUrl}/partner_details_update${typeId === "PRO101" ? `/tbs-pat1113` : ""}`
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
    StatusUpdatePartner();
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const submitPartnerAddressData = async (values) => {
  const payload = {
    temp_add: values.temp_address,
    temp_country: values.temp_country,
    temp_state: values.temp_state,
    temp_city: values.temp_city,
    temp_zip_code: values.temp_postal,
    temp_region: values.temp_region,
    perm_add: values.per_address,
    perm_country: values.per_country,
    perm_state: values.per_state,
    perm_city: values.per_city,
    perm_zip_code: values.per_postal,
    perm_region: values.per_region,
  };

  const url = `${apiUrl}/partner_address_details${
    typeId === "PART101" ? `/${userID}` : ""
  }`;
  // const url = `${apiUrl}/partner_address_details${typeId === "PRO101" ? `/tbs-pat1113` : ""}`
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
    console.log(response, "responseresponse");
    StatusUpdatePartner();
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const SubmitPartnerDocumentData = async (values) => {
  const formData = new FormData();
  formData.append("aadhar_card_number", values.aadhar_number);
  formData.append("pan_card_number", values.pan_number);
  formData.append("aadhar_card_front", values.aadhar_fr_doc);
  formData.append("aadhar_card_back", values.aadhar_bk_doc);
  formData.append("pan_card_front", values.pan_fr_doc);
  formData.append("pan_card_back", values.pan_bk_doc);

  const url = `${apiUrl}/partner-documents${
    typeId === "PART101" ? `/${userID}` : ""
  }`;
  // const url = `${apiUrl}/partner-documents${typeId === "PRO101" ? `/tbs-pat1113` : ""}`
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
    console.log(response, "responseresponse");
    StatusUpdatePartner();
    return response.data || "Partner updated successfully";
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
