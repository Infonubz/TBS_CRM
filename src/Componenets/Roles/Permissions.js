import { useEffect, useState } from "react";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import ModalPopup from "../Common/Modal/Modal";
import CreatePermission from "./CreatePermission";
import axios from "axios";
import { MdDelete, MdModeEdit } from "react-icons/md";
import DeleteList from "../Offers/DeleteList";
import dayjs from "dayjs";
import { LuEye } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { GetPermissionData } from "../../Api/Role&Responsibilites/ActivePermission";
import { Table, Pagination, Tooltip } from "antd";
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
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [rolePage, setRolePage] = useState(1);
  const [deletemodalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [deleteid, setdelete] = useState();
  const getpermissionlist = useSelector((state) => state.crm.permission_list);
  const [viewMode, setViewMode] = useState("Product Owner");
  const apiUrl = process.env.REACT_APP_API_URL;

  const dispatch = useDispatch();
  useEffect(() => {
    GetPermissionData(dispatch);
  }, []);

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
    setDeleteModalIsOpen(false);
  };

  const permissionColumns = [
    {
      title: <span className="text-[1.1vw] font-bold pl-[2vw]">ID</span>,
      render: (row) => {
        return (
          <span className="flex">
            <h1 className="pl-[2vw] text-[1vw]">{row?.permission_id}</h1>
          </span>
        );
      },
    },
    {
      title: <span className="text-[1.1vw] font-bold">User</span>,
      render: (row) => {
        return (
          <span className="flex">
            <h1 className="text-[1vw]">{capitalizeFirstLetter(row?.user)}</h1>
          </span>
        );
      },
      className: viewMode === "Operator" ? "hidden" : "",
    },
    // Role column
    {
      title: <span className="text-[1.1vw] font-bold">Role</span>,
      render: (row) => {
        return (
          <span className="flex">
            <h1 className="text-[1vw]">{row?.role_type}</h1>
          </span>
        );
      },
      // Conditionally set `className` to hide/show based on `viewMode`
      className: viewMode === "product" ? "hidden" : "",
    },
    // Permission column
    {
      title: <span className="text-[1.1vw] font-bold">Permission</span>,
      render: (row) => {
        const permissions = row.crud_permissions || [];
        const icons = {
          view: (
            <Tooltip className="cursor-pointer" color="#1F487C" title="View">
              <LuEye size={"1.5vw"} key="view" />
            </Tooltip>
          ),
          create: (
            <Tooltip className="cursor-pointer" color="#1F487C" title="Create">
              <HiOutlineDocumentPlus size={"1.4vw"} key="create" />
            </Tooltip>
          ),
          update: (
            <Tooltip className="cursor-pointer" color="#1F487C" title="Update">
              <FiEdit size={"1.2vw"} key="update" />
            </Tooltip>
          ),
          delete: (
            <Tooltip className="cursor-pointer" color="#1F487C" title="Delete">
              <RiDeleteBin6Line size={"1.3vw"} key="delete" />
            </Tooltip>
          ),
        };

        return (
          <span className="flex gap-6">
            {permissions.includes("view") && icons.view}
            {permissions.includes("create") && icons.create}
            {permissions.includes("update") && icons.update}
            {permissions.includes("delete") && icons.delete}
          </span>
        );
      },
    },
    // Module Permission column
    {
      title: <span className="text-[1.1vw] font-bold">Module Permission</span>,
      render: (row) => {
        const modulePermissions = row?.module_permissions || [];
        const moduleNames = modulePermissions.map(
          (permission) => permission.module_name
        );
        const moduleName = moduleNames.join(", ");

        return (
          <div className="flex items-center">
            {moduleName.length > 20 ? (
              <Tooltip
                placement="bottom"
                title={moduleName}
                className="cursor-pointer"
                color="#1F487C"
              >
                <h1 className="text-[1.1vw]">{`${moduleName.slice(
                  0,
                  20
                )}...`}</h1>
              </Tooltip>
            ) : (
              <h1 className="text-[1.1vw]">{moduleName}</h1>
            )}
          </div>
        );
      },
    },
    // Created column
    {
      title: <span className="text-[1.1vw] font-bold">Created</span>,
      render: (row) => {
        return (
          <span className="flex">
            <h1 className="text-[1vw]">{`${dayjs(row?.created_date).format(
              "DD MMM YY - hh:mm a"
            )}`}</h1>
          </span>
        );
      },
    },
    // Updated column
    {
      title: <span className="text-[1.1vw] font-bold">Updated</span>,
      render: (row) => {
        return (
          <span>
            <h1 className="text-[1vw]">{`${dayjs(row?.updated_date).format(
              "DD MMM YY - hh:mm a"
            )}`}</h1>
          </span>
        );
      },
    },
    // Actions column
    {
      title: <span className="text-[1.1vw] font-bold">Actions</span>,
      render: (row) => {
        const handleDelete = () => {
          setDeleteModalIsOpen(true);
          console.log("DeleteID", row?.permission_id);
          setdelete(row.permission_id);
        };
        return (
          <span className="action-icons flex gap-2">
            <MdModeEdit
              className="h-[1.8vw] w-[1.8vw] cursor-pointer"
              onClick={() => {
                SetPermissionUpdate(row.role_id);
                console.log(row.role_id, "permissionid permissionid");
                setIsPermissionModalOpen(true);
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
    },
  ];

  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 3; // Number of items to display per page

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
  return (
    <>
      <div>
        <Table
          columns={permissionColumns}
          dataSource={currentItems}
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
              {getpermissionlist?.length > 0 && getpermissionlist?.length}
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
              prevPageText={<FontAwesomeIcon icon={faChevronLeft} size="1vw" />}
              nextPageText={
                <FontAwesomeIcon icon={faChevronRight} size="1vw" />
              }
              firstPageText={
                <FontAwesomeIcon icon={faAngleDoubleLeft} size="1vw" />
              }
              lastPageText={
                <FontAwesomeIcon icon={faAngleDoubleRight} size="1vw" />
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
            title={"want to delete this user permission"}
            api={`${apiUrl}/permissions/${deleteid}`}
            module={"roles"}
          />
        </ModalPopup>
      </div>
    </>
  );
}
