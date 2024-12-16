import { render } from "@testing-library/react";
import { Table, Pagination, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import "../../App.css";
import dayjs from "dayjs";
import ModalPopup from "../Common/Modal/Modal";
import DeleteList from "../Offers/DeleteList";
import { capitalizeFirstLetter } from "../Common/Captilization";
import ViewPromotion from "./ViewPromotion";
import ReqPromoStatusUpdate from "./ReqPromoStatusUpdate";
import { FaEye } from "react-icons/fa";
import ReqAdsStatusUpdate from "./Advertisement/ReqAdsStatusUpdate";
import { GetAdsById } from "../../Api/Ads/Ads";
import ReactPlayer from "react-player";
import ViewAd from "./Advertisement/ViewAd";

export default function ReqAdvertisement({ currentData, showtable, adfilter }) {
  const [eyeModalIsOpen, setEyeModalIsOpen] = useState(false);
  const [viewstatus, setViewStatus] = useState(false);
  const [viewmodal, setViewAdModal] = useState(false);
  const [viewid, setViewID] = useState(null);
  const [adsDtata, setAdsData] = useState("");
  const [advertisementId, setAdvertisementId] = useState(null);
  const [updatedata, SetUpdateData] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  console.log(updatedata, "upppppddddddddaaaaaaaaattt");
  const UpdateStatus = (tbs_ad_id) => {
    setViewStatus(true);
    setAdvertisementId(tbs_ad_id);

    console.log(tbs_ad_id, "advertisementId");
  };

  const closeModal = () => {
    setEyeModalIsOpen(false);
    setViewAdModal(false);
    setViewStatus(false);
    setAdvertisementId(null);
  };

  const fetchGetAds = async () => {
    try {
      const data = await GetAdsById(advertisementId);
      console.log(data, "promodatadatadata");
      setAdsData(data);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  useEffect(() => {
    if (advertisementId) {
      fetchGetAds();
    }
  }, []);

  const columns = [
    {
      title: <h1 className="text-[1.1vw] font-semibold flex items-center justify-center">S.No</h1>,
      width: "4vw",
      render: (row, rowdta, index) => {
        return (
          <div className="flex items-center pl-[1vw] text-[#1F4B7F]">
            <h1 className="pl-[1vw]">{index + 1}</h1>
          </div>
        );
      },
    },
    {
      title: <h1 className="text-[1.1vw] font-semibold flex items-center justify-center">Client Details</h1>,
      width: "9vw",
      render: (row) => {
        return (
          <div>
            <p className="text-[1vw] flex items-center text-[#1F4B7F] justify-center ">{row?.client_details}</p>
          </div>
        );
      },
    },
    {
      title: <h1 className="text-[1.1vw] font-semibold flex items-center justify-center">Ads Title</h1>,
      sorter: (a, b) => showtable == 4 ? a.ad_title.localeCompare(b.ad_title) : a.mobad_title.localeCompare(b.mobad_title),
      render: (row, rowdta, index) => {
        return (
          <div className="flex items-center justify-center text-[#1F4B7F]  text-[1vw]">
            {/* <h1 className="text-[1.1vw]">{row.promo_name}</h1> */}
            {
              showtable == 4 ? (
                <span>
                {row?.ad_title?.length > 15 ? (
                  <Tooltip
                  color="white"
                  overlayInnerStyle={{ color: "#1F4B7F" }}
                    placement="top"
                    title={row?.ad_title}
                    className="cursor-pointer"
                    // color="#1F487C"
                  >
                    {`${row?.ad_title?.slice(0, 15)}...`}
                  </Tooltip>
                ) : (
                  row?.ad_title?.slice(0, 15)
                )}
                </span>
              ) : (
                <span>
                {row?.mobad_title?.length > 15 ? (
                  <Tooltip
                  color="white"
                  overlayInnerStyle={{ color: "#1F4B7F" }}
                    placement="top"
                    title={row?.mobad_title}
                    className="cursor-pointer"
                    // color="#1F487C"
                  >
                    {`${row?.mobad_title?.slice(0, 15)}...`}
                  </Tooltip>
                ) : (
                  row?.mobad_title?.slice(0, 15)
                )}
                </span>
              )
            }
          
          </div>
        );
      },
      width: "10vw",
    },
    {
      title: <h1 className="text-[1.1vw] font-semibold flex items-center justify-center">Date</h1>,
      sorter: (a, b) =>
        dayjs(a.duration).valueOf() - dayjs(b.duration).valueOf(),
      width: "12vw",
      render: (row) => {
        return (
          <div>
            <p className="text-[1vw] flex text-[#1F4B7F] justify-center items-center "> {`${dayjs(row?.start_date).format(
              "DD MMM YY")} - ${dayjs(row?.end_date).format("DD MMM YY")}`}</p>
          </div>
        );
      },
    },
    {
      title: <h1 className="text-[1.1vw] font-semibold flex items-center justify-center">Time Duration</h1>,
      sorter: (a, b) =>
        dayjs(a.duration).valueOf() - dayjs(b.duration).valueOf(),
      width: "14vw",
      render: (row) => {
        return (
          <div>
            <p className="text-[1vw] flex items-center text-[#1F4B7F] justify-center ">{`${capitalizeFirstLetter(row?.hours)} - ${row?.duration}`}</p>
          </div>
        );
      },
    },
    {
      title: <h1 className="text-[1.1vw] font-semibold flex items-center justify-center">Description</h1>,
      sorter: (a, b) => showtable == 4 ? a.promo_description.localeCompare(b.promo_description) : a.mobad_description.localeCompare(b.mobad_description) ,
      render: (row, rowdta, index) => {
        return (

          // mobad_description
          // <div className="flex items-center">
          //   <h1 className="text-[1.1vw]">{row.promo_description}</h1>
          // </div>
          <div className="flex items-center text-[#1F4B7F] justify-center">
            { showtable ==4 ? (
            <h1 className="text-[1vw]">
              {/* {row.promo_description} */}
              {row?.ad_description?.length > 25 ? (
                <Tooltip
                color="white"
                overlayInnerStyle={{ color: "#1F4B7F" }}
                  placement="top"
                  title={row?.ad_description}
                  className="cursor-pointer"
                  // color="#1F487C"
                >
                  {`${row?.ad_description?.slice(0, 25)}...`}
                </Tooltip>
              ) : (
                row?.ad_description?.slice(0, 25)
              )}
            </h1> ) : 
            (      <h1 className="text-[1vw]">
              {/* {row.promo_description} */}
              {row?.mobad_description?.length > 25 ? (
                <Tooltip
                color="white"
                overlayInnerStyle={{ color: "#1F4B7F" }}
                  placement="top"
                  title={row?.mobad_description}
                  className="cursor-pointer"
                  // color="#1F487C"
                >
                  {`${row?.mobad_description?.slice(0, 25)}...`}
                </Tooltip>
              ) : (
                row?.mobad_description?.slice(0, 25)
              )}
            </h1>)
      }
          </div>
        );
      },
      width: "15vw",
    },

    {
      title: <h1 className="text-[1.1vw] font-semibold flex items-center justify-center">Limit / Day</h1>,
      sorter: (a, b) => a.usage_per_day - b.usage_per_day,
      width: "8vw",
      render: (row) => {
        return (
          <div>
            <p className="text-[1vw] flex items-center text-[#1F4B7F] justify-center">{row.usage_per_day}</p>
          </div>
        );
      },
    },
    {
      title: <h1 className="text-[1.1vw] font-semibold flex items-center justify-center">Status</h1>,
      width: "8 vw",
      render: (row) => {
        return (
          <div className="flex items-center  justify-center">
            {row?.ads_status_id != null ? (
              <button
                className={`${row.ads_req_status_id == 1
                  ? "bg-[#FF9900]"
                  : row.ads_req_status_id == 3
                    ? "bg-[#34AE2A]"
                    : row.ads_req_status_id == 4
                      ? "bg-[#FD3434]"
                      : row.ads_req_status_id == 2
                        ? "bg-[#2A99FF]"
                        : "bg-[#646262]"
                  } rounded-[0.5vw] text-[1.1vw]  font-bold text-white w-[8vw] py-[0.2vw]`}
                onClick={() => {
                  if(showtable == 4 ){
                    UpdateStatus(row.tbs_ad_id);
                    console.log(row.tbs_ad_id, "row1");
                  }
                  else{
                    UpdateStatus(row.tbs_mobad_id)
                  }
                }}
              >
                {capitalizeFirstLetter(row.ads_req_status)}
              </button>
            ) : (
              ""
            )}
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex items-center justify-center font-bold text-[1.1vw]">Action</div>
      ),
      width: "5vw",
      render: (row) => {
        // setAdsId(row.tbs_ad_id);
        console.log(row, "rowrowrowrow");
        return (
          <div className="flex items-center justify-center">
            <button
              type="button"
              // className="text-white bg-[#727070] flex items-center justify-center rounded-[0.5vw]  text-[1vw] w-[5vw] py-[0.2vw]"  
              onClick={() => {
                // setAdvertisementId(row.tbs_ad_id);
                if(showtable == 4 ){
                  setViewAdModal(true);
                  SetUpdateData(row.tbs_ad_id);
                  console.log(row.tbs_ad_id, "advertisementId1111");
                }
                else{
                  setViewAdModal(true)
                  SetUpdateData(row.tbs_mobad_id)
                }
              }}
            // onClick={() => {
            //   setViewOfferModal(true);
            //   setViewID(row.tbs_operator_id);
            // }}
            >
              <FaEye size={"1.5vw"} color="#1F487C" />

            </button>
          </div>
        );
      },
    },

    // {
    //   title: <h1 className="text-[1.2vw] font-semibold">Actions</h1>,
    //   width: "10vw",
    //   render: (row) => {
    //     console.log(row, "rowrowrowrow");
    //     return (
    //       <div className="flex gap-[0.7vw]  items-center">
    //         {/* <div><IoMdEye size={"1.6vw"} color="#1F4B7F" onClick={() => { setEyeModalIsOpen(true) }} /></div> */}
    //         {/* <MdEdit
    //           size={"1.3vw"}
    //           color="#1F4B7F"
    //           className=" cursor-pointer"
    //           onClick={() => {
    //             setModalIsOpen(true);
    //             SetUpdateData(row.promo_id);
    //           }}
    //         /> */}
    //         <MdDelete
    //           size={"1.3vw"}
    //           color="#1F4B7F"
    //           className=" cursor-pointer"
    //           onClick={() => {
    //             setDeleteModalIsOpen(true);
    //             setAdvertisementId(row.tbs_ad_id);
    //           }}
    //         />
    //       </div>
    //     );
    //   },
    // },
  ];

  const [deletemodalIsOpen, setDeleteModalIsOpen] = useState(false);

  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
  };
  //   const
  console.log(currentData, "currentData4848");

  return (
    // <div style={{ height: "100%" }} className="table-container">
    <>
      <Table
        // dataSource={data}
        dataSource={currentData}
        columns={columns}
        pagination={false}
        className="custom-table"
      />
      <ModalPopup
        show={deletemodalIsOpen}
        onClose={closeDeleteModal}
        height="20vw"
        width="30vw"
        closeicon={false}
      >
        <DeleteList
          setDeleteModalIsOpen={setDeleteModalIsOpen}
          title={"Want to delete this Promotion"}
          api={`${apiUrl}/ads/${advertisementId}`}
          module={"requestmanagement"}
        />
      </ModalPopup>

      <ModalPopup
        className="border border-[#1f487c] border-b-8 border-r-8 border-b-[#1f487c] border-r-[#1f487c] rounded-md"
        show={viewmodal}
        closeicon={false}
        onClose={closeModal}
      // height="180px"
      // width="950px"
      >
        <ViewAd updatedata={updatedata} showtable={showtable} />
      </ModalPopup>

      <ModalPopup
        className="border border-[#1f487c] border-b-8 border-r-8 border-b-[#1f487c] border-r-[#1f487c] rounded-md"
        show={viewstatus}
        closeicon={false}
        onClose={closeModal}
        height="16vw"
        width="40vw"
      >
        <ReqAdsStatusUpdate
          adId={advertisementId}
          setViewStatus={setViewStatus}
          showtable={showtable}
          adfilter={adfilter}
        />
      </ModalPopup>
    </>
    // </div>
    // ;{/* <Pagination itemsPerPage={itemsPerPage} items={dataSource} /> */}
  );
}

// :where(.custom-table).ant-table-wrapper .ant-table-thead th.ant-table-column-sort {
//   background: #1f4b7f;
// }
