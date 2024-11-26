import axios from "axios";
import { GET_RECENT_OFFERS, OFFERS_LIST } from "../../Store/Type";
import { toast } from "react-toastify";
import { GetEmployeeData } from "../UserManagement/Employee";
import { GetOperatorData } from "../UserManagement/SuperAdmin";
import { GetPartnerData } from "../UserManagement/Partner";
import { GetAdsData } from "../Ads/Ads";
import { GetPromotionData } from "../Promotion/Promotion";
import { GetClientData } from "../UserManagement/Client";
import { GetRedeemOffersData } from "./RedeemOffers";
import { GetRolesData } from "../Role&Responsibilites/ActiveRoles";
import { GetPermissionCount, GetPermissionData } from "../Role&Responsibilites/ActivePermission";
const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
const apiUrl = process.env.REACT_APP_API_URL;

export const GetOffersData = async (dispatch) => {
  try {
    // const response = await axios.get(`${apiUrl}/offers-deals-occupation/${occuTab}`);
    const response = await axios.get(`${apiUrl}/offers-deals`);
    dispatch({ type: OFFERS_LIST, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};
export const Deleteall = async (api, dispatch, module, filter, setPermission) => {
  try {
    const response = await axios.delete(api);
    console.log(module === "offer", "responsedata5555");
    toast.success(response.data);
    if (module === "operator") {
      GetOperatorData(dispatch);
      toast.success(response?.data?.message);
      console.log(response.data, "response.dataresponse.data");
    } else if (module === "employee") {
      GetEmployeeData(dispatch);
    } else if (module === "partner") {
      GetPartnerData(dispatch);
    } else if (module === "offer") {
      GetOffersData(dispatch);
    } else if (module === "ads") {
      GetAdsData(dispatch);
    } else if (module === "promotion") {
      GetPromotionData(dispatch);
    } else if (module === "client") {
      GetClientData(dispatch);
    } else if (module === "redeemoffer") {
      GetRedeemOffersData(dispatch);
    }
    else if (module === "roles") {
      GetRolesData(filter, dispatch);
    }
    else if(module === "permissions"){
      setPermission(true);
      GetPermissionData(filter, dispatch);
      GetPermissionCount(filter, dispatch);
    }
    else {
      console.log("testt");
    }
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

// export const SubmitOfferExcel = async (file) => {
//   const formData = new FormData();
//   formData.append("xlsxFile", file);

//   const excelEndpoint = `${apiUrl}/offers-deals-importExcel`;
//   const method = "post";

//   try {
//     const response = await api({
//       url: excelEndpoint,
//       method: method,
//       data: formData,
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     if (response.data === "Error processing file") {
//       toast.error("Error processing file");
//     }
//     else {
//       toast.success(response.data);
//     }
//     console.log(response.data, 'multipartformdata')
//     return response.data;
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     toast.error("Failed to upload file");
//     return null;
//   }
// };

export const SubmitOfferExcel = async (file) => {
  const formData = new FormData();
  formData.append("xlsxFile", file);
  const excelEndpoint = `${apiUrl}/offers-deals-importExcel`;
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

    console.log("Offers_Response", response);

    if (response.status >= 200 && response.status < 300) {
      if (typeof response.data === "string" && response.data.includes("Error")) {
        toast.error(response.data); // Use the actual error message
      } else {
        toast.success(response.data);
      }
    }
    // else {
    //   // Handle non-2xx status codes
    //   toast.error("Failed to upload file: " + response.statusText);
    //   throw new Error(`Failed with status: ${response.status}`);
    // }
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    toast.error("Failed to upload file");
    return null;
  }
};


export const SubmitOffersData = async (
  promotionvalues,
  updatedata,
  dispatch,
  offerlist,
  useage
) => {
  console.log(promotionvalues, "promotionvalues.file");
  const formData = new FormData();
  formData.append(
    "offer_name",
    promotionvalues.promotion_name ? promotionvalues.promotion_name : null
  );
  formData.append("code", promotionvalues.code ? promotionvalues.code : null);
  formData.append(
    "start_date",
    promotionvalues.start_date ? promotionvalues.start_date : new Date()
  );
  formData.append(
    "expiry_date",
    promotionvalues.expiry_date ? promotionvalues.expiry_date : new Date()
  );
  formData.append(
    "offer_value",
    promotionvalues.value ? promotionvalues.value : null
  );
  formData.append(
    "usage",
    // promotionvalues.usage ? promotionvalues.usage : null
    useage ? useage : null
  );
  formData.append(
    "status",
    promotionvalues.status ? promotionvalues.status : null
  );


  formData.append(
    "status_id",
    promotionvalues.status == "Draft"
      ? 1
      : promotionvalues.status == "Requested"
        ? 2
        : 3
  );
  formData.append(
    "req_status",
    promotionvalues.status == "Draft"
      ? "Draft"
      : promotionvalues.status == "Requested"
        ? "Pending"
        : "Approved"
  );
  formData.append(
    "req_status_id",
    promotionvalues.status == "Draft"
      ? 0
      : promotionvalues.status == "Requested"
        ? 1
        : 3
  );

  formData.append(
    "offer_desc",
    promotionvalues.promotion_description
      ? promotionvalues.promotion_description
      : null
  );
  formData.append(
    "offer_img",
    promotionvalues.file ? promotionvalues.file : null
  );
  formData.append("occupation_id", offerlist?.occupation);
  formData.append(
    "occupation",
    offerlist?.occupation == 1
      ? "Business"
      : offerlist?.occupation == 2
        ? "General Public"
        : offerlist?.occupation == 3
          ? "Handicapped"
          : offerlist?.occupation == 4
            ? "Pilgrim"
            : offerlist?.occupation == 5
              ? "Senior Citizen"
              : offerlist?.occupation == 6
                ? "Student"
                : offerlist?.occupation == 7
                  ? "Tourist"
                  : ""
  );
  formData.append("theme", offerlist?.offer_bgImgae);
  // formData.append("tbs_user_id", sessionStorage.getItem("USER_ID"));
  formData.append("tbs_user_id", sessionStorage.getItem("USER_ID"));

  // formData.append("image_size", promotionvalues.file_size);
  // formData.append("image_type", promotionvalues.file_type);
  console.log(
    updatedata,
    "ADD_UPDATE_OFFERS_DATA"
  );
  const url = updatedata
    ? `${apiUrl}/offers-deals/${updatedata}`
    : `${apiUrl}/offers-deals`;
  const method = updatedata ? "put" : "post";

  try {
    const response = await api({
      method,
      url,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    GetOffersData(dispatch);
    console.log(response, "responseresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const GetOffersById = async (
  updatedata,
  SetUpdateData,
  setOfferData
) => {
  console.log(updatedata, "ahsgxdahsjksaxbj");
  try {
    const response = await api.get(`${apiUrl}/offers-deals/${updatedata}`);
    console.log(response, "responseresponse");
    // SetUpdateData(null);
    setOfferData("");
    return response?.data[0];
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const handleoffersearch = async (e, dispatch) => {
  try {
    if (e.target.value) {
      const response = await api.get(
        `${apiUrl}/offers-deals-search/${e.target.value}`
      );
      dispatch({ type: OFFERS_LIST, payload: response.data });
      return response.data[0];
    } else {
      GetOffersData(dispatch);
    }
  } catch (error) {
    handleError(error);
    return null;
  }
};
export const GetRecentOffers = async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/recentOffers`);
    dispatch({ type: GET_RECENT_OFFERS, payload: response.data });
    console.log(response, "response from recent offers");

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
