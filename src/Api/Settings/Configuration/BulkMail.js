import axios from "axios";
import { GET_OPERATOR_EMAILID } from "../../../Store/Type";

const api = axios.create({
    headers: { "content-Type": "application/json", }
})
const apiUrl = process.env.REACT_APP_API_URL;
const webApiUrl = process.env.REACT_APP_API_WEB_URL;

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


export const GetAllEmail = async (dispatch,setToMailOption,view) => {
    try {
        const response = view === "operator" ? await api.get(`${apiUrl}/operators-emailid`) : await api.get(`${webApiUrl}/passenger-email`)
        console.log(response.data.emailid, "i got the response data")
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
// export const GetAllEmail = async (dispatch, setToMailOption, view) => {
//     try {
//         // Determine the API endpoint based on the 'view'
//         const response = view === "operator"
//             ? await api.get(`${apiUrl}/operators-emailid`)
//             : await api.get(`${webApiUrl}/passenger-email`);

//         // Check if 'email_id' exists in the response data
//         if (response.data.email_id) {
//             // Transform email_id to emailid
//             const transformedData = {
//                 ...response.data,
//                 emailid: response.data.email_id.replace('_', ''),  // Remove the underscore
//             };

//             // Remove the old email_id field if you don't want it
//             delete transformedData.email_id;

//             // Dispatch the transformed data to Redux
//             dispatch({
//                 type: GET_OPERATOR_EMAILID,
//                 payload: transformedData,
//             });

//             // Also pass the transformed data to setToMailOption
//             setToMailOption(transformedData);
//         } else {
//             // If there's no email_id field, dispatch the original data
//             dispatch({
//                 type: GET_OPERATOR_EMAILID,
//                 payload: response.data,
//             });

//             setToMailOption(response.data);
//         }
//     } catch (err) {
//         console.log(err);
//     }
// };



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