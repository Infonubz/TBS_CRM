import axios from "axios";
import { GET_SUBSCRIPTION } from "../../Store/Type";
import { toast } from "react-toastify";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
const apiUrl = process.env.REACT_APP_API_URL;

export const GetSubscriptionList = async (dispatch, setSpinning) => {
  try {
    const response = await api.get(`${apiUrl}/`);
    dispatch({ type: GET_SUBSCRIPTION, payload: response.data });
    console.log(response, "response response...");
    return response.data;
  } catch (error) {
    handleError(error);
  } finally {
    setSpinning && setSpinning(false);
  }
};
export const handleAdsearch = async (e, dispatch) => {
  try {
    if (e.target.value) {
      const response = await api.get(
        `${apiUrl}/subscription/search/${e.target.value}`
      );
      dispatch({ type: GET_SUBSCRIPTION, payload: response.data });
      return response.data[0];
    } else {
      GetSubscriptionList(dispatch);
    }
  } catch (error) {
    handleError(error);
    return null;
  }
};
export const GetSubscriptionByDate = async (dispatch, startDate, endDate) => {
  try {
    // const response = await api.get(`${apiUrl}/filter-by-date`)

    const response = await axios.post(
      `${apiUrl}/subscription-filter-by-date`,
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
    dispatch({ type: GET_SUBSCRIPTION, payload: response.data });

    console.log(response.data, "hello this is res");
  } catch (err) {
    console.log(err, "this is the error");
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
