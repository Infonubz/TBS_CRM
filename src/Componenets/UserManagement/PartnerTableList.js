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
import { capitalizeFirstLetter } from "../Common/Captilization";
import PartnerStatusUpdate from "./Partner/PartnerStatusUpdate";
import { useSelector } from "react-redux";
import moment from "moment/moment";
import {
  TiArrowUnsorted,
  TiArrowSortedUp,
  TiArrowSortedDown,
} from "react-icons/ti";

// import { width } from "@fortawesome/free-solid-svg-icons/fa0";

const PartnerTableList = ({
  userdata,
  setModalIsOpen,
  SetUpdateData,
  currentData,
  PartnerID,
  setPartnerID,
  get_partner_list,
  updatedata,
  sortOrderDate,
  handleDateSort,
  sortOrderMobile,
  handleMobileSort,
  sortOrderEmail,
  handleEmailSort,
  sortOrderOccupation,
  handleOccupationSort,
  sortOrderPartnerName,
  handlePartnerNameSort,
}) => {
  const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;
  const apiUrl = process.env.REACT_APP_API_URL;
  const [sortedInfo, setSortedInfo] = useState({});
  const [viewmodal, setViewModal] = useState(false);
  const [userName, setUserName] = useState();
  const [partnerStatusId, setPartnerStatusId] = useState();
  const [spinning, setSpinning] = useState(false);

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);

    setSortedInfo(sorter);
  };
  // const get_partner_list = useSelector((state) => state.crm.partner_list);

  const [employee_id, setemployee_id] = useState(null);

  const closeModal = () => {
    setViewModal(false);
  };

  const columns = [
    {
      title: (
        <div className="flex items-center justify-center font-bold text-[1.1vw]">
          Profile
        </div>
      ),
      // dataIndex: "photo",
      // key: "photo",
      align: "center",
      width: "5vw",
      render: (row) => {
        console.log(row, "rowrowrow");
        const image = `${apiImgUrl}${row?.profile_img}`;
        console.log(image, "imageimage");
        return (
          <div className="flex justify-center items-center">
            <img
              src={`${
                row?.profile_img
                  ? `${apiImgUrl}${row?.profile_img}`
                  : UserProfile
              } `}
              alt="Profile"
              className="w-[2.15vw] h-[2.15vw] object-cover rounded-[0.2vw]"
            />
          </div>
        );
      },
      width: "5vw",
    },
    {
      title: (
        <div className="flex items-center justify-center font-bold text-[1.1vw]">
          Partner ID
        </div>
      ),
      key: "id",
      ellipsis: true,
      width: "9vw",
      render: (text, row) => {
        return (
          <div className="flex items-center justify-center">
            <p className="text-[1vw] text-[#1F4B7F] font-bold">
              {row.tbs_partner_id}
            </p>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex items-center justify-evenly  font-bold text-[1.1vw]">
          Partner Name

          <button onClick={handlePartnerNameSort} className="">
                      {sortOrderPartnerName === "ascend" ? (
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
                      ) : sortOrderPartnerName === "descend" ? (
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
                      ) : sortOrderPartnerName === null ? (
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
      //   const nameA =
      //     `${a.partner_first_name} ${a.partner_last_name}`.toUpperCase();
      //   const nameB =
      //     `${b.partner_first_name} ${b.partner_last_name}`.toUpperCase();
      //   return nameA.localeCompare(nameB);
      // },
      width: "11vw",
      // sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      // render: (row) => (
      //   <div className="flex items-center justify-center">
      //     <p className="text-[1.1vw] text-[#1F4B7F]">{`${capitalizeFirstLetter(row?.partner_first_name)} ${row.partner_last_name}`}</p>
      //   </div>
      // ),
      render: (row) => {
        // const fullname = `${capitalizeFirstLetter(row?.partner_first_name)} ${
        //   row.partner_last_name
        // }`;
        const fullname = `${
          row?.partner_first_name.charAt(0) ===
          row?.partner_first_name.charAt(0).toLowerCase()
            ? capitalizeFirstLetter(row?.partner_first_name)
            : row?.partner_first_name
        } ${row?.partner_last_name}`;
        return (
          <div className="flex items-center pl-[1vw]">
            <p className="text-[1vw] text-[#1F4B7F] font-bold">
              {fullname?.length > 18 ? (
                <Tooltip
                  placement="top"
                  color="white"
                  overlayInnerStyle={{ color: "#1F4B7F" }}
                  title={`${capitalizeFirstLetter(row?.partner_first_name)} ${
                    row.partner_last_name
                  }`}
                  className="cursor-pointer"
                >
                  {fullname?.slice(0, 18) + ".."}
                </Tooltip>
              ) : (
                fullname
              )}
            </p>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex items-center justify-evenly  font-bold text-[1.1vw]">
          Occupation
          
          <button onClick={handleOccupationSort} className="">
                      {sortOrderOccupation === "ascend" ? (
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
                      ) : sortOrderOccupation === "descend" ? (
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
                      ) : sortOrderOccupation === null ? (
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
      key: "occupation",
      // sorter: (a, b) => a.occupation?.length - b.occupation?.length,
      // sorter: (a, b) =>
      //   a.occupation?.toLowerCase().localeCompare(b.occupation?.toLowerCase()),
      // sortOrder:
      //   sortedInfo.columnKey === "occupation" ? sortedInfo.order : null,
      ellipsis: true,
      width: "10vw",
      render: (row) => {
        return (
          // <div className="flex items-center justify-center">
          //   <p className="text-[1.1vw] text-[#1F4B7F]">{row.emailid}</p>
          // </div>
          <div>
            {row?.occupation?.length > 18 ? (
              <Tooltip
                placement="top"
                color="white"
                overlayInnerStyle={{ color: "#1F4B7F" }}
                title={row?.occupation}
                className="cursor-pointer"
              >
                <div
                  className={`text-[1vw] pl-[1.5vw] font-bold ${
                    !row?.occupation && "pl-[3vw]"
                  } text-[#1f4b7f]`}
                >
                  {" "}
                  {`${capitalizeFirstLetter(row?.occupation?.slice(0, 18))}...`}
                </div>
              </Tooltip>
            ) : (
              <div
                className={`text-[1vw] pl-[1.5vw] font-bold ${
                  !row?.occupation && "pl-[3vw]"
                } text-[#1f4b7f]`}
              >
                {row?.occupation
                  ? capitalizeFirstLetter(row?.occupation?.slice(0, 18))
                  : "-"}
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex items-center justify-center font-bold text-[1.1vw]">
          Age / Gender
        </div>
      ),
      ellipsis: true,
      width: "9vw",
      render: (row) => {
        return (
          <div className="pl-[2.5vw]">
            <p className={`text-[1vw] text-[#1F4B7F] flex `}>
              {row.date_of_birth ? (
                <>
                  <div>{moment().diff(moment(row.date_of_birth), "years")}</div>
                  <div className="px-[.3vw]">/</div>
                  <div>
                    {row?.gender === "Male"
                      ? "M"
                      : row?.gender === "Female"
                      ? "F"
                      : "O"}
                  </div>
                </>
              ) : (
                <div className="pl-[1vw]  font-bold w-full">-</div>
              )}
            </p>
          </div>
        );
      },
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
      // sortOrder: sortedInfo.columnKey === "mobile" && sortedInfo.order,
      ellipsis: true,
      width: "9vw",
      render: (text, row) => {
        return (
          <div className="flex items-center w-full">
            <p className="text-[1vw] text-[#1F4B7F] w-full flex justify-center">
              {row.phone ? (
                <span>{row.phone}</span>
              ) : (
                <div className="font-bold">-</div>
              )}
            </p>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex items-center justify-evenly  font-bold text-[1.2vw]">
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
      // sorter: (a, b) => a.emailid.length - b.emailid.length,
      // sortOrder: sortedInfo.columnKey === "email" ? sortedInfo.order : null,
      // sorter: (a, b) =>
      //   (a.emailid || "")
      //     .toLowerCase()
      //     .localeCompare((b.emailid || "").toLowerCase()), // Sort alphabetically
      // sortOrder: sortedInfo.columnKey === "email" ? sortedInfo.order : null,
      ellipsis: true,
      width: "13vw",
      render: (row) => {
        return (
          // <div className="flex items-center justify-center">
          //   <p className="text-[1.1vw] text-[#1F4B7F]">{row.emailid}</p>
          // </div>
          <div>
            {row?.emailid?.length > 20 ? (
              <Tooltip
                placement="top"
                color="white"
                overlayInnerStyle={{ color: "#1F4B7F" }}
                title={row?.emailid}
                className="cursor-pointer"
              >
                <div className="text-[1vw] pl-[1vw] text-[#1f4b7f]">
                  {`${row?.emailid?.slice(0, 20)}...`}
                </div>
              </Tooltip>
            ) : row?.emailid ? (
              <div className="text-[1vw] pl-[1vw] text-[#1f4b7f]">
                {row?.emailid?.slice(0, 20)}
              </div>
            ) : (
              <div className="text-center text-[1vw] font-bold text-[#1f4b7f]">
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
      key: "created",
      // sorter: (a, b) => new Date(a.created_date) - new Date(b.created_date),
      // sortOrder: sortedInfo.columnKey === "created" ? sortedInfo.order : null,
      ellipsis: true,
      width: "8vw",
      render: (row) => {
        return (
          <div className="pl-[2vw]">
            <p className="text-[1vw] text-[#1F4B7F]">
              {dayjs(row.created_date).format("DD MMM YYYY")}
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
      width: "10vw",
      render: (row) => {
        return (
          <div className="flex items-center justify-center">
            <button
              className={`${
                row.partner_status_id == 0
                  ? "bg-[#646262] cursor-not-allowed"
                  : row.partner_status_id == 1
                  ? "bg-[#FF9900] cursor-not-allowed"
                  : row.partner_status_id == 2
                  ? "bg-[#34AE2B]"
                  : row.partner_status_id == 3
                  ? "bg-[#FD3434]"
                  : "bg-[#2A99FF] cursor-not-allowed"
              }  h-[1.8vw] shadow-md shadow-black font-extrabold text-[1vw] text-white w-[7vw] rounded-[0.5vw]`}
              onClick={() => {
                if (
                  row.partner_status_id === 2 ||
                  row.partner_status_id === 3
                ) {
                  setViewModal(true);
                  setPartnerStatusId(row.partner_status_id);
                  setPartnerID(row?.tbs_partner_id);
                }
              }}
            >
              {capitalizeFirstLetter(row.partner_status)}
            </button>
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
        console.log(row?.tbs_partner_id, "rowrowrow");
        return (
          <div className="flex items-center justify-center">
            <Space>
              <MdModeEditOutline
                onClick={() => {
                  setModalIsOpen(true);
                  SetUpdateData(row.tbs_partner_id);
                  setPartnerID(row?.tbs_partner_id);
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
                  setPartnerID(row?.tbs_partner_id);
                  setUserName(
                    `${row?.partner_first_name} ${" "} ${
                      row?.partner_last_name
                    }`
                  );
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

  console.log(currentData, "wefwefewfcew");
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
          title={`Want to delete this User  ${capitalizeFirstLetter(userName)}`}
          api={`${apiUrl}/partner_details/${PartnerID}`}
          module={"partner"}
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
        <PartnerStatusUpdate
          PartnerID={PartnerID}
          setViewModal={setViewModal}
          partnerStatusId={partnerStatusId}
          setSpinning={setSpinning}
        />
      </ModalPopup>
    </>
  );
};

export default PartnerTableList;
// src/components/EmployeeTable.js
// import React, { useMemo, useState } from "react";
// import { MdModeEditOutline, MdDelete } from "react-icons/md";
// import { FaEllipsisV } from "react-icons/fa";
// import dayjs from "dayjs";
// import UserProfile from "../../asserts/userprofile.png";
// import ModalPopup from "../Common/Modal/Modal";
// import DeleteList from "../Offers/DeleteList";
// import { useSelector } from "react-redux";
// import ReactTable from "../Table/ReactTable";

// const EmployeeTableList = ({
//   userdata,
//   setModalIsOpen,
//   SetUpdateData,
//   currentData,
// }) => {
//   const [employee_id, setemployee_id] = useState(null);
//   const [deletemodalIsOpen, setDeleteModalIsOpen] = useState(false);

//   const columns = useMemo(
//     () => [
//       {
//         Header: "Photo",
//         accessor: "profile_img",
//         width: "10vw",
//         textAlign: "center !important",
//         Cell: ({ row }) => {
//           const image = `http://192.168.90.47:4000${row.original.profile_img}`;
//           return (
//             <div className="flex justify-center items-center">
//               <img
//                 src={row.original.profile_img ? image : UserProfile}
//                 alt="Photo"
//                 className="w-[2.15vw] h-[2.15vw] object-cover rounded-[0.2vw]"
//               />
//             </div>
//           );
//         },
//       },
//       {
//         Header: "Member Name",
//         accessor: "name",
//         width: "15vw",
//         textAlign: "left",
//         Cell: ({ row }) => (
//           <div className="flex items-center">
//             <p className="text-[1.1vw]">{`${row.original.emp_first_name} ${row.original.emp_last_name}`}</p>
//           </div>
//         ),
//         sortType: (a, b) => {
//           const nameA =
//             `${a.original.emp_first_name} ${a.original.emp_last_name}`.toUpperCase();
//           const nameB =
//             `${b.original.emp_first_name} ${b.original.emp_last_name}`.toUpperCase();
//           return nameA.localeCompare(nameB);
//         },
//       },
//       {
//         Header: "Mobile",
//         accessor: "phone",
//         width: "10vw",
//         textAlign: "left",
//         Cell: ({ row }) => (
//           <div className="flex items-center">
//             <p className="text-[1.1vw]">{row.original.phone}</p>
//           </div>
//         ),
//       },
//       {
//         Header: "Email",
//         accessor: "email_id",
//         width: "15vw",
//         textAlign: "left",
//         Cell: ({ row }) => (
//           <div className="flex items-center">
//             <p className="text-[1.1vw]">{row.original.email_id}</p>
//           </div>
//         ),
//       },
//       {
//         Header: "Created",
//         accessor: "created_date",
//         width: "10vw",
//         textAlign: "left",
//         Cell: ({ row }) => (
//           <div className="flex items-center">
//             <p className="text-[1.1vw]">
//               {dayjs(row.original.created_date).format("MMM DD hh:mm a")}
//             </p>
//           </div>
//         ),
//       },
//       {
//         Header: "Status",
//         accessor: "status_id",
//         width: "10vw",
//         // textAlign: "left",
//         Cell: ({ row }) => (
//           <div className="flex items-center justify-center">
//             <button
//               className={`${
//                 row.original.status_id === 1 ? "bg-[#38ac2c]" : "bg-[#FD3434]"
//               } h-[1.8vw] text-[1.1vw] text-white w-[7vw] rounded-[0.5vw]`}
//             >
//               {row.original.gender}
//             </button>
//           </div>
//         ),
//       },
//       {
//         Header: "Action",
//         width: "10vw",
//         // textAlign: "left",
//         Cell: ({ row }) => {
//           return (
//             <div className="flex items-center justify-center">
//               <MdModeEditOutline
//                 onClick={() => {
//                   setModalIsOpen(true);
//                   SetUpdateData(row.original.employee_id);
//                 }}
//                 size="1.4vw"
//                 style={{
//                   cursor: "pointer",
//                   display: "grid",
//                   justifyContent: "center",
//                 }}
//                 color="#1f487c"
//               />
//               <MdDelete
//                 size="1.4vw"
//                 style={{
//                   cursor: "pointer",
//                   display: "grid",
//                   justifyContent: "center",
//                 }}
//                 color="#1f487c"
//                 className="cursor-pointer"
//                 onClick={() => setDeleteModalIsOpen(true)}
//               />
//               <FaEllipsisV
//                 onClick={() => handleMenu()}
//                 size="1.2vw"
//                 style={{
//                   cursor: "pointer",
//                   justifyContent: "center",
//                   display: "flex",
//                 }}
//                 color="#1f487c"
//               />
//             </div>
//           );
//         },
//       },
//     ],
//     [setModalIsOpen, SetUpdateData]
//   );

//   const handleMenu = () => {
//     console.log(`Delete record with key: ${""}`);
//   };

//   const closeDeleteModal = () => {
//     setDeleteModalIsOpen(false);
//   };

//   const data = useMemo(() => currentData, [currentData]);

//   return (
//     <>
//       <ReactTable columns={columns} data={data} />
//       <ModalPopup
//         show={deletemodalIsOpen}
//         onClose={closeDeleteModal}
//         height="20vw"
//         width="30vw"
//         closeicon={false}
//       >
//         <DeleteList
//           setDeleteModalIsOpen={setDeleteModalIsOpen}
//           title={"Want to delete this User"}
//           api={`http://192.168.90.47:4000/users/${employee_id}`}
//         />
//       </ModalPopup>
//     </>
//   );
// };

// export default EmployeeTableList;
