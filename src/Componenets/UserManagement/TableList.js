import React, { useState } from "react";
import { Button, Grid, Space, Table } from "antd";
import { render } from "@testing-library/react";
import { MdModeEditOutline, MdPadding } from "react-icons/md";
import { MdDelete } from "react-icons/md";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEllipsisVertical } from '@awesome.me/kit-KIT_CODE/icons/classic/solid';
import { FaEllipsisV } from "react-icons/fa";

// import USER1 from "../../../asserts/1.jpg";
// import USER2 from "../../../asserts/2.jpg";
import { WiDayLightWind } from "react-icons/wi";
// import ModalPopup from "../../Common/Modal/Modal";
// import DeleteList from "../../Offers/DeleteList";
import dayjs from "dayjs";
import UserProfile from "../../asserts/userprofile.png";
import ModalPopup from "../Common/Modal/Modal";
import DeleteList from "../Offers/DeleteList";
import { useSelector } from "react-redux";
import { capitalizeFirstLetter } from "../Common/Captilization";
import TableListStatusChange from "./TableListStatusChange";

// import { width } from "@fortawesome/free-solid-svg-icons/fa0";

const TableList = ({
  userdata,
  setModalIsOpen,
  SetUpdateData,
  currentData,
  setOperatorID,
  operatorID,
  setDeleteOpModalIsOpen,
  deleteOpmodalIsOpen,
}) => {
  const [sortedInfo, setSortedInfo] = useState({});
  const [statusModal, setStatusModal] = useState(false);
  const [statusId, setStatusId] = useState()
  const [userId, setUserId] = useState()
  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);

    setSortedInfo(sorter);
  };
  const get_operator_list = useSelector((state) => state.crm.operator_list);

  const UpdateStatus = (statusid, userid) => {
    setStatusModal(true)
    setStatusId(statusid)
    setUserId(userid)
  }
  const CloseStatusModal = () => {
    setStatusModal(false)
  }
  console.log(operatorID, '5102024')
  const columns = [
    {
      title: (
        <div className="flex justify-center items-center font-bold text-[1.2vw]">Photo</div>
      ),
      // dataIndex: "photo",
      // key: "photo",
      align: "center",
      render: (row) => {
        const image = `http://192.168.90.47:4000${row?.profileimg}`;
        console.log(row?.profileimg, "imageimage");
        return (
          <div className="flex justify-center items-center">
            <img
              src={`${row?.profileimg
                ? `http://192.168.90.47:4000${row?.profileimg}`
                : UserProfile
                } `}
              alt="Photo"
              className="w-[2.15vw] h-[2.15vw] object-cover rounded-[0.2vw]"
            />
          </div>
        );
      },
      width: "6vw",
    },
    {
      title: <div className="flex items-center justify-center  font-bold text-[1.2vw]">Company Name</div>, // dataIndex: "name",
      key: "name",
      sorter: (a, b) => {
        const nameA = a.owner_name.toUpperCase();
        const nameB = b.owner_name.toUpperCase();
        return nameA.localeCompare(nameB);
      },
      width: "12vw",
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      render: (row) => (
        <div className="flex items-center">
          {console.log(row.tbs_operator_id, "ooooooooooooopppppppppppppppppiiiiiidddd")}
          {/* <p className="text-[1.1vw]">{`${row?.owner_name}`}</p> */}
          <p className="text-[1.1vw]">{`${row?.company_name}`}</p>
        </div>
      ),
    },

    {
      title: <div className="flex items-center justify-center font-bold text-[1.2vw]">Mobile</div>,
      key: "mobile",
      //sorter: (a, b) => a.mobilenumber?.length - b.mobilenumber?.length,
      sorter: (a, b) => {
        const phoneA = a.phone ? a.phone.replace(/\D/g, '') : '';
        const phoneB = b.phone ? b.phone.replace(/\D/g, '') : '';
        return phoneA.localeCompare(phoneB);
      },

      sortOrder: sortedInfo.columnKey === "mobile" && sortedInfo.order,
      ellipsis: true,
      width: "10vw",
      render: (text, row) => {
        return (
          <div className="flex items-center">
            <p className="text-[1.1vw]">{row.phone}</p>
          </div>
        );
      },
    },
    {
      title: <div className="flex items-center justify-center  font-bold text-[1.2vw]">Email</div>,
      key: "email",
      sorter: (a, b) =>
        (a.emailid ? a.emailid.length : 0) - (b.emailid ? b.emailid.length : 0),
      sortOrder: sortedInfo.columnKey === "email" && sortedInfo.order,
      ellipsis: true,
      width: "15vw",
      render: (row) => {
        return (
          <div className="flex items-center">
            <p className="text-[1.1vw]">{row.emailid}</p>
          </div>
        );
      },
    },
    {
      title: <div className="flex items-center justify-center  font-bold text-[1.2vw]">Created</div>,
      key: "created_date",
      sorter: (a, b) => new Date(a.created_date) - new Date(b.created_date),
      sortOrder: sortedInfo.columnKey === "created_date" && sortedInfo.order,
      ellipsis: true,
      width: "10vw",
      render: (row) => {
        return (
          <div className="flex  items-center">
            <p className="text-[1.1vw]">
              {dayjs(row.created_date).format("DD MMM, YY")}
            </p>
          </div>
        );
      },
    },
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
              className={`${row.user_status_id == 0
                ? "bg-[#FF6B00] cursor-not-allowed"
                : row.user_status_id == 1
                  ? "bg-[#38ac2c]"
                  : "bg-[#FD3434] cursor-not-allowed"
                } h-[1.8vw] text-[1.1vw] text-white w-[7vw] rounded-[0.5vw]`}
              // onClick={()=>UpdateStatus(row.user_status_id,row.tbs_operator_id)}
              onClick={() => {
                if (row.user_status_id === 1) {
                  UpdateStatus(row.user_status_id, row.tbs_operator_id);
                }
              }}
            >
              {capitalizeFirstLetter(row.user_status)}
            </button>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex items-center justify-center font-bold text-[1.2vw]">Action</div>
      ),
      // dataIndex: "action",
      // key: "action",
      width: "10vw",
      render: (row) => {
        return (
          <div className="flex items-center justify-center">
            <Space>
              <MdModeEditOutline
                onClick={() => {
                  setModalIsOpen(true);
                  SetUpdateData(row.tbs_operator_id);
                  setOperatorID(row?.tbs_operator_id);
                  // setOperatorID(sessionStorage.getItem("SPA_ID"));
                }}
                size="1.4vw"
                style={{
                  cursor: "pointer",
                  display: "grid",
                  justifyContent: "center",
                }}
                color="#1f487c"
              />
              <MdDelete
                size="1.4vw"
                style={{
                  cursor: "pointer",
                  display: "grid",
                  justifyContent: "center",
                }}
                color="#1f487c"
                className=" cursor-pointer"
                onClick={() => {
                  setDeleteOpModalIsOpen(true);
                  setOperatorID(row?.tbs_operator_id);
                }}
              />

              {/* <FaEllipsisV
                onClick={() => handleMenu()}
                size="1.2vw"
                style={{
                  cursor: "pointer",
                  justifyContent: "center",
                  display: "flex",
                }}
                color="#1f487c"
              /> */}
            </Space>
          </div>
        );
      },
    },
  ];

  const handleEdit = () => {
    console.log(`Edit record with key: ${""}`);
    // Add your edit logic here
  };

  const handleMenu = () => {
    console.log(`Delete record with key: ${""}`);
    // Add your delete logic here
  };

  const closeDeleteModal = () => {
    setDeleteOpModalIsOpen(false);
  };
  const apiUrl = process.env.REACT_APP_API_URL;

  console.log(currentData, "operatorIDoperatorID");
  return (
    <>
      <Table
        columns={columns}
        dataSource={currentData}
        onChange={handleChange}
        pagination={false}
        className="custom-table"
      />


      <ModalPopup
        show={statusModal}
        onClose={CloseStatusModal}
        height="17vw"
        width="30vw"
        closeicon={false}>
        <TableListStatusChange statusId={statusId} userId={userId} setStatusModal={setStatusModal} />


      </ModalPopup>
      <ModalPopup
        show={deleteOpmodalIsOpen}
        onClose={closeDeleteModal}
        height="20vw"
        width="30vw"
        closeicon={false}
      >
        <DeleteList
          setDeleteModalIsOpen={setDeleteOpModalIsOpen}
          title={"Want to delete this Operator"}
          api={`${apiUrl}/operators/${operatorID}`}
          module={"operator"}
        />
      </ModalPopup>
    </>
  );
};

export default TableList;
