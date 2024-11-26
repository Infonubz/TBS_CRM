import React, { useEffect, useState } from "react";
import Backdrop from "../../asserts/CRMbg.png";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  GetNotificationData,
  NotificationStatus,
  SearchNotification,
  UnreadNotification,
} from "../../Api/Notification/Notification";
import { IoSearch } from "react-icons/io5";
export default function Notification() {
  const [notifyLength, SetNotifyLenght] = useState(0);
  const [Searchval, SetSearchval] = useState();

  const getnotificationlist = useSelector(
    (state) => state.crm.notification_data
  );
  console.log(getnotificationlist, "notificationdata1111");

  const count = 0;

  // // const selector = useSelector()

  const dispatch = useDispatch();

  //  const handleOnClick=()=>{
  //   GetNotificationData()
  //  }
  const [userId, setUserId] = useState();
  const [typeId, setTypeId] = useState();

  useEffect(() => {
    // setUserId(sessionStorage.getItem("USER_ID"));
    setUserId(sessionStorage.getItem("USER_ID"));
    // setTypeId(sessionStorage.getItem("type_id"));
    setTypeId(sessionStorage.getItem("type_id"));

    GetNotificationData(dispatch);
  }, []);

  const handleClick = async (statusid) => {
    console.log("i am not working", statusid);
    try {
      if (userId) {
        console.log("i am working");
        NotificationStatus(statusid);
        console.log("print aguthu1", statusid);
        UnreadNotification(dispatch, userId);
        GetNotificationData(dispatch);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flex justify-center text-[#1f487c] ">
        <div className="text-[2.5vw] font-bold">
          <h1>Notifications</h1>
        </div>
      </div>
      <div className="relative flex items-center">
        <input
          type="text"
          className="bg-white outline-none pl-[2vw] w-[25vw] h-[5vh] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-[0.5vw] border-r-[0.2vw] border-b-[0.2vw]"
          placeholder="Search Notifications"
          onChange={(e) => {
            SearchNotification(e.target.value, dispatch);
            // console.log(e.target.value,"search val");
          }}
        />
        <IoSearch
          className="absolute left-[0.5vw]"
          size={"1vw"}
          color="#1F4B7F"
        />
      </div>
      {/* <div onClick={handleOnClick}>click me</div> */}
      {/* <div className="overflow-auto mt-3 max-h-[25vw] sm:max-[25vw]: md:max-h-[25vw] lg:max-h-[25vw] xl:max-[25vw] 2xl:max-[25vw] "> */}
      {getnotificationlist ? (
        <div className="overflow-auto mt-3 max-h-[20vw]">
          {getnotificationlist.length > 0 &&
            getnotificationlist?.map((item, index) => (
              <div
                // key={item.tbs_pro_notif_id}
                key={
                  typeId === "PRO101"
                    ? item.tbs_pro_notif_id :
                    typeId === "OP101" ?
                      item.tbs_op_notif_id
                      : item.tbs_pro_emp_notif_id
                }
                // onClick={() => handleClick(item.tbs_pro_notif_id)}
                onClick={() =>
                  handleClick(
                    // typeId === "PRO101"
                    //   ? item.tbs_pro_notif_id
                    //   : item.tbs_op_notif_id
                    typeId === "PRO101"
                      ? item.tbs_pro_notif_id :
                      typeId === "OP101" ?
                        item.tbs_op_notif_id
                        : item.tbs_pro_emp_notif_id
                  )
                }
                className={`flex border-b last:border-b-0 py-2 rounded-md`}
              >
                {/* <div className="font-semibold w-1/4">{item.title}:</div> */}
                <div>
                  <div
                    className={`mx-[1vw] ${item.read == true ? "text-gray-400" : ""
                      }`}
                  >
                    {item.notification_message}
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
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
