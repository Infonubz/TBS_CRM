import React, { useState } from "react";
import image from "../../asserts/promotion_image.png";
import "../../App.css";
import dayjs from "dayjs";
import userimg from "../../asserts/userprofile.png";
import { FaPhone } from "react-icons/fa";
import { TbMailFilled } from "react-icons/tb";
import { Popover } from "antd";
import ModalPopup from "../Common/Modal/Modal";
import DeleteList from "../Offers/DeleteList";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "antd";
import { capitalizeFirstLetter } from "../Common/Captilization";


export default function ClientGridView({
  currentData,
  setClientID,
  setModalIsOpen,
  setDeleteModalIsOpen,
  deletemodalIsOpen,
  clientID,
  SetUpdateData,
  updatedata,
}) {
  const [hoverid, setHoverId] = useState("");
  const [changeColor, setChangeColor] = useState();
  const [openPopovers, setOpenPopovers] = useState({});
  const [userName, setUserName] = useState("")

  const handleEdit = (tbs_client_id) => {
    SetUpdateData(tbs_client_id);
    setClientID(tbs_client_id);
    setModalIsOpen(true);
    //setPromotionId(tbs_operator_id);
    togglePopover(tbs_client_id);
  };

  const handleDelete = (tbs_client_id) => {
    setClientID(tbs_client_id);
    togglePopover(tbs_client_id);
    setDeleteModalIsOpen(true);
  };

  const togglePopover = (tbs_client_id) => {
    setOpenPopovers((prevState) => ({
      ...prevState,
      [tbs_client_id]: !prevState[tbs_client_id],
    }));
  };

  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
  };

  const apiUrl = process.env.REACT_APP_API_URL;

  return (
    <>
      <div className="pt-[0.5vw]">
        <div className="grid grid-cols-5 w-full  gap-x-[3vw] gap-y-[1.2vw]">
          {currentData?.length > 0 &&
            currentData?.map((item) => (
              <div
                className={` bg-white h-[15.8vw] border-[#1f4b7f] border-l-[0.1vw] cursor-pointer border-r-[0.3vw] border-b-[0.3vw] border-t-[0.1vw] rounded-[0.5vw]`}
                onMouseEnter={() => setHoverId(item.tbs_client_id)}
                onMouseLeave={() => setHoverId("")}
                style={{
                  transition: "ease-in 0.2s",

                  boxShadow:
                    hoverid === item.tbs_client_id
                      ? "0.5vw 0.5vw 0.5vw #1f4b7f"
                      : "none",
                }}
              >
                <div className="flex justify-center pl-[4vw] pt-[1vw]">
                  <img
                    src={`${item?.company_logo
                      ? `http://192.168.90.47:4000${item?.company_logo}`
                      : userimg
                      } `}
                      alt="Profile"
                    className="w-[5vw] h-[5vw] object-cover rounded-[0.2vw]"
                  />
                  <div className="text-right pl-[3vw]">
                    <Popover
                      placement="bottomRight"
                      content={
                        <div className="flex flex-col">
                          <div>
                            <a
                              onClick={() => {
                                handleEdit(item.tbs_client_id)

                              }}
                              className="flex items-center cursor-pointer text-[1vw] text-[#1F4B7F] hover:text-[#1f487c]"
                            >
                              Edit
                            </a>
                          </div>
                          <div>
                            <a
                              onClick={() => {
                                handleDelete(item.tbs_client_id)
                                setUserName(item.owner_name)
                              }}
                              className="flex pt-[0.1vw] items-center cursor-pointer text-[1vw] text-[#1F4B7F] hover:text-[#1f487c]"
                            >
                              Delete
                            </a>
                          </div>
                        </div>
                      }
                      trigger="click"
                      open={openPopovers[item.tbs_client_id] || false}
                      onOpenChange={() => togglePopover(item.tbs_client_id)}
                    >
                      <FontAwesomeIcon
                        icon={faEllipsisVertical}
                        color="#1f487c"
                        className={`text-[#1f4b7f] cursor-pointer rounded-[0.5vw]`}
                        onMouseEnter={() => setHoverId(item.tbs_client_id)}
                        onMouseLeave={() => setHoverId("")}
                        style={{
                          height: "1.5vw",
                          width: "1.5vw",
                        }}
                      />
                    </Popover>
                  </div>
                </div>

                <div className="flex-col flex items-center justify-center gap-y-[0.5vw]">
                  <h1 className="font-bold text-[1vw] pt-[1.5vw] text-[#1f4b7f] ">
                    {/* {capitalizeFirstLetter(item.owner_name)} */}
                    {
                      item?.owner_name?.length > 15 ? (
                        <Tooltip title={capitalizeFirstLetter(item?.owner_name)}>
                          <span>{`${capitalizeFirstLetter(item?.owner_name).slice(0, 15)}...`}</span>
                        </Tooltip>
                      ) : (
                        <span>{capitalizeFirstLetter(item?.owner_name)}</span>
                      )
                    }
                  </h1>
                  <div className="flex flex-col  justify-center gap-y-[0.8vw]">
                    <div className="flex flex-row items-center space-x-[0.5vw] ">
                      <div
                        className={` bg-[#f6eeff] w-[1.8vw] h-[1.8vw] items-center flex justify-center rounded-lg`}
                        style={{
                          transition: "ease-out 1s",
                        }}
                      >
                        <FaPhone
                          size="1vw"
                          color={`${"#1f487c"
                            }`}
                        />
                      </div>
                      <div className="text-[0.9vw] text-[#1f4b7f]">{item.phone}</div>
                    </div>
                    <div className="flex flex-row items-center space-x-[0.5vw] ">
                      <div
                        className={` bg-[#f6eeff] w-[1.8vw] h-[1.8vw] items-center flex justify-center rounded-lg`}
                        style={{
                          transition: "ease-out 1s",
                        }}
                      >
                        <TbMailFilled
                          size="1vw"
                          color={`${"#1f487c"
                            }`}
                        />
                      </div>
                      {/* <div className="text-[0.9vw]">{item.emailid}</div> */}
                      {item?.emailid?.length > 15 ? (
                        <Tooltip
                          placement="right"
                          title={item?.emailid}
                          className="cursor-pointer"
                        // color="#1F487C"
                        >
                          <div className="text-[0.9vw] text-[#1f4b7f]">
                            {" "}
                            {`${item?.emailid?.slice(0, 15)}...`}
                          </div>
                        </Tooltip>
                      ) : (
                        <div className="text-[0.9vw] text-[#1f4b7f]">
                          {item?.emailid?.slice(0, 15)}
                        </div>
                      )}
                    </div>
                    <i className="pi-ellipsis-v"></i>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <ModalPopup
        show={deletemodalIsOpen}
        onClose={closeDeleteModal}
        height="20vw"
        width="30vw"
        closeicon={false}
      >
        <DeleteList
          setDeleteModalIsOpen={setDeleteModalIsOpen}
          title={`Want to delete this Client  ${capitalizeFirstLetter(userName)}`}
          api={`${apiUrl}/client-details/${clientID}`}
          module={"client"}
        />
      </ModalPopup>
    </>
  );
}
