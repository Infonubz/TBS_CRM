import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = process.env.REACT_APP_API_URL;

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export const SendOTP = async (otpMail) => {
  const payload = {
    email_id: otpMail,
  };

  console.log(payload, "---new otp");
  const url = `${apiUrl}/proforgot-password`;
  const method = "post";

  try {
    const response = await axios({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success(response?.data.message);
    return response;
  } catch (error) {
    throw error;
  }
};

export const ResetPassword = async (newValues) => {
  const payload = {
    email_id: newValues.email_id,
    otp: newValues.otp,
    newPassword: newValues.newPassword,
  };
  console.log(payload, "---new Password");
  const url = `${apiUrl}/proreset-password`;
  const method = "post";

  try {
    const response = await axios({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success(response?.data.message);
    return response;
  } catch (error) {
    throw error;
    
  }
};
