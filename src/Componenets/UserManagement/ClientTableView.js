import React, { useState } from "react";
import { Button, Grid, Space, Spin, Table, Tooltip } from "antd";
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
import {
  TiArrowUnsorted,
  TiArrowSortedUp,
  TiArrowSortedDown,
} from "react-icons/ti";

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
  sortOrderDate,
  handleDateSort,
  sortOrderMobile,
  handleMobileSort,
  sortOrderEmail,
  handleEmailSort,
  sortOrderBusinessType,
  handleBusinessTypeSort,
  sortOrderClientName,
  handleClientNameSort,
  sortOrderClientCompName,
  handleClientCompNameSort,
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
  const [userName, setUserName] = useState("");
  const [spinning, setSpinning] = useState(false);

  const columns = [
    {
      title: (
        <div className="flex justify-center font-bold text-[1.1vw]">
          Profile
        </div>
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
              src={`${
                row?.company_logo
                  ? `${apiImgUrl}${row?.company_logo}`
                  : UserProfile
              } `}
              alt="Profile"
              className="w-[2.15vw] h-[2.15vw] object-cover rounded-[0.2vw]"
            />
          </div>
        );
      },
      width: "4vw",
    },
    {
      title: (
        <div className="flex items-center justify-center font-bold text-[1.1vw]">
          Client ID
        </div>
      ),
      key: "id",
      ellipsis: true,
      width: "7vw",
      render: (text, row) => {
        return (
          <div className="flex items-center justify-center">
            <p className="text-[1vw] text-[#1F4B7F] font-bold">
              {row.tbs_client_id}
            </p>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex items-center justify-evenly  font-bold text-[1.1vw]">
          Company Name

          <button onClick={handleClientCompNameSort} className="">
                      {sortOrderClientCompName === "ascend" ? (
                        <Tooltip
                          placement="top"
                          title="Ascending"
                          className="cursor-pointer"
                          color="white"
                          overlayInnerStyle={{
                            color: "#1F487C",
                          }}
                        >
                          <TiArrowSortedUp />
                        </Tooltip>
                      ) : sortOrderClientCompName === "descend" ? (
                        <Tooltip
                          placement="top"
                          title="Descending"
                          className="cursor-pointer"
                          color="white"
                          overlayInnerStyle={{
                            color: "#1F487C",
                          }}
                        >
                          <TiArrowSortedDown />
                        </Tooltip>
                      ) : sortOrderClientCompName === null ? (
                        <Tooltip
                          placement="top"
                          title="Unsorted"
                          className="cursor-pointer"
                          color="white"
                          overlayInnerStyle={{
                            color: "#1F487C",
                          }}
                        >
                          <TiArrowUnsorted />
                        </Tooltip>
                      ) : (
                        <Tooltip
                          placement="top"
                          title="Ascending"
                          className="cursor-pointer"
                          color="white"
                          overlayInnerStyle={{
                            color: "#1F487C",
                          }}
                        >
                          <TiArrowSortedUp />
                        </Tooltip>
                      )}
                    </button>
        </div>
      ), // dataIndex: "name",
      key: "name",
      // sorter: (a, b) => {
      //   const nameA = a.company_name.toUpperCase();
      //   const nameB = b.company_name.toUpperCase();
      //   return nameA.localeCompare(nameB);
      // },
      width: "9vw",
      // sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      render: (row) => (
        <div className="flex items-center text-[1vw] font-bold text-[#1F4B7F] pl-[1vw]">
          {row?.company_name?.length > 18 ? (
            <Tooltip
              color="white"
              overlayInnerStyle={{ color: "#1F4B7F" }}
              title={capitalizeFirstLetter(row?.company_name)}
            >
              <span>
                {row?.company_name.charAt(0) ===
                row?.company_name.charAt(0)?.toLowerCase()
                  ? `${capitalizeFirstLetter(row?.company_name).slice(
                      0,
                      18
                    )}...`
                  : `${row?.company_name.slice(0, 18)}...`}
              </span>
            </Tooltip>
          ) : (
            // <span>{capitalizeFirstLetter(row?.company_name)}</span>
            <span>
              {row?.company_name.charAt(0) ===
              row?.company_name.charAt(0)?.toLowerCase()
                ? capitalizeFirstLetter(row?.company_name)
                : row?.company_name}
            </span>
          )}
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center justify-evenly  font-bold text-[1.1vw]">
          Client Name

          <button onClick={handleClientNameSort} className="">
                      {sortOrderClientName === "ascend" ? (
                        <Tooltip
                          placement="top"
                          title="Ascending"
                          className="cursor-pointer"
                          color="white"
                          overlayInnerStyle={{
                            color: "#1F487C",
                          }}
                        >
                          <TiArrowSortedUp />
                        </Tooltip>
                      ) : sortOrderClientName === "descend" ? (
                        <Tooltip
                          placement="top"
                          title="Descending"
                          className="cursor-pointer"
                          color="white"
                          overlayInnerStyle={{
                            color: "#1F487C",
                          }}
                        >
                          <TiArrowSortedDown />
                        </Tooltip>
                      ) : sortOrderClientName === null ? (
                        <Tooltip
                          placement="top"
                          title="Unsorted"
                          className="cursor-pointer"
                          color="white"
                          overlayInnerStyle={{
                            color: "#1F487C",
                          }}
                        >
                          <TiArrowUnsorted />
                        </Tooltip>
                      ) : (
                        <Tooltip
                          placement="top"
                          title="Ascending"
                          className="cursor-pointer"
                          color="white"
                          overlayInnerStyle={{
                            color: "#1F487C",
                          }}
                        >
                          <TiArrowSortedUp />
                        </Tooltip>
                      )}
                    </button>
        </div>
      ), // dataIndex: "name",
      key: "name",
      // sorter: (a, b) => {
      //   const nameA = a.owner_name.toUpperCase();
      //   const nameB = b.owner_name.toUpperCase();
      //   return nameA.localeCompare(nameB);
      // },
      width: "9vw",
      // sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      render: (row) => (
        <div className="flex items-center text-[1vw] font-bold text-[#1F4B7F] pl-[1vw]">
          {row?.owner_name?.length > 18 ? (
            <Tooltip
              color="white"
              overlayInnerStyle={{ color: "#1F4B7F" }}
              title={capitalizeFirstLetter(row?.owner_name)}
            >
              <span>
                {`${
                  row?.owner_name?.charAt(0) ===
                  row?.owner_name?.charAt(0).toLowerCase()
                    ? capitalizeFirstLetter(row?.owner_name).slice(0, 18)
                    : row?.owner_name?.slice(0, 18)
                }...`}
              </span>
            </Tooltip>
          ) : (
            <span>
              {row?.owner_name?.charAt(0) ===
              row?.owner_name?.charAt(0).toLowerCase()
                ? capitalizeFirstLetter(row?.owner_name)
                : row?.owner_name}
            </span>
          )}
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center justify-evenly  font-bold text-[1.1vw]">
          Business Type

          <button onClick={handleBusinessTypeSort} className="">
                      {sortOrderBusinessType === "ascend" ? (
                        <Tooltip
                          placement="top"
                          title="Ascending"
                          className="cursor-pointer"
                          color="white"
                          overlayInnerStyle={{
                            color: "#1F487C",
                          }}
                        >
                          <TiArrowSortedUp />
                        </Tooltip>
                      ) : sortOrderBusinessType === "descend" ? (
                        <Tooltip
                          placement="top"
                          title="Descending"
                          className="cursor-pointer"
                          color="white"
                          overlayInnerStyle={{
                            color: "#1F487C",
                          }}
                        >
                          <TiArrowSortedDown />
                        </Tooltip>
                      ) : sortOrderBusinessType === null ? (
                        <Tooltip
                          placement="top"
                          title="Unsorted"
                          className="cursor-pointer"
                          color="white"
                          overlayInnerStyle={{
                            color: "#1F487C",
                          }}
                        >
                          <TiArrowUnsorted />
                        </Tooltip>
                      ) : (
                        <Tooltip
                          placement="top"
                          title="Ascending"
                          className="cursor-pointer"
                          color="white"
                          overlayInnerStyle={{
                            color: "#1F487C",
                          }}
                        >
                          <TiArrowSortedUp />
                        </Tooltip>
                      )}
                    </button>
        </div>
      ), // dataIndex: "name",
      key: "name",
      // sorter: (a, b) => {
      //   const nameA = a.business_background.toUpperCase();
      //   const nameB = b.business_background.toUpperCase();
      //   return nameA.localeCompare(nameB);
      // },
      // sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      // sorter: (a, b) => {
      //   const nameA = (a.business_background || "").toUpperCase(); // Handle null or undefined
      //   const nameB = (b.business_background || "").toUpperCase();
      //   return nameA.localeCompare(nameB); // Compare lexicographically
      // },
      // sortOrder:
      //   sortedInfo.columnKey === "business_background"
      //     ? sortedInfo.order
      //     : null,
      width: "11vw",
      render: (row) => (
        <div className="flex items-center text-[1vw] text-[#1F4B7F] pl-[1vw]">
          {row?.business_background?.length > 22 ? (
            <Tooltip
              color="white"
              overlayInnerStyle={{ color: "#1F4B7F" }}
              title={capitalizeFirstLetter(row?.business_background)}
            >
              <span>{`${capitalizeFirstLetter(row?.business_background).slice(
                0,
                22
              )}...`}</span>
            </Tooltip>
          ) : row?.business_background ? (
            <span>{capitalizeFirstLetter(row?.business_background)}</span>
          ) : (
            <div className="font-bold text-center flex justify-center w-full">
              -
            </div>
          )}
        </div>
      ),
    },

    {
      title: (
        <div className="flex items-center justify-evenly font-bold text-[1.1vw]">
          Mobile
          <button onClick={handleMobileSort}>
            {sortOrderMobile === "ascend" ? (
              <Tooltip
                placement="top"
                title="Ascending"
                className="cursor-pointer"
                color="white"
                overlayInnerStyle={{
                  color: "#1F487C",
                }}
              >
                <TiArrowSortedUp />
              </Tooltip>
            ) : sortOrderMobile === "descend" ? (
              <Tooltip
                placement="top"
                title="Descending"
                className="cursor-pointer"
                color="white"
                overlayInnerStyle={{
                  color: "#1F487C",
                }}
              >
                <TiArrowSortedDown />
              </Tooltip>
            ) : sortOrderMobile === null ? (
              <Tooltip
                placement="top"
                title="Unsorted"
                className="cursor-pointer"
                color="white"
                overlayInnerStyle={{
                  color: "#1F487C",
                }}
              >
                <TiArrowUnsorted />
              </Tooltip>
            ) : (
              <Tooltip
                placement="top"
                title="Ascending"
                className="cursor-pointer"
                color="white"
                overlayInnerStyle={{
                  color: "#1F487C",
                }}
              >
                <TiArrowSortedUp />
              </Tooltip>
            )}
          </button>
        </div>
      ),
      key: "mobile",
      // sorter: (a, b) => {
      //   const phoneA = a.phone ? a.phone.replace(/\D/g, "") : "";
      //   const phoneB = b.phone ? b.phone.replace(/\D/g, "") : "";
      //   return phoneA.localeCompare(phoneB);
      // },
      // sortOrder: sortedInfo.columnKey === "mobile" ? sortedInfo.order : null,
      ellipsis: true,
      width: "7vw",
      render: (text, row) => {
        return (
          <div className="flex items-center justify-center">
            <p className="text-[1vw] text-[#1F4B7F]">
              {row.phone ? row.phone : <span className="font-bold">-</span>}
            </p>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex  font-bold text-[1.2vw] justify-evenly">
          Email
          
          <button onClick={handleEmailSort}>
                      {sortOrderEmail === "ascend" ? (
                        <Tooltip
                          placement="top"
                          title="Ascending"
                          className="cursor-pointer"
                          color="white"
                          overlayInnerStyle={{
                            color: "#1F487C",
                          }}
                        >
                          <TiArrowSortedUp />
                        </Tooltip>
                      ) : sortOrderEmail === "descend" ? (
                        <Tooltip
                          placement="top"
                          title="Descending"
                          className="cursor-pointer"
                          color="white"
                          overlayInnerStyle={{
                            color: "#1F487C",
                          }}
                        >
                          <TiArrowSortedDown />
                        </Tooltip>
                      ) : sortOrderEmail === null ? (
                        <Tooltip
                          placement="top"
                          title="Unsorted"
                          className="cursor-pointer"
                          color="white"
                          overlayInnerStyle={{
                            color: "#1F487C",
                          }}
                        >
                          <TiArrowUnsorted />
                        </Tooltip>
                      ) : (
                        <Tooltip
                          placement="top"
                          title="Ascending"
                          className="cursor-pointer"
                          color="white"
                          overlayInnerStyle={{
                            color: "#1F487C",
                          }}
                        >
                          <TiArrowSortedUp />
                        </Tooltip>
                      )}
                    </button>
          </div>
      ),
      // dataIndex: "email",
      key: "email",
      // sorter: (a, b) => a.emailid?.length - b.emailid?.length,
      // sortOrder: sortedInfo.columnKey === "email" ? sortedInfo.order : null,
      // sorter: (a, b) => {
      //   const emailA = (a.emailid || "").toLowerCase(); // Handle null or undefined safely
      //   const emailB = (b.emailid || "").toLowerCase(); // Handle null or undefined safely
      //   return emailA.localeCompare(emailB); // Sort alphabetically
      // },
      // sortOrder: sortedInfo.columnKey === "email" ? sortedInfo.order : null,
      ellipsis: true,
      width: "12vw",
      render: (row) => {
        return (
          // <div className="flex items-center justify-center">
          //   <p className="text-[1.1vw] text-[#1F4B7F]">{row.emailid}</p>
          // </div>
          <div>
            {row?.emailid?.length > 20 ? (
              <Tooltip
                color="white"
                overlayInnerStyle={{ color: "#1F4B7F" }}
                placement="top"
                title={row?.emailid}
                className="cursor-pointer"
              >
                <div className="text-[1vw] pl-[1vw]  text-[#1f4b7f]">
                  {" "}
                  {`${row?.emailid?.slice(0, 20)}...`}
                </div>
              </Tooltip>
            ) : row?.emailid ? (
              <div className="text-[1vw] pl-[1vw] text-[#1f4b7f]">
                {row?.emailid?.slice(0, 20)}
              </div>
            ) : (
              <div className="font-bold text-center text-[1vw] flex justify-center w-full">
                -
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex items-center justify-evenly  font-bold text-[1.1vw]">
          Created

          <button onClick={handleDateSort}>
                      {sortOrderDate === "ascend" ? (
                        <Tooltip
                          placement="top"
                          title="Ascending"
                          className="cursor-pointer"
                          color="white"
                          overlayInnerStyle={{
                            color: "#1F487C",
                          }}
                        >
                          <TiArrowSortedUp />
                        </Tooltip>
                      ) : sortOrderDate === "descend" ? (
                        <Tooltip
                          placement="top"
                          title="Descending"
                          className="cursor-pointer"
                          color="white"
                          overlayInnerStyle={{
                            color: "#1F487C",
                          }}
                        >
                          <TiArrowSortedDown />
                        </Tooltip>
                      ) : sortOrderDate === null ? (
                        <Tooltip
                          placement="top"
                          title="Unsorted"
                          className="cursor-pointer"
                          color="white"
                          overlayInnerStyle={{
                            color: "#1F487C",
                          }}
                        >
                          <TiArrowUnsorted />
                        </Tooltip>
                      ) : (
                        <Tooltip
                          placement="top"
                          title="Ascending"
                          className="cursor-pointer"
                          color="white"
                          overlayInnerStyle={{
                            color: "#1F487C",
                          }}
                        >
                          <TiArrowSortedUp />
                        </Tooltip>
                      )}
                    </button>
        </div>
      ),
      // dataIndex: "created",
      key: "created_date",
      // sorter: (a, b) => new Date(a.created_date) - new Date(b.created_date),
      // sortOrder: sortedInfo.columnKey === "created_date" && sortedInfo.order,
      ellipsis: true,
      width: "6vw",
      render: (row) => {
        return (
          <div className="pl-[1.25vw]">
            <p className="text-[1vw] text-[#1F4B7F]">
              {dayjs(row.created_date).format("DD MMM, YY")}
            </p>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex items-center justify-center font-bold text-[1.1vw]">
          Status
        </div>
      ),
      // dataIndex: "status",
      // key: "status",
      width: "8vw",
      render: (row) => {
        return (
          <div className="flex items-center justify-center">
            {row.status_id != null ? (
              <button
                className={`${
                  row.status_id == 0
                    ? "bg-[#646262]"
                    : row.status_id == 1
                    ? "bg-[#34AE2B]"
                    : row.status_id == 2
                    ? "bg-[#FD3434]"
                    : "bg-[#2A99FF]"
                } ${
                  row.status_id == 0 ? "cursor-not-allowed" : "cursor-pointer"
                } h-[1.8vw] shadow-md shadow-[black] font-extrabold text-[1vw] text-white w-[7vw] rounded-[0.5vw]`}
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
        <div className="flex items-center justify-center font-bold text-[1.1vw]">
          Action
        </div>
      ),
      // dataIndex: "action",
      // key: "action",
      width: "5vw",
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
                  setUserName(row.owner_name);
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
  console.log(currentData, "wewewewewewewe");

  return (
    <>
      {spinning === true ? (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-20  z-10">
          <Spin size="large" />
        </div>
      ) : (
        ""
      )}
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
          title={`Want to delete this Client ${capitalizeFirstLetter(
            userName
          )}`}
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
          setSpinning={setSpinning}
        />
      </ModalPopup>
    </>
  );
};

export default ClientTableView;
