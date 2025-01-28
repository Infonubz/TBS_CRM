import axios from "axios";
import { toast } from "react-toastify";
import {
  GET_REQ_ADS,
  GET_REQ_PARTNER,
  REQ_MAN_OFFERS,
  REQ_MANAGEMENT_DATE_FILTER,
  REQ_PROMOTION_DATA,
  REQUEST_MANAGEMENT_DATA,
} from "../../Store/Type";
import { GetOperatorData } from "../UserManagement/SuperAdmin";
const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
const apiUrl = process.env.REACT_APP_API_URL;

export const GetRequestManagementData = async (dispatch, filter) => {
  const reqFilter =
    filter == "all"
      ? 7
      : filter == "pending"
      ? 1
      : filter == "approved"
      ? 5
      : filter == "on_hold"
      ? 4
      : filter == "rejected"
      ? 6
      : 7;
  try {
    const response = await api.get(
      `${apiUrl}/request-management-status/${
        reqFilter
        // filter == "all"
        //   ? 7
        //   : filter == "pending"
        //   ? 0
        //   : filter == "verified"
        //   ? 2
        //   : filter == "under_review"
        //   ? 1
        //   : filter == "rejected"
        //   ? 3
        //   : 7
      }`
    );
    dispatch({ type: REQUEST_MANAGEMENT_DATA, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const PartnerStatusChange = async (
  valueid,
  value,
  currentid,
  inputValue
) => {
  const payload = {
    req_status: value,
    req_status_id: valueid,
    partner_status: valueid === 5 ? "Active" : value,
    partner_status_id: valueid === 5 ? 2 : valueid,
    comments: valueid === 5 ? "" : inputValue ? inputValue : "",
  };
  try {
    const response = await axios.put(
      `${apiUrl}/request-management-partner/${currentid}`,
      payload
    );
    console.log(response.data, "responsepartner");
    return response.data;
  } catch (err) {
    handleError(err);
  }
};

export const statuschange = async (valueid, value, currentid, inputValue) => {
  const payload = {
    req_status: value,
    req_status_id: valueid,
    user_status: value,
    user_status_id: valueid,
    comments: valueid === 5 ? "" : inputValue ? inputValue : "",
  };
  console.log(value, valueid, "in the api");

  const url = `${apiUrl}/request-management/${currentid}`;
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
export const ReqPromoStatusChange = async (valueid, value, currentid) => {
  const payload = {
    promo_status_id: valueid == 1 ? 2 : valueid == 2 ? 3 : valueid == 3 ? 4 : 1,
    promo_status:
      value == "Approved"
        ? "Active"
        : value == "Rejected"
        ? "Rejected"
        : value == "Under Review"
        ? "Under Review"
        : "Requested",
    user_id: valueid,
    user_status: value,
  };

  const url = `${apiUrl}/promo-statusId/${currentid}`;
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
export const userStatusActivate = async (statusId, currentid, dispatch,setSpinning) => {
  // console.log("call 2", valuedata, currentid);
  // const payload = {
  //   req_status: valuedata,
  //   req_status_id:valuedata == "Active" ? 2 : 3,
  //   user_status: valuedata,
  //   user_status_id: valuedata == "Active" ? 2 : 3,
  // };
  const payload = {
    req_status: statusId === 3 ? "Active" : "Inactive",
    req_status_id: statusId === 3 ? 2 : 3,
    user_status: statusId === 3 ? "Active" : "Inactive",
    user_status_id: statusId === 3 ? 2 : 3,
  };
  const ReqPayload = {
    req_status: statusId,
    req_status_id: statusId == "Active" ? 2 : 3,
    user_status: statusId,
    user_status_id: statusId == "Active" ? 2 : 3,
  };
  const mainpayload = statusId === "Active" ? ReqPayload : payload;
  console.log("call 3", payload);

  const url = `${apiUrl}/operators-status/${currentid}`;
  const method = "put";

  try {
    const response = await api({
      method,
      url,
      data: mainpayload,
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success("Status Updated");
    console.log(response, "responseresponse");
    GetOperatorData(dispatch);
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
  finally{
    setSpinning && setSpinning(false)
  }
};

export const GetRequestDataById = async (
  verifyData,
  setVerifyData,
  setRequestData
) => {
  console.log(verifyData, "ahsgxdahsjksaxbj");
  try {
    const response = await api.get(
      `${apiUrl}/request-management-id/${verifyData}`
    );
    console.log(response, "responseresponse");
    setRequestData("");
    return response?.data[0];
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const GetPartnerDataById = async (partnerid) => {
  try {
    const response = await axios.get(
      `${apiUrl}/request-management-partnerId/${partnerid}`
    );
    console.log(response.data);
    return response.data[0];
  } catch (err) {
    console.log(err);
  }
};

export const GetRequestStatusById = async (filter, setGetData) => {
  const url =
    filter === "pending"
      ? `${apiUrl}/request-management-status/0`
      : filter === "verified"
      ? `${apiUrl}/request-management-status/2`
      : filter === "under_review"
      ? `${apiUrl}/request-management-status/1`
      : filter === "rejected"
      ? `${apiUrl}/request-management-status/3`
      : `${apiUrl}/request-management`;
  try {
    const response = await axios.get(url);
    console.log(response, "responseresponse");
    setGetData("");
    return response;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const GetReqPromotionData = async (dispatch, promofilter) => {
  try {
    const response = await api.get(
      `${apiUrl}/promo-status/${
        promofilter == "All"
          ? 4
          : promofilter == "Pending"
          ? 0
          : promofilter == "Approved"
          ? 2
          : promofilter == "Rejected"
          ? 3
          : promofilter == "Under Review"
          ? 1
          : 4
      }`
    );

    // const response = await api.get(

    //   "http://192.168.4.106:3030/api/promo-status"

    // );

    console.log(response.data, "response48848");

    dispatch({ type: REQ_PROMOTION_DATA, payload: response.data });

    return response.data;
  } catch (error) {
    handleError(error);

    return null;
  }
};
export const GetReqPromotionById = async (updatedata) => {
  console.log(updatedata, "GetPromotionById is live");
  try {
    const response = await api.get(`${apiUrl}/promo/${updatedata}`);
    console.log(response, "responseresponse");
    return response?.data[0];
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const GetReqOperatorByDate = async (dispatch, startDate, endDate,filter) => {
  console.log("hello testing");
  const reqFilter =
  filter == "all"
    ? 7
    : filter == "pending"
    ? 1
    : filter == "approved"
    ? 5
    : filter == "on_hold"
    ? 4
    : filter == "rejected"
    ? 6
    : 7;

  try {
    // const response = await api.get(`${apiUrl}/filter-by-date`)

    const response = await axios.post(
      `${apiUrl}/filter-by-date`,
      {
        from: startDate,
        to: endDate,
        req_status_id: reqFilter
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: REQUEST_MANAGEMENT_DATA, payload: response.data });

    console.log(response.data, "hello this is res");
  } catch (err) {
    console.log(err, "this is the error");
  }
};

export const SearchReqOperator = async (e, filter, dispatch) => {
  const reqFilter =
    filter == "all"
      ? 7
      : filter == "pending"
      ? 1
      : filter == "approved"
      ? 5
      : filter == "on_hold"
      ? 4
      : filter == "rejected"
      ? 6
      : 7;
  try {
    if (e) {
      const response = await axios.post(`${apiUrl}/request-management-op`, {
        req_status_id: reqFilter,
        search_term: e,
      });
      dispatch({ type: REQUEST_MANAGEMENT_DATA, payload: response.data });
    } else {
      GetRequestManagementData(dispatch, filter);
    }
  } catch (err) {
    console.log(err);
  }
};

export const SearchReqPartner = async(e, filter, dispatch) => {
  const reqFilter =
    filter == "all"
      ? 7
      : filter == "pending"
      ? 1
      : filter == "approved"
      ? 5
      : filter == "on_hold"
      ? 4
      : filter == "rejected"
      ? 6
      : 7;
  try {
    if (e) {
      const response = await axios.post(
        `${apiUrl}/request-management-partnerSearch`,
        {
          req_status_id: reqFilter,
          search_term: e,
        }
      );
      console.log(response.data,"response.data741");
      
      dispatch({ type: GET_REQ_PARTNER, payload: response.data });
    } else {
      GetReqPartnerData(dispatch, filter);
    }
  } catch (err) {
    handleError(err);
  }
};

export const GetPartnerByDate = async (dispatch, sdate, edate,filter) => {
  const reqFilter =
  filter == "all"
    ? 7
    : filter == "pending"
    ? 1
    : filter == "approved"
    ? 5
    : filter == "on_hold"
    ? 4
    : filter == "rejected"
    ? 6
    : 7;
  try {
    const response = await axios.post(`${apiUrl}/filter-by-datePartner`, {
      from: sdate,
      to: edate,
      req_status_id:reqFilter
    });
    dispatch({ type: GET_REQ_PARTNER, payload: response.data });
  } catch (err) {
    handleError(err);
  }
};

export const GetReqPromotionByDate = async (dispatch, startdate, endDate) => {
  try {
    const response = await axios.post(
      `${apiUrl}/promo/filter`,
      {
        from: startdate,
        to: endDate,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data, "promotion responce");
    dispatch({ type: REQ_PROMOTION_DATA, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const SearchRequestPromotion = async (e, dispatch) => {
  console.log(e, "promotion aaaa value");

  try {
    if (e) {
      const responce = await axios.get(`${apiUrl}/promo/searchReq/${e}`);
      dispatch({ type: REQ_PROMOTION_DATA, payload: responce.data });
      console.log(responce.data, "search promotions");
    } else {
      console.log("no values");
      GetReqPromotionData(dispatch);
    }
  } catch (err) {
    console.log("error in search", err);
  }
};
export const GetAllReqManOffers = async (dispatch, filter) => {
  console.log(filter, "fillllll");
  try {
    const responce = await api.get(
      `${apiUrl}/request-offerStatus/${
        filter == "All"
          ? 6
          : filter == "Pending"
          ? 1
          : filter == "Approved"
          ? 3
          : filter == "Under Review"
          ? 4
          : filter == "Rejected"
          ? 5
          : 6
      }`
    );
    dispatch({ type: REQ_MAN_OFFERS, payload: responce.data });
    console.log(responce.data, "Ressssssssssssssssssssssss");
  } catch (err) {
    console.log(err);
  }
};

// const dispatch = useDispatch()
export const ReqManStatusChange = async (
  updateData,
  statusid,
  status,
  dispatch
) => {
  const payload = {
    status: status,
    status_id: statusid,
    req_status:
      status == "Under Review"
        ? "Under Review"
        : status == "Approved"
        ? "Active"
        : "Rejected",

    req_status_id: statusid == 2 ? 4 : statusid == 3 ? 3 : 5,
  };
  console.log(payload, "loadddddddddddddddddddddd");
  try {
    const responce = await api.put(
      `${apiUrl}/request-management-offer/${updateData}`,
      payload
    );
    // console.log(responce.data,"hellocon");
    // toast.success(responce.data)
    GetAllReqManOffers(dispatch);
    return responce.data;
  } catch (err) {
    console.log(err);
  }
};

export const ReqManOffersSearch = async (value, dispatch) => {
  try {
    if (value) {
      const responce = await api.get(
        `${apiUrl}/request-management-offerSearch/${value}`
      );
      dispatch({ type: REQ_MAN_OFFERS, payload: responce.data });
    } else {
      GetAllReqManOffers(dispatch);
    }
  } catch (err) {
    console.log(err);
  }
};

export const ReqManOffersDateFilter = async (dispatch, fdate, tdate) => {
  const payloaddata = {
    from: fdate,
    to: tdate,
  };
  try {
    const responce = await api.post(
      `${apiUrl}/filter-by-dateOffer`,
      payloaddata
    );
    dispatch({ type: REQ_MAN_OFFERS, payload: responce.data });
  } catch (err) {
    console.log(err);
  }
};
export const GetRequestAdsData = async (dispatch, adfilter, showtable) => {
  const url =
    showtable == 4
      ? "request-adStatus"
      : showtable == 6
      ? "request-mobile-adStatus"
      : "";
  try {
    // request-mobile-adStatus
    const response = await api.get(
      `${apiUrl}/${url}/${
        adfilter == "all"
          ? 5
          : adfilter == "pending"
          ? 1
          : adfilter == "verified"
          ? 3
          : adfilter == "under_review"
          ? 2
          : adfilter == "rejected"
          ? 4
          : 5
      }`
    );
    dispatch({ type: GET_REQ_ADS, payload: response.data });
    console.log(response, "getAdvertisementlis");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};
export const SearchReqAdvertisement = async (e, dispatch, showtable,adfilter) => {
 const statusid = adfilter == "all"
  ? 5
  : adfilter == "pending"
  ? 1
  : adfilter == "verified"
  ? 3
  : adfilter == "under_review"
  ? 2
  : adfilter == "rejected"
  ? 4
  : 5
  const url =
    showtable == 4
      ? "request-management-adSearch"
      : "request-management-mobile-adSearch";
  try {
    if (e) {
      const responce = await axios.post(`${apiUrl}/${url}`,{
    ads_req_status_id:statusid ,
    search_term: e
      });
      dispatch({ type: GET_REQ_ADS, payload: responce.data });
    } else {
      GetRequestAdsData(dispatch, adfilter, showtable);
    }
  } catch (err) {
    console.log(err);
  }
};
export const ReqAdsStatusChange = async (
  valueid,
  valuedata,
  adId,
  dispatch,
  showtable
) => {
  const payload = {
    ads_req_status_id: valueid,
    ads_req_status: valuedata,
    ads_status_id: valueid == 3 ? 2 : valueid == 4 ? 4 : valueid == 2 ? 3 : 1,
    ads_status:
      valuedata == "Approved"
        ? "Active"
        : valuedata == "Rejected"
        ? "Rejected"
        : valuedata == "Under Review"
        ? "Under Review"
        : "Requested",
  };

  const webMbl =
    showtable == 4 ? "request-management-ad" : "request-management-mobile-ad";
  const url = `${apiUrl}/${webMbl}/${adId}`;
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
    GetRequestAdsData(dispatch, 5, showtable);
    console.log(response, "responseresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const GetReqAdsByDate = async (
  dispatch,
  startDate,
  endDate,
  showtable
) => {
  console.log("hello testing");

  const url = showtable == 4 ? "filter-by-dateAd" : "filter-by-datemobileAd";

  try {
    const response = await axios.post(
      `${apiUrl}/${url}`,
      {
        from: startDate,
        to: endDate,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: GET_REQ_ADS, payload: response.data });

    console.log(response.data, "hello this is res");
  } catch (err) {
    console.log(err, "this is the error");
  }
};

export const GetReqPartnerData = async (dispatch, partnerFilter) => {
  const reqFilter =
    partnerFilter == "all"
      ? 7
      : partnerFilter == "pending"
      ? 1
      : partnerFilter == "approved"
      ? 5
      : partnerFilter == "on_hold"
      ? 4
      : partnerFilter == "rejected"
      ? 6
      : 7;
  try {
    const response = await axios.get(
      `${apiUrl}/request-partnerStatus/${reqFilter}`
    );
    console.log(response.data,"response.data");
    
    dispatch({ type: GET_REQ_PARTNER, payload: response.data });
  } catch (err) {
    handleError(err);
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
