import React, { useEffect, useState } from "react";
import Backdrop from "../../asserts/CRMbg.png";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  GetNotificationData,
  NotificationStatus,
  UnreadNotification,
} from "../../Api/Notification/Notification";
export default function Notification() {
  // const [responce, setResponce] = useState([]);
  const getnotificationlist = useSelector(
    (state) => state.crm.notification_data
  );
  console.log(getnotificationlist, "notificationdata");

  // // const selector = useSelector()

  const dispatch = useDispatch();
  useEffect(() => {
    GetNotificationData(dispatch);
  }, []);
  //  const handleOnClick=()=>{
  //   GetNotificationData()
  //  }
  const [userId, setUserId] = useState();

  useEffect(() => {
    setUserId(sessionStorage.getItem("USER_ID"));
    UnreadNotification(dispatch);
  }, []);
  // console.log(userId,"uuuuuu")

  const handleClick = async (statusid) => {
    try {
      if (userId) {
        await NotificationStatus(dispatch, statusid);
        await UnreadNotification(dispatch, userId);
        GetNotificationData(dispatch);
      }
      // const data =await NotificationStatus(dispatch, statusid)
      // console.log(userId, "taaaaaaaaaa");
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(getnotificationlist ,"nnnnnnnnnnnnn")

  return (
    <div>
      <div className="flex justify-center text-[#1f487c] text-[2.5vw] font-bold">
        <h1>Notifications</h1>
      </div>
      {/* <div onClick={handleOnClick}>click me</div> */}
      {/* <div className="overflow-auto mt-3 max-h-[25vw] sm:max-[25vw]: md:max-h-[25vw] lg:max-h-[25vw] xl:max-[25vw] 2xl:max-[25vw] "> */}
      <div className="overflow-auto mt-3 max-h-[20vw]">
        {getnotificationlist?.map((item, index) => (
          <div
            key={item.id}
            onClick={() => handleClick(item.tbs_notif_id)}
            className={`flex border-b last:border-b-0 py-2 rounded-md`}
          >
            {/* <div className="font-semibold w-1/4">{item.title}:</div> */}
            <div>
              <div
                className={`mx-[1vw] ${
                  item.read == true ? "text-gray-400" : ""
                }`}
              >
                {item.message}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
