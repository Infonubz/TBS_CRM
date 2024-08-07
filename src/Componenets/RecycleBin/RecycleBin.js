import React, { useState } from "react";
import Backdrop from "../../asserts/CRMbg.png";
import { IoSearch } from "react-icons/io5";
import Advertisement from "./Advertisement";
import Offers_Deals from "./Offers_Deals";
import Promotion from "./Promotion";
import Subscription from "./Subscription";
import Roles_Response from "./Role_Response";
import User_Management from "./UserManagement";

export default function RecycleBin() {
  const [selectedTab, setSelectedTab] = useState("user management");

  return (
    <div
      className="h-screen w-screen"
      style={{
        backgroundImage: `url(${Backdrop})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="left-[5%] right-[5%] px-[5vw]">
        <div className="flex">
          <h1 className="text-[#1F4B7F] text-[2vw] font-bold flex items-center justify-center">
            RecycleBin
          </h1>
        </div>
        <div className="flex pt-[1vw] items-center gap-[2vw]">
          <div className="relative flex items-center ">
            <input
              type="text"
              className="bg-white outline-none pl-[2vw] w-[17vw] h-[2.5vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-[0.5vw] border-r-[0.2vw] border-b-[0.2vw]"
              placeholder="Search Users"
              // onChange={(e) => handleSearch(e.target.value)}
            />
            <IoSearch
              className="absolute left-[0.5vw]"
              size={"1vw"}
              color="#1F4B7F"
            />
          </div>
          <div className="flex items-center gap-x-[3vw]">
            <div
              className={` cursor-pointer ${
                selectedTab == "user management"
                  ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                  : ""
              } `}
              onClick={() => {
                setSelectedTab("user management");
              }}
            >
              <p className="text-[1.3vw] text-[#1f487c] text-center">
                User Management
              </p>
            </div>
            <div
              className={` cursor-pointer ${
                selectedTab == "offers"
                  ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                  : ""
              } `}
              onClick={() => setSelectedTab("offers")}
            >
              <div className="text-[1.3vw] text-[#1f487c] text-center">
                Offers & Deals
              </div>
            </div>
            <div
              className={` cursor-pointer ${
                selectedTab == "ads"
                  ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                  : ""
              } `}
              onClick={() => setSelectedTab("ads")}
            >
              <div className="text-[1.3vw] text-[#1f487c] text-center">
                Advertisement
              </div>
            </div>
            <div
              className={` cursor-pointer ${
                selectedTab == "promo"
                  ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                  : ""
              } `}
              onClick={() => setSelectedTab("promo")}
            >
              <div className="text-[1.3vw] text-[#1f487c] text-center">
                Promotion
              </div>
            </div>
            <div
              className={` cursor-pointer ${
                selectedTab == "roles"
                  ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                  : ""
              } `}
              onClick={() => setSelectedTab("roles")}
            >
              <div className="text-[1.3vw] text-[#1f487c] text-center">
                Roles & Responsibilities
              </div>
            </div>
            <div
              className={` cursor-pointer ${
                selectedTab == "subscript"
                  ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                  : ""
              } `}
              onClick={() => setSelectedTab("subscript")}
            >
              <div className="text-[1.3vw] text-[#1f487c] text-center">
                Subscription
              </div>
            </div>
          </div>
        </div>

        <div className="pt-[2vw]">
          {selectedTab === "user management" && <User_Management />}
          {selectedTab === "offers" && <Offers_Deals />}
          {selectedTab === "ads" && <Advertisement />}
          {selectedTab === "promo" && <Promotion />}
          {selectedTab === "roles" && <Roles_Response />}
          {selectedTab === "subscript" && <Subscription />}
        </div>
      </div>
    </div>
  );
}
