import { useEffect, useState } from "react";
import Backdrop from "../../asserts/CRMbg.png";
import "./Dashboard.css";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import PowerBi from "./PowerBi";
import { useDispatch, useSelector } from "react-redux";
import {
  GetNotificationData,
  UnreadNotification,
} from "../../Api/Notification/Notification";
import PowerBIReport from "./PowerBIReport";
import NewPowerbi from "./NewPowerbi";
// import NewPowerbi from "./NewPowerBi";
import {
  GetBookingDetails,
  GetBookingDetailsById,
} from "../../Api/Dashboard/Dashboard";
import { Table, Spin, Tooltip } from "antd";
import ReactPaginate from "react-js-pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import dayjs from "dayjs";

export default function DashboardDemo() {
  const [spinning, setSpinning] = useState(false);
  const [updatedata, SetUpdateData] = useState();
  const [expandedRowKey, setExpandedRowKey] = useState(null);
  const [operatorData, setOperatorData] = useState();

  const getBookingDetails =
    useSelector((state) => state.crm.booking_details) || [];
  console.log(getBookingDetails, "booking details dashboard");

  const handleRowClick = (record) => {
    console.log(record, "record");
    SetUpdateData(record.ticket_no);
    setExpandedRowKey(record.key === expandedRowKey ? null : record.key);
    console.log(expandedRowKey, "record record");
  };
  const dispatch = useDispatch();
  useEffect(() => {
    UnreadNotification(dispatch);
  }, []);

  useEffect(() => {
    // Function to prevent zoom on touch events
    const preventZoom = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // Function to prevent double tap zoom
    const preventDoubleTapZoom = (e) => {
      e.preventDefault();
    };

    // Add event listeners for touchstart and double tap
    document.addEventListener("touchstart", preventZoom, { passive: false });
    document.addEventListener("dblclick", preventDoubleTapZoom, {
      passive: false,
    });

    // Add event listener for wheel event to prevent zoom on Ctrl + scroll
    const handleWheel = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });

    // Add event listeners for gesture events on Safari
    const preventGestureZoom = (e) => {
      e.preventDefault();
    };
    document.addEventListener("gesturestart", preventGestureZoom);
    document.addEventListener("gesturechange", preventGestureZoom);
    document.addEventListener("gestureend", preventGestureZoom);

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener("touchstart", preventZoom);
      document.removeEventListener("dblclick", preventDoubleTapZoom);
      window.removeEventListener("wheel", handleWheel);
      document.removeEventListener("gesturestart", preventGestureZoom);
      document.removeEventListener("gesturechange", preventGestureZoom);
      document.removeEventListener("gestureend", preventGestureZoom);
    };
  }, []);
  useEffect(() => {
    const metaTag = document.createElement("meta");
    metaTag.name = "viewport";
    metaTag.content =
      "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";
    document.getElementsByTagName("head")[0].appendChild(metaTag);

    // Disable pinch-to-zoom
    const preventZoom = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    document.addEventListener("wheel", preventZoom, { passive: false });

    return () => {
      document.removeEventListener("wheel", preventZoom);
    };
  }, []);
  useEffect(() => {
    GetNotificationData(dispatch);
  }, []);

  const reportId = "f8b29529-d035-4c97-ad20-b2d85cfe1151";
  const height = "500px";
  const width = "100%";
  const embedUrl =
    "https://app.powerbi.com/reportEmbed?reportId=f8b29529-d035-4c97-ad20-b2d85cfe1151&groupId=59e770fb-a36e-4bb8-be19-4d0c182c99dd&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZX19";
  const accessToken =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ikg5bmo1QU9Tc3dNcGhnMVNGeDdqYVYtbEI5dyIsImtpZCI6Ikg5bmo1QU9Tc3dNcGhnMVNGeDdqYVYtbEI5dyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMDdiYjM5ZWQtOWM5MC00ZjRmLThlYTctZGFlNWFiNTAwNmQ0LyIsImlhdCI6MTcyNjIwNjI1NywibmJmIjoxNzI2MjA2MjU3LCJleHAiOjE3MjYyMTAxNTcsImFpbyI6IkUyZGdZQkIydnRtVW1MWHBuQVAzQzVHbktVd25BQT09IiwiYXBwaWQiOiI1ZGJkODFiZC0yNGMyLTQwYmMtYmVlNi1iZjBlMzQ1Mjk0OTEiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8wN2JiMzllZC05YzkwLTRmNGYtOGVhNy1kYWU1YWI1MDA2ZDQvIiwiaWR0eXAiOiJhcHAiLCJvaWQiOiI1ZTNiMTE4Ny0yOGFjLTRiOWMtYThkZC03MmE0YmY2NzQ1NDMiLCJyaCI6IjAuQVZZQTdUbTdCNUNjVDAtT3A5cmxxMUFHMUFrQUFBQUFBQUFBd0FBQUFBQUFBQUNmQUFBLiIsInN1YiI6IjVlM2IxMTg3LTI4YWMtNGI5Yy1hOGRkLTcyYTRiZjY3NDU0MyIsInRpZCI6IjA3YmIzOWVkLTljOTAtNGY0Zi04ZWE3LWRhZTVhYjUwMDZkNCIsInV0aSI6Ikw1UzVIX09VTjB5X0pCYlY5TE1nQUEiLCJ2ZXIiOiIxLjAiLCJ4bXNfaWRyZWwiOiI3IDI2In0.Ofc3nHFtY_dc0RpyVUQ90a7jXdkxOvQMMllVaOLiyCzhYqNA5gs2zN-XfLSppEcpbt424f_qO6RNRzdRPjYGl4tQuiWAvJ5Chs_34HzQ_-MKhkgYfYBPCFjNDRY8ZnAc1_DaF-0oeS4xJew3L2ML_bO87bVtv6Epp9-ihSo2eOdECojyV7MWd9CKCxCW0DN4UbfIjMj6ZrR_wgmgk6UBZFT-KJ4sIyo-08Q6iCJ0kPaxavm1CdSsHRfj2jQyVgch7BIFdciyv2dkD3Ed1xAwNtUsfCHr2zrN5GZri9J8zUwp9fe803-1uBFk324l4vbRwOXhSQIYpPe-4wmJU2_BJg";
  //-------------------------------------
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    console.log(activePage, "active page");
    console.log(itemsPerPage, "page items");
  };
  // Calculate pagination slice based on activePage
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    getBookingDetails?.length > 0 &&
    getBookingDetails?.slice(indexOfFirstItem, indexOfLastItem);
  // console.log(currentItems.length, "leeeeeength");
  const columns = [
    {
      title: (
        <div
          className="text-[1.2vw] text-center font-bold"
          style={{ color: "white" }}
        >
          S.No
        </div>
      ),
      width: "7vw",
      render: (row, rowdta, index) => {
        return (
          <div className="flex justify-center text-[#1F4B7F] text-[1vw] py-[0.5vw]">
            {index + 1}
          </div>
        );
      },
    },
    {
      title: (
        <div
          className="text-[1.2vw] text-center font-bold"
          style={{ color: "white" }}
        >
          Email
        </div>
      ),
      width: "7vw",
      render: (row, rowdta, index) => {
        return (
          <div className="flex justify-center text-[#1F4B7F] text-[1vw] py-[0.5vw]">
            {row.email}
          </div>
        );
      },
    },
    {
      title: (
        <div
          className="text-[1.2vw] text-center font-bold"
          style={{ color: "white" }}
        >
          Mobile
        </div>
      ),
      width: "7vw",
      render: (row, rowdta, index) => {
        return (
          <div className="flex justify-center text-[#1F4B7F] text-[1vw] py-[0.5vw]">
            {row.mobile}
          </div>
        );
      },
    },
    {
      title: (
        <div
          className="text-[1.2vw] text-center font-bold"
          style={{ color: "white" }}
        >
          Ticket Number
        </div>
      ),
      width: "7vw",
      render: (row, rowdta, index) => {
        return (
          <div className="flex justify-center text-[#1F4B7F] text-[1vw] py-[0.5vw]">
            {row.ticket_no}
          </div>
        );
      },
    },
    {
      title: (
        <div
          className="text-[1.2vw] text-center font-bold"
          style={{ color: "white" }}
        >
          PNR Number
        </div>
      ),
      width: "7vw",
      render: (row, rowdta, index) => {
        return (
          <div className="flex justify-center text-[#1F4B7F] text-[1vw] py-[0.5vw]">
            {row.pnr_no}
          </div>
        );
      },
    },
    {
      title: (
        <div
          className="text-[1.2vw] text-center font-bold"
          style={{ color: "white" }}
        >
          Source Name
        </div>
      ),
      width: "7vw",
      render: (row, rowdta, index) => {
        return (
          <div className="flex justify-center text-[#1F4B7F] text-[1vw] py-[0.5vw]">
            {row.source_name}
          </div>
        );
      },
    },
    {
      title: (
        <div
          className="text-[1.2vw] text-center font-bold"
          style={{ color: "white" }}
        >
          Destination Name
        </div>
      ),
      width: "7vw",
      render: (row, rowdta, index) => {
        return (
          <div className="flex justify-center text-[#1F4B7F] text-[1vw] py-[0.5vw]">
            {row?.destination_name?.length > 9 ? (
              <Tooltip
                placement="right"
                title={row?.destination_name}
                className="cursor-pointer"
                color="white"
                overlayInnerStyle={{
                  color: "#1F487C",
                }}
              >
                {`${row?.destination_name?.slice(0, 8)}...`}
              </Tooltip>
            ) : (
              <div>{row?.destination_name?.slice(0, 9)}</div>
            )}
          </div>
        );
      },
    },
    {
      title: (
        <div
          className="text-[1.2vw] text-center font-bold"
          style={{ color: "white" }}
        >
          Operator Name
        </div>
      ),
      width: "7vw",
      render: (row, rowdta, index) => {
        return (
          <div className="flex justify-center text-[#1F4B7F] text-[1vw] py-[0.5vw]">
            {row.operator_name}
          </div>
        );
      },
    },
    {
      title: (
        <div
          className="text-[1.2vw] text-center font-bold"
          style={{ color: "white" }}
        >
          Total Fare
        </div>
      ),
      width: "7vw",
      render: (row, rowdta, index) => {
        return (
          <div className="flex justify-center text-[#1F4B7F] text-[1vw] py-[0.5vw]">
            {row.total_fare}
          </div>
        );
      },
    },
    {
      title: (
        <div
          className="text-[1.2vw] text-center font-bold"
          style={{ color: "white" }}
        >
          Booking Date & Time
        </div>
      ),
      width: "7vw",
      render: (row, rowdta, index) => {
        return (
          <div className="flex justify-center text-[#1F4B7F] text-[1vw] py-[0.5vw]">
            {row.booking_date_time.slice(0, 10)}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRowClick(row);
              }}
              className=""
            >
              {row.key === expandedRowKey ? (
                <IoIosArrowDropupCircle
                  style={{ height: "1.3vw", width: "1.3vw" }}
                />
              ) : (
                <IoIosArrowDropdownCircle
                  style={{ height: "1.3vw", width: "1.3vw" }}
                />
              )}
            </button>
          </div>
        );
      },
    },
  ];
  const data =
    currentItems?.length > 0 &&
    currentItems?.map((item) => ({
      key: item.ticket_no,
      s_no: 1,
      email: item.email,
      mobile: item.mobile,
      ticket_no: item.ticket_no,
      pnr_no: item.pnr_no,
      source_name: item.source_name,
      destination_name: item.destination_name,
      operator_name: item.operator_name,
      total_fare: item.total_fare,
      booking_date_time: item.booking_date_time,
      hidden_details: (
        <div className="flex ">
          <div className="pt-[1vw] px-[3vw]">
            <div className="bg-[#1F487C] rounded-lg">
              <div className="grid grid-cols-4 border-b-[0.1vw] border-white py-[0.75vw] ">
                <span className="text-white font-normal text-[1vw] w-full border-r-[0.1vw] text-center border-white">
                  Seat
                </span>
                <span className="text-white font-normal text-[1vw] w-full border-r-[0.1vw] text-center border-white">
                  Passengers
                </span>
                <span className="text-white font-normal text-[1vw] w-full border-r-[0.1vw] text-center border-white">
                  Age
                </span>
                <span className="text-white font-normal text-[1vw] w-full text-center">
                  Gender
                </span>
              </div>
              <div className="grid grid-cols-4 gap-x-[1.5vw] justify-items-center py-[0.25vw]">
                <span className="text-white font-normal text-[1vw]">
                  {item.passenger_details.map((pass) => (
                    <p>{pass.Seat_Num}</p>
                  ))}
                </span>
                <span className="text-white font-normal text-[1vw]">
                  {item.passenger_details.map((pass) => (
                    <p>{pass.Passenger_Name}</p>
                  ))}
                </span>
                <span className="text-white font-normal text-[1vw]">
                  {item.passenger_details.map((pass) => (
                    <p>{pass.Age}</p>
                  ))}
                </span>
                <span className="text-white font-normal text-[1vw]">
                  {item.passenger_details.map((pass) => (
                    <p>{pass.GENDER_TYPE}</p>
                  ))}
                </span>
              </div>
            </div>
          </div>

          <div className="">
            <p>{item.source_name}</p>
            <p>{item.source_id}</p>
            <p>{item.pickup_point_name}</p>
            <p>{item.pickup_point_id}</p>
            <p>{item.depature_date.slice(0, 10)}</p>
            <p>{item.depature_time}</p>
          </div>
          <div className="">
            <p>{item.destination_name}</p>
            <p>{item.destination_id}</p>
            <p>{item.droping_point_name}</p>
            <p>{item.droping_point_id}</p>
            <p>{item.arrival_date.slice(0, 10)}</p>
            <p>{item.arraival_time}</p>
          </div>

          <div className="border-2 border-dotted border-zinc-800 rounded-[1vw]">
            <div className="flex">
              <p>Base Fare</p>
              <p>{item.base_fare}</p>
            </div>
            <div className="flex">
              <p>GST</p>
              <p>{item.gst}</p>
            </div>
            <div className="flex">
              <p>Discount</p>
              <p>{item.discount_amt}</p>
            </div>
            <div className="flex">
              <p>Offer Code</p>
              <p>{item.offer_code}</p>
            </div>

            <div className="flex">
              <p>TBS Deal Amt</p>
              <p>{item.tbs_deal_amount}</p>
            </div>
            <div className="flex">
              <p>TBS Deal %</p>
              <p>{item.tbs_deal_percentage}</p>
            </div>
            <hr />
            <div className="flex">
              <p>Total Fare</p>
              <p>{item.total_fare}</p>
            </div>
            <div className="flex">
              <p>Status</p>
              <p>{item.payment_status}</p>
            </div>
          </div>
        </div>
      ),
    }));

  useEffect(() => {
    setSpinning(true);
    GetBookingDetails(dispatch, setSpinning);
  }, []);

  const fetchGetBookingDetails = async () => {
    try {
      const data = await GetBookingDetailsById(
        updatedata,
        SetUpdateData,
        operatorData
      );
      setOperatorData(data);
      console.log(data, "Data operator");
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };
  useEffect(() => {
    if (updatedata != null) {
      fetchGetBookingDetails();
    }
  }, [updatedata]);
  return (
    <div
      className="h-screen w-screen pl-[2vw] pr-[2vw] pt-[2vw]"
      style={{
        backgroundImage: `url(${Backdrop})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* <h1 className="text-[3vw]">Dashboard</h1> */}
      {/* <div className="h-[85vh] w-[100%] rounded-[2vw] relative"> */}
      {/* <div className=" absolute w-[87.8vw] h-[85vw] top-[0.1vw] pr-[2vw]"> */}
      {/* <h1>hello</h1> */}
      {/* <PowerBi /> */}
      {/* <PowerBIReport embedUrl={embedUrl} accessToken={accessToken} /> */}

      {/* <NewPowerbi embedUrl={embedUrl} accessToken={accessToken} /> */}
      {/* <PowerBIReport
              embedUrl={embedUrl}
              accessToken={accessToken}
              reportId={reportId}
              height={height}
              width={width}
            /> */}
      {/* </div> */}
      {/* <div className="bg-[#99a1ac] h-[70vh] w-[15%] absolute left-[-6vw] top-[3.5vw] rounded-[2vw]"></div> */}
      {/* </div> */}
      <div className="h-[75vh]">
        {spinning ? (
          <div className="absolute inset-0 flex justify-center items-center  z-10">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            className="custom-table"
            columns={columns}
            dataSource={data}
            pagination={false}
            locale={{ emptyText: "No Data Available" }}
            expandable={{
              expandedRowRender: (record) => (
                <p style={{ margin: 0 }}>{record?.hidden_details}</p>
              ),
            }}
            // expandedRowRender={(record) => (
            //   <p style={{ margin: 0 }}>{record?.hidden_details}</p>
            // )}
            expandRowByClick={true}
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
            rowClassName={(row) =>
              row?.key === expandedRowKey ? "expanded-row" : ""
            }
            expandIcon={() => null}
            expandIconColumnIndex={-1}
            expandedRowKeys={expandedRowKey ? [expandedRowKey] : []}
          />
        )}
      </div>
      {console.log(columns, "columns")}
      <div>
        {getBookingDetails?.length > 10 && (
          <div className=" mt-[1vw] justify-between flex items-center ">
            <div className="text-[#1f4b7f] flex text-[1.1vw] gap-[0.5vw] ">
              <span>Showing</span>
              <span className="font-bold">
                {currentItems && currentItems?.length > 0 ? (
                  <div>
                    {indexOfFirstItem + 1} -{" "}
                    {indexOfFirstItem + currentItems?.length}
                  </div>
                ) : (
                  "0"
                )}
              </span>
              <span>from</span>
              <span className="font-bold">
                {" "}
                {getBookingDetails?.length > 0 ? getBookingDetails?.length : 0}
              </span>
              <span>data</span>
            </div>
            <div>
              <ReactPaginate
                activePage={activePage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={getBookingDetails?.length}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
                itemClass="page-item"
                linkClass="page-link"
                activeClass="active"
                prevPageText={
                  <FontAwesomeIcon icon={faChevronLeft} size="1vw" />
                }
                nextPageText={
                  <FontAwesomeIcon icon={faChevronRight} size="1vw" />
                }
                firstPageText={
                  <FontAwesomeIcon icon={faAngleDoubleLeft} size="1vw" />
                }
                lastPageText={
                  <FontAwesomeIcon icon={faAngleDoubleRight} size="1vw" />
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
