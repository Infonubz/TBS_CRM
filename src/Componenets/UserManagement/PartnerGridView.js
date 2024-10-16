import React, { useState } from "react";
import image from "../../asserts/promotion_image.png";
import "../../App.css";
import dayjs from "dayjs";
import userimg from "../../asserts/userprofile.png";
import { FaPhone } from "react-icons/fa";
import { TbMailFilled } from "react-icons/tb";
import ModalPopup from "../Common/Modal/Modal";
import { Popover } from "antd";
import { Tooltip } from "antd";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteList from "../Offers/DeleteList";

export default function PartnerGridView({
  currentData,
  PartnerID,
  setPartnerID,
  setModalIsOpen,
  SetUpdateData,
}) {
  const [hoverid, setHoverId] = useState("");
  const [changeColor, setChangeColor] = useState();
  const [partnerdeletemodalIsOpen, setPartnerDeleteModalIsOpen] =
    useState(false);
  const [openPopovers, setOpenPopovers] = useState({});

  const closeDeleteModal = () => {
    setPartnerDeleteModalIsOpen(false);
  };
  const apiUrl = process.env.REACT_APP_API_URL;

  const togglePopover = (tbs_partner_id) => {
    setOpenPopovers((prevState) => ({
      ...prevState,
      [tbs_partner_id]: !prevState[tbs_partner_id],
    }));
  };

  const handleEdit = (tbs_pro_emp_id) => {
    SetUpdateData(tbs_pro_emp_id);
    setPartnerID(tbs_pro_emp_id);
    setModalIsOpen(true);
    togglePopover(tbs_pro_emp_id);
  };

  const handleDelete = (tbs_pro_emp_id) => {
    setPartnerID(tbs_pro_emp_id);
    togglePopover(tbs_pro_emp_id);
    setPartnerDeleteModalIsOpen(true);
  };

  return (
    <>
      <div className="pt-[0.5vw]">
        <div className="grid grid-cols-5 w-full gap-x-[3vw] gap-y-[1.5vw]">
          {currentData.map((item) => (
            <div
              className={`${
                hoverid == item.tbs_partner_id
                  ? "bg-[#1f4b7f] text-white"
                  : "bg-white"
              }  h-[16vw] border-[#1f4b7f] border-l-[0.1vw] cursor-pointer border-r-[0.3vw] border-b-[0.3vw] border-t-[0.1vw] rounded-[0.5vw]`}
              onMouseEnter={() => setHoverId(item.tbs_partner_id)}
              onMouseLeave={() => setHoverId("")}
              style={{
                transition: "ease-in 0.5s",
              }}
            >
              <div className="flex justify-center pl-[4vw] pt-[1vw]">
                <img
                  src={`${
                    item?.profile_img
                    ? `http://192.168.90.47:4000${item?.profile_img}`
                    : userimg
                  } `}
                  className="h-[5vw] w-[5vw] rounded-[0.5vw]"
                />
                <div className="text-right pl-[3vw]">
                  <Popover
                    placement="bottomRight"
                    content={
                      <div className="flex flex-col">
                        <div>
                          <a
                            onClick={() => {
                              handleEdit(item.tbs_partner_id);
                              console.log(item.tbs_partner_id, "----owner id");
                            }}
                            className="flex items-center cursor-pointer text-[1vw] text-[#1F4B7F] hover:text-[#1f487c]"
                          >
                            Edit
                          </a>
                        </div>
                        <div>
                          <a
                            onClick={() => {
                              handleDelete(item.tbs_partner_id);
                              console.log(item.tbs_partner_id, "----owner id");
                            }}
                            className="flex pt-[0.1vw] items-center cursor-pointer text-[1vw] text-[#1F4B7F] hover:text-[#1f487c]"
                          >
                            Delete
                          </a>
                        </div>
                      </div>
                    }
                    trigger="click"
                    open={openPopovers[item.tbs_partner_id] || false}
                    onOpenChange={() => togglePopover(item.tbs_partner_id)}
                  >
                    <FontAwesomeIcon
                      icon={faEllipsisVertical}
                      color="#1f487c"
                      className={`${
                        hoverid === item.tbs_partner_id
                          ? "text-white"
                          : "text-[#1f4b7f]"
                      } cursor-pointer rounded-[0.5vw]`}
                      onMouseEnter={() => setHoverId(item.tbs_partner_id)}
                      onMouseLeave={() => setHoverId("")}
                      style={{
                        height: "1.5vw",
                        width: "1.5vw",
                      }}
                    />
                  </Popover>
                </div>
              </div>
              <div className="flex-col flex items-center justify-center gap-y-[0.4vw] pt-[2vw]">
                <h1 className="font-bold text-[1vw]">{item.partner_first_name}</h1>
                <div className="flex flex-col  justify-center gap-y-[0.8vw]">
                  <div className="flex flex-row items-center space-x-[0.5vw] ">
                    <div
                      className={`${
                        item.tbs_partner_id != hoverid
                          ? "bg-[#1f487c]"
                          : "bg-[#f6eeff]"
                      }  w-[1.8vw] h-[1.8vw] items-center flex justify-center rounded-lg`}
                      style={{
                        transition: "ease-out 1s",
                      }}
                    >
                      <FaPhone
                        size="1vw"
                        color={`${
                          item.tbs_partner_id != hoverid ? "white" : "#1f487c"
                        }`}
                      />
                    </div>
                    <div className="text-[0.9vw]">{item.phone}</div>
                  </div>
                  <div className="flex flex-row items-center space-x-[0.5vw] ">
                    <div
                      className={`${
                        item.tbs_partner_id != hoverid
                          ? "bg-[#1f487c]"
                          : "bg-[#f6eeff]"
                      }  w-[1.8vw] h-[1.8vw] items-center flex justify-center rounded-lg`}
                      style={{
                        transition: "ease-out 1s",
                      }}
                    >
                      <TbMailFilled
                        size="1vw"
                        color={`${
                          item.tbs_partner_id != hoverid ? "white" : "#1f487c"
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
                          <div className="text-[0.9vw]">
                            {" "}
                            {`${item?.emailid?.slice(0, 15)}...`}
                          </div>
                        </Tooltip>
                      ) : (
                        <div className="text-[0.9vw]">
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
        show={partnerdeletemodalIsOpen}
        onClose={closeDeleteModal}
        height="20vw"
        width="30vw"
        closeicon={false}
      >
        <DeleteList
          setDeleteModalIsOpen={setPartnerDeleteModalIsOpen}
          title={"Want to delete this User"}
          api={`${apiUrl}/partner_details/${PartnerID}`}
          module={"partner"}
        />
      </ModalPopup>
    </>
  );
}
