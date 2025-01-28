//import { render } from "@testing-library/react";
import {
  Table,
  //Pagination,
  Tooltip,
} from "antd";
import React from "react";
//import { IoMdEye } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import "../../App.css";
import dayjs from "dayjs";
//import ModalPopup from "../Common/Modal/Modal";
//import DeleteList from "../Offers/DeleteList";
import { capitalizeFirstLetter } from "../Common/Captilization";
import { FaEye } from "react-icons/fa";

export default function ListView({
  currentData,
  setModalIsOpen,
  SetUpdateData,
  promotionId,
  setPromotionId,
  setDeleteModalIsOpen,
  activePage,
  CurrentTab,
  itemsPerPage,
  statusUpdateModal,
  setStatusUpdateModal,
  setComments,
  listType,
  setEyeModalIsOpen,
  eyeModalIsOpen,
  setPromoImage,
}) {
  //const apiUrl = process.env.REACT_APP_API_URL;
  const type_Id = sessionStorage.getItem("type_id");

  const handleStatus = (row) => {
    // if (
    //   type_Id.startsWith("PRO") ||
    //   (type_Id === "OP101" && listType === "employee")
    // ) {
    //   setStatusUpdateModal(true);
    //   setPromotionId(row.promo_id);
    //   SetUpdateData(row.promo_id);
    //   setComments(row.comments);
    // }
    if (
      type_Id.startsWith("PRO") ||
      (type_Id === "OP101" && listType === "employee" && !([2, 3, 4].includes(row.promo_status_id) && row.promo_status_id === row.user_status_id))
    ) {
      setStatusUpdateModal(true);
      setPromotionId(row.promo_id);
      SetUpdateData(row.promo_id);
      setComments(row.comments);
    }
  };

  const handleDelete = (promo_id) => {
    setPromotionId(promo_id);
    setDeleteModalIsOpen(true);
  };


  const showComment =
    type_Id === "PRO101" || type_Id === "OP101" || type_Id === "OPEMP101"
      ? CurrentTab === "Rejected" ||
      CurrentTab === "Hold" ||
      CurrentTab === "Approved" ||
      CurrentTab === "All"
      : false;

  // const [promotionId, setPromotionId] = useState(null);
  const columns = [
    {
      title: (
        <h1 className="text-[1.1vw] font-bold flex items-center justify-center">
          S.No
        </h1>
      ),
      width: "4vw",
      render: (row, rowdta, index) => {
        const serialNumber = (activePage - 1) * itemsPerPage + (index + 1);
        return (
          <div className="flex ">
            <h1 className="pl-[1.1vw] text-[#1F487C]">{serialNumber}</h1>
          </div>
        );
      },
    },
    {
      title: (
        <h1 className="text-[1.1vw] font-bold flex items-center justify-center">
          Operator Name
        </h1>
      ),
      sorter: (a, b) => a.operator_details?.localeCompare(b.operator_details),
      render: (row, rowdta, index) => {
        console.log(row, "rowqwertyuiop");

        return (
          <div className="flex pl-[1vw] font-bold text-[#1F487C] text-[1vw]">
            {row?.operator_details?.length > 15 ? (
              <Tooltip
                placement="top"
                title={row?.operator_details}
                className="cursor-pointer"
                color="#FFFFFF"
                overlayInnerStyle={{
                  color: "#1F487C",
                  fontSize: "0.85vw",
                }}
              >
                {`${row?.operator_details?.charAt(0) === row?.operator_details?.charAt(0).toLowerCase()
                  ? capitalizeFirstLetter(row?.operator_details).slice(0, 15)
                  : row?.operator_details?.slice(0, 15)}...`}
              </Tooltip>
            ) : row?.operator_details ? (
              <span className="text-[#1F487C] text-[1vw]">
                {
                  row?.operator_details?.charAt(0) === row?.operator_details?.charAt(0).toLowerCase()
                    ? capitalizeFirstLetter(row?.operator_details?.slice(0, 15))
                    : row?.operator_details?.slice(0, 15)
                }
              </span>
            ) : (
              <span className="text-[#1F487C] pl-[2vw] text-[1.5vw]">-</span>
            )}
          </div>
        );
      },
      // width: "15vw",
    },
    {
      title: (
        <h1 className="text-[1.1vw] font-bold flex items-center justify-center">
          Promo Title
        </h1>
      ),
      sorter: (a, b) => a.promo_name?.localeCompare(b.promo_name),
      render: (row, rowdta, index) => {
        return (
          <div className="flex pl-[1.5vw] font-bold text-[#1F487C] text-[1vw]">
            {row?.promo_name?.length > 15 ? (
              <Tooltip
                placement="top"
                title={row?.promo_name}
                className="cursor-pointer"
                color="#FFFFFF"
                overlayInnerStyle={{
                  color: "#1F487C",
                  fontSize: "0.85vw",
                }}
              >
                {/* {`${row?.promo_name?.slice(0, 15)}...`} */}
                {`${row?.promo_name?.charAt(0) === row?.promo_name?.charAt(0).toLowerCase()
                  ? capitalizeFirstLetter(row?.promo_name).slice(0, 15)
                  : row?.promo_name?.slice(0, 15)}...`}
              </Tooltip>
            ) : (
              row?.promo_name?.charAt(0) === row?.promo_name?.charAt(0).toLowerCase()
                ? capitalizeFirstLetter(row?.promo_name?.slice(0, 15))
                : row?.promo_name?.slice(0, 15)
            )}{" "}
          </div>
        );
      },
      // width: "15vw",
    },
    {
      title: (
        <h1 className="text-[1.1vw] font-bold  flex items-center justify-center">
          Promo Code
        </h1>
      ),
      sorter: (a, b) => a.promo_code.localeCompare(b.promo_code),
      render: (row, rowdta, index) => {
        return (
          <div className="flex items-center justify-center">
            {row?.promo_code?.length > 15 ? (
              <Tooltip
                placement="right"
                title={row?.promo_code}
                className="cursor-pointer"
                color="#FFFFFF"
                overlayInnerStyle={{
                  color: "#1F487C",
                  fontSize: "0.85vw",
                }}
              >
                <div className="border-[0.1vw] border-[#1F487C] rounded-[0.5vw]">
                  <div className="border-dashed text-[1.1vw] bg-[#1F4B7F] border-white border-[0.2vw] rounded-[0.5vw] text-white w-[10vw] flex items-center justify-center">
                    {`${row?.promo_code?.slice(0, 15)}...`}{" "}
                  </div>
                </div>
              </Tooltip>
            ) : (
              <div className="border-[0.1vw] border-[#1F487C] rounded-[0.5vw]">
                <div className="border-dashed text-[1.1vw] font-bold bg-[#1F4B7F] border-white border-[0.2vw] rounded-[0.5vw] text-white w-[10vw] flex items-center justify-center">
                  {row?.promo_code?.slice(0, 15)}
                </div>
              </div>
            )}
          </div>
          //   <div className="flex items-center text-[#1F487C] justify-center">
          //   <div className="flex items-center justify-center">
          //   <p className="text-[1.1vw] text-[#1F487C]">{row?.promo_code}</p>
          // </div>
          // </div>
        );
      },
      // width: "15vw",
    },
    {
      title: (
        <h1 className="text-[1.1vw] font-bold  flex items-center justify-center">
          Promo Value
        </h1>
      ),
      sorter: (a, b) => {
        if (
          typeof a?.promo_value === "number" &&
          typeof b?.promo_value === "number"
        ) {
          return a?.promo_value - b?.promo_value;
        }
        const valueA = String(a?.promo_value || "");
        const valueB = String(b?.promo_value || "");
        return valueA.localeCompare(valueB);
      },
      //sorter: (a, b) => a.promo_value.localeCompare(b.promo_value),
      render: (row, rowdta, index) => {
        return (
          <div className="flex pl-[3vw] text-[#1F487C]">
            <div className="flex items-center justify-center">
              <p className="text-[1.1vw] text-[#1F487C] font-bold">
                {row?.value_symbol === "₹"
                  ? ` ${row?.value_symbol} ${row?.promo_value}`
                  : `${row?.promo_value}${row?.value_symbol}`}
              </p>
            </div>
          </div>
        );
      },
      // width: "15vw",
    },
    {
      title: (
        <h1 className="text-[1.1vw] font-bold  flex items-center justify-center">
          Created
        </h1>
      ),
      sorter: (a, b) =>
        dayjs(a.start_date).valueOf() - dayjs(b.start_date).valueOf(),
      // width: "15vw",
      render: (row) => {
        return (
          <div className="flex pl-[1vw] ">
            <p className="text-[1vw] text-[#1F487C]">{`${dayjs(
              row?.start_date
            ).format("DD MMM YY")}`}</p>
          </div>
        );
      },
    },
    {
      title: (
        <h1 className="text-[1.1vw] font-bold  flex items-center justify-center">
          Duration
        </h1>
      ),
      sorter: (a, b) =>
        dayjs(a.start_date).valueOf() - dayjs(b.start_date).valueOf(),
      // width: "15vw",
      render: (row) => {
        return (
          <div className="flex pl-[1.8vw]">
            <p className="text-[1vw] text-[#1F487C]">{`${dayjs(
              row?.start_date
            ).format("DD MMM")} - ${dayjs(row?.expiry_date).format(
              "DD MMM"
            )}`}</p>
          </div>
        );
      },
    },
    {
      title: (
        <h1 className="text-[1.1vw] font-bold  flex items-center justify-center">
          Usage
        </h1>
      ),
      sorter: (a, b) => a.usage - b.usage,
      // width: "11vw",
      render: (row) => {
        return (
          <div className="flex pl-[1.1vw]">
            <p className="text-[1vw] text-[#1F487C]">0/{row.usage}</p>
          </div>
        );
      },
    },
    // {
    //   title: (
    //     <h1 className="text-[1.1vw] font-bold flex items-center justify-center">
    //       Promo Title
    //     </h1>
    //   ),
    //   sorter: (a, b) => a.promo_name?.localeCompare(b.promo_name),
    //   render: (row, rowdta, index) => {
    //     return (
    //       <div className="flex pl-[1.5vw] font-bold text-[#1F487C] text-[1vw]">
    //         {row?.promo_name?.length > 15 ? (
    //           <Tooltip
    //             placement="top"
    //             title={row?.promo_name}
    //             className="cursor-pointer"
    //             color="#FFFFFF"
    //             overlayInnerStyle={{
    //               color: "#1F487C",
    //               fontSize: "0.85vw",
    //             }}
    //           >
    //             {`${row?.promo_name?.slice(0, 15)}...`}
    //           </Tooltip>
    //         ) : (
    //           capitalizeFirstLetter(row?.promo_name?.slice(0, 15))
    //         )}{" "}
    //       </div>
    //     );
    //   },
    //   // width: "15vw",
    // },
    ...(showComment
      ? [
        {
          title: (
            <h1 className="text-[1.1vw] font-bold flex items-center justify-center">
              Comments
            </h1>
          ),
          //sorter: (a, b) => a.usage - b.usage,
          // width: "11vw",
          render: (row) => {
            return (
              <div className="flex pl-[1.1vw] text-[#1F487C]">
                {row?.comments && row?.comments?.length > 10 ? (
                  <Tooltip
                    placement="top"
                    title={row?.comments}
                    className="cursor-pointer"
                    color="#FFFFFF"
                    overlayInnerStyle={{
                      color: "#1F487C",
                      fontSize: "0.85vw",
                    }}
                  >
                    <span className="text-[#1F487C] text-[1vw]">{`${row?.comments?.slice(0, 10)}...`}</span>
                  </Tooltip>
                ) : row?.comments ? (
                  <span className="text-[#1F487C] text-[1vw]">
                    {capitalizeFirstLetter(row?.comments)}
                  </span>
                ) : (
                  <span className="text-[#1F487C] pl-[2vw] text-[1.5vw]">-</span>
                )}
              </div>
            );
          },
        },
      ]
      : ""),
    {
      title: (
        <h1 className="text-[1.1vw] font-bold  flex items-center justify-center">
          Status
        </h1>
      ),
      // width: "11vw",
      render: (row) => {
        console.log(row.promo_status_id === 0, "schjbsdc");
        return (
          <div className="flex items-center justify-center">
            {row?.promo_status_id != null ? (
              <button
                className={`${row.promo_status_id === 0
                  ? "bg-[#646262]"
                  : row.promo_status_id === 1
                    ? "bg-[#FF9900]"
                    : row.promo_status_id === 2
                      ? "bg-[#34AE2B]"
                      : row.promo_status_id === 3
                        ? "bg-[#2A99FF]"
                        : row.promo_status_id === 4
                          ? "bg-[#FD3434]"
                          : row.promo_status_id === 5
                            ? "bg-[#FF9900]"
                            : row.promo_status_id === 6 && type_Id === "PRO101" ? "bg-[#FF9900]" : row.promo_status_id === 6 && type_Id === "OPEMP101" ? "bg-[#FF9900]" : "bg-[#FF9900]"
                  } rounded-[0.5vw] shadow-md shadow-black font-extrabold text-[1vw]  text-white w-[7vw] py-[0.2vw]`}
                onClick={() => {
                  handleStatus(row);
                }}
              >
                {type_Id === "OPEMP101" && row.promo_status === "Pending" ? "Posted" : type_Id === "OPEMP101" && row.promo_status === "Repost" ? "Posted" : type_Id === "PRO101" && row.promo_status === "Repost" ? "Pending" : type_Id === "PRO101" && row.promo_status === "Posted" ? "Pending" : capitalizeFirstLetter(row.promo_status)}
              </button>
            ) : (
              ""
            )}
          </div>
        );
      },
    },
    {
      title: (
        <h1 className="text-[1.1vw] font-bold  flex items-center justify-center">
          Actions
        </h1>
      ),
      width: "8vw",
      render: (row) => {
        console.log(row, "rowrowrowrow");
        return (
          <div className="flex px-[1.5vw] items-center justify-between">
            {/* <div><IoMdEye size={"1.6vw"} color="#1F4B7F" onClick={() => { setEyeModalIsOpen(true) }} /></div> */}
            <FaEye
              className="text-[1.3vw] text-[#1F487C] cursor-pointer"
              onClick={() => {
                setPromoImage(row.background_image);
                setEyeModalIsOpen(true);
                console.log(row.background_image, "bg image");
              }}
            />
            {(type_Id === "PRO101") ? (
              <MdEdit
                size={"1.3vw"}
                color="#1F4B7F"
                className=" cursor-pointer"
                onClick={() => {
                  setPromotionId(row.promo_id);
                  SetUpdateData(row.promo_id);
                  setModalIsOpen(true);
                }}
              />
            ) : (type_Id === "OP101" && [2, 3, 4].includes(row.promo_status_id) && row.promo_status_id === row.user_status_id) ? null : (type_Id === "OPEMP101" && [2, 5, 3, 4, 6].includes(row.promo_status_id)) ? null : (
              <MdEdit
                size={"1.3vw"}
                color="#1F4B7F"
                className="cursor-pointer"
                onClick={() => {
                  console.log(type_Id === "OPEMP101" && [2, 5].includes(row.promo_status_id), "conditionconditionnnnnn")
                  setPromotionId(row.promo_id);
                  SetUpdateData(row.promo_id);
                  sessionStorage.setItem("currenttbsuserid", row.tbs_user_id)
                  setModalIsOpen(true);
                }}
              />
            )}
            <MdDelete
              size={"1.3vw"}
              color="#1F4B7F"
              className=" cursor-pointer"
              onClick={() => {
                handleDelete(row.promo_id);
              }}
            />
          </div>
        );
      },
    },
  ];

  // const closeDeleteModal = () => {
  //   setDeleteModalIsOpen(false);
  // };

  return (
    // <div style={{ height: "100%" }} className="table-container">
    <>
      <Table
        // dataSource={data}
        dataSource={currentData}
        columns={columns}
        pagination={false}
        className="custom-table"
      />
    </>
    // </div>
    // ;{/* <Pagination itemsPerPage={itemsPerPage} items={dataSource} /> */}
  );
}
