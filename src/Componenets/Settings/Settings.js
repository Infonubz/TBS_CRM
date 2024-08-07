import React, { useState } from "react";
import Backdrop from "../../asserts/CRMbg.png";
import "../../App.css";
import { Input } from "antd";
import { LiaSearchSolid } from "react-icons/lia";
import { IoSearch } from "react-icons/io5";
import DataSettingList from "./DataSetting/DataSetting";
import SystemSettingList from "./SystemSetting/SystemSetting";
import UserSettingList from "./UserSetting/UserSetting";
import ConfigurationIndex from "./Configurations";

export default function Settings() {
  const { Search } = Input;

  const [selectedSetting, setSelectedSetting] = useState("system");

  return (
    <div className="">
      <div
        className="h-screen w-screen  blur-0"
        style={{
          backgroundImage: `url(${Backdrop})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="px-[5vw] h-[92vh] relative  w-full ">
          <div className="h-[12vh] w-full flex flex-col ">
            <h1 className="text-[#1F4B7F] pt-[0.5vw] text-[1.5vw] font-bold">
              SETTINGS
            </h1>
            <div className="pb-[0.5vw] flex justify-between h-full items-center">
              <div className="flex flex-grow items-center">
                <span
                  onClick={() => setSelectedSetting("system")}
                  className=" cursor-pointer"
                >
                  <p
                    className={`text-[#1F487C] text-[1.3vw] ${
                      selectedSetting === "system" ? "underline bold" : ""
                    }`}
                  >
                    System settings
                  </p>
                </span>
                <span
                  onClick={() => setSelectedSetting("user")}
                  className=" cursor-pointer"
                >
                  <p
                    className={`text-[#1F487C] text-[1.3vw] pl-[1.8vw] ${
                      selectedSetting === "user" ? "underline bold" : ""
                    }`}
                  >
                    User settings
                  </p>
                </span>
                <span
                  onClick={() => setSelectedSetting("data")}
                  className=" cursor-pointer"
                >
                  <p
                    className={`text-[#1F487C] text-[1.3vw] pl-[1.8vw] ${
                      selectedSetting === "data" ? "underline bold" : ""
                    }`}
                  >
                    Data settings
                  </p>
                </span>
                <span
                  onClick={() => setSelectedSetting("configuration")}
                  className=" cursor-pointer"
                >
                  <p
                    className={`text-[#1F487C] text-[1.3vw] pl-[1.8vw] ${
                      selectedSetting === "configuration"
                        ? "underline bold"
                        : ""
                    }`}
                  >
                    Configuration
                  </p>
                </span>
                <span
                  onClick={() => setSelectedSetting("integrations")}
                  className=" cursor-pointer"
                >
                  <p
                    className={`text-[#1F487C] text-[1.3vw] pl-[1.8vw] ${
                      selectedSetting === "integrations" ? "underline bold" : ""
                    }`}
                  >
                    Integrations
                  </p>
                </span>
              </div>
              <div className="relative flex items-center">
                <input
                  type="text"
                  className="bg-white outline-none pl-[2vw] w-[25vw] h-[2.5vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-[0.5vw] border-r-[0.2vw] border-b-[0.2vw]"
                  placeholder="Search Settings"
                />
                <IoSearch
                  className="absolute left-[0.5vw]"
                  size={"1vw"}
                  color="#1F4B7F"
                />
              </div>
            </div>
          </div>
          <div className="h-[80vh] w-full pb-[2vh]">
            <div className="overflow-y-scroll h-full">
              {selectedSetting === "system" && <SystemSettingList />}
              {selectedSetting === "user" && <UserSettingList />}
              {selectedSetting === "data" && <DataSettingList />}
              {selectedSetting === "configuration" && <ConfigurationIndex />}
              {selectedSetting === "integrations"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
