import React, { useEffect } from "react";
import Backdrop from "../../asserts/CRMbg.png";
import { Tag, Collapse, Table, Pagination } from "antd";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { IoIosArrowUp, IoIosArrowDown, IoMdAdd } from "react-icons/io";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { useState } from "react";
import { LuEye } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import "../../App.css";
import ModalPopup from "../Common/Modal/Modal";
import UserManagementList from "./CreateActiveRole";
import axios from "axios";
import { render } from "@testing-library/react";
import AddPermission from "./CreatePermission";
import CreateActiveRole from "./CreateActiveRole";
import CreatePermission from "./CreatePermission";
import Permission from "./Permissions";
import DeleteList from "../Offers/DeleteList";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import {
  GetRolesData,
  GetRoleCount,
  GetOpEmpCount,
  GetProEmpCount,
  handleOpSearch,
  handleProSearch,
} from "../../Api/Role&Responsibilites/ActiveRoles";
import { GetPermissionCount } from "../../Api/Role&Responsibilites/ActivePermission";
import { capitalizeFirstLetter } from "../Common/Captilization";
import ReactPaginate from "react-js-pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import { IoSearch } from "react-icons/io5";
const { Panel } = Collapse;

export default function Roles() {
  const [roleData, SetRoleData] = useState([]);
  const [rolesid, SetRolesId] = useState(null);
  const [updatedata, SetUpdateData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [roledata, setRoleData] = useState("");
  const getrolelist = useSelector((state) => state.crm.role_list);
  const getRoleCount = useSelector((state) => state.crm.roles_count);
  const getOpEmpCount = useSelector((state) => state.crm.op_emp_count);
  const getProEmpCount = useSelector((state) => state.crm.pro_emp_count);
  const getPermissionCount = useSelector((state) => state.crm.permission_count);
  const [deletemodalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState("Product Owner");
  const [tabType, setTabType] = useState("OP-EMPRole");

  // const paginatedData = getrolelist?.length > 0 && getrolelist?.slice(
  //   (currentPage - 1) * pageSize,
  //   currentPage * pageSize
  // );

  const countList = tabType === "OP-EMPRole" ? getOpEmpCount : getProEmpCount;

  const paginatedData =
    getrolelist && getrolelist?.length > 0
      ? getrolelist?.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      : [];

  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    GetRolesData(dispatch);
    //GetRoleCount(dispatch);
    GetPermissionCount(dispatch);
    GetOpEmpCount(dispatch);
    GetProEmpCount(dispatch);
  }, []);

  const Search = (e) => {
    if (tabType == "OP-EMPRole") {
      handleOpSearch(e, dispatch);
    } else {
      handleProSearch(e, dispatch);
    }
  };

  const roleColumns = [
    {
      title: <span className="text-[1.1vw] font-bold pl-[2vw]">ID</span>,
      key: "role_id",
      //  dataIndex: "id",
      render: (row) => {
        return (
          <span className="flex">
            <h1 className="text-[1vw] pl-[2vw]">{row?.role_id}</h1>
          </span>
        );
      },
    },
    {
      title: <span className="text-[1.1vw] font-bold">User</span>,
      key: "role",
      render: (row) => {
        return (
          <span className="flex">
            <p className="text-[1vw]">{capitalizeFirstLetter(row?.user)}</p>
          </span>
        );
      },
      // Conditionally set `className` to hide/show based on `viewMode`
      className: viewMode === "Operator" ? "hidden" : "",
    },
    {
      title: <span className="text-[1.1vw] font-bold">Role Type</span>,
      key: "role",
      render: (row) => {
        return (
          <span className="flex">
            <p className="text-[1vw]">{row?.role_type}</p>
          </span>
        );
      },
    },
    {
      title: <span className="text-[1.1vw] font-bold">Member Count</span>,
      key: "role_member_count",
      render: (row) => {
        return (
          <span className="flex">
            <p className="text-[1vw]">{row?.role_member_count}</p>
          </span>
        );
      },
    },
    {
      title: <span className="text-[1.1vw] font-bold">Description</span>,
      key: "description",
      render: (row) => {
        return (
          <span className="flex">
            <p className="text-[1vw]">{row?.description}</p>
          </span>
        );
      },
    },
    {
      title: <span className="text-[1.1vw] font-bold">Created</span>,
      render: (row) => {
        return (
          <span className="flex">
            <p className="text-[1vw]">{`${dayjs(row?.created_date).format(
              "DD MMM YY - hh:mm a"
            )}`}</p>
          </span>
        );
      },
    },
    {
      title: <span className="text-[1.1vw] font-bold">Updated</span>,
      render: (row) => {
        return (
          <span className="flex">
            <p className="text-[1vw]">{`${dayjs(row?.updated_date).format(
              "DD MMM YY - hh:mm a"
            )}`}</p>
          </span>
        );
      },
    },
    {
      title: <span className="text-[1.1vw] font-bold">Actions</span>,
      //dataIndex: "actions",
      render: (row) => {
        const handleDelete = () => {
          setDeleteModalIsOpen(true);
          console.log("iconffffffid", row?.role_id);
          SetRolesId(row.role_id);
        };

        return (
          <span className="action-icons flex gap-2">
            <MdModeEdit
              className="h-[1.8vw] w-[1.8vw] cursor-pointer"
              onClick={() => {
                setIsModalOpen(true);
                SetUpdateData(row.role_id);
              }}
              color="#1F4B7F"
            />
            <MdDelete
              className="h-[1.8vw] w-[1.8vw] cursor-pointer"
              onClick={handleDelete}
              color="#1F4B7F"
            />
            <i
              className="pi pi-ellipsis-v text-[#1F4B7F] pt-[0.2vw]"
              style={{ fontSize: "1.25rem" }}
            ></i>
          </span>
        );
      },
      // Conditionally set `className` to hide/show based on `viewMode`
      className: viewMode === "Operator" ? "hidden" : "",
    },
  ];

  // const pageSize = 3;
  const [permissionid, SetPermissionId] = useState("");
  const [permissionupdate, SetPermissionUpdate] = useState(null);
  const [active, setActive] = useState("1");

  const handleCollapseChange = (key) => {
    if (active !== key) {
      setActive(key);
    }
  };

  // const handlePageChange = (page, pageSize) => {
  //   setCurrentPage(page);
  //   setPageSize(pageSize);
  // };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState("");
  const showModal = () => {
    setIsModalOpen(true);
  };
  const [permissionData, SetPermissionData] = useState();

  console.log(permissionData, "permission data");

  const closeModal = () => {
    setIsModalOpen(false);
    setIsPermissionModalOpen(false);
    SetPermissionData();
    SetPermissionUpdate(null);
    SetUpdateData(null);
    setRoleData("");
  };

  const roles = [
    { role: "Admin", color: "#22c55e", userCount: 1, permissions: 3 },
  ];

  const permissions = [
    {
      id: 1,
      name: "Can View Users",
      roleCount: 1,
      userCount: getPermissionCount.view,
    },
    {
      id: 2,
      name: "Can Create Users",
      roleCount: 1,
      userCount: getPermissionCount.create,
    },
    {
      id: 3,
      name: "Can Update Users",
      roleCount: 1,
      userCount: getPermissionCount.update,
    },
    {
      id: 4,
      name: "Can Delete Users",
      roleCount: 1,
      userCount: getPermissionCount.delete,
    },
  ];

  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 3; // Number of items to display per page

  // Calculate pagination slice based on activePage
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    getrolelist?.length > 0 &&
    getrolelist?.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };
  console.log(isPermissionModalOpen, "isPermissionModalOpen");
  return (
    <>
      <div
        className="h-screen w-screen"
        style={{
          backgroundImage: `url(${Backdrop})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="h-[92vw] w-full left-[5%] right-[5%] px-[5vw]">
          <p className="text-[#1F487C] text-[1.4vw] font-bold pt-[0.5vw]">
            {" "}
            ROLES AND RESPONSIBILITES{" "}
          </p>
          <div className="flex items-center h-[30vh] justify-between">
            <div className="h-full rounded-[1vw] bg-white border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.3vw] border-[#1F487C]">
              <p className="text-white h-[6vh] rounded-tr-[0.8vw] rounded-tl-[0.8vw] bg-[#1F487C] font-medium text-[1.3vw] pt-[0.3vw] pb-[0.1vw]">
                <div className="flex ml-[0.5vw]">
                  <div
                    className={`cursor-pointer ${
                      tabType == "OP-EMPRole"
                        ? "border-b-[0.30vw] font-medium border-[#ffffff]"
                        : ""
                    }`}
                    onClick={() => setTabType("OP-EMPRole")}
                  >
                    <p className="text-[1.1vw] text-[#ffffff] text-center">
                      OP-EMP Role
                    </p>
                  </div>
                  <div
                    className={`cursor-pointer ml-[2vw] ${
                      tabType == "PRO-EMPRole"
                        ? "border-b-[0.30vw] font-medium border-[#ffffff]"
                        : ""
                    }`}
                    onClick={() => setTabType("PRO-EMPRole")}
                  >
                    <p className="text-[1.1vw] text-[#ffffff] text-center">
                      PRO-EMP Role
                    </p>
                  </div>
                  <div className="pl-[2.9vw]">
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        className="bg-white outline-none pl-[2vw] text-black w-[15vw] h-[5vh] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] 
                    rounded-[0.5vw] border-r-[0.2vw] border-b-[0.2vw]"
                        placeholder="Search Ads"
                        onChange={(e) => {
                          Search(e);
                        }}
                      />
                      <IoSearch
                        className="absolute left-[0.5vw]"
                        size={"1vw"}
                        color="#1F4B7F"
                      />
                    </div>
                  </div>
                </div>
              </p>
              <div className="h-[23vh] overflow-y-scroll  w-[35vw] flex flex-col ">
                {countList.length > 0 &&
                  countList?.map((role, index) => (
                    <div key={index}>
                      <div className="flex h-[6vh] border-t border-[#1F487C] items-center">
                        <div className="flex items-center px-[0.5vw] justify-between  w-full">
                          <div className="flex items-center w-full">
                            <span className="">
                              <IoMdAdd
                                className="w-[1.3vw] h-[1.3vw]"
                                color="#1F487C"
                              />
                            </span>
                            <span className="">
                              <p className="text-[1vw] font-medium text-[#1F487C]">
                                Role:
                              </p>
                            </span>
                            <span className="">
                              <p
                                // className={`text-[1vw] font-medium text-[${role.color}]`}
                                className={`text-[1vw] font-medium text-[#3ba532]`}
                              >
                                {capitalizeFirstLetter(role?.role)}
                              </p>
                            </span>
                          </div>
                          <div className="pr-[1vw]">
                            <div
                              className="flex rounded-[2vh] text-white items-center justify-center w-[5vw] text-[1vw] py-[0.3vh]"
                              style={{
                                backgroundColor: "#289f40",
                              }}
                            >
                              {" "}
                              {`${role?.role_count} User`}{" "}
                            </div>
                          </div>
                          <div className="">
                            <div className="flex rounded-[2vh] bg-[#D9D9D9] items-center justify-center w-[8vw] text-[1vw] py-[0.3vh]">
                              {" "}
                              {`${role?.permission_access_count} Permissions`}{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="h-full rounded-[1vw] bg-white border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.3vw] border-[#1F487C]">
              <p className="text-white h-[6vh] rounded-tr-[0.8vw] rounded-tl-[0.8vw] bg-[#1F487C] font-medium text-[1.3vw] pt-[0.6vw] pb-[0.6vw] pl-[1.6vw]">
                Permissions
              </p>
              <div className="h-[24vh]  w-[35vw] flex flex-col ">
                {permissions.map((permission, index) => (
                  <div key={index}>
                    <div className="flex h-[6vh] border-t border-[#1F487C] items-center">
                      <div className="flex items-center px-[0.5vw] justify-between  w-full">
                        <div className="flex items-center w-full">
                          <span className="">
                            <IoMdAdd
                              className="w-[1.3vw] h-[1.3vw]"
                              color="#1F487C"
                            />
                          </span>

                          <span className="">
                            <p className={`text-[1vw] font-medium`}>
                              {permission.name}
                            </p>
                          </span>
                        </div>
                        <div className="">
                          <div className="flex rounded-[2vh] bg-[#D9D9D9] items-center justify-center w-[5vw] text-[1vw] py-[0.3vh]">
                            {" "}
                            {`${permission.userCount} User`}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-[1.5vw]">
            <Collapse
              accordian
              activeKey={active}
              onChange={() => handleCollapseChange("1")}
              size="large"
              className="bg-[#1F487C] rounded-2xl border border-[#1F487C]"
              expandIcon={({ isActive }) =>
                isActive ? (
                  <IoIosArrowUp
                    className=""
                    style={{ color: "#FFFFFF", height: "2vw", width: "1.8vw" }}
                  />
                ) : (
                  <IoIosArrowDown
                    className=""
                    style={{ color: "#FFFFFF", height: "2vw", width: "1.8vw" }}
                  />
                )
              }
              expandIconPosition="end"
            >
              <Panel
                key="1"
                header={
                  <div className="flex justify-between items-center ">
                    <span className="text-[#FFFFFF] font-medium text-[1.2vw] pl-[1vw]">
                      ACTIVE ROLES
                    </span>
                    {viewMode !== "Operator" && (
                      <div
                        className="flex items-center"
                        onClick={() => setIsModalOpen(true)}
                      >
                        <HiOutlineDocumentPlus className="text-[#FFFFFF] mr-[0.6vw] h-[1.5vw] w-[1.6vw]" />
                        <span className="text-[#FFFFFF] font-medium text-[1vw]">
                          Create New Role
                        </span>
                      </div>
                    )}
                  </div>
                }
              >
                <div>
                  <Table
                    dataSource={currentItems}
                    columns={roleColumns}
                    size="middle"
                    pagination={false}
                    rowClassName={(record, index) =>
                      index % 2 === 1 ? "bg-white" : "bg-[#1F487C]/[10%]"
                    }
                  />
                  <div className="w-full h-[8vh] px-[1vw] flex justify-between items-center">
                    <div className="text-[#1f4b7f]  flex text-[1.1vw] gap-[0.5vw]">
                      <span>Showing</span>
                      <span className="font-bold">1 - {pageSize}</span>
                      <span>from</span>
                      <span className="font-bold">
                        {getrolelist?.length > 0 && getrolelist?.length}
                      </span>
                      <span>data</span>
                    </div>
                    <div>
                      {/* <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={getofferlist?.length}
                  onChange={handlePageChange}
                  onShowSizeChange={handlePageChange}
                  // showSizeChanger
                /> */}
                      <ReactPaginate
                        activePage={activePage}
                        itemsCountPerPage={itemsPerPage}
                        totalItemsCount={getrolelist?.length}
                        pageRangeDisplayed={3}
                        onChange={handlePageChange}
                        itemClass="page-item"
                        linkClass="page-link"
                        activeClass="active"
                        prevPageText={
                          <FontAwesomeIcon icon={faChevronLeft} size="1vw" />
                        }
                        nextPageText={
                          <FontAwesomeIcon icon={faChevronRight} size="1vw" />
                        }
                        firstPageText={
                          <FontAwesomeIcon
                            icon={faAngleDoubleLeft}
                            size="1vw"
                          />
                        }
                        lastPageText={
                          <FontAwesomeIcon
                            icon={faAngleDoubleRight}
                            size="1vw"
                          />
                        }
                      />

                      {/* <input
                type="file"
                // onChange={(e) => console.log(e.target.value, "datatatat")}
                onChange={(e) => handleSubmit(e)}
              /> */}
                    </div>
                  </div>
                  <ModalPopup
                    show={deletemodalIsOpen}
                    onClose={closeDeleteModal}
                    height="20vw"
                    width="30vw"
                    closeicon={false}
                  >
                    <DeleteList
                      setDeleteModalIsOpen={setDeleteModalIsOpen}
                      title={"Want to delete this User Role"}
                      api={`http://192.168.90.47:4000/api/role/${rolesid}`}
                      module={"roles"}
                    />
                  </ModalPopup>
                </div>
              </Panel>
            </Collapse>

            <Collapse
              accordian
              activeKey={active}
              onChange={() => handleCollapseChange("2")}
              style={{
                marginTop: "1vw",
                borderColor: "#1F487C",
                borderRadius: "1rem",
                borderWidth: "1px",
                borderStyle: "solid",
              }}
              size="large"
              className="bg-[#1F4B7F]"
              expandIcon={({ isActive }) =>
                isActive ? (
                  <IoIosArrowUp
                    className="mt-[0.5vw]"
                    style={{ color: "#FFFFFF", height: "2vw", width: "1.8vw" }}
                  />
                ) : (
                  <IoIosArrowDown
                    className="mt-[0.5vw]"
                    style={{ color: "#FFFFFF", height: "2vw", width: "1.8vw" }}
                  />
                )
              }
              expandIconPosition="end"
            >
              <Panel
                key="2"
                header={
                  <div className="flex justify-between items-center">
                    <span className="text-[#FFFFFF] font-medium text-[1.2vw] pl-[1vw]">
                      ACTIVE PERMISSIONS
                    </span>
                    <div
                      className="flex items-center"
                      onClick={() => {
                        setIsPermissionModalOpen(true);
                        SetPermissionData();
                        SetPermissionUpdate(null);
                      }}
                    >
                      <HiOutlineDocumentPlus className="text-[#FFFFFF] h-[1.5vw] w-[1.6vw]" />
                      <span className="text-white font-medium text-[1vw] pl-[0.5vw]">
                        Create New Permission
                      </span>
                    </div>
                  </div>
                }
              >
                <Permission
                  setIsPermissionModalOpen={setIsPermissionModalOpen}
                  permission={permissionid}
                  SetPermissionUpdate={SetPermissionUpdate}
                  permissionupdate={permissionupdate}
                  SetPermissionId={SetPermissionId}
                />
              </Panel>
            </Collapse>
          </div>
        </div>
      </div>
      <ModalPopup
        className=" border border-[#1f487c] border-b-8 border-r-8 rounded-md"
        show={isPermissionModalOpen}
        onClose={closeModal}
        setIsPermissionModalOpen={setIsPermissionModalOpen}
        height="auto"
        width="600px"
      >
        <CreatePermission
          permissionupdate={permissionupdate}
          setIsPermissionModalOpen={setIsPermissionModalOpen}
          SetPermissionData={SetPermissionData}
          permissionData={permissionData}
          permissionid={permissionid}
        />
      </ModalPopup>
      <ModalPopup
        className=" border border-[#1f487c] border-b-8 border-r-8 rounded-md"
        show={isModalOpen}
        onClose={closeModal}
        setIsModalOpen={setIsModalOpen}
        height="auto"
        width="600px"
      >
        <CreateActiveRole
          updatedata={updatedata}
          SetUpdateData={SetUpdateData}
          setIsModalOpen={setIsModalOpen}
          roledata={roledata}
          setRoleData={setRoleData}
        />
      </ModalPopup>
    </>
  );
}
