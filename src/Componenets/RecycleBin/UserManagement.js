import React, { useState } from "react";
import { Space, Spin, Table } from "antd";
import { TbRestore } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import dayjs from "dayjs";
import { capitalizeFirstLetter } from "../Common/Captilization";
import BinRestore from "./BinRestore";
import ModalPopup from "../Common/Modal/Modal";
import BinDelete from "./BinDelete";

export default function UserManagement({ currentItems, selectedTab, activePage, itemsPerPage }) {
  const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;

  const [tbsId, setTbsId] = useState();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [restoreModalOpen, SetRestoreModalOpen] = useState(false);
  const [rowName, SetRowName] = useState();
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    SetRestoreModalOpen(false);
  };

  console.log(tbsId, "namenamenamename");

  const columns = [
    {
      title: (
        <div className="flex font-bold text-[1.2vw]">S.No</div>
      ),
      width: "5vw",
      render: (row, rowdta, index) => {
        const pageNo = (activePage - 1) * itemsPerPage + index + 1
        return (
          <div className="text-[#1F4B7F] ">
            <h1 className="pl-[1vw]">{pageNo}</h1>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex  items-center font-bold text-[1.2vw]">
          Photo
        </div>
      ),
      align: "center",
      render: (row) => {
        const image = `${apiImgUrl}${selectedTab === 5
            ? row?.deleted_data?.operator?.profileimg
            : selectedTab === 7
              ? row?.deleted_data?.clientCompanyDetails?.company_logo
              : selectedTab === 9
                ? row?.deleted_data?.partnerDetails?.profile_img
                : selectedTab === 8
                  ? row?.deleted_data?.empPersonal?.profile_img
                  : selectedTab === 6
                    ? row?.deleted_data?.empPersonal?.profile_img
                    : ""
          }`;
        console.log(row?.deleted_data?.operator?.profileimg, "imageimage");
        return (
          <div className="flex  items-center">
            <img
              src={`${apiImgUrl}${selectedTab === 5
                  ? row?.deleted_data?.operator?.profileimg
                  : selectedTab === 7
                    ? row?.deleted_data?.clientCompanyDetails?.company_logo
                    : selectedTab === 9
                      ? row?.deleted_data?.partnerDetails?.profile_img
                      : selectedTab === 8
                        ? row?.deleted_data?.empPersonal?.profile_img
                        : selectedTab === 6
                          ? row?.deleted_data?.empPersonal?.profile_img
                          : ""
                }`}
              alt="Photo"
              className="w-[2.15vw] h-[2.15vw] object-cover rounded-[0.2vw]"
            />
          </div>
        );
      },
      width: "6vw",
    },
    {
      title: (
        <div className="flex items-center  font-bold text-[1.2vw]">
          {" "}
          Name
        </div>
      ), // dataIndex: "name",
      key: "name",
      sorter: (a, b) => {
        const nameA =
          selectedTab === 5
            ? a.deleted_data?.operator?.company_name.toUpperCase()
            : selectedTab === 7
              ? a.deleted_data?.clientCompanyDetails?.company_name
              : selectedTab === 9
                ? a.deleted_data.partnerDetails?.partner_first_name
                : selectedTab === 8
                  ? a.deleted_data?.empPersonal?.emp_first_name
                  : selectedTab === 6
                    ? a.deleted_data?.empPersonal?.emp_first_name
                    : "";
        const nameB =
          selectedTab === 5
            ? b.deleted_data?.operator?.company_name.toUpperCase()
            : selectedTab === 7
              ? b.deleted_data?.clientCompanyDetails?.company_name
              : selectedTab === 9
                ? b.deleted_data.partnerDetails?.partner_first_name
                : selectedTab === 8
                  ? a.deleted_data?.empPersonal?.emp_first_name
                  : selectedTab === 6
                    ? b.deleted_data?.empPersonal?.emp_first_name
                    : "";
        return nameA.localeCompare(nameB);
      },
      width: "12vw",
      render: (row) => (
        <div className="flex items-center">
          <p className="text-[1vw] text-[#1F4B7F] font-semibold ">{`${selectedTab === 5
              ? row?.deleted_data?.operator?.company_name
              : selectedTab === 7
                ? row?.deleted_data?.clientCompanyDetails?.company_name
                : selectedTab === 9
                  ? row?.deleted_data?.partnerDetails?.partner_first_name
                  : selectedTab === 8
                    ? row.deleted_data?.empPersonal?.emp_first_name
                    : selectedTab === 6
                      ? row.deleted_data?.empPersonal?.emp_first_name
                      : ""
            }`}</p>
          <p className="text-[1vw] text-[#1F4B7F] pl-[.4vw] font-semibold ">{`${
            // selectedTab === 5
            //   ? row?.deleted_data?.partnerDetails?.partner_first_name 
            selectedTab === 8
              ? row.deleted_data?.empPersonal?.emp_last_name
              : selectedTab === 6
                ? row.deleted_data?.empPersonal?.emp_last_name
                : ""
            }`}</p>
        </div>
      ),
    },

    {
      title: (
        <div className="flex items-center  font-bold text-[1.2vw]">
          Mobile
        </div>
      ),
      key: "mobile",
      sorter: (a, b) => {
        const phoneA =
          selectedTab === 5
            ? a.deleted_data?.operator?.phone
              ? a.deleted_data?.operator?.phone.replace(/\D/g, "")
              : ""
            : selectedTab === 7
              ? a.deleted_data?.clientCompanyDetails?.phone.replace(/\D/g, "")
              : selectedTab === 9
                ? a.deleted_data?.partnerDetails?.phone.replace(/\D/g, "")
                : selectedTab === 8
                  ? a.deleted_data?.empPersonal?.phone?.replace(/\D/g, "")
                  : selectedTab === 6
                    ? a.deleted_data?.empPersonal?.phone?.replace(/\D/g, "")
                    : "";
        const phoneB =
          selectedTab === 5
            ? b.deleted_data?.operator?.phone
              ? b.deleted_data?.operator?.phone.replace(/\D/g, "")
              : ""
            : selectedTab === 7
              ? b.deleted_data?.clientCompanyDetails?.phone.replace(/\D/g, "")
              : selectedTab === 9
                ? b.deleted_data?.partnerDetails?.phone.replace(/\D/g, "")
                : selectedTab === 8
                  ? b.deleted_data?.empPersonal?.phone?.replace(/\D/g, "")
                  : selectedTab === 6
                    ? a.deleted_data?.empPersonal?.phone?.replace(/\D/g, "")
                    : "";
        return phoneA.localeCompare(phoneB);
      },
      ellipsis: true,
      width: "10vw",
      render: (text, row) => {
        return (
          <div className="flex items-center text-[#1F4B7F] ">
            <p className="text-[1vw]">
              {selectedTab === 5
                ? row?.deleted_data?.operator?.phone
                : selectedTab === 7
                  ? row?.deleted_data?.clientCompanyDetails?.phone
                  : selectedTab === 9
                    ? row?.deleted_data?.partnerDetails?.phone
                    : selectedTab === 8
                      ? row.deleted_data?.empPersonal?.phone?.replace(/\D/g, "")
                      : selectedTab === 6
                        ? row.deleted_data?.empPersonal?.phone?.replace(/\D/g, "")
                        : ""}
            </p>
          </div>
        );
      },
    },

    {
      title: (
        <div className="flex items-center  font-bold text-[1.2vw]">
          Email
        </div>
      ),
      key: "email",
      sorter: (a, b) => {
        if (selectedTab === 5) {
          return (
            (a.deleted_data?.operator?.emailid
              ? a.deleted_data?.operator?.emailid.length
              : 0) -
            (b.deleted_data?.operator?.emailid
              ? b.deleted_data?.operator?.emailid.length
              : 0)
          );
        } else if (selectedTab === 7) {
          return (
            (a.deleted_data?.clientCompanyDetails?.emailid
              ? a.deleted_data?.clientCompanyDetails?.emailid?.length
              : 0) -
            (b.deleted_data?.clientCompanyDetails?.emailid
              ? b.deleted_data?.clientCompanyDetails?.emailid?.length
              : 0)
          );
        } else if (selectedTab === 9) {
          return (
            (a.deleted_data?.partnerDetails?.emailid
              ? a.deleted_data?.partnerDetails?.emailid?.length
              : 0) -
            (b.deleted_data?.partnerDetails?.emailid
              ? b.deleted_data?.partnerDetails?.emailid?.length
              : 0)
          );
        } else if (selectedTab === 8) {
          return (
            (a.deleted_data?.empPersonal?.email_id
              ? a.deleted_data?.empPersonal?.email_id?.length
              : 0) -
            (b.deleted_data?.empPersonal?.email_id
              ? b.deleted_data?.empPersonal?.email_id?.length
              : 0)
          );
        } else if (selectedTab === 6) {
          return (
            (a.deleted_data?.empPersonal?.email_id
              ? a.deleted_data?.empPersonal?.email_id?.length
              : 0) -
            (b.deleted_data?.empPersonal?.email_id
              ? b.deleted_data?.empPersonal?.email_id?.length
              : 0)
          );
        }
      },
      ellipsis: true,
      width: "15vw",
      render: (row) => {
        return (
          <div className="flex items-center text-[#1F4B7F] ">
            <p className="text-[1vw]">
              {selectedTab === 5
                ? row.deleted_data?.operator?.emailid
                : selectedTab === 7
                  ? row?.deleted_data?.clientCompanyDetails?.emailid
                  : selectedTab === 9
                    ? row?.deleted_data?.partnerDetails?.emailid
                    : selectedTab === 8
                      ? row?.deleted_data?.empPersonal?.email_id
                      : selectedTab === 6
                        ? row?.deleted_data?.empPersonal?.email_id
                        : ""}
            </p>
          </div>
        );
      },
    },

    {
      title: (
        <div className="flex items-center  font-bold text-[1.2vw]">
          Deleted Date
        </div>
      ),
      key: "created_date",
      sorter: (a, b) => new Date(a.deleted_date) - new Date(b.deleted_date),
      ellipsis: true,
      width: "10vw",
      render: (row) => {
        return (
          <div className="flex  items-center text-[#1F4B7F] ">
            <p className="text-[1vw]">
              {dayjs(row.deleted_date).format("DD MMM, YY")}
            </p>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex items-center justify-center font-bold text-[1.2vw]">
          Status
        </div>
      ),
      width: "10vw",
      render: (row) => {
        return (
          <div className="flex items-center justify-center">
            <button
              className={`cursor-not-allowed ${(() => {
                if (selectedTab === 5) {
                  return row.deleted_data?.operator?.user_status_id == 0
                    ? "bg-[#FF6B00]"
                    : row.deleted_data?.operator?.user_status_id == 1
                      ? "bg-[#38ac2c]"
                      : "bg-[#FD3434] cursor-not-allowed";
                } else if (selectedTab === 7) {
                  return row.deleted_data?.clientCompanyDetails?.status_id == 0
                    ? "bg-[#FF6B00]"
                    : row.deleted_data?.clientCompanyDetails?.status_id == 1
                      ? "bg-[#38ac2c]"
                      : "bg-[#FD3434] cursor-not-allowed";
                } else if (selectedTab === 9) {
                  return row.deleted_data?.partnerDetails?.partner_status_id ==
                    0
                    ? "bg-[#FF6B00]"
                    : row.deleted_data?.partnerDetails?.partner_status_id == 1
                      ? "bg-[#38ac2c]"
                      : "bg-[#FD3434] cursor-not-allowed";
                } else if (selectedTab === 8) {
                  return row.deleted_data?.empPersonal?.emp_status_id == 0
                    ? "bg-[#FF6B00]"
                    : row.deleted_data?.empPersonal?.emp_status_id == 1
                      ? "bg-[#38ac2c]"
                      : "bg-[#FD3434] cursor-not-allowed";
                } else if (selectedTab === 6) {
                  return row.deleted_data?.empPersonal?.emp_status_id == 0
                    ? "bg-[#FF6B00]"
                    : row.deleted_data?.empPersonal?.emp_status_id == 1
                      ? "bg-[#38ac2c]"
                      : "bg-[#FD3434] cursor-not-allowed";
                } else {
                  return "bg-[#FF6B00] cursor-not-allowed";
                }
              })()} h-[1.8vw] text-[1.1vw] text-white w-[7vw] rounded-[0.5vw]`}
            >
              {capitalizeFirstLetter(
                selectedTab === 5
                  ? row.deleted_data?.operator?.user_status
                  : selectedTab === 7
                    ? row.deleted_data?.clientCompanyDetails?.status
                    : selectedTab === 9
                      ? row.deleted_data?.partnerDetails?.partner_status
                      : selectedTab === 8
                        ? row.deleted_data?.empPersonal?.emp_status
                        : selectedTab === 6
                          ? row.deleted_data?.empPersonal?.emp_status
                          : ""
              )}
            </button>
          </div>
        );
      },
    },

    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">
          Actions
        </div>
      ),
      width: "10vw",
      render: (row) => {
        return (
          <div className="flex gap-[0.7vw] items-center justify-center">
            <span
              className="cursor-pointer"
              onClick={() => {
                SetRestoreModalOpen(true);
                setTbsId(row?.tbs_recycle_id);
                SetRowName(() => {
                  if (selectedTab === 5) {
                    return row?.deleted_data?.operator?.company_name;
                  } else if (selectedTab === 7) {
                    return row?.deleted_data?.clientCompanyDetails
                      ?.company_name;
                  } else if (selectedTab === 9) {
                    return row?.deleted_data?.partnerDetails
                      ?.partner_first_name;
                  } else if (selectedTab === 8) {
                    return row?.deleted_data?.empPersonal?.emp_first_name;
                  } else if (selectedTab === 6) {
                    return row?.deleted_data?.empPersonal?.emp_first_name;
                  }
                });
              }}
            >
              <TbRestore size={"1.6vw"} color="#1F4B7F" />
            </span>
            <span>
              <MdDelete
                size={"1.3vw"}
                color="#1F4B7F"
                className=" cursor-pointer"
                onClick={() => {
                  setDeleteModalOpen(true);
                  setTbsId(row?.tbs_recycle_id);
                  SetRowName(() => {
                    if (selectedTab === 5) {
                      return row?.deleted_data?.operator?.company_name;
                    } else if (selectedTab === 7) {
                      return row?.deleted_data?.clientCompanyDetails
                        ?.company_name;
                    } else if (selectedTab === 9) {
                      return row?.deleted_data?.partnerDetails
                        ?.partner_first_name;
                    } else if (selectedTab === 8) {
                      return row?.deleted_data?.empPersonal?.emp_first_name;
                    } else if (selectedTab === 6) {
                      return row?.deleted_data?.empPersonal?.emp_first_name;
                    }
                  });
                }}
              />
            </span>
          </div>
        );
      },
    },
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
        <BinDelete
          setDeleteModalOpen={setDeleteModalOpen}
          deleteid={tbsId}
          // title={`want to delete ( ${rowName} ) Permenantly`}
          title={
            <>
              Want to delete <span style={{ fontWeight: 'bold' }}>{rowName}</span> permanently
            </>
          }
          id={tbsId}
          tab={selectedTab}
        />
      </ModalPopup>

      <ModalPopup
        show={restoreModalOpen}
        onClose={closeDeleteModal}
        height="21vw"
        width="30vw"
        closeicon={false}
      >
        <BinRestore
          SetRestoreModalOpen={SetRestoreModalOpen}
          // title={`want to restore ( ${rowName} ) `}
          title={
            <>
             want to restore <span style={{ fontWeight: 'bold' }}>{rowName}</span> 
            </>
          }
          id={tbsId}
          tab={selectedTab}
        />
      </ModalPopup>
    </>
  );
}
