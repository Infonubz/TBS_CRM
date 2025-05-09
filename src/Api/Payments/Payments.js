import axios from "axios";
// import { decrypt } from "dotenv";
// import { toast } from "react-toastify";
// import CryptoJS from "crypto-js";
import {decryptData} from "../../Componenets/Common/Encrypt-Decrypt"
import { GET_AVAILABLE_BALANCE, GET_PAYMENT_DETAILS, GET_REFUND_DETAILS, GET_SETTLEMENT_DETAILS } from "../../Store/Type";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
const apiUrl = process.env.REACT_APP_API_URL;

export const GetPayDashDetails = async (dispatch, setSpinning) => {
  try {
    const response = await api.get(`${apiUrl}/checkavailBalance`);
    console.log(response?.data?.availablebalance, "pay response");
    const availablebalance = decryptData(response?.data?.availablebalance);
    console.log(availablebalance);
    
    console.log(availablebalance, "Payment dashboard response");
    dispatch({ type: GET_AVAILABLE_BALANCE, payload: availablebalance });
    return availablebalance;
  } catch (error) {
    console.log(error, "error fetching payments dashboard details");
  } finally {
    setSpinning && setSpinning(false);
  }
};

export const GetPaymentDetails = async (count,skip,dispatch,setSpinning) => {
  const payload = {
    count: count,
    skip: skip,
  }
  try {
    console.log(payload,"payload")
    const response = await axios.post(`${apiUrl}/razorpay-payments`, payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    })
    console.log(response.data.data.items, "payment response");
    const paymentDetails = response.data.data.items
    dispatch({type: GET_PAYMENT_DETAILS, payload: paymentDetails})
    return paymentDetails;
  } catch (error) {
    console.log(error, "error fetching payment details");
  } finally {
    setSpinning && setSpinning(false);
  }
};

export const GetSettlementDetails = async (count,skip,dispatch,setSpinning) => {
  const payload = {
    count: count,
    skip: skip,
  }
  try {
    console.log(payload,"payload")
    const response = await axios.post(`${apiUrl}/razorpay-settlement`, payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    })
    console.log(response.data.data.items, "settlement response");
    const settlementDetails = response.data.data.items
    dispatch({type: GET_SETTLEMENT_DETAILS, payload: settlementDetails})
    return settlementDetails;
  } catch (error) {
    console.log(error, "error fetching settlement details");
  } finally {
    setSpinning && setSpinning(false);
  }
};

export const GetRefundDetails = async (count,skip,dispatch,setSpinning) => {
  const payload = {
    count: count,
    skip: skip,
  }
  try {
    console.log(payload,"payload")
    const response = await axios.post(`${apiUrl}/razorpay-refund`, payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    })
    console.log(response.data.data.items, "refund response");
    const refundDetails = response.data.data.items
    dispatch({type: GET_REFUND_DETAILS, payload: refundDetails})
    return refundDetails;
  } catch (error) {
    console.log(error, "error fetching refund details");
  } finally {
    setSpinning && setSpinning(false);
  }
};