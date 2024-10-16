import { Formik } from "formik";
import { useEffect, useState } from "react";
import { GetAllEmailInformation } from "../../../Api/Settings/Configuration/EmailInformation";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const EmailInformation = () => {
  const [passwordVisibility, setPasswordVisibility] = useState({
    password1: false,
    password2: false,
    password3: false,
    password4: false,
  });

  const togglePasswordVisibility = (passwordKey) => {
    setPasswordVisibility((prevVisibility) => ({
      ...prevVisibility,
      [passwordKey]: !prevVisibility[passwordKey],
    }));
  };
  const dispatch = useDispatch();

  const [EmailInfo] = useSelector((state) => state?.crm?.get_all_email_info);

  useEffect(() => {
    GetAllEmailInformation(dispatch);
  }, []);

  console.log(EmailInfo, "Email Datassssss");

  return (
    <div className="p-[1vw] max-h-[28vw] overflow-auto">
      <div className="card1 mb-[1vw] shadow-[0_4px_6px_rgba(31,_75,_127,_0.5)]   rounded-lg p-[1vw] ">
        <div className="text-center text-[2vw] pb-[1vw] font-semibold">
          Support
        </div>
        <div className="flex justify-evenly text-[#1F4B7F]">
          <span>
            <div  className="font-semibold"> Email</div>
            <input
              className="border border-b-2 w-[26vw] h-[3vw] border-r-2 cursor-not-allowed  rounded-[.3vw] pl-[1vw] outline-none"
              type="text"
              readOnly
              value={EmailInfo?.support?.email}
            />
          </span>
          <span className="relative">
            <div className="font-semibold">Password</div>
            <input
              className="border border-b-2 w-[26vw] h-[3vw] border-r-2 cursor-not-allowed  rounded-[.3vw] pr-[2rem] pl-[1vw] outline-none"
              type={passwordVisibility.password1 ? "text" : "password"}
              value={EmailInfo?.support?.password}
              readOnly
            />
            <span
              className="absolute right-[0.8rem] top-[40%] transform -translate-y-[50%] cursor-pointer"
              onClick={() => togglePasswordVisibility("password1")}
            >
              {passwordVisibility.password1 ? <FaEyeSlash /> : <FaEye />}
            </span>
          </span>
          <span>
            <div className="font-semibold"> Description</div>
            <textarea
              className="border border-b-2 w-[26vw] h-[6vw] border-r-2 cursor-not-allowed rounded-[.3vw] pl-[.3vw] pt-[.3vw] outline-none"
              value={EmailInfo?.support?.description}
              readOnly
            />
          </span>
        </div>
      </div>
      <div className="card1 mb-[1vw] shadow-[0_4px_6px_rgba(31,_75,_127,_0.5)]   rounded-lg p-[1vw] ">
        <div className="text-center text-[2vw] pb-[1vw] font-semibold">
          No Reply
        </div>
        <div className="flex justify-evenly text-[#1F4B7F]">
          <span>
            <div className="font-semibold"> Email</div>
            <input
              className="border border-b-2 w-[26vw] h-[3vw] border-r-2 cursor-not-allowed  rounded-[.3vw] pl-[1vw] outline-none"
              type="text"
              readOnly
              value={EmailInfo?.no_reply?.email}
            />
          </span>
          <span className="relative">
            <div className="font-semibold">Password</div>
            <input
              className="border border-b-2 w-[26vw] h-[3vw] border-r-2 cursor-not-allowed rounded-[.3vw] pr-[2rem] pl-[1vw] outline-none"
              type={passwordVisibility.password2 ? "text" : "password"}
              readOnly
              value={EmailInfo?.no_reply?.password}
            />
            <span
              className="absolute right-[0.8rem] top-[40%] transform -translate-y-[50%] cursor-pointer"
              onClick={() => togglePasswordVisibility("password2")}
            >
              {passwordVisibility.password2 ? <FaEyeSlash /> : <FaEye />}
            </span>
          </span>
          <span>
            <div className="font-semibold"> Description</div>
            <textarea
              className="border border-b-2 w-[26vw] h-[6vw] border-r-2 cursor-not-allowed rounded-[.3vw] pl-[.3vw] pt-[.3vw] outline-none"
              value={EmailInfo?.no_reply?.description}
              readOnly
            />
          </span>
        </div>
      </div>
      <div className="card1 mb-[1vw] shadow-[0_4px_6px_rgba(31,_75,_127,_0.5)]   rounded-lg p-[1vw] ">
        <div className="text-center text-[2vw] pb-[1vw] font-semibold">
          Tickets
        </div>
        <div className="flex justify-evenly text-[#1F4B7F]">
          <span>
            <div className="font-semibold"> Email</div>
            <input
              className="border border-b-2 w-[26vw] h-[3vw] border-r-2 cursor-not-allowed  rounded-[.3vw] pl-[1vw] outline-none"
              type="text"
              readOnly
              value={EmailInfo?.tickets?.email}
            />
          </span>
          <span className="relative">
            <div className="font-semibold">Password</div>
            <input
              className="border border-b-2 w-[26vw] h-[3vw] border-r-2 rounded-[.3vw] cursor-not-allowed pr-[2rem] pl-[1vw] outline-none"
              type={passwordVisibility.password3 ? "text" : "password"}
              value={EmailInfo?.tickets?.password}
              readOnly
            />
            <span
              className="absolute right-[0.8rem] top-[40%] transform -translate-y-[50%] cursor-pointer"
              onClick={() => togglePasswordVisibility("password3")}
            >
              {passwordVisibility.password3 ? <FaEyeSlash /> : <FaEye />}
            </span>
          </span>
          <span>
            <div className="font-semibold"> Description</div>
            <textarea
              className="border border-b-2 w-[26vw] h-[6vw] border-r-2 cursor-not-allowed rounded-[.3vw] pl-[.3vw] pt-[.3vw] outline-none"
              value={EmailInfo?.tickets?.description}
              readOnly
            />
          </span>
        </div>
      </div>
      <div className="card1 mb-[1vw] shadow-[0_4px_6px_rgba(31,_75,_127,_0.5)]   rounded-lg p-[1vw] ">
        <div className="text-center text-[2vw] pb-[1vw] font-semibold">
          General Information
        </div>
        <div className="flex justify-evenly text-[#1F4B7F]">
          <span>
            <div className="font-semibold"> Email</div>
            <input
              className="border border-b-2 w-[26vw] h-[3vw] border-r-2 cursor-not-allowed  rounded-[.3vw] pl-[1vw] outline-none"
              type="text"
              value={EmailInfo?.general_info?.email}
              readOnly
            />
          </span>
          <span className="relative">
            <div className="font-semibold">Password</div>
            <input
              className="border border-b-2 w-[26vw] h-[3vw] border-r-2 cursor-not-allowed rounded-[.3vw] pr-[2rem] pl-[1vw] outline-none"
              type={passwordVisibility.password4 ? "text" : "password"}
              value={EmailInfo?.general_info?.password}
              readOnly
            />
            <span
              className="absolute right-[0.8rem] top-[40%] transform -translate-y-[50%] cursor-pointer"
              onClick={() => togglePasswordVisibility("password4")}
            >
              {passwordVisibility.password4 ? <FaEyeSlash /> : <FaEye />}
            </span>
          </span>
          <span>
            <div className="font-semibold"> Description</div>
            <textarea
              className="border border-b-2 w-[26vw] h-[6vw] border-r-2 cursor-not-allowed rounded-[.3vw] pl-[.3vw] pt-[.3vw] outline-none"
              value={EmailInfo?.general_info?.description}
              readOnly
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmailInformation;
