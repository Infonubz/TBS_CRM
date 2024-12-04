import React, { useState } from "react";
import { Button, Grid, Space, Table, Tooltip } from "antd";
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
import ClientStatusUpdate from "./Client/ClientStatusUpdate";

// import { width } from "@fortawesome/free-solid-svg-icons/fa0";

const ClientTableView = ({
  userdata,
  setModalIsOpen,
  SetUpdateData,
  currentData,
  setClientID,
  clientID,
  setDeleteModalIsOpen,
  deletemodalIsOpen,
}) => {
  const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;
  const apiUrl = process.env.REACT_APP_API_URL;
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);

    setSortedInfo(sorter);
  };
  const get_operator_list = useSelector((state) => state.crm.operator_list);
  const [viewmodal, setViewModal] = useState(false);
  const [statusclientid, setStatusClientId] = useState(null);
  const [userName,setUserName] = useState("")

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
        const image = `${apiImgUrl}${row?.company_logo}`;
        console.log(image, "imageimage");
        return (
          <div className="flex justify-center items-center">
            <img
              src={`${row?.company_logo
                ? `${apiImgUrl}${row?.company_logo}`
                : UserProfile
                } `}
                 alt="Profile"
              className="w-[2.15vw] h-[2.15vw] object-cover rounded-[0.2vw]"
            />
          </div>
        );
      },
      width: "6vw",
    },
    {
      title: <div className="flex items-center justify-center font-bold text-[1.2vw]">Client Id</div>,
      key: "id",
      ellipsis: true,
      width: "9vw",
      render: (text, row) => {
        return (
          <div className="flex items-center justify-center">
            <p className="text-[1.1vw] text-[#1F4B7F]">{row.tbs_client_id}</p>
          </div>
        );
      },
    },
    {
      title: <div className="flex items-center justify-center  font-bold text-[1.2vw]">Client Name</div>, // dataIndex: "name",
      key: "name",
      sorter: (a, b) => {
        const nameA = a.owner_name.toUpperCase();
        const nameB = b.owner_name.toUpperCase();
        return nameA.localeCompare(nameB);
      },
      width: "12vw",
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      render: (row) => (
        <div className="flex items-center text-[1.1vw] text-[#1F4B7F] justify-center">
          {
            row?.owner_name?.length > 15 ? (
              <Tooltip title={capitalizeFirstLetter(row?.owner_name)}>
                <span>{`${capitalizeFirstLetter(row?.owner_name).slice(0, 15)}...`}</span>
              </Tooltip>
            ) : (
              <span>{capitalizeFirstLetter(row?.owner_name)}</span>
            )
          }
        </div>
      )
    },

    {
      title: <div className="flex items-center justify-center font-bold text-[1.2vw]">Mobile</div>,
      key: "mobile",
      sorter: (a, b) => {
        const phoneA = a.phone ? a.phone.replace(/\D/g, '') : '';
        const phoneB = b.phone ? b.phone.replace(/\D/g, '') : '';
        return phoneA.localeCompare(phoneB);
      },
      sortOrder: sortedInfo.columnKey === "mobile" ? sortedInfo.order : null,
      ellipsis: true,
      width: "10vw",
      render: (text, row) => {
        return (
          <div className="flex items-center justify-center">
            <p className="text-[1.1vw] text-[#1F4B7F]">{row.phone}</p>
          </div>
        );
      },
    },
    {
      title: <div className="flex  font-bold text-[1.2vw] justify-center">Email</div>,
      // dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.emailid?.length - b.emailid?.length,
      sortOrder: sortedInfo.columnKey === "email" ? sortedInfo.order : null,
      ellipsis: true,
      width: "15vw",
      render: (row) => {
        return (
          // <div className="flex items-center justify-center">
          //   <p className="text-[1.1vw] text-[#1F4B7F]">{row.emailid}</p>
          // </div>
          <div flex items-center justify-center>
          {row?.emailid?.length > 20 ? (
            <Tooltip
              placement="top"
              title={row?.emailid}
              className="cursor-pointer"
            >
              <div className="text-[1.1vw] text-center text-[#1f4b7f]">
                {" "}
                {`${row?.emailid?.slice(0, 20)}...`}
              </div>
            </Tooltip>
          ) : (
            <div className="text-[1.1vw] text-center text-[#1f4b7f]">
              {row?.emailid?.slice(0, 20)}
            </div>
          )}
        </div>
        );
      },
    },
    {
      title: <div className="flex items-center justify-center  font-bold text-[1.2vw]">Created</div>,
      // dataIndex: "created",
      key: "created_date",
      sorter: (a, b) => new Date(a.created_date) - new Date(b.created_date),
      sortOrder: sortedInfo.columnKey === "created_date" && sortedInfo.order,
      ellipsis: true,
      width: "10vw",
      render: (row) => {
        return (
          <div className="flex items-center justify-center">
            <p className="text-[1.1vw] text-[#1F4B7F]">
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
            {row.status_id != null ? (
              <button
                className={`${row.status_id == 0
                  ? "bg-[#646262]"
                  : row.status_id == 1
                    ? "bg-[#38ac2c]"
                    : row.status_id == 2
                      ? "bg-[#FD3434]"
                      : "bg-[#2A99FF]"
                  } ${row.status_id == 0 ? "cursor-not-allowed" : "cursor-pointer"
                  } h-[1.8vw] text-[1.1vw] text-white w-[8vw] rounded-[0.5vw]`}
                onClick={() => {
                  setViewModal(true);
                  setStatusClientId(row.tbs_client_id);
                }}
                disabled={row.status_id == 0 ? true : false}
              >
                {capitalizeFirstLetter(row.status)}
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
        <div className="flex items-center justify-center font-bold text-[1.2vw]">Action</div>
      ),
      // dataIndex: "action",
      // key: "action",
      width: "10vw",
      render: (row) => {
        console.log(row?.tbs_client_id, "rowrowrow");
        return (
          <div className="flex items-center justify-center">
            <Space>
              <MdModeEditOutline
                onClick={() => {
                  setModalIsOpen(true);
                  SetUpdateData(row.tbs_client_id);
                  setClientID(row?.tbs_client_id);
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
                  setClientID(row?.tbs_client_id);
                  setUserName(row.owner_name)
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
    setDeleteModalIsOpen(false);
  };



  const closeModal = () => {
    setViewModal(false);
  };

  console.log(clientID, "clientIDclientID");

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
          title={`Want to delete this Client ${capitalizeFirstLetter(userName)}`}
          api={`${apiUrl}/client-details/${clientID}`}
          module={"client"}
        />
      </ModalPopup>
      <ModalPopup
        className="border border-[#1f487c] border-b-8 border-r-8 border-b-[#1f487c] border-r-[#1f487c] rounded-md"
        show={viewmodal}
        closeicon={false}
        onClose={closeModal}
        height="16vw"
        width="30vw"
      >
        <ClientStatusUpdate
          clientid={statusclientid}
          setViewModal={setViewModal}
        />
      </ModalPopup>
    </>
  );
};

export default ClientTableView;
