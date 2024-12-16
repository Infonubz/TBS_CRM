import axios from "axios";
import { toast } from "react-toastify";
import { OPERATOR_DATA } from "../../../Store/Type";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

const apiUrl = process.env.REACT_APP_API_URL;
const userType = sessionStorage.getItem("type_name");
const typeId = sessionStorage.getItem("type_id");
const userID = sessionStorage.getItem("USER_ID");

const endpoint = userID?.startsWith("tbs-pro")
  ? `${apiUrl}/pro-emp-personal-details${
      typeId === "PROEMP101" ? `/${userID}` : ""
    }`
  : `${apiUrl}/All-emp-details${typeId == "EMP101" ? `/${userID}` : ""}`;

export const GetEmployeePersonalData = async () => {
  const typeEmp =
    typeId === "PROEMP101"
      ? "pro-emp-personal-details"
      : "emp-personal-details";
  try {
    const response = await api.get(
      `${apiUrl}/${typeEmp}${
        typeId === "PROEMP101" || "OPEMP101" ? `/${userID}` : ""
      }`
    );
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const GetEmployeeAddressData = async () => {
  const typeEmp =
    typeId === "PROEMP101"
      ? "pro-emp-registered-address"
      : "emp-registered-address";
  try {
    const response = await api.get(
      `${apiUrl}/${typeEmp}${
        typeId === "PROEMP101" || "OPEMP101" ? `/${userID}` : ""
      }`
    );
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};
export const GetEmployeeProfessionalData = async () => {
  const typeEmp =
    typeId === "PROEMP101"
      ? "pro-emp-professional-details"
      : "emp-professional-details";
  try {
    const response = await api.get(
      `${apiUrl}/${typeEmp}${
        typeId === "PROEMP101" || "OPEMP101" ? `/${userID}` : ""
      }`
    );
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};
export const GetEmployeeDocumentData = async () => {
  const typeEmp =
    typeId === "PROEMP101"
      ? "pro-emp-professional-documents"
      : "emp-professional-documents";
  try {
    const response = await api.get(
      `${apiUrl}/${typeEmp}${
        typeId === "PROEMP101" || "OPEMP" ? `/${userID}` : ""
      }`
    );
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const submitEmpPersonalData = async (values, fileList) => {
  const formData = new FormData();

  formData.append("emp_first_name", values.firstname);
  formData.append("emp_last_name", values.lastname);
  formData.append("phone", values.phone);
  formData.append("email_id", values.emailid);
  formData.append("alternate_phone", values.alt_phone);
  formData.append("date_of_birth", values.dob);
  formData.append("gender", values.gender);
  formData.append("blood_group", values.blood);
  if (fileList[0]?.originFileObj) {
    formData.append("profile_img", fileList[0].originFileObj);
  }

  const submiturl = userID?.startsWith("tbs-pro")
    ? `${apiUrl}/pro-emp-personal-details/${userID}`
    : `${apiUrl}/emp-personal-detail/${userID}`;

  const method = "put";
  const url = submiturl;
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

export const submitEmployeeAddressData = async (values, dispatch) => {
  const payload = {
    temp_add: values.temp_address,
    temp_country: values.temp_country,
    temp_state: values.temp_state,
    temp_city: values.temp_city,
    temp_zip_code: values.temp_postal,
    temp_region: values.temp_region,
    perm_add: values.per_address,
    perm_country: values.per_country,
    perm_state: values.per_state,
    perm_city: values.per_city,
    perm_zip_code: values.per_postal,
    perm_region: values.per_region,
  };

  const url = userID.startsWith("tbs-pro")
    ? `${apiUrl}/pro-emp-registered-address/${userID}`
    : `${apiUrl}/emp-registered-address/${userID}`;

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

    console.log(response, "responseresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const submitEmployeeProffesionalData = async (values) => {
  const payload = {
    joining_date: values.join_date,
    designation: values.designation,
    role: values.role,
    branch: values.branch,
    department: values.department,
    reporting_manager: values.report_manager,
    qualification: values.qualification,
    language: values.language,
  };

  const url = userID.startsWith("tbs-pro")
    ? `${apiUrl}/pro-emp-professional-details/${userID}`
    : `${apiUrl}/emp-professional-details/${userID}`;

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
    console.log(response, "responseresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const SubmitEmpDocumentsData = async (values) => {
  const formData = new FormData();
  formData.append("aadhar_card_number", values.aadhar_number);
  formData.append("pan_card_number", values.pan_number);
  formData.append("aadhar_card_front_doc", values.aadhar_doc);
  formData.append("aadhar_card_back_doc", values.aadhar_bk_doc);
  formData.append("pan_card_front_doc", values.pan_doc);
  formData.append("pan_card_back_doc", values.pan_bk_doc);
  formData.append("offer_letter_doc", values.offerletter);
  formData.append("qualification_doc", values.qualification);

  const url = userID?.startsWith("tbs-pro")
    ? `${apiUrl}/pro-emp-professional-documents/${userID}`
    : `${apiUrl}/emp-professional-documents/${userID}`;
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
    console.log(response, "responseresponse");
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
