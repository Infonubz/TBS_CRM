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
import EmployeeStatusUpdate from "./Employee/EmployeeStatusUpdate";

// import { width } from "@fortawesome/free-solid-svg-icons/fa0";

const EmployeeTableList = ({
  userdata,
  setModalIsOpen,
  SetUpdateData,
  currentData,
  setEmployeeID,
  setDeleteEmpModalIsOpen,
  deleteEmpmodalIsOpen,
}) => {
  const [sortedInfo, setSortedInfo] = useState({});
  const [viewmodal, setViewModal] = useState(false);
  const [userName, setUserName] = useState("")

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);

    setSortedInfo(sorter);
  };

  const get_operator_list = useSelector((state) => state.crm.operator_list);

  const user = sessionStorage.getItem("USER_ID");

  const [employee_id, setemployee_id] = useState(null);

  const closeModal = () => {
    setViewModal(false);
  };

  const columns = [
    {
      title: (
        <div className="flex items-center justify-center font-bold text-[1.2vw]">Photo</div>
      ),
      // dataIndex: "photo",
      // key: "photo",
      align: "center",
      render: (row) => {
        console.log(row, "rowrowrow");
        const image = `http://192.168.90.47:4000${row?.profile_img}`;
        console.log(image, "imageimage");
        return (
          <div className="flex justify-center items-center">
            <img
              src={`${row?.profile_img
                  ? `http://192.168.90.47:4000${row?.profile_img}`
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
      title: <div className="flex items-center justify-center font-bold text-[1.2vw]">Employee Id</div>,
      key: "id",
      ellipsis: true,
      width: "11vw",
      render: (text, row) => {
        return (
          <div className="flex items-center justify-center">
            <p className="text-[1.1vw] text-[#1F4B7F]">{user?.startsWith("tbs-pro") ? row.tbs_pro_emp_id : row.tbs_pro_emp_id}</p>
          </div>
        );
      },
    },
    {
      title: <div className="flex items-center justify-center  font-bold text-[1.2vw]">Employee Name</div>, // dataIndex: "name",
      key: "name",
      sorter: (a, b) => {
        const nameA = `${a.emp_first_name} ${a.emp_last_name}`.toUpperCase();
        const nameB = `${b.emp_first_name} ${b.emp_last_name}`.toUpperCase();
        return nameA.localeCompare(nameB);
      },
      width: "12vw",
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      render: (row) => {
        const fullname = `${capitalizeFirstLetter(row?.emp_first_name)} ${row.emp_last_name}`
        return (
          // <div className="flex items-center justify-center">
          //   <p className="text-[1.1vw] text-[#1F4B7F]">{`${capitalizeFirstLetter(row?.emp_first_name)} ${row.emp_last_name}`}</p>
          // </div>
          <div className="flex items-center justify-center">
            <p className="text-[1.1vw] text-[#1F4B7F]">{
              fullname?.length > 17 ? <Tooltip placement="top"
                title={`${capitalizeFirstLetter(row?.emp_first_name)} ${row.emp_last_name}`}
                className="cursor-pointer">{fullname?.slice(0, 17) + ".."}</Tooltip> : fullname
            }</p>
          </div>
        )
      }
    },
    {
      title: <div className="flex items-center justify-center  font-bold text-[1.2vw]">Role Type</div>, // dataIndex: "name",
      key: "role_type",
      sorter: (a, b) => {
        const nameA = `${a.role_type} ${a.role_type}`.toUpperCase();
        const nameB = `${b.role_type} ${b.role_type}`.toUpperCase();
        return nameA.localeCompare(nameB);
      },
      width: "8vw",
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      render: (row) => (
        <div className="flex items-center justify-center">
          <p className="text-[1.1vw] text-[#1F4B7F]">{`${capitalizeFirstLetter(row?.role_type)}`}</p>
        </div>
      ),
    },

    {
      title: <div className="flex items-center justify-center font-bold text-[1.2vw]">Mobile</div>,
      key: "mobile",
      sorter: (a, b) => a.phone?.length - b.phone?.length,
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
      title: <div className="flex items-center justify-center  font-bold text-[1.2vw]">Email</div>,
      // dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email_id?.length - b.email_id?.length,
      sortOrder: sortedInfo.columnKey === "email" ? sortedInfo.order : null,
      ellipsis: true,
      width: "15vw",
      render: (row) => {
        return (
          // <div className="flex items-center justify-center">
          //   <p className="text-[1.1vw] text-[#1F4B7F]">{row.email_id}</p>
          // </div>
          <div flex items-center justify-center>
            {row?.email_id?.length > 18 ? (
              <Tooltip
                placement="top"
                title={row?.email_id}
                className="cursor-pointer"
              >
                <div className="text-[1.1vw] text-center text-[#1f4b7f]">
                  {" "}
                  {`${row?.email_id?.slice(0, 18)}...`}
                </div>
              </Tooltip>
            ) : (
              <div className="text-[1.1vw] text-center text-[#1f4b7f]">
                {row?.email_id?.slice(0, 18)}
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
              {dayjs(row.created_date).format("MMM DD hh:mm a")}
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
              className={`${row.emp_status_id == 0
                  ? "bg-[#FF6B00]"
                  : row.emp_status_id == 1
                    ? "bg-[#38ac2c]"
                    : row.emp_status_id == 2
                      ? "bg-[#FD3434]"
                      : "bg-[#2A99FF]"
                } ${row.emp_status_id == 0 ? "cursor-not-allowed" : "cursor-pointer"
                } h-[1.8vw] text-[1.1vw] text-white w-[8vw] rounded-[0.5vw]`}
                onClick={() => {
                  if (row.emp_status_id !== 0) {
                    setViewModal(true);
                    setemployee_id(
                      user.startsWith("tbs-pro")
                        ? row.tbs_pro_emp_id
                        : row.tbs_op_emp_id
                    );
                  }
                }}
            >
              {capitalizeFirstLetter(row.emp_status)}
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
      width: "7vw",
      render: (row) => {
        console.log(
          user?.startsWith("tbs-pro") ? row.tbs_pro_emp_id : row.tbs_op_emp_id,
          "rowrowrow"
        );
        return (
          <div className="flex items-center justify-center">
            <Space>
              <MdModeEditOutline
                onClick={() => {
                  setModalIsOpen(true);

                  if (user?.startsWith("tbs-pro")) {
                    SetUpdateData(row.tbs_pro_emp_id);
                    setemployee_id(row.tbs_pro_emp_id);
                    setEmployeeID(row.tbs_pro_emp_id);
                    console.log(row.tbs_pro_emp_id, "----owner id");
                  } else {
                    SetUpdateData(row.tbs_op_emp_id);
                    setemployee_id(row.tbs_op_emp_id);
                    setEmployeeID(row.tbs_op_emp_id);
                    console.log(row.tbs_op_emp_id, "----op id");
                  }
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
                  setDeleteEmpModalIsOpen(true);
                  if (user?.startsWith("tbs-pro")) {
                    setemployee_id(row.tbs_pro_emp_id);
                    console.log(row.tbs_pro_emp_id, "----owner id");
                    setUserName(`${row.emp_first_name}${" "}${row.emp_last_name}`)
                  } else {
                    setemployee_id(row.tbs_op_emp_id);
                    console.log(row.tbs_op_emp_id, "----op id");
                    setUserName(`${row.emp_first_name}${" "}${row.emp_last_name}`)
                  }
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
    setDeleteEmpModalIsOpen(false);
  };
  console.log(currentData, "wefwefewfcewskjfbjksdvkjdfv");
  const apiUrl = process.env.REACT_APP_API_URL;

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
        show={deleteEmpmodalIsOpen}
        onClose={closeDeleteModal}
        height="20vw"
        width="30vw"
        closeicon={false}
      >
        <DeleteList
          setDeleteModalIsOpen={setDeleteEmpModalIsOpen}
          title={`Want to delete this User ${capitalizeFirstLetter(userName)}`}
          api={
            user?.startsWith("tbs-pro")
              ? `${apiUrl}/pro-emp-personal-details/${employee_id}`
              : `${apiUrl}/emp-personal-details/${employee_id}`
          }
          module={"employee"}
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
        <EmployeeStatusUpdate
          employeeid={employee_id}
          setViewModal={setViewModal}
        />
      </ModalPopup>
    </>
  );
};

export default EmployeeTableList;
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
