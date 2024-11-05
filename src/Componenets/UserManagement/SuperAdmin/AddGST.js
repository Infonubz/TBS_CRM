import { Progress, Upload } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  GetSuperAdminGSTById,
  SubmitGSTData,
} from "../../../Api/UserManagement/SuperAdmin";
import { useDispatch } from "react-redux";
const FILE_SIZE = 1024 * 1024 * 5; // 5MB
const SUPPORTED_FORMATS = [
  "application/pdf",
  "image/jpg",
  "image/jpeg",
  "image/png",
];
const validationSchema = Yup.object().shape({
  gst: Yup.string().required("GSTIN is required"),
  state_code: Yup.string().required("State Code is required"),
  state: Yup.string().required("State is required"),
  head_office: Yup.string().required("Head Offcie is required"),
  gst_file: Yup.mixed()
    .required("GST Document is required")
    .test(
      "fileSize",
      "File too large",
      (value) => value && value.size <= FILE_SIZE
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
  ctc: Yup.string().required("GST is required"),
});

export default function AddGST({
  setCurrentpage,
  SPA_ID,
  setOperatorID,
  operatorID,
  operator_id,
  setModalIsOpen,
  setmodalIsOpen1,
  modalIsOpen1,
}) {
  const props = {
    name: "file",
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    headers: {
      authorization: "authorization-text",
    },

    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        toast.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        toast.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [superadmingstdata, setSuperAdminGSTData] = useState("");
  const updateId = operatorID ? operatorID : operator_id;


  const handlePreview = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
      setPreviewTitle(file.name);
    };
    reader?.readAsDataURL(file);
  };
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    console.log("Subm65656", values);
    try {
      const data = await SubmitGSTData(values, updateId, setSuperAdminGSTData, dispatch);
      toast.success(data?.message);
      // setOperatorID(null);
      setmodalIsOpen1(false);
      // setModalIsOpen(false)
      // setCurrentpage(2); // Uncomment this if you want to navigate to page 2
      console.log("Success gst");
    } catch (error) {
      console.error("Error uploading data", error);
      // toast.error("Failed to submit GST data");
    }
  };

  // Additional logging to check state change
  useEffect(() => {
    console.log("modalIsOpen1 state changed:", modalIsOpen1);
    console.log(updateId, "clientID111");
  }, [modalIsOpen1]);
console.log(operatorID,"operatorIDoperatorID");

  const fetchGetUser = async () => {
    try {
      const data = await GetSuperAdminGSTById(
        operatorID,
        setOperatorID,
        setSuperAdminGSTData
      );
      setSuperAdminGSTData(data);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };

  useEffect(() => {
    if (operatorID != null) {
      fetchGetUser();
    }
  }, [operatorID, setOperatorID, setSuperAdminGSTData]);

  console.log(superadmingstdata, "superadmingstdata4444");

  return (
    <div>
      <div className="">
        <div className="h-[4vw] w-full flex items-center justify-between ">
          <label className="text-[1.5vw] font-semibold text-[#1f4b7f] ">
            Add GST
          </label>
          {/* <button className="rounded-full font-semibold w-[6vw] h-[2vw] flex items-center justify-center border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] border-r-[0.1vw] border-[#34AE2A] text-[1.1vw] text-[#34AE2A] ">
            Save
          </button> */}
        </div>
        <div className="pb-[1vw] ">
          <div className="border-b-[0.1vw] w-full border-[#1f4b7f] "></div>
        </div>
        <div>
          <Formik
            initialValues={{
              gst: superadmingstdata?.gstin || "",
              state_code: superadmingstdata?.state_code_number || "",
              state: superadmingstdata?.state_name || "",
              head_office: superadmingstdata?.head_office || "",
              gst_file: superadmingstdata?.upload_gst || null,
              ctc: superadmingstdata?.aggregate_turnover_exceeded || "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
            enableReinitialize
          >
            {({
              isSubmitting,
              isValid,
              setFieldValue,
              handleSubmit,
              values,
              handleChange,
              errors,
              touched,
              resetForm
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className="gap-y-[1.5vw] flex-col flex">
                  <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        GSTIN
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        type="text"
                        name="gst"
                        placeholder="Enter GSTIN"
                        value={values.gst}
                        className="border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                      />
                      <ErrorMessage
                        name="gst"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        State code number
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        type="text"
                        name="state_code"
                        placeholder="Enter State Code"
                        value={values.state_code}
                        className="border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                      />
                      <ErrorMessage
                        name="state_code"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                    <div className="col-span-1 ">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        State
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        as="select"
                        name="state"
                        id="state"
                        value={values.state} // Corrected prop name from values.roletype
                        className="border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                      >
                        <option label="Select State" value="" />
                        <option label="Tamilnadu" value="Tamilnadu" />
                        <option label="Kerala" value="Kerala" />
                        <option label="Karnataka" value="Karnataka" />
                        <option label="Andhra" value="Andhra" />
                      </Field>

                      <ErrorMessage
                        name="State"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Head Office
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        type="text"
                        name="head_office"
                        placeholder="Enter Head Office"
                        value={values.head_office}
                        className="border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                      />
                      <ErrorMessage
                        name="head_office"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                  </div>
                  {/* <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Alternate Phone
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        type="text"
                        name="alt_phone"
                        placeholder="Enter Alternate Number"
                        // value={values.firstname}
                        className="border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                      />
                      <ErrorMessage
                        name="alt_phone"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        Alternate Email ID
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      <Field
                        type="text"
                        name="alt_emailid"
                        placeholder="Enter Alternate Email Address"
                        // value={values.firstname}
                        className="border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                      />
                      <ErrorMessage
                        name="alt_emailid"
                        component="div"
                        className="text-red-500 text-[0.8vw]"
                      />
                    </div>
                  </div> */}
                  <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                    <div className="col-span-2 flex flex-col w-full ">
                      <div className="col-span-1">
                        <label className="text-[#1F4B7F] text-[1.1vw]">
                          Upload GST File
                          <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                            *
                          </span>
                        </label>
                        <div>
                          {/* <input
                            id="gst_file"
                            name="gst_file"
                            type="file"
                            style={{ display: "none" }}
                            onChange={(event) => {
                              const files = Array.from(event.target.files);
                              // console.log(files, "filesfiles");
                              // setFieldValue("gst_file", files);
                              setFieldValue(
                                "gst_file",
                                event.currentTarget.files[0]
                              );
                              // handlePreview(files[0]);
                            }}
                          /> */}
                          <input
                            id="gst_file"
                            name="gst_file"
                            type="file"
                            style={{ display: "none" }}
                            onChange={(event) => {
                              const file = event.currentTarget.files[0];
                              setFieldValue("gst_file", file);
                              handlePreview(file); // If you want to preview the selected file
                            }}
                          />
                          <button
                            className="border-r-[0.3vw] relative flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none"
                            onClick={(event) => {
                              event.preventDefault();
                              document.getElementById("gst_file").click();
                            }}
                          >
                            <span className="opacity-50">Upload GST Image</span>
                            <FaCloudUploadAlt
                              color="#1F487C"
                              size={"2vw"}
                              className="absolute right-[1vw]"
                            />
                          </button>
                          {values.gst_file && (
                            <div
                              onClick={() => setPreviewOpen(true)}
                              className="cursor-pointer underline-offset-1 underline text-[#1F4B7F] text-[0.7vw]"
                            >
                              {values.gst_file.name
                                ? values.gst_file.name
                                : values.gst_file}
                            </div>
                          )}
                          <ErrorMessage
                            name="gst_file"
                            component="div"
                            style={{ color: "red" }}
                            className="text-[0.8vw]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="gap-y-[1.5vw] flex-col flex">
                    {/* <div className="grid grid-cols-2 w-full gap-x-[2vw] items-center">
                      <div className="col-span-1">
                        <div>
                          <Field
                            type="radio"
                            name="gst"
                            value="1"
                            className="text-[#1F4B7F] border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C]"
                          />
                          <label className="text-[#1F4B7F] text-[0.9vw] pl-[1vw]">
                            I have GSTIN
                          </label>
                        </div>
                        <div></div>
                        {errors.gender && touched.gst ? (
                          <div>{errors.gst}</div>
                        ) : null}
                      </div>
                      <div className="col-span-1">
                        <Field type="radio" name="gst" value="0" />
                        <label className="text-[#1F4B7F] text-[0.9vw] pl-[1vw]">
                          I don’t have GSTIN
                        </label>
                        <ErrorMessage
                          name="business"
                          component="gst"
                          className="text-red-500 text-[0.8vw]"
                        />
                      </div>
                    </div> */}
                    <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                      <div className="col-span-2">
                        <div>
                          <Field
                            type="radio"
                            name="ctc"
                            value="1"
                            className=" border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C]"
                          />
                          <label className="text-[#1F4B7F] text-[0.8vw] pl-[1vw]">
                            My Aggregate Turnover (PAN India Total Turnover) has
                            Exceeded 20 lakhs
                          </label>
                        </div>
                        <div></div>
                        {/* {errors.ctc && touched.ctc ? (
                          <div>{errors.ctc}</div>
                        ) : null} */}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                      <div className="col-span-2">
                        <Field type="radio" name="ctc" value="0" />
                        <label className="text-[#1F4B7F] text-[0.8vw] pl-[1vw]">
                          My Aggregate Turnover (PAN India Total Turnover) has
                          not Exceeded 20 lakhs
                        </label>
                        <ErrorMessage
                          name="ctc"
                          component="div"
                          className="text-red-500 text-[0.8vw]"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center w-full  justify-between ">
                    <div className="flex w-full justify-between gap-x-[1vw]">
                      <button
                        type="button"
                        className="border-[#1F487C] w-[5vw] font-semibold text-[1vw] h-[2vw] rounded-full border-r-[0.2vw]  border-l-[0.1vw] border-t-[0.1vw] border-b-[0.2vw]"
                        onClick={resetForm}>
                        Reset
                      </button>
                      <button
                        className="bg-[#1F487C] font-semibold rounded-full w-[7vw] h-[2vw] text-[1vw] text-white"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
