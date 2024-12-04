import React, { useEffect, useState } from "react";
// import Backdrop from "../../asserts/CRMbg.png";
// import axios from "axios";
//import { PiUserLight } from "react-icons/pi";
import { Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { capitalizeFirstLetter } from "../Common/Captilization";
import dayjs from "dayjs";
import { FaUser } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import {
  GetNotificationData,
  NotificationStatus,
  SearchNotification,
  UnreadNotification,
} from "../../Api/Notification/Notification";
import { IoSearch } from "react-icons/io5";

export default function Notification() {
  // const [notifyLength, SetNotifyLenght] = useState(0);
  // const [Searchval, SetSearchval] = useState();
  // const selector = useSelector()
  // const count = 0;

  const getnotificationlist = useSelector(
    (state) => state.crm.notification_data
  );
  const [activeTooltip, setActiveTooltip] = useState(null);
  const dispatch = useDispatch();
  const [userId, setUserId] = useState();
  const [typeId, setTypeId] = useState();
  const [bgColor, setBgColor] = useState([]);
  const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;

  //  const handleOnClick=()=>{
  //   GetNotificationData()
  //  }

  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const handleClick = async (itemId) => {
    setActiveTooltip((prev) => (prev === itemId ? null : itemId));
    try {
      if (userId) {
        console.log("i am working");
        NotificationStatus(itemId);
        console.log("print aguthu1", itemId);
        UnreadNotification(dispatch, userId);
        GetNotificationData(dispatch);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // setUserId(sessionStorage.getItem("USER_ID"));
    setUserId(sessionStorage.getItem("USER_ID"));
    // setTypeId(sessionStorage.getItem("type_id"));
    setTypeId(sessionStorage.getItem("type_id"));

    GetNotificationData(dispatch);
  }, []);

  useEffect(() => {
    if (getnotificationlist?.length && bgColor.length === 0) {
      const colors = Array.from(
        { length: getnotificationlist.length },
        getRandomColor
      );
      setBgColor(colors);
    }
  }, [getnotificationlist]);

  return (
    <div>
      {/* <div className="flex justify-center text-[#1f487c] ">
        <div className="text-[2.5vw] font-bold">
          <h1>Notifications</h1>
        </div>
      </div> */}
      <div className="flex">
        <div className="relative flex items-center w-[20vw]" >
          {/* Input Field */}
          <input
            type="text"
            className="bg-white outline-none pl-[2vw] pr-[3vw] w-full h-[5vh] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-[0.5vw] border-r-[0.2vw] border-b-[0.2vw]"
            placeholder="Search Notifications"
            onChange={(e) => {
              SearchNotification(e.target.value, dispatch);
            }}
          />
          <IoSearch
            className="absolute left-[0.5vw]"
            size={"1vw"}
            color="#1F4B7F"
          />
          {/* <FontAwesomeIcon
          icon={faEllipsisVertical}
          color="#1f487c"
          className="absolute right-[0.8vw] cursor-pointer"
          style={{
            height: "1.25vw",
            width: "1.25vw",
          }}
        /> */}
        </div>
        <div>
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            color="#1f487c"
            className="cursor-pointer pl-[0.6vw] mr-[-0.6vw] pt-[0.3vw]"
            style={{
              height: "1.5vw",
              width: "1.25vw",
            }}
          />
        </div>
      </div>
      {/* <div onClick={handleOnClick}>click me</div> */}
      {/* <div className="overflow-auto mt-3 max-h-[25vw] sm:max-[25vw]: md:max-h-[25vw] lg:max-h-[25vw] xl:max-[25vw] 2xl:max-[25vw] "> */}
      {getnotificationlist && getnotificationlist.length > 0 ? (
        <div className="overflow-auto mt-[1vw] max-h-[20vw]">
          {getnotificationlist.length > 0 &&
            getnotificationlist?.map((item, index) => (
              <div
                className="flex flex-cols-3 gap-4 pb-[1vw]"
                key={
                  typeId === "PRO101"
                    ? item.tbs_pro_notif_id
                    : typeId === "OP101"
                    ? item.tbs_op_notif_id
                    : item.tbs_pro_emp_notif_id
                }
                onClick={() =>
                  handleClick(
                    typeId === "PRO101"
                      ? item.tbs_pro_notif_id
                      : typeId === "OP101"
                      ? item.tbs_op_notif_id
                      : item.tbs_pro_emp_notif_id
                  )
                }
              >
                <div className="w-[2.2vw] pt-[0.2vw]">
                  <div
                    className="w-[2.2vw] h-[2.2vw] rounded-full"
                    style={{ backgroundColor: bgColor[index] }}
                  >
                    <div className="flex items-center w-full h-full justify-center">
                      {item?.profile_img ? (
                        <img
                          src={`${apiImgUrl}${item?.profile_img}`}
                          alt="Profile"
                          className="w-full object-cover rounded-[1vw]"
                        />
                      ) : (
                        <FaUser color="white" size="1vw" />
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-[13vw]">
                  <div
                    className={`text-[0.85vw] ${
                      item.read === true ? "text-gray-500" : ""
                    }`}
                  >
                    {capitalizeFirstLetter(item.user_name)}
                  </div>
                  <div
                    className={`${item.read === true ? "text-gray-400" : ""}`}
                  >
                    {item.notification_message?.length > 28 ? (
              <Tooltip
              color="#1F487C"
              placement="top"
              overlayInnerStyle={{ width: '17vw', padding: '0.5vw' }} // Adjust the width and padding
              title={
                <div className="flex gap-2">
                  <div
                    className="w-[2.2vw] h-[2.2vw] mt-[0.16vw] rounded-full"
                    style={{ backgroundColor: bgColor[index] }}
                  >
                    <div className="flex items-center w-[2.2vw] h-[2.2vw] justify-center">
                      {(item?.profile_img) ? (
                        <img
                          src={`${apiImgUrl}${item?.profile_img}`}
                          alt="Profile"
                          className="w-full object-cover rounded-[1vw]"
                        />
                      ) : (
                        <FaUser color="white" size="1vw" />
                      )}
                    </div>
                  </div>
                  <div>
                    <div
                      className={`text-[0.85vw] font-bold ${
                        item.read === true ? "text-white" : ""
                      }`}
                    >
                      {capitalizeFirstLetter(item.user_name)}
                    </div>
                    <div className="text-white text-[0.85vw]">
                      {capitalizeFirstLetter(item.notification_message)}
                    </div>
                  </div>
                </div>
              }
              visible={
                activeTooltip ===
                (typeId === "PRO101"
                  ? item.tbs_pro_notif_id
                  : typeId === "OP101"
                  ? item.tbs_op_notif_id
                  : item.tbs_pro_emp_notif_id)
              }
              className="cursor-pointer"
            >
              <div
                className={`${
                  item.read === true ? "text-gray-400" : ""
                } text-[0.85vw]`}
              >
                {`${capitalizeFirstLetter(
                  item.notification_message?.slice(0, 28)
                )}...`}
              </div>
            </Tooltip>
            
                    ) : (
                      <div
                        className={`text-[0.85vw] ${
                          item.read === true ? "text-gray-400" : ""
                        }`}
                      >
                        {capitalizeFirstLetter(
                          item.notification_message?.slice(0, 28)
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className={`w-[4vw] text-[0.75vw] ${
                    item.read === true ? "text-gray-400" : ""
                  }`}
                >
                  {dayjs(item?.created_at).isSame(dayjs(), "day")
                    ? `${dayjs(item?.created_at).format("hh:mm A")}`
                    : `${dayjs(item?.created_at).format("D MMM")}`}
                </div>
              </div>
            ))}
        </div>
      ) : (
        // <div
        //   // key={item.tbs_pro_notif_id}
        //   key={
        //     typeId === "PRO101"
        //       ? item.tbs_pro_notif_id :
        //       typeId === "OP101" ?
        //         item.tbs_op_notif_id
        //         : item.tbs_pro_emp_notif_id
        //   }
        //   // onClick={() => handleClick(item.tbs_pro_notif_id)}
        //   onClick={() =>
        //     handleClick(
        //       // typeId === "PRO101"
        //       //   ? item.tbs_pro_notif_id
        //       //   : item.tbs_op_notif_id
        //       typeId === "PRO101"
        //         ? item.tbs_pro_notif_id :
        //         typeId === "OP101" ?
        //           item.tbs_op_notif_id
        //           : item.tbs_pro_emp_notif_id
        //     )
        //   }
        //   className={`flex border-b last:border-b-0 py-2 rounded-md`}
        // >
        //   {/* <div className="font-semibold w-1/4">{item.title}:</div> */}
        //   <div>
        //     <div
        //       className={`mx-[1vw] ${item.read == true ? "text-gray-400" : ""
        //         }`}
        //     >
        //       {item.notification_message}
        //     </div>
        //   </div>
        // </div>
        <div>
          <hr></hr>
          <div className="text-center  text-gray-400 p-[2vw]">
            No Notification Found
          </div>
        </div>
      )}
    </div>
  );
}
