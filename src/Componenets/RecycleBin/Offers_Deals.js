// import React, { useEffect, useState } from "react";
// import { Table, Tooltip } from "antd";
// import { TbRestore } from "react-icons/tb";
// import { MdDelete } from "react-icons/md";
// import { GetBinData } from "../../Api/RecycleBin/RecycleBin";
// import { useDispatch, useSelector } from "react-redux";
// import { crmreducer } from "../../Store/Reducer";
// import dayjs from "dayjs";
// import ReactPaginate from "react-js-pagination";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faChevronLeft,
//   faChevronRight,
//   faAngleDoubleLeft,
//   faAngleDoubleRight,
// } from "@fortawesome/free-solid-svg-icons";
// import BinDeleteAndRestore from "./BinDelete";
// import ModalPopup from "../Common/Modal/Modal";
// import BinDelete from "./BinDelete";
// import BinRestore from "./BinRestore";

// export default function Offers({currentItems}) {

//   const [tbsId , setTbsId] = useState()
//   const [deleteModalOpen,setDeleteModalOpen] = useState(false)
//   const [restoreModalOpen,SetRestoreModalOpen] = useState(false)
//   const [rowName,SetRowName] = useState()
//   const getId = 1

//   const apiUrl = process.env.REACT_APP_API_URL;

// const closeDeleteModal = () =>{
//   setDeleteModalOpen(false)
//   SetRestoreModalOpen(false)
// }
 


//   const columns = [
//     {
//       title: (
//         <div className="flex justify-center text-center font-bold text-[1.2vw]">S.No</div>
//       ),
//       width: "5vw",
//       render: (row, rowdta, index) => {
//         return (
//           <div className="">
//             <h1 className="pl-[1vw]">{index + 1}</h1>
//           </div>
//         );
//       },
//     },
//     {
//       title: <h1 className="text-[1.2vw] font-semibold  flex items-center justify-center ">Name</h1>,
//       sorter: (a, b) => a.deleted_data.offer_name.localeCompare(b.deleted_data.offer_name),
//       render: (row, rowdta, index) => {
//         return (
//           <div className="flex items-center">
//             {/* <h1 className="text-[1.1vw]">{row.offer_name}</h1> */}
//             {row?.deleted_data.offer_name?.length > 15 ? (
//               <Tooltip
//                 placement="bottom"
//                 title={row?.deleted_data.offer_name}
//                 className="cursor-pointer"
//                 color="#1F487C"
//               >
//                 <p className="text-[1.1vw]">
//                   {" "}
//                   {`${row?.deleted_data.offer_name?.slice(0, 15)}...`}
//                 </p>
//               </Tooltip>
//             ) : (
//               <h1 className="text-[1.1vw]">{row?.deleted_data.offer_name?.slice(0, 15)}</h1>
//             )}
//           </div>
//         );
//       },
//       width: "20vw",
//     },
//     // {
//     //   title: (
//     //     <div className="flex justify-center font-bold text-[1.2vw]">Name</div>
//     //   ),
//     //   render: (row, rowdta, index) => {
//     //     return (
//     //       <div className="flex items-center">
//     //         <h1 className="text-[1.1vw]">{row.deleted_data.offer_name}</h1>
//     //       </div>
//     //     );
//     //   },
//     //   width: "14vw",
//     // },
//     // {
//     //   title: (
//     //     <div className="flex justify-center font-bold text-[1.2vw]">Code</div>
//     //   ),
//     //   width: "17vw",
//     //   render: (row) => {
//     //     return (
//     //       <div>
//     //         <button className="border-dashed text-[1.1vw] bg-[#1F4B7F] border-white border-[0.2vw] rounded-[0.5vw] text-white px-[2vw] py-[0.2vw]">
//     //           {row.deleted_data.code}
//     //         </button>
//     //       </div>
//     //     );
//     //   },
//     // },
//     {
//       title: <h1 className="text-[1.2vw] font-semibold  flex items-center justify-center">Code</h1>,
//       width: "15vw",
//       render: (row) => {
//         return (
//           <div className="flex items-center justify-center">
//             {row?.deleted_data.code?.length > 15 ? (
//               <Tooltip
//                 placement="right"
//                 title={row?.deleted_data.code}
//                 className="cursor-pointer"
//                 color="#1F487C"
//               >
//                 <button className="border-dashed text-[1.1vw] bg-[#1F4B7F] border-white border-[0.2vw] rounded-[0.5vw] text-white w-[14vw] ">
//                   {`${row?.deleted_data.code?.slice(0, 15)}...`}{" "}
//                 </button>
//               </Tooltip>
//             ) : (
//               <button className="border-dashed text-[1.1vw] bg-[#1F4B7F] border-white border-[0.2vw] rounded-[0.5vw] text-white w-[14vw] ">
//                 {row?.deleted_data.code?.slice(0, 15)}
//               </button>
//             )}
//             {/* <button className="border-dashed text-[1.1vw] bg-[#1F4B7F] border-white border-[0.2vw] rounded-[0.5vw] text-white w-[14vw] ">
//               {row.code}
//             </button> */}
//           </div>
//         );
//       },
//     },
//     // {
//     //   title: <h1 className="text-[1.2vw] font-semibold  flex items-center justify-center">Created Date</h1>,
//     //   sorter: (a, b) =>
//     //     dayjs(a.deleted_data.created_date).valueOf() - dayjs(b.deleted_data.created_date).valueOf(),
//     //   width: "15vw",
//     //   render: (row) => {
//     //     return (
//     //       <div className="flex items-center justify-center">
//     //         <p className="text-[1.1vw]">{`${dayjs(row?.deleted_data.created_date).format(
//     //           "DD MMM, YY"
//     //         )}`}</p>
//     //       </div>
//     //     );
//     //   },
//     // },
   
//     {
//       title: (
//         <div className="flex justify-center font-bold text-[1.2vw]">
//           Duration
//         </div>
//       ),
//       width: "15vw",
//       render: (row) => {
//         return (
//           <div className="flex justify-center">
//             <p className="text-[1.1vw]">{`${dayjs(row?.deleted_data.start_date).format(
//               "MMM DD"
//             )} - ${dayjs(row?.deleted_data.expiry_date).format("MMM DD")}`}</p>
//           </div>
//         );
//       },
//     },
//     {
//       title: (
//         <div className="flex justify-center font-bold text-[1.2vw]">Usage</div>
//       ),
//       width: "7vw",
//       render: (row) => {
//         return (
//           <div className="flex justify-center">
//             <p className="text-[1.1vw]">{row.deleted_data.usage}</p>
//           </div>
//         );
//       },
//     },
//     {
//       title: <h1 className="text-[1.2vw] font-semibold  flex items-center justify-center">Deleted Date</h1>,
//       sorter: (a, b) =>
//         dayjs(a.deleted_date).valueOf() - dayjs(b.deleted_date).valueOf(),
//       width: "15vw",
//       render: (row) => {
//         return (
//           <div className="flex items-center justify-center">
//             <p className="text-[1.1vw]">{`${dayjs(row?.deleted_date).format(
//               "DD MMM, YY"
//             )}`}</p>
//           </div>
//         );
//       },
//     },
//     {
//       title: (
//         <div className="flex justify-center font-bold text-[1.2vw]">Status</div>
//       ),
//       width: "10vw",
//       render: (row) => {
//         return (
//           <div className="flex justify-center">
//             <button 
//               className={`${
//                 row.deleted_data.status === "Active"
//                   ? "bg-[#34AE2A]"
//                   : row.deleted_data.status == "Draft"
//                   ? "bg-[#FD3434]"
//                   : "bg-[#FF9900]"
//               } rounded-[0.5vw] text-[1.1vw]  font-semibold text-white w-[7vw] cursor-default py-[0.2vw]`}
//             >
//               {row.deleted_data.status}
//             </button>
//           </div>
//         );
//       },
//     },
//     {
//       title: (
//         <div className="flex justify-center font-bold text-[1.2vw]">
//           Actions
//         </div>
//       ),
//       width: "10vw",
//       render: (row) => {
//         // promoidsetPromoId(row.offer_id);
//         // console.log(row, "rowrowrowrow");
//         return (
//           <div className="flex gap-[0.7vw] items-center justify-center">
//            <span className="cursor-pointer" onClick={()=>{
//             SetRestoreModalOpen(true)
//             setTbsId(row?.tbs_recycle_id)
//             SetRowName(row?.deleted_data.offer_name)
//            }}>
//             <TbRestore size={"1.6vw"} color="#1F4B7F" />
//            </span> 
//             <span>
//             <MdDelete
//               size={"1.3vw"}
//               color="#1F4B7F"
//               className=" cursor-pointer"
//               onClick={() => {
//                 setDeleteModalOpen(true)
//                 setTbsId(row?.tbs_recycle_id)
//                 SetRowName(row?.deleted_data.offer_name)
//               }
//               }
//               />
//               </span>
//           </div>
//         );
//       },
//     },
   
//   ];



//   return (
//     <>
//     <div className="h-[72vh] w-full">
//       <Table
//         dataSource={currentItems}
//         columns={columns}
//         pagination={false}
//         className="custom-table"
//       />
//       </div>
//       <ModalPopup
//         show={deleteModalOpen}
//         onClose={closeDeleteModal}
//         height="21vw"
//         width="30vw"
//         closeicon={false}
//       >
//         <BinDelete setDeleteModalOpen={setDeleteModalOpen}  deleteid={tbsId} url={`${apiUrl}/permanent-delete-offers/${tbsId}`} title={`want to delete ( ${rowName} ) offer Permenantly`} getId={1} />
//             </ModalPopup>

//             <ModalPopup
//              show={restoreModalOpen}
//              onClose={closeDeleteModal}
//              height="21vw"
//              width="30vw"
//              closeicon={false}>
//               <BinRestore SetRestoreModalOpen={SetRestoreModalOpen} url={`${apiUrl}/restore-offers/${tbsId}`} title={`want to restore ( ${rowName} ) offer`} getId={1}/>

//             </ModalPopup>
     
//     </>
//   );
// }
