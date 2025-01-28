import { useEffect, useState } from "react";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import ModalPopup from "../Common/Modal/Modal";
// import CreatePermission from "./CreatePermission";
// import axios from "axios";
import { MdDelete, MdModeEdit } from "react-icons/md";
import DeleteList from "../Offers/DeleteList";
import dayjs from "dayjs";
import { LuEye } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { GetPermissionData } from "../../Api/Role&Responsibilites/ActivePermission";
import {
  Table,
  // Pagination, 
  Tooltip
} from "antd";
import { capitalizeFirstLetter } from "../Common/Captilization";
import ReactPaginate from "react-js-pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
export default function Permission({
  setIsPermissionModalOpen,
  SetPermissionId,
  permissionid,
  SetPermissionUpdate,
  permissionupdate,
  SetFilter,
  filter,
  setPermission
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  //const [rolePage, setRolePage] = useState(1);
  const [deletemodalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [deleteid, setdelete] = useState();
  const getpermissionlist = useSelector((state) => state.crm.permission_list);
  const [viewMode, setViewMode] = useState("Product Owner");
  const apiUrl = process.env.REACT_APP_API_URL;
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 3; // Number of items to display per page
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const userId = sessionStorage.getItem("USER_ID");
  const type_id = sessionStorage.getItem("type_id");


  const storedCrudPermissions = sessionStorage.getItem("crud_permission");
  const crudPermissions = storedCrudPermissions
    ? storedCrudPermissions.split(",")
    : [];

  // const showCreateIcon = crudPermissions.includes("create");
  const showEditIcon = crudPermissions.includes("update");
  const showDeleteIcon = crudPermissions.includes("delete");
  // const showViewIcon = crudPermissions.includes("view");

  const type = type_id === "PRO101" || type_id === "OP101";


  const permissionData = async (filter) => {
    try {
      const data = await GetPermissionData(filter, dispatch);
      console.log(data, "permission data");
    }
    catch (error) {
      console.error(error, "Error fetching data");
    }
  }

  const paginatedData =
    getpermissionlist?.length > 0 &&
    getpermissionlist?.filter(
      (item) =>
        (item.crud_permissions && item.crud_permissions.length > 0) ||
        (item.module_permissions && item.module_permissions.length > 0)
    )
      .slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // const handlePageChange = (page, pageSize) => {
  //   setCurrentPage(page);
  //   setPageSize(pageSize);
  // };

  const closeDeleteModal = () => {
    setPermission(true);
    setDeleteModalIsOpen(false);
  };

  const permissionColumns = [
    // {
    //   title: <span className="text-[1.1vw] font-bold pl-[2vw]">ID</span>,
    //   render: (row) => {
    //     return (
    //       <span className="flex">
    //         <h1 className="pl-[2vw] text-[1vw]">{row?.permission_id}</h1>
    //       </span>
    //     );
    //   },
    // },
    // {
    //   title: <span className="text-[1.1vw] font-bold pl-[2vw]">User</span>,
    //   render: (row) => {
    //     return (
    //       <span className="flex">
    //         <h1 className="text-[1vw] pl-[2vw]">{capitalizeFirstLetter(row?.user ==="operator" || row?.user ==="Operator" ? "Operator Employee" : "Product Owner Employee")}</h1>
    //       </span>
    //     );
    //   },
    //   className: viewMode === "Operator" ? "hidden" : "",
    // },
    // Role column
    {
      title: <span className="text-[1.1vw] font-bold text-[#1F487C] pl-[2.5vw]">Role</span>,
      render: (row) => {
        return (
          <span className="flex items-center pl-[2.5vw]">
            <h1 className="text-[1vw] text-[#1F487C]">    {
              row?.role_type?.length > 18 ? (
                <Tooltip color="white"
                  overlayInnerStyle={{ color: "#1F4B7F" }} title={capitalizeFirstLetter(row?.role_type)}>
                  <span>
                    {`${row?.role_type?.charAt(0) === row?.role_type?.charAt(0)?.toLowerCase()
                      ? capitalizeFirstLetter(row?.role_type).slice(0, 18)
                      : row?.role_type?.slice(0, 18)}...`}
                  </span>

                </Tooltip>
              ) : (
                <span>
                  {row?.role_type?.charAt(0) === row?.role_type?.charAt(0)?.toLowerCase()
                    ? capitalizeFirstLetter(row?.role_type)
                    : row?.role_type}
                </span>

              )
            }</h1>
          </span>
        );
      },
      // Conditionally set `className` to hide/show based on `viewMode`
      className: viewMode === "product" ? "hidden" : "",
    },
    {
      title: <span className="text-[1.1vw] font-bold text-[#1F487C] pl-[2.5vw]">Permission</span>,
      render: (row) => {
        const permissions = row.crud_permissions || [];
        const icons = {
          view: (
            <Tooltip className="cursor-pointer" color="#1F487C" title="View">
              <LuEye size={"1.4vw"} key="view" color="#1F487C" />
            </Tooltip>
          ),
          create: (
            <Tooltip className="cursor-pointer" color="#1F487C" title="Create">
              <HiOutlineDocumentPlus size={"1.3vw"} key="create" color="#1F487C" />
            </Tooltip>
          ),
          update: (
            <Tooltip className="cursor-pointer" color="#1F487C" title="Update">
              <FiEdit size={"1.1vw"} key="update" color="#1F487C" />
            </Tooltip>
          ),
          delete: (
            <Tooltip className="cursor-pointer" color="#1F487C" title="Delete">
              <RiDeleteBin6Line size={"1.2vw"} key="delete" color="#1F487C" />
            </Tooltip>
          ),
        };

        return (
          <span className="flex gap-6 items-center pl-[2.5vw]">
            {permissions.includes("view") && icons.view}
            {permissions.includes("create") && icons.create}
            {permissions.includes("update") && icons.update}
            {permissions.includes("delete") && icons.delete}
          </span>
        );
      },
    },
    {
      title: <span className="text-[1.1vw] font-bold text-[#1F487C] pl-[2.5vw]">Module Permission</span>,
      width: "22vw",
      className: filter === "OP" ? "hidden" : "",
      render: (row) => {
        const modulePermissions = Array.isArray(row?.module_permissions)
          ? row.module_permissions
          : []; // Ensure it's an array
        const moduleNames = modulePermissions.map(
          (permission) => permission.module_name
        );
        const moduleName = moduleNames.join(", ");

        return (
          <div className="flex items-center pl-4">
            {moduleName?.length > 30 ? (
              <Tooltip
                color="#1f4b7f"
                placement="top"
                title={moduleName}
                className="cursor-pointer"
              >
                <div className="text-[1vw] pl-8 text-center text-[#1f4b7f]">
                  {" "}
                  {`${moduleName?.slice(0, 30)}...`}
                </div>
              </Tooltip>
            ) : (
              <div className="text-[1vw] pl-8 text-center text-[#1f4b7f]">
                {moduleName?.slice(0, 30)}
              </div>
            )}
          </div>

        );
      },
    },
    {
      title: <span className="text-[1.1vw] font-bold text-[#1F487C] pl-[2.5vw]">Created</span>,
      render: (row) => {
        return (
          <span className="flex items-center pl-[2.5vw]">
            <h1 className="text-[1vw] text-[#1F487C]">{`${dayjs(row?.created_date).format(
              "DD MMM YY - hh:mm a"
            )}`}</h1>
          </span>
        );
      },
    },
    {
      title: <span className="text-[1.1vw] font-bold text-[#1F487C] pl-[2.5vw]">Updated</span>,
      render: (row) => {
        return (
          <span className="flex items-center pl-[2.5vw]">
            <h1 className="text-[1vw] text-[#1F487C]">{`${dayjs(row?.updated_date).format(
              "DD MMM YY - hh:mm a"
            )}`}</h1>
          </span>
        );
      },
    },
    {
      title: <span className="text-[1.1vw] font-bold text-[#1F487C] pl-[2.5vw]">Actions</span>,
      render: (row) => {
        const handleDelete = () => {
          setUser(row);
          setDeleteModalIsOpen(true);
          if (type_id === "PRO101") {
            setdelete(row.crud_permission_id);
          }
          else {
            setdelete(row.permission_id);
          }
        };
        return (
          <span className="flex items-center gap-2 pl-[2.5vw]">
            {(showEditIcon || type) && (
              <MdModeEdit
                className="h-[1.5vw] w-[1.5vw] cursor-pointer"
                onClick={() => {
                  if (type_id === "PRO101") {
                    SetPermissionUpdate(row.crud_permission_id);
                  } else {
                    SetPermissionUpdate(row.permission_id);
                  }
                  setIsPermissionModalOpen(true);
                }}
                color="#1F4B7F"
              />
            )}
            {(showDeleteIcon || type) && (
              <MdDelete
                className="h-[1.5vw] w-[1.5vw] cursor-pointer"
                onClick={handleDelete}
                color="#1F4B7F"
              />
            )}
            <i
              className="pi pi-ellipsis-v text-[#1F4B7F] pt-[0.2vw]"
              style={{ fontSize: "1.25rem" }}
            ></i>
          </span>
        );
      },
    },
  ];

  // Calculate pagination slice based on activePage
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    getpermissionlist?.length > 0 &&
    getpermissionlist?.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  useEffect(() => {
    permissionData(filter);
  }, [filter]);

  useEffect(() => {
    if (currentItems?.length === 0) {
      setActivePage(activePage - 1);
    }
  }, [currentItems])

  return (
    <>
      <div>
        <Table
          columns={permissionColumns}
          dataSource={currentItems}
          size="middle"
          className="pb-[1vw]"
          pagination={false}
          rowClassName={(record, index) =>
            index % 2 === 1 ? "bg-white" : "bg-[#1F487C]/[10%]"
          }
        />
        {getpermissionlist?.length > 3 ? (
          <div className={`w-full h-[7vh] px-[1vw] flex justify-between items-center`}>
            <div className={`text-[#1f4b7f] flex text-[1vw] gap-[0.5vw]`}>
              <span>Showing</span>
              <span className="font-bold">{currentItems && currentItems?.length > 0
                ? <div>{indexOfFirstItem + 1} - {indexOfFirstItem + currentItems?.length}</div> : '0'}</span>
              <span>from</span>
              <span className="font-bold">
                {getpermissionlist?.length > 0 ? getpermissionlist?.length : 0}
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
                totalItemsCount={getpermissionlist?.length}
                pageRangeDisplayed={3}
                onChange={handlePageChange}
                itemClass="page-item"
                linkClass="page-link"
                activeClass="active"
                prevPageText={<FontAwesomeIcon icon={faChevronLeft} size="0.5vw" />}
                nextPageText={
                  <FontAwesomeIcon icon={faChevronRight} size="0.5vw" />
                }
                firstPageText={
                  <FontAwesomeIcon icon={faAngleDoubleLeft} size="0.5vw" />
                }
                lastPageText={
                  <FontAwesomeIcon icon={faAngleDoubleRight} size="0.5vw" />
                }
              />

              {/* <input
                type="file"
                // onChange={(e) => console.log(e.target.value, "datatatat")}
                onChange={(e) => handleSubmit(e)}
              /> */}
            </div>
          </div>
        ) : ""}

        <ModalPopup
          show={deletemodalIsOpen}
          onClose={closeDeleteModal}
          height="20vw"
          width="30vw"
          closeicon={false}
        >
          <DeleteList
            setDeleteModalIsOpen={setDeleteModalIsOpen}
            title={`want to delete this ${user?.role_type}`}
            api={`${apiUrl}/permissions/${userId}/${deleteid}`}
            module={"permissions"}
            filter={filter}
            setPermission={setPermission}
          />
        </ModalPopup>
      </div>
    </>
  );
}
