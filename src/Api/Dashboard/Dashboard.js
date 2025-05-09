import axios from "axios";
import {
  GET_BARCHART_DETAILS,
  GET_BLOCKED_DETAILS,
  GET_BOOKING_DETAILS,
  GET_CANCELLATION_DETAILS,
  GET_DASHBOARD_DETAILS,
  GET_PASSENGER_DETAILS,
} from "../../Store/Type";
import { toast } from "react-toastify";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
const apiUrl = process.env.REACT_APP_API_URL;
export const GetBookingDetails = async (dispatch, setSpinning, device_id) => {
  try {
    const response = await api.get(
      `${apiUrl}/getallbookingdetails/${device_id}`
    );
    dispatch({ type: GET_BOOKING_DETAILS, payload: response.data.data });
    console.log(response.data.data, "all all booking details");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching booking details:", error);
  } finally {
    setSpinning && setSpinning(false);
  }
};

export const GetBookingDetailsById = async (
  updatedata,
  SetUpdateData,
  setOperatorData
) => {
  try {
    const response = await api.get(`${apiUrl}/getbookingsbyid/${updatedata}`);
    // dispatch({ type: GET_BOOKING_DETAILS, payload: response.data.data });
    console.log(response.data, "booking details single");
    return response.data[0];
  } catch (error) {
    console.error("Error fetching booking details:", error);
    return null;
  }
};

export const GetBookingDetailsByDate = async (dispatch, startDate, endDate) => {
  try {
    // const response = await api.get(`${apiUrl}/filter-by-date`)

    const response = await axios.post(
      `${apiUrl}/bookingdetails-based-on-date`,
      {
        start_date: startDate,
        end_date: endDate,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: GET_BOOKING_DETAILS, payload: response.data });

    console.log(response.data, "date response");
  } catch (err) {
    console.log(err, "date error");
  }
};

export const handleBookingDetailsSearch = async (e, dispatch) => {
  try {
    if (e.target.value) {
      const searchTerm = e.target.value;
      console.log(searchTerm, "search term");
      const response =
        searchTerm.trim().length === 0
          ? await axios.get(`${apiUrl}/searchbookingdetails/$`)
          : await axios.get(`${apiUrl}/searchbookingdetails/${searchTerm}`);

      console.log(response.data, "searched data");
      dispatch({ type: GET_BOOKING_DETAILS, payload: response.data });
      return response.data[0];
    } else {
      GetBookingDetails(dispatch, undefined, 0);
    }
  } catch (error) {
    // handleError(error);
    console.log(error, "error searching data");
    return null;
  }
};

// export const GetDashboardDetails = async (dispatch, setSpinning) => {
//   try {
//     const response = await api.get(`${apiUrl}/bookingandcancellationcount`);
//     console.log(response.data, "dashboard response");
//     dispatch({ type: GET_DASHBOARD_DETAILS, payload: response.data });
//     return response.data;
//   } catch (err) {
//     console.log(err, "error fetching dashboard details");
//   } finally {
//     setSpinning && setSpinning(false);
//   }
// };

export const GetDashboardDetails = async (
  dispatch,
  setSpinning,
  deviceId,
  fromDate,
  toDate,
  filter,
  basedon
) => {
  try {
    // const response = await api.get(`${apiUrl}/filter-by-date`)

    const response = await axios.post(
      `${apiUrl}/dashboard/stats`,
      {
        device_id: deviceId,
        from_date: fromDate,
        to_date: toDate,
        duration: filter,
        basedOn: basedon,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: GET_DASHBOARD_DETAILS, payload: response.data.fulldata });

    console.log(response.data.fulldata, "dashboard response");
  } catch (err) {
    console.log(err, "error fetching dashboard response");
  } finally {
        setSpinning && setSpinning(false);
      }
};

export const GetCancellationDetails = async (
  dispatch,
  setSpinning,
  device_id
) => {
  try {
    const response = await api.get(
      `${apiUrl}/getallcancellationdetails/${device_id}`
    );
    console.log(response.data, "cancellation response");
    dispatch({ type: GET_CANCELLATION_DETAILS, payload: response.data });
    return response.data;
  } catch (err) {
    console.log(err, "error fetching cancellation details");
  } finally {
    setSpinning && setSpinning(false);
  }
};
// export const GetCancellationDeviceId=async(device_id,dispatch,setSpinning)=>{
//   try{
//     const response=await api.get(`${apiUrl}/getallcancellationdetails/${device_id}`)
//           dispatch({type: GET_CANCELLATION_DETAILS, payload: response.data})
//           console.log(response.data.data, "all all booking details")

//        }catch (error) {
//             console.error('Error fetching booking details:', error);
//         } finally {
//             setSpinning && setSpinning(false);
//         }

export const GetCancellationDetailsById = async (
  updatedata,
  SetUpdateData,
  setOperatorData
) => {
  try {
    const response = await api.get(
      `${apiUrl}/getcancellationbyid/${updatedata}`
    );
    console.log(response.data, "cancellation details single");
  } catch (error) {
    console.error("Error fetching booking details:", error);
    return null;
  }
};

export const GetCancellationDetailsByDate = async (
  dispatch,
  startDate,
  endDate
) => {
  try {
    // const response = await api.get(`${apiUrl}/filter-by-date`)

    const response = await axios.post(
      `${apiUrl}/cancellationdetails-based-on-date`,
      {
        start_date: startDate,
        end_date: endDate,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: GET_CANCELLATION_DETAILS, payload: response.data });

    console.log(response.data, "date response");
  } catch (err) {
    console.log(err, "date error");
  }
};

export const handleCancellationDetailsSearch = async (e, dispatch) => {
  try {
    if (e.target.value) {
      const searchTerm = e.target.value;
      const response =
        searchTerm.trim().length === 0
          ? await axios.get(`${apiUrl}/searchcancellationhistory/$`)
          : await axios.get(
              `${apiUrl}/searchcancellationhistory/${searchTerm}`
            );

      dispatch({ type: GET_CANCELLATION_DETAILS, payload: response.data });
      // return response.data[0];
    } else {
      GetCancellationDetails(dispatch, undefined, 0);
    }
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const GetPassengerDetails = async (dispatch, setSpinning, device_id) => {
  try {
    const response = await api.get(
      `${apiUrl}/getallpassengerdetails/${device_id}`
    );
    console.log(response.data, "passenger response");
    dispatch({ type: GET_PASSENGER_DETAILS, payload: response.data });
    return response.data;
  } catch (err) {
    console.log(err, "error fetching passenger details");
  } finally {
    setSpinning && setSpinning(false);
  }
};

export const handlePassengerDetailsSearch = async (e, dispatch) => {
  try {
    if (e.target.value) {
      const searchTerm = e.target.value;
      const response =
        searchTerm.trim().length === 0
          ? await axios.get(`${apiUrl}/searchpassengerdetails/$`)
          : await axios.get(`${apiUrl}/searchpassengerdetails/${searchTerm}`);

      dispatch({ type: GET_PASSENGER_DETAILS, payload: response.data });
      console.log(response.data[0], "searched passenger data");
      return response.data[0];
    } else {
      GetPassengerDetails(dispatch, undefined, 0);
    }
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const GetBlockedDetails = async (dispatch, setSpinning, device_id) => {
  try {
    const response = await api.get(
      `${apiUrl}/getblockedticketdetails/${device_id}`
    );
    // console.log(response?.data?.data, "all blocked details")
    dispatch({ type: GET_BLOCKED_DETAILS, payload: response?.data });
    return response?.data;
  } catch (err) {
    console.log("Error fetching blocked details:", err);
  } finally {
    setSpinning && setSpinning(false);
  }
};

export const handleBlockedDetailsSearch = async (e, dispatch) => {
  try {
    if (e.target.value) {
      const searchTerm = e.target.value;
      const response =
        searchTerm.trim().length === 0
          ? await axios.get(`${apiUrl}/searchblockedticketdetails/$`)
          : await axios.get(
              `${apiUrl}/searchblockedticketdetails/${searchTerm}`
            );
      console.log(response.data, "searched blocked data");
      dispatch({ type: GET_BLOCKED_DETAILS, payload: response.data });
    } else {
      GetBlockedDetails(dispatch, undefined, 0);
    }
  } catch (err) {
    console.log("error searching blocked details:", err);
    return null;
  }
};

export const GetBlockedDetailsByDate = async (dispatch, startDate, endDate) => {
  try {
    // const response = await api.get(`${apiUrl}/filter-by-date`)

    const response = await axios.post(
      `${apiUrl}/blockeddetails-based-on-date`,
      {
        start_date: startDate,
        end_date: endDate,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: GET_BLOCKED_DETAILS, payload: response.data });

    console.log(response.data, "blocked date response");
  } catch (err) {
    console.log(err, "date error");
  }
};

export const GetBarChartDetails = async (dispatch, filter, based_on) => {
  try {
    const response = await axios.post(
      `${apiUrl}/dashboard/analytics`,
      {
        duration: filter,
        basedOn: based_on,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data.result, "chartdata");
    dispatch({ type: GET_BARCHART_DETAILS, payload: response.data.result });
  } catch (err) {
    console.log(err, "date error");
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
