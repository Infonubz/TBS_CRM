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

// import { width } from "@fortawesome/free-solid-svg-icons/fa0";

const TableList = ({
  userdata,
  setModalIsOpen,
  SetUpdateData,
  currentData,
  setOperatorID,
  operatorID,
}) => {
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);

    setSortedInfo(sorter);
  };
  const get_operator_list = useSelector((state) => state.crm.operator_list);

  const columns = [
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">Photo</div>
      ),
      // dataIndex: "photo",
      // key: "photo",
      align: "center",
      render: (row) => {
        console.log(row, "rowrowrow");
        const image = `http://192.168.90.47:4000${row?.profileimg}`;
        console.log(image, "imageimage");
        return (
          <div className="flex justify-center items-center">
            <img
              src={`${
                row?.profileimg
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
      title: <div className="flex  font-bold text-[1.2vw]">Operator Name</div>, // dataIndex: "name",
      key: "name",
      sorter: (a, b) => {
        const nameA = `${a.firstname} ${a.lastname}`.toUpperCase();
        const nameB = `${b.firstname} ${b.lastname}`.toUpperCase();
        return nameA.localeCompare(nameB);
      },
      width: "12vw",
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      render: (row) => (
        <div className="flex items-center">
          <p className="text-[1.1vw]">{`${row?.owner_name}`}</p>
        </div>
      ),
    },

    {
      title: <div className="flex font-bold text-[1.2vw]">Mobile</div>,
      key: "mobile",
      sorter: (a, b) => a.mobilenumber.length - b.mobilenumber.length,
      sortOrder: sortedInfo.columnKey === "mobile" ? sortedInfo.order : null,
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
      title: <div className="flex  font-bold text-[1.2vw]">Email</div>,
      // dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.emailid.length - b.emailid.length,
      sortOrder: sortedInfo.columnKey === "email" ? sortedInfo.order : null,
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
      title: <div className="flex  font-bold text-[1.2vw]">Created</div>,
      // dataIndex: "created",
      // key: "created",
      sorter: (a, b) => a.created.length - b.created.length,
      sortOrder: sortedInfo.columnKey === "created" ? sortedInfo.order : null,
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
        <div className="flex justify-center font-bold text-[1.2vw]">Status</div>
      ),
      // dataIndex: "status",
      // key: "status",
      width: "10vw",
      render: (row) => {
        return (
          <div className="flex items-center justify-center">
            <button
              className={`${
                row.user_status_id == 0
                  ? "bg-[#FF6B00]"
                  : row.user_status_id == 1
                  ? "bg-[#38ac2c]"
                  : "bg-[#FD3434]"
              } h-[1.8vw] text-[1.1vw] text-white w-[7vw] rounded-[0.5vw]`}
            >
              {capitalizeFirstLetter(row.user_status)}
            </button>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">Action</div>
      ),
      // dataIndex: "action",
      // key: "action",
      width: "10vw",
      render: (row) => {
        console.log(row, "rowrowrow");
        return (
          <div className="flex items-center justify-center">
            <Space>
              <MdModeEditOutline
                onClick={() => {
                  setModalIsOpen(true);
                  SetUpdateData(row.tbs_operator_id);
                  setOperatorID(row?.tbs_operator_id);
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
                  setDeleteModalIsOpen(true);
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
  const [deletemodalIsOpen, setDeleteModalIsOpen] = useState(false);
  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
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
        show={deletemodalIsOpen}
        onClose={closeDeleteModal}
        height="20vw"
        width="30vw"
        closeicon={false}
      >
        <DeleteList
          setDeleteModalIsOpen={setDeleteModalIsOpen}
          title={"Want to delete this Operator"}
          api={`${apiUrl}/operators/${operatorID}`}
          module={"operator"}
        />
      </ModalPopup>
    </>
  );
};

export default TableList;
