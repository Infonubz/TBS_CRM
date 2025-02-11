import React, { useEffect, useRef, useState } from "react";
import {
  IoIosArrowDropleft,
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
  IoIosSearch,
} from "react-icons/io";
import { capitalizeFirstLetter } from "../../../Common/Captilization";
import { Button, Grid, Space, Spin, Table } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import {
  MdDownloadForOffline,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import Doc_Ads from "./Doc_Ads";
import Image_Video from "../../../Common/Download/Image_Video";
import { SearchRedeemOffer } from "../../../../Api/Offers/RedeemOffers";
import {
  GetOffersData,
  SearchDiscountOffer,
} from "../../../../Api/Offers/Offers";
import {
  GetAdvertisment,
  GetClientData,
  GetDiscountOffers,
  GetMobAdvertisment,
  GetOpEmployeeDocument,
  GetOperatorDocumeents,
  GetPoEmployeeDocument,
  GetPromotionsData,
  GetRedeemOffers,
  GetpartnerDocuments,
  SearchDiscountDetails,
  SearchRedeemDetails,
  searchMobAdsDetails,
  searchOperatorDetails,
  searchPartnerDetails,
  searchPromotionDetails,
  searchWebAdsDetails,
} from "../../../../Api/Settings/DataSettings/Document";
import { useDispatch, useSelector } from "react-redux";

const Documents = () => {
  const [selectTab, setSelectTab] = useState();
  const [poEmpDocuments, setPoEmpDocuments] = useState([]);
  const [opEmpDocuments, setOpEmpDocuments] = useState([]);
  const [partnerDocuments, setPartnerDocuments] = useState([]);
  const [operatorDocuments, setOperatorDocuments] = useState([]);
  const [clientDocuments, setClientDocuments] = useState([]);
  const [advertisement, setAdvertisment] = useState([]);
  const [mobAdvertisment, setMobAdvertisment] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [discountOffers, setDiscountOffers] = useState([]);
  const [redeemOffers, setRedeemOffers] = useState([]);
  const [error, setError] = useState(null);
  const [dropDown, setDropDown] = useState("operator");
  const [folder, setFolder] = useState("usermanagement");
  const apiUrl = process.env.REACT_APP_API_URL;

  const [searchReq, setSearchReq] = useState("");
  const [spinning, setSpinning] = useState(false);

  const dispatch = useDispatch();
  console.log(poEmpDocuments, "documents_documentes");

  useEffect(() => {
    setDropDown(
      folder === "usermanagement"
        ? "operator"
        : folder === "offers"
        ? "redeemOffer"
        : folder === "advertisment"
        ? "advertisment"
        : dropDown === "promotion"
        ? "promotion"
        : ""
    );
  }, [folder, setFolder]);

  console.log(folder, dropDown, "toggletoggle");

  const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;
  const apiurl = process.env.REACT_APP_API_URL;

  console.log(apiImgUrl, "apiimageurl");

  const user = sessionStorage.getItem("USER_ID");

  // --------------------------------------------------------------------------apicalling------------------------------------------

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setSpinning(true);
        const operatorData = await GetOperatorDocumeents(dispatch, setSpinning);
        setOperatorDocuments(operatorData);
        console.log(operatorData, "operatore_data");

        const opEmpData = await GetOpEmployeeDocument();
        setOpEmpDocuments(opEmpData);
        console.log(opEmpData, "op_emp_data");

        const poEmpData = await GetPoEmployeeDocument();
        setPoEmpDocuments(poEmpData);

        const partnerData = await GetpartnerDocuments(dispatch);
        setPartnerDocuments(partnerData);

        const advertData = await GetAdvertisment(dispatch);
        setAdvertisment(advertData);

        const promotionsData = await GetPromotionsData(dispatch);
        setPromotions(promotionsData);

        const clientData = await GetClientData();
        setClientDocuments(clientData);

        const redeemOffersData = await GetRedeemOffers(dispatch);
        setRedeemOffers(redeemOffersData);

        const discountOffersData = await GetOffersData(dispatch);
        setDiscountOffers(discountOffersData);

        const mobAdvertData = await GetMobAdvertisment(dispatch);
        setMobAdvertisment(mobAdvertData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDocuments();
  }, []);

  // ----------------------------------------------------------------------------------------------------

  // ----------------------------------------searching----------------------------------------------

  const searchOperator = useSelector((state) => state?.crm?.request_management);
  const searchPartner = useSelector((state) => state?.crm?.get_req_partner);
  const searchPromotion = useSelector((state) => state?.crm?.req_promotion);
  const searchMobAds = useSelector((state) => state?.crm?.get_req_mob_ads);
  const searchWebAds = useSelector((state) => state?.crm?.get_req_ads);
  const searchRedeem = useSelector((state) => state?.crm?.redeem_offer);
  const searchDiscount = useSelector((state) => state?.crm?.offers_list);

  const SearchRequest = (e) => {
    if (dropDown == "operator") {
      console.log(searchReq, "e values");
      searchOperatorDetails(dispatch, searchReq, 2);
    } else if (dropDown == "partner") {
      searchPartnerDetails(dispatch, searchReq, 5);
    } else if (dropDown == "promotion") {
      console.log(searchReq, "search e value");
      searchPromotionDetails(dispatch, searchReq);
    } else if (dropDown == "advertisment") {
      console.log(searchReq, "search e value");
      searchWebAdsDetails(dispatch, searchReq, 3);
    } else if (dropDown == "mobileAdvertisment") {
      searchMobAdsDetails(dispatch, searchReq, 3);
      console.log(searchReq, "evalues");
    } else if (dropDown == "discountOffer") {
      SearchDiscountDetails(dispatch, searchReq);
      console.log(searchReq, "evalues");
    } else if (dropDown == "redeemOffer") {
      SearchRedeemDetails(dispatch, searchReq);
      console.log(searchReq, "evalues");
    } else {
      return null;
    }
  };

  // --------------------------------------------------------------------------
  const toggleFolder = (section) => {
    setFolder(folder === section ? null : section);
  };

  const toggleDropDown = (id) => {
    setDropDown(dropDown === id ? "" : id);
    setSelectItems("");
    setSearchReq("");

    console.log(id, "toggle_DropDown");

    switch (id) {
      case "operator":
        GetOperatorDocumeents(dispatch);
        break;
      case "poemployee":
        GetPoEmployeeDocument(dispatch);
        break;
      case "opemployee":
        GetOpEmployeeDocument(dispatch);
        break;
      case "clientDocuments":
        GetClientData();
        break;
      case "partner":
        GetpartnerDocuments(dispatch);
        break;
      case "promotion":
        GetPromotionsData(dispatch);
        break;
      case "discountOffer":
        GetDiscountOffers(dispatch);
        break;
      case "redeemOffer":
        GetRedeemOffers(dispatch);
        break;
      case "mobileAdvertisment":
        GetMobAdvertisment(dispatch);
        break;
      case "advertisment":
        GetAdvertisment(dispatch);
        break;
      default:
        break;
    }
  };

  const [selectItems, setSelectItems] = useState();

  console.log(selectItems, "select_Items");

  const handleOnClick = (record) => {
    setSelectItems(record);

    console.log(selectItems, "selectItems");
  };

  const downloadImages = async () => {
    const imageUrls = await fetchImages();
    const zip = new JSZip();

    for (const url of imageUrls) {
      const imageBlob = await fetch(url).then((res) => res.blob());
      const fileName = url.split("/").pop();
      zip.file(fileName, imageBlob);
    }

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(
        content,
        `${
          dropDown == "operator"
            ? selectItems?.tbs_operator_id
            : dropDown == "partner"
            ? selectItems?.tbs_partner_id
            : dropDown == "poemployee"
            ? selectItems?.tbs_pro_emp_id
            : dropDown == "opemployee"
            ? selectItems?.tbs_op_emp_id
            : selectItems?.tbs_client_id
        }.zip`
      );
    });
  };

  const fetchImages = async () => {
    let images = [];

    if (dropDown == "operator") {
      images = [
        `${apiImgUrl}${selectItems?.aadar_front_doc}`,
        `${apiImgUrl}${selectItems?.aadar_back_doc}`,
        `${apiImgUrl}${selectItems?.pancard_front_doc}`,
        `${apiImgUrl}${selectItems?.pancard_back_doc}`,
      ];
    } else if (dropDown == "partner") {
      images = [
        `${apiImgUrl}${selectItems?.aadhar_card_front}`,
        `${apiImgUrl}${selectItems?.aadhar_card_back}`,
        `${apiImgUrl}${selectItems?.pan_card_front}`,
        `${apiImgUrl}${selectItems?.pan_card_back}`,
      ];
    } else if (dropDown == "opemployee") {
      images = [
        `${apiImgUrl}${selectItems?.aadhar_card_front_doc}`,
        `${apiImgUrl}${selectItems?.aadhar_card_back_doc}`,
        `${apiImgUrl}${selectItems?.pan_card_front_doc}`,
        `${apiImgUrl}${selectItems?.pan_card_back_doc}`,
        `${apiImgUrl}${selectItems?.qualification_doc}`,
        `${apiImgUrl}${selectItems?.offer_letter_doc}`,
      ];
    } else if (dropDown == "poemployee") {
      images = [
        `${apiImgUrl}${selectItems?.aadhar_card_front_doc}`,
        `${apiImgUrl}${selectItems?.aadhar_card_back_doc}`,
        `${apiImgUrl}${selectItems?.pan_card_front_doc}`,
        `${apiImgUrl}${selectItems?.pan_card_back_doc}`,
        `${apiImgUrl}${selectItems?.qualification_doc}`,
        `${apiImgUrl}${selectItems?.offer_letter_doc}`,
      ];
    } else if (dropDown == "clientDocuments") {
      images = [`${apiImgUrl}/${selectItems?.upload_gst}`];
    }

    return images;
  };
  console.log(selectItems, "selecteditems");

  const columns = [
    {
      title: (
        <h1 className="text-[1.1vw] font-bold text-[#1F487C]  flex items-center justify-center">
          S.No
        </h1>
      ),
      width: "4vw",
      render: (row, rowdta, index) => {
        const serialNumber = index + 1;
        return (
          <div className="flex items-center justify-center">
            {/* <h1 className="pl-[1vw] text-[1.1vw]">{index + 1}</h1> */}
            <h1 className=" text-[1vw] text-[#1F487C]">
              {serialNumber}
            </h1>
          </div>
        );
      },
    },
    {
      title: (
        <span className="text-[1.1vw] text-[#1F487C] font-bold flex items-center justify-center">
          {dropDown === "partner" ? (
            <p>Partner ID</p>
          ) : dropDown === "clientDocuments" ? (
            <p>Client ID</p>
          ) : dropDown === "operator" ? (
            <p>Operator ID</p>
          ) : dropDown === "poemployee" ? (
            <p>PO Employee ID</p>
          ) : dropDown === "opemployee" ? (
            <p>OP Employee ID</p>
          ) : (
            <p>Name</p>
          )}
        </span>
      ),
      // dataIndex: "name",
      //sorter: (a, b) => a.name.length - b.name.length,
      render: (row) => (
        <div className="flex items-center justify-center font-normal">
          <p className=" text-[1vw] text-[#1F487C]">
            {row?.tbs_operator_id
              ? row?.tbs_operator_id
              : row?.tbs_client_id
              ? row?.tbs_client_id
              : row?.tbs_partner_id
              ? row?.tbs_partner_id
              : row?.tbs_pro_emp_id
              ? row?.tbs_pro_emp_id
              : row?.tbs_op_emp_id
              ? row?.tbs_op_emp_id
              : capitalizeFirstLetter(row?.offer_name)
              ? capitalizeFirstLetter(row?.offer_name)
              : capitalizeFirstLetter(row?.promo_name)
              ? capitalizeFirstLetter(row?.promo_name)
              : capitalizeFirstLetter(row?.ad_title)
              ? capitalizeFirstLetter(row?.ad_title)
              : capitalizeFirstLetter(row?.mobad_title)}
          </p>
        </div>
      ),
      width: "10vw",
    },
    {
      title: (
        <span className="text-[1.1vw] text-[#1F487C] font-bold flex items-center justify-center">
          {dropDown === "partner" ? (
            <p>First Name</p>
          ) : dropDown === "clientDocuments" ? (
            <p>Owner name</p>
          ) : dropDown === "operator" ? (
            <p>Owner Name</p>
          ) : dropDown === "poemployee" ? (
            <p>First Name</p>
          ) : dropDown === "opemployee" ? (
            <p>First Name</p>
          ) : (
            <p>Modified</p>
          )}
        </span>
      ),
      // dataIndex: "name",
      //sorter: (a, b) => a.name.length - b.name.length,
      render: (row) => (
        <div className="flex items-center justify-center font-normal">
          <p className="text-[1vw] text-[#1F487C]">
            {row?.owner_name
              ? capitalizeFirstLetter(row?.owner_name)
              : row?.partner_first_name
              ? capitalizeFirstLetter(row?.partner_first_name)
              : capitalizeFirstLetter(row?.emp_first_name)
              ? capitalizeFirstLetter(row?.emp_first_name)
              : row?.updated_date
              ? dayjs(row?.updated_date).format("DD MMM, YY")
              : ""}
          </p>
        </div>
      ),
      width: "10vw",
    },
    {
      title: (
        <span className="text-[1.1vw] text-[#1F487C] font-bold flex items-center justify-center">
          {dropDown === "partner" ? (
            <p>Last Name</p>
          ) : dropDown === "operator" ? (
            <p>Company Name</p>
          ) : dropDown === "clientDocuments" ? (
            <p>Company Name</p>
          ) : dropDown === "poemployee" ? (
            <p>Last Name</p>
          ) : dropDown === "opemployee" ? (
            <p>Last Name</p>
          ) : (
            <p>Size</p>
          )}
        </span>
      ),
      // dataIndex: "name",
      //sorter: (a, b) => a.name.length - b.name.length,
      render: (row) => (
        <div className="flex items-center font-normal justify-center">
          <p className="text-[1vw] text-[#1F487C]">
            {row?.company_name
              ? capitalizeFirstLetter(row?.company_name)
              : row?.partner_last_name
              ? capitalizeFirstLetter(row?.partner_last_name)
              : capitalizeFirstLetter(row?.emp_last_name)
              ? capitalizeFirstLetter(row?.emp_last_name)
              : row?.image_size
              ? (row?.image_size / 1024).toFixed(2) + " KB"
              : row?.promo_img_details
              ? (row?.promo_img_details?.background_image?.size / 1024).toFixed(
                  2
                ) + " KB"
              : row?.mobad_file_size
              ? (row?.mobad_file_size / 1024).toFixed(2) + " KB"
              : (row?.ad_file_size / 1024).toFixed(2) + " KB"}
          </p>
        </div>
      ),
      width: "10vw",
    },
  ];

  const [dataDocuments, setDataDocuments] = useState([]);

  useEffect(() => {
    switch (dropDown) {
      case "poemployee":
        setDataDocuments(poEmpDocuments);
        break;
      case "opemployee":
        setDataDocuments(opEmpDocuments);
        break;
      case "partner":
        setDataDocuments(searchPartner);
        break;
      case "operator":
        setDataDocuments(searchOperator);
        break;
      case "clientDocuments":
        setDataDocuments(clientDocuments);
        break;
      case "advertisment":
        setDataDocuments(searchWebAds);
        break;
      case "mobileAdvertisment":
        setDataDocuments(searchMobAds);
        break;
      case "promotion":
        setDataDocuments(searchPromotion);
        break;
      case "discountOffer":
        setDataDocuments(searchDiscount);
        break;
      case "redeemOffer":
        setDataDocuments(searchRedeem);
        break;
      default:
        setDataDocuments([]);
        break;
    }
  }, [
    dropDown,
    opEmpDocuments,
    poEmpDocuments,
    clientDocuments,
    searchRedeem,
    searchDiscount,
    searchOperator,
    searchPartner,
    searchPromotion,
    searchMobAds,
    searchWebAds,
  ]);

  const videoUrl = selectItems?.ad_video
    ? `${apiImgUrl}${selectItems?.ad_video}`
    : selectItems?.mobad_vdo
    ? `${apiImgUrl}${selectItems?.mobad_vdo}`
    : selectItems?.offer_img
    ? `${apiImgUrl}${selectItems?.offer_img}`
    : selectItems?.background_image
    ? `${apiImgUrl}${selectItems?.background_image}`
    : selectItems?.promo_img_details?.promo_image
    ? `${apiImgUrl}${selectItems?.promo_img_details?.promo_image}`
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

  const sections = [
    {
      id: "operator",
      name: "Operator",
      files: operatorDocuments?.length + " Files",
    },
    {
      id: "poemployee",
      name: "P.O Employee",
      files: poEmpDocuments?.length + " Files",
    },
    {
      id: "opemployee",
      name: "O.P Employee",
      files: opEmpDocuments?.length + " Files",
    },
    {
      id: "clientDocuments",
      name: "Client",
      files: clientDocuments?.length + " Files",
    },
    {
      id: "partner",
      name: "Partner",
      files: partnerDocuments?.length + " Files",
    },
    {
      id: "promotion",
      name: "Promotion",
      files: promotions?.length + " Files",
    },
    {
      id: "discountOffer",
      name: "Discount Offer",
      files: discountOffers?.length + " Files",
    },
    {
      id: "redeemOffer",
      name: "Redeem Offer",
      files: redeemOffers?.length + " Files",
    },
    {
      id: "mobileAdvertisment",
      name: "Mobile Ads",
      files: mobAdvertisment?.length + " Files",
    },
    {
      id: "advertisment",
      name: "Web Ads",
      files: advertisement?.length + " Files",
    },
  ];

  const scrollContainerRef = useRef(null);

  const handleDropDownChange = (id) => {
    toggleDropDown(id);
  };

  useEffect(() => {
    if (scrollContainerRef.current && dropDown !== null) {
      // Find the selected section element
      const selectedSection = document.getElementById(dropDown);
      if (selectedSection) {
        // Scroll to the selected section
        const container = scrollContainerRef.current;
        const sectionPosition = selectedSection.offsetLeft;
        const sectionWidth = selectedSection.offsetWidth;
        const containerWidth = container.offsetWidth;

        // Scroll the same amount to left or right
        if (sectionPosition < container.scrollLeft) {
          // Scroll left (by sectionWidth)
          container.scrollTo({
            left: container.scrollLeft - sectionWidth,
            behavior: "smooth",
          });
        } else if (
          sectionPosition + sectionWidth >
          container.scrollLeft + containerWidth
        ) {
          // Scroll right (by sectionWidth)
          container.scrollTo({
            left: container.scrollLeft + sectionWidth,
            behavior: "smooth",
          });
        }
      }
    }
  }, [dropDown]);
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 5;

  const prevSlide = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const nextSlide = () => {
    setStartIndex((prev) => Math.min(prev + 1, sections.length - itemsPerPage));
  };

  return (
    <>
      <div className="px-[1vw] py-[0.5vw]">
        <div className="rounded-xl border-[#1F487C] border-[0.1vw] border-b-[0.1vw]">
          {/* -------------------------------------------SearchTab------------------------------------- */}

          {/* <div className="flex bg-[#1F487C] rounded-t-xl py-[0.5vw] items-center gap-[1vw]">
            <div className="relative pl-[1vw]">
              <input
                type="text"
                placeholder="Search"
                className="w-[17.5vw] h-[2.5vw] text-[1vw] text-[#1F487C] rounded-md pl-[2.5vw] placeholder-[#1F487C] placeholder:text-[1vw] outline-none"
                onChange={(e) => {
                  SearchRequest(e);
                  setSearchReq(e.target.value);
                }}
                value={searchReq}
              />
              <div className="absolute top-[0.75vw] left-[1.5vw]">
                <IoIosSearch color="#1F487C" />
              </div>
            </div>
            <div className="flex items-center gap-[1.5vw]">
              <span className="text-white text-[1vw]">Sort : </span>
              <span className="text-white text-[1vw]">Module Name</span>
              <span className="text-white text-[1vw]">File Size </span>
              <span className="text-white text-[1vw]">Date Added</span>
            </div>
          </div> */}

          {/* ------------------------------------Folders----------------------------------------------- */}
          {spinning ? (
            <div className="absolute inset-0 flex justify-center items-center  z-10">
              <Spin size="large" />
            </div>
          ) : (
            <>
              <div className="px-[5vw]   relative ">
                {startIndex > 0 && sections?.length > 4 && (
                  <div className=" absolute left-[1.25vw] top-[3.5vw]">
                    <button onClick={prevSlide} disabled={startIndex === 0}>
                      <MdKeyboardDoubleArrowLeft
                        size={"2.5vw"}
                        color="#1F487C"
                      />
                    </button>
                  </div>
                )}
                <div
                  ref={scrollContainerRef}
                  // className="px-[1vw] py-[0.5vw] flex overflow-x-scroll scrollbar-custom gap-[1vw] mb-[0.25vw]"
                  // className="px-[1vw] py-[0.5vw] flex overflow-x-scroll scrollbar-custom gap-[1vw] mb-[0.25vw]"
                  className="w-full gap-[3vw] items-center relative flex transition-transform duration-500 ease-in-out"
                >
                  {/* {sections.map((section) => ( */}
                  {sections
                    .slice(startIndex, startIndex + itemsPerPage)
                    .map((section, index) => (
                      <div
                        // key={section.id}
                        // id={section.id}
                        key={index}
                        className={`${
                          dropDown === section.id ? "" : "py-[0.25vw]"
                        }`}
                      >
                        {/* <div
                        onClick={() => {
                          handleDropDownChange(section.id);
                        }}
                        className={`${
                          dropDown === section.id
                            ? "w-[14vw] h-[9.5vw] bg-[#1F487C]"
                            : "w-[13.5vw] h-[9vw] bg-white"
                        } border-[0.2vw] border-[#1F487C] rounded-xl border-t-[0.5vw] cursor-pointer`}
                      >
                        <div className="pl-[1vw] pt-[0.5vw] grid grid-rows-3 gap-y-[1vw]">
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              className="w-[1.5vw] h-[1.5vw]"
                            >
                              <path
                                d="M448 480H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H192c20.1 0 39.1 9.5 51.2 25.6l19.2 25.6c6 8.1 15.5 12.8 25.6 12.8H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64zM184 272c-13.3 0-24 10.7-24 24s10.7 24 24 24H328c13.3 0 24-10.7 24-24s-10.7-24-24-24H184z"
                                fill={`${
                                  dropDown === section.id ? "#FFF" : "#1F487C"
                                }`}
                              />
                            </svg>
                          </div>
                          <div
                            className={`${
                              dropDown === section.id
                                ? "text-white"
                                : "text-[#1F487C]"
                            } text-[1.1vw] font-bold`}
                          >
                            {section.name}
                          </div>
                          <div
                            className={`${
                              dropDown === section.id
                                ? "text-white"
                                : "text-[#1F487C]"
                            } text-[0.9vw] font-semibold`}
                          >
                            {section.files}
                          </div>
                        </div>
                      </div> */}
                        <div
                          className="relative cursor-pointer"
                          onClick={() => {
                            handleDropDownChange(section.id);
                          }}
                        >
                          {/* SVG Element */}
                          <svg
                            width="14vw"
                            height="9vw"
                            viewBox="0 0 292 167"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                              zIndex: 2,
                              position: "relative",
                            }}
                          >
                            <path
                              d="M0.511702 12.8382C0.511702 6.50617 5.64485 1.37303 11.9769 1.37303H46.7625C49.1532 1.37303 51.4492 2.30709 53.161 3.976L61.8908 12.4874C63.2422 13.8049 65.0549 14.5423 66.9422 14.5423H279.726C286.058 14.5423 291.191 19.6755 291.191 26.0076V154.372C291.191 160.704 286.058 165.837 279.726 165.837H11.9769C5.64486 165.837 0.511702 160.704 0.511702 154.372V12.8382Z"
                              // fill="#FEFEFE"
                              fill={
                                dropDown === section.id ? "#1F487C" : "#FEFEFE"
                              }
                              stroke="#1F4B7F"
                              strokeWidth="0.964809"
                            />
                          </svg>

                          {/* Background Div */}
                          <div
                            className={`${
                              dropDown === section.id
                                ? "bg-[#FEFEFE]"
                                : "bg-[#1F487C]"
                            } w-[13.98vw] h-[7vw] absolute top-[0.9vw] border-[0.1vw] border-[#1F487C] left-0 rounded-[0.5vw]`}
                            style={{
                              zIndex: 1,
                            }}
                          ></div>
                          <div
                            className=" absolute left-[1vw] top-0"
                            style={{
                              zIndex: 3,
                            }}
                          >
                            <div className="pl-[0.1vw] pt-[1.75vw] grid grid-rows-3 gap-y-[0.5vw]">
                              <div>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                                  className="w-[1.5vw] h-[1.5vw]"
                                >
                                  <path
                                    d="M448 480H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H192c20.1 0 39.1 9.5 51.2 25.6l19.2 25.6c6 8.1 15.5 12.8 25.6 12.8H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64zM184 272c-13.3 0-24 10.7-24 24s10.7 24 24 24H328c13.3 0 24-10.7 24-24s-10.7-24-24-24H184z"
                                    fill={`${
                                      dropDown === section.id
                                        ? "#FFF"
                                        : "#1F487C"
                                    }`}
                                  />
                                </svg>
                              </div>
                              <div
                                className={`${
                                  dropDown === section.id
                                    ? "text-[#CCCCCC]"
                                    : "text-[#1F487C]"
                                } text-[1.1vw] `}
                              >
                                {section.name}
                              </div>
                              <div
                                className={`${
                                  dropDown === section.id
                                    ? "text-[#CCCCCC]"
                                    : "text-[#CCCCCC]"
                                } text-[0.9vw] font-semibold`}
                              >
                                {section.files}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                {sections?.length > 4 && startIndex < sections?.length - 5 && (
                  <div className=" absolute right-[1.25vw] top-[3.5vw]">
                    <button
                      onClick={nextSlide}
                      // disabled={startIndex >= sections.length - itemsPerPage}
                    >
                      <MdKeyboardDoubleArrowRight
                        size={"2.5vw"}
                        color="#1F487C"
                      />
                    </button>
                  </div>
                )}
              </div>
              {/* --------------------------------------------------Tabs--------------------------------------- */}
              {/* {folder ? (
            <div className='flex gap-x-[3vw] text-[1.5vw] justify-items-center px-[5vw] py-[1vw] text-[#1F487C]'>
              {folder === 'usermanagement' ?
                <>
                  <div
                    className={`${dropDown === 'operator' ? 'font-semibold border-b-[0.1vw] border-[#1F487C]' : ''} text-[#1F487C]`}
                    onClick={() => toggleDropDown('operator')}>
                    <span>Operator</span>
                  </div>
                  <div
                    className={`${dropDown === 'poemployee' ? 'font-semibold border-b-[0.1vw] border-[#1F487C]' : ''} text-[#1F487C]`}
                    onClick={() => toggleDropDown('poemployee')}>
                    <span>P.O Employee</span>
                  </div>
                  <div
                    className={`${dropDown === 'opemployee' ? 'font-semibold border-b-[0.1vw] border-[#1F487C]' : ''} text-[#1F487C]`}
                    onClick={() => toggleDropDown('opemployee')}>
                    <span>O.P Employee</span>
                  </div>
                  <div
                    className={`${dropDown === 'partner' ? 'font-semibold border-b-[0.1vw] border-[#1F487C]' : ''} text-[#1F487C]`}
                    onClick={() => toggleDropDown('partner')}>
                    <span>Partner</span>
                  </div>
                  <div
                    className={`${dropDown === 'clientDocuments' ? 'font-semibold border-b-[0.1vw] border-[#1F487C]' : ''} text-[#1F487C]`}
                    onClick={() => toggleDropDown('clientDocuments')}>
                    <span>Client</span>
                  </div>
                </> : folder === 'offers' ?
                  <>
                    <div
                      className={`${dropDown === 'redeemOffer' ? 'font-semibold border-b-[0.1vw] border-[#1F487C]' : ''} text-[#1F487C]`}
                      onClick={() => toggleDropDown('redeemOffer')}>
                      <span>Redeem Offers</span>
                    </div>
                    <div
                      className={`${dropDown === 'discountOffer' ? 'font-semibold border-b-[0.1vw] border-[#1F487C]' : ''} text-[#1F487C]`}
                      onClick={() => toggleDropDown('discountOffer')}>
                      <span>Discount Offers</span>
                    </div>
                  </>
                  :
                  folder === 'advertisment' ?
                    <>
                      <div
                        className={`${dropDown === 'advertisment' ? 'font-semibold border-b-[0.1vw] border-[#1F487C]' : ''} text-[#1F487C]`}
                        onClick={() => toggleDropDown('advertisment')}>
                        <span>Website Ads</span>
                      </div>
                      <div
                        className={`${dropDown === 'mobileAdvertisment' ? 'font-semibold border-b-[0.1vw] border-[#1F487C]' : ''} text-[#1F487C]`}
                        onClick={() => toggleDropDown('mobileAdvertisment')}>
                        <span>Mobile Ads</span>
                      </div>
                    </>
                    : ''
              }
            </div>
          ) : ''} */}

              {dropDown ? (
                <div className="pt-[0.5vw]">
                  <div className="px-[5vw] grid grid-cols-2">
                    <div className="font-bold text-[1.25vw] text-[#1F487C] ">
                      {/* Recent Documents */}
                      <div>
                        <Table
                          columns={columns}
                          dataSource={dataDocuments}
                          // onChange={handleChange}
                          pagination={false}
                          className="customize-table"
                          // className="custom-table"
                          scroll={{ y: "15vw" }}
                          onRow={(record) => ({
                            onClick: () => handleOnClick(record),
                          })}
                        />
                      </div>
                    </div>

                    {/* -----------------------------------------------------------------FilePreview--------------------------------------------------------------------- */}

                    <div>
                      <div className="flex items-center justify-between">
                        <p className="border-b-slate-400 border-b-[0.1vw] font-bold  text-[1.25vw] text-[#1F487C]">
                          File Preview :
                        </p>

                        <div className="order-last">
                          {selectItems?.aadhar_card_doc ||
                          selectItems?.pan_card_doc ||
                          selectItems?.offer_letter_doc ||
                          selectItems?.qualification_doc ? (
                            <div className="flex justify-end pt-[1vw]">
                              <MdDownloadForOffline
                                onClick={downloadImages}
                                color="#4283e5"
                                size="2vw"
                                className=" cursor-pointer"
                              />
                            </div>
                          ) : selectItems?.aadhar_card_front ||
                            selectItems?.aadhar_card_back ||
                            selectItems?.pan_card_front ||
                            selectItems?.pan_card_back ? (
                            <div className="flex justify-end pt-[1vw]">
                              <MdDownloadForOffline
                                onClick={downloadImages}
                                color="#4283e5"
                                size="2vw"
                                className=" cursor-pointer"
                              />
                            </div>
                          ) : selectItems?.aadar_front_doc ||
                            selectItems?.aadar_back_doc ||
                            selectItems?.pancard_front_doc ||
                            selectItems?.pancard_back_doc ? (
                            <div className="flex justify-end pt-[1vw]">
                              <MdDownloadForOffline
                                onClick={downloadImages}
                                color="#4283e5"
                                size="2vw"
                                className=" cursor-pointer"
                              />
                            </div>
                          ) : selectItems?.aadar_front_doc ||
                            selectItems?.aadar_back_doc ||
                            selectItems?.pancard_front_doc ||
                            selectItems?.upload_gst ||
                            selectItems?.pancard_back_doc ? (
                            <div className="flex justify-end pt-[1vw]">
                              <MdDownloadForOffline
                                onClick={downloadImages}
                                color="#4283e5"
                                size="2vw"
                                className=" cursor-pointer"
                              />
                            </div>
                          ) : (
                            <div className="text-[#4283e5] cursor-pointer">
                              <Image_Video
                                fileUrl={fileUrl}
                                filename={filename}
                                selectItems={selectItems}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="  gap-[0.5vw] items-center h-[12vw] overflow-y-scroll">
                        {
                          dropDown === "poemployee" ? (
                            <div>
                              <div className="grid grid-cols-2 gap-[0.5vw] justify-items-center">
                                {selectItems?.aadhar_card_front_doc ||
                                selectItems?.aadhar_card_front_doc ||
                                selectItems?.offer_letter_doc ||
                                selectItems?.qualification_doc ? (
                                  <>
                                    {selectItems?.aadhar_card_front_doc !==
                                      null && (
                                      <img
                                        src={`${apiImgUrl}${selectItems?.aadhar_card_front_doc}`}
                                        className="h-[10vw]"
                                      />
                                    )}
                                    {selectItems?.aadhar_card_back_doc !==
                                      null && (
                                      <img
                                        src={`${apiImgUrl}${selectItems?.aadhar_card_back_doc}`}
                                        className="h-[10vw]"
                                      />
                                    )}
                                    {selectItems?.pan_card_front_doc !==
                                      null && (
                                      <img
                                        src={`${apiImgUrl}${selectItems?.pan_card_front_doc}`}
                                        className="h-[10vw]"
                                      />
                                    )}
                                    {selectItems?.pan_card_back_doc !==
                                      null && (
                                      <img
                                        src={`${apiImgUrl}${selectItems?.pan_card_back_doc}`}
                                        className="h-[10vw]"
                                      />
                                    )}
                                    {selectItems?.qualification_doc !==
                                      null && (
                                      <img
                                        src={`${apiImgUrl}${selectItems?.qualification_doc}`}
                                        className="h-[10vw]"
                                      />
                                    )}
                                    {selectItems?.offer_letter_doc !== null && (
                                      <img
                                        src={`${apiImgUrl}${selectItems?.offer_letter_doc}`}
                                        className="h-[10vw]"
                                      />
                                    )}
                                  </>
                                ) : (
                                  <p className="px-[2vw]">No data</p>
                                )}
                              </div>

                              {/* {selectItems?.aadhar_card_doc ||
                              selectItems?.pan_card_doc ||
                              selectItems?.offer_letter_doc ||
                              selectItems?.qualification_doc ? (
                                <div className="flex justify-end pt-[1vw]">
                                  <MdDownloadForOffline
                                    onClick={downloadImages}
                                    color="#4283e5"
                                    size="3vw"
                                    className=" cursor-pointer"
                                  />
                                </div>
                              ) : (
                                ""
                              )} */}
                            </div>
                          ) : dropDown === "opemployee" ? (
                            <div>
                              <div className="grid grid-cols-2 gap-[0.5vw] justify-items-center">
                                {selectItems?.aadhar_card_front_doc ||
                                selectItems?.pan_card_front_doc ||
                                selectItems?.offer_letter_doc ||
                                selectItems?.qualification_doc ? (
                                  <>
                                    {selectItems?.aadhar_card_front_doc !==
                                      null && (
                                      <img
                                        src={`${apiImgUrl}${selectItems?.aadhar_card_front_doc}`}
                                        className="h-[10vw]"
                                      />
                                    )}
                                    {selectItems?.aadhar_card_back_doc !==
                                      null && (
                                      <img
                                        src={`${apiImgUrl}${selectItems?.aadhar_card_back_doc}`}
                                        className="h-[10vw]"
                                      />
                                    )}
                                    {selectItems?.pan_card_front_doc !==
                                      null && (
                                      <img
                                        src={`${apiImgUrl}${selectItems?.pan_card_front_doc}`}
                                        className="h-[10vw]"
                                      />
                                    )}
                                    {selectItems?.pan_card_back_doc !==
                                      null && (
                                      <img
                                        src={`${apiImgUrl}${selectItems?.pan_card_back_doc}`}
                                        className="h-[10vw]"
                                      />
                                    )}
                                    {selectItems?.qualification_doc !==
                                      null && (
                                      <img
                                        src={`${apiImgUrl}${selectItems?.qualification_doc}`}
                                        className="h-[10vw]"
                                      />
                                    )}
                                    {selectItems?.offer_letter_doc !== null && (
                                      <img
                                        src={`${apiImgUrl}${selectItems?.offer_letter_doc}`}
                                        className="h-[10vw]"
                                      />
                                    )}
                                  </>
                                ) : (
                                  <p className="px-[2vw]">No data</p>
                                )}
                              </div>
                            </div>
                          ) : dropDown === "partner" ? (
                            <div>
                              <div className="grid grid-cols-2 gap-[0.5vw] justify-items-center">
                                {selectItems?.aadhar_card_front ||
                                selectItems?.aadhar_card_back ||
                                selectItems?.pan_card_front ||
                                selectItems?.pan_card_back ? (
                                  <>
                                    {selectItems?.aadhar_card_front !==
                                      null && (
                                      <img
                                        src={`${apiImgUrl}${selectItems?.aadhar_card_front}`}
                                        className="h-[10vw]"
                                      />
                                    )}
                                    {selectItems?.aadhar_card_back !== null && (
                                      <img
                                        src={`${apiImgUrl}${selectItems?.aadhar_card_back}`}
                                        className="h-[10vw]"
                                      />
                                    )}
                                    {selectItems?.pan_card_front !== null && (
                                      <img
                                        src={`${apiImgUrl}${selectItems?.pan_card_front}`}
                                        className="h-[10vw]"
                                      />
                                    )}
                                    {selectItems?.pan_card_back !== null && (
                                      <img
                                        src={`${apiImgUrl}${selectItems?.pan_card_back}`}
                                        className="h-[10vw]"
                                      />
                                    )}
                                  </>
                                ) : (
                                  <p className="px-[2vw]">No data</p>
                                )}
                              </div>
                            </div>
                          ) : dropDown === "operator" ? (
                            <div>
                              <div className="grid grid-cols-2 gap-[0.5vw] justify-items-center">
                                {selectItems?.aadar_front_doc ||
                                selectItems?.aadar_back_doc ||
                                selectItems?.pancard_front_doc ||
                                selectItems?.pancard_back_doc ? (
                                  <>
                                    {selectItems?.aadar_front_doc && (
                                      <img
                                        src={`${apiImgUrl}${selectItems?.aadar_front_doc}`}
                                        className="h-[10vw]"
                                        alt="Aadhar Front"
                                      />
                                    )}
                                    {selectItems?.aadar_back_doc && (
                                      <img
                                        src={`${apiImgUrl}${selectItems?.aadar_back_doc}`}
                                        className="h-[10vw]"
                                        alt="Aadhar Back"
                                      />
                                    )}
                                    {selectItems?.pancard_front_doc && (
                                      <img
                                        src={`${apiImgUrl}${selectItems?.pancard_front_doc}`}
                                        className="h-[10vw]"
                                        alt="Pan Card Front"
                                      />
                                    )}
                                    {selectItems?.pancard_back_doc && (
                                      <img
                                        src={`${apiImgUrl}${selectItems?.pancard_back_doc}`}
                                        className="h-[10vw]"
                                        alt="Pan Card Back"
                                      />
                                    )}
                                  </>
                                ) : (
                                  <p className="px-[2vw]">No data</p>
                                )}
                              </div>
                            </div>
                          ) : dropDown === "clientDocuments" ? (
                            <div>
                              <div className="grid grid-cols-2 gap-[0.5vw] justify-items-center">
                                {selectItems?.upload_gst ? (
                                  <>
                                    {selectItems?.upload_gst && (
                                      <img
                                        src={`${apiImgUrl}/${selectItems?.upload_gst}`}
                                        className="h-[10vw]"
                                        alt="Aadhar Front"
                                      />
                                    )}
                                    {console.log(
                                      `${apiImgUrl}${selectItems?.upload_gst}`,
                                      "checking_client_image"
                                    )}
                                  </>
                                ) : (
                                  <p className="px-[2vw]">No data</p>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="py-[0.5vw] gap-[0.5vw] items-center justify-center align-center">
                              {dropDown === "promotion" ? (
                                selectItems ? (
                                  <div className="px-[2vw]">
                                    <img
                                      src={`${apiImgUrl}${selectItems?.background_image}`}
                                      alt="Promo"
                                      className="w-[13.5vw] h-[8vw] object-fill"
                                      style={{ borderRadius: "1.4vw" }}
                                    />
                                  </div>
                                ) : (
                                  <h1 className="pt-[3vw] text-[1vw] px-[2vw]">
                                    Preselect any File
                                  </h1>
                                )
                              ) : dropDown === "redeemOffer" ? (
                                selectItems ? (
                                  <div className="px-[2vw]">
                                    <img
                                      src={`${apiImgUrl}${selectItems?.theme}`}
                                      alt="Promo"
                                      className="w-[13.5vw] h-[8vw] object-fill"
                                      style={{ borderRadius: "1.4vw" }}
                                    />
                                  </div>
                                ) : (
                                  <h1 className="pt-[3vw] text-[1vw] px-[2vw]">
                                    Preselect any File
                                  </h1>
                                )
                              ) : dropDown === "discountOffer" ? (
                                selectItems ? (
                                  <div className="px-[2vw]">
                                    <img
                                      src={`${apiImgUrl}${selectItems?.theme}`}
                                      alt="Promo"
                                      className="w-[13.5vw] h-[8vw] object-fill"
                                      style={{ borderRadius: "1.4vw" }}
                                    />
                                  </div>
                                ) : (
                                  <h1 className="pt-[3vw] text-[1vw] px-[2vw]">
                                    Preselect any File
                                  </h1>
                                )
                              ) : dropDown === "advertisment" ? (
                                selectItems ? (
                                  selectItems?.ad_file_type?.startsWith(
                                    "image/"
                                  ) ? (
                                    <img
                                      src={`${apiImgUrl}${selectItems?.ad_video}`}
                                      alt="Ad"
                                      className="w-full h-full object-cover"
                                      style={{ borderRadius: "1.4vw" }}
                                    />
                                  ) : selectItems?.ad_file_type?.startsWith(
                                      "video/"
                                    ) ? (
                                    <video
                                      key={videoUrl}
                                      autoPlay
                                      loop
                                      muted
                                      className="w-full h-full object-cover"
                                      style={{ borderRadius: "1.2vw" }}
                                    >
                                      <source
                                        src={videoUrl}
                                        type={selectItems?.ad_file_type}
                                      />
                                      Your browser does not support the video
                                      tag.
                                    </video>
                                  ) : (
                                    <h1 className="pt-[3vw] text-[1vw]">
                                      Unsupported file type
                                    </h1>
                                  )
                                ) : (
                                  <h1 className="pt-[3vw] text-[1vw] px-[2vw]">
                                    Preselect any File
                                  </h1>
                                )
                              ) : selectItems ? (
                                selectItems?.mobad_file_type?.startsWith(
                                  "image/"
                                ) ? (
                                  <img
                                    src={`${apiImgUrl}${selectItems?.mobad_vdo}`}
                                    alt="Ad"
                                    className="w-full h-full object-cover"
                                    style={{ borderRadius: "1.4vw" }}
                                  />
                                ) : selectItems?.mobad_file_type?.startsWith(
                                    "video/"
                                  ) ? (
                                  <video
                                    key={videoUrl}
                                    autoPlay
                                    loop
                                    muted
                                    className="w-full h-full object-cover"
                                    style={{ borderRadius: "1.2vw" }}
                                  >
                                    <source
                                      src={videoUrl}
                                      type={selectItems?.mobad_file_type}
                                    />
                                    Your browser does not support the video tag.
                                  </video>
                                ) : (
                                  <h1 className="pt-[3vw] text-[1vw]">
                                    Unsupported file type
                                  </h1>
                                )
                              ) : (
                                <h1 className="pt-[3vw] text-[1vw] px-[2vw]">
                                  Preselect any File
                                </h1>
                              )}
                              <div className="px-[2vw]">
                                {/* -----------------------------File Name---------------------------------------------------- */}
                                <div className="grid grid-cols-12 mt-[0.5vw]">
                                  <div className="col-span-11 text-[1vw] text-[#4283e5]">
                                    {selectItems?.ad_video ||
                                    selectItems?.offer_img ||
                                    selectItems?.background_image ||
                                    selectItems?.mobad_vdo
                                      ? selectItems?.ad_video ||
                                        selectItems?.offer_img ||
                                        selectItems?.background_image ||
                                        selectItems?.mobad_vdo
                                      : selectItems?.promo_img_details
                                          ?.promo_image?.filename ||
                                        selectItems?.image_file?.filename}
                                  </div>
                                </div>

                                {/* ------------------------------------------------File Size------------------------------------------------------- */}
                                <div className="text-[1vw] text-[#818181]">
                                  {selectItems ? (
                                    <>
                                      {selectItems?.ad_file_size ? (
                                        <p>
                                          Size:{" "}
                                          {(
                                            selectItems?.ad_file_size /
                                            (1024 * 1024)
                                          ).toFixed(2)}{" "}
                                          MB
                                        </p>
                                      ) : selectItems?.mobad_file_size ? (
                                        <p>
                                          Size:{" "}
                                          {(
                                            selectItems?.mobad_file_size /
                                            (1024 * 1024)
                                          ).toFixed(2)}{" "}
                                          MB
                                        </p>
                                      ) : selectItems?.image_size ? (
                                        <p>
                                          Size:{" "}
                                          {(
                                            selectItems?.image_size / 1024
                                          ).toFixed(2)}{" "}
                                          KB
                                        </p>
                                      ) : selectItems?.promo_img_details
                                          ?.promo_image?.size ? (
                                        <p>
                                          Size:{" "}
                                          {(
                                            selectItems?.promo_img_details
                                              ?.promo_image?.size / 1024
                                          ).toFixed(2)}{" "}
                                          KB
                                        </p>
                                      ) : selectItems?.offer_img ? (
                                        <p>
                                          Size:{" "}
                                          {(
                                            selectItems?.offer_img?.size / 1024
                                          ).toFixed(2)}{" "}
                                          KB
                                        </p>
                                      ) : null}
                                    </>
                                  ) : (
                                    <p>Size: </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          )
                          //  : ''
                        }
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </>
          )}
        </div>
        {/* ------------------------------------------RecentDocuments--------------------------------- */}
      </div>
    </>
  );
};

export default Documents;
