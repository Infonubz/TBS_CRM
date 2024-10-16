import React, { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { RiArrowRightSLine } from "react-icons/ri";
import { FiAlertCircle } from "react-icons/fi";
import { PiCalculatorFill } from "react-icons/pi";
import { SlMenu } from "react-icons/sl";
import { LuCalendar } from "react-icons/lu";
import { BsTable } from "react-icons/bs";
import { RiTimeZoneLine } from "react-icons/ri";
import { Collapse } from "antd";
import "../../../App.css";
import CalenderSetting from "./CalenderSetting";
import CompanyProfile from "./CompanyProfile";
import CustomTemplate from "./CustomTemplate";
import CompanySettings from "./CompanySettings";

export default function SystemSettingList() {
  const [companyData, setCompanyData] = useState();
  const [userid, setUserid] = useState();
  return (
    <div className="scroll-container ">
      {/* {sessionStorage.getItem("type_id") == "SPA101" ? ( */}
      {localStorage.getItem("type_id") == "SPA101" ? (
        <>
          <Collapse
            className="bg-[#1F487C] rounded-2xl border border-[#1F487C]  shadow-xl"
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
                  <div className="flex items-center h-[5vh] ">
                    <div className="col-span-2 ">
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
                    <div className="col-span-2 pl-[1vw] flex flex-col">
                      <span className="text-[#FFFFFF] font-semibold text-[1.1vw]">
                        Company Profile
                      </span>
                      <p className="text-[#FFFFFF] text-[0.8vw]">
                        Let us know more about you
                      </p>
                    </div>
                  </div>
                ),
                children: (
                  <div>
                    <CompanyProfile />
                  </div>
                ),
              },
            ]}
          />
        </>
      ) : (
        ""
      )}
      <Collapse
        className="bg-[#1F487C] rounded-2xl border border-[#1F487C] mt-[1vw] shadow-xl"
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
                <div className="col-span-2">
                  <span className="">
                    <PiCalculatorFill
                      style={{
                        color: "#FFFFFF",
                        height: "2.3vw",
                        width: "2.3vw",
                      }}
                    />
                  </span>
                </div>
                <div className="col-span-2 pl-[0.6vw]">
                  <span className="text-[#FFFFFF] font-medium text-[1.1vw]">
                    Company Settings
                  </span>
                  <p className="text-[#FFFFFF] text-[0.8vw]">
                    Manage your company name, currency and financial year end
                  </p>
                </div>
              </div>
            ),
            children: (
              <div>
                <CompanySettings
                  companyData={companyData}
                  setCompanyData={setCompanyData}
                // userid = {setUserid}
                />
              </div>
            ),
          },
        ]}
      />
      {/* <Collapse
        className="bg-[#1F487C] rounded-2xl border border-[#1F487C] mt-[1vw] shadow-xl"
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
                <div className="col-span-2 ">
                  <span className="">
                    <BsTable
                      style={{
                        color: "#FFFFFF",
                        height: "2vw",
                        width: "2vw",
                      }}
                    />
                  </span>
                </div>
                <div className="col-span-2 pl-[1vw]">
                  <span className="text-[#FFFFFF] font-medium text-[1.1vw]">
                    Company Fields
                  </span>
                  <p className="text-[#FFFFFF] text-[0.8vw]">
                    Configure custom fields on your forms
                  </p>
                </div>
              </div>
            ),
            children: (
              <div>
                <CustomTemplate />
              </div>
            ),
          },
        ]}
      /> */}

      {/* <Collapse
        className="bg-[#1F487C] rounded-2xl border border-[#1F487C] mt-[1vw] shadow-xl"
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
              <div className="flex flex-row">
                <div className="col-span-2 pt-[0.3vw]">
                  <span className="">
                    <SlMenu
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
                    Custom Dropdown Lists
                  </span>
                  <p className="text-[#FFFFFF] text-[0.8vw]">
                    Manage the dropdown lists that control the choices in form
                    fields
                  </p>
                </div>
              </div>
            ),
            children: <p className="p-[0.5vw]">Custom Dropdown Lists</p>,
          },
        ]}
      /> */}
      {/* <Collapse
        className="bg-[#1F487C] rounded-2xl border border-[#1F487C] mt-[1vw] shadow-xl"
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
                    <LuCalendar
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
                    Calendar Settings
                  </span>
                  <p className="text-[#FFFFFF] text-[0.8vw]">
                    Manage your system calendars
                  </p>
                </div>
              </div>
            ),
            children: (
              <div>
                <CalenderSetting />
              </div>
            ),
          },
        ]}
      /> */}
      {/* <Collapse
        className="bg-[#1F487C] rounded-2xl border border-[#1F487C] mt-[1vw] shadow-xl"
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
              <div className="flex flex-row">
                <div className="col-span-2 pt-[0.3vw]">
                  <span className="">
                    <RiTimeZoneLine
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
                    Time Zone
                  </span>
                  <p className="text-[#FFFFFF] text-[0.8vw]">
                    Manage time zone Settings
                  </p>
                </div>
              </div>
            ),
            children: <p className="p-[0.5vw]">Time Zone</p>,
          },
        ]}
      /> */}
    </div>
  );
}
