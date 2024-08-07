import axios from "axios";
import { CLIENT_DATA, GET_EMPLOYEE_LIST } from "../../Store/Type";
import { toast } from "react-toastify";
const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
const apiUrl = process.env.REACT_APP_API_URL;

export const GetClientData = async (dispatch) => {
  try {
    const response = await api.get(`${apiUrl}/All-client-details`);
    dispatch({ type: CLIENT_DATA, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    return null; // Return null or some default value to prevent throwing the error
  }
};
export const submitClientComapanyData = async (
  companyvalues,
  enable,
  EmployeeID,
  dispatch
) => {
  const payload = {
    company_name: companyvalues.company_name,
    owner_name: companyvalues.owner_name,
    phone: companyvalues.phone,
    alternate_phone: companyvalues.phone,
    emailid: companyvalues.emailid,
    type_of_constitution: companyvalues.constitution,
    business_background: companyvalues.business,
    web_url: companyvalues.web_url,
  };

  // const url = updatedata
  //   ? `${apiUrl}/operator_details/${updatedata}`
  //   : "${apiUrl}/operator_details";

  // const method = updatedata ? "put" : "post";
  const submiturl = `${apiUrl}/client-details`;
  const updateurl = `${apiUrl}/client-details/${
    EmployeeID ? EmployeeID : sessionStorage.getItem("EMP_ID")
  }`;
  const method = enable ? "put" : "post";
  const url = enable ? updateurl : submiturl;
  try {
    const response = await api({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
    GetClientData(dispatch);
    sessionStorage.setItem("CLI_ID", response?.data?.id);
    console.log(response, "responseresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};
export const SubmitClientAddressData = async (
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

  const method = "put";
  const url = `${apiUrl}/client-address/${
    operatorID ? operatorID : sessionStorage.getItem("CLI_ID")
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
    // GetOperatorData(dispatch);
    console.log(response, "responseresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};
export const SubmitClientGSTData = async (documentsdata, dispatch) => {
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
  const url = `${apiUrl}/client-gst/${sessionStorage.getItem("CLI_ID")}`;
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
    // GetSuperAdminData(dispatch);
    //   GetSuperAdminGSTById();
    // GetOperatorData(dispatch)
    console.log(response, "responseresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const GetClientGSTById = async (
  updatedata,
  SetUpdateData,
  setSuperAdminGSTData
) => {
  console.log(updatedata, "ahsgxdahsjksaxbj");
  const getid = sessionStorage.getItem("CLI_ID");
  try {
    const response = await api.get(
      `${apiUrl}/client-gst/${updatedata ? updatedata : getid}`
    );
    console.log(response, "responseresponse");
    // SetUpdateData(null);
    setSuperAdminGSTData(response.data);
    return response?.data[0];
  } catch (error) {
    handleError(error);
    return null;
  }
};
export const GetCompanyDetailsById = async (
  updatedata,
  SetUpdateData,
  setOfferData
) => {
  console.log(updatedata, "ahsgxdahsjksaxbj");
  try {
    const response = await api.get(`${apiUrl}/client-details/${updatedata}`);
    console.log(response, "responseresponse");
    // SetUpdateData(null);
    // setOfferData("");
    return response?.data[0];
  } catch (error) {
    handleError(error);
    return null;
  }
};
export const submitEmployeeProffesionalData = async (
  values,
  EmployeeID,
  dispatch
) => {
  const payload = {
    joining_date: values.join_date,
    designation: values.designation,
    branch: values.branch,
    official_email_id: values.emailid,
    years_of_experience: values.experiance,
    department: values.department,
    reporting_manager: values.report_manager,
  };

  const url = `${apiUrl}/emp-professional-details/${
    EmployeeID ? EmployeeID : sessionStorage.getItem("EMP_ID")
  }`;
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
    GetClientData(dispatch);
    console.log(response, "responseresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const SubmitEmpDocumentsData = async (
  documentsdata,
  EmployeeID,
  dispatch
) => {
  const formData = new FormData();
  formData.append("aadhar_card_doc", documentsdata.aadhar_doc);
  formData.append("pan_card_doc", documentsdata.pan_doc);
  formData.append("work_experience_certificate", documentsdata.work_exp_doc);
  formData.append("educational_certificate", documentsdata.edu_cer_doc);
  formData.append("other_documents", documentsdata.other_doc);
  formData.append("aadhar_card_number", documentsdata.aadhar_number);
  formData.append("pan_card_number", documentsdata.pan_number);

  const url = `${apiUrl}/emp-professional-documents/${
    EmployeeID ? EmployeeID : sessionStorage.getItem("EMP_ID")
  }`;
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
    GetClientData(dispatch);
    console.log(response, "responseresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const GetEmpAddressById = async (
  EmployeeID,
  setEmployeeID,
  setEmpAddressData
) => {
  try {
    const response = await api.get(
      `${apiUrl}/emp-registered-address/${
        EmployeeID ? EmployeeID : sessionStorage.getItem("EMP_ID")
      }`
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
export const GetEmpProffesionalById = async (
  EmployeeID,
  setEmployeeID,
  setEmpProffesionalData
) => {
  try {
    const response = await api.get(
      `${apiUrl}/emp-professional-details/${EmployeeID}`
    );
    console.log(response, "responseresponse");
    // SetUpdateData(null);
    setEmpProffesionalData("");
    return response?.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};
export const GetEmpPersonalById = async (
  EmployeeID,
  setEmployeeID,
  setEmpPersonalData
) => {
  try {
    const response = await api.get(
      `${apiUrl}/emp-personal-details/${
        EmployeeID ? EmployeeID : sessionStorage.getItem("EMP_ID")
      }`
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
export const GetEmpDocumentById = async (
  EmployeeID,
  setEmployeeID,
  setEmpDocumentlData
) => {
  try {
    const response = await api.get(
      `${apiUrl}/emp-personal-details/${EmployeeID}`
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
export const ClientStatusUpdateApi = async (
  valueid,
  value,
  currentid,
  dispatch
) => {
  const payload = {
    status_id: valueid,
    status: value,
  };

  const url = `${apiUrl}/client-company-details/${currentid}`;
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
    GetClientData(dispatch);
    console.log(response, "responseresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};
export const GetClientProfile = async (clientID) => {
  console.log(clientID, "operatorID852");
  try {
    const response = await axios.get(
      `${apiUrl}/client-profileImg/${
        clientID ? clientID : sessionStorage.getItem("CLI_ID")
      }`
    );
    // dispatch({ type: OPERATOR_LIST, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};
export const ClientProfile = async (image, clientID) => {
  console.log(image, "image987465222");
  const payload = new FormData();
  payload.append("profileimg", image);

  const updateurl = `${apiUrl}/client-profileImg/${
    clientID ? clientID : sessionStorage.getItem("CLI_ID")
  }`;

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
    GetClientProfile();
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
