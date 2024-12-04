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

export default function RedeemGridView({
  currentData,
  setModalIsOpen,
  SetUpdateData,
  offerimage,
  setOfferImage,
  setOfferView,
  offerview,
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
            className={`${
              hoverid == item.tbs_offer_id ? "shadow-lg shadow-[#1F487C]" : ""
            }  h-[16.75vw] border-[#1f4b7f] border-l-[0.1vw] cursor-pointer border-r-[0.3vw] border-b-[0.3vw] border-t-[0.1vw] rounded-[0.5vw] bg-white text-[#1F487C]`}
            onMouseEnter={() => setHoverId(item.tbs_offer_id)}
            onMouseLeave={() => setHoverId("")}
            style={{
              transition: "ease-in 0.2s",
            }}
          >
            <div className="flex justify-end pt-[1vw] pr-[.5vw]">
              <Popover
                placement="bottomRight"
                content={
                  <div className="flex flex-col px-[0.5vw]">
                    {/* <div>
                      <a
                        onClick={() => {
                          setOfferView(true);
                          setOfferImage(item.theme);
                          handleOptionClick(item.tbs_offer_id);
                        }}
                        className="flex pt-[1vw] items-center cursor-pointer text-[0.9vw] text-[#1F4B7F] hover:text-[#1f487c]"
                      >
                        <FaEye color="#1F4B7F" className="mr-1" />
                        View
                      </a>
                    </div> */}
                    <div>
                      <a
                        onClick={() => {
                          setModalIsOpen(true);
                          SetUpdateData(item.tbs_offer_id);
                          handleOptionClick(item.tbs_offer_id);
                        }}
                        className=" pt-[0.5vw] flex items-center cursor-pointer text-[0.9vw] text-[#1F4B7F] hover:text-[#1f487c]"
                      >
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="mr-1"
                          color="#1f487c"
                        />
                        Edit
                      </a>
                    </div>
                    <div>
                      <a
                        onClick={() => {
                          setDeleteModalIsOpen(true);
                          setPromoId(item.tbs_offer_id);
                          handleOptionClick(item.tbs_offer_id);
                        }}
                        className="flex py-[0.5vw] items-center cursor-pointer text-[0.9vw] text-[#1F4B7F] hover:text-[#1f487c]"
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="mr-1"
                          color="#1f487c"
                        />
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
                />
              </Popover>
            </div>
            <div className="flex-col flex items-center  h-full w-full gap-y-[0.1vw]">
              <img
                // src={
                //   item?.offer_img != null
                //     ? `${apiImgUrl}${item.offer_img}`
                //     : userimg
                // }
                src={
                  item?.offer_img != null
                    ? `${apiImgUrl}${item.theme}`
                    : userimg
                }
                onClick={() => {
                  setOfferView(true);
                  setOfferImage(item.theme);
                  handleOptionClick(item.tbs_offer_id);
                }}
                className="h-[5vw] w-auto rounded-[0.5vw]"
              />
              <div className="font-bold text-[0.9vw] mt-[0.25vw] ">
                {item.offer_name}
              </div>
              <div className=" w-full flex flex-col items-center gap-[0.35vw]">
                <div className="text-[0.9vw] mt-[0.75vw] flex ">
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
                  <button
                    className={`${
                      item.req_status_id == 2
                        ? "bg-[#34AE2A]"
                        : item.req_status_id == 0
                        ? "bg-[#646262]"
                        : item.req_status_id == 3
                        ? "bg-[#2A99FF]"
                        : item.req_status_id == 4
                        ? "bg-[#FF0000]"
                        : "bg-[#FF9900]"
                    } border-dashed  border-white border-[0.2vw] text-[1.1vw] rounded-full text-white  py-[0.2vw] w-full `}
                  >
                    {item.code}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <ModalPopup
        show={offerview}
        onClose={() => setOfferView(false)}
        height="20vw"
        width="30vw"
        closeicon={false}
      >
        <img src={`${apiImgUrl}${offerimage}`} className="w-full h-full" />
      </ModalPopup> */}

      <ModalPopup
        show={deletemodalIsOpen}
        onClose={closeDeleteModal}
        height="20vw"
        width="30vw"
        closeicon={false}
      >
        <DeleteList
          setDeleteModalIsOpen={setDeleteModalIsOpen}
          title={"Want to delete this Offers & Deals"}
          api={`${apiUrl}/offers-deals/${promotionid}`}
          module={"offer"}
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
