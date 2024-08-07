import React from "react";
import { IoIosArrowUp } from "react-icons/io";
import { RiArrowRightSLine } from "react-icons/ri";
import { MdCloudDownload } from "react-icons/md";
import { MdCloudUpload } from "react-icons/md";
import { LiaUserEditSolid } from "react-icons/lia";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Collapse } from "antd";
import "../../../App.css";
import Export_Data from "./ExportData";
import Import_Data from "./ImportData";
import Documents from "./Documents/Documents";

export default function DataSettingList() {
  return (
    <div className="">
      <Collapse
        className="bg-[#1F487C] rounded-2xl border border-[#1F487C]  shadow-[0_9px_9px_rgba(0,0,0,0.45)]shadow-xl"
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
        expandIconPosition="end"
        items={[
          {
            key: "1",
            label: (
              <div className="flex items-center h-[5vh]">
                <div className="col-span-2 pt-[0.3vw]">
                  <span className="">
                    <MdCloudDownload
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
                    Import Data
                  </span>
                  <p className="text-[#FFFFFF] text-[0.8vw]">
                    Import data from an uploaded CSV or spreadsheet file
                  </p>
                </div>
              </div>
            ),
            children: <Import_Data />,
          },
        ]}
      />
      <Collapse
        className="bg-[#1F487C] rounded-2xl border border-[#1F487C] mt-[1vw] shadow-[0_9px_9px_rgba(0,0,0,0.45)]shadow-xl"
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
        expandIconPosition="end"
        items={[
          {
            key: "1",
            label: (
              <div className="flex items-center h-[5vh]">
                <div className="col-span-2 pt-[0.3vw]">
                  <span className="">
                    <MdCloudUpload
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
                    Export Data
                  </span>
                  <p className="text-[#FFFFFF] text-[0.8vw]">
                    Download a backup of your data as a CSV file
                  </p>
                </div>
              </div>
            ),
            children: <Export_Data />,
          },
        ]}
      />
      {/* <Collapse
                className="bg-[#1F487C] rounded-2xl border border-[#1F487C] mt-[1vw] shadow-[0_9px_9px_rgba(0,0,0,0.45)] shadow-xl"
                size="large"
                expandIcon={({ isActive }) => isActive ? <IoIosArrowUp className="mt-[0.5vw]" style={{ color: '#FFFFFF', height: '2vw', width: '1.8vw' }} />
                    : <RiArrowRightSLine className="mt-[1.5vw]" style={{ color: '#FFFFFF', height: '2vw', width: '1.8vw' }} />}
                expandIconPosition="end"
                items={[{
                    key: '1',
                    label:
                        <div className="flex items-center h-[5vh]">
                            <div className="col-span-2 pt-[0.3vw]">
                                <span className=""><LiaUserEditSolid style={{ color: '#FFFFFF', height: '2.3vw', width: '2.3vw' }} /></span>
                            </div>
                            <div className="col-span-2 pl-[1vw]">
                                <span className="text-[#FFFFFF] font-medium text-[1.1vw]">Change Account Owner</span>
                                <p className="text-[#FFFFFF] text-[0.8vw]">Change the owner of multiple records</p>
                            </div>
                        </div>,
                    children: <p className="p-[0.5vw]">Change Account Owner</p>
                }]}
            /> */}
      <Collapse
        className="bg-[#1F487C] rounded-2xl border border-[#1F487C] mt-[1vw] shadow-[0_9px_9px_rgba(0,0,0,0.45)]shadow-xl"
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
        expandIconPosition="end"
        items={[
          {
            key: "1",
            label: (
              <div className="flex items-center h-[5vh]">
                <div className="col-span-2 pt-[0.3vw]">
                  <span className="">
                    <HiOutlineDocumentDuplicate
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
                    Documents
                  </span>
                  <p className="text-[#FFFFFF] text-[0.8vw]">
                    Manage documents
                  </p>
                </div>
              </div>
            ),
            children: <Documents />,
          },
        ]}
      />
      {/* <Collapse
                className="bg-[#1F487C] rounded-2xl border border-[#1F487C] mt-[1vw] shadow-[0_9px_9px_rgba(0,0,0,0.45)] shadow-xl"
                size="large"
                expandIcon={({ isActive }) => isActive ? <IoIosArrowUp className="mt-[0.5vw]" style={{ color: '#FFFFFF', height: '2vw', width: '1.8vw' }} />
                    : <RiArrowRightSLine className="mt-[1.5vw]" style={{ color: '#FFFFFF', height: '2vw', width: '1.8vw' }} />}
                expandIconPosition="end"
                items={[{
                    key: '1',
                    label:
                        <div className="flex items-center h-[5vh]">
                            <div className="col-span-2 pt-[0.3vw]">
                                <span className=""><RiDeleteBin5Fill style={{ color: '#FFFFFF', height: '2.3vw', width: '2.3vw' }} /></span>
                            </div>
                            <div className="col-span-2 pl-[1vw]">
                                <span className="text-[#FFFFFF] font-medium text-[1.1vw]">Recycle Bin</span>
                                <p className="text-[#FFFFFF] text-[0.8vw]">Restore deleted records</p>
                            </div>
                        </div>,
                    children: <p className="p-[0.5vw]">Recycle Bin</p>
                }]}
            /> */}
    </div>
  );
}
