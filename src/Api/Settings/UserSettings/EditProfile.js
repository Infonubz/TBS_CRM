import axios from "axios";
import { USER_SETTINGS_EDIT } from "../../../Store/Type";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

const apiUrl = process.env.REACT_APP_API_URL;

export const EditUserSettings = async (id, dispatch) => {
  console.log("hello i am printing", id);
  try {
    const response = await axios.get(`${apiUrl}/product_owner/${id}`);
    console.log(response.data, "this is responce data");
    // dispatch({type:USER_SETTINGS_EDIT ,payload:response.data})
    dispatch({ type: USER_SETTINGS_EDIT, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const UpdateEditUserSettings = async (id, owname, dispatch) => {
  console.log("i am printing here", id, owname);
  try {
    const response = await axios.put(`${apiUrl}/product_owner/${id}`, {
      owner_name: owname,
    });
    dispatch({ type: USER_SETTINGS_EDIT, payload: response.data });
    sessionStorage.setItem("user_name", owname);
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
};
