import axios from "axios";
import { GET_OPERATOR_NAME, GET_RECENT_PROMOFILE, PROMOTION_DATA } from "../../Store/Type";
import { toast } from "react-toastify";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
const apiUrl = process.env.REACT_APP_API_URL;
// const userType = sessionStorage.getItem("type_name");
const userType = localStorage.getItem("type_name")

export const GetPromotionData = async (dispatch) => {
  try {
    const response = await api.get(`${apiUrl}/promo`);
    dispatch({ type: PROMOTION_DATA, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const Deleteall = async (api, dispatch) => {
  try {
    const response = await axios.delete(api);
    console.log(response.data, "Deleted ALL Data .");
    toast.success(response.data);
    GetPromotionData(dispatch);
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};
export const SubmitPromoExcel = async (file) => {
  const formData = new FormData();
  formData.append("xlsxFile", file);

  const excelEndpoint = `${apiUrl}/promo/importxlsx`;
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

export const handlePromosearch = async (e, dispatch) => {
  try {
    if (e.target.value) {
      const response = await api.get(
        `${apiUrl}/promo/search/${e.target.value}`
      );
      dispatch({ type: PROMOTION_DATA, payload: response.data });
      return response.data[0];
    } else {
      GetPromotionData(dispatch);
    }
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const GetPromotionById = async (
  updatedata,
  SetUpdateData,
  setPromoData
) => {
  console.log(updatedata, "GetPromotionById is live");
  try {
    const response = await api.get(`${apiUrl}/promo/${updatedata}`);
    console.log(response, "responseresponse");
    setPromoData("");
    return response?.data[0];
  } catch (error) {
    handleError(error);
    return null;
  }
};
export const GetOperatorName = async (dispatch) => {
  try {
    // const response = await axios.get(`${apiUrl}/promo-operatorDetails`);
    const response = await axios.get(`http://192.168.90.47:4000/api/request-management-status/2`);
    dispatch({ type: GET_OPERATOR_NAME, payload: response.data });
    console.log(response?.data, "operator Name");
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};

export const SubmitPromotionData = async (
  promolist,
  currentPromodata,
  promotionId,
  dispatch
) => {
  const operator_details =
    userType !== "PRODUCTOWNER"
      // ? sessionStorage.getItem("user_name")
      ? localStorage.getItem("user_name")
      : currentPromodata.operator_details;
  console.log(promotionId, "updatedataupdatedata");
  console.log(currentPromodata, "currentPromodatacurrentPromodata");
  const formData = new FormData();
  formData.append("promo_name", currentPromodata.promotion_name);
  formData.append("operator_details", operator_details);
  formData.append("start_date", currentPromodata.start_date);
  formData.append("expiry_date", currentPromodata.expiry_date);
  formData.append("usage", currentPromodata.usage);
  formData.append("promo_description", currentPromodata.promotion_description);
  formData.append("promo_image", currentPromodata.file);
  formData.append(
    "promo_status_id",
    currentPromodata.status == "Draft" ? 0 : 1
  );
  formData.append("promo_status", currentPromodata.status);
  formData.append("user_id", currentPromodata.status == "Draft" ? -1 : 0);
  formData.append(
    "user_status",
    currentPromodata.status == "Draft" ? -1 : "Pending"
  );
  formData.append("tbs_user_id", sessionStorage.getItem("USER_ID"));
  formData.append("background_image", promolist);

  const url = promotionId
    ? `${apiUrl}/promo/${promotionId}`
    : `${apiUrl}/promo`;
  const method = promotionId ? "put" : "post";

  try {
    const response = await api({
      method,
      url,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success(response.data);
    //GetPromotionData(dispatch)
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};
export const GetPromoRecentFiles = async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/recentPromos`);
    dispatch({ type: GET_RECENT_PROMOFILE, payload: response.data });
    console.log(response, "response from recent promo file");
    return response.data;
  } catch (error) {
    handleError(error);
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
