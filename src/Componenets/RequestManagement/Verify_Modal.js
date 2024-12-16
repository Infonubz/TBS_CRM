import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
// import image1 from "../../asserts/aadhar.jpg";
//import { Radio, Spin } from "antd";
import { IoMdDownload } from "react-icons/io";
//import { TfiSave } from "react-icons/tfi";
import "../../App.css";
import ModalPopup from "../Common/Modal/Modal";
//import Success_Modal from "./Success_Modal";
//import axios from "axios";
import Status_Update_Modal from "./Status_Update_Modal";
import { capitalizeFirstLetter } from "../Common/Captilization";
//import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import no_image_available from "../../asserts/No_image_available.jpg";
//import { REQUEST_MANAGEMENT_DATA } from "../../Store/Type";
import {
  GetPartnerDataById,
  GetRequestDataById,
} from "../../Api/RequestManagement/RequestManagement";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function Verify_Modal({
  verifyData,
  setIsVerifyModal,
  setVerifyData,
  setRequestData,
  requestData,
  statusFromEdit,
  comments,
  tabfilter,
}) {
  const [value, setValue] = useState(1);
  const [isUpdateStatus, setIsUpdateStatus] = useState(false);
  const [isDwldModal, setIsDwldModal] = useState(false);
  const [modalContent, setModalContent] = useState("download");
  //const [dataValue, setDataValue] = useState();
  const [isOperator, setIsOperator] = useState(false);
  const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;

  console.log(requestData, "Modal active");
  console.log(isUpdateStatus, "is_update_status");
  // const onChange = (e) => {
  //   console.log("radio checked", e.target.value);
  //   setValue(e.target.value);
  // };

  const closeModal = () => {
    setIsUpdateStatus(false);
    setIsDwldModal(false);
  };

  useEffect(() => {
    if (isDwldModal) {
      const timer = setTimeout(() => {
        closeModal();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isDwldModal]);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchGetRequest = async () => {
    try {
      const data = await GetRequestDataById(
        verifyData,
        setVerifyData,
        setRequestData
      );
      //console.log(verifyData,"data data data");
      // console.log(data,"----- data ---");
      setRequestData(data);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  const fetchPartnerData = async () => {
    console.log("i am printindhfdhfdhfhf");

    try {
      const data = await GetPartnerDataById(verifyData);
      console.log(data, "partnerdatatatatatatdifhdfkhfs");
      setRequestData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (verifyData != null && verifyData.startsWith("tbs-op")) {
      fetchGetRequest();
      setIsOperator(true);
    } else if (verifyData != null && verifyData.startsWith("tbs-pat")) {
      fetchPartnerData();
    }
  }, [verifyData, setVerifyData, setRequestData]);

  // const GetData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://192.168.90.47:4000/request-management-id/${verifyData}`
  //     );
  //     setDataValue(response.data[0]);
  //     console.log("data data", response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const delayGetData = () => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     GetData();
  //   }, 5000); // 5000 milliseconds = 5 seconds
  // };

  // console.log(dataValue, "updatedata");
  // const { getCode, getName } = require("country-list");
  // const countryList = require("country-list");

  useEffect(() => {
    var headers = new Headers();
    headers.append("X-CSCAPI-KEY", "API_KEY");

    var requestOptions = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };
    fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result, "resultresult"))
      .catch((error) => console.log("error", error));
  }, []);

  // console.log(dataValue, "dataValuedataValue");
  const [currentfile, setCurrentFile] = useState(null);
  console.log(verifyData, "verifyDataverifyData");

  const downloadImages = async () => {
    const imageUrls = await fetchImages(); // Fetch your dynamic images

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
          isOperator ? requestData?.tbs_operator_id : requestData.tbs_partner_id
        }.zip`
      );
    });
  };

  const fetchImages = async () => {
    return verifyData.startsWith("tbs-op")
      ? [
          `${apiImgUrl}${requestData?.aadar_front_doc}`,
          `${apiImgUrl}${requestData?.aadar_back_doc}`,
          `${apiImgUrl}${requestData?.pancard_front_doc}`,
          `${apiImgUrl}${requestData?.pancard_back_doc}`,
          `${apiImgUrl}${requestData?.msme_docs}`,
        ]
      : [
          `${apiImgUrl}${requestData?.aadhar_card_front}`,
          `${apiImgUrl}${requestData?.aadhar_card_back}`,
          `${apiImgUrl}${requestData?.pan_card_front}`,
          `${apiImgUrl}${requestData?.pan_card_back}`,
        ];
  };

  return (
    <>
      {/* <Spin spinning={loading}> */}
      <div className=" ">
        <Formik
          initialValues={{
            owner_name: isOperator
              ? requestData?.owner_name
              : requestData?.partner_first_name || "",
            aadharcard_number: isOperator
              ? requestData?.aadharcard_number
              : requestData?.aadhar_card_number || "",
            pancard_number: isOperator
              ? requestData?.pancard_number
              : requestData?.pan_card_number || "",
            msme_number: requestData?.msme_number || "",
            aadar_front_doc: isOperator
              ? requestData?.aadar_front_doc
              : requestData?.aadhar_card_front || null,
            aadar_back_doc: isOperator
              ? requestData?.aadar_back_doc
              : requestData?.aadhar_card_back || null,
            pancard_front_doc: isOperator
              ? requestData?.pancard_front_doc
              : requestData?.pan_card_front || null,
            pancard_back_doc: isOperator
              ? requestData?.pancard_back_doc
              : requestData?.pan_card_back || null,
            msme_docs: requestData?.msme_docs || "",
          }}
          enableReinitialize
        >
          {({ values }) => (
            <>
              <Form>
                <div className="">
                  <div className=" grid grid-cols-5 w-full h-[30vw] relative">
                    <div className="col-span-2 w-full pr-[1vw] gapy-y-[1vw]">
                      <div
                        className={`grid ${
                          isOperator ? "grid-rows-3" : "grid-rows-2"
                        }  w-full h-full`}
                      >
                        <div
                          className={`row-span-1 ${
                            isOperator ? "" : "flex  flex-col"
                          }`}
                        >
                          <p className="text-[1.2vw] font-bold text-[#1F487C]">
                            Aadhar Card Details:
                          </p>
                          <Field
                            type="text"
                            name="owner_name"
                            placeholder="Name"
                            value={capitalizeFirstLetter(values?.owner_name)}
                            disabled
                            className={`border-r-[0.3vw] ${
                              isOperator ? "" : "mt-[1.5vw]"
                            } cursor-not-allowed mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                          />
                          <Field
                            type="text"
                            name="aadharcard_number"
                            placeholder="Aadhar card Number"
                            value={values?.aadharcard_number}
                            disabled
                            className={`border-r-[0.3vw] cursor-not-allowed ${
                              isOperator ? "mt-[.5vw]" : "mt-[1.5vw]"
                            } border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                          />
                        </div>
                        <div
                          className={`row-span-1 ${
                            isOperator ? "" : "flex flex-col"
                          }`}
                        >
                          <p className="text-[1.2vw] font-bold text-[#1F487C]">
                            Pan Card Details:
                          </p>
                          <Field
                            type="text"
                            name="owner_name"
                            placeholder="Name"
                            value={capitalizeFirstLetter(values?.owner_name)}
                            disabled
                            className={`border-r-[0.3vw] mt-[0.5vw] ${
                              isOperator ? "" : "mt-[1.5vw]"
                            } cursor-not-allowed border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                          />
                          <Field
                            type="text"
                            name="pancard_number"
                            placeholder="Pan Card Number"
                            value={values?.pancard_number}
                            disabled
                            className={`border-r-[0.3vw] cursor-not-allowed ${
                              isOperator ? "mt-[.5vw]" : "mt-[1.5vw]"
                            } border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                          />
                        </div>
                        {isOperator ? (
                          <div className="row-span-1">
                            <p className="text-[1.2vw] font-bold text-[#1F487C]">
                              MSME Details:
                            </p>
                            <Field
                              type="text"
                              name="owner_name"
                              placeholder="Name"
                              value={capitalizeFirstLetter(values?.owner_name)}
                              disabled
                              className="border-r-[0.3vw] cursor-not-allowed mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                            />
                            <Field
                              type="text"
                              name="msme_number"
                              placeholder="MSME Number"
                              value={values?.msme_number}
                              disabled
                              className="border-r-[0.3vw] cursor-not-allowed mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                            />
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="col-span-3 w-full flex-col flex gap-y-[1vw] h-full overflow-y-scroll px-[0.5vw] pb-[1vw]">
                      <img
                        src={
                          values?.aadar_front_doc
                            ? `${apiImgUrl}${values?.aadar_front_doc}`
                            : no_image_available
                        }
                        alt="Aadhar Front Img"
                        className={`w-full ${
                          currentfile == 1
                            ? "h-[20vw] object-fill"
                            : "h-[10vw] object-cover"
                        } object-cover cursor-zoom-in border-[#1F487C] border-[0.2vw] border-dashed rounded-[1vw]`}
                        style={{
                          transition: "ease-in 0.5s",
                        }}
                        onMouseEnter={() => setCurrentFile(1)}
                        onMouseLeave={() => setCurrentFile(null)}
                      />

                      <img
                        src={
                          values?.aadar_back_doc
                            ? `${apiImgUrl}${values?.aadar_back_doc}`
                            : no_image_available
                        }
                        alt="Aadhar Back Img"
                        className={`w-full ${
                          currentfile == 2
                            ? "h-[20vw] object-fill"
                            : "h-[10vw] object-cover"
                        } object-cover cursor-zoom-in border-[#1F487C] border-[0.2vw] border-dashed rounded-[1vw]`}
                        style={{
                          transition: "ease-in 0.5s",
                        }}
                        onMouseEnter={() => setCurrentFile(2)}
                        onMouseLeave={() => setCurrentFile(null)}
                        // onClick={() => setCurrentFile(2)}
                      />
                      <img
                        src={
                          values.pancard_front_doc
                            ? `${apiImgUrl}${values?.pancard_front_doc}`
                            : no_image_available
                        }
                        alt="PAN Front Img"
                        className={`w-full ${
                          currentfile == 3
                            ? "h-[20vw] object-fill"
                            : "h-[10vw] object-cover"
                        } object-cover cursor-zoom-in border-[#1F487C] border-[0.2vw] border-dashed rounded-[1vw]`}
                        style={{
                          transition: "ease-in 0.5s",
                        }}
                        onMouseEnter={() => setCurrentFile(3)}
                        onMouseLeave={() => setCurrentFile(null)}
                      />
                      <img
                        src={
                          values?.pancard_back_doc
                            ? `${apiImgUrl}${values?.pancard_back_doc}`
                            : no_image_available
                        }
                        alt="PAN Back Img"
                        className={`w-full ${
                          currentfile == 4
                            ? "h-[20vw] object-fill"
                            : "h-[10vw] object-cover"
                        } object-cover cursor-zoom-in border-[#1F487C] border-[0.2vw] border-dashed rounded-[1vw]`}
                        style={{
                          transition: "ease-in 0.5s",
                        }}
                        onMouseEnter={() => setCurrentFile(4)}
                        onMouseLeave={() => setCurrentFile(null)}
                      />
                      {isOperator ? (
                        <img
                          src={
                            values?.msme_docs
                              ? `${apiImgUrl}${values?.msme_docs}`
                              : no_image_available
                          }
                          alt="MSME"
                          className={`w-full ${
                            currentfile == 5
                              ? "h-[30vw] object-fill"
                              : "h-[10vw] object-cover"
                          }  cursor-zoom-in border-[#1F487C] border-[0.2vw] border-dashed rounded-[1vw]`}
                          style={{
                            transition: "ease-in 0.5s",
                          }}
                          onMouseEnter={() => setCurrentFile(5)}
                          onMouseLeave={() => setCurrentFile(null)}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  {/* <div className=" overflow-y-scroll h-[30vw] relative">
                    <div className="grid grid-cols-12">
                      <div className="col-span-4">
                        <p className="text-[1.2vw] font-bold text-[#1F487C]">
                          Aadhar Card Details:
                        </p>
                        <Field
                          type="text"
                          name="owner_name"
                          placeholder="Name"
                          value={capitalizeFirstLetter(values?.owner_name)}
                          disabled
                          className="border-r-[0.3vw] cursor-not-allowed mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                        />
                        <ErrorMessage
                          name="owner_name"
                          component="div"
                          className="text-red-500 text-[0.8vw]"
                        />
                        <Field
                          type="text"
                          name="aadharcard_number"
                          placeholder="Aadhar card Number"
                          value={values?.aadharcard_number}
                          disabled
                          className="border-r-[0.3vw] cursor-not-allowed mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                        />
                        <ErrorMessage
                          name="aadharcard_number"
                          component="div"
                          className="text-red-500 text-[0.8vw]"
                        />
                      </div>
                      <div className="h-[7vw] w-[15vw] ml-[1vw] mt-[0.4vw]">
                        <img
                          src={
                            values?.aadar_front_doc
                              ? `http://192.168.90.47:4000${values?.aadar_front_doc}`
                              : no_image_available
                          }
                          alt="Aadhar Front Img"
                          className="col-span-4 hover-img hover:mt-[1vw] hover:ml-[4.5vw] hover:h-[11.5vw] hover:w-[30.5vw] h-[10vw] w-[13vw] 
                              hover:-translate-x-37 hover:translate-y-10 hover:scale-150 duration-500 hover:shadow-lg hover:shadow-black/30"
                        />
                      </div>
                      <div className="h-[7vw] w-[15vw] mt-[0.4vw]">
                        <img
                          src={
                            values?.aadar_back_doc
                              ? `http://192.168.90.47:4000${values?.aadar_back_doc}`
                              : no_image_available
                          }
                          alt="Aadhar Back Img"
                          className="col-span-4 hover-img ml-[11vw] hover:mt-[1vw]  hover:ml-[6.5vw] hover:h-[11vw] hover:w-[30.5vw] h-[10vw] w-[13vw] 
                              hover:-translate-x-20 hover:translate-y-10 hover:scale-150 duration-500 hover:shadow-lg hover:shadow-black/30"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-12 pt-[1vw]">
                      <div className="col-span-4">
                        <p className="text-[1.2vw] font-bold text-[#1F487C]">
                          Pan Card Details:
                        </p>
                        <Field
                          type="text"
                          name="owner_name"
                          placeholder="Name"
                          value={capitalizeFirstLetter(values?.owner_name)}
                          disabled
                          className="border-r-[0.3vw] mt-[0.5vw] cursor-not-allowed border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                        />
                        <ErrorMessage
                          name="owner_name"
                          component="div"
                          className="text-red-500 text-[0.8vw]"
                        />
                        <Field
                          type="text"
                          name="pancard_number"
                          placeholder="Pan Card Number"
                          value={values?.pancard_number}
                          disabled
                          className="border-r-[0.3vw] cursor-not-allowed mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                        />
                        <ErrorMessage
                          name="pancard_number"
                          component="div"
                          className="text-red-500 text-[0.8vw]"
                        />
                      </div>
                      <div className="mt-[0.5vw] h-[7vw] w-[15vw]">
                        <img
                          src={
                            values.pancard_front_doc
                              ? `http://192.168.90.47:4000${values?.pancard_front_doc}`
                              : no_image_available
                          }
                          alt="PAN Front Img"
                          className="col-span-4 hover-img ml-[1vw] hover:ml-[4.5vw] hover:h-[11.5vw] hover:w-[30.5vw] h-[10vw] w-[15vw] 
                                                    hover:-translate-x-37 hover:translate-y-10 hover:scale-150 duration-500 hover:shadow-lg hover:shadow-black/30"
                        />
                      </div>
                      <div className="h-[7vw] w-[15vw] mt-[0.6vw]">
                        <img
                          src={
                            values?.pancard_back_doc
                              ? `http://192.168.90.47:4000${values?.pancard_back_doc}`
                              : no_image_available
                          }
                          alt="PAN Back Img"
                          className="col-span-4 hover-img ml-[11vw] hover:mt-[1vw]  hover:ml-[6.5vw]  hover:mr-[4vw] hover:h-[11.5vw] hover:w-[40.5vw] h-[10vw] w-[15vw] 
                                                    hover:-translate-x-20 hover:translate-y-10 hover:scale-150 duration-500 hover:shadow-lg hover:shadow-black/30"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-12 pt-[1vw]">
                      <div className="col-span-4">
                        <p className="text-[1.2vw] font-bold text-[#1F487C]">
                          MSME Details:
                        </p>
                        <Field
                          type="text"
                          name="owner_name"
                          placeholder="Name"
                          value={capitalizeFirstLetter(values?.owner_name)}
                          disabled
                          className="border-r-[0.3vw] cursor-not-allowed mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                        />
                        <ErrorMessage
                          name="owner_name"
                          component="div"
                          className="text-red-500 text-[0.8vw]"
                        />
                        <Field
                          type="text"
                          name="msme_number"
                          placeholder="MSME Number"
                          value={values?.msme_number}
                          disabled
                          className="border-r-[0.3vw] cursor-not-allowed mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                        />
                        <ErrorMessage
                          name="msme_number"
                          component="div"
                          className="text-red-500 text-[0.8vw]"
                        />
                      </div>
                      <div className="mt-[2vw] pb-[1vw] h-[7vw] w-[15vw]">
                        <img
                          src={
                            values?.msme_docs
                              ? `http://192.168.90.47:4000${values?.msme_docs}`
                              : no_image_available
                          }
                          alt="MSME"
                          className="col-span-4 hover-img ml-[1vw] hover:mb-[10vw] hover:ml-[4.5vw] hover:h-[11.5vw] hover:w-[30.5vw] h-[10vw] w-[15vw] 
                                                    hover:-translate-x-37 hover:translate-y-10 hover:scale-150 duration-500 hover:shadow-lg hover:shadow-black/30"
                        />
                      </div>
                    </div>
                  </div> */}
                  <div className="flex absolute pl-[1vw] pr-[0.5vw] left-0 bottom-0 justify-between items-center h-[3.5vw] bg-[#1F487C] w-full ">
                    <div className="flex items-center gap-x-[2vw]">
                      {/* <Radio.Group onChange={onChange} value={value}>
                        <Radio value={1} className="text-white text-[1.2vw]">
                          Matched
                        </Radio>
                        <Radio
                          value={2}
                          className="text-white pl-[1vw] text-[1.2vw]"
                        >
                          Not Matched
                        </Radio>
                      </Radio.Group> */}
                    </div>
                    {/* {value == 2 ? (
                      <div className="">
                        <Field
                          // as="textarea"
                          type="text"
                          name="description"
                          placeholder="If Not Matched, Write a reason.."
                          rows="1"
                          cols="25"
                          className="placeholder-blue pl-[1vw]  text-[#1F487C] text-[1vw] h-[2.5vw] w-[18vw] rounded-[0.5vw] outline-none "
                        />
                        <ErrorMessage
                          name="description"
                          component="div"
                          className="text-red-500 text-[0.8vw]"
                        />
                      </div>
                    ) : (
                      ""
                    )} */}
                    {/* <div className="col-span-2 pl-[2vw] pt-[0.5vw]">
                      <IoMdDownload
                        color="white"
                        className="h-[1.8vw] w-[1.8vw]"
                        onClick={() => {
                          setModalContent("download");
                          setIsDwldModal(true);
                        }}
                      />
                    </div> */}
                    <div className="flex gap-[1vw]">
                      {/* <TfiSave
                        color="white"
                        className="h-[1.5vw] w-[1.5vw]"
                        onClick={() => setIsUpdateStatus(true)}
                      /> */}
                      <button
                        className="bg-[#34AE2A] flex items-center text-[1vw] justify-center gap-x-[0.5vw] rounded-[0.5vw] text-white w-[8vw] h-[2.5vw]"
                        onClick={() => {
                          setModalContent("download");
                          setIsDwldModal(true);
                          downloadImages();
                        }}
                      >
                        <span>
                          <IoMdDownload color="white" size={"1.2vw"} />
                        </span>
                        <span>Download</span>
                      </button>
                      {/* {requestData.req_status_id==2?<span>hell</span>:<span> NO hell</span>} */}
                      <button
                        className={`bg-[#34AE2A] 
                         rounded-[0.5vw] text-[1vw] text-white w-[8vw] h-[2.5vw]`}
                        onClick={() => {
                          setIsUpdateStatus(true);
                        }}
                        // disabled={requestData.req_status_id == 2}
                      >
                        {requestData?.req_status_id == 2 ? (
                          <span>Update Status</span>
                        ) : (
                          <span> Verify Status</span>
                        )}
                        {/* Verify Status */}
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            </>
          )}
        </Formik>
      </div>
      <ModalPopup
        className="border border-[#1f487c] border-b-8 border-r-8 border-b-[#1f487c] border-r-[#1f487c] rounded-md"
        show={isUpdateStatus}
        closeicon={false}
        onClose={closeModal}
        height="auto"
        width="auto"
      >
        <Status_Update_Modal
          setIsSaveModal={setIsUpdateStatus}
          currentid={verifyData}
          verifyData={verifyData}
          setVerifyData={setVerifyData}
          setRequestData={setRequestData}
          requestData={requestData}
          setIsVerifyModal={setIsVerifyModal}
          comments={comments}
          tabfilter={tabfilter}
        />
      </ModalPopup>

      {/* <ModalPopup
        className="border border-[#1f487c] border-b-8 border-r-8 border-b-[#1f487c] border-r-[#1f487c] rounded-md"
        show={isDwldModal}
        closeicon={false}
        onClose={closeModal}
        width="23vw"
      >
        <Success_Modal
          actionType={modalContent}
          setIsDwldModal={setIsDwldModal}
        />
      </ModalPopup> */}
      {/* </Spin> */}
    </>
  );
}
