import axios from "axios";
//import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { PRODUCT_OWNER_DATA } from "../../Store/Type";
import { GetNotificationData } from "../Notification/Notification";
const apiUrl = process.env.REACT_APP_API_URL;
// const apiUrl = 'http://192.168.90.47:4000/api'
const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});


export const ProductOwnerLogin = async (personalvalues, validationResult,dispatch) => {
  
  const emailpayload = {
    email_id: personalvalues.emailid_phone,
    password: personalvalues.password,
  };
  const phonepayload = {
    phone: personalvalues.emailid_phone,
    password: personalvalues.password,
  };
  // const url = `http://192.168.90.47:4000/api/product_owner_login`;
  const url = `${apiUrl}/product_owner_login`;
  const method = "post";
  const payload =
    validationResult === 1
      ? emailpayload
      : validationResult === 2
      ? phonepayload
      : "";

  try {
    const response = await axios({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response?.data?.error) {
      toast.warning(response.data.error);
    } else {
      sessionStorage.setItem("PRO_ID", response.data.id);
      sessionStorage.setItem("USER_ID", response.data.id);
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("user_name", response.data.user_name);
      sessionStorage.setItem("type_id", response.data.type_id);
      sessionStorage.setItem("type_name", response.data.type_name);
      sessionStorage.setItem("password", response.data.password);
      // localStorage.setItem("PRO_ID", response.data.id);
      // localStorage.setItem("USER_ID", response.data.id);
      // localStorage.setItem("token", response.data.token);
      // localStorage.setItem("user_name", response.data.user_name);
      // localStorage.setItem("type_id", response.data.type_id);
      // localStorage.setItem("type_name", response.data.type_name);
      // localStorage.setItem("password", response.data.password)
      // sessionStorage.getItem("PRO_ID")
      await GetNotificationData(dispatch)
      return response.data;
    }
  } catch (error) {
    if (error.response.data.error) {
      toast.warning(error.response.data.error);
    } else {
      console.log(error.response, "An error occurred. Please try again.");
    }
    return null;
  }
};

export const ProEmpLogin = async (personalvalues, validationResult) => {
  console.log(validationResult, "personalvalues");

  const emailpayload = {
    email_id: personalvalues.emailid_phone,
    password: personalvalues.password,
  };
  const phonepayload = {
    phone: personalvalues.emailid_phone,
    password: personalvalues.password,
  };
  const url = `${apiUrl}/pro-employee-login`;
  const method = "post";
  const payload =
    validationResult === 1
      ? emailpayload
      : validationResult === 2
      ? phonepayload
      : "";
  console.log(payload, "payloadpayloadpayload");
  try {
    const response = await axios({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const modulePermissions = response?.data?.module_permissions;
    const crudPermissions = response?.data?.crud_permissions;
    if (response.data) {
      sessionStorage.setItem("USER_ID", response.data.id);
      sessionStorage.setItem("PRO_ID", response.data.ownerId);
      sessionStorage.setItem("USER_ID", response.data.id);
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("user_name", response.data.user_name);
      sessionStorage.setItem("type_id", response.data.type_id);
      sessionStorage.setItem("type_name", response.data.type_name);
      sessionStorage.setItem("crud_permission",crudPermissions);
      sessionStorage.setItem(
        "module_permission",
        JSON.stringify(modulePermissions)
      );
      return response.data;
    } else {
      throw new Error("Invalid response from server");
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.warning(error.response.data.error);
    } else {
      toast.error("An error occurred. Please try again.");
    }
    return null;
  }
};

export const OpEmpLogin = async (personalvalues, validationResult) => {
  console.log(validationResult, "personalvalues");

  const emailpayload = {
    email_id: personalvalues.emailid_phone,
    password: personalvalues.password,
  };
  const phonepayload = {
    phone: personalvalues.emailid_phone,
    password: personalvalues.password,
  };
  const url = `${apiUrl}/employee-login`;
  const method = "post";
  const payload =
    validationResult === 1
      ? emailpayload
      : validationResult === 2
      ? phonepayload
      : "";
  console.log(payload, "payloadpayloadpayload");
  try {
    const response = await axios({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const modulePermissions = response?.data?.module_permissions;
    const crudPermissions = response?.data?.crud_permissions;
    if (response.data) {
      sessionStorage.setItem("USER_ID", response.data.id);
      sessionStorage.setItem("OP_ID", response.data.operatorId);
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("user_name", response.data.user_name);
      sessionStorage.setItem("type_id", response.data.type_id);
      sessionStorage.setItem("type_name", response.data.type_name);
      sessionStorage.setItem("crud_permission", crudPermissions);
      sessionStorage.setItem("module_permission", JSON.stringify(modulePermissions));
      sessionStorage.setItem("company_name",response.data.company_name)
      return response.data;
    } else {
      throw new Error("Invalid response from server");
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.warning(error.response.data.error);
    } else {
      toast.error("An error occurred. Please try again.");
    }
    return null;
  }
};

// export const OperatorLogin = async (loginvalues, updatedata) => {
//   const emailpayload = {
//     emailid: loginvalues.emailid,
//     password: loginvalues.password,
//   };
//   //   const phonepayload = {
//   //     phone: loginvalues.emailid,
//   //     password: loginvalues.password,
//   //   };
//   const url = `${apiUrl}/operator-login`;
//   const method = "post";

//   try {
//     const response = await api({
//       method,
//       url,
//       data: emailpayload,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     sessionStorage.setItem("SPA_ID", response?.data?.id);
//     sessionStorage.setItem("token", response?.data?.token);
//     console.log(response, "responseresponse");
//     return response.data;
//   } catch (error) {
//     if (error.response && error.response.data && error.response.data.error) {
//       toast.error(error.response.data.error);
//     } else {
//       toast.error("An error occurred. Please try again.");
//     }

//     handleError(error);
//     return null;
//   }
// };

export const OperatorLogin = async (values, validationResult) => {
  const payload = {
    emailid: values.emailid,
    password: values.password,
  };
  const url = `${apiUrl}/operator-login`;
  const method = "post";
  console.log(payload, "=== loginvalues");
  try {
    const response = await api({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response?.data?.error) {
      toast.warning(response.data.error);
    } else {
      console.log(response.data.token, "asdfghjkl");
      sessionStorage.setItem("SPA_ID", response.data.id);
      sessionStorage.setItem("USER_ID", response.data.id);
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("user_name", response.data.user_name);
      sessionStorage.setItem("type_id", response.data.type_id);
      sessionStorage.setItem("type_name", response.data.type_name);
      sessionStorage.setItem("user_name", response.data.owner_name);
      sessionStorage.setItem("company_name",response.data.company_name)
      return response?.data;
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.warning(error.response.data.error);
    } else {
      console.log(error.response, "An error occurred. Please try again.");
    }
    return null;
  }
};

export const PartnerLogin = async (values, validationResult) => {
  const emailpayload = {
    emailid: values.emailid_phone,
    password: values.password,
  };
  const phonepayload = {
    phone: values.emailid_phone,
    password: values.password,
  };
  const payload =
    validationResult === 1
      ? emailpayload
      : validationResult === 2
      ? phonepayload
      : "";
  const url = `${apiUrl}/partner-login`;
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

    if (response?.data?.error) {
      toast.warning(response.data.error);
    } else {
      sessionStorage.setItem("SPA_ID", response.data.id);
      sessionStorage.setItem("USER_ID", response.data.id);
      sessionStorage.setItem("token", response.data.token);
      // sessionStorage.setItem("user_name", response.data.user_name);
      sessionStorage.setItem("type_id", response.data.type_id);
      sessionStorage.setItem("type_name", response.data.type_name);
      sessionStorage.setItem("user_name", response.data.user_name);
      return response?.data;
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.warning(error.response.data.error);
    } else {
      toast.error("An error occurred. Please try again.");
    }
    return null;
  }
};

export const GetProductOwnerData = async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/product_owners`);
    dispatch({ type: PRODUCT_OWNER_DATA, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
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
