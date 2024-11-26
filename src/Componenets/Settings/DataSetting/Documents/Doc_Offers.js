import React, { useEffect, useState } from "react";
import { Button, Grid, Space, Table } from "antd";
import { MdDownloadForOffline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { GetRecentOffers } from "../../../../Api/Offers/Offers";
import Image_Video from "../../../Common/Download/Image_Video";
import dayjs from "dayjs";

export default function Offers() {
  const dispatch = useDispatch();
  const get_recent_offers = useSelector((state) => state.crm.get_recent_offers);
  const [selectItems, setSelectItems] = useState();

  const handleOnClick = (record) => {
    setSelectItems(record);
    console.log(selectItems, "selectItems");
  };

  const fileUrl = `http://192.168.90.47:4000${selectItems?.offer_img}`;
  const filename = `http://192.168.90.47:4000${selectItems?.image_file?.filename}`;

  useEffect(() => {
    GetRecentOffers(dispatch);
    console.log(get_recent_offers, "get_recent_ads");
  }, []);

  // const downloadFile = (url, filename) => {
  //   fetch(url)
  //     .then(response => response.blob())
  //     .then(blob => {
  //       const link = document.createElement('a');
  //       link.href = window.URL.createObjectURL(blob);
  //       link.download = filename || 'downloaded_file'; // Default filename if none provided
  //       document.body.appendChild(link);
  //       link.click();
  //       link.remove();
  //     })
  //     .catch(err => console.error('Download error:', err));
  // };

  // const handleDownload = () => {
  //   if (selectItems && selectItems?.offer_img) {
  //     const fileUrl = `http://192.168.90.47:4000${selectItems?.offer_img}`;
  //     const filename = selectItems?.image_file?.filename;
  //     downloadFile(fileUrl, filename);
  //   } else {
  //     console.error('No file selected or file URL is invalid.');
  //   }
  // };

  const columns = [
    {
      title: <span className="text-[1.25vw] font-bold text-[#1F487C] flex items-center justify-center">Name</span>,
      // dataIndex: "name",
      //sorter: (a, b) => a.name.length - b.name.length,
      render: (row) => (
        <div className="flex items-center justify-center">
          <p className="text-[1vw]">{row?.offer_name}</p>
        </div>
      ),
      width: '20vw'
    },
    {
      title: <span className="text-[1.25vw] font-bold text-[#1F487C] flex items-center justify-center">Modified</span>,
      // dataIndex: "modified",
      //defaultSortOrder: "descend",
      sorter: (a, b) => a.updated_date - b.updated_date,
      render: (row) => (
        <div className="flex items-center justify-center">
          <p className="text-[1vw]">{`${dayjs(row?.updated_date).format(
            "DD MMM, YY"
          )}`}</p>
        </div>
      ),
      width: '15vw'
    },
    {
      title: <span className="text-[1.25vw] font-bold text-[#1F487C] flex items-center justify-center">Size</span>,
      //dataIndex: "size",
      render: (row) => (
        <div className="flex items-center justify-center">
          <p className="text-[1vw]">{(row?.image_size / 1024).toFixed(1)} KB</p>
        </div>
      ),
      width: '15vw'
    },
  ];

  return (
    <div className="">
      <div className="flex py-[1vw] space-x-[2.5vw] pt-[1vw]">
        <div className="w-[59vw]">
          <Table
            columns={columns}
            dataSource={get_recent_offers}
            // onChange={handleChange}
            pagination={false}
            className="customize-table"
            onRow={(record) => ({
              onClick: () => handleOnClick(record),
            })}
            scroll={{ y: '25vw' }}
          />
        </div>
        <div className="flex flex-col space-y-[1vw]">
          <label
            htmlFor=""
            className="text-[#818181] border-b-[0.1vw] border-[#E9E9E9]"
          >
            File Preview
          </label>
          <div className="border-[0.1vw] w-[30vw] h-[10vw] flex justify-center rounded-sm">
            {selectItems ? (
              <img
                src={`http://192.168.90.47:4000${selectItems?.offer_img}`}
                alt="Ad"
                className="w-full h-full object-fill"
                style={{
                  borderRadius: "1.4vw",
                }}
              />
            ) : (
              <h1 className="pt-[3vw] text-[1vw]">PreSelect any File</h1>
            )}

            {/* <svg
                className="w-[10vw] h-[10vw]"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="48"
                height="48"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#169154"
                  d="M29,6H15.744C14.781,6,14,6.781,14,7.744v7.259h15V6z"
                ></path>
                <path
                  fill="#18482a"
                  d="M14,33.054v7.202C14,41.219,14.781,42,15.743,42H29v-8.946H14z"
                ></path>
                <path
                  fill="#0c8045"
                  d="M14 15.003H29V24.005000000000003H14z"
                ></path>
                <path fill="#17472a" d="M14 24.005H29V33.055H14z"></path>
                <g>
                  <path
                    fill="#29c27f"
                    d="M42.256,6H29v9.003h15V7.744C44,6.781,43.219,6,42.256,6z"
                  ></path>
                  <path
                    fill="#27663f"
                    d="M29,33.054V42h13.257C43.219,42,44,41.219,44,40.257v-7.202H29z"
                  ></path>
                  <path
                    fill="#19ac65"
                    d="M29 15.003H44V24.005000000000003H29z"
                  ></path>
                  <path fill="#129652" d="M29 24.005H44V33.055H29z"></path>
                </g>
                <path
                  fill="#0c7238"
                  d="M22.319,34H5.681C4.753,34,4,33.247,4,32.319V15.681C4,14.753,4.753,14,5.681,14h16.638 C23.247,14,24,14.753,24,15.681v16.638C24,33.247,23.247,34,22.319,34z"
                ></path>
                <path
                  fill="#fff"
                  d="M9.807 19L12.193 19 14.129 22.754 16.175 19 18.404 19 15.333 24 18.474 29 16.123 29 14.013 25.07 11.912 29 9.526 29 12.719 23.982z"
                ></path>
              </svg> */}
          </div>
          <div>
            <div className="grid grid-cols-12 ">
              <div className=" col-span-11 text-[1vw] text-[#4283e5]">
                {selectItems?.image_file?.filename}
              </div>
              <div className="">
                <Image_Video
                  fileUrl={fileUrl}
                  filename={filename}
                  selectItems={selectItems} />
                {/* <MdDownloadForOffline onClick={handleDownload} color="#4283e5" size="2vw" /> */}
              </div>
            </div>
            <div className="text-[1vw] text-[#818181]">
              {selectItems ?
                <p> Size:{(selectItems?.image_size / 1024).toFixed(2)} KB</p>
                : <p>Size:{""}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
