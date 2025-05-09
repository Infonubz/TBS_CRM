import axios from "axios";
import { GET_ALL_MOBILE_NUMBERS } from "../../../Store/Type";

const api = axios.create({
    headers: { "content-Type": "application/json", }
})
const apiUrl = process.env.REACT_APP_API_URL;
const webApiUrl = process.env.REACT_APP_API_WEB_URL;

export const GetAllMobileNumber = async (dispatch, setToMobileOption, view) => {
    try {
        const response = view === "operator" ? await api.get(`${apiUrl}/getoperatorsmobilenumber`) : await api.get(`${apiUrl}/getpassengermobilenumber`)
        console.log(response.data,"mobile numbers")
        dispatch({type: GET_ALL_MOBILE_NUMBERS, payload: response.data})
        setToMobileOption(response.data)
    } catch (err) {
        console.log(err,"error fetching all mobile numbers")
    }
}