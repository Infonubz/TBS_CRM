import { Table } from "antd";

export default function Partner({ columns, data }) {
  return (
    <div className="">
      <Table
        className="custom-table"
        pagination={false}
        dataSource={data}
        columns={columns}
        rowClassName={(record, index) =>
          index % 2 === 1 ? "bg-white" : "bg-[#1F487C]/[10%]"
        }
      />
    </div>
  );
}
