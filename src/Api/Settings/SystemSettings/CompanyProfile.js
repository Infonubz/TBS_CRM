import axios from "axios";
import { COMPANY_PROFILE } from "../../../Store/Type";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
const apiUrl = process.env.REACT_APP_API_URL;

export const GetCompanyProfile = async (dispatch) => {
  try {
    const response = await api.get(`${apiUrl}/operators/1058`);
    dispatch({ type: COMPANY_PROFILE, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const SubmitCompanyProfile = async (values, updatedata) => {
  const formData = new FormData();
  formData.append("company_name", values.companyname);
  formData.append("owner_name", values.ownername);
  formData.append("phone", values.phone);
  formData.append("alternate_phone", values.alternate_phone);
  formData.append("emailid", values.emailid);
  formData.append("alternate_emailid", values.alternate_emailid);
  formData.append("aadharcard_number", values.aadhar_card);
  formData.append("pancard_number", values.pan_card);
  formData.append("type_of_constitution", values.constitution);
  formData.append("msme_type", values.msme_type);
  formData.append("msme_number", values.msme_number);
  formData.append("type_of_service", values.service);
  formData.append("currency_code", values.currency_code);
  formData.append("address", values.address);
  formData.append("state", values.state);
  formData.append("region", values.region);
  formData.append("city", values.city);
  formData.append("country", values.country);
  formData.append("zip_code", values.zip_code);
  formData.append("state_name", values.state);
  formData.append("gstin", values.gstn_number);
  formData.append("created_date", values.created_date);
  formData.append("user_status", values.user_status);
  formData.append("business_id", values.business_id);
  formData.append("business_background", values.business_background);
  formData.append("has_gstin", values.has_gstin);
  formData.append(
    "aggregate_turnover_exceeded",
    values.aggregate_turnover_exceeded
  );
  formData.append("state_code_number", values.state_code_number);
  formData.append("head_office", values.head_office);
  formData.append("upload_gst", values.upload_gst);
  formData.append("aadar_front_doc", values.aadar_front_doc);
  formData.append("aadar_back_doc", values.aadar_back_doc);
  formData.append("pancard_front_doc", values.pancard_front_doc);
  formData.append("pancard_back_doc", values.pancard_back_doc);
  formData.append("msme_doc", values.msme_doc);
  formData.append("state_id", values.state_id);
  formData.append("country_id", values.country_id);
  formData.append("city_id", values.city_id);

  const url = `${apiUrl}/operators/1058`;
  const method = "put";

  try {
    const response = await api({
      method,
      url,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const GetCompanyProfileById = async () => {
  try {
    const response = await api.get(`${apiUrl}/operators/1058`);
    return response.data[0];
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
