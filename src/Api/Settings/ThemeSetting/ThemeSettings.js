import axios from "axios";
import { toast } from "react-toastify";
import { THEME_BACKGROUND } from "../../../Store/Type";

const api = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
});
const apiUrl = process.env.REACT_APP_API_URL;

export const GetThemeBg = async (dispatch) => {
    try {
        const response = await api.get(`${apiUrl}/themes`);
        console.log(response.data, "tbs_info_success");
        dispatch({
            type: THEME_BACKGROUND,
            payload: response.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const GetThemeById = async (
    updatedata
) => {
    console.log(updatedata, "ahsgxdahsjksaxbj");
    try {
        const response = await api.get(`${apiUrl}/themes/${updatedata}`);
        console.log(response, "responseresponse");
        return response.data;
    } catch (error) {
        handleError(error);
        return null;
    } finally {
        // setLoading(false);   
    }
};


export const submitThemeBg = async (updatedata, values, dispatch) => {

    const formData = new FormData();

    formData.append('background', values.background)
    formData.append('sky', values.sky)
    formData.append('building', values.buildings)
    formData.append('road', values.road)
    formData.append('title', values.title)

    const url = updatedata
        ? `${apiUrl}/themes/${updatedata}`
        : `${apiUrl}/themes`;
    const method = updatedata ? "put" : "post";

    try {
        const response = await api({
            method,
            url,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        GetThemeBg(dispatch)
        toast.success(response?.data?.message)
        console.log(response, 'theme_submission')
    } catch (err) {
        console.log(err)
    }
}

export const DeleteTheme = async (dispatch, deleteId) => {
    try {
        const response = await api.delete(`${apiUrl}/themes/${deleteId}`);
        console.log(response?.data, "response.data5555");
        toast.success(response?.data?.message);
        GetThemeBg(dispatch)
        return response?.data;
    } catch (error) {
        handleError(error);
        return null;
    }
};


export const ChangeTHemeStatus = async (dispatch, currentid, status_id, status) => {
    const payload = {
        status: status,
        status_id: status_id
    };

    const url = `${apiUrl}/themes/${currentid}`;
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
        GetThemeBg(dispatch)
        toast.success(response?.data?.message)
        console.log(response, 'datatatatatatatatatatatatatsdfasdf')
        return response.data;
    } catch (error) {
        handleError(error);
        return null;
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
