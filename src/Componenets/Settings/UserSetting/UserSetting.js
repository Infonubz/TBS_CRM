import React, { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { RiArrowRightSLine } from "react-icons/ri";
import { FiAlertCircle } from "react-icons/fi";
import { FaUserLarge } from "react-icons/fa6";
import { ImKey } from "react-icons/im";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { HiUserGroup } from "react-icons/hi";
import { Collapse } from "antd";
import "../../../App.css";
import EditProfile from "./EditProfile";
import ForgotPassword from "./ForgotPassword";

export default function UserSettingList() {

  const [active, setActive] = useState("0");

  const handleCollapseChange = (key) => {
    if (active !== key) {
      setActive(key);
    }
  };
  console.log(active, 'active_KEY');

  return (
    <div>
      <Collapse
        activeKey={active}
        onChange={() => handleCollapseChange("1")}
        className="bg-[#1F487C] rounded-2xl border border-[#1F487C]  shadow-[0_9px_9px_rgba(0,0,0,0.45)] shadow-xl"
        size="large"
        expandIcon={({ isActive }) =>
          isActive ? (
            <IoIosArrowUp
              className="mt-[0.5vw]"
              style={{ color: "#FFFFFF", height: "2vw", width: "1.8vw" }}
            />
          ) : (
            <RiArrowRightSLine
              className="mt-[1.5vw]"
              style={{ color: "#FFFFFF", height: "2vw", width: "1.8vw" }}
            />
          )
        }
        expandIconPosition="right"
        items={[
          {
            key: "1",
            label: (
              <div className="flex items-center h-[5vh]">
                <div className="col-span-2 pt-[0.3vw]">
                  <span className="">
                    <FiAlertCircle
                      style={{
                        color: "#FFFFFF",
                        height: "2.3vw",
                        width: "2.3vw",
                      }}
                    />
                  </span>
                </div>
                <div className="col-span-2 pl-[1vw]">
                  <span className="text-[#FFFFFF] font-medium text-[1.1vw]">
                    Edit your details
                  </span>
                  <p className="text-[#FFFFFF] text-[0.8vw]">
                    Change your details including name and email address
                  </p>
                </div>
              </div>
            ),
            children: <EditProfile />,
          },
        ]}
      />
      {/* <Collapse
        className="bg-[#1F487C] rounded-2xl border border-[#1F487C] mt-[1vw] shadow-[0_9px_9px_rgba(0,0,0,0.45)] shadow-xl"
        size="large"
        expandIcon={({ isActive }) =>
          isActive ? (
            <IoIosArrowUp
              className="mt-[0.5vw]"
              style={{ color: "#FFFFFF", height: "2vw", width: "1.8vw" }}
            />
          ) : (
            <RiArrowRightSLine
              className="mt-[1.5vw]"
              style={{ color: "#FFFFFF", height: "2vw", width: "1.8vw" }}
            />
          )
        }
        expandIconPosition="right"
        items={[
          {
            key: "1",
            label: (
              <div className="flex items-center h-[5vh]">
                <div className="col-span-2 pt-[0.3vw]">
                  <span className="">
                    <FaUserLarge
                      style={{
                        color: "#FFFFFF",
                        height: "2.3vw",
                        width: "2.3vw",
                      }}
                    />
                  </span>
                </div>
                <div className="col-span-2 pl-[1vw]">
                  <span className="text-[#FFFFFF] font-medium text-[1.1vw]">
                    User Management
                  </span>
                  <p className="text-[#FFFFFF] text-[0.8vw]">
                    Add and edit users, manage your passwords
                  </p>
                </div>
              </div>
            ),
            children: <p className="p-[0.5vw]">User Management</p>,
          },
        ]}
      /> */}
      <Collapse
        activeKey={active}
        onChange={() => handleCollapseChange("2")}
        className="bg-[#1F487C] rounded-2xl border border-[#1F487C] mt-[1vw] shadow-[0_9px_9px_rgba(0,0,0,0.45)] shadow-xl"
        size="large"
        expandIcon={({ isActive }) =>
          isActive ? (
            <IoIosArrowUp
              className="mt-[0.5vw]"
              style={{ color: "#FFFFFF", height: "2vw", width: "1.8vw" }}
            />
          ) : (
            <RiArrowRightSLine
              className="mt-[1.5vw]"
              style={{ color: "#FFFFFF", height: "2vw", width: "1.8vw" }}
            />
          )
        }
        expandIconPosition="right"
        items={[
          {
            key: "2",
            label: (
              <div className="flex items-center h-[5vh]">
                <div className="col-span-2 pt-[0.3vw]">
                  <span className="">
                    <ImKey
                      style={{
                        color: "#FFFFFF",
                        height: "2.3vw",
                        width: "2.3vw",
                      }}
                    />
                  </span>
                </div>
                <div className="col-span-2 pl-[1vw]">
                  <span className="text-[#FFFFFF] font-medium text-[1.1vw]">
                    Change Password
                  </span>
                  <p className="text-[#FFFFFF] text-[0.8vw]">
                    Update your login password
                  </p>
                </div>
              </div>
            ),
            children: <ForgotPassword />,
          },
        ]}
      />
      {/* <Collapse
        className="bg-[#1F487C] rounded-2xl border border-[#1F487C] mt-[1vw] shadow-[0_9px_9px_rgba(0,0,0,0.45)] shadow-xl"
        size="large"
        expandIcon={({ isActive }) =>
          isActive ? (
            <IoIosArrowUp
              className="mt-[0.5vw]"
              style={{ color: "#FFFFFF", height: "2vw", width: "1.8vw" }}
            />
          ) : (
            <RiArrowRightSLine
              className="mt-[1.5vw]"
              style={{ color: "#FFFFFF", height: "2vw", width: "1.8vw" }}
            />
          )
        }
        expandIconPosition="right"
        items={[
          {
            key: "1",
            label: (
              <div className="flex items-center h-[5vh]">
                <div className="col-span-2 pt-[0.3vw]">
                  <span className="">
                    <HiOutlineUserCircle
                      style={{
                        color: "#FFFFFF",
                        height: "2.3vw",
                        width: "2.3vw",
                      }}
                    />
                  </span>
                </div>
                <div className="col-span-2 pl-[0.8vw]">
                  <span className="text-[#FFFFFF] font-medium text-[1.1vw]">
                    User Profiles
                  </span>
                  <p className="text-[#FFFFFF] text-[0.8vw]">
                    Create and modify the user profiles that control security
                    and session timeout
                  </p>
                </div>
              </div>
            ),
            children: <p className="p-[0.5vw]">User Profiles</p>,
          },
        ]}
      /> */}
      {/* <Collapse
        className="bg-[#1F487C] rounded-2xl border border-[#1F487C] mt-[1vw] shadow-[0_9px_9px_rgba(0,0,0,0.45)] shadow-xl"
        size="large"
        expandIcon={({ isActive }) =>
          isActive ? (
            <IoIosArrowUp
              className="mt-[0.5vw]"
              style={{ color: "#FFFFFF", height: "2vw", width: "1.8vw" }}
            />
          ) : (
            <RiArrowRightSLine
              className="mt-[1.5vw]"
              style={{ color: "#FFFFFF", height: "2vw", width: "1.8vw" }}
            />
          )
        }
        expandIconPosition="right"
        items={[
          {
            key: "1",
            label: (
              <div className="flex items-center h-[5vh]">
                <div className="col-span-2 pt-[0.3vw]">
                  <span className="">
                    <HiUserGroup
                      style={{
                        color: "#FFFFFF",
                        height: "2.3vw",
                        width: "2.3vw",
                      }}
                    />
                  </span>
                </div>
                <div className="col-span-2 pl-[1vw]">
                  <span className="text-[#FFFFFF] font-medium text-[1.1vw]">
                    User Groups
                  </span>
                  <p className="text-[#FFFFFF] text-[0.8vw]">
                    Create and modify the Groups that users ca belong to
                  </p>
                </div>
              </div>
            ),
            children: <p className="p-[0.5vw]">User Groups</p>,
          },
        ]}
      /> */}
    </div>
  );
}
