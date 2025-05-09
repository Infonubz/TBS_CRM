import React, { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import AddTheme from "./AddTheme";
import { IoGrid, IoMenu } from "react-icons/io5";
import ListTheme from "./ListTheme";
import { Modal, Tooltip } from "antd";
import { TiThMenu } from "react-icons/ti";
import ModalPopup from "../../Common/Modal/Modal";
import { MdAutoDelete } from "react-icons/md";
import {
  DeleteTheme,
  GetThemeBg,
} from "../../../Api/Settings/ThemeSetting/ThemeSettings";
import { useDispatch, useSelector } from "react-redux";
import GridTheme from "./GridTheme";
import { ChangeTHemeStatus } from "../../../Api/Settings/ThemeSetting/ThemeSettings";
import direction from "../../../asserts/direction.png";

export default function ImagePreview() {
  const [togglePage, setTogglePage] = useState(1);
  const [view, setView] = useState("list");
  const [themeId, setThemeID] = useState();
  const [themeName, setThemeName] = useState();
  console.log(themeName, "theme_id");
  const [deleteThemeModal, setDeleteThemeModal] = useState(false);
  const [themeStatusModal, setThemeStatusModal] = useState(false);
  const [activeId,setActiveId] = useState(0)

  const dispatch = useDispatch();

  const theme_background = useSelector((state) => state?.crm?.theme_background);
  console.log("themebackground", theme_background);

  useEffect(() => {
    GetThemeBg(dispatch);
  }, [dispatch]);

  const handlesubmit = () => {
    setDeleteThemeModal(false);
    DeleteTheme(dispatch, themeId);
  };

  const handlechange = async (status_id, status) => {
    console.log(status_id, themeId, "status_id_status");
    try {
      const data = await ChangeTHemeStatus(
        dispatch,
        themeId,
        status_id,
        status
      );
      console.log(data, "datadatatatatat");
    } catch (error) {
      console.error("Error uploading data", error);
    }
  };
  const objectWithId2 = theme_background.find(
    (item) => item.status_id === 2
  );

//   console.log(objectWithId2.status_id, "objectWithId2");
  return (
    <>
      <div className="p-[1vw]">
        {togglePage === 1 ? (
          <>
            <div>
              <div className="flex items-center justify-between">
                <div className="font-bold text-[#1F487C] text-[1.25vw]">
                  Background Theme
                </div>
                <div className=" flex gap-x-[1vw]">
                  <div className="flex border-[#1F487C] ">
                    <Tooltip
                      placement="top"
                      title={
                        <div className="flex items-center gap-x-[0.5vw] justify-center">
                          <TiThMenu color={"#1F487C"} size={"1vw"} />
                          <label className="text-[1vw] font-semibold">
                            List View
                          </label>
                        </div>
                      }
                      className="cursor-pointer"
                      color="white"
                      overlayInnerStyle={{
                        color: "#1F487C",
                      }}
                    >
                      <button
                        className={`${
                          view === "list" ? "bg-[#1F487C]" : "bg-[white]"
                        } px-[0.75vw] rounded-l-[0.5vw] border-[0.1vw] border-b-[0.25vw] border-r-0  border-[#1F487C]`}
                        style={{
                          transition: "all 1s",
                        }}
                        onClick={() => setView("list")}
                      >
                        <TiThMenu
                          color={`${view === "list" ? "white" : "#1F487C"}`}
                        />
                      </button>
                    </Tooltip>
                    <Tooltip
                      placement="top"
                      title={
                        <div className="flex items-center gap-x-[0.5vw] justify-center">
                          <IoGrid color={"#1F487C"} size={"1vw"} />
                          <label className="text-[1vw] font-semibold">
                            Grid View
                          </label>
                        </div>
                      }
                      className="cursor-pointer"
                      color="white"
                      overlayInnerStyle={{
                        color: "#1F487C",
                      }}
                    >
                      <button
                        className={`${
                          view === "Grid" ? "bg-[#1F487C]" : "bg-[white]"
                        } px-[0.75vw] rounded-r-[0.5vw] border-[0.1vw] border-b-[0.25vw] border-r-[0.25vw] border-l-0  border-[#1F487C]`}
                        style={{
                          transition: "all 1s",
                        }}
                        onClick={() => setView("Grid")}
                      >
                        <IoGrid
                          color={`${view === "Grid" ? "white" : "#1F487C"}`}
                        />
                      </button>
                    </Tooltip>
                  </div>
                  <button
                    className="bg-white text-[#1F487C] border-[0.1vw] border-b-[0.2vw] border-r-[0.2vw] border-[#1F487C] rounded-[0.5vw] py-[0.25vw] outline-none flex items-center px-[1vw] gap-[0.25vw]"
                    onClick={() => {
                      setTogglePage(2);
                      setThemeID("");
                    }}
                  >
                    <IoIosAdd size={"1.5vw"} />{" "}
                    <span className="text-[1.2vw]">Add</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-[2.5vw]">
              {view === "list" ? (
                <ListTheme
                  setThemeID={setThemeID}
                  themeId={themeId}
                  setTogglePage={setTogglePage}
                  setDeleteThemeModal={setDeleteThemeModal}
                  setThemeName={setThemeName}
                  theme_background={theme_background}
                  themeStatusModal={themeStatusModal}
                  setThemeStatusModal={setThemeStatusModal}
                  setActiveId={setActiveId}
                />
              ) : (
                <GridTheme
                  setThemeID={setThemeID}
                  themeId={themeId}
                  setTogglePage={setTogglePage}
                  setDeleteThemeModal={setDeleteThemeModal}
                  setThemeName={setThemeName}
                  theme_background={theme_background}
                  themeStatusModal={themeStatusModal}
                  setThemeStatusModal={setThemeStatusModal}
                />
              )}
            </div>
          </>
        ) : (
          <AddTheme
            setTogglePage={setTogglePage}
            setThemeID={setThemeID}
            themeId={themeId}
          />
        )}
      </div>

      <ModalPopup
        show={deleteThemeModal}
        onClose={() => {
          setDeleteThemeModal(false);
        }}
        height="20vw"
        width="30vw"
        closeicon={false}
      >
        <div>
          <div className="flex flex-col  justify-center">
            <div className="items-center flex-col flex justify-center mt-[0.5vw]">
              <MdAutoDelete color="#1f4b7f" size={"5vw"} />
              <p className="text-[1.7vw] font-semibold text-[#1f4b7f] mt-[1vw]">
                Are You Sure ?
              </p>
              <p className="text-[1.1vw] text-[#1f4b7f] mt-[0.5vw]">{`Want to Delete ${themeName} ?`}</p>
            </div>
            <div className="flex items-center mt-[2vw] gap-[2vw] justify-center">
              <button
                className="border-[#1f4b7f] border-[0.1vw] rounded-[0.5vw] text-[1.1vw] font-semibold text-[#1f4b7f] w-[10vw]  h-[3vw]"
                onClick={() => setDeleteThemeModal(false)}
              >
                No
              </button>
              <button
                className="bg-[#1f4b7f] text-white font-semibold text-[1.1vw] w-[10vw] h-[3vw] rounded-[0.5vw]"
                // onClick={() => DeletePromoData()}
                onClick={() => handlesubmit()}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </ModalPopup>

      <ModalPopup
        className="border border-[#1f487c] border-b-8 border-r-8 border-b-[#1f487c] border-r-[#1f487c] rounded-md"
        show={themeStatusModal}
        closeicon={false}
        onClose={() => {
          setThemeStatusModal(false);
        }}
        height="16vw"
        width="30vw"
      >
        <div className="flex flex-col items-center justify-center">
          <p className="text-[1.5vw] font-bold">Update Theme Status</p>
          <img src={direction} className="h-[6vw] w-[6vw] my-[1vw]"></img>
          <div className="flex gap-2 mt-[1vw]">
            <button
              className={`items-center text-[1vw] text-white shadow-md font-bold shadow-black space-x-[0.7vw] px-[0.8vw] w-[7vw] h-[2vw] ${activeId === 1 ?  "bg-[#34AE2B]" : "bg-[#FD3434]" } rounded-[0.5vw] cursor-pointer`}
              onClick={() => {
                {activeId === 1 ? handlechange(2, "Active") : handlechange(1, "Inactive")}
                setThemeStatusModal(false);
                console.log(theme_background, "updated themes");
                
              }}
            >
              {activeId === 1 ? "Active" : "Inactive"}
              {/* <p>{activeId}</p> */}
            </button>
            {/* <button
                            className="items-center text-[0.9vw] text-white  space-x-[0.7vw] px-[0.8vw] w-[8vw] h-[2vw] bg-[#ff2a2a] rounded-[0.5vw]"
                            onClick={() => handlechange(3, "Inactive")}
                        >
                            In Active
                        </button> */}
          </div>
        </div>
      </ModalPopup>
    </>
  );
}
