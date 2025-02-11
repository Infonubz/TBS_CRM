import React, { useState } from "react";
import image from "../../../asserts/promotion_image.png";
import "../../../App.css";
import dayjs from "dayjs";
import userimg from "../../../asserts/userprofile.png";
import { Popover, Modal } from "antd";
import {
  faEdit,
  faEllipsisVertical,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteList from "../DeleteList";
import ModalPopup from "../../Common/Modal/Modal";
import { FaEye } from "react-icons/fa";
import NOIMAGE from "../../../asserts/NOIMAGE.png";
import { CiImageOff } from "react-icons/ci";
import { MdDelete, MdEdit } from "react-icons/md";
import { capitalizeFirstLetter } from "../../Common/Captilization";

export default function RedeemGridView({
  currentData,
  setModalIsOpen,
  SetUpdateData,
  offerimage,
  setOfferImage,
  setOfferView,
  offerview,
  offerFilter
}) {
  const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;

  const [promotionid, setPromoId] = useState(null);
  const [hoverid, setHoverId] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  const [deletemodalIsOpen, setDeleteModalIsOpen] = useState(false);
  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
  };

  const [openPopovers, setOpenPopovers] = useState({});

  // Function to handle popover visibility based on offer ID
  const handlePopoverToggle = (offerId) => {
    setOpenPopovers((prevState) => ({
      ...prevState,
      [offerId]: !prevState[offerId], // Toggle the popover for this specific offerId
    }));
  };

  // Function to close the popover when any option is clicked
  const handleOptionClick = (offerId) => {
    setOpenPopovers((prevState) => ({
      ...prevState,
      [offerId]: false, // Close the popover when an option is clicked
    }));
  };

  return (
    <div className="pt-[0.5vw]">
      <div className="grid grid-cols-5 w-full gap-x-[4vw] gap-[0.75vw] pb-[5vw]">
        {currentData.map((item) => (
          <div
            className={` bg-white text-[#1f4b7f] h-[16vw] relative border-[#1f4b7f] border-l-[0.1vw] cursor-default border-r-[0.3vw] border-b-[0.3vw] border-t-[0.1vw] rounded-[0.5vw]`}
            onMouseEnter={() => setHoverId(item.tbs_offer_id)}
            onMouseLeave={() => setHoverId("")}
            style={{
              transition: "ease-in 0.2s",

              boxShadow:
                hoverid === item.tbs_offer_id
                  ? "0.5vw 0.5vw 0.5vw #1f4b7f"
                  : "none",
            }}
          >
            <div className="flex justify-end pt-[1vw] pr-[.5vw]">
              <Popover
                placement="bottomRight"
                content={
                  <div className="flex flex-col px-[0.5vw] border-[.1vw] border-[#1F487C] rounded-[.5vw]">
                    <div className="flex items-center gap-x-[0.5vw] py-[0.25vw] border-b-[0.1vw] border-[#1F487C]">
                      <span>
                        <MdEdit
                          size={"1.2vw"}
                          color="#1F4B7F"
                          className=" cursor-pointer"
                        />
                      </span>
                      <a
                        onClick={() => {
                          setModalIsOpen(true);
                          SetUpdateData(item.tbs_offer_id);
                          handleOptionClick(item.tbs_offer_id);
                        }}
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
                          className=" cursor-pointer"
                        // onClick={() => {
                        //   handleDelete(row.promo_id);
                        // }}
                        />
                      </span>
                      <a
                        onClick={() => {
                          setDeleteModalIsOpen(true);
                          setPromoId(item);
                          handleOptionClick(item.tbs_offer_id);
                        }}
                        className="flex font-semibold items-center cursor-pointer text-[1vw] text-[#1F4B7F] hover:text-[#1f487c]"
                      >
                        Delete
                      </a>
                    </div>
                  </div>
                }
                trigger="click"
                open={openPopovers[item.tbs_offer_id] || false} // Open the popover for this specific offerId
                onOpenChange={(visible) => {
                  if (visible) {
                    setOpenPopovers({ [item.tbs_offer_id]: true }); // Open popover for this offerId
                  } else {
                    setOpenPopovers({}); // Close all popovers
                  }
                }}
              >
                <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  color="#1f487c"
                  style={{
                    height: "1.5vw",
                    width: "1.5vw",
                  }}
                  className={`
                  absolute right-[0.2vw] top-[0.8vw]
                     cursor-pointer rounded-[0.5vw]`}
                />
              </Popover>
            </div>
            <div className="flex-col flex items-center  h-full w-full gap-y-[0.1vw]">
              {item.theme ? (
                <img
                  src={
                    item?.offer_img != null ? `${apiImgUrl}${item.theme}` : ""
                  }
                  onClick={() => {
                    setOfferView(item.theme ? true : false);
                    setOfferImage(item.theme);
                    handleOptionClick(item.tbs_offer_id);
                  }}
                  className={`h-[5vw] w-auto rounded-[0.5vw] ${item?.theme ? "cursor-pointer" : ""
                    }`}
                />
              ) : (
                <div className="flex flex-col items-center justify-center w-auto px-[1vw] h-[5vw] ">
                  <CiImageOff size={"3.5vw"} color="#A9A9A9" />
                </div>
              )}

              <div className=" w-full flex flex-col items-center gap-[0.6vw] mt-[0.7vw]">
                <div className="font-bold text-[0.9vw]  ">
                  {
                    item?.offer_name?.charAt(0) === item?.offer_name?.charAt(0).toLowerCase()
                      ? capitalizeFirstLetter(item?.offer_name)
                      : item?.offer_name
                  }
                </div>
                <div className="text-[0.9vw]  flex ">
                  <span className="font-semibold pr-[0.5vw] ">Usage: </span>
                  <span className="">{`0/${item.usage}`}</span>
                </div>
                <div className="text-[0.9vw] flex">
                  <span className="font-semibold pr-[0.5vw]">Duration:</span>
                  <span className="">
                    {" "}
                    {`${dayjs(item?.start_date).format("MMM DD")} - ${dayjs(
                      item?.expiry_date
                    ).format("MMM DD")}`}
                  </span>
                </div>
                <div className="px-[1.5vw] w-full">
                  <div
                    className={`${item.req_status_id == 2
                        ? " border-[0.1vw] border-[#34AE2B]"
                        : item.req_status_id == 0
                          ? "border-[0.1vw] border-[#646262]"
                          : item.req_status_id == 3
                            ? "border-[0.1vw] border-[#2A99FF]"
                            : item.req_status_id == 4
                              ? "border-[#FD3434] border-[0.1vw]"
                              : "border-[#FF9900] border-[0.1vw]"
                      } rounded-full `}
                  >
                    <div
                      className={`${item.req_status_id == 2
                          ? "bg-[#34AE2B] "
                          : item.req_status_id == 0
                            ? "bg-[#646262]"
                            : item.req_status_id == 3
                              ? "bg-[#2A99FF]"
                              : item.req_status_id == 4
                                ? "bg-[#FD3434]"
                                : "bg-[#FF9900]"
                        } border-dashed  border-white border-[0.2vw] text-[1.1vw] rounded-full text-white  py-[0.2vw] w-full flex items-center justify-center `}
                    >
                      {item.code}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
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
          title={`Want to delete this ${promotionid?.offer_name}`}
          api={`${apiUrl}/offers-deals/${promotionid?.tbs_offer_id}`}
          module={"offer"}
          filter={offerFilter}
        />
      </ModalPopup>

      <Modal
        visible={offerview}
        onCancel={() => setOfferView(false)}
        footer={null}
        centered
        bodyStyle={{ padding: 0 }}
        destroyOnClose={true}
      >
        <img
          src={offerimage != null ? `${apiImgUrl}${offerimage}` : userimg}
          className="w-full h-full"
        />
      </Modal>
    </div>
  );
}
