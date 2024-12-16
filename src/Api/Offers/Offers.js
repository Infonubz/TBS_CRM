import axios from "axios";
import { GET_RECENT_OFFERS, OFFERS_LIST } from "../../Store/Type";
import { toast } from "react-toastify";
import { GetEmployeeData } from "../UserManagement/Employee";
import { GetOperatorData } from "../UserManagement/SuperAdmin";
import { GetPartnerData } from "../UserManagement/Partner";
import { GetAdsData } from "../Ads/Ads";
import {
  GetPromotionData,
  GetPromotionDataByStatus,
} from "../Promotion/Promotion";
import { GetClientData } from "../UserManagement/Client";
import { GetRedeemOffersData } from "./RedeemOffers";
import { GetRolesData } from "../Role&Responsibilites/ActiveRoles";
import {
  GetPermissionCount,
  GetPermissionData,
} from "../Role&Responsibilites/ActivePermission";
const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
const apiUrl = process.env.REACT_APP_API_URL;

export const GetOffersData = async (dispatch, filter) => {
  try {
    // const response = await axios.get(`${apiUrl}/offers-deals-occupation/${occuTab}`);
    // const response = await axios.get(`${apiUrl}/offers-deals`);
    const response = await api.get(
      `${apiUrl}/request-DiscountofferStatus/${
        filter == "all"
          ? 5
          : filter == "pending"
          ? 1
          : filter == "posted"
          ? 1
          : filter == "approved"
          ? 2
          : filter == "active"
          ? 2
          : filter == "hold"
          ? 3
          : filter == "rejected"
          ? 4
          : filter == "draft"
          ? 0
          : 5
      }`
    );
    dispatch({ type: OFFERS_LIST, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};

export const Deleteall = async (
  api,
  dispatch,
  module,
  filter,
  setPermission,
  CurrentTab
) => {
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
      GetPromotionDataByStatus(dispatch, CurrentTab);
    } else if (module === "client") {
      GetClientData(dispatch);
    } else if (module === "redeemoffer") {
      GetRedeemOffersData(dispatch);
    } else if (module === "roles") {
      GetRolesData(filter, dispatch);
    } else if (module === "permissions") {
      setPermission(true);
      GetPermissionData(filter, dispatch);
      GetPermissionCount(filter, dispatch);
    } else {
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
  formData.append("tbs_user_id", sessionStorage.getItem("USER_ID"));
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
      if (
        typeof response.data === "string" &&
        response.data.includes("Error")
      ) {
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
  dispatch,
  promotionvalues,
  updatedata,
  offerlist,
  offerBackGround,
  OfferFilter
) => {
  console.log(promotionvalues, "promotionvalues.file");
  const formData = new FormData();
  formData.append(
    "offer_name",
    promotionvalues.offer_name ? promotionvalues.offer_name : null
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
    offerlist.usage ? offerlist.usage : null
  );
  formData.append(
    "status",
    promotionvalues.status ? promotionvalues.status : null
  );

  formData.append(
    "status_id",
    promotionvalues.status == "Draft"
      ? 0
      : promotionvalues.status == "Active"
      ? 2
      : promotionvalues.status == "Posted"
      ? 1
      : ""
  );
  formData.append(
    "req_status",
    promotionvalues.status == "Draft"
      ? "Draft"
      : promotionvalues.status == "Posted"
      ? "Pending"
      : "Approved"
  );
  formData.append(
    "req_status_id",
    promotionvalues.status == "Draft"
      ? 0
      : promotionvalues.status == "Posted"
      ? 1
      : 2
  );

  formData.append(
    "offer_desc",
    promotionvalues.offer_desc ? promotionvalues.offer_desc : null
  );
  formData.append(
    "offer_img",
    promotionvalues.file ? promotionvalues.file : null
  );
  formData.append("occupation_id", promotionvalues?.occupation);
  formData.append(
    "occupation",
    promotionvalues?.occupation == 1
      ? "Business"
      : promotionvalues?.occupation == 2
      ? "General Public"
      : promotionvalues?.occupation == 3
      ? "Handicapped"
      : promotionvalues?.occupation == 4
      ? "Pilgrim"
      : promotionvalues?.occupation == 5
      ? "Senior Citizen"
      : promotionvalues?.occupation == 6
      ? "Student"
      : promotionvalues?.occupation == 7
      ? "Tourist"
      : ""
  );
  formData.append("theme", offerBackGround);
  formData.append("value_symbol", promotionvalues?.value_symbol);

  formData.append("tbs_user_id", sessionStorage.getItem("USER_ID"));

  console.log(updatedata, "ADD_UPDATE_OFFERS_DATA");
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
    GetOffersData(dispatch, OfferFilter);
    console.log(response, "responseresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const ChangeDisscountStatus = async (
  id,
  currentid,
  dispatch,
  filterid,
  cmnt
) => {
  const payload = {
    req_status:
      id === 2 ? "Approved" : id === 3 ? "Hold" : id === 4 ? "Rejected" : "",
    req_status_id: id,
    status:
      id === 2 ? "Active" : id === 3 ? "Hold" : id === 4 ? "Rejected" : "",
    status_id: id,
    comments: cmnt,
  };

  const url = `${apiUrl}/request-management-Discountoffer/${currentid}`;
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
    toast.success("Status Updated");
    GetOffersData(dispatch, filterid);
    console.log(response, "responseresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const SearchDiscountOffer = async (e, filter, dispatch) => {
  const SearchID =
    filter == "all"
      ? 5
      : filter == "pending"
      ? 1
      : filter == "posted"
      ? 1
      : filter == "approved"
      ? 2
      : filter == "active"
      ? 2
      : filter == "hold"
      ? 3
      : filter == "rejected"
      ? 4
      : filter == "draft"
      ? 0
      : 5;
  try {
    if (e) {
      const response = await axios.post(
        `${apiUrl}/request-management-DiscountofferSearch`,
        {
          req_status_id: SearchID,
          search_term: e,
        }
      );
      dispatch({ type: OFFERS_LIST, payload: response.data });
    } else {
      GetOffersData(dispatch, filter);
    }
  } catch (err) {
    handleError(err);
  }
};

export const GetOffersById = async (
  updatedata,
  SetUpdateData,
  setOfferData,
  setLoading
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
  } finally {
    setLoading(false);
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
