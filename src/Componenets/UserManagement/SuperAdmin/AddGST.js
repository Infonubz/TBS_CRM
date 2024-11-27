import { ConfigProvider, Modal, Progress, Select, Upload } from "antd";
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
import { IoMdArrowDropdown } from "react-icons/io";
const FILE_SIZE = 1024 * 1024 * 5; // 5MB
const SUPPORTED_FORMATS = [
  "application/pdf",
  "image/jpg",
  "image/jpeg",
  "image/png",
];
const validationSchema = Yup.object().shape({
  gst: Yup.string()
  .matches(
    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9]{1}$/,
    "Format should be 22AAAAA0000A1Z5."
  )
  .required("GST Number is required"),
  // state_code: Yup.string().required("State Code is required"),
  state: Yup.string().required("State is required"),
  // head_office: Yup.string().required("Head Offcie is required"),
  state_code: Yup.string()
  .matches(/^\d+$/, "State Code must be a number")  // Ensures only numbers
  .required("State Code is required")
  .max(2,"State code must be valid 2 digit number"),

// state: Yup.string()
//   .matches(/^[A-Za-z]+$/, "State must contain only alphabets")  // Ensures only alphabets
//   .required("State is required"),

head_office: Yup.string()
  .matches(/^[A-Za-z]+$/, "Head Office must contain only alphabets")  // Ensures only alphabets
  .required("Head Office is required")
  .max(40,"maximum 40 characters only"),
  gst_file: Yup.mixed()
    .required("GST Document is required")
    // .test(
    //   "fileSize",
    //   "File too large",
    //   (value) => value && value.size <= FILE_SIZE
    // )
    // .test(
    //   "fileFormat",
    //   "Unsupported Format",
    //   (value) => value && SUPPORTED_FORMATS.includes(value.type)
    // )
    ,
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
  clientID,
  superadmingstdata,
  setSuperAdminGSTData

}) {

  const apiImgUrl = process.env.REACT_APP_API_URL_IMAGE;
 
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
  const [inputPreview, setInputPreview] = useState()
  // const [superadmingstdata, setSuperAdminGSTData] = useState("");
  const updateId = operatorID ? operatorID : operator_id;

  console.log(superadmingstdata,"dhdhdhdhdhdh");
  


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
      const data = await SubmitGSTData(values, updateId, setSuperAdminGSTData,superadmingstdata , dispatch);
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
    setInputPreview(superadmingstdata?.upload_gst)
  }, [modalIsOpen1]);
console.log(operatorID,"operatorIDoperatorID");

const handleFileChange = (event) => {
  const file = event?.currentTarget?.files[0];

  // Check if the file is selected and it's a valid file
  if (file) {
    // Validate if the selected file is an actual file object
    if (file instanceof File) {
      setInputPreview(URL.createObjectURL(file));
    } else {
      console.error("Selected item is not a valid file.");
    }
  } else {
    console.error("No file selected.");
  }
};


const [isModalOpen, setIsModalOpen] = useState(false);
const [modalImage, setModalImage] = useState(null);

const openModal = (event) => {
  // Get the image source (src) using `getElementById`
  const imageSrc = event.target.getAttribute('src');
  
  // Set the modal image source
  setModalImage(imageSrc);
  
  // Open the modal
  setIsModalOpen(true);
};
const closeModal = () => {
  setIsModalOpen(false);
};



  // const fetchGetUser = async () => {
  //   try {
  //     const data = await GetSuperAdminGSTById(
  //       operatorID,
  //       setOperatorID,
  //       setSuperAdminGSTData
  //     );
  //     setSuperAdminGSTData(data);
  //   } catch (error) {
  //     console.error("Error fetching additional user data", error);
  //   }
  // };
console.log(clientID,"ididididdhgfsudfgusfgb");

  // useEffect(() => {
  //   if (operatorID != null || clientID ) {
  //     fetchGetUser();
  //   }
  // }, [operatorID, setOperatorID, setSuperAdminGSTData]);

  console.log(superadmingstdata, "superadmingstdata4444");

  return (
    <div>
      <div className="umselect">
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
              ctc: superadmingstdata?.aggregate_turnover_exceeded == true ? 1 : 0 || "",
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
                    <div className="col-span-1 relative">
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
                        className="text-red-500 text-[0.8vw] absolute left-[.2vw] bottom-[-1.2vw]"
                      />
                    </div>
                    <div className="col-span-1 relative">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                       Gst State code
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
                        className="text-red-500 text-[0.8vw] absolute left-[.2vw] bottom-[-1.2vw]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full gap-x-[2vw]">
                    <div className="col-span-1 relative">
                      <label className="text-[#1F4B7F] text-[1.1vw] ">
                        State
                        <span className="text-[1vw] text-red-600 pl-[0.2vw]">
                          *
                        </span>
                      </label>
                      {/* <Field
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
                      </Field> */}
                          <ConfigProvider
                        theme={{
                          components: {
                            Select: {
                              optionActiveBg: '#aebed1',
                              optionSelectedColor: '#FFF',
                              optionSelectedBg: '#aebed1',
                              optionHeight: '2',
                            },
                          },
                        }}
                      >
                        <Select
                          showSearch
                          value={values.state}
                          onChange={(value) => {
                            handleChange({ target: { name: 'state', value } })
                          }}
                          name="state"
                          className={`custom-select bg-white border-r-[0.3vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                          // className="custom-select bg-white outline-none w-full mt-[0.5vw] h-[3vw] text-[1vw] border-[#1F4B7F] border-l-[0.1vw] border-t-[0.1vw] rounded-xl border-r-[0.2vw] border-b-[0.2vw] placeholder-[#1F487C]"
                          placeholder="Select state"
                          optionFilterProp="value" 
                          // filterSort={(optionA, optionB) =>
                          //   (optionA?.label ?? '')?.toLowerCase()?.localeCompare((optionB?.label ?? '')?.toLowerCase())
                          // }
                          // // optionFilterProp="children" 
                          suffixIcon={<span style={{ fontSize: '1vw', color: '#1f487c' }}>
                            <IoMdArrowDropdown size="2vw" />
                          </span>}
                          style={{ padding: 4 }}
                          options={[
                            {
                              value: '',
                              label: (
                                <div className="text-[1vw] px-[0.2vw] pb-[0.1vw] text-gray-400">
                                  Select State
                                </div>
                              ),
                              disabled: true,
                            },
                            {
                              value: 'Tamilnadu',
                              label: (
                                <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                  Tamilnadu
                                </div>
                              ),
                            },
                            {
                              value: 'Kerala',
                              label: (
                                <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                  Kerala
                                </div>
                              ),
                            },
                            {
                              value: 'Karnataka',
                              label: (
                                <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                  Karnataka
                                </div>
                              ),
                            },
                            {
                              value: 'Andhra',
                              label: (
                                <div className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]">
                                  Andhra
                                </div>
                              ),
                            },
                          ]}
                          // options={[
                          //   { value: '', label: 'Select State', disabled: true },
                          //   { value: 'Tamilnadu', label: 'Tamilnadu' },
                          //   { value: 'Kerala', label: 'Kerala' },
                          //   { value: 'Karnataka', label: 'Karnataka' },
                          //   { value: 'Andhra', label: 'Andhra' },
                          // ]}             
                        />
                      </ConfigProvider>

                      <ErrorMessage
                        name="state"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute left-[.2vw] bottom-[-1.2vw]"
                      />
                    </div>
                    <div className="col-span-1 relative">
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
                        className="text-red-500 text-[0.8vw] absolute left-[.2vw] bottom-[-1.2vw]"
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
                      <div className="col-span-1 relative">
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
                              // handlePreview(file); // If you want to preview the selected file
                              handleFileChange(event)
                            }}
                          />
                          <div className="relative">
                          <button
                            className="border-r-[0.3vw]  flex items-center justify-between px-[1vw] mt-[0.2vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.3vw] placeholder-blue border-[#1F487C] text-[#1F487C] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none"
                            onClick={(event) => {
                              event.preventDefault();
                              document.getElementById("gst_file").click(); 
                            }}
                          >
                            <span className="opacity-50">Upload GST Image</span>
                            {/* <FaCloudUploadAlt
                              color="#1F487C"
                              size={"2vw"}
                              className="absolute right-[1vw]"
                            /> */}
                       
                          </button>
                          {inputPreview  ? (
                          inputPreview?.startsWith("blob") ? (
                            <img
                            src={inputPreview}
                            className="h-[2.5vw] w-[2.5vw] absolute cursor-zoom-in top-[.15vw] right-[.3vw]"
                            alt="Gst Image"
                            onClick={openModal} 
                          />
                          ) : (
                            <img
                            src={`${apiImgUrl}${inputPreview}`}
                            className="h-[2.5vw] w-[2.5vw] absolute cursor-zoom-in top-[.15vw]  right-[.3vw]"
                            alt="Gst Image"
                            onClick={openModal} 
                          />
                          )
                        ) : (
                          <FaCloudUploadAlt
                            color="#1F487C"
                            size="2vw"
                            className="absolute right-[1vw] top-[.4vw] pointer-events-none"
                          />
                        )}
                        </div>
                          {/* {values.gst_file && (
                            <div
                              onClick={() => setPreviewOpen(true)}
                              className="cursor-pointer underline-offset-1 underline text-[#1F4B7F] text-[0.7vw] absolute left-[.2vw] bottom-[-1.2vw]"
                            >
                              {values.gst_file.name
                                ? values.gst_file.name
                                : values.gst_file}
                            </div>
                          )} */}
                          <ErrorMessage
                            name="gst_file"
                            component="div"
                            className="text-[0.8vw] text-red-500 absolute left-[.2vw] bottom-[-1.2vw]"
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
                            checked={values.ctc == "1"}
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
                    <div className="grid grid-cols-2 w-full gap-x-[2vw] relative">
                      <div className="col-span-2">
                        <Field type="radio" name="ctc" value="0" checked={values.ctc == "0"} />
                        <label className="text-[#1F4B7F] text-[0.8vw] pl-[1vw]">
                          My Aggregate Turnover (PAN India Total Turnover) has
                          not Exceeded 20 lakhs
                        </label>
                        <ErrorMessage
                          name="ctc"
                          component="div"
                          className="text-red-600 text-[0.8vw] absolute left-[.2vw] bottom-[-1.2vw]"
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
      <Modal
        visible={isModalOpen}
        onCancel={closeModal}
        footer={null}
        centered
        // width="35vw"
        bodyStyle={{ padding: 0 }}
        destroyOnClose={true} // Ensures modal is destroyed on close
      >
        {/* Display the image in the modal */}
        {modalImage && (
          <img
            src={modalImage}
            alt="Aadhar Preview"
            style={{ width: "100%" }}
            className=""
          />
        )}
      </Modal>
    </div>
  );
}
