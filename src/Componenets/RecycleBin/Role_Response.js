import React from "react";
import { Table } from "antd";
import { TbRestore } from "react-icons/tb";
import { MdDelete } from "react-icons/md";

export default function Roles_Response() {
  const roleColumns = [
    {
      title: (
        <span className="flex justify-center text-[1.1vw] font-bold pl-[2vw]">
          ID
        </span>
      ),
      //  dataIndex: "id",
      // render: (row) => {
      //   return (
      //     <span className="flex">
      //       <h1 className="text-[1vw] pl-[2vw]">{row?.id}</h1>
      //     </span>
      //   );
      // },
    },
    {
      title: (
        <span className="flex justify-center text-[1.1vw] font-bold">Name</span>
      ),
      key: "name",
      // render: (row) => {
      //   return (
      //     <span className="flex">
      //       <p className="text-[1vw]">{row?.role_type}</p>
      //     </span>
      //   );
      // },
    },
    {
      title: (
        <span className="flex justify-center text-[1.1vw] font-bold">
          Description
        </span>
      ),
      key: "description",
      // render: (row) => {
      //   return (
      //     <span className="flex">
      //       <p className="text-[1vw]">{row?.description}</p>
      //     </span>
      //   );
      // },
    },
    {
      title: (
        <span className="flex justify-center text-[1.1vw] font-bold">
          Permissions
        </span>
      ),
      // dataIndex: "permissions",
      // render: (row) => {
      //   const permissions = row.permissions || [];
      //   const icons = {
      //     view: <LuEye size={"1.5vw"} key="view" />,
      //     create: <HiOutlineDocumentPlus size={"1.5vw"} key="create" />,
      //     delete: <RiDeleteBin6Line size={"1.5vw"} key="delete" />,
      //   };

      //   return (
      //     <span className="flex gap-6">
      //       {permissions.includes("view") && icons.view}
      //       {permissions.includes("create") && icons.create}
      //       {permissions.includes("delete") && icons.delete}
      //     </span>
      //   );
      // },
    },
    {
      title: (
        <span className="flex justify-center text-[1.1vw] font-bold">
          Created
        </span>
      ),
      // render: (row) => {
      //   return (
      //     <span className="flex">
      //       <p className="text-[1vw]">{`${dayjs(row?.created_date).format(
      //         "DD MMM YY - hh:mm a"
      //       )}`}</p>
      //     </span>
      //   );
      // },
    },
    {
      title: (
        <span className="flex justify-center text-[1.1vw] font-bold">
          Updated
        </span>
      ),
      // render: (row) => {
      //   return (
      //     <span className="flex">
      //       <p className="text-[1vw]">{`${dayjs(row?.updated_date).format(
      //         "DD MMM YY - hh:mm a"
      //       )}`}</p>
      //     </span>
      //   );
      // },
    },
    {
      title: (
        <span className="flex justify-center text-[1.1vw] font-bold">
          Actions
        </span>
      ),
      //dataIndex: "actions",
      render: (row) => {
        // const handleDelete = () => {
        //   setDeleteModalIsOpen(true);
        //   console.log("iconffffffid", row?.id);
        //   SetRolesId(row.id);
        // };

        return (
          <span className="action-icons flex gap-2">
            <TbRestore
              className="h-[1.8vw] w-[1.8vw] cursor-pointer"
              // onClick={() => {
              //   setIsModalOpen(true);
              //   SetUpdateData(row.id);
              // }}
              color="#1F4B7F"
            />
            <MdDelete
              className="h-[1.8vw] w-[1.8vw] cursor-pointer"
            //   onClick={handleDelete}
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

  return (
    <>
      <Table
        // dataSource={currentData}
        className="custom-table"
        columns={roleColumns}
        size="middle"
        pagination={false}
      />
    </>
  );
}
