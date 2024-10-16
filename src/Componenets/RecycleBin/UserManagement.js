import React, { useState } from "react";
import { Space, Table } from "antd";
import { TbRestore } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import dayjs from "dayjs";
import { capitalizeFirstLetter } from "../Common/Captilization";
import BinRestore from "./BinRestore";
import ModalPopup from "../Common/Modal/Modal";
import BinDelete from "./BinDelete";

export default function User_Management({currentItems,selectedTab}) {

  const [tbsId , setTbsId] = useState()
  const [deleteModalOpen,setDeleteModalOpen] = useState(false)
  const [restoreModalOpen,SetRestoreModalOpen] = useState(false)
  const [rowName,SetRowName] = useState()
  const getId = 1

  const apiUrl = process.env.REACT_APP_API_URL;

const closeDeleteModal = () =>{
  setDeleteModalOpen(false)
  SetRestoreModalOpen(false)
}
 
console.log(tbsId,"namenamenamename");



  const columns = [
    // {
    //   title: (
    //     <div className="flex justify-center font-bold text-[1.2vw]">Photo</div>
    //   ),
    //   // dataIndex: "photo",
    //   // key: "photo",
    //   width: "10vw",
    // },
    {
      title: (
        <div className="flex justify-center items-center font-bold text-[1.2vw]">Photo</div>
      ),
      // dataIndex: "photo",
      // key: "photo",
      align: "center",
      render: (row) => {
        const image = `http://192.168.90.47:4000${selectedTab === 5 ? row?.deleted_data?.operator?.profileimg : selectedTab === 7 ? row?.deleted_data?.clientCompanyDetails?.company_logo :""}`;
        console.log(row?.deleted_data?.operator?.profileimg, "imageimage");
        return (
          <div className="flex justify-center items-center">
            <img
              src={
                `http://192.168.90.47:4000${selectedTab === 5 ? row?.deleted_data?.operator?.profileimg : selectedTab === 7 ? row?.deleted_data?.clientCompanyDetails?.company_logo :""}`
                
                }
              alt="Photo"
              className="w-[2.15vw] h-[2.15vw] object-cover rounded-[0.2vw]"
            />
          </div>
        );
      },
      width: "6vw",
    },
    {
      title: <div className="flex items-center justify-center  font-bold text-[1.2vw]"> Name</div>, // dataIndex: "name",
      key: "name",
      sorter: (a, b) => {
        const nameA = selectedTab === 5 ? a.deleted_data?.operator?.company_name.toUpperCase() : selectedTab === 7 ? a.deleted_data?.clientCompanyDetails?.company_name :"" ;
        const nameB = selectedTab === 5 ? b.deleted_data?.operator?.company_name.toUpperCase() : selectedTab === 7 ? b.deleted_data?.clientCompanyDetails?.company_name :"" ;
        return nameA.localeCompare(nameB);
      },
      width: "12vw",
      // sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      render: (row) => (
        <div className="flex items-center">
          {/* {console.log(row.tbs_operator_id, "ooooooooooooopppppppppppppppppiiiiiidddd")} */}
          {/* <p className="text-[1.1vw]">{`${row?.owner_name}`}</p> */}
          <p className="text-[1.1vw]">{`${ selectedTab === 5 ? row?.deleted_data?.operator?.company_name : selectedTab === 7 ? row?.deleted_data?.clientCompanyDetails?.company_name : ""}`}</p>
        </div>
      ),
    },
    // {
    //   title: (
    //     <div className="flex justify-center font-bold text-[1.2vw]">
    //       Member Name
    //     </div>
    //   ),
    //   // dataIndex: "name",
    //   // key: "name",
    //   width: "13vw",
    // },

    {
      title: <div className="flex items-center justify-center font-bold text-[1.2vw]">Mobile</div>,
      key: "mobile",
      //sorter: (a, b) => a.mobilenumber?.length - b.mobilenumber?.length,
      sorter: (a, b) => {
        const phoneA = selectedTab === 5 ? a.deleted_data?.operator?.phone ? a.deleted_data?.operator?.phone.replace(/\D/g, '') : '' : selectedTab === 7 ? a.deleted_data?.clientCompanyDetails?.phone.replace(/\D/g, '') :"" ;
        const phoneB = selectedTab === 5 ? b.deleted_data?.operator?.phone ? b.deleted_data?.operator?.phone.replace(/\D/g, '') : '' : selectedTab === 7 ? b.deleted_data?.clientCompanyDetails?.phone.replace(/\D/g, '') :"" ;
        return phoneA.localeCompare(phoneB);
      },

      // sortOrder: sortedInfo.columnKey === "mobile" && sortedInfo.order,
      ellipsis: true,
      width: "10vw",
      render: (text, row) => {
        return (
          <div className="flex items-center">
            <p className="text-[1.1vw]">{selectedTab === 5 ? row?.deleted_data?.operator?.phone : row?.deleted_data?.clientCompanyDetails?.phone}</p>
          </div>
        );
      },
    },
    // {
    //   title: (
    //     <div className="flex justify-center font-bold text-[1.2vw]">Mobile</div>
    //   ),
    //   // dataIndex: "mobile",
    //   // key: "mobile",
    // },

    {
      title: <div className="flex items-center justify-center  font-bold text-[1.2vw]">Email</div>,
      key: "email",
      sorter: (a, b) =>
      {
        if(selectedTab === 5) {

          (a.deleted_data?.operator?.emailid ? a.deleted_data?.operator?.emailid.length : 0) - (b.deleted_data?.operator?.emailid ? b.deleted_data?.operator?.emailid.length : 0)
        }
        if(selectedTab === 7){
          (a.deleted_data?.clientCompanyDetails?.emailid ? a.deleted_data?.clientCompanyDetails?.emailid?.length : 0) - (b.deleted_data?.clientCompanyDetails?.emailid ? b.deleted_data?.clientCompanyDetails?.emailid?.length : 0)
        }

      },
      // sortOrder: sortedInfo.columnKey === "email" && sortedInfo.order,
      ellipsis: true,
      width: "15vw",
      render: (row) => {
        return (
          <div className="flex items-center">
            <p className="text-[1.1vw]">{selectedTab === 5 ? row.deleted_data?.operator?.emailid : selectedTab === 7 ? row?.deleted_data?.clientCompanyDetails?.emailid : ""}</p>
          </div>
        );
      },
    },

    // {
    //   title: (
    //     <div className="flex justify-center font-bold text-[1.2vw]">Email</div>
    //   ),
    //   // dataIndex: "email",
    //   // key: "email",
    // },

    {
      title: <div className="flex items-center justify-center  font-bold text-[1.2vw]">Deleted Date</div>,
      key: "created_date",
      sorter: (a, b) => new Date(a.deleted_date) - new Date(b.deleted_date),
      // sortOrder: sortedInfo.columnKey === "created_date" && sortedInfo.order,
      ellipsis: true,
      width: "10vw",
      render: (row) => {
        return (
          <div className="flex  items-center">
            <p className="text-[1.1vw]">
              {dayjs(row.deleted_date).format("DD MMM, YY")}
            </p>
          </div>
        );
      },
    },

    // {
    //   title: (
    //     <div className="flex justify-center  font-bold text-[1.2vw]">
    //       Created
    //     </div>
    //   ),
    //   // dataIndex: "created",
    //   // key: "created",
    // },

    {
      title: (
        <div className="flex items-center justify-center font-bold text-[1.2vw]">Status</div>
      ),
      // dataIndex: "status",
      // key: "status",
      width: "10vw",
      render: (row) => {
        return (
          <div className="flex items-center justify-center">
  <button
    className={`${(() => {
      if (selectedTab === 5) {
        return row.deleted_data?.operator?.user_status_id == 0 ? "bg-[#FF6B00]"  : row.deleted_data?.operator?.user_status_id == 1 ? "bg-[#38ac2c]" : "bg-[#FD3434] cursor-not-allowed";
      } else if (selectedTab === 7) {
        return row.deleted_data?.clientCompanyDetails?.status_id == 0 ? "bg-[#FF6B00]"   : row.deleted_data?.clientCompanyDetails?.status_id == 1 ? "bg-[#38ac2c]"  :"bg-[#FD3434] cursor-not-allowed";
      } else {
        return "bg-[#FF6B00] cursor-not-allowed"; // Default case
      }
    })()} h-[1.8vw] text-[1.1vw] text-white w-[7vw] rounded-[0.5vw]`}
    // onClick={()=>UpdateStatus(row.user_status_id,row.tbs_operator_id)}
  >
    {capitalizeFirstLetter(selectedTab === 5 ? row.deleted_data?.operator?.user_status : selectedTab === 7 ? row.deleted_data?.clientCompanyDetails?.status : "")}
  </button>
</div>

          // <div className="flex items-center justify-center">
          //   <button
          //     className={`${selectedTab === 5 ?  row.deleted_data?.operator?.user_status_id : selectedTab === 7 ? row?.deleted_data?.clientCompanyDetails?.status_id :"" == 0
          //       ? "bg-[#FF6B00] cursor-not-allowed"
          //       :selectedTab === 5 ? row?.deleted_data?.operator?.user_status_id : selectedTab === 7 ? row?.deleted_data?.clientCompanyDetails?.status_id : "" == 1
          //         ? "bg-[#38ac2c]"
          //         : "bg-[#FD3434] cursor-not-allowed"
          //       } h-[1.8vw] text-[1.1vw] text-white w-[7vw] rounded-[0.5vw]`}
          //     // onClick={()=>UpdateStatus(row.user_status_id,row.tbs_operator_id)}
          //     // onClick={() => {
          //     //   if (row.user_status_id === 1) {
          //     //     UpdateStatus(row.deleted_data?.operator?.user_status_id, row.deleted_data?.operator?.tbs_operator_id);
          //     //   }
          //     // }}
          //   >
          //     {capitalizeFirstLetter(selectedTab === 5 ? row.deleted_data?.operator?.user_status : selectedTab === 7 ? row.deleted_data?.clientCompanyDetails?.status : "")}
          //   </button>
          // </div>
        );
      },
    },
    // {
    //   title: (
    //     <div className="flex justify-center font-bold text-[1.2vw]">Status</div>
    //   ),
    //   // dataIndex: "status",
    //   // key: "status",
    //   width: "10vw",
    // },

    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">
          Actions
        </div>
      ),
      width: "10vw",
      render: (row) => {
        // promoidsetPromoId(row.offer_id);
        // console.log(row, "rowrowrowrow");
        return (
          <div className="flex gap-[0.7vw] items-center justify-center">
           <span className="cursor-pointer" onClick={()=>{
            SetRestoreModalOpen(true)
            setTbsId(row?.tbs_recycle_id)
            SetRowName(() =>{if(selectedTab === 5) {
              return row?.deleted_data?.operator?.company_name
            }
            else if(selectedTab === 7) {
              return row?.deleted_data?.clientCompanyDetails?.company_name
            }
          } )
           }}>
            <TbRestore size={"1.6vw"} color="#1F4B7F" />
           </span> 
            <span>
            <MdDelete
              size={"1.3vw"}
              color="#1F4B7F"
              className=" cursor-pointer"
              onClick={() => {
                setDeleteModalOpen(true)
                setTbsId(row?.tbs_recycle_id)
                SetRowName(() =>{if(selectedTab === 5) {
                return   row?.deleted_data?.operator?.company_name
                }
                else if(selectedTab === 7) {
                 return  row?.deleted_data?.clientCompanyDetails?.company_name
                }
              } )
              }
              }
              />
              </span>
          </div>
        );
      },
    },

    // {
    //   title: (
    //     <div className="flex justify-center font-bold text-[1.2vw]">Action</div>
    //   ),
    //   // dataIndex: "action",
    //   // key: "action",
    //   width: "10vw",
    //   render: (row) => {
    //     return (
    //       <>
    //         <TbRestore
    //           // onClick={() => handleMenu()}
    //           size="1.2vw"
    //           style={{
    //             cursor: "pointer",
    //             justifyContent: "center",
    //             display: "flex",
    //           }}
    //           color="#1f487c"
    //         />
    //         <MdDelete
    //           // onClick={() => handleDelete(row)}
    //           size="1.4vw"
    //           style={{
    //             cursor: "pointer",
    //             display: "grid",
    //             justifyContent: "center",
    //           }}
    //           color="#1f487c"
    //         />
    //       </>
    //     );
    //   },
    // },
  ];

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
        show={deleteModalOpen}
        onClose={closeDeleteModal}
        height="21vw"
        width="30vw"
        closeicon={false}
      >
        <BinDelete setDeleteModalOpen={setDeleteModalOpen}  deleteid={tbsId} url={`${apiUrl}/permanent-delete-operators/${tbsId}`} title={`want to delete ( ${rowName} ) Permenantly`} getId={1} />
            </ModalPopup>

            <ModalPopup
             show={restoreModalOpen}
             onClose={closeDeleteModal}
             height="21vw"
             width="30vw"
             closeicon={false}>
              <BinRestore SetRestoreModalOpen={SetRestoreModalOpen}
              
              // url={()=>{
              //   if(selectedTab === 5) {
              //    return (`${apiUrl}/restore-operators/${tbsId}`)
              //   }
              //   else if (selectedTab === 7 ) {
              //     return  (`${apiUrl}/restore-clients/${tbsId}`)

              //   }

              // } } 
              url={selectedTab}
              
              title={`want to restore ( ${rowName} ) `} getId={1}/>

            </ModalPopup>
     
    </>
  );
}
