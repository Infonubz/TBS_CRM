import React, { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { RiArrowRightSLine } from "react-icons/ri";
import { FiAlertCircle } from "react-icons/fi";
import { PiCalculatorFill } from "react-icons/pi";
import { IoIosInformationCircleOutline } from "react-icons/io";
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
import FinanceDetails from "./FinanceDetails";
import AboutUs from "./AboutUs";
import CompanDetails from "./CompanyDetails/CompanDetails";
import { useDispatch, useSelector } from "react-redux";
import { GetOperatorData } from "../../../Api/Settings/SystemSettings/CompanyDetails";

export default function SystemSettingList() {
  const [companyData, setCompanyData] = useState();
  const [userid, setUserid] = useState();
  const [selectedFile, setSelectedFile] = useState(null);


  const typeId = sessionStorage.getItem("type_id");
  const userID = sessionStorage.getItem("USER_ID")


  const operatorData = useSelector((state) => state?.crm?.operator_data[0])
  console.log(operatorData, 'operator_data')

  const dispatch = useDispatch()

  const fetchData = async () => {
    if (typeId === 'OP101') {
      try {
        const data = await GetOperatorData(dispatch)
        const profile = data[0].profileimg
        setSelectedFile(profile)
        console.log(profile, 'op_profile')
      } catch (error) {

      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [dispatch]);

  const [active, setActive] = useState("");

  const handleCollapseChange = (key) => {
    setActive((prev) => (prev === key ? "" : key));
  };

  console.log(active, 'active_KEY');


  return (
    <div className="scroll-container ">
      {/* {sessionStorage.getItem("type_id") == "SPA101" ? ( */}
      {sessionStorage.getItem("type_id") == "SPA101" ? (
        <>
          <Collapse
            className="bg-[#1F487C] rounded-2xl border border-[#1F487C]  shadow-xl"
            size="large"
            activeKey={active}
            onChange={() => handleCollapseChange("1")}
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
      {typeId == 'OP101' ?
        <Collapse
          activeKey={active}
          onChange={() => handleCollapseChange("1")}
          className="bg-[#1F487C] rounded-2xl border border-[#1F487C] shadow-xl"
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
                <div className="flex items-center ">
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
                      Company Details
                    </span>
                    <p className="text-[#FFFFFF] text-[0.8vw]">
                      Manage your company name and Details
                    </p>
                  </div>
                </div>
              ),
              children: (
                <div>
                  <CompanDetails
                    operatorData={operatorData}
                    selectedFile={selectedFile} />
                </div>
              ),
            },
          ]}
        /> : ''}
      <Collapse

        className={`bg-[#1F487C] rounded-2xl border border-[#1F487C] ${typeId == 'OP101' ? 'mt-[1vw]' : ''}  shadow-[0_9px_9px_rgba(0,0,0,0.45)] shadow-xl`}
        size="large"
        activeKey={active}
        onChange={() => handleCollapseChange("2")}
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
                    <IoIosInformationCircleOutline
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
                    About Us
                  </span>
                  <p className="text-[#FFFFFF] text-[0.8vw]">
                    Manage your about us, Privacy Policy, Terms & Condition,
                    User Agreement
                  </p>
                </div>
              </div>
            ),
            children: <AboutUs />,
          },
        ]}
      />
      <Collapse
        activeKey={active}
        onChange={() => handleCollapseChange("3")}
        className="bg-[#1F487C] rounded-2xl border border-[#1F487C] shadow-xl mt-[1vw]"
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
            key: "3",
            label: (
              <div className="flex items-center ">
                <div className="col-span-2">
                  <span className="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="2.3vw" height="2.3vw" viewBox="0 0 24 24"><path fill="#FFF" d="m6 16.5l-3 2.94V11h3m5 3.66l-1.57-1.34L8 14.64V7h3m5 6l-3 3V3h3m2.81 9.81L17 11h5v5l-1.79-1.79L13 21.36l-3.47-3.02L5.75 22H3l6.47-6.34L13 18.64" /></svg>
                  </span>
                </div>
                <div className="col-span-2 pl-[0.6vw]">
                  <span className="text-[#FFFFFF] font-medium text-[1.1vw]">
                    Finance Details
                  </span>
                  <p className="text-[#FFFFFF] text-[0.8vw]">
                    Manage your company name, currency and financial year end
                  </p>
                </div>
              </div>
            ),
            children: (
              <div>
                <FinanceDetails
                  companyData={companyData}
                  setCompanyData={setCompanyData} />
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
