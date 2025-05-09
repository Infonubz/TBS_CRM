import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Button, Dropdown, Grid, Space, Table } from "antd";
import { capitalizeFirstLetter } from "../../../Common/Captilization";
import { MdDownloadForOffline } from "react-icons/md";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default function User_Management() {
  const [documents, setDocuments] = useState([]);
  const [partnerDocuments, setPartnerDocuments] = useState([]);
  const [operatorDocuments, setOperatorDocuments] = useState([])
  const [error, setError] = useState(null);
  const [dropDown, setDropDown] = useState(false)
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

  useEffect(() => {
    fetchDocuments();
    GetpartnerDocuments();
    GetOperatorDocumeents();
  }, []);

  // const folder = [
  //     {
  //       id: "1",
  //       file: "Name of the File",
  //       sub: "15 Folders",
  //     },
  //     {
  //       id: "2",
  //       file: "Name of the File",
  //       sub: "15 Folders",
  //     },
  //     {
  //       id: "3",
  //       file: "Name of the File",
  //       sub: "15 Folders",
  //     },
  //     {
  //       id: "4",
  //       file: "Name of the File",
  //       sub: "15 Folders",
  //     },
  //     {
  //       id: "5",
  //       file: "Name of the File",
  //       sub: "15 Folders",
  //     },
  //     {
  //       id: "6",
  //       file: "Name of the File",
  //       sub: "15 Folders",
  //     },
  //     {
  //       id: "7",
  //       file: "Name of the File",
  //       sub: "15 Folders",
  //     },
  //     {
  //       id: "8",
  //       file: "Name of the File",
  //       sub: "15 Folders",
  //     },
  //     {
  //       id: "9",
  //       file: "Name of the File",
  //       sub: "15 Folders",
  //     },
  //     {
  //       id: "10",
  //       file: "Name of the File",
  //       sub: "15 Folders",
  //     },
  //   ];


  const toggleDropDown = (section) => {
    setDropDown(dropDown === section ? null : section);
  };

  const columns = [
    {
      title: <span className="text-[1.25vw] font-bold text-[#1F487C] flex items-center justify-center">{dropDown === 'partner' ? <p>First Name</p> : dropDown === 'operator' ? <p>Owner Name</p> : <p>First Name</p>}</span>,
      // dataIndex: "name",
      //sorter: (a, b) => a.name.length - b.name.length,
      render: (row) => (
        <div className="flex items-center justify-center">
          <p className="text-[1vw]">{row?.owner_name ? capitalizeFirstLetter(row?.owner_name) : row?.partner_first_name ? capitalizeFirstLetter(row?.partner_first_name) : capitalizeFirstLetter(row?.emp_first_name)}</p>
        </div>
      ),
      width: '10vw'
    },
    {
      title: <span className="text-[1.25vw] font-bold text-[#1F487C] flex items-center justify-center">{dropDown === 'partner' ? <p>Last Name</p> : dropDown === 'operator' ? <p>Company Name</p> : <p>Last Name</p>}</span>,
      // dataIndex: "name",
      //sorter: (a, b) => a.name.length - b.name.length,
      render: (row) => (
        <div className="flex items-center justify-center">
          <p className="text-[1vw]">{row?.company_name ? capitalizeFirstLetter(row?.company_name) : row?.partner_last_name ? capitalizeFirstLetter(row?.partner_last_name) : capitalizeFirstLetter(row?.emp_last_name)}</p>
        </div>
      ),
      width: '10vw'
    },
    {
      title: <span className="text-[1.25vw] font-bold text-[#1F487C] flex items-center justify-center">{dropDown === 'partner' ? <p>ID</p> : dropDown === 'operator' ? <p>ID</p> : <p>ID</p>}</span>,
      // dataIndex: "name",
      //sorter: (a, b) => a.name.length - b.name.length,
      render: (row) => (
        <div className="flex items-center justify-center">
          <p className="text-[1vw]">{row?.tbs_operator_id ? row?.tbs_operator_id : row?.tbs_partner_id ? row?.tbs_partner_id : row?.tbs_pro_emp_id}</p>
        </div>
      ),
      width: '10vw'
    }
  ];

  const [selectItems, setSelectItems] = useState();

  console.log(selectItems, 'select_Items')

  const handleOnClick = (record) => {
    setSelectItems(record);
    console.log(selectItems, "selectItems");
  };


  const downloadImages = async () => {
    const imageUrls = await fetchImages(); // Fetch your dynamic images

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
        `http://192.168.90.47:4000${selectItems?.aadhar_card_doc}`,
        `http://192.168.90.47:4000${selectItems?.pan_card_doc}`,
        `http://192.168.90.47:4000${selectItems?.offer_letter_doc}`,
        `http://192.168.90.47:4000${selectItems?.qualification_doc}`,

      ];
    }

    return images;
  };

  return (
    <>
      <div className="flex">
        <div className="grid grid-cols-5 gap-y-[2vw] gap-x-[2vw]">
          {/* {folder.map((drive) => ( */}
          <div className=""
            onClick={() => toggleDropDown('employee')}>
            <div className="w-[15vw] h-[10vw] border-[0.2vw] border-[#1F487C] bg-white  rounded-xl border-t-[0.5vw]">
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
                  {/* {drive.file} */} Employee
                </div>
                <div className="text-[0.9vw] text-[#1F487C]">
                  {documents?.length} files
                </div>
              </div>
            </div>
          </div>

          {/* --------------------------------------------------PartnerDocuments------------------------------------------------------------ */}

          <div className=""
            onClick={() => toggleDropDown('partner')}>
            <div className="w-[15vw] h-[10vw] border-[0.2vw] border-[#1F487C] bg-white  rounded-xl border-t-[0.5vw]">
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
                  {/* {drive.file} */} Partner
                </div>
                <div className="text-[0.9vw] text-[#1F487C]">
                  {partnerDocuments?.length} files
                </div>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------------OperatorDocument---------------------------------------------------------- */}

          <div className=""
            onClick={() => toggleDropDown('operator')}>
            <div className="w-[15vw] h-[10vw] border-[0.2vw] border-[#1F487C] bg-white  rounded-xl border-t-[0.5vw]">
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
                  {/* {drive.file} */} Operator
                </div>
                <div className="text-[0.9vw] text-[#1F487C]">
                  {operatorDocuments?.length} files
                </div>
              </div>
            </div>
          </div>
          {/* ))} */}
        </div>
      </div>

      {/* --------------------------------------------------------Table---------------------------------------------------------- */}

      <div className="flex gap-[0.5vw] mt-[1vw]">
        <div>

          {dropDown === 'employee' && (
            <div className="drop-down-content">
              <div className="w-[50vw]">
                <Table
                  columns={columns}
                  dataSource={documents}
                  // onChange={handleChange}
                  pagination={false}
                  className="customize-table"
                  scroll={{ y: '25vw' }}
                  onRow={(record) => ({
                    onClick: () => handleOnClick(record),
                  })}
                />
              </div>
            </div>
          )}

          {dropDown === 'partner' && (
            <div className="drop-down-content">
              <div className="w-[50vw]">
                <Table
                  columns={columns}
                  dataSource={partnerDocuments}

                  pagination={false}
                  className="customize-table"
                  onRow={(record) => ({
                    onClick: () => handleOnClick(record),
                  })}
                  scroll={{ y: '25vw' }}
                />
              </div>
            </div>
          )}

          {dropDown === 'operator' && (
            <div className="drop-down-content">

              <div className="w-[50vw]">
                <Table
                  columns={columns}
                  dataSource={operatorDocuments}

                  pagination={false}
                  className="customize-table"
                  scroll={{ y: '25vw' }}
                  onRow={(record) => ({
                    onClick: () => handleOnClick(record),
                  })}
                />
              </div>
            </div>
          )}
        </div>
        <div className="w-full">

          {dropDown === 'employee' ?
            <div>
              <p className="border-b-slate-400 border-b-[0.1vw] font-bold text-[#1F487C]">File Preview :</p>
              <div className="pt-[1.5vw] grid grid-cols-2 gap-[0.5vw] items-center">
                {
                  selectItems?.aadhar_card_doc ||
                    selectItems?.pan_card_doc ||
                    selectItems?.offer_letter_doc ||
                    selectItems?.qualification_doc ? (
                    <>
                      {selectItems?.aadhar_card_doc !== null && (
                        <img
                          src={`http://192.168.90.47:4000${selectItems?.aadhar_card_doc}`}
                          className="h-[10vw]"
                        />
                      )}
                      {selectItems?.pan_card_doc !== null && (
                        <img
                          src={`http://192.168.90.47:4000${selectItems?.pan_card_doc}`}
                          className="h-[10vw]"
                        />
                      )}
                      {selectItems?.offer_letter_doc !== null && (
                        <img
                          src={`http://192.168.90.47:4000${selectItems?.offer_letter_doc}`}
                          className="h-[10vw]"
                        />
                      )}
                      {selectItems?.qualification_doc !== null && (
                        <img
                          src={`http://192.168.90.47:4000${selectItems?.qualification_doc}`}
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
            ""}
          {dropDown === 'partner' ?
            <div>
              <p className="border-b-slate-400 border-b-[0.1vw] font-bold text-[#1F487C]">File Preview :</p>
              <div className="pt-[1.5vw] grid grid-cols-2 gap-[0.5vw] items-center">
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
            ""}

          {dropDown === 'operator' ?
            <div>
              <p className="border-b-slate-400 border-b-[0.1vw] font-bold text-[#1F487C]">File Preview :</p>
              <div className="pt-[1.5vw] grid grid-cols-2 gap-[0.5vw] items-center align-center">
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
            ""}
        </div>
      </div>

    </>
  );
}
