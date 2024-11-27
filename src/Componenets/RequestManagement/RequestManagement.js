import React, { useEffect, useRef, useState } from "react";
import Backdrop from "../../asserts/CRMbg.png";
import { IoGrid, IoSearch } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { DatePicker, Pagination, Tooltip } from "antd";

import { FaCaretDown } from "react-icons/fa";
import Operator from "./Operator";
import Partner from "./Partner";
import axios from "axios";
import dayjs from "dayjs";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllReqManOffers,
  GetPartnerByDate,
  GetReqAdsByDate,
  GetReqOperatorByDate,
  GetReqPartnerData,
  GetReqPromotionByDate,
  GetReqPromotionData,
  GetRequestAdsData,
  GetRequestManagementData,
  ReqManOffersDateFilter,
  ReqManOffersSearch,
  SearchReqAdvertisement,
  SearchReqOperator,
  SearchReqPartner,
  SearchRequestPromotion,
} from "../../Api/RequestManagement/RequestManagement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-js-pagination";
import {
  faChevronLeft,
  faChevronRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import { Select } from "antd";
import ReqPromotion from "./ReqPromotion";
import moment from "moment/moment";
import ReqAdvertisement from "./Advertisement";
import ReqOffers from "./Offers";
import { IoMdArrowDropdown } from "react-icons/io";
// import { GetAllReqManOffers, ReqManOffersDateFilter, ReqManOffersSearch } from "../../Api/RequestManagement/RequestManagementOffers";
const { RangePicker } = DatePicker;
export default function RequestManagement() {
  const getadslist = useSelector((state) => state.crm.get_req_ads);
  const [adfilter, SetAdFilter] = useState("all");
  const [adsactivePage, setAdsActivePage] = useState(1);
  const adsitemsPerPage = 10; // Number of items to display per page

  const adsindexOfLastItem = adsactivePage * adsitemsPerPage;
  const adsindexOfFirstItem = adsindexOfLastItem - adsitemsPerPage;
  const adscurrentItems =
    getadslist?.length > 0 &&
    getadslist?.slice(adsindexOfFirstItem, adsindexOfLastItem);

  const handleOfferPageChange = (pageNumber) => {
    setAdsActivePage(pageNumber);
  };
  const [view, setView] = useState("operator");
  const [filter, SetFilter] = useState("all");
  const [search, SetSearch] = useState("");
  const [date, SetDate] = useState("");
  const [isStatusModal, setIsStatusModal] = useState(false);
  const [isVerifyModal, setIsVerifyModal] = useState(false);
  // const [get_rq_man_data, setget_rq_man_data] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [operatorId, setOperatorId] = useState(null);
  const [verifyData, setVerifyData] = useState("");
  const [getData, setGetData] = useState("");
  const [dateClear, setDateClear] = useState();
  const [showpaginate, setShowPaginate] = useState(false);
  const [partnerFilter,setPartnerFilter]= useState("all")
  const get_rq_man_data = useSelector((state) => state.crm.request_management);
  const getPartnerList = useSelector((state)=>state.crm.get_req_partner)
  const getpromotionlist = useSelector((state) => state.crm.req_promotion);
  const get_req_man_offers = useSelector((state) => state.crm.req_man_offers);



  const [showtable, setShowTable] = useState(1);
  console.log(showtable, "show_table");
  const dispatch = useDispatch();

  useEffect(() => {
    if (showtable == 1) {
      // setDateClear("")
      GetRequestManagementData(dispatch, filter);
    }
    // else if (showtable == 2) {
    //   GetReqPartnerData(dispatch, partnerFilter)
    // }
    // console.log(getPartnerList,"partnerdatatata");
  }, [showtable, filter]);

  useEffect(()=>{
    if(showtable == 2){
      GetReqPartnerData(dispatch,partnerFilter)
    }
  },[showtable,partnerFilter])

  console.log(filter, "showtableshowtable");

  console.log(search, "search");
  console.log(date, "date");
  const columns = [
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">
          Operator Id
        </div>
      ),
      render: (row) => {
        console.log("statuus", row);
        return (
          <div className="flex justify-center">
            <h1 className="pl-[1vw] text-[1vw] text-[#1F4B7F]">
              {row?.tbs_operator_id}
            </h1>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">
          Operator Name
        </div>
      ),
      render: (row) => {
        return (
          <div className="flex justify-center">
            {/* <p className="text-[1vw] text-[#1F4B7F]">{row?.owner_name}</p> */}
            {row?.owner_name?.length > 15 ? (
              <Tooltip
                placement="bottom"
                title={row?.owner_name}
                className="cursor-pointer"
                color="#1F487C"
              >
                {`${row?.owner_name?.slice(0, 15)}...`}
              </Tooltip>
            ) : (
              row?.owner_name?.slice(0, 15)
            )}
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">
          Phone Number{" "}
        </div>
      ),
      render: (row) => {
        return (
          <div className="flex justify-center">
            <p className="text-[1vw] text-[#1F4B7F]">{row?.phone}</p>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">
          Email Id
        </div>
      ),
      render: (row) => {
        return (
          <div className="flex justify-center">
            <p className="text-[1vw] text-[#1F4B7F]">{row?.emailid}</p>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">
          Request Date
        </div>
      ),
      render: (row) => {
        return (
          <div className="flex justify-center">
            <p className="text-[1vw] text-[#1F4B7F]">{`${dayjs(
              row?.created_date
            ).format("DD MMM YY - hh:mm a")}`}</p>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">
          Documents
        </div>
      ),
      render: (row) => {
        setOperatorId(row.tbs_operator_id);
        console.log(row.tbs_operator_id, "---operatorId");
        return (
          <div className="flex  justify-center">
            <button
              type="button"
              className="text-white bg-[#41C6FF] rounded-[0.5vw]  text-[1vw] w-[5vw] py-[0.2vw]  
           "
              onClick={() => {
                setIsVerifyModal(true);
                setVerifyData(row.tbs_operator_id);
                console.log(row.tbs_operator_id, "operator Id");
              }}
            >
              Verify
            </button>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">Status</div>
      ),
      render: (row) => {
        // console.log("statuus", row.req_status);
        //##############################################VIKRAM ##########################
        return (
          <div className="flex justify-center">
            <button
              className={`${row?.req_status == "verified" || "Verified"
                  ? "bg-[#34AE2A]"
                  : row?.req_status == "pending" || "Pending"
                    ? "bg-[#FFD600]"
                    : row?.req_status == "rejected" || "Rejected"
                      ? "bg-[#FF1100]"
                      : row?.req_status == "under review" || "Under Review"
                        ? "bg-[#2A99FF]"
                        : "bg-[#ffffff]"
                } rounded-[0.5vw] font-semibold text-white w-[7vw] py-[0.2vw]`}
            // #########################################################################################
            >
              {row?.req_status}
            </button>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex justify-center font-bold text-[1.2vw]">
          Actions
        </div>
      ),
      render: (row) => {
        setOperatorId(row.tbs_operator_id);
        // console.log(row.tbs_operator_id, "rowrowrowrow");
        return (
          <div className="flex gap-[0.7vw] items-center">
            <MdEdit
              size={"1.3vw"}
              color="#1F4B7F"
              className=" cursor-pointer"
            />
            <MdDelete
              size={"1.3vw"}
              color="#1F4B7F"
              className=" cursor-pointer"
            />
          </div>
        );
      },
    },
  ];

  const paginatedData = get_rq_man_data?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // const dispatch = useDispatch();
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page

  // Calculate pagination slice based on activePage
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = get_rq_man_data?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Handle page change

  //*vikram*  offers********************************** */
  const handlePageChange = (pageNumber) => {
    if (showtable == 1) {
      setActivePage(pageNumber);
    }
    else if (showtable == 2) {
      setPartnerActivePage(pageNumber);
    } 
     else if (showtable == 3) {
      setPromoActivePage(pageNumber);
    } else {
      setOfferActivePage(pageNumber);
    }
  };

  //*************************************** */

  const onChange = (value) => {
    setShowTable(value);
    console.log(`selected ${value}`);
    setDateClear("");
  };

const [partnerActivePage,setPartnerActivePage] = useState(1)
const partnerItemsPerPage = 10;

const partnerIndexOfLastItem = partnerActivePage * partnerItemsPerPage;
const partnerIndexOfFirtsItem = partnerIndexOfLastItem - partnerItemsPerPage
 const partnerCurrentItems = getPartnerList?.length > 0 && getPartnerList.slice(partnerIndexOfFirtsItem,partnerIndexOfLastItem)


  const [promoactivePage, setPromoActivePage] = useState(1);
  const promoitemsPerPage = 10; // Number of items to display per page

  const promoindexOfLastItem = promoactivePage * promoitemsPerPage;
  const promoindexOfFirstItem = promoindexOfLastItem - promoitemsPerPage;
  const promocurrentItems =
    getpromotionlist.length > 0 &&
    getpromotionlist?.slice(promoindexOfFirstItem, promoindexOfLastItem);
  console.log(getpromotionlist, "getpromotionlist");
  const handlePrmoPageChange = (pageNumber) => {
    setPromoActivePage(pageNumber);
  };

  const [promofilter, SetPromoFilter] = useState("All");

  useEffect(() => {
    if (showtable == 3) {
      GetReqPromotionData(dispatch, promofilter);
    }
  }, [showtable, promofilter]);

  //****************************************************** */
  //offers vikram

  const [offerActivePage, setOfferActivePage] = useState(1);
  const offerItemsPerPage = 10;

  const offerIndexOfLastItem = offerActivePage * offerItemsPerPage;
  const offerIndexOfFirstItem = offerIndexOfLastItem - offerItemsPerPage;
  const offerCurrentItems =
    get_req_man_offers.length > 0 &&
    get_req_man_offers?.slice(offerIndexOfFirstItem, offerIndexOfLastItem);
  console.log(
    offerCurrentItems,
    "cur items",
    offerIndexOfFirstItem,
    "first",
    offerIndexOfLastItem,
    "last",
    "request management offers"
  );

  const [offerfilter, SetOfferFilter] = useState("All");
  useEffect(() => {
    if (showtable == 5) {
      GetAllReqManOffers(dispatch, offerfilter);
    }
  }, [showtable, offerfilter]);

  useEffect(() => {
    setActivePage(1);
    setPartnerActivePage(1);
    setPromoActivePage(1);
    setOfferActivePage(1);
  }, [offerfilter, promofilter, filter]);

  ////********************************************************************* */

  console.log(showtable, "showtableshowtable");

  const [startDate, SetStartDate] = useState();
  const [endDate, SetEndDate] = useState();

  const dateres = useSelector((state) => state.crm.req_management_date_filter);
  console.log(dateres, "data vanthuduch");

  // useEffect(() => {
  //   GetReqPromotionByDate(dispatch);

  // }, []);
  // const functioncall=async()=>{
  //   console.log("i am here")
  //   await GetReqPromotionByDate(dispatch,startDate,endDate);

  // }

  // #########################################VIKRAM#############################

  const datefilter = async (values) => {
    if (showtable == 1) {
      try {
        setDateClear(values);
        // console.log(values[0].$d.toISOString().split('T')[0],"datevaluesss1")
        // console.log(values[1].$d.toISOString().split('T')[0],"datevaluesss2")

        // SetStartDate(moment(values[0].$d).format("YYYY-MM-DD"));
        // SetEndDate(moment(values[1].$d).format("YYYY-MM-DD"));
        // console.log(values[0].$d,"thissssssssssssssssss")

        // console.log(moment(values[0].$d).format("YYYY-MM-DD"), "val1");
        // console.log(moment(values[1].$d).format("YYYY-MM-DD"), "val2");

        await GetReqOperatorByDate(
          dispatch,
          moment(values[0].$d).format("YYYY-MM-DD"),
          moment(values[1].$d).format("YYYY-MM-DD"),
          filter
        );
        // functioncall()
      } catch (err) {
        console.log(err, "iam the error");
        GetRequestManagementData(dispatch,filter);
      }
    } 
    else if (showtable == 2) {
      try {
        setDateClear(values);
        await GetPartnerByDate(
          dispatch,
          moment(values[0].$d).format("YYYY-MM-DD"),
          moment(values[1].$d).format("YYYY-MM-DD"),
          partnerFilter
        );
        console.log("this is promotion request");
      } catch (err) {
        console.log(err);
        GetReqPartnerData(dispatch,partnerFilter);
      }
    }
    
    else if (showtable == 3) {
      try {
        setDateClear(values);
        await GetReqPromotionByDate(
          dispatch,
          moment(values[0].$d).format("YYYY-MM-DD"),
          moment(values[1].$d).format("YYYY-MM-DD")
        );
        console.log("this is promotion request");
      } catch (err) {
        console.log(err);
        GetReqPromotionData(dispatch);
      }
    } else if (showtable == 4) {
      try {
        setDateClear(values);
        await GetReqAdsByDate(
          dispatch,
          moment(values[0].$d).format("YYYY-MM-DD"),
          moment(values[1].$d).format("YYYY-MM-DD"),
          showtable,
          adfilter
        );
        // functioncall()
      } catch (err) {
        console.log(err, "iam the error");
        GetRequestAdsData(dispatch, adfilter, showtable);
      }
    } else if (showtable == 5) {
      try {
        setDateClear(values);
        await ReqManOffersDateFilter(
          dispatch,
          moment(values[0].$d).format("YYYY-MM-DD"),
          moment(values[1].$d).format("YYYY-MM-DD")
        );
        console.log(
          moment(values[0].$d).format("YYYY-MM-DD"),
          moment(values[1].$d).format("YYYY-MM-DD"),
          "this is promotion request 11"
        );
      } catch (err) {
        console.log(err);
        GetAllReqManOffers(dispatch);
      }
    } else {
      try {
        setDateClear(values);
        await GetReqAdsByDate(
          dispatch,
          moment(values[0].$d).format("YYYY-MM-DD"),
          moment(values[1].$d).format("YYYY-MM-DD"),
          showtable,
          adfilter
        );
        // functioncall()
      } catch (err) {
        console.log(err, "iam the error");
        GetRequestAdsData(dispatch, adfilter, showtable);
      }
    }

    // const utcDate = new Date(Date.UTC(values[0].getFullYear(), values[0].getMonth(), values[0].getDate()));
    // console.log(utcDate.toISOString().split('T')[0],"val1")

    // const utcDate2 = new Date(Date.UTC(values[1].getFullYear(), values[1].getMonth(), values[1].getDate()));
    // console.log(utcDate2.toISOString().split('T')[0],"val2")
  };

  const SearchRequest = (e) => {
    if (showtable == 1) {
      console.log(e.target.value,"e values");
      SearchReqOperator(e.target.value,filter,dispatch);
    } 
    else if(showtable == 2){
      SearchReqPartner(e.target.value,partnerFilter,dispatch)
    }
    else if (showtable == 3) {
      console.log(e.target.value, "search e value");
      SearchRequestPromotion(e.target.value, dispatch);
    } else if (showtable == 4) {
      console.log(e.target.value, "search e value");
      SearchReqAdvertisement(e.target.value, dispatch, showtable,adfilter);
    } else if (showtable == 5) {
      ReqManOffersSearch(e.target.value, dispatch);
      console.log(e.target.value, "evalues");
    } else {
      console.log(e.target.value, "search e value");
      SearchReqAdvertisement(e.target.value, dispatch, showtable,adfilter);
    }
  };
  // ######################################################################
  useEffect(() => {
    if (showtable == 4) {
      GetRequestAdsData(dispatch, adfilter, showtable);
    } else if (showtable == 6) {
      GetRequestAdsData(dispatch, adfilter, showtable);
    }
    console.log(adfilter, "adfilter");
  }, [showtable, adfilter]);
  //offer
  console.log(getadslist, "adscurrentItemsadscurrentItems");

  // useEffect(() => {
  //   setShowPaginate(false);
  //   {
  //     showtable == 1
  //       ? get_rq_man_data?.length > 10 && setShowPaginate(true)
  //       : showtable == 2
  //       ? setShowPaginate(true)
  //       : showtable == 3
  //       ? getpromotionlist?.length > 10 && setShowPaginate(true)
  //       : showtable == 4
  //       ? getadslist?.length > 10 && setShowPaginate(true)
  //       : showtable == 5
  //       ? get_req_man_offers?.length > 10 && setShowPaginate(true)
  //       : getadslist?.length > 10 && setShowPaginate(true);
  //   }
  // }, [showtable, setShowTable, showpaginate, setShowPaginate]);
  useEffect(() => {
    setShowPaginate(false);

    if (showtable == 1) {
      get_rq_man_data?.length > 10 && setShowPaginate(true);
    } else if (showtable == 2) {
      getPartnerList?.length > 10 && setShowPaginate(true)
    } else if (showtable == 3) {
      getpromotionlist?.length > 10 && setShowPaginate(true);
    } else if (showtable == 4) {
      getadslist?.length > 10 && setShowPaginate(true);
    } else if (showtable == 5) {
      get_req_man_offers?.length > 10 && setShowPaginate(true);
    } else {
      getadslist?.length > 10 && setShowPaginate(true);
    }
  }, [showtable, setShowTable, showpaginate, setShowPaginate]);

  useEffect(()=>{
    SetFilter("all")
    setPartnerFilter("all")
    SetAdFilter("all")
    SetOfferFilter("All")
    SetPromoFilter("All")
  },[showtable])

  return (
    <>
      <div
        className="h-screen w-screen"
        style={{
          backgroundImage: `url(${Backdrop})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="px-[2.5vw] h-[92vh] w-full ">
          <div className="h-[12vh] w-full flex flex-col ">
            <div className="flex items-center pt-[0.5vw]">
              <h1 className="text-[#1F4B7F]  text-[1.5vw] font-bold">
                {`REQUEST MANAGEMENT`}
              </h1>
              <span className="text-[1vw]  text-[#1F4B7F] font-semibold">{`  -  (${showtable == 1
                  ? "Operator"
                  : showtable == 2
                    ? "Partner"
                  : showtable == 3
                    ? "Promotion"
                    : showtable == 4
                      ? "Advertisement"
                      : showtable == 5 ? "Offers" : "Mobile Advertisement"
                })`}</span>
            </div>
            <div className="pb-[0.5vw] flex justify-between h-full items-center ">
              {/* <div className="relative flex items-center ">
              <input
                type="text"
                className="bg-white  outline-none pl-[2.3vw] text-[1.2vw] w-[9vw] h-[2.8vw] text border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-[0.5vw] border-r-[0.2vw] border-b-[0.2vw]"
                placeholder="Search"
                onChange={(e) => SetSearch(e.target.value)}
              />
              <IoSearch
                className="absolute bottom-[.9vw] left-[.5vw]"
                size={"1.2vw"}
                color="#1F4B7F"
              />
            </div> */}
              <div className="relative flex items-center">
                <input
                  type="text"
                  className="bg-white outline-none pl-[2vw] w-[20vw] h-[2.5vw] text-[#1f487c]  text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-[0.5vw] border-r-[0.2vw] border-b-[0.2vw]"
                  placeholder="Search ..."
                  onChange={(e) => {
                    SearchRequest(e);
                  }}
                />
                <IoSearch
                  className="absolute left-[0.5vw]"
                  size={"1vw"}
                  color="#1F4B7F"
                />
              </div>
              {showtable == 1 ? (
                <div className="flex gap-x-[2.5vw] text-[1.3vw]">
                  <div
                    className={` cursor-pointer ${filter == "all"
                        ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                        : ""
                      } `}
                    onClick={() => {
                      SetFilter("all");
                    }}
                  >
                    <p className="text-[1.3vw] text-[#1f487c] text-center">
                      All
                    </p>
                  </div>
                  <div
                    className={` cursor-pointer ${filter == "pending"
                        ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                        : ""
                      } `}
                    onClick={() => {
                      SetFilter("pending");
                    }}
                  >
                    <p className="text-[1.3vw] text-[#1f487c] text-center">
                      Pending
                    </p>
                  </div>
                  <div
                    className={` cursor-pointer ${filter == "approved"
                        ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                        : ""
                      } `}
                    onClick={() => {
                      SetFilter("approved");
                    }}
                  >
                    <p className="text-[1.3vw] text-[#1f487c] text-center">
                      Approved
                    </p>
                  </div>
                  <div
                    className={` cursor-pointer ${filter == "on_hold"
                        ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                        : ""
                      } `}
                    onClick={() => {
                      SetFilter("on_hold");
                    }}
                  >
                    <p className="text-[1.3vw] text-[#1f487c] text-center">
                      On Hold
                    </p>
                  </div>
                  <div
                    className={` cursor-pointer ${filter == "rejected"
                        ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                        : ""
                      } `}
                    onClick={() => {
                      SetFilter("rejected");
                    }}
                  >
                    <p className="text-[1.3vw] text-[#1f487c] text-center">
                      Rejected
                    </p>
                  </div>
                </div>
              ) : // ###############################################VIKRAM#######################
                showtable == 2 ?
                  <div className="flex gap-x-[2.5vw] text-[1.3vw]">
                    <div
                      className={` cursor-pointer ${partnerFilter == "all"
                          ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                          : ""
                        } `}
                      onClick={() => {
                        setPartnerFilter("all");
                      }}
                    >
                      <p className="text-[1.3vw] text-[#1f487c] text-center">
                        All
                      </p>
                    </div>
                    <div
                      className={` cursor-pointer ${partnerFilter == "pending"
                          ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                          : ""
                        } `}
                      onClick={() => {
                        setPartnerFilter("pending");
                      }}
                    >
                      <p className="text-[1.3vw] text-[#1f487c] text-center">
                        Pending
                      </p>
                    </div>
                    <div
                      className={` cursor-pointer ${partnerFilter == "approved"
                          ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                          : ""
                        } `}
                      onClick={() => {
                        setPartnerFilter("approved");
                      }}
                    >
                      <p className="text-[1.3vw] text-[#1f487c] text-center">
                        Approved
                      </p>
                    </div>
                    <div
                      className={` cursor-pointer ${partnerFilter == "on_hold"
                          ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                          : ""
                        } `}
                      onClick={() => {
                        setPartnerFilter("on_hold");
                      }}
                    >
                      <p className="text-[1.3vw] text-[#1f487c] text-center">
                        On Hold
                      </p>
                    </div>
                    <div
                      className={` cursor-pointer ${partnerFilter == "rejected"
                          ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                          : ""
                        } `}
                      onClick={() => {
                        setPartnerFilter("rejected");
                      }}
                    >
                      <p className="text-[1.3vw] text-[#1f487c] text-center">
                        Rejected
                      </p>
                    </div>
                  </div>
                  :
                  showtable == 3 ? (
                    <div className="flex gap-x-[2.5vw] text-[1.3vw]">
                      <div
                        className={` cursor-pointer ${promofilter == "All"
                            ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                            : ""
                          } `}
                        onClick={() => {
                          SetPromoFilter("All");
                        }}
                      >
                        <p className="text-[1.3vw] text-[#1f487c] text-center">
                          All
                        </p>
                      </div>
                      <div
                        className={` cursor-pointer ${promofilter == "Pending"
                            ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                            : ""
                          } `}
                        onClick={() => {
                          SetPromoFilter("Pending");
                        }}
                      >
                        <p className="text-[1.3vw] text-[#1f487c] text-center">
                          Pending
                        </p>
                      </div>
                      <div
                        className={` cursor-pointer ${promofilter == "Approved"
                            ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                            : ""
                          } `}
                        onClick={() => {
                          SetPromoFilter("Approved");
                        }}
                      >
                        <p className="text-[1.3vw] text-[#1f487c] text-center">
                          Approved
                        </p>
                      </div>
                      <div
                        className={` cursor-pointer ${promofilter == "Rejected"
                            ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                            : ""
                          } `}
                        onClick={() => {
                          SetPromoFilter("Rejected");
                        }}
                      >
                        <p className="text-[1.3vw] text-[#1f487c] text-center">
                          Rejected
                        </p>
                      </div>
                      <div
                        className={` cursor-pointer ${offerfilter == "Under Review"
                            ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                            : ""
                          } `}
                        onClick={() => {
                          SetPromoFilter("Under Review");
                        }}
                      >
                        <p className="text-[1.3vw] text-[#1f487c] text-center">
                          Under Review
                        </p>
                      </div>
                    </div>
                  ) : showtable == 4 || 6 ? (
                    <div className="flex gap-x-[2.5vw] text-[1.3vw]">
                      <div
                        className={` cursor-pointer ${adfilter == "all"
                            ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                            : ""
                          } `}
                        onClick={() => {
                          SetAdFilter("all");
                        }}
                      >
                        <p className="text-[1.3vw] text-[#1f487c] text-center">
                          All
                        </p>
                      </div>
                      <div
                        className={` cursor-pointer ${adfilter == "pending"
                            ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                            : ""
                          } `}
                        onClick={() => {
                          SetAdFilter("pending");
                        }}
                      >
                        <p className="text-[1.3vw] text-[#1f487c] text-center">
                          Pending
                        </p>
                      </div>
                      <div
                        className={` cursor-pointer ${adfilter == "verified"
                            ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                            : ""
                          } `}
                        onClick={() => {
                          SetAdFilter("verified");
                        }}
                      >
                        <p className="text-[1.3vw] text-[#1f487c] text-center">
                          Approved
                        </p>
                      </div>
                      <div
                        className={` cursor-pointer ${adfilter == "under_review"
                            ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                            : ""
                          } `}
                        onClick={() => {
                          SetAdFilter("under_review");
                        }}
                      >
                        <p className="text-[1.3vw] text-[#1f487c] text-center">
                          Under Review
                        </p>
                      </div>
                      <div
                        className={` cursor-pointer ${adfilter == "rejected"
                            ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                            : ""
                          } `}
                        onClick={() => {
                          SetAdFilter("rejected");
                        }}
                      >
                        <p className="text-[1.3vw] text-[#1f487c] text-center">
                          Rejected
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-x-[2.5vw] text-[1.3vw]">
                      <div
                        className={` cursor-pointer ${offerfilter == "All"
                            ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                            : ""
                          } `}
                        onClick={() => {
                          SetOfferFilter("All");
                        }}
                      >
                        <p className="text-[1.3vw] text-[#1f487c] text-center">
                          All
                        </p>
                      </div>
                      <div
                        className={` cursor-pointer ${offerfilter == "Pending"
                            ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                            : ""
                          } `}
                        onClick={() => {
                          SetOfferFilter("Pending");
                        }}
                      >
                        <p className="text-[1.3vw] text-[#1f487c] text-center">
                          Pending
                        </p>
                      </div>
                      <div
                        className={` cursor-pointer ${offerfilter == "Approved"
                            ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                            : ""
                          } `}
                        onClick={() => {
                          SetOfferFilter("Approved");
                        }}
                      >
                        <p className="text-[1.3vw] text-[#1f487c] text-center">
                          Approved
                        </p>
                      </div>
                      <div
                        className={` cursor-pointer ${offerfilter == "Rejected"
                            ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                            : ""
                          } `}
                        onClick={() => {
                          SetOfferFilter("Rejected");
                        }}
                      >
                        <p className="text-[1.3vw] text-[#1f487c] text-center">
                          Rejected
                        </p>
                      </div>
                      <div
                        className={` cursor-pointer ${offerfilter == "Under Review"
                            ? "border-b-[0.25vw] font-bold border-[#1f487c]"
                            : ""
                          } `}
                        onClick={() => {
                          SetOfferFilter("Under Review");
                        }}
                      >
                        <p className="text-[1.3vw] text-[#1f487c] text-center">
                          Under Review
                        </p>
                      </div>
                    </div>
                  )}
              <div className="flex gap-x-[1vw]">
                {/* <div className="flex border-[#1F4B7F] h-[2.5vw] border-l-[0.1vw] border-t-[0.1vw] rounded-l-[0.5vw] rounded-r-[0.5vw] border-r-[0.2vw] border-b-[0.2vw]">
                <button
                  className={`${
                    view == "operator" ? "bg-[#1F4B7F]" : "bg-white"
                  } flex px-[1vw] justify-center gap-[0.5vw] items-center rounded-tl-[0.4vw]   rounded-bl-[0.3vw] `}
                  style={{
                    transition: "all 1s",
                  }}
                  onClick={() => setView("operator")}
                >
                  <span>
                    <IoMdMenu
                      size={"1.2vw"}
                      color={`${view == "operator" ? "white" : "#1F4B7F"}`}
                    />
                  </span>
                  <span
                    className={`${
                      view == "operator" ? "text-white" : "text-[#1F4B7F]"
                    }  text-[1.1vw]`}
                  >
                    Operator
                  </span>
                </button>
                <button
                  className={`${
                    view == "partner" ? "bg-[#1F4B7F]" : "bg-white"
                  } flex px-[1vw] justify-center gap-[0.5vw] items-center rounded-r-[0.3vw]`}
                  style={{
                    transition: "all 1s",
                  }}
                  onClick={() => setView("partner")}
                >
                  <span>
                    <IoGrid
                      size={"1.2vw"}
                      color={`${view == "partner" ? "white" : "#1F4B7F"}`}
                    />
                  </span>
                  <span
                    className={`${
                      view == "partner" ? "text-white" : "text-[#1F4B7F]"
                    }  text-[1.1vw]`}
                  >
                    Partner
                  </span>
                </button>
              </div> */}
                <div className="relative flex items-center">
                  <Select
                    showSearch
                    placeholder="Select one"
                    suffixIcon={
                      <span style={{ fontSize: "1vw", color: "#1f487c" }}>
                        <IoMdArrowDropdown size="2vw" />
                      </span>
                    }
                    filterOption={(input, option) => {
                      const labelText = option?.label?.props.children || "";
                      return labelText
                        .toLowerCase()
                        .includes(input.toLowerCase());
                    }}
                    onChange={onChange}
                    style={{
                      width: "15vw",
                    }}
                    defaultValue={{
                      value: 1,
                      label: (
                        <div className="text-[1vw] text-[#1f487c] font-semibold pl-[0.7vw] pb-[0.1vw]">
                          Operator
                        </div>
                      ),
                    }}
                    className="text-blue-500 h-[2.5vw] w-[10vw] outline-none text border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-[0.7vw] border-r-[0.2vw] border-b-[0.2vw]"
                    options={[
                      {
                        value: 1,
                        label: (
                          <div className="text-[1vw] text-[#1f487c] font-semibold pl-[0.7vw] pb-[0.1vw]">
                            Operator
                          </div>
                        ),
                      },
                      {
                        value: 2,
                        label: (
                          <div className="text-[1vw] text-[#1f487c] font-semibold pl-[0.7vw] pb-[0.1vw]">
                            Partner
                          </div>
                        ),
                      },
                      {
                        value: 3,
                        label: (
                          <div className="text-[1vw] text-[#1f487c] font-semibold pl-[0.7vw] pb-[0.1vw]">
                            Promotion
                          </div>
                        ),
                      },
                      {
                        value: 4,
                        label: (
                          <div className="text-[1vw] text-[#1f487c] font-semibold pl-[0.7vw] pb-[0.1vw]">
                            Advertisement
                          </div>
                        ),
                      },
                      {
                        value: 6,
                        label: (
                          <div className="text-[1vw] text-[#1f487c] font-semibold pl-[0.7vw] pb-[0.1vw]">
                            Mobile Advertisement
                          </div>
                        ),
                      },
                      {
                        value: 5,
                        label: (
                          <div className="text-[1vw] text-[#1f487c] font-semibold pl-[0.7vw] pb-[0.1vw]">
                            Offers
                          </div>
                        ),
                      },
                    ]}
                  />
                </div>

                <div className="relative flex items-center">
                  {/* <DatePicker
                  autoFocus={false}
                  placeholder="Filter Date"
                  onChange={(date) => SetDate(date.$d)}
                  className="text-blue-500 h-[2.5vw] w-[12vw] outline-none text border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-[0.5vw] border-r-[0.2vw] border-b-[0.2vw]"
                /> */}
                  <div className="reqman">
                    {/* <Space direction="vertical" size={8}> */}

                    <RangePicker
                      allowClear={true}
                      autoFocus={false}
                      onChange={datefilter}
                      value={dateClear}
                      className="text-blue-500 filterdate h-[2.5vw] w-[15vw] outline-none text border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] hover:border-[#1F4B7F] rounded-[0.5vw] border-r-[0.2vw] border-b-[0.2vw]"
                    />

                    {/* </Space> */}
                  </div>
                  {/* 
                  <FaCaretDown
                    className="absolute left-[13.5vw] bottom-[.5vw] text-[#1f487f]"
                    size={"2vw"}
                  /> */}
                </div>
              </div>
            </div>
          </div>
          <div className="h-[72vh]  w-full">
            {/* {view == "operator" ? (
            <>
              <Operator data={currentItems} />
            </>
          ) : (
            <>
              <Partner data={currentItems} columns={columns} />
            </>
          )} */}
            {showtable == 1 ? (
              <Operator data={currentItems} tabfilter={filter} />
            ) : showtable == 2 ? (
              <Partner data={partnerCurrentItems} columns={columns} tabfilter={partnerFilter} />
            ) : showtable == 3 ? (
              <ReqPromotion currentData={promocurrentItems} columns={columns} />
            ) : showtable == 4 ? (
              <ReqAdvertisement
                currentData={adscurrentItems}
                columns={columns}
                showtable={showtable}
                adfilter={adfilter}
              />
            ) : showtable == 5 ? (
              <ReqOffers currentData={offerCurrentItems} columns={columns} />
            ) : showtable == 6 ? (
              <ReqAdvertisement
                currentData={adscurrentItems}
                columns={columns}
                showtable={showtable}
                adfilter={adfilter}
              />
            ) : (
              ""
            )}
          </div>
          {showpaginate && (
            <div className="w-full h-[8vh] flex justify-between items-center">
              <div className="text-[#1f4b7f] flex text-[1.1vw] gap-[0.5vw]">
                <span>Showing</span>
                <span className="font-bold">
                  {/* 1 -{" "}
                {showtable == 1
                  ? currentItems?.length
                  : showtable == 3
                  ? promocurrentItems?.length
                  : showtable === 4
                  ? adscurrentItems?.length
                  : offerCurrentItems.length} */}
                  {/* {offerIndexOfFirstItem+1}
                   -{" "} */}
                  {showtable == 1
                    ? `${indexOfFirstItem + 1} - ${indexOfFirstItem + currentItems?.length
                    }`
                    : showtable == 2
                    ? `${partnerIndexOfFirtsItem + 1} - ${partnerIndexOfFirtsItem + partnerCurrentItems?.length
                    }`
                    : showtable == 3
                      ? `${promoindexOfFirstItem + 1} - ${promoindexOfFirstItem + promocurrentItems?.length
                      }`
                      : showtable === 4
                        ? `${adsindexOfFirstItem + 1} - ${adsindexOfFirstItem + adscurrentItems?.length
                        }`
                        : `${offerIndexOfFirstItem + 1} - ${offerIndexOfFirstItem + offerCurrentItems?.length
                        }`}
                </span>
                <span>from</span>
                <span className="font-bold">
                  {showtable == 1
                    ? get_rq_man_data?.length > 0
                      ? get_rq_man_data?.length
                      : 0
                      : showtable == 2
                      ? getPartnerList?.length > 0
                        ? getPartnerList?.length
                        : 0
                    : showtable == 3
                      ? getpromotionlist?.length > 0
                        ? getpromotionlist?.length
                        : 0
                      : showtable === 4
                        ? getadslist?.length > 0
                          ? getadslist?.length
                          : 0
                        : get_req_man_offers?.length > 0
                          ? get_req_man_offers?.length
                          : 0}
                </span>
                <span>data</span>
              </div>
              <div>
                {/* <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={0}
                onChange={handlePageChange}
                onShowSizeChange={handlePageChange}
                // showSizeChanger
              /> */}
                <ReactPaginate
                  activePage={
                    showtable == 1
                      ? activePage
                      :showtable == 2
                      ? partnerActivePage
                      : showtable == 3
                        ? promoactivePage
                        : showtable == 4
                          ? adsactivePage
                          : offerActivePage
                  }
                  itemsCountPerPage={
                    showtable == 1
                      ? itemsPerPage
                      : showtable == 2
                      ? partnerItemsPerPage
                      : showtable == 3
                        ? promoitemsPerPage
                        : showtable == 4
                          ? adsitemsPerPage
                          : offerItemsPerPage
                  }
                  totalItemsCount={
                    showtable == 1
                      ? get_rq_man_data?.length
                      : showtable == 2
                      ? getPartnerList?.length
                      : showtable == 3
                        ? getpromotionlist?.length
                        : showtable == 4
                          ? getadslist?.length
                          : get_req_man_offers.length
                  }
                  pageRangeDisplayed={3}
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

                {/* <input
              type="file"
              // onChange={(e) => console.log(e.target.value, "datatatat")}
              onChange={(e) => handleSubmit(e)}
            /> */}
              </div>

              {/* ###################################################################### */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
