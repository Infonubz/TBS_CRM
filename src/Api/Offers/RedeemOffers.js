import axios from "axios";
import { GET_RECENT_OFFERS, REDEEM_OFFER } from "../../Store/Type";
import { toast } from "react-toastify";
const api = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
});
const apiUrl = process.env.REACT_APP_API_URL;

export const GetRedeemOffersData = async (dispatch) => {
    try {
        const response = await axios.get(`${apiUrl}/redeem-offers-deals`);
        dispatch({ type: REDEEM_OFFER, payload: response.data });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};



export const SubmitRedeemExcel = async (file) => {
    const formData = new FormData();
    formData.append("xlsxFile", file);
    const excelEndpoint = `${apiUrl}/redeem-offers-deals-importExcel`;
    const method = "post";
    try {
        const response = await api({
            url: excelEndpoint,
            method: method,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        console.log("Offers_Response", response);

        if (response.status >= 200 && response.status < 300) {
            if (typeof response.data === "string" && response.data.includes("Error")) {
                toast.error(response.data);
            } else {
                toast.success(response.data);
            }
        }
      
        return response.data;
    } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("Failed to upload file");
        return null;
    }
};


export const SubmitRedeemOffersData = async (
    promotionvalues,
    updatedata,
    dispatch,
    offerlist,
    useage
) => {
    console.log(promotionvalues, "promotionvalues.file");
    const formData = new FormData();
    formData.append(
        "offer_name",
        promotionvalues.promotion_name ? promotionvalues.promotion_name : null
    );
    formData.append("code", promotionvalues.code ? promotionvalues.code : null);
    formData.append(
        "start_date",
        promotionvalues.start_date ? promotionvalues.start_date : new Date()
    );
    formData.append(
        "expiry_date",
        promotionvalues.expiry_date ? promotionvalues.expiry_date : new Date()
    );
    formData.append(
        "usage",
        useage ? useage : null
    );
    formData.append(
        "status",
        promotionvalues.status ? promotionvalues.status : null
    );


    formData.append(
        "status_id",
        promotionvalues.status == "Draft"
            ? 1
            : promotionvalues.status == "Requested"
                ? 2
                : 3
    );
    formData.append(
        "req_status",
        promotionvalues.status == "Draft"
            ? "Draft"
            : promotionvalues.status == "Requested"
                ? "Pending"
                : "Approved"
    );
    formData.append(
        "req_status_id",
        promotionvalues.status == "Draft"
            ? 0
            : promotionvalues.status == "Requested"
                ? 1
                : 3
    );

    formData.append(
        "offer_desc",
        promotionvalues.promotion_description
            ? promotionvalues.promotion_description
            : null
    );
    formData.append(
        "offer_img",
        promotionvalues.file ? promotionvalues.file : null
    );
    formData.append("occupation_id", offerlist?.occupation);
    formData.append(
        "occupation",
        offerlist?.occupation == 1
            ? "Business"
            : offerlist?.occupation == 2
                ? "General Public"
                : offerlist?.occupation == 3
                    ? "Handicapped"
                    : offerlist?.occupation == 4
                        ? "Pilgrim"
                        : offerlist?.occupation == 5
                            ? "Senior Citizen"
                            : offerlist?.occupation == 6
                                ? "Student"
                                : offerlist?.occupation == 7
                                    ? "Tourist"
                                    : ""
    );
    formData.append("theme", offerlist?.offer_bgImgae);
    formData.append("tbs_user_id", sessionStorage.getItem("USER_ID"));

    console.log(
        updatedata,
        "ADD_UPDATE_OFFERS_DATA"
    );
    const url = updatedata
        ? `${apiUrl}/redeem-offers-deals/${updatedata}`
        : `${apiUrl}/redeem-offers-deals`;
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
        GetRedeemOffersData(dispatch);
        console.log(response, "responseresponse");
        return response.data;
    } catch (error) {
        handleError(error);
        return null;
    }
};

export const GetRedeemOffersById = async (
    updatedata,
    SetUpdateData,
    setOfferData
) => {
    console.log(updatedata, "ahsgxdahsjksaxbj");
    try {
        const response = await api.get(`${apiUrl}/redeem-offers-deals/${updatedata}`);
        console.log(response, "responseresponse");
        setOfferData("");
        return response?.data[0];
    } catch (error) {
        handleError(error);
        return null;
    }
};

export const handleRedeemoffersearch = async (e, dispatch) => {
    try {
        if (e.target.value) {
            const response = await api.get(
                `${apiUrl}/redeem-offers-deals-search/${e.target.value}`
            );
            dispatch({ type: REDEEM_OFFER, payload: response.data });
            return response.data[0];
        } else {
            GetRedeemOffersData(dispatch);
        }
    } catch (error) {
        handleError(error);
        return null;
    }
};
export const GetRedeemRecentOffers = async (dispatch) => {
    try {
        const response = await axios.get(`${apiUrl}/redeem-recentOffers`);
        dispatch({ type: GET_RECENT_OFFERS, payload: response.data });
        console.log(response, "response from recent offers");

        return response.data;
    } catch (error) {
        handleError(error);

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
