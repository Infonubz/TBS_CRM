import React, { useEffect, useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { Button, Dropdown, Grid, Space, Table, Modal } from "antd";
import axios from 'axios';
import dayjs from "dayjs";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { MdDownloadForOffline } from "react-icons/md";
import { capitalizeFirstLetter } from '../../../Common/Captilization';
import Image_Video from '../../../Common/Download/Image_Video';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import Import_Data from '../ImportData';
import ImportData from './ImportData';
import ModalPopup from '../../../Common/Modal/Modal';
import { toast } from 'react-toastify';
import { FaDownload } from "react-icons/fa6";


const CustomTemplate = () => {


    const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;
    const apiurl = process.env.REACT_APP_API_URL;

    const [documents, setDocuments] = useState([]);
    const [error, setError] = useState(null);
    const [dropDown, setDropDown] = useState('employee')
    const apiUrl = process.env.REACT_APP_API_URL;
    const [errors, setErrors] = useState()
    const [selectItems, setSelectItems] = useState();

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [deletemodalIsOpen, setDeleteModalIsOpen] = useState(false);
    const closeDeleteModal = () => {
        setDeleteModalIsOpen(false);
    };


    const closeModal = () => {
        setModalIsOpen(false);
        // SetUpdateData(null);
        // setOfferData("");
        // Getofferdata();
    };

    console.log(selectItems, 'select_Items')

    const handleOnClick = (record) => {
        setSelectItems(record);

        console.log(selectItems, "selectItems");
    };

    const handleDownload = (row) => {
        if (!row) {
            setErrors("Please select a Module.");
        } else {
            const fileUrl = `${apiImgUrl}${row?.upload_files}`;
            const a = document.createElement('a');
            a.href = fileUrl;
            a.download = '';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };


    console.log(documents, 'documents_documentes')

    const user = sessionStorage.getItem("USER_ID");

    const fetchDocuments = async () => {
        try {
            const URL = `${apiUrl}/impdata`;
            const response = await axios.get(URL);
            setDocuments(response.data);
            console.log(response, "response documents");
        } catch (error) {
            setError(error.message);
            // setLoading(false);
        }
    };

    const DeleteTemplate = async () => {

        console.log('blallasasdfasd')
        try {
            // const URL = http://192.168.90.47:4000/api/impdata/44355
            const URL = `${apiUrl}/impdata/${selectItems?.imp_id}`;
            const response = await axios.delete(URL)
            toast.success(response.data)
            fetchDocuments()
            setDeleteModalIsOpen(false)
            console.log(response, 'delete_response')
        } catch (error) {
            setError(error.message)
        }
    }

    useEffect(() => {
        fetchDocuments();
    }, []);


    const toggleDropDown = (section) => {
        setDropDown(dropDown === section ? null : section);
    };

    const columns = [
        {
            title: <span className="text-[1.1vw] text-[#1F487C] flex items-center justify-center font-bold">S.No</span>,
            // dataIndex: "name",
            //sorter: (a, b) => a.name.length - b.name.length,
            render: (text, row, index) => (
                <div className="flex items-center justify-center font-normal text-[#1F487C] text-[1vw]">
                    {index + 1} {/* index+1 will give the serial number */}
                </div>
            ),
            width: '10vw'
        },
        {
            title: <span className="text-[1.1vw]  text-[#1F487C] flex items-center justify-center  font-bold">File Name</span>,
            // dataIndex: "name",
            //sorter: (a, b) => a.name.length - b.name.length,
            render: (row) => (
                <div className="flex items-center justify-center font-normal text-[1vw] text-[#1F487C]">
                    {row?.select_fields}
                </div>
            ),
            width: '10vw'
        },
        {
            title: <span className="text-[1.1vw]  text-[#1F487C] flex items-center justify-center  font-bold">Created Date</span>,
            // dataIndex: "name",
            //sorter: (a, b) => a.name.length - b.name.length,
            render: (row) => (
                <div className="flex items-center justify-center font-normal text-[1vw] text-[#1F487C]">
                    {dayjs(row?.created_date).format("DD MMM, YY")}
                </div>
            ),
            width: '10vw'
        },
        {
            title: <span className="text-[1.1vw]  text-[#1F487C] flex items-center justify-center  font-bold">Update Date</span>,
            // dataIndex: "name",
            //sorter: (a, b) => a.name.length - b.name.length,
            render: (row) => (
                <div className="flex items-center font-normal justify-center text-[1vw] text-[#1F487C]" >
                    {row?.updated_date ? dayjs(row?.updated_date).format("DD MMM, YY") : ''}
                </div>
            ),
            width: '10vw'
        },
        {
            title: <span className="text-[1.1vw]  text-[#1F487C] flex items-center justify-center  font-bold">Action</span>,
            // dataIndex: "name",
            //sorter: (a, b) => a.name.length - b.name.length,
            render: (row) => (
                <div className="flex items-center font-normal justify-center">
                    <div className='flex items-center justify-center gap-[1vw]'>
                        <MdDelete
                            size='1.5vw'
                            className='cursor-pointer'
                            color='#1F487C'
                            onClick={() => {
                                setDeleteModalIsOpen(true);
                            }} />
                        <MdEdit
                            size='1.5vw'
                            color='#1F487C'
                            className='cursor-pointer'
                            onClick={() => { setModalIsOpen(true) }} />

                        <div className='cursor-pointer'>
                            <MdDownloadForOffline
                                size='1.5vw'
                                color='#1F487C'
                                onClick={() => handleDownload(row)} />
                        </div>
                    </div>
                </div>
            ),
            width: '10vw'
        }
    ];

    return (
        <>
            <div className='p-[1vw] '>
                <div className='rounded-xl border-[#1F487C] border-[0.1vw] border-b-[0.1vw]' >

                    {/* -------------------------------------------SearchTab------------------------------------- */}

                    <div className='flex bg-[#1F487C] rounded-t-xl py-[0.5vw] items-center gap-[1vw] justify-between'>
                        <div className='flex gap-[1vw]'>
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
                                <span className='text-white text-[1vw]'>Sort : </span>
                                <span className='text-white text-[1vw]'>Module Name</span>
                                <span className='text-white text-[1vw]'>File Size </span>
                                <span className='text-white text-[1vw]'>Date Added</span>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                setModalIsOpen(true)
                                setSelectItems('')
                            }}
                            className='order-last w-[7.5vw] px-[1.5vw] bg-white mr-[2vw] text-[#1F487C] rounded-md text-[1.2vw] h-[2.5vw] font-semibold flex items-center justify-center gap-[0.5vw]'>
                            <span><FaDownload /></span><span>Import</span>
                        </button>
                    </div>

                    {/* ------------------------------------Folders----------------------------------------------- */}

                    <div className="p-[1vw] grid grid-cols-5 justify-items-center gap-y-[1vw]">
                        {documents.map((items) => (
                            <div
                                // onClick={() => toggleDropDown('employee')}
                                className="w-[15vw] h-[10vw] border-[0.2vw] border-[#1F487C] bg-white  rounded-xl border-t-[0.5vw]">
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
                                    <div className="text-[0.9vw] text-[#8398B7]">
                                        {items.select_fields}
                                    </div>
                                    <div className="text-[0.9vw] text-[#1F487C]">
                                        1 files
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* ------------------------------------------RecentDocuments--------------------------------- */}
                <div>
                    <div className='px-[1vw]'>
                        <div className='font-bold text-[1.25vw] text-[#1F487C] '>

                            <div>
                                <Table
                                    columns={columns}
                                    dataSource={documents}
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
                    </div>
                </div >
            </div >

            <ModalPopup
                show={modalIsOpen}
                onClose={closeModal}
                height="auto"
                width="auto"
                className=""
            >
                <ImportData fetchDocuments={fetchDocuments} closeModal={closeModal} selectFields={selectItems?.select_fields} />
            </ModalPopup>

            <ModalPopup
                show={deletemodalIsOpen}
                onClose={closeDeleteModal}
                height="auto"
                width="30vw"
                closeicon={false}
            >
                <p className='text-[#1F487C] text-[1.2vw] text-center'>Are You Sure want to delete this {selectItems?.select_fields} ?</p>
                <div className="flex items-center mt-[2vw] gap-[2vw] justify-center">
                    <button
                        className="border-[#1f4b7f] border-[0.1vw] rounded-[0.5vw] text-[1.1vw] font-semibold text-[#1f4b7f] w-[10vw]  h-[3vw]"
                        onClick={() => setDeleteModalIsOpen(false)}
                    >
                        No
                    </button>
                    <button
                        className="bg-[#1f4b7f] text-white font-semibold text-[1.1vw] w-[10vw] h-[3vw] rounded-[0.5vw]"
                        // onClick={() => DeletePromoData()}
                        onClick={() => DeleteTemplate()}
                    >
                        Yes
                    </button>
                </div>
            </ModalPopup>

        </>
    )
}

export default CustomTemplate