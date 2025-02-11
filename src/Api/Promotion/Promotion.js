import axios from "axios";
import {
  GET_OPERATOR_NAME,
  GET_RECENT_PROMOFILE,
  PROMOTION_DATA,
} from "../../Store/Type";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useState } from "react";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
const apiUrl = process.env.REACT_APP_API_URL;
// const userType = sessionStorage.getItem("type_name");
const userType = sessionStorage.getItem("type_name");
const typeID = sessionStorage.getItem("type_id");
const userID = sessionStorage.getItem("USER_ID");

export const GetPromotionData = async (dispatch, CurrentTab) => {
  try {
    const response = await api.get(
      `${apiUrl}/promo${typeID === "OP101" ? `/${userID}` : ""}`
    );
    dispatch({ type: PROMOTION_DATA, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const GetPromoDataByEmp = async (dispatch, CurrentTab) => {
  // alert(CurrentTab)
  let status;

  if (CurrentTab === "All") {
    status = 5;
  } else if (CurrentTab === "Pending") {
    status = 1;
  } else if (CurrentTab === "Approved") {
    status = 2;
  } else if (CurrentTab === "Hold") {
    status = 3;
  } else if (CurrentTab === "Rejected") {
    status = 4;
  } else if (CurrentTab === "Draft") {
    status = 0;
  }else if(CurrentTab === "Repost"){
    status = 6;
  }

    try {
      const response = await api.get(`${apiUrl}/promo-status-empuserid/${userID}/${status}`);
      dispatch({ type: PROMOTION_DATA, payload: response.data });
      return response.data;
    } catch (error) {
      if(error?.response?.data?.message){
        toast.warning(error?.response?.data?.message);
      }
      else{
        toast.error(error);
      }
     // handleError(error);
      return null;
    }
};


export const GetPromotionDataByStatus = async (dispatch, CurrentTab,listType) => {
  let status;
// alert("hiiii")
  if (CurrentTab === "All") {
    status = 5;
  } else if (CurrentTab === "Pending") {
    status = 1;
  } else if (CurrentTab === "Approved") {
    status = 2;
  } else if (CurrentTab === "Hold") {
    status = 3;
  } else if (CurrentTab === "Rejected") {
    status = 4;
  } else if (CurrentTab === "Draft") {
    status = 0;
  }
  else if (CurrentTab === "Repost"){
    status = 6;
  }

  if(typeID === "PRO101"){
    try {
      const response = await api.get(`${apiUrl}/promo-status/${status}`);
      dispatch({ type: PROMOTION_DATA, payload: response.data });
      return response.data;
    } catch (error) {
      handleError(error);
      return null;
    }
  }
  else if(typeID === "OPEMP101"){
    try {
      const response = await api.get(`${apiUrl}/promo-status-userid/${userID}/${status}`)  ;
      dispatch({ type: PROMOTION_DATA, payload: response.data });
      return response.data;
    } catch (error) {
      handleError(error);
      return null;
    }
  }
else{
  try {
    const response = listType ==="operator" ? await api.get(`${apiUrl}/promo-status-userid/${userID}/${status}`) : await api.get(`${apiUrl}/promo-status-empuserid/${userID}/${status}`) ;
    dispatch({ type: PROMOTION_DATA, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
}
};

export const Deleteall = async (api, dispatch, CurrentTab) => {
  try {
    const response = await axios.delete(api);
    console.log(response.data, "Deleted ALL Data .");
    toast.success(response.data);
    GetPromotionDataByStatus(dispatch, CurrentTab);
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const SubmitPromoExcel = async (file) => {
  const formData = new FormData();
  formData.append("xlsxFile", file);
  formData.append("tbs_user_id", userID);

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

export const handlePromosearch = async (e, dispatch, CurrentTab) => {

  let statusId;
  if (CurrentTab === "Approved") {
    statusId = 2;
  } else if (CurrentTab === "Hold") {
    statusId = 3;
  } else if (CurrentTab === "Rejected") {
    statusId = 4;
  } else if (CurrentTab === "Pending") {
    statusId = 1;
  } else if (CurrentTab === "Draft") {
    statusId = 0;
  }
  else if (CurrentTab === "All") {
    statusId = 5;
  }

  const payload =  {
    searchTerm : e.target.value
  }

  const url = `${apiUrl}/promo/searchPromoById/${userID}/${statusId}`;
  const method = "post";

    try {
       if (e.target.value) {
        const response = await api({
          method,
          url,
          data: payload,
          headers: {
            "Content-Type": "application/json",
          },
        });
        dispatch({ type: PROMOTION_DATA, payload: response.data });
        return response.data[0];
      }  else{
        GetPromotionDataByStatus(dispatch, CurrentTab);
      }
    } catch (error) {
      handleError(error);
      return null;
    }
};

export const UpdateStatus = async ({ valueid, promotionId, dispatch, CurrentTab, inputValue }) => {
  console.log(promotionId, "promotionId123");
alert("hello")
  let userstatus;
// if (typeID === "OP101")
  if (valueid === 2) {
    userstatus = "Approved";
  } else if (valueid === 3) {
    userstatus = "Hold";
  } else if (valueid === 4) {
    userstatus = "Rejected";
  } else if (valueid === 6) {
    userstatus = "Repost";
  }

  let status;
  if (valueid === 2) {
    status = "Active";
  } else if (valueid === 3) {
    status = "Hold";
  } else if (valueid === 4) {
    status = "Rejected";
  }else if (valueid === 6) {
    // status = "Pending";
    status = "Repost"
  }

  const payload = {
    promo_status_id: valueid,
    promo_status: status,
    user_status_id: valueid === 6 ? 6 : typeID === "OP101" && valueid === 4 ? 7 : typeID === "OP101" && valueid === 3 ? 7 :  valueid,
    user_status: userstatus,
    comments: valueid === 2 ? "" : inputValue ? inputValue : "",
  };
  console.log(valueid, "in the api");

  const url = `${apiUrl}/promo-statusId/${promotionId}`;
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

export const GetPromotionById = async (
  updatedata,
  SetUpdateData,
  setPromoData,
  setLoading
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
  finally{
    setLoading && setLoading(false)
  }
};

export const GetOperatorName = async (dispatch) => {
  try {
    // const response = await axios.get(`${apiUrl}/promo-operatorDetails`);
    const response = await axios.get(
      `${apiUrl}/request-management-status/2`
    );
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
  promo_background,
  valuesymbol,
  promodata,
  operatorName,
  noValToStatus
) => {

  console.log(currentPromodata.status,'current_promodata')
  // const promo_background = useSelector((state) => state.crm.promo_bg);
  // console.log(promo_background, "promo_background852");
  // const storedFileData = sessionStorage.getItem("promo_bg");
  // if (storedFileData) {
  //   const { name, lastModified, type, size } = JSON.parse(storedFileData);

  //   // Create a new File object
  //   const reconstructedFile = new File([], name, { type, lastModified });
  //   console.log(reconstructedFile,"reconstructedFile");
  // }
  // const [Bg_Promo, setBgPromo] = useState("");

  // const operator_details =
  //   userType !== "PRODUCTOWNER"
  //     ? sessionStorage.getItem("user_name")
  //     : currentPromodata.operator_details;
  const operator_details = typeID === "PRO101" ? currentPromodata.operator_details : typeID === "OP101" ? sessionStorage.getItem("company_name") : operatorName
 
  const formData = new FormData();
  formData.append("promo_name", currentPromodata.promotion_name);
  formData.append("operator_details", operator_details);
  formData.append("start_date", currentPromodata.start_date);
  formData.append("expiry_date", currentPromodata.expiry_date);
  formData.append("usage", promolist.usage);
  formData.append("promo_description", currentPromodata.promotion_description);
  // if(currentPromodata.file.uid){
  // formData.append("promo_image", currentPromodata.file);
  // }
  formData.append("promo_image", currentPromodata.file);
  if(noValToStatus === false) {
  if(typeID === "OPEMP101"){
    formData.append(
      "promo_status_id",
      currentPromodata.status == "Draft"
        ? 0
        : currentPromodata.status == "Posted"
        ? 1
        : 2
    );
    formData.append("user_status_id", currentPromodata.status === "Draft" ? 0 : currentPromodata.status === "Posted" ? 1 : 2);
    formData.append( "user_status",currentPromodata.status === "Draft" ? "Draft" : currentPromodata.status === "Active" ? "Active" : "Posted");
    formData.append("promo_status", currentPromodata.status === "Draft" ? "Draft" :"Pending");
  }
  else{
  formData.append(
    "promo_status_id",
    currentPromodata.status == "Draft"
      ? 0
      : currentPromodata.status == "Posted"
      ? 1
      : 2
  );
  formData.append("user_status_id", currentPromodata.status === "Draft" ? 0 : currentPromodata.status === "Posted" ? 1 : 2);
  formData.append( "user_status",currentPromodata.status === "Draft" ? "Draft" : currentPromodata.status === "Active" ? "Active" : "Posted");
  formData.append("promo_status", currentPromodata.status);
}
  }


  formData.append("tbs_user_id", promotionId && typeID === "PRO101" ? promodata?.tbs_user_id : sessionStorage.getItem("currenttbsuserid") ? sessionStorage.getItem("currenttbsuserid") : userID );
  formData.append("background_image", promo_background);
  formData.append("promo_value", currentPromodata?.promo_value);
  formData.append("promo_code", currentPromodata?.promo_code?.toUpperCase());
  formData.append("value_symbol", currentPromodata?.value_symbol || valuesymbol);

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
