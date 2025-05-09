import React, { useState } from "react";
import { Collapse } from "antd";
import { FaAffiliatetheme } from "react-icons/fa";
import { RiArrowRightSLine } from "react-icons/ri";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import ImagePreview from "./ImagePreview";

export default function ThemeSettings() {

    const [active, setActive] = useState("");

    const handleCollapseChange = (key) => {
        setActive((prev) => (prev === key ? "" : key));
    };

    console.log(active, 'active_KEY');

    return (
        <div className="pr-[0.3vw]">
            <Collapse
                activeKey={active}
                onChange={() => handleCollapseChange("1")}
                className="bg-[#1F487C] rounded-2xl border border-[#1F487C] shadow-[0_9px_9px_rgba(0,0,0,0.45)] shadow-xl"
                size="large"
                expandIcon={({ isActive }) =>
                    isActive ? (
                        <IoIosArrowUp
                            className="mt-[0.5vw]"
                            style={{ color: "#FFFFFF", height: "2vw", width: "1.8vw"}}
                        />
                    ) : (
                        <IoIosArrowDown
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
                                        <FaAffiliatetheme
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
                                        Theme Selection
                                    </span>
                                    <p className="text-[#FFFFFF] text-[0.8vw]">
                                        Choosing preferred theme for TBS-Web
                                    </p>
                                </div>
                            </div>
                        ),
                        children: <ImagePreview />
                    },
                ]}
            />
        </div>
    );
};
