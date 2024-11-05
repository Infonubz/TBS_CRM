import axios from "axios";
import { GET_EMPLOYEE_LIST } from "../../Store/Type";
import { toast } from "react-toastify";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

const apiUrl = process.env.REACT_APP_API_URL;

const user = localStorage.getItem("USER_ID");

export const GetEmployeeData = async (dispatch) => {
  const endpoint = user?.startsWith("tbs-pro")
    ? `${apiUrl}/pro-All-emp-details`
    : `${apiUrl}/All-emp-details`;

  try {
    const response = await api.get(endpoint);
    dispatch({ type: GET_EMPLOYEE_LIST, payload: response.data });
    console.log(response, "---employee data");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const handleEmployeeSearch = async (e, dispatch) => {
  try {
    if (e.target.value) {
      const response = await api.get(
        `${apiUrl}/proemp-search/${e.target.value}`
      );
      dispatch({ type: GET_EMPLOYEE_LIST, payload: response.data });
      return response.data[0];
    } else {
      GetEmployeeData(dispatch);
    }
  } catch (error) {
    handleError(error);
  }
};

export const EmployeeStatusUpdateApi = async (
  valueid,
  value,
  employeeid,
  dispatch
) => {
  const payload = {
    emp_status_id: valueid,
    emp_status: value,
  };

  const url = user.startsWith("tbs-pro")
    ? `${apiUrl}/pro-emp-status/${employeeid}`
    : `${apiUrl}/emp-status/${employeeid}`;

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
    GetEmployeeData(dispatch);
    console.log(response, "responseresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const submitPersonalData = async (
  personalvalues,
  enable,
  EmployeeID,
  dispatch
) => {
  const dynamicId = user?.startsWith("tbs-pro") ? "owner_id" : "tbs_operator_id";
  // const payload = {
  //   emp_first_name: personalvalues.firstname,
  //   emp_last_name: personalvalues.lastname,
  //   phone: personalvalues.phone,
  //   email_id: personalvalues.emailid,
  //   alternate_phone: personalvalues.alt_phone,
  //   date_of_birth: personalvalues.dob,
  //   gender: personalvalues.gender,
  //   blood_group: personalvalues.blood,
  //   role_type: personalvalues.role,
  //   role_type_id: personalvalues.role_id,
  //   [dynamicId]: sessionStorage.getItem("USER_ID")
  // };

  const formData = new FormData();

  formData.append("emp_first_name", personalvalues.firstname);
  formData.append("emp_last_name", personalvalues.lastname);
  formData.append("phone", personalvalues.phone);
  formData.append("email_id", personalvalues.emailid);
  formData.append("alternate_phone", personalvalues.alt_phone);
  formData.append("date_of_birth", personalvalues.dob);
  formData.append("gender", personalvalues.gender);
  formData.append("blood_group", personalvalues.blood);
  formData.append("role_type", personalvalues.role);
  formData.append("role_type_id", personalvalues.role_id);
  formData.append("profile_img", personalvalues.profile_img);
  formData.append("owner_id", localStorage.getItem("USER_ID"));

  // Now `formData` is ready to be used

  // const url = updatedata
  //   ? `${apiUrl}/operator_details/${updatedata}`
  //   : "${apiUrl}/operator_details";

  // const method = updatedata ? "put" : "post";
  const submiturl = user?.startsWith("tbs-pro")
    ? `${apiUrl}/pro-emp-personal-details`
    : `${apiUrl}/emp-personal-details`;
  const updateurl = user?.startsWith("tbs-pro")
    ? `${apiUrl}/pro-emp-personal-details/${EmployeeID}`
    : `${apiUrl}/emp-personal-detail/${EmployeeID}`;

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
        "Content-Type": "multipart/form-data",

      },
    });
    GetEmployeeData(dispatch);
    sessionStorage.setItem("EMP_ID", response?.data?.id);
    console.log(response, "responseresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const submitEmployeeAddressData = async (
  addressvalues,
  EmployeeID,
  dispatch
) => {
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

  // const url = updatedata
  //   ? `${apiUrl}/operator_details/${updatedata}`
  //   : "${apiUrl}/operator_details";

  // const method = updatedata ? "put" : "post";

  const url = user.startsWith("tbs-pro")
    ? `${apiUrl}/pro-emp-registered-address/${EmployeeID ? EmployeeID : sessionStorage.getItem("EMP_ID")
    }`
    : `${apiUrl}/emp-registered-address/${EmployeeID ? EmployeeID : sessionStorage.getItem("EMP_ID")
    }`;

  // const url = `${apiUrl}/pro-emp-registered-address/${
  //   EmployeeID ? EmployeeID : sessionStorage.getItem("EMP_ID")
  // }`;

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
    GetEmployeeData(dispatch);
    console.log(response, "responseresponse");
    return response.data;
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

  // const url = `${apiUrl}/pro-emp-professional-details/${
  //   EmployeeID ? EmployeeID : sessionStorage.getItem("EMP_ID")
  // }`;

  const url = user.startsWith("tbs-pro")
    ? `${apiUrl}/pro-emp-professional-details/${EmployeeID ? EmployeeID : sessionStorage.getItem("EMP_ID")
    }`
    : `${apiUrl}/emp-professional-details/${EmployeeID ? EmployeeID : sessionStorage.getItem("EMP_ID")
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
    GetEmployeeData(dispatch);
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

  const url = user.startsWith("tbs-pro")
    ? `${apiUrl}/pro-emp-professional-documents/${EmployeeID ? EmployeeID : sessionStorage.getItem("EMP_ID")
    }`
    : `${apiUrl}/emp-professional-documents/${EmployeeID ? EmployeeID : sessionStorage.getItem("EMP_ID")
    }`;

  // const url = `${apiUrl}/pro-emp-professional-documents/${
  //   EmployeeID ? EmployeeID : sessionStorage.getItem("EMP_ID")
  // }`;

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
    GetEmployeeData(dispatch);
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
  const endpoint = user.startsWith("tbs-pro")
    ? `${apiUrl}/pro-emp-registered-address/${EmployeeID ? EmployeeID : sessionStorage.getItem("EMP_ID")
    }`
    : `${apiUrl}/emp-registered-address/${EmployeeID ? EmployeeID : sessionStorage.getItem("EMP_ID")
    }`;

  try {
    const response = await api.get(endpoint);
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
  const endpoint = user.startsWith("tbs-pro")
    ? `${apiUrl}/pro-emp-professional-details/${EmployeeID}`
    : `${apiUrl}/emp-professional-details/${EmployeeID}`;

  try {
    const response = await api.get(endpoint);
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
  const endpoint = user?.startsWith("tbs-pro")
    ? `${apiUrl}/pro-emp-personal-details/${EmployeeID ? EmployeeID : sessionStorage.getItem("EMP_ID")
    }`
    : `${apiUrl}/emp-personal-details/${EmployeeID ? EmployeeID : sessionStorage.getItem("EMP_ID")
    }`;

  try {
    const response = await api.get(endpoint);
    console.log(response, "responseresponse");
    // SetUpdateData(null);
    setEmpPersonalData("");
    console.log(response,"ressssssssss");
    
    // sessionStorage.setItem('EmployeeProfileImg', response.data[0].profile_img)
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
  const endpoint = user.startsWith("tbs-pro")
    ? `${apiUrl}/pro-emp-professional-documents/${EmployeeID}`
    : `${apiUrl}/emp-documents-only/${EmployeeID}`;

  try {
    const response = await api.get(endpoint);
    console.log(response, "responseresponse");
    // SetUpdateData(null);
    setEmpDocumentlData("");
    return response?.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const GetProductOwnerEmployee = async () => {
  try {
    const response = await api.get(`${apiUrl}/role`);
    // GetEmployeeData(dispatch);
    console.log(response, "responseresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const GetOwnerEmployeeProfile = async (EmployeeID) => {
  console.log(EmployeeID, "operatorID852");

  const endpoint = user.startsWith("tbs-pro")
    ? `${apiUrl}/pro-emp-ProfileImg/${EmployeeID}`
    : `${apiUrl}/emp-profileImg/${EmployeeID}`;

  try {
    const response = await axios.get(endpoint);
    // dispatch({ type: OPERATOR_LIST, payload: response.data });
    console.log(response, "response");
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};

export const SubmitEmployeeExcel = async (file) => {
  const formData = new FormData();
  formData.append("xlsxFile", file);
  const excelEndpoint = `${apiUrl}/pro-employee-importExcel`;
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

export const OwnerEmployeeProfile = async (image, EmployeeID) => {
  console.log(image, "image987465222");

  const payload = new FormData();
  payload.append("profile_img", image);

  const updateurl = user.startsWith("tbs-pro")
    ? `${apiUrl}/pro-emp-profileImg/${EmployeeID}`
    : `${apiUrl}/emp-profileImg/${EmployeeID}`;


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
    GetOwnerEmployeeProfile();
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

// import axios from "axios";
// import { toast } from "react-toastify";
// import { GET_EMPLOYEE_LIST } from "../../Store/Type";

// const api = axios.create({
//   baseURL: "${apiUrl}", // Set base URL once
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// const handleError = (error) => {
//   console.error("Error details:", error);
//   let errorMessage = "An error occurred";

//   if (error.response) {
//     console.error("Error response from server:", error.response);
//     errorMessage = `Server responded with status ${error.response.status}`;
//   } else if (error.request) {
//     console.error("No response received:", error.request);
//     errorMessage = "No response received from server";
//   } else {
//     console.error("Error setting up request:", error.message);
//     errorMessage = error.message;
//   }

//   if (error.code === "ERR_NETWORK") {
//     errorMessage =
//       "Network Error: Unable to connect to the server. Please check the server status and your network connection.";
//   }

//   toast.error(errorMessage);
// };

// export const GetEmployeeData = async (dispatch) => {
//   try {
//     const response = await api.get("/emp-personal-details");
//     dispatch({ type: GET_EMPLOYEE_LIST, payload: response.data });
//     return response.data;
//   } catch (error) {
//     handleError(error);
//     return null; // Return null or some default value to prevent throwing the error
//   }
// };

// const submitData = async (url, payload, method) => {
//   try {
//     const response = await api({
//       method,
//       url,
//       data: payload,
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     sessionStorage.setItem("EMP_ID", response.data.id);
//     console.log(response, "responseresponse55");
//     return response.data;
//   } catch (error) {
//     handleError(error);
//     return null;
//   }
// };

// export const submitPersonalData = async (personalvalues, updatedata) => {
//   const url = `/emp-personal-details`;
//   const method = "post";
//   const payload = {
//     emp_first_name: personalvalues.firstname,
//     emp_last_name: personalvalues.lastname,
//     phone: personalvalues.phone,
//     email_id: personalvalues.emailid,
//     alternate_phone: personalvalues.alt_phone,
//     date_of_birth: personalvalues.dob,
//     gender: personalvalues.gender,
//     blood_group: personalvalues.blood,
//   };

//   return submitData(url, payload, method);
// };

// export const submitEmployeeAddressData = async (addressvalues, updatedata) => {
//   const url = `/emp-registered-address/${sessionStorage.getItem("EMP_ID")}`;
//   const method = "put";
//   const payload = {
//     temp_add: addressvalues.temp_address,
//     temp_country: addressvalues.temp_country,
//     temp_state: addressvalues.temp_state,
//     temp_city: addressvalues.temp_city,
//     temp_zip_code: addressvalues.temp_postal,
//     perm_add: addressvalues.per_address,
//     perm_country: addressvalues.per_country,
//     perm_state: addressvalues.per_state,
//     perm_city: addressvalues.per_city,
//     perm_zip_code: addressvalues.per_postal,
//   };

//   return submitData(url, payload, method);
// };

// export const submitEmployeeProffesionalData = async (
//   professionalvalues,
//   updatedata
// ) => {
//   const url = `/emp-professional-details/${sessionStorage.getItem("EMP_ID")}`;
//   const method = "put";
//   const payload = {
//     joining_date: professionalvalues.joining_date,
//     designation: professionalvalues.designation,
//     branch: professionalvalues.branch,
//     official_email_id: professionalvalues.official_email_id,
//     years_of_experience: professionalvalues.years_of_experience,
//     department: professionalvalues.department,
//     reporting_manager: professionalvalues.reporting_manager,
//   };

//   return submitData(url, payload, method);
// };

// const getDataById = async (url) => {
//   try {
//     const response = await api.get(url);
//     return response.data[0];
//   } catch (error) {
//     handleError(error);
//     return null;
//   }
// };

// export const GetEmpAddressById = async (EmployeeID) => {
//   const url = `/emp-registered-address/${EmployeeID}`;
//   return getDataById(url);
// };

// export const GetEmpProffesionalById = async (EmployeeID) => {
//   const url = `/emp-professional-details/${EmployeeID}`;
//   return getDataById(url);
// };

// export const GetEmpPersonalById = async (EmployeeID) => {
//   const url = `/emp-personal-details/${EmployeeID}`;
//   return getDataById(url);
// };

// export const GetEmpDocumentById = async (EmployeeID) => {
//   const url = `/emp-professional-documents/${EmployeeID}`;
//   return getDataById(url);
// };
