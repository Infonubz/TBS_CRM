// import React, { useState } from "react";
// import { Button, Grid, Space, Table } from "antd";
// import { MdDownloadForOffline } from "react-icons/md";
// import Offers from "./Doc_Offers";
// import User_Management from "./Doc_UserManagement";
// import Advertisement from "./Doc_Ads";
// import Promo from "./Doc_Promo";
// import Request_Management from "./Doc_Requestmanagement";

// const Documents = () => {
//   const [selectItems, setSelectItems] = useState();
//   const handleOnClick = (record) => {
//     setSelectItems(record);
//   };

//   const [selectedTab, setSelectedTab] = useState("user management");
//   const data = [
//     {
//       key: "1",
//       name: "Daily Report .xlsx",
//       modified: "12/10/2024",
//       size: "1.2 MB",
//     },
//     {
//       key: "2",
//       name: "Weekly Report .xlsx",
//       modified: "12/10/2024",
//       size: "10 MB",
//     },
//     {
//       key: "3",
//       name: "Monthly Report .xlsx",
//       modified: "12/10/2024",
//       size: "22.5 MB",
//     },
//     {
//       key: "4",
//       name: "Yearly Report .xlsx",
//       modified: "12/10/2024",
//       size: "35.2 MB",
//     },
//   ];
//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       sorter: (a, b) => a.name.length - b.name.length,
//       sortDirections: ["descend"],
//     },
//     // {
//     //     title: 'Name',
//     //     dataIndex: 'name',
//     //     sorter: (a, b) => a.name.length - b.name.length,
//     //     sortDirections: ['descend'],
//     // },
//     {
//       title: "Modified",
//       dataIndex: "modified",
//       defaultSortOrder: "descend",
//       sorter: (a, b) => a.modified - b.modified,
//     },
//     {
//       title: "Size",
//       dataIndex: "size",
//     },
//   ];

//   const onChange = (pagination, filters, sorter, extra) => {
//     console.log("params", pagination, filters, sorter, extra);
//   };

//   return (
//     <>
//       <div className="px-[1vw]  py-[2vw]">
//         <div className="flex items-center gap-x-[3vw]">
//           <div
//             className={` cursor-pointer ${
//               selectedTab == "user management"
//                 ? "border-b-[0.25vw] font-bold border-[#1f487c]"
//                 : ""
//             } `}
//             onClick={() => {
//               setSelectedTab("user management");
//             }}
//           >
//             <p className="text-[1.3vw] text-[#1f487c] text-center">
//               User Management
//             </p>
//           </div>
//           <div
//             className={` cursor-pointer ${
//               selectedTab == "request management"
//                 ? "border-b-[0.25vw] font-bold border-[#1f487c]"
//                 : ""
//             } `}
//             onClick={() => setSelectedTab("request management")}
//           >
//             <div className="text-[1.3vw] text-[#1f487c] text-center">
//               Request Management
//             </div>
//           </div>
//           <div
//             className={` cursor-pointer ${
//               selectedTab == "offers"
//                 ? "border-b-[0.25vw] font-bold border-[#1f487c]"
//                 : ""
//             } `}
//             onClick={() => setSelectedTab("offers")}
//           >
//             <div className="text-[1.3vw] text-[#1f487c] text-center">
//               Offers & Deals
//             </div>
//           </div>
//           <div
//             className={` cursor-pointer ${
//               selectedTab == "ads"
//                 ? "border-b-[0.25vw] font-bold border-[#1f487c]"
//                 : ""
//             } `}
//             onClick={() => setSelectedTab("ads")}
//           >
//             <div className="text-[1.3vw] text-[#1f487c] text-center">
//               Advertisement
//             </div>
//           </div>
//           <div
//             className={` cursor-pointer ${
//               selectedTab == "promo"
//                 ? "border-b-[0.25vw] font-bold border-[#1f487c]"
//                 : ""
//             } `}
//             onClick={() => setSelectedTab("promo")}
//           >
//             <div className="text-[1.3vw] text-[#1f487c] text-center">
//               Promotion
//             </div>
//           </div>
//         </div>

//         <div className="pt-[2vw]">
//           {selectedTab === "user management" && <User_Management />}
//           {selectedTab === "request management" && <Request_Management />}
//           {selectedTab === "offers" && <Offers />}
//           {selectedTab === "ads" && <Advertisement />}
//           {selectedTab === "promo" && <Promo />}
//         </div>
//         {/* <div className="flex py-[1vw] space-x-[2.5vw]">
//           <div className="w-[50%]">
//             <Table
//               columns={columns}
//               dataSource={data}
//               // onChange={handleChange}
//               pagination={false}
//               className="customize-table"
//               onRow={(record) => ({
//                 onClick: () => handleOnClick(record),
//               })}
//             />
//           </div>
//           <div className="flex flex-col space-y-[1vw]">
//             <label
//               htmlFor=""
//               className="text-[#818181] border-b-[0.1vw] border-[#E9E9E9] "
//             >
//               File Preview
//             </label>
//             <div className="border-[0.1vw] w-[25vw] h-[10vw] flex justify-center rounded-sm">
//               <svg
//                 className="w-[10vw] h-[10vw]"
//                 xmlns="http://www.w3.org/2000/svg"
//                 x="0px"
//                 y="0px"
//                 width="48"
//                 height="48"
//                 viewBox="0 0 48 48"
//               >
//                 <path
//                   fill="#169154"
//                   d="M29,6H15.744C14.781,6,14,6.781,14,7.744v7.259h15V6z"
//                 ></path>
//                 <path
//                   fill="#18482a"
//                   d="M14,33.054v7.202C14,41.219,14.781,42,15.743,42H29v-8.946H14z"
//                 ></path>
//                 <path
//                   fill="#0c8045"
//                   d="M14 15.003H29V24.005000000000003H14z"
//                 ></path>
//                 <path fill="#17472a" d="M14 24.005H29V33.055H14z"></path>
//                 <g>
//                   <path
//                     fill="#29c27f"
//                     d="M42.256,6H29v9.003h15V7.744C44,6.781,43.219,6,42.256,6z"
//                   ></path>
//                   <path
//                     fill="#27663f"
//                     d="M29,33.054V42h13.257C43.219,42,44,41.219,44,40.257v-7.202H29z"
//                   ></path>
//                   <path
//                     fill="#19ac65"
//                     d="M29 15.003H44V24.005000000000003H29z"
//                   ></path>
//                   <path fill="#129652" d="M29 24.005H44V33.055H29z"></path>
//                 </g>
//                 <path
//                   fill="#0c7238"
//                   d="M22.319,34H5.681C4.753,34,4,33.247,4,32.319V15.681C4,14.753,4.753,14,5.681,14h16.638 C23.247,14,24,14.753,24,15.681v16.638C24,33.247,23.247,34,22.319,34z"
//                 ></path>
//                 <path
//                   fill="#fff"
//                   d="M9.807 19L12.193 19 14.129 22.754 16.175 19 18.404 19 15.333 24 18.474 29 16.123 29 14.013 25.07 11.912 29 9.526 29 12.719 23.982z"
//                 ></path>
//               </svg>
//             </div>
//             <div>
//               <div className="grid grid-cols-12 ">
//                 <div className=" col-span-11 text-[1.3vw] text-[#4283e5]">
//                   {selectItems?.name}
//                 </div>
//                 <div className="">
//                   <MdDownloadForOffline color="#4283e5" size="2vw" />
//                 </div>
//               </div>
//               <div className="text-[1vw] text-[#818181]">
//                 Size:{selectItems?.size}
//               </div>
//             </div>
//           </div>
//         </div> */}
//       </div>
//     </>
//   );
// };

// export default Documents;


import React, { useEffect, useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { capitalizeFirstLetter } from '../../../Common/Captilization';
import { Button, Dropdown, Grid, Space, Table } from "antd";
import axios from 'axios';
import dayjs from "dayjs";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { MdDownloadForOffline } from "react-icons/md";
import Doc_Ads from './Doc_Ads'
import Image_Video from '../../../Common/Download/Image_Video';

const Documents = () => {

  const [selectTab, setSelectTab] = useState()
  const [documents, setDocuments] = useState([]);
  const [partnerDocuments, setPartnerDocuments] = useState([]);
  const [operatorDocuments, setOperatorDocuments] = useState([]);
  const [clientDocuments, setClientDocuments] = useState([])
  const [advertisement, setAdvertisment] = useState([])
  const [mobAdvertisment, setMobAdvertisment] = useState([])
  const [promotions, setPromotions] = useState([])
  const [discountOffers, setDiscountOffers] = useState([])
  const [redeemOffers, setRedeemOffers] = useState([])
  const [error, setError] = useState(null);
  const [dropDown, setDropDown] = useState('employee')
  const apiUrl = process.env.REACT_APP_API_URL;

  console.log(documents, 'documents_documentes')

  const user = sessionStorage.getItem("USER_ID");

  const fetchDocuments = async () => {
    try {
      const URL = user?.startsWith("tbs-pro")
        ? `${apiUrl}/pro-emp-professional-documents`
        : `${apiUrl}/emp-professional-documents`;
      const response = await axios.get(URL);
      setDocuments(response.data);
      console.log(response, "response documents");
    } catch (error) {
      setError(error.message);
      // setLoading(false);
    }
  };


  const GetpartnerDocuments = async () => {
    try {
      const URL = `${apiUrl}/partner-documents`;
      const response = await axios.get(URL);
      setPartnerDocuments(response.data);
      console.log(response, "response documents");
    } catch (error) {
      setError(error.message);
    }
  };


  const GetOperatorDocumeents = async () => {
    try {
      const URL = `${apiUrl}/getall-Docs`;
      const response = await axios.get(URL);
      setOperatorDocuments(response.data);
    } catch (error) {
      setError(error.message);
    }
  }

  const GetClientData = async () => {
    try {
      const URL = `${apiUrl}/All-client-details`;
      const response = await axios.get(URL);
      setClientDocuments(response.data);
    } catch (error) {
      setError(error.message);
    }
  }
  const GetDiscountOffers = async () => {
    try {
      const URL = `${apiUrl}/offers-deals`
      const response = await axios.get(URL);
      setDiscountOffers(response.data)
    } catch (error) {
      setError(error.message)
    }
  }

  const GetRedeemOffers = async () => {
    try {
      const URL = `${apiUrl}/redeem-offers-deals`
      const response = await axios.get(URL);
      setRedeemOffers(response.data)
    } catch (error) {
      setError(error.message)
    }
  }

  const GetPromotionsData = async () => {
    try {
      const URL = `${apiUrl}/promo`
      const response = await axios.get(URL);
      setPromotions(response.data)
    } catch (error) {
      setError(error.message)
    }
  }

  const GetAdvertisment = async () => {
    try {
      const URL = `${apiUrl}/ads-all`
      const response = await axios.get(URL);
      setAdvertisment(response.data)
    } catch (error) {
      setError(error.message)
    }
  }

  const GetMobAdvertisment = async () => {
    try {
      const URL = `${apiUrl}/mobads-all`
      const response = await axios.get(URL);
      setMobAdvertisment(response.data)
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    fetchDocuments();
    GetpartnerDocuments();
    GetOperatorDocumeents();
    GetAdvertisment();
    GetPromotionsData();
    GetClientData();
    GetRedeemOffers();
    GetDiscountOffers();
    GetMobAdvertisment();
  }, []);

  const toggleDropDown = (section) => {
    setDropDown(dropDown === section ? null : section);
  };


  const [selectItems, setSelectItems] = useState();

  console.log(selectItems, 'select_Items')

  const handleOnClick = (record) => {
    setSelectItems(record);

    console.log(selectItems, "selectItems");
  };

  const downloadImages = async () => {
    const imageUrls = await fetchImages();
    const zip = new JSZip();

    for (const url of imageUrls) {
      const imageBlob = await fetch(url).then(res => res.blob());
      const fileName = url.split('/').pop();
      zip.file(fileName, imageBlob);
    }

    zip.generateAsync({ type: 'blob' }).then(content => {
      saveAs(content, `${dropDown == 'operator' ? selectItems?.tbs_operator_id : dropDown == 'partner' ? selectItems?.tbs_partner_id : selectItems?.tbs_pro_emp_id}.zip`);
    });
  };

  const fetchImages = async () => {
    let images = [];

    if (dropDown == 'operator') {
      images = [
        `http://192.168.90.47:4000${selectItems?.aadar_front_doc}`,
        `http://192.168.90.47:4000${selectItems?.aadar_back_doc}`,
        `http://192.168.90.47:4000${selectItems?.pancard_front_doc}`,
        `http://192.168.90.47:4000${selectItems?.pancard_back_doc}`,
      ];
    } else if (dropDown == 'partner') {
      images = [
        `http://192.168.90.47:4000${selectItems?.aadhar_card_front}`,
        `http://192.168.90.47:4000${selectItems?.aadhar_card_back}`,
        `http://192.168.90.47:4000${selectItems?.pan_card_front}`,
        `http://192.168.90.47:4000${selectItems?.pan_card_back}`,
      ];
    } else if (dropDown == 'employee') {
      images = [
        `http://192.168.90.47:4000${selectItems?.aadhar_card_front_doc}`,
        `http://192.168.90.47:4000${selectItems?.aadhar_card_back_doc}`,
        `http://192.168.90.47:4000${selectItems?.pan_card_front_doc}`,
        `http://192.168.90.47:4000${selectItems?.pan_card_back_doc}`,

      ];
    }

    return images;
  };

  const columns = [
    {
      title: <span className="text-[1.1vw] text-[#1F487C] flex items-center justify-center">{dropDown === 'partner' ? <p>First Name</p> : dropDown === 'operator' ? <p>Owner Name</p> : dropDown === 'employee' ? <p>First Name</p> : <p>Name</p>}</span>,
      // dataIndex: "name",
      //sorter: (a, b) => a.name.length - b.name.length,
      render: (row) => (
        <div className="flex items-center justify-center font-normal">
          <p className="text-[0.9vw]">{row?.owner_name ? capitalizeFirstLetter(row?.owner_name) : row?.partner_first_name ? capitalizeFirstLetter(row?.partner_first_name) : capitalizeFirstLetter(row?.emp_first_name) ? capitalizeFirstLetter(row?.emp_first_name) : capitalizeFirstLetter(row?.offer_name) ? capitalizeFirstLetter(row?.offer_name) : capitalizeFirstLetter(row?.promo_name) ? capitalizeFirstLetter(row?.promo_name) : capitalizeFirstLetter(row?.ad_title) ? capitalizeFirstLetter(row?.ad_title) : capitalizeFirstLetter(row?.mobad_title)}</p>
        </div>
      ),
      width: '10vw'
    },
    {
      title: <span className="text-[1.1vw]  text-[#1F487C] flex items-center justify-center">{dropDown === 'partner' ? <p>Last Name</p> : dropDown === 'operator' ? <p>Company Name</p> : dropDown === 'employee' ? <p>Last Name</p> : <p>Modified</p>}</span>,
      // dataIndex: "name",
      //sorter: (a, b) => a.name.length - b.name.length,
      render: (row) => (
        <div className="flex items-center justify-center font-normal">
          <p className="text-[0.9vw]">{row?.company_name ? capitalizeFirstLetter(row?.company_name) : row?.partner_last_name ? capitalizeFirstLetter(row?.partner_last_name) : capitalizeFirstLetter(row?.emp_last_name) ? capitalizeFirstLetter(row?.emp_last_name) : (row?.updated_date) ? dayjs(row?.updated_date).format("DD MMM, YY") : ''}</p>
        </div>
      ),
      width: '10vw'
    },
    {
      title: <span className="text-[1.1vw]  text-[#1F487C] flex items-center justify-center">{dropDown === 'partner' ? <p>ID</p> : dropDown === 'operator' ? <p>ID</p> : dropDown === 'employee' ? <p>ID</p> : <p>Size</p>}</span>,
      // dataIndex: "name",
      //sorter: (a, b) => a.name.length - b.name.length,
      render: (row) => (
        <div className="flex items-center font-normal justify-center">
          <p className="text-[0.9vw]">{row?.tbs_operator_id ? row?.tbs_operator_id : row?.tbs_partner_id ? row?.tbs_partner_id : row?.tbs_pro_emp_id ? row?.tbs_pro_emp_id : row?.image_size ? (row?.image_size / 1024).toFixed(2) + ' KB' : row?.promo_img_details ? (row?.promo_img_details?.background_image?.size / 1024).toFixed(2) + ' KB' : row?.mobad_file_size ? (row?.mobad_file_size / 1024).toFixed(2) + ' KB' : (row?.ad_file_size / 1024).toFixed(2) + ' KB'}</p>
        </div>
      ),
      width: '10vw'
    }
  ];

  const [dataDocuments, setDataDocuments] = useState([]);


  useEffect(() => {
    switch (dropDown) {
      case 'employee':
        setDataDocuments(documents);
        break;
      case 'partner':
        setDataDocuments(partnerDocuments);
        break;
      case 'operator':
        setDataDocuments(operatorDocuments);
        break;
      case 'clientDocuments':
        setDataDocuments(clientDocuments);
        break;
      case 'advertisment':
        setDataDocuments(advertisement);
        break;
      case 'mobileAdvertisment':
        setDataDocuments(mobAdvertisment);
        break;
      case 'promotion':
        setDataDocuments(promotions);
        break;
      case 'discountOffer':
        setDataDocuments(discountOffers);
        break;
      case 'redeemOffer':
        setDataDocuments(redeemOffers);
        break;
      default:
        setDataDocuments([]);
        break;
    }
  }, [dropDown, documents, partnerDocuments, operatorDocuments, clientDocuments, advertisement, promotions, discountOffers, redeemOffers]);


  const videoUrl = selectItems?.ad_video
    ? `http://192.168.90.47:4000${selectItems?.ad_video}`
    : selectItems?.mobad_vdo
      ? `http://192.168.90.47:4000${selectItems?.mobad_vdo}`
      : selectItems?.offer_img
        ? `http://192.168.90.47:4000${selectItems?.offer_img}`
        : selectItems?.background_image
          ? `http://192.168.90.47:4000${selectItems?.background_image}`
          : selectItems?.promo_img_details?.promo_image
            ? `http://192.168.90.47:4000${selectItems?.promo_img_details?.promo_image}`
            : null;

  const fileUrl = videoUrl;


  const filename = selectItems?.ad_title
    ? selectItems?.ad_title
    : selectItems?.promo_img_details?.promo_image?.filename
      ? selectItems?.promo_img_details?.promo_image?.filename
      : selectItems?.image_file?.filename
        ? selectItems?.image_file?.filename
        : selectItems?.offer_img?.filename
          ? selectItems?.offer_img?.filename
          : "Untitled";

  return (
    <>
      <div className='p-[1vw] '>
        <div className='rounded-xl border-[#1F487C] border-[0.1vw] border-b-[0.2vw]' >

          {/* -------------------------------------------SearchTab------------------------------------- */}

          <div className='flex bg-[#1F487C] rounded-t-xl py-[0.5vw] items-center gap-[1vw]'>
            <div className='relative pl-[1vw]'>
              <input
                type="text"
                placeholder='Search'
                className='w-[12.5vw] h-[2.5vw] text-[1vw] text-[#1F487C] rounded-md pl-[3vw] placeholder-[#1F487C] placeholder:text-[1vw] outline-none'
              />
              <div className='absolute top-[0.75vw] left-[1.5vw]'>
                <IoIosSearch
                  color='#1F487C' />
              </div>
            </div>
            <div className='flex items-center gap-[1.5vw]'>
              <span className='text-white text-[1vw]'>Sort: </span>
              <span className='text-white text-[1vw]'>Module Name</span>
              <span className='text-white text-[1vw]'>File Size </span>
              <span className='text-white text-[1vw]'>Date Added</span>
            </div>
          </div>

          {/* ------------------------------------Folders----------------------------------------------- */}

          <div className="p-[1vw] grid grid-cols-5 justify-items-center gap-y-[1vw]">
            <div
              onClick={() => toggleDropDown('employee')}
              className={`${dropDown === 'employee' ? 'shadow-[#1F487C] shadow-md ' : ''} w-[15vw] h-[10vw] border-[0.2vw] border-[#1F487C] bg-white  rounded-xl border-t-[0.5vw]`}>
              <div className="pl-[1vw] pt-[0.5vw] grid grid-rows-3 gap-y-[1vw]">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-[1.5vw] h-[1.5vw]"
                  >
                    <path
                      d="M448 480H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H192c20.1 0 39.1 9.5 51.2 25.6l19.2 25.6c6 8.1 15.5 12.8 25.6 12.8H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64zM184 272c-13.3 0-24 10.7-24 24s10.7 24 24 24H328c13.3 0 24-10.7 24-24s-10.7-24-24-24H184z"
                      fill="#1F487C"
                    />
                  </svg>
                </div>
                <div className="text-[1.1vw] text-[#8398B7]">
                  Employee
                </div>
                <div className="text-[0.9vw] text-[#1F487C]">
                  {documents?.length} files
                </div>
              </div>
            </div>
            <div
              onClick={() => toggleDropDown('partner')}
              className={`${dropDown === 'partner' ? 'shadow-[#1F487C] shadow-md ' : ''} w-[15vw] h-[10vw] border-[0.2vw] border-[#1F487C] bg-white  rounded-xl border-t-[0.5vw]`}>
              <div className="pl-[1vw] pt-[0.5vw] grid grid-rows-3 gap-y-[1vw]">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-[1.5vw] h-[1.5vw]"
                  >
                    <path
                      d="M448 480H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H192c20.1 0 39.1 9.5 51.2 25.6l19.2 25.6c6 8.1 15.5 12.8 25.6 12.8H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64zM184 272c-13.3 0-24 10.7-24 24s10.7 24 24 24H328c13.3 0 24-10.7 24-24s-10.7-24-24-24H184z"
                      fill="#1F487C"
                    />
                  </svg>
                </div>
                <div className="text-[1.1vw] text-[#8398B7]">
                  Partner
                </div>
                <div className="text-[0.9vw] text-[#1F487C]">
                  {partnerDocuments?.length} files
                </div>
              </div>
            </div>
            <div
              onClick={() => toggleDropDown('operator')}
              className={`${dropDown === 'operator' ? 'shadow-[#1F487C] shadow-md ' : ''} w-[15vw] h-[10vw] border-[0.2vw] border-[#1F487C] bg-white  rounded-xl border-t-[0.5vw]`}>
              <div className="pl-[1vw] pt-[0.5vw] grid grid-rows-3 gap-y-[1vw]">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-[1.5vw] h-[1.5vw]"
                  >
                    <path
                      d="M448 480H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H192c20.1 0 39.1 9.5 51.2 25.6l19.2 25.6c6 8.1 15.5 12.8 25.6 12.8H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64zM184 272c-13.3 0-24 10.7-24 24s10.7 24 24 24H328c13.3 0 24-10.7 24-24s-10.7-24-24-24H184z"
                      fill="#1F487C"
                    />
                  </svg>
                </div>
                <div className="text-[1.1vw] text-[#8398B7]">
                  Operator
                </div>
                <div className="text-[0.9vw] text-[#1F487C]">
                  {operatorDocuments?.length} files
                </div>
              </div>
            </div>
            <div
              onClick={() => toggleDropDown('redeemOffer')}
              className={`${dropDown === 'redeemOffer' ? 'shadow-[#1F487C] shadow-md ' : ''} w-[15vw] h-[10vw] border-[0.2vw] border-[#1F487C] bg-white  rounded-xl border-t-[0.5vw]`}>
              <div className="pl-[1vw] pt-[0.5vw] grid grid-rows-3 gap-y-[1vw]">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-[1.5vw] h-[1.5vw]"
                  >
                    <path
                      d="M448 480H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H192c20.1 0 39.1 9.5 51.2 25.6l19.2 25.6c6 8.1 15.5 12.8 25.6 12.8H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64zM184 272c-13.3 0-24 10.7-24 24s10.7 24 24 24H328c13.3 0 24-10.7 24-24s-10.7-24-24-24H184z"
                      fill="#1F487C"
                    />
                  </svg>
                </div>
                <div className="text-[1.1vw] text-[#8398B7]">
                  Redeem Offers
                </div>
                <div className="text-[0.9vw] text-[#1F487C]">
                  {redeemOffers?.length} files
                </div>
              </div>
            </div>
            <div
              onClick={() => toggleDropDown('discountOffer')}
              className={`${dropDown === 'discountOffer' ? 'shadow-[#1F487C] shadow-md ' : ''} w-[15vw] h-[10vw] border-[0.2vw] border-[#1F487C] bg-white  rounded-xl border-t-[0.5vw]`}>
              <div className="pl-[1vw] pt-[0.5vw] grid grid-rows-3 gap-y-[1vw]">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-[1.5vw] h-[1.5vw]"
                  >
                    <path
                      d="M448 480H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H192c20.1 0 39.1 9.5 51.2 25.6l19.2 25.6c6 8.1 15.5 12.8 25.6 12.8H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64zM184 272c-13.3 0-24 10.7-24 24s10.7 24 24 24H328c13.3 0 24-10.7 24-24s-10.7-24-24-24H184z"
                      fill="#1F487C"
                    />
                  </svg>
                </div>
                <div className="text-[1.1vw] text-[#8398B7]">
                  Discount Offers
                </div>
                <div className="text-[0.9vw] text-[#1F487C]">
                  {discountOffers?.length} files
                </div>
              </div>
            </div>
            <div
              onClick={() => toggleDropDown('promotion')}
              className={`${dropDown === 'promotion' ? 'shadow-[#1F487C] shadow-md ' : ''} w-[15vw] h-[10vw] border-[0.2vw] border-[#1F487C] bg-white  rounded-xl border-t-[0.5vw]`}>
              <div className="pl-[1vw] pt-[0.5vw] grid grid-rows-3 gap-y-[1vw]">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-[1.5vw] h-[1.5vw]"
                  >
                    <path
                      d="M448 480H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H192c20.1 0 39.1 9.5 51.2 25.6l19.2 25.6c6 8.1 15.5 12.8 25.6 12.8H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64zM184 272c-13.3 0-24 10.7-24 24s10.7 24 24 24H328c13.3 0 24-10.7 24-24s-10.7-24-24-24H184z"
                      fill="#1F487C"
                    />
                  </svg>
                </div>
                <div className="text-[1.1vw] text-[#8398B7]">
                  Promotion
                </div>
                <div className="text-[0.9vw] text-[#1F487C]">
                  {promotions?.length} files
                </div>
              </div>
            </div>
            <div
              onClick={() => toggleDropDown('advertisment')}
              className={`${dropDown === 'advertisment' ? 'shadow-[#1F487C] shadow-md ' : ''} w-[15vw] h-[10vw] border-[0.2vw] border-[#1F487C] bg-white  rounded-xl border-t-[0.5vw]`}>
              <div className="pl-[1vw] pt-[0.5vw] grid grid-rows-3 gap-y-[1vw]">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-[1.5vw] h-[1.5vw]"
                  >
                    <path
                      d="M448 480H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H192c20.1 0 39.1 9.5 51.2 25.6l19.2 25.6c6 8.1 15.5 12.8 25.6 12.8H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64zM184 272c-13.3 0-24 10.7-24 24s10.7 24 24 24H328c13.3 0 24-10.7 24-24s-10.7-24-24-24H184z"
                      fill="#1F487C"
                    />
                  </svg>
                </div>
                <div className="text-[1.1vw] text-[#8398B7]">
                  Advertisment
                </div>
                <div className="text-[0.9vw] text-[#1F487C]">
                  {advertisement?.length} files
                </div>
              </div>
            </div>
            <div
              onClick={() => toggleDropDown('mobileAdvertisment')}
              className={`${dropDown === 'mobileAdvertisment' ? 'shadow-[#1F487C] shadow-md ' : ''} w-[15vw] h-[10vw] border-[0.2vw] border-[#1F487C] bg-white  rounded-xl border-t-[0.5vw]`}>
              <div className="pl-[1vw] pt-[0.5vw] grid grid-rows-3 gap-y-[1vw]">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-[1.5vw] h-[1.5vw]"
                  >
                    <path
                      d="M448 480H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H192c20.1 0 39.1 9.5 51.2 25.6l19.2 25.6c6 8.1 15.5 12.8 25.6 12.8H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64zM184 272c-13.3 0-24 10.7-24 24s10.7 24 24 24H328c13.3 0 24-10.7 24-24s-10.7-24-24-24H184z"
                      fill="#1F487C"
                    />
                  </svg>
                </div>
                <div className="text-[1.1vw] text-[#8398B7]">
                  Mobile Advertisment
                </div>
                <div className="text-[0.9vw] text-[#1F487C]">
                  {advertisement?.length} files
                </div>
              </div>
            </div>
          </div>

          {/* ------------------------------------------RecentDocuments--------------------------------- */}

          <div className='px-[1vw] grid grid-cols-2'>
            <div className='font-bold text-[1.25vw] text-[#1F487C] '>
              Recent Documents
              <div>
                <Table
                  columns={columns}
                  dataSource={dataDocuments}
                  // onChange={handleChange}  
                  pagination={false}
                  className="customize-table"
                  scroll={{ y: '20vw' }}
                  onRow={(record) => ({
                    onClick: () =>
                      handleOnClick(record),
                  })}
                />
              </div>
            </div>

            {/* -----------------------------------------------------------------FilePreview--------------------------------------------------------------------- */}

            <div>
              <p className="border-b-slate-400 border-b-[0.1vw] font-bold  text-[1.25vw] text-[#1F487C]">File Preview :</p>
              <div className="pt-[1.5vw]  gap-[0.5vw] items-center">
                {dropDown === 'employee' ?
                  <div>
                    <div className='grid grid-cols-2 gap-[0.5vw] justify-items-center'>
                      {
                        selectItems?.aadhar_card_doc ||
                          selectItems?.pan_card_doc ||
                          selectItems?.offer_letter_doc ||
                          selectItems?.qualification_doc ? (
                          <>
                            {selectItems?.aadhar_card_doc !== null && (
                              <img
                                src={`http://192.168.90.47:4000${selectItems?.aadhar_card_front_doc}`}
                                className="h-[10vw]"
                              />
                            )}
                            {selectItems?.pan_card_doc !== null && (
                              <img
                                src={`http://192.168.90.47:4000${selectItems?.aadhar_card_back_doc}`}
                                className="h-[10vw]"
                              />
                            )}
                            {selectItems?.offer_letter_doc !== null && (
                              <img
                                src={`http://192.168.90.47:4000${selectItems?.pan_card_front_doc}`}
                                className="h-[10vw]"
                              />
                            )}
                            {selectItems?.qualification_doc !== null && (
                              <img
                                src={`http://192.168.90.47:4000${selectItems?.pan_card_back_doc}`}
                                className="h-[10vw]"
                              />
                            )}
                          </>
                        ) : (
                          <p>No content available</p>
                        )
                      }
                    </div>

                    {selectItems?.aadhar_card_doc ||
                      selectItems?.pan_card_doc ||
                      selectItems?.offer_letter_doc ||
                      selectItems?.qualification_doc ? <div className="flex justify-end pt-[1vw]"><MdDownloadForOffline onClick={downloadImages} color="#4283e5" size="3vw" className=" cursor-pointer" /></div> : ""}
                  </div>
                  :
                  dropDown === 'partner' ?
                    <div>

                      <div className='grid grid-cols-2 gap-[0.5vw] justify-items-center'>
                        {
                          selectItems?.aadhar_card_front ||
                            selectItems?.aadhar_card_back ||
                            selectItems?.pan_card_front ||
                            selectItems?.pan_card_back ? (
                            <>
                              {selectItems?.aadhar_card_front !== null && (
                                <img
                                  src={`http://192.168.90.47:4000${selectItems?.aadhar_card_front}`}
                                  className="h-[10vw]"
                                />
                              )}
                              {selectItems?.aadhar_card_back !== null && (
                                <img
                                  src={`http://192.168.90.47:4000${selectItems?.aadhar_card_back}`}
                                  className="h-[10vw]"
                                />
                              )}
                              {selectItems?.pan_card_front !== null && (
                                <img
                                  src={`http://192.168.90.47:4000${selectItems?.pan_card_front}`}
                                  className="h-[10vw]"
                                />
                              )}
                              {selectItems?.pan_card_back !== null && (
                                <img
                                  src={`http://192.168.90.47:4000${selectItems?.pan_card_back}`}
                                  className="h-[10vw]"
                                />
                              )}
                            </>
                          ) : (
                            <p>No content available</p>
                          )
                        }

                      </div>

                      {selectItems?.aadhar_card_front ||
                        selectItems?.aadhar_card_back ||
                        selectItems?.pan_card_front ||
                        selectItems?.pan_card_back ? <div className="flex justify-end pt-[1vw]"><MdDownloadForOffline onClick={downloadImages} color="#4283e5" size="3vw" className=" cursor-pointer" /></div> : ""}
                    </div>
                    :
                    dropDown === 'operator' ?
                      <div>

                        <div className='grid grid-cols-2 gap-[0.5vw] justify-items-center'>
                          {
                            selectItems?.aadar_front_doc ||
                              selectItems?.aadar_back_doc ||
                              selectItems?.pancard_front_doc ||
                              selectItems?.pancard_back_doc ? (
                              <>
                                {selectItems?.aadar_front_doc && (
                                  <img
                                    src={`http://192.168.90.47:4000${selectItems?.aadar_front_doc}`}
                                    className="h-[10vw]"
                                    alt="Aadhar Front"
                                  />
                                )}
                                {selectItems?.aadar_back_doc && (
                                  <img
                                    src={`http://192.168.90.47:4000${selectItems?.aadar_back_doc}`}
                                    className="h-[10vw]"
                                    alt="Aadhar Back"
                                  />
                                )}
                                {selectItems?.pancard_front_doc && (
                                  <img
                                    src={`http://192.168.90.47:4000${selectItems?.pancard_front_doc}`}
                                    className="h-[10vw]"
                                    alt="Pan Card Front"
                                  />
                                )}
                                {selectItems?.pancard_back_doc && (
                                  <img
                                    src={`http://192.168.90.47:4000${selectItems?.pancard_back_doc}`}
                                    className="h-[10vw]"
                                    alt="Pan Card Back"
                                  />
                                )}

                              </>
                            ) : (
                              <p>No content available</p>
                            )
                          }

                        </div>
                        {selectItems?.aadar_front_doc ||
                          selectItems?.aadar_back_doc ||
                          selectItems?.pancard_front_doc ||
                          selectItems?.pancard_back_doc ? <div className="flex justify-end pt-[1vw]"><MdDownloadForOffline onClick={downloadImages} color="#4283e5" size="3vw" className=" cursor-pointer" /></div> : ""}
                      </div>
                      :

                      <div className="py-[1.5vw] gap-[0.5vw] items-center align-center">
                        <div className="border-[0.1vw] w-full h-[10vw] flex justify-center rounded-sm">

                          {selectItems ? (
                            selectItems?.ad_file_type?.startsWith("image/") || selectItems?.offer_img || selectItems?.background_image ? (
                              <img
                                src={`http://192.168.90.47:4000${selectItems?.ad_video || selectItems?.offer_img || selectItems?.background_image}`}
                                alt="Ad/Offer/Background"
                                className="w-full h-full object-cover"
                                style={{ borderRadius: "1.4vw" }}
                              />
                            ) : selectItems?.ad_file_type?.startsWith("video/") || selectItems?.mobad_vdo ? (
                              <video
                                key={selectItems?.ad_video}
                                autoPlay
                                loop
                                muted
                                className="w-full h-full object-cover"
                                style={{ borderRadius: "1.2vw" }}
                              >
                                <source src={`http://192.168.90.47:4000${selectItems?.ad_video || selectItems?.mobad_vdo}`} type={selectItems?.ad_file_type} />
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

                          <div className="grid grid-cols-12 mt-[0.5vw]">
                            <div className="col-span-11 text-[1vw] text-[#4283e5]">
                              {selectItems?.ad_video || selectItems?.offer_img || selectItems?.background_image ?
                                (selectItems?.ad_video || selectItems?.offer_img || selectItems?.background_image) :
                                (selectItems?.promo_img_details?.promo_image?.filename || selectItems?.image_file?.filename)
                              }
                            </div>
                            <div className="text-[#4283e5] cursor-pointer">
                              <Image_Video
                                fileUrl={fileUrl}
                                filename={filename}
                                selectItems={selectItems}
                              />
                            </div>
                          </div>

                          {/* File Size */}
                          <div className="text-[1vw] text-[#818181]">
                            {selectItems ? (
                              <>
                                {selectItems?.ad_file_size ? (
                                  <p>Size: {(selectItems?.ad_file_size / (1024 * 1024)).toFixed(2)} MB</p>
                                ) : selectItems?.image_size ? (
                                  <p>Size: {(selectItems?.image_size / 1024).toFixed(2)} KB</p>
                                ) : selectItems?.promo_img_details?.promo_image?.size ? (
                                  <p>Size: {(selectItems?.promo_img_details?.promo_image?.size / 1024).toFixed(2)} KB</p>
                                ) : selectItems?.offer_img ? (
                                  <p>Size: {(selectItems?.offer_img?.size / 1024).toFixed(2)} KB</p>
                                ) : null}
                              </>
                            ) : (
                              <p>Size: </p>
                            )}
                          </div>
                        </div>
                      </div>
                  //  : ''
                }

              </div>
            </div>
          </div>
        </div >
      </div >
    </>
  )
}

export default Documents