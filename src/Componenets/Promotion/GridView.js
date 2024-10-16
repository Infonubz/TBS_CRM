import React, { useState } from "react";
import image from "../../asserts/promotion_image.png";
import "../../App.css";
import dayjs from "dayjs";
import userimg from "../../asserts/userprofile.png";
import { Popover } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

export default function GridView({
  currentData,
  setModalIsOpen,
  SetUpdateData,
  promotionId,
  setPromotionId,
  setDeleteModalIsOpen,
}) {
  const [hoverid, setHoverId] = useState("");
  const [openPopovers, setOpenPopovers] = useState({});
  const dataArr = Array.from(currentData);
  const handleEdit = (promo_id) => {
    setModalIsOpen(true);
    setPromotionId(promo_id);
    togglePopover(promo_id);
    SetUpdateData(promo_id)
  };

  const handleDelete = (promo_id) => {
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

  return (
    <div className="pt-[0.1vw]">
      <div className="grid grid-cols-5 w-full gap-x-[3vw] gap-y-[1vw]">
        {dataArr?.map((item) => (
          <div
            key={item.promo_id}
            className={`${hoverid === item.promo_id ? "bg-[#1f4b7f] text-white" : "bg-white"
              } h-[17vw] border-[#1f4b7f] border-l-[0.1vw] cursor-pointer border-r-[0.3vw] border-b-[0.3vw] border-t-[0.1vw] rounded-[0.5vw]`}
            onMouseEnter={() => setHoverId(item.promo_id)}
            onMouseLeave={() => setHoverId("")}
            style={{
              transition: "ease-in 0.5s",
            }}
          >
            <div className="flex justify-center pl-[5vw] pt-[1vw]">
              <img
                src={
                  item.promo_image != null
                    ? `http://192.168.90.47:4000${item.promo_image}`
                    : userimg
                }
                className="h-[5vw] w-[5vw] pr-[1vw] rounded-[0.5vw]"
              />
              <div className="text-right pl-[2vw]">
                <Popover
                  placement="bottomRight"
                  content={
                    <div className="flex flex-col">
                      {(item?.promo_status_id === 1 ||
                        item?.promo_status_id === 0) && (
                          <div>
                            <a
                              onClick={() =>
                                handleEdit(item.promo_id)

                              }
                              className="flex items-center cursor-pointer text-[1vw] text-[#1F4B7F] hover:text-[#1f487c]"
                            >
                              Edit
                            </a>
                          </div>
                        )}
                      <div>
                        <a
                          onClick={() => handleDelete(item.promo_id)}
                          className="flex pt-[0.1vw] items-center cursor-pointer text-[1vw] text-[#1F4B7F] hover:text-[#1f487c]"
                        >
                          Delete
                        </a>
                      </div>
                    </div>
                  }
                  trigger="click"
                //open={openPopovers[item.promo_id] || false}
                //onOpenChange={() => togglePopover(item.promo_id)}
                >
                  <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    color="#1f487c"
                    className={`${hoverid === item.promo_id
                      ? "text-white"
                      : "text-[#1f4b7f]"
                      } cursor-pointer rounded-[0.5vw]`}
                    onMouseEnter={() => setHoverId(item.promo_id)}
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
              <h1 className="font-bold text-[1vw] pt-[1vw]">
                {item.promo_name}
              </h1>
              <h1 className="text-[1vw]">
                <span className="font-semibold pr-[0.5vw]">Usage: </span>
                {`0/${item.usage}`}
              </h1>
              <h1 className="text-[1vw]">
                <span className="font-semibold pr-[0.5vw]">Duration:</span>
                {`${dayjs(item.start_date).format("MMM DD")} - ${dayjs(
                  item.expiry_date
                ).format("MMM DD")}`}
              </h1>
              <div className="px-[0.5vw] w-full">
                <button
                  className={`${item?.promo_status_id == 0
                      ? "bg-[#777575]"
                      : item?.promo_status_id == 1
                        ? "bg-[#FF9900]"
                        : item?.promo_status_id == 2
                          ? "bg-[#34AE2A]"
                          : item?.promo_status_id == 3
                            ? "bg-[#FD3434]"
                            : item?.promo_status_id == 4
                              ? "bg-[#2A99FF]"
                              : "bg-[#646262]"
                    } border-dashed border-white border-[0.2vw] text-[1.1vw] rounded-full text-white px-[0.5vw] py-[0.2vw] w-full`}
                >
                  {item.promo_status}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
