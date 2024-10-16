import axios from "axios";
import { GET_ALL_EMAIL_INFO } from "../../../Store/Type";

const api = axios.create({
  headers: { "content-Type": "application/json" },
});

const apiUrl = process.env.REACT_APP_API_URL;

export const GetAllEmailInformation = async (dispatch) => {
  try {
    const response = await api.get(`${apiUrl}/config-email-information`);
    console.log(response.data, "all email data in email info");
    dispatch({ type: GET_ALL_EMAIL_INFO, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};
