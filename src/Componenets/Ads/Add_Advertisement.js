import React, { useEffect, useState } from "react";
import { LiaSave } from "react-icons/lia";
import { PiUpload } from "react-icons/pi";
import * as Yup from "yup";
import { message, Upload } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { GET_ADS } from "../../Store/Type";
import "../../App.css";
import { toast } from "react-toastify";
import {
  GetAdsById,
  GetAdsData,
  GetMobileAds,
  SubmitAdsData,
  SubmitAdsMobile,
  GetMbleAdsById,
  GetClientById,
  GetClientList,
} from "../../Api/Ads/Ads";
import dayjs from "dayjs";

const validationSchema = Yup.object().shape({
  ad_title: Yup.string()
    .min(1, "Title must be greater than 1 character")
    .max(50, "Title should not be greater than 50 characters")
    .required("Title is required"),
  client_details: Yup.string().required("Client Name is required"),
  usage_per_day: Yup.string().required("Usage is required"),
  status: Yup.string().required("Status is required"),
  start_date: Yup.string().required("Start Date is required"),
  end_date: Yup.string().required("End Date is required"),
  ad_description: Yup.string()
    .required("Description is required")
    .min(4, "Description must be greater than 4 characters")
    .max(150, "Description should not be greater than 150 characters"),
  file: Yup.mixed()
    .test("fileSize", "File size is too large (max 15MB)", (value) => {
      if (value) {
        return value.size <= 15728640; // 15MB
      }
      return true;
    })
    .test("fileType", "Unsupported file format", (value) => {
      if (!value) {
        return true;
      }
      const supportedFormats = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "video/mp4",
      ];
      return supportedFormats.includes(value?.type);
    })
    .required("File is required"),
});

const Ad_Advertisement = ({
  setIsModalOpen,
  updatedata,
  adsdata,
  setAdsData,
  SetUpdateData,
  tabType,
  // clientdetail,
  // setClientDetail,
}) => {
  const { Dragger } = Upload;
  const [advalues, setAdValues] = useState();
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState("");
  const [fileList, setFileList] = useState([]);
  const get_clientList = useSelector((state) => state.crm.ads_client_list);

  const props = {
    name: "file",
    multiple: false,
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    fileList: fileList, // Manage the file list manually
    onChange(info) {
      const { status, name } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
        console.log(info.file, "filetesting");
      }
      if (status === "done") {
        message.success(`${name} file uploaded successfully.`);
        setFileList([info.file]); // Set file list to contain only the last uploaded file
      } else if (status === "error") {
        message.error(`${name} file upload failed.`);
      }
    },
    beforeUpload(file) {
      setFileList([file]);
      return true;
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleSubmit = async (values) => {
    console.log(values, "values");
    if (tabType == "Web") {
      try {
        const data = await SubmitAdsData(values, updatedata, dispatch);
        setIsModalOpen(false);
        toast.success(data?.message);
        GetAdsData(dispatch);
        console.log(values, "values");
      } catch (error) {
        console.error("Error uploading data", error);
      }
    } else {
      try {
        const data = await SubmitAdsMobile(values, updatedata, dispatch);
        setIsModalOpen(false);
        toast.success(data?.message);
        GetMobileAds(dispatch);
        console.log(data);
      } catch (error) {
        console.error("Error uploading data", error);
      }
    }
  };

  // const fetchClientDetails = async () => {
  //   try {
  //     const response = await GetClientById(
  //       ClientId,
  //       setclientId,
  //       setClientDetail
  //     );
  //     console.log(response, "datadata");
  //     setClientDetail(response?.data[0]);
  //   } catch (error) {
  //     console.error("Error fetching additional user data", error);
  //   }
  // };

  const fetchGetAds = async () => {
    if (tabType == "Web") {
      try {
        const data = await GetAdsById(updatedata, SetUpdateData, setAdsData);
        console.log(data, "datadata");
        setAdsData(data);
      } catch (error) {
        console.error("Error fetching additional user data", error);
      }
    } else {
      try {
        const data = await GetMbleAdsById(
          updatedata,
          SetUpdateData,
          setAdsData
        );
        console.log(data, "datadata");
        setAdsData(data);
      } catch (error) {
        console.error("Error fetching additional user data", error);
      }
    }
  };

  useEffect(() => {
    if (updatedata != null) {
      fetchGetAds();
    }
  }, [updatedata, SetUpdateData, setAdsData]);

  useEffect(() => {
    console.log(get_clientList, "----Client name List");
    GetClientList(dispatch);
  }, []);

  return (
    <div className="">
      <Formik
        initialValues={{
          ad_title:
            tabType == "Web" && adsdata
              ? adsdata?.ad_title
              : adsdata?.mobad_title || "",
          client_details: adsdata ? adsdata?.client_details : "",
          status: adsdata ? adsdata?.status : "",
          start_date: adsdata?.start_date
            ? dayjs(adsdata?.start_date).format("YYYY-MM-DD")
            : "",
          end_date: adsdata?.end_date
            ? dayjs(adsdata?.end_date).format("YYYY-MM-DD")
            : "",
          ad_description:
            tabType == "Web" && adsdata
              ? adsdata?.ad_description
              : adsdata?.mobad_description || "",
          usage_per_day: adsdata?.usage_per_day || "",
          page_name: adsdata?.page_name || "",
          file:
            tabType == "Web" && adsdata
              ? adsdata?.ad_video
              : adsdata?.mobad_vdo || "",
          tbs_client_id: adsdata.tbs_client_id || "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch({
            type: GET_ADS,
            payload: values,
          });
          handleSubmit(values);
        }}
        enableReinitialize
      >
        {({
          handleSubmit,
          handleChange,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <Form onSubmit={handleSubmit}>
            <div className="Add-Section text-[#1f487c]">
              <div className="flex flex-col">
                <div className="flex justify-between mr-[3vw]">
                  <div className="text-[1.2vw] text-[#1F4B7F] font-bold pt-[0.5vw]">
                    {updatedata ? "UPDATE" : "CREATE"} ADVERTISEMENT
                  </div>
                  <button
                    className="flex bg-[#1F4B7F] mt-[0.2vw] px-[0.8vw] gap-[0.5vw] py-[0.3vw] rounded-[0.7vw] items-center justify-center"
                    type="submit"
                  >
                    <span>
                      <LiaSave color="white" size={"1.5vw"} />
                    </span>
                    <span className="text-white text-[0.9vw]">
                      {updatedata ? "SAVE" : "CREATE"} ADS
                    </span>
                  </button>
                </div>
                <div className="fline grid grid-cols-2 gap-x-[2vw] gap-y-[1vw] justify-between mb-4">
                  <div className="pt-[1.5vw]">
                    <label className="text-[#1F4B7F] text-[1.1vw] font-semibold">
                      Client Details
                    </label>
                    <Field
                      as="select"
                      name="client_details"
                      value={values.client_details}
                      onChange={(e) => {
                        handleChange(e);
                        const selectedClient = get_clientList?.find(
                          (item) => item?.owner_name === e.target.value
                        );
                        setFieldValue(
                          "tbs_client_id",
                          selectedClient?.tbs_client_id
                        );
                        localStorage.setItem("client_details", e.target.value);
                      }}
                      className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] 
                  text-[#1F487C] text-[1.2vw] h-[2.7vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                    >
                      <option label="Select Client" value="" className="" />
                      {get_clientList?.map((clientName) => (
                        <option
                          key={clientName?.tbs_client_id}
                          value={clientName?.owner_name}
                        >
                          {clientName?.owner_name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="client_details"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </div>
                  <div className="pt-[1.5vw]">
                    <label className="text-[1.1vw] font-semibold text-[#1f487c]">
                      Advertisement title
                    </label>
                    <Field
                      type="text"
                      name="ad_title"
                      placeholder="Enter title"
                      value={values?.ad_title}
                      onChange={handleChange}
                      className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C]
                     text-[#1F487C] text-[1.2vw] h-[2.7vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                    />
                    <ErrorMessage
                      name="ad_title"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </div>
                  <div className="col-span-1 flex-col flex">
                    <label className="text-[#1F4B7F] text-[1.1vw] font-semibold">
                      Start Date
                    </label>
                    <Field
                      type="date"
                      name="start_date"
                      placeholder="Start Date"
                      value={values.start_date}
                      onChange={(e) => {
                        handleChange(e);
                        localStorage.setItem("start_date", e.target.value);
                      }}
                      className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C]
                   text-[#1F487C] text-[1.2vw] h-[2.7vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                    />
                    <ErrorMessage
                      name="start_date"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </div>
                  <div>
                    <label className="text-[#1F4B7F] text-[1.1vw] font-semibold">
                      End Date
                    </label>
                    <Field
                      type="date"
                      name="end_date"
                      placeholder="End Date"
                      value={values.end_date}
                      onChange={(e) => {
                        handleChange(e);
                        localStorage.setItem("end_date", e.target.value);
                      }}
                      className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C]
                   text-[#1F487C] text-[1.2vw] h-[2.7vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                    />
                    <ErrorMessage
                      name="end_date"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </div>
                  <div>
                    <label className="text-[#1F4B7F] text-[1.1vw] font-semibold">
                      Status
                    </label>
                    <Field
                      as="select"
                      name="status"
                      value={values.status}
                      onChange={(e) => {
                        handleChange(e);
                        localStorage.setItem("status", e.target.value);
                      }}
                      className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C]
                   text-[#1F487C] text-[1.2vw] h-[2.7vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                    >
                      <option label="Select Status" value="" className="" />
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
                  <div>
                    <label className="text-[1.1vw] font-semibold text-[#1f487c]">
                      Usage
                    </label>
                    <Field
                      type="text"
                      name="usage_per_day"
                      placeholder="Enter Usage"
                      value={values?.usage_per_day}
                      onChange={handleChange}
                      className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C]
                     text-[#1F487C] text-[1.2vw] h-[2.7vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                    />
                    <ErrorMessage
                      name="usage_per_day"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </div>
                  <div>
                    <label className="text-[#1F4B7F] text-[1.1vw] font-semibold">
                      Status
                    </label>
                    <Field
                      as="select"
                      name="page_name"
                      value={values.page_name}
                      onChange={(e) => {
                        handleChange(e);
                        localStorage.setItem("page_name", e.target.value);
                      }}
                      className="border-r-[0.3vw] mt-[0.5vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C]
                   text-[#1F487C] text-[1.2vw] h-[2.7vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                    >
                      <option label="Select Page" value="" className="" />
                      <option label="Home" value="Home" className="" />
                      <option
                        label="Dashboard"
                        value="Dashboard"
                        className=""
                      />
                      <option label="Filter" value="Filter" className="" />
                      <option label="Other" value="Other" className="" />
                    </Field>
                    <ErrorMessage
                      name="page_name"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </div>
                  <div className="">
                    <div className="mb-[0.5vw] text-[1.1vw] font-semibold text-[#1f487c]">
                      Advertisement Description
                    </div>
                    <Field
                      as="textarea"
                      name="ad_description"
                      placeholder="Enter Description"
                      rows="1"
                      cols="50"
                      value={values?.ad_description}
                      onChange={handleChange}
                      className="border-r-[0.3vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1.2vw] 
                    w-[100%] h-[2.7vw] rounded-[0.5vw] outline-none px-[1vw]"
                    />
                    <ErrorMessage
                      name="ad_description"
                      component="div"
                      className="text-red-500 text-[0.8vw]"
                    />
                  </div>
                </div>

                <div className="flex flex-col"></div>
                <div className="col-span-1 flex flex-col">
                  <div className="w-full mb-[0.5vw] text-[1.1vw] font-semibold text-[#1f487c]">
                    Advertisement Video
                  </div>
                  <Field name="file">
                    {({ field }) => (
                      <>
                        <Dragger
                          multiple={false}
                          height={"6.5vw"}
                          beforeUpload={(file) => {
                            setFieldValue("file", file);
                            setFileName(file.name);
                            setFieldValue("ad_file_type", file.type);
                            setFieldValue("ad_file_size", file.size);
                            return false; // Prevent automatic uplo
                          }}
                          showUploadList={false}
                          className="custom-dragger mt-[0.5vw] relative"
                          style={{
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            position: "relative",
                          }}
                          onChange={(e) => {
                            setFieldValue("file", e.file);
                            handleChange({
                              target: { name: "file", value: e.file },
                            });
                          }}
                        >
                          <label className="flex items-center justify-center">
                            <p className="text-[#1F4B7F] text-[1.1vw] pr-[1vw]">
                              Drag and Drop
                            </p>
                            <PiUpload color="#1F4B7F" size={"1.2vw"} />
                          </label>
                          <div
                            className="absolute top-0 left-0 w-full h-full"
                            style={{
                              backgroundImage: `url(${
                                tabType == "Web" && adsdata
                                  ? adsdata.ad_video
                                    ? `http://192.168.90.47:4000${adsdata.ad_video}`
                                    : `http://192.168.90.47:4000${fileName.ad_video}`
                                  : adsdata.mobad_vdo
                                  ? `http://192.168.90.47:4000${adsdata.mobad_vdo}`
                                  : `http://192.168.90.47:4000${fileName.mobad_vdo}`
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
                  </Field>
                  {errors.file && touched.file && (
                    <div className="text-red-500 text-[0.8vw]">
                      {errors.file}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Ad_Advertisement;
