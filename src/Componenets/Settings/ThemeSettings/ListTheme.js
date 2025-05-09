import { Table, Modal, Spin } from "antd";
import React, { useEffect, useState } from "react";
import {
  ChangeTHemeId,
  ChangeTHemeStatus,
  GetThemeBg,
} from "../../../Api/Settings/ThemeSetting/ThemeSettings";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import ModalPopup from "../../Common/Modal/Modal";
import direction from "../../../asserts/direction.png";

export default function ListTheme({
  setThemeID,
  setTogglePage,
  setDeleteThemeModal,
  setThemeName,
  themeId,
  theme_background,
  themeStatusModal,
  setThemeStatusModal,
  setActiveId
}) {
  const apiImageUrl = process.env.REACT_APP_API_URL_IMAGE;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log(isModalOpen, "modal status");
  const showModal = (theme_id, index) => {
    const theme = theme_background.find((t) => t.theme_id === theme_id);
    setCurrentTheme(theme);
    setCurrentIndex(index);
    setIsModalOpen(true);
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setCurrentTheme(null);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentTheme(null);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTheme(null);
  };

  const [hoverId, setHoverId] = useState("");
  const [button, setbutton] = useState("");
  // const [themeStatusModal, setThemeStatusModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    GetThemeBg(dispatch);
  }, [dispatch]);

  const handleDeleteTheme = (theme_id) => {
    setThemeID(theme_id);
    setDeleteThemeModal(true);
  };

  // const handlechange = async (status_id, status) => {
  //   console.log(status_id, themeId, "status_id_status");
  //   try {
  //     const data = await ChangeTHemeStatus(
  //       dispatch,
  //       themeId,
  //       status_id,
  //       status
  //     );
  //     console.log(data, "datadatatatatat");
  //   } catch (error) {
  //     console.error("Error uploading data", error);
  //   }
  // };
  
  const formatDateFrom = (dateStr) => {
    const date = new Date(dateStr); // Create a Date object from the input string
    const day = date.getDate();
    const monthShort = date.toLocaleString('en-US', { month: 'short' });
  
    const formattedDate = `${day.toString().padStart(2, '0')} ${monthShort}`;
    return formattedDate;
  };
  const formatDateTo = (dateStr) => {
    const date = new Date(dateStr); // Create a Date object from the input string
    const day = date.getDate();
    const monthShort = date.toLocaleString('en-US', { month: 'short' });
  
    const formattedDate = `${day.toString().padStart(2, '0')} ${monthShort}`;
    return formattedDate;
  };
  

  const columns = [
    {
      title: (
        <div className="flex items-center justify-center text-[1.2vw] ">
          S.No
        </div>
      ),
      width: "5vw",
      dataIndex: "key",
      render: (text, record, index) => {
        return (
          <div className="text-[1vw] flex items-center justify-center text-[#1F487C]">
            {index + 1}
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex items-center justify-center text-[1.2vw]">
          Title
        </div>
      ),

      render: (row) => {
        return (
          <div className=" text-[1vw] flex items-center justify-center text-[#1F487C]">
            {row?.title}
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex items-center justify-center text-[1.2vw]">
          Created Date
        </div>
      ),
      render: (row) => {
        return (
          <div className="text-[1vw] flex items-center justify-center text-[#1F487C]">
            {dayjs(row?.created_date).format("DD MMM YYYY (hh:mm A)")}
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex items-center justify-center text-[1.2vw]">
          Updated Date
        </div>
      ),
      render: (row) => {
        return (
          <div className=" text-[1vw] flex items-center justify-center text-[#1F487C]">
            {dayjs(row?.updated_date).format("DD MMM YYYY (hh:mm A)")}
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex items-center justify-center text-[1.2vw]">
          Duration
        </div>
      ),
      render: (row) => {
        return (
          <div className="text-[1vw] flex items-center justify-center text-[#1F487C]">
            {row.from_date && row.to_date
              ? `${formatDateFrom(row.from_date)} - ${formatDateTo(row.to_date)}`
              : "-"}
          </div>
        );
      },
    },
    
    {
      title: (
        <div className="flex items-center justify-center text-[1.2vw]">
          Status
        </div>
      ),
      render: (row) => {
        return (
          <div className=" text-[1vw] flex items-center justify-center text-[#1F487C]">
            <button
              className={`${
                row?.status_id === 1 ? "bg-[#FD3434]" : "bg-[#34AE2B]"
              } items-center text-[1vw] text-white shadow-md font-extrabold shadow-black space-x-[0.7vw] px-[0.8vw] rounded-[0.5vw]  w-[6vw] cursor-pointer`}
              // disabled={row?.status_id === 2}
              onClick={() => {
                setThemeStatusModal(true);
                setThemeID(row?.theme_id);
                setActiveId(row.status_id)
              }}
            >
              {row?.status}
            </button>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex items-center justify-center text-[1.2vw] ">
          Action
        </div>
      ),
      width: "18vw",
      render: (row, index) => {
        return (
          <div className="flex items-center justify-center gap-[0.75vw] ">
            <span
              onMouseEnter={() => {
                setHoverId(row?.theme_id);
                setbutton("view");
              }}
              onMouseLeave={() => {
                setHoverId("");
                setbutton("");
              }}
              className={`px-[0.3vw] text-[1vw] border-[0.1vw] border-[#1F487C] flex items-center justify-center rounded-[0.25vw] gap-[0.25vw] cursor-pointer ${
                row?.theme_id === hoverId && button === "view"
                  ? "bg-[#1F487C] text-white"
                  : "bg-white text-[#1F487C]"
              }`}
              style={{ transition: "all 0.3s" }}
              onClick={() => showModal(row?.theme_id, index)}
            >
              <FaEye />
              <p>View</p>
            </span>

            <span
              onMouseEnter={() => {
                setHoverId(row?.theme_id);
                setbutton("edit");
              }}
              onMouseLeave={() => {
                setHoverId("");
                setbutton("");
              }}
              className={`px-[0.3vw] text-[1vw] border-[0.1vw] border-[#1F487C] flex items-center justify-center rounded-[0.25vw] gap-[0.25vw] cursor-pointer ${
                row?.theme_id === hoverId && button === "edit"
                  ? "bg-[#1F487C] text-white"
                  : "bg-white text-[#1F487C]"
              }`}
              style={{ transition: "all 0.3s" }}
              onClick={() => {
                setThemeID(row?.theme_id);
                setTogglePage(2);
              }}
            >
              <MdEdit />
              <p>Edit</p>
            </span>
            <span
              onMouseEnter={() => {
                setHoverId(row?.theme_id);
                setbutton("delete");
              }}
              onMouseLeave={() => {
                setHoverId("");
                setbutton("");
              }}
              className={`px-[0.3vw] text-[1vw] border-[0.1vw]  flex items-center justify-center rounded-[0.25vw] gap-[0.25vw] cursor-pointer ${
                row?.theme_id === hoverId && button === "delete"
                  ? "bg-[#FD3434] text-white border-[#FD3434]"
                  : "bg-white text-[#1F487C] border-[#1F487C]"
              }`}
              style={{ transition: "all 0.3s" }}
              onClick={() => {
                handleDeleteTheme(row?.theme_id);
                setThemeName(row?.title);
              }}
            >
              <MdDelete />
              <p>Delete</p>
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Table
        className="custom-table"
        columns={columns}
        dataSource={theme_background}
        pagination={false}
      />

      {/* <ModalPopup
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
              className="items-center text-[1vw] text-white shadow-md font-bold shadow-black space-x-[0.7vw] px-[0.8vw] w-[7vw] h-[2vw]  bg-[#34AE2B] rounded-[0.5vw] cursor-pointer"
              onClick={() => {
                handlechange(2, "Active");
                setThemeStatusModal(false);
                console.log(theme_background,"updated themes")
              }}
            >
              Active
            </button>
            <button
                            className="items-center text-[0.9vw] text-white  space-x-[0.7vw] px-[0.8vw] w-[8vw] h-[2vw] bg-[#ff2a2a] rounded-[0.5vw]"
                            onClick={() => handlechange(3, "Inactive")}
                        >
                            In Active
                        </button>
          </div>
        </div>
      </ModalPopup> */}

      <ModalPopup
        title="Background Theme Preview"
        show={isModalOpen}
        onClose={closeModal}
        width="75vw"
        height="30vw"
        closeicon={false}
      >
        {/* {theme_background.map((theme,index)=>(
                                <div key={theme.theme_id}>
                                <img  src={`${apiImageUrl}${theme.background}`} alt={`Background ${index}`}/>
                                <img  src={`${apiImageUrl}${theme.sky}`} alt={`Sky ${index}`}/>
                                <img  src={`${apiImageUrl}${theme.building}`} alt={`Building ${index}`}/>
                                <img  src={`${apiImageUrl}${theme.road}`} alt={`Road ${index}`}/>
                                </div>
                            ))} */}
        {currentTheme && (
          <div className="relative w-full h-full">
            {isLoading && (
              // <div className="absolute w-full h-full flex justify-center items-center z-10 backdrop-blur-sm">
              //   <span className="loader "></span>
              // </div>
              <Spin size="large" className="absolute w-full h-full flex justify-center items-center z-10 backdrop-blur-sm"/>
            )}
            {/* <div className="absolute inset-x-0 bottom-0 border-b-[1vh] border-black pointer-events-none z-10"></div> */}

            <img
              src={`${apiImageUrl}${currentTheme.background}`}
              alt={`Background ${currentIndex}`}
              className="absolute w-full bottom-0"
            />
            <img
              src={`${apiImageUrl}${currentTheme.sky}`}
              alt={`Sky ${currentIndex}`}
              className="absolute w-full -z-10"
            />
            <img
              src={`${apiImageUrl}${currentTheme.building}`}
              alt={`Building ${currentIndex}`}
              className="absolute left-0 bottom-0 w-full h-[15vw]"
            />
            <img
              src={`${apiImageUrl}${currentTheme.road}`}
              alt={`Road ${currentIndex}`}
              className="absolute bottom-0 w-full"
            />
          </div>
        )}
      </ModalPopup>
    </>
  );
}
