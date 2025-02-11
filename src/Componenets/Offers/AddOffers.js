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
import { GetRedeemOffersById } from "../../Api/Offers/RedeemOffers";

export default function AddOffer({
  offerdata,
  offerType,
  setValueSymbol,
  valueSymbol,
  values,
  setFieldValue,
  handleChange,
  handleBlur,
  offerlist,
  setOfferlist,
  setValue,
  error,
  setError,
  setPreviewUrl,
  draggerImage,
  setDraggerImage,
  fileName,
  setFileName,
  errors,
  setNoValToStatus
}) {
  const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;

  const typeid = sessionStorage.getItem("type_id");

  const { RangePicker } = DatePicker;

  const { Dragger } = Upload;

  const getStatusOptions = () => {
    if (typeid == "PRO101") {
      return [
        { label: "Draft", value: "Draft" },
        { label: "Active", value: "Active" },
      ];
    } else if (typeid == "PROEMP101") {
      return [
        { label: "Draft", value: "Draft" },
        { label: "Posted", value: "Posted" },
      ];
    } else {
      return [{ label: "Select Status", value: "" }];
    }
  };

  const options = getStatusOptions();

  return (
    <>
      {/* <Formik
        initialValues={{
          promotion_name: offerdata ? offerdata.offer_name : "",
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
            typeid === "PRO101"
              ? offerdata.status_id === 4 ||
                offerdata.status_id === 3 ||
                offerdata.status_id === 1 ||
                offerdata.status_id === 0
                ? "Draft"
                : offerdata.status_id === 2
                ? "Active"
                : ""
              : offerdata.status_id === 3 || offerdata.status_id === 4
              ? "Draft"
              : offerdata
              ? offerdata.status
              : "",
          value: offerdata ? offerdata.offer_value : "",
          promotion_description: offerdata ? offerdata.offer_desc : "",
          file: offerdata ? offerdata.offer_img : "",
          file_type: offerdata?.image_size || "",
          file_size: offerdata?.image_type || "",
          value_symbol: offerdata?.value_symbol || "₹",
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
        

                  {bgimage === true ? (
                    <div className="flex gap-[0.75vw] text-[1.1vw]">
                      <div
                        className="flex text-[#1F4B7F] bg-white px-[2vw] gap-[0.5vw] py-[0.5vw] rounded-[0.7vw] items-center justify-center border-[#1F4B7F] border-[0.1vw] cursor-pointer"
                        onClick={() => setBgImage(false)}
                      >
                        Previous
                      </div>

                      <button className="flex text-white bg-[#1F4B7F] px-[2vw] gap-[0.5vw] py-[0.5vw] rounded-[0.7vw] items-center justify-center">
                        Save
                      </button>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="flex text-white bg-[#1F4B7F] px-[2vw] gap-[0.5vw] py-[0.5vw] rounded-[0.7vw] items-center justify-center text-[1.1vw]"
                      // onClick={() => setBgImage(true)}
                    >
                      {bgimage === true ? "Save" : "Next"}
                    </button>
                  )}
                </div>
              </div>
              {bgimage === false ? ( */}
      <div className=" umselect">
        <div className="grid grid-cols-2 gap-[1vw] pt-[1vw]">
          <div className=" relative col-span-1 flex-col flex">
            <label className="text-[#1F4B7F] text-[1.1vw] font-semibold">
              Offer Name
              <span className="text-[1vw] text-red-600 pl-[0.2vw]">*</span>
            </label>
            <Field
              type="text"
              name="offer_name"
              id="offer_name"
              placeholder="Enter Offer Name"
              value={values.offer_name}
              autoComplete="off"
              onChange={(e) => {
                handleChange(e);
                sessionStorage.setItem("offer_name", e.target.value);
              }}
              className="border-r-[0.25vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw]  border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-full rounded-[0.5vw] outline-none px-[1vw] placeholder:text-[1vw] "
            />
            <ErrorMessage
              name="offer_name"
              component="div"
              className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
            />
          </div>
          <div className="relative col-span-1 flex-col flex">
            <label className="text-[#1F4B7F] text-[1.1vw] font-semibold">
              Offer Code
              <span className="text-red-500 text-[1vw] pl-[0.2vw]">*</span>
            </label>

            <Field
              type="text"
              name="code"
              placeholder="Enter Offer Code"
              autoComplete="off"
              value={values.code.toUpperCase()}
              onChange={(e) => {
                handleChange(e);
              }}
              className="border-r-[0.25vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw]  border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-full rounded-[0.5vw] outline-none px-[1vw] placeholder:text-[1vw]"
            />
            <ErrorMessage
              name="code"
              component="div"
              className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
            />
          </div>
        </div>
        {/* <div className="grid grid-cols-2 gap-[1vw] pt-[1vw]">
                  <div className="col-span-1 flex-col flex">
                    <label className="text-[#1F4B7F] text-[1.1vw] font-semibold">
                      Start Date
                      <span className="text-red-500 text-[1vw] pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <Field
                      type="date"
                      name="start_date"
                      placeholder="Start Date"
                      value={values.start_date}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => {
                        const selectedStartDate = e.target.value;
                        handleChange(e);
                        setCurrentOfferdata({
                          ...currentofferdata,
                          start_date: selectedStartDate,
                        });

                        // Update the minimum expiry date
                        setMinExpiryDate(selectedStartDate);
                      }}
                      // onChange={(e) => {
                      //   handleChange(e);
                      //   setCurrentOfferdata({
                      //     ...currentofferdata,
                      //     start_date: e.target.value,
                      //   });
                      // }}
                      className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.1vw] h-[3vw] w-full rounded-[0.5vw] outline-none px-[1vw]"
                    />
                    <ErrorMessage
                      name="start_date"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </div>
                  <div className="col-span-1 flex flex-col">
                    <label className="text-[#1F4B7F] text-[1.1vw] font-semibold">
                      Expiry Date
                      <span className="text-red-500 text-[1vw] pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <Field
                      type="date"
                      name="expiry_date"
                      placeholder="Expiry Date"
                      value={values.expiry_date}
                      // min={new Date().toISOString().split("T")[0]}
                      min={minExpiryDate} // Set the minimum date here
                      onChange={(e) => {
                        handleChange(e);
                        setCurrentOfferdata({
                          ...currentofferdata,
                          expiry_date: e.target.value,
                        });
                      }}
                      className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.1vw] h-[3vw] w-full rounded-[0.5vw] outline-none px-[1vw]"
                    />
                    <ErrorMessage
                      name="expiry_date"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </div>
                </div> */}

        <div className="umselect grid grid-cols-2 gap-[1vw] pt-[1vw]">
          <div className="relative col-span-1 flex-col flex">
            <label className="text-[#1F4B7F] text-[1.1vw] font-semibold">
              Category
              <span className="text-red-500 text-[1vw] pl-[0.2vw]">*</span>
            </label>
            <ConfigProvider
              theme={{
                components: {
                  Select: {
                    optionActiveBg: "#aebed1",
                    optionSelectedColor: "#FFF",
                    optionSelectedBg: '#e5e5e5',
                    optionHeight: "2vw",
                  },
                },
              }}
            >
              <Select
                showSearch
                className="umselect custom-select bg-white outline-none w-full mt-[0.5vw] h-[3vw] text-[1.1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-[0.5vw] border-r-[0.25vw] border-b-[0.25vw] placeholder:text-[1vw]"
                placeholder="Select Categories"
                optionFilterProp="label"
                listHeight={190}
                // disabled={true}
                dropdownStyle={{
                  // minHeight: "10vw",
                  overflowY: "auto",
                  scrollbarWidth: "0.1vw",
                }}
                optionRender={(item) => (
                  <div>
                    <p
                      style={{
                        color: "#1F487C",
                        fontWeight: 600,
                        margin: 0,
                        padding: "0 1.2vw",
                        fontSize: "1.1vw",
                      }}
                    >
                      {item.label}
                    </p>
                  </div>
                )}
                value={values.occupation}
                onChange={(value, option) => {
                  setOfferlist({
                    ...offerlist,
                    occupation: value,
                    occupation_name: option.label,
                  });
                  setFieldValue("occupation", value);
                }}
                suffixIcon={
                  <span style={{ fontSize: "1vw", color: "#1f487c" }}>
                    <IoMdArrowDropdown size="2vw" />
                  </span>
                }
                style={{
                  padding: 4,
                }}
                options={[
                  {
                    value: "",
                    label: (
                      <div className="text-[1vw] px-[0.2vw] pb-[0.1vw] text-[#A9A9A9]">
                        Select Category
                      </div>
                    ),
                    disabled: true,
                  },
                  { value: 1, label: "Business" },
                  { value: 2, label: "General Public" },
                  { value: 3, label: "Handicapped" },
                  { value: 4, label: "Pilgrim" },
                  { value: 5, label: "Senior Citizen" },
                  { value: 6, label: "Student" },
                  { value: 7, label: "Tourist" },
                ]}
              />
            </ConfigProvider>
            <ErrorMessage
              name="occupation"
              component="div"
              className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
            />
          </div>

          <div className="relative col-span-1 flex flex-col">
            <label className="text-[#1F4B7F] text-[1.1vw] font-semibold">
              Status
              <span className="text-red-500 text-[1vw] pl-[0.2vw]">*</span>
            </label>
            <ConfigProvider
              theme={{
                components: {
                  Select: {
                    optionActiveBg: "#aebed1",
                    optionSelectedColor: "#FFF",
                    optionSelectedBg: '#e5e5e5',
                    optionHeight: "2",
                  },
                },
              }}
            >
              <Select
                showSearch
                className="custom-select mt-[0.5vw] bg-white outline-none w-full h-[3vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-[0.5vw] border-r-[0.25vw] border-b-[0.25vw] placeholder-[#1F487C]"
                placeholder="Select Status"
                optionFilterProp="value"
                disabled={typeid==="PRO101" && offerdata?.tbs_user_id?.startsWith("tbs-pro_emp") ? true :false}
                value={values.status} // Update this line to reflect the current selection
                onChange={(value, option) => {
                  // const selectedOperator = getOperatorName?.find(
                  //   (operator) => operator.company_name === value
                  // );
                  // // setOfferlist({
                  // //   ...offerlist,
                  // //   occupation: value,
                  // //   occupation_name: option.label,
                  // // });
                  setError("");
                  setFieldValue("status", value);
                  setNoValToStatus(false)
                }}
                suffixIcon={
                  <span style={{ fontSize: "1vw", color: "#1f487c" }}>
                    <IoMdArrowDropdown size="2vw" />
                  </span>
                }
                style={{
                  padding: 4,
                }}
                options={[
                  {
                    value: "",
                    label: (
                      <div className="text-[1vw] px-[0.2vw] pb-[0.1vw] text-[#a9a9a9]">
                        Select Status
                      </div>
                    ),
                    disabled: true,
                  },
                  ...options?.map((item) => ({
                    value: item.value,
                    label: (
                      <div className="flex items-center text-[1vw] gap-x-[0.5vw] px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                        <span className="text-[1vw]">{item.label}</span>
                      </div>
                    ),
                  })),
                ]}
              />
            </ConfigProvider>
            <ErrorMessage
              name="status"
              component="div"
              className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-[1vw] pt-[1vw]">
          <div className="relative reqman col-span-1 flex flex-col">
            <label className="text-[#1F4B7F] text-[1.1vw] font-bold">
              Duration
              <span className="text-[1vw] text-red-600 pl-[0.2vw]">*</span>
            </label>
            <Field name="date_range">
              {({ field }) => (
                <ConfigProvider
                  theme={{
                    token: {
                      fontSize: ".9vw",
                      lineHeight: 0,
                      colorPrimary: "#1F487C",
                    },
                    components: {
                      DatePicker: {
                        activeBorderColor: "#1F487C",
                        hoverBorderColor: "#1F487C",
                        activeShadow: "#1F487C",
                        cellWidth: 21,
                        cellHeight: 20,
                      },
                    },
                  }}
                >
                  <RangePicker
                    allowClear={true}
                    autoFocus={false}
                    onChange={(dates) => {
                      const [startDate, endDate] = dates || [null, null];
                      setFieldValue(
                        "start_date",
                        startDate ? startDate.format("YYYY-MM-DD") : ""
                      );
                      setFieldValue(
                        "expiry_date",
                        endDate ? endDate.format("YYYY-MM-DD") : ""
                      );
                    }}
                    value={[
                      values.start_date ? dayjs(values.start_date) : null,
                      values.expiry_date ? dayjs(values.expiry_date) : null,
                    ]}
                    className="ads-date border-r-[0.25vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-full rounded-[0.5vw] outline-none px-[1vw] placeholder:text-[1vw]"
                    disabledDate={(current) => {
                      // Disable dates before today
                      const maxDate = dayjs().add(3, "months"); // 3 months from today
                      return (
                        current < dayjs().startOf("day") || current > maxDate
                      ); // Disable past dates and dates beyond 3 months
                    }}
                  />
                </ConfigProvider>
              )}
            </Field>
            <ErrorMessage
              name="start_date"
              component="div"
              className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
            />
            <ErrorMessage
              name="expiry_date"
              component="div"
              className="text-red-500 text-[0.8vw] "
            />
          </div>
          {offerType === "discount" ? (
            <div>
              <div className="relative col-span-1 flex flex-col">
                <label className="text-[#1F4B7F] text-[1.1vw] font-semibold">
                  Offer Value
                  <span className="text-[1vw] text-red-600 pl-[0.2vw]">*</span>
                </label>
                <div className="relative flex ">
                  <Field
                    type="text"
                    name="value"
                    id="value"
                    placeholder="Enter Offer Value"
                    value={values.value}
                    autoComplete="off"
                    onChange={(e) => {
                      handleChange(e);
                      console.log(e.target.value, "check_offersValue");
                      setValue(e.target.value);
                      setError("");
                    }}
                    onBlur={handleBlur}
                    className=" border-r-[0.1vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] h-[3vw] w-full   text-[#1F487C] text-[1vw] outline-none px-[1vw] border-b-[0.25vw] border-[#1F487C] rounded-[0.5vw] rounded-r-none placeholder:text-[1vw]"
                  />

                  <div className="flex items-center justify-center border-b-[0.25vw] border-r-[0.25vw] mt-[0.5vw]  border-t-[0.1vw] rounded-l-none rounded-[0.5vw] border-[#1F487C] text-[1.2vw]">
                    <div
                      className={` w-[3vw] h-full flex items-center justify-center cursor-pointer ${
                        valueSymbol === "₹"
                          ? "bg-[#1F487C] text-white font-semibold"
                          : "bg-white text-[#1F487C]"
                      } `}
                      onClick={() => {
                        setValueSymbol("₹");
                        setFieldValue("value_symbol", "₹");
                      }}
                    >
                      ₹
                    </div>
                    <div
                      className={` w-[3vw] h-full flex items-center justify-center cursor-pointer ${
                        valueSymbol === "%"
                          ? "bg-[#1F487C] text-white font-semibold rounded-r-[0.2vw]"
                          : "bg-white text-[#1F487C] rounded-r-[0.5vw]"
                      } `}
                      onClick={() => {
                        setValueSymbol("%");
                        setFieldValue("value_symbol", "%");
                      }}
                    >
                      %
                    </div>
                  </div>
                </div>

                {error ? (
                  <div className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]">
                    {error}
                  </div>
                ) : (
                  <ErrorMessage
                    name="value"
                    component="div"
                    className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                  />
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="grid grid-cols-2 gap-[1vw] pt-[1vw]">
          <div className=" relative col-span-1 flex-col flex">
            <label className="text-[#1F4B7F] text-[1.1vw] font-semibold">
              Offer Description
              <span className="text-red-500 text-[1vw] pl-[0.2vw]">*</span>
            </label>
            <Field
              style={{ resize: "none" }}
              as="textarea"
              name="offer_desc"
              placeholder="Enter Description"
              value={values.offer_desc}
              autoComplete="off"
              onChange={(e) => {
                handleChange(e);
                sessionStorage.setItem("offer_desc", e.target.value);
              }}
              rows="4"
              cols="50"
              className="border-r-[0.25vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw]  border-[#1F487C] text-[#1F487C] text-[1vw] w-full h-[7.5vw] rounded-[0.5vw] outline-none px-[1vw] pt-[0.75vw] placeholder:text-[1vw]"
            />
            <ErrorMessage
              name="offer_desc"
              component="div"
              className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
            />
          </div>
          <div className=" relative col-span-1 flex flex-col">
            <label className="text-[#1F4B7F] text-[1.1vw] font-semibold">
              Image
              <span className="text-red-500 text-[1vw] pl-[0.2vw]">*</span>
            </label>
            <Field name="file">
              {() => (
                <>
                <ConfigProvider
                theme={{
                  token:{
                    colorBorder: "rgba(255, 255, 255, 0)",  // Fully invisible border
                    colorPrimary: "rgba(255, 255, 255, 0)",
                  }
                }}>
                  <Dragger
                    accept=".jpeg, .jpg, .png"
                    onChange={() => setDraggerImage(true)}
                    height={"7.2vw"}
                    beforeUpload={(file) => {
                      console.log(file, "filefilefilefile");
                      setFieldValue("file", file);
                      setFileName(file.name); // Set the file name
                      const imgurl = URL.createObjectURL(file);

                      console.log(imgurl, "img_url_img");
                      setPreviewUrl(imgurl);
                      setOfferlist({
                        ...offerlist,
                        offer_bgImgae: imgurl,
                      });
                      setFieldValue("file_type", file.type);
                      setFieldValue("file_size", file.size);
                      const reader = new FileReader();

                      reader.onloadend = () => {
                        setPreviewUrl(reader.result); // Set the preview URL
                      };

                      reader.readAsDataURL(file);
                      return false; // Prevent automatic upload
                    }}
                    showUploadList={false} // Disable the default upload list
                    className="border-r-[0.25vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.25vw] border-[#1F487C] rounded-[0.5vw]"
                    style={{
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      position: "relative",
                    }}
                  >
                    <label className="flex items-center justify-center relative z-10">
                      <p className="text-[#1F4B7F] font-bold text-[1.1vw] pr-[1vw]">
                        Drag and Drop
                      </p>
                      <FaUpload color="#1F4B7F" size={"1.2vw"} />
                    </label>
                    <div
                      className="absolute top-0 left-0 w-full h-full"
                      style={{
                        backgroundImage: `url(${
                          offerdata?.offer_img && draggerImage === false
                            ? `${apiImgUrl}${offerdata?.offer_img}`
                            : `${offerlist.offer_bgImgae}`
                        })`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        opacity: "30%",
                        zIndex: 0,
                      }}
                    ></div>
                  </Dragger>
                  </ConfigProvider>

                  {/* {fileName && (
                            <p className="text-[#1F4B7F] text-[0.8vw] mt-2 absolute bottom-[0.3vw]">
                              {fileName}
                            </p>
                          )} */}
                </>
              )}
            </Field>
            {/* <Field name="file">
                      {() => (
                        <>
                          <Dragger
                            height={"7.2vw"}
                            beforeUpload={() =>
                              handleBeforeUpload(setFieldValue)
                            }
                            showUploadList={false}
                            className="custom-dragger mt-[0.5vw] relative"
                            style={{
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              position: "relative",
                            }}
                          >
                            <label className="flex items-center justify-center relative z-10">
                              <p className="text-[#1F4B7F] font-bold text-[1.1vw] pr-[1vw]">
                                Drag and Drop
                              </p>
                              <FaUpload color="#1F4B7F" size={"1.2vw"} />
                            </label>
                            <div
                              className="absolute top-0 left-0 w-full h-full"
                              style={{
                                backgroundImage: `url(${
                                  previewUrl || offerdata.offer_img
                                    ? `${apiImgUrl}${offerdata.offer_img}`
                                    : ""
                                })`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                opacity: "30%",
                                zIndex: 0,
                              }}
                            ></div>
                          </Dragger>
                          {fileName && (
                            <p className="text-[#1F4B7F] text-[0.8vw] mt-2">
                              {fileName}
                            </p>
                          )}
                        </>
                      )}
                    </Field> */}
            {fileName && !errors.file ? (
              <p className="text-[#1F4B7F] text-[0.8vw] mt-2 absolute bottom-[-1.3vw]">
                {fileName}
              </p>
            ) : (
              <ErrorMessage
                name="file"
                component="div"
                className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
              />
            )}
          </div>
        </div>
        {/* <div className="grid grid-cols-2 gap-[1vw] pt-[1vw]">
                  <div className="col-span-1 flex flex-col">
                    <label className="text-[#1F4B7F] text-[1.1vw] font-semibold">
                      Occupation
                    </label>
                    <Field
                      as="select"
                      name="status"
                      value={values.status}
                      onChange={(e) => {
                        handleChange(e);
                        sessionStorage.setItem("status", e.target.value);
                      }}
                      className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3vw] w-full rounded-[0.5vw] outline-none px-[1vw]"
                    >
                      <option label="Select Occupation" value="" className="" />
                      <option label="Draft" value="Draft" className="" />
                      <option label="Paused" value="Paused" className="" />
                      <option label="Active" value="Active" className="" />
                    </Field>
                    <ErrorMessage
                      name="status"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </div>
                  <div className="col-span-1 flex-col flex">
                    <label className="text-[#1F4B7F] text-[1.1vw] font-semibold">
                      Offer Description
                      <span className="text-red-500 text-[1vw] pl-[0.2vw]">
                        *
                      </span>
                    </label>
                    <Field
                      as="textarea"
                      name="promotion_description"
                      placeholder="Enter Description"
                      value={values.promotion_description}
                      onChange={(e) => {
                        handleChange(e);
                        sessionStorage.setItem(
                          "promotion_description",
                          e.target.value
                        );
                        setCurrentOfferdata({
                          ...currentofferdata,
                          offer_desc: e.target.value,
                        });
                      }}
                      rows="4"
                      cols="50"
                      className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] w-full rounded-[0.5vw] outline-none px-[1vw]"
                    />
                    <ErrorMessage
                      name="promotion_description"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </div>
                </div> */}
      </div>
      {/* )}
            </Form>
          </>
        )}
      </Formik> */}
    </>
  );
}
