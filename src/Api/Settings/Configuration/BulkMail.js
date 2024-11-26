import axios from "axios";
import { GET_OPERATOR_EMAILID } from "../../../Store/Type";

const api = axios.create({
    headers: { "content-Type": "application/json", }
})
const apiUrl = process.env.REACT_APP_API_URL;

export const postBulkMail = async (values, email, body, view) => {

    console.log(values, email, body, view, 'bulkmail_values ')
    const userid = sessionStorage.getItem("USER_ID")
    const Operator = "OPERATOR"
    const payload = {
        user_name: view,
        tbs_user_id: userid,
        to_email: email,
        subject: values.subject,
        body: body,
    }

    console.log(payload, userid, "api print all values");
    try {
        const url = `${apiUrl}/sendBulkMail`;
        const method = "post"
        const response = await api({
            method,
            url,
            data: payload,
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(response.data);
        console.log(payload, "my payload data");
    }
    catch (err) {
        console.log(err);
    }

}

export const GetAllEmail = async (setToMailOption, dispatch) => {
    try {
        const response = await api.get(`${apiUrl}/operators-emailid`)
        console.log(response.data, "i got the response data")
        dispatch({
            type: GET_OPERATOR_EMAILID,
            payload: response.data,
        });
        setToMailOption(response.data)
    }
    catch (err) {
        console.log(err);
    }
}


export const GetFromMail = async (setFromMail) => {
    try {
        const response = await api.get(`${apiUrl}/getFromEmail`)
        console.log(response.data, "from email");
        // setFromMail(response.data.map(v=>v.from_email))
        setFromMail(response.data.from_email)
    }
    catch (err) {
        console.log(err);
    }
}
//  GetAllEmail()