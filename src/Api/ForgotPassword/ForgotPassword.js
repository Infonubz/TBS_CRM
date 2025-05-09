import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = process.env.REACT_APP_API_URL;

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

const userType = sessionStorage.getItem("type_name");
const typeId = sessionStorage.getItem("type_id")
  ? sessionStorage.getItem("type_id")
  : localStorage.getItem("type_id");
const userID = sessionStorage.getItem("USER_ID");

export const SendOTP = async (otpMail,typeID, setSpinning) => {
  // alert(typeID)
  console.log(typeID,"ididid");
  
  // const key =
  //   typeId === "PRO101" || typeId === "PROEMP101" || typeId === "OPEMP101"
  //     ? "email_id"
  //     : "emailid";
  const key =
  typeID === "PRO101" || typeID === "PROEMP101" || typeID === "OPEMP101"
    ? "email_id"
    : "emailid";
  console.log(key,"keeeeeeeeeeey")
  const payload = {
    [key]: otpMail,
  };

  const loginMap = {
    PRO101: "proforgot-password",
    OP101: "opforgot-password",
    PROEMP101: "proemp-forgot-password",
    OPEMP101: "opemp-forgot-password",
    PART101: "partner-forgot-password",
  };

  const Login = loginMap[typeID] || "";
  console.log(payload, "---new otp");
  const url = `${apiUrl}/${Login}`;
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
    console.log(response.request.status,"otp response")
    if(response.request.status === 200) {
      toast.success(response?.data.message);
    }
    return response;
  } catch (error) {
    throw error;
  } finally {
    setSpinning(false);
  }
};

// changed newValues to values --------------------------------------------------------------------------------------------------------
export const ResetPassword = async (values,typeID, setSpinning) => {
  // const key =
  //   typeId === "PRO101" || typeId === "PROEMP101" || typeId === "OPEMP101"
  //     ? "email_id"
  //     : "emailid";
  const key =
  typeID === "PRO101" || typeID === "PROEMP101" || typeID === "OPEMP101"
    ? "email_id"
    : "emailid";

  const loginMap = {
    PRO101: "proreset-password",
    OP101: "opreset-password",
    PROEMP101: "proemp-reset-password",
    OPEMP101: "opemp-reset-password",
    PART101: "partner-reset-password",
  };

  const Login = loginMap[typeID] || "";

  const payload = {
    [key]: values.email_id,
    otp: values.otp,
    newPassword: values.newPassword,
  };
  console.log(payload, "---new Password");
  const url = `${apiUrl}/${Login}`;
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
    console.log(response.data, "---new dataaaa")
    return  response
    ;
  } catch (error) {
    throw error;
  } finally {
    setSpinning(false);
  }
};
