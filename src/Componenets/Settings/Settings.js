import React, { useEffect, useState } from "react";
import Backdrop from "../../asserts/CRMbg.png";
import "../../App.css";
//import { Input } from "antd";
import { LiaSearchSolid } from "react-icons/lia";
import { IoSearch } from "react-icons/io5";
import DataSettingList from "./DataSetting/DataSetting";
import SystemSettingList from "./SystemSetting/SystemSetting";
import UserSettingList from "./UserSetting/UserSetting";
import ConfigurationIndex from "./Configurations";
import { useLocation } from "react-router";
import ThemeSettings from "./ThemeSettings/ThemeIndex";

export default function Settings() {
  //const { Search } = Input;
  const location = useLocation()
  const [selectedSetting, setSelectedSetting] = useState(location?.state?.tabIndex || "system");
  const type_id = sessionStorage.getItem("type_id");
  useEffect(() => {
    setSelectedSetting(location?.state?.tabIndex || "system")
  }, [location.state])
  useEffect(() => {
    if (type_id !== "PRO101") {
      setSelectedSetting("user");
    }
  }, [type_id]);
  const handleKeyDown = (e) => {
    // Allow control keys like Backspace, Delete, ArrowLeft, ArrowRight, Tab
    const isControlKey = [
      "Backspace",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
    ].includes(e.key);

    if (isControlKey) {
      return; // If it's a control key, do nothing and allow it to execute
    }

    // Allow only alphabets (A-Z, a-z), numbers (0-9), and space
    if (!/^[A-Za-z0-9\s]$/.test(e.key)) {
      e.preventDefault(); // Prevent the key if it's not an alphabet, number, or space
    }
  };

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
        <div className="px-[2.5vw] h-[92vh] relative  w-full ">
          <div className="h-[13vh] w-full flex flex-col ">
            <h1 className="text-[#1F4B7F] pt-[0.5vw] text-[1.5vw] font-bold">
              SETTINGS
            </h1>

            <div className="pb-[0.5vw] flex  h-full items-center gap-[2vw]">
              <div className="relative flex items-center">
                <input
                  type="text"
                  className="bg-white outline-none pl-[2vw] w-[20vw] h-[2.5vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-[0.75vw] border-r-[0.25vw] border-b-[0.25vw] text-[#1F487C]"
                  placeholder="Search Settings"
                  onKeyDown={handleKeyDown}
                />
                <LiaSearchSolid
                  className="absolute left-[0.5vw] top-[0.8vw]"
                  size={"1vw"}
                  color="#9CA3AF"
                />
              </div>
              {type_id === "PRO101" && (
                <div
                  onClick={() => setSelectedSetting("system")}
                  className={` ${selectedSetting === "system"
                    ? "border-b-[0.25vw]  border-[#1F487C] font-bold"
                    : ""
                    } cursor-pointer`}
                >
                  <p className={`text-[#1F487C] text-[1.4vw]  `}>
                    Company Settings
                  </p>
                </div>
              )}
              <div
                onClick={() => setSelectedSetting("user")}
                className={` ${selectedSetting === "user"
                  ? "border-b-[0.25vw] border-[#1F487C] font-bold"
                  : ""
                  } cursor-pointer`}
              >
                <p className={`text-[#1F487C] text-[1.4vw] `}>
                  User Settings
                </p>
              </div>
              {/* {type_id === "PRO101" && (
                <div
                  onClick={() => setSelectedSetting("data")}
                  className={` ${selectedSetting === "data" ? "border-b-[0.25vw] border-[#1F487C]" : ""
                    } cursor-pointer`}
                >
                  <p
                    className={`text-[#1F487C] text-[1.4vw] px-[0.5vw]`}
                  >
                    Data settings
                  </p>
                </div>
              )} */}
              {type_id === "PRO101" && (
                <div
                  onClick={() => setSelectedSetting("configuration")}
                  className={` ${selectedSetting === "configuration"
                    ? "border-b-[0.25vw] border-[#1F487C] font-bold"
                    : ""
                    } cursor-pointer`}
                >
                  <p className={`text-[#1F487C] text-[1.4vw] `}>
                    Configuration
                  </p>
                </div>
              )}
              {type_id === "PRO101" && (
                <div
                  onClick={() => setSelectedSetting("integrations")}
                  className={` ${selectedSetting === "integrations"
                    ? "border-b-[0.25vw] border-[#1F487C] font-bold"
                    : ""
                    } cursor-pointer`}
                >
                  <p className={`text-[#1F487C] text-[1.4vw] `}>
                    Product Integrations
                  </p>
                </div>
              )}
              {type_id === "PRO101" && (
                <div
                  onClick={() => setSelectedSetting("themeSettings")}
                  className={` ${selectedSetting === "themeSettings"
                    ? "border-b-[0.25vw] border-[#1F487C] font-bold"
                    : ""
                    } cursor-pointer`}
                >
                  <p className={`text-[#1F487C] text-[1.4vw] `}>
                    Theme Settings
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="h-[80vh] w-full pb-[2vh]">
            <div className="overflow-y-auto h-full">
              {selectedSetting === "system" && <SystemSettingList />}
              {selectedSetting === "user" && <UserSettingList />}
              {selectedSetting === "data" && <DataSettingList />}
              {selectedSetting === "configuration" && <ConfigurationIndex />}
              {selectedSetting === "integrations"}
              {selectedSetting === 'themeSettings' && <ThemeSettings />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
