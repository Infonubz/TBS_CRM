import React, { useState } from "react";
import image from "../../asserts/promotion_image.png";
import "../../App.css";
import dayjs from "dayjs";
import userimg from "../../asserts/userprofile.png";
import { FaPhone } from "react-icons/fa";
import { TbMailFilled } from "react-icons/tb";
import { Tooltip } from "antd";
export default function GridList({ currentData }) {
  const [hoverid, setHoverId] = useState("");
  const [changeColor, setChangeColor] = useState();
  return (
    <div className="pt-[0.5vw]">
      <div className="grid grid-cols-5 w-full  gap-x-[3vw] gap-y-[1.5vw]">
        {currentData.length > 0 &&
          currentData?.map((item) => (
            <div
              className={`${
                hoverid == item.tbs_operator_id
                  ? "bg-[#1f4b7f] text-white"
                  : "bg-white"
              }  h-[34vh] border-[#1f4b7f] border-l-[0.1vw] cursor-pointer border-r-[0.3vw] border-b-[0.3vw] border-t-[0.1vw] rounded-[0.5vw]`}
              onMouseEnter={() => setHoverId(item.tbs_operator_id)}
              onMouseLeave={() => setHoverId("")}
              style={{
                transition: "ease-in 0.5s",
              }}
            >
              <div className="flex-col flex items-center justify-center h-full w-full gap-y-[0.4vw]">
                <img
                  // src={`${
                  //   item?.profile_img == null || "null"
                  //     ? userimg
                  //     : `http://192.168.90.47:4000${item?.profile_img}`
                  // } `}
                  src={`${
                    item?.profileimg
                      ? `http://192.168.90.47:4000${item?.profileimg}`
                      : userimg
                  } `}
                  className="h-[5vw] w-[5vw] rounded-[0.5vw]"
                />
                <h1 className="font-bold text-[1vw]">{item.owner_name}</h1>
                <div className="flex flex-col  justify-center gap-y-[0.8vw] mt-[1vw]">
                  <div className="flex flex-row items-center space-x-[0.5vw] ">
                    <div
                      className={`${
                        item.tbs_operator_id != hoverid
                          ? "bg-[#1f487c]"
                          : "bg-[#f6eeff]"
                      }  w-[1.8vw] h-[1.8vw] items-center flex justify-center rounded-lg`}
                      style={{
                        transition: "ease-out 1s",
                      }}
                    >
                      <FaPhone
                        size="1vw"
                        color={`${
                          item.tbs_operator_id != hoverid ? "white" : "#1f487c"
                        }`}
                      />
                    </div>
                    <div className="text-[0.9vw]">{item.phone}</div>
                  </div>
                  <div className="flex flex-row items-center space-x-[0.5vw] ">
                    <div
                      className={`${
                        item.tbs_operator_id != hoverid
                          ? "bg-[#1f487c]"
                          : "bg-[#f6eeff]"
                      }  w-[1.8vw] h-[1.8vw] items-center flex justify-center rounded-lg`}
                      style={{
                        transition: "ease-out 1s",
                      }}
                    >
                      <TbMailFilled
                        size="1vw"
                        color={`${
                          item.tbs_operator_id != hoverid ? "white" : "#1f487c"
                        }`}
                      />
                    </div>
                    {/* <div className="text-[0.9vw]">{item.emailid}</div> */}
                    {item?.emailid?.length > 15 ? (
                      <Tooltip
                        placement="right"
                        title={item?.emailid}
                        className="cursor-pointer"
                        // color="#1F487C"
                      >
                        <div className="text-[0.9vw]">
                          {" "}
                          {`${item?.emailid?.slice(0, 15)}...`}
                        </div>
                      </Tooltip>
                    ) : (
                      <div className="text-[0.9vw]">
                        {item?.emailid?.slice(0, 15)}
                      </div>
                    )}
                  </div>
                  <i className="pi-ellipsis-v"></i>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
