import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { MdDownloadForOffline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import "../../../../App.css";
import { GetRecentAds } from "../../../../Api/Ads/Ads";
import Image_Video from "../../../Common/Download/Image_Video";

export default function Advertisement() {
  const dispatch = useDispatch();
  const get_recent_ads = useSelector((state) => state.crm.get_recent_ads);

  const [selectItems, setSelectItems] = useState();

  const handleOnClick = (record) => {
    setSelectItems(record);
    console.log(record, "selectItems");
  };

  useEffect(() => {
    GetRecentAds(dispatch);
    console.log(get_recent_ads, "get_recent_ads");
  }, [dispatch]);

  const videoUrl = `http://192.168.90.47:4000${selectItems?.ad_video}`;


  const fileUrl = `http://192.168.90.47:4000${selectItems?.ad_video}`;
  const filename = selectItems?.ad_title;

  const columns = [
    {
      title: <span className="text-[1.25vw] font-bold text-[#1F487C]  flex items-center justify-center">Name</span>,
      render: (row) => (
        <div className="flex items-center justify-center">
          <p className="text-[1vw]">{row?.ad_title}</p>
        </div>
      ),
      width: "20vw"
    },
    {
      title: <span className="text-[1.25vw] font-bold text-[#1F487C]  flex items-center justify-center">Modified</span>,
      sorter: (a, b) => (a.updated_date ? new Date(a.updated_date) - new Date(b.updated_date) : 0),
      render: (row) => (
        <div className="flex items-center justify-center">
          <p className="text-[1vw]">
            {row?.updated_date ? `${dayjs(row.updated_date).format("DD MMM, YY")}` : ''}
          </p>
        </div>
      ),
      width: "15vw"
    },
    {
      title: <span className="text-[1.25vw] font-bold text-[#1F487C]  flex items-center justify-center">Size</span>,
      render: (row) => (
        <div className="flex items-center justify-center">
          <p className="text-[1vw]">{(row?.ad_file_size / (1024 * 1024)).toFixed(2)} MB</p>
        </div>
      ),
      width: "15vw"
    },
  ];

  return (
    <div>
      <div className="flex py-[1vw] space-x-[2.5vw] pt-[1vw]">
        {/* <div className="w-[59vw]">
          <Table
            columns={columns}
            dataSource={get_recent_ads}
            pagination={false}
            className="customize-table"
            scroll={{ y: '25vw' }}
            onRow={(record) => ({
              onClick: () => handleOnClick(record),
            })}
          />
        </div> */}
        <div className="flex flex-col space-y-[1vw]">
          <label className="text-[#818181] border-b-[0.1vw] border-[#E9E9E9]">
            File Preview
          </label>
          <div className="border-[0.1vw] w-[30vw] h-[10vw] flex justify-center rounded-sm">
            {selectItems ? (
              selectItems?.ad_file_type?.startsWith("image/") ? (
                <img
                  src={`http://192.168.90.47:4000${selectItems?.ad_video}`}
                  alt="Ad"
                  className="w-full h-full object-cover"
                  style={{ borderRadius: "1.4vw" }}
                />
              ) : selectItems?.ad_file_type?.startsWith("video/") ? (
                <video
                  key={videoUrl}
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-cover"
                  style={{ borderRadius: "1.2vw" }}
                >
                  <source src={videoUrl} type={selectItems?.ad_file_type} />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <h1 className="pt-[3vw] text-[1vw]">Unsupported file type</h1>
              )
            ) : (
              <h1 className="pt-[3vw] text-[1vw]">Preselect any File</h1>
            )}
          </div>
          <div>
            <div className="grid grid-cols-12">
              <div className="col-span-11 text-[1vw] text-[#4283e5]">
                {selectItems?.ad_video}
              </div>
              <div className="text-[#4283e5] cursor-pointer">
                <Image_Video
                  fileUrl={fileUrl}
                  filename={filename}
                  selectItems={selectItems} />
              </div>
            </div>
            <div className="text-[1vw] text-[#818181]">
              {selectItems ?
                <p>Size : {(selectItems?.ad_file_size / (1024 * 1024)).toFixed(2)} MB</p>
                :
                 <p>Size:{""}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
