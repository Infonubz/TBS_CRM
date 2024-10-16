import axios from "axios";
import { BIN_DATA } from "../../Store/Type";
import { toast } from "react-toastify";

const apiUrl = process.env.REACT_APP_API_URL;

export const GetBinData = async (dispatch, id) => {
  try {
    const response = await axios.get(`${apiUrl}/recycle-bin/${id}`);
    console.log(response.data, "hellowfjdf");
    dispatch({ type: BIN_DATA, payload: response.data });
  } catch (err) {}
};

export const DeleteBinData = async (dispatch, url, getId) => {
  try {
    const response = await axios.delete(`${url}`);
    // console.log(response.data.message,"hhhhh");

    GetBinData(dispatch, 1);
    return response.data.message;
  } catch (err) {
    console.log(err);
  }
};

export const RestoreBinData = async (dispatch, url, getId) => {
  console.log(dispatch, url, getId, apiUrl, "fkjfdjjksldfjk");

  try {
    if (url === 5) {
      const response = await axios.post(`${apiUrl}/restore-operators/${getId}`);
      return response.message;
    }
    // const response = axios.post(`${url}`)
    console.log(response.data, "hello");
    GetBinData(dispatch, url);
    return response.message;
  } catch (err) {
    console.log(err);
  }
};
