import React, { useEffect, useState, useCallback } from "react";
import Backdrop from "../../asserts/CRMbg.png";
import "../../App.css";
//import { Input } from "antd";
import { LiaSearchSolid } from "react-icons/lia";
import { IoSearch } from "react-icons/io5";
import DataSettingList from "./DataSetting/DataSetting";
import SystemSettingList from "./SystemSetting/SystemSetting";
import UserSettingList from "./UserSetting/UserSetting";
import ConfigurationIndex from "./Configurations";
import { useLocation, useNavigate } from "react-router";
import ThemeSettings from "./ThemeSettings/ThemeIndex";
import { debounce } from "lodash";
import AboutUs from "./SystemSetting/AboutUs";

export default function Settings() {
  //const { Search } = Input;
  const location = useLocation();
  const [selectedSetting, setSelectedSetting] = useState(
    location?.state?.tabIndex || "system"
  );
  const [query, setQuery] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const navigation = useNavigate();

  const type_id = sessionStorage.getItem("type_id");
  useEffect(() => {
    setSelectedSetting(location?.state?.tabIndex || "system");
  }, [location.state]);
  useEffect(() => {
    if (type_id !== "PRO101") {
      setSelectedSetting("user");
    }
  }, [type_id]);
  
  const options = [
    { value: "company settings", label: "Company Settings" },
    { value: "about us", label: "About Us" },
    { value: "finance details", label: "Finance Details" },
    { value: "user settings", label: "User Settings" },
    { value: "edit your details", label: "Edit Your Details" },
    { value: "change password", label: "Change Password" },
    { value: "configuration", label: "Configuration" },
    { value: "email information", label: "Email Information" },
    { value: "bulk mail", label: "Bulk Mail" },
    { value: "bulk sms", label: "Bulk Sms" },
    { value: "language", label: "Language" },
    { value: "product integrations", label: "Product Integrations" },
    { value: "theme settings", label: "Theme Settings" },
    { value: "theme selection", label: "Theme Selection" },
  ];
  const handleInputChange = (e) => {
    const value = e.target.value;
    console.log(value, "valuevalue");
    setQuery(value);
    if (value) {
      setFilteredOptions(
        options.filter((option) =>
          option.label.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredOptions([]);
    }
  };

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

    // Handle dropdown navigation keys
    if (e.key === "ArrowDown") {
      setFocusedIndex((prevIndex) =>
        Math.min(prevIndex + 1, filteredOptions.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setFocusedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter" && focusedIndex >= 0) {
      handleOptionSelect(filteredOptions[focusedIndex]);
    } else if (e.key === "Escape") {
      setFilteredOptions([]); // Close the dropdown
      setFocusedIndex(-1); // Reset focus
    }
  };

  const handleOptionSelect = useCallback(
    debounce((selectedOption) => {
      const { value } = selectedOption;
      // alert(selectedOption.value)
      // setQuery(selectedOption.label);
      setQuery("")
      setFilteredOptions([]); // Clear the options after selection
      setFocusedIndex(-1);
      try {
        switch (value) {
          case "company settings":
            // navigation("/requestmanagement");
            setSelectedSetting("system");
            break;
          case "about us":
            // navigation("/usermanagement", {state: { tabIndex: "super_admin" },});
            setSelectedSetting("system");
            break;
          case "finance details":
            // navigation("/usermanagement", { state: { tabIndex: "partner" } });
            setSelectedSetting("system");
            break;
          case "user settings":
            // navigation("/usermanagement", { state: { tabIndex: "client" } });
            setSelectedSetting("user");
            break;
          case "edit your details":
            // navigation("/usermanagement", { state: { tabIndex: "employee" } });
            setSelectedSetting("user");
            break;
          case "change password":
            // navigation("/dashboard");
            setSelectedSetting("user");
            break;
          case "configuration":
            // navigation("/usermanagement");
            setSelectedSetting("configuration");
            break;
          case "email information":
            // navigation("/discounts", { state: { tabIndex: "redeem" } });
            setSelectedSetting("configuration");
            break;
          case "bulk mail":
            // navigation("/discounts", { state: { tabIndex: "discount" } });
            setSelectedSetting("configuration");
            break;
          case "bulk sms":
            // navigation("/settings", { state: { tabIndex: "bulk sms" } });
            setSelectedSetting("configuration");
            break;
          case "language":
            // navigation("/ads", { state: { tabIndex: "Mobile" } });
            setSelectedSetting("configuration");
            break;
          case "product integrations":
            // navigation("/promotion");
            setSelectedSetting("integrations");
            break;
          case "theme settings":
            // navigation("/roles");
            setSelectedSetting("themeSettings");
            break;
          case "theme selection":
            // navigation("/subscription");
            setSelectedSetting("themeSettings");
            break;
          default:
            navigation("");
        }

        // Optionally reset selected value after navigation
        // setSelectedValue("Search..");
      } catch (e) {
        console.error(e); // Error handling
      }
    }, 200),
    [] // Dependency array
  );

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
                  value={query}
                  className="bg-white outline-none pt-[0.25vw] pl-[2vw] w-[20vw] h-[2.5vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-[0.75vw] border-r-[0.25vw] border-b-[0.25vw] text-[#1F487C]"
                  placeholder="Search Settings"
                  onKeyDown={handleKeyDown}
                  onChange={handleInputChange}
                  // onClick={setQuery("")}
                />
                {filteredOptions.length > 0 && (
                  <ul
                    className="absolute z-10 w-[20vw] bg-white shadow-md rounded-[.4vw] mt-1 max-h-[12vw] overflow-auto text-[1vw] text-[#1F4B7F]"
                    style={{ top: "calc(100%)" }}
                  >
                    {filteredOptions.map((option, index) => (
                      <li
                        key={index}
                        className={`p-[.5vw] text-[1vw]  hover:bg-[#f0f0f0] cursor-pointer ${
                          index === focusedIndex ? "bg-[#e0e0e0]" : ""
                        }`}
                        onClick={() => handleOptionSelect(option)}
                      >
                        {option.label}
                      </li>
                    ))}
                  </ul>
                )}
                <LiaSearchSolid
                  className="absolute left-[0.5vw] top-[0.8vw]"
                  size={"1vw"}
                  color="#9CA3AF"
                />
              </div>
              {type_id === "PRO101" && (
                <div
                  onClick={() => setSelectedSetting("system")}
                  className={` ${
                    selectedSetting === "system"
                      ? "border-b-[0.25vw]  border-[#1F487C] font-bold"
                      : ""
                  } cursor-pointer`}
                >
                  <p className={`text-[#1F487C] text-[1.3vw]  `}>
                    Company Settings
                  </p>
                </div>
              )}
              <div
                onClick={() => setSelectedSetting("user")}
                className={` ${
                  selectedSetting === "user"
                    ? "border-b-[0.25vw] border-[#1F487C] font-bold"
                    : ""
                } cursor-pointer`}
              >
                <p className={`text-[#1F487C] text-[1.3vw] `}>User Settings</p>
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
                  className={` ${
                    selectedSetting === "configuration"
                      ? "border-b-[0.25vw] border-[#1F487C] font-bold"
                      : ""
                  } cursor-pointer`}
                >
                  <p className={`text-[#1F487C] text-[1.3vw] `}>
                    Configuration
                  </p>
                </div>
              )}
              {type_id === "PRO101" && (
                <div
                  onClick={() => setSelectedSetting("integrations")}
                  className={` ${
                    selectedSetting === "integrations"
                      ? "border-b-[0.25vw] border-[#1F487C] font-bold"
                      : ""
                  } cursor-pointer`}
                >
                  <p className={`text-[#1F487C] text-[1.3vw] `}>
                    Product Integrations
                  </p>
                </div>
              )}
              {type_id === "PRO101" && (
                <div
                  onClick={() => setSelectedSetting("themeSettings")}
                  className={` ${
                    selectedSetting === "themeSettings"
                      ? "border-b-[0.25vw] border-[#1F487C] font-bold"
                      : ""
                  } cursor-pointer`}
                >
                  <p className={`text-[#1F487C] text-[1.3vw] `}>
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
              {selectedSetting === "themeSettings" && <ThemeSettings />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
