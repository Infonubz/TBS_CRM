import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { ChangeTHemeId, ChangeTHemeStatus, GetThemeBg } from "../../../Api/Settings/ThemeSetting/ThemeSettings";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import ModalPopup from "../../Common/Modal/Modal";
import direction from '../../../asserts/direction.png'

export default function ListTheme({ setThemeID, setTogglePage, setDeleteThemeModal, setThemeName, themeId, theme_background }) {



    const [hoverId, setHoverId] = useState('')
    const [button, setbutton] = useState('')
    const [themeStatusModal, setThemeStatusModal] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        GetThemeBg(dispatch)
    }, [dispatch])


    const handleDeleteTheme = (theme_id) => {
        setThemeID(theme_id)
        setDeleteThemeModal(true)
    }

    const handlechange = async (status_id, status) => {
        console.log(status_id, themeId, 'status_id_status')
        try {
            const data = await ChangeTHemeStatus(dispatch, themeId, status_id, status);
            console.log(data, 'datadatatatatat');
        } catch (error) {
            console.error("Error uploading data", error);
        }
    };


    const columns = [
        {
            title: (<div className="flex items-center justify-center text-[1.2vw] ">S.No</div>),
            width: "5vw",
            dataIndex: 'key',
            render: (text, record, index) => {
                return (
                    <div className="text-[1vw] flex items-center justify-center text-[#1F487C]">{index + 1}</div>
                )
            },

        },
        {
            title: (<div className="flex items-center justify-center text-[1.2vw]">Title</div>),

            render: (row) => {
                return (
                    <div className=" text-[1vw] flex items-center justify-center text-[#1F487C]" >
                        {row?.title}
                    </div>
                );
            },
        },
        {
            title: (<div className="flex items-center justify-center text-[1.2vw]">Created Date</div>),
            render: (row) => {
                return (
                    <div className="text-[1vw] flex items-center justify-center text-[#1F487C]">
                        {dayjs(row?.created_date).format("MMM DD, HH:mm")}
                    </div>
                );
            },
        },
        {
            title: (<div className="flex items-center justify-center text-[1.2vw]">Updated Date</div>),
            render: (row) => {
                return (
                    <div className=" text-[1vw] flex items-center justify-center text-[#1F487C]">
                        {dayjs(row?.update_date).format("MMM DD, HH:mm")}
                    </div>
                );
            },
        },
        {
            title: (<div className="flex items-center justify-center text-[1.2vw]">Status</div>),
            render: (row) => {
                return (
                    <div className=" text-[1vw] flex items-center justify-center text-[#1F487C]">
                        <button className={`${row?.status_id === 3 ? 'bg-[#FD3434]' : 'bg-[#34AE2B]'} items-center text-[1vw] text-white shadow-md font-extrabold shadow-black space-x-[0.7vw] px-[0.8vw] rounded-[0.5vw]  w-[6vw] ${row?.status_id === 2 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            disabled={row?.status_id === 2}
                            onClick={() => {
                                setThemeStatusModal(true)
                                setThemeID(row?.theme_id)
                            }}>
                            {row?.status}
                        </button>
                    </div>
                );
            },
        },
        {
            title: (<div className="flex items-center justify-center text-[1.2vw] ">Action</div>),
            width: "18vw",
            render: (row) => {

                return (
                    <div className="flex items-center justify-center gap-[0.75vw] ">
                        <span
                            onMouseEnter={() => {
                                setHoverId(row?.theme_id)
                                setbutton('view')
                            }}
                            onMouseLeave={() => {
                                setHoverId('')
                                setbutton('')
                            }}
                            className={`px-[0.3vw] text-[1vw] border-[0.1vw] border-[#1F487C] flex items-center justify-center rounded-[0.25vw] gap-[0.25vw] cursor-pointer ${row?.theme_id === hoverId && button === 'view' ? 'bg-[#1F487C] text-white' : 'bg-white text-[#1F487C]'}`}
                            style={{ transition: "all 0.3s" }}>
                            <FaEye />
                            <p>View</p>
                        </span>
                        <span
                            onMouseEnter={() => {
                                setHoverId(row?.theme_id)
                                setbutton('edit')
                            }}
                            onMouseLeave={() => {
                                setHoverId('')
                                setbutton('')
                            }}
                            className={`px-[0.3vw] text-[1vw] border-[0.1vw] border-[#1F487C] flex items-center justify-center rounded-[0.25vw] gap-[0.25vw] cursor-pointer ${row?.theme_id === hoverId && button === 'edit' ? 'bg-[#1F487C] text-white' : 'bg-white text-[#1F487C]'}`}
                            style={{ transition: "all 0.3s" }}
                            onClick={() => {
                                setThemeID(row?.theme_id);
                                setTogglePage(2);
                            }}
                        >
                            <MdEdit />
                            <p>Edit</p>
                        </span>
                        <span
                            onMouseEnter={() => {
                                setHoverId(row?.theme_id)
                                setbutton('delete')
                            }}
                            onMouseLeave={() => {
                                setHoverId('')
                                setbutton('')
                            }}
                            className={`px-[0.3vw] text-[1vw] border-[0.1vw]  flex items-center justify-center rounded-[0.25vw] gap-[0.25vw] cursor-pointer ${row?.theme_id === hoverId && button === 'delete' ? 'bg-[#FD3434] text-white border-[#FD3434]' : 'bg-white text-[#1F487C] border-[#1F487C]'}`}
                            style={{ transition: "all 0.3s" }}
                            onClick={() => {
                                handleDeleteTheme(row?.theme_id);
                                setThemeName(row?.title);
                            }}
                        >
                            <MdDelete />
                            <p>Delete</p>
                        </span>
                    </div>
                );
            },
        }

    ];

    return (
        <>
            <Table className='custom-table' columns={columns} dataSource={theme_background} pagination={false} />



            <ModalPopup
                className="border border-[#1f487c] border-b-8 border-r-8 border-b-[#1f487c] border-r-[#1f487c] rounded-md"
                show={themeStatusModal}
                closeicon={false}
                onClose={() => {
                    setThemeStatusModal(false)
                }}
                height="16vw"
                width="30vw"
            >

                <div className="flex flex-col items-center justify-center">
                    <p className="text-[1.5vw] text-[]">Update Theme Status</p>
                    <img src={direction} className="h-[6vw] w-[6vw] my-[1vw]"></img>
                    <div className="flex gap-2 mt-[1vw]">
                        <button
                            className="items-center text-[1vw] text-white shadow-md font-bold shadow-black space-x-[0.7vw] px-[0.8vw] w-[7vw] h-[2vw]  bg-[#34AE2B] rounded-[0.5vw] cursor-pointer"
                            onClick={() => {
                                handlechange(2, "Active")
                                setThemeStatusModal(false)
                            }}
                        >
                            Active
                        </button>
                        {/* <button
                            className="items-center text-[0.9vw] text-white  space-x-[0.7vw] px-[0.8vw] w-[8vw] h-[2vw] bg-[#ff2a2a] rounded-[0.5vw]"
                            onClick={() => handlechange(3, "Inactive")}
                        >
                            In Active
                        </button> */}
                    </div>
                </div>
            </ModalPopup>


        </>
    )
}
