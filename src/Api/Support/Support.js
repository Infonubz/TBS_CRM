import axios from "axios";
const api = axios.create({
  headers: {
    "content-Type": "application/json",
  },
});

const apiUrl = process.env.REACT_APP_API_URL;

export const PostSupportData = async (values) => {
  //   console.log(values, "tis is imported");
  const payload = {
    name: values.name,
    phone: values.phone,
    email: values.mail,
    message: values.message,
  };

  try {
    const responce = await api.post(`${apiUrl}/submit-inquiry`, payload);
    return responce.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
