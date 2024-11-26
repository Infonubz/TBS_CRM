import axios from "axios";
import { NOTIFICATION_DATA, UNREAD_NOTIFICATION } from "../../Store/Type";
import { Await } from "react-router";
import { toast } from "react-toastify";

const api = axios.create({
  headers: {
    "content-Type": "application/json",
  },
});

const apiUrl = process.env.REACT_APP_API_URL;

const dynamicId = sessionStorage.getItem("type_id");
// const dynamicId = sessionStorage.getItem("type_id");
const operatorid = sessionStorage.getItem("USER_ID");
// const operatorid = sessionStorage.getItem("USER_ID");

export const GetNotificationData = async (dispatch) => {
  console.log("FUNCTION CALL");
  if (dynamicId === "PRO101") {
    try {
      const response = await api.get(`${apiUrl}/notifications`);
      dispatch({
        type: NOTIFICATION_DATA,
        payload: response.data.notifications,
        payload_count: response.data.unread_count,
      });
      console.log(response.data, "response data");
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  } else if (dynamicId === "OP101") {

    console.log("operator id in", operatorid);
    try {
      const response = await api.get(`${apiUrl}/notifications/${operatorid}`);
      dispatch({
        type: NOTIFICATION_DATA,
        payload: response.data.notifications,
        payload_count: response.data.unread_count,
      });
      console.log(response.data, "response data");
      return response.data;
    } catch (error) {
      console.log(error);

      return null;
    }
  } else if (dynamicId == "PROEMP101") {
    try {
      const response = await api.get(`${apiUrl}/proEmpNotifications/${operatorid}`);
      dispatch({
        type: NOTIFICATION_DATA,
        payload: response.data.notifications,
        payload_count: response.data.unread_count,
      });
      console.log(response.data, "response data");
      console.log("FUNCTION CALL4444444");
      return response.data;
    } catch (error) {
      console.log(error);

      return null;
    }

  } else {
    console.log("error");
  }
};

export const NotificationStatus = async (statusid) => {
  console.log("print aguthu2", statusid);

  if (dynamicId == "PRO101") {
    console.log("print aguthu2", statusid);
    try {
      console.log("print aguthu3");
      const responce = await api.put(`${apiUrl}/notifications/${statusid}`, {
        read: true,
      });
      // await dispatch({ type: NOTIFICATION_DATA, payload: responce.data });
      console.log(responce.data, statusid, "resbyid");
      GetNotificationData();

      // GetNotificationData(dispatch);

      // return responce.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  } else if (dynamicId === "OP101") {
    try {
      const responce = await api.put(`${apiUrl}/op-notifications/${statusid}`, {
        read: true,
      });
      console.log(responce.data, statusid, "resbyid");
      GetNotificationData();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  else if (dynamicId == "PROEMP101") {
    try {
      const responce = await api.put(`${apiUrl}/pro-emp-notifications/${statusid}`, {
        read: true,
      });
      console.log(responce.data, statusid, "resbyid");
      GetNotificationData();
    } catch (error) {
      console.log(error);
      return null;
    }

  }

  else {
    console.log("error");
  }
};

export const UnreadNotification = async (dispatch, userid) => {
  try {
    const responce = await api.get(`${apiUrl}/notifications/tbs-op106`);
    await dispatch({
      type: UNREAD_NOTIFICATION,
      payload: responce.data,
    });
    console.log(responce.data, userid, "unreadcount");
    return responce.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const SearchNotification = async (e, dispatch) => {
  console.log(e, "search values");
  // if(e){
  if (dynamicId == "PRO101") {
    try {
      const responce = await api.get(`${apiUrl}/search-notifications/${e}`);
      dispatch({
        type: NOTIFICATION_DATA,
        payload: responce.data,
      });
      console.log(responce.data, "dfsdggggfdsgdgfs");
      return responce.data;
    } catch (error) {
      GetNotificationData(dispatch);

      console.log(error);
    }
  } else if (dynamicId == "OP101") {
    try {
      const responce = await api.get(`${apiUrl}/search-op-notifications/${e}`);
      dispatch({
        type: NOTIFICATION_DATA,
        payload: responce.data,
      });
      console.log(responce.data);
      return responce.data;
    } catch (error) {
      GetNotificationData(dispatch);
      console.log(error);
    }
  }
  else if (dynamicId == "PROEMP101") {
    try {
      const responce = await api.get(`${apiUrl}/search-pro-emp-notifications/${e}`);
      dispatch({
        type: NOTIFICATION_DATA,
        payload: responce.data,
      });
      console.log(responce.data);
      return responce.data;
    } catch (error) {
      GetNotificationData(dispatch);
      console.log(error);
    }

  }
  else {
    console.log("error");
  }
};
