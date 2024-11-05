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

export default function ReqAdvertisement({ currentData, showtable }) {
  const [eyeModalIsOpen, setEyeModalIsOpen] = useState(false);
  const [viewstatus, setViewStatus] = useState(false);
  const [viewmodal, setViewAdModal] = useState(false);
  const [viewid, setViewID] = useState(null);
  const [adsDtata, setAdsData] = useState("");
  const [advertisementId, setAdvertisementId] = useState(null);
  const [updatedata, SetUpdateData] = useState(null);

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
          <div className="flex items-center justify-center">
            <h1 className="pl-[1vw]">{index + 1}</h1>
          </div>
        );
      },
    },
    {
      title: <h1 className="text-[1.1vw] font-semibold flex items-center justify-center">Client Details</h1>,
      width: "10vw",
      render: (row) => {
        return (
          <div>
            <p className="text-[1vw] flex items-center pl-[1vw]">{row?.client_details}</p>
          </div>
        );
      },
    },
    {
      title: <h1 className="text-[1.1vw] font-semibold flex items-center justify-center">Ads Title</h1>,
      sorter: (a, b) => a.ad_title.localeCompare(b.ad_title),
      render: (row, rowdta, index) => {
        return (
          <div className="flex items-center pl-[1vw] text-[1vw]">
            {/* <h1 className="text-[1.1vw]">{row.promo_name}</h1> */}
            {row?.ad_title?.length > 15 ? (
              <Tooltip
                placement="bottom"
                title={row?.ad_title}
                className="cursor-pointer"
                color="#1F487C"
              >
                {`${row?.ad_title?.slice(0, 15)}...`}
              </Tooltip>
            ) : (
              row?.ad_title?.slice(0, 15)
            )}
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
            <p className="text-[1vw] flex items-center pl-[1vw]"> {`${dayjs(row?.start_date).format(
              "DD MMM YY")} - ${dayjs(row?.end_date).format("DD MMM YY")}`}</p>
          </div>
        );
      },
    },
    {
      title: <h1 className="text-[1.1vw] font-semibold flex items-center justify-center">Time Duration</h1>,
      sorter: (a, b) =>
        dayjs(a.duration).valueOf() - dayjs(b.duration).valueOf(),
      width: "12vw",
      render: (row) => {
        return (
          <div>
            <p className="text-[1vw] flex items-center pl-[1vw]">{`${capitalizeFirstLetter(row?.hours)} Hrs - ${row?.duration}`}</p>
          </div>
        );
      },
    },
    {
      title: <h1 className="text-[1.1vw] font-semibold flex items-center justify-center">Description</h1>,
      sorter: (a, b) => a.promo_description.localeCompare(b.promo_description),
      render: (row, rowdta, index) => {
        return (
          // <div className="flex items-center">
          //   <h1 className="text-[1.1vw]">{row.promo_description}</h1>
          // </div>
          <div className="flex items-center pl-[1vw]">
            <h1 className="text-[1vw]">
              {/* {row.promo_description} */}
              {row?.ad_description?.length > 25 ? (
                <Tooltip
                  placement="bottom"
                  title={row?.ad_description}
                  className="cursor-pointer"
                  color="#1F487C"
                >
                  {`${row?.ad_description?.slice(0, 25)}...`}
                </Tooltip>
              ) : (
                row?.ad_description?.slice(0, 25)
              )}
            </h1>
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
            <p className="text-[1vw] flex items-center justify-center">{row.usage_per_day}</p>
          </div>
        );
      },
    },
    {
      title: <h1 className="text-[1.1vw] font-semibold flex items-center justify-center">Status</h1>,
      width: "8 vw",
      render: (row) => {
        return (
          <div className="flex items-center justify-center">
            {row?.status_id != null ? (
              <button
                className={`${row.req_status_id == 1
                  ? "bg-[#FF9900]"
                  : row.req_status_id == 3
                    ? "bg-[#34AE2A]"
                    : row.req_status_id == 5
                      ? "bg-[#FD3434]"
                      : row.req_status_id == 2
                        ? "bg-[#2A99FF]"
                        : "bg-[#646262]"
                  } rounded-[0.5vw] text-[1.1vw]  font-bold text-white w-[8vw] py-[0.2vw]`}
                onClick={() => {
                  UpdateStatus(row.tbs_ad_id);
                  console.log(row.tbs_ad_id, "row1");
                }}
              >
                {capitalizeFirstLetter(row.req_status)}
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
                setViewAdModal(true);
                // setAdvertisementId(row.tbs_ad_id);
                SetUpdateData(row.tbs_ad_id);
                console.log(row.tbs_ad_id, "advertisementId1111");
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
          api={`http://192.168.90.47:4000/api/ads/${advertisementId}`}
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
        <ViewAd updatedata={updatedata} />
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
