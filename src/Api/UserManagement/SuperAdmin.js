import axios from "axios";
import { OPERATOR_LIST, SUPER_ADMIN_LIST } from "../../Store/Type";
import { toast } from "react-toastify";
const apiUrl = process.env.REACT_APP_API_URL;

const Get_Super_Admin_Url = `${apiUrl}/Operators-withAll-data`;
console.log(apiUrl, "apiUrlapiUrl555");
const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
export const GetOperatorData = async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/Operators-withAll-data`);
    dispatch({ type: OPERATOR_LIST, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};
export const GetSuperAdminData = async (dispatch) => {
  try {
    const response = await api.get(`${apiUrl}/Operators-withAll-data`);
    dispatch({ type: SUPER_ADMIN_LIST, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    return null; // Return null or some default value to prevent throwing the error
  }
};
export const SubmitCompanyData = async (
  companyvalue,
  operatorID,
  enable,
  dispatch
) => {
  // console.log(companyvalue.file, "companyvalue.file");F
  // const formData = new FormData();
  // formData.append("company_name", companyvalue.companyname);
  // formData.append("owner_name", companyvalue.ownername);
  // formData.append("phone", companyvalue.phone);
  // formData.append("alternate_phone", companyvalue.phone);
  // formData.append("emailid", companyvalue.emailid);
  // formData.append("alternate_emailid", companyvalue.emailid);
  // formData.append("aadharcard_number", companyvalue.aadhar);
  // // formData.append("aadardoc", companyvalue.aadardoc);
  // formData.append("pancard_number", companyvalue.pan);
  // formData.append("profileimg", companyvalue.pancarddoc);
  // formData.append("user_status", "draft");
  // formData.append("req_status", "pending");
  // formData.append("user_status_id", 0);
  // formData.append("req_status_id", 0);
  const payload = {
    company_name: companyvalue.companyname,
    owner_name: companyvalue.ownername,
    phone: companyvalue.phone,
    alternate_phone: companyvalue.phone,
    emailid: companyvalue.emailid,
    alternate_emailid: companyvalue.emailid,
    aadharcard_number: companyvalue.aadhar,
    pancard_number: companyvalue.pan,
    user_status: "draft",
    req_status: "pending",
    user_status_id: 0,
    req_status_id: 0,
  };
  console.log(operatorID, "operatorIDoperatorIDoperatorID");
  const updateurl = `${apiUrl}/operator/${
    operatorID ? operatorID : sessionStorage.getItem("SPA_ID")
  }`;
  const submiturl = `${apiUrl}/operators`;
  // const method = operatorID ? "put" : "post";
  const method = enable ? "put" : "post";
  const url = enable ? updateurl : submiturl;
  try {
    const response = await api({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
      },
    });
    sessionStorage.setItem("SPA_ID", response?.data?.id);
    GetOperatorData(dispatch);
    console.log(response, "responseresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const SubmitAddressData = async (
  addressvalue,
  operatorID,
  enable,
  dispatch
) => {
  const payload = {
    address: addressvalue.address,
    state: addressvalue.state,
    region: addressvalue.region,
    city: addressvalue.city,
    country: addressvalue.country,
    zip_code: addressvalue.postal,
    state_id: "TN",
    country_id: "IN",
    city_id: "39",
  };

  // const url = updatedata
  //   ? `${apiUrl}/operator_details/${updatedata}`
  //   : "${apiUrl}/operator_details";

  const method = enable ? "put" : "post";
  const url = `${apiUrl}/operator_details/${
    operatorID ? operatorID : sessionStorage.getItem("SPA_ID")
  }`;
  // const method ="post";
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
export const SubmitBusinessData = async (
  businessvalues,
  operatorID,
  enable,
  dispatch
) => {
  const payload = {
    type_of_constitution: businessvalues.constitution,
    business_background: businessvalues.business,
    msme_type: businessvalues.msme,
    msme_number: businessvalues.msme_number,
    type_of_service: businessvalues.service,
    currency_code: businessvalues.country_code,
  };

  // const url = updatedata
  //   ? `${apiUrl}/operator_details/${updatedata}`
  //   : "${apiUrl}/operator_details";

  // const method = updatedata ? "put" : "post";
  const url = `${apiUrl}/operator_details/${
    operatorID ? operatorID : sessionStorage.getItem("SPA_ID")
  }`;
  // const method = "post";
  const method = enable ? "put" : "post";
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
export const SubmitDocumentsData = async (
  documentsdata,
  operatorID,
  enable,
  dispatch
) => {
  const formData = new FormData();
  formData.append("aadar_front_doc", documentsdata.aadhar_front);
  formData.append("aadar_back_doc", documentsdata.aadhar_back);
  formData.append("pancard_front_doc", documentsdata.pan_front);
  formData.append("pancard_back_doc", documentsdata.pan_back);
  formData.append("msme_doc", documentsdata.msme_doc);

  const url = `${apiUrl}/operator_details/${
    operatorID ? operatorID : sessionStorage.getItem("SPA_ID")
  }`;
  const method = enable ? "put" : "post";

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
export const SubmitProfileData = async (
  filedata,
  operatorID,
  enable,
  dispatch
) => {
  const formData = new FormData();
  formData.append("profileimg", filedata);

  const url = `${apiUrl}/operator-profileImg/${
    operatorID ? operatorID : sessionStorage.getItem("SPA_ID")
  }`;
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
    GetOperatorData(dispatch);
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};
export const SubmitGSTData = async (documentsdata, dispatch) => {
  console.log(documentsdata, "documentsdata");
  const formData = new FormData();
  formData.append(
    "aggregate_turnover_exceeded",
    documentsdata.ctc == "1" || 1 ? "true" : "false"
  );
  formData.append("state_name", documentsdata.state);
  formData.append("state_code_number", 30);
  formData.append("gstin", documentsdata.gst);
  formData.append("head_office", documentsdata.head_office);
  formData.append("upload_gst", documentsdata.gst_file);
  formData.append("has_gstin", "true");

  // const url = updatedata
  //   ? `${apiUrl}/offers-deals/${updatedata}`
  //   : "${apiUrl}/operators";
  // const method = updatedata ? "put" : "post";
  const url = `${apiUrl}/operator_details/${sessionStorage.getItem("SPA_ID")}`;
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
    // GetSuperAdminData(dispatch);
    GetSuperAdminGSTById();
    // GetOperatorData(dispatch)
    console.log(response, "responseresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};
export const GetSuperAdminById = async (
  updatedata,
  SetUpdateData,
  setOfferData
) => {
  console.log(updatedata, "ahsgxdahsjksaxbj");
  try {
    const response = await api.get(`${apiUrl}/operators/${updatedata}`);
    console.log(response, "responseresponse");
    // SetUpdateData(null);
    // setOfferData("");
    return response?.data[0];
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const GetSuperAdminAddressById = async (
  OperatorID,
  setOperatorID,
  setSuperAdminAddressData
) => {
  try {
    const response = await api.get(
      `${apiUrl}/getall-address/${
        OperatorID ? OperatorID : sessionStorage.getItem("SPA_ID")
      }`
    );
    console.log(response, "responseresponse");
    // SetUpdateData(null);
    setSuperAdminAddressData("");
    return response?.data[0];
  } catch (error) {
    handleError(error);
    return null;
  }
};
export const GetSuperAdminBusinessById = async (
  OperatorID,
  SetUpdateData,
  setOfferData
) => {
  try {
    const response = await api.get(
      `${apiUrl}/get-business/${
        OperatorID ? OperatorID : sessionStorage.getItem("SPA_ID")
      }`
    );
    console.log(response, "responseresponse");
    // SetUpdateData(null);
    setOfferData("");
    return response?.data[0];
  } catch (error) {
    handleError(error);
    return null;
  }
};
export const GetSuperAdminDocumentById = async (
  updatedata,
  SetUpdateData,
  setOfferData
) => {
  console.log(updatedata, "ahsgxdahsjksaxbj");
  const getid = sessionStorage.getItem("SPA_ID");
  try {
    const response = await api.get(
      `${apiUrl}/get-Docs/${updatedata ? updatedata : getid}`
    );
    console.log(response, "responseresponse");
    // SetUpdateData(null);
    setOfferData("");
    return response?.data[0];
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const GetSuperAdminGSTById = async (
  updatedata,
  SetUpdateData,
  setOfferData
) => {
  console.log(updatedata, "ahsgxdahsjksaxbj");
  const getid = sessionStorage.getItem("SPA_ID");
  try {
    const response = await api.get(
      `${apiUrl}/get-GST/${updatedata ? updatedata : getid}`
    );
    console.log(response, "responseresponse");
    // SetUpdateData(null);
    setOfferData("");
    return response?.data[0];
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const GetOperatorById = async (
  OperatorID,
  setOperatorID,
  setSuperAdminData
) => {
  try {
    const response = await api.get(
      `${apiUrl}/operators/${
        OperatorID ? OperatorID : sessionStorage.getItem("SPA_ID")
      }`
    );
    console.log(response, "responseresponse");
    // SetUpdateData(null);
    setSuperAdminData("");
    return response?.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};
export const GetOperatorProfile = async (operatorID) => {
  console.log(operatorID, "operatorID852");
  try {
    const response = await axios.get(
      `${apiUrl}/operators-profileImg/${
        operatorID ? operatorID : sessionStorage.getItem("SPA_ID")
      }`
    );
    // dispatch({ type: OPERATOR_LIST, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};
export const OperatorProfile = async (image) => {
  console.log(image, "image987465222");
  const payload = new FormData();
  payload.append("profileimg", image);

  const updateurl = `${apiUrl}/operator-profileImg/${sessionStorage.getItem(
    "SPA_ID"
  )}`;

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
    GetOperatorProfile();
    console.log(response, "responseresponse");
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

  toast.error(errorMessage);
};
