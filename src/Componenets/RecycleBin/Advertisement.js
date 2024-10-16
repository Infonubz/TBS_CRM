import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { BsEyeFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import dayjs from "dayjs";
import axios from "axios";
import { TbRestore } from "react-icons/tb";
import ModalPopup from "../Common/Modal/Modal";
import Video_modal from "./Video_Modal";

export default function Advertisement({currentItems}) {
  const [adsData, setAdsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [viewModal, setViewModalIsOpen] = useState(false);
  const [viewData, setViewData] = useState(null);

  const GetAdsData = async () => {
    const url = "http://192.168.90.47:4000/ads";
    try {
      const response = await axios.get(url);
      setAdsData(response.data);
    } catch (error) {
      console.error("Error fetching advertisements:", error);
    }
  };

  useEffect(() => {
    GetAdsData();
  }, []);

  const openModal = (ad) => {
    setViewData(ad);
    setViewModalIsOpen(true);
  };

  const closeModal = () => {
    setViewModalIsOpen(false);
    setViewData(null);
  };

  const columns = [
    {
      title: <div className="flex font-bold text-[1.2vw]">S.No</div>,
      width: "5vw",
      render: (row, rowdta, index) => (
        <div className="">
          <h1 className="pl-[1vw]">{index + 1}</h1>
        </div>
      ),
    },
    {
      title: <div className="flex font-bold text-[1.2vw]">Title</div>,
      render: (row) => (
        <div className="flex items-center">
          <h1 className="text-[1.1vw]">{row.ad_title}</h1>
        </div>
      ),
      width: "14vw",
    },
    {
      title: <div className="flex font-bold text-[1.2vw]">Description</div>,
      width: "17vw",
      render: (row) => (
        <div>
          <button className="text-[1.1vw]">{row.ad_description}</button>
        </div>
      ),
    },
    {
      title: <div className="flex font-bold text-[1.2vw]">Created Date</div>,
      width: "15vw",
      render: (row) => (
        <div className="flex">
          <p className="text-[1.1vw]">
            {dayjs(row?.created_date).format("DD MMM YY - hh:mm a")}
          </p>
        </div>
      ),
    },
    {
      title: <div className="flex font-bold text-[1.2vw]">Actions</div>,
      width: "15vw",
      render: (row) => (
        <div className="flex gap-[1vw] items-center">
          <BsEyeFill
            size={"1.6vw"}
            color="#1F4B7F"
            onClick={() => openModal(row)}
          />
          <TbRestore size={"1.6vw"} color="#1F4B7F" />
          <MdDelete size={"1.6vw"} color="#1F4B7F" className="cursor-pointer" />
        </div>
      ),
    },
  ];

  const paginatedAdsData = adsData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
     <div className="h-[72vh] w-full">
      <Table
        dataSource={currentItems}
        columns={columns}
        pagination={false}
        className="custom-table"
      />
      </div>
      <ModalPopup
        className="border border-[#1f487c] border-b-8 border-r-8 rounded-md"
        show={viewModal}
        onClose={closeModal}
        setIsModalOpen={setViewModalIsOpen}
        height="auto"
        width="45vw"
      >
        <Video_modal
          viewData={viewData}
          setViewModalIsOpen={setViewModalIsOpen} 
        />
      </ModalPopup>
    </>
  );
}
