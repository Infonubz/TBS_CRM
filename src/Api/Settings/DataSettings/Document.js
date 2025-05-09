import axios from "axios";
import { toast } from "react-toastify";
import {
  GET_REQ_ADS,
  GET_REQ_MOB_ADS,
  GET_REQ_PARTNER,
  OFFERS_LIST,
  REDEEM_OFFER,
  REQ_MAN_OFFERS,
  REQ_MANAGEMENT_DATE_FILTER,
  REQ_PROMOTION_DATA,
  REQUEST_MANAGEMENT_DATA,
} from "../../../Store/Type";
import { GetOperatorData } from "../../UserManagement/SuperAdmin";
const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
const apiUrl = process.env.REACT_APP_API_URL;

export const GetPoEmployeeDocument = async () => {
  try {
    const URL = `${apiUrl}/pro-emp-professional-documents`;
    const response = await axios.get(URL);
    console.log(response, "response documents");
    return response.data;
  } catch (error) {
    console.log(error);
    // setLoading(false);
  }
};

export const GetOpEmployeeDocument = async () => {
  try {
    const URL = `${apiUrl}/emp-professional-documents`;
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.log(error);
    // setLoading(false);
  }
};

export const GetpartnerDocuments = async (dispatch) => {
  try {
    const URL = `${apiUrl}/request-partnerStatus/5`;
    const response = await axios.get(URL);
    dispatch({ type: GET_REQ_PARTNER, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const GetOperatorDocumeents = async (dispatch, setSpinning) => {
  try {
    const URL = `${apiUrl}/request-management-status/2`;
    const response = await axios.get(URL);
    console.log(response.data, "response_Data_operator");
    dispatch({ type: REQUEST_MANAGEMENT_DATA, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
  } finally {
    setSpinning && setSpinning(false);
  }
};

export const GetClientData = async () => {
  try {
    const URL = `${apiUrl}/All-client-details`;
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const GetDiscountOffers = async (dispatch) => {
  try {
    const URL = `${apiUrl}/request-DiscountofferStatus/2`;
    const response = await axios.get(URL);
    dispatch({ type: OFFERS_LIST, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const GetRedeemOffers = async (dispatch) => {
  try {
    const URL = `${apiUrl}/request-offerStatus/2`;
    const response = await axios.get(URL);
    dispatch({ type: REDEEM_OFFER, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const GetPromotionsData = async (dispatch) => {
  try {
    const URL = `${apiUrl}/promo`;
    const response = await axios.get(URL);
    dispatch({ type: REQ_PROMOTION_DATA, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const GetAdvertisment = async (dispatch) => {
  try {
    const URL = `${apiUrl}/request-adStatus/3`;
    const response = await axios.get(URL);
    dispatch({ type: GET_REQ_ADS, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const GetMobAdvertisment = async (dispatch) => {
  try {
    const URL = `${apiUrl}/request-mobile-adStatus/3`;
    const response = await axios.get(URL);
    dispatch({ type: GET_REQ_MOB_ADS, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const searchOperatorDetails = async (dispatch, e, filter) => {
  try {
    if (e) {
      const response = await axios.post(`${apiUrl}/request-management-op`, {
        req_status_id: filter,
        search_term: e,
      });
      dispatch({ type: REQUEST_MANAGEMENT_DATA, payload: response.data });
      console.log(response.data, "response_data_operator_search");
      return response.data;
    } else {
      GetOperatorDocumeents(dispatch);
    }
  } catch (err) {
    console.log(err);
  }
};

export const searchPartnerDetails = async (dispatch, e, filter) => {
  try {
    if (e) {
      const response = await axios.post(
        `${apiUrl}/request-management-partnerSearch`,
        {
          req_status_id: filter,
          search_term: e,
        }
      );
      dispatch({ type: GET_REQ_PARTNER, payload: response.data });
      console.log(response, "searchingPartnerByRequest");
    } else {
      GetpartnerDocuments(dispatch);
    }
  } catch (err) {
    handleError(err);
  }
};

export const searchPromotionDetails = async (dispatch, e, filter) => {
  console.log(e, "promotion aaaa value");
  const url = "/promo/searchReq/";
  try {
    if (e) {
      const response = await axios.post(`${apiUrl}/${url}`, {
        status: "Active",
        search_term: e,
      });
      dispatch({ type: REQ_PROMOTION_DATA, payload: response.data });
      console.log(response.data, "search promotions");
    } else {
      console.log("no values");
      GetPromotionsData(dispatch);
    }
  } catch (err) {
    console.log("error in search", err);
  }
};

export const SearchDiscountDetails = async (dispatch, e, filter) => {
  try {
    if (e) {
      const response = await axios.post(
        `${apiUrl}/request-management-DiscountofferSearch`,
        {
          req_status_id: 2,
          search_term: e,
        }
      );
      dispatch({ type: OFFERS_LIST, payload: response.data });
    } else {
      GetDiscountOffers(dispatch);
    }
  } catch (err) {
    handleError(err);
  }
};

export const SearchRedeemDetails = async (dispatch, e, filter) => {
  try {
    if (e) {
      const response = await axios.post(
        `${apiUrl}/request-management-offerSearch`,
        {
          req_status_id: 2,
          search_term: e,
        }
      );
      dispatch({ type: REDEEM_OFFER, payload: response.data });
    } else {
      GetRedeemOffers(dispatch);
    }
  } catch (err) {
    handleError(err);
  }
};

export const searchWebAdsDetails = async (dispatch, e, statusid) => {
  try {
    if (e) {
      const response = await axios.post(
        `${apiUrl}/request-management-adSearch`,
        {
          ads_req_status_id: statusid,
          search_term: e,
        }
      );
      dispatch({ type: GET_REQ_ADS, payload: response.data });
      console.log(response.data, "searching_webads");
    } else {
      GetAdvertisment(dispatch);
    }
  } catch (err) {
    console.log(err);
  }
};

export const searchMobAdsDetails = async (dispatch, e, statusid) => {
  try {
    if (e) {
      const response = await axios.post(
        `${apiUrl}/request-management-mobile-adSearch`,
        {
          ads_req_status_id: statusid,
          search_term: e,
        }
      );
      console.log(response.data, "response_mobads_details");
      dispatch({ type: GET_REQ_MOB_ADS, payload: response.data });
    } else {
      GetMobAdvertisment(dispatch);
    }
  } catch (err) {
    console.log(err);
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
