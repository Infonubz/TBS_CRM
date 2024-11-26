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

export const handleClientSearch = async (e, dispatch) => {
  try {
    if (e.target.value) {
      const response = await api.get(`${apiUrl}/client-search/${e.target.value}`);
      dispatch({ type: CLIENT_DATA, payload: response.data })
      return response.data[0];
    }
    else {
      GetClientData(dispatch);
    }
  } catch (error) {
    handleError(error);
  }
}

export const SubmitClientExcel = async (file) => {
  const formData = new FormData();
  formData.append("xlsxFile", file);

  const excelEndpoint = `${apiUrl}/upload`;
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
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    toast.error("Failed to upload file");
    return null;
  }
};


export const submitClientComapanyData = async (
  companyvalues,
  enable,
  clientID,
  dispatch,
  fileList,
  setCurrentId,
  currentId,
  setClientID
) => {
  // const payload = {
  //   company_name: companyvalues.company_name,
  //   owner_name: companyvalues.owner_name,
  //   phone: companyvalues.phone,
  //   alternate_phone: companyvalues.phone,
  //   emailid: companyvalues.emailid,
  //   type_of_constitution: companyvalues.constitution,
  //   business_background: companyvalues.business,
  //   web_url: companyvalues.web_url,
  // };

  const formData = new FormData();

  formData.append("company_name", companyvalues.company_name);
  formData.append("owner_name", companyvalues.owner_name);
  formData.append("phone", companyvalues.phone);
  formData.append("alternate_phone", companyvalues.phone); // Note: same as phone
  formData.append("emailid", companyvalues.emailid);
  formData.append("type_of_constitution", companyvalues.constitution);
  formData.append("business_background", companyvalues.business);
  formData.append("web_url", companyvalues.web_url);
  if (fileList[0]?.originFileObj) {
    formData.append("company_logo", fileList[0].originFileObj);
}


  // Now `formData` is ready to be used

  // const url = updatedata
  //   ? `${apiUrl}/operator_details/${updatedata}`
  //   : "${apiUrl}/operator_details";

  // const method = updatedata ? "put" : "post";
  const submiturl = `${apiUrl}/client-details`;
  const updateurl = `${apiUrl}/client-details/${clientID ? clientID : sessionStorage.getItem("EMP_ID")
    }`;
  const method = enable ? "put" : "post";
  const url = enable ? updateurl : submiturl;
  try {
    const response = await api({
      method,
      url,
      // data: payload,
      data: formData,
      headers: {
        // "Content-Type": "application/json",
        "Content-Type": "multipart/form-data"
      },
    });
    sessionStorage.setItem("CLI_ID", response?.data?.id);
    setCurrentId(response?.data?.id)
    setClientID(response?.data?.id ? response?.data?.id : clientID)
    GetClientData(dispatch);
    GetClientProfile(sessionStorage.getItem("CLI_ID") === null || sessionStorage.getItem("CLI_ID") === 'null' || sessionStorage.getItem("CLI_ID") === undefined || sessionStorage.getItem("CLI_ID") === 'undefined' ? clientID : sessionStorage.getItem("CLI_ID"), dispatch)
    console.log(response, "responseresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};


export const SubmitClientAddressData = async (
  addressvalue,
  clientID,
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
  const url = `${apiUrl}/client-address/${clientID ? clientID : sessionStorage.getItem("CLI_ID")
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
    GetClientData(dispatch);
    console.log(response, "responseresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};


export const SubmitClientGSTData = async (documentsdata, clientID, setSuperAdminGSTData, dispatch) => {
  console.log(documentsdata, "documentsdata");
  const getid =  sessionStorage.getItem("CLIENT_ID")?sessionStorage.getItem("CLIENT_ID") : sessionStorage.getItem("CLI_ID");

  const formData = new FormData();
  formData.append(
    "aggregate_turnover_exceeded",
    documentsdata.ctc == "1" || 1 ? "true" : "false"
  );
  formData.append("state_name", documentsdata.state);
  formData.append("state_code_number", documentsdata.state_code);
  formData.append("gstin", documentsdata.gst);
  formData.append("head_office", documentsdata.head_office);
  formData.append("upload_gst", documentsdata.gst_file);
  formData.append("has_gstin", "true");

  // const url = clientID
  //   ? `${apiUrl}/client-gst/${clientID}`
  //   : `${apiUrl}/client-gst`;
  // const method = clientID ? "put" : "post";

  const url = `${apiUrl}/client-gst/${getid}`;
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
    //GetClientData(dispatch);
    setSuperAdminGSTData("");
    GetClientGSTById(clientID,clientID,setSuperAdminGSTData)
    //   GetSuperAdminGSTById();
    // GetOperatorData(dispatch)
    console.log(response, "responseresponse");
    return response.data ;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const GetClientGSTById = async (
  clientID,
  setClientID,
  setSuperAdminGSTData
) => {
  console.log(clientID, "ahsgxdahsjksaxbj");
  const getid = sessionStorage.getItem("CLIENT_ID") ? sessionStorage.getItem("CLIENT_ID") : sessionStorage.getItem("CLI_ID");
  try {
    const response = await api.get(
      `${apiUrl}/client-gst/${getid}`
    );
    console.log(response, "responseresponse");
    // setOperatorID(null);
    setSuperAdminGSTData && setSuperAdminGSTData(response.data);
    return response?.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};


export const GetCompanyDetailsById = async (
  clientID,
  setClientID,
  setClientData
) => {
  console.log(clientID, "ahsgxdahsjksaxbj");
  try {
    const response = await api.get(`${apiUrl}/client-details/${clientID ? clientID : sessionStorage.getItem('CLI_ID')}`);
    console.log(response, "responseresponse_client");
    sessionStorage.setItem('CLIENT_ID', response.data[0]?.tbs_client_id)
    // setClientID(response.data[0]?.tbs_client_id);
    setClientData("");
    return response?.data[0];
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const GetClientAddressById = async (
  clientID,
  setClientID,
  setClientAddress
) => {
  console.log(clientID, "ahsgxdahsjksaxbj");
  try {
    const response = await api.get(`${apiUrl}/client-address/${clientID}`);
    console.log(response, "responseresponse");
    //setClientID(null);
    setClientAddress("");
    return response?.data;
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

  const url = `${apiUrl}/emp-professional-details/${EmployeeID ? EmployeeID : sessionStorage.getItem("EMP_ID")
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

  const url = `${apiUrl}/emp-professional-documents/${EmployeeID ? EmployeeID : sessionStorage.getItem("EMP_ID")
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
      `${apiUrl}/emp-registered-address/${EmployeeID ? EmployeeID : sessionStorage.getItem("EMP_ID")
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
      `${apiUrl}/emp-personal-details/${EmployeeID ? EmployeeID : sessionStorage.getItem("EMP_ID")
      }`
    );
    console.log(response, "responseresponse ");

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
    // const response = await axios.get(
    //   `${apiUrl}/client-profileImg/${clientID !== undefined || clientID != null || clientID !== 'null' ? clientID : sessionStorage.getItem('CLIENT_ID')}`
    // );
    const response = await axios.get(
      `${apiUrl}/client-profileImg/${clientID ? clientID : sessionStorage.getItem('CLI_ID') ? sessionStorage.getItem('CLI_ID') : sessionStorage.getItem('CLIENT_ID')}`
    );
    console.log(response, "response_get_profile");
    sessionStorage.setItem('ClientCompanyLogo', response.data?.company_logo)
    // dispatch({ type: OPERATOR_LIST, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};


// export const ClientProfile = async (image, clientID) => {
//   console.log(image, "image987465222");
//   const payload = new FormData();
//   payload.append("profile_img", image);

//   const updateurl = `${apiUrl}/client-profileImg/${clientID}`;

//   const method = "put";
//   try {
//     const response = await api({
//       method,
//       url: updateurl,
//       data: payload,
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     GetClientProfile();
//     console.log(response, "responseresponse");
//     return response.data;
//   } catch (error) {
//     handleError(error);
//     return null;
//   }
// };
export const ClientProfile = async (image, clientID, dispatch) => {
  console.log(image, "image987465222");
  const payload = new FormData();
  payload.append("profile_img", image);

  const updateurl = `${apiUrl}/client-profileImg/${clientID}`;

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
    GetClientProfile(clientID);
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
