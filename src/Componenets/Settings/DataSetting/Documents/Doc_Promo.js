import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { MdDownloadForOffline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { GetPromoRecentFiles } from "../../../../Api/Promotion/Promotion";
import dayjs from "dayjs";
import Image_Video from "../../../Common/Download/Image_Video";

export default function Promo() {
  const dispatch = useDispatch();
  const get_recent_promos = useSelector((state) => state.crm.get_recent_promofile);

  const [selectItems, setSelectItems] = useState();

  const handleOnClick = (record) => {
    setSelectItems(record);
    console.log(record, "selectItems");
  };

  useEffect(() => {
    GetPromoRecentFiles(dispatch);
    console.log(get_recent_promos, "get_recent_promos");
  }, [dispatch]);

  const fileUrl = `http://192.168.90.47:4000${selectItems?.promo_image}`;
  const filename = `http://192.168.90.47:4000${selectItems?.promo_img_details?.promo_image?.filename}`;

  const columns = [
    {
      title: <span className="text-[1vw]">Name</span>,
      sorter: (a, b) => a.name.length - b.name.length,
      render: (row) => (
        <div className="flex items-center">
          <p className="text-[1vw]">{row?.promo_name}</p>
        </div>
      ),
    },
    {
      title: <span className="text-[1vw]">Modified</span>,
      sorter: (a, b) => (a.updated_date ? new Date(a.updated_date) - new Date(b.updated_date) : 0),
      render: (row) => (
        <div className="flex items-center">
          <p className="text-[1vw]">
            {row?.updated_date ? `${dayjs(row.updated_date).format("DD MMM, YY")}` : ''}
          </p>
        </div>
      ),
    },
    {
      title: <span className="text-[1vw]">Size</span>,
      render: (row) => (
        <div className="flex items-center">
          <p className="text-[1vw]">{row?.promo_img_details?.background_image?.size}</p>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex py-[1vw] space-x-[2.5vw] pt-[1vw]">
        <div className="w-[59vw]">
          <Table
            columns={columns}
            dataSource={get_recent_promos}
            pagination={false}
            className="customize-table"
            onRow={(record) => ({
              onClick: () => handleOnClick(record),
            })}
          />
        </div>
        <div className="flex flex-col space-y-[1vw]">
          <label className="text-[#818181] border-b-[0.1vw] border-[#E9E9E9]">
            File Preview
          </label>
          <div className="border-[0.1vw] w-[30vw] h-[10vw] flex justify-center rounded-sm">
            {selectItems ? (
              <img
                src={`http://192.168.90.47:4000${selectItems?.background_image
                }`}
                alt="Promo"
                className="w-full h-full object-fill"
                style={{ borderRadius: "1.4vw" }}
              />
            ) : (
              <h1 className="pt-[3vw] text-[1vw]">Preselect any File</h1>
            )}
          </div>
          <div>
            <div className="grid grid-cols-12">
              <div className="col-span-11 text-[1vw] text-[#4283e5]">
                {selectItems?.promo_img_details?.promo_image?.filename}
              </div>
              <div className="text-[#4283e5] cursor-pointer">
                {/* <MdDownloadForOffline
                  color="#4283e5"
                  size="2vw"
                  onClick={handleDownload}
                /> */}
                 <Image_Video 
                fileUrl={fileUrl} 
                filename={filename}
                selectItems ={selectItems} />
              </div>
            </div>
            <div className="text-[1vw] text-[#818181]">
              Size: {selectItems?.promo_img_details?.promo_image?.size}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
