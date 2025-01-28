import { ConfigProvider, DatePicker, Upload, Select } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { LiaSave } from "react-icons/lia";
import * as Yup from "yup";
import { InboxOutlined } from "@ant-design/icons";
import { message } from "antd";
import { PiUpload } from "react-icons/pi";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { OFFERS_LIST, PROMOTION_DATA } from "../../Store/Type";
import axios from "axios";
import { toast } from "react-toastify";
import {
  GetOffersById,
  GetOffersData,
  SubmitOffersData,
} from "../../Api/Offers/Offers";
import { submitUserData } from "../../Api/UserManagement/UserManagement";
import dayjs from "dayjs";
import { FaUpload } from "react-icons/fa";
import ModalPopup from "../Common/Modal/Modal";
import BackgroundView from "./BackgroundImage";
import { IoMdArrowDropdown } from "react-icons/io";
import {
  GetRedeemOffersById,
  GetRedeemOffersData,
  SubmitRedeemOffersData,
} from "../../Api/Offers/RedeemOffers";
import AddOffer from "./AddOffers";
import { Spin } from "antd";

export default function IndexAddOffer({
  setModalIsOpen,
  updatedata,
  SetUpdateData,
  setOfferData,
  offerdata,
  offerType,
  setOfferType,
  setValueSymbol,
  valueSymbol,
  offerFilter,
}) {
  const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;

  const validationSchema = Yup.object()
    .shape({
      offer_name: Yup.string()
        .required("Offer Name is required")
        .min(5, "Min 5 characters required")
        .max(17, "Max 17 characters only"),
      offer_desc: Yup.string()
        .required("Offer Description is required")
        .min(20, "Min 20 characters needed")
        .max(53, "Max 53 characters only"),
      status: Yup.string().required("Status field is required"),
      occupation: Yup.string().required("Category field is required"),
      code: Yup.string()
        .required("Offer Code is required")
        .min(5, "Min 5 characters required")
        .max(15, "Max 15 characters only"),
      value: Yup.number()
        .typeError("Must be a number")
        .required("Offer Value is required"),
      start_date: Yup.string(),
      expiry_date: Yup.string(),
      file: Yup.mixed()
        .required("File is empty")
        .test("required", "A file is required", function (value) {
          const { isEdit } = this.options.context;
          if (!isEdit && !value) {
            return false;
          }
          return true;
        })
        .test("file_size", "File size be below 5 MB", function (value) {
          if (value && value.size > 5000000) {
            // 2MB
            return false;
          }
          return true;
        })
        .test("file_type", "Unsupported File Format", function (value) {
          if (typeof value === "string") {
            // If value is a string (file path), skip file type validation
            return true;
          }
          if (
            value &&
            ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
          ) {
            return true;
          }
          return false;
        }),
    })
    .test(
      "both-required",
      "Start Date and End Date are required",
      function (value) {
        const { start_date, expiry_date } = value || {};
        if (!start_date && !expiry_date) {
          return this.createError({
            path: "start_date",
            message: "Start Date and End Date are required",
          });
        }
        return true;
      }
    );

  const [fileName, setFileName] = useState("");
  const dispatch = useDispatch();

  const [offerBackGround, setOfferBackground] = useState("");
  const [isImageConverted, setIsImageConverted] = useState(false);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState();
  const [noValToStatus, setNoValToStatus] = useState(true)

  console.log(value, "value_value");
  console.log(offerBackGround, "view_offer_type");

  const [offerlist, setOfferlist] = useState({
    occupation: "",
    offer_bgImgae: "",
    occupation_name: "",
    usage: "",
  });
  console.log(offerlist.usage, "many_usage");
  console.log(offerlist, "offers_list");

  const [error, setError] = useState("");

  const handleSubmit = async (values) => {
    console.log(values, "values_134");

    if (offerType === "discount" && !values.value) {
      setError("Offer value is required for discount.");
      return;
    }

    if (offerType === "discount") {
      if (values.value_symbol === "₹") {
        if (values.value < 1 || values.value > 2000) {
          setError("Value should be between ₹ 1 and ₹ 2000.");
          return;
        }
      } else if (values.value_symbol === "%") {
        if (values.value < 1 || values.value > 99) {
          setError("Value should be between 1 % and 99 %.");
          return;
        }
      }
    }

    if (CurrentPage === 2) {
      if (!offerlist.usage) {
        setError("Usage is required.");
        return;
      }

      if (offerlist.usage < 1 || offerlist.usage > 100) {
        setError("Usage must be between 1 and 100.");
        return;
      }
    }

    if (CurrentPage === 1) {
      setCurrentOfferdata(values);
      setCurrentPage(2);
    } else {
      setLoading(true);

      if (!isImageConverted) {
        toast.warning("Please wait, image is still processing.");
        setLoading(false);
        return;
      }

      if (!offerlist.offer_bgImgae) {
        toast.error("Please upload Offer Image");
        setLoading(false);
        return;
      }

      try {
        const data =
          offerType === "discount"
            ? await SubmitOffersData(
                dispatch,
                values,
                updatedata,
                offerlist,
                offerBackGround,
                offerFilter,
                noValToStatus
              )
            : await SubmitRedeemOffersData(
                dispatch,
                values,
                updatedata,
                offerlist,
                offerBackGround,
                offerFilter,
                noValToStatus
              );

        if (data?.message) {
          toast.success(data?.message);
          offerType === "discount"
            ? GetOffersData(dispatch, offerFilter)
            : GetRedeemOffersData(dispatch, offerFilter);
          setModalIsOpen(false);
          console.log(offerFilter, "offer_filter_add");
        }
      } catch (error) {
        console.error("Error uploading data", error);
      }
    }

    setLoading(false);
  };
  const fetchGetOffers = async () => {
    if (offerType === "discount") {
      setLoading(true);
      try {
        const data = await GetOffersById(
          updatedata,
          SetUpdateData,
          setOfferData,
          setLoading
        );
        console.log(data, "datadata");
        setOfferData(data);
        setOfferlist((prevState) => ({
          ...prevState,
          occupation: data.occupation_id,
          offer_bgImgae: data.offer_img,
          occupation_name: "",
          usage: data.usage,
        }));
      } catch (error) {
        console.error("Error fetching additional user data", error);
      }
    } else {
      setLoading(true);
      try {
        const data = await GetRedeemOffersById(
          updatedata,
          SetUpdateData,
          setOfferData,
          setLoading
        );
        console.log(data, "datadata");
        setOfferData(data);
        setOfferlist((prevState) => ({
          ...prevState,
          occupation: data.occupation_id,
          offer_bgImgae: data.offer_img,
          occupation_name: "",
          usage: data.usage,
        }));
      } catch (error) {
        console.error("Error fetching additional user data", error);
      }
    }
  };

  useEffect(() => {
    if (updatedata != null) {
      fetchGetOffers();
    }
  }, [updatedata, SetUpdateData, setOfferData]);

  console.log(fileName, "offerdataofferdata");
  // const [fileData, setFileData] = useState(null);

  // const handleFileChange = (event) => {
  //   const file = offerdata.image_file;
  //   const reader = new FileReader();

  //   reader.onload = (e) => {
  //     const binaryData = e.target.result;
  //     setFileData(binaryData);
  //   };

  //   // reader.readAsBinaryString(file);
  // };
  // useEffect(()=>{
  //   handleFileChange()
  // },[offerdata])
  // console.log(fileData,"fileDatafileData");
  const [binaryData, setBinaryData] = useState(null);

  useEffect(() => {
    const fileData = {
      uid: "rc-upload-1719855563269-9",
      lastModified: 1719824063011,
      lastModifiedDate:
        "Mon Jul 01 2024 14:24:23 GMT+0530 (India Standard Time)",
      name: "Full.png",
      size: 578980,
      type: "image/png",
      webkitRelativePath: "",
    };

    const blob = new Blob([fileData], { type: fileData.type });
    convertToBinary(blob);
  }, []);

  const convertToBinary = (file) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      const arrayBuffer = reader.result;
      const binaryString = new Uint8Array(arrayBuffer).reduce((data, byte) => {
        return data + String.fromCharCode(byte);
      }, "");
      setBinaryData(binaryString);
    };
  };
  const [bgimage, setBgImage] = useState(false);

  const [currentoffers, setCurrentOffer] = useState([]);

  console.log(currentoffers, "current_offer_data");

  const closemodal = () => {
    setBgImage(false);
    setCurrentOffer("");
  };
  const [draggerImage, setDraggerImage] = useState(false);
  const [occupationvalue, setOccupationValue] = useState("");
  const [currentofferdata, setCurrentOfferdata] = useState({
    offer_name: "",
    offer_code: "",
    start_date: "",
    expiry_date: "",
    offer_desc: "",
    offer_image: [],
  });

  // const [fileName, setFileName] = useState('');
  const [previewUrl, setPreviewUrl] = useState("");

  console.log(previewUrl, "preview_url_binarydata");

  const [allvalues, setAllValues] = useState("");
  // const typeid = sessionStorage.getItem("type_id");
  const typeid = sessionStorage.getItem("type_id");

  const [minExpiryDate, setMinExpiryDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  return (
    <>
      <Formik
        initialValues={{
          offer_name: offerdata ? offerdata.offer_name : "",
          code: offerdata ? offerdata.code : "",
          start_date: offerdata
            ? dayjs(offerdata.start_date).format("YYYY-MM-DD")
            : "",
          expiry_date: offerdata
            ? dayjs(offerdata.expiry_date).format("YYYY-MM-DD")
            : "",
          usage: offerdata ? offerdata.usage : "",
          // status: offerdata ? offerdata.status_id === 3 || 4 || 1 ? "Draft": "",

          status:
            // typeid === "PRO101"
            //   ? offerdata.status_id === 4 ||
            //     offerdata.status_id === 3 ||
            //     offerdata.status_id === 1 ||
            //     offerdata.status_id === 0
            //     ? "Draft"
            //     : offerdata.status_id === 2
            //     ? "Active"
            //     : ""
            //   : offerdata.status_id === 3 || offerdata.status_id === 4
            //   ? "Draft"
            //   : offerdata
            //   ? offerdata.status
            //   : "",
            typeid === "PRO101" ? offerdata.req_status : typeid === "PROEMP101" ? offerdata.status : offerdata.status
            ,
          value:
            offerType === "discount"
              ? offerdata
                ? offerdata.offer_value
                : ""
              : "0",
          offer_desc: offerdata ? offerdata.offer_desc : "",
          file: offerdata ? offerdata.offer_img : "",
          file_type: offerdata?.image_size || "",
          file_size: offerdata?.image_type || "",
          value_symbol: offerdata?.value_symbol || "₹",
          occupation: offerdata?.occupation_id || "",
        }}
        validationSchema={validationSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={(values) => {
          handleSubmit(values);
          console.log(values, "offers_symbols");
        }}
        enableReinitialize
      >
        {({
          isSubmitting,
          isValid,
          handleSubmit,
          values,
          handleChange,
          handleBlur,
          setFieldValue,
          errors,
          touched,
        }) => (
          <>
            <Form onSubmit={handleSubmit}>
              <div className="flex justify-between mr-[3vw]">
                <div className="text-[1.4vw] text-[#1F4B7F] font-semibold">
                  {offerType === "discount"
                    ? updatedata
                      ? "UPDATE DISCOUNT OFFERS"
                      : "CREATE NEW DISCOUNT OFFERS"
                    : updatedata
                    ? "UPDATE REDEEM OFFERS"
                    : "CREATE NEW REDEEM OFFERS"}
                </div>
                <div className="flex gap-x-[1vw]">
                  {CurrentPage === 2 && (
                    <button
                      type="submit"
                      className="flex text-[#1F4B7F] text-[1vw] border-[0.1vw] border-[#1F4B7F] bg-white px-[1vw] gap-[0.5vw] py-[0.5vw] rounded-[0.7vw] items-center justify-center"
                      //   onClick={() => setBgImage(true)}
                      onClick={() => setCurrentPage(1)}
                    >
                      Previous
                    </button>
                  )}
                  <button
                    type="submit"
                    className="flex text-white text-[1vw] bg-[#1F4B7F] px-[1vw] gap-[0.5vw] py-[0.5vw] rounded-[0.7vw] items-center justify-center"
                    //   onClick={() => setBgImage(true)}
                    //   onClick={() => setCurrentPage(2)}
                    // onClick={handleSubmit}
                  >
                    {CurrentPage === 1 ? "Next" : "Save"}
                  </button>
                </div>
              </div>
              {loading ? (
                <div className="absolute inset-0 flex justify-center items-center  z-10">
                  <Spin size="large" />
                </div>
              ) : CurrentPage === 1 ? (
                <AddOffer
                  values={values}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                  handleBlur={handleBlur}
                  offerType={offerType}
                  valueSymbol={valueSymbol}
                  setValueSymbol={setValueSymbol}
                  offerlist={offerlist}
                  setOfferlist={setOfferlist}
                  setValue={setValue}
                  error={error}
                  setError={setError}
                  offerdata={offerdata}
                  setPreviewUrl={setPreviewUrl}
                  setDraggerImage={setDraggerImage}
                  draggerImage={draggerImage}
                  fileName={fileName}
                  setFileName={setFileName}
                  errors={errors}
                  offerFilter={offerFilter}
                  setNoValToStatus={setNoValToStatus}
                />
              ) : (
                <BackgroundView
                  setOccupationValue={setOccupationValue}
                  occupationvalue={occupationvalue}
                  setCurrentOffer={setCurrentOffer}
                  currentoffers={currentoffers}
                  currentofferdata={currentofferdata}
                  previewUrl={previewUrl}
                  setOfferlist={setOfferlist}
                  offerlist={offerlist}
                  setModalIsOpen={setModalIsOpen}
                  allvalues={allvalues}
                  setBgImage={setBgImage}
                  updatedata={updatedata}
                  offerdata={offerdata}
                  draggerImage={draggerImage}
                  offerType={offerType}
                  onImageConversionComplete={() => setIsImageConverted(true)}
                  setOfferBackground={setOfferBackground}
                  setCurrentOfferdata={setCurrentOfferdata}
                  error={error}
                  setError={setError}
                />
              )}
            </Form>
          </>
        )}
      </Formik>
      {/* <ModalPopup
        show={bgimage}
        onClose={closemodal}
        height="30vw"
        width="50vw"
        closeicon={false}
      >
        <BackgroundView
          setOccupationValue={setOccupationValue}
          occupationvalue={occupationvalue}
          setCurrentOffer={setCurrentOffer}
          currentoffers={currentoffers}
          currentofferdata={currentofferdata}
          previewUrl={previewUrl}
          setOfferlist={setOfferlist}
          offerlist={offerlist}
          setModalIsOpen={setModalIsOpen}
          allvalues={allvalues}
          setBgImage={setBgImage}
          updatedata={updatedata}
          offerdata={offerdata}
          draggerImage={draggerImage}
          offerType={offerType}
        />
      </ModalPopup> */}
    </>
  );
}
