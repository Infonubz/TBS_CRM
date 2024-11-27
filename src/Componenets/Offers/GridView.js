import React, { useState } from "react";
import image from "../../asserts/promotion_image.png";
import "../../App.css";
import dayjs from "dayjs";
import userimg from "../../asserts/userprofile.png";
import { Popover } from "antd";
import {
  faEdit,
  faEllipsisVertical,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteList from "./DeleteList";
import ModalPopup from "../Common/Modal/Modal";
export default function GridView({
  currentData,
  setModalIsOpen,
  SetUpdateData,
}) {
  const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;

  const [promotionid, setPromoId] = useState(null);
  const [hoverid, setHoverId] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  const [deletemodalIsOpen, setDeleteModalIsOpen] = useState(false);
  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
  };

  return (
    <div className="pt-[0.5vw]">
      <div className="grid grid-cols-5 w-full gap-x-[4vw] gap-[1vw] pb-[5vw]">
        {currentData.map((item) => (
          <div
            className={`${hoverid == item.tbs_offer_id
              ? "bg-[#1f4b7f] text-white"
              : "bg-white"
              }  h-[16.5vw] border-[#1f4b7f] border-l-[0.1vw] cursor-pointer border-r-[0.3vw] border-b-[0.3vw] border-t-[0.1vw] rounded-[0.5vw]`}
            onMouseEnter={() => setHoverId(item.tbs_offer_id)}
            onMouseLeave={() => setHoverId("")}
            style={{
              transition: "ease-in 0.5s",
            }}
          >
            <div className="flex justify-end pt-[1vw] pr-[.5vw]">
              <Popover
                placement="bottomRight"
                content={
                  <div className="flex flex-col">
                    <div>
                      <a
                        onClick={() => {
                          setModalIsOpen(true);
                          SetUpdateData(item.tbs_offer_id)
                        }}
                        className="flex items-center cursor-pointer text-[1vw] text-[#1F4B7F] hover:text-[#1f487c]"
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
                          setPromoId(item.tbs_offer_id)
                        }}
                        className="flex pt-[1vw] items-center cursor-pointer text-[1vw] text-[#1F4B7F] hover:text-[#1f487c]"
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
              // open={openPopovers[row.tbs_ad_id] || false}
              // onOpenChange={() => togglePopover(row.tbs_ad_id)}
              >
                <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  color="#1f487c"
                  style={{
                    height: "1.5vw",
                    width: "1.5vw",
                  }}
                  className={`${hoverid == item.tbs_offer_id
                    ? "text-white"
                    : ""
                    }`}
                />
              </Popover>
            </div>
            <div className="flex-col flex items-center  h-full w-full gap-y-[0.3vw]">
              <img
                src={
                  item?.offer_img != null
                    ? `${apiImgUrl}${item.offer_img}`
                    : userimg
                }
                className="h-[5vw] w-[5vw] rounded-[0.5vw]"
              />
              <h1 className="font-bold text-[1vw]">{item.offer_name}</h1>
              <h1 className="text-[1vw]">
                <span className="font-semibold pr-[0.5vw]">Usage: </span>
                {`0/${item.usage}`}
              </h1>
              <h1 className="text-[1vw]">
                <span className="font-semibold pr-[0.5vw]">Duration:</span>
                {`${dayjs(item?.start_date).format("MMM DD")} - ${dayjs(
                  item?.expiry_date
                ).format("MMM DD")}`}
              </h1>
              <div className="px-[0.5vw] w-full">
                <button
                  className={`${item.status == "Active"
                    ? "bg-[#34AE2A]"
                    : item.status == "Draft"
                      ? "bg-[#FD3434]"
                      : "bg-[#FF9900]"
                    } border-dashed  border-white border-[0.2vw] text-[1.1vw] rounded-full text-white px-[0.5vw] py-[0.2vw] w-full `}
                >
                  {item.code}
                </button>
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
          title={"Want to delete this Offers & Deals"}
          api={`${apiUrl}/offers-deals/${promotionid}`}
          module={"offer"}
        />
      </ModalPopup>
    </div>
  );
}
