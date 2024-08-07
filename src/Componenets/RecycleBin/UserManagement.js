import React from "react";
import { Space, Table } from "antd";
import { TbRestore } from "react-icons/tb";
import { MdDelete } from "react-icons/md";

export default function User_Management() {
  const columns = [
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">Photo</div>
      ),
      // dataIndex: "photo",
      // key: "photo",
      width: "10vw",
    },

    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">
          Member Name
        </div>
      ),
      // dataIndex: "name",
      // key: "name",
      width: "13vw",
    },
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">Mobile</div>
      ),
      // dataIndex: "mobile",
      // key: "mobile",
    },
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">Email</div>
      ),
      // dataIndex: "email",
      // key: "email",
    },
    {
      title: (
        <div className="flex justify-center  font-bold text-[1.2vw]">
          Created
        </div>
      ),
      // dataIndex: "created",
      // key: "created",
    },
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">Status</div>
      ),
      // dataIndex: "status",
      // key: "status",
      width: "10vw",
    },
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">Action</div>
      ),
      // dataIndex: "action",
      // key: "action",
      width: "10vw",
      render: (row) => {
        return (
          <Space>
            <TbRestore
              // onClick={() => handleMenu()}
              size="1.2vw"
              style={{
                cursor: "pointer",
                justifyContent: "center",
                display: "flex",
              }}
              color="#1f487c"
            />
            <MdDelete
              // onClick={() => handleDelete(row)}
              size="1.4vw"
              style={{
                cursor: "pointer",
                display: "grid",
                justifyContent: "center",
              }}
              color="#1f487c"
            />
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        // dataSource={admindata}
        // onChange={handleChange}
        pagination={false}
        className="custom-table"
      />
    </>
  );
}
