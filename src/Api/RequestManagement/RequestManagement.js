import axios from "axios";
import { toast } from "react-toastify";
import {
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
  try {
    const response = await api.get(
      `${apiUrl}/request-management-status/${
        filter == "all"
          ? 4
          : filter == "pending"
          ? 0
          : filter == "verified"
          ? 2
          : filter == "under_review"
          ? 1
          : filter == "rejected"
          ? 3
          : 4
      }`
    );
    dispatch({ type: REQUEST_MANAGEMENT_DATA, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const statuschange = async (valueid, value, currentid) => {
  const payload = {
    req_status: value,
    req_status_id: valueid,
  };

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
export const userStatusActivate = async (valuedata, currentid) => {
  const payload = {
    user_status: valuedata,
  };

  const url = `${apiUrl}/operators-status/${currentid}`;
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
          ? 1
          : promofilter == "Rejected"
          ? 2
          : promofilter == "Under Review"
          ? 3
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

export const GetReqOperatorByDate = async (dispatch, startDate, endDate) => {
  console.log("hello testing");

  try {
    // const response = await api.get(`${apiUrl}/filter-by-date`)

    const response = await axios.post(
      `${apiUrl}/filter-by-date`,
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
    dispatch({ type: REQUEST_MANAGEMENT_DATA, payload: response.data });

    console.log(response.data, "hello this is res");
  } catch (err) {
    console.log(err, "this is the error");
  }
};

export const SearchReqOperator = async (e, dispatch) => {
  try {
    if (e) {
      const responce = await axios.get(`${apiUrl}/request-management/${e}`);
      dispatch({ type: REQUEST_MANAGEMENT_DATA, payload: responce.data });
    } else {
      GetRequestManagementData(dispatch);
    }
  } catch (err) {
    console.log(err);
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
