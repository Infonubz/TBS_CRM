import axios from "axios";
import { OFFERS_LIST } from "../../Store/Type";
import { toast } from "react-toastify";
import { GetEmployeeData } from "../UserManagement/Employee";
import { GetOperatorData } from "../UserManagement/SuperAdmin";
import { GetPartnerData } from "../UserManagement/Partner";
import { GetAdsData } from "../Ads/Ads";
import { GetPromotionData } from "../Promotion/Promotion";
import { GetClientData } from "../UserManagement/Client";
const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
const apiUrl = process.env.REACT_APP_API_URL;

export const GetOffersData = async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/offers-deals`);
    dispatch({ type: OFFERS_LIST, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};
export const Deleteall = async (api, dispatch, module) => {
  try {
    const response = await axios.delete(api);
    console.log(module == "offer", "responsedata5555");
    toast.success(response.data);
    if (module == "operator") {
      GetOperatorData(dispatch);
      toast.success(response?.data?.message);
      console.log(response.data, "response.dataresponse.data");
    } else if (module == "employee") {
      GetEmployeeData(dispatch);
    } else if (module == "partner") {
      GetPartnerData(dispatch);
    } else if (module == "offer") {
      GetOffersData(dispatch);
    } else if (module == "ads") {
      GetAdsData(dispatch);
    } else if (module == "promotion") {
      GetPromotionData(dispatch);
    } else if (module == "client") {
      GetClientData(dispatch);
    } else {
      console.log("testt");
    }
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

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
    toast.success(response.data);
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
  offerlist
) => {
  console.log(promotionvalues.file, "promotionvalues.file");
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
    "usage",
    promotionvalues.usage ? promotionvalues.usage : null
  );
  formData.append(
    "status",
    promotionvalues.status ? promotionvalues.status : null
  );
  formData.append(
    "status_id",
    promotionvalues.status == "Draft"
      ? 1
      : promotionvalues.status == "Paused"
      ? 2
      : 3
  ); // Assuming this is a fixed value
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
  formData.append("occupation", offerlist?.occupation);
  formData.append("theme", offerlist?.offer_bgImgae);
  formData.append("tbs_user_id", sessionStorage.getItem("USER_ID"));
  // formData.append("image_size", promotionvalues.file_size);
  // formData.append("image_type", promotionvalues.file_type);
  console.log(
    updatedata,
    "updatedataupdatedataupdatedataupdatedataupdatedataupdatedataupdatedata"
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
