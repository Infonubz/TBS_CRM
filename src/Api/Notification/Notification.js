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

export const GetNotificationData = async (dispatch) => {
  try {
    const responce = await api.get(`${apiUrl}/notifications`);
    await dispatch({ type: NOTIFICATION_DATA, payload: responce.data });
    console.log(responce.data, "resssss");
    return responce.data;
  } catch (error) {
    // handleError(error);
    console.log(error);
    return null;
  }
};

export const NotificationStatus = async (dispatch, statusid) => {
  try {
    const responce = await api.put(`${apiUrl}/notifications/${statusid}`, {
      read: true,
    });
    await dispatch({ type: NOTIFICATION_DATA, payload: responce.data });
    console.log(responce.data, statusid, "resbyid");
    // console.log(responce.data,"statusupdated")
    // GetNotificationData(dispatch);

    // return responce.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const UnreadNotification = async (dispatch, userid) => {
  try {
    const responce = await api.get(`${apiUrl}/notifications/tbs-op1026`);
    await dispatch({ type: UNREAD_NOTIFICATION, payload: responce.data });
    console.log(responce.data, userid, "unreadcount");
    return responce.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
