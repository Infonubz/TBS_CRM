import axios from "axios";
import { toast } from "react-toastify";
import { GET_MOBILE_NOTIFICATION } from "../../../Store/Type";

const apiUrl = process.env.REACT_APP_API_URL;
// const apiUrl = "http://192.168.90.43:4000/api"

export const sendMobileBulkNotification = async(values) =>{

    const formData = new FormData ();
    formData.append("Notification_Image",values.image)
    formData.append("title",values.title)
    formData.append("body",values.body)
    formData.append("tbs_user_id", sessionStorage.getItem("USER_ID"))

try{
    const response = await axios.post(`${apiUrl}/nativenotification`,formData)
    return response.data
}
catch(err){
    handleError(err)
}
}

export const GetMobileNotification = async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/notification/sendrecords`);
      console.log(response.data, "notification");
      dispatch({
          type: GET_MOBILE_NOTIFICATION,
          payload: response.data,
      });
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
  if (error.code === "ERR_CONNECTION_REFUSED") {
    errorMessage =
      "Network Error: Unable to connect to the server. Please check the server status and your network connection.";
  }
  toast.error(errorMessage);
};