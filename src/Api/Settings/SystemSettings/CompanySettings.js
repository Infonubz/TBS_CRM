import axios from "axios";
import { COMPANY_SETTING } from "../../../Store/Type";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
const apiUrl = process.env.REACT_APP_API_URL;

export const GetCompanySetting = async (dispatch) => {
  try {
    const response = await api.get(`${apiUrl}/company-settings`);
    dispatch({ type: COMPANY_SETTING, payload: response.data });
    console.log(response.data, "company Settings");
    return response.data[0];
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const SubmitCompanySetting = async (values, companyId, dispatch) => {
  const payload = {
    company_name: values.company_name,
    financial_year_end: values.financial_year_end,
    base_currency: values.base_currency,
    tax_name: values.tax_name,
    tax_rate: values.tax_rate,
    user_id: sessionStorage.getItem("USER_ID"),
  };
  console.log(
    companyId,
    "updatedataupdatedataupdatedataupdatedataupdatedataupdatedataupdatedata"
  );
  const url = companyId
    ? `${apiUrl}/company-settings/${companyId}`
    : `${apiUrl}/company-settings`;
  const method = companyId ? "put" : "post";

  try {
    const response = await api({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
    GetCompanySetting(dispatch);
    console.log(payload, "responseresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const GetCompanyDataById = async (UserId, setCompanyData) => {
  console.log(UserId, "ahsgxdahsjksaxbj");
  try {
    const response = await api.get(`${apiUrl}/company-setting/${UserId}`);
    console.log(response, "responseresponse");
    setCompanyData("");
    return response?.data[0];
  } catch (error) {
    handleError(error);
    return null;
  }
};

const handleError = (error) => {
  if (error.response) {
    console.error("Error response from server:", error.response);
  } else if (error.request) {
    console.error("No response received:", error.request);
  } else {
    console.error("Error setting up request:", error.message);
  }
};
