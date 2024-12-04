import axios from "axios";
import {
  GET_ADS,
  GET_ADS_CLIENT,
  GET_MOBILE_ADS,
  GET_RECENT_ADS,
} from "../../Store/Type";
import { toast } from "react-toastify";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
const apiUrl = process.env.REACT_APP_API_URL;
const typeId = sessionStorage.getItem("type_id");

export const GetAdsData = async (dispatch) => {
  const proempid = sessionStorage.getItem("USER_ID")
  try {
    // const response =
    //   typeId == "PRO101" ? await axios.get(`${apiUrl}/ads-all`) : " ";
    const response = typeId == "PRO101" ? await axios.get(`${apiUrl}/ads-userId/tbs-pro1001`) : await axios.get(`${apiUrl}/ads-userId/${proempid}`);
    dispatch({ type: GET_ADS, payload: response.data });
    console.log(response.data, "adsadsadsasdadsadsadsadsadaadsadsads");

    return response.data ;
  } catch (error) {
    handleError(error);
    // return null;
  }
};

export const GetMobileAds = async (dispatch) => {
  const proempid = sessionStorage.getItem("USER_ID")
  try {
    // const response =
    //   typeId == "PRO101" ? await axios.get(`${apiUrl}/mobads-all`) : " ";
    const response = typeId == "PRO101" ? await axios.get(`${apiUrl}/mobads-userId/tbs-pro1001`) : await axios.get(`${apiUrl}/mobads-userId/${proempid}`);

    dispatch({ type: GET_MOBILE_ADS, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};

export const Deleteall = async (api, dispatch) => {
  try {
    const response = await axios.delete(api);
    console.log(response.data, "response.data5555");
    toast.success(response.data);
    GetAdsData(dispatch);
    GetMobileAds(dispatch);
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const SubmitAdsData = async (
  advalues,
  ad_id,
  duration,
  hours,
  adsdata,
  dispatch
) => {
  console.log(advalues.status, "promotionvalues.file");

  const webFormData = new FormData();
  webFormData.append("client_details", advalues.client_details);
  webFormData.append("ad_title", advalues.ad_title);
  webFormData.append("start_date", advalues.start_date);
  webFormData.append("end_date", advalues.end_date);
  webFormData.append("ad_description", advalues.ad_description);
  webFormData.append("usage_per_day", advalues.usage_per_day);
  webFormData.append("ads_status", advalues.status);
  webFormData.append("ad_video", advalues.file);
  webFormData.append(
    "ad_file_size",
    advalues.file.size || adsdata.ad_file_size
  );
  webFormData.append(
    "ad_file_type",
    advalues.file.type || adsdata.ad_file_type
  );
  webFormData.append("page_name", advalues.page_name);
  webFormData.append("tbs_client_id", advalues.tbs_client_id);
  // webFormData.append("tbs_user_id", sessionStorage.getItem("USER_ID"));
  webFormData.append("tbs_user_id", sessionStorage.getItem("USER_ID"));
  webFormData.append("duration", duration);
  webFormData.append("hours", hours);
  if (ad_id) {
    webFormData.append("ad_video_details", adsdata.ad_video_details);
  }
  webFormData.append(
    "page_id",
    advalues.page_name == "Home"
      ? 1
      : advalues.page_name == "Dashboard"
        ? 2
        : advalues.page_name == "Filter"
          ? 3
          : 4
  );

  webFormData.append(
    "ads_status_id",
    advalues.status == "Draft" ? 0 : advalues.status == "Requested" ? 1 : 2
  );

  webFormData.append(
    "ads_req_status",
    advalues.status === "Draft"
      ? "Draft"
      : advalues.status === "Requested"
        ? "Pending"
        : "Approved"
  );
  webFormData.append(
    "ads_req_status_id",
    advalues.status === "Draft" ? 0 : advalues.status === "Requested" ? 1 : 3
  );

  console.log(ad_id, "updatedataupdatedata");
  const url = ad_id ? `${apiUrl}/ads/${ad_id}` : `${apiUrl}/ads`;
  const method = ad_id ? "put" : "post";

  try {
    const response = await api({
      method,
      url,
      data: webFormData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    GetAdsData(dispatch);
    console.log(response, "responseresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

// export const SubmitAdsMobile = async (advalues, updatedata, dispatch) => {
//   console.log(advalues.file, "promotionvalues.file");

//   const mbleFormData = new FormData();
//   mbleFormData.append("client_details", advalues.client_details);
//   mbleFormData.append("mobad_title", advalues.ad_title);
//   mbleFormData.append("start_date", advalues.start_date);
//   mbleFormData.append("end_date", advalues.end_date);
//   mbleFormData.append("mobad_description", advalues.ad_description);
//   mbleFormData.append("usage_per_day", advalues.usage_per_day);
//   mbleFormData.append("mobad_vdo", advalues.file);
//   mbleFormData.append("mobad_file_size", advalues.file.size);
//   mbleFormData.append("mobad_file_type", advalues.file.type);
//   mbleFormData.append("page_name", advalues.page_name);
//   mbleFormData.append("tbs_client_id", advalues.tbs_client_id);
//   mbleFormData.append(
//     "page_id",
//     advalues.page_name == "Home"
//       ? 1
//       : advalues.page_name == "Dashboard"
//       ? 2
//       : advalues.page_name == "Filter"
//       ? 3
//       : 4
//   );
//   mbleFormData.append("status", advalues.status);
//   mbleFormData.append(
//     "status_id",
//     advalues.status == "Draft" ? 1 : advalues.status == "Requested" ? 2 : 3
//   );
//   mbleFormData.append(
//     "req_status",
//     advalues.status == "Draft"
//       ? "Draft"
//       : advalues.status == "Requested"
//       ? "pending"
//       : "approved"
//   );
//   mbleFormData.append(
//     "req_status_id",
//     advalues.status == "Draft" ? 0 : advalues.status == "Requested" ? 1 : 3
//   );

//   console.log(
//     updatedata,
//     "updatedataupdatedataupdatedataupdatedataupdatedataupdatedataupdatedata"
//   );
//   const url = updatedata
//     ? `${apiUrl}/mobads/${updatedata}`
//     : `${apiUrl}/mobads`;
//   const method = updatedata ? "put" : "post";

//   try {
//     const response = await api({
//       method,
//       url,
//       data: mbleFormData,
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     GetMobileAds(dispatch);
//     GetAdsData(dispatch);
//     console.log(response, "responseresponse");
//     return response.data;
//   } catch (error) {
//     handleError(error);
//     return null;
//   }
// };

export const SubmitAdsMobile = async (
  advalues,
  updatedata,
  duration,
  hours,
  adsdata,
  dispatch
) => {
  console.log(advalues.file, "promotionvalues.file");

  const mbleFormData = new FormData();
  mbleFormData.append("client_details", advalues.client_details);
  mbleFormData.append("mobad_title", advalues.ad_title);
  mbleFormData.append("start_date", advalues.start_date);
  mbleFormData.append("end_date", advalues.end_date);
  mbleFormData.append("mobad_description", advalues.ad_description);
  mbleFormData.append("usage_per_day", advalues.usage_per_day);
  mbleFormData.append("ads_status", advalues.status);
  mbleFormData.append("mobad_vdo", advalues.file);
  mbleFormData.append(
    "mobad_file_size",
    advalues.file.size || adsdata.mobad_file_size
  );
  mbleFormData.append(
    "mobad_file_type",
    advalues.file.type || adsdata.mobad_file_type
  );
  mbleFormData.append("page_name", advalues.page_name);
  mbleFormData.append("tbs_client_id", advalues.tbs_client_id);
  // mbleFormData.append("tbs_user_id", sessionStorage.getItem("USER_ID"));
  mbleFormData.append("tbs_user_id", sessionStorage.getItem("USER_ID"));
  mbleFormData.append("duration", duration);
  mbleFormData.append("hours", hours);
  mbleFormData.append(
    "page_id",
    advalues.page_name == "Home"
      ? 1
      : advalues.page_name == "Dashboard"
        ? 2
        : advalues.page_name == "Filter"
          ? 3
          : 4
  );
  // mbleFormData.append(
  //   "status_id",
  //   advalues.status == "Draft" ? 1 : advalues.status == "Paused" ? 2 : 3
  // );
  mbleFormData.append(
    "ads_status_id",
    advalues.status == "Draft" ? 0 : advalues.status == "Requested" ? 1 : 2
  );
  mbleFormData.append(
    "ads_req_status",
    advalues.status === "Draft"
      ? "Draft"
      : advalues.status === "Requested"
        ? "Pending"
        : "Approved"
  );
  mbleFormData.append(
    "ads_req_status_id",
    advalues.status === "Draft" ? 0 : advalues.status === "Requested" ? 1 : 3
  );

  console.log(
    updatedata,
    "updatedataupdatedataupdatedataupdatedataupdatedataupdatedataupdatedata"
  );
  const url = updatedata
    ? `${apiUrl}/mobads/${updatedata}`
    : `${apiUrl}/mobads`;
  const method = updatedata ? "put" : "post";

  try {
    const response = await api({
      method,
      url,
      data: mbleFormData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    GetMobileAds(dispatch);
    GetAdsData(dispatch);
    console.log(response, "responseresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const GetAdsById = async (updatedata, showtable, setAdData) => {
  console.log(updatedata, "ahsgxdahsjksaxbj");
  const url = showtable == 4 ? "ads" : showtable == 6 ? "mobads" : "ads"
  try {
    const response = await api.get(`${apiUrl}/${url}/${updatedata}`);
    console.log(response, "responseresponse");
    // SetUpdateData(null);
    // setAdData("");
    return showtable == 4 ? response?.data : showtable == 6 ? response.data[0] : response?.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const GetMbleAdsById = async (updatedata, SetUpdateData, setAdData) => {
  console.log(updatedata, "ahsgxdahsjksaxbj");
  try {
    const response = await api.get(`${apiUrl}/mobads/${updatedata}`);
    console.log(response, "responseresponse");
    // SetUpdateData(null);
    setAdData("");
    return response?.data[0];
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const handleAdsearch = async (e, dispatch) => {
  const proempid = sessionStorage.getItem("USER_ID")
  try {
    if (e.target.value) {
      // const response = await api.get(`${apiUrl}/ads/search/${e.target.value}`);
      const response = typeId == "PRO1001" ? await api.get(`${apiUrl}/ads-search/tbs-pro1001/${e.target.value}`) : await api.get(`${apiUrl}/ads-search/${proempid}/${e.target.value}`)
      dispatch({ type: GET_ADS, payload: response.data });
      return response.data[0];
    } else {
      GetAdsData(dispatch);
    }
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const handleMbleAdsearch = async (e, dispatch) => {
  const proempid = sessionStorage.getItem("USER_ID")
  try {
    if (e.target.value) {
      // const response = await api.get(
      //   `${apiUrl}/mobads/search/${e.target.value}`
      // );
      const response = typeId == "PRO1001" ? await api.get(`${apiUrl}/mobads-search/tbs-pro1001/${e.target.value}`) : await api.get(`${apiUrl}/mobads-search/${proempid}/${e.target.value}`)

      dispatch({ type: GET_MOBILE_ADS, payload: response.data });
      return response.data[0] ;
    } else {
      GetAdsData(dispatch);
      GetMobileAds(dispatch);
    }
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const GetClientList = async (dispatch) => {
  try {
    // const response = await axios.get(`${apiUrl}/ads-clientDetails`);
    const response = await axios.get(`${apiUrl}/getActiveClients/1`);
    dispatch({ type: GET_ADS_CLIENT, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const GetRecentAds = async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/recentAds`);
    dispatch({ type: GET_RECENT_ADS, payload: response.data });
    console.log(response, "response");
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
