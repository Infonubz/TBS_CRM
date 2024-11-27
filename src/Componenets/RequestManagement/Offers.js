//import { render } from '@testing-library/react'
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import ModalPopup from "../Common/Modal/Modal";
// import DeleteList from "./DeleteList";
import { Table, Pagination, Tooltip } from "antd";
//import { IoMdEye } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import DeleteList from '../Offers/DeleteList';
import { useDispatch, useSelector } from 'react-redux';
// import { GetAllReqManOffers } from '../../Api/RequestManagement/RequestManagementOffers';
import { GetAllReqManOffers, ReqPromoStatusChange } from '../../Api/RequestManagement/RequestManagement';
//import ReqPromoStatusUpdate from './ReqPromoStatusUpdate';
import ReqOffersStatusUpdate from './ReqOffersStatusUpdate';
import { FaEye } from 'react-icons/fa';

export default function ReqOffers({ currentData }) {

  const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;
  const [promotionid, setPromoId] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [offerview, setOfferView] = useState(false);
  const [offerimage, setOfferImage] = useState("");
  const [deletemodalIsOpen, setDeleteModalIsOpen] = useState(false);
  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
  };
  const closeUpdateModal = () => {
    setStatusupdateModal(false);
  }
  const [updateData, SetUpdateData] = useState()
  const [statusupdateModal, setStatusupdateModal] = useState(false)
  //const [updateStatus, setUpdateStatus] = useState()

  // const currentData = useSelector((state)=>state.crm.req_man_offers);
  const dispatch = useDispatch()
  useEffect(() => {
    GetAllReqManOffers(dispatch)
  }, [])
  const columns = [
    {
      title: <h1 className="text-[1.2vw] font-semibold flex items-center justify-center">S.No</h1>,
      width: "5vw",
      render: (row, rowdta, index) => {
        // console.log(row.tbs_offer_id,'iffiddd');
        return (
          <div className="flex items-center justify-center text-[#1F4B7F]">
            <h1 className="pl-[1vw] text-[1.1vw]">{index + 1}</h1>
          </div>
        );
      }
    },
    {
      title: <h1 className="text-[1.2vw] font-semibold flex items-center justify-center">Name</h1>,
      sorter: (a, b) => a.offer_name.localeCompare(b.offer_name),
      render: (row, rowdta, index) => {
        return (
          <div className="flex items-center justify-center text-[#1F4B7F]">
            {/* <h1 className="text-[1.1vw]">{row.offer_name}</h1> */}
            {row?.offer_name?.length > 15 ? (
              <Tooltip
                placement="bottom"
                title={row?.offer_name}
                className="cursor-pointer"
                color="#1F487C"
              >
                <p className="text-[1.1vw]">
                  {" "}
                  {`${row?.offer_name?.slice(0, 15)}...`}
                </p>
              </Tooltip>
            ) : (
              <h1 className="text-[1.1vw]">{row?.offer_name?.slice(0, 15)}</h1>
            )}
          </div>
        );
      },
      width: "14vw",
    },
    {
      title: <h1 className="text-[1.2vw] font-semibold flex items-center justify-center">Code</h1>,
      width: "17vw",
      render: (row) => {
        return (
          <div className='flex items-center text-[#1F4B7F] justify-center'>
            {row?.code?.length > 15 ? (
              <Tooltip
                placement="right"
                title={row?.code}
                className="cursor-pointer"
                color="#1F487C"
              >
                <button className="border-dashed text-[1.1vw] bg-[#1F4B7F] border-white border-[0.2vw] rounded-[0.5vw] text-white w-[14vw] ">
                  {`${row?.code?.slice(0, 15)}...`}{" "}
                </button>
              </Tooltip>
            ) : (
              <button className="border-dashed text-[1.1vw] bg-[#1F4B7F] border-white border-[0.2vw] rounded-[0.5vw] text-white w-[14vw] ">
                {row?.code?.slice(0, 15)}
              </button>
            )}
            {/* <button className="border-dashed text-[1.1vw] bg-[#1F4B7F] border-white border-[0.2vw] rounded-[0.5vw] text-white w-[14vw] ">
              {row.code}
            </button> */}
          </div>
        );
      },
    },
    {
      title: <h1 className="text-[1.2vw] font-semibold flex items-center justify-center">Created Date</h1>,
      sorter: (a, b) =>
        dayjs(a.created_date).valueOf() - dayjs(b.created_date).valueOf(),
      width: "15vw",
      render: (row) => {
        return (
          <div className='flex items-center text-[#1F4B7F] justify-center'>
            <p className="text-[1.1vw]">{`${dayjs(row?.created_date).format(
              "DD MMM, YY"
            )}`}</p>
          </div>
        );
      },
    },
    {
      title: <h1 className="text-[1.2vw] font-semibold flex items-center justify-center">Updated Date</h1>,
      sorter: (a, b) =>
        dayjs(a.updated_date).valueOf() - dayjs(b.updated_date).valueOf(),
      width: "15vw",
      render: (row) => {
        return (
          <div className='flex items-center text-[#1F4B7F] justify-center'>
            <p className="text-[1.1vw] flex items-center justify-center">{`${dayjs(row?.updated_date).format(
              "DD MMM, YY"
            )}`}</p>
          </div>
        );
      },
    },
    {
      title: <h1 className="text-[1.2vw] font-semibold flex items-center justify-center">Duration</h1>,
      sorter: (a, b) => dayjs(a?.start_date).diff(dayjs(b?.start_date)),
      width: "15vw",
      render: (row) => {
        return (
          <div className='flex items-center text-[#1F4B7F] justify-center'>
            <p className="text-[1.1vw]">{`${dayjs(row?.start_date).format(
              "MMM DD"
            )} - ${dayjs(row?.expiry_date).format("MMM DD")}`}</p>
          </div>
        );
      },
    },
    {
      title: <h1 className="text-[1.2vw] font-semibold flex items-center justify-center">Usage</h1>,
      width: "7vw",
      render: (row) => {
        return (
          <div>
            <p className="text-[1.1vw] flex text-[#1F4B7F] items-center justify-center">{row.usage}</p>
          </div>
        );
      },
    },

    {
      title: <h1 className="text-[1.2vw] font-semibold text-center flex items-center justify-center">Status</h1>,
      width: "10vw",
      render: (row) => {
        return (
          <div className="flex items-center justify-center">
            <button
              className={`${row.status_id == 3
                ? "bg-[#34AE2A]"
                : row.status_id == 1
                  ? "bg-[#FD3434]"
                  : "bg-[#FF9900]"
                } rounded-[0.5vw] text-[1.1vw]  font-semibold text-white w-[7vw] py-[0.2vw]`}
            >
              {row.status == "Active" ? "Approved" : row.status}
            </button>
          </div>
        );
      },
    },
    {
      title: (
        <h1 className="text-[1.2vw] font-semibold text-center flex items-center justify-center">Actions</h1>
      ),
      width: "10vw",
      render: (row) => {
        console.log(row, "rowrowrowrow");
        return (
          <div className="flex gap-[0.7vw] items-center justify-center">
            {/* <IoMdEye
              size={"1.6vw"}
              color="#1F4B7F"
              className="cursor-pointer"
              onClick={() => {
                setOfferView(true);
                setOfferImage(row.theme);
              }}
            /> */}
            <FaEye size={"1.5vw"} color="#1F487C" className="cursor-pointer"
              onClick={() => {
                setOfferView(true);
                setOfferImage(row.theme);
              }} />
            <MdEdit
              size={"1.3vw"}
              color="#1F4B7F"
              className=" cursor-pointer"
              onClick={() => {
                setStatusupdateModal(true);
                SetUpdateData(row.tbs_offer_id);
              }}
            />
            <MdDelete
              size={"1.3vw"}
              color="#1F4B7F"
              className=" cursor-pointer"
              onClick={() => {
                setDeleteModalIsOpen(true);
                setPromoId(row.tbs_offer_id);
              }}
            />
          </div>
        );
      },
    },
  ]


  return (
    <>
      <Table
        dataSource={currentData}
        columns={columns}
        pagination={false}
        className="custom-table"
      />
      <ModalPopup
        show={statusupdateModal}
        onClose={closeUpdateModal}
        // height="20vw"
        // width="30vw"
        closeicon={false}
      >
        <ReqOffersStatusUpdate updateData={updateData} setStatusupdateModal={setStatusupdateModal} />

      </ModalPopup>
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
      <ModalPopup
        show={offerview}
        onClose={() => setOfferView(false)}
        height="20vw"
        width="30vw"
        closeicon={false}
      >
        <img
          src={`${apiImgUrl}${offerimage}`}
          className="w-full h-full"
        />
      </ModalPopup>
    </>
  )
}
