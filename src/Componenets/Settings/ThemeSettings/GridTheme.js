import React, { useEffect, useState } from "react";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import {Spin } from "antd";

export default function GridTheme({
  setThemeID,
  setTogglePage,
  setDeleteThemeModal,
  setThemeName,
  themeId,
  theme_background,
  themeStatusModal,
  setThemeStatusModal,
}) {
  const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;

  const [hoverId, setHoverId] = useState("");
  const [button, setbutton] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  },[]);
  const handleDeleteTheme = (theme_id) => {
    setThemeID(theme_id);
    setDeleteThemeModal(true);
  };

  console.log(theme_background, "themess");

  return (
    <>
      {/* {theme_background.map((item, index) => (
         <div className="relative bg-red-400 w-full h-full">
             <img
                src={`${apiImgUrl}${item?.background}`}
                className="absolute top-0 left-0 z-[1] object-cover scale-100 w-1/4 h-1/4"
                alt="background"
            />

             <img
                src={`${apiImgUrl}${item?.sky}`}
                className="absolute top-0 left-0 z-[2] object-cover scale-100 w-1/4 h-1/4"
                alt="sky"
            />

             <img
                src={`${apiImgUrl}${item?.building}`}
                className="absolute top-0 left-0 z-[3] object-contain scale-100 w-1/4 h-1/4"
                alt="building"
            />

             <img
                src={`${apiImgUrl}${item?.road}`}
                className="absolute top-0 left-0 z-[4] object-contain scale-100 w-1/4 h-1/4"
                alt="road"
            />
         </div>
        <div></div>
      ))} */}

      <div className="grid grid-cols-2 gap-[2vw] ">
        
        {theme_background.map((theme, index) => (
          <div
            className=" w-full h-full p-[1vw] border-[#1f4b7f] border-l-[0.1vw] border-r-[0.3vw] border-b-[0.3vw] border-t-[0.1vw] rounded-[0.5vw]"
            key={index}
          >
            <div className="relative w-full h-[90%]">
            {isLoading && (
          <Spin
            size="large"
            className="absolute w-full h-full flex justify-center items-center z-10 backdrop-blur-sm"
          />
        )}
              <img
                src={`${apiImgUrl}${theme.background}`}
                alt={`Background ${index}`}
                className="w-full h-full"
              />
              <img
                src={`${apiImgUrl}${theme.sky}`}
                alt={`Sky ${index}`}
                className="absolute top-0 left-0 -z-10"
              />
              <img
                src={`${apiImgUrl}${theme.building}`}
                alt={`Building ${index}`}
                className="absolute left-0 bottom-0 w-full h-[10vw]"
              />
              <img
                src={`${apiImgUrl}${theme.road}`}
                alt={`Road ${index}`}
                className="absolute bottom-0 w-full"
              />
            </div>

            <div className="flex justify-between items-center pt-[0.5vw]">
              <p className="text-[#1F487C] font-bold">{theme.title}</p>

              <div className="flex gap-[1vw]">
                <button
                  className={`${
                    theme?.status_id === 1 ? "bg-[#FD3434]" : "bg-[#34AE2B]"
                  } col-span-3 justify-self-end text-[1vw] text-white shadow-md font-extrabold shadow-black space-x-[0.7vw] px-[0.8vw] rounded-[0.5vw]  w-[6vw] ${
                    theme?.status_id === 2
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  disabled={theme?.status_id === 2}
                  onClick={() => {
                    setThemeStatusModal(true);
                    setThemeID(theme?.theme_id);
                  }}
                >
                  {theme?.status}
                </button>

                <button
                  onMouseEnter={() => {
                    setHoverId(theme?.theme_id);
                    setbutton("edit");
                  }}
                  onMouseLeave={() => {
                    setHoverId("");
                    setbutton("");
                  }}
                  onClick={() => {
                    setThemeID(theme?.theme_id);
                    setTogglePage(2);
                  }}
                  className={`px-[0.3vw] text-[1vw] border-[0.1vw] border-[#1F487C] flex items-center justify-center rounded-[0.25vw] gap-[0.25vw] cursor-pointer ${
                    theme?.theme_id === hoverId && button === "edit"
                      ? "bg-[#1F487C] text-white"
                      : "bg-white text-[#1F487C]"
                  }`}
                  style={{ transition: "all 0.3s" }}
                >
                  <MdModeEditOutline className="" />
                  <p className="">Edit</p>
                </button>
                <button
                  onMouseEnter={() => {
                    setHoverId(theme?.theme_id);
                    setbutton("delete");
                  }}
                  onMouseLeave={() => {
                    setHoverId("");
                    setbutton("");
                  }}
                  className={`px-[0.3vw] text-[1vw] border-[0.1vw]  flex items-center justify-center rounded-[0.25vw] gap-[0.25vw] cursor-pointer ${
                    theme?.theme_id === hoverId && button === "delete"
                      ? "bg-[#FD3434] text-white border-[#FD3434]"
                      : "bg-white text-[#1F487C] border-[#1F487C]"
                  }`}
                  style={{ transition: "all 0.3s" }}
                  onClick={() => {
                    handleDeleteTheme(theme?.theme_id);
                    setThemeName(theme?.title);
                  }}
                >
                  <MdDelete />
                  <p>Delete</p>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
