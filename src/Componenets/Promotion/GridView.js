import React, { useState } from "react";
//import image from "../../asserts/promotion_image.png";
import "../../App.css";
import dayjs from "dayjs";
import userimg from "../../asserts/userprofile.png";
import { Popover, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
//import { FaEye } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
//import ModalPopup from "../Common/Modal/Modal";
import { capitalizeFirstLetter } from "../Common/Captilization";
import { CiImageOff } from "react-icons/ci";

export default function GridView({
  currentData,
  setModalIsOpen,
  SetUpdateData,
  setPromoData,
  promotionId,
  setPromotionId,
  setDeleteModalIsOpen,
  setStatusUpdateModal,
  setComments,
  listType,
  setEyeModalIsOpen,
  setPromoImage,
}) {
  const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;
  // const [promoImage, setPromoImage] = useState("");
  const type_Id = sessionStorage.getItem("type_id");

  const [visiblePopover, setVisiblePopover] = useState(null);
  const [hoverid, setHoverId] = useState("");

  const [openPopovers, setOpenPopovers] = useState({});
  const dataArr = Array.from(currentData);
  const handleEdit = (promo_id) => {
    setVisiblePopover(null);
    setModalIsOpen(true);
    setPromotionId(promo_id);
    togglePopover(promo_id);
    SetUpdateData(promo_id);
  };

  const handleDelete = (promo_id) => {
    setVisiblePopover(null);
    setPromoData();
    setPromotionId(promo_id);
    togglePopover(promo_id);
    setDeleteModalIsOpen(true);
  };

  const togglePopover = (promo_id) => {
    setOpenPopovers((prevState) => ({
      ...prevState,
      [promo_id]: !prevState[promo_id],
    }));
  };

  const handleStatus = (item) => {
    if (
      type_Id.startsWith("PRO") ||
      (type_Id === "OP101" && listType === "employee")
    ) {
      setStatusUpdateModal(true);
      setPromotionId(item.promo_id);
      SetUpdateData(item.promo_id);
      setComments(item.comments);
    }
  };

  return (
    <div className="pt-[0.1vw]">
      <div className="grid grid-cols-5 w-full gap-x-[2vw] gap-y-[1.2vw] ">
        {dataArr?.map((item) => (
          <div
            key={item.promo_id}
            className={` bg-white text-[#1f4b7f] h-[17vw] w-[16vw] relative border-[#1f4b7f] border-l-[0.1vw] border-r-[0.3vw] border-b-[0.3vw] border-t-[0.1vw] rounded-[0.5vw]`}
            onMouseEnter={() => setHoverId(item.promo_id)}
            onMouseLeave={() => setHoverId("")}
            style={{
              transition: "ease-in 0.2s",
              boxShadow:
                hoverid === item.promo_id
                  ? "0.5vw 0.5vw 0.5vw #1f4b7f"
                  : "none",
            }}
          >
            <div className="flex items-center justify-center py-[0.5vw] ">
              { item.background_image != null ? (
                  <img
                  src={
                    item.background_image != null
                      ? `${apiImgUrl}${item.background_image}`
                      : userimg
                  }
                  onClick={() => {
                    setPromoImage(item.background_image);
                    setEyeModalIsOpen(true);
                  }}
                  className="h-[4.5vw] w-[9vw] cursor-pointer rounded-[0.5vw] flex items-center justify-center"
                />
              )
              : (
               <div className="flex flex-col items-center justify-center w-auto mb-[1vw] px-[1vw] h-[5vw] ">
                  <CiImageOff size={"4vw"} color="#A9A9A9" />
                </div>
             )
              }
             
              <div className=" " key={item.promo_id}>
                <Popover
                  placement="bottomRight"
                  className=""
                  content={
                    <div className="flex flex-col border-[0.1vw] border-[#1F4B7F] px-[1vw] py-[0.5vw] rounded-[0.5vw]">
                      {/* <div className="flex items-center gap-x-[0.5vw] py-[0.25vw] border-b-[0.1vw] border-[#1F487C]">
                  <span>
                    <FaEye
                      className="text-[1.2vw] text-[#1F487C]"
                      onClick={() => {
                        setVisiblePopover(null); // Close the Popover
                        setEyeModalIsOpen(true);
                        setPromoImage(item.background_image);
                        console.log(item.background_image, "bg image");
                      }}
                    />
                  </span>
                  <a
                    onClick={() => {
                      setVisiblePopover(null); // Close the Popover
                      setEyeModalIsOpen(true);
                      setPromoImage(item.background_image);
                      console.log(item.background_image, "bg image");
                    }}
                    className="flex font-semibold items-center cursor-pointer text-[1vw] text-[#1F4B7F] hover:text-[#1f487c]"
                  >
                    View
                  </a>
                </div> */}
                      <div className="flex items-center gap-x-[0.5vw] py-[0.25vw] border-b-[0.1vw] border-[#1F487C]">
                        <span>
                          <MdEdit
                            size={"1.2vw"}
                            color="#1F4B7F"
                            className="cursor-pointer"
                            onClick={() => handleEdit(item.promo_id)}
                          />
                        </span>
                        <a
                          onClick={() => handleEdit(item.promo_id)}
                          className="flex font-semibold items-center cursor-pointer text-[1vw] text-[#1F4B7F] hover:text-[#1f487c]"
                        >
                          Edit
                        </a>
                      </div>
                      <div className="flex items-center gap-x-[0.5vw] py-[0.25vw]">
                        <span>
                          <MdDelete
                            size={"1.2vw"}
                            color="#1F4B7F"
                            className="cursor-pointer"
                            onClick={() => handleDelete(item.promo_id)}
                          />
                        </span>
                        <a
                          onClick={() => handleDelete(item.promo_id)}
                          className="flex font-semibold items-center cursor-pointer text-[1vw] text-[#1F4B7F] hover:text-[#1f487c]"
                        >
                          Delete
                        </a>
                      </div>
                    </div>
                  }
                  trigger="click"
                  open={visiblePopover === item.promo_id} // Open only the selected Popover
                  onOpenChange={(visible) =>
                    setVisiblePopover(visible ? item.promo_id : null)
                  }
                >
                  <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    color="#1f487c"
                    className="absolute right-[0.2vw] top-[0.8vw] cursor-pointer rounded-[0.5vw]"
                    style={{
                      height: "1.5vw",
                      width: "1.5vw",
                    }}
                  />
                </Popover>
              </div>
            </div>
            <div className="flex-col flex items-center justify-center gap-y-[0.3vw]">
              <label className="text-[1vw] text-[#1f4b7f] font-bold uppercase">
                {item.operator_details?.length > 15 ? (
                  <Tooltip
                    placement="bottom"
                    title={item.operator_details}
                    className="cursor-pointer"
                    color="#1F487C"
                  >
                    {`${item.operator_details?.slice(0, 15)}...`}
                  </Tooltip>
                ) : (
                  item.operator_details?.slice(0, 15)
                )}
              </label>
              <h1 className="flex text-[0.9vw]  px-[1vw]">
                <span className=" pr-[0.5vw] font-bold">Promo Title: </span>{" "}
                <span>
                  {item.promo_name?.length > 15 ? (
                    <Tooltip
                      placement="bottom"
                      title={item.promo_name}
                      className="cursor-pointer"
                      color="#1F487C"
                    >
                      {`${item.promo_name?.slice(0, 15)}...`}
                    </Tooltip>
                  ) : (
                    capitalizeFirstLetter(item.promo_name?.slice(0, 15))
                  )}
                </span>
              </h1>
              <h1 className="text-[0.9vw]">
                <span className="font-semibold pr-[0.5vw]">Usage: </span>
                {`0/${item.usage}`}
              </h1>
              <h1 className="text-[0.9vw]">
                <span className="font-semibold pr-[0.5vw]">Promo Value: </span>
                {`${item.value_symbol}${item.promo_value}`}
              </h1>
              <h1 className="text-[0.9vw]">
                <span className="font-semibold pr-[0.5vw]">Duration:</span>
                {`${dayjs(item.start_date).format("MMM DD")} - ${dayjs(
                  item.expiry_date
                ).format("MMM DD")}`}
              </h1>
              <div className="px-[0.5vw] items-center justify-center">
              <div
                    className={`${
                      item.promo_status_id == 2
                        ? " border-[0.1vw] border-[#34AE2A]"
                        : item.promo_status_id == 0
                        ? "border-[0.1vw] border-[#646262]"
                        : item.promo_status_id == 3
                        ? "border-[0.1vw] border-[#2A99FF]"
                        : item.promo_status_id == 4
                        ? "border-[#FF0000] border-[0.1vw]"
                        : "border-[#FF9900] border-[0.1vw]"
                    } rounded-full `}
                  >
                <div
                  className={`${
                    item?.promo_status_id === 0
                      ? "bg-[#777575]"
                      : item?.promo_status_id === 1
                      ? "bg-[#FF9900]"
                      : item?.promo_status_id === 2
                      ? "bg-[#34AE2A]"
                      : item?.promo_status_id === 3
                      ? "bg-[#2A99FF]"
                      : item?.promo_status_id === 4
                      ? "bg-[#FD3434]"
                      : item?.promo_status_id === 5
                      ? "bg-[#FF9900]"
                      : "bg-[#646262]"
                  } border-dashed  border-white border-[0.2vw] text-[1vw] rounded-full text-white  py-[0.2vw] w-[11vw] flex items-center justify-center `}
                  // onClick={() => {
                  //   handleStatus(item);
                  // }}
                >
                  {item.promo_code}
                </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <ModalPopup
        show={eyeModalIsOpen}
        onClose={closeModal}
        closeicon={false}
        height="20vw"
        width="30vw"
      >
        {
          <div className="flex justofy-center mt-[1vw]">
          <img
          alt="prmoImage"
            src={`${apiImgUrl}${promoImage}`}
            className="w-full h-[15vw] rounded-[0.5vw]"
          />
        </div>
        }
      </ModalPopup> */}
    </div>
  );
}
