import axios from "axios";
import { GET_PARTNER_LIST } from "../../Store/Type";
import { toast } from "react-toastify";
const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
const apiUrl = process.env.REACT_APP_API_URL;

export const GetPartnerData = async (dispatch) => {
  try {
    const response = await api.get(
      `${apiUrl}/partner_details`
    );
    dispatch({ type: GET_PARTNER_LIST, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    return null; // Return null or some default value to prevent throwing the error
  }
};
export const submitPartnerPersonalData = async (personalvalues, updatedata) => {
  const payload = {
    emp_first_name: personalvalues.firstname,
    emp_last_name: personalvalues.lastname,
    phone: personalvalues.phone,
    email_id: personalvalues.emailid,
    alternate_phone: personalvalues.alt_phone,
    date_of_birth: personalvalues.dob,
    gender: personalvalues.gender,
    blood_group: personalvalues.blood,
  };

  console.log(
    updatedata,
    "updatedataupdatedataupdatedataupdatedataupdatedataupdatedataupdatedata"
  );
  // const url = updatedata
  //   ? `${apiUrl}/operator_details/${updatedata}`
  //   : "${apiUrl}/operator_details";

  // const method = updatedata ? "put" : "post";
  const url = `${apiUrl}/partner_details`;
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
    sessionStorage.setItem("PAT_ID", response?.data?.id);
    console.log(response, "responseresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};
export const submitPartnerAddressData = async (addressvalues, updatedata) => {
  const payload = {
    temp_add: addressvalues.temp_address,
    temp_country: addressvalues.temp_country,
    temp_state: addressvalues.temp_state,
    temp_city: addressvalues.temp_city,
    temp_zip_code: addressvalues.temp_postal,
    perm_add: addressvalues.per_address,
    perm_country: addressvalues.per_country,
    perm_state: addressvalues.per_state,
    perm_city: addressvalues.per_city,
    perm_zip_code: addressvalues.per_postal,
  };
  console.log(
    updatedata,
    "updatedataupdatedataupdatedataupdatedataupdatedataupdatedataupdatedata"
  );
  // const url = updatedata
  //   ? `${apiUrl}/operator_details/${updatedata}`
  //   : "${apiUrl}/operator_details";

  // const method = updatedata ? "put" : "post";
  const url = `${apiUrl}/partner_address_details/${sessionStorage.getItem(
    "PAT_ID"
  )}`;
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

export const submitPartnerProffesionalData = async (
  addressvalues,
  updatedata
) => {
  const payload = {
    joining_date: "2023-01-15",
    designation: "Senior Developer",
    branch: "IT Department",
    official_email_id: "john.doe@example.com",
    years_of_experience: 8,
    department: "Engineering",
    reporting_manager: "Jane Smith",
  };

  console.log(
    updatedata,
    "updatedataupdatedataupdatedataupdatedataupdatedataupdatedataupdatedata"
  );
  // const url = updatedata
  //   ? `${apiUrl}/operator_details/${updatedata}`
  //   : "${apiUrl}/operator_details";

  // const method = updatedata ? "put" : "post";
  const url = `${apiUrl}/emp-professional-details/${sessionStorage.getItem(
    "EMP_ID"
  )}`;
  const method = "post";

  try {
    const response = await api({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response, "responseresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const SubmitPatDocumentsData = async (documentsdata, updatedata) => {
  const formData = new FormData();
  formData.append("aadhar_card_doc", documentsdata.aadhar_doc);
  formData.append("pan_card_doc", documentsdata.pan_doc);
  formData.append("work_experience_certificate", documentsdata.work_exp_doc);
  formData.append("educational_certificate", documentsdata.edu_cer_doc);
  formData.append("other_documents", documentsdata.other_doc);
  formData.append("aadhar_card_number", documentsdata.aadhar_number);
  formData.append("pan_card_number", documentsdata.pan_number);

  const url = `${apiUrl}/emp-professional-documents/${sessionStorage.getItem(
    "EMP_ID"
  )}`;
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
    console.log(response, "responseresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const GetPatAddressById = async (
  PartnerID,
  setPartnerID,
  setEmpAddressData
) => {
  try {
    const response = await api.get(
      `${apiUrl}/emp-registered-address/${PartnerID}`
    );
    console.log(response, "responseresponse");
    // SetUpdateData(null);
    setEmpAddressData("");
    return response?.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};
export const GetPatProffesionalById = async (
  PartnerID,
  setPartnerID,
  setEmpProffesionalData
) => {
  try {
    const response = await api.get(
      `${apiUrl}/emp-professional-details/${PartnerID}`
    );
    console.log(response, "responseresponse");
    // SetUpdateData(null);
    setEmpProffesionalData("");
    return response?.data[0];
  } catch (error) {
    handleError(error);
    return null;
  }
};
export const GetPatPersonalById = async (
  PartnerID,
  setPartnerID,
  setEmpPersonalData
) => {
  try {
    const response = await api.get(
      `${apiUrl}/emp-personal-details/${PartnerID}`
    );
    console.log(response, "responseresponse");
    // SetUpdateData(null);
    setEmpPersonalData("");
    return response?.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};
export const GetPatDocumentById = async (
  PartnerID,
  setPartnerID,
  setEmpDocumentlData
) => {
  try {
    const response = await api.get(
      `${apiUrl}/emp-personal-details/${PartnerID}`
    );
    console.log(response, "responseresponse");
    // SetUpdateData(null);
    setEmpDocumentlData("");
    return response?.data[0];
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

  toast.error(errorMessage);
};
