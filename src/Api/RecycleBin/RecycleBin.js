import axios from "axios";
import { BIN_DATA } from "../../Store/Type";
import { toast } from "react-toastify";

const apiUrl = process.env.REACT_APP_API_URL;

export const GetBinData = async (dispatch,id,setSpinning) => {
  try {
    const response = await axios.get(`${apiUrl}/recycle-bin/${id}`);
    console.log(response.data, "hellowfjdf");
    dispatch({ type: BIN_DATA, payload: response.data });
  } catch (err) {
    console.log(err);
    
  }
  finally{
    setSpinning && setSpinning(false)
  }
};

export const SearchBindData = async (dispatch, id, e) => {
  try {
    const response = await axios.post(`${apiUrl}/recycle-bin/${id}`, {
      searchTerm: e,
    });
    dispatch({ type: BIN_DATA, payload: response.data });
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
};

export const DeleteBinData = async (dispatch, id, tab) => {
  const endpoints = {
    1: `permanent-delete-offers/${id}`,
    2: `permanent-delete-promotions/${id}`,
    3: `permanent-delete-webAds/${id}`,
    4: `permanent-delete-mobAds/${id}`,
    5: `permanent-delete-operators/${id}`,
    6: `permanent-delete-op-emp/${id}`,
    7: `permanent-delete-clients/${id}`,
    8: `permanent-delete-pro-emp/${id}`,
    9: `permanent-delete-partner/${id}`,
  };

  try {
    const endpoint = endpoints[tab];

    const response = await axios.delete(`${apiUrl}/${endpoint}`);
    return response.data.message || "Deleted successfully";
  } catch (err) {
    console.log(err);
  } finally {
    GetBinData(dispatch, tab);
  }
};

export const RestoreBinData = async (dispatch, id, tab) => {
  const endpoints = {
    1: `restore-offers/${id}`,
    2: `restore-promotions/${id}`,
    3: `restore-webAds/${id}`,
    4: `restore-mobAds/${id}`,
    5: `restore-operators/${id}`,
    6: `restore-op-emp/${id}`,
    7: `restore-clients/${id}`,
    8: `restore-pro-emp/${id}`,
    9: `restore-partner/${id}`,
  };

  try {
    const endpoint = endpoints[tab];

    const response = await axios.post(`${apiUrl}/${endpoint}`);
    return response.data.message || "Restored successfully";
  } catch (err) {
    console.error(err);
  } finally {
    GetBinData(dispatch, tab);
  }
};
