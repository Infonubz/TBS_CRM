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

const Index = () => {
  return (
    <div>
      <Collapse
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
        expandIconPosition="right"
        items={[
          {
            key: "1",
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
    </div>
  );
};

export default Index;
