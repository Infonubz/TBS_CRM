import { FiAlertCircle } from "react-icons/fi";
import EmailInformation from "./EmailInformation";
import { RiArrowRightSLine } from "react-icons/ri";
import { IoIosArrowUp } from "react-icons/io";
import { Collapse } from "antd";
import Language from "./Language";
import BulkSms from "./BulkSms";
import BulkMail from "./BulkMail";
import { IoMailUnreadOutline } from "react-icons/io5";
import { FaLanguage, FaMailBulk } from "react-icons/fa";
import { MdOutlineSms } from "react-icons/md";
import { PiCalculatorFill } from "react-icons/pi";
import AboutUs from "./AboutUs";
import ReferEarn from "./ReferEarn";
import { act, useState } from "react";
const Index = () => {

  // const [active, setActive] = useState("0");

  // const handleCollapseChange = (key) => {
  //   if (active !== key) {
  //     setActive(key);
  //   }
  // };
  // console.log(active, 'active_KEY');


  const [active, setActive] = useState("");

  const handleCollapseChange = (key) => {
    setActive((prev) => (prev === key ? "" : key));
  };

  console.log(active, 'active_KEY');

  return (
    <div>
      <Collapse
        activeKey={active}
        onChange={() => handleCollapseChange("1")}
        className="bg-[#1F487C] rounded-2xl border border-[#1F487C]  "
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
                    <IoMailUnreadOutline
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
                    Email Information
                  </span>
                  <p className="text-[#FFFFFF] text-[0.8vw]">
                    some description about email information
                  </p>
                </div>
              </div>
            ),
            children: <EmailInformation />,
          },
        ]}
      />
      <Collapse
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
        activeKey={active}
        onChange={() => handleCollapseChange("2")}
        expandIconPosition="right"
        items={[
          {
            key: "2",
            label: (
              <div className="flex items-center h-[5vh]">
                <div className="col-span-2 pt-[0.3vw]">
                  <span className="">
                    <FaMailBulk
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
                    Bulk Mail
                  </span>
                  <p className="text-[#FFFFFF] text-[0.8vw]">
                    some description about Bulk Mail
                  </p>
                </div>
              </div>
            ),
            children: <BulkMail />,
          },
        ]}
      />
      <Collapse
        className="bg-[#1F487C] rounded-2xl border border-[#1F487C] mt-[1vw] shadow-[0_9px_9px_rgba(0,0,0,0.45)] shadow-xl"
        size="large"
        activeKey={active}
        onChange={() => handleCollapseChange("3")}
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
              <div className="flex items-center h-[5vh]">
                <div className="col-span-2 pt-[0.3vw]">
                  <span className="">
                    <MdOutlineSms
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
                    Bulk Sms
                  </span>
                  <p className="text-[#FFFFFF] text-[0.8vw]">
                    some description about Bulk Sms
                  </p>
                </div>
              </div>
            ),
            children: <BulkSms />,
          },
        ]}
      />
      <Collapse
        className="bg-[#1F487C] rounded-2xl border border-[#1F487C] mt-[1vw] shadow-[0_9px_9px_rgba(0,0,0,0.45)] shadow-xl"
        size="large"
        activeKey={active}
        onChange={() => handleCollapseChange("4")}
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
            key: "4",
            label: (
              <div className="flex items-center h-[5vh]">
                <div className="col-span-2 pt-[0.3vw]">
                  <span className="">
                    <FaLanguage
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
                    Language
                  </span>
                  <p className="text-[#FFFFFF] text-[0.8vw]">
                    some description about Language
                  </p>
                </div>
              </div>
            ),
            children: <Language />,
          },
        ]}
      />
      {/* <Collapse
        className="bg-[#1F487C] rounded-2xl border border-[#1F487C] mt-[1vw] shadow-[0_9px_9px_rgba(0,0,0,0.45)] shadow-xl"
        size="large"
        activeKey={active}
        onChange={() => handleCollapseChange("5")}
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
            key: "5",
            label: (
              <div className="flex items-center h-[5vh]">
                <div className="col-span-2 pt-[0.3vw]">
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
                <div className="col-span-2 pl-[1vw]">
                  <span className="text-[#FFFFFF] font-medium text-[1.1vw]">
                    Legal Documents
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
      /> */}
      {/* <Collapse
        className="bg-[#1F487C] rounded-2xl border border-[#1F487C] mt-[1vw] shadow-[0_9px_9px_rgba(0,0,0,0.45)] shadow-xl"
        size="large"
        activeKey={active}
        onChange={() => handleCollapseChange("6")}
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
            key: "6",
            label: (
              <div className="flex items-center h-[5vh]">
                <div className="col-span-2 pt-[0.3vw]">
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
                <div className="col-span-2 pl-[1vw]">
                  <span className="text-[#FFFFFF] font-medium text-[1.1vw]">
                    Refer and Earn
                  </span>
                </div>
              </div>
            ),
            children: <ReferEarn />,
            // children: <AboutUs />,
          },
        ]}
      /> */}
    </div>
  );
};

export default Index;
