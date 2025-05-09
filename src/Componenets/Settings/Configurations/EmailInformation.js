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
    <div className="px-[1vw] py-[0.5vw] max-h-[35vw] overflow-auto">



      <div className="card1 grid grid-cols-2  gap-x-[2vw]">
        {/* ----------------------------------------------------------suportMail---------------------------------------------------------- */}
        <div className=" mb-[1vw] shadow-[0_4px_6px_rgba(31,_75,_127,_0.5)] rounded-lg px-[1vw] py-[0.5vw]">
          <div className=" text-[1.5vw] pb-[1vw] font-semibold text-[#1F487C]">
            Support
          </div>
          <div className="grid grid-cols-2 justify-evenly text-[#1F4B7F] gap-x-[2vw] gap-y-[0.5vw]">
            <span>
              <div className="font-semibold text-[1.1vw]"> Email</div>
              <input
                className="border  text-[1vw] border-b-2 w-full h-[2.5vw] border-r-2 cursor-not-allowed  rounded-[0.3vw] pl-[1vw] outline-none"
                type="text"
                readOnly
                value={EmailInfo?.support?.email}
              />
            </span>
            <span className="relative">
              <div className="font-semibold text-[1.1vw]">Password</div>
              <input
                className=" text-[1vw] border border-b-2 w-full h-[2.5vw] border-r-2 cursor-not-allowed  rounded-[.3vw] pr-[2rem] pl-[1vw] outline-none"
                type={passwordVisibility.password1 ? "text" : "password"}
                value={EmailInfo?.support?.password}
                readOnly
              />
              <span
                className="absolute right-[0.8rem] top-[2.9vw] transform -translate-y-[50%] cursor-pointer"
                onClick={() => togglePasswordVisibility("password1")}
              >
                {passwordVisibility.password1 ? <FaEyeSlash size='1vw' /> : <FaEye size='1vw' />}
              </span>
            </span>
            <span className="col-span-2">
              <div className="font-semibold text-[1.1vw]"> Description</div>
              <textarea
                className="  text-[1vw] border border-b-2 w-full h-[5vw] border-r-2 cursor-not-allowed rounded-[.3vw] pl-[.3vw] pt-[.3vw] outline-none"
                value={EmailInfo?.support?.description}
                readOnly
              />
            </span>
          </div>
        </div>
        {/* ----------------------------------------------------------NoRpely-------------------------------------------------------------- */}
        <div className=" mb-[1vw] shadow-[0_4px_6px_rgba(31,_75,_127,_0.5)] rounded-lg px-[1vw] py-[0.5vw]">
          <div className=" text-[1.5vw] pb-[1vw] text-[#1F487C] font-semibold">
            No Reply
          </div>
          <div className="grid grid-cols-2 justify-evenly text-[#1F4B7F] gap-x-[2vw] gap-y-[0.5vw]">
            <span>
              <div className="font-semibold text-[1.1vw]"> Email</div>
              <input
                className="border  text-[1vw] border-b-2 w-full h-[2.5vw] border-r-2 cursor-not-allowed  rounded-[.3vw] pl-[1vw] outline-none"
                type="text"
                readOnly
                value={EmailInfo?.no_reply?.email}
              />
            </span>
            <span className="relative">
              <div className="font-semibold text-[1.1vw]">Password</div>
              <input
                className="  text-[1vw] border border-b-2 w-full h-[2.5vw] border-r-2 cursor-not-allowed rounded-[.3vw] pr-[2rem] pl-[1vw] outline-none"
                type={passwordVisibility.password2 ? "text" : "password"}
                readOnly
                value={EmailInfo?.no_reply?.password}
              />
              <span
                className="absolute right-[0.8rem] top-[2.9vw] transform -translate-y-[50%] cursor-pointer"
                onClick={() => togglePasswordVisibility("password2")}
              >
                {passwordVisibility.password2 ? <FaEyeSlash size='1vw' /> : <FaEye size='1vw' />}
              </span>
            </span>
            <span className="col-span-2">
              <div className="font-semibold text-[1.1vw]"> Description</div>
              <textarea
                className=" text-[1vw] w-full border border-b-2 h-[5vw] border-r-2 cursor-not-allowed rounded-[.3vw] pl-[.3vw] pt-[.3vw] outline-none"
                value={EmailInfo?.no_reply?.description}
                readOnly
              />
            </span>
          </div>
        </div>
      </div>
      {/* 
      <div className="card1 mb-[1vw] shadow-[0_4px_6px_rgba(31,_75,_127,_0.5)]   rounded-lg p-[1vw] ">
        <div className=" text-[2vw] pb-[1vw] font-semibold">
          No Reply
        </div>
        <div className="flex justify-evenly text-[#1F4B7F]">
          <span>
            <div className="font-semibold"> Email</div>
            <input
              className="border border-b-2 w-[26vw] h-[2.5vw] border-r-2 cursor-not-allowed  rounded-[.3vw] pl-[1vw] outline-none"
              type="text"
              readOnly
              value={EmailInfo?.no_reply?.email}
            />
          </span>
          <span className="relative">
            <div className="font-semibold">Password</div>
            <input
              className="border border-b-2 w-[26vw] h-[2.5vw] border-r-2 cursor-not-allowed rounded-[.3vw] pr-[2rem] pl-[1vw] outline-none"
              type={passwordVisibility.password2 ? "text" : "password"}
              readOnly
              value={EmailInfo?.no_reply?.password}
            />
            <span
              className="absolute right-[0.8rem] top-[2.9vw] transform -translate-y-[50%] cursor-pointer"
              onClick={() => togglePasswordVisibility("password2")}
            >
              {passwordVisibility.password2 ? <FaEyeSlash  size='1vw'/>  : <FaEye   size='1vw'/> }
            </span>
          </span>
          <span>
            <div className="font-semibold"> Description</div>
            <textarea
              className="border border-b-2 w-[26vw] h-[5vw] border-r-2 cursor-not-allowed rounded-[.3vw] pl-[.3vw] pt-[.3vw] outline-none"
              value={EmailInfo?.no_reply?.description}
              readOnly
            />
          </span>
        </div>
      </div> */}

      <div className="card1 grid grid-cols-2  gap-x-[2vw] ">
        {/* ----------------------------------------------------------Tickets-------------------------------------------------------------- */}
        <div className=" mb-[1vw] shadow-[0_4px_6px_rgba(31,_75,_127,_0.5)] rounded-lg px-[1vw] py-[0.5vw] ">
          <div className=" text-[1.5vw] pb-[1vw] font-semibold text-[#1F487C]">
            Tickets
          </div>
          <div className="grid grid-cols-2 justify-evenly text-[#1F4B7F] gap-x-[2vw] gap-y-[0.5vw]">
            <span>
              <div className="font-semibold text-[1.1vw]"> Email</div>
              <input
                className=" text-[1vw] border border-b-2 w-full h-[2.5vw] border-r-2 cursor-not-allowed  rounded-[.3vw] pl-[1vw] outline-none"
                type="text"
                readOnly
                value={EmailInfo?.tickets?.email}
              />
            </span>
            <span className="relative">
              <div className="font-semibold text-[1.1vw]">Password</div>
              <input
                className=" text-[1vw] border border-b-2 w-full h-[2.5vw] border-r-2 rounded-[.3vw] cursor-not-allowed pr-[2rem] pl-[1vw] outline-none"
                type={passwordVisibility.password3 ? "text" : "password"}
                value={EmailInfo?.tickets?.password}
                readOnly
              />
              <span
                className="  absolute right-[0.8rem] top-[2.9vw] transform -translate-y-[50%] cursor-pointer"
                onClick={() => togglePasswordVisibility("password3")}
              >
                {passwordVisibility.password3 ? <FaEyeSlash size='1vw' /> : <FaEye size='1vw' />}
              </span>
            </span>
            <span className="col-span-2 ">
              <div className="font-semibold text-[1.1vw]"> Description</div>
              <textarea
                className=" text-[1vw] border border-b-2 w-full h-[5vw] border-r-2 cursor-not-allowed rounded-[.3vw] pl-[.3vw] pt-[.3vw] outline-none"
                value={EmailInfo?.tickets?.description}
                readOnly
              />
            </span>
          </div>
        </div>
        {/* ----------------------------------------------------------GeneralInformation---------------------------------------------------- */}
        <div className=" mb-[1vw] shadow-[0_4px_6px_rgba(31,_75,_127,_0.5)] rounded-lg px-[1vw] py-[0.5vw] ">
          <div className=" text-[1.5vw] pb-[1vw] font-semibold text-[#1F487C]">
            General Information
          </div>
          <div className="grid grid-cols-2 justify-evenly text-[#1F4B7F] gap-x-[2vw] gap-y-[0.5vw] ">
            <span>
              <div className="font-semibold text-[1.1vw]"> Email</div>
              <input
                className=" text-[1vw] border border-b-2 w-full h-[2.5vw] border-r-2 cursor-not-allowed  rounded-[.3vw] pl-[1vw] outline-none"
                type="text"
                value={EmailInfo?.general_info?.email}
                readOnly
              />
            </span>
            <span className="relative">
              <div className="font-semibold text-[1.1vw]">Password</div>
              <input
                className=" text-[1vw] border border-b-2 w-full h-[2.5vw] border-r-2 cursor-not-allowed rounded-[.3vw] pr-[2rem] pl-[1vw] outline-none"
                type={passwordVisibility.password4 ? "text" : "password"}
                value={EmailInfo?.general_info?.password}
                readOnly
              />
              <span
                className="absolute right-[0.8rem] top-[2.9vw] transform -translate-y-[50%] cursor-pointer"
                onClick={() => togglePasswordVisibility("password4")}
              >
                {passwordVisibility.password4 ? <FaEyeSlash size='1vw' /> : <FaEye size='1vw' />}
              </span>
            </span>
            <span className="col-span-2">
              <div className="font-semibold text-[1.1vw]"> Description</div>
              <textarea
                className=" text-[1vw] border border-b-2 w-full h-[5vw] border-r-2 cursor-not-allowed rounded-[.3vw] pl-[.3vw] pt-[.3vw] outline-none"
                value={EmailInfo?.general_info?.description}
                readOnly
              />
            </span>
          </div>
        </div>
      </div>

      {/* <div className="card1 mb-[1vw] shadow-[0_4px_6px_rgba(31,_75,_127,_0.5)]   rounded-lg p-[1vw] ">
        <div>
          <div className=" text-[2vw] pb-[1vw] font-semibold">
            General Information
          </div>
          <div className="flex justify-evenly text-[#1F4B7F]">
            <span>
              <div className="font-semibold"> Email</div>
              <input
                className="border border-b-2 w-[26vw] h-[2.5vw] border-r-2 cursor-not-allowed  rounded-[.3vw] pl-[1vw] outline-none"
                type="text"
                value={EmailInfo?.general_info?.email}
                readOnly
              />
            </span>
            <span className="relative">
              <div className="font-semibold">Password</div>
              <input
                className="border border-b-2 w-[26vw] h-[2.5vw] border-r-2 cursor-not-allowed rounded-[.3vw] pr-[2rem] pl-[1vw] outline-none"
                type={passwordVisibility.password4 ? "text" : "password"}
                value={EmailInfo?.general_info?.password}
                readOnly
              />
              <span
                className="absolute right-[0.8rem] top-[2.9vw] transform -translate-y-[50%] cursor-pointer"
                onClick={() => togglePasswordVisibility("password4")}
              >
                {passwordVisibility.password4 ? <FaEyeSlash  size='1vw'/>  : <FaEye   size='1vw'/> }
              </span>
            </span>
            <span>
              <div className="font-semibold"> Description</div>
              <textarea
                className="border border-b-2 w-[26vw] h-[5vw] border-r-2 cursor-not-allowed rounded-[.3vw] pl-[.3vw] pt-[.3vw] outline-none"
                value={EmailInfo?.general_info?.description}
                readOnly
              />
            </span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default EmailInformation;
