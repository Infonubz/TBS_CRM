import axios from "axios";
import { GET_PARTNER_LIST, PARTNER_BYID, PARTNER_DATA_BYID } from "../../Store/Type";
import { toast } from "react-toastify";
const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
const apiUrl = process.env.REACT_APP_API_URL;

export const GetPartnerData = async (dispatch) => {
  try {
    const response = await api.get(`${apiUrl}/all-partner_details`);
    dispatch({ type: GET_PARTNER_LIST, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    return null; // Return null or some default value to prevent throwing the error
  }
};

export const handlePartnerSearch = async (e, dispatch) => {
  try {
    if (e.target.value) {
      const response = await api.get(
        `${apiUrl}/partner-search/${e.target.value}`
      );
      dispatch({ type: GET_PARTNER_LIST, payload: response.data });
      return response.data[0];
    } else {
      GetPartnerData(dispatch);
    }
  } catch (error) {
    handleError(error);
  }
};

export const GetPartnerProfile = async (PartnerID, dispatch) => {
  console.log(PartnerID, "operatorID852");

  const endpoint = `${apiUrl}/partner_ProfileImg/${PartnerID !== 'null' ? PartnerID : sessionStorage.getItem('PARTNER_ID')}`;


  try {
    const response = await axios.get(endpoint);
    // dispatch({ type: PARTNER_BYID, payload: response.data });
    console.log(response.data, "response_partner_byid");
    sessionStorage.setItem('PartnerProfileImg', response.data.profile_img)
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};

export const SubmitPartnerExcel = async (file, dispatch) => {
  const formData = new FormData();
  formData.append("file", file);

  const excelEndpoint = `${apiUrl}/import-partner-details`;
  const method = "post";

  try {
    const response = await api({
      url: excelEndpoint,
      method: method,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success(response.data);
    GetPartnerData(dispatch);
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    toast.error("Failed to upload file");
    return null;
  }
};

export const PartnerStatusUpdateApi = async (
  partnerStatusId,
  PartnerID,
  dispatch
) => {
  // const payload = {
  //   partner_status_id: partnerStatusId == 2 ? 3 : 2,
  //   partner_status: partnerStatusId == 2 ? "Inactive" : "Active",
  //   req_status_id: partnerStatusId == 2 ? 3 : 2,
  //   req_status: partnerStatusId == 2 ? "Inactive" : "Active",
  // };
  const payload = {
    partner_status_id: partnerStatusId == 2 ? 3 : 2,
    partner_status: partnerStatusId == 2 ? "Inactive" : "Active",
    req_status_id: partnerStatusId == 2 ? 3 : 5,
    req_status: partnerStatusId == 2 ? "Inactive" : "Approved",
  };

  const url = `${apiUrl}/request-management-partner/${PartnerID}`;

  // const url = `${apiUrl}/pro-emp-status/${employeeid}`;
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
    GetPartnerData(dispatch);
    console.log(response, "responseresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const PartnerProfile = async (image, PartnerID, dispatch) => {
  console.log(image, "image987465222");

  const payload = new FormData();
  payload.append("profile_img", image);

  const updateurl = `${apiUrl}/partner_profileImg/${PartnerID}`;

  const method = "put";
  try {
    const response = await api({
      method,
      url: updateurl,
      data: payload,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    GetPartnerData(dispatch);
    GetPartnerProfile();
    console.log(response, "responseresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const submitPartnerPersonalData = async (
  personalvalues,
  PartnerID,
  enable,
  dispatch,
  fileList,
  setPartnerID
) => {
  // const payload = {
  //   partner_first_name: personalvalues.firstname,
  //   partner_last_name: personalvalues.lastname,
  //   phone: personalvalues.phone,
  //   emailid: personalvalues.emailid,
  //   alternate_phone: personalvalues.alt_phone,
  //   date_of_birth: personalvalues.dob,
  //   gender: personalvalues.gender,
  //   //blood_group: personalvalues.blood,
  // };
  const formData = new FormData();
  formData.append('partner_first_name', personalvalues.firstname);
  formData.append('partner_last_name', personalvalues.lastname);
  formData.append('phone', personalvalues.phone);
  formData.append('emailid', personalvalues.emailid);
  formData.append('alternate_phone', personalvalues.alt_phone);
  formData.append('date_of_birth', personalvalues.dob);
  formData.append('gender', personalvalues.gender);
  if (fileList[0]?.originFileObj) {
    formData.append('profile_img', fileList[0].originFileObj)
}
  formData.append('occupation',personalvalues.occupation)
  formData.append('occupation_id',1)
  // formData.append('blood_group', personalvalues.blood); // Uncomment if needed

  console.log(
    PartnerID,
    "check_submit_partner_id"
  );
  // const url = PartnerID
  //   ? `${apiUrl}/partner_details_update/${PartnerID ? PartnerID : sessionStorage.getItem("PAT_ID")}`
  //   : `${apiUrl}/partner_details`;
  // const method = PartnerID ? "put" : "post";
  // const url = `${apiUrl}/partner_details`;
  // const method = "post";
  const updateurl = `${apiUrl}/partner_details_update/${PartnerID ? PartnerID : sessionStorage.getItem("PAT_ID")}`
  const submiturl = `${apiUrl}/partner_details`;
  const method = enable ? "put" : "post";
  const url = enable ? updateurl : submiturl;

  try {
    const response = await api({
      method,
      url,
      data: formData,
      // data: payload,
      headers: {
        // "Content-Type": "application/json",
        "Content-Type": "multipart/form-data",

      },
    });
    console.log(response, "responseresponse");
    sessionStorage.setItem("PAT_ID", response?.data?.id);
    setPartnerID(response?.data?.id ? response?.data?.id : PartnerID)
    GetPartnerData(dispatch);
    GetPartnerProfile(sessionStorage.getItem("PAT_ID") === null || sessionStorage.getItem("PAT_ID") === 'null' || sessionStorage.getItem("PAT_ID") === undefined || sessionStorage.getItem("PAT_ID") === 'undefined' ? PartnerID : sessionStorage.getItem("PAT_ID"), dispatch)
    return response.data ;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const submitPartnerAddressData = async (
  // addressvalues,
  // PartnerID,
  // dispatch
  PartnerID,values,currentValues
) => {
  // const payload = {
  //   temp_add: addressvalues.temp_address,
  //   temp_country: addressvalues.temp_country,
  //   temp_state: addressvalues.temp_state,
  //   temp_city: addressvalues.temp_city,
  //   temp_zip_code: addressvalues.temp_postal,
  //   perm_add: addressvalues.per_address,
  //   perm_country: addressvalues.per_country,
  //   perm_state: addressvalues.per_state,
  //   perm_city: addressvalues.per_city,
  //   perm_zip_code: addressvalues.per_postal,
  // };
  const payload = {
    temp_add: currentValues.address,
    temp_country: currentValues.country,
    temp_state: currentValues.state,
    temp_city: currentValues.city,
    temp_zip_code: currentValues.postalcode,
    temp_region : currentValues.region,
    perm_add: values.per_address,
    perm_country: values.per_country,
    perm_state: values.per_state,
    perm_city: values.per_city,
    perm_zip_code: values.per_postal,
    perm_region : values.per_region,
  };
  console.log(
    PartnerID,
    "updatedataupdatedataupdatedataupdatedataupdatedataupdatedataupdatedata"
  );
  // const url = updatedata
  //   ? `${apiUrl}/operator_details/${updatedata}`
  //   : "${apiUrl}/operator_details";

  // const method = updatedata ? "put" : "post";
  const url = `${apiUrl}/partner_address_details/${sessionStorage.getItem("PARTNER_ID")?sessionStorage.getItem("PARTNER_ID"):sessionStorage.getItem("PAT_ID")}`;
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

export const SubmitPatDocumentsData = async (
  documentsdata,
  PartnerID,
  dispatch
) => {
  const formData = new FormData();
  formData.append("aadhar_card_number", documentsdata.aadhar_number);
  formData.append("pan_card_number", documentsdata.pan_number);
  formData.append("aadhar_card_front", documentsdata.aadhar_fr_doc);
  formData.append("aadhar_card_back", documentsdata.aadhar_bk_doc);
  formData.append("pan_card_front", documentsdata.pan_fr_doc);
  formData.append("pan_card_back", documentsdata.pan_bk_doc);
  //formData.append("work_experience_certificate", documentsdata.work_exp_doc);

  const url = `${apiUrl}/partner-documents/${PartnerID ? PartnerID : sessionStorage.getItem("PARTNER_ID") ? sessionStorage.getItem("PARTNER_ID") : sessionStorage.getItem("PAT_ID") }`;
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
    return response.data || "Partner updated successfully";
  } catch (error) {
    handleError(error);
    return null;
  }
  finally{
    GetPartnerData(dispatch)
  }
};

export const GetPatAddressById = async (
  PartnerID,
  setPartnerID,
  setEmpAddressData
) => {
  try {
    const response = await api.get(
      `${apiUrl}/partner_address_details/${PartnerID}`
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
  setEmpProffesionalData,
  dispatch
) => {
  try {
    const response = await api.get(
      `${apiUrl}/emp-professional-details/${PartnerID}`
    );
    // dispatch({ type: PARTNER_DATA_BYID, payload: response.data });
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
    const response = await api.get(`${apiUrl}/partner_details/${PartnerID ? PartnerID : sessionStorage.getItem("PAT_ID")}`);
    console.log(response, "responseresponse_client");
    // SetUpdateData(null);
    setEmpPersonalData("");
    sessionStorage.setItem('PARTNER_ID', response.data?.tbs_partner_id)
    return response?.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const GetPatDocumentById = async (
  PartnerID,
  setPartnerID,
  setEmpDocumentlData,
  updatedata
) => {
  try {
    const response = await api.get(
      `${apiUrl}/partner-documents-details/${updatedata}`
    );
    console.log(response, "responseresponse");
    // SetUpdateData(null);
    //setEmpDocumentlData("");
    return response?.data;
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
