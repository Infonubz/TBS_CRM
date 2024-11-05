import Item from 'antd/es/list/Item'
import React, { useState } from 'react'
import { capitalizeFirstLetter } from '../Common/Captilization'
import dayjs from 'dayjs'
import { Table, Pagination, Tooltip } from "antd";
import { Popover } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from "react-player";
import ModalPopup from '../Common/Modal/Modal';
import Ad_Advertisement from './Add_Advertisement';
import DeleteList from '../Offers/DeleteList';

const AdsGridView = ({ activePage, tabType, mobileAds, currentItems, itemsPerPage, updatedata, SetUpdateData, deleteData, SetDeleteData, mbleItemsPerPage, mble_activePage, openPopovers, setOpenPopovers, isModalOpen, setIsModalOpen, adsdata, setAdsData }) => {

  const apiUrl = process.env.REACT_APP_API_URL;

  const togglePopover = (adId) => {
    setOpenPopovers((prevState) => ({
      ...prevState,
      [adId]: !prevState[adId],
    }));
  };

  const handleDelete = (adId) => {
    setDeleteModalIsOpen(true);
    SetDeleteData(adId);
    // Close popover
    togglePopover(adId);
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

  const closeModal = () => {
    setIsModalOpen(false);
    SetUpdateData(null);
    setAdsData("");
  };

  const [deletemodalIsOpen, setDeleteModalIsOpen] = useState(false);
  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
  };
  console.log(currentItems, 'grid_view_ads')


  const handleSno = (index) => {
    const serialNumber = (activePage - 1) * itemsPerPage + (index + 1)
    return (
      <div className="flex justify-center">
        <h1 className="pl-[1vw] text-[1vw] justify-center">{serialNumber}</h1>
      </div>
    )
  }
  const handleMbleSno = (index) => {
    const serialNumber = (mble_activePage - 1) * mbleItemsPerPage + (index + 1)
    return (
      <div className="flex justify-center">
        <h1 className="pl-[1vw] text-[1vw] justify-center">{serialNumber}</h1>
      </div>
    )
  }

  return (
    <>
      <div className='grid grid-items-3 gap-[1.5vw] py-[1vw]'>

        {tabType == 'Web' ?
          (
            Array.isArray(currentItems) && currentItems.map((item, index) => (
              <div key={item?.id}>
                <div className='w-full border-[#1F487C] border-[0.1vw] border-r-[0.3vw] border-b-[0.3vw] rounded-[1.3vw] bg-white'>
                  <div className='grid grid-cols-12 items-center'>
                    <div className='col-span-1 text-[1.2vw] font-bold text-[#1F487C] text-center'>
                      <p>{handleSno(index)}</p>
                    </div>
                    <div className='col-span-2 text-[1vw] text-[#1F487C] grid grid-items-4 gap-[0.75vw] pt-[0.75vw]'>
                      <p className='font-bold text-[1.2vw]'>{item?.client_details}</p>
                      <p>{item?.phone}</p>
                      <p className="text-[1vw] text-[#1F4B7F] font-medium">
                        {item?.web_url?.length > 20 ? (
                          <Tooltip
                            placement="top"
                            title={item?.web_url}
                            className="cursor-pointer"
                            color="#1F487C"
                          >
                            <div className="text-[1vw] text-[#1F4B7F]">
                              <a href={item?.web_url} target="_blank">
                                {item?.web_url?.slice(0, 22)}
                              </a>
                            </div>
                          </Tooltip>
                        ) : (
                          <div className="text-[1vw] text-[#1F4B7F]">
                            <a href={item?.web_url} target="_blank">
                              {item?.web_url?.slice(0, 22)}
                            </a>
                          </div>
                        )}
                      </p>
                      <p>{item.emailid}</p>
                    </div>

                    <div className='col-span-2 text-[1vw] text-[#1F487C] '>
                      <div className='flex justify-between'>
                        <div className='grid grid-items-4 gap-[0.75vw] pt-[0.75vw] order-first'>
                          <p className="text-[1.2vw] text-[#1F4B7F] font-bold">
                            {item?.ad_title?.length > 20 ? (
                              <Tooltip
                                placement="bottom"
                                title={item?.ad_title}
                                className="cursor-pointer"
                                color="#1F487C"
                              >
                                <div className="text-[1.2vw] text-[#1F4B7C] font-bold">
                                  {`${item?.ad_title?.slice(0, 20)}...`}
                                </div>
                              </Tooltip>
                            ) : (
                              <div className="text-[1.2vw] text-[#1F4B7F] font-bold">
                                {item?.ad_title?.slice(0, 20)}
                              </div>)}
                          </p>
                          <p className="text-[1vw] text-[#1F4B7F] font-medium">
                            {item?.ad_description?.length > 20 ? (
                              <Tooltip
                                placement="bottom"
                                title={item?.ad_description}
                                className="cursor-pointer"
                                color="#1F487C"
                              >
                                <div className="text-[1vw] text-[#1F4B7C] font-medium">
                                  {`${item?.ad_description?.slice(0, 20)}...`}
                                </div>
                              </Tooltip>
                            ) : (
                              <div className="text-[1vw] text-[#1F4B7F] font-medium">
                                {item?.ad_description?.slice(0, 20)}
                              </div>)}
                          </p>
                          <p>
                            {`${dayjs(item?.start_date).format("DD MMM, YY")}`} -{" "}
                            {`${dayjs(item?.end_date).format("DD MMM, YY")}`}
                          </p>
                          <div className=''>
                            <button
                              className={`${item?.status_id == 3
                                ? "bg-[#34AE2A]"
                                : item?.status_id == 1
                                  ? "bg-[#FD3434]"
                                  : item?.status_id == 2
                                    ? "bg-[#FF9900]"
                                    : "bg-[#FF9900]"
                                } rounded-t-xl text-[1vw] font-semibold text-white w-[10.5vw] py-[0.15vw] `}
                            >
                              {capitalizeFirstLetter(item?.status)}
                            </button>
                          </div>
                        </div>
                        <div className="order-last py-[0.5vw]">
                          <Popover
                            placement="bottomRight"
                            content={
                              <div className="flex flex-col">
                                <div>
                                  <a
                                    onClick={() => handleEdit(item?.tbs_ad_id)}
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
                                    onClick={() => handleDelete(item?.tbs_ad_id)}
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
                            open={openPopovers[item?.tbs_ad_id] || false}
                            onOpenChange={() => togglePopover(item?.tbs_ad_id)}
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
                      </div>
                    </div>
                    <div className='col-span-7 border-l-[0.1vw] border-[#1F487C]'>
                      <p>
                        <div className="w-full h-[9.5vw] overflow-hidden ">
                          {item?.ad_file_type && item?.ad_file_type.startsWith("image/") ? (
                            <img
                              src={`http://192.168.90.47:4000${item?.ad_video}`}
                              alt="Ad"
                              className="w-full h-full object-cover"
                              style={{
                                borderRadius: "0 1.1vw 1.1vw 0",
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
                                url={`http://192.168.90.47:4000${item?.ad_video}`}
                                className="react-player"
                              />
                            </div>
                          )}
                        </div>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )
          :
          (
            Array.isArray(mobileAds) && mobileAds.map((item, index) => (
              <div key={item?.id}>
                <div className='w-full border-[#1F487C] border-[0.1vw] border-r-[0.3vw] border-b-[0.3vw] rounded-[1.3vw] bg-white'>
                  <div className='grid grid-cols-12 items-center'>
                    <div className='col-span-1 text-[1.2vw] font-bold text-[#1F487C] text-center'>
                      <p>{handleMbleSno(index)}</p>
                    </div>
                    <div className='col-span-2 text-[1vw] text-[#1F487C] grid grid-items-4 gap-[0.75vw] pt-[0.75vw]'>
                      <p className='font-bold text-[1.2vw]'>{item?.client_details}</p>
                      <p>{item?.phone}</p>
                      <p className="text-[1vw] text-[#1F4B7F] font-medium">
                        {item?.web_url?.length > 20 ? (
                          <Tooltip
                            placement="top"
                            title={item?.web_url}
                            className="cursor-pointer"
                            color="#1F487C"
                          >
                            <div className="text-[1vw] text-[#1F4B7F]">
                              <a href={item?.web_url} target="_blank">
                                {item?.web_url?.slice(0, 22)}
                              </a>
                            </div>
                          </Tooltip>
                        ) : (
                          <div className="text-[1vw] text-[#1F4B7F]">
                            <a href={item?.web_url} target="_blank">
                              {item?.web_url?.slice(0, 22)}
                            </a>
                          </div>
                        )}
                      </p>
                      <p>{item.emailid}</p>
                    </div>

                    <div className='col-span-2 text-[1vw] text-[#1F487C] '>
                      <div className='flex justify-between'>
                        <div className='grid grid-items-4 gap-[0.75vw] pt-[0.75vw] order-first'>
                          <p className="text-[1.2vw] text-[#1F4B7F] font-bold">
                            {item?.mobad_title?.length > 20 ? (
                              <Tooltip
                                placement="bottom"
                                title={item?.mobad_title}
                                className="cursor-pointer"
                                color="#1F487C"
                              >
                                <div className="text-[1.2vw] text-[#1F4B7C] font-bold">
                                  {`${item?.mobad_title?.slice(0, 20)}...`}
                                </div>
                              </Tooltip>
                            ) : (
                              <div className="text-[1.2vw] text-[#1F4B7F] font-bold">
                                {item?.mobad_title?.slice(0, 20)}
                              </div>)}
                          </p>
                          <p className="text-[1vw] text-[#1F4B7F] font-medium">
                            {item?.mobad_description?.length > 20 ? (
                              <Tooltip
                                placement="bottom"
                                title={item?.mobad_description}
                                className="cursor-pointer"
                                color="#1F487C"
                              >
                                <div className="text-[1vw] text-[#1F4B7F] font-medium">
                                  {`${item?.mobad_description?.slice(0, 20)}...`}
                                </div>
                              </Tooltip>
                            ) : (
                              <div className="text-[1vw] text-[#1F4B7F] font-medium">
                                {item?.mobad_description?.slice(0, 20)}
                              </div>)}
                          </p>
                          <p>
                            {`${dayjs(item?.start_date).format("DD MMM, YY")}`} -{" "}
                            {`${dayjs(item?.end_date).format("DD MMM, YY")}`}
                          </p>
                          <div className=''>
                            <button
                              className={`${item.status_id == 3
                                ? "bg-[#34AE2A]"
                                : item?.status_id == 1
                                  ? "bg-[#FD3434]"
                                  : item?.status_id == 2
                                    ? "bg-[#FF9900]"
                                    : "bg-[#FF9900]"
                                } rounded-t-xl text-[1vw] font-semibold text-white w-[10.5vw] py-[0.15vw] `}
                            >
                              {capitalizeFirstLetter(item?.status)}
                            </button>
                          </div>
                        </div>
                        <div className="order-last py-[0.5vw]">
                          <Popover
                            placement="bottomRight"
                            content={
                              <div className="flex flex-col">
                                <div>
                                  <a
                                    onClick={() => handleMbleEdit(item?.tbs_mobad_id)}
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
                                    onClick={() => handleDelete(item?.tbs_mobad_id)}
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
                            open={openPopovers[item?.tbs_mobad_id] || false}
                            onOpenChange={() => togglePopover(item?.tbs_mobad_id)}
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
                      </div>
                    </div>
                    <div className='col-span-7 border-l-[0.1vw] border-[#1F487C]'>
                      <p>
                        <div className="w-full h-[9.5vw] overflow-hidden ">
                          {item?.mobad_file_type && item?.mobad_file_type.startsWith("image/") ? (
                            <img
                              src={`http://192.168.90.47:4000${item?.mobad_vdo}`}
                              alt="Ad"
                              className="w-full h-full object-cover"
                              style={{
                                borderRadius: "0 1.1vw 1.1vw 0",
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
                                url={`http://192.168.90.47:4000${item?.mobad_vdo}`}
                                className="react-player"
                              />
                            </div>
                          )}
                        </div>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )
        }
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
          title={"Want to delete this Ad"}
          api={
            tabType === "Web"
              ? `${apiUrl}/ads/${deleteData}`
              : `${apiUrl}/mobads/${deleteData}`
          }
          module={"ads"}
        />
      </ModalPopup>
    </>
  )
}

export default AdsGridView