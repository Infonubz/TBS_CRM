import React, { useState } from "react";
import image from "../../asserts/promotion_image.png";
import "../../App.css";
import dayjs from "dayjs";
import userimg from "../../asserts/userprofile.png";
import { FaPhone, FaPhoneAlt } from "react-icons/fa";
import { TbMailFilled } from "react-icons/tb";
import ModalPopup from "../Common/Modal/Modal";
import { Modal, Popover } from "antd";
import { Tooltip } from "antd";
import { faEdit, faEllipsisVertical, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteList from "../Offers/DeleteList";
import { capitalizeFirstLetter } from "../Common/Captilization";
export default function PartnerGridView({
  currentData,
  PartnerID,
  setPartnerID,
  setModalIsOpen,
  SetUpdateData,
}) {
  const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;
  const apiUrl = process.env.REACT_APP_API_URL;
  const [hoverid, setHoverId] = useState("");
  const [changeColor, setChangeColor] = useState();
  const [partnerdeletemodalIsOpen, setPartnerDeleteModalIsOpen] =
    useState(false);
  const [openPopovers, setOpenPopovers] = useState({});
  const [userName, setUserName] = useState();

  const closeDeleteModal = () => {
    setPartnerDeleteModalIsOpen(false);
  };


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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const openModal = (event) => {
    // Get the image source (src) using `getElementById`
    const imageSrc = event.target.getAttribute('src');

    // Set the modal image source
    setModalImage(imageSrc);

    // Open the modal
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="pt-[0.5vw]">
        <div className="grid grid-cols-5 w-full gap-x-[3vw] gap-y-[1vw]">
          {currentData.length > 0 && currentData.map((item) => {
            const fullname = `${item?.partner_first_name.charAt(0) === item?.partner_first_name.charAt(0).toLowerCase()
              ? capitalizeFirstLetter(item?.partner_first_name)
              : item?.partner_first_name} ${item?.partner_last_name}`;
            return (
              <div
                className={` bg-white h-[33.5vh] border-[#1f4b7f] border-l-[0.1vw]  border-r-[0.3vw] border-b-[0.3vw] border-t-[0.1vw] rounded-[0.5vw]`}
                onMouseEnter={() => setHoverId(item.tbs_partner_id)}
                onMouseLeave={() => setHoverId("")}
                style={{
                  transition: "ease-in 0.2s",

                  boxShadow:
                    hoverid === item.tbs_partner_id
                      ? "0.5vw 0.5vw 0.5vw #1f4b7f"
                      : "none",
                }}
              >
                <div className="flex justify-center pl-[5vw] pt-[1vw]">
                  <img
                    src={`${item?.profile_img
                      ? `${apiImgUrl}${item?.profile_img}`
                      : userimg
                      } `}
                    alt="Profile"
                    className="h-[10vh] cursor-pointer w-[5vw] rounded-[0.5vw]"
                    onClick={openModal}
                  />
                  <div className="text-right pl-[3.5vw]">
                    <Popover
                      placement="bottomRight"
                      content={
                        <div className="flex flex-col p-[.5vw] border-[.1vw] border-[#1f487c] rounded-[.5vw]">
                          <div>
                            <a
                              onClick={() => {
                                handleEdit(item.tbs_partner_id);
                                console.log(
                                  item.tbs_partner_id,
                                  "----owner id"
                                );
                                setUserName(
                                  `${item?.partner_first_name} ${" "} ${item?.partner_last_name
                                  }`
                                );
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
                          <div className="">
                            <hr class="border-t-2 border-[#1F4B7F] my-[.3vw]" />
                          </div>
                          <div>
                            <a
                              onClick={() => {
                                handleDelete(item.tbs_partner_id);
                                setUserName(
                                  `${item?.partner_first_name} ${" "} ${item?.partner_last_name
                                  }`
                                );
                                console.log(
                                  item.tbs_partner_id,
                                  "----owner id"
                                );
                              }}
                              className="flex pt-[0.1vw] items-center cursor-pointer text-[1vw] text-[#1F4B7F] hover:text-[#1f487c]"
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
                      open={openPopovers[item.tbs_partner_id] || false}
                      onOpenChange={() => togglePopover(item.tbs_partner_id)}
                    >
                      <FontAwesomeIcon
                        icon={faEllipsisVertical}
                        color="#1f487c"
                        className={` text-[#1f4b7f] cursor-pointer rounded-[0.5vw]`}
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
                <div className="flex-col h-[19vh] flex items-center justify-center gap-y-[0.4vw] pt-[2vw]">
                  {/* <h1 className="font-bold text-[1vw] text-[#1f4b7f]">{capitalizeFirstLetter(item.partner_first_name)}</h1> */}
                  {
                    // Define fullname variable outside JSX

                    <div className="flex items-center justify-center">
                      <h1 className="text-[1vw] font-semibold text-[#1F4B7F]">
                        {fullname?.length > 16 ? (
                          <Tooltip
                            color="white"
                            overlayInnerStyle={{ color: "#1F4B7F" }}
                            placement="top"
                            title={fullname}
                            className="cursor-pointer"
                          >
                            {fullname.slice(0, 16) + ".."}
                          </Tooltip>
                        ) : (
                          fullname
                        )}
                      </h1>
                    </div>
                  }
                  <div className="flex flex-col  justify-center gap-y-[0.8vw]">
                    <div className="flex flex-row items-center space-x-[0.5vw] ">
                      <div
                        className={` bg-[#f6eeff] w-[1.8vw] h-[1.8vw] items-center flex justify-center rounded-lg`}
                        style={{
                          transition: "ease-out 1s",
                        }}
                      >
                        <FaPhoneAlt size="1vw" color={`${"#1f487c"}`} />
                      </div>
                      <div className="text-[0.9vw] text-[#1f4b7f]">
                        {item?.phone === null || item?.phone?.length <= 0 ? "Not Available" : item.phone}
                      </div>
                    </div>
                    <div className="flex flex-row items-center space-x-[0.5vw] ">
                      <div
                        className={` bg-[#f6eeff] w-[1.8vw] h-[1.8vw] items-center flex justify-center rounded-lg`}
                        style={{
                          transition: "ease-out 1s",
                        }}
                      >
                        <TbMailFilled size="1vw" color={`${"#1f487c"}`} />
                      </div>
                      {/* <div className="text-[0.9vw]">{item.emailid}</div> */}
                      {item?.emailid?.length > 18 ? (
                        <Tooltip
                          color="white"
                          overlayInnerStyle={{ color: "#1F4B7F" }}
                          placement="top"
                          title={item?.emailid}
                          className="cursor-pointer"
                        // color="#1F487C"
                        >
                          <div className="text-[0.9vw] text-[#1f4b7f]">
                            {" "}
                            {`${item?.emailid?.slice(0, 18)}...`}
                          </div>
                        </Tooltip>
                      ) : (
                        <div className="text-[0.9vw] text-[#1f4b7f]">
                          {/* {item?.emailid?.slice(0, 18)} */}
                          {item?.emailid === null || item?.emailid?.length <= 0 ? "Not Available" : item?.emailid?.slice(0, 18)}
                        </div>
                      )}
                    </div>
                    <i className="pi-ellipsis-v"></i>
                  </div>
                </div>
              </div>
            );
          })}
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
          title={`Want to delete this User ${capitalizeFirstLetter(userName)}`}
          api={`${apiUrl}/partner_details/${PartnerID}`}
          module={"partner"}
        />
      </ModalPopup>
      <Modal
        className="flex justify-center"
        visible={isModalOpen}
        onCancel={closeModal}
        footer={null}
        centered
        width="20vw"
        height="20vw"
        bodyStyle={{ padding: 0 }}
        destroyOnClose={true} // Ensures modal is destroyed on close
      >
        {/* Display the image in the modal */}
        <div className="flex justify-center">
          {modalImage && (
            <img
              src={modalImage}
              alt="Gst Preview"
              // style={{ width: "20vw", height: "20vw" }}
              className="object-cover"
            />
          )}
        </div>
      </Modal>
    </>
  );
}
