import React, { useEffect, useState } from "react";
import { Table, Pagination, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import { capitalizeFirstLetter } from "../Common/Captilization";
import { Popover } from "antd";
import ModalPopup from "../Common/Modal/Modal";
import Ad_Advertisement from "./Add_Advertisement";
import DeleteList from "../Offers/DeleteList";
import ReactPlayer from "react-player";
import { FaPhoneAlt } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { MdDateRange, MdMail } from "react-icons/md";

const AdsListView = ({
  activePage,
  tabType,
  mobileAds,
  currentItems,
  itemsPerPage,
  updatedata,
  SetUpdateData,
  deleteData,
  SetDeleteData,
  mbleItemsPerPage,
  mble_activePage,
  openPopovers,
  setOpenPopovers,
  isModalOpen,
  setIsModalOpen,
  adsdata,
  setAdsData,
}) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;

  const togglePopover = (adId) => {
    setOpenPopovers((prevState) => ({
      ...prevState,
      [adId]: !prevState[adId],
    }));
  };

  const handleEdit = (tbs_ad_id) => {
    setIsModalOpen(true);
    SetUpdateData(tbs_ad_id);
    console.log(tbs_ad_id, "aaaadddddiiiiidddddd");
    // Close popover
    togglePopover(tbs_ad_id);
  };

  const handleMbleEdit = (tbs_mobad_id) => {
    setIsModalOpen(true);
    SetUpdateData(tbs_mobad_id);
    togglePopover(tbs_mobad_id);
  };

  const closeMbleModal = () => {
    setIsModalOpen(false);
    SetUpdateData(null);
    setAdsData("");
  };

  const handleDelete = (adId) => {
    setDeleteModalIsOpen(true);
    SetDeleteData(adId);
    // Close popover
    togglePopover(adId);
  };

  const handleMbleDelete = (tbs_mobad_id) => {
    setDeleteModalIsOpen(true);
    SetDeleteData(tbs_mobad_id);
    togglePopover(tbs_mobad_id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    SetUpdateData(null);
    setAdsData("");
  };

  const [deletemodalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [fiedName, setFieldName] = useState("")
  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
  };

  useEffect(() => {
    setAdsData(AdsList);
  }, []);

  const webColumns = [
    {
      title: (
        <span className="flex justify-center">
          <h1 className="text-[1.2vw] font-semibold">S.No</h1>
        </span>
      ),
      width: "5vw",
      render: (row, rowdta, index) => {
        const serialNumber = (activePage - 1) * itemsPerPage + (index + 1);
        return (
          <div className="flex justify-center">
            <h1 className="pl-[1vw] text-[1.1vw] text-[#1f487c] font-semibold justify-center">
              {serialNumber}
            </h1>
          </div>
        );
      },
    },
    {
      title: (
        <span className="flex justify-center">
          <h1 className="text-[1.2vw] font-semibold">Client Details</h1>
        </span>
      ),
      width: "16vw",
      sorter: (a, b) => a.client_details?.localeCompare(b.client_details),
      render: (row, rowdta, index) => (
        <div className="pl-[1vw] pb-[0.75vw]">
          <div>
            <div className="flex">
              <h1 className="text-[1.25vw] text-[#1F4B7F] font-bold uppercase">
                {row.client_details}
              </h1>
            </div>
            <div className="flex items-center  gap-x-[0.5vw]">
              <span>
                <FaPhoneAlt size={"0.8vw"} color="#1F4B7F" />
              </span>
              <p className="text-[1vw]  text-[#1F4B7F] ">{row.phone}</p>
            </div>
            <div>
              <p className="text-[1vw]  text-[#1F4B7F] ">
                {row?.web_url?.length > 22 ? (
                  <Tooltip
                    placement="top"
                    title={row?.web_url}
                    className="cursor-pointer"
                    color="#1F487C"
                  >
                    <div className="flex items-center">
                      <a
                        href={row?.web_url}
                        target="_blank"
                        className="text-[1vw] text-[#1F4B7F]"
                      >
                        {row?.web_url?.slice(0, 22)}
                      </a>
                    </div>
                  </Tooltip>
                ) : (
                  <div className="flex items-center gap-x-[0.5vw] ">
                    <span className="flex items-center">
                      <FaEarthAmericas size={"0.8vw"} color="#1F4B7F" />
                    </span>
                    <a
                      href={row?.web_url}
                      target="_blank"
                      className="text-[1vw] text-[#1F4B7F] underline underline-offset-1"
                    >
                      {row?.web_url?.slice(0, 22)}
                    </a>
                  </div>
                )}
              </p>
            </div>
            <div>
              <p className="text-[1vw]  text-[#1F4B7F] ">
                {row?.emailid?.length > 20 ? (
                  <Tooltip
                    placement="top"
                    title={row?.emailid}
                    className="cursor-pointer"
                    color="#1F487C"
                  >
                    {/* <div className="text-[1vw] text-[#1F4B7F] ">
                      {`${row?.emailid?.slice(0, 25)}...`}
                    </div> */}
                     <div className="flex items-center gap-x-[0.5vw]">
                    <span className="flex items-center ">
                      <MdMail size={"1vw"} color="#1F4B7F" />
                    </span>
                    <p className="text-[1vw] text-[#1F4B7F]">
                      {`${row?.emailid?.slice(0, 20)}...`}
                    </p>
                  </div>
                  </Tooltip>
                ) : (
                  <div className="flex items-center gap-x-[0.5vw]">
                    <span className="flex items-center ">
                      <MdMail size={"1vw"} color="#1F4B7F" />
                    </span>
                    <p className="text-[1vw] text-[#1F4B7F]">
                      {row?.emailid?.slice(0, 25)}
                    </p>
                  </div>
                )}
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: (
        <span className="flex justify-center ">
          <h1 className="text-[1.2vw] font-semibold">Ad Details</h1>
        </span>
      ),
      width: "14vw",
      sorter: (a, b) =>
        tabType == "Web"
          ? a.ad_title?.localeCompare(b.ad_title)
          : a.mobad_title?.localeCompare(b.mobad_title),
      render: (row, rowdta, index) => (
        <div className="w-full flex gap-x-[0.25vw] justify-between   ">
          <div className="order-first">
            <div className="pt-[1vw] h-[7vw]">
              <div className="flex w-full justify-between items-center font-bold pt-[.5vw]">
                {row?.ad_title?.length > 15 ? (
                  <Tooltip
                    placement="top"
                    title={row?.ad_title}
                    className="cursor-pointer"
                    color="#1F487C"
                  >
                    <div className="text-[1.1vw] text-[#1F4B7F]  uppercase">
                      {`${row?.ad_title?.slice(0, 15)}...`}
                    </div>
                  </Tooltip>
                ) : (
                  <div className="text-[1.1vw] text-[#1F4B7F] uppercase">
                    {row?.ad_title?.slice(0, 15)}
                  </div>
                )}
              </div>
              <div>
                <p className="text-[0.9vw] pt-[0.25vw] text-[#1F4B7F] ">
                  {row?.ad_description?.length > 20 ? (
                    <Tooltip
                      placement="bottom"
                      title={row?.ad_description}
                      className="cursor-pointer"
                      color="#1F487C"
                    >
                      <div className="text-[1vw] text-[#1F4B7F] ">
                        {`${row?.ad_description?.slice(0, 20)}...`}
                      </div>
                    </Tooltip>
                  ) : (
                    <div className="text-[0.9vw] text-[#1F4B7F] ">
                      {row?.ad_description?.slice(0, 20)}
                    </div>
                  )}
                </p>
              </div>
              <div className="flex items-center pt-[0.5vw] gap-x-[0.5vw]">
                <span>
                  <MdDateRange size={"1vw"} color="#1F4B7F" />
                </span>
                <p className="text-[0.9vw]  font-semibold text-[#1F4B7F] ">
                  {`${dayjs(row?.start_date).format("DD MMM, YY")}`} -{" "}
                  {`${dayjs(row?.end_date).format("DD MMM, YY")}`}
                </p>
              </div>
            </div>
            {/* <div className="  absolute bottom-[-0.2vw]"> */}
            <div className="pt-[1vw]">
              <button
                className={`${row.ads_status_id == 2
                    ? "bg-[#34AE2A]"
                    : row.ads_status_id == 4
                      ? "bg-[#FD3434]"
                      : row.ads_status_id == 1
                        ? "bg-[#FF9900]"
                        : row.ads_status_id == 3 ? "bg-[#2A99FF]" : "bg-[#646262]"
                  } rounded-t-xl text-[1.1vw] font-semibold w-[11vw] text-white px-[1vw] `}
              >
                {capitalizeFirstLetter(row.ads_status)}
              </button>
            </div>
          </div>
          <div className="py-[1vw] order-last">
            <Popover
              placement="bottomRight"
              content={
                <div className="flex flex-col">
                  <div>
                    <a
                      onClick={() => {
                        handleEdit(row.tbs_ad_id)
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
                        handleDelete(row.tbs_ad_id)
                        setFieldName(row.ad_title)
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
              open={openPopovers[row.tbs_ad_id] || false}
              onOpenChange={() => togglePopover(row.tbs_ad_id)}
            >
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                color="#1f487c"
                style={{
                  height: "1.25vw",
                  width: "1.25vw",
                }}
              />
            </Popover>
          </div>
        </div>
      ),
    },
    {
      title: (
        <span className="flex justify-center">
          <h1 className="text-[1.2vw] font-semibold">Advertisements</h1>
        </span>
      ),

      width: "70vw",
      render: (row, rowdta, index) => {
        console.log(row.ad_video, "row.ad_videorow.ad_video");
        return (
          <div className="w-full h-[10vw] overflow-hidden px-[1vw] py-[0.5vw]">
            {row.ad_file_type && row.ad_file_type.startsWith("image/") ? (
              <img
                src={`${apiImgUrl}${row.ad_video}`}
                alt="Ad"
                className="w-full h-full object-cover"
                style={{
                  borderRadius: "1.4vw",
                }}
              />
            ) : (
              <div className="react-player-wrapper">
                <ReactPlayer
                  playing
                  loop
                  muted
                  width="100%"
                  height="auto"
                  style={{
                    objectFit: "cover",
                  }}
                  url={`${apiImgUrl}${row.ad_video}`}
                  className="react-player"
                />
              </div>
            )}
          </div>
        );
      },
    },
  ];

  // -----------------------------Mobile Column----------------------------------------

  const mobileColumns = [
    {
      title: (
        <span className="flex justify-center">
          <h1 className="text-[1.2vw]  font-semibold">S.No</h1>
        </span>
      ),
      width: "5vw",
      render: (row, rowdta, index) => {
        const serialNumber =
          (mble_activePage - 1) * mbleItemsPerPage + (index + 1);
        return (
          <div className="flex justify-center">
            <h1 className="pl-[1vw] text-[1.1vw] text-[#1f487c] font-semibold justify-center">
              {serialNumber}
            </h1>
          </div>
        );
      },
    },
    {
      title: (
        <span className="flex justify-center">
          <h1 className="text-[1.2vw] font-semibold">Client Details</h1>
        </span>
      ),
      width: "16vw",
      sorter: (a, b) => a.client_details?.localeCompare(b.client_details),
      render: (row, rowdta, index) => (
        <div className="pl-[1vw] pb-[0.75vw]">
          <div>
            <div>
              <h1 className="text-[1.25vw] text-[#1F4B7F] font-bold uppercase">
                {row.client_details}
              </h1>
            </div>
            <div className="flex items-center  gap-x-[0.5vw]">
              <span>
                <FaPhoneAlt size={"0.8vw"} color="#1F4B7F" />
              </span>
              <p className="text-[1vw]  text-[#1F4B7F] ">{row.phone}</p>
            </div>
            <div>
              <p className="text-[1vw] pt-[0.25vw] text-[#1F4B7F] ">
                {row?.web_url?.length > 22 ? (
                  <Tooltip
                    placement="top"
                    title={row?.web_url}
                    className="cursor-pointer"
                    color="#1F487C"
                  >
                    <div className="text-[1vw] text-[#1F4B7F]">
                      <a href={row?.web_url} target="_blank">
                        {row?.web_url?.slice(0, 22)}
                      </a>
                    </div>
                  </Tooltip>
                ) : (
                  <div className="text-[1vw] text-[#1F4B7F]">
                    <a href={row?.web_url} target="_blank">
                      {row?.web_url?.slice(0, 22)}
                    </a>
                  </div>
                )}
              </p>
            </div>
            <div>
              <p className="text-[1vw] pt-[0.25vw] text-[#1F4B7F] ">
                {row?.emailid?.length > 20 ? (
                  <Tooltip
                    placement="top"
                    title={row?.emailid}
                    className="cursor-pointer"
                    color="#1F487C"
                  >
                    {/* <div className="text-[1vw] text-[#1F4B7F] ">
                      {`${row?.emailid?.slice(0, 20)}...`}
                    </div> */}
                      <div className="flex items-center gap-x-[0.5vw]">
                    <span className="flex items-center ">
                      <MdMail size={"1vw"} color="#1F4B7F" />
                    </span>
                    <p className="text-[1vw] text-[#1F4B7F]">
                      {`${row?.emailid?.slice(0, 20)}...`}
                    </p>
                  </div>
                  </Tooltip>
                ) : (
                  // <div className="text-[1vw] text-[#1F4B7F]">
                  //   {row?.emailid?.slice(0, 20)}
                  // </div>
                    <div className="flex items-center gap-x-[0.5vw]">
                    <span className="flex items-center ">
                      <MdMail size={"1vw"} color="#1F4B7F" />
                    </span>
                    <p className="text-[1vw] text-[#1F4B7F]">
                      {row?.emailid?.slice(0, 20)}
                    </p>
                  </div>
                )}
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: (
        <span className="flex justify-center ">
          <h1 className="text-[1.2vw] font-semibold">Ad Details</h1>
        </span>
      ),
      width: "14vw",
      sorter: (a, b) =>
        tabType == "Web"
          ? a.ad_title?.localeCompare(b.ad_title)
          : a.mobad_title?.localeCompare(b.mobad_title),
      render: (row, rowdta, index) => (
        <div className="w-full flex gap-x-[0.25vw]  justify-between">
          <div className="order-first">
            <div className="pt-[1vw]">
              <div className="flex w-full justify-between font-bold items-center">
                {row?.mobad_title?.length > 15 ? (
                  <Tooltip
                    placement="top"
                    title={row?.mobad_title}
                    className="cursor-pointer"
                    color="#1F487C"
                  >
                    <div className="text-[1.25vw] text-[#1F4B7F] ">
                      {`${row?.mobad_title?.slice(0, 15)}...`}
                    </div>
                  </Tooltip>
                ) : (
                  <div className="text-[1.25vw] text-[#1F4B7F] ">
                    {row?.mobad_title?.slice(0, 15)}
                  </div>
                )}
              </div>
              <div>
                <p className="text-[1vw] pt-[0.25vw] text-[#1F4B7F] ">
                  {row?.mobad_description?.length > 20 ? (
                    <Tooltip
                      placement="bottom"
                      title={row?.mobad_description}
                      className="cursor-pointer"
                      color="#1F487C"
                    >
                      <div className="text-[1vw] text-[#1F4B7F] ">
                        {`${row?.mobad_description?.slice(0, 20)}...`}
                      </div>
                    </Tooltip>
                  ) : (
                    <div className="text-[1vw] text-[#1F4B7F] ">
                      {row?.mobad_description?.slice(0, 20)}
                    </div>
                  )}
                </p>
              </div>
              {/* <div>
                <p className="text-[1vw] pt-[0.25vw] text-[#1F4B7F] ">
                  {`${dayjs(row?.start_date).format("DD MMM, YY")}`} -{" "}
                  {`${dayjs(row?.end_date).format("DD MMM, YY")}`}
                </p>
              </div> */}
               <div className="flex items-center pt-[0.5vw] gap-x-[0.5vw]">
                <span>
                  <MdDateRange size={"1vw"} color="#1F4B7F" />
                </span>
                <p className="text-[0.9vw]  font-semibold text-[#1F4B7F] ">
                  {`${dayjs(row?.start_date).format("DD MMM, YY")}`} -{" "}
                  {`${dayjs(row?.end_date).format("DD MMM, YY")}`}
                </p>
              </div>
              <div className="mt-[1.6vw]">
                <button
                  className={`${row.ads_status_id == 2
                      ? "bg-[#34AE2A]"
                      : row.ads_status_id == 4
                        ? "bg-[#FD3434]"
                        : row.ads_status_id == 1
                          ? "bg-[#FF9900]"
                          : row.ads_status_id == 3 ? "bg-[#2A99FF]" : "bg-[#646262]"
                    } rounded-t-xl text-[1.1vw] font-semibold text-white w-[10.5vw]`}
                >
                  {capitalizeFirstLetter(row.ads_status)}
                </button>
              </div>
            </div>
          </div>
          <div className="py-[1vw] order-last">
            <Popover
              placement="bottomRight"
              content={
                <div className="flex flex-col">
                  <div>
                    <a
                      onClick={() => handleMbleEdit(row.tbs_mobad_id)}
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
                        handleMbleDelete(row.tbs_mobad_id)
                        setFieldName(row.mobad_title)
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
              open={openPopovers[row.tbs_mobad_id] || false}
              onOpenChange={() => togglePopover(row.tbs_mobad_id)}
            >
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                color="#1f487c"
                style={{
                  height: "1.25vw",
                  width: "1.25vw",
                }}
              />
            </Popover>
          </div>
        </div>
      ),
    },
    {
      title: (
        <span className="flex justify-center">
          <h1 className="text-[1.2vw] font-semibold">Advertisement</h1>
        </span>
      ),

      width: "70vw",
      render: (row, rowdta, index) => {
        console.log(row.ad_video, "row.ad_videorow.ad_video");
        return (
          <div className="w-full h-[10vw] overflow-hidden px-[1vw] py-[0.5vw]">
            {row.mobad_file_type && row.mobad_file_type.startsWith("image/") ? (
              <img
                src={`${apiImgUrl}${row.mobad_vdo}`}
                alt="Ad"
                className="w-full h-full object-cover"
                style={{
                  borderRadius: "1.4vw",
                }}
              />
            ) : (
              <div className="react-player-wrapper">
                <ReactPlayer
                  playing
                  loop
                  muted
                  width="100%"
                  height="auto"
                  style={{
                    objectFit: "cover",
                  }}
                  url={`${apiImgUrl}${row.ad_video}`}
                  className="react-player"
                />
              </div>
            )}
          </div>
        );
      },
    },
  ];

  const AdsList = tabType === "Web" ? currentItems : mobileAds;
  const columns = tabType === "Web" ? webColumns : mobileColumns;

  return (
    <>
      <div>
        <Table
          dataSource={AdsList}
          columns={columns}
          pagination={false}
          className="custom-table"
        />
      </div>
      <ModalPopup
        className="border border-[#1f487c] border-b-8 border-r-8 border-b-[#1f487c] border-r-[#1f487c] rounded-md"
        show={isModalOpen}
        onClose={closeModal}
        height="auto"
        width="40vw"
        footer={null}
      >
        <Ad_Advertisement
          setIsModalOpen={setIsModalOpen}
          updatedata={updatedata}
          SetUpdateData={SetUpdateData}
          adsdata={adsdata}
          setAdsData={setAdsData}
          tabType={tabType}
        />
      </ModalPopup>
      <ModalPopup
        className="border border-[#1f487c] border-b-8 border-r-8 border-b-[#1f487c] border-r-[#1f487c] rounded-md"
        show={deletemodalIsOpen}
        onClose={closeDeleteModal}
        height="20vw"
        width="30vw"
        closeicon={false}
        footer={null}
      >
        <DeleteList
          setDeleteModalIsOpen={setDeleteModalIsOpen}
          title={`Want to delete this Ad ${fiedName}`}
          api={
            tabType === "Web"
              ? `${apiUrl}/ads/${deleteData}`
              : `${apiUrl}/mobads/${deleteData}`
          }
          module={"ads"}
        />
      </ModalPopup>
    </>
  );
};

export default AdsListView;
