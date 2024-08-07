import React from "react";
import { Table } from "antd";
import { TbRestore } from "react-icons/tb";
import { MdDelete } from "react-icons/md";

export default function Promotion() {
  const columns = [
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">S.No</div>
      ),
      width: "5vw",
      // render: (row, rowdta, index) => {
      //   return (
      //     <div className="">
      //       <h1 className="pl-[1vw]">{index + 1}</h1>
      //     </div>
      //   );
      // },
    },
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">Name</div>
      ),
      // render: (row, rowdta, index) => {
      //   return (
      //     <div className="flex items-center">
      //       <h1 className="text-[1.1vw]">{row.offer_name}</h1>
      //     </div>
      //   );
      // },
      width: "14vw",
    },
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">Code</div>
      ),
      width: "17vw",
      // render: (row) => {
      //   return (
      //     <div>
      //       <button className="border-dashed text-[1.1vw] bg-[#1F4B7F] border-white border-[0.2vw] rounded-[0.5vw] text-white px-[2vw] py-[0.2vw]">
      //         {row.code}
      //       </button>
      //     </div>
      //   );
      // },
    },
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">
          Duration
        </div>
      ),
      width: "15vw",
      // render: (row) => {
      //   return (
      //     <div>
      //       <p className="text-[1.1vw]">{`${dayjs(row?.start_date).format(
      //         "MMM DD"
      //       )} - ${dayjs(row?.expiry_date).format("MMM DD")}`}</p>
      //     </div>
      //   );
      // },
    },
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">Usage</div>
      ),
      width: "7vw",
      // render: (row) => {
      //   return (
      //     <div>
      //       <p className="text-[1.1vw]">{row.usage}</p>
      //     </div>
      //   );
      // },
    },
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">
          Actions
        </div>
      ),
      width: "10vw",
      render: (row) => {
        // promoidsetPromoId(row.offer_id);
        console.log(row, "rowrowrowrow");
        return (
          <div className="flex gap-[0.7vw] items-center">
            <TbRestore size={"1.6vw"} color="#1F4B7F" />
            <MdDelete
              size={"1.3vw"}
              color="#1F4B7F"
              className=" cursor-pointer"
              // onClick={() => setDeleteModalIsOpen(true)}
            />
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">Status</div>
      ),
      width: "10vw",
      // render: (row) => {
      //   return (
      //     <div>
      //       <button
      //         className={`${
      //           row.status == "Active"
      //             ? "bg-[#34AE2A]"
      //             : row.status == "Draft"
      //             ? "bg-[#FD3434]"
      //             : "bg-[#FF9900]"
      //         } rounded-[0.5vw] text-[1.1vw]  font-semibold text-white w-[7vw] py-[0.2vw]`}
      //       >
      //         {row.status}
      //       </button>
      //     </div>
      //   );
      // },
    },
  ];

  return (
    <>
      <Table
        // dataSource={currentData}
        columns={columns}
        pagination={false}
        className="custom-table"
      />
    </>
  );
}
